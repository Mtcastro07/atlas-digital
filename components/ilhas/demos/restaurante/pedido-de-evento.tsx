"use client";

import { useId, useState } from "react";

import { IconeWhatsApp } from "@/components/icones";
import { conferirGrupo } from "@/components/ilhas/demos/restaurante/conferir-grupo";
import { CopyButton } from "@/components/ui/spell/copy-button";
import { horaDeNiteroi } from "@/lib/demos/relogio";
import { vinculoDoWhatsapp } from "@/lib/demos/restaurante/pedido";

/**
 * O pedido de almoço para grupo da Cozinha do Ingá (a página Encomendas e eventos): a data, o número de pessoas e o
 * lugar viram uma mensagem para o WhatsApp. Nada é registrado (nichos/restaurante.md, seção 3, "Dado pessoal"): o
 * formulário só compõe a mensagem, que sai do aparelho. Sem script, a página traz o vínculo com a mensagem curta.
 * O que a casa não aceita (menos de 10 ou mais de 40 pessoas, a data que já passou, o salão fora do sábado) ganha o
 * aviso junto do campo, e o envio fica desabilitado até corrigir (conferir-grupo.ts). A prévia da mensagem não é lida a
 * cada tecla: só os avisos são anunciados.
 */
export function PedidoDeEvento({
  numero,
  textos,
}: {
  numero: string;
  textos: {
    data: string;
    pessoas: string;
    onde: string;
    opcoes: readonly string[];
    pedir: string;
    copiar: string;
    novaAba: string;
    mensagem: string;
    aCombinar: string;
    avisos: { pessoas: string; data: string; sabado: string };
  };
}) {
  const id = useId();
  const [data, setData] = useState("");
  const [pessoas, setPessoas] = useState("");
  const [onde, setOnde] = useState(textos.opcoes[0]);
  const quando = data ? data.split("-").reverse().join("/") : textos.aCombinar;
  const mensagem = textos.mensagem.replace("{data}", quando).replace("{pessoas}", pessoas || textos.aCombinar).replace("{onde}", onde);
  // Só depois de escrever: os dois campos nascem vazios, e o servidor não sabe o dia do aparelho.
  const erro = conferirGrupo({ data, pessoas, noSalao: onde === textos.opcoes[0], hoje: data ? horaDeNiteroi().data : "" });
  const avisoDaData = erro.passada ? textos.avisos.data : erro.sabado ? textos.avisos.sabado : "";
  const avisoDasPessoas = erro.pessoas ? textos.avisos.pessoas : "";
  const enviavel = !avisoDaData && !avisoDasPessoas;
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid content-start gap-1.5">
          <label className="rs-comanda-rotulo" htmlFor={`${id}-data`}>
            {textos.data}
          </label>
          <input
            id={`${id}-data`}
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            aria-invalid={!!avisoDaData || undefined}
            aria-describedby={avisoDaData ? `${id}-data-aviso` : undefined}
            className="rs-campo"
          />
          <p id={`${id}-data-aviso`} aria-live="polite" className="rs-aviso-do-minimo">
            {avisoDaData}
          </p>
        </div>
        <div className="grid content-start gap-1.5">
          <label className="rs-comanda-rotulo" htmlFor={`${id}-pessoas`}>
            {textos.pessoas}
          </label>
          <input
            id={`${id}-pessoas`}
            type="number"
            inputMode="numeric"
            min={10}
            max={40}
            value={pessoas}
            onChange={(e) => setPessoas(e.target.value)}
            aria-invalid={!!avisoDasPessoas || undefined}
            aria-describedby={avisoDasPessoas ? `${id}-pessoas-aviso` : undefined}
            className="rs-campo"
          />
          <p id={`${id}-pessoas-aviso`} aria-live="polite" className="rs-aviso-do-minimo">
            {avisoDasPessoas}
          </p>
        </div>
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
      <p className="rs-recado">{mensagem}</p>
      <div className="flex flex-wrap items-center gap-3">
        {enviavel ? (
          <a href={vinculoDoWhatsapp(numero, mensagem)} target="_blank" rel="noopener noreferrer" className="rs-agata rs-agata-principal">
            <IconeWhatsApp className="size-5 flex-none" />
            {textos.pedir}
            <span className="sr-only">{textos.novaAba}</span>
          </a>
        ) : (
          <span role="link" aria-disabled="true" className="rs-agata">
            <IconeWhatsApp className="size-5 flex-none" />
            {textos.pedir}
          </span>
        )}
        {enviavel && <CopyButton valor={mensagem} rotulo={textos.copiar} className="rs-agata rs-agata-contorno" />}
      </div>
    </div>
  );
}
