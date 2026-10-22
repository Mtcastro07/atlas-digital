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
 * Os sócios numa fileira só, um por linha (no celular) ou coluna (a
 * partir de 1024 px), com a foto de cada um (conteudo/site.ts, quemFaz.socios;
 * arquivos em public/socios/) — e, enquanto a foto não existe, o
 * monograma das iniciais no mesmo lugar. Em desenvolvimento, a vaga sem
 * foto aparece com um traço tracejado e o caminho do arquivo esperado,
 * e a foto acima de 200 KB, com o aviso para convertê-la
 * (ferramentas/preparar-fotos.mjs). Enquanto a foto carrega, o círculo
 * pulsa devagar (vd-esqueleto). No hover, o retrato ganha um anel
 * de bronze. Nas colunas, monograma e nome ficam centrados um
 * sobre o outro: o nome longo quebra em duas linhas sem desalinhar os
 * outros. Depois, a origem do nome, num bloco navy com o símbolo da
 * marca — o globo solto sobre o ombro da letra, que gira como o do
 * logotipo. No celular, o símbolo abre o bloco, como o ícone dos cartões.
 * Da branchCto: o texto fica num vidro líquido; no Chromium com ponteiro
 * fino, o que passa sob a borda do vidro se dobra nela (ilha VidroLiquido).
 * Desde o segundo fechamento com o Impeccable (17/10), o vidro é uma janela
 * da chapa navy, rente às bordas dela, com o fio só na borda de dentro; até
 * então, um cartão de vidro com recuo, raio e contorno dentro do bloco
 * navy (o cartão dentro do cartão, a marca L4).
 * Desde 16/10 ("Identidade mais profunda"):
 * - na pedra, o segundo tom claro: a história, logo acima, é a névoa (até
 *   então, as duas cenas no mesmo creme);
 * - os sócios sem os filetes (a linha entre filetes era o recipiente de
 *   quase toda cena clara; fica no extrato de Planos e na sanfona das
 *   Dúvidas): o grupo se faz pelo espaço;
 * - ao fundo do bloco, no lugar do globo da marca ampliado (o globo da
 *   página é o da abertura), o A do logotipo, grande, na água rasa, atrás
 *   do canto do cartão de vidro e quase todo fora dele: o vidro o dobra na
 *   borda. O mito contado pela marca medida. A tinta do vidro não muda.
 */
export function QuemFaz() {
  return (
    // Na pedra (16/10): a névoa da história, de cima, e a pedra ficam a 0,050 de L, uma virada de cena. De 14 a 16/10,
    // no creme da história, porque o branco depois do creme ficava a 0,035, uma emenda.
    <Secao id="atlas" tom="pedra">
      <Envelope>
        <Abertura titulo={quemFaz.titulo} lide={quemFaz.lide} />

        {/* Direto na pedra, sem filetes (16/10): o espaço agrupa. De 16/10, entre dois filetes; até então, num painel branco. */}
        <ul className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-y-8 md:mt-20 lg:grid-cols-3 lg:gap-x-8">
          {quemFaz.socios.map((socio) => {
            const foto = fotoDe(socio.foto);
            const aviso = avisoDaVaga(socio.foto, foto);
            return (
              <li
                key={socio.nome}
                className="group flex flex-wrap items-center gap-5 px-6 md:px-8 lg:flex-col lg:flex-nowrap lg:gap-4 lg:text-center"
              >
                {/* O retrato: a foto, ou as iniciais enquanto ela não existe. Decorativo — o nome está ao lado. */}
                <span
                  aria-hidden="true"
                  className={`grid size-16 flex-none place-items-center overflow-hidden rounded-full bg-secondary font-display text-destaque text-secondary-foreground shadow-[0_0_0_0_transparent] transition-shadow duration-400 ease-atlas group-hover:shadow-[0_0_0_4px_var(--background),0_0_0_6px_var(--primary)] lg:size-24 ${
                    aviso && !foto ? "outline-1 outline-offset-4 outline-primary outline-dashed" : ""
                  }`}
                >
                  {foto ? (
                    <img src={foto.src} alt="" width={480} height={480} loading="lazy" decoding="async" className="vd-esqueleto size-full object-cover" />
                  ) : (
                    socio.iniciais
                  )}
                </span>
                {/* grow basis-32 e o flex-wrap do item: com a letra a 200%, o texto desce para baixo do retrato (17/10); ao
                    lado dele, sobravam 30 px, e o nome e a função passavam da tela. Com a letra normal, cabe ao lado. */}
                <div className="min-w-0 grow basis-32 lg:basis-auto">
                  {/* A função vem acima do nome, na leitura (no HTML, depois dele): as funções ficam na mesma linha nas
                      três colunas, e só o nome longo desce mais, sem desalinhar os outros. */}
                  <div className="flex flex-col-reverse">
                    <h3 className="mt-1.5 text-destaque">{socio.nome}</h3>
                    <p className="text-rotulo font-semibold text-accent">{socio.funcao}</p>
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
              </li>
            );
          })}
        </ul>

        {/* A chapa (17/10, segundo fechamento com o Impeccable): o vidro é uma janela dela, rente às bordas, e não um
            cartão dentro do bloco navy (a marca L4; a avaliação A). Até então, o vidro tinha recuo, raio e contorno próprios
            dentro do bloco, que tinha os seus. O único fio do vidro é a borda de dentro, onde o A se dobra. A chapa tem os
            cantos quase vivos (4 px, como a folha dobrada do início; até então, 12 px): no canto redondo, a refração do
            vidro trazia a pedra de fora para dentro dele, num arco claro. As colunas com
            minmax(0, 1fr): com a letra a 200%, "sustentava" alargava o vidro e a chapa cortava 7 das 15 linhas. */}
        <div
          data-tom="escuro"
          className="mov-giro relative mt-6 grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[4px] bg-background md:grid-cols-[minmax(0,1fr)_auto]"
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
