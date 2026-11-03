import { Envelope, Secao } from "@/components/estrutura";
import { FichaDaVisita, MarcaObrigatoria, PrimeiroDia, Relogio, Rodadas, SiteNoAr } from "@/components/paginas/o-trabalho/objetos";
import { contato } from "@/conteudo/contato";
import { etapas, fraseDaAprovacao, rotuloDasEtapas, textos, visita } from "@/conteudo/paginas/o-trabalho";
import { paginas } from "@/conteudo/site";
import { ultimaAlteracao } from "@/lib/datas-das-paginas";

/** O nome da etapa e o prazo dela: o valor com a unidade, grande, e o resto da frase. */
function Cabeca({ i, tamanho = "" }: { i: number; tamanho?: string }) {
  const etapa = etapas[i];
  return (
    <>
      <h2 className="ot-nome">{etapa.titulo}</h2>
      <p className="ot-prazo">
        <span className={`ot-valor ${tamanho}`}>{etapa.valor}</span>
        {etapa.resto}
      </p>
    </>
  );
}

/**
 * As quatro etapas (R10, acabamento, 02/11; até então, um livro-razão: quatro linhas de esqueleto igual, em papel claro).
 * Cada etapa tem a sua composição, e um objeto tirado de um dado do kit, grande o bastante para tomar a tela:
 * - a visita, no papel: a folha do formulário, na mesa, com a caneta que passa pelos campos (a passiva P23);
 * - o rascunho, a cena escura de largura total: as 24 h em letra de cena e o mostrador das 24 horas, de 480 px na mesa
 *   (a passiva P10; até 02/11, 28 px), com a barra das 24 h embaixo (a constante da página);
 * - as revisões, no papel: as duas rodadas em volta do número (a passiva P24) e a frase da aprovação na largura toda;
 * - a publicação, na pedra: o site no ar, numa janela de navegador, a linha desta página em bronze (a passiva P25).
 * O prazo e o texto são os do site (`trabalho.passos`; conteudo/paginas/o-trabalho.ts): "briefing" e "rascunho" sem
 * glosa (D4), "7 a 15 dias úteis, em geral" (D10). Cada objeto é o [data-ambiente] da sua passiva.
 */
export function Trabalho() {
  const linhas = paginas.flatMap((p) => {
    const data = ultimaAlteracao(p.caminho);
    return data ? [{ nome: p.menu, data: data.split("-").reverse().join("."), estaPagina: p.caminho === "/o-trabalho" }] : [];
  });
  return (
    <Secao id="trabalho" tom="claro" aria-label={rotuloDasEtapas} className="py-0 md:py-0">
      <ol>
        <li className="ot-visita">
          <Envelope className="ot-visita-grade">
            <div>
              <Cabeca i={0} tamanho="ot-valor-grande" />
              <p className="ot-corpo">{textos[0]}</p>
              <p id="regra-da-visita" className="ot-regra">
                {visita.regra[0]} <MarcaObrigatoria />
                <span className="sr-only">marca</span> {visita.regra[1]}
              </p>
            </div>
            <FichaDaVisita idDaRegra="regra-da-visita" />
          </Envelope>
        </li>

        <li className="ot-etapa-dia vd-materia" data-tom="escuro" data-ambiente>
          <Envelope className="ot-dia-grade">
            <div>
              <Cabeca i={1} tamanho="ot-valor-cena" />
              <p className="ot-corpo">{textos[1]}</p>
              <PrimeiroDia />
            </div>
            <Relogio />
          </Envelope>
        </li>

        <li className="ot-revisoes">
          <Envelope className="ot-revisoes-grade">
            <Rodadas />
            <div>
              <Cabeca i={2} tamanho="ot-valor-grande" />
              <p className="ot-corpo">{textos[2]}</p>
            </div>
            <p className="ot-frase">{fraseDaAprovacao}</p>
          </Envelope>
        </li>

        <li className="ot-publicacao vd-materia" data-tom="pedra">
          <Envelope className="ot-publicacao-grade">
            <div>
              <Cabeca i={3} tamanho="ot-valor-grande" />
              <p className="ot-corpo">{textos[3]}</p>
            </div>
            {linhas.length > 0 && <SiteNoAr endereco={new URL(contato.url).host} linhas={linhas} />}
          </Envelope>
        </li>
      </ol>
    </Secao>
  );
}
