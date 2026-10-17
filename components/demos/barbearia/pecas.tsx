import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";

import { TituloDoCouro } from "@/components/demos/barbearia/estado-da-casa";
import { TextoRolante } from "@/components/texto-rolante";
import { barbeariaSite as site, type LadoDaCena, type ObjetoDaCena } from "@/conteudo/demos/barbearia";
import { metadadosDoExemplo } from "@/lib/metadados";

// Peças da Barbearia Santa Rosa, usadas pelas sete páginas (app/demos/barbearia/).

export { MiniFicha } from "@/components/demos/barbearia/mini-ficha";

export const envelope = "mx-auto w-full max-w-[1380px] px-5 md:px-10 lg:px-14";
export const atraso = (ms: number) => ({ "--atraso": `${ms}ms` }) as React.CSSProperties;

type IdDaPagina = (typeof site.paginas)[number]["id"];
export const paginaDe = (id: IdDaPagina) => site.paginas.find((p) => p.id === id)!;
/** As seis páginas da barra (o início é a marca). */
export const capitulos = site.paginas.filter((p) => p.id !== "inicio");

/** Título, descrição, endereço canônico e cartão de compartilhamento de cada página. */
export function metadadosDe(id: IdDaPagina): Metadata {
  const pagina = paginaDe(id);
  return metadadosDoExemplo({
    nome: site.nome,
    titulo: id === "inicio" ? `${site.nome} · demonstração` : `${pagina.titulo} · ${site.nome} · demonstração`,
    descricao: `${pagina.descricao} Estabelecimento fictício.`,
    caminho: pagina.caminho,
    nicho: "barbearia",
  });
}

/** Os atributos que pedem um objeto ao palco 3D (ilhas/demos/palco-3d). */
export const cena = (objeto: ObjetoDaCena, lado: LadoDaCena, { soComputador = false }: { soComputador?: boolean } = {}) => ({
  "data-objeto": objeto,
  "data-lado": lado,
  // Seção de conteúdo longo (lista, linha do tempo): no celular, sem ficha (palco-3d/motor.ts).
  ...(soComputador ? { "data-so-computador": "" } : {}),
});

/**
 * A seção sobre a qual o palco fica vazio (desde a correção de 14/10): na
 * mesa, quando ela passa pelo meio da tela, a ficha se apaga (palco-3d/
 * motor.ts). É o painel das duas ferramentas: a ficha da abertura ficava
 * presa atrás do vidro, cortada pela borda do painel.
 */
export const palcoVazio = { "data-palco-vazio": "" };

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
 * O título da página (h1), em cartaz, com a última linha em itálico. Com
 * `compor` (só a capa do início, desde 14/10), ele se compõe palavra a
 * palavra, cada uma subindo de dentro da sua janela (.mov-janela e
 * .mov-palavra, app/movimento.css; só a partir de 1024 px), uma vez por
 * visita. Nas páginas internas, pinta parado: o momento da chegada é a
 * ficha que vira no palco. Sem script e com movimento reduzido, está pronto.
 * A onda de latão em "esquina." saiu em 14/10: o título que se compõe já é o
 * momento da capa, e o brilho de "Desde 1996" é o único gesto de texto.
 * Com `italico={false}`, nenhuma linha em itálico (correção de 14/10: os
 * doze títulos do site terminavam todos em itálico, o mesmo molde em série).
 */
export function TituloQueSeCompoe({
  linhas,
  className = "",
  inicio = 150,
  id,
  compor = false,
  italico = true,
}: {
  linhas: string[];
  className?: string;
  inicio?: number;
  id?: string;
  compor?: boolean;
  italico?: boolean;
}) {
  let ordem = 0;
  return (
    <h1 id={id} className={`bb-exibicao ${className}`}>
      {linhas.map((linha, i) => {
        const palavras = linha.split(" ");
        return (
          // O espaço entre as linhas (desde 16/10): não aparece entre blocos, mas separa as palavras no texto do título e,
          // em A casa, na mesa, onde as linhas correm numa só ("cadeiraa", até então).
          <Fragment key={linha}>
            {i > 0 && " "}
            <span className={`block ${italico && i === linhas.length - 1 ? "italic" : ""}`}>
            {compor
              ? palavras.map((palavra, j) => (
                  <span key={j}>
                    <span className="mov-janela">
                      <span className="mov-palavra" style={atraso(inicio + ordem++ * 95)}>
                        {palavra}
                      </span>
                    </span>
                    {j < palavras.length - 1 && " "}
                  </span>
                ))
              : linha}
            </span>
          </Fragment>
        );
      })}
    </h1>
  );
}

/**
 * O botão de latão, com as letras que rolam e o reflexo que cruza no hover
 * (no toque, enquanto o dedo pressiona; barbearia.css). O ímã (`ima`), só
 * no da capa do início (desde 14/10; até então, em toda ação).
 */
export function BotaoDeLatao({ href, children, ima = false }: { href: string; children: string; ima?: boolean }) {
  return (
    <Link
      href={href}
      data-magnetico={ima || undefined}
      className="bb-botao inline-flex items-center justify-center rounded-full font-medium tracking-[0.04em] transition-[translate,filter] duration-300 hover:brightness-110 min-h-14 px-8 text-[16px]"
    >
      <TextoRolante texto={children} />
    </Link>
  );
}

/**
 * O vínculo de texto: o sublinhado de latão, sempre à vista, e, sob ele, o
 * fio de latão claro que se acende da esquerda no hover e no foco, e se
 * recolhe para a direita ao sair (barbearia.css, .bb-vinculo). Sem seta
 * desde 14/10: a seta fica só onde diz "ir para o capítulo" (as listas).
 */
export function VinculoDeFio({ href, children, detalhe, externo = false }: { href: string; children: string; detalhe?: string; externo?: boolean }) {
  return (
    <Link
      href={href}
      {...(externo && { target: "_blank", rel: "noopener noreferrer" })}
      className="bb-vinculo inline-flex min-h-11 items-center text-[15px] tracking-[0.04em] transition-colors duration-300 hover:text-accent"
    >
      <span className="bb-vinculo-texto underline decoration-primary decoration-1 underline-offset-[7px]">{children}</span>
      {/* O detalhe só para o leitor de tela (desde 16/10): os quatro "Agendar este serviço" tinham o mesmo nome acessível. */}
      {detalhe && <span className="sr-only">: {detalhe}</span>}
    </Link>
  );
}

/**
 * A cena de couro do início (desde 14/10): a cadeira, com o estado ao vivo
 * no título; sem script, o fato do Onde. Desde a correção de 14/10 (o
 * crítico de fora: as tachas caíam sobre a pontuação, e 60% da cena era
 * padrão, como papel de parede), o couro tem duas partes, separadas pelo
 * vivo da costura: o assento liso, sob o texto, e o encosto em capitonê,
 * com as tachas de latão nos cruzamentos (à direita na mesa, em cima no
 * celular). No encosto fica o poste da casa (Poste), que gira só com a casa
 * aberta. A luz da luminária sob o ponteiro é o orbe da LuzDoCursor (.vd-luz
 * e .vd-orbe), agora em luz de verdade sobre o couro (soft-light): acende o
 * capitonê e as tachas por onde passa. Fundo sólido: cobre o palco, e a
 * ficha troca escondida atrás dele. Os tokens da cena estão em
 * barbearia.css.
 */
export function CenaDoCouro() {
  return (
    <section
      aria-labelledby="couro"
      className="bb-couro vd-luz flex min-h-[100vh] items-center py-28 max-lg:min-h-[100svh] max-lg:items-end max-lg:pt-[52svh] max-lg:pb-14"
    >
      <span aria-hidden="true" className="vd-orbe" />
      <Poste />
      <div className={`${envelope} w-full`}>
        <div className="lg:max-w-[46%]">
          <TituloDoCouro
            id="couro"
            expediente={site.expediente}
            semScript={site.couro.semScript}
            className="bb-exibicao min-h-[1.8em] text-[clamp(48px,6.2vw,96px)] leading-[0.9] [text-wrap:balance]"
          />
          <p className="mt-8 text-[17px] leading-relaxed text-muted-foreground">
            {site.horarioCurto[0]}
            <br />
            {site.horarioCurto[1]}
          </p>
          <div className="mt-8">
            <VinculoDeFio href={paginaDe("onde").caminho}>{site.couro.vinculo}</VinculoDeFio>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * O poste da barbearia, no encosto de couro (desde a correção de 14/10; até
 * então, as listras eram divisória em quatro lugares, uma delas de cada lado
 * do letreiro que corria sem fim): o capitel e a base de latão e o cilindro
 * de vidro com as listras de couro, osso e latão. Com a casa aberta
 * (data-casa-aberta, na raiz, pelo estado ao vivo do rodapé), as listras
 * sobem, como num poste girando, e a luz de dentro acende; fechada, sem
 * script ou com movimento reduzido, ficam paradas. Só transform e opacity.
 */
function Poste() {
  return (
    <div aria-hidden="true" className="bb-poste">
      <span className="bb-poste-halo" />
      <span className="bb-poste-capitel" />
      <span className="bb-poste-vidro">
        <span className="bb-poste-listras" data-ambiente />
      </span>
      <span className="bb-poste-base" />
    </div>
  );
}

/**
 * A tesoura de barbeiro em traço de latão, a peça da cena da tesoura no
 * início (desde a correção de 14/10, no lugar da terceira ficha seguida). As
 * duas metades giram em volta do parafuso: abertas quando a cena entra pelo
 * pé da tela, elas se fecham até 8° quando a cena chega ao meio (--p, da
 * ilha CenaDeRolagem). Sob o ponteiro, e no toque, a tesoura corta uma vez
 * (280 ms). Só transform. Sem script e com movimento reduzido, a pose final.
 * Decorativa: o texto da cena diz o serviço.
 */
export function Tesoura({ className = "" }: { className?: string }) {
  const lamina = "M298 112C400 99 522 101 624 117L624 120C522 123 412 127 316 129Z";
  const cabo = "M318 127C282 137 244 147 206 153";
  return (
    <svg viewBox="0 0 640 240" aria-hidden="true" className={`bb-tesoura-desenho overflow-visible ${className}`}>
      {/* A metade de baixo (o cabo de cima, a lâmina de baixo): a de cima, espelhada. */}
      <g className="bb-lamina-b">
        <g className="bb-corte-b">
          <g transform="matrix(1 0 0 -1 0 240)">
            <path d={cabo} className="bb-tesoura-cabo" />
            <ellipse cx="152" cy="160" rx="52" ry="31" className="bb-tesoura-anel" />
            <path d={lamina} className="bb-tesoura-lamina" />
            <path d="M330 114C430 104 530 106 610 117" className="bb-tesoura-fio" />
          </g>
        </g>
      </g>
      <g className="bb-lamina-a">
        <g className="bb-corte-a">
          <path d={cabo} className="bb-tesoura-cabo" />
          <ellipse cx="152" cy="160" rx="52" ry="31" className="bb-tesoura-anel" />
          {/* O apoio do dedo, só num dos anéis, como na tesoura de barbeiro. */}
          <path d="M118 186C104 204 84 212 64 207" className="bb-tesoura-cabo" />
          <path d={lamina} className="bb-tesoura-lamina" />
          <path d="M330 114C430 104 530 106 610 117" className="bb-tesoura-fio" />
        </g>
      </g>
      <circle cx="330" cy="120" r="10" className="bb-tesoura-parafuso" />
      <path d="M324 120h12" className="bb-tesoura-fenda" />
    </svg>
  );
}

/**
 * Mapa do entorno em vetor: a casa no meio de Santa Rosa, com o monograma
 * como alfinete. Desde a correção de 14/10 (o crítico de fora: o mapa tinha
 * 985 px de altura numa tela de 900, nunca cabia inteiro, e eram sete traços
 * grossos), ele é largo (2:1) e cabe na tela da mesa, com a trama fina das
 * ruas parada, as curvas de nível do morro, as ruas principais que se
 * desenham ao rolar e o nome da Rua Mário Viana correndo junto da rua. No
 * celular, a moldura é alta (4:5) e o desenho é recortado em volta da casa.
 */
export function MapaDeSantaRosa() {
  const principal = "M-20 360C200 330 380 382 600 352S980 270 1220 300";
  const marioViana = "M548 -20C584 110 566 236 600 346S636 520 606 620";
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="block h-full w-full">
      <rect width="1200" height="600" fill="var(--deep)" />
      {/* As curvas de nível do morro, a nordeste. */}
      <g fill="none" stroke="var(--muted-foreground)" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="2 7" strokeLinecap="round">
        <path d="M842 196C836 104 1012 70 1090 128S1110 286 990 296 848 268 842 196Z" />
        <path d="M884 196C880 136 1000 112 1052 150S1062 254 984 260 888 244 884 196Z" />
        <path d="M928 194C928 160 990 148 1014 170S1016 226 978 228 928 222 928 194Z" />
      </g>
      {/* A trama fina das ruas, parada. */}
      <g fill="none" stroke="var(--muted-foreground)" strokeOpacity="0.16" strokeWidth="3" strokeLinecap="round">
        <path d="M96-20C118 200 86 400 128 620M418-20C440 160 398 380 452 620M762-20C730 200 792 420 760 620M1062-20C1040 200 1092 400 1060 620" />
        <path d="M-20 62C300 50 700 82 1220 40M-20 252C300 242 640 272 1220 222M-20 462C300 450 700 482 1220 420M-20 560C400 546 800 576 1220 540" />
        <path d="M128 170 252 160M452 286 600 270M760 470 900 452M300 540 452 520M960 330 1180 350" />
      </g>
      {/* As ruas principais, que se desenham ao rolar. */}
      <g fill="none" stroke="var(--muted-foreground)" strokeOpacity="0.45" strokeLinecap="round">
        <path className="bb-rua" pathLength={1} d={principal} strokeWidth="16" />
        <path id="rua-mario-viana" className="bb-rua" pathLength={1} d={marioViana} strokeWidth="11" />
        <path className="bb-rua" pathLength={1} d="M250-20C280 140 230 300 290 620" strokeWidth="8" />
        <path className="bb-rua" pathLength={1} d="M900-20C870 160 940 320 900 620" strokeWidth="8" />
        <path className="bb-rua" pathLength={1} d="M-20 150C200 140 420 200 640 150S1000 90 1220 110" strokeWidth="7" />
        <path className="bb-rua" pathLength={1} d="M290 470 600 500M640 220 900 200M40 250 250 262M905 430 1180 450" strokeWidth="5" />
      </g>
      {/* O caminho até a casa: a Rua Mário Viana em latão, apagada; acende sob a mão e no toque (desde 16/10). */}
      <path className="bb-rua bb-rua-da-casa" pathLength={1} d={marioViana} fill="none" stroke="var(--accent)" strokeWidth="11" strokeLinecap="round" />
      <g fontSize="14" letterSpacing="0.28em" fill="var(--muted-foreground)" fontFamily="var(--font-corpo)">
        <text x="668" y="96">VIRADOURO</text>
        <text x="392" y="556">ICARAÍ</text>
        <text x="652" y="560">PÉ PEQUENO</text>
        <text fontSize="11" letterSpacing="0.3em" fillOpacity="0.8">
          <textPath href="#rua-mario-viana" startOffset="8%">RUA MÁRIO VIANA</textPath>
        </text>
      </g>
      <circle cx="600" cy="346" r="64" fill="var(--primary)" fillOpacity="0.14" />
      <text x="600" y="442" textAnchor="middle" fontSize="15" letterSpacing="0.3em" fill="var(--accent)" fontFamily="var(--font-corpo)">
        SANTA ROSA
      </text>
      <g className="bb-alfinete">
        <svg x="568" y="314" width="64" height="64" viewBox="-50 -50 100 100">
          <circle r="47" fill="var(--card)" stroke="var(--primary)" strokeWidth="3" />
          <text textAnchor="middle" y="13" fontSize="38" fill="var(--foreground)" style={{ fontFamily: "var(--font-exibicao)" }}>
            {site.monograma}
          </text>
        </svg>
      </g>
    </svg>
  );
}
