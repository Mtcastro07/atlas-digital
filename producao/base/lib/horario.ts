// lib/horario.ts — o texto do horário, gerado do expediente (producao/esteira/14-funcionalidades/01-base-de-todo-site.md,
// seção 4): "7h", e não "07h"; "18h30"; os fechamentos ditos.
import type { Dia, Faixa } from "@/conteudo/negocio";

export const NOMES_DOS_DIAS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"] as const;

/** "08:00" → "8h"; "18:30" → "18h30". */
export function hora(hhmm: string) {
  const [h, m] = hhmm.split(":");
  return `${Number(h)}h${m === "00" ? "" : m}`;
}

/** As faixas de um dia em texto: "8h às 18h"; "8h às 12h e 14h às 18h"; "Fechado". */
export function faixasEmTexto(faixas: readonly Faixa[]) {
  if (faixas.length === 0) return "Fechado";
  return faixas.map((f) => `${hora(f.abre)} às ${hora(f.fecha)}`).join(" e ");
}

/** O expediente dia a dia, de segunda a domingo, para a lista de definição. */
export function horarioDiaADia(expediente: Record<Dia, readonly Faixa[]>) {
  const ordem: Dia[] = [1, 2, 3, 4, 5, 6, 0];
  return ordem.map((d) => ({ dia: NOMES_DOS_DIAS[d], texto: faixasEmTexto(expediente[d]) }));
}

/** O resumo de uma linha: dias seguidos com o mesmo horário juntam-se ("Segunda a sexta, 8h às 18h"). */
export function horarioResumido(expediente: Record<Dia, readonly Faixa[]>) {
  const ordem: Dia[] = [1, 2, 3, 4, 5, 6, 0];
  const grupos: { de: Dia; ate: Dia; texto: string }[] = [];
  for (const d of ordem) {
    const texto = faixasEmTexto(expediente[d]);
    const ultimo = grupos.at(-1);
    if (ultimo && ultimo.texto === texto) ultimo.ate = d;
    else grupos.push({ de: d, ate: d, texto });
  }
  return grupos
    .map((g) => {
      const dias = g.de === g.ate ? NOMES_DOS_DIAS[g.de] : `${NOMES_DOS_DIAS[g.de]} a ${NOMES_DOS_DIAS[g.ate].toLowerCase()}`;
      return g.texto === "Fechado" ? `${dias}: fechado` : `${dias}, ${g.texto}`;
    })
    .join("; "); // sem o ponto médio, marca K1 de producao/esteira/11-anti-ia.md
}

type Endereco = { logradouro: string; numero: string; complemento: string; bairro: string; cidade: string; uf: string; cep: string };

/** O endereço em linhas, para a página: a rua; o bairro e a cidade; o CEP. Nenhuma linha começa por "·". */
export function enderecoEmLinhas(e: Endereco) {
  return [[e.logradouro, e.numero, e.complemento].filter(Boolean).join(", "), `${e.bairro}, ${e.cidade} – ${e.uf}`, `CEP ${e.cep}`];
}

/** O endereço em uma linha: a busca do mapa e os textos alternativos. */
export function enderecoEmLinha(e: Endereco) {
  return enderecoEmLinhas(e).join(", ");
}
