"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

import { comServico } from "@/components/demos/barbearia/enderecos";
import { CopyButton } from "@/components/ui/spell/copy-button";
import type { barbeariaSite } from "@/conteudo/demos/barbearia";

type Site = typeof barbeariaSite;

const rotulo = "bb-rotulo text-muted-foreground";
/** A opção marcável: sob o ponteiro, o fio clareia — só se estiver habilitada (até 03/10, acendia também a desabilitada). */
const opcao =
  "flex h-full min-h-12 cursor-pointer flex-col justify-center rounded-[16px] border border-border bg-background/40 px-4 py-3 transition-[border-color,background-color,box-shadow] duration-300 peer-checked:border-primary peer-checked:bg-primary/12 peer-checked:shadow-[inset_0_0_0_1px_var(--primary)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring peer-enabled:hover:border-input peer-disabled:cursor-not-allowed peer-disabled:opacity-40";
/**
 * O bilhete do resultado, dentro do cartão de vidro (recuoDoVidro, 24/40/48
 * px): o recuo dele nunca passa o do cartão, 24/32/40 px (até 03/10, 32 px
 * dentro de um cartão de 24 px, no celular).
 */
const bilhete =
  "relative flex flex-col justify-between gap-8 overflow-hidden rounded-[28px] bg-card p-6 shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--primary)_45%,transparent)] md:p-8 lg:p-10";

/**
 * Funcionalidade 1 do plano Completo: o agendador. Serviço, profissional,
 * dia e período viram uma mensagem para o WhatsApp da casa; o horário é
 * confirmado por resposta. O sábado à noite não tem atendimento. Chega com
 * o serviço marcado quando o endereço traz #servico-<id> (a página dos
 * serviços e a agenda de retorno levam até aqui assim).
 */
export function Agendador({ agendador, servicos, equipe, whatsapp }: Pick<Site, "agendador" | "servicos" | "equipe"> & { whatsapp: string }) {
  const id = useId();
  const [servico, setServico] = useState(servicos.itens[0].id);
  const [profissional, setProfissional] = useState("");
  const [dia, setDia] = useState(agendador.dias[0]);
  const [periodo, setPeriodo] = useState(agendador.periodos[0].nome);

  useEffect(() => {
    const lerEndereco = () => {
      const pedido = window.location.hash.match(/^#servico-(.+)$/)?.[1];
      if (pedido && servicos.itens.some((s) => s.id === pedido)) setServico(pedido);
    };
    lerEndereco();
    window.addEventListener("hashchange", lerEndereco);
    return () => window.removeEventListener("hashchange", lerEndereco);
  }, [servicos.itens]);

  const sabado = dia === agendador.dias[agendador.dias.length - 1];
  const ultimoPeriodo = agendador.periodos[agendador.periodos.length - 1].nome;
  const periodoValido = sabado && periodo === ultimoPeriodo ? agendador.periodos[0].nome : periodo;
  const escolhido = servicos.itens.find((s) => s.id === servico)!;
  const pessoa = equipe.pessoas.find((p) => p.id === profissional);
  const resumo = `${escolhido.nome}${pessoa ? `, ${agendador.com} ${pessoa.nome}` : ""}, ${dia.toLowerCase()} de ${periodoValido.toLowerCase()}.`;
  const mensagem = `${agendador.mensagem}: ${resumo}`;
  const vinculo = `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensagem)}`;

  const grupo = (titulo: string, filhos: React.ReactNode) => (
    <fieldset>
      <legend className={rotulo}>{titulo}</legend>
      <div className="mt-3 grid gap-2">{filhos}</div>
    </fieldset>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr]">
      <div className="grid gap-8">
        {grupo(
          agendador.rotulos.servico,
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {servicos.itens.map((s) => (
              <label key={s.id}>
                <input type="radio" name={`${id}-s`} checked={servico === s.id} onChange={() => setServico(s.id)} className="peer sr-only" />
                <span className={opcao}>
                  <span className="bb-exibicao text-[25px] leading-tight">{s.nome}</span>
                  <span className="mt-1 text-[12.5px] text-muted-foreground tabular-nums">
                    R$ {s.preco} · {s.duracao}
                  </span>
                </span>
              </label>
            ))}
          </div>,
        )}
        {grupo(
          agendador.rotulos.profissional,
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[{ id: "", nome: agendador.semPreferencia, especialidade: "" }, ...equipe.pessoas].map((p) => (
              <label key={p.id || "qualquer"}>
                <input type="radio" name={`${id}-p`} checked={profissional === p.id} onChange={() => setProfissional(p.id)} className="peer sr-only" />
                <span className={opcao}>
                  <span className="text-[15px] leading-tight font-medium">{p.nome}</span>
                  {p.especialidade && <span className="mt-0.5 text-[12px] tracking-[0.12em] text-accent uppercase">{p.especialidade}</span>}
                </span>
              </label>
            ))}
          </div>,
        )}
        <div className="grid gap-8 sm:grid-cols-[1.4fr_1fr]">
          {grupo(
            agendador.rotulos.dia,
            <div className="grid grid-cols-5 gap-1.5">
              {agendador.dias.map((d) => (
                <label key={d}>
                  <input type="radio" name={`${id}-d`} checked={dia === d} onChange={() => setDia(d)} className="peer sr-only" />
                  <span className={`${opcao} items-center px-1 text-[13px] tracking-[0.08em] uppercase`}>{d.slice(0, 3)}</span>
                </label>
              ))}
            </div>,
          )}
          {grupo(
            agendador.rotulos.periodo,
            <div className="grid grid-cols-3 gap-1.5">
              {agendador.periodos.map((p) => (
                <label key={p.nome} title={p.faixa}>
                  <input
                    type="radio"
                    name={`${id}-h`}
                    checked={periodoValido === p.nome}
                    disabled={sabado && p.nome === ultimoPeriodo}
                    onChange={() => setPeriodo(p.nome)}
                    className="peer sr-only"
                  />
                  <span className={`${opcao} items-center px-1 text-[13px]`}>{p.nome}</span>
                </label>
              ))}
            </div>,
          )}
        </div>
      </div>

      {/* O pedido, como um bilhete de latão. */}
      <div className={bilhete} aria-live="polite">
        <span aria-hidden="true" className="bb-faixas absolute inset-x-0 top-0 h-1.5" />
        <div>
          <p className="bb-rotulo text-accent">{agendador.resumo}</p>
          <p className="bb-exibicao mt-5 text-[clamp(32px,3.2vw,48px)] leading-[1.04]">{resumo}</p>
          <p className="mt-5 text-[14px] text-muted-foreground tabular-nums">
            R$ {escolhido.preco} · {escolhido.duracao}
          </p>
        </div>
        <div>
          <a
            href={vinculo}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetico
            className="bb-botao flex min-h-14 items-center justify-center rounded-full px-6 text-[15px] font-medium tracking-[0.04em] transition-[filter,translate] duration-300 hover:brightness-110"
          >
            {agendador.acao}
          </a>
          {/* O mesmo pedido, para colar onde quiser (Spell UI, Copy Button; desde 03/10): pílula de fio de latão. */}
          <CopyButton
            valor={mensagem}
            rotulo={agendador.copiar}
            confirmado={agendador.copiado}
            className="mt-3 flex min-h-14 w-full cursor-pointer items-center justify-center gap-2.5 rounded-full border border-primary/45 px-6 text-[15px] font-medium tracking-[0.04em] text-accent transition-[border-color,background-color] duration-300 enabled:hover:border-accent enabled:hover:bg-primary/10 active:bg-primary/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          />
          <p className="mt-4 text-[13px] leading-snug text-muted-foreground">{agendador.nota}</p>
        </div>
      </div>
    </div>
  );
}

const DIA = 86_400_000;
const paraEntrada = (data: Date) => data.toISOString().slice(0, 10);
const porExtenso = (data: Date) => data.toLocaleDateString("pt-BR", { day: "numeric", month: "long", timeZone: "UTC" });

/**
 * Funcionalidade 2 do plano Completo: a agenda de retorno. O tipo de corte
 * e a data do último atendimento devolvem a janela sugerida para o
 * próximo (Degradê 12–18 dias, Social 21–30, Tesoura 35–45, Barba
 * 10–15), com a régua dos dias até lá. "Agendar o retorno" leva à página
 * do agendador com o serviço marcado. A data de hoje só existe no
 * aparelho: até a hidratação, o campo fica vazio e o bilhete mostra o
 * esqueleto (dm-esqueleto, app/demos/demos.css) no lugar da janela, do
 * estado e da régua, com aria-busy. Até 03/10, mostrava "…" e uma régua
 * sem o dia. Depois, campo vazio (apagado por quem usa) é "…": espera a
 * data, não carrega.
 */
export function AgendaDeRetorno({ dados, agendar }: { dados: Site["retorno"]; agendar: string }) {
  const id = useId();
  const [corteId, setCorteId] = useState(dados.cortes[0].id);
  const [ultimo, setUltimo] = useState("");
  const [hoje, setHoje] = useState<Date | null>(null);

  useEffect(() => {
    const agora = new Date();
    const base = new Date(Date.UTC(agora.getFullYear(), agora.getMonth(), agora.getDate()));
    setHoje(base);
    setUltimo(paraEntrada(new Date(base.getTime() - 9 * DIA)));
  }, []);

  const corte = dados.cortes.find((c) => c.id === corteId)!;
  const data = ultimo ? new Date(`${ultimo}T00:00:00Z`) : null;
  const inicio = data && new Date(data.getTime() + corte.minimo * DIA);
  const fim = data && new Date(data.getTime() + corte.maximo * DIA);
  const ate = (alvo: Date) => (hoje ? Math.round((alvo.getTime() - hoje.getTime()) / DIA) : 0);
  const dias = (n: number) => `${n} ${n === 1 ? dados.estados.dia : dados.estados.dias}`;
  let estado = "";
  if (inicio && fim) {
    if (ate(inicio) > 0) estado = `${dados.estados.antes} ${dias(ate(inicio))}.`;
    else if (ate(fim) >= 0) estado = dados.estados.hoje;
    else estado = `${dados.estados.passou} ${dias(-ate(fim))}.`;
  }
  // A régua: do último corte até o fim da janela, com o hoje marcado.
  const total = corte.maximo + 4;
  const passados = data && hoje ? Math.min(total, Math.max(0, Math.round((hoje.getTime() - data.getTime()) / DIA))) : 0;

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="grid content-start gap-8">
        <fieldset>
          <legend className={rotulo}>{dados.rotulos.corte}</legend>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {dados.cortes.map((c) => (
              <label key={c.id}>
                <input type="radio" name={`${id}-c`} checked={corteId === c.id} onChange={() => setCorteId(c.id)} className="peer sr-only" />
                <span className={opcao}>
                  <span className="bb-exibicao text-[24px] leading-tight">{c.nome}</span>
                  <span className="mt-0.5 text-[12px] text-muted-foreground tabular-nums">
                    {c.minimo} a {c.maximo} {dados.estados.dias}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="block">
          <span className={rotulo}>{dados.rotulos.ultimo}</span>
          <input
            type="date"
            value={ultimo}
            max={hoje ? paraEntrada(hoje) : undefined}
            onChange={(e) => setUltimo(e.target.value)}
            className="mt-3 block w-full rounded-[16px] border border-border bg-background/40 px-4 py-3.5 text-[16px] text-foreground outline-none transition-[border-color,box-shadow] duration-300 hover:border-input focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
        </label>
        <p className="max-w-[46ch] text-[13.5px] leading-snug text-muted-foreground">{dados.nota}</p>
      </div>

      <div className={`${bilhete} min-h-[300px]`} aria-live="polite" aria-busy={!hoje || undefined}>
        <div>
          <p className="bb-rotulo text-accent">{dados.janela}</p>
          {/* Os esqueletos ficam dentro das linhas de texto (inline-block): a altura é a da linha, e nada pula quando a data chega. */}
          <p className="bb-exibicao mt-5 text-[clamp(38px,4vw,60px)] leading-[1.02]">
            {!hoje ? (
              <span aria-hidden="true">
                <span className="dm-esqueleto inline-block h-[0.72em] w-4/5 rounded-full align-middle" />
                <br />
                <span className="dm-esqueleto inline-block h-[0.72em] w-1/2 rounded-full align-middle" />
              </span>
            ) : inicio && fim ? (
              <>
                {porExtenso(inicio)}
                <span className="text-muted-foreground italic"> a </span>
                {porExtenso(fim)}
              </>
            ) : (
              <span className="text-muted-foreground">…</span>
            )}
          </p>
          <p className="mt-3 text-[14.5px] text-accent">
            {hoje ? estado : <span aria-hidden="true" className="dm-esqueleto inline-block h-[1em] w-48 max-w-full rounded-full align-middle" />}
          </p>
          {/* A régua dos dias: cada traço é um dia; em latão, a janela; o ponto é hoje. Sem o dia de hoje, só o esqueleto dos traços. Os traços com 2 px entre si (até 03/10, 3 px, fora da escala). */}
          <div aria-hidden="true" className="mt-8 flex h-10 items-end gap-0.5">
            {Array.from({ length: total }, (_, d) => {
              if (!hoje) return <span key={d} className="dm-esqueleto h-1/2 flex-1 rounded-full" />;
              const naJanela = d >= corte.minimo && d <= corte.maximo;
              const ehHoje = d === passados;
              return (
                <span
                  key={d}
                  className={`flex-1 rounded-full transition-colors duration-500 ${naJanela ? "h-full bg-primary" : "h-1/2 bg-foreground/20"} ${ehHoje ? "outline-2 outline-offset-2 outline-accent" : ""}`}
                />
              );
            })}
          </div>
        </div>
        {/* No toque, o latão cheio, como sob o ponteiro. */}
        <Link
          href={comServico(agendar, corte.servico)}
          className="bb-fio flex min-h-14 items-center justify-center rounded-full px-6 text-[15px] font-medium tracking-[0.04em] text-accent transition-colors duration-300 hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground"
        >
          {dados.acao}
        </Link>
      </div>
    </div>
  );
}
