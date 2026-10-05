"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Spell UI, Copy Button (https://spell.sh/r/copy-button, instalado pelo CLI
// do shadcn em 03/10), adaptado ao Atlas:
// - o ícone de copiar vira o de confirmado com escala, opacidade e um
//   desfoque leve — o desfoque, num ícone de 16 px, é a exceção à regra de
//   só animar transform e opacidade; com movimento reduzido, a troca é seca;
// - com o rótulo ao lado ("Copiar" → "Copiado"), no desenho dos botões da
//   casa (className, de buttonVariants), e o alvo de toque deles (≥ 44 px);
// - a confirmação só aparece se a cópia deu certo: até 03/10, o montador
//   dizia "Copiado" mesmo quando o navegador recusava a área de transferência;
//   agora, nesse caso, diz que a cópia está indisponível (o texto segue à
//   vista, para a cópia à mão);
// - sem `cn` (código de navegador).

type Props = {
  /** O texto copiado. */
  valor: string;
  className?: string;
  rotulo?: string;
  confirmado?: string;
  falhou?: string;
  /** Sem o que copiar ainda (o talão sem a lista, a calculadora sem as medidas). */
  disabled?: boolean;
};

const TROCA = "absolute size-4 transition-[opacity,scale,filter] duration-200 ease-out motion-reduce:transition-none";

export function CopyButton({ valor, className = "", rotulo = "Copiar", confirmado = "Copiado", falhou = "Cópia indisponível", disabled }: Props) {
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
        <CheckIcon strokeWidth={2} className={`${TROCA} ${copiado ? "blur-none scale-100 opacity-100" : "blur-[2px] scale-70 opacity-0"}`} />
        <CopyIcon strokeWidth={2} className={`${TROCA} ${copiado ? "blur-[2px] scale-0 opacity-0" : "blur-none scale-100 opacity-100"}`} />
      </span>
      <span aria-live="polite">{rotulos[estado]}</span>
    </button>
  );
}
