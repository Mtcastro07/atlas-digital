import { existsSync, statSync } from "node:fs";
import path from "node:path";

import { Abertura, Envelope, Secao } from "@/components/estrutura";
import { Globo } from "@/components/marca/globo";
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
 * Os sócios num painel só, um por linha (no celular) ou coluna (a partir
 * de 1024 px), com a foto de cada um (conteudo/site.ts, quemFaz.socios;
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
 * Da branchCto: ao fundo do bloco, o globo da marca ampliado, em traço de
 * bronze; o texto fica num cartão de vidro líquido que passa sobre ele —
 * no Chromium com ponteiro fino, os traços se dobram na borda do vidro
 * (ilha VidroLiquido). O cartão nunca tem mais folga por dentro que o
 * bloco em volta dele (até 03/10, 20 px dentro de 16 px, no celular).
 */
export function QuemFaz() {
  return (
    <Secao id="atlas" tom="branco">
      <Envelope>
        <Abertura titulo={quemFaz.titulo} lide={quemFaz.lide} />

        <ul className="mt-16 grid rounded-xl bg-card md:mt-20 lg:grid-cols-3">
          {quemFaz.socios.map((socio) => {
            const foto = fotoDe(socio.foto);
            const aviso = avisoDaVaga(socio.foto, foto);
            return (
              <li
                key={socio.nome}
                className="group flex items-center gap-5 p-6 not-last:border-b md:px-8 lg:flex-col lg:gap-4 lg:py-10 lg:text-center lg:not-last:border-r lg:not-last:border-b-0"
              >
                {/* O retrato: a foto, ou as iniciais enquanto ela não existe. Decorativo — o nome está ao lado. */}
                <span
                  aria-hidden="true"
                  className={`grid size-16 flex-none place-items-center overflow-hidden rounded-full bg-secondary font-display text-destaque text-secondary-foreground shadow-[0_0_0_0_transparent] transition-shadow duration-400 ease-atlas group-hover:shadow-[0_0_0_4px_var(--card),0_0_0_6px_var(--primary)] lg:size-24 ${
                    aviso && !foto ? "outline-1 outline-offset-4 outline-primary outline-dashed" : ""
                  }`}
                >
                  {foto ? (
                    <img src={foto.src} alt="" width={480} height={480} loading="lazy" decoding="async" className="vd-esqueleto size-full object-cover" />
                  ) : (
                    socio.iniciais
                  )}
                </span>
                <div className="min-w-0">
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

        <div
          data-tom="escuro"
          className="mov-giro relative mt-6 grid items-center gap-8 overflow-hidden rounded-xl bg-background p-4 md:grid-cols-[1fr_auto] md:gap-16 md:p-8"
        >
          <Globo className="pointer-events-none absolute top-1/2 left-[22%] w-[34rem] -translate-y-1/2 opacity-80 md:left-[34%] md:w-[46rem]" />
          <div data-vidro-liquido data-vidro-desfoque="6" data-vidro-intensidade="1.8" className="vd-vidro-liquido relative rounded-xl p-4 md:p-7">
            <h3 className="font-display tracking-titulo text-numero font-normal">{quemFaz.nome.titulo}</h3>
            <p className="mt-4 max-w-[56ch] text-corpo text-muted-foreground">{quemFaz.nome.texto}</p>
          </div>
          <svg viewBox="-8 -8 204 184" data-globo className="mov-globo relative order-first ml-4 w-24 md:order-none md:mr-6 md:ml-0 md:w-50" aria-hidden="true">
            <path d={LETRA_A} fill="currentColor" fillRule="evenodd" />
            <GloboDoLogotipo recorte="globo-do-nome" />
          </svg>
        </div>
      </Envelope>
    </Secao>
  );
}
