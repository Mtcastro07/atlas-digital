import Link from "next/link";

import { Agata, daCasa, endereco, Ligue, metadadosDaCasa } from "@/components/demos/restaurante/casa";
import { Cavalete } from "@/components/demos/restaurante/cavalete";
import { LousaPendurada } from "@/components/demos/restaurante/lousa-pendurada";
import { MapaDoBairro } from "@/components/demos/restaurante/mapa-do-bairro";
import { SemanaNaParede } from "@/components/demos/restaurante/semana-na-parede";
import {
  ausencias,
  capa,
  cardapio,
  chamada,
  comoPedir,
  entrega,
  expediente,
  horarioEOnde,
  lousa,
  nomeDoDia,
  pratosDoDia,
  restauranteSite as casa,
  resumoDoCardapio,
} from "@/conteudo/demos/restaurante";
import { diasJuntos, horaDeNiteroi } from "@/lib/demos/relogio";
import { real } from "@/lib/demos/restaurante/pedido";

export const metadata = metadadosDaCasa("inicio");

/** A dança da mão no giz: cada palavra com a sua inclinação e a sua linha de base (em graus e em em). */
const MAO = [
  [-1.2, 0.02],
  [0.8, -0.03],
  [-0.4, 0.01],
  [1.3, -0.02],
  [-0.9, 0.03],
  [0.5, -0.01],
] as const;

/** O título escrito a giz: cada palavra com a sua ordem (o giz escreve uma depois da outra) e a sua dança. */
function EscritoAGiz({ texto }: { texto: string }) {
  const palavras = texto.split(" ");
  return palavras.map((p, i) => (
    <span key={i}>
      <span className="rs-palavra-de-giz" style={{ "--p": i, "--g": `${MAO[i % MAO.length][0]}deg`, "--y": `${MAO[i % MAO.length][1]}em` } as React.CSSProperties}>
        {p}
      </span>
      {i < palavras.length - 1 && " "}
    </span>
  ));
}

/** A panela desenhada a giz na lousa da capa, com o vapor que sobe (o ambiente, pausável). */
function PanelaAGiz() {
  return (
    <svg aria-hidden="true" className="rs-panela rs-giz" viewBox="0 0 240 210">
      <g className="rs-vapor">
        <path d="M92 70C82 58 102 46 92 32C84 20 98 12 94 4" />
        <path d="M122 64C112 52 132 40 122 26C114 14 128 8 124 0" />
        <path d="M152 70C142 58 162 46 152 32C144 20 158 12 154 4" />
      </g>
      <path d="M50 106C62 84 178 84 190 106" />
      <path d="M110 87c0-10 20-10 20 0" />
      <path d="M28 110h184" strokeWidth="6" />
      <path d="M40 112l5 76q2 10 14 10h122q12 0 14-10l5-76" />
      <path d="M41 128c-18 0-24 8-22 14 2 6 12 4 24 0M199 128c18 0 24 8 22 14-2 6-12 4-24 0" />
      <path d="M172 128l18-9M170 148l21-11M168 168l21-11M164 188l20-10" strokeWidth="2.5" opacity=".6" />
    </svg>
  );
}

/**
 * O início da Cozinha do Ingá: o salão, em sete cenas (identidade, seção 8; as rodadas de lapidação de 09.10.2026). A
 * ordem alterna o valor (a meta de cor do roteiro: a lousa e a madeira escuras, o papel e o azulejo branco claros):
 * 1, a parede verde com a lousa pendurada, a panela a giz e o prato de hoje; 2, os pratos em cartaz, no papel; 3, a
 * semana na lousa de parede; 4, a parede de azulejo branco, com o painel da casa e os quatro azulejos pintados; 5, a
 * comanda na mesa de madeira; 6, a porta: o endereço em cartaz, o guardanapo com o mapa e a plaquinha esmaltada; 7, o
 * cavalete na calçada de pedra portuguesa, com as ações na soleira.
 */
export default function InicioDoSalao() {
  const hoje = horaDeNiteroi().dia;
  const prato = pratosDoDia[hoje];
  const pedido = daCasa("pedido").caminho;
  const pratos = cardapio.find((g) => g.id === "pratos")!;
  const [rua, bairro] = endereco.linhas();
  return (
    <>
      {/* 1 · A parede do salão. */}
      <section aria-labelledby="titulo" className="rs-cena rs-capa rs-parede-verde" data-cena="capa">
        <div className="rs-largura">
          <LousaPendurada
            naCalha={
              <div className="rs-capa-acao">
                <Agata rotulo={prato ? capa.pedirODia : casa.acao.whatsapp} mensagem={prato ? capa.mensagemDoDia(prato.nome) : undefined} className="rs-agata-grande rs-agata-principal" />
              </div>
            }
          >
            <div className="rs-capa-lousa">
              <h1 id="titulo" className="rs-giz rs-capa-titulo">
                <EscritoAGiz texto={capa.titulo} />
              </h1>
              <PanelaAGiz />
              <p className="rs-capa-hoje">
                <span className="rs-capa-dia">{prato ? `${lousa.hoje(nomeDoDia[hoje])}:` : lousa.domingo}</span>
                {prato && (
                  <>
                    <span className="rs-giz rs-capa-prato">{prato.nome}</span>
                    <span className="rs-giz rs-capa-preco">{real(prato.preco)}</span>
                  </>
                )}
              </p>
              <p className="rs-capa-pe">{capa.lugar}.</p>
            </div>
          </LousaPendurada>
        </div>
      </section>

      {/* 2 · Os pratos em cartaz: a tipografia como imagem, com o pontilhado do cardápio. */}
      <section aria-labelledby="pratos" className="rs-cena rs-cartaz-do-dia">
        <div className="rs-largura">
          <h2 id="pratos" className="rs-palavra-gigante">
            {pratos.nome}
          </h2>
          <div className="rs-cartaz-grade">
            {/* O gatilho do momento é a lista, não a seção: os pontilhados correm quando os pratos chegam à tela. Cada prato
                leva ao pedido com ele já marcado (o tique é a escolha, não um enfeite), e diz a porção ao lado do nome. */}
            <ul className="rs-cartaz-pratos" data-cena="cardapio">
              {pratos.itens.map((i) => (
                <li key={i.id}>
                  <Link href={`${pedido}?item=${i.id}`} className="rs-prato-cartaz" data-toque>
                    <svg aria-hidden="true" className="rs-tique" viewBox="0 0 24 24">
                      <path d="M3 13.5 9 19 21 5" />
                    </svg>
                    <span className="rs-prato-cartaz-nome">
                      {i.nome} <small className="rs-prato-cartaz-porcao">{i.porcao}</small>
                    </span>
                    <span aria-hidden="true" className="rs-prato-pontos" />
                    <span className="rs-prato-cartaz-preco">{real(i.preco)}</span>
                    <span className="sr-only">{resumoDoCardapio.marcar}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="rs-cartaz-lado">
              <p>{resumoDoCardapio.lide}</p>
              <Link href={daCasa("cardapio").caminho} className="rs-pontilhado mt-3">
                {resumoDoCardapio.ver}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3 · A semana na parede: a lousa em tamanho de parede. */}
      <SemanaNaParede hoje={hoje} />

      {/* 4 · A parede de azulejo branco: o painel da casa (o azulejo em escala de nove peças, sangrando) e os quatro
          azulejos pintados à mão na fileira da parede, um aviso em cada. */}
      <section aria-labelledby="avisos" className="rs-cena rs-avisos rs-parede-branca">
        <div aria-hidden="true" className="rs-painel" />
        <div className="rs-largura rs-avisos-grade">
          <h2 id="avisos" className="rs-titulo-de-cena rs-avisos-titulo">
            {ausencias.titulo}
          </h2>
          <ul className="rs-azulejos">
            {ausencias.itens.map((a) => (
              <li key={a.fato} className="rs-azulejo-pintado" data-peca="luz">
                <p className="rs-azulejo-peca">
                  <span className="rs-azulejo-fato">{a.fato}</span>
                </p>
                <p className="rs-azulejo-motivo">{a.motivo}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 · A comanda na mesa de madeira: como o pedido chega com o total. O momento da cena: o bloco desliza na madeira e
          vira para quem lê, quando chega à tela (o gatilho fica nele). A ação é o vínculo, não a ágata: na mesa, a ágata
          "Fazer o pedido" da porta já está na mesma tela (o crítico de fora, 14.10.2026). */}
      <section aria-labelledby="como-pedir" className="rs-cena rs-na-mesa rs-mesa">
        <div className="rs-largura rs-na-mesa-grade">
          <div className="rs-bloco" data-cena="balcao">
            <div className="rs-comanda">
              <p className="rs-comanda-cabeca">
                <span className="rs-comanda-titulo">{comoPedir.comanda}</span>
                <span className="rs-comanda-casa">{casa.nome}</span>
              </p>
              <ol>
                {comoPedir.passos.map((p) => (
                  <li key={p.titulo} className="rs-comanda-passo">
                    <svg aria-hidden="true" viewBox="0 0 24 24">
                      <path d="M3 13.5 9 19 21 5" />
                    </svg>
                    <p>
                      <strong>{p.titulo}</strong>
                      <span>{p.texto}</span>
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div>
            <h2 id="como-pedir" className="rs-titulo-de-cena max-w-[11ch]">
              {comoPedir.titulo}
            </h2>
            <p className="rs-texto-lide">
              {comoPedir.minimo(real(entrega.minimo))} {entrega.retirada}
            </p>
            <Link href={pedido} className="rs-pontilhado-claro mt-7">
              {comoPedir.montar}
            </Link>
          </div>
        </div>
      </section>

      {/* 6 · A porta: o endereço em cartaz, o guardanapo com o mapa do bairro e a plaquinha esmaltada do horário. Chega
          parada: o guardanapo responde à mão (o ponteiro e o toque, data-toque). */}
      <section aria-labelledby="porta-do-salao" className="rs-cena rs-fachada">
        <div className="rs-largura rs-fachada-grade">
          <h2 id="porta-do-salao" className="sr-only">
            {horarioEOnde.titulo}
          </h2>
          <address className="rs-endereco-cartaz">
            <span className="whitespace-nowrap">{rua}</span>
            <small>
              {bairro}.{" "}
              <Link href={daCasa("onde").caminho} className="rs-pontilhado">
                {horarioEOnde.comoChegar}
              </Link>
            </small>
          </address>
          <div className="rs-guardanapo" data-toque>
            <div className="rs-guardanapo-miolo">
              <MapaDoBairro credito={horarioEOnde.credito} />
            </div>
          </div>
          <div className="rs-esmaltada">
            <p className="rs-esmaltada-titulo">{horarioEOnde.horario}</p>
            <dl>
              {diasJuntos(expediente).map((g) => (
                <div key={g.dias}>
                  <dt>{g.dias}</dt>
                  <dd>{g.texto}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 7 · O cavalete na calçada: a chamada; as ações na soleira da porta. */}
      <section aria-labelledby="chamada" className="rs-cena rs-calcada" data-cena="calcada">
        <div className="rs-largura">
          <Cavalete>
            <h2 id="chamada" className="rs-giz rs-cavalete-titulo">
              <EscritoAGiz texto={chamada.titulo} />
            </h2>
            <p className="rs-cavalete-texto">{chamada.texto}</p>
          </Cavalete>
        </div>
        <div className="rs-soleira">
          <div className="rs-largura rs-soleira-acoes">
            <Agata rotulo={capa.montar} href={pedido} className="rs-agata-grande rs-agata-principal" />
            <Agata rotulo={casa.acao.whatsapp} className="rs-agata-contorno" />
            <Ligue />
          </div>
        </div>
      </section>
    </>
  );
}
