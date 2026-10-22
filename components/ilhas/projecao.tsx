"use client";

import { useEffect, useRef, useState } from "react";

import type { Projecao as Desenho } from "@/components/ilhas/desenho-da-projecao";
import { CASAS_LAT, CASAS_LON, casaDe, grausDaCasa, type Casa } from "@/components/paginas/grade-da-terra";
import { aoVivo } from "@/lib/ambiente";
import type { Lugar } from "@/lib/sol";

/**
 * A projeção que se desenrola, a abertura de /o-atlas (desde 17/10, a direção final do Atlas Digital, seções 2.4, 2.8,
 * 2.9 e 3, item 19): o globo gravado, centrado em Niterói, vira a grade em que uma casa é um grau, a imagem que o
 * computador guarda da Terra. No lugar do globo da marca que girava e da longitude de 12 px lida da fase da animação
 * (ilhas/longitude-do-globo.tsx, até 17/10: o fechamento com o Impeccable leu "o instrumento mede a própria animação",
 * e a coluna alargava com a letra a 200%).
 * - A passagem (1,2 s): ao entrar na tela (uma vez por visita, com o disco inteiro à vista: nunca presa à rolagem, M8),
 *   ou pelas teclas "Esfera" e "Grade" (aria-pressed). O laço passa por aoVivo (lib/ambiente.ts), a 30 quadros por
 *   segundo, e só enquanto a passagem anda: parada a página, a passagem para onde está e segue ao voltar; em pausa, a
 *   tecla troca de uma vez. Com movimento reduzido, os dois estados lado a lado, parados, e sem as teclas.
 * - A leitura (a anatomia .vd-leitura): a casa sob o ponteiro, o toque ou as setas, com a latitude e a longitude em
 *   graus inteiros, no Archivo Black chapado, com a troca em Bayer (desde 18/10, a decisão do aprovador; até então, em
 *   meio-tom), e terra ou mar. Sem nada sob a mão, a casa de Niterói. O servidor escreve a de Niterói em texto; o canvas a substitui depois de montar.
 *   No toque (desde 18/10), lê ao tocar e no arraste de lado; o arraste de pé rola a página. No celular, a grade é uma
 *   janela de 120° que corre sob o arraste de lado (ilhas/desenho-da-projecao.ts, correr).
 * - A caixa é um role="slider" (a tabela 2.9; desde a revisão de 17/10): no modo de navegação do NVDA e do JAWS, as
 *   setas chegam a ela, e não ao cursor virtual, como chegavam a um role="group". O valor é a casa (linha · 360 +
 *   coluna), e o aria-valuetext, a frase inteira, que muda pelo teclado e no fim do toque ou do arraste (desde o
 *   fechamento de 18/10); o mouse que só passa não fala.
 * - O desenho (ilhas/desenho-da-projecao.ts) e a máscara (public/dados/terra-05.bin, o mesmo pedido da capa) chegam por
 *   import() depois do load; até lá, fica o globo da marca, que o servidor desenha (`reserva`).
 */

type Textos = {
  /** O nome da caixa para o leitor de tela, com o que as setas fazem. */
  regiao: string;
  teclas: { rotulo: string; esfera: string; grade: string };
  leitura: { niteroi: string; apontada: string; terra: string; mar: string; carimbo: string };
};

type Props = {
  lugar: Lugar;
  nome: string;
  textos: Textos;
  /** O globo da marca, do servidor: a figura até o desenho chegar, e sem script. */
  reserva: React.ReactNode;
};

/** As amostras do mostrador: o mais largo de cada hemisfério, com dois e três algarismos. */
const AMOSTRAS = ["88° N  188° O", "88° S  188° O", "88° N  188° L", "88° S  188° L"];
/** Com o disco inteiro à vista (95% da caixa, ou o que couber na janela), a passagem começa, depois de um instante
 *  parada, para a esfera ser vista (até a revisão de 17/10, com 70% e 350 ms: o globo quase nunca se via inteiro). */
const A_VISTA = 0.95;
const ESPERA = 700;

const escrita = (casa: Casa) => {
  const { lat, lon } = grausDaCasa(casa);
  return `${lat}  ${lon}`;
};

export function Projecao({ lugar, nome, textos, reserva }: Props) {
  const caixa = useRef<HTMLDivElement>(null);
  const mapa = useRef<HTMLCanvasElement>(null);
  const mira = useRef<HTMLCanvasElement>(null);
  const numero = useRef<HTMLCanvasElement>(null);
  const desenho = useRef<Desenho | null>(null);
  const escrever = useRef<((texto: string) => void) | null>(null);
  /** O valor de agora, para o mostrador que se refaz com a largura da coluna. */
  const valorAtual = useRef("");
  /** Leva a passagem a 0 (a esfera) ou a 1 (a grade). */
  const ir = useRef<(alvo: 0 | 1) => void>(() => {});
  const niteroi = casaDe(lugar.latitude, lugar.longitude);
  const [estado, setEstado] = useState<"esfera" | "grade">("esfera");
  const [pronta, setPronta] = useState(false);
  const [vivo, setVivo] = useState(false);
  /** A casa lida (null: a de Niterói) e se ela é terra (null: ainda sem a máscara; Niterói é terra na grade de 1°). */
  const [lida, setLida] = useState<{ casa: Casa | null; terra: boolean | null }>({ casa: null, terra: null });
  /** A casa e a frase do slider: o teclado e o fim do gesto as mudam (o mouse que só passa não fala). */
  const [falada, setFalada] = useState<{ casa: Casa; texto: string } | null>(null);

  const casa = lida.casa ?? niteroi;
  const ehTerra = lida.terra ?? true;
  const rotulo = `${lida.casa ? textos.leitura.apontada : textos.leitura.niteroi}, ${ehTerra ? textos.leitura.terra : textos.leitura.mar}`;

  useEffect(() => {
    const elemento = caixa.current!;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pausada = () => document.documentElement.classList.contains("ambiente-pausado");
    let ativo = true;
    let desligar = () => {};

    const comecar = () =>
      Promise.all([import("@/components/ilhas/desenho-da-projecao"), document.fonts.ready]).then(async ([modulo]) => {
        const mascara = await modulo.carregarMascara();
        if (!ativo) return;
        const d = modulo.projecao({ mapa: mapa.current!, mira: mira.current!, mascara, lugar, nome, reduzido: reduzir });
        desenho.current = d;
        d.medir();
        setPronta(true);
        setLida((l) => ({ ...l, terra: d.terra(l.casa ?? niteroi) }));

        // A passagem: t de 0 a 1, somado pelo laço (o tempo parado não conta).
        let t = 0;
        let alvo: 0 | 1 = 0;
        let pararLaco: (() => void) | null = null;
        let anterior: number | null = null;
        let ultimo = -Infinity;
        const andar = (agora: number) => {
          const dt = anterior === null ? 0 : agora - anterior;
          anterior = agora;
          if (dt > 0 && dt < 250) t = Math.max(0, Math.min(1, t + (alvo ? 1 : -1) * (dt / modulo.DURACAO)));
          const fim = t === alvo;
          if (!fim && agora - ultimo < 32) return;
          ultimo = agora;
          d.desenhar(t);
          if (fim) {
            // Depois do quadro: o aoVivo pede o próximo ao voltar daqui, e só então pode ser desligado.
            const parar = pararLaco;
            pararLaco = null;
            queueMicrotask(() => parar?.());
          }
        };
        ir.current = (novo) => {
          alvo = novo;
          setEstado(novo ? "grade" : "esfera");
          // A leitura volta a Niterói com a mira (desde a revisão de 18/10: no toque, nada a voltava, e a leitura dizia
          // a casa de antes, sem marca no outro estado).
          d.mirar(null);
          setLida({ casa: null, terra: d.terra(niteroi) });
          setFalada(null);
          if (pausada()) {
            // Em pausa, a tecla troca de uma vez: a mão pediu, e nada anda.
            t = novo;
            pararLaco?.();
            pararLaco = null;
            d.desenhar(t);
            return;
          }
          if (pararLaco) return;
          anterior = null;
          pararLaco = aoVivo(elemento, andar);
        };

        // A entrada na tela: uma vez, com o disco à vista; não com movimento reduzido (os dois estados já estão lado a
        // lado). Na janela mais baixa que a caixa, basta o que cabe nela.
        let espera = 0;
        const limiar = Math.min(A_VISTA, (window.innerHeight * 0.9) / elemento.offsetHeight);
        const observador = new IntersectionObserver(
          ([e]) => {
            clearTimeout(espera);
            if (!e.isIntersecting || reduzir) return;
            espera = window.setTimeout(() => {
              observador.disconnect();
              if (alvo === 0 && t === 0 && !pausada()) ir.current(1);
            }, ESPERA);
          },
          { threshold: limiar },
        );
        observador.observe(elemento);

        let largura = Math.round(elemento.getBoundingClientRect().width);
        const medida = new ResizeObserver(() => {
          const nova = Math.round(elemento.getBoundingClientRect().width);
          if (nova === largura) return;
          largura = nova;
          d.medir();
        });
        medida.observe(elemento);

        desligar = () => {
          clearTimeout(espera);
          observador.disconnect();
          medida.disconnect();
          pararLaco?.();
        };
      });

    // O mostrador, no corpo do texto de reserva (2,8 rem, que acompanha a letra do leitor: o valor nunca fica menor que
    // o rótulo, e nada pula quando o canvas chega); se não couber na coluna, a latitude e a longitude em duas linhas; se
    // ainda não, a três quartos dele (como a folha das 72 horas). A escolha se refaz quando a coluna muda de largura (até
    // a revisão de 17/10, só na montagem: com a janela estreitada depois, o valor saía 10 px da coluna).
    let pararMostrador = () => {};
    let vez = 0;
    let colunaMedida = -1;
    const painel = numero.current!.closest<HTMLElement>(".vd-projecao-painel")!;
    const escolher = async () => {
      const estilo = getComputedStyle(painel);
      const largura = painel.clientWidth - parseFloat(estilo.paddingLeft) - parseFloat(estilo.paddingRight);
      if (largura === colunaMedida) return;
      colunaMedida = largura;
      const minha = ++vez;
      const { familiaDoTitulo, mostrador } = await import("@/components/ilhas/desenho-da-projecao");
      const familia = familiaDoTitulo();
      await document.fonts.load(`64px ${familia}`, "0123456789°NSOL");
      if (!ativo || minha !== vez) return;
      const reserva = getComputedStyle(numero.current!.nextElementSibling!);
      const corpo = parseFloat(reserva.fontSize);
      const tentativas = [
        [corpo, false],
        [corpo, true],
        [corpo * 0.75, true],
      ] as const;
      for (const [i, [tamanho, duas]] of tentativas.entries()) {
        const linhas = (t: string) => (duas ? t.replace("  ", "\n") : t);
        pararMostrador();
        let m = mostrador(numero.current!, familia, tamanho, AMOSTRAS.map(linhas), reserva.color);
        pararMostrador = m.parar;
        const medida = parseFloat(numero.current!.style.width);
        if (medida > largura) {
          if (i < tentativas.length - 1) continue;
          // A última, no corpo que cabe (desde a revisão de 18/10: com a letra a 200% a 320 px, a coluna tem 192 px, e o
          // valor de 234 px alargava a leitura por cima da moldura).
          m.parar();
          m = mostrador(numero.current!, familia, Math.floor((tamanho * largura * 0.98) / medida), AMOSTRAS.map(linhas), reserva.color);
          pararMostrador = m.parar;
        }
        escrever.current = (texto) => m.escrever(linhas(texto), !pausada());
        escrever.current(valorAtual.current);
        setVivo(true);
        return;
      }
    };
    const medidaDoPainel = new ResizeObserver(() => {
      escolher().catch(() => {});
    });

    const aoCarregar = () => {
      comecar().catch(() => {
        // Sem a máscara (a rede caiu), fica o globo da marca do servidor: a abertura continua inteira.
      });
      medidaDoPainel.observe(painel);
    };
    if (document.readyState === "complete") aoCarregar();
    else window.addEventListener("load", aoCarregar, { once: true });

    return () => {
      ativo = false;
      window.removeEventListener("load", aoCarregar);
      medidaDoPainel.disconnect();
      pararMostrador();
      desligar();
    };
    // O lugar e os textos vêm de conteudo/site.ts e não mudam durante a visita.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // O valor segue a casa lida.
  const valor = escrita(casa);
  useEffect(() => {
    valorAtual.current = valor;
    escrever.current?.(valor);
  }, [valor]);

  const ler = (nova: Casa | null, falar = false, seguir = falar) => {
    const d = desenho.current;
    if (!d) return;
    // Pelo teclado (seguir), a janela da grade segue a casa que sai dela; o dedo já está sobre a casa que lê.
    d.mirar(nova, seguir);
    setLida({ casa: nova, terra: d.terra(nova ?? niteroi) });
    if (falar) {
      const c = nova ?? niteroi;
      const { lat, lon } = grausDaCasa(c);
      setFalada({ casa: c, texto: `${nova ? textos.leitura.apontada : textos.leitura.niteroi}: ${lat}, ${lon}, ${d.terra(c) ? textos.leitura.terra : textos.leitura.mar}.` });
    }
  };

  /** A leitura sob o ponteiro: a casa sob ele, ou Niterói fora da Terra; com `falar`, também a do slider. */
  const lerSob = (e: React.PointerEvent, falar = false) => {
    const d = desenho.current;
    if (!d) return;
    const r = caixa.current!.getBoundingClientRect();
    const c = d.apontar(e.clientX - r.left, e.clientY - r.top);
    if (c || lida.casa || falar) ler(c, falar, false);
  };

  // O gesto (desde 18/10, o passe do celular): o mouse lê ao passar; o toque lê ao tocar, e não ao pousar (um arraste
  // de pé é a página que rola, touch-action: pan-y, e não mexia mais na leitura). O arraste de lado lê sob o dedo na
  // esfera e, na janela da grade, corre a grade: a casa pega no começo fica sob o dedo e na leitura. Também com o mouse
  // apertado, na janela. O desenho do arraste vai a um quadro por vez.
  const gesto = useRef<{ x: number; y: number; ultimoX: number; modo: "ler" | "correr" | null; casa: Casa | null; quadro: number; falta: number } | null>(null);
  const comecar = (e: React.PointerEvent) => {
    const d = desenho.current;
    if (!d) return;
    const mouse = e.pointerType === "mouse";
    if (mouse && !(d.corre() && e.button === 0)) return lerSob(e);
    gesto.current = { x: e.clientX, y: e.clientY, ultimoX: e.clientX, modo: null, casa: null, quadro: 0, falta: 0 };
    if (mouse) e.currentTarget.setPointerCapture(e.pointerId);
  };
  const arrastar = (e: React.PointerEvent) => {
    const d = desenho.current;
    const g = gesto.current;
    if (!d) return;
    if (!g) {
      if (e.pointerType === "mouse") lerSob(e);
      return;
    }
    if (!g.modo) {
      const dx = e.clientX - g.x;
      const dy = e.clientY - g.y;
      if (Math.hypot(dx, dy) < 6) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        gesto.current = null;
        return;
      }
      g.modo = d.corre() ? "correr" : "ler";
      if (g.modo === "correr") {
        const r = caixa.current!.getBoundingClientRect();
        g.casa = d.apontar(g.x - r.left, g.y - r.top);
        if (g.casa) ler(g.casa);
      }
    }
    if (g.modo === "ler") return lerSob(e);
    g.falta += e.clientX - g.ultimoX;
    g.ultimoX = e.clientX;
    if (!g.quadro)
      g.quadro = requestAnimationFrame(() => {
        g.quadro = 0;
        d.correr(g.falta);
        g.falta = 0;
        d.mirar(g.casa ?? lida.casa);
      });
  };
  // O fim do gesto fala a leitura, como as setas (desde o fechamento de 18/10: o slider ficava em Niterói, e a tela
  // dizia a casa tocada): o toque sem arraste e o arraste na esfera, a casa sob o dedo; na janela, a que correu com ele.
  const soltar = (e: React.PointerEvent) => {
    const g = gesto.current;
    gesto.current = null;
    if (!g) return;
    if (g.modo === "correr") ler(g.casa ?? lida.casa, true, false);
    else lerSob(e, true);
  };

  const tecla = (e: React.KeyboardEvent) => {
    const passo = e.shiftKey ? 10 : 1;
    const mover = { ArrowUp: [-passo, 0], ArrowDown: [passo, 0], ArrowLeft: [0, -passo], ArrowRight: [0, passo] }[e.key];
    if (mover) {
      e.preventDefault();
      const linha = Math.max(0, Math.min(179, casa.linha + mover[0]));
      const coluna = (((casa.coluna + mover[1]) % 360) + 360) % 360;
      ler({ linha, coluna }, true);
    } else if (e.key === "Home" || e.key === "Escape") {
      e.preventDefault();
      desenho.current?.correr(null);
      ler(null, true);
    }
  };

  const { lat, lon } = grausDaCasa(niteroi);
  const dita = falada?.casa ?? niteroi;
  return (
    <div className="vd-projecao-vivo" data-estado={estado} data-pronta={pronta || undefined}>
      <div
        ref={caixa}
        tabIndex={0}
        role="slider"
        aria-label={textos.regiao}
        aria-valuemin={0}
        aria-valuemax={CASAS_LAT * CASAS_LON - 1}
        aria-valuenow={dita.linha * CASAS_LON + dita.coluna}
        aria-valuetext={falada?.texto ?? `${textos.leitura.niteroi}: ${lat}, ${lon}, ${textos.leitura.terra}.`}
        className="vd-projecao-caixa"
        onPointerDown={comecar}
        onPointerMove={arrastar}
        onPointerUp={soltar}
        onPointerCancel={() => {
          if (gesto.current?.modo) ler(lida.casa, true, false);
          gesto.current = null;
        }}
        onPointerLeave={(e) => e.pointerType === "mouse" && !gesto.current && ler(null, falada !== null, false)}
        onKeyDown={tecla}
      >
        <div aria-hidden="true" className="vd-projecao-reserva">
          {reserva}
        </div>
        <canvas ref={mapa} aria-hidden="true" />
        <canvas ref={mira} aria-hidden="true" />
      </div>
      <div className="vd-projecao-painel">
        <div className="vd-leitura">
          <p aria-hidden="true" className="rotulo">
            {rotulo}
          </p>
          <div aria-hidden="true" className="valor vd-projecao-valor" data-vivo={vivo || undefined}>
            <canvas ref={numero} />
            <span>{valor}</span>
          </div>
          <p className="carimbo">{textos.leitura.carimbo}</p>
        </div>
        <div role="group" aria-label={textos.teclas.rotulo} className="vd-projecao-teclas">
          <button type="button" aria-pressed={estado === "esfera"} onClick={() => ir.current(0)}>
            <span aria-hidden="true" className="estado traco" />
            {textos.teclas.esfera}
          </button>{" "}
          <button type="button" aria-pressed={estado === "grade"} onClick={() => ir.current(1)}>
            <span aria-hidden="true" className="estado pontos" />
            {textos.teclas.grade}
          </button>
        </div>
      </div>
    </div>
  );
}
