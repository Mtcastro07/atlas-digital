import { metadadosDe, paginaDe } from "@/components/demos/petshop/pecas";
import { TextoLegal } from "@/components/demos/petshop/texto-legal";
import { declaracaoDeAcessibilidade } from "@/conteudo/demos/petshop";

import "../legal.css";

export const metadata = metadadosDe("acessibilidade");

export default function Acessibilidade() {
  return <TextoLegal titulo={paginaDe("acessibilidade").titulo} texto={declaracaoDeAcessibilidade} simbolo />;
}
