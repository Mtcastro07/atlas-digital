import { metadadosDe, paginaDe } from "@/components/demos/petshop/pecas";
import { TextoLegal } from "@/components/demos/petshop/texto-legal";
import { avisoDePrivacidade } from "@/conteudo/demos/petshop";

import "../legal.css";

export const metadata = metadadosDe("privacidade");

export default function Privacidade() {
  return <TextoLegal titulo={paginaDe("privacidade").titulo} texto={avisoDePrivacidade} />;
}
