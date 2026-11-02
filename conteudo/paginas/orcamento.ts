// O texto novo só desta parte do site (R10, fase 0, 28/10): o que for novo e só dela mora aqui, e não em
// conteudo/site.ts. Na norma culta, no registro impessoal (producao/esteira/10-texto-e-conteudo.md, 1).
// O montador (components/ilhas/montador.tsx) é ilha e importa este arquivo: nada aqui importa conteudo/site.ts, para o
// texto do site inteiro não ir ao navegador. Os valores saem de conteudo/planos.ts, por reais(), e nunca de texto fixo.

import { reais } from "@/lib/moeda";

/** O montador, em /orcamento e no início (R10, 28/10: a conta como objeto; as opções com o preço dentro). */
export const montador = {
  passos: { plano: "O plano.", modulos: "Os módulos, opcionais." },
  umaVez: "uma vez",
  porMes: "por mês",
  inclui: (plano: string) => `O ${plano} inclui`,
  siteDoPlano: "Ver o site deste plano,",
  paginaAdicional: { rotulo: "Página adicional:", texto: (valor: number) => `${reais(valor)} por página, paga uma vez e fora desta soma.` },
  conta: "A conta",
  criacao: "Criação",
  mensal: "Por mês",
  // D4 (28/10): "briefing" sem glosa, como hoje.
  metades: (metade: number) => `${reais(metade)} no briefing e ${reais(metade)} na publicação.`,
  inicioDaMensalidade: "A partir do mês seguinte à publicação.",
  falado: (criacao: number, mensal: number) => `Criação, ${reais(criacao)}. Por mês, ${reais(mensal)}.`,
  mensagem: "A mensagem",
  copiar: "Copiar",
  verCondicao: "Ver a condição",
  // D14 (28/10): o envio direto; o "Preparar mensagem" saiu.
  enviar: "Enviar no WhatsApp",
};

/** A rota direta (D12): a frase, e o código de lib/whatsapp.ts com a tradução. O comentário do código fica literal. */
export const rota = {
  titulo: "A conta é feita neste aparelho.",
  texto: "Esta página não registra nada. A escolha e a mensagem só saem daqui no envio, direto para o WhatsApp.",
  origem: "Este aparelho",
  destino: "WhatsApp",
  traducao: "Em português: o vínculo do WhatsApp já leva a mensagem escrita, sem passar por um servidor deste site.",
  fonte: (arquivo: string, linhas: string) => `Do arquivo ${arquivo}, ${linhas}.`,
};

/**
 * A cena "O que o preço cobre." (D14). O que a mensalidade cobre é o da resposta 2 das
 * dúvidas (conteudo/duvidas.ts), com "o que permite o https" no lugar do ícone (a síntese do R10, 5.2, item 2).
 * "Não seguro" é o aviso do Chrome em português (conferido no arquivo de tradução: esboco/orcamento/ESBOCO.md, 5.3).
 */
export const precoCobre = {
  titulo: "O que o preço cobre.",
  grupos: {
    umaVez: {
      titulo: "Uma vez",
      sobre: "a criação",
      frase: "Paga em duas parcelas iguais: metade no briefing e metade na publicação, com o site no ar.",
    },
    todoMes: {
      titulo: "Todo mês",
      sobre: "a mensalidade",
      frase: "Começa no mês seguinte à publicação e cobre o que mantém o site no ar.",
    },
    aParte: {
      titulo: "À parte",
      sobre: "o que é novo",
      frase:
        "Páginas novas e funcionalidades novas são orçadas em separado, antes de serem feitas. A página adicional inclui a redação, a diagramação e a publicação.",
    },
  },
  endereco: { legenda: "O endereço deste site, como exemplo." },
  /** O desenho das duas parcelas, sob "Uma vez" (a frase ao lado diz o mesmo, em texto). */
  metades: ["Metade no briefing", "Metade na publicação"],
  /**
   * As cinco partes que a mensalidade cobre (producao/esteira/18-publicacao-e-manutencao.md, 7.1). A definição diz o que a
   * parte faz e o que se confere nela, e não repete o nome dela. Fontes: o certificado, 18, seção 4, regra 3 ("renovação
   * automática", "conferido a cada mês"); o domínio, seção 4, regra 1 (o registro.br), e 7.3, item 6 (o vencimento); a
   * hospedagem, 7.3, item 2 ("O site no ar"); as cópias, 7.3, item 3; as alterações, 7.1 ("a mudança simples vai ao ar na
   * mesma semana do pedido"). O limite mensal de alterações segue pendente de decisão (7.1): não se promete.
   */
  mensalidade: [
    { termo: "Certificado de segurança", definicao: "O que permite o https. Sem ele, o navegador mostra “Não seguro”. A renovação é automática e conferida todo mês." },
    { termo: "Domínio", definicao: "O nome do negócio na internet, registrado no registro.br. O vencimento é acompanhado todo mês." },
    { termo: "Hospedagem", definicao: "O servidor que entrega o site a quem o abre. A conferência mensal confirma que ele segue no ar." },
    { termo: "Cópias de segurança", definicao: "A cópia do site fica à parte e é conferida todo mês. A cada trimestre, uma restauração de teste." },
    { termo: "Alterações", definicao: "Texto, preço ou horário. A mudança simples vai ao ar na mesma semana do pedido." },
  ],
};
