// O texto novo só desta parte do site (R10, fase 0, 28/10): o que for novo e só dela mora aqui, e não em
// conteudo/site.ts. Na norma culta, no registro impessoal (producao/esteira/10-texto-e-conteudo.md, 1).
// O que já existia (os capítulos, o mito, os nomes e as funções) continua em conteudo/site.ts (quemFaz).

/** A origem, em dois tempos (R10, CONTRATO.md, 3.6): o vínculo do capítulo 4 e a peça do logotipo. */
export const origem = {
  /** Depois do capítulo 4, "O começo, declarado": a condição mora na nota 1 da linha "Criação" de /planos (D3). */
  condicao: { rotulo: "Ver a condição nos planos", destino: "/planos#fundacao" },
  /** O nome do botão da peça inteira (o leitor de tela não soletra o desenho). */
  peca: "O globo do logotipo, em peças",
};

/**
 * "Quem faz", mais detalhado (a decisão do aprovador de 27 e 28/10; CONTRATO.md, seção 5). A ordem é a do lide:
 * venda, desenvolvimento, suporte. Os sócios, pelo índice em quemFaz.socios (conteudo/site.ts), que fica na ordem de
 * hoje: o JSON-LD e o llms.txt seguem nela.
 */
export const quemFazDetalhe = {
  /** A formação e a origem, ditas uma vez na página. Literal: era a primeira frase do lide da abertura
   *  (conteudo/site.ts:112 em e527840), que passou para cá (CONTRATO.md, 5.2). A conferir pelos três sócios antes
   *  da publicação (o comentário de quemFaz, em conteudo/site.ts). Desde 03/11, só ela: a segunda frase repetia o mito,
   *  logo acima (o pedido de texto simples). */
  formacao: "Três estudantes de Ciência da Computação da Universidade Federal Fluminense, em Niterói.",
  /** Os índices de quemFaz.socios na ordem do lide: Gabriel (venda), Matheus Castro (desenvolvimento), Matheus
   *  Azevedo (suporte). As listas abaixo (os compromissos, os papéis de cada etapa) seguem esta ordem. */
  ordem: [0, 2, 1] as const,
  /**
   * O compromisso de cada um [provisório: CONTRATO.md, 5.1, item 3], da coluna "Nunca faz" do kit, na voz impessoal e
   * afirmativa, sem fato novo. A alternativa: sem a linha, só o nome e a função.
   */
  compromissos: [
    // producao/esteira/01-processo.md:17, "prometer o que o plano não inclui".
    "Nada é prometido além do que o plano inclui.",
    // producao/esteira/01-processo.md:18, "Mudar o escopo sem orçamento".
    "Nada muda no combinado sem orçamento antes.",
    // producao/esteira/01-processo.md:19, "Aprovar texto de site sem a norma do conselho conferida".
    "Nenhum texto é aprovado sem que as regras do conselho sejam conferidas.",
  ],
  legenda: "Quem faz o quê, em cada etapa",
  responde: "Responde pela etapa.",
  acao: "Falar com os sócios no WhatsApp",
  /**
   * As etapas do site (trabalho.passos) e o suporte, depois da publicação. Cada célula, na ordem do lide (Gabriel,
   * Matheus Castro, Matheus Azevedo): `null` é a ausência; `responde` marca quem responde pela etapa (um por linha, como o título
   * promete). Só o que o kit diz (producao/esteira/01-processo.md, conferido linha a linha em 28/10/2026); a fonte de
   * cada célula no comentário dela.
   */
  etapas: [
    {
      etapa: "Visita e briefing",
      papeis: [
        // Gabriel: 01-processo.md:17 (o briefing no estabelecimento, as fotos), :77 ("no estabelecimento,
        // conversando"; o formulário nunca fica com o cliente), :79 (preenche os campos; no Profissional e no
        // Completo, tira as fotos).
        { responde: true, texto: "Faz a conversa no seu negócio e preenche o formulário ali mesmo. No Profissional e no Completo, tira as fotos." },
        // Matheus Castro: o kit não lhe dá papel nesta etapa.
        null,
        // Matheus Azevedo: 01-processo.md:17 (o contrato "redigido por Matheus Azevedo Abreu"), :19 ("A redação do
        // contrato"), :72-73 (sem contrato assinado, o briefing não acontece).
        { responde: false, texto: "Escreve o contrato, assinado antes do briefing." },
      ],
    },
    {
      etapa: "Rascunho",
      papeis: [
        // Gabriel: 01-processo.md:162 ("Gabriel Ribeiro Ota Yida envia ao cliente"), :240 (H+22 a H+24, envio ao
        // cliente).
        { responde: false, texto: "Envia o rascunho a você." },
        // Matheus Castro: 01-processo.md:18 (a direção de arte, a revisão, a régua), :111 ("Matheus Castro Oliveira de
        // Luna Garcia decide"), :148 ("confere"), :235 (a aprovação da direção de arte), :238 (a régua e as correções).
        { responde: true, texto: "Decide o visual e confere tudo o que é feito." },
        // Matheus Azevedo: 01-processo.md:19 (a conferência das normas), :101 ("conferido por Matheus Azevedo Abreu
        // quando há conselho").
        { responde: false, texto: "Confere as regras do conselho, quando a profissão tem um." },
      ],
    },
    {
      etapa: "Revisões",
      papeis: [
        // Gabriel: 01-processo.md:174 ("Gabriel Ribeiro Ota Yida registra").
        { responde: false, texto: "Anota cada pedido seu." },
        // Matheus Castro: 01-processo.md:174 ("Matheus Castro Oliveira de Luna Garcia confere"), :179-180 (a régua roda
        // a cada rodada e passa). A marca "responde" é juízo do contrato (CONTRATO.md, 5.3): o kit diz quem registra e
        // quem confere, e não nomeia o responsável da etapa.
        { responde: true, texto: "Confere cada ajuste." },
        // Matheus Azevedo: o kit não lhe dá papel nesta etapa.
        null,
      ],
    },
    {
      etapa: "Publicação",
      papeis: [
        // Gabriel: 01-processo.md:17 (a cobrança), :203 (a segunda parcela é cobrada aqui), :207-209 (envia ao cliente o
        // resumo do que foi entregue).
        { responde: false, texto: "Cobra a segunda metade e envia a você o resumo do que foi entregue." },
        // Matheus Castro: 01-processo.md:196 ("Matheus Castro Oliveira de Luna Garcia, com o Claude Code"), :199-200
        // (publica; aponta o domínio e confere o SSL).
        { responde: true, texto: "Põe o site no ar, no seu endereço, e confere o certificado de segurança." },
        // Matheus Azevedo: 01-processo.md:184-187 (a conformidade: o aviso de privacidade, quando há coleta; o registro
        // do conselho), :207-209 (envia, com Gabriel, os canais de suporte).
        { responde: false, texto: "Confere o aviso de privacidade, quando o site coleta dados, e o registro do conselho. Com Gabriel Ribeiro Ota Yida, envia os contatos do suporte." },
      ],
    },
    {
      etapa: "Suporte",
      papeis: [
        // Gabriel: o kit não lhe dá papel nesta etapa.
        null,
        // Matheus Castro: 01-processo.md:216 ("Matheus Castro Oliveira de Luna Garcia (atualizações)"), :18 ("a
        // manutenção técnica").
        { responde: false, texto: "Faz as atualizações." },
        // Matheus Azevedo: 01-processo.md:19 ("o suporte ao cliente depois da publicação"), :216 ("Matheus Azevedo
        // Abreu (suporte)").
        { responde: true, texto: "Atende você depois que o site está no ar." },
      ],
    },
  ],
};
