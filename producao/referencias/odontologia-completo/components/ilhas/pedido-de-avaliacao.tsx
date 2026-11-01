"use client";
// components/ilhas/pedido-de-avaliacao.tsx — a funcionalidade 1 do plano Completo (producao/esteira/nichos/odontologia.md, seção 5.1):
// o atendimento procurado (nunca um sintoma), a região da boca, a última visita e o período viram uma mensagem para o
// WhatsApp da clínica. Nada é registrado: a mensagem sai do aparelho pelo aplicativo, e o site não coleta dado de saúde.
// A conta é a função pura de lib/oficio/pedido-de-avaliacao.ts. Sem script, a página mostra a lista dos atendimentos e o
// vínculo "Pedir avaliação pelo WhatsApp" com a mensagem curta (app/avaliacao/page.tsx). Recebe só o que usa.
import { useEffect, useState } from "react";
import { contato } from "@/conteudo/contato";
import { decodificarAncora } from "@/lib/ancoras";
import { mensagemDaAvaliacao } from "@/lib/oficio/pedido-de-avaliacao";
import { vinculoDoWhatsapp } from "@/lib/whatsapp";
import { IconeWhatsApp } from "../simbolos";
import { CopyButton } from "../ui/spell/copy-button";
import { EscolhaDeRegiao, type OpcaoDeRegiao } from "./escolha-de-regiao";
import type { RegiaoId } from "@/conteudo/tratamentos";

type Opcao = { id: string; rotulo: string };
type Atendimento = Opcao & { frase: string };

export type TextosDoPedido = {
  atendimento: string;
  regiao: string;
  todasAsRegioes: string;
  ultimaVisita: string;
  periodo: string;
  semResposta: string;
  mensagem: string;
  copiar: string;
  enviar: string;
  urgenciaNota: string;
  atendimentoNota: string;
};

const CAMPO =
  "min-h-11 w-full rounded-marcacao border border-foreground/45 bg-card px-3 text-base text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const OPCAO =
  "inline-flex min-h-11 w-full cursor-pointer items-center rounded-marcacao border border-border bg-card px-4 transition-colors duration-150 hover:bg-muted active:bg-muted peer-checked:border-accent peer-checked:bg-marcador peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ring";

export function PedidoDeAvaliacao({
  atendimentos,
  regioes,
  ultimasVisitas,
  periodos,
  textos,
}: {
  atendimentos: readonly Atendimento[];
  regioes: readonly (OpcaoDeRegiao & { frase: string })[];
  ultimasVisitas: readonly Opcao[];
  periodos: readonly Opcao[];
  textos: TextosDoPedido;
}) {
  const [atendimento, setAtendimento] = useState("");
  const [regiao, setRegiao] = useState<RegiaoId | "">("");
  const [ultima, setUltima] = useState("");
  const [periodo, setPeriodo] = useState("");

  // A região pode chegar pelo endereço (#regiao-<id>), só se estiver na lista.
  useEffect(() => {
    const ler = () => {
      const id = decodificarAncora(window.location.hash).replace(/^regiao-/, "");
      const achada = regioes.find((r) => r.id === id);
      if (achada) setRegiao(achada.id);
    };
    ler();
    window.addEventListener("hashchange", ler);
    return () => window.removeEventListener("hashchange", ler);
  }, [regioes]);

  const mensagem = mensagemDaAvaliacao({
    atendimento: atendimentos.find((a) => a.id === atendimento)?.frase,
    regiao: regioes.find((r) => r.id === regiao)?.frase,
    ultimaVisita: ultimasVisitas.find((u) => u.id === ultima)?.rotulo,
    periodo: periodos.find((p) => p.id === periodo)?.rotulo,
  });

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start lg:gap-14">
      <div className="grid gap-10">
        <fieldset className="grid gap-3">
          <legend className="font-semibold">{textos.atendimento}</legend>
          <p className="max-w-[48ch] text-nota text-muted-foreground">{textos.atendimentoNota}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {atendimentos.map((a) => (
              <label key={a.id} className="flex">
                <input type="radio" name="atendimento" value={a.id} checked={atendimento === a.id} onChange={() => setAtendimento(a.id)} className="peer sr-only" />
                <span className={OPCAO}>{a.rotulo}</span>
              </label>
            ))}
          </div>
          {atendimento === "urgencia" && <p className="font-semibold text-accent">{textos.urgenciaNota}</p>}
        </fieldset>

        <EscolhaDeRegiao regioes={regioes} valor={regiao} aoMudar={setRegiao} legenda={textos.regiao} todas={textos.todasAsRegioes} />

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="font-semibold">{textos.ultimaVisita}</span>
            <select value={ultima} onChange={(e) => setUltima(e.target.value)} className={CAMPO}>
              <option value="">{textos.semResposta}</option>
              {ultimasVisitas.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.rotulo}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="font-semibold">{textos.periodo}</span>
            <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className={CAMPO}>
              <option value="">{textos.semResposta}</option>
              {periodos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.rotulo}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="rounded-cartao border border-border bg-card p-6 lg:sticky lg:top-24">
        <h2 className="font-semibold">{textos.mensagem}</h2>
        <p aria-live="polite" className="mt-3 text-corpo">
          {mensagem}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={vinculoDoWhatsapp(contato.whatsapp, mensagem)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2.5 rounded-full bg-primary px-6 font-semibold text-primary-foreground no-underline transition-[filter] duration-200 hover:brightness-125 active:brightness-150 sm:w-auto"
          >
            <IconeWhatsApp className="size-5 shrink-0" />
            {textos.enviar}
            <span className="sr-only">, abre em nova aba</span>
          </a>
          <CopyButton valor={mensagem} rotulo={textos.copiar} />
        </div>
      </div>
    </div>
  );
}
