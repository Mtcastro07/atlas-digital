"use client";

import { useEffect, useRef, useState } from "react";

import type { Lugar } from "@/lib/sol";

/**
 * A ilha da rosa do Sol de /duvidas (desde 17/10, a direção final do Atlas Digital, seção 3, item 22): a legenda da rosa
 * (components/paginas/mapa-das-duvidas.tsx) e, pela rosa da mesma abertura, só o lado aceso (o desenho,
 * ilhas/desenho-da-rosa.ts, chega por import() depois de montar, fora do script inicial da página).
 * A frase: no HTML do servidor, `reserva`, estável e sem número; depois de montar, a altura e o rumo do Sol em Niterói,
 * a cada minuto, num bloco aria-hidden com o mesmo texto para o leitor de tela (a troca do minuto não é anunciada).
 * Desde 18/10 (o passe do celular), as rosas são duas, a da mesa e a do celular (o CSS mostra uma); cada uma tem o seu
 * relógio, que só corre com ela na tela (aoVivo), e as duas dizem a mesma frase.
 * Desde a revisão de 18/10, o destaque da legenda também: `legenda.noite` com a rosa toda em ponto, depois do crepúsculo
 * civil. Até então, "Acesa do lado do Sol" a qualquer hora, também à noite, sobre a rosa sem lado aceso.
 */
export function RosaDoSol({ legenda, reserva, lugar }: { legenda: { dia: string; noite: string }; reserva: string; lugar: Lugar }) {
  const caixa = useRef<HTMLSpanElement>(null);
  const [leitura, setLeitura] = useState({ frase: reserva, noite: false });

  useEffect(() => {
    const rosas = [...(caixa.current!.closest("section")?.querySelectorAll<HTMLElement>(".vd-rosa-do-sol") ?? [])];
    if (!rosas.length) return;
    let ativo = true;
    let desligar: (() => void)[] = [];
    const dizer = (frase: string, noite: boolean) => setLeitura((a) => (a.frase === frase && a.noite === noite ? a : { frase, noite }));
    import("@/components/ilhas/desenho-da-rosa").then(({ rosaViva }) => {
      if (ativo) desligar = rosas.map((rosa) => rosaViva(rosa, lugar, dizer));
    });
    return () => {
      ativo = false;
      desligar.forEach((f) => f());
    };
  }, [lugar]);

  return (
    <>
      <strong>{leitura.noite ? legenda.noite : legenda.dia}</strong>{" "}
      <span ref={caixa}>
        <span aria-hidden="true">{leitura.frase}</span> <span className="sr-only">{leitura.frase}</span>
      </span>
    </>
  );
}
