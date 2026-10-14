import Link from "next/link";

import { endereco } from "@/components/demos/restaurante/casa";
import { creditoDoPlano, seloDeFiccao, whatsappFicticio, whatsappVisivel } from "@/conteudo/demos/comum";
import { expediente, paginas, restauranteSite as casa, rodape } from "@/conteudo/demos/restaurante";
import { diasJuntos } from "@/lib/demos/relogio";

/**
 * O pé da parede: o barrado de azulejo (uma fileira, o desenho da casa) e o rodapé de madeira: o nome da casa, e
 * embaixo o endereço, o número (o mesmo atende a mensagem e a ligação) e o horário; as páginas e o aviso de ficção.
 * Nada de colunas, nada do nome em escala de cartaz (19-o-padrao-atlas.md, seção 7).
 */
export function Barrado() {
  // Uma frase só: depois do ponto e vírgula, o dia em minúscula.
  const horario = diasJuntos(expediente)
    .map((g, i) => {
      const dias = i ? g.dias.toLowerCase() : g.dias;
      return g.texto === "Fechado" ? `${dias}: fechado` : `${dias}, ${g.texto}`;
    })
    .join("; ");
  return (
    <footer className="rs-barrado">
      <div aria-hidden="true" className="rs-barrado-azulejo" />
      <div className="rs-barrado-madeira">
        <div className="rs-largura">
          <p className="rs-barrado-nome">{casa.nome}</p>
          <p className="rs-barrado-casa">
            {casa.oQueFaz}. {endereco.numaLinha()}.
          </p>
          <p className="rs-barrado-linha">
            {rodape.telefone}{" "}
            <a href={`tel:+${whatsappFicticio}`} className="rs-pontilhado-claro whitespace-nowrap">
              {whatsappVisivel}
            </a>
            . {horario}.
          </p>
          <nav id="paginas-do-salao" aria-label={rodape.paginas} className="rs-barrado-paginas">
            {paginas
              .filter((p) => p.naBarra)
              .map((p) => (
                <Link key={p.id} href={p.caminho} className="rs-pontilhado-claro">
                  {p.rotulo}
                </Link>
              ))}
          </nav>
        </div>
      </div>
      <div className="rs-barrado-fim">
        <div className="rs-largura rs-barrado-fim-linha">
          <p>{seloDeFiccao}</p>
          <p className="flex flex-wrap gap-x-5">
            {paginas
              .filter((p) => p.legal)
              .map((p) => (
                <Link key={p.id} href={p.caminho} className="rs-pontilhado-claro">
                  {p.rotulo}
                </Link>
              ))}
            <span>{creditoDoPlano("Profissional")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
