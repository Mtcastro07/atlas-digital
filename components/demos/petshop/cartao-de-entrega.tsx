import { banhoPeloCurto, cartaoDeEntrega, pelagens, portes, petshopSite as site, servicos } from "@/conteudo/demos/petshop";
import { real } from "@/lib/demos/petshop/valores";

/**
 * O cartão de entrega (briefing, diferencial 3; identidade, seção 4.2): o cartão pequeno que volta com o animal, impresso
 * numa tinta só, com os seis campos da casa em linha (o rótulo impresso e o fio que corre até a borda, como no bloco da
 * gráfica, e não o rótulo em cima de um campo, como num formulário de tela; lapidação, rodada 3), carimbado com o que se
 * fez. O carimbado é a tinta da casa, a uva, com a falha nas fibras (o violeta fica só onde a mão do visitante age: rodada
 * 3, o violeta em peça inerte); embaixo, a marca da casa batida no cartão, a borracha cheia com o nome vazado.
 * O que o exemplo da cena 3 diz vai preenchido: o porte, a pelagem, o serviço e o valor (da tabela). O peso medido e a
 * hora em que ficou pronto ficam no fio, em branco (a unidade no rótulo): só a balança e o relógio os dizem (a linha do
 * atendimento conta o tempo desde a chegada, 1:30, e não a hora do relógio). Não inclina (14.10.2026: quem inclina sob a
 * mão é a frente e o verso do cartão da casa); o gesto dele é o da cena 3, uma vez: chega de costas e vira, como o
 * cartão que o atendente vira no balcão para o tutor ler (crítico de fora, 14.10.2026; inicio.css). As costas são a
 * marca da casa na borracha cheia, desenho (aria-hidden), atrás da frente.
 */
export function CartaoDeEntrega({ className = "" }: { className?: string }) {
  const c = cartaoDeEntrega.campos;
  const porte = portes[1];
  const preco = banhoPeloCurto[porte.id];
  const campos: { rotulo: string; valor?: string }[] = [
    { rotulo: `${c.peso} (kg)` },
    { rotulo: c.porte, valor: porte.nome },
    { rotulo: c.pelagem, valor: pelagens.curta },
    { rotulo: c.servico, valor: servicos[0].nome },
    { rotulo: c.valor, valor: real(preco.centavos) },
    { rotulo: c.hora },
  ];
  return (
    <>
      <figure className={`bt-entrega ${className}`}>
        <figcaption className="bt-entrega-nome">{cartaoDeEntrega.nome}</figcaption>
        <dl className="bt-entrega-campos">
          {campos.map((campo) => (
            <div key={campo.rotulo} className="bt-entrega-campo">
              <dt>{campo.rotulo}</dt>
              <dd>
                {campo.valor ? <span className="bt-entrega-carimbado">{campo.valor}</span> : <span className="sr-only">em branco</span>}
              </dd>
            </div>
          ))}
        </dl>
        <p aria-hidden="true" className="bt-entrega-marca">
          <span className="bt-entrega-quadrado" />
          {site.nome}
        </p>
      </figure>
      <span aria-hidden="true" className="bt-entrega-costas">
        <span className="bt-entrega-quadrado" />
        {site.nome}
      </span>
    </>
  );
}
