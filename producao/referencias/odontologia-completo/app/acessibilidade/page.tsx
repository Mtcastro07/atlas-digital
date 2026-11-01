// app/acessibilidade/page.tsx — a declaração de acessibilidade, para onde leva o símbolo do rodapé
// (Lei 13.146/2015, art. 63, § 1º; conteudo/legal.ts; producao/esteira/17-conformidade-e-normas.md, seção 3.3).
import { TextoLegal } from "@/components/texto-legal";
import { declaracaoDeAcessibilidade } from "@/conteudo/legal";
import { paginaDe } from "@/conteudo/site";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina(paginaDe("acessibilidade"));

export default function Acessibilidade() {
  return <TextoLegal texto={declaracaoDeAcessibilidade} rotuloDaData="Última revisão" />;
}
