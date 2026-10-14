import { metadadosDe, paginaDe } from "@/components/demos/odontologia/pecas";
import { TextoLegal } from "@/components/demos/odontologia/texto-legal";
import { avisoDePrivacidade } from "@/conteudo/demos/odontologia";

export const metadata = metadadosDe("privacidade");

/** O aviso de privacidade (fora do limite de páginas do plano: é obrigação, não conteúdo). */
export default function Privacidade() {
  return <TextoLegal titulo={paginaDe("privacidade").titulo} texto={avisoDePrivacidade} />;
}
