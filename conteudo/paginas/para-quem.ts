// O texto novo só desta parte do site (R10, fase 0, 28/10): o que for novo e só dela mora aqui, e não em
// conteudo/site.ts. Na norma culta, no registro impessoal (producao/esteira/10-texto-e-conteudo.md, 1).
// Desde 28/10 (R10, fase 1, agente de para-quem): a chapa da carta presa na rolagem (D5), os públicos como legenda, o
// índice dos nichos e a vitrine. Os números da frase saem da contagem dos dados, por extenso (lib/por-extenso.ts),
// e nunca de texto fixo.

import { paraQuem, simulador } from "@/conteudo/site";
import { porExtenso } from "@/lib/por-extenso";

type IdDoSite = (typeof simulador.sites)[number]["id"];

/**
 * O índice dos nichos: cada nicho de `paraQuem.nichos.lista` com o seu site de exemplo, quando há. O bairro é o do
 * nome do site (simulador.sites: "Barbearia Santa Rosa", "Cozinha do Ingá"); o build confere que ele está no nome,
 * para nenhum bairro sair de outro lugar.
 */
const EXEMPLOS: Partial<Record<(typeof paraQuem.nichos.lista)[number], { site: IdDoSite; bairro: string }>> = {
  Barbearia: { site: "barbearia", bairro: "Santa Rosa" },
  "Material de Construção": { site: "deposito", bairro: "Engenhoca" },
  Nutrição: { site: "nutricao", bairro: "Icaraí" },
  Odontologia: { site: "odontologia", bairro: "Boa Viagem" },
  "Pet Shop": { site: "petshop", bairro: "São Francisco" },
  Restaurante: { site: "restaurante", bairro: "Ingá" },
};

export const indiceDosNichos = paraQuem.nichos.lista.map((nicho) => {
  const exemplo = EXEMPLOS[nicho];
  if (!exemplo) return { nicho };
  const site = simulador.sites.find((s) => s.id === exemplo.site);
  if (!site || !site.nome.endsWith(exemplo.bairro)) throw new Error(`para-quem: o bairro ${exemplo.bairro} não está no nome do site ${exemplo.site}`);
  return { nicho, bairro: exemplo.bairro, caminho: site.caminho, nome: site.nome };
});

const comExemplo = indiceDosNichos.filter((n) => n.bairro).length;
const sitesDeExemplo = simulador.sites.length;

export const textosDaPagina = {
  /** O rótulo do vínculo de cada público (a 17 px): diz o que o vínculo abre. Até 28/10, "Exemplo pronto". */
  exemplo: "Site de exemplo",
  novaAba: "abre numa nova aba",
  nichos: {
    frase: `${porExtenso(comExemplo, "m", true)} dos ${porExtenso(paraQuem.nichos.lista.length)} nichos têm um site de exemplo pronto. Ao lado de cada um, o bairro do exemplo (estabelecimentos fictícios).`,
  },
  /**
   * A frase do código, na margem da chapa [provisório: CONTRATO.md, 3.2]. "Três dos seis": o esboço dizia "dos sites
   * de exemplo", e o índice da mesma página mostra seis. A alternativa é a do PDF (esboco/CRITICA-PDF.md, 2, item 10).
   */
  carta: {
    frase: (pontos: number) =>
      `Este trecho do código do site põe Icaraí na carta. A posição vem do OpenStreetMap, o mapa aberto feito por voluntários. Os ${porExtenso(pontos)} pontos são os bairros de ${porExtenso(pontos)} dos ${porExtenso(sitesDeExemplo)} sites de exemplo (estabelecimentos fictícios).`,
    credito: "© colaboradores do OpenStreetMap",
  },
  /** O lide da vitrine [provisório: paginas/para-quem.md, 3.4; R9, 5.2]. Os fatos são os de hoje e os do kit. */
  vitrine:
    "Na nutrição, o conselho da profissão proíbe depoimento e foto de resultado. Num depósito de material de construção, a conta da quantidade e o horário à vista são indispensáveis. O site parte dessas regras, e não do visual.",
};

/** O título dos públicos, literal, com espaço inseparável em "no bairro" e "da internet": a preposição não fica no fim da linha. */
export const tituloDosPublicos = paraQuem.titulo.map((linha) => linha.replace(/ (bairro|internet)/, " $1"));
