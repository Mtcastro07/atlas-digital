// Estrutura comum às telas dos demonstrativos: 390 × 844 px (um celular
// comum), barra de status e indicador de início. Cada tela traz o próprio
// tom (a identidade do nicho, data-tom em app/nichos.css) e a própria
// fonte de título; o cabeçalho e o corpo são de cada uma. Estas telas não
// entram na página: são a fonte das imagens em public/telas/, capturadas
// por ferramentas/capturar-telas.mjs (ver ferramentas/README.md).

function BarraDeStatus() {
  return (
    <div className="flex h-[47px] flex-none items-center justify-between px-8 pt-2 text-[15px] font-semibold tracking-[-0.01em]">
      <span className="tabular-nums">9:41</span>
      <span className="flex items-center gap-1.5" aria-hidden="true">
        <svg viewBox="0 0 18 12" className="h-3 w-[18px]" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg viewBox="0 0 16 12" className="h-3 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M1.5 4.5a9.5 9.5 0 0 1 13 0M4 7.3a6 6 0 0 1 8 0M6.6 10a2.4 2.4 0 0 1 2.8 0" />
        </svg>
        <svg viewBox="0 0 27 13" className="h-[13px] w-[27px]">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" strokeOpacity="0.4" />
          <rect x="2" y="2" width="18" height="9" rx="2" fill="currentColor" />
          <path d="M25 4.5v4" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
    </div>
  );
}

type MolduraProps = {
  /** O tom do nicho (data-tom): "deposito" ou "nutricao". */
  tom: "deposito" | "nutricao";
  /** Classe da fonte do nicho (variável --font-nicho; components/nichos/fontes.ts). */
  fonte: string;
  children: React.ReactNode;
};

/** A tela inteira, no tom e na fonte do nicho. */
export function MolduraDeTela({ tom, fonte, children }: MolduraProps) {
  return (
    <div
      data-tela
      data-tom={tom}
      className={`relative flex h-[844px] w-[390px] flex-col overflow-hidden text-[14px] leading-[1.45] ${fonte}`}
    >
      <BarraDeStatus />
      {children}
      <span aria-hidden="true" className="absolute bottom-2 left-1/2 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-foreground" />
    </div>
  );
}
