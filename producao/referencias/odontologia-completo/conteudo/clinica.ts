// conteudo/clinica.ts — a equipe, a clínica e as perguntas comuns (briefing.md, seções 4, 5 e 12). Os nomes seguem a regra
// dos nomes fictícios de exemplo ("da Silva") e os registros são fictícios e evidentes (CRO-RJ 00000). A relação dos
// especialistas e a dos clínicos gerais com a área de atuação são exigências do Código de Ética Odontológica, art. 43, § 2º.
import type { IdDoDentista, IdDoTratamento } from "./tratamentos";

export type Dentista = {
  id: IdDoDentista;
  nome: string;
  profissao: string;
  cro: string;
  /** "Clínica geral" (art. 43, § 1º, VI) ou "Especialista em X", só com o título registrado. */
  titulo: string;
  /** O papel na clínica, se houver (o responsável técnico). */
  funcao?: string;
  formacao: string;
  atende: readonly IdDoTratamento[];
};

export const equipe: readonly Dentista[] = [
  {
    id: "beatriz",
    nome: "Dra. Beatriz da Silva",
    profissao: "Cirurgiã-dentista",
    cro: "CRO-RJ 00000",
    titulo: "Clínica geral",
    funcao: "Responsável técnica",
    formacao: "Graduação em Odontologia.",
    atende: ["limpeza", "restauracao", "clareamento", "coroa"],
  },
  {
    id: "caio",
    nome: "Dr. Caio da Silva",
    profissao: "Cirurgião-dentista",
    cro: "CRO-RJ 00000",
    titulo: "Especialista em Endodontia",
    formacao: "Graduação em Odontologia e especialização em Endodontia.",
    atende: ["canal"],
  },
  {
    id: "helena",
    nome: "Dra. Helena da Silva",
    profissao: "Cirurgiã-dentista",
    cro: "CRO-RJ 00000",
    titulo: "Especialista em Ortodontia",
    formacao: "Graduação em Odontologia e especialização em Ortodontia.",
    atende: ["aparelho"],
  },
];

export const dentistaDe = (id: IdDoDentista) => equipe.find((d) => d.id === id)!;

/** A clínica, sem foto: o texto do briefing, seção 12 ("A clínica e a biossegurança") e seção 3 (acessibilidade). */
export const clinica = {
  estrutura: "Três consultórios e uma sala de espera. A entrada é sem degrau, e os consultórios ficam no térreo.",
  biosseguranca: "O instrumental é esterilizado em autoclave, em embalagem individual, aberta na frente do paciente.",
  estacionamento: "A clínica não tem estacionamento próprio.",
};

/** O que acontece na avaliação, em sequência de verdade (briefing, seção 12). */
export const passosDaAvaliacao: readonly string[] = [
  "Conversa sobre o que o paciente observa.",
  "Exame clínico.",
  "Radiografia, quando o dentista a indica.",
  "Plano de tratamento por escrito, com o número de sessões e o intervalo entre elas.",
];

export const avaliacaoDuracao = "A avaliação dura 40 minutos e não executa procedimento.";
export const levar = "O documento de identidade, as radiografias anteriores, se houver, e a lista dos medicamentos em uso.";

/** As perguntas comuns, sem consulta nem diagnóstico (Código de Ética Odontológica, art. 44, V). */
export const perguntas: readonly { pergunta: string; resposta: string }[] = [
  {
    pergunta: "A primeira consulta já inclui tratamento?",
    resposta: "Não. A avaliação reúne a conversa, o exame, a radiografia, quando indicada, e o plano por escrito. Nenhum procedimento é executado nesse dia.",
  },
  {
    pergunta: "Quantas sessões um tratamento leva?",
    resposta: "A página de cada tratamento traz a sequência de referência. O número de cada caso sai do exame clínico e consta do plano entregue por escrito.",
  },
  {
    pergunta: "E se houver dor?",
    resposta: "O encaixe é no mesmo dia, de segunda a sexta, para quem avisar até as 16h. A urgência controla a dor. O tratamento é combinado depois, em avaliação.",
  },
  {
    pergunta: "Por que o site não informa valores?",
    resposta: "A norma do conselho veda o preço na publicidade odontológica. Os valores são tratados presencialmente, depois do exame.",
  },
  {
    pergunta: "A clínica responde dúvida clínica por mensagem?",
    resposta: "Não. A mensagem serve para marcar a avaliação. A dúvida clínica se resolve no exame.",
  },
  {
    pergunta: "A clínica faz implante ou cirurgia do siso?",
    resposta: "Não. A clínica encaminha esses casos a outro profissional.",
  },
];
