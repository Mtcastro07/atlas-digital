// lib/ancoras.ts — a decodificação que nunca derruba a página
// (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 16).

/** "#duvida-2" → "duvida-2"; "#%C3%A1" → "á"; malformada ("#%E0") → "", que vale como nenhuma. */
export function decodificarAncora(hash: string) {
  try {
    return decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    return "";
  }
}
export const ancoraDoEndereco = () => decodificarAncora(window.location.hash);
