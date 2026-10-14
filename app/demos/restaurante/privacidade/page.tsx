import { daCasa, metadadosDaCasa } from "@/components/demos/restaurante/casa";
import { FolhaLegal } from "@/components/demos/restaurante/folha-legal";
import { avisoDePrivacidade } from "@/conteudo/demos/restaurante";

export const metadata = metadadosDaCasa("privacidade");

/** O aviso de privacidade (fora do limite de páginas do plano: é obrigação, não conteúdo). */
export default function Privacidade() {
  return <FolhaLegal titulo={daCasa("privacidade").titulo} texto={avisoDePrivacidade} />;
}
