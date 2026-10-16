import Link from "next/link";

import { Agata, daCasa, metadadosDaCasa } from "@/components/demos/restaurante/casa";
import { alergenosEmTexto, cardapio, cardapioPagina, lousa, nomeDoDia, pratosDoDia, restauranteSite as casa, resumoDoCardapio, type Grupo } from "@/conteudo/demos/restaurante";
import { horaDeNiteroi } from "@/lib/demos/relogio";
import { real } from "@/lib/demos/restaurante/pedido";

export const metadata = metadadosDaCasa("cardapio");

/** O nome que não cabe ao lado do preço na folha estreita: o preço desce, com o pontilhado inteiro (sem o toco). */
const LONGO = 18;

/** Um grupo do cardápio na folha: o nome entre o fio duplo e os pratos, com o pontilhado até o preço. Cada prato leva
 *  ao pedido com ele já marcado (o tique é a escolha). */
function GrupoNaFolha({ grupo }: { grupo: Grupo }) {
  return (
    <section aria-labelledby={grupo.id} className="rs-folha-grupo">
      <h2 id={grupo.id}>{grupo.nome}</h2>
      <ul>
        {grupo.itens.map((i) => (
          <li key={i.id}>
            <Link href={`${daCasa("pedido").caminho}?item=${i.id}`} className="rs-prato-do-balcao" data-toque>
              <svg aria-hidden="true" className="rs-tique" viewBox="0 0 24 24">
                <path d="M3 13.5 9 19 21 5" />
              </svg>
              <p className="rs-prato-linha" data-longo={i.nome.length > LONGO || undefined}>
                <span className="rs-prato-nome">{i.nome}</span>
                <span aria-hidden="true" className="rs-prato-pontos" />
                <span className="rs-prato-preco">{real(i.preco)}</span>
              </p>
              <p className="rs-prato-detalhe">
                {i.descricao && `${i.descricao}. `}
                {i.porcao}. {alergenosEmTexto(i.alergenos)}
                <span className="sr-only"> {resumoDoCardapio.marcar}</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * O cardápio: o cardápio de três folhas, de pé na mesa de madeira, que se desdobra ao abrir a página (o momento desta
 * página; restaurante.css). A página abre na própria peça: o título vem impresso no alto da primeira folha, como no
 * cardápio do balcão, com os pratos embaixo; na segunda, as guarnições, as sobremesas e o prato de hoje; na terceira,
 * as bebidas e, no pé, a nota do trigo, antes do pedido. No celular, as folhas ficam uma embaixo da outra: a segunda
 * se desdobra quando chega à tela (data-cena), o momento da página; a primeira e a terceira ficam quietas.
 */
export default function Cardapio() {
  const [pratos, guarnicoes, sobremesas, bebidas] = cardapio;
  const hoje = horaDeNiteroi().dia;
  const doDia = pratosDoDia[hoje];
  return (
    <section aria-labelledby="titulo" className="rs-abertura rs-mesa rs-cardapio">
      <div className="rs-largura">
        <div className="rs-triptico">
          <div className="rs-folha-do-cardapio">
            <header className="rs-cardapio-cabeca">
              <p className="rs-cardapio-casa">
                {casa.nome}, {cardapioPagina.cabecalho.toLowerCase()}
              </p>
              <h1 id="titulo" className="rs-cardapio-titulo">
                {daCasa("cardapio").titulo}
              </h1>
              <p className="rs-cardapio-lide">{cardapioPagina.lide}</p>
            </header>
            <GrupoNaFolha grupo={pratos} />
          </div>
          <div className="rs-folha-do-cardapio" data-cena="folha">
            <GrupoNaFolha grupo={guarnicoes} />
            <GrupoNaFolha grupo={sobremesas} />
            {doDia && (
              <section aria-labelledby="do-dia" className="rs-folha-do-dia">
                <h2 id="do-dia">{cardapioPagina.pratoDoDia}</h2>
                <p className="rs-folha-do-dia-quando">{lousa.hoje(nomeDoDia[hoje])}</p>
                <p className="rs-prato-linha" data-longo={doDia.nome.length > LONGO || undefined}>
                  <span className="rs-prato-nome">{doDia.nome}</span>
                  <span aria-hidden="true" className="rs-prato-pontos" />
                  <span className="rs-prato-preco">{real(doDia.preco)}</span>
                </p>
                <p className="rs-prato-detalhe">
                  {doDia.porcao}. {alergenosEmTexto(doDia.alergenos)}
                </p>
              </section>
            )}
          </div>
          <div className="rs-folha-do-cardapio">
            <GrupoNaFolha grupo={bebidas} />
            <div className="rs-folha-pe">
              <p className="rs-folha-nota">{cardapioPagina.trigo}</p>
              <Agata rotulo={cardapioPagina.pedir} href={daCasa("pedido").caminho} className="w-full rs-agata-principal" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
