// app/privacidade/page.tsx — o aviso de privacidade (conteudo/legal.ts; producao/esteira/17-conformidade-e-normas.md).
import { TextoLegal } from "@/components/texto-legal";
import { avisoDePrivacidade } from "@/conteudo/legal";
import { paginaDe } from "@/conteudo/site";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina(paginaDe("privacidade"));

export default function Privacidade() {
  return <TextoLegal texto={avisoDePrivacidade} rotuloDaData="Última atualização" />;
}
