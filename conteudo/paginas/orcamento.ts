// O texto novo só desta parte do site (R10, fase 0, 28/10): o que for novo e só dela mora aqui, e não em
// conteudo/site.ts. Na norma culta, no registro impessoal (producao/esteira/10-texto-e-conteudo.md, 1).
// O montador (components/ilhas/montador.tsx) é ilha e importa este arquivo: nada aqui importa conteudo/site.ts, para o
// texto do site inteiro não ir ao navegador. Os valores saem de conteudo/planos.ts, por reais(), e nunca de texto fixo.

import { reais } from "@/lib/moeda";

/** O montador, em /orcamento e no início (R10, 28/10: a conta como objeto; as opções com o preço dentro). */
export const montador = {
  passos: { plano: "Escolha o plano.", modulos: "Some extras, se quiser." },
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

/** A rota direta (D12): a frase e as duas pontas do caminho da mensagem. */
export const rota = {
  titulo: "Nada fica salvo.",
  texto: "A mensagem só sai quando você envia, direto para o WhatsApp.",
  origem: "Você",
  destino: "WhatsApp",
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
      frase: "Em duas parcelas iguais: metade no briefing e metade com o site no ar.",
    },
    todoMes: {
      titulo: "Todo mês",
      sobre: "a mensalidade",
      frase: "Começa no mês seguinte à publicação e mantém o seu site no ar.",
    },
    aParte: {
      titulo: "À parte",
      sobre: "o que é novo",
      frase: "Página nova ou ferramenta nova tem orçamento à parte, antes de ser feita.",
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
    { termo: "Certificado de segurança", definicao: "Sem ele, o navegador mostra “Não seguro”. A renovação é automática e conferida todo mês." },
    { termo: "Domínio", definicao: "O nome do seu negócio na internet, registrado no registro.br. O vencimento é acompanhado todo mês." },
    { termo: "Hospedagem", definicao: "O lugar onde o site fica guardado. Todo mês, o Atlas confere se ele continua no ar." },
    { termo: "Cópias de segurança", definicao: "Uma cópia do site, guardada à parte e conferida todo mês. A cada três meses, o Atlas testa se a cópia funciona." },
    { termo: "Alterações", definicao: "Texto, preço ou horário. A mudança simples vai ao ar na mesma semana do pedido." },
  ],
};
