// ferramentas/briefing.mjs — os campos bloqueantes (●) do briefing que estão em branco (producao/esteira/modelos/briefing.md:
// "● = bloqueante: sem ele o site não sai. 'Não sei' é resposta válida; em branco, não"). Usado pelo
// conferir-pronto e, antes de criar o repositório, pelo producao/ferramentas/novo-site.mjs (--briefing).

/** Os campos ● sem resposta, pelo nome. Tabela de duas colunas: a resposta é a segunda célula. Tabela de
 *  várias colunas com o cabeçalho marcado ● ("O que vende"): precisa de ao menos uma linha de dados preenchida. */
export function camposBloqueantesEmBranco(texto) {
  const linhas = texto.replace(/<!--[\s\S]*?-->/g, "").split("\n");
  const celulas = (linha) => linha.split("|").slice(1, -1).map((c) => c.trim());
  const emBranco = [];
  for (let i = 0; i < linhas.length; i++) {
    if (!/^\|\s*●/.test(linhas[i])) continue;
    const [pergunta = "", resposta = ""] = celulas(linhas[i]);
    const nome = pergunta.replace(/^●\s*/, "");
    if (/^\|[\s:|-]+\|\s*$/.test(linhas[i + 1] ?? "")) {
      // Cabeçalho de tabela de várias colunas: as linhas de dados vêm depois do separador.
      let preenchida = false;
      for (let j = i + 2; j < linhas.length && /^\|/.test(linhas[j]); j++) {
        if (celulas(linhas[j]).some(Boolean)) preenchida = true;
      }
      if (!preenchida) emBranco.push(nome);
      continue;
    }
    // A resposta sem a máscara do modelo: "" das aspas, os <br>, os rótulos dos dias e os números "1." "2." "3.".
    const util = resposta
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/""/g, "")
      .replace(/\b(Seg|Ter|Qua|Qui|Sex|Sáb|Dom|Feriados):/g, "")
      .replace(/(^|\s)\d\.(?=\s|$)/g, " ")
      .trim();
    if (!util) emBranco.push(nome);
  }
  return emBranco;
}

/** Os itens da lista do fim da visita ainda desmarcados ("- [ ]"). */
export function listaEmAberto(texto) {
  return texto
    .split("\n")
    .filter((l) => /^\s*-\s\[\s\]/.test(l))
    .map((l) => l.replace(/^\s*-\s\[\s\]\s*/, ""));
}
