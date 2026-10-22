"use client";

import { useAnimate } from "motion/react-mini";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState, useSyncExternalStore } from "react";

import { IconeSeta, IconeVisto, IconeWhatsApp } from "@/components/icones";
import type { ContaDosPagamentos } from "@/components/ilhas/conta-dos-pagamentos";
import type { Parte } from "@/components/ilhas/desenho-da-conta";
import { Button, buttonVariants } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/spell/copy-button";
import { criacaoNaFundacao, modulos, modulosDoMontador, planos } from "@/conteudo/planos";
import { simulador } from "@/conteudo/site";
import { aoVivo } from "@/lib/ambiente";
import { EVENTO_ANCORA, type DetalheDaAncora } from "@/lib/ancoras";
import { reais } from "@/lib/moeda";
import { familiaDoTitulo, mostrador, type Mostrador } from "@/lib/traco-e-ponto";
import { linkWhatsApp, mensagemDeOrcamento } from "@/lib/whatsapp";

const SUAVE = [0.22, 1, 0.36, 1] as const;

/** A mesa da grade da tabela completa (o lg do Tailwind, 64 rem): ali, o HTML segue a ordem dela (Montador). */
const MESA = "(min-width: 64rem)";
const naMesa = () => window.matchMedia(MESA).matches;
const assinarAMesa = (avisar: () => void) => {
  const consulta = window.matchMedia(MESA);
  consulta.addEventListener("change", avisar);
  return () => consulta.removeEventListener("change", avisar);
};

/** A página adicional: cobrada por pedido, fora da soma (conteudo/planos.ts). */
const paginaAdicional = modulos.find((m) => m.porPagina);

/** O maior orçamento possível na condição de fundação (o plano mais caro, pela metade, e todos os módulos): a escala da composição. */
const MAXIMO = Math.max(...planos.map(criacaoNaFundacao)) + modulosDoMontador.reduce((s, m) => s + m.criacao, 0);
/** O maior valor cheio (o plano mais caro e todos os módulos): o carimbo da conta reserva a altura dele (Conta). */
const CHEIO_MAXIMO = Math.max(...planos.map((p) => p.criacao)) + modulosDoMontador.reduce((s, m) => s + m.criacao, 0);

function somar(planoId: string, moduloIds: string[]) {
  const plano = planos.find((p) => p.id === planoId)!;
  const escolhidos = modulosDoMontador.filter((m) => moduloIds.includes(m.id));
  const modulosNaCriacao = escolhidos.reduce((s, m) => s + m.criacao, 0);
  return {
    plano,
    escolhidos,
    // Na condição de fundação (17/10): a metade da criação do plano; os módulos, inteiros (conteudo/planos.ts).
    criacao: criacaoNaFundacao(plano) + modulosNaCriacao,
    cheio: plano.criacao + modulosNaCriacao,
    mensal: plano.mensal + escolhidos.reduce((s, m) => s + (m.mensal ?? 0), 0),
  };
}

/**
 * As partes da composição da criação (ilhas/desenho-da-conta.ts): o plano pela metade e cada módulo, com o rótulo. O
 * estado do plano diz o que é a metade desde a revisão final de 18/10: até então, "pela metade", e os três leitores de
 * fora perguntaram "metade do preço? pago metade agora?" (a parcela do briefing, na carta logo abaixo, é a metade).
 */
function partesDa(plano: (typeof planos)[number], escolhidos: readonly (typeof modulosDoMontador)[number][]): Parte[] {
  return [
    { valor: criacaoNaFundacao(plano), estado: "publicado", rotulo: [plano.nome, reais(criacaoNaFundacao(plano)), "50% de desconto (fundação)"] },
    ...modulosDoMontador.map((m): Parte => {
      const escolhido = escolhidos.includes(m);
      return { valor: m.criacao, estado: escolhido ? "escolhido" : "fora", rotulo: [m.nome, reais(m.criacao), escolhido ? "escolhido" : "não escolhido"] };
    }),
  ];
}
/** Todas as escolhas (os planos × as combinações de módulos): a altura dos rótulos da composição é a da que pede mais. */
const VARIANTES = planos.flatMap((p) =>
  modulosDoMontador.reduce<(typeof modulosDoMontador)[number][][]>((cs, m) => cs.flatMap((c) => [c, [...c, m]]), [[]]).map((c) => partesDa(p, c)),
);
/**
 * A altura do canvas da composição antes do desenho, que ele mantém (desde a revisão final de 18/10; até então, duas
 * camadas de rótulos sempre, e a conta pulava 56 px na carga a 320, 112 com a letra a 200%): as fileiras (5 × 0,8 casa
 * de 1/38 da largura, 100cqi / 9,5), o vão até elas (0,625 rem) e a faixa dos rótulos de que a escolha que pede mais
 * precisa (desenho-da-conta.ts, dispor), pela largura da composição em px de letra comum: 3 rem (uma camada de três
 * linhas) a partir de 781, e, abaixo de cada largura dos degraus, mais tantos rem; com 1 px de folga, porque o desenho
 * vai na largura arredondada para baixo. Em px inteiros, para o canvas não se reamostrar. Na revisão seguinte (18/10),
 * os degraus de novo, com as larguras medidas no próprio canvas da composição, em cada letra: os de antes vinham de um
 * canvas fora da página, que mede o texto 3% mais largo, e a reserva sobrava 80 px a 414 com a letra a 200% e 32 a 360,
 * em fio vazio sob os rótulos. Desde então, os mesmos em qualquer letra (o fio do plano, em 0 no dispor).
 * shortcut: degraus medidos com o dispor e as larguras destes rótulos no canvas da composição (de 100 a 1.000 px de
 * letra comum, por bissecção, com a letra de 100 a 200%, e 0,1 de folga); se um rótulo, um preço, a fonte ou o custo
 * do dispor mudar, medir de novo (abaixo do que se reservou, o desenho cresce, a conta pula, e o desenvolvimento avisa).
 */
const DEGRAUS = [[781.1, 1], [489.7, 1], [320.4, 1.5], [215.6, 1], [175.7, 1], [158.2, 2.5], [130.5, 1], [106.1, 1]];
const RESERVA = `round(up, calc(100cqi / 9.5 + 3.625rem${DEGRAUS.map(([w, h]) => ` + clamp(0rem, (${w / 16}rem + 1px - 100cqi) * 1000, ${h}rem)`).join("")}), 1px)`;

// A escala do painel (diretrizes de 03/10, CLAUDE.md da raiz). Texto em
// três degraus: rótulo (12 px: capitulares, a nota de privacidade), nota
// (14 px: pílulas, conta, descrições, a mensagem) e número (24 a 36 px: os
// dois totais, em Archivo Black, como no site de 28/08; de 03 a 05/10, na
// família do texto, em 600). Até 03/10, nove tamanhos soltos, de 11,5 a
// 15 px, e os totais de 23 a 35 px. Recuos em três
// medidas: o painel com 24 px dos lados no celular e 32 px a partir de
// 640 px; as caixas de dentro com 16 px dos lados e 20 px em cima e
// embaixo; as pílulas com 14 px (16 até 17/10). Até 03/10,
// seis combinações, de 18, 20 e 30 px.

/**
 * As pílulas de escolha da tabela de 28/08: contorno em repouso, navy quando marcadas. Desde 17/10 (o fechamento com o
 * Impeccable, B, itens 1 e 7), a etiqueta "Recomendado" vai pelo `gap` e desce para a linha de baixo quando não cabe (a
 * 200% a 390 px, a pílula alargava a página a 528 px), com 14 px dos lados (com 16, "Completo" caía sozinho para a
 * segunda linha no início, a 1.440); e, em cores forçadas, a marcada fica no realce do sistema (até então, igual às
 * outras: o fundo navy sumia). Desde 18/10 (o passe do celular), os planos um sobre o outro perdem o recuo dos lados
 * (8 px: o nome vai centrado na largura toda), a etiqueta perde 2 px de cada lado na coluna de menos de 15 rem (a
 * letra a 200%) e só quebra a palavra se nem assim couber: com a letra a 200% a 320 px, a pílula do Profissional
 * passava 23 px da coluna.
 */
const PILULA =
  "inline-flex min-h-11 max-w-full cursor-pointer flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-border bg-transparent px-3.5 py-2.5 text-nota font-medium text-foreground transition-[background-color,color,border-color] duration-150 ease-atlas hover:border-foreground aria-pressed:border-secondary aria-pressed:bg-secondary aria-pressed:text-secondary-foreground forced-colors:aria-pressed:border-[Highlight] forced-colors:aria-pressed:bg-[Highlight] forced-colors:aria-pressed:text-[HighlightText] forced-colors:aria-pressed:forced-color-adjust-none";

const ROTULO = "mb-2.5 block text-nota font-semibold";
// Em letra comum desde o segundo fechamento com o Impeccable (17/10): até então, em caixa-alta espaçada (a marca T3).
const CAPITULAR = "text-nota font-semibold text-muted-foreground";

/**
 * O número com a caixa fixa dos algarismos (0,66 em, a de components/algarismos.tsx: o número não dança), desenhado por
 * CSS: cada caractere no conteúdo gerado (::before, attr(data-c)), num bloco aria-hidden. O robô sem navegador lê só o
 * texto do leitor de tela, ao lado (com o Algarismos, o número partido em caixas encostava no texto escondido: "R$ 750R$
 * 7|50", na ferramenta texto-do-robo.mjs).
 */
function Caixas({ texto }: { texto: string }) {
  return (
    <span aria-hidden="true" className="whitespace-pre">
      {[...texto].map((c, i) => (
        <span key={i} data-c={c} className={`before:content-[attr(data-c)] ${/\d/.test(c) ? "inline-block w-[0.66em] text-center" : ""}`} />
      ))}
    </span>
  );
}

/**
 * O número calculado que troca diante de quem escolhe, chapado (desde 18/10, a decisão do aprovador: nenhum número em
 * pontos no site, a reserva da seção 2.4 da direção): o mostrador de lib/traco-e-ponto.ts, o mesmo da capa, com a troca
 * em Bayer, em 220 ms, só nas casas que mudaram. No HTML do servidor, as Caixas, que ficam no lugar e dão a medida
 * (nada pula); depois de montar, o canvas por cima delas, no corpo e na tinta que o CSS dá a elas, com a linha de base
 * na delas (a sonda: um inline-block vazio, que pousa na linha de base), e refeito quando o corpo muda (o text-numero
 * cresce com a janela). O canvas vai da amostra mais larga ("R$ 88.888") e não ocupa lugar: o que passa da caixa é
 * transparente, e o body recorta o que passa da página (overflow-x: clip). Até 18/10, no início, a casa que mudou
 * acendia em pontos e assentava chapada (.vd-acende), e em /orcamento o total vinha em meio-tom.
 */
function Chapado({ texto }: { texto: string }) {
  const caixa = useRef<HTMLSpanElement>(null);
  const sonda = useRef<HTMLSpanElement>(null);
  const tela = useRef<HTMLCanvasElement>(null);
  const motor = useRef<Mostrador | null>(null);
  const atual = useRef(texto);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    atual.current = texto;
    motor.current?.escrever(texto);
  }, [texto]);

  useEffect(() => {
    const el = caixa.current!;
    const canvas = tela.current!;
    const familia = familiaDoTitulo();
    let ativo = true;
    let corpo = 0;
    const montar = () => {
      const estilo = getComputedStyle(el);
      if (parseFloat(estilo.fontSize) !== corpo) {
        corpo = parseFloat(estilo.fontSize);
        motor.current?.parar();
        motor.current = mostrador(canvas, familia, corpo, ["R$ 88.888"], estilo.color);
        motor.current.escrever(atual.current, false);
      }
      canvas.style.top = `${sonda.current!.getBoundingClientRect().bottom - el.getBoundingClientRect().top - motor.current!.base}px`;
    };
    document.fonts.load(`64px ${familia}`, "0123456789R$.").then(() => {
      if (!ativo) return;
      montar();
      setPronto(true);
    });
    let pedido = 0;
    const redimensionar = () => {
      cancelAnimationFrame(pedido);
      pedido = requestAnimationFrame(() => motor.current && montar());
    };
    window.addEventListener("resize", redimensionar);
    return () => {
      ativo = false;
      cancelAnimationFrame(pedido);
      window.removeEventListener("resize", redimensionar);
      motor.current?.parar();
    };
  }, []);

  return (
    <span ref={caixa} className="relative">
      <span ref={sonda} className="inline-block" />
      <span className={pronto ? "invisible" : undefined}>
        <Caixas texto={texto} />
      </span>
      <canvas ref={tela} className={pronto ? "pointer-events-none absolute left-0" : "hidden"} />
    </span>
  );
}

/**
 * Um valor chapado em Archivo Black, com a caixa fixa dos algarismos. `acender`: a casa que mudou troca em Bayer (o
 * Chapado, no início); na página Orçamento, a mensalidade troca de uma vez, porque o número que vende é o total da
 * criação. `unidade`: o "R$" na anatomia da leitura (.vd-leitura .unidade, app/digital.css), à metade do corpo, no
 * conteúdo gerado (fora do texto do robô); sem ela, o "R$" no corpo do número, como no início.
 */
function Valor({ valor, unidade, acender = true }: { valor: number; unidade?: boolean; acender?: boolean }) {
  const texto = unidade ? reais(valor).slice(3) : reais(valor);
  return (
    <>
      <span className="sr-only">{reais(valor)}</span>{" "}
      <span aria-hidden="true" className="inline-block">
        {unidade && <span className="unidade before:content-['R$']" />}
        {acender ? <Chapado texto={texto} /> : <Caixas texto={texto} />}
      </span>
    </>
  );
}

/**
 * Um total do início: o rótulo e o valor chapado; na criação, o valor cheio riscado antes dele, no formato dos planos
 * (.vd-riscado, components/secoes/planos.tsx). Até 17/10, o cheio ficava em cima do valor (o fechamento com o
 * Impeccable, A: o mesmo par em dois formatos), e o leitor de tela ouvia "Valor cheio: R$ 1.500 R$ 750", sem o rótulo
 * do segundo (B, item 13).
 */
function Total({ rotulo, valor, cheio }: { rotulo: string; valor: number; cheio?: number }) {
  return (
    <div className="min-w-0">
      <dt className={CAPITULAR}>{rotulo}</dt>
      <dd className="mt-1.5 flex flex-wrap items-baseline gap-x-3">
        {cheio !== undefined && (
          <>
            <s className="vd-riscado font-sub text-corpo font-medium">
              <span className="sr-only">Valor cheio: </span>
              {reais(cheio)}
            </s>{" "}
            <span className="sr-only">Na condição de fundação: </span>
          </>
        )}
        <span className="font-display tracking-titulo text-numero whitespace-nowrap">
          <Valor valor={valor} />
        </span>
      </dd>
    </div>
  );
}

type TextosDaTabelaCompleta = {
  inclui: string;
  siteDoPlano: string;
  resumo: string;
  pagamento: string;
  noBriefing: string;
  naPublicacao: string;
  inicioDaMensalidade: string;
  mensalidadeCompreende: string;
  paginaAdicional: string;
  aviso: string;
  fundacao: { texto: string; rotulo: string; destino: string };
};

type Props = {
  privacidade: string;
  /**
   * A tabela completa da página Orçamento: além das escolhas e dos totais,
   * o que o plano inclui e o site feito nele, o que cada módulo faz, e a
   * conta no instrumento (a composição da criação, a carta dos pagamentos).
   */
  completo?: { textos: TextosDaTabelaCompleta; sites: { plano: string; nome: string; caminho: string }[] };
};

/**
 * Montador de orçamento com o desenho da tabela do site de 28/08 (pedido
 * do usuário, 03/10: "prefiro a tabela do site antigo"): as pílulas do
 * plano e dos módulos, os dois totais, "Preparar mensagem" e a prévia, com
 * o envio pelo WhatsApp e a cópia. Tudo acontece no aparelho — soma,
 * mensagem e vínculo para o WhatsApp. Nada é enviado a servidor algum.
 * No início, a tabela inteira numa ficha de papel (desde 17/10, a direção
 * final do Atlas Digital, seção 3, item 5: o raio --r-ficha, de 12 px; até
 * então, 40), com os totais chapados que trocam em Bayer.
 * Na página Orçamento (`completo`; desde 17/10, a seção 3, item 16), a
 * ferramenta em duas colunas, sem o painel: à esquerda, no papel, as
 * escolhas, o que o plano inclui e o que cada módulo faz; à direita, a conta,
 * num instrumento (a tela pequena no papel): o total chapado, a
 * composição da criação em pontos e a carta dos pagamentos, que
 * "Preparar mensagem" grava (ilhas/desenho-da-conta.ts).
 * O plano pode chegar marcado pelo vínculo "Escolher <plano>" da página
 * Planos ou do simulador (/orcamento#orcamento-<id>, lido do endereço na
 * chegada à página do orçamento): a navegação interna não guarda a âncora
 * no endereço e avisa o destino pelo evento EVENTO_ANCORA (lib/ancoras.ts).
 * Sem plano no vínculo, chega marcado o recomendado (o Profissional; ata
 * v3.0, IV.2): o ponto de partida é o plano indicado, não o menor preço.
 */
export function Montador({ privacidade, completo }: Props) {
  const [planoId, setPlanoId] = useState((planos.find((p) => p.destaque) ?? planos[0]).id);
  const [moduloIds, setModuloIds] = useState<string[]>([]);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [previa, animate] = useAnimate<HTMLDivElement>();
  const escolhasDoPlano = useRef<HTMLDivElement>(null);
  const escolhasDosModulos = useRef<HTMLDivElement>(null);
  const caixaDosTotais = useRef<HTMLDListElement>(null);
  // A faixa do pé responde ao toque: antes do primeiro, não cobre a primeira tela (a pílula que se vai tocar).
  const [tocado, setTocado] = useState(false);
  const mesa = useSyncExternalStore(assinarAMesa, naMesa, () => false);

  const { plano, escolhidos, criacao, mensal, cheio } = somar(planoId, moduloIds);

  // "Escolher Profissional" (página Planos) aponta para /orcamento#orcamento-profissional.
  // O destino chega pelo evento da navegação interna (ou pelo endereço, na chegada).
  useEffect(() => {
    const aplicar = (destino: string | undefined) => {
      const pedido = /^orcamento-(.+)$/.exec(destino ?? "")?.[1];
      if (planos.some((p) => p.id === pedido)) {
        setPlanoId(pedido!);
        setMensagem(null);
      }
    };
    let chegada = "";
    try {
      chegada = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      // Âncora malformada (um vínculo para "/orcamento#%E0"): vale como nenhuma. O
      // decodeURIComponent lançaria dentro do efeito e derrubaria a página.
    }
    aplicar(chegada);
    const aoAncorar = (evento: Event) => aplicar((evento as CustomEvent<DetalheDaAncora>).detail?.id);
    window.addEventListener(EVENTO_ANCORA, aoAncorar);
    return () => window.removeEventListener(EVENTO_ANCORA, aoAncorar);
  }, []);

  // A prévia se abre deslizando (a animação "abre" de 28/08) e, se estiver abaixo da dobra, é trazida à vista.
  useEffect(() => {
    const el = previa.current;
    if (!mensagem || !el) return;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduzir) animate(el, { opacity: [0, 1], transform: ["translateY(-8px)", "none"] }, { duration: 0.7, ease: SUAVE });
    el.scrollIntoView({ behavior: reduzir ? "auto" : "smooth", block: "nearest" });
  }, [mensagem, animate, previa]);

  // A faixa do pé, na tabela completa abaixo de 1024 px (16/10, Impeccable): depois do toque num plano, os totais ficavam
  // a ~1.400 px, fora da tela de 844, e o título promete "Dois toques, valor exato". Ela aparece, depois do primeiro
  // toque, enquanto as pílulas estão na tela e os totais de verdade não; chegando a eles, sai (sem os valores duas vezes
  // à vista). Desde 18/10, só depois do toque: na carga, a 320 × 640, ela cobria a primeira pílula (a revisão do passe).
  const [vistos, setVistos] = useState({ pilulas: false, totais: false });
  useEffect(() => {
    const alvos = [escolhasDoPlano.current, escolhasDosModulos.current, caixaDosTotais.current];
    if (!completo || alvos.some((a) => !a)) return;
    // Os totais contam como vistos com a metade na tela: a 390 × 844, a borda de cima deles fica 4 px acima do pé na
    // carga, e o valor, fora.
    const naTela = new Map<Element, boolean>();
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) naTela.set(e.target, e.target === alvos[2] ? e.intersectionRatio >= 0.5 : e.isIntersecting);
        setVistos({ pilulas: !!(naTela.get(alvos[0]!) || naTela.get(alvos[1]!)), totais: !!naTela.get(alvos[2]!) });
      },
      { threshold: [0, 0.5] },
    );
    alvos.forEach((a) => observador.observe(a!));
    return () => observador.disconnect();
  }, [completo]);
  const faixa = tocado && vistos.pilulas && !vistos.totais;

  const preparar = () => setMensagem(mensagemDeOrcamento({ plano: plano.nome, modulos: escolhidos.map((m) => m.nome), criacao, mensal, cheio }));

  function escolherPlano(id: string) {
    setPlanoId(id);
    setMensagem(null);
    setTocado(true);
  }

  function alternarModulo(id: string) {
    setModuloIds((atuais) => (atuais.includes(id) ? atuais.filter((m) => m !== id) : [...atuais, id]));
    setMensagem(null);
    setTocado(true);
  }

  // @container (no bloco que leva as pílulas do plano): na coluna estreita (abaixo de 22 rem: o celular, ou a letra a
  // 200%), os três planos um sobre o outro, na largura toda (17/10, segundo fechamento com o Impeccable); até então,
  // quebravam em dois e um, a 390 px.
  const pilulasDoPlano = (
    <>
      <span id="rotulo-plano" className={ROTULO}>
        Plano
      </span>
      <div role="group" aria-labelledby="rotulo-plano" className="flex flex-wrap gap-2 @max-[22rem]:grid @max-[22rem]:*:justify-center">
        {planos.map((p) => (
          <button
            key={p.id}
            type="button"
            id={completo ? `orcamento-${p.id}` : undefined}
            aria-pressed={p.id === planoId}
            onClick={() => escolherPlano(p.id)}
            className={`${PILULA} @max-[22rem]:px-2 @max-[15rem]:px-1.5`}
          >
            {p.nome}{" "}
            {/* O recomendado marcado na própria pílula (17/10, pedido do usuário: "adicione dentro do plano profissional o
                recomendado"). */}
            {p.destaque && <span className="rounded-full border border-current/35 px-1.5 py-px text-rotulo font-semibold wrap-anywhere @max-[15rem]:px-1">Recomendado</span>}
            {/* O espaço depois da etiqueta: no HTML, sem ele, o robô lia "RecomendadoCompleto". */}{" "}
          </button>
        ))}
      </div>
    </>
  );

  const pilulasDosModulos = (
    <>
      <span id="rotulo-modulos" className={ROTULO}>
        Módulos <small className="text-rotulo font-medium text-muted-foreground">(opcional)</small>
      </span>
      <div role="group" aria-labelledby="rotulo-modulos" className="flex flex-wrap gap-2">
        {modulosDoMontador.map((m) => (
          <button key={m.id} type="button" aria-pressed={moduloIds.includes(m.id)} onClick={() => alternarModulo(m.id)} className={PILULA}>
            {m.nome}{" "}
          </button>
        ))}
      </div>
    </>
  );

  // Desde 17/10, a prévia fica sob um fio, e não numa caixa arredondada dentro do painel (o cartão no cartão, L4); na
  // página Orçamento, dentro do instrumento, na tinta da tela. "Preparar mensagem" no bronze, a ação do site (até 17/10,
  // navy, enquanto "Montar orçamento" era bronze em todo o resto: o fechamento com o Impeccable, A).
  // "Preparar mensagem" grava a conta e mostra a mensagem; o envio é o segundo toque, de propósito (o fluxo da tabela de
  // 28/08, que o usuário pediu de volta em 03/10): abrir o WhatsApp no mesmo toque esconderia a gravação atrás da aba
  // nova e tiraria a cópia de quem não tem o WhatsApp no computador. A direção (2.9) pedia o envio no mesmo toque.
  const acao = (
    <>
      {/* Gravada a conta, a ação seguinte é o envio: "Preparar mensagem" passa ao contorno, e o bronze fica só nele.
          Na conta larga (a partir de 36 rem: o tablet, o celular deitado), na largura dela, à esquerda, como os totais:
          na largura toda, era uma pílula de ~700 px (desde 18/10). Em cores forçadas, com o contorno do sistema: sem
          ele, o metal sumia e a ação ficava como texto solto. */}
      <Button variant={mensagem ? "outline" : "default"} className="w-full forced-colors:border forced-colors:border-[ButtonText] @min-[36rem]/conta:w-auto" onClick={preparar}>
        Preparar mensagem
      </Button>

      <div aria-live="polite">
        {mensagem && (
          // scroll-mt: trazida à vista, a prévia não para sob o cabeçalho fixo (72 px).
          <div ref={previa} className="mt-5 scroll-mt-28 scroll-mb-6 border-t border-border pt-5">
            <p className={`${CAPITULAR} mb-2`}>Mensagem</p>
            <p className="text-nota">{mensagem}</p>
            {/* Lado a lado, numa linha só, quando cabem (a partir de 20 rem de coluna: a conta de /orcamento na mesa, a ficha
                do início); abaixo disso (o celular, a letra a 200%), na largura toda, um sobre o outro. Até 18/10, pela
                largura da janela: na conta, a 1.440, os dois quebravam em duas linhas de larguras diferentes. */}
            <div className="mt-4 grid gap-2.5 @min-[20rem]:flex @min-[20rem]:items-center @min-[20rem]:gap-3">
              <a href={linkWhatsApp(mensagem)} target="_blank" rel="noopener" className={buttonVariants({ className: "vd-brilho" })}>
                <IconeWhatsApp className="size-4.5" />
                Enviar no WhatsApp
              </a>
              {/* Spell UI, Copy Button (desde 03/10): confirma só se a cópia deu certo. */}
              <CopyButton valor={mensagem} className={buttonVariants({ variant: "outline" })} />
            </div>
          </div>
        )}
      </div>
    </>
  );

  if (!completo) {
    // O filete duplo contábil embaixo (16/10): o fecho da soma.
    // A sombra de 60 px saiu em 03/10 pela regra 3 das Diretrizes de Design Premium e voltou no mesmo dia, a pedido do
    // usuário: é parte da identidade do site. min-w-0: com a letra a 200% a 390 px, o painel não alarga a página.
    // Abaixo de 22,4 em (320 px com a letra normal; qualquer celular com ela a 200%), a ficha avança 16 px sobre a margem
    // da página e recua 16 por dentro (desde 18/10): a 200%, com 48 px de margem e 48 de recuo, sobravam 198 px para as
    // pílulas a 390, e a do Profissional passava da ficha.
    return (
      <div className="@container min-w-0 rounded-[var(--r-ficha)] border border-border bg-card px-6 py-8 shadow-[var(--sombra-media)] max-[22.4em]:-mx-4 max-[22.4em]:px-4 sm:px-8">
        <div className="@container mb-6">{pilulasDoPlano}</div>
        <div className="mb-6">{pilulasDosModulos}</div>
        {/* A criação com a largura dela (o cheio riscado ao lado do valor, como nos planos), a mensalidade com o resto; na
            coluna estreita (abaixo de 24 rem: o celular, a letra a 200%), uma sobre a outra. */}
        <dl ref={caixaDosTotais} className="my-6 grid gap-x-6 gap-y-4 border-b-[3px] border-double border-foreground/30 pb-5 @min-[24rem]:grid-cols-[auto_1fr]">
          <Total rotulo="Criação" valor={criacao} cheio={cheio} />
          <Total rotulo="Por mês" valor={mensal} />
        </dl>
        {acao}
        <p className="mt-4 max-w-[60ch] text-rotulo text-muted-foreground">{privacidade}</p>
      </div>
    );
  }

  const { textos } = completo;
  // A ordem (desde 18/10, o passe do celular): no HTML, as pílulas do plano e dos módulos (com o que cada módulo faz,
  // desde o fechamento), a conta, a carta dos pagamentos e, depois, o que o plano inclui, a página adicional e a
  // condição. No celular, nessa ordem: a conta
  // logo depois dos dois toques, e as duas telas seguidas (até então, ela vinha depois de ~1,8 tela de texto no papel, e
  // a ferramenta lia como formulário: a revisão do passe). Na mesa, a mesma composição de antes, pela grade: à esquerda,
  // as pílulas do plano, o que ele inclui, as dos módulos, o que fazem e a condição, cada um na sua linha; a conta, à
  // direita, nas cinco linhas (a última, 1fr, leva a sobra se a conta for mais alta); a carta embaixo. As margens dos
  // itens refazem os vãos de antes (a grade sem vão entre as linhas). Na mesa, depois de montar (desde a revisão final
  // de 18/10), o HTML na ordem dela: a coluna da esquerda de cima a baixo, a conta e a carta; até então, o leitor de
  // tela e o Tab iam das pílulas do plano às dos módulos, à conta, e só depois de "Preparar mensagem" voltavam ao que o
  // plano inclui ("O site deste plano"), na linha 2. A grade põe cada um no seu lugar em qualquer ordem: a troca não
  // mexe na mesa à vista. O servidor manda a ordem do celular, a única que é a de quem lê sem a grade. Os blocos têm
  // chave: na troca (o tablet que gira, o zoom), mudam de lugar sem se refazer, e o React devolve o foco ao que estava
  // focado; até a revisão seguinte, o que mudava de lugar se refazia, e o foco caía no body.
  const detalhe = (
    <div key="detalhe" className="min-w-0 mb-6 max-lg:mt-7 lg:col-span-7 lg:row-start-2">
      <DetalheDoPlano plano={plano} textos={textos} site={completo.sites.find((s) => s.plano === plano.id)} />
    </div>
  );
  const fimDaColuna = (
    <Fragment key="fim">
      {/* A página adicional, que não entra na soma: na mesa, fecha a lista dos módulos; fora dela, depois do que o plano
          inclui. "R$ 250 por página" desce para baixo do nome quando os dois não cabem numa linha (desde 18/10). */}
      {paginaAdicional && (
        <div className="min-w-0 mb-6 lg:col-span-7 lg:row-start-4">
          <dl className="border-y border-border">
            <div className="py-3 text-muted-foreground">
              <dt className="flex flex-wrap items-baseline justify-between gap-x-4 text-nota font-semibold">
                {textos.paginaAdicional}{" "}
                <span className="font-normal tabular-nums">{reais(paginaAdicional.criacao)} por página</span>
              </dt>
              <dd className="mt-0.5 max-w-[62ch] text-nota">{paginaAdicional.descricao} Sem recorrência, fora desta soma.</dd>
            </div>
          </dl>
        </div>
      )}
      {/* O que a mensalidade compreende e a condição de fundação, no papel, sob as escolhas: o texto corrido não vai à tela
          (a regra da janela). A nota da fundação com o vínculo para ela (até 16/10, numa caixa com filete de bronze
          dentro do painel: cartão dentro de cartão, e o terceiro bloco da condição no site). Sem filete em cima desde
          18/10: o de baixo dos módulos já separa, e os dois faziam um filete duplo, a 24 px um do outro. */}
      <div className="min-w-0 text-nota lg:col-span-7 lg:row-start-5">
        <p className="max-w-[60ch] text-muted-foreground">{textos.mensalidadeCompreende}</p>
        <p className="mt-4 max-w-[60ch]">
          <span className="font-semibold">{textos.fundacao.rotulo}.</span> {textos.fundacao.texto}
        </p>
        {/* O vínculo com seta do site (.vd-vinculo): no hover, o sublinhado aparece e a seta avança (até 03/10, não respondia).
            Na linha de baixo: no meio do texto, os 44 px do alvo abriam a entrelinha da última linha. */}
        <Link href={textos.fundacao.destino} className="vd-vinculo min-h-11 gap-1.5 font-semibold">
          Ver a condição
          <IconeSeta className="size-3.5" />
        </Link>
      </div>
    </Fragment>
  );
  const escolhaDoPlano = (
    <div key="plano" ref={escolhasDoPlano} className="@container min-w-0 max-lg:mb-6 lg:col-span-7 lg:row-start-1">
      {pilulasDoPlano}
    </div>
  );
  const escolhaDosModulos = (
    <Fragment key="modulos">
      {/* O que cada módulo faz e quanto custa, logo abaixo das pílulas, em toda largura (desde o fechamento de 18/10): fora
          da mesa, vinha depois da conta e da carta, a ~2,5 telas da escolha (a avaliação A). O preço desce para baixo do
          nome quando os dois não cabem numa linha (com a letra a 200% a 320 px, passava da coluna). Na mesa, o mesmo de
          antes: a página adicional fecha a lista na linha de baixo da grade, e o fio de cima dela separa as duas. */}
      <div ref={escolhasDosModulos} className="min-w-0 max-lg:mb-12 lg:col-span-7 lg:row-start-3">
        {pilulasDosModulos}
        <dl className="mt-4 divide-y divide-border border-t border-border max-lg:border-b">
          {modulosDoMontador.map((m) => (
            <div key={m.id} className={`py-3 transition-colors duration-300 ${moduloIds.includes(m.id) ? "text-foreground" : "text-muted-foreground"}`}>
              <dt className="flex flex-wrap items-baseline justify-between gap-x-4 text-nota font-semibold">
                {m.nome}{" "}
                <span className="font-normal tabular-nums">
                  + {reais(m.criacao)} e {reais(m.mensal ?? 0)} por mês
                </span>
              </dt>
              <dd className="mt-0.5 max-w-[62ch] text-nota">{m.descricao}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Fragment>
  );
  const pe = (
    <Fragment key="pe">
      {/* A faixa presa ao pé da tela, só fora da mesa: a barra do polegar do site (.vd-polegar, app/digital.css), com a
          criação e a mensalidade no lugar do prazo, e a ação no lugar do WhatsApp (desde 18/10; até então, uma tarja de
          vidro branco de borda a borda, a barra de checkout de fábrica, fora do sistema). Ela some com a tela baixa
          (abaixo de 21 em de altura: deitado com a letra a 200%, cobria metade da tela) e, abaixo de 23,5 em de largura
          (360 px com a letra normal; a 200%, qualquer celular), fica só a criação. Fora do leitor de tela e do teclado:
          repete a conta, que vem logo depois das pílulas no HTML (até 18/10, o leitor ouvia os valores e o botão duas
          vezes). Fora de vista, inerte. Em cores forçadas, com o contorno do sistema (o fio de luz por dentro some). */}
      <div aria-hidden="true" inert={!faixa} data-tom="escuro" data-visivel={faixa || undefined} className="vd-polegar flex-wrap forced-colors:border forced-colors:border-[CanvasText]">
        <div className="flex min-w-0 gap-3">
          <p className="vd-polegar-prazo">
            <span className="vd-polegar-rotulo">Criação</span>{" "}
            <span className="vd-polegar-valor">{reais(criacao)}</span>
          </p>
          <p className="vd-polegar-prazo max-[23.5em]:hidden">
            <span className="vd-polegar-rotulo">Por mês</span>{" "}
            <span className="vd-polegar-valor">{reais(mensal)}</span>
          </p>
        </div>
        <button
          type="button"
          tabIndex={-1}
          onClick={preparar}
          className="vd-metal vd-polegar-acao cursor-pointer justify-center forced-colors:border forced-colors:border-[ButtonText] max-[30em]:grow"
        >
          Preparar mensagem
        </button>
      </div>
    </Fragment>
  );
  const contaDaEscolha = (
    <Conta
      key="conta"
      plano={plano}
      escolhidos={escolhidos}
      criacao={criacao}
      cheio={cheio}
      mensal={mensal}
      gravada={mensagem !== null}
      totais={caixaDosTotais}
      textos={textos}
      acao={acao}
      privacidade={privacidade}
    />
  );
  return (
    <div className="grid lg:grid-cols-12 lg:grid-rows-[repeat(4,auto)_1fr_auto] lg:gap-x-14">
      {mesa ? [escolhaDoPlano, detalhe, escolhaDosModulos, fimDaColuna, pe, contaDaEscolha] : [escolhaDoPlano, escolhaDosModulos, pe, contaDaEscolha, detalhe, fimDaColuna]}
    </div>
  );
}

type Desenho = typeof import("@/components/ilhas/desenho-da-conta");
/** O motor da conta, depois de montar: o desenho (o pedaço à parte), a letra do leitor e o estado da passagem. */
type Motor = { desenho: Desenho; k: number; assentado: boolean };

/** "17/10": um dia, no calendário de Niterói (as datas de lib/prazo.ts são UTC ao meio-dia). */
const diaEMes = (d: Date) => `${d.getUTCDate()}/${d.getUTCMonth() + 1}`;
/**
 * A luz da tela da conta (app/vidro.css, "a tela lisa"): o sol do meio-dia, de cima, no canto de cima, à direita, e a
 * rampa que desce para o navy mais fundo no canto de cima, à esquerda, onde fica o total (até 18/10, em meio-tom: a
 * média dos pontos dependia do fundo, 2.1, e sob o pico caía a 5,9:1); até 18/10, a rampa de cima para baixo.
 */
const luzDaConta = { "--luz-x": "100%", "--luz-y": "-10%", "--angulo": "315deg" } as React.CSSProperties;
const parado = () => document.documentElement.classList.contains("ambiente-pausado") || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * A conta de /orcamento, em dois instrumentos (desde 17/10, a direção final do Atlas Digital, seção 3, item 16; os dois
 * desde 18/10, a revisão da peça): a tela pequena no papel, com o raio --r-instrumento, lisa (app/vidro.css, "a tela
 * lisa").
 * - À direita das escolhas, presa ao alto da janela enquanto elas rolam (na mesa), a conta: o total da criação, o
 *   número que vende, chapado com a troca em Bayer (o Chapado; até 18/10, em meio-tom, com 32 px de maiúscula numa
 *   pauta de 2,8 px), com o cheio riscado no carimbo; a mensalidade chapada, num corpo menor, que troca de uma vez; a composição da criação (o plano, na metade da fundação, em traço, o publicado, e cada
 *   módulo em pontos, a escolha de agora, um ponto por R$ 10, na escala do maior orçamento possível); e a ação.
 * - Embaixo, na largura toda, como a folha das 72 h de /o-trabalho, a carta dos pagamentos: 13 meses reais a partir de
 *   hoje, a parcela no briefing (hoje), a outra na janela da publicação (os dias úteis 7 a 15, com os feriados) e a
 *   mensalidade desde o mês seguinte, em ponto. Até 18/10, na coluna da conta, a 7,5 px por dia: lia como textura (a
 *   revisão), e a página ficava com 13% de tela (o critério da metade, seção 5, pede de 40 a 60).
 * O momento: "Preparar mensagem" grava a conta (os pontos se fecham em traço, 16 × 50 ms; até 18/10, o total em
 * meio-tom assentava chapado); mudar uma escolha a devolve ao cálculo, em pontos. A fusão: a conta é cálculo até virar compromisso. A janela da
 * publicação e o mês incerto não se gravam: são o provável (a gramática, 1.1).
 * Até 17/10, a composição era uma barra com a hachura do desconto (a mesma hachura que, em O trabalho, é a janela
 * incerta: dois sentidos para um desenho), os totais numa chapa afundada e o pagamento num trajeto de três marcos, que
 * repetiam o mesmo valor em sequência (o fechamento com o Impeccable, A e B).
 * Os desenhos são canvas aria-hidden: os valores e as datas estão no HTML (os totais, a legenda da carta), e o servidor
 * escreve frases completas e estáveis, que a ilha troca pelas datas de agora depois de montar. O desenho chega por
 * import() depois de montar (fora do script inicial). O
 * relógio de um minuto (a virada do dia) e a passagem passam por aoVivo (lib/ambiente.ts); pausado ou com movimento
 * reduzido, a conta troca e grava de uma vez.
 */
function Conta({
  plano,
  escolhidos,
  criacao,
  cheio,
  mensal,
  gravada,
  totais,
  textos,
  acao,
  privacidade,
}: {
  plano: (typeof planos)[number];
  escolhidos: typeof modulosDoMontador;
  criacao: number;
  cheio: number;
  mensal: number;
  gravada: boolean;
  totais: React.RefObject<HTMLDListElement | null>;
  textos: TextosDaTabelaCompleta;
  acao: React.ReactNode;
  privacidade: string;
}) {
  const caixa = useRef<HTMLElement>(null);
  const medida = useRef<HTMLDivElement>(null);
  const folha = useRef<HTMLElement>(null);
  const composicao = useRef<HTMLCanvasElement>(null);
  const pagamentos = useRef<HTMLCanvasElement>(null);
  const motor = useRef<Motor | null>(null);
  const [pronto, setPronto] = useState(false);
  const [semDesenho, setSemDesenho] = useState(false);
  const [conta, setConta] = useState<ContaDosPagamentos | null>(null);
  const [larguras, setLarguras] = useState({ composicao: 0, carta: 0 });
  // A carta de pé (o celular em pé, desenho-da-conta.ts): a legenda diz onde fica a mensalidade.
  const [dePe, setDePe] = useState(false);

  const partes = partesDa(plano, escolhidos);
  const chaveDasPartes = partes.map((p) => p.rotulo.join("/")).join();
  const parcela = reais(criacao / 2);

  useEffect(() => {
    const el = caixa.current!;
    let ativo = true;
    let pararRelogio = () => {};
    Promise.all([import("@/components/ilhas/desenho-da-conta"), document.fonts.ready])
      .then(([desenho]) => {
        if (!ativo) return;
        const k = parseFloat(getComputedStyle(document.documentElement).fontSize) / 16 || 1;
        motor.current = { desenho, k, assentado: false };
        // A virada do dia muda as datas: o relógio de um minuto refaz a conta só quando o dia de hoje muda.
        const hoje = () => setConta((atual) => {
          const nova = desenho.contaDosPagamentos(desenho.relogio());
          return atual && +atual.hoje === +nova.hoje ? atual : nova;
        });
        hoje();
        pararRelogio = aoVivo(el, hoje, 60_000);
        setPronto(true);
      })
      .catch(() => {
        // Sem o desenho (a rede caiu no meio), fica a conta em texto.
        if (ativo) setSemDesenho(true);
      });
    const observador = new ResizeObserver(() =>
      setLarguras({ composicao: Math.floor(medida.current!.clientWidth), carta: Math.floor(pagamentos.current!.parentElement!.clientWidth) }),
    );
    observador.observe(medida.current!);
    observador.observe(folha.current!);
    return () => {
      ativo = false;
      pararRelogio();
      observador.disconnect();
    };
  }, []);

  useEffect(() => {
    const m = motor.current;
    if (!pronto || !m || !conta || !larguras.composicao || !larguras.carta) return;
    const estilo = getComputedStyle(caixa.current!);
    const apagado = estilo.getPropertyValue("--muted-foreground").trim();
    const tinta = estilo.getPropertyValue("--foreground").trim();
    const desenhar = (fechar: number) => {
      m.desenho.desenharComposicao(composicao.current!, { largura: larguras.composicao, partes, variantes: VARIANTES, maximo: MAXIMO, fechar, tinta, apagado, k: m.k, reserva: RESERVA });
      setDePe(m.desenho.desenharPagamentos(pagamentos.current!, { largura: larguras.carta, conta, fechar, k: m.k, apagado }).dePe);
    };
    if (!gravada) {
      m.assentado = false;
      desenhar(0);
      return;
    }
    // Já gravada (a janela mudou de largura, o dia virou) ou sem movimento: o estado final, de uma vez.
    if (m.assentado || parado()) {
      m.assentado = true;
      desenhar(1);
      return;
    }
    m.assentado = true;
    let comeco = 0;
    let degrau = -1;
    const pararPassagem = aoVivo(caixa.current!, (t) => {
      comeco ||= t;
      const a = m.desenho.abertura(t, comeco, 50);
      if (Math.round(a * 16) === degrau) return;
      degrau = Math.round(a * 16);
      desenhar(a);
      // Desliga depois do quadro (o aoVivo pede o seguinte logo após chamar este).
      if (a >= 1) queueMicrotask(pararPassagem);
    });
    return pararPassagem;
    // As partes entram pela chave (os valores e os estados), e não pelo array, que é novo a cada render.
  }, [pronto, conta, larguras, chaveDasPartes, gravada]);

  return (
    <>
      {/* Na mesa, a coluna da conta acompanha as escolhas (sticky, presa abaixo do cabeçalho): o total fica à vista
          enquanto se lê o que o plano inclui e se escolhem os módulos, e a metade direita não fica vazia ao lado deles.
          A partir de 70 rem (1.120 px com a letra do navegador; a 200%, nunca), ela sobe ao lado do título, do alto da
          segunda linha ("valor exato.") para baixo: a metade direita da abertura era papel vazio (o fechamento com o
          Impeccable, A), e o valor exato fica ao lado da promessa. A subida é a altura da abertura (components/paginas/
          abertura-de-pagina.tsx) menos a primeira linha do título: uma linha do h1 (1,15 × text-display), o respiro até
          o lide (2 rem), as duas linhas do lide (2 × 1,45 × text-destaque) e o respiro até a figura (5 rem), menos 1 rem
          de folga, para a vírgula de "toques," não encostar no canto.
          shortcut: conta com o título e o lide de /orcamento em duas linhas cada a partir de 1.120 px (medido de 1.120 a
          1.920); se o texto da abertura mudar, refazer a conta ou passar a subida à AberturaDePagina.
          O sticky vai num filho da célula, e não na própria: o item da grade gruda no contêiner inteiro, e a conta descia
          por cima da carta dos pagamentos; a célula estica até o fim da linha das escolhas e é o limite dele. */}
      <div className="min-w-0 lg:col-span-5 lg:col-start-8 lg:row-span-5 lg:row-start-1 min-[70rem]:-mt-[calc(1.15*var(--text-display)_+_2.9*var(--text-destaque)_+_6rem)]">
        <div className="lg:sticky lg:top-24">
        <section
          ref={caixa}
          aria-label="A conta"
          data-tom="escuro"
          data-pronto={pronto || undefined}
          data-sem-desenho={semDesenho || undefined}
          style={luzDaConta}
          className="vd-instrumento vd-conta @container/conta -mx-4 px-4 py-7 md:-mx-7 md:px-7 lg:mx-0 lg:px-8"
        >
          {/* Fora da mesa (desde 18/10, o passe do celular), a conta na mesma medida da carta dos pagamentos, logo abaixo:
              o instrumento a 8 px da borda (12 a partir de 768) e o texto na coluna da página. Até então, recuada na
              coluna, 16 px mais estreita de cada lado que a carta: dois instrumentos seguidos em duas medidas. */}
          {/* Na conta larga (a partir de 36 rem: o tablet e o celular deitado, onde ela ocupa a largura toda), os dois totais
              lado a lado (18/10); até então, um sob o outro, com a metade direita da tela vazia. Na mesa, a coluna da
              conta é mais estreita, e eles seguem um sob o outro. */}
          <dl ref={totais} className="grid gap-x-10 gap-y-5 @min-[36rem]:grid-cols-2">
            <div className="vd-leitura">
              <dt className="rotulo">Criação</dt>
              <dd className="valor vd-conta-valor">
                <span className="sr-only">{reais(criacao)}, na condição de fundação, nos três primeiros contratos.</span>
                <span aria-hidden="true" className="whitespace-nowrap">
                  <span className="unidade before:content-['R$']" />
                  <Chapado texto={reais(criacao).slice(3)} />
                </span>
              </dd>
              {/* O sentido não depende do risco (sem CSS, no robô e no modo de leitura, "R$ 1.500 na condição de
                  fundação" dizia o contrário: a revisão, 18/10). Desde o fechamento de 18/10, "Valor cheio" na frente:
                  "Sem a condição de fundação, R$ 1.500" se lia como "não custa R$ 1.500" (a avaliação A). */}
              {/* Sob a frase, escondida, a do maior valor cheio (os algarismos tabulares: a mesma largura em qualquer valor de
                  quatro), que dá a altura: até a revisão de 18/10, "R$ 900" do Essencial quebrava em menos linhas, e
                  ao trocar de escolha "Preparar mensagem" e a carta desciam (20 px a 768; 41 com a letra a 200%). No
                  conteúdo gerado, fora do texto do robô. */}
              <dd className="carimbo grid">
                <span aria-hidden="true" data-reserva={`Valor cheio, sem a condição de fundação: ${reais(CHEIO_MAXIMO).replace(" ", "\u00a0")}.`} className="invisible [grid-area:1/1] before:content-[attr(data-reserva)]" />
                <span className="[grid-area:1/1]">
                  Valor cheio, sem a condição de fundação: <s className="vd-riscado">{reais(cheio)}</s>.
                </span>
              </dd>
            </div>
            <div className="vd-leitura">
              <dt className="rotulo">Por mês</dt>
              <dd className="valor vd-conta-mensal">
                <Valor valor={mensal} unidade acender={false} />
              </dd>
              {/* A frase do servidor fica no lugar, escondida, sob a de agora: com a letra a 150% num celular, ela quebra em
                  duas linhas, e "desde nov." cabe numa (a conta subia 28 px na carga; desde a revisão final de 18/10). */}
              <dd className="carimbo grid">
                <span className={`[grid-area:1/1] ${conta ? "invisible" : ""}`}>desde o mês seguinte à publicação</span>
                {conta && <span className="[grid-area:1/1]">desde {conta.comeco}</span>}
              </dd>
            </div>
          </dl>

          <div ref={medida} className="vd-leitura mt-7 border-t border-border pt-6">
            <p className="rotulo">Composição da criação</p>
            {/* A altura do desenho, reservada antes dele (RESERVA): nada pula quando ele chega. */}
            <canvas ref={composicao} aria-hidden="true" className="vd-conta-desenho vd-conta-composicao mt-4" style={{ width: "100%", height: RESERVA }} />
            {/* A conta item a item, nas palavras dos rótulos do desenho: para o leitor de tela (o desenho é aria-hidden) e,
                sem o desenho (sem script, ou o import() que falhou), à vista. Até o fechamento de 18/10, à vista só com
                módulos, e o desenho sem nome nenhum. */}
            <dl className={`mt-3 divide-y divide-border text-nota ${semDesenho ? "" : "sr-only [html:not(.js)_&]:not-sr-only"}`}>
              {partes.map((parte, i) => (
                <div key={parte.rotulo[0]} className="flex items-center justify-between gap-4 py-2">
                  <dt className="flex items-center gap-2.5 text-muted-foreground">
                    <span
                      aria-hidden="true"
                      className={`vd-conta-simbolo ${parte.estado === "fora" ? "opacity-50" : ""}`}
                      data-estado={parte.estado === "publicado" || (parte.estado === "escolhido" && gravada) ? "traco" : "ponto"}
                    />
                    {`${i ? "" : "Plano "}${parte.rotulo[0]}, ${parte.rotulo[2]}`}
                  </dt>
                  <dd className={`whitespace-nowrap tabular-nums ${parte.estado === "fora" ? "text-muted-foreground" : "font-semibold"}`}>{parte.rotulo[1]}</dd>
                </div>
              ))}
            </dl>
            <p className="vd-legenda-de-carta mt-3">Um ponto, R$ 10. Em traço, o plano com o desconto de fundação, o preço publicado; em ponto, os módulos escolhidos; apagado, os outros.</p>
          </div>

          <div className="mt-7 border-t border-border pt-6">{acao}</div>
        </section>
        {/* No papel, sob a conta: o texto corrido não vai à tela (a regra da janela; até 18/10, dentro do instrumento). */}
        <p className="mt-4 max-w-[60ch] text-nota text-muted-foreground">{privacidade}</p>
        </div>
      </div>

      {/* min-w-0 (desde 18/10): o canvas tem a largura que a ilha mede, e o item da grade crescia até ela; com a letra a
          200% a 320 px, a grade ficou presa 3 px mais larga que a página, e as pílulas passavam da coluna. */}
      <figure
        ref={folha}
        data-tom="escuro"
        data-sem-desenho={semDesenho || undefined}
        className="vd-instrumento vd-pagamentos vd-leitura -mx-4 mt-12 min-w-0 px-4 py-8 md:-mx-7 md:px-7 lg:col-span-12 lg:row-start-6"
      >
        <p className="rotulo">Os pagamentos, se o briefing fechar hoje</p>
        {/* @container: a reserva da carta de pé antes do desenho, pela largura e pela letra (app/digital.css). */}
        <div className="@container mt-5">
          <canvas ref={pagamentos} aria-hidden="true" className="vd-conta-desenho vd-conta-carta" />
        </div>
        {/* O vão entre a chave e a frase encolhe com a tela (3,2 vw, até 12 px): com a letra a 200% a 320 px, a chave, o vão
            e "mensalidade:" passavam 3 px da coluna. */}
        {/* A chave como o desenho (desde 18/10): na carta de pé, a mensalidade gravada são barras de pé, e a chave dela
            também (o rotate-90; a fileira de pontos fica deitada, que de pé lia como o "⋮" de um menu); a hachura tem a
            sua amostra. O valor não se parte do "R$" (com a letra a 200%, "No briefing, R$" ficava numa linha e "375:" na
            outra). */}
        <figcaption className="vd-legenda-de-carta mt-6 grid max-w-none gap-x-10 gap-y-3 md:grid-cols-3">
          <p className="flex gap-[min(0.75rem,3.2vw)]">
            <span aria-hidden="true" className="vd-conta-simbolo mt-1.5" data-estado="hoje" />
            <span>
              <strong>
                {textos.noBriefing}, <span className="whitespace-nowrap">{parcela}:</span>
              </strong>{" "}
              {conta ? `hoje, ${diaEMes(conta.hoje)}.` : "no dia em que ele fechar."}
            </span>
          </p>
          <p className="flex gap-[min(0.75rem,3.2vw)]">
            <span aria-hidden="true" className="vd-conta-simbolo mt-2" data-estado="ponto" />
            <span>
              <strong>
                {textos.naPublicacao}, <span className="whitespace-nowrap">{parcela}:</span>
              </strong>{" "}
              {conta ? `num dia útil de ${diaEMes(conta.ini)} a ${diaEMes(conta.fim)}.` : "num dos dias úteis 7 a 15 depois dele."}
            </span>
          </p>
          <p className="flex gap-[min(0.75rem,3.2vw)]">
            <span aria-hidden="true" className={`vd-conta-simbolo mt-2 ${dePe && gravada ? "rotate-90" : ""}`} data-estado={gravada ? "traco" : "ponto"} />
            <span>
              <strong>A mensalidade:</strong>{` ${dePe ? "as cinco casas ao pé de cada mês" : "a coluna da direita"}, desde o mês seguinte à publicação.`}
              {conta?.incerto && ` ${conta.incerto[0][0].toUpperCase()}${conta.incerto[0].slice(1)} em parte: só se a publicação sair ainda em ${conta.incerto[1]}.`}
            </span>
          </p>
          <p className="flex gap-[min(0.75rem,3.2vw)] md:col-span-3">
            <svg aria-hidden="true" viewBox="0 0 20 14" className="mt-1 h-3.5 w-5 flex-none text-muted-foreground">
              <path d="M0 6 6 0M0 11 11 0M1 14 15 0M6 14 20 0M11 14 20 5M16 14 20 10" stroke="currentColor" strokeOpacity="0.6" />
            </svg>
            <span>
              Um dia por casa, por treze meses; em hachura, o sábado, o domingo e o feriado nacional, fora da conta dos dias
              úteis. Em ponto, o que a conta calcula neste aparelho; em traço, o que &ldquo;Preparar mensagem&rdquo; grava.
            </span>
          </p>
        </figcaption>
      </figure>
    </>
  );
}

/**
 * Na tabela completa, sob as pílulas: o que o plano escolhido inclui e o
 * site feito nele, sob um filete. Até 16/10, numa caixa creme, com o preço
 * em cima: o mesmo valor aparecia três vezes no painel (aqui, na conta e
 * nos totais) e a caixa era um cartão dentro do cartão (o crítico de fora).
 */
function DetalheDoPlano({
  plano,
  textos,
  site,
}: {
  plano: (typeof planos)[number];
  textos: TextosDaTabelaCompleta;
  site?: { nome: string; caminho: string };
}) {
  return (
    <div className="mt-5 border-t border-border pt-4">
      <p className={CAPITULAR}>{textos.inclui}</p>
      <ul className="mt-2 space-y-2">
        {plano.itens.map((item) => (
          <li key={item} className="flex gap-2.5 text-nota">
            {/* mt-1: o visto de 14 px no meio da primeira linha (21 px), como no simulador. */}
            <IconeVisto className="mt-1 size-3.5 flex-none text-accent" />
            {item}
          </li>
        ))}
      </ul>
      {site && (
        <>
          {/* Vínculo comum, não <Link>: o site de exemplo é outro site, e a pré-busca traria as fontes dele.
              O vínculo com seta (.vd-vinculo), na cor do texto: no hover, o sublinhado e a seta que avança. */}
          <a href={site.caminho} target="_blank" rel="noopener" className="vd-vinculo mt-4 min-h-11 flex-wrap gap-1.5 text-nota text-foreground">
            <span className="text-muted-foreground">{textos.siteDoPlano}:</span>{" "}
            <span className="font-semibold">{site.nome}</span>
            <span className="sr-only"> {simulador.abreEmNovaAba}</span>
            <IconeSeta className="size-3.5 text-accent" />
          </a>
          <p className="mt-1 text-rotulo text-muted-foreground">{textos.aviso}</p>
        </>
      )}
    </div>
  );
}
