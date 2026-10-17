import Link from "next/link";

import { Envelope, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { Titulo } from "@/components/tipografia";
import { buttonVariants } from "@/components/ui/button";
import { passosDoInicio, trabalho } from "@/conteudo/site";

/**
 * A derrota: o percurso das quatro etapas, plotado na água como o rumo de
 * uma carta náutica, num arco de círculo (a geometria, e não um desenho
 * inventado). Duas pranchas, com a mesma construção: a da mesa, em 1.120
 * unidades (a coluna a 1.440 px), e a do celular, em 342 (a coluna a 390
 * px), mais curva e com as cotas mais afastadas, porque o texto não escala
 * com o desenho. Cada uma escala com a coluna (app/vidro.css, .vd-derrota).
 * As quatro estações ficam a intervalos iguais; o alto do arco fica entre a
 * terceira e a quarta. As durações que são intervalos viram cotas, como num
 * desenho cotado: as 24 h vão da visita ao rascunho e os 7 a 15 dias úteis,
 * da visita à publicação. As contagens (1 visita, 2 rodadas) ficam na
 * estação. O desenho não está em escala: a cota diz o valor, como no
 * desenho técnico.
 */
type Prancha = { largura: number; altura: number; cx: number; cy: number; r: number; xs: number[]; parcial: number; total: number; traco: number; alem: number };
const MESA: Prancha = { largura: 1120, altura: 550, cx: 700, cy: 2490, r: 2200, xs: [0, 280, 560, 840], parcial: 64, total: 220, traco: 7, alem: 320 };
// O celular (17/10, segundo fechamento): as estações num vão de 294 unidades, centradas sob o alto do arco, para as
// pernas da cota maior (que se abrem com o raio) caberem na coluna; até então, de 10 a 331, a perna da visita saía
// 27 unidades à esquerda, além da margem da tela.
const CELULAR: Prancha = { largura: 342, altura: 236, cx: 174, cy: 880, r: 700, xs: [27, 125, 223, 321], parcial: 44, total: 120, traco: 5, alem: 60 };

const f = (n: number) => n.toFixed(1);

function geometria(g: Prancha) {
  const angulo = (x: number) => Math.asin((x - g.cx) / g.r);
  const ponto = (t: number, r: number) => [g.cx + r * Math.sin(t), g.cy - r * Math.cos(t)] as const;
  const arco = (t0: number, t1: number, r: number) => {
    const [x0, y0] = ponto(t0, r);
    const [x1, y1] = ponto(t1, r);
    return `M${f(x0)} ${f(y0)}A${r} ${r} 0 0 1 ${f(x1)} ${f(y1)}`;
  };
  const raio = (t: number, r0: number, r1: number) => {
    const [x0, y0] = ponto(t, r0);
    const [x1, y1] = ponto(t, r1);
    return `M${f(x0)} ${f(y0)}L${f(x1)} ${f(y1)}`;
  };
  /** O traço oblíquo do fim da cota (a convenção do desenho de arquitetura): a 45°, entre a tangente e o raio. */
  const traco = (t: number, r: number) => {
    const [x, y] = ponto(t, r);
    const [ux, uy] = [(Math.cos(t) + Math.sin(t)) / Math.SQRT2, (Math.sin(t) - Math.cos(t)) / Math.SQRT2];
    return `M${f(x - ux * g.traco)} ${f(y - uy * g.traco)}L${f(x + ux * g.traco)} ${f(y + uy * g.traco)}`;
  };
  const T = g.xs.map(angulo);
  const [rp, rt] = [g.r + g.parcial, g.r + g.total];
  const folga = g.traco * 1.6;
  return {
    estacoes: T.map((t) => ponto(t, g.r)),
    rumo: arco(angulo(-g.alem), angulo(g.largura + g.alem), g.r),
    chamadas: raio(T[0], g.r + folga, rt + folga) + raio(T[1], g.r + folga, rp + folga) + raio(T[3], g.r + folga, rt + folga),
    cotas: arco(T[0], T[1], rp) + arco(T[0], T[3], rt),
    fins: traco(T[0], rp) + traco(T[1], rp) + traco(T[0], rt) + traco(T[3], rt),
    /** Onde cada cota leva o valor: acima do arco, ao meio do vão, mais alto na parcial, que sobe mais sob o texto (a chave é a etapa: 1, o rascunho; 3, a publicação). */
    valores: { 1: ponto((T[0] + T[1]) / 2, rp + g.parcial * 0.4), 3: ponto((T[0] + T[3]) / 2, rt + 8) } as Record<number, readonly [number, number]>,
  };
}
const G = { mesa: geometria(MESA), celular: geometria(CELULAR) };

/** Os números das estações e os valores das cotas, só na prancha do celular, como desenho (o texto é a lista). */
function Legendas({ g }: { g: ReturnType<typeof geometria> }) {
  return (
    <g className="vd-derrota-legendas">
      {g.estacoes.map(([x, y], i) => (
        <text key={i} x={f(x)} y={f(y + 26)} textAnchor="middle" className="numero">
          {String(i + 1).padStart(2, "0")}
        </text>
      ))}
      {Object.entries(g.valores).map(([i, [x, y]]) => (
        <text key={i} x={f(x)} y={f(y - 6)} textAnchor="middle" className="valor">
          {trabalho.passos[Number(i)].marca.valor}
        </text>
      ))}
    </g>
  );
}

function Desenho({ id, g, p }: { id: "mesa" | "celular"; g: ReturnType<typeof geometria>; p: Prancha }) {
  return (
    <svg viewBox={`0 0 ${p.largura} ${p.altura}`} aria-hidden="true" className={`vd-derrota-${id}`}>
      <defs>
        {/* O rumo some antes da borda da tela: a carta continua, e o desenho não termina numa reta. */}
        <linearGradient id={`rumo-${id}`} gradientUnits="userSpaceOnUse" x1={-p.alem} y1="0" x2={p.largura + p.alem} y2="0">
          <stop offset="0" stopColor="var(--primary)" stopOpacity="0" />
          <stop offset="0.14" stopColor="var(--primary)" />
          <stop offset="0.86" stopColor="var(--primary)" />
          <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="vd-derrota-cotas">
        <path d={g.chamadas} className="chamada" />
        <path d={g.cotas} />
        <path d={g.fins} className="fim" />
      </g>
      <path d={g.rumo} stroke={`url(#rumo-${id})`} className="vd-derrota-rumo" />
      {id === "celular" && <Legendas g={g} />}
    </svg>
  );
}

/** As coordenadas de um rótulo nas duas pranchas, em unidades de cada uma (o CSS as converte pela coluna). */
const lugar = (i: number, qual: "estacoes" | "valores") =>
  ({
    "--x": f(G.mesa[qual][i][0]),
    "--y": f(G.mesa[qual][i][1]),
    "--xc": f(G.celular[qual][i][0]),
    "--yc": f(G.celular[qual][i][1]),
  }) as React.CSSProperties;

/**
 * O trabalho, no início: uma prancha só, a derrota das quatro etapas. Até
 * 17/10, quatro caixas que se empilhavam ao rolar (as do site de 28/08,
 * pedido do usuário em 03/10), com o número, o nome e a duração; desde o
 * fechamento com o Impeccable (17/10), quase vazias, e o crítico de fora
 * leu o meio do início como "cartões e números". Desde 17/10 (passe 4b,
 * pelo pedido de 16/10: "mesmo que seja contra alguma ata"), o percurso
 * gravado na água: o rumo em bronze, com o sulco do lado oposto à luz da
 * madrugada, as quatro estações com o símbolo da posição (o círculo com o
 * ponto) e as durações como cotas. Não é a trena de O trabalho (a régua dos
 * dias úteis, em escala, reta): aqui, o arco, as cotas e as estações. O
 * texto de cada etapa continua só em O trabalho. Com a ilha PilhaDePassos,
 * saiu o único ouvinte de rolagem do início.
 * No celular (a coluna abaixo de 40 rem), o desenho fica compacto, com os
 * valores das cotas e os números das estações desenhados nele, e as
 * estações viram a lista embaixo, cada uma com a marca inteira ("24 h após o
 * briefing completo", "7 a 15 dias úteis, em geral"). Até o segundo
 * fechamento com o Impeccable (17/10), o valor ficava só no desenho e a
 * unidade só na lista ("dias úteis, em geral", sem o número), e as
 * estações do desenho não tinham número: era preciso ligar uma à outra de
 * memória. Com a letra a 200% (a coluna abaixo de 17 rem), só a lista
 * (app/vidro.css).
 * O título na margem, e não ao centro (até 17/10, centrado, como a
 * fundação, logo abaixo, e o Fim).
 */
export function Passos() {
  return (
    // overflow-x-clip: o rumo passa das bordas da coluna e some na da tela.
    <Secao id="trabalho" tom="escuro" className="overflow-x-clip">
      <Envelope>
        {/* O rótulo, só para o leitor de tela (17/10): à vista, era o sobretítulo (a marca T2). */}
        <p className="sr-only">{passosDoInicio.rotulo}</p>
        <Titulo linhas={trabalho.titulo} />
        <div className="vd-derrota mt-14 md:mt-16">
          <div className="vd-derrota-prancha">
            <Desenho id="mesa" g={G.mesa} p={MESA} />
            <Desenho id="celular" g={G.celular} p={CELULAR} />
            {G.mesa.estacoes.map((_, i) => (
              <span key={i} aria-hidden="true" className="vd-fixo" style={lugar(i, "estacoes")} />
            ))}
            <ol className="vd-derrota-etapas">
              {trabalho.passos.map((passo, i) => {
                const cota = i in G.mesa.valores;
                const marca = (
                  <>
                    <span className="valor font-display tracking-titulo text-numero whitespace-nowrap text-accent tabular-nums">{passo.marca.valor}</span>{" "}
                    <span className="rotulo text-nota text-muted-foreground">{passo.marca.rotulo}</span>
                  </>
                );
                return (
                  <li key={passo.titulo}>
                    <div className="vd-estacao" style={lugar(i, "estacoes")}>
                      {/* Bronze claro (accent), o do texto pequeno no tom escuro. A numeração é a da sequência (11-anti-ia.md, seção 6). */}
                      <p className="font-display text-nota tracking-wide text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                      <h3 className="text-destaque">{passo.titulo}</h3>
                      {!cota && <p className="vd-estacao-marca">{marca}</p>}
                    </div>
                    {cota && (
                      <p className="vd-cota" style={lugar(i, "valores")}>
                        {marca}
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
        <p className="mt-10 md:mt-12">
          <Link href={passosDoInicio.vinculo.destino} className={buttonVariants({ variant: "link", size: "link", className: "max-w-full whitespace-normal" })}>
            {passosDoInicio.vinculo.rotulo}
            <IconeSeta className="size-3.5" />
          </Link>
        </p>
      </Envelope>
    </Secao>
  );
}
