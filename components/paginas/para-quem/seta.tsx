/**
 * A seta de saída (↗), só nos vínculos que abrem outra aba: os sites de exemplo (a seta só onde se sai da página; R10).
 * Decorativa: o vínculo diz, em texto para o leitor de tela, que abre numa nova aba.
 */
export function SetaDeSaida({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" aria-hidden="true" className={className}>
      <path d="M4 2.5h7.5V10M11.5 2.5 2.5 11.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
