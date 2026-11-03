// O texto novo só desta parte do site (R10, fase 0, 28/10): o que for novo e só dela mora aqui, e não em
// conteudo/site.ts. Na norma culta, no registro impessoal (producao/esteira/10-texto-e-conteudo.md, 1).
// O início (R10, fase 1, 28/10). Onde a frase repete um fato que já existe em site.ts, ela o lê de lá, e não o copia.

import { capa, fundacao } from "@/conteudo/site";

/** A capa: o lide com o que se vende e onde, antes da frase vinculante, literal (ata v3.0, IV.4). [provisório:
 *  paginas/inicio.md, 2.1, item 3; a alternativa: o lide de hoje, só a frase vinculante.] A segunda ação leva aos
 *  passos, na própria página: sem seta. [provisório; a alternativa: "Conhecer o método".] */
export const capaDoInicio = {
  lide: `Sites para pequenos negócios de Niterói. ${capa.lide}`,
  acaoSecundaria: { rotulo: "Ver como funciona", destino: capa.acaoSecundaria.destino },
};

/** O título dos passos, com as palavras do título de /o-trabalho. [provisório: paginas/inicio.md, 2.3; a
 *  alternativa: "Quatro etapas. Nenhuma delas opcional."] */
export const tituloDosPassos = ["Como o site é feito."];

/** A prova dos destaques: a frase para o leigo e a conferência feita no aparelho (paginas/inicio.md, 2.2, e a
 *  crítica do esboço). A conferência é montada na ilha (components/ilhas/conferencia.tsx) com estas peças. */
export const provaDosDestaques = {
  barreira: ["Este site", "Outras empresas"],
  /** O que isso dá ao cliente (03/11: até então, a frase da regra de segurança do site, para o leigo). O mesmo fato da
   *  dúvida 10 (conteudo/duvidas.ts): sem rastreador e sem aviso de cookies. */
  leigo: "O seu site sai igual: sem rastreador e sem aviso de cookies para o seu cliente aceitar.",
  conferencia: {
    espera: "A conferência é feita neste aparelho, quando a página abre.",
    /** {hora} vira "às 9h05" (ou "à 1h05"); {cookies} e {arquivos}, a contagem por extenso abaixo. */
    frase: "Conferido {hora}, neste aparelho: {cookies} e {arquivos} de outras empresas.",
    cookies: { nenhum: "nenhum cookie", um: "1 cookie", varios: "{n} cookies" },
    arquivos: { nenhum: "nada carregado", um: "1 arquivo carregado", varios: "{n} arquivos carregados" },
    /** Só com 0 e 0: a página não leu cookie nem carregou nada de fora. */
    nada: "Nada foi enviado a terceiros.",
  },
};

/** As chapas da fundação (D3): o lide de hoje partido em duas frases, como na prova, e a legenda das chapas, que é o
 *  termo de hoje ("3 contratos com esta condição."). As chapas são aria-hidden: a legenda as diz. */
const [primeira, ...resto] = fundacao.lide.split(/(?<=\.) /);
const contratos = fundacao.termos.find((t) => "selos" in t)!;
export const chapas = {
  lide: primeira,
  apoio: resto.join(" "),
  total: Number(contratos.valor),
  de: "de",
  legenda: `${contratos.valor} ${contratos.rotulo}.`,
};
