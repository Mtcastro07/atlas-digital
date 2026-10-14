import { daCasa, metadadosDaCasa } from "@/components/demos/restaurante/casa";
import { FolhaLegal } from "@/components/demos/restaurante/folha-legal";
import { declaracaoDeAcessibilidade } from "@/conteudo/demos/restaurante";

export const metadata = metadadosDaCasa("acessibilidade");

/** A declaração de acessibilidade (fora do limite de páginas do plano: é obrigação, não conteúdo). */
export default function Acessibilidade() {
  return <FolhaLegal titulo={daCasa("acessibilidade").titulo} texto={declaracaoDeAcessibilidade} />;
}
