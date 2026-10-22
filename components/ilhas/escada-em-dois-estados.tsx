"use client";

import { useEffect, useRef, useState } from "react";

import type { Lugar } from "@/lib/sol";

/**
 * A ilha da escada em dois estados (desde 17/10, a direção final do Atlas Digital, seção 3, item 12, e a seção 2.8):
 * a frase das sombras na legenda da escada (components/paginas/escada-de-precos.tsx), e, pela figura em volta dela, a
 * passagem da página e as sombras pelo Sol de agora. O desenho (ilhas/desenho-da-escada.ts) chega por import() depois
 * de montar, fora do script inicial da página.
 * A frase: no HTML do servidor, `reserva`, estável e sem número (o servidor não sabe que horas são para quem lê), uma
 * vez só (o robô lê o HTML); depois de montar, a altura e o rumo do Sol em Niterói, a cada minuto, num bloco aria-hidden
 * com o mesmo texto para o leitor de tela (a troca do minuto não é lida grau a grau).
 */
export function SombrasDaEscada({ reserva, lugar }: { reserva: string; lugar: Lugar }) {
  const caixa = useRef<HTMLSpanElement>(null);
  const [frase, setFrase] = useState<string | null>(null);

  useEffect(() => {
    const figura = caixa.current!.closest<HTMLElement>(".vd-escada");
    if (!figura) return;
    let ativo = true;
    let desligar = () => {};
    import("@/components/ilhas/desenho-da-escada").then(({ escadaViva }) => {
      if (ativo) desligar = escadaViva(figura, lugar, setFrase);
    });
    return () => {
      ativo = false;
      desligar();
    };
  }, [lugar]);

  // .vd-escada-sol: no celular, a frase numa linha própria, com a altura da frase viva guardada (app/digital.css).
  return (
    <span ref={caixa} className="vd-escada-sol">
      {frase === null ? (
        reserva
      ) : (
        <>
          <span aria-hidden="true">{frase}</span>
          <span className="sr-only">{frase}</span>
        </>
      )}
    </span>
  );
}
