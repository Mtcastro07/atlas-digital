import Link from "next/link";

import { Envelope, Secao } from "@/components/estrutura";
import { PecaDoLogotipo } from "@/components/ilhas/peca-do-logotipo";
import { CartaCeleste } from "@/components/paginas/o-atlas/carta-celeste";
import { Titulo } from "@/components/tipografia";
import { origem } from "@/conteudo/paginas/o-atlas";
import { quemFaz } from "@/conteudo/site";

/**
 * A origem do Atlas (desde 28/10, R10; CONTRATO.md, 3.6), em dois tempos, um por tela.
 * - **A história:** "Da sala de aula ao balcão." e os quatro capítulos (pedido do usuário, 01/10), cada um num
 *   parágrafo, com o título corrido na frase, em duas tintas (D6, só aqui no site): o h3 em Archivo 500, na tinta
 *   plena, com o ponto posto pelo estilo, e o texto em Inter, no apagado, no degrau do lide. Ao lado do título, na
 *   coluna que ficava vazia (no celular, acima dos capítulos), a carta celeste dos capítulos (a passiva P12). Até
 *   28/10, os capítulos eram uma linha do tempo de círculos numerados (01 a 04), com o fio entre eles.
 * - **O nome:** "Atlas sustenta o céu." e o mito (conteudo/site.ts, quemFaz.nome, palavra por palavra), no eixo da
 *   página, com o logotipo em 3D em pé sobre o papel (a ilha PecaDoLogotipo). Até 28/10, o nome morava numa chapa navy
 *   de vidro líquido em "Quem faz", com o A grande ao fundo.
 * O texto é o de conteudo/site.ts (quemFaz.historia e quemFaz.nome); o novo, em conteudo/paginas/o-atlas.ts.
 */
export function Historia() {
  const { historia, nome } = quemFaz;
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

        {/* Tempo 2: o nome e a peça. O [data-ambiente] dá à constante da peça (a flutuação) a
            parada fora da tela. */}
        <div className="vd-origem-nome" data-ambiente data-passiva="o-atlas-peca">
          <h3 className="vd-origem-mito-titulo">{nome.titulo}</h3>
          <p className="vd-origem-mito">{nome.texto}</p>
          <PecaDoLogotipo rotulo={origem.peca} />
        </div>
      </Envelope>
    </Secao>
  );
}
