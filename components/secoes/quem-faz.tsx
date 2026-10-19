import { existsSync, statSync } from "node:fs";
import path from "node:path";

import { Abertura, Envelope, Secao } from "@/components/estrutura";
import { GloboDoLogotipo } from "@/components/marca/logotipo";
import { quemFaz } from "@/conteudo/site";

// Símbolo do logotipo para a nota sobre o nome: a mesma letra A de
// public/marca.svg (traçado copiado, não referenciado: o arquivo fica uma
// semana em cache no navegador, e uma referência nova a ele chegava vazia
// a quem já o tinha — o "A" sumia) e o globo do próprio logotipo, na mesma
// cor e com o mesmo recorte (desde 03/10, a pedido: antes, o globo daqui
// era bronze e sem recorte).
const LETRA_A =
  "M52,14 L103,14 L126,80 L146,80 L146,58 L178,58 L178,81 Q178,108 138,111 L156,166 L112,166 L98,120 Q96,110 94,110 L74,110 Q54,110 54,132 L54,166 L0,166 Z M77,50 L85,79 L69,79 Z";

/** Extensões aceitas para a foto de um sócio, na ordem de preferência. */
const EXTENSOES = [".webp", ".avif", ".jpg", ".jpeg", ".png"];
/** Acima disso, em desenvolvimento, a vaga avisa que a foto está pesada. */
const LIMITE_KB = 200;

type Foto = { src: string; kb: number };

/**
 * A foto de um sócio, se o arquivo já estiver em public/socios/ (a
 * primeira extensão que existir). Lida no servidor, na compilação: a foto
 * nova entra na próxima compilação (no npm run dev, na próxima carga).
 */
function fotoDe(nome: string): Foto | null {
  for (const extensao of EXTENSOES) {
    const arquivo = path.join(process.cwd(), "public", "socios", nome + extensao);
    if (existsSync(arquivo)) return { src: `/socios/${nome}${extensao}`, kb: Math.round(statSync(arquivo).size / 1024) };
  }
  return null;
}

/** As marcações de vaga só aparecem em desenvolvimento; o site publicado nunca as mostra. */
const emDesenvolvimento = process.env.NODE_ENV === "development";

/** A marcação da vaga: a foto que falta, com o caminho esperado, ou a pesada demais, com a ferramenta que a converte. */
function avisoDaVaga(nome: string, foto: Foto | null) {
  if (!emDesenvolvimento) return null;
  if (!foto) return { rotulo: "Foto pendente:", caminho: `public/socios/${nome}.webp` };
  if (foto.kb > LIMITE_KB) return { rotulo: `Foto pesada (${foto.kb} KB):`, caminho: "node ferramentas/preparar-fotos.mjs" };
  return null;
}

/**
 * O enquadramento de cada retrato (desde 17/10, a direção final do Atlas Digital, e o fechamento com o Impeccable, A:
 * "três retratos sem relação entre si"; sem foto nova): a mesma escala de rosto, pela distância dos olhos ao queixo
 * (120, 125 e 145 px nas fotos de 480 px), e a linha dos olhos na mesma altura, a 40% do quadro. `escala` é o lado da
 * foto em quadros; `x` e `y`, o meio do rosto e a linha dos olhos na foto, de 0 a 1. Medido nas fotos de public/socios/
 * em 17/10; uma foto nova pede a medida nova.
 */
const ENQUADRAMENTO: Record<string, { escala: number; x: number; y: number }> = {
  "gabriel-ribeiro-ota-yida": { escala: 1.28, x: 0.5, y: 0.375 },
  "matheus-azevedo-abreu": { escala: 1.23, x: 0.51, y: 0.396 },
  "matheus-castro-oliveira-de-luna-garcia": { escala: 1.06, x: 0.51, y: 0.396 },
};

/** As revisões na faixa: as colunas do traço que se abre, cada uma com a casa mais curta que a anterior (--c, de 1 a 1/4). */
const ABRE = 24;

/** O trecho da faixa, na convenção de O trabalho, deitada: o tempo corre para a direita (app/digital.css, "o-atlas").
 *  `outro`: o trecho de outro sócio, que só o celular mostra, num fio (a faixa inteira em cada sócio). */
function Trecho({ tipo, outro }: { tipo: string; outro?: boolean }) {
  return (
    <span data-trecho={tipo} data-outro={outro || undefined}>
      {tipo === "abre" &&
        !outro &&
        Array.from({ length: ABRE }, (_, k) => <span key={k} style={{ "--c": 1 - (0.75 * k) / (ABRE - 1) } as React.CSSProperties} />)}
    </span>
  );
}

/**
 * Os três sócios, pelo nome completo, na ordem das etapas do trabalho, cada um sobre o trecho da etapa de que responde
 * (desde 17/10, a direção final do Atlas Digital, seção 3, item 21): a faixa corre de um sócio ao outro, na convenção da
 * faixa de O trabalho, deitada (o tempo para a direita): o anel e o fio da visita e do briefing (Gabriel Ribeiro Ota Yida), o firme
 * das 24 horas e o traço que se abre das revisões (Matheus Castro Oliveira de Luna Garcia), os pontos da publicação, um
 * por dia útil, e o suporte que segue (Matheus Azevedo Abreu). Embaixo do trecho, o nome da etapa. A ordem é a das
 * etapas (quemFaz.socios[].etapa.ordem); a lista de conteudo/site.ts, que o JSON-LD e o llms.txt seguem, não muda.
 * O nome vem inteiro (`nomeCompleto`, quando o `nome` dos dados estruturados é o curto; desde a revisão de 17/10: a
 * fileira mostrava "Gabriel Yida" ao lado dos dois nomes completos).
 * Os retratos (sem foto nova): o mesmo quadro, a mesma escala de rosto e a mesma linha dos olhos (ENQUADRAMENTO), e o
 * mesmo tratamento, em duas tintas, do navy ao papel (o duotom, app/digital.css), para as três fotos de lugares e luzes
 * diferentes lerem como uma série; o quadro com o raio da ficha. Enquanto a foto não existe, o monograma das iniciais
 * no mesmo quadro; em desenvolvimento, a vaga sem foto aparece tracejada, com o caminho do arquivo esperado, e a foto
 * acima de 200 KB, com o aviso para convertê-la (ferramentas/preparar-fotos.mjs).
 * Até 17/10, os retratos em círculo, centrados sobre a função e o nome, na ordem da lista (a fileira de avatares de
 * modelo, e a selfie ao lado do retrato de estúdio: o fechamento com o Impeccable, A).
 * Depois, a origem do nome, num bloco navy com o símbolo da marca, o globo solto sobre o ombro da letra, que gira como
 * o do logotipo. Da branchCto: o texto fica num vidro líquido; no Chromium com ponteiro fino, o que passa sob a borda do
 * vidro se dobra nela (ilha VidroLiquido). Desde o segundo fechamento com o Impeccable (17/10), o vidro é uma janela da
 * chapa navy, rente às bordas dela, com o fio só na borda de dentro. Desde 16/10, na pedra, o segundo tom claro (a
 * história, logo acima, é a névoa), e, ao fundo do bloco, o A do logotipo, grande, na água rasa, atrás do canto do vidro
 * e quase todo fora dele: o vidro o dobra na borda.
 */
export function QuemFaz() {
  const socios = [...quemFaz.socios].sort((a, b) => a.etapa.ordem - b.etapa.ordem);
  return (
    // Na pedra (16/10): a névoa da história, de cima, e a pedra ficam a 0,050 de L, uma virada de cena. De 14 a 16/10,
    // no creme da história, porque o branco depois do creme ficava a 0,035, uma emenda.
    <Secao id="atlas" tom="pedra">
      <Envelope>
        {/* Na margem, como o resto da página (desde a revisão de 17/10; até então, centrado sobre as três colunas). */}
        <Abertura titulo={quemFaz.titulo} lide={quemFaz.lide} margem />

        <ol className="vd-socios mt-16 md:mt-20">
          {socios.map((socio) => {
            const foto = fotoDe(socio.foto);
            const aviso = avisoDaVaga(socio.foto, foto);
            const quadro = ENQUADRAMENTO[socio.foto];
            return (
              <li key={socio.nome}>
                {/* O retrato: a foto, ou as iniciais enquanto ela não existe. Decorativo: o nome está ao lado. */}
                <span
                  aria-hidden="true"
                  className={`vd-retrato font-display text-destaque ${aviso && !foto ? "outline-1 outline-offset-4 outline-primary outline-dashed" : ""}`}
                  style={quadro && ({ "--escala": quadro.escala, "--x": quadro.x, "--y": quadro.y } as React.CSSProperties)}
                >
                  {foto ? <img src={foto.src} alt="" width={480} height={480} loading="lazy" decoding="async" /> : socio.iniciais}
                </span>
                <div className="min-w-0">
                  {/* A função vem acima do nome, na leitura (no HTML, depois dele). */}
                  <div className="flex flex-col-reverse">
                    <h3 className="mt-1.5 text-destaque">{"nomeCompleto" in socio ? socio.nomeCompleto : socio.nome}</h3>
                    <p className="text-rotulo font-semibold text-muted-foreground">{socio.funcao}</p>
                  </div>
                  {aviso && (
                    <p className="mt-1.5 font-mono text-rotulo text-accent">
                      {aviso.rotulo}{" "}
                      {/* O caminho quebra só nas barras e nos hífens (<wbr>, que não vai junto quando se copia). */}
                      {aviso.caminho.split(/(?<=[/-])/).map((parte, i) => (
                        <span key={i}>
                          {i > 0 && <wbr />}
                          {parte}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
                <div className="vd-socio-etapa">
                  {/* A faixa inteira, com o trecho dele aceso e os dos outros num fio (desde a revisão de 18/10: no
                      celular, empilhados, os trechos de largura toda não liam como uma faixa só); na mesa, só o dele. */}
                  <span aria-hidden="true" className="vd-socio-trecho">
                    {socios.flatMap((dono) =>
                      dono.etapa.trechos.map((t) => <Trecho key={t} tipo={t} outro={dono !== socio} />),
                    )}
                  </span>
                  <p className="text-nota font-medium">
                    <span className="sr-only">Responde pela etapa: </span>
                    {socio.etapa.nome}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* A chapa (17/10, segundo fechamento com o Impeccable): o vidro é uma janela dela, rente às bordas, e não um
            cartão dentro do bloco navy (a marca L4; a avaliação A). Até então, o vidro tinha recuo, raio e contorno próprios
            dentro do bloco, que tinha os seus. O único fio do vidro é a borda de dentro, onde o A se dobra. A chapa tem o raio
            do instrumento desde a direção final de 17/10 (--r-instrumento, 24 px na mesa: a tela pequena no papel; de manhã,
            32 px; de 16 a 17/10, 4 px, e até então 12 px: no canto redondo, a refração do vidro trazia a pedra de fora para
            dentro dele, num arco claro). Desde a revisão de 17/10, a chapa é a raiz do fundo do vidro (will-change: filter,
            a "backdrop root" do Chromium): a refração só vê o que a chapa pinta, e fora do raio dela não há pedra a trazer;
            e o vidro tem o canto vivo (o mapa da refração usa um raio só, e o canto redondo junto da divisória dobrava a
            perna do A numa mancha clara): quem arredonda é a chapa. As colunas com minmax(0, 1fr): com a letra a 200%,
            "sustentava" alargava o vidro e a chapa cortava 7 das 15 linhas. */}
        <div
          data-tom="escuro"
          className="mov-giro relative mt-16 grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[var(--r-instrumento)] bg-background [will-change:filter] md:mt-20 md:grid-cols-[minmax(0,1fr)_auto]"
        >
          {/* O A do logotipo ao fundo (16/10), na água rasa: no celular, no alto, à direita do símbolo, com os pés sob a
              borda de cima do cartão, na folga dele; na mesa, atrás do símbolo, com a perna da esquerda sob a borda do cartão, na folga dele,
              longe do texto. Recortado pelo bloco. */}
          <svg
            viewBox="0 0 178 166"
            aria-hidden="true"
            className="pointer-events-none absolute -top-6 -right-14 h-[11rem] text-[color-mix(in_oklch,var(--agua-rasa)_80%,var(--background))] md:top-1/2 md:right-4 md:h-[135%] md:-translate-y-1/2"
          >
            <path d={LETRA_A} fill="currentColor" fillRule="evenodd" />
          </svg>
          <div
            data-vidro-liquido
            data-vidro-desfoque="6"
            data-vidro-intensidade="1.8"
            className="vd-vidro-liquido relative min-w-0 rounded-none border-0 border-t p-6 md:border-t-0 md:border-r md:p-10"
          >
            <h3 className="font-display tracking-titulo text-numero font-normal [overflow-wrap:anywhere]">{quemFaz.nome.titulo}</h3>
            <p className="mt-4 max-w-[56ch] text-corpo text-muted-foreground">{quemFaz.nome.texto}</p>
          </div>
          {/* z-[1]: no celular, o order-first pinta o símbolo antes do A do fundo (a ordem de pintura segue a do order); com
              a letra a 200%, os dois se cruzam, e o A do fundo cobria o símbolo. */}
          <svg viewBox="-8 -8 204 184" data-globo className="mov-globo relative z-[1] order-first mx-6 my-6 w-24 self-center md:order-none md:mx-14 md:w-50" aria-hidden="true">
            <path d={LETRA_A} fill="currentColor" fillRule="evenodd" />
            <GloboDoLogotipo recorte="globo-do-nome" />
          </svg>
        </div>
      </Envelope>
    </Secao>
  );
}
