import { Portas } from "@/components/paginas/portas";
import { Capa } from "@/components/secoes/capa";
import { Destaques } from "@/components/secoes/destaques";
import { Fim } from "@/components/secoes/fim";
import { Fundacao } from "@/components/secoes/fundacao";
import { Orcamento } from "@/components/secoes/orcamento";
import { Passos } from "@/components/secoes/passos";
import { jsonLd, negocioLocal } from "@/lib/dados-estruturados";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina("inicio");

/**
 * O início: só o essencial sobre o Atlas, numa ordem de decisão (desde
 * 03/10, a pedido do usuário; o resto se aprofunda na página de cada
 * assunto):
 * 1. a capa — a proposta e a ação, sozinhas na primeira tela (o que vem
 *    primeiro e por último numa sequência é o que mais se retém: efeito de
 *    posição serial, Murdock, 1962);
 * 2. os destaques e os nichos — o padrão de execução, primeiro na ordem do
 *    argumento da ata (IV.1);
 * 3. o trabalho, em caixas que se empilham — o valor antes do preço
 *    (Karmarkar, Shiv e Knutson, 2015: o preço visto primeiro faz julgar
 *    pelo custo; o produto visto primeiro, pelo que ele entrega);
 * 4. o orçamento, na tabela de 28/08 — um passo pequeno, sem cadastro,
 *    antes da conversa (pé na porta: Freedman e Fraser, 1966);
 * 5. a condição de fundação — a escassez verdadeira junto da decisão de
 *    preço (Worchel, Lee e Adewole, 1975);
 * 6. as seis portas — para quem quer ler mais antes de decidir;
 * 7. a chamada final — a ação de novo, no fim.
 * Os tons alternam a partir da capa: navy, névoa, navy, névoa, navy,
 * névoa, navy.
 */
export default function Inicio() {
  return (
    <>
      <Capa />
      <Destaques />
      <Passos />
      <Orcamento />
      <Fundacao destino="#orcamento" />
      <Portas />
      <Fim />
      {/* O negócio local fica aqui, e não no layout raiz: os sites de demonstração (app/demos/) não são o Atlas. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(negocioLocal)} />
    </>
  );
}
