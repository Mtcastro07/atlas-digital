import type { Metadata } from "next";
import Link from "next/link";

import { IconeWhatsApp } from "@/components/icones";
import { MarcaDoDeposito } from "@/components/nichos/marcas";
import { vinculoDoWhatsapp } from "@/conteudo/demos/comum";
import { depositoSite as site } from "@/conteudo/demos/deposito";
import { metadadosDoExemplo } from "@/lib/metadados";

// Peças do Depósito Engenhoca, usadas pelas seis páginas (app/demos/deposito/).

export const envelope = "mx-auto w-full max-w-[1320px] px-5 md:px-10";
export const vinculoWhatsApp = vinculoDoWhatsapp(site.mensagem);
export const atraso = (ms: number) => ({ "--atraso": `${ms}ms` }) as React.CSSProperties;

export type IdDaPagina = (typeof site.paginas)[number]["id"];
export const paginaDe = (id: IdDaPagina) => site.paginas.find((p) => p.id === id)!;
/** As cinco páginas das abas (o início é a marca). */
export const abas = site.paginas.filter((p) => p.id !== "inicio");

/** Título, descrição, endereço canônico e cartão de compartilhamento de cada página. */
export function metadadosDe(id: IdDaPagina): Metadata {
  const pagina = paginaDe(id);
  return metadadosDoExemplo({
    nome: site.nome,
    titulo: id === "inicio" ? `${site.nome} · demonstração` : `${pagina.titulo} · ${site.nome} · demonstração`,
    descricao: `${pagina.descricao} Estabelecimento fictício.`,
    caminho: pagina.caminho,
    nicho: "deposito",
  });
}

/** O título de placa, em linhas. */
export function Linhas({ linhas }: { linhas: string[] }) {
  return linhas.map((linha) => (
    <span key={linha} className="block">
      {linha}
    </span>
  ));
}

type BotaoProps = { href: string; children: React.ReactNode; grande?: boolean; externo?: boolean; principal?: boolean };

/**
 * O botão de etiqueta: canto chanfrado, Oswald em caixa-alta, numa linha só (whitespace-nowrap, 14.10.2026: a régua
 * acusava o rótulo em duas linhas a 768 e 1024 px), no laranja de ação, com o véu que sobe (.dp-botao). A variante de
 * contorno saiu em 15.10.2026 com a única ação que a usava, o WhatsApp repetido da capa (crítico de fora: três
 * chamadas do WhatsApp na primeira tela; a barra do cabeçalho já tem a ação em toda largura).
 *
 * A ação principal (`principal`, só "Calcular o material", na capa; 16.10.2026, crítico de fora: era a resposta mais
 * fraca do site, 14 de diferença média de cor, contra 185 da placa do painel): "o refletivo acende", a faixa de luz
 * que cruza uma vez a etiqueta, como o farol na faixa refletiva, e o véu de luz que fica (.dp-botao-principal).
 */
export function Botao({ href, children, grande = false, externo = false, principal = false }: BotaoProps) {
  const classes = `dp-chanfro dp-botao dp-exibicao inline-flex items-center justify-center gap-3 bg-primary tracking-[0.05em] whitespace-nowrap text-primary-foreground ${
    grande ? "min-h-14 px-8 text-[18px]" : "min-h-12 px-6 text-[15.5px]"
  }${principal ? " dp-botao-principal" : ""}`;
  if (externo)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/**
 * Onde a barra do cabeçalho não tem o botão inteiro do WhatsApp (abaixo de 640 px e de 1024 a 1279, só o ícone), o
 * botão da página aparece; nas outras larguras, some, porque o da barra, preso no topo, está sempre na mesma tela
 * (16.10.2026, crítico de fora: dois "Pedir pelo WhatsApp" laranja idênticos na mesma tela, em A casa e em Entrega).
 */
export const ondeABarraSoTemOIcone = "sm:hidden lg:block xl:hidden";

/** A ação do WhatsApp, no botão de etiqueta. */
export function BotaoWhatsApp({ grande = false }: { grande?: boolean }) {
  return (
    <Botao href={vinculoWhatsApp} externo grande={grande}>
      <IconeWhatsApp className={grande ? "size-5" : "size-4"} />
      {site.acao}
    </Botao>
  );
}

/**
 * Código de barras gerado do próprio texto: cada caractere vira oito
 * barras, larga para 1 e fina para 0, entre as guardas. Decorativo — o
 * código está escrito embaixo.
 */
export function CodigoDeBarras({ texto, className = "" }: { texto: string; className?: string }) {
  const bits = [...texto].flatMap((c) => c.charCodeAt(0).toString(2).padStart(8, "0").split("").map(Number));
  const barras: { x: number; w: number }[] = [];
  let x = 0;
  const guarda = () => {
    barras.push({ x, w: 1 }, { x: x + 2, w: 1 });
    x += 4;
  };
  guarda();
  bits.forEach((bit, i) => {
    const w = bit ? 2.2 : 1;
    barras.push({ x, w });
    x += w + (i % 3 === 2 ? 2 : 1.2);
  });
  guarda();
  return (
    <span className={`block ${className}`}>
      <svg viewBox={`0 0 ${x} 30`} preserveAspectRatio="none" aria-hidden="true" className="block h-9 w-full">
        {barras.map((b) => (
          <rect key={b.x} x={b.x} y="0" width={b.w} height="30" fill="currentColor" />
        ))}
      </svg>
      <span className="dp-codigo mt-1 block text-center text-[11px]">{texto}</span>
    </span>
  );
}

/**
 * A abertura das páginas internas: o rótulo da prancha (até 16.10, o
 * código da aba, "02 / 05"), o título de placa e o lide, no papel
 * quadriculado. O título fica
 * parado desde o primeiro quadro (14.10.2026: até ali, subia 10 px da
 * opacidade 0 em toda página, por cima da transição; era a mesma entrada
 * em todas, e o título é o LCP). É o cabeçalho de prancha do sistema; o
 * momento de cada página está no dispositivo dela, logo abaixo, na primeira
 * tela (15.10.2026, crítico de fora: a mesma abertura em cinco páginas, três
 * delas paradas): o trilho das etiquetas, o cupom impresso, o raio do mapa,
 * o número carimbado no talão. Com uma figura (A casa, desde 15.10), a
 * composição muda: o título e o lide numa coluna, a figura do lado, na
 * mesma cena.
 *
 * 16.10.2026 (crítico de fora): quatro páginas ainda abriam com esta mesma
 * abertura, e no celular as quatro primeiras telas eram a mesma imagem com
 * outras palavras. Ela fica só na Calculadora (e, com a figura, em A casa);
 * Materiais abre correndo para o trilho, Entrega abre pelo mapa, com o
 * carimbo da prancha ao lado, e Orçamento abre no próprio talão, com o
 * título impresso nele. A etiqueta "0X / 05" saiu de todas: repetia o
 * índice da aba, que a barra já marca com o traço laranja (11-anti-ia,
 * L5 e T2; a recomendação do kit, seção 7.3, item 2). Fica o rótulo da
 * prancha: o código da casa e o nome da página (RotuloDaPagina).
 */
export function RotuloDaPagina({ pagina }: { pagina: IdDaPagina }) {
  return (
    <p className="dp-codigo text-muted-foreground">
      {site.codigo} · {paginaDe(pagina).rotulo}
    </p>
  );
}

export function Abertura({
  pagina,
  titulo,
  lide,
  figura,
  children,
}: {
  pagina: IdDaPagina;
  titulo: string[];
  lide: string;
  figura?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const rotulo = <RotuloDaPagina pagina={pagina} />;
  if (figura)
    return (
      <section aria-labelledby="titulo" className="dp-quadriculado border-b border-border">
        <div className={`${envelope} grid items-end gap-12 pt-16 pb-16 lg:grid-cols-12 lg:gap-14 lg:pt-20 lg:pb-20`}>
          <div className="lg:col-span-6">
            {rotulo}
            <h1 id="titulo" className="dp-exibicao mt-8 text-[clamp(52px,6vw,96px)] dp-titulo">
              <Linhas linhas={titulo} />
            </h1>
            <p className="mt-8 max-w-[42ch] text-[18px] leading-relaxed text-muted-foreground">{lide}</p>
            {children}
          </div>
          <div className="lg:col-span-6">{figura}</div>
        </div>
      </section>
    );
  return (
    <section aria-labelledby="titulo" className="dp-quadriculado border-b border-border">
      <div className={`${envelope} grid gap-10 pt-16 pb-16 lg:grid-cols-12 lg:pt-20 lg:pb-16`}>
        <div className="lg:col-span-8">
          {rotulo}
          <h1 id="titulo" className="dp-exibicao mt-8 text-[clamp(52px,7vw,112px)] dp-titulo">
            <Linhas linhas={titulo} />
          </h1>
        </div>
        <div className="flex flex-col justify-end gap-6 lg:col-span-4">
          <p className="max-w-[42ch] text-[18px] leading-relaxed text-muted-foreground">{lide}</p>
          {children}
        </div>
      </div>
    </section>
  );
}

const exibicaoSvg = "var(--font-exibicao), sans-serif";
const monoSvg = "var(--font-mono), monospace";

/**
 * A elevação da parede, como numa prancha de projeto (15.10.2026; a cena 3
 * da página inicial): a parede da conta, em centímetros (1 unidade = 1 cm),
 * com os blocos de 39 × 19 cm em amarração (a junta de 1 cm), as cotas da
 * largura e da altura, o chão hachurado e, ao lado, as pilhas de sacos da
 * mesma lista. Um bloco em laranja, a peça. Decorativa: a lista está
 * escrita na nota da prancha. Cada fiada é um grupo (.dp-fiada, com a ordem
 * em --fiada): o momento da cena as assenta de baixo para cima (deposito.css).
 */
export function ElevacaoDaParede({
  largura,
  altura,
  itens,
  className = "",
}: {
  largura: number;
  altura: number;
  itens: { quantidade: number; unidade: string }[];
  className?: string;
}) {
  const W = Math.round(largura * 100);
  const H = Math.round(altura * 100);
  const metros = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  const [blocos, ...sacos] = itens;
  const fiadas = Array.from({ length: Math.ceil(H / 20) }, (_, r) => {
    const recuo = r % 2 ? -20 : 0;
    return Array.from({ length: Math.ceil((W - recuo) / 40) }, (_, c) => recuo + c * 40);
  });
  // As pilhas: um saco por unidade da lista (até 8 por pilha), o de 50 kg maior que o de 20.
  const pilhas = sacos.map((saco, i) => ({ n: Math.min(Math.ceil(saco.quantidade), 8), x: W + 40 + i * 96, w: 64 + i * 10, h: 15 + i * 5 }));
  const hachura = Array.from({ length: Math.ceil((W + 300) / 14) }, (_, i) => `M${-72 + i * 14} ${H}l-10 10`).join("");
  return (
    <svg viewBox={`-80 -40 ${W + 310} ${H + 130}`} aria-hidden="true" className={`block h-auto w-full ${className}`}>
      <defs>
        <clipPath id="dp-parede-recorte">
          <rect width={W} height={H} />
        </clipPath>
      </defs>
      <g clipPath="url(#dp-parede-recorte)" stroke="var(--foreground)" strokeOpacity="0.6" strokeWidth="1" vectorEffect="non-scaling-stroke">
        {fiadas.map((xs, r) => (
          <g key={r} className="dp-fiada" style={{ "--fiada": r } as React.CSSProperties}>
            {xs.map((x, c) => (
              <rect
                key={x}
                x={x + 0.5}
                y={H - (r + 1) * 20 + 0.5}
                width="39"
                height="19"
                fill={r === 2 && c === 2 ? "var(--primary)" : "rgb(168 85 58 / 0.14)"}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
        ))}
      </g>
      <rect width={W} height={H} fill="none" stroke="var(--foreground)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      {/* A etiqueta da parede: quantos blocos ela pede. */}
      <g transform={`translate(${W / 2} ${H / 2})`}>
        <rect x="-118" y="-32" width="236" height="64" fill="var(--card)" stroke="var(--foreground)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <text y="15" textAnchor="middle" fill="var(--foreground)" fontFamily={exibicaoSvg} fontWeight="600" fontSize="42" letterSpacing="1">
          {`${blocos.quantidade} ${blocos.unidade.toUpperCase()}`}
        </text>
      </g>
      {/* As pilhas de sacos, no chão, ao lado da parede. */}
      {pilhas.map((p, i) => (
        <g key={i}>
          {Array.from({ length: p.n }, (_, k) => (
            <rect
              key={k}
              x={p.x + (k % 2) * 5}
              y={H - (k + 1) * p.h}
              width={p.w}
              height={p.h}
              rx="5"
              fill={i ? "#c9c4b9" : "#e3ddcf"}
              stroke="var(--foreground)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <text x={p.x + p.w / 2 + 2} y={H - p.n * p.h - 12} textAnchor="middle" fill="var(--foreground)" fontFamily={exibicaoSvg} fontWeight="600" fontSize="30">
            {`×${sacos[i].quantidade}`}
          </text>
        </g>
      ))}
      {/* O chão, hachurado. */}
      <g stroke="var(--foreground)" vectorEffect="non-scaling-stroke">
        <path d={`M-80 ${H}H${W + 230}`} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        <path d={hachura} strokeWidth="1" strokeOpacity="0.5" vectorEffect="non-scaling-stroke" />
      </g>
      {/* As cotas: a largura embaixo, a altura à esquerda. */}
      <g stroke="var(--foreground)" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none">
        <path d={`M0 ${H + 16}V${H + 54}M${W} ${H + 16}V${H + 54}M0 ${H + 44}H${W}M-6 ${H + 50}l12 -12M${W - 6} ${H + 50}l12 -12`} vectorEffect="non-scaling-stroke" />
        <path d={`M-10 0H-54M-44 0V${H}M-50 6l12 -12M-50 ${H + 6}l12 -12`} vectorEffect="non-scaling-stroke" />
      </g>
      <g fill="var(--foreground)" fontFamily={monoSvg} fontSize="24" letterSpacing="1">
        <text x={W / 2} y={H + 80} textAnchor="middle">
          {metros(largura)}
        </text>
        <text transform={`translate(-56 ${H / 2}) rotate(-90)`} textAnchor="middle">
          {metros(altura)}
        </text>
      </g>
    </svg>
  );
}

/**
 * A fachada da casa (15.10.2026; a abertura de A casa): a elevação do
 * depósito no papel de projeto, a platibanda laranja com a marca e o nome,
 * as duas portas de enrolar com o estoque no escuro (os sacos no palete, os
 * blocos empilhados) e o número na pilastra. Decorativa: o nome e o
 * endereço estão escritos na página. O momento da página: as portas sobem
 * (.dp-porta, deposito.css), uma vez por visita, na carga.
 */
export function FachadaDaCasa({ className = "" }: { className?: string }) {
  const vaos = [64, 340];
  const ondas = Array.from({ length: 25 }, (_, i) => `M0 ${8 + i * 9}H236`).join("");
  return (
    <svg viewBox="0 0 640 430" aria-hidden="true" className={`block h-auto w-full ${className}`}>
      <defs>
        {vaos.map((x, i) => (
          <clipPath key={x} id={`dp-vao-${i}`}>
            <rect x={x} y="176" width="236" height="234" />
          </clipPath>
        ))}
        <radialGradient id="dp-luz-do-galpao" cx="50%" cy="0%" r="90%">
          <stop offset="0" stopColor="var(--primary)" stopOpacity="0.3" />
          <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* A parede e a platibanda. */}
      <rect x="24" y="36" width="592" height="374" fill="#d6d1c6" stroke="var(--foreground)" strokeWidth="2" />
      <rect x="24" y="36" width="592" height="96" fill="var(--primary)" stroke="var(--foreground)" strokeWidth="2" />
      <MarcaDoDeposito x="52" y="58" width="52" height="52" />
      <text x="122" y="102" fill="var(--foreground)" fontFamily={exibicaoSvg} fontWeight="600" fontSize="48" letterSpacing="1">
        {site.nome.toUpperCase()}
      </text>
      {/* O número, na pilastra do meio. */}
      <rect x="302" y="210" width="36" height="20" fill="#f6f4ef" stroke="var(--foreground)" strokeWidth="1.5" />
      <text x="320" y="225" textAnchor="middle" fill="var(--foreground)" fontFamily={monoSvg} fontSize="12" letterSpacing="1">
        000
      </text>
      {vaos.map((x, i) => (
        <g key={x}>
          {/* O vão: o estoque no escuro, sob a luz do galpão. */}
          <rect x={x} y="176" width="236" height="234" fill="var(--foreground)" />
          <rect x={x} y="176" width="236" height="160" fill="url(#dp-luz-do-galpao)" />
          <rect x={x + 18} y="396" width="200" height="10" fill="#6b5a45" />
          {i === 0
            ? // Os sacos de cimento no palete, em amarração.
              [0, 1, 2, 3].map((linha) =>
                [0, 1, 2].map((col) => (
                  <rect key={`${linha}-${col}`} x={x + 24 + col * 64 + (linha % 2) * 8} y={372 - linha * 24} width="60" height="22" rx="6" fill={linha % 2 ? "#bdb7aa" : "#cfc9bc"} stroke="var(--foreground)" strokeOpacity="0.6" />
                )),
              )
            : // Os blocos cerâmicos empilhados.
              [0, 1, 2, 3, 4, 5].map((linha) =>
                [0, 1, 2, 3].map((col) => (
                  <rect key={`${linha}-${col}`} x={x + 30 + col * 44} y={374 - linha * 22} width="43" height="21" fill="#a8553a" stroke="#6d3422" />
                )),
              )}
          {/* A porta de enrolar, aberta: o aço ondulado recolhido sob a caixa, com a barra de baixo à vista. */}
          <g clipPath={`url(#dp-vao-${i})`}>
            <g className="dp-porta" style={{ "--porta": i } as React.CSSProperties}>
              <rect x={x} y="176" width="236" height="234" fill="#9aa1a8" />
              <path d={ondas} transform={`translate(${x} 176)`} stroke="#6f767d" strokeWidth="2" />
              <rect x={x} y="396" width="236" height="14" fill="#5d646b" />
              <rect x={x + 106} y="390" width="24" height="6" fill="#3a4048" />
            </g>
          </g>
          {/* A caixa do rolo. */}
          <rect x={x - 8} y="156" width="252" height="20" fill="#3a4048" stroke="var(--foreground)" strokeWidth="1.5" />
        </g>
      ))}
      {/* A calçada, hachurada. */}
      <path d="M0 410H640" stroke="var(--foreground)" strokeWidth="3" />
      <path d={Array.from({ length: 46 }, (_, i) => `M${8 + i * 14} 410l-10 10`).join("")} stroke="var(--foreground)" strokeOpacity="0.5" />
    </svg>
  );
}

/**
 * Mapa do bairro em papel de projeto (ESTEIRA, VI.3): o quadriculado, as
 * ruas em traço de grafite, os bairros vizinhos em código, o raio da
 * entrega do mesmo dia em laranja e o depósito ao centro, com a marca.
 * Decorativo: o raio está escrito no texto da página, e os bairros, junto
 * do frete, do mesmo conteúdo (`entrega.vizinhos`; até 16.10.2026, só
 * aqui, a 8 px no celular, e o comentário dizia "escritos ao lado"). O momento da
 * página (14.10.2026): o raio abre (.dp-raio, deposito.css), uma vez por
 * visita; as ruas, os bairros e o depósito ficam parados.
 *
 * 16.10.2026 (crítico de fora): as ruas passavam por cima dos rótulos
 * ("RAIC", o "N" de ENGENHOCA, o "MESMO" da legenda). Todo rótulo leva o
 * halo do papel (o contorno na cor da prancha, pintado sob a letra), como
 * no desenho técnico, em que a legenda interrompe o traço. Os quatro
 * bairros ficam na janela que o recorte (slice) mostra em toda largura, de
 * 320 a 1440 px: x de 339 a 941 e y de 44 a 596, medidos (até ali, nos
 * cantos, e a borda cortava um ou outro pela metade em 100 das 141
 * larguras medidas, de 8 em 8 px, FONSECA a 1440 incluído).
 */
export function MapaDaEntrega({ legenda, bairros }: { legenda: string; bairros: readonly string[] }) {
  // Os quatro bairros, na ordem do conteúdo, nos lugares medidos (acima, à esquerda e à direita; abaixo, idem).
  const lugares = [
    { x: 356, y: 132, ancora: "start" },
    { x: 924, y: 132, ancora: "end" },
    { x: 356, y: 580, ancora: "start" },
    { x: 924, y: 580, ancora: "end" },
  ] as const;
  return (
    <svg viewBox="0 0 1280 640" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="block h-full w-full">
      <defs>
        <pattern id="dp-grade" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="var(--foreground)" strokeOpacity="0.07" />
        </pattern>
      </defs>
      <rect width="1280" height="640" fill="var(--card)" />
      <rect width="1280" height="640" fill="url(#dp-grade)" />
      <g fill="none" stroke="var(--foreground)" strokeLinecap="round" strokeOpacity="0.75">
        <path d="M-20 180C220 130 420 220 640 180S1060 104 1300 150" strokeWidth="7" />
        <path d="M-20 450C200 420 380 490 620 450S1000 400 1300 432" strokeWidth="4" />
        <path d="M180-20C200 140 150 330 210 660" strokeWidth="4" />
        <path d="M470-20 452 660" strokeWidth="3" />
        <path d="M760-20C740 180 800 360 770 660" strokeWidth="4" />
        <path d="M1040-20 1090 660" strokeWidth="3" />
        <path d="M210 312 452 330M770 300 1060 282M60 560 200 532M452 540 760 560M1090 490 1280 470" strokeWidth="2" />
        <path d="M320 80 360 240M600 270 640 430M900 40 940 180M960 340 1000 480" strokeWidth="1.5" strokeDasharray="6 6" />
      </g>
      <g className="dp-mapa-bairro" fill="var(--foreground)" fontFamily="var(--font-mono), monospace" fontSize="15" letterSpacing="0.16em" stroke="var(--card)" strokeWidth="6" strokeLinejoin="round" paintOrder="stroke">
        {lugares.map((l, i) => (
          <text key={i} x={l.x} y={l.y} textAnchor={l.ancora}>
            {bairros[i]?.toUpperCase()}
          </text>
        ))}
      </g>
      {/* O raio do mesmo dia, com a cota: abre do centro (.dp-raio). */}
      <g className="dp-raio">
        <circle cx="640" cy="320" r="228" fill="var(--primary)" fillOpacity="0.1" stroke="var(--primary)" strokeWidth="2.5" strokeDasharray="10 10" />
        <path d="M640 320H868" stroke="var(--accent)" strokeWidth="1.5" />
        <path d="M868 312V328" stroke="var(--accent)" strokeWidth="1.5" />
        <text className="dp-mapa-raio" x="754" y="308" textAnchor="middle" fill="var(--accent)" fontFamily="var(--font-mono), monospace" fontSize="13" letterSpacing="0.12em" stroke="var(--card)" strokeWidth="6" strokeLinejoin="round" paintOrder="stroke">
          RAIO
        </text>
      </g>
      <text className="dp-mapa-legenda" x="640" y="72" textAnchor="middle" fill="var(--accent)" fontFamily="var(--font-mono), monospace" fontSize="15" letterSpacing="0.18em" stroke="var(--card)" strokeWidth="6" strokeLinejoin="round" paintOrder="stroke">
        {legenda.toUpperCase()}
      </text>
      <circle cx="640" cy="320" r="46" fill="var(--card)" stroke="var(--foreground)" strokeWidth="2" />
      <MarcaDoDeposito x="612" y="292" width="56" height="56" />
      <text className="dp-mapa-casa" x="640" y="400" textAnchor="middle" fill="var(--foreground)" fontFamily="var(--font-exibicao), sans-serif" fontWeight="600" fontSize="22" letterSpacing="0.2em" stroke="var(--card)" strokeWidth="6" strokeLinejoin="round" paintOrder="stroke">
        ENGENHOCA
      </text>
    </svg>
  );
}

/**
 * O numerador do talão (16.10.2026; o momento do Orçamento, no lugar do
 * número carimbado, que o crítico de fora quase não percebia: 20 px em
 * 180 ms, e parecido com o carimbo da nutrição e o do pet shop). Como o
 * numerador automático do balcão: cada algarismo é uma roda, numa janela
 * de 1 em, e as rodas giram até o número, uma vez por visita, na carga; a
 * das unidades gira mais (2, 3, 5 e 7 passos, da milhar à unidade). Só
 * transform (.dp-roda-fita, deposito.css); com movimento reduzido e sem
 * script (a animação é CSS), o número já está posto. As rodas ficam fora da
 * árvore de acessibilidade: o leitor de tela lê o número inteiro.
 */
export function Numerador({ numero, className = "" }: { numero: string; className?: string }) {
  const [, prefixo = "", algarismos = ""] = numero.match(/^(\D*)(\d*)$/) ?? [];
  const passos = [2, 3, 5, 7];
  return (
    <span className={className}>
      <span className="sr-only">{numero}</span>
      <span aria-hidden="true" className="flex items-end gap-[0.06em] leading-none">
        <span className="block h-[1em] pr-[0.18em]">{prefixo.trim()}</span>
        {[...algarismos].map((a, i, todos) => {
          // A roda da direita gira mais: passos alinhados pela unidade.
          const k = passos[passos.length - todos.length + i] ?? 1;
          const fita = Array.from({ length: k + 1 }, (_, j) => (Number(a) - k + j + 10) % 10);
          return (
            <span key={i} className="dp-roda" style={{ "--passos": k, "--roda": i } as React.CSSProperties}>
              <span className="dp-roda-fita">
                {fita.map((n, j) => (
                  <span key={j}>{n}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}

/**
 * O caminhão da casa (16.10.2026; a cena 4 do início, "Do metro quadrado
 * ao caminhão", que era só texto e o fio, crítico de fora): o caminhão de
 * entrega em elevação, em traço de prancha sobre o grafite, com a carga
 * no palete (os sacos em amarração, os blocos), a marca na porta e a faixa
 * refletiva do para-choque lateral no laranja e na cal. Parado: o momento
 * da cena continua sendo o fio. Decorativo.
 */
export function CaminhaoDaCasa({ className = "" }: { className?: string }) {
  const sacos = [0, 1].flatMap((linha) => [0, 1, 2].map((col) => ({ x: 38 + col * 44 + linha * 20, y: 62 - linha * 22 })));
  const blocos = [0, 1, 2].flatMap((linha) => [0, 1, 2].map((col) => ({ x: 182 + col * 34 + (linha % 2) * 8, y: 66 - linha * 18 })));
  const refletiva = Array.from({ length: 22 }, (_, i) => 30 + i * 12);
  const chao = Array.from({ length: 44 }, (_, i) => `M${4 + i * 10} 146l-8 8`).join("");
  return (
    <svg viewBox="0 0 420 160" aria-hidden="true" className={`block h-auto w-full ${className}`}>
      <g fill="none" stroke="var(--foreground)" strokeWidth="1.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
        {/* A carga, no palete. */}
        <g strokeOpacity="0.55">
          {sacos.map((s) => (
            <rect key={`${s.x}-${s.y}`} x={s.x} y={s.y} width="40" height="20" rx="6" vectorEffect="non-scaling-stroke" />
          ))}
          {blocos.map((b) => (
            <rect key={`${b.x}-${b.y}`} x={b.x} y={b.y} width="32" height="16" vectorEffect="non-scaling-stroke" />
          ))}
        </g>
        {/* A carroceria, com as tábuas, e o chassi. */}
        <rect x="24" y="84" width="270" height="28" strokeOpacity="0.85" vectorEffect="non-scaling-stroke" />
        <path d={Array.from({ length: 8 }, (_, i) => `M${54 + i * 30} 84v22`).join("")} strokeOpacity="0.4" vectorEffect="non-scaling-stroke" />
        <rect x="24" y="112" width="368" height="8" strokeOpacity="0.85" vectorEffect="non-scaling-stroke" />
        {/* A cabine, o vidro e a porta. */}
        <path d="M298 112V52Q298 40 310 40H352L382 72H392V112Z" fill="var(--card)" strokeOpacity="0.9" vectorEffect="non-scaling-stroke" />
        <path d="M308 50H348L370 72H308Z" strokeOpacity="0.6" vectorEffect="non-scaling-stroke" />
        <path d="M342 50V112" strokeOpacity="0.35" vectorEffect="non-scaling-stroke" />
        {/* As rodas. */}
        {[84, 246, 350].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="128" r="18" fill="var(--background)" strokeOpacity="0.9" vectorEffect="non-scaling-stroke" />
            <circle cx={cx} cy="128" r="6" strokeOpacity="0.6" vectorEffect="non-scaling-stroke" />
          </g>
        ))}
        {/* O chão, hachurado. */}
        <path d="M0 146H420" strokeOpacity="0.7" vectorEffect="non-scaling-stroke" />
        <path d={chao} strokeWidth="1" strokeOpacity="0.3" vectorEffect="non-scaling-stroke" />
      </g>
      {/* A faixa refletiva: laranja e cal, alternadas. */}
      {refletiva.map((x, i) => (
        <rect key={x} x={x} y="105" width="12" height="5" fill={i % 2 ? "#f2efe9" : "var(--primary)"} opacity="0.9" />
      ))}
      <MarcaDoDeposito x="308" y="80" width="24" height="24" />
    </svg>
  );
}

/**
 * A mobília de cada cômodo da planta do balcão (16.10.2026; a cena 2 do
 * início): o símbolo de planta baixa do que há em cada lugar da casa, em
 * traço fino. Decorativa: o nome e o resumo da página estão escritos no
 * cômodo.
 */
export function MobiliaDoComodo({ id, className = "" }: { id: IdDaPagina; className?: string }) {
  const traco = { fill: "none", stroke: "currentColor", strokeWidth: 1.25, vectorEffect: "non-scaling-stroke" } as const;
  let desenho: React.ReactNode = null;
  let caixa = "0 0 200 100";
  if (id === "materiais") {
    // O estoque: três estantes, com as divisões, e o palete de sacos.
    desenho = (
      <>
        {[8, 38, 68].map((y) => (
          <g key={y}>
            <rect x="4" y={y} width="140" height="20" {...traco} />
            <path d={`M32 ${y}v20M60 ${y}v20M88 ${y}v20M116 ${y}v20`} {...traco} strokeOpacity="0.6" />
          </g>
        ))}
        <rect x="160" y="40" width="36" height="48" {...traco} />
        <path d="M160 40l36 48M196 40l-36 48" {...traco} strokeOpacity="0.6" />
      </>
    );
  } else if (id === "calculadora") {
    // O balcão em L, com a máquina sobre ele.
    desenho = (
      <>
        <path d="M6 10H190V90H170V30H6Z" {...traco} />
        <rect x="120" y="14" width="26" height="12" {...traco} />
        <circle cx="110" cy="52" r="8" {...traco} strokeOpacity="0.6" />
      </>
    );
  } else if (id === "entrega") {
    // O pátio: o caminhão visto de cima e o portão que abre.
    desenho = (
      <>
        <rect x="10" y="22" width="118" height="50" {...traco} />
        <rect x="130" y="26" width="34" height="42" {...traco} />
        <path d="M134 32h26M134 62h26" {...traco} strokeOpacity="0.6" />
        <path d="M176 6v88" {...traco} strokeDasharray="4 4" strokeOpacity="0.6" />
      </>
    );
  } else if (id === "orcamento") {
    // A mesa do pedido, com o talão sobre ela, e a cadeira.
    desenho = (
      <>
        <rect x="40" y="14" width="120" height="48" {...traco} />
        <rect x="88" y="22" width="30" height="22" {...traco} strokeOpacity="0.7" />
        <path d="M94 30h18M94 36h12" {...traco} strokeOpacity="0.6" />
        <rect x="84" y="70" width="32" height="22" rx="4" {...traco} strokeOpacity="0.7" />
      </>
    );
  } else if (id === "a-casa") {
    // A frente da casa: as duas portas de enrolar (o tracejado) na parede da rua, e a calçada.
    caixa = "0 0 320 60";
    desenho = (
      <>
        <path d="M0 20H40M140 20H180M280 20H320" {...traco} strokeWidth={3} />
        <path d="M40 20H140M180 20H280" {...traco} strokeDasharray="6 5" />
        <path d={Array.from({ length: 30 }, (_, i) => `M${6 + i * 11} 34l-8 10`).join("")} {...traco} strokeOpacity="0.5" />
      </>
    );
  }
  return (
    <svg viewBox={caixa} aria-hidden="true" className={`block h-auto ${className}`}>
      {desenho}
    </svg>
  );
}
