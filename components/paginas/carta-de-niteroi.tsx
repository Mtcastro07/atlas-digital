import { Fragment } from "react";

import { CartaViva } from "@/components/ilhas/carta-de-niteroi";
import { CARTA, LUGARES_NA_CARTA, TERRA } from "@/components/paginas/costa-de-niteroi";
import { aneisDaTerra, comSegundos, emMetros, FOLGA, leituraDoPonto } from "@/components/paginas/leitura-da-carta";
import { figuras, simulador } from "@/conteudo/site";

/**
 * A carta eletrônica de Niterói, a abertura de /para-quem (desde 17/10, a direção final do Atlas Digital, seção 3,
 * item 9; 2.7 e 2.9). A carta impressa e a carta eletrônica são o mesmo desenho, e a lente é a fronteira: fora dela, a
 * terra hachurada pelas ruas do OpenStreetMap em traço de bronze (a gravura: o que já está gravado); dentro dela, as
 * mesmas ruas em ponto de tela (o que a tela calcula agora). A lente fica parada no centro, e a carta desliza sob ela
 * (o arraste, o toque, as setas, as teclas dos bairros); a leitura diz o ponto dela, com a precisão que a escala
 * sustenta, terra ou água, o mais perto dos três bairros dos sites de exemplo e a distância. As réguas de minutos de arco correm nos dois lados
 * da tela (à esquerda e embaixo), e as teclas dos bairros saem da borda da carta à altura do nó deles.
 * No lugar da carta náutica de 16/10 ao lado da lista dos bairros, com a retícula que varria a carta num Lissajous
 * (não media nada, e a leitura dela cobria o nome de Icaraí) e só respondia ao mouse.
 * Este é o SVG de base, do servidor e sem script: a terra, as linhas d'água, a costa, a graticula, as réguas, os nós e
 * a leitura do ponto de partida (a coordenada de Niterói, figuras.coordenadas) já vêm no HTML, e nada pula. Depois da
 * carga, a ilha (ilhas/carta-de-niteroi.tsx) liga as ruas (public/dados/ruas-niteroi.svg, ~39 KB, gerado uma vez por
 * ferramentas/gerar-ruas.mjs, lido uma vez para a folha e para a lente), a lente em canvas e a mão. A escala é a da largura da carta (--l metros nela: 5.140 na
 * mesa, ~6,8 m por px a 1.440), e tudo se posiciona em metros × --m, em CSS (app/digital.css, "a carta de Niterói").
 * A figura é a abertura inteira na mesa, numa subgrade dela (AberturaDePagina com classeDaFigura="lg:contents"): a
 * carta nas colunas 1 a 7, sangrando pela borda da tela, com a altura da janela; a leitura e as camadas sobre ela, no
 * canto de baixo à esquerda; a legenda embaixo do lide. Desde a revisão de 17/10, a tela cabe na janela (até então, o
 * painel ia sob o lide, e a tela passava de 1.200 px: as camadas, a escala e o crédito ficavam abaixo da dobra).
 */

const { exemplos } = figuras.bairros;
const texto = figuras.bairros.carta;

/** O ponto de partida: a coordenada do Atlas, a única do site. */
const [X0, Y0] = emMetros(CARTA, figuras.coordenadas.decimal.latitude, figuras.coordenadas.decimal.longitude);
/** A leitura do ponto de partida, na escala da mesa (a ilha a refaz na escala da tela de quem lê). */
const PARTIDA = leituraDoPonto(CARTA, aneisDaTerra(TERRA), LUGARES_NA_CARTA, X0, Y0, comSegundos(CARTA, 0.15));

const [KX, KY] = [CARTA.largura / (CARTA.leste - CARTA.oeste), CARTA.altura / (CARTA.norte - CARTA.sul)];
const [LARGURA, ALTURA] = [CARTA.largura + 2 * FOLGA, CARTA.altura + 2 * FOLGA];

/** As marcas das réguas a cada 10″ de arco, de uma ponta à outra dos dados: a posição em metros, o comprimento e o
 *  nome do minuto ("22°53′ S"). */
function marcas(de: number, ate: number, metros: (grau: number) => number, lado: string) {
  const lista: { m: number; tamanho: number; nome?: string }[] = [];
  for (let s = Math.ceil((Math.min(de, ate) * 3600) / 10) * 10; s <= Math.max(de, ate) * 3600; s += 10) {
    const minuto = s % 60 === 0;
    const total = Math.round(Math.abs(s) / 60);
    lista.push({
      m: metros(s / 3600),
      tamanho: minuto ? 12 : s % 30 === 0 ? 7 : 4,
      nome: minuto ? `${Math.floor(total / 60)}°${String(total % 60).padStart(2, "0")}′ ${lado}` : undefined,
    });
  }
  return lista;
}
const LATITUDES = marcas(CARTA.sul - FOLGA / KY, CARTA.norte + FOLGA / KY, (lat) => (CARTA.norte - lat) * KY, "S");
const LONGITUDES = marcas(CARTA.oeste - FOLGA / KX, CARTA.leste + FOLGA / KX, (lon) => (lon - CARTA.oeste) * KX, "O");
/** A graticula: um fio por minuto de arco, nos dois sentidos, de borda a borda dos dados. */
const GRATICULA = [
  ...LATITUDES.filter((t) => t.nome).map((t) => `M${-FOLGA} ${t.m.toFixed(0)}H${CARTA.largura + FOLGA}`),
  ...LONGITUDES.filter((t) => t.nome).map((t) => `M${t.m.toFixed(0)} ${-FOLGA}V${CARTA.altura + FOLGA}`),
].join("");

/** Os bairros dos sites de exemplo, em metros, do norte ao sul (a ordem da carta e das teclas). */
const BAIRROS = LUGARES_NA_CARTA.map((l) => ({
  nome: l.nome,
  x: (l.x / 100) * CARTA.largura,
  y: (l.y / 100) * CARTA.altura,
  nicho: exemplos.find((e) => e.bairro === l.nome)?.nicho ?? "",
})).sort((a, b) => a.y - b.y);
/** Na janela deitada (app/digital.css), a escala sai da altura: os metros do nó mais ao norte acima do ponto de partida
 *  (--acima) e do mais ao norte ao mais ao sul (--vao), com o ponto de partida dentro. */
const [NORTE, SUL] = [Math.min(Y0, BAIRROS[0].y), Math.max(Y0, BAIRROS[BAIRROS.length - 1].y)];

/** As linhas d'água: um anel de 14 m (2 · 7) a 60, 140 e 260 m da costa, recortado por máscara (a água fica à mostra). */
const AGUAS = [260, 140, 60];

const px = (n: number) => +n.toFixed(1);

export function CartaDeNiteroi() {
  return (
    <figure className="vd-carta grid gap-y-8 lg:pointer-events-none lg:col-span-12 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:grid-cols-subgrid lg:grid-rows-subgrid lg:self-stretch">
      {/* Sem script, as teclas dos bairros e as camadas não fariam nada: saem, e a carta fica com a leitura do ponto de
          partida. (O @media (scripting: none) não pega o script desligado em todo navegador; o noscript, sim.) */}
      <noscript>
        <style>{".vd-carta-bairros,.vd-carta-camadas{display:none}"}</style>
      </noscript>
      {/* A carta: a região que a mão move (as setas, o arraste); a lente e a leitura dizem o ponto. */}
      <div
        tabIndex={0}
        role="group"
        aria-roledescription="carta"
        aria-label={texto.regiao}
        className="vd-carta-regiao lg:pointer-events-auto lg:col-span-7 lg:col-start-1 lg:row-span-2 lg:row-start-1"
        style={{ "--x0": px(X0), "--y0": px(Y0), "--acima": px(Y0 - NORTE), "--vao": px(SUL - NORTE) } as React.CSSProperties}
      >
        <div aria-hidden="true" className="vd-carta-visor">
          <div className="vd-carta-folha">
            <svg viewBox={`${-FOLGA} ${-FOLGA} ${LARGURA} ${ALTURA}`}>
              <defs>
                <path id="carta-terra" d={TERRA} />
                <mask id="carta-aguas" maskUnits="userSpaceOnUse" x={-FOLGA - 1000} y={-FOLGA - 1000} width={LARGURA + 2000} height={ALTURA + 2000}>
                  <g fill="none" strokeLinejoin="round">
                    {AGUAS.flatMap((d) => [
                      <use key={`${d}+`} href="#carta-terra" stroke="#fff" strokeWidth={2 * (d + 7)} />,
                      <use key={`${d}-`} href="#carta-terra" stroke="#000" strokeWidth={2 * (d - 7)} />,
                    ])}
                  </g>
                </mask>
              </defs>
              <rect x={-FOLGA} y={-FOLGA} width={LARGURA} height={ALTURA} mask="url(#carta-aguas)" className="aguas gravura" />
              <use href="#carta-terra" className="terra" />
              <path d={GRATICULA} className="graus" />
              {/* As ruas chegam depois da carga (a ilha lê public/dados/ruas-niteroi.svg uma vez e põe o traçado aqui e na
                  lente): ~39 KB, fora do caminho do título. */}
              <path data-ruas="ruas-menores" vectorEffect="non-scaling-stroke" className="ruas-menores gravura" />
              <path data-ruas="ruas-maiores" vectorEffect="non-scaling-stroke" className="ruas-maiores gravura" />
              <use href="#carta-terra" className="costa gravura" />
            </svg>
          </div>
        </div>
        {/* Os nós dos bairros, numa folha à parte, fora da máscara que dissolve a carta: o ponto não se apaga na borda. */}
        <div aria-hidden="true" className="vd-carta-folha">
          {BAIRROS.map((b) => (
            <span key={b.nome} data-no={b.nome} className="vd-carta-no" style={{ "--x": px(b.x), "--y": px(b.y) } as React.CSSProperties} />
          ))}
        </div>

        {/* As réguas de minutos de arco, nos dois lados da tela: a latitude à esquerda, a longitude embaixo. */}
        <div aria-hidden="true" className="vd-carta-regua vd-carta-regua-lat">
          <div>
            <svg viewBox={`0 ${-FOLGA} 44 ${ALTURA}`} preserveAspectRatio="none">
              <path d={LATITUDES.map((t) => `M0 ${t.m.toFixed(0)}H${t.tamanho}`).join("")} />
            </svg>
            {/* O espaço entre os nomes: no HTML, sem ele, o robô lia "22°55′ S22°54′ S" (texto-do-robo.mjs). */}
            {LATITUDES.filter((t) => t.nome).map((t) => (
              <Fragment key={t.nome}>
                <span style={{ "--y": px(t.m) } as React.CSSProperties}>{t.nome}</span>{" "}
              </Fragment>
            ))}
          </div>
        </div>
        <div aria-hidden="true" className="vd-carta-regua vd-carta-regua-lon">
          <div>
            <svg viewBox={`${-FOLGA} 0 ${LARGURA} 44`} preserveAspectRatio="none">
              <path d={LONGITUDES.map((t) => `M${t.m.toFixed(0)} 44V${44 - t.tamanho}`).join("")} />
            </svg>
            {LONGITUDES.filter((t) => t.nome).map((t) => (
              <Fragment key={t.nome}>
                <span style={{ "--x": px(t.m) } as React.CSSProperties}>{t.nome}</span>{" "}
              </Fragment>
            ))}
          </div>
        </div>

        {/* A lente: o canvas dos pontos (da ilha) e o anel, parado no centro. */}
        <CartaViva />
        <div aria-hidden="true" className="vd-carta-mira" />

        {/* A escala gráfica, nunca a fração: 1 km na escala da carta. */}
        <div aria-hidden="true" className="vd-carta-escala">
          <span>0</span> <span>500 m</span> <span>1 km</span>
        </div>

        {/* As teclas dos bairros, saindo da borda da carta à altura do nó; levam a lente até ele. */}
        <ul className="vd-carta-bairros">
          {BAIRROS.map((b) => (
            <li key={b.nome} style={{ "--y": px(b.y) } as React.CSSProperties}>
              <button type="button" data-bairro={b.nome} aria-pressed="false">
                <span aria-hidden="true" className="marca" />
                <span className="flex flex-col">
                  <span className="sr-only">{texto.irAoBairro} </span>
                  <span className="nome">{b.nome}</span>
                  <span className="sr-only">, </span>
                  <span className="nicho">{b.nicho}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* O painel: a leitura sob a lente e as camadas. Na mesa, uma camada do tamanho da carta, por cima dela (sem pesar
          na altura das linhas da grade): as camadas no canto de cima, à esquerda, sob o cabeçalho; a leitura no de baixo,
          à esquerda do nó de Icaraí no ponto de partida (app/digital.css). Assim a tela cabe na janela, e a coluna do
          título fica só com o título, o lide e a legenda. Só as camadas recebem a mão; o resto deixa o arraste passar à
          carta. No celular, embaixo da carta. */}
      <div className="vd-carta-painel lg:relative lg:z-[1] lg:col-span-7 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-stretch">
        <div
          aria-hidden="true"
          className="vd-leitura"
          data-rotulo={texto.leitura.rotulo}
          data-terra={texto.leitura.terra}
          data-agua={texto.leitura.agua}
          data-no={texto.leitura.no}
        >
          <p className="rotulo">
            {texto.leitura.rotulo}, <span data-leitura="onde">{PARTIDA.terra ? texto.leitura.terra : texto.leitura.agua}</span>
          </p>
          <p className="vd-carta-coordenada">
            <span data-leitura="latitude">{PARTIDA.latitude}</span> <span data-leitura="longitude">{PARTIDA.longitude}</span>
          </p>
          <p className="vd-carta-perto" data-leitura="bairro">
            {PARTIDA.bairro.km ? `${PARTIDA.bairro.nome} a ${PARTIDA.bairro.km} km` : `${texto.leitura.no} ${PARTIDA.bairro.nome}`}
          </p>
          <p className="carimbo">{texto.leitura.carimbo}</p>
        </div>
        <p className="sr-only" role="status" data-leitura="frase">
          {texto.leitura.rotulo}: {PARTIDA.frase}
        </p>

        <div role="group" aria-label={texto.rotuloDasCamadas} className="vd-carta-camadas">
          {texto.camadas.map((c) => (
            <button key={c.id} type="button" role="switch" aria-checked="true" data-camada={c.id}>
              <span aria-hidden="true" className="estado" />
              {c.rotulo}
            </button>
          ))}
        </div>
      </div>

      {/* A legenda de carta, filha direta da figura (o nome dela para o leitor de tela): na mesa, fecha a coluna do
          título, embaixo. */}
      <figcaption className="vd-legenda-de-carta lg:pointer-events-auto lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:self-end">
        <strong>{texto.legenda.termo}</strong> {texto.legenda.texto}{" "}
        <a href={texto.legenda.licenca} target="_blank" rel="noopener">
          {texto.legenda.credito}
          <span className="sr-only"> {simulador.abreEmNovaAba}</span>
        </a>
      </figcaption>
    </figure>
  );
}
