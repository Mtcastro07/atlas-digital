import Link from "next/link";

import { AcaoWhatsApp, metadadosDe, paginaDe } from "@/components/demos/odontologia/pecas";
import { guiasPagina, tratamentos } from "@/conteudo/demos/odontologia";

export const metadata = metadadosDe("guias");

/**
 * As guias: o conteúdo editorial do Completo (producao/esteira/03-planos.md, seção 5.3; nicho, seção 4.1, "Guias"). O
 * que levar, os cuidados depois de cada tratamento e as perguntas comuns, sem consulta nem diagnóstico pela página
 * (Código de Ética Odontológica, art. 44, V); o que acontece na avaliação fica na página dela. As perguntas são as
 * linhas da ficha: o traço da linha fechada vira o tique a lápis na aberta. Em <details> nativos: abrem pelo teclado e sem script, e a busca do navegador as
 * encontra.
 */
export default function Guias() {
  const pagina = paginaDe("guias");
  return (
    <>
      <section aria-labelledby="titulo" className="od-cena od-guias">
        <div className="od-largura od-guias-grade">
          <div>
            <h1 id="titulo" className="od-titulo-de-cena">
              {pagina.titulo}
            </h1>
            <p className="od-lide">{guiasPagina.lide}</p>
            <div className="od-levar">
              <h2 className="od-escolha-legenda">{guiasPagina.levar.titulo}</h2>
              <p>{guiasPagina.levar.texto}</p>
              <p className="od-levar-duracao">{guiasPagina.duracao}</p>
            </div>
          </div>
          <div className="od-guias-perguntas">
            <h2 id="perguntas" className="od-escolha-legenda">
              {guiasPagina.perguntas.titulo}
            </h2>
            <div className="od-perguntas">
              {guiasPagina.perguntas.itens.map((p) => (
                <details key={p.pergunta} className="od-pergunta">
                  <summary>
                    <span className="od-pergunta-texto">{p.pergunta}</span>
                    <span aria-hidden="true" className="od-tique-de-lapis">
                      <svg viewBox="0 0 24 24">
                        <rect className="od-tique-fechado" x="3.5" y="5.5" width="13" height="13" rx="2" />
                        <path className="od-tique-aberto" d="M4 13.5 9.5 19 21 4" />
                      </svg>
                    </span>
                  </summary>
                  <p className="od-pergunta-resposta">{p.resposta}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Os cuidados de cada tratamento: o mesmo texto da página dele, aqui reunidos, com o vínculo para a sequência. */}
      <section aria-labelledby="cuidados" className="od-largura od-cuidados">
        <h2 id="cuidados" className="od-titulo-de-cena">
          {guiasPagina.cuidados}
        </h2>
        <dl className="od-cuidados-lista">
          {tratamentos.map((t) => (
            <div key={t.id}>
              <dt>
                <Link href={paginaDe(t.id).caminho} className="od-lapis">
                  {t.nome}
                </Link>
              </dt>
              <dd>{t.cuidados}</dd>
            </div>
          ))}
        </dl>
        <AcaoWhatsApp className="od-clinica-acao" />
      </section>
    </>
  );
}
