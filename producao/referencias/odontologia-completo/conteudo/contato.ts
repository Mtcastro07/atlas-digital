// conteudo/contato.ts — o contato numa constante só, num módulo mínimo: as ilhas importam daqui sem
// arrastar o texto do site para o script (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 1).
// O next.config.ts e as ferramentas (gerar-htaccess, conferir-pronto, a régua) também leem daqui:
// mantenha cada campo numa linha, entre aspas duplas.
//
// Site de EXEMPLO: o número fictício dos exemplos (5521900000000, "(21) 90000-0000") e o subdomínio da vitrine
// (odontologia.agenciaatlasdigital.com), do briefing, seções 3 e 8. O `npm run pronto` recusa publicar um site de
// cliente com qualquer um deles.

export const contato = {
  /** Só algarismos: 55 + DDD + número. */
  whatsapp: "5521900000000",
  /** O telefone de ligação; o mesmo do WhatsApp quando o negócio só tem um. */
  telefone: "5521900000000",
  /** O domínio do site, sem "www" nem "https://". */
  dominio: "odontologia.agenciaatlasdigital.com",
} as const;
