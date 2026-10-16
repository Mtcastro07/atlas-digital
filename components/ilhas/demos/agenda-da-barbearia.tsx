"use client";

import Link from "next/link";
import { useEffect, useId, useLayoutEffect, useState } from "react";

import { comServico } from "@/components/demos/barbearia/enderecos";
import { MiniFicha } from "@/components/demos/barbearia/mini-ficha";
import { CopyButton } from "@/components/ui/spell/copy-button";
import type { barbeariaSite } from "@/conteudo/demos/barbearia";
import { feriadosNacionais } from "@/conteudo/demos/comum";
import { corrigirPedido, estadoDoRetorno, periodosDoDia, proximasDatas, proximoPedido } from "@/lib/demos/barbearia/pedido";
import { horaDeNiteroi, type Dia, type Expediente } from "@/lib/demos/relogio";

type Site = typeof barbeariaSite;

const rotulo = "bb-rotulo text-muted-foreground";
/** A opção marcável: sob o ponteiro, o fio clareia — só se estiver habilitada (até 03/10, acendia também a desabilitada). */
const opcao =
  "flex h-full min-h-12 flex-col justify-center rounded-[16px] border border-border bg-background/40 px-4 py-3 transition-[border-color,background-color,box-shadow] duration-300 peer-checked:border-primary peer-checked:bg-primary/12 peer-checked:shadow-[inset_0_0_0_1px_var(--primary)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring peer-enabled:peer-hover:border-input peer-disabled:opacity-40";
/**
 * O rádio cobre a opção inteira, invisível, por cima dela (desde 16/10, o Impeccable): era sr-only, um campo de 1 px
 * que o foco levava para a vista, e o toque numa opção meio coberta pela barra fazia a página saltar ~415 px.
 */
const radio = "peer absolute inset-0 z-10 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed";
/** "na terça", "no sábado". */
const naDia = (nome: string) => `${nome.endsWith("o") ? "no" : "na"} ${nome.toLowerCase()}`;
const maiuscula = (texto: string) => texto.charAt(0).toUpperCase() + texto.slice(1);
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
 * As respostas à escolha (desde 14/10, o momento da página):
 * - a ficha do serviço escolhido, atrás do vidro: o data-objeto da abertura
 *   ([data-abertura-agendar]) passa a ser o do serviço, e o palco a vira em
 *   300 ms (data-virada). Endereço e ficha se leem num efeito de leiaute,
 *   antes do quadro seguinte do palco: quem chega com #servico-navalha não
 *   vê a moeda virar para O Clássico e voltar. Só o serviço mexe na ficha;
 * - o bilhete que se reimprime: a frase nova do pedido entra de 6 px abaixo
 *   em 200 ms (barbearia.css, .bb-bilhete-frase), depois da primeira troca;
 * - desde a correção de 14/10 (o crítico de fora), a miniatura da ficha em
 *   cada opção de serviço: de perfil e apagada, a da opção escolhida vira de
 *   frente em 300 ms (barbearia.css, .bb-opcao-ficha). No celular, a ficha
 *   grande virava fora da vista, no alto da página.
 * O pedido padrão (desde a mesma correção) é o primeiro horário livre pelo
 * relógio da casa (lib/demos/barbearia/pedido.ts): numa quarta às 20h56, com
 * a casa avisando "abre amanhã, às 9h", quinta de manhã, e não "terça de
 * manhã". Só se lê depois da hidratação (o servidor não sabe a hora de quem
 * lê), num efeito de leiaute, e não passa por cima de uma escolha já feita.
 * Desde o fechamento com o Impeccable (16/10), o pedido impossível não entra:
 * com um profissional escolhido, os dias em que ele não atende ficam
 * desabilitados, com o motivo escrito ("Rui atende de quinta a sábado."); com
 * um dia escolhido, quem não atende nele fica marcado ("Não atende na terça");
 * e cada troca que o agendador faz por quem usa (Rui escolhido numa terça; o
 * sábado com a noite marcada) é anunciada (role="status"). Cada dia mostra a
 * data que ele quer dizer ("SEX 16"), a mesma que vai no pedido.
 */
export function Agendador({
  agendador,
  servicos,
  equipe,
  expediente,
  whatsapp,
}: Pick<Site, "agendador" | "servicos" | "equipe"> & { expediente: Expediente; whatsapp: string }) {
  const id = useId();
  const [servico, setServico] = useState(servicos.itens[0].id);
  const [profissional, setProfissional] = useState("");
  const [dia, setDia] = useState(agendador.dias[0]);
  const [periodo, setPeriodo] = useState(agendador.periodos[0].nome);
  const [escolheu, setEscolheu] = useState(false);
  const [aviso, setAviso] = useState("");
  const [datas, setDatas] = useState<Partial<Record<Dia, string>>>({});
  const escolher = (mudar: () => void) => () => {
    setEscolheu(true);
    mudar();
  };
  // Os dias do agendador são de terça (2) a sábado (6).
  const numero = (nome: string) => (agendador.dias.indexOf(nome) + 2) as Dia;
  const nomeDe = (d: Dia) => agendador.dias[d - 2];
  const { avisos } = agendador;

  /** Dia, período ou profissional: o pedido corrigido para o possível, com a troca anunciada. */
  const pedir = (novo: Partial<{ dia: string; periodo: string; profissional: string }>) => () => {
    const quer = { dia, periodo, profissional, ...novo };
    const quem = equipe.pessoas.find((p) => p.id === quer.profissional);
    const certo = corrigirPedido({ dia: numero(quer.dia), periodo: quer.periodo }, expediente, agendador.periodos, quem?.dias);
    const diaCerto = nomeDe(certo.dia);
    const trocas = [];
    if (quem && diaCerto !== quer.dia) trocas.push(`${quem.nome.split(" ")[0]} ${avisos.naoAtende} ${naDia(quer.dia)}: ${avisos.ficaPara} ${diaCerto.toLowerCase()}.`);
    if (certo.periodo !== quer.periodo)
      trocas.push(`${maiuscula(naDia(diaCerto))}, ${avisos.semAtendimento} de ${quer.periodo.toLowerCase()}: ${avisos.ficaPara} a ${certo.periodo.toLowerCase()}.`);
    setEscolheu(true);
    setProfissional(quer.profissional);
    setDia(diaCerto);
    setPeriodo(certo.periodo);
    setAviso(trocas.join(" "));
  };

  useLayoutEffect(() => {
    const lerEndereco = () => {
      const pedido = window.location.hash.match(/^#servico-(.+)$/)?.[1];
      if (pedido && servicos.itens.some((s) => s.id === pedido)) setServico(pedido);
    };
    lerEndereco();
    window.addEventListener("hashchange", lerEndereco);
    return () => window.removeEventListener("hashchange", lerEndereco);
  }, [servicos.itens]);

  // O pedido padrão: o primeiro horário livre pelo relógio da casa, uma vez, antes de qualquer escolha; e a data de cada dia.
  useLayoutEffect(() => {
    const agora = horaDeNiteroi();
    setDatas(proximasDatas(agora, expediente, feriadosNacionais, agendador.periodos));
    const proximo = proximoPedido(agora, expediente, feriadosNacionais, agendador.periodos);
    const nome = proximo && agendador.dias[proximo.dia - 2];
    if (!proximo || !nome) return;
    setDia(nome);
    setPeriodo(proximo.periodo);
  }, [expediente, agendador]);

  // A ficha ao lado do título é a do serviço escolhido (os ids dos serviços são os das fichas do palco).
  useLayoutEffect(() => {
    document.querySelector<HTMLElement>("[data-abertura-agendar]")?.setAttribute("data-objeto", servico);
  }, [servico]);

  const escolhido = servicos.itens.find((s) => s.id === servico)!;
  const pessoa = equipe.pessoas.find((p) => p.id === profissional);
  const cabem = periodosDoDia(numero(dia), expediente, agendador.periodos);
  const diaDoMes = (nome: string) => {
    const data = datas[numero(nome)];
    return data ? String(Number(data.slice(8, 10))) : "";
  };
  // shortcut: o motivo diz "de X a Y", certo para dias seguidos (o Rui); com folga no meio da semana, listar os dias.
  const restricao = pessoa && agendador.dias.some((d) => !pessoa.dias.includes(numero(d))) &&
    `${pessoa.nome.split(" ")[0]} ${avisos.atende} de ${nomeDe(Math.min(...pessoa.dias) as Dia).toLowerCase()} a ${nomeDe(Math.max(...pessoa.dias) as Dia).toLowerCase()}.`;
  const resumo = `${escolhido.nome}${pessoa ? `, ${agendador.com} ${pessoa.nome}` : ""}, ${dia.toLowerCase()}${diaDoMes(dia) ? `, ${agendador.diaDoMes} ${diaDoMes(dia)}` : ""}, de ${periodo.toLowerCase()}.`;
  const mensagem = `${agendador.mensagem}: ${resumo}`;
  // A frase do bilhete só entra animada depois da primeira escolha de quem usa: na carga (e na chegada com
  // #servico-<id>), ela pinta parada.
  const reimpresso = escolheu || undefined;
  const vinculo = `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensagem)}`;

  const grupo = (titulo: string, filhos: React.ReactNode, nota?: React.ReactNode) => (
    <fieldset>
      <legend className={rotulo}>{titulo}</legend>
      <div className="mt-3 grid gap-2">{filhos}</div>
      {nota}
    </fieldset>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr]">
      <div className="grid gap-8">
        {grupo(
          agendador.rotulos.servico,
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {servicos.itens.map((s) => (
              <label key={s.id} className="relative">
                <input type="radio" name={`${id}-s`} checked={servico === s.id} onChange={escolher(() => setServico(s.id))} className={radio} />
                <span className={`${opcao} bb-opcao-servico`}>
                  {/* A ficha do serviço, de face e apagada; a da opção escolhida acende e vira de frente (barbearia.css). Lisa: o preço está logo abaixo. */}
                  <MiniFicha objeto={s.objeto} gravar={false} className="bb-opcao-ficha mb-2 size-9" />
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
            {[{ id: "", nome: agendador.semPreferencia, especialidade: "", dias: [] as number[] }, ...equipe.pessoas].map((p) => (
              <label key={p.id || "qualquer"} className="relative">
                <input type="radio" name={`${id}-p`} checked={profissional === p.id} onChange={pedir({ profissional: p.id })} className={radio} />
                <span className={opcao}>
                  <span className="text-[15px] leading-tight font-medium">{p.nome}</span>
                  {p.especialidade && <span className="mt-0.5 text-[12px] tracking-[0.12em] text-accent uppercase">{p.especialidade}</span>}
                  {/* Quem não atende no dia escolhido (escolhê-lo leva o pedido ao dia seguinte em que atende, com aviso). */}
                  {p.id && !p.dias.includes(numero(dia)) && (
                    <span className="mt-1 text-[12px] leading-snug text-muted-foreground">
                      {maiuscula(avisos.naoAtende)} {naDia(dia)}
                    </span>
                  )}
                </span>
              </label>
            ))}
          </div>,
        )}
        <div>
          {/* Abaixo de 640 px, o dia e o período um embaixo do outro; os dias com 2 px entre si (4 px a partir de 640): a 320 px, cada um com 44,8 px. */}
          <div className="grid gap-8 sm:grid-cols-[1.4fr_1fr]">
            {grupo(
              agendador.rotulos.dia,
              <div className="grid grid-cols-5 gap-0.5 sm:gap-1">
                {agendador.dias.map((d) => (
                  <label key={d} className="relative">
                    <input
                      type="radio"
                      name={`${id}-d`}
                      checked={dia === d}
                      disabled={!!pessoa && !pessoa.dias.includes(numero(d))}
                      aria-describedby={restricao ? `${id}-restricao` : undefined}
                      onChange={pedir({ dia: d })}
                      className={radio}
                    />
                    {/* O dia e a data que ele quer dizer ("SEX 16"); até a hidratação, a linha da data fica reservada. */}
                    <span className={`${opcao} items-center px-1`}>
                      <span className="text-[13px] tracking-[0.08em] uppercase">{d.slice(0, 3)}</span>
                      <span className="bb-exibicao text-[22px] leading-none">{diaDoMes(d) || " "}</span>
                    </span>
                  </label>
                ))}
              </div>,
              restricao && (
                <p id={`${id}-restricao`} className="mt-2 text-[12.5px] leading-snug text-muted-foreground">
                  {restricao}
                </p>
              ),
            )}
            {grupo(
              agendador.rotulos.periodo,
              <div className="grid grid-cols-3 gap-1">
                {agendador.periodos.map((p) => (
                  <label key={p.nome} className="relative">
                    <input
                      type="radio"
                      name={`${id}-h`}
                      checked={periodo === p.nome}
                      disabled={!cabem.some((c) => c.nome === p.nome)}
                      onChange={pedir({ periodo: p.nome })}
                      className={radio}
                    />
                    {/* A faixa de horas à vista (até 16/10, só no title, que o toque não mostra). */}
                    <span className={`${opcao} items-center px-1 text-center`}>
                      <span className="text-[13px]">{p.nome}</span>
                      <span className="text-[11.5px] whitespace-nowrap text-muted-foreground tabular-nums">{p.faixa}</span>
                    </span>
                  </label>
                ))}
              </div>,
            )}
          </div>
          {/* A troca que o agendador fez, anunciada (a região existe desde a carga, para o leitor de tela ouvir a mudança). */}
          <p role="status" className="mt-3 text-[13.5px] leading-snug text-accent">
            {aviso}
          </p>
        </div>
      </div>

      {/* O pedido, como um bilhete de latão. */}
      <div className={bilhete} aria-live="polite">
        <div>
          <p className="bb-rotulo text-accent">{agendador.resumo}</p>
          <p key={resumo} data-reimpresso={reimpresso} className="bb-bilhete-frase bb-exibicao mt-5 text-[clamp(32px,3.2vw,48px)] leading-[1.04]">
            {resumo}
          </p>
          <p className="mt-5 text-[14px] text-muted-foreground tabular-nums">
            R$ {escolhido.preco} · {escolhido.duracao}
          </p>
        </div>
        <div>
          <a
            href={vinculo}
            target="_blank"
            rel="noopener noreferrer"
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
const porExtenso = (data: string) => new Date(`${data}T00:00:00Z`).toLocaleDateString("pt-BR", { day: "numeric", month: "long", timeZone: "UTC" });

/**
 * Funcionalidade 2 do plano Completo: a agenda de retorno. O tipo de corte
 * e a data do último atendimento devolvem a janela sugerida para o
 * próximo (Degradê 12–18 dias, Social 21–30, Tesoura 35–45, Barba
 * 10–15), com a régua dos dias até lá. "Agendar o retorno" leva à página
 * do agendador com o serviço marcado. A data de hoje só existe no
 * aparelho: até a hidratação, o campo fica vazio e o bilhete mostra o
 * esqueleto (dm-esqueleto, app/demos/demos.css) no lugar da janela, do
 * estado e da régua, com aria-busy. Até 03/10, mostrava "…" e uma régua
 * sem o dia. Desde o fechamento com o Impeccable (16/10), o campo vazio (ou
 * a data incompleta) tira a régua e pede "Informe a data do último corte."; a
 * data depois de hoje (o max do campo não impede a digitada) diz "A data não
 * pode ser depois de hoje." e marca o campo (aria-invalid); e a janela que já
 * fechou diz o que fazer ("Agende o primeiro horário livre."). As regras
 * ficam em lib/demos/barbearia/pedido.ts (estadoDoRetorno), com teste.
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
  const e = dados.estados;
  const situacao = hoje ? estadoDoRetorno(ultimo, paraEntrada(hoje), corte.minimo, corte.maximo) : null;
  const janela = situacao && "inicio" in situacao ? situacao : null;
  const problema = situacao?.tipo === "vazio" ? e.vazio : situacao?.tipo === "futuro" ? e.futuro : "";
  const dias = (n: number) => `${n} ${n === 1 ? e.dia : e.dias}`;
  let estado = "";
  if (janela?.tipo === "antes") estado = `${e.antes} ${dias(janela.dias)}.`;
  else if (janela?.tipo === "aberta") estado = e.hoje;
  else if (janela?.tipo === "passou") estado = `${e.passou} ${dias(janela.dias)}. ${e.passouAcao}`;
  // A régua: do último corte até o fim da janela, com o hoje marcado.
  const total = corte.maximo + 4;
  const passados = janela ? Math.min(total, janela.passados) : 0;

  return (
    // Uma coluna em todas as larguras (correção de 14/10): na mesa, o painel fica à direita do título, e o bilhete, embaixo do formulário.
    <div className="grid gap-10">
      <div className="grid content-start gap-8">
        <fieldset>
          <legend className={rotulo}>{dados.rotulos.corte}</legend>
          {/* Abaixo de 640 px (desde 16/10; o crítico de fora: o Agendar e o Retorno abriam iguais no celular, com a
              mesma grade 2 × 2 de opções em caixa), os cortes são uma lista em linhas, como a tabela da casa: o nome à
              esquerda, a janela à direita, e a escolha marcada pelo ponto e pelo fio de latão (barbearia.css, .bb-corte). */}
          <div className="bb-cortes mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {dados.cortes.map((c) => (
              <label key={c.id} className="relative">
                <input type="radio" name={`${id}-c`} checked={corteId === c.id} onChange={() => setCorteId(c.id)} className={radio} />
                <span className={`${opcao} bb-corte`}>
                  <span className="bb-corte-nome bb-exibicao text-[24px] leading-tight">{c.nome}</span>
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
          {/* O foco padrão do site (desde 16/10; até então, outline-none e um anel de 30%, fora do sistema). */}
          <input
            type="date"
            value={ultimo}
            max={hoje ? paraEntrada(hoje) : undefined}
            onChange={(ev) => setUltimo(ev.target.value)}
            aria-invalid={situacao?.tipo === "futuro" || undefined}
            aria-describedby={problema ? `${id}-problema` : undefined}
            className="mt-3 block w-full rounded-[16px] border border-border bg-background/40 px-4 py-3.5 text-[16px] text-foreground transition-[border-color] duration-300 hover:border-input focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-invalid:border-accent"
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
            ) : janela ? (
              <>
                {porExtenso(janela.inicio)}
                <span className="text-muted-foreground italic"> a </span>
                {porExtenso(janela.fim)}
              </>
            ) : (
              <span id={`${id}-problema`} className="text-muted-foreground">
                {problema}
              </span>
            )}
          </p>
          <p className="mt-3 text-[14.5px] text-accent">
            {hoje ? estado : <span aria-hidden="true" className="dm-esqueleto inline-block h-[1em] w-48 max-w-full rounded-full align-middle" />}
          </p>
          {/* A régua dos dias: cada traço é um dia; em latão, a janela; o contorno é hoje. Sem o dia de hoje, só o esqueleto dos traços. Os traços com 2 px entre si (até 03/10, 3 px, fora da escala).
              Desde 14/10, a janela abre: cada dia tem o traço de base, parado, e o de latão, que sobe da base (scaleY e opacidade, 220 ms, varrendo da esquerda em até 80 ms; barbearia.css, .bb-regua). Até então, a altura e a cor saltavam, sem passagem.
              Sem data ou com data futura (desde 16/10), a régua some: ela mediria a partir de um dia que não existe. */}
          {(!hoje || janela) && (
            <div aria-hidden="true" className="bb-regua mt-8 flex h-10 items-end gap-0.5" style={{ "--total": total } as React.CSSProperties}>
              {Array.from({ length: total }, (_, d) => {
                if (!hoje) return <span key={d} className="dm-esqueleto h-1/2 flex-1 rounded-full" />;
                const naJanela = d >= corte.minimo && d <= corte.maximo;
                const ehHoje = d === passados;
                const contorno = ehHoje ? "outline-2 outline-offset-2 outline-accent" : "";
                return (
                  <span key={d} className="relative h-full flex-1" style={{ "--d": d } as React.CSSProperties}>
                    <span className={`absolute inset-x-0 bottom-0 h-1/2 rounded-full bg-foreground/20 ${naJanela ? "" : contorno}`} />
                    <span data-aberto={naJanela || undefined} className={`bb-regua-latao absolute inset-0 rounded-full bg-primary ${naJanela ? contorno : ""}`} />
                  </span>
                );
              })}
            </div>
          )}
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
