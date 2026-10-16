"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { EscolhaDeRegiao, type OpcaoDeRegiao } from "@/components/ilhas/demos/odontologia/escolha-de-regiao";
import type { RegiaoId } from "@/lib/demos/odontologia/dentes";
import { decodificarAncora } from "@/lib/demos/odontologia/mensagem";

type Resumo = { id: string; regioes: readonly RegiaoId[]; comArtigo: string };
type Textos = {
  legenda: string;
  todas: string;
  ajuda?: string;
  todasContagem: string;
  /** A resposta diz a diferença para a lista inteira: "Nenhum fica de fora…", "Só o clareamento fica de fora…". */
  nenhumFora: string;
  nenhumForaInclusive: string;
  soFora: string;
  soForaVarios: string;
  /** O vínculo que leva a região escolhida ao pedido de avaliação. */
  seguir: string;
  legendas: { superior: string; inferior: string };
};

/**
 * O plano de sessões, aberto pelo mapa dos dentes: a funcionalidade 2 do Completo (nicho, seção 5.2). A região escolhida
 * mostra só os tratamentos que a alcançam. A ilha só põe `data-regiao` no invólucro; quem esconde o resto é o CSS
 * (odontologia.css), e a lista inteira, de servidor, já está no HTML: sem script, tudo à vista. A região também chega
 * pelo endereço (#regiao-<id>, só ids da lista).
 */
export function PlanoDeSessoes({
  regioes,
  tratamentos,
  textos,
  destino,
  cabeca,
  children,
}: {
  regioes: readonly (OpcaoDeRegiao & { frase: string })[];
  tratamentos: readonly Resumo[];
  textos: Textos;
  /** O caminho que recebe a região (#regiao-<id>). */
  destino: string;
  cabeca?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [regiao, setRegiao] = useState<RegiaoId | "">("");
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
  const total = tratamentos.length;
  const frase = regioes.find((r) => r.id === regiao)?.frase ?? "";
  const nomes = (lista: readonly Resumo[]) => lista.map((t) => t.comArtigo).join(" e ");
  const fora = tratamentos.filter((t) => !t.regioes.includes(regiao as RegiaoId));
  // Os de poucas regiões que alcançam esta: o que a distingue das outras, quando a lista não muda.
  const soAqui = tratamentos.filter((t) => t.regioes.length < regioes.length && t.regioes.includes(regiao as RegiaoId));
  const molde = !regiao
    ? textos.todasContagem
    : fora.length
      ? fora.length > 1
        ? textos.soForaVarios
        : textos.soFora
      : soAqui.length
        ? textos.nenhumForaInclusive
        : textos.nenhumFora;
  const contagem = molde
    .replace("{total}", String(total))
    .replace("{regiao}", frase)
    .replace("{quais}", nomes(fora.length ? fora : soAqui));
  return (
    <div data-regiao={regiao || undefined} className="od-plano">
      <EscolhaDeRegiao
        regioes={regioes}
        valor={regiao}
        aoMudar={setRegiao}
        legenda={textos.legenda}
        todas={textos.todas}
        ajuda={textos.ajuda}
        cabeca={cabeca}
        legendas={textos.legendas}
      />
      <div className="min-w-0">
        <p aria-live="polite" className="od-plano-contagem">
          {contagem}
        </p>
        {children}
        <p className={regiao ? "od-plano-seguir" : "od-plano-seguir invisible"} aria-hidden={!regiao || undefined}>
          <Link href={`${destino}#regiao-${regiao}`} className="od-lapis" tabIndex={regiao ? undefined : -1}>
            {textos.seguir}
          </Link>
        </p>
      </div>
    </div>
  );
}
