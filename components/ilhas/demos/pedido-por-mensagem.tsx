"use client";

import { useEffect, useId, useState } from "react";

import { CopyButton } from "@/components/ui/spell/copy-button";

import type { depositoSite } from "@/conteudo/demos/deposito";

type Orcamento = (typeof depositoSite)["orcamento"];

const rotulo = "dp-codigo flex items-baseline gap-2 text-muted-foreground";
/** A linha do talão: sob o ponteiro, o fio escurece; no foco, fica na cor de ação. */
const campo =
  "mt-2 w-full border-0 border-b-2 border-foreground/35 bg-transparent px-0 py-2.5 text-[18px] text-foreground outline-none transition-[border-color] duration-300 placeholder:text-muted-foreground hover:border-foreground/60 focus:border-accent";

/**
 * O formulário do plano Profissional, como um talão de pedido: campos
 * sobre linhas, o picote no topo. Sem o número de cada campo (01 a 04)
 * desde 16.10.2026: não é sequência, e o código em toda lista era a marca
 * que o kit já apontava neste talão (11-anti-ia, T10 e L5; crítico de fora). O pedido de orçamento vira
 * uma mensagem pronta para o WhatsApp do balcão. Nada é enviado a
 * servidor nem guardado; o vínculo abre o WhatsApp do próprio aparelho.
 * O mínimo de um pedido é o que se precisa (a lista): sem ela, o envio
 * fica desabilitado — nome e bairro seguem livres ("preencha o que
 * souber"). Até 03/10, o talão vazio era enviado só com a saudação.
 *
 * 16.10.2026 (Impeccable, harden e clarify): "O que precisa" se diz
 * obrigatório, e junto do envio desabilitado fica o que falta para liberá-lo;
 * o exemplo do campo passa à tinta apagada inteira (a 70%, 3,48:1). A lista
 * chega pronta da calculadora pelo parâmetro `lista` da URL (o cupom, "Levar
 * para o orçamento"): lida uma vez, ao abrir, sem nada guardado no aparelho.
 */
export function PedidoPorMensagem({ dados, whatsapp }: { dados: Orcamento; whatsapp: string }) {
  const id = useId();
  const [nome, setNome] = useState("");
  const [bairro, setBairro] = useState("");
  const [lista, setLista] = useState("");
  const [recebimento, setRecebimento] = useState(0);

  // Depois da hidratação (o servidor não vê a URL da página estática); o texto vai só para o valor do campo, com teto.
  useEffect(() => {
    const vinda = new URLSearchParams(window.location.search).get("lista");
    if (vinda) setLista(vinda.slice(0, 2000));
  }, []);

  const mensagem = [
    dados.mensagem,
    nome && `${dados.campos.nome}: ${nome}`,
    bairro && `${dados.campos.bairro}: ${bairro}`,
    `${dados.campos.recebimento}: ${dados.campos.opcoes[recebimento]}`,
    lista && `${dados.campos.lista}:\n${lista}`,
  ]
    .filter(Boolean)
    .join("\n");
  const vinculo = `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensagem)}`;
  const pronto = lista.trim() !== "";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (pronto) window.open(vinculo, "_blank", "noopener,noreferrer");
      }}
      className="grid gap-x-8 gap-y-7 sm:grid-cols-2"
    >
      <label className="block">
        <span className={rotulo}>
          {dados.campos.nome}
        </span>
        <input value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" className={campo} />
      </label>
      <label className="block">
        <span className={rotulo}>
          {dados.campos.bairro}
        </span>
        <input value={bairro} onChange={(e) => setBairro(e.target.value)} className={campo} />
      </label>
      <label className="block sm:col-span-2">
        <span className={rotulo}>
          {dados.campos.lista}
          <span className="tracking-normal normal-case">· {dados.campos.obrigatorio}</span>
        </span>
        <textarea
          value={lista}
          onChange={(e) => setLista(e.target.value)}
          required
          rows={4}
          placeholder={dados.campos.listaExemplo}
          className={`${campo} resize-none leading-[2.1] [background:repeating-linear-gradient(transparent_0_calc(2.1em-1px),color-mix(in_srgb,var(--foreground)_18%,transparent)_calc(2.1em-1px)_2.1em)]`}
        />
      </label>
      {/* A opção marcada (a que recebe o foco pelas setas) tem fundo de grafite: o contorno do foco sai na cor da cal (até 03/10, laranja escuro sobre grafite, 2,7:1). */}
      <fieldset className="sm:col-span-2">
        <legend className={rotulo}>
          {dados.campos.recebimento}
        </legend>
        <div className="mt-3 grid grid-cols-2">
          {dados.campos.opcoes.map((opcao, i) => (
            <label key={opcao} className="cursor-pointer">
              <input type="radio" name={`${id}-recebimento`} checked={i === recebimento} onChange={() => setRecebimento(i)} className="peer sr-only" />
              <span className="dp-exibicao -mr-px flex min-h-13 items-center justify-center gap-2.5 border border-foreground/35 px-3 text-[15px] tracking-[0.05em] transition-[color,background-color,border-color] duration-300 peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:outline-2 peer-focus-visible:-outline-offset-4 peer-focus-visible:outline-ring hover:border-foreground peer-checked:peer-focus-visible:outline-background">
                {opcao}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      {/* Sem script, o envio não funcionaria (o formulário só recarregaria a página): a fileira some (.dp-talao-acoes, deposito.css) e a página põe o botão do WhatsApp no lugar (<noscript>). Os rótulos ficam numa linha (14.10.2026: a régua acusava duas a 1440 px), e a nota desce para a linha de baixo quando não cabe ao lado. */}
      <div className="dp-talao-acoes flex flex-col gap-4 border-t border-dashed border-foreground/40 pt-7 sm:col-span-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        {/* Enviar e copiar (Spell UI, Copy Button; desde 03/10), os dois desabilitados até a lista ter alguma coisa. */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={!pronto}
            aria-describedby={pronto ? undefined : `${id}-falta`}
            className="dp-chanfro dp-botao dp-exibicao min-h-14 cursor-pointer bg-primary px-8 text-[17px] tracking-[0.05em] whitespace-nowrap text-primary-foreground disabled:cursor-not-allowed"
          >
            {dados.acao}
          </button>
          <CopyButton valor={mensagem} disabled={!pronto} rotulo={dados.copiar} confirmado={dados.copiado} className="dp-exibicao flex min-h-14 cursor-pointer items-center justify-center gap-2.5 border border-foreground/40 px-6 text-[17px] tracking-[0.05em] whitespace-nowrap transition-[border-color,background-color] duration-300 enabled:hover:border-foreground active:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed" />
        </div>
        <div className="max-w-[40ch] text-[14px] leading-snug">
          {/* O que falta para liberar o envio, junto dos botões desabilitados (16.10.2026, Impeccable). */}
          {!pronto && (
            <p id={`${id}-falta`} className="mb-1.5 font-semibold text-foreground">
              {dados.falta}
            </p>
          )}
          <p className="text-muted-foreground">{dados.nota}</p>
        </div>
      </div>
    </form>
  );
}
