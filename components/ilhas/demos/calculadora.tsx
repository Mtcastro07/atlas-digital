"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { CopyButton } from "@/components/ui/spell/copy-button";

import type { depositoSite } from "@/conteudo/demos/deposito";
import { formatar, listaDoServico } from "@/lib/demos/deposito/conta";

type Calculadora = (typeof depositoSite)["calculadora"];

const rotulo = "dp-codigo text-muted-foreground";

/**
 * A medida digitada, em metros (vírgula ou ponto); null se não for um
 * número maior que zero. Até 03/10, o texto que não era número virava 0 em
 * silêncio ("3 m", "abc"), e a lista saía zerada.
 */
const lerMedida = (texto: string) => {
  const limpo = texto.trim().replace(",", ".");
  const valor = Number(limpo);
  return limpo !== "" && Number.isFinite(valor) && valor > 0 ? valor : null;
};
const formatarMedida = (valor: number) => valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * A calculadora de materiais do Depósito Engenhoca, a funcionalidade sob
 * medida do plano Profissional: uma máquina de grafite (serviço, medidas
 * sobre a trena e perda) que imprime a lista num cupom de conferência, com
 * os índices de consumo do balcão (conteudo/demos/deposito.ts). Sacos e
 * unidades sobem para o inteiro; metro cúbico fica com duas casas. A lista
 * vira a mensagem do WhatsApp. Nada é registrado. Medida que não é número
 * maior que zero fica marcada como inválida, o cupom mostra traços no lugar
 * das quantidades e o envio fica desabilitado até as duas medidas valerem.
 *
 * 16.10.2026 (Impeccable, harden e clarify): o campo inválido diz o que fazer
 * ("Use um número maior que zero, como 4,80"), com o sinal de advertência
 * além da cor, ligado por aria-describedby; a região viva anuncia só o total
 * (até ali, o cupom inteiro, a cada tecla); e o cupom leva a lista ao talão
 * do orçamento (`orcamento`), pelo parâmetro `lista` da URL: nada é guardado.
 */
export function CalculadoraDeMateriais({ dados, whatsapp, orcamento }: { dados: Calculadora; whatsapp: string; orcamento: string }) {
  const id = useId();
  const [servicoId, setServicoId] = useState(dados.servicos[0].id);
  const [medidas, setMedidas] = useState(dados.medidas.map((m) => formatarMedida(m.inicial)));
  const [perdaIndice, setPerdaIndice] = useState(dados.perdaInicial);

  const servico = dados.servicos.find((s) => s.id === servicoId)!;
  const perda = dados.perdas[perdaIndice];
  const lidas = medidas.map(lerMedida);
  const [largura, comprimento] = lidas;
  const valida = largura !== null && comprimento !== null;
  const area = valida ? largura * comprimento : 0;
  const itens = listaDoServico(servico, area, perda.valor);
  const [principal, ...demais] = itens;

  // "O cupom reimprime" (14.10.2026, pedido do usuário de não repetir efeitos em série): quando o serviço ou a perda
  // mudam pelo ponteiro ou pelo toque, o número principal e a unidade descem 0,12 em e assentam em 160 ms, o tique da
  // impressora; as linhas de baixo trocam secas. Pelo teclado (as setas nos rádios) e pela digitação das medidas, a
  // troca é seca (09-movimento, seção 2: 0 ms no teclado). A primeira pintura não anima; com movimento reduzido, nada.
  const modalidade = useRef<"ponteiro" | "teclado">("teclado");
  const numeroRef = useRef<HTMLSpanElement>(null);
  const unidadeRef = useRef<HTMLSpanElement>(null);
  const visorRef = useRef<HTMLSpanElement>(null);
  const primeira = useRef(true);
  useEffect(() => {
    if (primeira.current) {
      primeira.current = false;
      return;
    }
    if (modalidade.current !== "ponteiro" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (const el of [numeroRef.current, unidadeRef.current, visorRef.current])
      el?.animate([{ transform: "translateY(-0.12em)", opacity: 0.4 }, { transform: "none", opacity: 1 }], { duration: 160, easing: "cubic-bezier(0.2, 0, 0, 1)" });
  }, [servicoId, perdaIndice]);
  const peloPonteiro = () => (modalidade.current = "ponteiro");
  /** O número no cupom; sem as duas medidas, um traço (nunca um zero que parece resultado). */
  const noCupom = (valor: number) => (valida ? formatar(valor) : "—");

  const cabeca = `${servico.nome}, ${formatar(area)} m², com ${perda.rotulo} de perda:`;
  const linhas = itens.map((item) => `- ${formatar(item.quantidade)} ${item.unidade}: ${item.nome}`);
  const mensagem = [`${dados.mensagem} para ${servico.nome.toLowerCase()} (${formatar(area)} m², com ${perda.rotulo} de perda):`, ...linhas].join("\n");
  const vinculo = `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensagem)}`;
  // A lista vai ao "O que precisa" do talão (pedido-por-mensagem.tsx), sem a saudação, que o talão já tem.
  const paraOOrcamento = `${orcamento}?lista=${encodeURIComponent([cabeca, ...linhas].join("\n"))}`;
  const erroDe = (i: number) => `${dados.erroMedida} ${formatarMedida(dados.medidas[i].inicial)}.`;
  const primeiraInvalida = lidas.findIndex((v) => v === null);

  return (
    // grid-cols-1 (minmax(0, 1fr)): sem ele, a coluna crescia até a largura mínima do visor e a página rolava 5 px de lado a 320 px (régua de 15.10).
    <div className="grid grid-cols-1 items-start gap-0 lg:grid-cols-[1.12fr_1fr]">
      {/* A máquina: as escolhas. A máquina e o cupom com o mesmo recuo, 28/40 px (até 03/10, o cupom tinha 28/36 nos lados e 32 em cima). Abaixo de 375 px, 20 px nos lados (15.10, com a coluna presa à tela): com 28, o "4,80" das medidas se cortava a 320 e a 340 px. */}
      <div className="dp-grafite relative p-7 max-[374px]:px-5 md:p-10" onKeyDown={() => (modalidade.current = "teclado")}>
        <span aria-hidden="true" className="vd-zebrada absolute inset-x-0 top-0 h-2" />
        {/* Abaixo de 1024 px, sem o par de baixo: a boca do cupom vem logo embaixo, com o seu par, e os dois ficavam empilhados (16.10.2026, Impeccable). */}
        {["top-4 left-4", "top-4 right-4", "bottom-4 left-4 max-lg:hidden", "bottom-4 right-4 max-lg:hidden"].map((lugar) => (
          <span key={lugar} aria-hidden="true" className={`dp-parafuso absolute ${lugar}`} />
        ))}
        {/* O código da máquina numa linha só (16.10.2026: a 320 px, partia no hífen, "EGH-" / "CALC"); o nome do painel é que quebra. */}
        <p className="dp-codigo mt-3 flex items-start justify-between gap-4 text-muted-foreground">
          <span>{dados.rotulos.painel}</span>
          <span className="whitespace-nowrap">EGH-CALC</span>
        </p>
        {/* O visor da balança (15.10.2026, crítico de fora): abaixo de 1024 px, o cupom fica embaixo da máquina, fora da tela de quem toca no serviço (o número a ~1.000 px, a 390 × 844); o visor mostra o número principal ali, onde o dedo está, e reimprime com ele. Na mesa, o cupom está ao lado e o visor não aparece. Fica fora da árvore de acessibilidade: o cupom é a região viva. O laranja sobre o grafite fundo: 5,4:1. */}
        {/* Sem o corte do nome do serviço (16.10.2026: a 320 e a 340 px, "ALVENAR…"): onde o nome e o número não cabem na mesma linha, o número desce para a de baixo, à direita. */}
        <p aria-hidden="true" className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border border-foreground/25 bg-deep px-4 py-3 lg:hidden">
          <span className="dp-codigo text-[11px] text-muted-foreground">{servico.nome}</span>
          <span className="ml-auto flex flex-none items-baseline gap-2 text-primary">
            <span ref={visorRef} className="dp-mono inline-block text-[34px] leading-none">
              {noCupom(principal.quantidade)}
            </span>
            <span className="dp-codigo text-[11px]">{principal.unidade}</span>
          </span>
        </p>

        {/* O serviço marcado é o que recebe o foco (as setas do teclado mudam os dois): sobre o laranja, o contorno do foco sai em grafite (até 03/10, laranja sobre laranja, não se via). A escolha troca seca (16.10.2026, crítico de fora: até ali, as cores cruzavam em 300 ms, fora da curva do site e acima dos 120 ms do toque, com os dois botões meio acesos no meio; e animava a cor de fundo, fora do freio): quem responde ao toque é o visor e o cupom, que reimprimem. */}
        <fieldset className="mt-8" onPointerDown={peloPonteiro}>
          <legend className={rotulo}>{dados.rotulos.servico}</legend>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4">
            {dados.servicos.map((s) => (
              <label key={s.id} className="relative cursor-pointer">
                <input
                  type="radio"
                  name={`${id}-servico`}
                  value={s.id}
                  checked={s.id === servicoId}
                  onChange={() => setServicoId(s.id)}
                  className="peer sr-only"
                />
                <span className="dp-exibicao -mr-px -mb-px flex min-h-14 items-center justify-center border border-foreground/25 text-[15px] tracking-[0.06em] text-muted-foreground peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:outline-2 peer-focus-visible:-outline-offset-4 peer-focus-visible:outline-ring hover:text-foreground peer-checked:hover:text-primary-foreground peer-checked:peer-focus-visible:outline-primary-foreground">
                  {s.nome}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* As medidas: sob o ponteiro, o fio clareia; inválida (não é número maior que zero), o fio e o número na cor de ação, e aria-invalid. Os números ficam no pé da casa (mt-auto, 16.10.2026): a 320 px, "Altura ou comprimento" ocupa duas linhas e o 2,70 ficava mais baixo que o 4,80. */}
        {/* O erro sob o campo (16.10.2026, Impeccable): cada medida ocupa duas linhas da grade (subgrid), a casa e a frase; as casas ficam da mesma altura, com ou sem erro ao lado. A frase leva o sinal de advertência, além da cor. */}
        <div className="mt-6 grid grid-cols-2 gap-x-3">
          {dados.medidas.map((medida, i) => {
            const invalida = lidas[i] === null;
            const erroId = `${id}-erro-${medida.id}`;
            return (
              <div key={medida.id} className="row-span-2 grid grid-rows-subgrid">
                <label className="relative flex flex-col overflow-hidden border border-foreground/25 bg-deep px-4 pt-3 pb-6 max-[374px]:px-3 transition-[border-color,box-shadow] duration-300 focus-within:ring-2 focus-within:ring-ring hover:border-foreground/50 has-aria-invalid:border-accent">
                  {/* Abaixo de 340 px, sem o espaçamento das letras: "COMPRIMENTO" (94 px) não cabia na casa. */}
                  <span className={`block ${rotulo} max-[339px]:tracking-normal!`}>{medida.rotulo}</span>
                  <span className="mt-auto flex items-baseline gap-1.5 pt-1.5">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={medidas[i]}
                      aria-invalid={invalida || undefined}
                      aria-describedby={invalida ? erroId : undefined}
                      onChange={(e) => setMedidas((atual) => atual.map((v, j) => (j === i ? e.target.value : v)))}
                      className="dp-exibicao w-full min-w-0 bg-transparent text-[40px] leading-none outline-none aria-invalid:text-accent"
                    />
                    <span className="dp-mono text-[15px] text-muted-foreground">{medida.unidade}</span>
                  </span>
                  <span aria-hidden="true" className="vd-trena absolute inset-x-0 bottom-0 h-[10px]" />
                </label>
                {invalida && (
                  <p id={erroId} className="mt-2.5 flex gap-2 text-[13.5px] leading-snug text-accent">
                    <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-px size-4 flex-none">
                      <path d="M8 1.75 15 14.25H1Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M8 6.25v3.5" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="8" cy="11.9" r="0.95" fill="currentColor" />
                    </svg>
                    {erroDe(i)}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <fieldset className="mt-6" onPointerDown={peloPonteiro}>
          <legend className={rotulo}>{dados.rotulos.perda}</legend>
          <div className="mt-3 grid grid-cols-3">
            {dados.perdas.map((p, i) => (
              <label key={p.rotulo} className="cursor-pointer">
                <input type="radio" name={`${id}-perda`} checked={i === perdaIndice} onChange={() => setPerdaIndice(i)} className="peer sr-only" />
                <span className="-mr-px flex min-h-16 flex-col items-center justify-center border border-foreground/25 px-2 py-2 text-center peer-checked:border-primary peer-checked:bg-primary/15 peer-focus-visible:outline-2 peer-focus-visible:-outline-offset-4 peer-focus-visible:outline-ring hover:border-foreground/50">
                  <span className="dp-exibicao text-[20px] leading-none">{p.rotulo}</span>
                  <span className="mt-1 text-[12px] leading-tight text-muted-foreground">{p.detalhe}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* O cupom sai da boca da máquina (15.10.2026; até ali, na cena da conta da página inicial, que copiava esta página): o momento da Calculadora. A boca, de grafite com os parafusos, recorta o cupom, que é impresso uma vez: na mesa, na carga (está na primeira tela); abaixo de 1024 px, quando a boca entra na tela (o data-revelar, com a pose anulada; a pose é do cupom, em deposito.css). Com movimento reduzido e sem script, já impresso. */}
      <div data-revelar className="dp-boca lg:mt-10 lg:-ml-3">
        <div className="dp-grafite relative h-7">
          <span aria-hidden="true" className="dp-parafuso absolute top-[9px] left-3" />
          <span aria-hidden="true" className="dp-parafuso absolute top-[9px] right-3" />
        </div>
        {/* O invólucro recorta: o cupom sai de baixo da boca. Embaixo, a folga da sombra, que a serrilha recorta. */}
        <div className="overflow-hidden px-3 pb-10 sm:px-5">
          {/* O cupom: a lista impressa, com a borda serrilhada (embaixo, o recuo mais o dente de 10 px) e a sombra de 60 px a 45% (saiu em 03/10 pela regra 3 das Diretrizes de Design Premium e voltou no mesmo dia, a pedido do usuário). A máscara da serrilha recorta a sombra, que não aparece na tela. */}
          <div className="dp-cupom dp-serrilha bg-card p-7 pb-10 text-card-foreground shadow-[0_30px_60px_-30px_rgb(21_25_30/0.45)] md:p-10 md:pb-12">
            {/* A região viva anuncia só o total, ou o erro da medida (16.10.2026, Impeccable: até ali, o aria-live cobria o cupom inteiro e o relia a cada tecla). */}
            <p className="sr-only" aria-live="polite">
              {valida ? `${formatar(principal.quantidade)} ${principal.unidade}, ${principal.nome}` : erroDe(Math.max(primeiraInvalida, 0))}
            </p>
            <p className="dp-codigo text-center">{dados.rotulos.cupom}</p>
            <p className="dp-mono mt-1 text-center text-[12px] text-muted-foreground">Depósito Engenhoca · EGH</p>
            <p className="dp-mono mt-5 border-y border-dashed border-foreground/40 py-3 text-[12.5px] leading-relaxed">
              {servico.nome.toUpperCase()} · {dados.rotulos.area.toUpperCase()} {noCupom(area)} M²
              <br />
              {perda.rotulo} · {noCupom(area * perda.valor)} M² {dados.rotulos.comPerda.toUpperCase()}
            </p>
            <p className="mt-6 flex items-end gap-4">
              <span ref={numeroRef} className="dp-exibicao text-[clamp(64px,6.4vw,96px)] leading-[0.8] font-bold">
                {noCupom(principal.quantidade)}
              </span>
              <span className="pb-0.5">
                <span ref={unidadeRef} className="dp-exibicao block text-[20px] leading-none text-accent">
                  {principal.unidade}
                </span>
                <span className="mt-1.5 block text-[14px] leading-snug text-muted-foreground">{principal.nome}</span>
              </span>
            </p>
            <table className="dp-mono mt-6 w-full border-t border-dashed border-foreground/40 text-[13px]">
              <caption className="sr-only">{dados.rotulos.lista}</caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">{dados.rotulos.quantidade}</th>
                  <th scope="col">{dados.rotulos.material}</th>
                </tr>
              </thead>
              <tbody>
                {demais.map((item) => (
                  <tr key={item.nome} className="border-b border-dashed border-foreground/40">
                    <td className="py-3 pr-4 align-top whitespace-nowrap">
                      {noCupom(item.quantidade)} {item.unidade}
                    </td>
                    <td className="py-3 text-right">{item.nome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="dp-mono mt-3 text-right text-[12px] text-muted-foreground">
              {itens.length} {dados.rotulos.itens}
            </p>
            {/* Sem as duas medidas, o envio fica desabilitado: o vínculo perde o endereço (sai da ordem do Tab) e se declara indisponível. Até 03/10, enviava a lista zerada, com área 0. */}
            <a
              href={valida ? vinculo : undefined}
              target="_blank"
              rel="noopener noreferrer"
              role={valida ? undefined : "link"}
              aria-disabled={!valida || undefined}
              // Numa linha de 375 px em diante (16.10.2026, Impeccable: a 390, "Enviar lista pelo WhatsApp" quebrava em duas): abaixo de 640, 16 px, o espaçamento das letras e os recuos menores; abaixo de 375, as duas linhas equilibradas.
              className="dp-chanfro dp-botao dp-exibicao mt-7 flex min-h-14 items-center justify-center gap-2.5 bg-primary px-4 text-center text-[16px] tracking-[0.03em] text-balance text-primary-foreground sm:gap-3 sm:px-5 sm:text-[17px] sm:tracking-[0.05em]"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
                <path d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.3-1.4A10 10 0 1 0 12 2Zm0 2a8 8 0 1 1-4.2 14.8l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 0 1 12 4Zm-2.9 4.1c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.1 0 1.3.9 2.5 1 2.7.1.2 1.8 2.9 4.5 4 2.2.9 2.7.7 3.2.7.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3l-1.9-.9c-.3-.1-.5-.2-.7.1l-1 1.2c-.2.2-.3.2-.6.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4 0-.5.1-.7l.6-.8c.1-.2.1-.4 0-.6L9.7 8.5c-.2-.4-.4-.4-.6-.4Z" />
              </svg>
              {dados.acao}
            </a>
            {/* A mesma lista, para colar onde quiser (Spell UI, Copy Button; desde 03/10); sem as duas medidas, desabilitado, como o envio. */}
            <CopyButton valor={mensagem} disabled={!valida} rotulo={dados.copiar} confirmado={dados.copiado} className="mt-3 w-full dp-exibicao flex min-h-14 cursor-pointer items-center justify-center gap-2.5 border border-foreground/40 px-6 text-[17px] tracking-[0.05em] transition-[border-color,background-color] duration-300 enabled:hover:border-foreground active:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed" />
            {/* A lista vai ao talão do orçamento, já no "O que precisa" (16.10.2026, Impeccable: a ferramenta terminava no WhatsApp, sem o caminho para o pedido do site). Pela URL, nada é guardado; sem as duas medidas, desabilitado, como o envio. */}
            <p className="mt-2 text-center">
              {valida ? (
                <Link href={paraOOrcamento} className="dp-vinculo dp-exibicao inline-flex min-h-11 items-center text-[17px] tracking-[0.05em]">
                  {dados.levar}
                </Link>
              ) : (
                <a role="link" aria-disabled="true" className="dp-exibicao inline-flex min-h-11 cursor-not-allowed items-center text-[17px] tracking-[0.05em] text-muted-foreground">
                  {dados.levar}
                </a>
              )}
            </p>
            <p className="mt-4 text-[13px] leading-snug text-muted-foreground">{dados.nota}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
