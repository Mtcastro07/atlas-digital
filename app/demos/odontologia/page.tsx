import Link from "next/link";

import { MapaDosDentes } from "@/components/demos/odontologia/mapa-dos-dentes";
import { AcaoWhatsApp, Ancora, dentesDas, enderecoEmLinhas, metadadosDe, paginaDe, Telefone } from "@/components/demos/odontologia/pecas";
import { PlacaDoHorario } from "@/components/demos/odontologia/placa";
import { EstadoDaClinica } from "@/components/ilhas/demos/odontologia/estado-da-clinica";
import { SetasDaGaleria } from "@/components/ilhas/demos/setas-da-galeria";
import {
  ausencias,
  capa,
  cartoesDeRetorno,
  chamada,
  equipe,
  expediente,
  fechamentos,
  ficha,
  mapa,
  odontologiaSite as site,
  percurso,
  porta,
  quandoEOnde,
  quemAtende,
  regioes,
  tratamentoPagina,
  tratamentos,
  urgencia,
} from "@/conteudo/demos/odontologia";

export const metadata = metadadosDe("inicio");

/**
 * O início da Odontologia Boa Viagem: o prontuário aberto sob o refletor, em sete cenas (identidade, seção 9, o roteiro
 * aprovado em 09.10.2026). A folha clara extrema: o papel domina, em escala de cartaz e peso leve, com um bloco de cor
 * forte, a chamada no vermelho do lápis. A arcada de cerâmica (o palco, no layout) atravessa as cenas, de âncora em
 * âncora: grande na capa, presa e girando para cada região no percurso, pequena na margem da ficha, de volta à luz na
 * chamada.
 * 1, a arcada na luz (o que é, a regra da casa, a ação, o estado ao vivo); 2, percorra a boca (a cena da rolagem);
 * 3, a ficha de tratamentos; 4, os cartões de retorno (o tempo, no lugar do preço); 5, o termo (o que não se faz
 * aqui); 6, a porta da clínica (as placas, o horário, o bairro a lápis); 7, a avaliação marcada.
 */
export default function InicioDaClinica() {
  const [rua, bairro, cep] = enderecoEmLinhas();
  const tratamentosCaminho = paginaDe("tratamentos").caminho;
  return (
    <>
      {/* 1 · A arcada na luz: o título atravessa a placa; o refletor segue o ponteiro no papel. */}
      <section aria-labelledby="titulo" className="od-cena od-capa" data-refletor data-tinta="escura">
        <div className="od-largura od-capa-grade">
          <Ancora className="od-ancora-da-capa" inclina={-0.04} zoom={0.04} />
          <div className="od-capa-texto">
            <h1 id="titulo" className="od-capa-titulo">
              <span className="od-capa-frase">
                {capa.titulo.frase.split(" ").map((palavra, i, todas) => (
                  <span key={i}>
                    <span className="od-palavra" style={{ "--i": i } as React.CSSProperties}>
                      {palavra}
                    </span>
                    {i < todas.length - 1 && " "}
                  </span>
                ))}
              </span>
              <span className="od-capa-lugar">{capa.titulo.lugar}</span>
            </h1>
            <p className="od-capa-lide">{capa.lide}</p>
            <div className="od-capa-acoes">
              <AcaoWhatsApp className="od-ceramica-grande" />
            </div>
            <EstadoDaClinica
              className="od-capa-estado"
              expediente={expediente}
              fechamentos={fechamentos}
              urgencia={urgencia}
              semScript={quandoEOnde.estadoSemScript}
              urgenciaSemScript={quandoEOnde.urgenciaSemScript}
            />
          </div>
        </div>
      </section>

      {/* 2 · Percorra a boca: a placa presa, e cada passo, no meio da tela, a gira para a região dele (o motor lê os
          passos); o nome da região em cartaz. */}
      <section aria-labelledby="percurso" className="od-cena od-percurso" data-cena>
        <div className="od-largura od-percurso-grade">
          <div className="od-percurso-palco">
            <Ancora className="od-ancora-do-percurso" inclina={-0.08} />
          </div>
          <div className="od-percurso-texto">
            <h2 id="percurso" className="od-titulo-de-cena">
              {percurso.titulo}
            </h2>
            <p className="od-lide">{percurso.lide}</p>
            <ol className="od-passos">
              {regioes.map((r) => {
                const passo = percurso.passos[r.id];
                const daRegiao = tratamentos.filter((t) => t.regioes.includes(r.id));
                return (
                  <li key={r.id} data-passo={r.id} className="od-passo">
                    <h3 className="od-passo-nome">{r.curto}</h3>
                    <p className="od-passo-frase">
                      {passo.titulo}. {percurso.contagem(daRegiao.length)}. {passo.nota}
                    </p>
                    <p className="od-passo-dentes">{dentesDas([r.id])}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* 3 · A ficha de tratamentos: uma linha por tratamento; sob o ponteiro, a região acende na arcada da margem, e a
          miniatura do mapa vem junto do ponteiro. */}
      <section aria-labelledby="ficha" className="od-cena od-ficha-cena" data-cena>
        <div className="od-largura od-ficha-grade">
          <div className="od-ficha-cabeca">
            <h2 id="ficha" className="od-titulo-grande">
              {ficha.titulo}
            </h2>
            <p className="od-lide od-so-na-mesa">{ficha.lide}</p>
            <p className="od-lide od-so-no-celular">{ficha.lideNoToque}</p>
          </div>
          <div className="od-ficha-margem">
            <Ancora className="od-ancora-da-ficha" inclina={0.06} lado={0.1} />
          </div>
          <table className="od-ficha">
            <thead>
              <tr>
                <th scope="col">{ficha.colunas.tratamento}</th>
                <th scope="col">{ficha.colunas.onde}</th>
              </tr>
            </thead>
            <tbody>
              {tratamentos.map((t, i) => {
                const todas = t.regioes.length === regioes.length;
                // Como na ficha à mão: a linha que repete a de cima leva as aspas de repetição (o leitor de tela ouve o texto).
                const anterior = tratamentos[i - 1];
                const repete = anterior !== undefined && anterior.regioes.join() === t.regioes.join();
                const onde = todas ? ficha.todas : t.regioes.map((id) => regioes.find((r) => r.id === id)!.curto).join("; ");
                return (
                  <tr key={t.id} data-linha-da-ficha data-regioes={t.regioes.join(" ")}>
                    <th scope="row">
                      <Link href={paginaDe(t.id).caminho} className="od-ficha-nome">
                        {t.nome}
                      </Link>
                    </th>
                    {repete ? (
                      <td>
                        <span aria-hidden="true" className="od-ficha-idem">
                          〃
                        </span>
                        <span className="sr-only">{onde}</span>
                      </td>
                    ) : (
                      <td>
                        {onde}
                        <span className="od-ficha-dentes">{todas ? mapa.numeracao : dentesDas(t.regioes)}</span>
                        {/* No celular, a miniatura fica na linha (sem o ponteiro que a leva): a região a lápis no mapa. */}
                        <MapaDosDentes ativas={todas ? [] : t.regioes} legendas={mapa.legendas} className="od-ficha-mini" />
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="od-ficha-pe">
            <Link href={tratamentosCaminho} className="od-lapis">
              {ficha.ver}
            </Link>
          </p>
        </div>
        <div aria-hidden="true" data-miniatura className="od-miniatura">
          <MapaDosDentes percurso legendas={mapa.legendas} />
        </div>
      </section>

      {/* 4 · Os cartões de retorno: a cerâmica, com o relevo e a aresta de luz sob a mão; os números contam uma vez. */}
      <section aria-labelledby="cartoes" className="od-cena od-cartoes" data-cena>
        <div className="od-largura od-cartoes-cabeca">
          <div>
            <h2 id="cartoes" className="od-titulo-de-cena">
              {cartoesDeRetorno.titulo}
            </h2>
            <p className="od-lide">{cartoesDeRetorno.lide}</p>
          </div>
          <div className="od-botoes-da-fila">
            <SetasDaGaleria alvo="cartoes-de-retorno" rotulos={[cartoesDeRetorno.setas.anterior, cartoesDeRetorno.setas.proximo]} />
          </div>
        </div>
        <ol data-galeria="cartoes-de-retorno" aria-label={cartoesDeRetorno.rotuloDaFila} className="od-fila" tabIndex={0}>
          {tratamentos.map((t, i) => (
            <li key={t.id} data-ceramica className="od-cartao" style={{ "--i": i } as React.CSSProperties}>
              <h3 className="od-cartao-nome">{t.nome}</h3>
              <p className="od-cartao-frase">{t.umaFrase}</p>
              <p className="od-cartao-numero">
                <span data-conta={t.numero}>{t.numero}</span>
                <span>{t.unidade}</span>
              </p>
              <ol className="od-cartao-sessoes">
                {t.etapas.map((e) => (
                  <li key={e.nome}>
                    <span>{e.nome}</span>
                    <span>{tratamentoPagina.minutos(e.minutos)}</span>
                    {e.depois && <span className="od-cartao-depois">{e.depois}</span>}
                  </li>
                ))}
              </ol>
              <p className="od-cartao-pe">
                <Link href={paginaDe(t.id).caminho} className="od-lapis">
                  {cartoesDeRetorno.abrir}
                  <span className="sr-only">: {t.nome}</span>
                </Link>
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* 5 · O termo: o que não se faz aqui, cláusula por cláusula, com o "Nenhum" em cartaz e circulado a lápis. */}
      <section aria-labelledby="termo" className="od-cena od-termo" data-cena>
        <div className="od-largura">
          <h2 id="termo" className="od-titulo-de-cena">
            {ausencias.titulo}
          </h2>
          <ol className="od-clausulas">
            {ausencias.itens.map((a, i) => {
              const [primeira, ...resto] = a.fato.split(" ");
              return (
                <li key={a.fato} className="od-clausula" style={{ "--i": i } as React.CSSProperties}>
                  <p className="od-clausula-fato">
                    <span className="od-nenhum">
                      {primeira}
                      <span aria-hidden="true" className="od-sublinha" />
                    </span>{" "}
                    <span className="od-clausula-resto">{resto.join(" ")}</span>
                  </p>
                  <p className="od-clausula-motivo">{a.motivo}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 6 · A porta da clínica: o endereço em cartaz; as placas de cerâmica (quem atende e o horário, com a luz que a
          atravessa); o bairro a lápis. */}
      <section aria-labelledby="porta" className="od-cena od-porta" data-cena>
        <div className="od-largura od-porta-grade">
          <h2 id="porta" className="sr-only">
            {porta.titulo}
          </h2>
          <div className="od-porta-endereco">
            <address>
              <span>{rua}</span>
              <small>
                {bairro}, <span className="whitespace-nowrap">{cep}</span>
              </small>
            </address>
            <p className="od-porta-acoes">
              <Link href={paginaDe("onde").caminho} className="od-lapis">
                {quandoEOnde.comoChegar}
              </Link>
            </p>
          </div>
          <ul aria-label={porta.placas} className="od-placas">
            {equipe.map((d) => (
              <li key={d.id} data-ceramica className="od-placa od-placa-de-nome">
                <p className="od-placa-nome">{d.nome}</p>
                <p className="od-placa-cro">
                  {d.profissao}, <span className="whitespace-nowrap">{d.cro}</span>
                </p>
                <p className="od-placa-titulo">{d.funcao ? `${d.titulo}. ${d.funcao}.` : `${d.titulo}.`}</p>
              </li>
            ))}
          </ul>
          <PlacaDoHorario className="od-porta-horario" comEstado={false} />
          <p className="od-porta-pe">
            <Link href={paginaDe("equipe").caminho} className="od-lapis">
              {quemAtende.ver}
            </Link>
          </p>
        </div>
      </section>

      {/* 7 · A avaliação marcada: o campo do lápis vermelho, de ponta a ponta; a placa de volta à luz. */}
      <section aria-labelledby="chamada" className="od-cena od-chamada" data-cena data-tinta="vermelha">
        <div className="od-largura od-chamada-grade">
          <div className="od-chamada-texto">
            <h2 id="chamada" className="od-chamada-titulo">
              {chamada.titulo}
            </h2>
            <p className="od-chamada-lide">{chamada.texto}</p>
            <div className="od-chamada-acoes">
              <AcaoWhatsApp className="od-ceramica-grande" />
              <Telefone className="od-lapis-claro" />
            </div>
          </div>
          <Ancora className="od-ancora-da-chamada" inclina={0.2} lado={0.24} />
        </div>
      </section>
    </>
  );
}
