// Ícones de traço (1,5 px, cantos arredondados), desenhados para a
// página. Decorativos: o texto ao lado sempre diz o que o ícone
// representa, por isso todos levam aria-hidden.

type IconeProps = { className?: string };

function Traco({ className, children, viewBox = "0 0 24 24" }: IconeProps & { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

/**
 * O glifo do WhatsApp, o desenho oficial (Simple Icons, CC0). Até 03/10,
 * um traçado aproximado, com o fone deformado, que a 16 px parecia torto.
 */
export function IconeWhatsApp({ className }: IconeProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/** Seta de abertura dos vínculos ("Conhecer o método ›"). */
export function IconeSeta({ className }: IconeProps) {
  return (
    <Traco className={className} viewBox="0 0 16 16">
      <path d="m6 3.5 4.5 4.5L6 12.5" strokeWidth="1.7" />
    </Traco>
  );
}

export function IconeMenu({ className }: IconeProps) {
  return (
    <Traco className={className}>
      <path d="M4 8h16M4 16h16" />
    </Traco>
  );
}

/** Loja de bairro: toldo e porta. */
export function IconeLoja({ className }: IconeProps) {
  return (
    <Traco className={className}>
      <path d="M4 10v9.5h16V10" />
      <path d="M3 5.5h18l-1.3 4a2.6 2.6 0 0 1-5 0 2.6 2.6 0 0 1-5.4 0 2.6 2.6 0 0 1-5 0L3 5.5Z" />
      <path d="M10 19.5v-5h4v5" />
    </Traco>
  );
}

/** Serviço com agenda. */
export function IconeAgenda({ className }: IconeProps) {
  return (
    <Traco className={className}>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <path d="m9 14.5 2 2 4-4" />
    </Traco>
  );
}

/** Profissão regulamentada: selo com visto. */
export function IconeSelo({ className }: IconeProps) {
  return (
    <Traco className={className}>
      <path d="M12 3 5 5.8v5.4c0 4.4 3 7.9 7 9.8 4-1.9 7-5.4 7-9.8V5.8L12 3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </Traco>
  );
}

export function IconeVisto({ className }: IconeProps) {
  return (
    <Traco className={className} viewBox="0 0 16 16">
      <path d="m3.5 8.4 2.9 2.8 6-6.4" strokeWidth="1.8" />
    </Traco>
  );
}
