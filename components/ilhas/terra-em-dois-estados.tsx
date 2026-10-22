"use client";

import { useEffect, useRef, useState } from "react";

import type { Terra } from "@/components/ilhas/desenho-da-terra";
import { aCadaMinuto, aoVivo } from "@/lib/ambiente";
import { carregarMascara } from "@/lib/mascara-da-terra";
import { quandoOcioso } from "@/lib/ocioso";
import { quando } from "@/lib/prazo";
import { HORIZONTE, proximoNascer, proximoPor, relogio, solNoCeu, type Lugar } from "@/lib/sol";

/**
 * A Terra em dois estados da capa (desde 17/10, a direção final do Atlas Digital, seções 2.7, 2.8, 2.9 e 3, itens 1 e
 * 2), no lugar da Terra em pontos atrás do título (terra-em-pontos.tsx, que escondia a figura e media a própria
 * animação). O metal parado vem do servidor (marca/esfera.tsx: `atras` e `frente`, que a ilha recebe e põe em volta do
 * canvas); o desenho (ilhas/desenho-da-terra.ts) e a máscara (public/dados/terra-05.bin) chegam por import() depois do
 * load, fora do script inicial. O tamanho e o lugar da caixa são do CSS da capa (app/digital.css, "a capa"); o canvas
 * cobre a caixa e se mede por ela.
 * A interação (seção 2.9): o globo é um role="slider" que corre o dia (arrastar: 2 minutos de Terra por px; as setas:
 * 15 minutos), com touch-action: pan-y, e é a prova de vida: o Enter, ou o toque em Niterói, abre no próprio rótulo a
 * coordenada e a fonte. O laço passa por aoVivo (lib/ambiente.ts): só com a capa na tela, sem a pausa e sem movimento
 * reduzido; com movimento reduzido, a Terra se desenha uma vez, no instante de agora e já com a noite em pontos, e
 * redesenha só com a mão.
 * Desde 18/10 (a revisão da capa): o foco do teclado e o arraste seguram o giro (o valor do controle mudava sozinho, 12
 * minutos por segundo, e as setas se perdiam nele); o Enter, com Niterói atrás da Terra (das ~23 h ao meio-dia), traz o
 * globo até ela; e o valor do controle diz a coordenada e a fonte quando o rótulo abre, para o leitor de tela.
 * Desde 18/10 (a revisão do celular): o laço e a passagem começam com um quarto do disco à vista (a sonda), a pausa
 * termina a passagem, e o toque no anel tracejado de Niterói, atrás da Terra, traz o globo até ela.
 */

/** Os minutos de Terra por px de arraste e por toque de seta. */
const POR_PIXEL = 2;
const POR_SETA = 15;

const horaDoGlobo = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
const partesDoGlobo = new Intl.DateTimeFormat("en-GB", { timeZone: "America/Sao_Paulo", hour: "numeric", minute: "numeric", hourCycle: "h23" });

type Props = {
  lugar: Lugar;
  /** O nome de Niterói e as duas linhas do rótulo aberto (a coordenada e a fonte). */
  nome: string;
  detalhe: readonly string[];
  /** O nome do controle e o id da legenda, que o descreve. */
  rotulo: string;
  legenda: string;
  /** O metal parado, de marca/esfera.tsx: atrás e na frente do canvas. */
  atras: React.ReactNode;
  frente: React.ReactNode;
};

export function TerraEmDoisEstados({ lugar, nome, detalhe, rotulo, legenda, atras, frente }: Props) {
  const caixa = useRef<HTMLDivElement>(null);
  const tela = useRef<HTMLCanvasElement>(null);
  const fundo = useRef<HTMLCanvasElement>(null);
  const controle = useRef<HTMLDivElement>(null);
  const sonda = useRef<HTMLDivElement>(null);
  const terra = useRef<Terra | null>(null);
  const [pronta, setPronta] = useState(false);
  // A hora no globo: antes da Terra chegar, a de agora não é sabida no servidor; a frase estável vem do rótulo.
  const [valor, setValor] = useState<{ agora: number; texto: string } | null>(null);
  const [aberto, setAberto] = useState(false);
  // O teclado segura o giro (só o foco visível: o clique do mouse, que também foca, não para o globo).
  const doTeclado = useRef(false);

  useEffect(() => {
    const elemento = caixa.current!;
    const canvas = tela.current!;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ativo = true;
    let desligar: (() => void) | undefined;
    let ultimaLeitura = 0;

    const ler = (forcar = false) => {
      const t = terra.current;
      if (!t || (!forcar && t.virando())) return;
      const agora = performance.now();
      if (!forcar && agora - ultimaLeitura < 1000) return;
      ultimaLeitura = agora;
      setValor(leitura(t.instante()));
    };

    // O código e a máscara chegam depois do load; as casas se montam quando o navegador fica ocioso (~20 ms, a maior
    // parte do custo de partida, fora da tarefa da carga).
    const ocioso = () => new Promise<void>((pronto) => quandoOcioso(pronto));
    const comecar = () =>
      Promise.all([import("@/components/ilhas/desenho-da-terra"), carregarMascara(), document.fonts.ready]).then(async ([desenho, mascara]) => {
        await ocioso();
        if (!ativo) return;
        const t = desenho.terraEmDoisEstados({ canvas, fundo: fundo.current!, mascara, lugar, nome, detalhe, agora: relogio, reduzido: reduzir });
        terra.current = t;
        t.segurar(doTeclado.current);
        t.medir();
        setPronta(true);
        ler(true);
        // A 30 quadros por segundo, num relógio de 33 ms, e não a cada quadro do navegador: a página não produz quadros a
        // 60 por segundo só para pular a metade deles. Pela sonda: o laço (e a passagem, no primeiro quadro dele) começa
        // com um quarto do disco à vista, e não com a borda do anel.
        const parar = aoVivo(
          sonda.current!,
          (agora) => {
            t.quadro(agora);
            ler();
          },
          33,
        );
        // A pausa termina a passagem (desenho-da-terra.ts): o laço parado não redesenharia a Terra, e a noite ficaria
        // gravada como dia se a pausa chegasse antes de o globo entrar na tela.
        const raiz = document.documentElement;
        const pausa = new MutationObserver(() => raiz.classList.contains("ambiente-pausado") && t.pausar());
        pausa.observe(raiz, { attributes: true, attributeFilter: ["class"] });
        let largura = Math.round(elemento.getBoundingClientRect().width);
        const observador = new ResizeObserver(() => {
          const nova = Math.round(elemento.getBoundingClientRect().width);
          if (nova === largura) return;
          largura = nova;
          t.medir();
        });
        observador.observe(elemento);
        desligar = () => {
          parar();
          pausa.disconnect();
          observador.disconnect();
        };
      });

    // Depois do load (a figura não disputa a carga com o texto e a ação), e já, se ele passou.
    const aoCarregar = () => {
      comecar().catch((erro) => {
        // Sem a máscara (a rede caiu), fica o metal parado do servidor: a capa continua inteira. Fora da produção, o
        // erro aparece no console, para não sumir um defeito do desenho.
        if (process.env.NODE_ENV !== "production") console.error(erro);
      });
    };
    if (document.readyState === "complete") aoCarregar();
    else window.addEventListener("load", aoCarregar, { once: true });

    // O arraste: só na horizontal (o vertical rola a página, touch-action: pan-y); um toque sem arrastar, perto de
    // Niterói, abre o rótulo.
    const alvo = controle.current!;
    let x0: number | null = null;
    let andou = 0;
    // Enquanto a mão arrasta, o giro espera; ao soltar, segue (a não ser que o teclado o segure).
    const baixar = (e: PointerEvent) => {
      x0 = e.clientX;
      andou = 0;
      alvo.setPointerCapture(e.pointerId);
      terra.current?.segurar(true);
    };
    const mover = (e: PointerEvent) => {
      if (x0 === null || !terra.current) return;
      const dx = e.clientX - x0;
      x0 = e.clientX;
      andou += Math.abs(dx);
      if (dx) {
        terra.current.correr(dx * POR_PIXEL);
        ler(true);
      }
    };
    const soltar = (e: PointerEvent) => {
      if (x0 !== null && andou < 4 && terra.current) {
        const onde = terra.current.ondeEsta();
        const r = elemento.getBoundingClientRect();
        // O toque em Niterói abre o rótulo; atrás da Terra (o anel tracejado), traz o globo até ela, como o Enter.
        if (onde && Math.hypot(e.clientX - r.left - onde.x, e.clientY - r.top - onde.y) < 28) {
          if (onde.atras) {
            terra.current.trazerNiteroi();
            setValor(leitura(terra.current.instante(true)));
            setAberto(true);
          } else setAberto((a) => !a);
        }
      }
      x0 = null;
      terra.current?.segurar(doTeclado.current);
    };
    alvo.addEventListener("pointerdown", baixar);
    alvo.addEventListener("pointermove", mover);
    alvo.addEventListener("pointerup", soltar);
    alvo.addEventListener("pointercancel", soltar);

    return () => {
      ativo = false;
      window.removeEventListener("load", aoCarregar);
      alvo.removeEventListener("pointerdown", baixar);
      alvo.removeEventListener("pointermove", mover);
      alvo.removeEventListener("pointerup", soltar);
      alvo.removeEventListener("pointercancel", soltar);
      desligar?.();
    };
    // A coordenada e os textos vêm de conteudo/site.ts e não mudam durante a visita.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    terra.current?.rotulo(aberto);
  }, [aberto]);

  // As setas correm o dia em passos exatos (o giro está segurado pelo foco). O Enter abre o rótulo de Niterói e, se
  // ela está atrás da Terra, traz o globo até ela; o valor do controle passa a dizer a coordenada e a fonte, e o leitor
  // de tela a anuncia (o rótulo do canvas é só desenho).
  const tecla = (e: React.KeyboardEvent) => {
    const t = terra.current;
    const setas = { ArrowRight: POR_SETA, ArrowUp: POR_SETA, ArrowLeft: -POR_SETA, ArrowDown: -POR_SETA, PageUp: 60, PageDown: -60 }[e.key];
    if (setas !== undefined || e.key === "Home" || e.key === "End") {
      // As teclas do controle nunca rolam a página, nem antes de a Terra chegar (até 18/10, Home e End a rolavam).
      e.preventDefault();
      if (!t) return;
      // Home traz o agora de Niterói (como a carta do prazo e a projeção); End, o fim do dia no globo (o máximo, 23:59).
      const ate = e.key === "Home" ? (relogio().getTime() - t.instante(true).getTime()) / 60_000 : e.key === "End" ? 1439 - leitura(t.instante(true)).agora : setas;
      t.correr(ate ?? 0);
      setValor(leitura(t.instante()));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!aberto && t) {
        t.trazerNiteroi();
        setValor(leitura(t.instante(true)));
      }
      setAberto(!aberto);
    } else if (e.key === "Escape" && aberto) setAberto(false);
  };
  const segurar = (sim: boolean) => {
    doTeclado.current = sim;
    terra.current?.segurar(sim);
    // O valor de agora já no foco (a última leitura do laço pode ter até 1 s).
    if (sim && terra.current) setValor(leitura(terra.current.instante()));
  };

  return (
    <div ref={caixa} className="vd-esfera-caixa">
      {atras}
      <canvas ref={fundo} aria-hidden="true" className="vd-terra" data-pronta={pronta || undefined} />
      <canvas ref={tela} aria-hidden="true" className="vd-terra" data-pronta={pronta || undefined} />
      <div ref={sonda} aria-hidden="true" className="vd-terra-sonda" />
      {frente}
      <div
        ref={controle}
        role="slider"
        tabIndex={0}
        aria-label={rotulo}
        aria-describedby={legenda}
        aria-valuemin={0}
        aria-valuemax={1439}
        aria-valuenow={valor?.agora ?? 0}
        aria-valuetext={`${valor?.texto ?? "no globo, a hora de agora"}${aberto ? `; ${nome}, ${detalhe.join("; ")}` : ""}`}
        aria-orientation="horizontal"
        className="vd-terra-controle"
        onKeyDown={tecla}
        onFocus={(e) => segurar(e.currentTarget.matches(":focus-visible"))}
        onBlur={() => segurar(false)}
      />
    </div>
  );
}

/** A hora que o globo mostra, no valor do controle. */
function leitura(instante: Date) {
  const [h, m] = partesDoGlobo.format(instante).split(":").map(Number);
  return { agora: h * 60 + m, texto: `no globo, ${horaDoGlobo.format(instante)}` };
}

/**
 * A frase do Sol em Niterói agora, para a legenda da Terra (a leitura que desceu do canto da capa para o papel). Acima
 * de HORIZONTE (o Sol aparente, com a refração e o meio disco), o Sol está de pé, mas a altura geométrica ainda pode ser
 * negativa (até −0,833°): ali ele está "no horizonte", e nunca "a 1° sobre" (até 18/10, a frase dizia isso às 17:57).
 */
function fraseDoSol(lugar: Lugar, agora: Date) {
  const { altura } = solNoCeu(lugar, agora);
  if (altura > HORIZONTE) {
    const graus = Math.round(Math.max(0, altura));
    const por = proximoPor(lugar, agora);
    const onde = graus === 0 ? "no horizonte" : `a ${graus}° sobre o horizonte`;
    return `Em Niterói, o Sol está ${onde}${por ? ` e se põe ${quando(por, agora)}` : ""}.`;
  }
  const nascer = proximoNascer(lugar, agora);
  return `Em Niterói, o Sol está ${Math.round(-altura)}° abaixo do horizonte${nascer ? ` e nasce ${quando(nascer, agora)}` : ""}.`;
}

/**
 * A leitura do Sol na legenda (seção 3, item 2): calculada neste aparelho, a cada minuto. O servidor não sabe que horas
 * são: o HTML traz uma frase estável, e a ilha a troca depois de montar. A pausa a para; com movimento reduzido, ela
 * continua a cada minuto (trocar o texto não é movimento: o fechamento com o Impeccable, B, item 9).
 */
export function LeituraDoSol({ lugar, antes }: { lugar: Lugar; antes: string }) {
  const caixa = useRef<HTMLSpanElement>(null);
  const [frase, setFrase] = useState<string | null>(null);

  useEffect(() => aCadaMinuto(caixa.current!, () => setFrase(fraseDoSol(lugar, relogio()))), [lugar.latitude, lugar.longitude]);

  // Antes de montar, a frase estável, em texto comum; depois, a leitura viva aria-hidden e o mesmo texto escondido.
  return (
    <span ref={caixa}>
      {frase === null ? (
        antes
      ) : (
        <>
          {/* Fora da seleção: quem copia a legenda leva a frase uma vez só. */}
          <span className="sr-only select-none">{frase}</span>
          <span aria-hidden="true">{frase}</span>
        </>
      )}
    </span>
  );
}

/**
 * A frase do giro na legenda (desde 18/10, a revisão da capa): o servidor diz o giro acelerado, que é o estado de quem
 * chega; com a pausa ou com movimento reduzido, o globo não gira sozinho, e a frase diz que ele está parado (até 18/10,
 * ela afirmava um giro que não acontecia). As duas dizem como correr o dia: o arraste e as setas.
 */
export function FraseDoGiro({ girando, parado }: { girando: string; parado: string }) {
  const [quieto, setQuieto] = useState(false);
  useEffect(() => {
    const raiz = document.documentElement;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ver = () => setQuieto(reduzir.matches || raiz.classList.contains("ambiente-pausado"));
    ver();
    const pausa = new MutationObserver(ver);
    pausa.observe(raiz, { attributes: true, attributeFilter: ["class"] });
    reduzir.addEventListener("change", ver);
    return () => {
      pausa.disconnect();
      reduzir.removeEventListener("change", ver);
    };
  }, []);
  return quieto ? parado : girando;
}

