import type { Metadata } from "next";
import Link from "next/link";

import { IconeWhatsApp } from "@/components/icones";
import { MarcaDoDeposito } from "@/components/nichos/marcas";
import { vinculoDoWhatsapp } from "@/conteudo/demos/comum";
import { depositoSite as site } from "@/conteudo/demos/deposito";

// Peças do Depósito Engenhoca, usadas pelas seis páginas (app/demos/deposito/).

export const envelope = "mx-auto w-full max-w-[1320px] px-5 md:px-10";
export const vinculoWhatsApp = vinculoDoWhatsapp(site.mensagem);
export const atraso = (ms: number) => ({ "--atraso": `${ms}ms` }) as React.CSSProperties;

export type IdDaPagina = (typeof site.paginas)[number]["id"];
export const paginaDe = (id: IdDaPagina) => site.paginas.find((p) => p.id === id)!;
/** As cinco páginas das abas (o início é a marca). */
export const abas = site.paginas.filter((p) => p.id !== "inicio");

/** Título, descrição e endereço canônico de cada página. */
export function metadadosDe(id: IdDaPagina): Metadata {
  const pagina = paginaDe(id);
  return {
    title: id === "inicio" ? `${site.nome} · demonstração` : `${pagina.titulo} · ${site.nome} · demonstração`,
    description: `${pagina.descricao} Estabelecimento fictício.`,
    alternates: { canonical: pagina.caminho },
  };
}

/** O título de placa, em linhas. */
export function Linhas({ linhas }: { linhas: string[] }) {
  return linhas.map((linha) => (
    <span key={linha} className="block">
      {linha}
    </span>
  ));
}

type BotaoProps = { href: string; children: React.ReactNode; grande?: boolean; externo?: boolean; contorno?: boolean };

/** O botão de etiqueta: canto chanfrado, Oswald em caixa-alta. Laranja (ação) ou em contorno. */
export function Botao({ href, children, grande = false, externo = false, contorno = false }: BotaoProps) {
  const classes = `dp-chanfro dp-botao dp-exibicao inline-flex items-center justify-center gap-3 tracking-[0.05em] ${
    grande ? "min-h-14 px-8 text-[18px]" : "min-h-12 px-6 text-[15.5px]"
  } ${contorno ? "bg-foreground/[0.06] text-foreground ring-1 ring-inset ring-foreground/40" : "bg-primary text-primary-foreground"}`;
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

/** A ação do WhatsApp, no botão de etiqueta. */
export function BotaoWhatsApp({ grande = false, contorno = false }: { grande?: boolean; contorno?: boolean }) {
  return (
    <Botao href={vinculoWhatsApp} externo grande={grande} contorno={contorno}>
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
      <span className="dp-codigo mt-1 block text-center text-[10.5px]">{texto}</span>
    </span>
  );
}

/**
 * A abertura de cada página interna: o código da aba ("02 / 05") sobre a
 * cota, o título de placa e o lide, no papel quadriculado.
 */
export function Abertura({ pagina, titulo, lide, children }: { pagina: IdDaPagina; titulo: string[]; lide: string; children?: React.ReactNode }) {
  const atual = paginaDe(pagina);
  return (
    <section aria-labelledby="titulo" className="dp-quadriculado border-b border-border">
      <div className={`${envelope} grid gap-10 pt-16 pb-16 lg:grid-cols-12 lg:pt-20 lg:pb-20`}>
        <div className="lg:col-span-8">
          <p className="dp-codigo flex items-center gap-4 text-muted-foreground">
            <span className="bg-foreground px-2 py-1 text-background">
              {atual.codigo} / {String(abas.length).padStart(2, "0")}
            </span>
            {site.codigo} · {atual.rotulo}
          </p>
          <h1 id="titulo" className="dp-exibicao dp-entra-pagina mt-8 text-[clamp(52px,7vw,112px)] leading-[0.96]">
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

/**
 * Mapa do bairro em papel de projeto (ESTEIRA, VI.3): o quadriculado, as
 * ruas em traço de grafite, os bairros vizinhos em código, o raio da
 * entrega do mesmo dia em laranja e o depósito ao centro, com a marca.
 * Decorativo — o raio e os bairros estão escritos ao lado.
 */
export function MapaDaEntrega({ legenda }: { legenda: string }) {
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
      <g fill="var(--foreground)" fontFamily="var(--font-mono), monospace" fontSize="15" letterSpacing="0.16em">
        <text x="70" y="262">BARRETO</text>
        <text x="1092" y="248">CARAMUJO</text>
        <text x="290" y="590">SANTANA</text>
        <text x="1000" y="590">FONSECA</text>
      </g>
      {/* O raio do mesmo dia. */}
      <circle cx="640" cy="320" r="228" fill="var(--primary)" fillOpacity="0.1" stroke="var(--primary)" strokeWidth="2.5" strokeDasharray="10 10" />
      <path d="M640 320H868" stroke="var(--accent)" strokeWidth="1.5" />
      <path d="M868 312V328" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="754" y="308" textAnchor="middle" fill="var(--accent)" fontFamily="var(--font-mono), monospace" fontSize="13" letterSpacing="0.12em">
        RAIO
      </text>
      <text x="640" y="72" textAnchor="middle" fill="var(--accent)" fontFamily="var(--font-mono), monospace" fontSize="15" letterSpacing="0.18em">
        {legenda.toUpperCase()}
      </text>
      <circle cx="640" cy="320" r="46" fill="var(--card)" stroke="var(--foreground)" strokeWidth="2" />
      <MarcaDoDeposito x="612" y="292" width="56" height="56" />
      <text x="640" y="400" textAnchor="middle" fill="var(--foreground)" fontFamily="var(--font-exibicao), sans-serif" fontWeight="600" fontSize="22" letterSpacing="0.2em">
        ENGENHOCA
      </text>
    </svg>
  );
}
