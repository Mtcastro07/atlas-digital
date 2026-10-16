import Link from "next/link";

import { AcaoWhatsApp, metadadosDe, paginaDe } from "@/components/demos/odontologia/pecas";
import { PlanoDeSessoes } from "@/components/ilhas/demos/odontologia/plano-de-sessoes";
import { avisoDeValores, mapa, regioes, ressalvaDasSessoes, tratamentos, tratamentosPagina } from "@/conteudo/demos/odontologia";

export const metadata = metadadosDe("tratamentos");

const fraseDa = (id: string) => regioes.find((r) => r.id === id)!.frase;

/**
 * Tratamentos: o plano de sessões, aberto pelo mapa dos dentes, a funcionalidade 2 do Completo
 * (producao/esteira/nichos/odontologia.md, seção 5.2). A página é o prontuário que abre (o momento dela): a capa da
 * pasta gira e mostra a ficha, com o título na etiqueta da pasta. Na ficha, o odontograma (a placa de cerâmica, quase
 * plana, pinta a região escolhida) e os seis tratamentos, com as sessões e os intervalos, nenhum valor. A lista inteira
 * vem do servidor e basta sem script; a ilha só filtra por região, e leva a região escolhida ao pedido de avaliação.
 */
export default function Tratamentos() {
  const pagina = paginaDe("tratamentos");
  return (
    <>
      <section aria-labelledby="titulo" className="od-cena od-prontuario" data-tinta="escura">
        <span aria-hidden="true" className="od-prontuario-capa" />
        <div className="od-largura">
          <header className="od-prontuario-etiqueta">
            <h1 id="titulo" className="od-titulo-grande">
              {pagina.titulo}
            </h1>
            <p className="od-lide">{tratamentosPagina.lide}</p>
          </header>
          <div className="od-prontuario-ficha" aria-label={tratamentosPagina.rotuloDaLista} role="group">
            <PlanoDeSessoes
              regioes={regioes.map(({ id, nome, frase }) => ({ id, nome, frase }))}
              tratamentos={tratamentos.map(({ id, regioes: r, comArtigo }) => ({ id, regioes: r, comArtigo }))}
              destino={paginaDe("avaliacao").caminho}
              cabeca={
                <>
                  <span>{tratamentosPagina.mapa.cabeca}</span>
                  <span>{mapa.numeracao}</span>
                </>
              }
              textos={{
                legenda: tratamentosPagina.mapa.legenda,
                todas: tratamentosPagina.mapa.todas,
                ajuda: tratamentosPagina.mapa.ajuda,
                todasContagem: tratamentosPagina.todasContagem,
                nenhumFora: tratamentosPagina.nenhumFora,
                nenhumForaInclusive: tratamentosPagina.nenhumForaInclusive,
                soFora: tratamentosPagina.soFora,
                soForaVarios: tratamentosPagina.soForaVarios,
                seguir: tratamentosPagina.pedirComRegiao,
                legendas: mapa.legendas,
              }}
            >
              <ul className="od-plano-lista">
                {tratamentos.map((t) => (
                  <li key={t.id} data-regioes={t.regioes.join(" ")} data-linha-da-ficha className="od-plano-linha">
                    <div>
                      <h2 className="od-plano-nome">
                        <Link href={paginaDe(t.id).caminho} className="od-plano-vinculo">
                          {t.nome}
                        </Link>
                      </h2>
                      <p className="od-plano-frase">{t.umaFrase}</p>
                      <p className="od-plano-regioes">
                        {t.regioes.length === regioes.length ? tratamentosPagina.regioesTodas : `${tratamentosPagina.regioesRotulo} ${t.regioes.map(fraseDa).join("; ")}.`}
                      </p>
                    </div>
                    <p className="od-plano-sessoes">
                      <span className="od-plano-numero">{t.numero}</span> <span>{t.unidade}</span>
                      <span className="od-plano-intervalo">{t.intervalo ? `${tratamentosPagina.intervalo} ${t.intervalo}` : tratamentosPagina.semIntervalo}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </PlanoDeSessoes>
          </div>
        </div>
      </section>
      <section aria-label={tratamentosPagina.escolher} className="od-largura od-ressalva">
        <p>{ressalvaDasSessoes}</p>
        <p className="od-ressalva-nota">{avisoDeValores}</p>
        <p className="od-ressalva-nota">{tratamentosPagina.encaminha}</p>
        <div className="od-ressalva-acoes">
          <AcaoWhatsApp />
          <Link href={paginaDe("avaliacao").caminho} className="od-lapis">
            {tratamentosPagina.escolher}
          </Link>
        </div>
      </section>
    </>
  );
}
