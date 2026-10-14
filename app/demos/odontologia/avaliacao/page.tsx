import { AcaoWhatsApp, metadadosDe, paginaDe } from "@/components/demos/odontologia/pecas";
import { PedidoDeAvaliacao } from "@/components/ilhas/demos/odontologia/pedido-de-avaliacao";
import { whatsappFicticio } from "@/conteudo/demos/comum";
import { atendimentos, avaliacaoPagina, avisoDeValores, guiasPagina, mapa, odontologiaSite as site, periodos, regioes, ultimasVisitas } from "@/conteudo/demos/odontologia";

export const metadata = metadadosDe("avaliacao");

/**
 * Pedir uma avaliação: a funcionalidade 1 do Completo (producao/esteira/nichos/odontologia.md, seção 5.1). A ilha monta
 * a mensagem no aparelho e não grava nada. Sem script, a página continua útil: a ação com a mensagem curta e a
 * instrução de dizer o atendimento e o período na conversa (.od-sem-script, só sem a classe .js). O momento desta
 * página: o cartão de consulta, preenchido a lápis conforme a escolha (a mensagem); a região escolhida acende na placa
 * de cerâmica. Embaixo, o que acontece na avaliação, como os campos numerados da ficha.
 */
export default function Avaliacao() {
  const pagina = paginaDe("avaliacao");
  return (
    <>
      <section aria-labelledby="titulo" className="od-cena od-avaliacao">
        <div className="od-largura">
          <h1 id="titulo" className="od-titulo-grande od-avaliacao-titulo">
            {pagina.titulo}
          </h1>
          <p className="od-lide">{avaliacaoPagina.lide}</p>
          <div className="od-sem-script">
            <p>{avaliacaoPagina.semScript}</p>
            <AcaoWhatsApp />
          </div>
          <div className="od-avaliacao-cartao">
            <PedidoDeAvaliacao
              numero={whatsappFicticio}
              atendimentos={atendimentos}
              regioes={regioes.map(({ id, nome, frase }) => ({ id, nome, frase }))}
              ultimasVisitas={ultimasVisitas}
              periodos={periodos}
              textos={{
                atendimento: avaliacaoPagina.atendimento,
                atendimentoNota: avaliacaoPagina.atendimentoNota,
                regiao: avaliacaoPagina.regiao,
                todasAsRegioes: avaliacaoPagina.todasAsRegioes,
                ultimaVisita: avaliacaoPagina.ultimaVisita,
                periodo: avaliacaoPagina.periodo,
                semResposta: avaliacaoPagina.semResposta,
                mensagem: avaliacaoPagina.mensagem,
                copiar: avaliacaoPagina.copiar,
                enviar: avaliacaoPagina.enviar,
                urgenciaNota: avaliacaoPagina.urgenciaNota,
                abertura: site.acao.mensagem,
                novaAba: site.novaAba,
                legendas: mapa.legendas,
              }}
            />
          </div>
        </div>
      </section>
      <section aria-labelledby="o-que-acontece" className="od-largura od-campos-da-ficha">
        <h2 id="o-que-acontece" className="od-titulo-de-cena">
          {avaliacaoPagina.oQueAcontece}
        </h2>
        <ol className="od-campos">
          {guiasPagina.passos.map((passo, i) => (
            <li key={passo} className="od-campo">
              <span className="od-campo-numero">{String(i + 1).padStart(2, "0")}</span>
              <p>{passo}</p>
            </li>
          ))}
        </ol>
        <p className="od-campos-pe">
          <strong>{guiasPagina.duracao}</strong> {avisoDeValores}
        </p>
      </section>
    </>
  );
}
