import type { Metadata } from "next";
import Link from "next/link";

import { IconeWhatsApp } from "@/components/icones";
import { MarcaDaNutricao } from "@/components/nichos/marcas";
import { vinculoDoWhatsapp } from "@/conteudo/demos/comum";
import { nutricaoSite as site } from "@/conteudo/demos/nutricao";
import { HighlightedText } from "@/components/ui/spell/highlighted-text";
import { metadadosDoExemplo } from "@/lib/metadados";

// Peças da Nutrição Icaraí, usadas pelas três páginas (app/demos/nutricao/).

export const envelope = "mx-auto w-full max-w-[1320px] px-6 md:px-10 lg:px-14";
/**
 * O respiro entre as seções da folha: 96 px no celular, 144 px no
 * computador. Até 03/10, de 128 a 144 px, iguais no celular.
 */
export const entreSecoes = "mt-24 lg:mt-36";
export const vinculoWhatsApp = vinculoDoWhatsapp(site.mensagem);
export const romanos = ["i", "ii", "iii", "iv", "v", "vi"];

export type IdDaPagina = (typeof site.paginas)[number]["id"];
export const paginaDe = (id: IdDaPagina) => site.paginas.find((p) => p.id === id)!;

/** Título, descrição, endereço canônico e cartão de compartilhamento de cada página. */
export function metadadosDe(id: IdDaPagina): Metadata {
  const pagina = paginaDe(id);
  return metadadosDoExemplo({
    nome: site.nome,
    titulo: `${pagina.titulo} · ${site.nome} · demonstração`,
    descricao: `${pagina.descricao} Estabelecimento fictício.`,
    caminho: pagina.caminho,
    nicho: "nutricao",
  });
}

/**
 * A ação do plano: o agendamento pelo WhatsApp, num botão de damasco. Sob o
 * ponteiro, o damasco clareia e acende um brilho de damasco em volta (saiu
 * em 03/10 pela regra 3 das Diretrizes de Design Premium e voltou no mesmo
 * dia, a pedido do usuário: é parte da identidade do site). Pressionada, no
 * toque e no clique, escurece e cede a 0,97 em 120 ms (14.10.2026; com
 * movimento reduzido, só a cor).
 */
export function AcaoWhatsApp({ grande = false }: { grande?: boolean }) {
  return (
    <a
      href={vinculoWhatsApp}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 rounded-full bg-primary font-medium text-primary-foreground transition-[filter,box-shadow,scale] duration-300 hover:shadow-[0_16px_34px_-16px_var(--primary)] hover:brightness-110 active:brightness-90 active:duration-[120ms] motion-safe:active:scale-[.97] ${
        grande ? "min-h-14 px-8 text-[18px]" : "min-h-11 px-6 text-[16px]"
      }`}
    >
      <IconeWhatsApp className={grande ? "size-5" : "size-4"} />
      {site.acao}
    </a>
  );
}

/**
 * Título em linhas. Sem gesto: desde 14.10.2026, nenhum título leva o marca-texto. A voz da folha, a última linha em
 * itálico, fica só no título da página, uma vez por página (crítico de fora, 14.10.2026: em todo título, o itálico
 * virou carimbo em série); os títulos de seção ficam em pé.
 */
export function Titulo({ linhas, como: Tag = "h2", className = "", id }: { linhas: string[]; como?: "h1" | "h2"; className?: string; id?: string }) {
  return (
    <Tag id={id} className={`nt-exibicao ${className}`}>
      {linhas.map((linha, i) => (
        <span key={linha} className={`block ${Tag === "h1" && i === linhas.length - 1 ? "italic" : ""}`}>
          {linha}
        </span>
      ))}
    </Tag>
  );
}

/**
 * O marca-texto numa palavra do corpo, uma vez por página (14.10.2026; até então, no título, a marca T1): passa na
 * carga, depois de `atraso` ms, se a palavra está nos primeiros 92% da tela; abaixo disso, quando ela entra na tela
 * (ilha Revelacao).
 */
export function ComMarcaTexto({ texto, palavra, atraso }: { texto: string; palavra: string; atraso: number }) {
  const k = texto.indexOf(palavra);
  if (k < 0) return texto;
  return (
    <>
      {texto.slice(0, k)}
      <HighlightedText marcador atraso={atraso}>
        {palavra}
      </HighlightedText>
      {texto.slice(k + palavra.length)}
    </>
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

/** O caminho a pé, do portão do Campo de São Bento até a porta do consultório: nove traços pela rua, na ordem da caminhada. */
const ROTA = Array.from({ length: 9 }, (_, i) => {
  const ponto = (t: number) => [962 - 222 * t, 229 + 8 * t].map((v) => Math.round(v * 10) / 10);
  const [x1, y1] = ponto((i * 26) / 222);
  const [x2, y2] = ponto((i * 26 + 13) / 222);
  return `M${x1} ${y1}L${x2} ${y2}`;
}).concat("M733 242L727 254");

/** O ponto de ônibus, no mapa e na legenda: a placa no poste. */
function PlacaDoOnibus({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0V-22" stroke="var(--foreground)" strokeWidth="2" />
      <rect x="-9" y="-36" width="18" height="15" rx="3" fill="var(--foreground)" />
      <rect x="-5" y="-32" width="10" height="5" rx="1" fill="var(--card)" />
    </g>
  );
}

/** O estacionamento rotativo, no mapa e na legenda: o E no círculo. */
function SinalDoEstacionamento({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="12" fill="var(--card)" stroke="var(--foreground)" strokeWidth="2" />
      <text y="5.5" textAnchor="middle" fontSize="15" fill="var(--foreground)" fontFamily="var(--font-corpo), Georgia, serif" fontWeight="600">
        E
      </text>
    </g>
  );
}

/**
 * O símbolo de cada modo de chegar, na legenda do mapa (consultorio/page.tsx): o mesmo desenho que está no mapa, com o
 * marca-texto por baixo, que passa sob o dedo e o ponteiro junto com o do mapa (16.10.2026).
 */
export function SimboloDoModo({ modo }: { modo: string }) {
  return (
    <svg viewBox="-20 -20 40 40" aria-hidden="true" className="nt-simbolo overflow-visible">
      <circle r="20" className="nt-realce" fill="var(--marcador)" />
      {modo === "a-pe" && <path d="M-18 0H-8M2 0H12" stroke="var(--foreground)" strokeWidth="3.4" strokeLinecap="round" />}
      {modo === "onibus" && <PlacaDoOnibus x={0} y={18} />}
      {modo === "carro" && <SinalDoEstacionamento x={0} y={0} />}
    </svg>
  );
}

/**
 * O mapa do entorno, gravado: a baía em hachura, a areia em pontilhado, as ruas em traço duplo, o Campo de São Bento
 * pontilhado e o consultório carimbado com a marca da casa e uma linha de chamada. Vetor (ESTEIRA, VI.3); decorativo:
 * o endereço está escrito ao lado. Desde o crítico de fora (14.10.2026), o mapa é a abertura do Consultório: mais
 * largo (1.400 × 560, para a cartela do título caber no canto de cima, à esquerda, sem cobrir nada), com o caminho a
 * pé desde o portão do Campo, o ponto de ônibus e o estacionamento da legenda. O momento da página: o caminho se
 * marca, traço a traço, e o consultório se carimba na ponta dele (nutricao.css, .nt-consultorio).
 */
export function MapaGravado() {
  const ruas = [
    "M-20 132C300 118 620 136 900 120S1240 104 1420 112",
    "M-20 240C320 226 640 244 940 230S1260 218 1420 226",
    "M-20 350C320 332 660 352 960 336S1270 322 1420 330",
    "M152-20C164 120 156 260 170 404",
    "M316-20C326 130 318 270 330 410",
    "M484-20C478 140 492 280 486 414",
    "M640-20C648 130 636 270 646 414",
    "M796-20C804 130 794 270 806 412",
    "M944-20C936 140 952 270 944 404",
    "M1206-20C1214 120 1200 250 1212 396",
    "M1352-20C1344 120 1358 250 1350 388",
  ];
  /** A avenida da orla, mais larga que as outras ruas. */
  const orla = "M-20 420C200 396 420 444 700 418S1150 380 1420 396";
  const costa = "M0 468C220 442 440 490 700 464S1150 426 1400 440";
  return (
    <svg viewBox="0 0 1400 560" aria-hidden="true" className="nt-mapa block">
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
      <rect width="1400" height="560" fill="var(--card)" />
      {/* A baía e a faixa de areia. */}
      <path d={`${costa}V560H0Z`} fill="url(#nt-mar)" />
      <path d="M0 446C220 420 440 468 700 442S1150 404 1400 418V440C1150 426 960 438 700 464C440 490 220 442 0 468Z" fill="url(#nt-areia)" />
      <path d={costa} fill="none" stroke="var(--foreground)" strokeWidth="2.2" />
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
      {/* O Campo de São Bento, por cima da rua que ele interrompe: o papel embaixo, para a rua não passar pelo nome. */}
      <rect x="972" y="140" width="208" height="172" rx="34" fill="var(--card)" />
      <rect x="972" y="140" width="208" height="172" rx="34" fill="url(#nt-pontos)" stroke="var(--foreground)" strokeWidth="2" />
      {/* Os nomes, com um halo de papel por baixo (paint-order), legíveis sobre a hachura e as ruas. */}
      <g fontFamily="var(--font-corpo), Georgia, serif" fill="var(--foreground)" fontStyle="italic" stroke="var(--card)" strokeWidth="6" strokeLinejoin="round" paintOrder="stroke">
        <text x="1076" y="218" textAnchor="middle" fontSize="18">
          Campo de
        </text>
        <text x="1076" y="241" textAnchor="middle" fontSize="18">
          São Bento
        </text>
        <text x="1000" y="528" textAnchor="middle" fontSize="18" letterSpacing="0.06em">
          Baía de Guanabara
        </text>
        <text x="380" y="512" textAnchor="middle" fontSize="16" letterSpacing="0.04em">
          Praia de Icaraí
        </text>
      </g>
      {/* O norte. */}
      <g transform="translate(1290 64)" fill="none" stroke="var(--foreground)" strokeWidth="1.6">
        <circle r="22" fill="var(--card)" />
        <path d="M0 -15 6 9 0 4 -6 9Z" fill="var(--foreground)" />
        <text y="-28" textAnchor="middle" fontSize="13" fill="var(--foreground)" stroke="none" fontFamily="var(--font-corpo), Georgia, serif">
          N
        </text>
      </g>
      {/* O marca-texto da legenda (nutricao.css, .nt-realce): no caminho a pé e em volta dos dois sinais, sob o ponteiro e no toque do item de "Como chegar". */}
      <path d="M962 229L740 237L727 254" className="nt-realce nt-realce-a-pe" fill="none" stroke="var(--marcador)" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="712" cy="392" r="30" className="nt-realce nt-realce-onibus" fill="var(--marcador)" />
      <circle cx="800" cy="300" r="24" className="nt-realce nt-realce-carro" fill="var(--marcador)" />
      {/* O ponto de ônibus, na orla, e o estacionamento rotativo, na rua do consultório: a legenda ao lado. */}
      <g className="nt-simbolo-onibus">
        <PlacaDoOnibus x={712} y={418} />
      </g>
      <g className="nt-simbolo-carro">
        <SinalDoEstacionamento x={800} y={300} />
      </g>
      {/* O consultório: o caminho a pé desde o Campo, o carimbo na ponta e a linha de chamada (o momento da página III, nutricao.css). */}
      <g className="nt-consultorio" data-revelar>
        <g className="nt-rota" fill="none" stroke="var(--foreground)" strokeWidth="3.4" strokeLinecap="round">
          {ROTA.map((d, i) => (
            <path key={d} d={d} className="nt-rota-traco" style={{ "--i": i } as React.CSSProperties} />
          ))}
        </g>
        <g className="nt-chamada">
          <path d="M744 320 782 392H796" fill="none" stroke="var(--foreground)" strokeWidth="1.4" />
          <text
            x="802"
            y="397"
            fontSize="18"
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
        </g>
        <g className="nt-carimbo">
          <circle cx="720" cy="290" r="44" fill="none" stroke="var(--foreground)" strokeWidth="1.2" />
          <circle cx="720" cy="290" r="36" fill="var(--background)" stroke="var(--foreground)" strokeWidth="2.2" />
          <MarcaDaNutricao x="695" y="265" width="50" height="50" />
        </g>
      </g>
    </svg>
  );
}
