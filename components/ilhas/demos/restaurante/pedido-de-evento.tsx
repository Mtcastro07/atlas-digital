"use client";

import { useId, useState } from "react";

import { IconeWhatsApp } from "@/components/icones";
import { CopyButton } from "@/components/ui/spell/copy-button";
import { vinculoDoWhatsapp } from "@/lib/demos/restaurante/pedido";

/**
 * O pedido de almoço para grupo da Cozinha do Ingá (a página Encomendas e eventos): a data, o número de pessoas e o
 * lugar viram uma mensagem para o WhatsApp. Nada é registrado (nichos/restaurante.md, seção 3, "Dado pessoal"): o
 * formulário só compõe a mensagem, que sai do aparelho. Sem script, a página traz o vínculo com a mensagem curta.
 */
export function PedidoDeEvento({
  numero,
  textos,
}: {
  numero: string;
  textos: { data: string; pessoas: string; onde: string; opcoes: readonly string[]; pedir: string; copiar: string; novaAba: string; mensagem: string; aCombinar: string };
}) {
  const id = useId();
  const [data, setData] = useState("");
  const [pessoas, setPessoas] = useState("");
  const [onde, setOnde] = useState(textos.opcoes[0]);
  const quando = data ? data.split("-").reverse().join("/") : textos.aCombinar;
  const mensagem = textos.mensagem.replace("{data}", quando).replace("{pessoas}", pessoas || textos.aCombinar).replace("{onde}", onde);
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-1.5" htmlFor={`${id}-data`}>
          <span className="rs-comanda-rotulo">{textos.data}</span>
          <input id={`${id}-data`} type="date" value={data} onChange={(e) => setData(e.target.value)} className="rs-campo" />
        </label>
        <label className="grid gap-1.5" htmlFor={`${id}-pessoas`}>
          <span className="rs-comanda-rotulo">{textos.pessoas}</span>
          <input id={`${id}-pessoas`} type="number" inputMode="numeric" min={10} max={40} value={pessoas} onChange={(e) => setPessoas(e.target.value)} className="rs-campo" />
        </label>
      </div>
      <fieldset>
        <legend className="rs-comanda-rotulo">{textos.onde}</legend>
        <div className="rs-escolhas">
          {textos.opcoes.map((o) => (
            <label key={o}>
              <input type="radio" name={`${id}-onde`} value={o} checked={onde === o} onChange={() => setOnde(o)} />
              <span>{o}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <p className="rs-recado" aria-live="polite">
        {mensagem}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <a href={vinculoDoWhatsapp(numero, mensagem)} target="_blank" rel="noopener noreferrer" className="rs-agata">
          <IconeWhatsApp className="size-5 flex-none" />
          {textos.pedir}
          <span className="sr-only">{textos.novaAba}</span>
        </a>
        <CopyButton valor={mensagem} rotulo={textos.copiar} className="rs-agata rs-agata-contorno" />
      </div>
    </div>
  );
}
