import { Telefone, Vinculo, enderecoEmLinha } from "@/components/demos/petshop/pecas";
import { SimboloDeAcessibilidade } from "@/components/demos/petshop/simbolos";
import { creditoDoPlano, seloDeFiccao } from "@/conteudo/demos/comum";
import { paginas, petshopSite as site, rodape } from "@/conteudo/demos/petshop";

/**
 * A linha de baixo do cartão (o rodapé; identidade, seções 4.3 e 4.12): o pé do último cartão da página, que sangra pelos
 * lados e por baixo, com a borda de cima e as duas quinas de faca à vista contra a tinta, e o texto no corpo da nota em
 * duas medidas curtas, à esquerda: a casa (o quadrado de tinta, o mesmo do ícone da aba, com o nome; o endereço e o
 * telefone) e o aviso (o selo de ficção, no texto exato, o crédito do plano e os dois avisos, com o símbolo). Lapidação,
 * rodada 3 (o crítico: 14 px na metade esquerda e cerca de 800 px de cartolina vazia à direita, sem a borda do cartão): o
 * texto em duas colunas e a borda do cartão à vista. O que a casa faz saiu daqui (repetia o lide da capa em toda página).
 * Sem colofão, sem o nome em cartaz, sem "Impresso por".
 */
export function Rodape() {
  const legais = paginas.filter((p) => p.legal);
  return (
    <footer className="bt-rodape bt-tinta">
      <div className="bt-cartao bt-rodape-cartao">
        <div className="bt-largura bt-rodape-linha">
          <div className="bt-rodape-casa">
            <p className="bt-rodape-nome">
              <span aria-hidden="true" className="bt-rodape-marca" />
              {site.nome}
            </p>
            <p>
              {enderecoEmLinha()}. {rodape.telefone} <Telefone />.
            </p>
          </div>
          <div className="bt-rodape-aviso">
            <p>
              {seloDeFiccao} {creditoDoPlano("Essencial")}
            </p>
            <nav aria-label={rodape.legais} className="bt-rodape-avisos">
              {legais.map((p) => (
                <Vinculo
                  key={p.id}
                  href={p.caminho}
                  icone={p.id === "acessibilidade" ? <SimboloDeAcessibilidade className="bt-vinculo-icone" /> : undefined}
                >
                  {p.rotulo}
                </Vinculo>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
