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

/** O código dos destaques: a frase para o leigo e a conferência feita no aparelho (paginas/inicio.md, 2.2, e a
 *  crítica do esboço). A conferência é montada na ilha (components/ilhas/conferencia.tsx) com estas peças. */
export const codigoDosDestaques = {
  barreira: ["Este endereço", "Outro endereço"],
  leigo:
    "É a primeira linha da regra de segurança do site: a página só carrega o que vem do próprio endereço. Um rastreador viria de outro endereço e ficaria de fora.",
  conferencia: {
    espera: "A conferência roda quando a página abre, neste aparelho.",
    /** {hora} vira "às 9h05" (ou "à 1h05"); {cookies} e {arquivos}, a contagem por extenso abaixo. */
    frase: "Conferido {hora}, quando a página abriu, neste aparelho: {cookies} e {arquivos} de outro endereço.",
    cookies: { nenhum: "nenhum cookie", um: "1 cookie", varios: "{n} cookies" },
    arquivos: { nenhum: "nenhum arquivo", um: "1 arquivo", varios: "{n} arquivos" },
    /** Só com 0 e 0: a página não leu cookie nem carregou nada de fora. */
    nada: "Nada foi enviado a terceiros.",
  },
  como: {
    resumo: "Como a conferência é feita",
    texto: (arquivo: string, linhas: string) =>
      `O navegador lista os arquivos que a página carregou e os cookies que ela consegue ler, e a conta é feita aqui, sem sair do aparelho. A linha acima está no arquivo ${arquivo} do site, na ${linhas}.`,
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
