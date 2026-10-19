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
    // vd-seletores: com a letra do leitor grande, os seletores empilham as opções (app/digital.css; 19/10).
    <div className="vd-seletores mt-12">
      <ToggleGroup
        value={[nivel]}
        onValueChange={(valor) => escolherNivel(valor[0])}
        aria-label="Plano"
        // Na mesa, os dois seletores centrados sobre o palco; fora dela, à esquerda, com o título e o texto do palco, e na
        // mesma largura (18/10, o passe do celular: no tablet, um de 448 px centrado sobre outro de 576 desalinhava).
        className="vd-vidro vd-segmento grid w-full max-w-xl auto-cols-fr grid-flow-col lg:mx-auto lg:max-w-md"
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
          className="vd-vidro vd-segmento mt-4 grid w-full max-w-xl auto-cols-fr grid-flow-col lg:mx-auto"
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

      {/* O palco, direto na água (desde 17/10, a direção final do Atlas Digital, seção 3, item 14): o site fica no
          instrumento (secoes/escada.tsx), e um cartão em volta dele seria a tela dentro do cartão (L4). Até 17/10, um
          cartão de 37 px de raio, com o recuo dos lados em px no celular. Os 8 px de recuo, devolvidos pela margem
          negativa, guardam o anel de foco das ações, que o recorte cortaria. */}
      <div ref={palco} data-palco-sites data-nivel={nivel} className="-mx-2 mt-10 overflow-hidden px-2 py-6 md:mt-12">
        {Children.toArray(children).map((filho, i) => (
          <div key={sites[i].id} data-site={sites[i].id} data-plano={sites[i].plano} data-em-cena={sites[i].id === emCena || undefined}>
            {filho}
          </div>
        ))}
      </div>

      {/* Na mesa, centrada sob o palco; fora dela, à esquerda, com o texto do site (18/10, o passe do celular). */}
      <p className="mt-5 text-nota text-muted-foreground lg:text-center" aria-live="polite">
        {nota}
      </p>
    </div>
  );
}
