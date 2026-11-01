"use client";

import { useEffect, useRef, useState } from "react";

// Spell UI, Copy Button (https://spell.sh/r/copy-button), na adaptação do Atlas, trazida para o kit de
// produção (producao/gestos/, 08.10.2026). Os ícones são SVG próprio (no Atlas, do lucide-react, que a base
// não tem):
// - o ícone de copiar vira o de confirmado com escala, opacidade e um desfoque leve — o desfoque, num ícone
//   de 16 px, é a exceção à regra de só animar transform e opacidade; com movimento reduzido, a troca é seca;
// - com o rótulo ao lado ("Copiar" → "Copiado") e alvo de toque de 44 px;
// - a confirmação só aparece se a cópia deu certo; se o navegador recusa, diz "Cópia indisponível" (o texto
//   segue à vista, para a cópia à mão);
// - sem `cn` (código de navegador). Camada [P]: utilidade, não gesto de marca (producao/esteira/09-movimento.md, seção 6).

type Props = {
  /** O texto copiado. */
  valor: string;
  className?: string;
  rotulo?: string;
  confirmado?: string;
  falhou?: string;
  /** Sem o que copiar ainda (a lista vazia, a calculadora sem as medidas). */
  disabled?: boolean;
};

const BOTAO =
  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-5 font-semibold transition-colors duration-200 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50";
const TROCA = "absolute size-4 transition-[opacity,scale,filter] duration-200 ease-out motion-reduce:transition-none";

function IconeCopiar({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="8" y="8" width="13" height="13" rx="2.5" />
      <path d="M16 8V5.5A2.5 2.5 0 0 0 13.5 3h-8A2.5 2.5 0 0 0 3 5.5v8A2.5 2.5 0 0 0 5.5 16H8" />
    </svg>
  );
}

function IconeConfirmado({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function CopyButton({ valor, className = BOTAO, rotulo = "Copiar", confirmado = "Copiado", falhou = "Cópia indisponível", disabled }: Props) {
  const [estado, setEstado] = useState<"parado" | "copiado" | "falhou">("parado");
  const relogio = useRef(0);
  useEffect(() => () => window.clearTimeout(relogio.current), []);
  const copiado = estado === "copiado";
  const rotulos = { parado: rotulo, copiado: confirmado, falhou };

  async function copiar() {
    let deu = true;
    try {
      await navigator.clipboard.writeText(valor);
    } catch {
      // Sem permissão de área de transferência (ou fora de HTTPS).
      deu = false;
    }
    setEstado(deu ? "copiado" : "falhou");
    window.clearTimeout(relogio.current);
    relogio.current = window.setTimeout(() => setEstado("parado"), deu ? 1800 : 2600);
  }

  return (
    <button type="button" onClick={copiar} disabled={disabled} className={className}>
      <span aria-hidden="true" className="relative inline-grid size-4 place-items-center">
        <IconeConfirmado className={`${TROCA} ${copiado ? "blur-none scale-100 opacity-100" : "blur-[2px] scale-70 opacity-0"}`} />
        <IconeCopiar className={`${TROCA} ${copiado ? "blur-[2px] scale-0 opacity-0" : "blur-none scale-100 opacity-100"}`} />
      </span>
      <span aria-live="polite">{rotulos[estado]}</span>
    </button>
  );
}
