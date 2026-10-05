// O endereço que pede o agendador com um serviço marcado: …/agendar#servico-<id>.
// Módulo neutro: a página dos serviços (servidor) e a agenda de retorno
// (ilha, no navegador) importam daqui.
export const comServico = (caminho: string, servico: string) => `${caminho}#servico-${servico}`;
