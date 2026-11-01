"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { planos } from "@/conteudo/planos";
import { reais } from "@/lib/moeda";

type Aparelho = "computador" | "celular";

/** Um site do simulador (conteudo/site.ts, simulador.sites). */
type SiteDoSimulador = {
  plano: string;
  caminho: string;
  endereco: string;
  nome: string;
  nicho: string;
  experimente: string;
  /** Quantas páginas o site tem (o plano manda: 3, 6, sem limite). */
  paginas: number;
};

/** Rótulos do diálogo, vindos do servidor (as ilhas não importam conteudo/site.ts). */
type TextosDoSimulador = {
  novaAba: string;
  fechar: string;
  aparelhos: Record<Aparelho, string>;
  planos: string;
  inclui: string;
  experimente: string;
  escolher: string;
  criacao: string;
  mensal: string;
  carregando: string;
  aviso: string;
  navegacao: { voltar: string; avancar: string; inicio: string; paginas: string; dica: string };
};

export type DadosDoSimulador = { textos: TextosDoSimulador; sites: readonly SiteDoSimulador[] };

/** Janela que cada site vê dentro do quadro: a de um computador comum e a de um celular comum. */
const JANELA = { computador: { largura: 1440 }, celular: { largura: 390, altura: 844 } };
const BARRA = 44; // barra do navegador desenhada no modo computador
/**
 * Moldura do celular, em volta da tela: 12 px (até 03/10, 11, fora da grade
 * de 4 px). O raio de fora é o da tela mais ela (36 + 12 = 48 px): cantos
 * concêntricos.
 */
const BORDA = 12;
/**
 * Folga em volta da moldura do celular, dentro do palco, que corta o que
 * passa da borda: 4 px de cada lado, para o anel de 1 px (ring-1) aparecer
 * inteiro. Até 03/10, só na altura; na largura, a moldura podia encostar.
 */
const FOLGA = 8;
/** A troca de aparelho: o conteúdo some em SUMICO ms; a transformação inteira dura TRANSFORMACAO ms. */
const SUMICO = 140;
const TRANSFORMACAO = 580;
/** Duração da saída do diálogo (.vd-simulador, app/nichos.css). */
const SAIDA = 450;

/** A forma da moldura dentro do palco: posição, tamanho e o raio dos cantos. */
type Forma = { x: number; y: number; largura: number; altura: number; raio: string };

/** A forma em estilo, para a casca da troca de aparelho. */
function estiloDa(forma: Forma) {
  return { left: `${forma.x}px`, top: `${forma.y}px`, width: `${forma.largura}px`, height: `${forma.altura}px`, borderRadius: forma.raio };
}

/**
 * O histórico do site aberto no quadro, visto daqui: os endereços na ordem
 * (caminho, busca e âncora — uma âncora do próprio site também é uma
 * entrada), a posição atual e os passos que voltar e avançar já pediram e o
 * quadro ainda não mostrou. O histórico do quadro e o da página do Atlas são
 * um só (o do navegador): voltar além do começo do site voltaria a página
 * do Atlas, e avançar além do fim a levaria adiante. Por isso as setas só
 * valem dentro do percurso conhecido.
 */
type Percurso = { entradas: string[]; posicao: number; pedido: number };

/** A entrada com este endereço mais perto da posição, primeiro no sentido pedido (sem pedido, para trás). */
function entradaMaisPerto({ entradas, posicao, pedido }: Percurso, endereco: string) {
  const sentido = Math.sign(pedido) || -1;
  for (let distancia = 1; distancia < entradas.length; distancia++) {
    for (const lado of [sentido, -sentido]) {
      const indice = posicao + lado * distancia;
      if (entradas[indice] === endereco) return indice;
    }
  }
  return -1;
}

type Props = {
  dados: DadosDoSimulador;
  /** O site do cartão clicado. */
  inicial: number;
  /** Chamado depois que o diálogo termina de sair. */
  aoFechar: () => void;
};

/**
 * O diálogo do simulador (carregado sob demanda por ilhas/simulador.tsx):
 * um <dialog> nativo — prende o foco, fecha com Esc, devolve o foco ao
 * cartão — com o site vivo num quadro, em escala: janela de 1440 px
 * (computador) ou de 390 × 844 (celular), navegável (rola, clica,
 * calcula). Trocar de aparelho não recarrega o site; trocar de plano, sim.
 * Ao lado, o plano: preço, o que inclui, o que experimentar, e "Escolher",
 * que fecha o diálogo e leva à página do orçamento com o plano marcado
 * (/orcamento#orcamento-<plano>). A página não rola enquanto
 * ele está aberto (html.simulador-aberto). Entra e sai só por opacidade.
 * Os sites têm várias páginas, e a navegação entre elas acontece dentro do
 * quadro (os vínculos são do mesmo site): a barra do navegador desenhada
 * mostra o endereço da página aberta, lido do próprio quadro, e tem
 * voltar, avançar e o início do site; "Abrir em nova aba" abre a página em
 * que se está. Nada é gravado.
 * Estados (regra 4 das diretrizes, 03/10): enquanto o site abre, o quadro
 * mostra o esqueleto de uma página (.vd-esqueleto), e o leitor de tela
 * ouve que ele está abrindo; durante a troca de aparelho, o seletor de
 * aparelho fica desabilitado à vista; voltar e avançar só se acendem quando
 * há para onde ir no próprio site; com o foco do teclado dentro do site, um
 * contorno interno marca o quadro. Até 03/10, o clique na troca era
 * ignorado sem sinal, as setas podiam sair do site e voltar a página do
 * Atlas, e o carregamento era só um texto.
 */
export default function PainelDoSimulador({ dados, inicial, aoFechar }: Props) {
  const { textos, sites } = dados;
  const dialogo = useRef<HTMLDialogElement>(null);
  const palco = useRef<HTMLDivElement>(null);
  const [indice, setIndice] = useState(inicial);
  const [aparelho, setAparelho] = useState<Aparelho>(() =>
    window.matchMedia("(min-width: 1024px)").matches ? "computador" : "celular"
  );
  const [carregado, setCarregado] = useState(false);
  const [medida, setMedida] = useState({ largura: 0, altura: 0 });
  const quadro = useRef<HTMLIFrameElement>(null);
  const [caminhoAberto, setCaminhoAberto] = useState(sites[inicial].caminho);
  const moldura = useRef<HTMLDivElement>(null);
  const casca = useRef<HTMLDivElement>(null);
  const troca = useRef<Forma | null>(null);
  const [trocando, setTrocando] = useState(false);
  // Sem entradas: o site ainda não foi lido no quadro (lerQuadro começa o percurso).
  const percurso = useRef<Percurso>({ entradas: [], posicao: 0, pedido: 0 });
  const [podeVoltar, setPodeVoltar] = useState(false);
  const [podeAvancar, setPodeAvancar] = useState(false);
  const [focoNoSite, setFocoNoSite] = useState(false);

  const site = sites[indice];
  const plano = planos.find((p) => p.id === site.plano)!;

  // Abre ao montar; a página para de rolar enquanto o diálogo está aberto.
  useEffect(() => {
    const raiz = document.documentElement;
    raiz.classList.add("simulador-aberto");
    dialogo.current?.showModal();
    return () => raiz.classList.remove("simulador-aberto");
  }, []);

  useEffect(() => {
    const elemento = palco.current;
    if (!elemento) return;
    const observador = new ResizeObserver(([entrada]) =>
      setMedida({ largura: entrada.contentRect.width, altura: entrada.contentRect.height })
    );
    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  // Fechou (botão, Esc ou "Escolher"): solta a página na hora e desmonta
  // depois da saída por opacidade.
  const aoFecharDialogo = () => {
    document.documentElement.classList.remove("simulador-aberto");
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(aoFechar, reduzir ? 0 : SAIDA);
  };
  const fechar = () => {
    document.documentElement.classList.remove("simulador-aberto");
    dialogo.current?.close();
  };
  // A troca de aparelho, como numa transformação: uma casca com a forma
  // da moldura (posição, tamanho e cantos) fica por baixo dela; o conteúdo
  // antigo se apaga, o aparelho troca, a casca vai da forma antiga à nova
  // e o conteúdo novo surge por cima, num cruzamento. O site no quadro não
  // recarrega. Tudo dentro do diálogo, com a Web Animations API: a View
  // Transitions API fotografa a página sem o diálogo modal (camada de
  // topo), que sumia durante a troca. Com movimento reduzido, troca seca.
  // Da primeira passagem ao fim da casca (~0,7 s), o seletor de aparelho
  // fica desabilitado à vista (trocando): um clique ali começaria outra
  // troca no meio desta.
  const formaDe = (elemento: HTMLElement): Forma => {
    const base = palco.current!.getBoundingClientRect();
    const r = elemento.getBoundingClientRect();
    return { x: r.left - base.left, y: r.top - base.top, largura: r.width, altura: r.height, raio: getComputedStyle(elemento).borderTopLeftRadius };
  };
  const trocarDeAparelho = (novo: Aparelho) => {
    if (novo === aparelho || troca.current || trocando) return;
    const elemento = moldura.current;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!elemento || !casca.current || reduzir) return setAparelho(novo);
    const de = formaDe(elemento);
    troca.current = de;
    setTrocando(true);
    // A casca nasce sob a moldura, na mesma forma: quando o conteúdo se apaga, ela já está lá.
    Object.assign(casca.current.style, { ...estiloDa(de), opacity: "1" });
    elemento
      .animate([{ opacity: 1 }, { opacity: 0 }], { duration: SUMICO, easing: "cubic-bezier(0.4, 0, 1, 1)", fill: "forwards" })
      .finished.then(() => setAparelho(novo), () => setAparelho(novo));
  };
  useLayoutEffect(() => {
    const de = troca.current;
    if (!de) return;
    troca.current = null;
    const elemento = moldura.current;
    const cascaAtual = casca.current;
    // Sem moldura (o palco sumiu no meio da troca): nada a animar, e o seletor volta.
    if (!elemento || !cascaAtual) return setTrocando(false);
    const para = formaDe(elemento);
    // A curva fica só no trecho da transformação (até 72% do tempo); o apagar
    // da casca é linear e cruza com a entrada do conteúdo novo (60% em diante).
    // Com a curva na animação inteira, a casca sumia antes de o conteúdo surgir.
    const movimento = cascaAtual.animate(
      [
        { ...estiloDa(de), opacity: 1, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
        { ...estiloDa(para), opacity: 1, offset: 0.72, easing: "linear" },
        { ...estiloDa(para), opacity: 0 },
      ],
      { duration: TRANSFORMACAO }
    );
    const terminar = () => {
      cascaAtual.style.opacity = "0";
      setTrocando(false);
    };
    movimento.finished.then(terminar, terminar);
    for (const animacao of elemento.getAnimations()) animacao.cancel();
    elemento.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: TRANSFORMACAO * 0.4,
      delay: TRANSFORMACAO * 0.6,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "backwards",
    });
  }, [aparelho]);

  const trocarDePlano = (i: number) => {
    if (i === indice) return;
    setCarregado(false);
    setIndice(i);
    setCaminhoAberto(sites[i].caminho);
    // O quadro novo começa um percurso novo; o foco que estava no site saiu com ele.
    percurso.current = { entradas: [], posicao: 0, pedido: 0 };
    setPodeVoltar(false);
    setPodeAvancar(false);
    setFocoNoSite(false);
  };

  // O endereço da página aberta no quadro: a navegação dos sites é no
  // cliente (sem evento de carga a cada página), então o quadro é lido a
  // cada 400 ms enquanto o diálogo está aberto, e também a cada travessia do
  // histórico dele (popstate, posto a cada carga do quadro). Mesmo domínio:
  // a leitura é permitida. Cada leitura acerta o percurso: um endereço novo
  // que vem de uma travessia (ou de um voltar/avançar pedido daqui) é uma
  // entrada que já estava nele; sem travessia, é um vínculo do próprio site,
  // que entra depois da atual e descarta o que estava à frente. Travessia
  // para um endereço desconhecido recomeça o percurso nele: na dúvida, as
  // setas se apagam, e nunca levam para fora do site.
  const lerQuadro = useCallback((travessia = false) => {
    let local: Location | undefined;
    try {
      local = quadro.current?.contentWindow?.location;
    } catch {
      return; // Outro domínio (não acontece aqui): fica o último endereço conhecido.
    }
    if (!local || local.pathname === "blank") return;
    const endereco = local.pathname + local.search + local.hash;
    const p = percurso.current;
    if (!p.entradas.length) {
      p.entradas = [endereco];
    } else if (endereco !== p.entradas[p.posicao]) {
      const destino = travessia || p.pedido ? entradaMaisPerto(p, endereco) : -1;
      if (destino >= 0) {
        // O que andou no sentido pedido desconta do pedido; o resto ainda está a caminho.
        const andou = destino - p.posicao;
        const resto = p.pedido - andou;
        p.pedido = Math.sign(andou) === Math.sign(p.pedido) && Math.sign(resto) === Math.sign(p.pedido) ? resto : 0;
        p.posicao = destino;
      } else if (travessia || p.pedido) {
        Object.assign(p, { entradas: [endereco], posicao: 0, pedido: 0 });
      } else {
        p.entradas = [...p.entradas.slice(0, p.posicao + 1), endereco];
        p.posicao = p.entradas.length - 1;
      }
    }
    setCaminhoAberto(local.pathname);
    setPodeVoltar(p.posicao + p.pedido > 0);
    setPodeAvancar(p.posicao + p.pedido < p.entradas.length - 1);
  }, []);
  useEffect(() => {
    const intervalo = window.setInterval(lerQuadro, 400);
    return () => window.clearInterval(intervalo);
  }, [lerQuadro]);
  const navegar = (acao: "voltar" | "avancar" | "inicio") => {
    const janelaDoSite = quadro.current?.contentWindow;
    if (!janelaDoSite) return;
    if (acao === "inicio") return janelaDoSite.location.assign(site.caminho);
    const p = percurso.current;
    const passo = acao === "voltar" ? -1 : 1;
    const destino = p.posicao + p.pedido + passo;
    // Sem para onde ir dentro do site, a seta está apagada e não faz nada.
    if (destino < 0 || destino > p.entradas.length - 1) return;
    p.pedido += passo;
    setPodeVoltar(destino > 0);
    setPodeAvancar(destino < p.entradas.length - 1);
    if (passo < 0) janelaDoSite.history.back();
    else janelaDoSite.history.forward();
  };
  const dominio = site.endereco.slice(0, site.endereco.indexOf("/"));

  // O site no quadro com o foco do teclado. O <iframe> não casa com :focus
  // (é contêiner de navegação, pela especificação do HTML; nem com
  // :focus-within, no Chromium), e o anel de quem tem o foco lá dentro é do
  // próprio site: em escala, fino, e cortado na borda do quadro. Daí um
  // contorno interno no invólucro, por cima do site, enquanto o foco que
  // entrou pelo Tab estiver lá dentro: a janela do Atlas perde o foco para o
  // quadro logo depois de um Tab e o recebe de volta na saída. Com o
  // ponteiro (o clique dentro do site), não há contorno, como no :focus-visible.
  useEffect(() => {
    let tab = -Infinity;
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Tab") tab = performance.now();
    };
    const aoSairParaOQuadro = () => {
      if (document.activeElement === quadro.current && performance.now() - tab < 300) setFocoNoSite(true);
    };
    const aoVoltar = () => setFocoNoSite(false);
    window.addEventListener("keydown", aoTeclar);
    window.addEventListener("blur", aoSairParaOQuadro);
    window.addEventListener("focus", aoVoltar);
    return () => {
      window.removeEventListener("keydown", aoTeclar);
      window.removeEventListener("blur", aoSairParaOQuadro);
      window.removeEventListener("focus", aoVoltar);
    };
  }, []);

  // Geometria do quadro: o palco medido dá a escala de cada aparelho. No
  // celular, a moldura (BORDA dos dois lados) e a FOLGA cabem no palco.
  const computador = aparelho === "computador";
  const escala = computador
    ? medida.largura / JANELA.computador.largura
    : Math.min(
        1,
        (medida.altura - 2 * BORDA - FOLGA) / JANELA.celular.altura,
        (medida.largura - 2 * BORDA - FOLGA) / JANELA.celular.largura
      );
  const janela = computador
    ? { largura: medida.largura, altura: Math.max(0, medida.altura - BARRA) }
    : { largura: JANELA.celular.largura * escala, altura: JANELA.celular.altura * escala };
  const interna = computador
    ? { largura: JANELA.computador.largura, altura: escala > 0 ? janela.altura / escala : 0 }
    : { largura: JANELA.celular.largura, altura: JANELA.celular.altura };
  const pronto = medida.largura > 0 && escala > 0;

  return (
    <dialog
      ref={dialogo}
      onClose={aoFecharDialogo}
      aria-labelledby="simulador-titulo"
      data-tom="escuro"
      className="vd-simulador m-auto h-[min(94dvh,980px)] max-h-none w-[min(97vw,1680px)] max-w-none overflow-hidden rounded-[28px] border border-border bg-deep p-0 text-foreground"
    >
      <div className="flex h-full flex-col">
        {/* Barra: planos, aparelho e fechar. Os recuos são os do palco e do
            lado (24 px a partir de 1024 px), para as bordas se alinharem; até
            03/10, 20 e 28 px misturados com 16 e 24. */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 md:px-6">
          <div role="group" aria-label={textos.planos} className="vd-vidro flex rounded-full p-1">
            {sites.map((s, i) => (
              <button
                key={s.plano}
                type="button"
                aria-pressed={i === indice}
                onClick={() => trocarDePlano(i)}
                className="min-h-11 cursor-pointer rounded-full px-4 text-nota font-semibold text-muted-foreground transition-colors duration-300 hover:text-foreground aria-pressed:bg-foreground aria-pressed:text-background"
              >
                {planos.find((p) => p.id === s.plano)!.nome}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div role="group" aria-label="Aparelho" className="vd-vidro flex rounded-full p-1">
              {/* aria-disabled, não disabled, durante a troca: o botão desabilitado
                  perderia o foco do teclado no meio do diálogo. O clique é ignorado
                  em trocarDeAparelho; o apagado e o cursor vêm da base e daqui. O
                  hover fica o simples: um "not-aria-disabled:hover:" pesaria mais que
                  o aria-pressed, e o texto do aparelho escolhido sumiria no hover. */}
              {(["computador", "celular"] as const).map((a) => (
                <button
                  key={a}
                  type="button"
                  aria-pressed={aparelho === a}
                  aria-disabled={trocando || undefined}
                  onClick={() => trocarDeAparelho(a)}
                  className="min-h-11 cursor-pointer rounded-full px-4 text-nota font-semibold text-muted-foreground transition-[color,background-color,opacity] duration-300 hover:text-foreground aria-disabled:cursor-not-allowed aria-pressed:bg-foreground aria-pressed:text-background"
                >
                  {textos.aparelhos[a]}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={fechar}
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-border transition-colors duration-300 hover:bg-foreground/10"
            >
              <span className="sr-only">{textos.fechar}</span>
              <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="m4 4 8 8M12 4l-8 8" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 max-lg:overflow-y-auto lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* O palco: o site vivo, em escala, no quadro do aparelho. */}
          <div ref={palco} className="relative min-h-0 overflow-hidden max-lg:h-[68dvh] max-lg:flex-none lg:m-6 lg:mr-0">
            {/* A casca da troca de aparelho: só aparece durante a transformação (trocarDeAparelho).
                Ela e a moldura do celular flutuam sobre uma sombra de 90 px a 90% de preto (saiu em 03/10
                pela regra 3 das Diretrizes de Design Premium e voltou no mesmo dia, a pedido do usuário:
                é parte da identidade do site). */}
            <div ref={casca} aria-hidden="true" className="pointer-events-none absolute border border-border bg-card opacity-0 shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9)]" />
            {pronto && (
              <div
                ref={moldura}
                className={
                  computador
                    ? "absolute inset-0 overflow-hidden rounded-[16px] border border-border bg-card"
                    : "vd-moldura-de-celular absolute top-1/2 left-1/2 -translate-1/2 rounded-[48px] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9)] ring-1 ring-foreground/15"
                }
                style={computador ? undefined : { padding: BORDA }}
              >
                {computador && (
                  <div className="flex items-center gap-3 border-b border-border px-3" style={{ height: BARRA }}>
                    <span aria-hidden="true" className="flex gap-1.5 pl-1">
                      {[0, 1, 2].map((k) => (
                        <span key={k} className="size-2.5 rounded-full bg-foreground/20" />
                      ))}
                    </span>
                    <span className="flex">
                      {(
                        [
                          ["voltar", "M10 3 5 8l5 5"],
                          ["avancar", "m6 3 5 5-5 5"],
                          ["inicio", "M2.5 7.5 8 3l5.5 4.5V13h-3.5V9.5h-4V13H2.5Z"],
                        ] as const
                      ).map(([acao, desenho]) => (
                        <button
                          key={acao}
                          type="button"
                          // Voltar e avançar, apagados sem para onde ir no site (aria-disabled: o foco fica).
                          aria-disabled={(acao === "voltar" && !podeVoltar) || (acao === "avancar" && !podeAvancar) || undefined}
                          onClick={() => navegar(acao)}
                          className="grid size-9 cursor-pointer place-items-center rounded-full text-muted-foreground transition-[color,background-color,opacity] duration-300 not-aria-disabled:hover:bg-foreground/10 not-aria-disabled:hover:text-foreground aria-disabled:cursor-not-allowed"
                        >
                          <span className="sr-only">{textos.navegacao[acao]}</span>
                          <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                            <path d={desenho} />
                          </svg>
                        </button>
                      ))}
                    </span>
                    <span role="status" aria-live="polite" className="mx-auto max-w-[62%] truncate rounded-full bg-background/60 px-4 py-1 text-rotulo text-muted-foreground">
                      <span className="sr-only">Página aberta: </span>
                      {dominio}
                      <span className="text-foreground">{caminhoAberto}</span>
                    </span>
                    <span aria-hidden="true" className="w-[118px]" />
                  </div>
                )}
                {/* O invólucro do site: o contorno interno (::after, por cima do site)
                    acende com o foco do teclado lá dentro (focoNoSite). */}
                <div
                  data-foco={focoNoSite || undefined}
                  className={`relative overflow-hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:ring-2 after:ring-ring after:ring-inset after:transition-opacity after:duration-300 data-foco:after:opacity-100 ${computador ? "" : "rounded-[36px]"}`}
                  style={{ width: janela.largura, height: janela.altura }}
                >
                  <iframe
                    ref={quadro}
                    key={site.caminho}
                    src={site.caminho}
                    title={`${site.nome}, site de demonstração do plano ${plano.nome}`}
                    onLoad={() => {
                      setCarregado(true);
                      // A cada documento novo no quadro, a travessia do histórico dele também é lida.
                      quadro.current?.contentWindow?.addEventListener("popstate", () => lerQuadro(true));
                      lerQuadro();
                    }}
                    className="absolute top-0 left-0 origin-top-left border-0 bg-background"
                    style={{ width: interna.largura, height: interna.altura, transform: `scale(${escala})` }}
                  />
                  {/* Enquanto o site abre: o esqueleto de uma página (a barra, o título,
                      o texto, a ação e três blocos), que pulsa a cada site novo (key); para
                      o leitor de tela, o texto. Some por opacidade quando o site chega.
                      Até 03/10, só o nome do plano e do site e "Abrindo o site…". */}
                  <div
                    aria-hidden={carregado}
                    className={`absolute inset-0 bg-card transition-opacity duration-500 ${carregado ? "pointer-events-none opacity-0" : "opacity-100"}`}
                  >
                    <p role="status" className="sr-only">
                      {carregado ? "" : `${textos.carregando} ${site.nome}…`}
                    </p>
                    <div key={site.caminho} aria-hidden="true" className="flex h-full flex-col gap-6 p-6">
                      <div className="flex items-center justify-between gap-6">
                        <span className="vd-esqueleto h-6 w-24 rounded-md" />
                        <span className="vd-esqueleto h-6 w-2/5 max-w-72 rounded-full" />
                      </div>
                      <div className="mt-6 flex max-w-xl flex-col gap-3">
                        <span className="vd-esqueleto h-10 w-11/12 rounded-lg" />
                        <span className="vd-esqueleto h-10 w-3/5 rounded-lg" />
                        <span className="vd-esqueleto mt-3 h-4 w-full rounded-full" />
                        <span className="vd-esqueleto h-4 w-4/5 rounded-full" />
                        <span className="vd-esqueleto mt-3 h-11 w-40 rounded-full" />
                      </div>
                      <div className="mt-auto grid grid-cols-3 gap-4">
                        {[0, 1, 2].map((k) => (
                          <span key={k} className="vd-esqueleto aspect-[4/3] rounded-lg" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* O plano ao lado do site. */}
          {/* Na escala (regra 1): rótulos em text-rotulo, o nome do site em
              text-numero (o título do diálogo, 24 a 36 px), o preço em
              text-destaque (abaixo do nome, que é o que se escolhe aqui), o
              resto em text-nota. Até 03/10, nove tamanhos soltos, de 11,8 a 28 px.
              O nome, o preço e o número de páginas em Archivo Black, como os
              títulos e os números do site de 28/08 (desde 05/10). */}
          <aside className="flex flex-col gap-6 overflow-y-auto border-border p-6 max-lg:border-t lg:border-l">
            <div>
              <p className="text-rotulo font-semibold tracking-wider text-accent uppercase">{plano.nome}</p>
              <h2 id="simulador-titulo" className="mt-3 text-numero">
                {site.nome}
              </h2>
              <p className="mt-1.5 text-nota text-muted-foreground">{site.nicho}</p>
              <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-destaque tracking-titulo tabular-nums">{reais(plano.criacao)}</span>
                <span className="text-nota text-muted-foreground">{textos.criacao}</span>
                <span className="text-nota text-muted-foreground tabular-nums">
                  + {reais(plano.mensal)} {textos.mensal}
                </span>
              </p>
            </div>
            <div>
              <p className="text-rotulo font-semibold tracking-wider text-muted-foreground uppercase">{textos.inclui}</p>
              <ul className="mt-3 grid gap-2.5 text-nota">
                {plano.itens.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-1 size-3.5 flex-none text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3.5 8.4 2.9 2.8 6-6.4" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-rotulo font-semibold tracking-wider text-muted-foreground uppercase">{textos.experimente}</p>
              <p className="mt-2 text-nota">{site.experimente}</p>
              <p className="mt-3 flex items-baseline gap-2 text-nota text-muted-foreground">
                <span className="font-display text-corpo text-foreground tabular-nums">{site.paginas}</span>
                {textos.navegacao.paginas} · {textos.navegacao.dica}
              </p>
            </div>
            <div className="mt-auto grid gap-2.5">
              <Link
                href={`/orcamento#orcamento-${plano.id}`}
                onClick={fechar}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-nota font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary-hover"
              >
                {textos.escolher} {plano.nome}
              </Link>
              <a
                href={caminhoAberto}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border px-6 text-nota font-semibold transition-colors duration-300 hover:border-foreground/40"
              >
                {textos.novaAba}
                <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h7v7M13 3 4 12" />
                </svg>
              </a>
              <p className="mt-1 text-rotulo text-muted-foreground">{textos.aviso}</p>
            </div>
          </aside>
        </div>
      </div>
    </dialog>
  );
}
