import Link from "next/link";

import { enderecoEmLinha, Monograma } from "@/components/demos/odontologia/pecas";
import { creditoDoPlano, seloDeFiccao, whatsappFicticio, whatsappVisivel } from "@/conteudo/demos/comum";
import { expediente, odontologiaSite as site, paginas, rodape } from "@/conteudo/demos/odontologia";
import { diasJuntos } from "@/lib/demos/relogio";

/**
 * O pé do receituário (identidade, seção 9): o rodapé da Odontologia Boa Viagem, igual em todas as páginas, como se
 * imprime no bloco da clínica. Em cima, o cabeçalho impresso do bloco (o monograma, a clínica e o registro) e, ao
 * lado, o endereço, o número (o mesmo atende a mensagem e a ligação) e o horário, em letra miúda; as páginas; embaixo,
 * à direita, a linha da assinatura com a responsável técnica, a profissão e o registro, e o carimbo retangular da
 * clínica (o de consultório, com o nome e o registro), em tinta vermelha. É a identificação completa que a norma pede em toda página (Código de Ética Odontológica, art. 43).
 */
export function Receituario() {
  const r = site.responsavel;
  const horario = diasJuntos(expediente)
    .map((g, i) => `${i ? g.dias.toLowerCase() : g.dias}, ${g.texto === "Fechado" ? "fechado" : g.texto}`)
    .join("; ");
  return (
    <footer className="od-receituario">
      <div className="od-largura od-receituario-folha">
        <div className="od-receituario-cabeca">
          <p className="od-receituario-clinica">
            <Monograma className="od-receituario-monograma" />
            <span>
              <strong>{site.nome}</strong>
              <span>
                {site.oQueFaz}, <span className="whitespace-nowrap">{site.registro}</span>.
              </span>
            </span>
          </p>
          <p className="od-receituario-miudo">
            {enderecoEmLinha()}. {rodape.whatsapp} e telefone:{" "}
            <a href={`tel:+${whatsappFicticio}`} className="od-lapis whitespace-nowrap">
              {whatsappVisivel}
            </a>
            . {rodape.horario}: {horario}.
          </p>
        </div>
        {/* O destino do índice do celular sem script (a aba "Páginas" da pasta). */}
        <nav id="paginas-da-clinica" aria-label={rodape.paginas} className="od-receituario-paginas">
          {paginas
            .filter((p) => p.naBarra)
            .map((p) => (
              <Link key={p.id} href={p.caminho} className="od-lapis">
                {p.rotulo}
              </Link>
            ))}
        </nav>
        <div className="od-receituario-pe">
          <svg aria-hidden="true" viewBox="0 0 220 76" className="od-carimbo">
            <rect x="3" y="3" width="214" height="70" rx="5" />
            <rect x="8" y="8" width="204" height="60" rx="3" className="od-carimbo-fio" />
            <text x="110" y="34" textAnchor="middle" className="od-carimbo-nome">
              {site.nome}
            </text>
            <text x="110" y="54" textAnchor="middle">
              {site.registro}
            </text>
          </svg>
          <div className="od-assinatura">
            <span aria-hidden="true" className="od-assinatura-linha" />
            <p>
              <strong>{r.nome}</strong>, {r.profissao}. {r.rotulo}, <span className="whitespace-nowrap">{r.registro}</span>.
            </p>
          </div>
        </div>
        <div className="od-receituario-fim">
          <p>{seloDeFiccao}</p>
          <p className="od-receituario-legais">
            {paginas
              .filter((p) => p.legal)
              .map((p) => (
                <Link key={p.id} href={p.caminho} className="od-lapis">
                  {p.rotulo}
                </Link>
              ))}
            <span>{creditoDoPlano("Completo")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
