"use client";

import { useId, useState } from "react";

import { CopyButton } from "@/components/ui/spell/copy-button";

import type { depositoSite } from "@/conteudo/demos/deposito";

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
const formatar = (valor: number) => valor.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
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
 */
export function CalculadoraDeMateriais({ dados, whatsapp }: { dados: Calculadora; whatsapp: string }) {
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
  const itens = servico.itens.map((item) => {
    const bruto = item.porM2 * area * perda.valor;
    return { ...item, quantidade: item.inteiro ? Math.ceil(bruto - 1e-9) : Math.ceil(bruto * 100) / 100 };
  });
  const [principal, ...demais] = itens;
  /** O número no cupom; sem as duas medidas, um traço (nunca um zero que parece resultado). */
  const noCupom = (valor: number) => (valida ? formatar(valor) : "—");

  const mensagem = [
    `${dados.mensagem} para ${servico.nome.toLowerCase()} (${formatar(area)} m², com ${perda.rotulo} de perda):`,
    ...itens.map((item) => `- ${formatar(item.quantidade)} ${item.unidade}: ${item.nome}`),
  ].join("\n");
  const vinculo = `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensagem)}`;

  return (
    <div className="grid items-start gap-0 lg:grid-cols-[1.12fr_1fr]">
      {/* A máquina: as escolhas. A máquina e o cupom com o mesmo recuo, 28/40 px (até 03/10, o cupom tinha 28/36 nos lados e 32 em cima). */}
      <div className="dp-grafite relative p-7 md:p-10">
        <span aria-hidden="true" className="vd-zebrada absolute inset-x-0 top-0 h-2" />
        {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((lugar) => (
          <span key={lugar} aria-hidden="true" className={`dp-parafuso absolute ${lugar}`} />
        ))}
        <p className="dp-codigo mt-3 flex items-center justify-between gap-4 text-muted-foreground">
          <span>{dados.rotulos.painel}</span>
          <span>EGH-CALC</span>
        </p>

        {/* O serviço marcado é o que recebe o foco (as setas do teclado mudam os dois): sobre o laranja, o contorno do foco sai em grafite (até 03/10, laranja sobre laranja, não se via). */}
        <fieldset className="mt-8">
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
                <span className="dp-exibicao -mr-px -mb-px flex min-h-14 items-center justify-center border border-foreground/25 text-[15px] tracking-[0.06em] text-muted-foreground transition-colors duration-300 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:outline-2 peer-focus-visible:-outline-offset-4 peer-focus-visible:outline-ring hover:text-foreground peer-checked:hover:text-primary-foreground peer-checked:peer-focus-visible:outline-primary-foreground">
                  {s.nome}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* As medidas: sob o ponteiro, o fio clareia; inválida (não é número maior que zero), o fio e o número na cor de ação, e aria-invalid. */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {dados.medidas.map((medida, i) => (
            <label
              key={medida.id}
              className="relative block overflow-hidden border border-foreground/25 bg-deep px-4 pt-3 pb-6 transition-[border-color,box-shadow] duration-300 focus-within:ring-2 focus-within:ring-ring hover:border-foreground/50 has-aria-invalid:border-accent"
            >
              <span className={`block ${rotulo}`}>{medida.rotulo}</span>
              <span className="mt-1.5 flex items-baseline gap-1.5">
                <input
                  type="text"
                  inputMode="decimal"
                  value={medidas[i]}
                  aria-invalid={lidas[i] === null || undefined}
                  onChange={(e) => setMedidas((atual) => atual.map((v, j) => (j === i ? e.target.value : v)))}
                  className="dp-exibicao w-full min-w-0 bg-transparent text-[40px] leading-none tabular-nums outline-none aria-invalid:text-accent"
                />
                <span className="dp-mono text-[15px] text-muted-foreground">{medida.unidade}</span>
              </span>
              <span aria-hidden="true" className="vd-trena absolute inset-x-0 bottom-0 h-[10px]" />
            </label>
          ))}
        </div>

        <fieldset className="mt-6">
          <legend className={rotulo}>{dados.rotulos.perda}</legend>
          <div className="mt-3 grid grid-cols-3">
            {dados.perdas.map((p, i) => (
              <label key={p.rotulo} className="cursor-pointer">
                <input type="radio" name={`${id}-perda`} checked={i === perdaIndice} onChange={() => setPerdaIndice(i)} className="peer sr-only" />
                <span className="-mr-px flex min-h-16 flex-col items-center justify-center border border-foreground/25 px-2 py-2 text-center transition-colors duration-300 peer-checked:border-primary peer-checked:bg-primary/15 peer-focus-visible:outline-2 peer-focus-visible:-outline-offset-4 peer-focus-visible:outline-ring hover:border-foreground/50">
                  <span className="dp-exibicao text-[20px] leading-none tabular-nums">{p.rotulo}</span>
                  <span className="mt-1 text-[12px] leading-tight text-muted-foreground">{p.detalhe}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* O cupom: a lista impressa, com a borda serrilhada (embaixo, o recuo mais o dente de 10 px) e a sombra de 60 px a 45% (saiu em 03/10 pela regra 3 das Diretrizes de Design Premium e voltou no mesmo dia, a pedido do usuário). A máscara da serrilha recorta a sombra, que não aparece na tela. */}
      <div className="dp-serrilha bg-card p-7 pb-10 text-card-foreground shadow-[0_30px_60px_-30px_rgb(21_25_30/0.45)] md:p-10 md:pb-12 lg:mt-10 lg:-ml-3" aria-live="polite">
        <p className="dp-codigo text-center">{dados.rotulos.cupom}</p>
        <p className="dp-mono mt-1 text-center text-[12px] text-muted-foreground">Depósito Engenhoca · EGH</p>
        <p className="dp-mono mt-5 border-y border-dashed border-foreground/40 py-3 text-[12.5px] leading-relaxed">
          {servico.nome.toUpperCase()} · {dados.rotulos.area.toUpperCase()} {noCupom(area)} M²
          <br />
          {perda.rotulo} · {noCupom(area * perda.valor)} M² {dados.rotulos.comPerda.toUpperCase()}
        </p>
        <p className="mt-6 flex items-end gap-4">
          <span className="dp-exibicao text-[clamp(64px,6.4vw,96px)] leading-[0.8] font-bold tabular-nums">{noCupom(principal.quantidade)}</span>
          <span className="pb-0.5">
            <span className="dp-exibicao block text-[20px] leading-none text-accent">{principal.unidade}</span>
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
          className="dp-chanfro dp-botao dp-exibicao mt-7 flex min-h-14 items-center justify-center gap-3 bg-primary px-5 text-[17px] tracking-[0.05em] text-primary-foreground"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
            <path d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.3-1.4A10 10 0 1 0 12 2Zm0 2a8 8 0 1 1-4.2 14.8l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 0 1 12 4Zm-2.9 4.1c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.1 0 1.3.9 2.5 1 2.7.1.2 1.8 2.9 4.5 4 2.2.9 2.7.7 3.2.7.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3l-1.9-.9c-.3-.1-.5-.2-.7.1l-1 1.2c-.2.2-.3.2-.6.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4 0-.5.1-.7l.6-.8c.1-.2.1-.4 0-.6L9.7 8.5c-.2-.4-.4-.4-.6-.4Z" />
          </svg>
          {dados.acao}
        </a>
        {/* A mesma lista, para colar onde quiser (Spell UI, Copy Button; desde 03/10); sem as duas medidas, desabilitado, como o envio. */}
        <CopyButton valor={mensagem} disabled={!valida} rotulo={dados.copiar} confirmado={dados.copiado} className="mt-3 w-full dp-exibicao flex min-h-14 cursor-pointer items-center justify-center gap-2.5 border border-foreground/40 px-6 text-[17px] tracking-[0.05em] transition-[border-color,background-color] duration-300 enabled:hover:border-foreground active:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed" />
        <p className="mt-4 text-[13px] leading-snug text-muted-foreground">{dados.nota}</p>
      </div>
    </div>
  );
}
