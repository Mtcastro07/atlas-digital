import { AberturaDePagina } from "@/components/paginas/abertura-de-pagina";
import { PrecoCobre } from "@/components/paginas/orcamento/preco-cobre";
import { ProximaPagina } from "@/components/paginas/proxima-pagina";
import { MontadorDaPagina } from "@/components/secoes/orcamento";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("orcamento");

/**
 * Orçamento: a abertura é o próprio montador, com a tabela completa, logo
 * abaixo do título (desde 16/10): o momento da página é a ferramenta, que
 * responde à mão. Até 16/10, a figura era a equação dos quatro termos, um
 * cartão parado que repetia o lide, e o montador vinha numa seção à parte,
 * na mesma névoa (o crítico de fora). O plano chega marcado de
 * /orcamento#orcamento-<plano> (o "Escolher" dos planos e do simulador).
 * Desde 16/10, a sombra do lado da hora. Desde 28/10 (R10), a conta como o objeto da página, a rota
 * direta com o código, e a cena "O que o preço cobre." (desde 02/11, o
 * endereço como objeto, no navy; as passivas estão em cada peça).
 */
export default function PaginaDoOrcamento() {
  return (
    // A hora da página (16/10): dá o lado das sombras a toda a página (app/vidro.css). Um atributo, sem texto.
    <div data-hora="meio-dia" className="contents">
      <AberturaDePagina
        pagina="orcamento"
        tom="claro"
        disposicao="embaixo"
        figura={<MontadorDaPagina />}
      />
      <PrecoCobre />
      <ProximaPagina atual="orcamento" />
    </div>
  );
}
