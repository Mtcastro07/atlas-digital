import Link from "next/link";

import { Envelope, Secao } from "@/components/estrutura";
import { PecaDoLogotipo, type LinhaDoGlobo, type Pedaco } from "@/components/ilhas/peca-do-logotipo";
import { CartaCeleste } from "@/components/paginas/o-atlas/carta-celeste";
import { Titulo } from "@/components/tipografia";
import { origem } from "@/conteudo/paginas/o-atlas";
import { quemFaz } from "@/conteudo/site";
import { linhasDo, trechoDe } from "@/lib/trecho";

/**
 * Uma linha do globo do logotipo em pedaços, com a tinta de cada um (C-codigo.md, 3.3): o elemento na tinta do texto,
 * a chave na água rasa, o valor no bronze-sombra, a pontuação no apagado. Também os atributos, para a peça se desenhar
 * pela própria linha, e o pedaço em que ela desce no celular (antes do terceiro atributo). Uma linha que não tenha a
 * forma <elemento chave="valor" … /> para o build: o código mostrado é sempre o do arquivo.
 */
function linhaDoGlobo(linha: string, traducao: string): LinhaDoGlobo {
  const forma = /^<([a-z]+)((?:\s+[a-z0-9]+="[^"]*")+)\s*\/>$/;
  const casou = forma.exec(linha);
  if (!casou) throw new Error(`historia: a linha ${JSON.stringify(linha)} não tem a forma de um elemento SVG`);
  const [, elemento, resto] = casou;
  const atributos: Record<string, string> = {};
  const pedacos: Pedaco[] = [{ texto: `<${elemento}`, papel: "nome" }];
  let quebra = 0;
  for (const [, espaco, chave, valor] of resto.matchAll(/(\s+)([a-z0-9]+)="([^"]*)"/g)) {
    atributos[chave] = valor;
    if (Object.keys(atributos).length === 3) quebra = pedacos.length;
    pedacos.push({ texto: espaco, papel: null }, { texto: chave, papel: "chave" }, { texto: "=", papel: "apagado" }, { texto: `"${valor}"`, papel: "valor" });
  }
  pedacos.push({ texto: linha.slice(linha.lastIndexOf('"') + 1, -2), papel: null }, { texto: "/>", papel: "apagado" });
  if (pedacos.map((p) => p.texto).join("") !== linha) throw new Error(`historia: a linha ${JSON.stringify(linha)} não se remonta`);
  return { elemento, atributos, pedacos, quebra: quebra || pedacos.length, traducao };
}

/**
 * A origem do Atlas (desde 28/10, R10; CONTRATO.md, 3.6), em dois tempos, um por tela.
 * - **A história:** "Da sala de aula ao balcão." e os quatro capítulos (pedido do usuário, 01/10), cada um num
 *   parágrafo, com o título corrido na frase, em duas tintas (D6, só aqui no site): o h3 em Archivo 500, na tinta
 *   plena, com o ponto posto pelo estilo, e o texto em Inter, no apagado, no degrau do lide. Ao lado do título, na
 *   coluna que ficava vazia (no celular, acima dos capítulos), a carta celeste dos capítulos (a passiva P12). Até
 *   28/10, os capítulos eram uma linha do tempo de círculos numerados (01 a 04), com o fio entre eles.
 * - **O nome:** "Atlas sustenta o céu." e o mito (conteudo/site.ts, quemFaz.nome, palavra por palavra), no eixo da
 *   página, com o logotipo em 3D em pé sobre o papel e, logo abaixo, as quatro linhas de código que desenham o globo,
 *   lidas no build de components/marca/logotipo.tsx (a ilha PecaDoLogotipo). Até 28/10, o nome morava numa chapa navy
 *   de vidro líquido em "Quem faz", com o A grande ao fundo.
 * O texto é o de conteudo/site.ts (quemFaz.historia e quemFaz.nome); o novo, em conteudo/paginas/o-atlas.ts.
 */
export function Historia() {
  const { historia, nome } = quemFaz;
  const trecho = trechoDe("components/marca/logotipo.tsx", '<circle cx="163" cy="24" r="21.75" />', 4);
  const linhas = trecho.linhas.map((linha, i) => linhaDoGlobo(linha, origem.traducoes[i]));
  const arquivo = trecho.arquivo.split("/").at(-1);
  return (
    <Secao aria-labelledby="historia" tom="claro" className="vd-origem">
      <Envelope>
        {/* Tempo 1: a história. */}
        <div className="vd-origem-historia">
          {/* O rótulo, só para o leitor de tela (17/10): à vista, era o sobretítulo (a marca T2). */}
          <p className="sr-only">{historia.rotulo}</p>
          <Titulo id="historia" linhas={historia.titulo} className="vd-origem-titulo" />
          <CartaCeleste className="vd-origem-carta" />
          <ol className="vd-capitulos">
            {historia.capitulos.map((capitulo, i) => (
              <li key={capitulo.numero} className="vd-capitulo">
                <h3>{capitulo.titulo}</h3> <p>{capitulo.texto}</p>
                {i === historia.capitulos.length - 1 && (
                  <>
                    <br />
                    <Link href={origem.condicao.destino} className="vd-capitulo-vinculo">
                      {origem.condicao.rotulo}
                    </Link>
                  </>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Tempo 2: o nome, a peça e o código que a desenha. O [data-ambiente] dá à constante da peça (a flutuação) a
            parada fora da tela. */}
        <div className="vd-origem-nome" data-ambiente data-passiva="o-atlas-peca">
          <h3 className="vd-origem-mito-titulo">{nome.titulo}</h3>
          <p className="vd-origem-mito">{nome.texto}</p>
          <PecaDoLogotipo
            linhas={linhas}
            ponte={origem.ponte}
            rotulo={origem.peca}
            legenda={
              <>
                Trecho do arquivo do logotipo deste site, <code>{arquivo}</code>, {linhasDo(trecho)}.
              </>
            }
          />
        </div>
      </Envelope>
    </Secao>
  );
}
