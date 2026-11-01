/**
 * Executa `tarefa` quando o navegador estiver ocioso (depois da carga e
 * da hidratação). Serve para pré-carregar o código de painéis que só
 * abrem ao toque, sem competir com o conteúdo inicial.
 * Safari não tem requestIdleCallback: cai num atraso fixo.
 */
export function quandoOcioso(tarefa: () => void) {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(tarefa, { timeout: 4000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(tarefa, 2500);
  return () => clearTimeout(id);
}
