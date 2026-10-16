import Link from "next/link";

import { AcaoWhatsApp, metadadosDe, paginaDe } from "@/components/demos/odontologia/pecas";
import { equipe, equipePagina, tratamentoDe } from "@/conteudo/demos/odontologia";

export const metadata = metadadosDe("equipe");

/**
 * A equipe e a clínica (producao/esteira/nichos/odontologia.md, seção 4.1). O momento desta página: o corredor dos
 * consultórios, no escuro, com a placa da primeira porta (a da responsável técnica) acesa pelo refletor ao abrir a
 * página; as outras respondem à mão. Na placa, o nome gravado, a profissão e a inscrição no CRO-RJ; ao lado, na parede, o título (a especialidade
 * só com o título registrado), a formação e o que atende. A relação que o Código de Ética Odontológica pede (art. 43,
 * § 2º) é a própria fila das portas: o especialista com o título, o clínico geral com a área de atuação. A clínica, sem
 * foto (site de demonstração): a estrutura, a biossegurança, o acesso.
 */
export default function Equipe() {
  const pagina = paginaDe("equipe");
  return (
    <>
      <section aria-labelledby="titulo" className="od-cena od-equipe" data-tinta="escura">
        <div className="od-largura">
          <h1 id="titulo" className="od-titulo-grande">
            {pagina.titulo}
          </h1>
          <p className="od-lide">{equipePagina.lide}</p>
          <ul className="od-equipe-portas">
            {equipe.map((d, i) => (
              <li key={d.id} id={d.id}>
                {/* A primeira porta, a da responsável técnica, é a que o refletor acende ao abrir (as outras, em repouso:
                    a cascata de três luzes iguais, abaixo da dobra, saiu em 14.10.2026). */}
                <div data-ceramica className={i === 0 ? "od-placa od-placa-acesa" : "od-placa"}>
                  <h2 className="od-placa-nome">{d.nome}</h2>
                  <p className="od-placa-cro">
                    {d.profissao}, <span className="whitespace-nowrap">{d.cro}</span>
                  </p>
                </div>
                <div>
                  <p className="od-sala-titulo">{d.funcao ? `${d.titulo}. ${d.funcao}.` : `${d.titulo}.`}</p>
                  <dl className="od-sala-ficha">
                    <div>
                      <dt>{equipePagina.formacao}</dt>
                      <dd>{d.formacao}</dd>
                    </div>
                    <div>
                      <dt>{d.titulo.startsWith("Especialista") ? equipePagina.atende : equipePagina.area}</dt>
                      <dd>
                        <ul>
                          {d.atende.map((id) => (
                            <li key={id}>
                              <Link href={paginaDe(id).caminho} className="od-lapis">
                                {tratamentoDe(id).nome}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
          <p className="od-equipe-nota">{equipePagina.nota}</p>
        </div>
      </section>

      <section aria-labelledby="clinica" className="od-largura od-clinica">
        <h2 id="clinica" className="od-titulo-de-cena">
          {equipePagina.clinica.titulo}
        </h2>
        <dl className="od-clinica-itens">
          {equipePagina.clinica.itens.map((item) => (
            <div key={item.rotulo}>
              <dt>{item.rotulo}</dt>
              <dd>{item.texto}</dd>
            </div>
          ))}
        </dl>
        <AcaoWhatsApp className="od-clinica-acao" />
      </section>
    </>
  );
}
