import type { Metadata } from "next";
import Link from "next/link";

import { IconeWhatsApp } from "@/components/icones";
import { MarcaDaNutricao } from "@/components/nichos/marcas";
import { vinculoDoWhatsapp } from "@/conteudo/demos/comum";
import { nutricaoSite as site } from "@/conteudo/demos/nutricao";
import { HighlightedText } from "@/components/ui/spell/highlighted-text";

// Peças da Nutrição Icaraí, usadas pelas três páginas (app/demos/nutricao/).

export const envelope = "mx-auto w-full max-w-[1320px] px-6 md:px-10 lg:px-14";
/**
 * O respiro entre as seções da folha: 96 px no celular, 144 px no
 * computador. Até 03/10, de 128 a 144 px, iguais no celular.
 */
export const entreSecoes = "mt-24 lg:mt-36";
export const vinculoWhatsApp = vinculoDoWhatsapp(site.mensagem);
export const atraso = (ms: number) => ({ "--atraso": `${ms}ms` }) as React.CSSProperties;
export const romanos = ["i", "ii", "iii", "iv", "v", "vi"];

export type IdDaPagina = (typeof site.paginas)[number]["id"];
export const paginaDe = (id: IdDaPagina) => site.paginas.find((p) => p.id === id)!;

/** Título, descrição e endereço canônico de cada página. */
export function metadadosDe(id: IdDaPagina): Metadata {
  const pagina = paginaDe(id);
  return {
    title: `${pagina.titulo} · ${site.nome} · demonstração`,
    description: `${pagina.descricao} Estabelecimento fictício.`,
    alternates: { canonical: pagina.caminho },
  };
}

/**
 * A ação do plano: o agendamento pelo WhatsApp, num botão de damasco. Sob o
 * ponteiro, o damasco clareia e acende um brilho de damasco em volta (saiu
 * em 03/10 pela regra 3 das Diretrizes de Design Premium e voltou no mesmo
 * dia, a pedido do usuário: é parte da identidade do site); no toque,
 * escurece.
 */
export function AcaoWhatsApp({ grande = false }: { grande?: boolean }) {
  return (
    <a
      href={vinculoWhatsApp}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 rounded-full bg-primary font-medium text-primary-foreground transition-[filter,box-shadow] duration-300 hover:shadow-[0_16px_34px_-16px_var(--primary)] hover:brightness-110 active:brightness-90 ${
        grande ? "min-h-14 px-8 text-[18px]" : "min-h-11 px-6 text-[16px]"
      }`}
    >
      <IconeWhatsApp className={grande ? "size-5" : "size-4"} />
      {site.acao}
    </a>
  );
}

/** Título em linhas; a última, em itálico — a voz da folha. */
export function Titulo({
  linhas,
  como: Tag = "h2",
  className = "",
  id,
  destaque,
  atrasoDoDestaque = 200,
}: {
  linhas: string[];
  como?: "h1" | "h2";
  className?: string;
  id?: string;
  /** A palavra que o marca-texto marca (uma só): passa na entrada da página ou quando a palavra entra na tela. */
  destaque?: string;
  /** Espera do marca-texto, em ms (o título termina de entrar antes). */
  atrasoDoDestaque?: number;
}) {
  return (
    <Tag id={id} className={`nt-exibicao ${className}`}>
      {linhas.map((linha, i) => {
        const k = destaque ? linha.indexOf(destaque) : -1;
        return (
          <span key={linha} className={`block ${i === linhas.length - 1 ? "italic" : ""}`}>
            {k < 0 ? (
              linha
            ) : (
              <>
                {linha.slice(0, k)}
                <HighlightedText marcador atraso={atrasoDoDestaque}>
                  {destaque}
                </HighlightedText>
                {linha.slice(k + destaque!.length)}
              </>
            )}
          </span>
        );
      })}
    </Tag>
  );
}

/** O fólio no topo de cada página: o assunto à esquerda e o número no índice à direita, sobre o filete duplo. */
export function Folio({ pagina, rotulo }: { pagina: IdDaPagina; rotulo: string }) {
  const atual = paginaDe(pagina);
  const total = romanos[site.paginas.length - 1].toUpperCase();
  return (
    <div className="pt-12">
      {/* No celular, o fólio encolhe: o número da página fica só em algarismos ("I / III"). */}
      <div className="flex items-baseline justify-between gap-4 pb-3 text-[13px] text-muted-foreground sm:gap-6 sm:text-[16px]">
        <p className="nt-versal">{rotulo}</p>
        <p className="nt-versal flex-none">
          <span className="sm:hidden">
            {atual.numero} / {total}
          </span>
          <span className="hidden sm:inline">
            Página {atual.numero} de {total}
          </span>
        </p>
      </div>
      <div className="nt-filete-duplo" />
    </div>
  );
}

/** "Continua em": a página seguinte, como no pé de uma folha; da última, a volta ao início. */
export function Continua({ pagina }: { pagina: IdDaPagina }) {
  const i = site.paginas.findIndex((p) => p.id === pagina);
  const ultima = i === site.paginas.length - 1;
  const proxima = site.paginas[ultima ? 0 : i + 1];
  return (
    <nav aria-label="Página seguinte" className={`${envelope} mt-20 lg:mt-28`}>
      <Link
        href={proxima.caminho}
        className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t-2 border-foreground pt-6"
      >
        <span className="nt-versal text-[16px] text-muted-foreground">{ultima ? "Volta ao início" : "Continua em"}</span>
        {/* No hover, só a cor da tinta: nada anda (pedido do usuário, 01/10). No toque, a mesma cor (03/10). */}
        <span className="nt-exibicao text-[clamp(36px,4.2vw,64px)] leading-none transition-colors duration-300 ease-atlas group-hover:text-accent group-active:text-accent">
          <span className="mr-4 text-muted-foreground italic">{proxima.numero}</span>
          {proxima.rotulo}
          <span aria-hidden="true" className="ml-4 inline-block">
            →
          </span>
        </span>
      </Link>
    </nav>
  );
}

/**
 * O mapa do entorno, gravado: a baía em hachura, a areia em pontilhado,
 * as ruas em traço duplo, o Campo de São Bento pontilhado e o consultório
 * marcado com a marca da casa e uma linha de chamada. Vetor (ESTEIRA,
 * VI.3); decorativo — o endereço está escrito ao lado.
 */
export function MapaGravado() {
  const ruas = [
    "M-20 118C180 104 420 126 820 96",
    "M-20 214C200 198 460 222 820 188",
    "M-20 318C220 300 480 324 820 290",
    "M96-20C112 120 104 260 120 396",
    "M246-20C256 140 248 280 262 410",
    "M400-20C392 150 410 290 404 408",
    "M690-20C676 120 694 250 680 372",
  ];
  /** A avenida da orla, mais larga que as outras ruas. */
  const orla = "M-20 404C150 378 300 430 450 402S700 362 820 376";
  return (
    <svg viewBox="0 0 800 560" aria-hidden="true" className="nt-mapa block h-auto w-full">
      <defs>
        <pattern id="nt-mar" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="var(--foreground)" strokeWidth="1" strokeOpacity="0.55" />
        </pattern>
        <pattern id="nt-pontos" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.15" fill="var(--foreground)" fillOpacity="0.5" />
          <circle cx="6.5" cy="6.5" r="0.9" fill="var(--foreground)" fillOpacity="0.38" />
        </pattern>
        <pattern id="nt-areia" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.7" fill="var(--foreground)" fillOpacity="0.35" />
        </pattern>
      </defs>
      <rect width="800" height="560" fill="var(--card)" />
      {/* A baía e a faixa de areia. */}
      <path d="M0 452C150 424 300 476 450 448S700 408 800 422V560H0Z" fill="url(#nt-mar)" />
      <path d="M0 430C150 402 300 454 450 426S700 386 800 400V422C700 408 600 470 450 448S150 424 0 452Z" fill="url(#nt-areia)" />
      <path d="M0 452C150 424 300 476 450 448S700 408 800 422" fill="none" stroke="var(--foreground)" strokeWidth="2.2" />
      {/* As ruas em traço duplo: primeiro as bordas, depois o miolo, para os cruzamentos ficarem limpos. */}
      <g fill="none" strokeLinecap="round">
        {ruas.map((d) => (
          <path key={`b${d}`} d={d} className="rua-borda" strokeWidth="14" />
        ))}
        <path d={orla} className="rua-borda" strokeWidth="18" />
        {ruas.map((d) => (
          <path key={`m${d}`} d={d} className="rua-miolo" strokeWidth="10.5" />
        ))}
        <path d={orla} className="rua-miolo" strokeWidth="14.5" />
      </g>
      {/* O Campo de São Bento. */}
      <rect x="452" y="138" width="196" height="138" rx="30" fill="url(#nt-pontos)" stroke="var(--foreground)" strokeWidth="2" />
      {/* Os nomes, com um halo de papel por baixo (paint-order), legíveis sobre a hachura e as ruas. */}
      <g fontFamily="var(--font-corpo), Georgia, serif" fill="var(--foreground)" fontStyle="italic" stroke="var(--card)" strokeWidth="6" strokeLinejoin="round" paintOrder="stroke">
        <text x="550" y="200" textAnchor="middle" fontSize="17">
          Campo de
        </text>
        <text x="550" y="222" textAnchor="middle" fontSize="17">
          São Bento
        </text>
        <text x="610" y="526" textAnchor="middle" fontSize="18" letterSpacing="0.06em">
          Baía de Guanabara
        </text>
        <text x="170" y="500" textAnchor="middle" fontSize="16" letterSpacing="0.04em">
          Praia de Icaraí
        </text>
      </g>
      {/* O norte. */}
      <g transform="translate(748 58)" fill="none" stroke="var(--foreground)" strokeWidth="1.6">
        <circle r="22" />
        <path d="M0 -15 6 9 0 4 -6 9Z" fill="var(--foreground)" />
        <text y="-28" textAnchor="middle" fontSize="13" fill="var(--foreground)" stroke="none" fontFamily="var(--font-corpo), Georgia, serif">
          N
        </text>
      </g>
      {/* O consultório, com a linha de chamada. */}
      <path d="M326 252 360 294H440" fill="none" stroke="var(--foreground)" strokeWidth="1.4" />
      <text
        x="446"
        y="299"
        fontSize="17"
        fill="var(--foreground)"
        fontFamily="var(--font-corpo), Georgia, serif"
        fontStyle="italic"
        stroke="var(--card)"
        strokeWidth="6"
        strokeLinejoin="round"
        paintOrder="stroke"
      >
        o consultório
      </text>
      <circle cx="318" cy="244" r="30" fill="var(--background)" stroke="var(--foreground)" strokeWidth="2" />
      <MarcaDaNutricao x="298" y="224" width="40" height="40" />
    </svg>
  );
}
