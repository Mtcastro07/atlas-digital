// O texto novo só desta parte do site (R10, fase 0, 28/10): o que for novo e só dela mora aqui, e não em
// conteudo/site.ts. Na norma culta, no registro impessoal (producao/esteira/10-texto-e-conteudo.md, 1).
//
// O livro-razão das quatro etapas (R10, construção, 28/10; a prova de registros/atlas/design-v2/R10/esboco/o-trabalho):
// o nome e o prazo de cada etapa continuam a sair de `trabalho.passos` (o mesmo dado do início e do llms.txt); daqui
// saem o objeto dela e a régua da abertura. Toda frase nova tem fonte no kit (producao/esteira).
// Como hoje (D4 e D10, decididas em 27 e 28/10): "briefing" e "rascunho" sem glosa; o prazo "7 a 15 dias úteis, em
// geral", contado do briefing completo.

import { porExtenso } from "@/lib/por-extenso";
import { figuras, trabalho } from "@/conteudo/site";

/** O nome da região das etapas, para o leitor de tela ([provisório]: o R10, paginas/o-trabalho.md, 7, X1). */
export const rotuloDasEtapas = `As ${porExtenso(trabalho.passos.length, "f")} etapas`;

/**
 * O prazo de cada etapa na cabeça da linha: o valor com a unidade (no degrau do número) e o resto da frase. A unidade
 * é o começo do rótulo de hoje (`trabalho.passos[i].marca.rotulo`), e o build para se deixar de ser: o prazo segue o
 * do site, palavra por palavra ("1 visita presencial", "24 h após o briefing completo", "2 rodadas sem custo", "7 a 15
 * dias úteis, em geral").
 */
const UNIDADES = ["visita", "", "rodadas", "dias úteis"] as const;

export const etapas = trabalho.passos.map((passo, i) => {
  const unidade = UNIDADES[i];
  if (!passo.marca.rotulo.startsWith(unidade)) {
    throw new Error(`conteudo/paginas/o-trabalho.ts: o rótulo "${passo.marca.rotulo}" não começa com "${unidade}"`);
  }
  return {
    titulo: passo.titulo,
    valor: unidade ? `${passo.marca.valor} ${unidade}` : passo.marca.valor,
    resto: unidade ? passo.marca.rotulo.slice(unidade.length) : ` ${passo.marca.rotulo}`,
  };
});

/** O texto de cada etapa: o mesmo do llms.txt (`trabalho.passos`, com a fonte no kit de cada frase). */
export const textos = trabalho.passos.map((p) => p.texto);

/** Etapa 1: a regra dos campos obrigatórios (02-briefing.md:18; 01-processo.md:82) e o formulário da visita. */
export const visita = {
  regra: ["Os campos com", "são obrigatórios: as 24 horas só começam a contar com todos preenchidos e o material entregue."],
  titulo: "Formulário da visita",
  recorte: "trecho",
  // As perguntas literais do kit (02-briefing.md:35, :60, :61, :78 e :150).
  campos: [
    { campo: "Nome de fachada", pergunta: "“Como o senhor quer que apareça escrito no site?”" },
    { campo: "Horário, dia a dia", pergunta: "“Fecha para almoço?”" },
    { campo: "Prazo de resposta ao contato", pergunta: "“Em quanto tempo o senhor responde uma mensagem?”" },
    { campo: "Ação principal, uma só", pergunta: "“Quando alguém entrar, o que o senhor quer que faça?”" },
  ],
  promessa: { campo: "Rascunho prometido para", pergunta: "data, hora e por onde chega" },
} as const;

/** Etapa 2: o primeiro dia, em horas (a mesma trena da abertura, noutra escala). */
export const primeiroDia = {
  pontas: ["Briefing completo", "O link chega"],
  escala: ["0 h", "6 h", "12 h", "18 h", "24 h"],
} as const;

/** Etapa 3: a frase grande (01-processo.md:180: "o cliente aprova por escrito (mensagem basta)"). */
export const fraseDaAprovacao = "A aprovação vale por mensagem.";

/** Etapa 4: a frase para o leigo, sob a linha <lastmod> do mapa do site (R10/paginas/o-trabalho.md, 4). */
export const fraseDoMapa =
  "Ao publicar, cada página entra no mapa do site, o arquivo em que o Google procura as páginas e a data em que cada uma mudou. A linha em bronze é a desta página.";

/**
 * A régua da abertura, como hoje (D10): os trechos de figuras.regua, contados do briefing completo, com o valor junto
 * do nome (Q18): o rascunho com as 24 h da etapa 2, a publicação com a janela de 7 a 15 dias úteis.
 */
const [rascunho, , publicacao] = figuras.regua.trechos;
export const regua = {
  rotulos: [
    `${rascunho.rotulo}, ${trabalho.passos[1].marca.valor}`,
    figuras.regua.trechos[1].rotulo,
    `Publicação, de ${publicacao.de} a ${publicacao.ate} ${figuras.regua.unidade}, em geral`,
  ],
  legenda: "Dias úteis, contados do briefing completo.",
};
