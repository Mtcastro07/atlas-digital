"use client";

import { useEffect, useRef, useState } from "react";

import { TRACOS_DO_GLOBO } from "@/components/marca/logotipo";

/**
 * A peça do logotipo (R10, 28/10; CONTRATO.md, 3.6): o logotipo em 3D, em pé sobre o papel (a letra no navy, o globo em
 * bronze), com as quatro peças do globo em camadas.
 * - Em repouso, montada e parada. Ao entrar na tela, uma vez, as quatro peças chegam afastadas e se montam em 600 ms
 *   (o IntersectionObserver abaixo). Sem script, ou com o movimento reduzido, já montada.
 * - A peça é um botão: o ponteiro sobre ela, o clique ou o toque a abrem em camadas (a vista explodida, curta).
 * - Enquanto aberta, a peça flutua (a constante desta página, .mov-constante): para fora da tela, na pausa e com o
 *   movimento reduzido (app/movimento.css), e pelo teclado, que não anima (09-movimento.md, 2: 0 ms no teclado).
 * Só transform e opacity, em camadas do tamanho do globo (e não da peça inteira: a memória das camadas cai).
 */

/** A letra A do logotipo, a mesma de public/marca.svg (o traçado copiado: o arquivo fica uma semana em cache). */
const LETRA_A =
  "M52,14 L103,14 L126,80 L146,80 L146,58 L178,58 L178,81 Q178,108 138,111 L156,166 L112,166 L98,120 Q96,110 94,110 L74,110 Q54,110 54,132 L54,166 L0,166 Z M77,50 L85,79 L69,79 Z";
/** A caixa do globo no logotipo (o recorte de GloboDoLogotipo: o círculo de raio 24 em 163, 24). */
const CAIXA_DO_GLOBO = "139 0 48 48";

export function PecaDoLogotipo({ rotulo }: { rotulo: string }) {
  const peca = useRef<HTMLButtonElement>(null);
  const [aberta, setAberta] = useState(false);
  const [entrada, setEntrada] = useState<"pendente" | "indo" | "parada" | null>(null);
  const [teclado, setTeclado] = useState(false);

  useEffect(() => {
    // O teclado não anima: o Tab liga, o ponteiro desliga.
    const tab = (e: KeyboardEvent) => e.key === "Tab" && setTeclado(true);
    const ponteiro = () => setTeclado(false);
    addEventListener("keydown", tab);
    addEventListener("pointerdown", ponteiro);
    // A entrada, uma vez: abertas antes de entrar na tela, montadas ao entrar.
    let fim: ReturnType<typeof setTimeout> | undefined;
    let observador: IntersectionObserver | undefined;
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches && peca.current) {
      setEntrada("pendente");
      observador = new IntersectionObserver(
        (entradas) => {
          if (!entradas.some((e) => e.isIntersecting)) return;
          observador?.disconnect();
          // Com a pausa ligada, a peça já aparece montada, sem transição.
          if (document.documentElement.classList.contains("ambiente-pausado")) {
            setEntrada("parada");
            return;
          }
          // Dois quadros: o estado aberto pinta antes de a transição começar.
          requestAnimationFrame(() => requestAnimationFrame(() => setEntrada("indo")));
          fim = setTimeout(() => setEntrada(null), 1000);
        },
        { threshold: 0.25 },
      );
      observador.observe(peca.current);
    }
    return () => {
      removeEventListener("keydown", tab);
      removeEventListener("pointerdown", ponteiro);
      observador?.disconnect();
      clearTimeout(fim);
    };
  }, []);

  return (
    <div className="vd-peca-cena" data-entrada={entrada ?? undefined} data-teclado={teclado || undefined}>
      <button
        ref={peca}
        type="button"
        className="vd-peca"
        aria-pressed={aberta}
        aria-label={rotulo}
        onClick={() => setAberta((a) => !a)}
      >
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <defs>
            <clipPath id="peca-recorte">
              <circle cx="163" cy="24" r="24" />
            </clipPath>
            <linearGradient id="peca-bronze" x1="139" y1="0" x2="187" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#e8b97c" />
              <stop offset=".5" stopColor="#c08a4a" />
              <stop offset="1" stopColor="#8f5f2c" />
            </linearGradient>
            <linearGradient id="peca-tinta" x1="0" y1="0" x2="178" y2="166" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#28527e" />
              <stop offset=".55" stopColor="#163659" />
              <stop offset="1" stopColor="#0f2a47" />
            </linearGradient>
            <path id="peca-letra" fillRule="evenodd" d={LETRA_A} />
          </defs>
        </svg>
        <span className="vd-peca-sombra" aria-hidden="true">
          <svg viewBox="-8 -8 204 184">
            <use href="#peca-letra" fill="currentColor" />
          </svg>
        </span>
        <span className="vd-peca-contato" aria-hidden="true" />
        <span className="vd-peca-palco" aria-hidden="true">
          <span className="vd-peca-inclinacao mov-passiva">
            <span className="vd-peca-camada">
              {/* A espessura da letra: três cópias atrás, cada vez mais fundas. */}
              <svg className="e3" viewBox="-8 -8 204 184">
                <use href="#peca-letra" fill="#061729" />
              </svg>
              <svg className="e2" viewBox="-8 -8 204 184">
                <use href="#peca-letra" fill="#08203b" />
              </svg>
              <svg className="e1" viewBox="-8 -8 204 184">
                <use href="#peca-letra" fill="#0b2440" />
              </svg>
              <svg viewBox="-8 -8 204 184">
                <use href="#peca-letra" fill="url(#peca-tinta)" />
              </svg>
            </span>
            {TRACOS_DO_GLOBO.map((traco, i) => {
              const desenho = (cor: string) => (
                <g clipPath="url(#peca-recorte)" fill="none" stroke={cor} strokeWidth="4.5">
                  {traco}
                </g>
              );
              return (
                <span key={i} className="vd-peca-camada vd-peca-globo mov-passiva" style={{ "--i": i } as React.CSSProperties}>
                  <span className="vd-peca-flutua mov-constante">
                    <svg className="e2" viewBox={CAIXA_DO_GLOBO}>
                      {desenho("#6b4318")}
                    </svg>
                    <svg className="e1" viewBox={CAIXA_DO_GLOBO}>
                      {desenho("#6b4318")}
                    </svg>
                    <svg viewBox={CAIXA_DO_GLOBO}>{desenho("url(#peca-bronze)")}</svg>
                  </span>
                </span>
              );
            })}
          </span>
        </span>
      </button>
    </div>
  );
}
