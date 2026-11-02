import { fraseDoMapa, primeiroDia, visita } from "@/conteudo/paginas/o-trabalho";

// Os objetos das etapas de O trabalho (R10, 28/10; em escala de cena desde 02/11): um por etapa, cada um tirado
// de um dado do kit, sem foto nem exemplo inventado. O CSS mora em app/paginas/o-trabalho.css (.ot-*).

/** A marca do campo obrigatório, desenhada (o ● não existe no Inter do site, e o aparelho o trocaria pela letra dele). */
export function MarcaObrigatoria() {
  return <b aria-hidden="true" className="ot-marca" />;
}

/**
 * Etapa 1: o formulário da visita, em trecho. Os campos bloqueantes, com as perguntas literais do kit
 * (producao/esteira/02-briefing.md), numa folha de ficha sobre o bloco: a borda da folha de baixo, para o leste (a luz
 * da tarde). O último campo liga a etapa 1 à 2: o rascunho tem data, hora e canal prometidos na visita. A passiva P23: a
 * folha mexe devagar sobre a mesa, e a caneta passa pelos campos, de cima a baixo: o formulário preenchido ali, na visita.
 */
export function FichaDaVisita({ idDaRegra }: { idDaRegra: string }) {
  return (
    <figure aria-describedby={idDaRegra} className="ot-ficha" data-ambiente data-passiva="o-trabalho-ficha">
      <div className="ot-ficha-folha mov-passiva">
        <p className="ot-ficha-titulo">
          {visita.titulo} <span>{visita.recorte}</span>
        </p>
        <div className="ot-ficha-campos">
        <span aria-hidden="true" className="ot-ficha-caneta mov-passiva" />
        <dl>
          {[...visita.campos, visita.promessa].map(({ campo, pergunta }) => (
            <div key={campo} className={campo === visita.promessa.campo ? "ot-ficha-promessa" : undefined}>
              <dt>
                <MarcaObrigatoria />
                <span className="sr-only">Obrigatório: </span>
                {campo}
              </dt>
              <dd>{pergunta}</dd>
            </div>
          ))}
        </dl>
        </div>
      </div>
    </figure>
  );
}

/**
 * Etapa 2: o mostrador das 24 horas (R10, P10; data-passiva="o-trabalho-relogio"), o objeto da cena escura: o círculo, 24
 * traços (maiores a cada seis), as quatro horas da régua e um ponteiro que dá uma volta em 24 s, linear, seguido de um
 * rastro de luz. O mostrador é desenho parado; só o ponteiro e o rastro, de HTML, giram (o filho de SVG repintaria a cada
 * quadro). Em repouso, nas 24 h. Decorativo: o texto ao lado diz o prazo.
 */
export function Relogio() {
  return (
    <div aria-hidden="true" data-passiva="o-trabalho-relogio" className="ot-relogio">
      <svg viewBox="0 0 32 32" className="absolute inset-0 size-full overflow-visible">
        <circle cx="16" cy="16" r="15.4" fill="none" stroke="currentColor" strokeWidth="0.16" />
        {Array.from({ length: 24 }, (_, h) => (
          <line
            key={h}
            x1="16"
            y1="1.6"
            x2="16"
            y2={h % 6 === 0 ? 3.4 : 2.4}
            stroke="currentColor"
            strokeWidth={h % 6 === 0 ? 0.28 : 0.12}
            strokeLinecap="round"
            transform={`rotate(${h * 15} 16 16)`}
          />
        ))}
        {primeiroDia.escala.slice(0, 4).map((h, i) => {
          const a = (i * Math.PI) / 2;
          return (
            <text key={h} x={(16 + 10.2 * Math.sin(a)).toFixed(2)} y={(16.5 - 10.2 * Math.cos(a)).toFixed(2)} textAnchor="middle" className="ot-relogio-hora">
              {h}
            </text>
          );
        })}
      </svg>
      <span className="ot-relogio-rastro mov-passiva" />
      <span className="ot-relogio-ponteiro mov-passiva" />
    </div>
  );
}

/**
 * Etapa 3: as duas rodadas (a passiva P24): dois aros em volta do número, cada um com a sua seta, em sentidos opostos.
 * Cada aro é um <svg> inteiro, numa camada própria. Decorativo: o texto ao lado diz "2 rodadas".
 */
export function Rodadas() {
  return (
    <div aria-hidden="true" className="ot-rodadas" data-ambiente data-passiva="o-trabalho-rodadas">
      <svg viewBox="0 0 100 100" className="ot-rodadas-aro ot-rodadas-fora mov-passiva">
        <path d="M50 3a47 47 0 1 1-33 13.7" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        <path d="m16.2 8.6.6 8.5 8.5-.6" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg viewBox="0 0 100 100" className="ot-rodadas-aro ot-rodadas-dentro mov-passiva">
        <path d="M50 3a47 47 0 1 1-33 13.7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="m16.2 8.6.6 8.5 8.5-.6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="ot-rodadas-numero">2</span>
    </div>
  );
}

/**
 * Etapa 2: o primeiro dia, em horas: a mesma trena da abertura, noutra escala. A barra de bronze vai do briefing
 * completo (0 h) ao link (24 h), um traço por hora, maior a cada seis. A constante da página (.mov-constante): sob o
 * ponteiro, um cursor percorre as 24 h, e o bronze enche a barra atrás dele. Em repouso, a barra cheia e o cursor nas 24 h: o dado sempre à vista.
 */
export function PrimeiroDia() {
  const [inicio, fim] = primeiroDia.pontas;
  return (
    <figure className="ot-dia">
      <p className="ot-dia-pontas">
        <span>{inicio}</span>
        <span>{fim}</span>
      </p>
      <div aria-hidden="true" className="ot-dia-regua">
        <span className="ot-dia-barra" />
        <span className="ot-dia-falta mov-constante" />
        <span className="ot-dia-tracos" />
        <span className="ot-dia-trilho mov-constante" />
      </div>
      <p aria-hidden="true" className="ot-dia-escala">
        {primeiroDia.escala.map((h) => (
          <span key={h}>{h}</span>
        ))}
      </p>
    </figure>
  );
}

/**
 * Etapa 4: o mapa do site (o sitemap.xml), numa janela em que as linhas correm (a passiva P25), montado das mesmas datas
 * que o alimentam (ultimaAlteracao, lib/datas-das-paginas.ts), na forma que o sitemap.xml servido usa. A linha desta
 * página, em bronze. Sem data no build (sem git, ou clone raso), a janela e a frase não aparecem: data nenhuma é melhor
 * que data errada. O código mora no objeto, sem ficha; a frase para o leigo vem embaixo.
 */
export function MapaDoSite({ linhas }: { linhas: { loc: string; lastmod: string; estaPagina: boolean }[] }) {
  const urls = linhas.map(({ loc, lastmod, estaPagina }) => (
    <span key={loc} className={estaPagina ? "ot-mapa-url ot-mapa-esta" : "ot-mapa-url"}>
      {`<url>\n<loc>${loc}</loc>\n<lastmod>${lastmod}</lastmod>\n</url>\n`}
    </span>
  ));
  return (
    <figure className="ot-mapa">
      <div className="ot-mapa-janela" data-ambiente data-passiva="o-trabalho-mapa" aria-hidden="true">
        <code className="ot-mapa-corre mov-passiva">
          {urls}
          {urls}
        </code>
      </div>
      <figcaption>{fraseDoMapa}</figcaption>
    </figure>
  );
}
