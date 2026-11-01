"use client";

import { stagger } from "motion";
import { useAnimate } from "motion/react-mini";
import { useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Nivel = { id: string; nome: string; nota: string };

type Props = {
  niveis: readonly Nivel[];
  /** Os sites do palco, um por nível ([data-site="<nível>"]), desenhados no servidor (components/secoes/escada.tsx). */
  children: React.ReactNode;
};

const SUAVE = [0.22, 1, 0.36, 1] as const;
const MOLA = [0.34, 1.4, 0.5, 1] as const;

const PARTES = "[data-parte]";
const TITULO = "[data-parte=titulo]";
const TEXTO = "[data-parte=texto]";
const BLOCOS = "[data-parte=bloco]";
const PALAVRAS = "[data-palavra]";

/**
 * Demonstrador da diferença entre os planos: o seletor dos três níveis
 * põe em cena o site daquele plano ([data-site], app/vidro.css mostra só o
 * do nível em data-nivel) e encena a entrada com a camada de movimento do
 * nível — só quando alguém escolhe (nada acontece sozinho com a rolagem).
 * A ilha não conhece o conteúdo do palco: encena o que estiver marcado
 * com data-parte (titulo, texto, bloco) e data-palavra, dentro do site em
 * cena. Sem script, os três sites aparecem um embaixo do outro.
 */
export function EscadaDemo({ niveis, children }: Props) {
  const [nivel, setNivel] = useState(niveis[0].id);
  const [palco, animate] = useAnimate<HTMLDivElement>();
  const posicao = niveis.findIndex((n) => n.id === nivel);
  const nota = niveis[posicao]?.nota;

  function encenar(id: string) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Só o site em cena; os outros estão ocultos.
    const no = (seletor: string) => `[data-site="${id}"] :is(${seletor})`;
    animate(no(PALAVRAS), { opacity: 1, transform: "none" }, { duration: 0 });

    if (id === "essencial") {
      animate(no(PARTES), { opacity: [0, 1], transform: "none" }, { duration: 0.4, ease: SUAVE });
      return;
    }

    if (id === "profissional") {
      animate(no(`${TITULO}, ${TEXTO}`), { opacity: [0, 1], transform: ["translateY(24px)", "none"] }, { duration: 0.7, ease: SUAVE, delay: stagger(0.05) });
      animate(no(BLOCOS), { opacity: [0, 1], transform: ["translateY(28px)", "none"] }, { duration: 0.7, ease: SUAVE, delay: 0.12 });
      return;
    }

    animate(no(TITULO), { opacity: 1, transform: "none" }, { duration: 0 });
    animate(no(PALAVRAS), { opacity: [0, 1], transform: ["translateY(108%)", "none"] }, { duration: 1.1, ease: SUAVE, delay: stagger(0.08) });
    animate(no(TEXTO), { opacity: [0, 1], transform: ["translateY(20px)", "none"] }, { duration: 0.7, ease: SUAVE, delay: stagger(0.06, { startDelay: 0.3 }) });
    animate(no(BLOCOS), { opacity: [0, 1], transform: ["translateY(38px) scale(0.92)", "none"] }, { duration: 1.1, ease: MOLA, delay: 0.42 });
  }

  function escolher(id: string | undefined) {
    if (!id || id === nivel) return;
    setNivel(id);
    encenar(id);
  }

  return (
    <div className="mt-12">
      <ToggleGroup
        value={[nivel]}
        onValueChange={(valor) => escolher(valor[0])}
        aria-label="Plano"
        className="vd-vidro vd-segmento mx-auto grid w-full max-w-md auto-cols-fr grid-flow-col"
        style={{ "--n": niveis.length, "--i": posicao } as React.CSSProperties}
      >
        <span aria-hidden="true" className="vd-segmento-cursor" />
        {niveis.map((n) => (
          <ToggleGroupItem key={n.id} value={n.id} variant="segmento">
            {n.nome}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div ref={palco} data-palco-sites data-nivel={nivel} className="mt-8 overflow-hidden rounded-xl bg-card px-6 py-12 md:px-12 md:py-16">
        {children}
      </div>

      <p className="mt-5 text-center text-nota text-muted-foreground" aria-live="polite">
        {nota}
      </p>
    </div>
  );
}
