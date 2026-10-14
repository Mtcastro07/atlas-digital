import Link from "next/link";

import { Agata, daCasa, metadadosDaCasa } from "@/components/demos/restaurante/casa";
import { Montador } from "@/components/ilhas/demos/restaurante/montador";
import { whatsappFicticio } from "@/conteudo/demos/comum";
import { alergenosEmTexto, bairros, cardapio, entrega, nomeDoDia, pedidoPagina as textos, pratosDoDia, restauranteSite as casa, type Item } from "@/conteudo/demos/restaurante";
import { horaDeNiteroi } from "@/lib/demos/relogio";

export const metadata = metadadosDaCasa("pedido");

/** O que o montador mostra de cada item: o nome, o preço e, embaixo, a descrição, a porção e os alérgenos. */
const naComanda = (i: Item) => ({
  id: i.id,
  nome: i.nome,
  porcao: i.porcao,
  preco: i.preco,
  detalhe: [i.descricao && `${i.descricao}.`, `${i.porcao}.`, alergenosEmTexto(i.alergenos)].filter(Boolean).join(" "),
});

/**
 * Fazer o pedido (a funcionalidade do Profissional, nichos/restaurante.md, seção 5.1), no balcão de azulejo verde: a
 * folha de pedido, com o título escrito a caneta no alto e a lista embaixo (o prato de hoje primeiro), e a comanda do
 * bloco por cima da borda dela, que se destaca ao abrir a página. O frete de cada bairro e as formas de pagamento
 * estão nas escolhas da comanda (e os bairros, na página Onde). Sem script, o montador some e fica o pedido por
 * mensagem.
 */
export default function Pedido() {
  const hoje = horaDeNiteroi().dia;
  const prato = pratosDoDia[hoje];
  const grupos = [
    ...(prato ? [{ id: "do-dia", nome: textos.hoje(nomeDoDia[hoje]), itens: [naComanda(prato)] }] : []),
    ...cardapio.map((g) => ({ id: g.id, nome: g.nome, itens: g.itens.map(naComanda) })),
  ];
  return (
    <section aria-labelledby="titulo" className="rs-abertura rs-balcao-verde rs-pedido">
      <div className="rs-largura">
        {/* O alto da folha de pedido, escrito a caneta: o título da página (fora do montador, para existir sem script). */}
        <header className="rs-pedido-cabeca">
          <h1 id="titulo" className="rs-pedido-titulo">
            {daCasa("pedido").titulo}
          </h1>
          <p className="rs-pedido-lide">{textos.lide}</p>
        </header>
        <div className="rs-com-script">
          <Montador
            numero={whatsappFicticio}
            grupos={grupos}
            bairros={bairros}
            minimo={entrega.minimo}
            pagamentos={entrega.pagamento}
            textos={{
              oPedido: textos.oPedido,
              casa: casa.nome,
              vazio: textos.vazio,
              entrega: textos.entrega,
              retirada: textos.retirada,
              entregaNo: textos.entregaNo,
              bairro: textos.bairro,
              pagamento: textos.pagamento,
              observacao: textos.observacao,
              subtotal: textos.subtotal,
              frete: textos.frete,
              total: textos.total,
              semFrete: textos.semFrete,
              enviar: textos.enviar,
              copiar: textos.copiar,
              tira: textos.tira,
              novaAba: casa.novaAba,
              mais: textos.mais,
              menos: textos.menos,
              quantidade: textos.quantidade,
              abaixoDoMinimo: textos.abaixoDoMinimo,
              mensagem: textos.mensagem,
            }}
          />
        </div>
        <div className="rs-sem-script rs-pedido-sem-script">
          <p>{textos.semScript}</p>
          <p className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Agata rotulo={casa.acao.whatsapp} />
            <Link href={daCasa("cardapio").caminho} className="rs-pontilhado">
              {daCasa("cardapio").titulo}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
