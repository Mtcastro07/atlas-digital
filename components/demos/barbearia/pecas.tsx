import type { Metadata } from "next";
import Link from "next/link";

import { TextoRolante } from "@/components/texto-rolante";
import { barbeariaSite as site, type LadoDaCena, type ObjetoDaCena } from "@/conteudo/demos/barbearia";
import { GradientWaveText } from "@/components/ui/spell/gradient-wave-text";

// Peças da Barbearia Santa Rosa, usadas pelas sete páginas (app/demos/barbearia/).

export const envelope = "mx-auto w-full max-w-[1380px] px-5 md:px-10 lg:px-14";
/**
 * O recuo dos cartões de vidro (serviços, equipe, agendador, retorno):
 * 24/40/48 px. Até 03/10, eram dois (esse e 32/48 px).
 */
export const recuoDoVidro = "p-6 md:p-10 lg:p-12";
export const atraso = (ms: number) => ({ "--atraso": `${ms}ms` }) as React.CSSProperties;

type IdDaPagina = (typeof site.paginas)[number]["id"];
export const paginaDe = (id: IdDaPagina) => site.paginas.find((p) => p.id === id)!;
/** As seis páginas da barra (o início é a marca). */
export const capitulos = site.paginas.filter((p) => p.id !== "inicio");

/** Título, descrição e endereço canônico de cada página. */
export function metadadosDe(id: IdDaPagina): Metadata {
  const pagina = paginaDe(id);
  return {
    title: id === "inicio" ? `${site.nome} · demonstração` : `${pagina.titulo} · ${site.nome} · demonstração`,
    description: `${pagina.descricao} Estabelecimento fictício.`,
    alternates: { canonical: pagina.caminho },
  };
}

/** Os atributos que pedem um objeto ao palco 3D (ilhas/demos/palco-3d). */
export const cena = (objeto: ObjetoDaCena, lado: LadoDaCena, { soComputador = false }: { soComputador?: boolean } = {}) => ({
  "data-objeto": objeto,
  "data-lado": lado,
  // Seção de conteúdo longo (lista, linha do tempo): no celular, sem ficha (palco-3d/motor.ts).
  ...(soComputador ? { "data-so-computador": "" } : {}),
});

/**
 * No celular e no tablet, a ficha fica no alto da tela (palco-3d/motor.ts):
 * a seção com ficha desce o texto para a metade de baixo, como foto e
 * legenda, e cabe numa tela.
 */
export const textoEmbaixo = "max-lg:min-h-[100svh] max-lg:items-end max-lg:pt-[50svh] max-lg:pb-12";

/** O monograma num anel de latão: a marca da barra e as moedas da equipe. */
export function Monograma({ texto = site.monograma, className }: { texto?: string; className?: string }) {
  return (
    <svg viewBox="-50 -50 100 100" aria-hidden="true" className={className}>
      <circle r="47" fill="var(--card)" stroke="var(--primary)" strokeWidth="2" />
      <circle r="41" fill="none" stroke="var(--primary)" strokeWidth="0.8" />
      <text textAnchor="middle" y="12" fontSize="36" fill="var(--foreground)" style={{ fontFamily: "var(--font-exibicao)" }}>
        {texto}
      </text>
    </svg>
  );
}

/**
 * O selo da casa em traço de latão: a reserva do palco 3D (sem script ou
 * sem WebGL) e a peça do rodapé, onde o nome gira devagar (ambiente,
 * pausável). Decorativo: o nome da casa está escrito na página.
 */
export function Selo({ className, girar = false, desenhar = false, id }: { className?: string; girar?: boolean; desenhar?: boolean; id: string }) {
  const R = 238;
  const traco = (ms: number) => (desenhar ? { className: "bb-traco", pathLength: 1, style: atraso(ms) } : {});
  return (
    <svg viewBox="-300 -300 600 600" aria-hidden="true" className={className}>
      <defs>
        <path id={id} d={`M0 ${-R}a${R} ${R} 0 1 1 0 ${2 * R}a${R} ${R} 0 1 1 0 ${-2 * R}`} />
      </defs>
      <g fill="none" stroke="var(--primary)">
        <circle r="292" strokeWidth="1.2" {...traco(0)} />
        <circle r="284" strokeWidth="0.8" {...traco(140)} />
        <circle r="196" strokeWidth="2.4" {...traco(280)} />
        <circle r="186" strokeWidth="0.8" {...traco(400)} />
      </g>
      <g className="bb-selo-gira" data-ambiente={girar || undefined}>
        <text fontSize="34" fill="var(--foreground)" style={{ fontFamily: "var(--font-exibicao)", letterSpacing: "0.04em" }}>
          <textPath href={`#${id}`} textLength={Math.round(2 * Math.PI * R) - 6} lengthAdjust="spacing">
            {site.selo.toUpperCase()}
          </textPath>
        </text>
      </g>
      <text textAnchor="middle" y="62" fontSize="188" fill="var(--foreground)" style={{ fontFamily: "var(--font-exibicao)" }}>
        {site.monograma}
      </text>
      <circle cx="-150" r="5" fill="var(--primary)" />
      <circle cx="150" r="5" fill="var(--primary)" />
    </svg>
  );
}

/** Número que ganha volume ao passar: dez cópias atrás da face, afastadas em Z conforme a rolagem. */
export function Extrusao({ texto }: { texto: string }) {
  return (
    <span className="bb-extrusao">
      {Array.from({ length: 10 }, (_, k) => (
        <span key={k} aria-hidden="true" className="bb-extrusao-camada" style={{ "--k": 10 - k } as React.CSSProperties}>
          {texto}
        </span>
      ))}
      <span className="bb-extrusao-face bb-latao">{texto}</span>
    </span>
  );
}

/**
 * O título da página (h1), em cartaz, que se compõe palavra a palavra, cada
 * uma subindo de dentro da sua janela (.mov-janela e .mov-palavra,
 * app/movimento.css); a última linha em itálico. Sem script e com movimento
 * reduzido, está pronto. `destaque`: a palavra que uma onda de latão
 * atravessa uma vez, depois de chegar (Spell UI, Gradient Wave Text; desde
 * 03/10).
 */
export function TituloQueSeCompoe({
  linhas,
  className = "",
  inicio = 150,
  id,
  destaque,
}: {
  linhas: string[];
  className?: string;
  inicio?: number;
  id?: string;
  destaque?: string;
}) {
  let ordem = 0;
  return (
    <h1 id={id} className={`bb-exibicao ${className}`}>
      {linhas.map((linha, i) => {
        const palavras = linha.split(" ");
        return (
          <span key={linha} className={`block ${i === linhas.length - 1 ? "italic" : ""}`}>
            {palavras.map((palavra, j) => {
              const n = ordem++;
              return (
                <span key={j}>
                  <span className="mov-janela">
                    <span className="mov-palavra" style={atraso(inicio + n * 95)}>
                      {/* A onda passa depois que a palavra sobe (1.050 ms, .mov-palavra), contada da primeira pintura. */}
                      {palavra === destaque ? <GradientWaveText atraso={inicio + n * 95 + 1000}>{palavra}</GradientWaveText> : palavra}
                    </span>
                  </span>
                  {j < palavras.length - 1 && " "}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}

/** O botão de latão, com as letras que rolam e o puxão magnético. */
export function BotaoDeLatao({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      data-magnetico
      className="bb-botao inline-flex items-center justify-center rounded-full font-medium tracking-[0.04em] transition-[translate,filter] duration-300 hover:brightness-110 min-h-14 px-8 text-[16px]"
    >
      <TextoRolante texto={children} />
    </Link>
  );
}

/** O vínculo de texto, com o fio de latão e a seta. */
export function VinculoDeFio({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className="group inline-flex min-h-11 items-center gap-3 text-[15px] tracking-[0.04em] transition-colors duration-300 hover:text-accent">
      <span className="underline decoration-primary decoration-1 underline-offset-[7px]">{children}</span>
      <span aria-hidden="true" className="transition-transform duration-500 ease-atlas group-hover:translate-x-1.5">
        →
      </span>
    </Link>
  );
}

/** A faixa do poste e o letreiro dos serviços, que correm devagar (ambiente, pausável). */
export function Faixa() {
  const itens = [...site.faixa, ...site.faixa, ...site.faixa];
  return (
    <div aria-hidden="true" className="relative">
      <div className="bb-faixas h-3" data-ambiente />
      <div className="mov-faixa-pai overflow-hidden border-y border-border bg-card/90 py-5">
        <div className="mov-faixa flex w-max" data-ambiente>
          {[0, 1].map((copia) => (
            <span key={copia} className="flex">
              {itens.map((item, i) => (
                <span key={`${copia}-${i}`} className="bb-exibicao flex items-center gap-10 pr-10 text-[clamp(30px,3vw,44px)] whitespace-nowrap italic">
                  {item}
                  <span className="size-2 rounded-full bg-primary" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
      <div className="bb-faixas h-3" data-ambiente />
    </div>
  );
}

/** Mapa do entorno em vetor: as ruas que sobem o morro de Santa Rosa e a casa, com o monograma como alfinete. */
export function MapaDeSantaRosa() {
  return (
    <svg viewBox="0 0 720 560" aria-hidden="true" className="block h-full w-full">
      <rect width="720" height="560" fill="var(--deep)" />
      <g fill="none" stroke="var(--muted-foreground)" strokeOpacity="0.45" strokeLinecap="round">
        <path className="bb-rua" pathLength={1} d="M-20 380C140 340 260 400 400 350S640 250 740 270" strokeWidth="16" />
        <path className="bb-rua" pathLength={1} d="M120-20C150 120 110 260 170 580" strokeWidth="9" />
        <path className="bb-rua" pathLength={1} d="M330-20C300 140 360 260 330 580" strokeWidth="9" />
        <path className="bb-rua" pathLength={1} d="M560-20C520 160 600 300 570 580" strokeWidth="9" />
        <path className="bb-rua" pathLength={1} d="M-20 170C160 150 300 200 460 160S640 110 740 120" strokeWidth="7" />
        <path className="bb-rua" pathLength={1} d="M170 470 330 490M330 250 560 230M20 260 120 270" strokeWidth="5" />
        <path d="M400 350C430 300 470 290 520 300M210 90C250 120 300 120 330 100" strokeWidth="3" strokeDasharray="2 8" />
      </g>
      <g fontSize="13" letterSpacing="0.28em" fill="var(--muted-foreground)" fontFamily="var(--font-corpo)">
        <text x="600" y="210">VIRADOURO</text>
        <text x="40" y="520">ICARAÍ</text>
        <text x="420" y="520">PÉ PEQUENO</text>
      </g>
      <circle cx="340" cy="356" r="58" fill="var(--primary)" fillOpacity="0.14" />
      <text x="340" y="446" textAnchor="middle" fontSize="15" letterSpacing="0.3em" fill="var(--accent)" fontFamily="var(--font-corpo)">
        SANTA ROSA
      </text>
      <g className="bb-alfinete">
        <svg x="310" y="326" width="60" height="60" viewBox="-50 -50 100 100">
          <circle r="47" fill="var(--card)" stroke="var(--primary)" strokeWidth="3" />
          <text textAnchor="middle" y="13" fontSize="38" fill="var(--foreground)" style={{ fontFamily: "var(--font-exibicao)" }}>
            {site.monograma}
          </text>
        </svg>
      </g>
    </svg>
  );
}
