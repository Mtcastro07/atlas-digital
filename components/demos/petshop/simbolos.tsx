// Origem: Tabler Icons (MIT, Copyright (c) 2020-2026 Paweł Kuna), @tabler/icons@3.49.0 (sha1 8ad023d3), icons/filled/accessible.svg; adaptado em 13.10.2026: sem o path de enchimento, sem class, width e height. Licença em LICENCA-tabler-icons.txt.

/**
 * O símbolo de acessibilidade (Lei 13.146/2015, art. 63, § 1º; a camada 7 da identidade), impresso numa tinta só: o
 * disco chapado na cor do texto (a uva, na cartolina do rodapé: 12,5:1), a figura vazada, onde aparece o papel. Nunca
 * abaixo de 24 px, nunca numa cena de tinta, nunca em violeta. Decorativo: o texto ao lado diz o que é.
 */
export function SimboloDeAcessibilidade({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.051 6.844a1 1 0 0 0 -1.152 -.663l-.113 .03l-2.684 .895l-2.684 -.895l-.113 -.03a1 1 0 0 0 -.628 1.884l.109 .044l2.316 .771v.976l-1.832 2.75l-.06 .1a1 1 0 0 0 .237 1.21l.1 .076l.101 .06a1 1 0 0 0 1.21 -.237l.076 -.1l1.168 -1.752l1.168 1.752l.07 .093a1 1 0 0 0 1.653 -1.102l-.059 -.1l-1.832 -2.75v-.977l2.316 -.771l.109 -.044a1 1 0 0 0 .524 -1.221zm-3.949 -4.184a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3" />
    </svg>
  );
}
