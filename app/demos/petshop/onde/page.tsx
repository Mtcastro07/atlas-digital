import { Mapa } from "@/components/demos/petshop/mapa";
import { Carimbo, Endereco, Telefone, metadadosDe, paginaDe } from "@/components/demos/petshop/pecas";
import { expediente, feriados, mapa, petshopSite as site } from "@/conteudo/demos/petshop";
import { diaADia } from "@/lib/demos/relogio";

import "../onde.css";

// Onde, "O mapinho do verso" (identidade, seção 4.13; lapidada nas rodadas 1 a 3): o verso do cartão. Abre com o
// mapinho em sangria, numa tinta só, e o h1 "Onde fica" vazado na baía, no corpo da capa (128 px, em duas linhas: o
// momento desta página); na água, o endereço e o vínculo para o OpenStreetMap, com rótulo próprio. O mapa é o da cena 5
// do Início visto de perto, sem os bairros (lapidação, rodada 3: era o mesmo desenho, no mesmo quadro e com os mesmos
// rótulos). Depois, no chapado em que a baía deságua, a semana: os dias impressos um embaixo do outro, com a hora uma
// vez por grupo de dias iguais (rodada 3: "9h às 18h" quatro vezes em exibição), no corpo dos números da casa, sem régua
// de leitura (14.10.2026: quatro grupos se leem sem ela); do outro lado, o título ("Terça a sábado": os dias em que a porta abre), o prazo de resposta, o carimbo e o
// telefone. O momento da página, uma vez, ao abrir: o mapa chega perto da casa (onde.css; crítico de fora, 14.10.2026).
// Nenhuma inclinação (o mapa em sangria é o chão da página, não uma peça sobre ele).

export const metadata = metadadosDe("onde");

// O rótulo de interface do segundo bloco: os dias de porta aberta, do expediente (a primeira e a última abertura).
const abertos = diaADia(expediente).filter((d) => d.texto !== "Fechado");
const tituloDaSemana = `${abertos[0].dia} a ${abertos[abertos.length - 1].dia.toLowerCase()}`;
// A semana em grupos de dias seguidos com a mesma hora (segunda; terça a sexta; sábado; domingo): cada dia escrito, a hora
// uma vez por grupo.
const semana = diaADia(expediente).reduce<{ dias: string[]; texto: string }[]>((grupos, d) => {
  const ultimo = grupos.at(-1);
  if (ultimo?.texto === d.texto) ultimo.dias.push(d.dia);
  else grupos.push({ dias: [d.dia], texto: d.texto });
  return grupos;
}, []);
/** O recorte do mapa de perto: a casa um pouco à direita do meio, a baía à esquerda, onde vai o título. */
const deperto = "330 290 780 520";

export default function Onde() {
  return (
    <>
      <section aria-labelledby="titulo" className="bt-cena bt-cartolina bt-abaixo-da-tira bt-onde-verso">
        <div className="bt-onde-quadro">
          {/* O texto vem antes do desenho no DOM (o h1 primeiro, para o leitor de tela); o CSS os empilha na mesma célula. */}
          <div className="bt-tinta bt-onde-agua">
            <div className="bt-largura bt-onde-baia">
              <h1 id="titulo" className="bt-display bt-onde-titulo">
                {paginaDe("onde").titulo}
              </h1>
              <Endereco rotuloDoMapa={mapa.abrir} className="bt-destaque bt-onde-endereco" />
            </div>
          </div>
          <Mapa className="bt-onde-mapa" recorte={deperto} bairros={false} rotulo={mapa.rotuloDePerto} />
        </div>
      </section>

      {/* A semana: os sete dias, um embaixo do outro; do outro lado, o título, o prazo, o carimbo e o telefone. */}
      <section aria-labelledby="quando" className="bt-cena bt-tinta bt-onde-semana">
        <div className="bt-largura bt-onde-grade">
          <div className="bt-onde-cabeca">
            <h2 id="quando" className="bt-titulo">
              {tituloDaSemana}
            </h2>
            <p className="bt-destaque bt-onde-prazo">{site.prazoDeResposta}</p>
          </div>
          <div className="bt-onde-semana-dias">
            <div className="bt-onde-dias">
              <dl>
                {semana.map((g) => (
                  <div
                    key={g.dias[0]}
                    data-varios={g.dias.length > 1 ? "" : undefined}
                    className={g.texto === "Fechado" ? "bt-onde-dia bt-onde-fechado" : "bt-onde-dia"}
                    style={{ "--n": g.dias.length } as React.CSSProperties}
                  >
                    {g.dias.map((dia) => (
                      <dt key={dia}>{dia}</dt>
                    ))}
                    <dd>{g.texto}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="bt-onde-feriados">{feriados}</p>
          </div>
          <div className="bt-onde-pedir">
            <Carimbo />
            <p className="bt-onde-ligue">
              {site.telefone.rotulo} <Telefone className="bt-onde-fone" />
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
