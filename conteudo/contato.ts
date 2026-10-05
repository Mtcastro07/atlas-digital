// Contato do Atlas Digital e as mensagens prontas de WhatsApp.
// Módulo à parte, e mínimo, de propósito: as ilhas que rodam no navegador
// (ação flutuante, montador) importam só isto, sem arrastar os textos da
// página inteira para o script. conteudo/site.ts reexporta os dois.

export const contato = {
  whatsapp: "5521968014926",
  telefone: "(21) 96801-4926",
  email: "contato@agenciaatlasdigital.com",
  dominio: "agenciaatlasdigital.com",
  url: "https://agenciaatlasdigital.com",
  cidade: "Niterói",
  estado: "RJ",
} as const;

/** Mensagens prontas dos vínculos de WhatsApp fora do montador. */
export const mensagens = {
  contato: "Contato solicitado pelo site do Atlas Digital.",
  flutuante: "Contato solicitado pelo site.",
};
