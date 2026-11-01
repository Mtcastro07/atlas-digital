// lib/mapa.ts — o vínculo para o mapa externo, como navegação: nenhum pedido sai desta página
// (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 3).

/** Abre a busca pelo endereço no aplicativo de mapas do aparelho ou no navegador. */
export function vinculoDoMapa(endereco: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
}
