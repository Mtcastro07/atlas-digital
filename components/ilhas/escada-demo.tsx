"use client";

import { stagger } from "motion";
import { useAnimate } from "motion/react-mini";
import { Children, useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Nivel = { id: string; nome: string; nota: string };
/** Um site do palco: o nicho (id), o plano a que pertence e o nome curto no seletor de nichos. */
type SiteDoPalco = { id: string; plano: string; rotulo: string };

type Props = {
  niveis: readonly Nivel[];
  /** Os sites, na mesma ordem dos filhos; o primeiro de cada plano entra em cena quando o plano é escolhido. */
  sites: readonly SiteDoPalco[];
  /** O nome do seletor de nichos, para o leitor de tela. */
  rotuloDosNichos: string;
  /** Os sites do palco, um por item de `sites`, desenhados no servidor (components/secoes/escada.tsx). */
  children: React.ReactNode;
};

const SUAVE = [0.22, 1, 0.36, 1] as const;

const PARTES = "[data-parte]";
const TITULO = "[data-parte=titulo]";
const TEXTO = "[data-parte=texto]";
const BLOCOS = "[data-parte=bloco]";
const PALAVRAS = "[data-palavra]";

/**
 * Demonstrador da diferença entre os planos: o seletor dos três níveis
 * escolhe o plano, e o seletor de nichos, abaixo dele, o site daquele plano
 * que entra em cena (desde 08/10: até quatro sites por plano, um nicho em
 * cada; o seletor de nichos só aparece com mais de um). A troca é encenada
 * com a camada de movimento do nível — só quando alguém escolhe (nada
 * acontece sozinho com a rolagem). O site em cena leva data-em-cena; o
 * resto fica oculto (app/vidro.css). A ilha não conhece o conteúdo do
 * palco: encena o que estiver marcado com data-parte (titulo, texto, bloco)
 * e data-palavra, dentro do site em cena. Sem script, todos os sites
 * aparecem um embaixo do outro.
 */
export function EscadaDemo({ niveis, sites, rotuloDosNichos, children }: Props) {
  const [nivel, setNivel] = useState(niveis[0].id);
  // O site escolhido em cada plano: começa no primeiro; voltar a um plano devolve o que estava nele.
  const [escolha, setEscolha] = useState<Record<string, string>>(() =>
    Object.fromEntries(niveis.map((n) => [n.id, sites.find((s) => s.plano === n.id)?.id ?? ""]))
  );
  const [palco, animate] = useAnimate<HTMLDivElement>();
  const posicao = niveis.findIndex((n) => n.id === nivel);
  const nota = niveis[posicao]?.nota;
  const doNivel = sites.filter((s) => s.plano === nivel);
  const emCena = escolha[nivel];
  const posicaoDoSite = doNivel.findIndex((s) => s.id === emCena);

  function encenar(nivelDaCena: string, site: string) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Só o site em cena; os outros estão ocultos.
    const no = (seletor: string) => `[data-site="${site}"] :is(${seletor})`;
    animate(no(PALAVRAS), { opacity: 1, transform: "none" }, { duration: 0 });

    if (nivelDaCena === "essencial") {
      animate(no(PARTES), { opacity: [0, 1], transform: "none" }, { duration: 0.4, ease: SUAVE });
      return;
    }

    if (nivelDaCena === "profissional") {
      animate(no(`${TITULO}, ${TEXTO}`), { opacity: [0, 1], transform: ["translateY(24px)", "none"] }, { duration: 0.7, ease: SUAVE, delay: stagger(0.05) });
      animate(no(BLOCOS), { opacity: [0, 1], transform: ["translateY(28px)", "none"] }, { duration: 0.7, ease: SUAVE, delay: 0.12 });
      return;
    }

    animate(no(TITULO), { opacity: 1, transform: "none" }, { duration: 0 });
    animate(no(PALAVRAS), { opacity: [0, 1], transform: ["translateY(108%)", "none"] }, { duration: 1.1, ease: SUAVE, delay: stagger(0.08) });
    animate(no(TEXTO), { opacity: [0, 1], transform: ["translateY(20px)", "none"] }, { duration: 0.7, ease: SUAVE, delay: stagger(0.06, { startDelay: 0.3 }) });
    // Na curva da casa, sem ultrapassar (até 16/10, a mola de 1,4, um quique fora das exceções: 09-movimento.md, seção 3).
    animate(no(BLOCOS), { opacity: [0, 1], transform: ["translateY(38px) scale(0.92)", "none"] }, { duration: 1.1, ease: SUAVE, delay: 0.42 });
  }

  function escolherNivel(id: string | undefined) {
    if (!id || id === nivel) return;
    setNivel(id);
    encenar(id, escolha[id]);
  }

  function escolherSite(id: string | undefined) {
    if (!id || id === emCena) return;
    setEscolha((atual) => ({ ...atual, [nivel]: id }));
    encenar(nivel, id);
  }

  return (
    <div className="mt-12">
      <ToggleGroup
        value={[nivel]}
        onValueChange={(valor) => escolherNivel(valor[0])}
        aria-label="Plano"
        className="vd-vidro vd-segmento mx-auto grid w-full max-w-md auto-cols-fr grid-flow-col"
        style={{ "--n": niveis.length, "--i": posicao } as React.CSSProperties}
      >
        <span aria-hidden="true" className="vd-segmento-cursor" />
        {niveis.map((n) => (
          <ToggleGroupItem key={n.id} value={n.id} variant="segmento">
            {n.nome}{" "}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {/* Os nichos do plano escolhido: só com mais de um site nele. A chave remonta o seletor a cada plano,
          e o cursor nasce na posição certa, sem deslizar desde o nicho do plano anterior. */}
      {doNivel.length > 1 && (
        <ToggleGroup
          key={nivel}
          value={[emCena]}
          onValueChange={(valor) => escolherSite(valor[0])}
          aria-label={rotuloDosNichos}
          className="vd-vidro vd-segmento mx-auto mt-4 grid w-full max-w-xl auto-cols-fr grid-flow-col"
          style={{ "--n": doNivel.length, "--i": posicaoDoSite } as React.CSSProperties}
        >
          <span aria-hidden="true" className="vd-segmento-cursor" />
          {doNivel.map((s) => (
            <ToggleGroupItem key={s.id} value={s.id} variant="segmento">
              {s.rotulo}{" "}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}

      {/* O recuo dos lados em px no celular (17/10, segundo fechamento): o mesmo com a letra normal; com a letra a 200%, o
          px-6 dobrava (48 px de cada lado), e o nome do site partia no meio da palavra ("Nutriçã-o"). */}
      <div ref={palco} data-palco-sites data-nivel={nivel} className="mt-8 overflow-hidden rounded-xl bg-card px-[24px] py-12 md:px-12 md:py-16">
        {Children.toArray(children).map((filho, i) => (
          <div key={sites[i].id} data-site={sites[i].id} data-plano={sites[i].plano} data-em-cena={sites[i].id === emCena || undefined}>
            {filho}
          </div>
        ))}
      </div>

      <p className="mt-5 text-center text-nota text-muted-foreground" aria-live="polite">
        {nota}
      </p>
    </div>
  );
}
