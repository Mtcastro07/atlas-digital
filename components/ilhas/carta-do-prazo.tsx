"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { Algarismos } from "@/components/algarismos";
import { aoVivo } from "@/lib/ambiente";
import { REGRA_DO_RASCUNHO, diaDeTrabalho, diaEMes, escritaDoInstante, feriado, hojeEmNiteroi, meiaNoiteEmNiteroi, rascunho } from "@/lib/prazo";
import { relogio, type Lugar } from "@/lib/sol";
import { abertura } from "@/lib/traco-e-ponto";

/**
 * A carta do prazo (desde 17/10, a direção final do Atlas Digital, seção 3, itens 4 e 17): o prazo das quatro etapas
 * desenhado em dias reais de Niterói, com o Sol de 20 em 20 minutos, os fins de semana e os feriados nacionais
 * (lib/prazo.ts). No lugar da derrota em arco do início (a rota lia "gráfico de crescimento", e a posição que a
 * percorria num laço de 13 s não media nada) e do relógio em cartão de O trabalho (o cartão, os segundos em dois
 * lugares e "Briefing completo agora", que se lia como um estado, e não como hipótese). Duas escalas da mesma
 * convenção (o desenho, em ilhas/desenho-da-carta-do-prazo.ts, que chega por import() quando a carta se aproxima da
 * tela, fora do script inicial):
 * - escala="dias", no início: 24 dias em colunas, na tela que sangra pela direita; o tempo a grava (a cada 20 minutos,
 *   uma casa do Sol de hoje passa de ponto a traço), sem passagem própria;
 * - escala="horas", em O trabalho: a folha das primeiras 72 horas, num instrumento; o marcador do briefing se arrasta
 *   (role="slider", setas de ±1 h), e a leitura presa a ele diz, chapada, até quando chega o rascunho. A passagem
 *   da página: na carga, as horas de hoje se gravam até o agora, de ponto a traço, em 16 degraus (900 ms); no arraste,
 *   as 24 horas do rascunho, do briefing novo ao fim. Abaixo dela, a faixa das etapas (FitaDasEtapas) e as datas
 *   vivas de cada etapa (DataDaEtapa) seguem o briefing arrastado.
 * O servidor não sabe que horas são para quem lê: o HTML traz frases completas e estáveis, sem número vivo, e a ilha
 * as troca depois de montar. Todo laço passa por aoVivo (lib/ambiente.ts): o relógio de um minuto e a passagem só
 * andam com a carta na tela, sem a pausa e sem movimento reduzido; aí, a carta se desenha uma vez, no estado final.
 */

const HORA = 3_600_000;

/** O evento com que a folha das horas avisa as etapas de O trabalho (secoes/trabalho.tsx) do briefing arrastado: o
 *  instante dele, em ms, ou null (agora). */
const EVENTO = "vd-briefing";

/** Os nomes curtos dos feriados longos, para o desenho e as datas das etapas (os de lib/prazo.ts são os da lei). */
const CURTO: Record<string, string> = {
  "Confraternização Universal": "Ano-Novo",
  "Sexta-feira da Paixão": "Paixão",
  "Nossa Senhora Aparecida": "Aparecida",
  "Proclamação da República": "República",
  "Dia Nacional de Zumbi e da Consciência Negra": "Consciência Negra",
};
const nomeCurto = (dia: Date) => {
  const nome = feriado(dia);
  return nome && (CURTO[nome] ?? nome);
};

/** A conta do prazo a partir de um instante: o dia 0, os 15 dias úteis seguintes e os feriados em dia de semana até eles. */
export type ContaDoPrazo = {
  agora: Date;
  /** O dia de `agora` em Niterói: o dia 0 da conta. */
  hoje: Date;
  /** O dia `d` depois do dia 0. */
  dia(d: number): Date;
  util(d: number): boolean;
  /** Os 15 primeiros dias úteis depois do dia 0, contados em dias de calendário. */
  uteis: number[];
  /** Os feriados nacionais que caem em dia de semana entre o dia 0 e o 15º dia útil (os que tiram um dia da conta). */
  feriados: { d: number; nome: string }[];
  /** O nome curto do feriado nacional de uma data, ou undefined. */
  nomeDoFeriado(dia: Date): string | undefined;
};

export function contaDoPrazo(agora: Date): ContaDoPrazo {
  const hoje = hojeEmNiteroi(agora);
  const dia = (d: number) => {
    const data = new Date(hoje);
    data.setUTCDate(data.getUTCDate() + d);
    return data;
  };
  const util = (d: number) => diaDeTrabalho(dia(d));
  const uteis: number[] = [];
  for (let d = 1; uteis.length < 15; d++) if (util(d)) uteis.push(d);
  const feriados: ContaDoPrazo["feriados"] = [];
  for (let d = 1; d < uteis[14]; d++) {
    const nome = nomeCurto(dia(d));
    if (nome && dia(d).getUTCDay() % 6 !== 0) feriados.push({ d, nome });
  }
  return { agora, hoje, dia, util, uteis, feriados, nomeDoFeriado: nomeCurto };
}

/** "Finados (2/11)": o feriado com a data, como nas datas das etapas. */
const comData = (conta: ContaDoPrazo, f: { d: number; nome: string }) => `${f.nome} (${conta.dia(f.d).getUTCDate()}/${conta.dia(f.d).getUTCMonth() + 1})`;
/** "a", "a e b", "a, b e c". */
const lista = (itens: string[]) => (itens.length < 2 ? itens.join("") : `${itens.slice(0, -1).join(", ")} e ${itens.at(-1)}`);

/** "19 a 27/10" ou "27/10 a 9/11": o mês uma vez, quando os dois dias caem nele. */
const deA = (a: Date, b: Date) => `${a.getUTCDate()}${a.getUTCMonth() === b.getUTCMonth() ? "" : `/${a.getUTCMonth() + 1}`} a ${b.getUTCDate()}/${b.getUTCMonth() + 1}`;

/** "19 a 27 de out." ou "27 de out. a 9 de nov.": o mês uma vez, quando os dois dias caem nele. */
const intervalo = (inicio: Date, fim: Date) => `${inicio.getUTCMonth() === fim.getUTCMonth() ? inicio.getUTCDate() : diaEMes.format(inicio)} a ${diaEMes.format(fim)}`;

/** As quatro estações do rumo da carta dos dias, com o valor junto do nome (Q18): com a conta, as datas; sem ela (o
 *  HTML do servidor), a frase estável. A mesa as desenha no canvas; o celular, na legenda em HTML (Estacoes). */
export function estacoes(conta?: ContaDoPrazo) {
  const datas = (de: number, ate: number) => (conta ? `: ${intervalo(conta.dia(conta.uteis[de - 1]), conta.dia(conta.uteis[ate - 1]))}` : "");
  return [
    ["Briefing completo", "se fechar agora"],
    ["Rascunho", "em até 24 horas"],
    ["Revisões, 2 rodadas", `dias úteis 1 a 7${datas(1, 7)}`],
    ["Publicação, em geral", `dias úteis 7 a 15${datas(7, 15)}`],
  ] as const;
}

/** Os trechos da trena dos 15 dias úteis, na folha das horas. */
export const TRECHOS_DA_TRENA = [
  ["Briefing completo", "o dia 0 da conta"],
  ["Revisões, 2 rodadas", "dias úteis 1 a 7"],
  ["Publicação, em geral", "dias úteis 7 a 15"],
] as const;

/** O celular da carta e da folha (abaixo de 768 px, o md das legendas em HTML); e o da faixa das etapas, deitada
 *  abaixo de 1.024 px (app/digital.css). */
const noCelular = () => window.matchMedia("(max-width: 767.98px)").matches;
const faixaDeitada = () => window.matchMedia("(max-width: 1023.98px)").matches;

type Tipo = "anel" | "traco" | "abre" | "pontos" | "falta";
/** A marca de uma estação na legenda em HTML, com o desenho e as tintas do canvas (ilhas/desenho-da-carta-do-prazo.ts):
 *  o anel, o traço firme, o traço que se abre, os pontos acesos e a marca de falta do feriado na trena. Deitada, como
 *  numa legenda de carta, também a do rumo da carta dos dias, que é de pé (desde 18/10: de pé, o traço que se abre lia
 *  "!" e os pontos, ":", a revisão). Em rem, cresce com a letra. */
function Marca({ tipo }: { tipo: Tipo }) {
  return (
    <svg viewBox="0 0 24 16" aria-hidden="true" strokeLinecap="round" className="row-span-2 h-4 w-6 self-center">
      {tipo === "anel" && <circle cx="12" cy="8" r="5.5" fill="#0b2340" stroke="#f1d3a1" strokeWidth="1.6" />}
      {tipo === "traco" && <path d="M3 8h18" stroke="#d9a76b" strokeWidth="3" />}
      {tipo === "abre" && <path d="M2 8h7M13 8h3.5M20.5 8h.01" stroke="#d9a76b" strokeWidth="2.4" />}
      {tipo === "pontos" && <path d="M6 8h.01M18 8h.01" stroke="#fbf1de" strokeWidth="6" />}
      {tipo === "falta" && <path d="M6 4l12 8" className="stroke-muted-foreground" strokeWidth="1.5" />}
    </svg>
  );
}

/**
 * A legenda das estações em HTML, no celular (desde 18/10; a direção final, seção 4, item 3: "as estações embaixo, com
 * o valor junto do nome"): a marca do desenho, o nome na tinta e o valor no apagado, alinhados à esquerda da carta. No
 * canvas, a 12 px, não cresciam com a letra do leitor; aqui crescem. Some na mesa (md), onde o canvas as desenha.
 */
function Estacoes({ itens, marcas, oculta = false }: { itens: readonly (readonly [string, string])[]; marcas: readonly Tipo[]; oculta?: boolean }) {
  return (
    <dl aria-hidden={oculta || undefined} className="mt-5 grid gap-y-3.5 md:hidden">
      {itens.map(([nome, valor], i) => (
        <div key={nome} className="grid grid-cols-[1.5rem_minmax(0,1fr)] items-baseline gap-x-3">
          <dt className="contents">
            <Marca tipo={marcas[i]} />
            <span className="text-[0.875rem] leading-snug font-semibold text-foreground">{nome}</span>
          </dt>
          <dd className="col-start-2 text-[0.8125rem] leading-snug text-muted-foreground tabular-nums">{valor}</dd>
        </div>
      ))}
    </dl>
  );
}

/** O carregamento do desenho e das fontes quando a carta chega a 300 px da tela; `iniciar` recebe o módulo. */
function aoChegar(elemento: Element, iniciar: (desenho: typeof import("@/components/ilhas/desenho-da-carta-do-prazo")) => (() => void) | void) {
  let ativo = true;
  let desligar: (() => void) | void;
  const observador = new IntersectionObserver(
    ([entrada]) => {
      if (!entrada.isIntersecting) return;
      observador.disconnect();
      Promise.all([import("@/components/ilhas/desenho-da-carta-do-prazo"), document.fonts.ready]).then(([desenho]) => {
        if (ativo) desligar = iniciar(desenho);
      });
    },
    { rootMargin: "300px" },
  );
  observador.observe(elemento);
  return () => {
    ativo = false;
    observador.disconnect();
    desligar?.();
  };
}

/** Redesenha quando a largura do elemento muda (a janela, a letra), no máximo uma vez por quadro; com `altura`, também
 *  quando a altura muda (a faixa das etapas acompanha o texto ao lado). */
function aoMudarALargura(elemento: Element, desenhar: () => void, altura = false) {
  let medida = "";
  let pedido = 0;
  const observador = new ResizeObserver(([e]) => {
    const nova = `${Math.round(e.contentRect.width)} ${altura ? Math.round(e.contentRect.height) : ""}`;
    if (nova === medida) return;
    medida = nova;
    cancelAnimationFrame(pedido);
    pedido = requestAnimationFrame(desenhar);
  });
  observador.observe(elemento);
  return () => {
    cancelAnimationFrame(pedido);
    observador.disconnect();
  };
}

/** A frase do leitor de tela da carta dos dias, a partir da conta de agora. */
function fraseDosDias(conta: ContaDoPrazo) {
  const [u1, u7, u15] = [conta.uteis[0], conta.uteis[6], conta.uteis[14]];
  const fora = conta.feriados.map((f) => comData(conta, f));
  return (
    `Se o briefing completo fechar agora, o rascunho chega até ${escritaDoInstante(rascunho(conta.agora), false)}; ` +
    `as revisões vão de ${deA(conta.dia(u1), conta.dia(u7))}, e a publicação, em geral, de ${deA(conta.dia(u7), conta.dia(u15))}` +
    `${fora.length ? `, com ${lista(fora)} fora da conta dos dias úteis` : ""}.`
  );
}

/** A carta dos dias, no início. */
function CartaDosDias({ lugar }: { lugar: Lugar }) {
  const caixa = useRef<HTMLDivElement>(null);
  const tela = useRef<HTMLCanvasElement>(null);
  /** A conta do último desenho; null no HTML do servidor (a frase e as estações estáveis, sem data). */
  const [conta, setConta] = useState<ContaDoPrazo | null>(null);

  useEffect(() => {
    const elemento = caixa.current!;
    // No celular, a altura sai da conta, logo ao montar, longe da tela: 34 px, um dia de 22 px até 2 dias depois do 15º
    // útil, e 12 (a de cartaDosDias). Até 18/10, a reserva fixa de 596 px valia só para um feriado no caminho: em 18/12,
    // com o Natal e o Ano-Novo, a carta tem 27 dias, e tudo abaixo pulava 44 px quando o desenho chegava (a revisão).
    const reservar = (conta: ContaDoPrazo) => {
      elemento.style.minHeight = noCelular() ? `${34 + (conta.uteis[14] + 2) * 22 + 12}px` : "";
    };
    reservar(contaDoPrazo(relogio()));
    return aoChegar(elemento, ({ cartaDosDias }) => {
      const desenhar = () => {
        // Na mesa, a carta vai da coluna do texto até a borda da tela que sangra: os dias continuam além dela.
        const borda = elemento.closest(".vd-tela-sangra-direita")?.getBoundingClientRect().right;
        const r = elemento.getBoundingClientRect();
        const transposta = noCelular();
        const largura = !transposta && borda ? borda - r.left : r.width;
        const conta = contaDoPrazo(relogio());
        reservar(conta);
        cartaDosDias(tela.current!, { largura, conta, lugar, transposta });
        setConta(conta);
      };
      desenhar();
      const pararRelogio = aoVivo(elemento, desenhar, 60_000);
      const pararLargura = aoMudarALargura(elemento, desenhar);
      return () => {
        pararRelogio();
        pararLargura();
      };
    });
  }, [lugar]);

  return (
    <>
      <p className="sr-only">
        {conta
          ? fraseDosDias(conta)
          : "Se o briefing completo fechar agora, o rascunho chega em até 24 horas; as revisões ocupam os dias úteis 1 a 7, e a publicação, em geral, os dias úteis 7 a 15, com os feriados nacionais fora da conta."}
      </p>
      {/* A altura reservada antes do desenho, para nada pular quando ele chega; em px, como o desenho, que não cresce com a
          letra: na mesa, 54 + 360 + 132 px; no celular, no HTML do servidor, 34 px e 25 dias de 22, mais 12, e, ao
          montar, a da conta de hoje (reservar, acima). */}
      <div ref={caixa} className="relative min-h-[546px] max-md:min-h-[596px]">
        <canvas ref={tela} aria-hidden="true" className="block max-w-none" />
      </div>
      {/* No celular, as estações do rumo (a faixa à direita), com a marca de cada uma, deitada como numa legenda de
          carta (desde 18/10; de pé, o traço que se abre lia "!" e os pontos, ":": a revisão). O valor muda com a conta: o
          bloco fica fora do leitor de tela, que ouve a frase acima. */}
      <Estacoes itens={estacoes(conta ?? undefined)} marcas={["anel", "traco", "abre", "pontos"]} oculta />
    </>
  );
}

/** As amostras do mostrador (o mais largo de cada dia da semana), na data e na hora, sem os segundos. */
const AMOSTRAS = ["seg", "ter", "qua", "qui", "sex", "sáb", "dom"].map((d) => `${d}. 88/88, 88:88`);

type EstadoDaFolha = { agora: number; briefing: number; maximo: number; x: number; y: number };

/** O briefing de agora ou o arrastado (`fixo`, em ms), se ainda estiver no futuro. */
const briefingDe = (fixo: number | null, agora: number) => (fixo !== null && fixo > agora ? fixo : agora);

/** A letra do leitor, em relação aos 16 px (a 200%, 2): o que é desenho e precisa crescer com ela. */
const letra = () => parseFloat(getComputedStyle(document.documentElement).fontSize) / 16 || 1;

/** A página parada: o botão de pausa ou o movimento reduzido. As passagens não rodam; a figura vai ao estado final. */
const parado = () => document.documentElement.classList.contains("ambiente-pausado") || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** A folha das 72 horas, em O trabalho. */
function FolhaDasHoras({ lugar }: { lugar: Lugar }) {
  const caixa = useRef<HTMLDivElement>(null);
  const grade = useRef<HTMLDivElement>(null);
  const tela = useRef<HTMLCanvasElement>(null);
  const numero = useRef<HTMLCanvasElement>(null);
  const leitura = useRef<HTMLDivElement>(null);
  /** O briefing arrastado (ms), ou null: agora. Preso entre o agora e a última casa do segundo dia da folha. */
  const fixo = useRef<number | null>(null);
  /** Leva o briefing de um instante a outro; e o instante sob um ponto da folha (o desenho o sabe). */
  const controle = useRef<{ mover(alvo: (atual: number) => number): void; instante(x: number, y: number): number; fim: number }>({ mover() {}, instante: () => 0, fim: 0 });
  const [estado, setEstado] = useState<EstadoDaFolha | null>(null);
  /** Nenhum corpo do mostrador coube na coluna (o celular, com a letra grande): o valor vai em Inter 600 tabular. */
  const [semMostrador, setSemMostrador] = useState(false);

  // A leitura acompanha o marcador, presa dentro da folha. Medida depois de o React escrever o rótulo novo e antes de
  // pintar: até 17/10, a medida vinha de antes, com o rótulo velho e mais curto, e o fim do novo ("chega até") ficava
  // sob o recorte do instrumento até o minuto seguinte (a revisão, P1).
  // No celular, a leitura fica na margem, alinhada aos dias (desde 18/10): ela ocupa quase a folha inteira, e o pouco
  // que andava atrás do marcador só a desalinhava do resto, um recuo sem sentido.
  useLayoutEffect(() => {
    if (!estado || !leitura.current || !grade.current) return;
    const x = noCelular() ? 0 : Math.max(0, Math.min(grade.current.clientWidth - leitura.current.offsetWidth, estado.x - 24));
    leitura.current.style.transform = `translateX(${x}px)`;
  });

  useEffect(() => {
    const elemento = caixa.current!;
    return aoChegar(elemento, ({ folhaDasHoras, familiaDoTitulo, mostrador }) => {
      let ativo = true;
      let gravadoAte: number | null = null;
      let rascunhoGravado = 1;
      let escrever: ((texto: string, animar: boolean) => void) | null = null;
      let pararMostrador = () => {};

      const desenhar = (animar = true) => {
        const agora = relogio().getTime();
        // O último briefing que a folha mostra inteiro: a última casa de amanhã, com o rascunho às 23h40 de depois.
        const maximo = meiaNoiteEmNiteroi(new Date(agora), 2).getTime() - 20 * 60_000;
        if (fixo.current !== null) fixo.current = fixo.current <= agora ? null : Math.min(maximo, fixo.current);
        const briefing = fixo.current ?? agora;
        const largura = grade.current!.clientWidth;
        const folha = folhaDasHoras(tela.current!, {
          largura,
          agora,
          briefing,
          gravadoAte: gravadoAte ?? agora,
          rascunho: rascunhoGravado,
          conta: contaDoPrazo(new Date(briefing)),
          lugar,
          celular: noCelular(),
        });
        controle.current.instante = folha.instante;
        controle.current.fim = folha.fim;
        escrever?.(escritaDoInstante(rascunho(new Date(briefing)), false), animar);
        const [x, y] = folha.marcador;
        setEstado({ agora, briefing, maximo, x, y });
        window.dispatchEvent(new CustomEvent<number | null>(EVENTO, { detail: fixo.current }));
      };

      // A passagem do arraste (seção 2.8, "a carga e o arraste"): com o briefing num lugar novo, as 24 horas do
      // rascunho chegam em pontos e se gravam em traço, em 16 degraus (900 ms). Enquanto a mão arrasta, ficam em pontos;
      // um laço só, que recomeça a cada passo. Parada a página, o traço vem inteiro.
      let comecoDaGravacao = 0;
      let degrauDaGravacao = -1;
      let pararGravacao: (() => void) | null = null;
      const gravarORascunho = () => {
        if (parado()) {
          rascunhoGravado = 1;
          return;
        }
        rascunhoGravado = 0;
        comecoDaGravacao = 0;
        degrauDaGravacao = -1;
        pararGravacao ??= aoVivo(elemento, (t) => {
          comecoDaGravacao ||= t;
          const a = abertura(t, comecoDaGravacao, 900 / 16);
          if (Math.round(a * 16) === degrauDaGravacao) return;
          degrauDaGravacao = Math.round(a * 16);
          rascunhoGravado = a;
          desenhar(false);
          if (a >= 1)
            queueMicrotask(() => {
              pararGravacao?.();
              pararGravacao = null;
            });
        });
      };

      controle.current.mover = (alvo) => {
        fixo.current = alvo(fixo.current ?? relogio().getTime());
        gravarORascunho();
        desenhar();
      };

      // O valor, chapado (desde 18/10, a decisão do aprovador; até então, em meio-tom): 32 px de maiúscula (46,5 de
      // corpo) numa linha; se não couber na coluna, em duas (a data e a hora); se ainda não, a 24 px. O corpo segue a
      // letra do leitor (a 200%, 64 px de maiúscula): é o valor da leitura, e não pode ficar menor que o rótulo. Se
      // nenhum couber (o celular com a letra grande), o valor vai no texto, chapado, e quebra a linha. Até 17/10,
      // a última tentativa ficava mesmo larga demais, e o valor saía cortado pelo instrumento ("dom. 1", a revisão, P1).
      const largura = grade.current!.clientWidth;
      const k = letra();
      const tentativas = [
        [(32 * k) / 0.688, false],
        [(32 * k) / 0.688, true],
        [(24 * k) / 0.688, true],
      ] as const;
      (async () => {
        const familia = familiaDoTitulo();
        await document.fonts.load(`64px ${familia}`, "0123456789/:,.sábdomqugert");
        if (!ativo) return;
        const tinta = getComputedStyle(numero.current!).color;
        let coube = false;
        for (const [corpo, duas] of tentativas) {
          const m = mostrador(numero.current!, familia, corpo, duas ? AMOSTRAS.map((a) => a.replace(", ", ",\n")) : AMOSTRAS, tinta);
          pararMostrador = m.parar;
          escrever = (texto, animar) => m.escrever(duas ? texto.replace(", ", ",\n") : texto, animar);
          coube = numero.current!.offsetWidth <= largura;
          if (coube) break;
        }
        if (!coube) {
          escrever = null;
          setSemMostrador(true);
        }
        desenhar(false);
      })();

      // A passagem da carga: as horas de hoje se gravam, do começo do dia até o agora, em 16 degraus (900 ms).
      let pararPassagem = () => {};
      if (!parado()) {
        gravadoAte = meiaNoiteEmNiteroi(relogio()).getTime();
        let comeco = 0;
        let degrau = -1;
        pararPassagem = aoVivo(elemento, (t) => {
          comeco ||= t;
          const a = abertura(t, comeco, 900 / 16);
          if (Math.round(a * 16) === degrau) return;
          degrau = Math.round(a * 16);
          const agora = relogio().getTime();
          const inicio = meiaNoiteEmNiteroi(new Date(agora)).getTime();
          gravadoAte = a >= 1 ? null : inicio + (agora - inicio) * a;
          desenhar(false);
          // Desliga depois do quadro (o aoVivo pede o seguinte logo após chamar este).
          if (a >= 1) queueMicrotask(pararPassagem);
        });
      }
      desenhar(false);
      const pararRelogio = aoVivo(elemento, () => desenhar(), 60_000);
      const pararLargura = aoMudarALargura(grade.current!, () => desenhar(false));

      // A pausa ou o movimento reduzido no meio de uma passagem a levam ao estado final (até 18/10, a folha ficava com o
      // Sol de hoje inteiro em pontos, que a legenda diz traço, até a página voltar: a revisão).
      const terminar = () => {
        if (!parado() || (gravadoAte === null && rascunhoGravado === 1)) return;
        pararPassagem();
        pararGravacao?.();
        pararGravacao = null;
        gravadoAte = null;
        rascunhoGravado = 1;
        desenhar(false);
      };
      const pausa = new MutationObserver(terminar);
      pausa.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)");
      reduzir.addEventListener("change", terminar);
      return () => {
        ativo = false;
        pararPassagem();
        pararGravacao?.();
        pararRelogio();
        pararLargura();
        pararMostrador();
        pausa.disconnect();
        reduzir.removeEventListener("change", terminar);
      };
    });
  }, [lugar]);

  // O arraste: tocar ou arrastar na folha leva o briefing àquele instante (em casas de 20 minutos). No toque, o dedo
  // que desce na folha pode estar só rolando a página (a folha tem touch-action: pan-y, e o navegador rola e cancela o
  // gesto): o marcador espera o gesto se dizer horizontal (8 px, mais de lado que de pé) ou o toque acabar sem rolar.
  // Até 18/10, o marcador pulava para onde o dedo descia, a cada rolagem que começava sobre a folha. O toque simples
  // vale no click, que o navegador não dispara quando o toque só parou a rolagem por inércia (até 18/10, no pointerup,
  // que também vem nesse caso). A trena, embaixo, é régua, e não controle: um toque nela não move o marcador (até 18/10,
  // levava o briefing ao fim do segundo dia: a revisão).
  const toque = useRef<{ x: number; y: number; arrastando: boolean } | null>(null);
  const levar = (evento: React.MouseEvent<HTMLDivElement>) => {
    const r = evento.currentTarget.getBoundingClientRect();
    const alvo = controle.current.instante(evento.clientX - r.left, evento.clientY - r.top);
    controle.current.mover(() => alvo);
  };
  const arrastar = (evento: React.PointerEvent<HTMLDivElement>) => {
    const dedo = evento.pointerType === "touch";
    if (evento.type === "pointerdown") {
      toque.current = null;
      if (evento.clientY - evento.currentTarget.getBoundingClientRect().top > controle.current.fim) return;
      evento.currentTarget.setPointerCapture(evento.pointerId);
      if (dedo) {
        toque.current = { x: evento.clientX, y: evento.clientY, arrastando: false };
        return;
      }
    } else if (!evento.currentTarget.hasPointerCapture(evento.pointerId)) return;
    else if (dedo) {
      const t = toque.current;
      if (!t) return;
      if (!t.arrastando) {
        const [dx, dy] = [Math.abs(evento.clientX - t.x), Math.abs(evento.clientY - t.y)];
        if (dx < 8 || dx < dy) return;
        t.arrastando = true;
      }
    }
    levar(evento);
  };
  const tocar = (evento: React.MouseEvent<HTMLDivElement>) => {
    const t = toque.current;
    toque.current = null;
    if (t && !t.arrastando) levar(evento);
  };
  const teclar = (evento: React.KeyboardEvent<HTMLDivElement>) => {
    const passos: Record<string, number> = { ArrowRight: HORA, ArrowUp: HORA, ArrowLeft: -HORA, ArrowDown: -HORA, PageUp: 6 * HORA, PageDown: -6 * HORA };
    if (evento.key in passos) controle.current.mover((b) => b + passos[evento.key]);
    else if (evento.key === "Home") controle.current.mover(() => 0);
    else if (evento.key === "End") controle.current.mover(() => Infinity);
    else return;
    evento.preventDefault();
  };

  const briefing = estado && new Date(estado.briefing);
  const emAgora = !estado || estado.briefing === estado.agora;
  const conta = briefing && contaDoPrazo(briefing);
  return (
    <div ref={caixa}>
      {/* A leitura: o rótulo, o valor chapado e o carimbo (a anatomia de app/digital.css). O valor vivo é desenho; o
          leitor de tela o ouve no marcador (aria-valuetext). No HTML do servidor, a frase inteira e estável, sem número
          vivo; depois de montar, o rótulo termina em "até" e o valor vem no canvas. */}
      <div ref={leitura} aria-hidden="true" className="vd-leitura w-fit max-w-full">
        {/* O rótulo em duas linhas, a hipótese e a consequência; no celular, com a altura do rótulo mais longo (o briefing
            arrastado), para a folha não descer no meio do arraste: três linhas e, depois de montar, a sombra invisível
            do rótulo do último briefing possível, na mesma casa da grade (desde 18/10: a 390 com a letra a 200%, o
            rótulo arrastado tinha seis linhas, e a folha descia três a cada passo). Até 17/10, numa linha só, sem
            quebra na mesa: o mais longo passava da folha. */}
        <p className="rotulo grid max-w-none max-lg:min-h-[3lh]">
          <span className="col-start-1 row-start-1 flex flex-col justify-end">
            <span>{`Se o briefing completo fechar ${emAgora ? "agora" : `em ${escritaDoInstante(briefing!, false)}`},`}</span>
            <span>{briefing ? "o rascunho chega até" : "o rascunho chega em até 24 horas."}</span>
          </span>
          {estado && (
            <span className="invisible col-start-1 row-start-1 flex flex-col lg:hidden">
              <span>{`Se o briefing completo fechar em ${escritaDoInstante(new Date(estado.maximo), false)},`}</span>
              <span>o rascunho chega até</span>
            </span>
          )}
        </p>
        {/* A altura do mostrador guardada antes dele (56 px numa linha; no celular, duas), para a folha não descer quando ele chega. */}
        <canvas ref={numero} className={semMostrador ? "hidden" : "valor block h-14 max-w-none max-md:h-28"} />
        {semMostrador && briefing && (
          <p className="mt-2.5 font-display text-[1.5rem] leading-[1.2] tracking-titulo text-foreground">
            <Algarismos texto={escritaDoInstante(rascunho(briefing), false)} />
          </p>
        )}
        <p className="carimbo">{REGRA_DO_RASCUNHO}</p>
      </div>
      {/* A altura da folha reservada antes do desenho (na mesa, 3 × 114 + 28 + 140 px; no celular, 3 × 90 + 28 + 88),
          para nada pular quando ele chega; em px, como o desenho. */}
      <div
        ref={grade}
        onPointerDown={arrastar}
        onPointerMove={arrastar}
        onClick={tocar}
        className="relative mt-8 min-h-[510px] cursor-pointer touch-pan-y select-none max-md:min-h-[386px]"
      >
        <canvas ref={tela} aria-hidden="true" className="block max-w-none" />
        <div
          role="slider"
          tabIndex={0}
          aria-label="Se o briefing completo fechar em"
          aria-valuemin={0}
          aria-valuemax={estado ? Math.round((estado.maximo - estado.agora) / HORA) : 48}
          aria-valuenow={estado ? Math.round((estado.briefing - estado.agora) / HORA) : 0}
          aria-valuetext={
            briefing
              ? `${emAgora ? "agora, " : ""}${escritaDoInstante(briefing, false)}; o rascunho chega até ${escritaDoInstante(rascunho(briefing), false)}`
              : "agora; o rascunho chega em até 24 horas"
          }
          onKeyDown={teclar}
          className="vd-marcador-do-briefing absolute top-0 left-0 size-11 cursor-grab rounded-full active:cursor-grabbing"
          style={estado ? { transform: `translate(calc(${estado.x}px - 50%), calc(${estado.y}px - 50%))` } : { visibility: "hidden" }}
        />
      </div>
      {/* No celular, os trechos da trena, com a marca de cada um (na mesa, o canvas os escreve em cima dela), e os
          feriados, com o nome e a data: a marca de falta na trena não dizia qual (desde 18/10; a revisão). No HTML do
          servidor, a frase estável. */}
      <Estacoes
        itens={[...TRECHOS_DA_TRENA, ["Feriados nacionais", conta ? (conta.feriados.length ? `${lista(conta.feriados.map((f) => comData(conta, f)))}, fora da conta` : "nenhum nestes 15 dias úteis") : "fora da conta dos dias úteis"]]}
        marcas={["anel", "abre", "pontos", "falta"]}
      />
    </div>
  );
}

/** A carta do prazo: os dias (o início) ou as primeiras 72 horas (O trabalho). `lugar` é figuras.coordenadas.decimal. */
export function CartaDoPrazo({ escala, lugar }: { escala: "dias" | "horas"; lugar: Lugar }) {
  return escala === "dias" ? <CartaDosDias lugar={lugar} /> : <FolhaDasHoras lugar={lugar} />;
}

/**
 * A data viva de uma etapa, em O trabalho (secoes/trabalho.tsx), em Inter tabular: a do briefing arrastado na folha
 * das 72 horas (o evento dela), ou a de agora. No HTML do servidor, `reserva`, uma frase completa e estável, uma vez
 * só; depois de montar, a data, num bloco aria-hidden, com o mesmo texto em .sr-only (a troca do minuto não é lida
 * algarismo por algarismo). O relógio de um minuto passa por aoVivo.
 */
export function DataDaEtapa({ etapa, reserva }: { etapa: 0 | 1 | 2 | 3; reserva: string }) {
  const caixa = useRef<HTMLSpanElement>(null);
  /** null até montar: no HTML do servidor, a reserva, uma vez só (sem a cópia para o leitor de tela). */
  const [texto, setTexto] = useState<string | null>(null);

  useEffect(() => {
    let fixo: number | null = null;
    const escrever = () => {
      const agora = relogio().getTime();
      const briefing = new Date(briefingDe(fixo, agora));
      const conta = contaDoPrazo(briefing);
      const [u1, u7, u15] = [conta.uteis[0], conta.uteis[6], conta.uteis[14]];
      const fora = conta.feriados.filter((f) => f.d > u7 && f.d < u15).map((f) => comData(conta, f));
      const foraDasRevisoes = conta.feriados.filter((f) => f.d < u7).map((f) => comData(conta, f));
      // O sujeito na frase, e os dois-pontos só depois de "agora" (até 17/10, "Se fechar em: dom. 18/10", a revisão).
      setTexto(
        [
          briefing.getTime() === agora ? `Se o briefing fechar agora: ${escritaDoInstante(briefing, false)}` : `Se o briefing fechar em ${escritaDoInstante(briefing, false)}`,
          `O rascunho chega até ${escritaDoInstante(rascunho(briefing), false)}`,
          `De ${deA(conta.dia(u1), conta.dia(u7))}${foraDasRevisoes.length ? `, sem ${lista(foraDasRevisoes)}` : ""}`,
          `De ${deA(conta.dia(u7), conta.dia(u15))}${fora.length ? `, sem ${lista(fora)}` : ""}`,
        ][etapa],
      );
    };
    const aoArrastar = (evento: Event) => {
      fixo = (evento as CustomEvent<number | null>).detail;
      escrever();
    };
    escrever();
    window.addEventListener(EVENTO, aoArrastar);
    const parar = aoVivo(caixa.current!, escrever, 60_000);
    return () => {
      window.removeEventListener(EVENTO, aoArrastar);
      parar();
    };
  }, [etapa]);

  return (
    <span ref={caixa}>
      {texto === null ? (
        reserva
      ) : (
        <>
          <span aria-hidden="true">{texto}</span>
          <span className="sr-only">{texto}</span>
        </>
      )}
    </span>
  );
}

/**
 * A faixa das etapas, em O trabalho (desde 17/10, a direção final do Atlas Digital, seção 3, item 18; o desenho em
 * ilhas/desenho-da-carta-do-prazo.ts, fitaDasEtapas): o canvas na coluna da faixa, ao lado da lista das etapas (o
 * <ol> que vem logo depois dele, em secoes/trabalho.tsx), com cada trecho na altura do item da sua etapa e na unidade
 * que ele mede. A lista dá a altura dos trechos de escala (24 horas e os dias de cada um, em --dias-revisoes e
 * --dias-publicacao, app/digital.css), e o texto, quando é mais alto, os estica. A conta é a do briefing de agora ou o
 * arrastado na folha de cima (o evento dela). O relógio de um minuto passa por aoVivo. No lugar das fileiras em CSS de
 * 17/10, que não mediam nada (as 24 horas em 26 linhas, as revisões em 24 fileiras, a mesma altura em toda etapa: a
 * revisão, P2). Abaixo de 1.024 px (desde 18/10), a faixa deita: cada etapa ganha a sua tira na largura inteira, entre
 * o nome e o texto (tirasDasEtapas), e o texto fica com a largura toda.
 */
export function FitaDasEtapas() {
  const tela = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = tela.current!;
    const lista = canvas.nextElementSibling as HTMLOListElement;
    return aoChegar(lista, ({ fitaDasEtapas, tirasDasEtapas }) => {
      let fixo: number | null = null;
      const desenhar = () => {
        const briefing = briefingDe(fixo, relogio().getTime());
        const conta = contaDoPrazo(new Date(briefing));
        const [u1, u7, u15] = [conta.uteis[0], conta.uteis[6], conta.uteis[14]];
        lista.style.setProperty("--dias-revisoes", String(u7 - u1 + 1));
        lista.style.setProperty("--dias-publicacao", String(u15 - u7));
        const itens = [...lista.children] as HTMLElement[];
        // Abaixo de 1.024 px, a faixa deitada: uma tira por etapa, no vão sob o nome dela (o h2 e a margem dele).
        if (faixaDeitada()) {
          const tiras = itens.map((item) => {
            const nome = item.firstElementChild as HTMLElement;
            return nome.offsetTop + nome.offsetHeight;
          });
          tirasDasEtapas(canvas, { largura: lista.clientWidth, altura: lista.offsetHeight, tiras, briefing, conta, k: letra() });
          return;
        }
        const largura = parseFloat(getComputedStyle(itens[0]).gridTemplateColumns);
        fitaDasEtapas(canvas, {
          largura,
          altura: lista.offsetHeight,
          trechos: itens.map((item) => ({ topo: item.offsetTop, alto: item.offsetHeight })),
          briefing,
          conta,
          // A letra do leitor, até onde a coluna (--fita, em rem: app/digital.css) cresce com ela.
          k: Math.min(letra(), largura / 80),
        });
      };
      const aoArrastar = (evento: Event) => {
        fixo = (evento as CustomEvent<number | null>).detail;
        desenhar();
      };
      window.addEventListener(EVENTO, aoArrastar);
      desenhar();
      const pararRelogio = aoVivo(lista, desenhar, 60_000);
      const pararTamanho = aoMudarALargura(lista, desenhar, true);
      return () => {
        window.removeEventListener(EVENTO, aoArrastar);
        pararRelogio();
        pararTamanho();
      };
    });
  }, []);

  return <canvas ref={tela} aria-hidden="true" className="vd-fita-desenho" />;
}
