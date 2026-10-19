import { relogio } from "@/lib/sol";

/**
 * O relógio das leituras vivas e dos giros desenhados por script (17/10, "o Atlas Digital": tudo o que se move mede
 * algo verdadeiro — a hora de Niterói, a longitude do globo, o prazo a partir de agora). Roda `quadro` só enquanto o
 * elemento está na tela, a página não está em pausa (o botão do cabeçalho: <html class="ambiente-pausado">, ilhas/
 * controle-do-movimento.tsx; WCAG 2.2.2, o que se atualiza sozinho) e o movimento não é reduzido. Parado, a peça fica
 * na última leitura. `intervalo` em ms (a hora, a cada segundo, alinhada ao segundo do relógio); sem ele, a cada quadro.
 * Devolve a função que desliga tudo.
 */
export function aoVivo(elemento: Element, quadro: (agora: number) => void, intervalo = 0) {
  const raiz = document.documentElement;
  const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)");
  let visivel = false;
  let pedido = 0;
  let espera = 0;

  const parar = () => {
    cancelAnimationFrame(pedido);
    clearTimeout(espera);
    pedido = espera = 0;
  };
  const passo = () => {
    quadro(performance.now());
    if (intervalo) espera = window.setTimeout(passo, intervalo - (Date.now() % intervalo) + 5);
    else pedido = requestAnimationFrame(passo);
  };
  const conferir = () => {
    parar();
    if (visivel && !reduzir.matches && !raiz.classList.contains("ambiente-pausado")) passo();
  };

  const observador = new IntersectionObserver(([entrada]) => {
    visivel = entrada.isIntersecting;
    conferir();
  });
  observador.observe(elemento);
  const pausa = new MutationObserver(conferir);
  pausa.observe(raiz, { attributes: true, attributeFilter: ["class"] });
  reduzir.addEventListener("change", conferir);

  return () => {
    parar();
    observador.disconnect();
    pausa.disconnect();
    reduzir.removeEventListener("change", conferir);
  };
}

/** A hora de Niterói, em horas, minutos e segundos (o fuso de Brasília). */
export const horaDeNiteroi = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit", second: "2-digit" });

/**
 * O relógio dos textos que mudam a cada minuto (a leitura do Sol, o mostrador do prazo com movimento reduzido): roda
 * agora e, depois, por aoVivo; com movimento reduzido, que o aoVivo para, num relógio próprio de minuto em minuto (na
 * virada do minuto de relogio(), o que o ?agora= desloca nos testes), que também para com a pausa (html.ambiente-pausado).
 */
export function aCadaMinuto(elemento: Element, ler: () => void) {
  ler();
  const parar = aoVivo(elemento, ler, 60_000);
  const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)");
  let espera = 0;
  const minuto = () => {
    espera = window.setTimeout(() => {
      if (reduzir.matches && !document.documentElement.classList.contains("ambiente-pausado")) ler();
      minuto();
    }, 60_000 - (relogio().getTime() % 60_000) + 5);
  };
  minuto();
  return () => {
    parar();
    clearTimeout(espera);
  };
}
