import { metadadosDe, paginaDe } from "@/components/demos/odontologia/pecas";
import { TextoLegal } from "@/components/demos/odontologia/texto-legal";
import { declaracaoDeAcessibilidade } from "@/conteudo/demos/odontologia";

export const metadata = metadadosDe("acessibilidade");

/** A declaração de acessibilidade: só o que foi medido, com a data (fora do limite de páginas do plano). */
export default function Acessibilidade() {
  return <TextoLegal titulo={paginaDe("acessibilidade").titulo} texto={declaracaoDeAcessibilidade} />;
}
