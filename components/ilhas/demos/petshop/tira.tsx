"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { Pausa } from "@/components/ilhas/demos/petshop/pausa";

type Pagina = { id: string; caminho: string; rotulo: string };

/** Nada a assinar: o useSyncExternalStore só separa o servidor (e a hidratação) do cliente. */
const nadaAssinar = () => () => {};

/** Rolagem mínima, em pixels, para contar como mudança de direção. */
const LIMIAR = 8;

/** As curvas e os tempos do cartão que desliza no balcão (petshop.css, --bt-entrada e --bt-saida). */
const ENTRADA = "cubic-bezier(0.05, 0.7, 0.1, 1)";
const SAIDA = "cubic-bezier(0.3, 0, 0.8, 0.15)";

/**
 * A tira de cima do cartão (o cabeçalho; identidade, seção 4.3): o nome, as páginas (a atual com o quadrado de tinta), a
 * pausa e a ação (o carimbo miúdo, que vem pronto do servidor em `children`). O que tem estado, escrito como atributo
 * para o CSS (petshop.css, a tira):
 * - data-bt-rolada: a página saiu do alto (no alto da capa, a tira é o próprio cartão, sem papel por cima);
 * - data-bt-recolhida: recolhe ao descer e volta ao subir (responde à direção, não acompanha a posição);
 * - data-bt-acao-a-vista: o carimbo da capa ([data-bt-carimbo-da-capa]) saiu da tela, e a ação da tira aparece;
 * - a altura de verdade da tira, em --bt-tira-altura no <html> (o recuo das âncoras e das aberturas).
 * Abaixo de 1024 px (o passe do celular), a tira é uma linha só: o nome, o carimbo e o índice, que abre o menu
 * (`MenuDoCartao`). Sem script, a tira fica opaca, à vista, com a ação, e o índice abre o menu pela âncora.
 */
export function TiraDoCartao({
  nome,
  inicio,
  paginas,
  rotuloDasPaginas,
  pausa,
  menu,
  children,
}: {
  nome: string;
  inicio: string;
  paginas: readonly Pagina[];
  rotuloDasPaginas: string;
  pausa: { pausar: string; retomar: string };
  menu: { abrir: string; fechar: string; acao: React.ReactNode; pe: React.ReactNode };
  children: React.ReactNode;
}) {
  const caminho = usePathname();
  const tira = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = tira.current;
    if (!el) return;
    let ultimo = window.scrollY;
    let quadro = 0;
    const ler = () => {
      quadro = 0;
      const y = window.scrollY;
      el.toggleAttribute("data-bt-rolada", y > LIMIAR);
      if (Math.abs(y - ultimo) < LIMIAR) return;
      el.toggleAttribute("data-bt-recolhida", y > ultimo && y > el.offsetHeight * 2);
      ultimo = y;
    };
    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(ler);
    };
    const medida = new ResizeObserver(() => document.documentElement.style.setProperty("--bt-tira-altura", `${el.offsetHeight}px`));
    medida.observe(el);
    ler();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      window.removeEventListener("scroll", aoRolar);
      cancelAnimationFrame(quadro);
      medida.disconnect();
      document.documentElement.style.removeProperty("--bt-tira-altura");
    };
  }, []);

  useEffect(() => {
    const el = tira.current;
    const capa = document.querySelector("[data-bt-carimbo-da-capa]");
    if (!el || !capa) return;
    // O carimbo conta como fora quando some sob a própria tira.
    const observador = new IntersectionObserver(([e]) => el.toggleAttribute("data-bt-acao-a-vista", !e.isIntersecting), {
      rootMargin: `-${el.offsetHeight}px 0px 0px 0px`,
    });
    observador.observe(capa);
    return () => {
      observador.disconnect();
      el.removeAttribute("data-bt-acao-a-vista");
    };
  }, [caminho]);

  const aqui = (p: Pagina) => caminho === p.caminho || (p.caminho !== inicio && caminho.startsWith(`${p.caminho}/`));
  return (
    <header ref={tira} className="bt-tira">
      <div className="bt-tira-linha">
        <Link href={inicio} className="bt-tira-nome">
          <NomeEmDuas nome={nome} />
        </Link>
        <nav aria-label={rotuloDasPaginas} className="bt-tira-paginas">
          <ul>
            {paginas.map((p) => (
              <li key={p.id}>
                <Link href={p.caminho} aria-current={aqui(p) ? "page" : undefined} className="bt-tira-pagina">
                  <span aria-hidden="true" className="bt-tira-quadrado" />
                  {p.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Pausa rotulo={pausa} vigia />
        <span className="bt-tira-acao">{children}</span>
        <MenuDoCartao nome={nome} paginas={paginas} aqui={aqui} rotulo={rotuloDasPaginas} {...menu} />
      </div>
    </header>
  );
}

/**
 * O menu do celular (abaixo de 1024 px): o índice do cartão. O gatilho é o desenho da lista da tira (o quadrado de tinta
 * na primeira linha, as outras reservadas); abre um <dialog> modal em tela cheia (o foco preso, o Esc, o fundo inerte,
 * tudo nativo): a tinta translúcida sobre a página e o cartão como uma barra na direita, do lado do gatilho (pedido do
 * usuário, 14/10), com as páginas em exibição (a atual com o quadrado de tinta violeta), o carimbo e o horário. A barra
 * entra da borda direita (240 ms de entrada, 160 ms de saída, só transform e opacity; com movimento reduzido ou pelo
 * teclado, sem animação). Tocar fora da barra fecha. Sem script (ou antes de o script chegar), o gatilho é uma âncora para o próprio
 * menu, que aparece por :target, e o fechar volta ao conteúdo. Depois da hidratação, o gatilho e o fechar são botões
 * (role="button", e a barra de espaço os aciona em vez de rolar a página; o Impeccable, fechamento de 16.10.2026): a
 * âncora continua para quem está sem script.
 */
function MenuDoCartao({
  nome,
  paginas,
  aqui,
  rotulo,
  abrir,
  fechar,
  acao,
  pe,
}: {
  nome: string;
  paginas: readonly Pagina[];
  aqui: (p: Pagina) => boolean;
  rotulo: string;
  abrir: string;
  fechar: string;
  acao: React.ReactNode;
  pe: React.ReactNode;
}) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const [aberto, setAberto] = useState(false);
  // No servidor e na hidratação, a âncora; no cliente, o botão (sem descompasso na hidratação).
  const hidratado = useSyncExternalStore(nadaAssinar, () => true, () => false);
  const comoBotao = hidratado
    ? {
        role: "button",
        onKeyDown: (evento: React.KeyboardEvent<HTMLAnchorElement>) => {
          if (evento.key !== " ") return;
          evento.preventDefault(); // a barra de espaço não rola a página
          evento.currentTarget.click(); // o clique sem ponteiro: sem animação (anima)
        },
      }
    : {};

  // Sem movimento quando o usuário pede menos movimento ou quando a ação veio do teclado (o clique sem ponteiro).
  const anima = (evento: { detail: number }) => !window.matchMedia("(prefers-reduced-motion: reduce)").matches && evento.detail > 0;
  const quadros = (sai: boolean) => {
    const d = dialogo.current!;
    const cartao = d.querySelector(".bt-menu-cartao")!;
    const ida: Keyframe[] = [{ opacity: 0 }, { opacity: 1 }];
    // A barra entra da borda direita, inteira, sem esmaecer (até 14/10, o cartão do alto deslizava 2,5 rem e acendia).
    const cartaoIda: Keyframe[] = [{ transform: "translateX(100%)" }, { transform: "none" }];
    const opcoes = sai ? { duration: 160, easing: SAIDA, direction: "reverse" as const } : { duration: 240, easing: ENTRADA };
    d.animate(ida, { ...opcoes, duration: sai ? 160 : 180 });
    return cartao.animate(cartaoIda, opcoes).finished;
  };
  const abrirMenu = (evento: React.MouseEvent) => {
    evento.preventDefault();
    const d = dialogo.current;
    if (!d || d.open) return;
    d.showModal();
    setAberto(true);
    if (anima(evento)) quadros(false);
  };
  const fecharMenu = (comAnimacao: boolean) => {
    const d = dialogo.current;
    if (!d?.open) return;
    const fim = () => {
      d.close();
      setAberto(false);
    };
    if (comAnimacao) quadros(true).then(fim, fim);
    else fim();
  };

  // A tela que vira mesa (o tablet deitado) fecha o menu: na mesa ele não se desenha, e o modal deixaria a página inerte.
  useEffect(() => {
    const mesa = window.matchMedia("(min-width: 1024px)");
    const aoMudar = () => {
      if (mesa.matches && dialogo.current?.open) {
        dialogo.current.close();
        setAberto(false);
      }
    };
    mesa.addEventListener("change", aoMudar);
    return () => mesa.removeEventListener("change", aoMudar);
  }, []);

  return (
    <>
      <a
        href="#bt-menu"
        aria-haspopup="dialog"
        aria-controls="bt-menu"
        aria-expanded={aberto}
        aria-label={abrir}
        onClick={abrirMenu}
        className="bt-tira-indice"
        {...comoBotao}
      >
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <rect className="bt-tira-indice-tinta" x="1" y="3.5" width="4" height="4" />
          <path d="M8 4.75h11v1.5H8zM8 9.25h11v1.5H8zM8 13.75h11v1.5H8z" />
        </svg>
      </a>
      <dialog
        ref={dialogo}
        id="bt-menu"
        aria-label={rotulo}
        className="bt-menu"
        onCancel={(evento) => {
          // O Esc é teclado: fecha sem animar.
          evento.preventDefault();
          fecharMenu(false);
        }}
        onClick={(evento) => {
          // O toque no balcão (fora do cartão) fecha.
          if (evento.target === evento.currentTarget) fecharMenu(anima(evento));
        }}
      >
        <div className="bt-menu-cartao">
          <div className="bt-menu-topo">
            <p className="bt-menu-nome">
              <NomeEmDuas nome={nome} />
            </p>
            <a
              href="#conteudo"
              aria-label={fechar}
              onClick={(evento) => {
                // Aberto pela âncora (o endereço chegou com #bt-menu), o menu não é o modal: a âncora fecha, como sem script.
                if (!dialogo.current?.open) return;
                evento.preventDefault();
                fecharMenu(anima(evento));
              }}
              className="bt-menu-fechar"
              {...comoBotao}
            >
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M4.2 3.1 16.9 15.8l-1.1 1.1L3.1 4.2zM15.8 3.1l1.1 1.1L4.2 16.9l-1.1-1.1z" />
              </svg>
            </a>
          </div>
          <nav aria-label={rotulo}>
            <ul className="bt-menu-paginas">
              {paginas.map((p) => (
                <li key={p.id}>
                  {/* Fecha sem animar: a troca de página (o cartão desliza no balcão) é a animação. */}
                  <Link href={p.caminho} aria-current={aqui(p) ? "page" : undefined} onClick={() => fecharMenu(false)} className="bt-menu-pagina">
                    <span aria-hidden="true" className="bt-tira-quadrado" />
                    {p.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="bt-menu-acao">
            {acao}
            {pe}
          </div>
        </div>
      </dialog>
    </>
  );
}

/**
 * O nome com a quebra marcada ao meio ("Banho e Tosa / São Francisco"), num texto só, com a quebra de linha no lugar do
 * espaço: no celular, a tira o escreve em duas linhas, de propósito (white-space: pre-line; a quebra aparece, e não é a
 * letra que não coube); na mesa (nowrap), a quebra vale um espaço, e o nome sai igual, letra por letra.
 */
function NomeEmDuas({ nome }: { nome: string }) {
  const palavras = nome.split(" ");
  const meio = Math.ceil(palavras.length / 2);
  return `${palavras.slice(0, meio).join(" ")}\n${palavras.slice(meio).join(" ")}`;
}
