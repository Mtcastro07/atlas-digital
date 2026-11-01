"use client";
// components/ilhas/plano-de-sessoes.tsx — o plano de sessões, aberto pelo mapa dos dentes (nicho, seção 5.2): a região escolhida
// mostra só os tratamentos que a alcançam. A ilha só põe `data-regiao` no invólucro; quem esconde o resto é o CSS
// (app/globals.css), e a lista inteira, de servidor, já está no HTML: sem script, tudo à vista. A região também chega pelo
// endereço (#regiao-<id>, só ids da lista), como o link do pedido de avaliação a leva.
import Link from "next/link";
import { useEffect, useState } from "react";
import { EscolhaDeRegiao, type OpcaoDeRegiao } from "./escolha-de-regiao";
import { decodificarAncora } from "@/lib/ancoras";
import type { RegiaoId } from "@/conteudo/tratamentos";

type Resumo = { id: string; regioes: readonly RegiaoId[] };

export function PlanoDeSessoes({
  regioes,
  tratamentos,
  legenda,
  todas,
  ajuda,
  pedir,
  children,
}: {
  regioes: readonly OpcaoDeRegiao[];
  tratamentos: readonly Resumo[];
  legenda: string;
  todas: string;
  ajuda: string;
  /** O vínculo que leva a região escolhida ao pedido de avaliação. */
  pedir: string;
  /** A lista de tratamentos, de servidor. */
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
    window.addEventListener("hashchange", ler); // um vínculo para #regiao-<id> na mesma página também vale
    return () => window.removeEventListener("hashchange", ler);
  }, [regioes]);
  const mostrados = regiao ? tratamentos.filter((t) => t.regioes.includes(regiao)).length : tratamentos.length;
  const nome = regioes.find((r) => r.id === regiao)?.nome.toLowerCase();
  return (
    <div data-regiao={regiao || undefined} className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-start lg:gap-14">
      <EscolhaDeRegiao regioes={regioes} valor={regiao} aoMudar={setRegiao} legenda={legenda} todas={todas} ajuda={ajuda} />
      <div>
        <p aria-live="polite" className="mb-4 text-nota text-muted-foreground">
          {regiao ? `${mostrados} de ${tratamentos.length} tratamentos alcançam: ${nome}.` : `Os ${tratamentos.length} tratamentos, em todas as regiões.`}
        </p>
        {children}
        {regiao && (
          <p className="mt-6">
            <Link href={`/avaliacao/#regiao-${regiao}`} className="vinculo font-semibold">
              {pedir}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
