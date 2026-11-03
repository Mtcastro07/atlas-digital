#!/usr/bin/env node
// producao/ferramentas/novo-site.mjs — monta o site a partir da ordem de produção (producao/02-ordem-de-producao.md).
// O lugar se decide sozinho:
// - NO PRÓPRIO PROJETO, quando a pasta producao/ foi posta num projeto vazio (o uso normal desde 08.10.2026): o
//   site nasce ao lado dela. A raiz pode ter, além de producao/, só o que o começo produz (ordem.json,
//   briefing.md, material/ com o que o cliente mandou), o que o git e o editor criam (.git, .gitignore,
//   .claude, .vscode, .DS_Store) e o ferramental do Claude Code (.mcp.json, .playwright-mcp; claude/ferramental.md).
// - NUMA PASTA NOVA, quando producao/ está dentro de outro projeto (o repositório do Atlas) ou com --destino: o
//   site nasce em <destino>/<pasta da ordem>, com uma cópia de producao/ dentro. O destino padrão é a pasta que
//   contém o projeto de producao/ (com o sandbox do Claude Code ligado, a escrita ali é negada: desligue-o).
// Entram no site:
// - a base (producao/base/), copiada para a raiz, e a régua portada (portar-regua.mjs);
// - os documentos do projeto, a partir de producao/esteira/modelos/: CLAUDE.md, briefing.md, identidade.md,
//   decisoes.md e conteudo/ROTEIRO.md, além do AGENTS.md vazio;
// - os comandos e as habilidades do Claude Code (.claude/commands/, .claude/skills/) e a pasta registros/, dos relatórios de QA.
// A pasta producao/ fica como veio: é a biblioteca do projeto, e uma versão nova do kit entra trocando a pasta.
// Nada do cliente vai para dentro dela.
// Preenche o que a ordem já sabe: domínio, WhatsApp, telefone, nome, plano, modo de saída e se é exemplo.
// Marca com [EXEMPLO] cada arquivo que ainda tem o conteúdo de fábrica (o banho e tosa de exemplo): o
// `npm run pronto` não aprova enquanto sobrar um.
// Não instala dependência, não inicia git, não faz commit e não publica.
//
// Uso:
//   node producao/ferramentas/novo-site.mjs <ordem.json> [--briefing=<arquivo>] [--destino=<pasta onde criar>]
// --briefing: o briefing preenchido (obrigatório no site de cliente: é a porta da etapa 1); os campos ●
//   são conferidos ANTES de criar qualquer arquivo, e ele vira o briefing.md do site. No site de exemplo,
//   opcional: sem ele, sai o modelo, para o briefing fictício (producao/00-do-pedido-ao-site.md, seção 7).
// Se a criação falhar no meio, sai o que ela criou (a pasta nova inteira; no próprio projeto, só o que não
// existia antes), e a ordem pode rodar de novo.
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { domainToASCII } from "node:url";
import { camposBloqueantesEmBranco } from "../base/ferramentas/briefing.mjs";

const KIT = path.resolve(import.meta.dirname, "..");
const PROJETO_DO_KIT = path.dirname(KIT);
const argumentos = process.argv.slice(2);
const opcao = (nome) => argumentos.find((a) => a.startsWith(`--${nome}=`))?.slice(nome.length + 3);
const arquivoDaOrdem = argumentos.find((a) => !a.startsWith("--"));
// O que pode estar na raiz de um projeto "vazio": o kit, o que o começo produz, o que o git e o editor criam e o ferramental.
const DO_COMECO = new Set(["producao", "ordem.json", "briefing.md", "material", ".git", ".gitignore", ".gitattributes", ".claude", ".mcp.json", ".playwright-mcp", ".vscode", ".idea", ".DS_Store"]);
const noProprioProjeto = !opcao("destino") && readdirSync(PROJETO_DO_KIT).every((e) => DO_COMECO.has(e));
const destinoPai = path.resolve(opcao("destino") ?? path.dirname(PROJETO_DO_KIT));
if (!arquivoDaOrdem) {
  console.error("Uso: node producao/ferramentas/novo-site.mjs <ordem.json> [--briefing=<arquivo>] [--destino=<pasta>]  (modelo: producao/02-ordem-de-producao.md)");
  process.exit(2);
}

// ---------- 1. A ordem, conferida antes de criar qualquer arquivo ----------
const ordem = JSON.parse(readFileSync(arquivoDaOrdem, "utf8"));
const erros = [];
const avisos = [];
const NICHOS = readdirSync(path.join(KIT, "esteira/nichos")).filter((f) => f.endsWith(".md") && f !== "README.md").map((f) => f.slice(0, -3));
const PLANOS = {
  essencial: { nome: "Essencial", paginas: 3, servidor: false },
  profissional: { nome: "Profissional", paginas: 6, servidor: true }, // o formulário (producao/esteira/03-planos.md, seção 4.4)
  completo: { nome: "Completo", paginas: Infinity, servidor: true },
};
const MODULOS = ["agenda", "presenca", "pagina-adicional"];
const FICTICIO = "5521900000000";
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
// Os nichos em que o preço não vai aos dados estruturados: vedado, ou só na página de valores, sóbrio
// (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 11; os arquivos dos nichos).
const SEM_PRECO_NA_BUSCA = ["nutricao", "psicologia", "odontologia", "medicina", "advocacia"];

const exemplo = ordem.tipo === "exemplo";
if (!["cliente", "exemplo"].includes(ordem.tipo)) erros.push('tipo: "cliente" ou "exemplo"');
const nome = String(ordem.nome ?? "").trim();
if (!nome) erros.push("nome: o nome de fachada");
if (/["\\]/.test(nome)) erros.push('nome: sem aspas duplas nem barra invertida (as ferramentas leem o nome como texto entre aspas)');
const pastaValida = KEBAB.test(ordem.pasta ?? "");
if (!pastaValida) erros.push("pasta: minúsculas, sem acento, com hífens (ex.: banho-e-tosa-fonseca)");
const nichoNovo = typeof ordem.nicho === "string" && ordem.nicho.startsWith("novo:");
const slugDoNicho = nichoNovo ? ordem.nicho.slice(5) : ordem.nicho;
if (nichoNovo && !KEBAB.test(slugDoNicho)) erros.push('nicho: "novo:<nome>", com o nome em minúsculas e hífens (ex.: novo:estudio-de-tatuagem)');
if (!nichoNovo && !NICHOS.includes(ordem.nicho)) erros.push(`nicho: um de ${NICHOS.join(", ")}; ou "novo:<nome>" (producao/00-do-pedido-ao-site.md, seção 3)`);
const plano = PLANOS[ordem.plano];
if (!plano) erros.push("plano: essencial, profissional ou completo");
const modulos = Array.isArray(ordem.modulos) ? ordem.modulos : [];
for (const m of modulos) if (!MODULOS.includes(m)) erros.push(`modulos: "${m}" não existe (${MODULOS.join(", ")})`);
if (modulos.includes("pagina-adicional") && ordem.plano === "completo") erros.push("modulos: o Completo não tem limite de páginas; a Página adicional não se aplica");
if (modulos.length && ordem.nicho === "advocacia") erros.push("modulos: a advocacia não leva módulo (producao/esteira/nichos/README.md, seção 1)");
if (modulos.includes("presenca") && ordem.nicho === "psicologia") erros.push("modulos: a Presença não se oferece à psicologia (sigilo; producao/esteira/14-funcionalidades/06-presenca.md)");
if (modulos.includes("presenca")) avisos.push("a Presença não tem titular desde 30.09.2026 (producao/esteira/14-funcionalidades/06-presenca.md): confirme com os sócios quem a faz antes de prometê-la");
const paginasAdicionais = modulos.includes("pagina-adicional") ? Number(ordem.paginasAdicionais ?? 1) : 0;
if (modulos.includes("pagina-adicional") && !(Number.isInteger(paginasAdicionais) && paginasAdicionais >= 1)) erros.push("paginasAdicionais: um número inteiro, 1 ou mais");
const whatsapp = String(ordem.whatsapp ?? (exemplo ? FICTICIO : "")).replace(/\D/g, "");
const telefone = String(ordem.telefone ?? whatsapp).replace(/\D/g, "");
for (const [campo, n] of [["whatsapp", whatsapp], ["telefone", telefone]]) if (!/^55\d{10,11}$/.test(n)) erros.push(`${campo}: 55 + DDD + número (8 ou 9 algarismos), só algarismos ("${n}")`);
if (!exemplo && (whatsapp === FICTICIO || telefone === FICTICIO)) erros.push("whatsapp/telefone: o número fictício só vale em site de exemplo");
if (exemplo && whatsapp !== FICTICIO) erros.push(`whatsapp: site de exemplo usa o número fictício ${FICTICIO}`);
// O domínio: sem protocolo, "www" nem caminho (normalizado, com aviso); com acento, em Punycode. O exemplo vai
// ao ar no subdomínio da vitrine (producao/esteira/nichos/README.md, seção 3.8).
const dominioPedido = String(ordem.dominio ?? (exemplo ? `${slugDoNicho}.agenciaatlasdigital.com` : "")).trim().toLowerCase();
const dominioLimpo = dominioPedido.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/[/?#].*$/, "");
const dominio = domainToASCII(dominioLimpo);
if (!dominio || !/^[a-z0-9.-]+\.[a-z]{2,}$/.test(dominio)) erros.push(`dominio: o endereço, como "cliente.com.br" ("${dominioPedido}")`);
else {
  if (dominioLimpo !== dominioPedido) avisos.push(`domínio normalizado: "${dominioPedido}" → "${dominioLimpo}"`);
  if (dominio !== dominioLimpo) avisos.push(`domínio com acento gravado em Punycode: "${dominioLimpo}" → "${dominio}" (no texto do site, escreva a forma com acento)`);
}
// A hora do briefing é a de Niterói (UTC−3, sem horário de verão desde 2019) quando a ordem não diz o fuso:
// lida no fuso da máquina, sairia errada num computador em outro fuso.
const textoDaHora = String(ordem.briefingCompletoEm ?? "");
const briefingEm = textoDaHora ? new Date(/(Z|[+-]\d\d:\d\d)$/i.test(textoDaHora) ? textoDaHora : `${textoDaHora}-03:00`) : null;
if (!exemplo && (!briefingEm || Number.isNaN(briefingEm.getTime()))) erros.push('briefingCompletoEm: "AAAA-MM-DDTHH:MM", o horário em que o material completo chegou ao grupo (o relógio das 24 horas)');
// O briefing: obrigatório no cliente, conferido antes de criar.
const arquivoDoBriefing = opcao("briefing") ?? ordem.briefing;
let briefing = null;
if (arquivoDoBriefing) {
  if (!existsSync(arquivoDoBriefing)) erros.push(`--briefing: o arquivo não existe (${arquivoDoBriefing})`);
  else {
    briefing = readFileSync(arquivoDoBriefing, "utf8");
    for (const campo of camposBloqueantesEmBranco(briefing)) erros.push(`briefing: campo bloqueante em branco: ${campo.slice(0, 80)}`);
  }
} else if (!exemplo) {
  erros.push("--briefing=<arquivo>: o site de cliente só começa com o briefing completo (producao/esteira/01-processo.md, etapa 1)");
}

const raiz = noProprioProjeto ? PROJETO_DO_KIT : pastaValida ? path.join(destinoPai, ordem.pasta) : "";
const raizJaExistia = Boolean(raiz) && existsSync(raiz);
const antes = new Set(raizJaExistia ? readdirSync(raiz) : []);
const comandosJaExistiam = existsSync(path.join(raiz, ".claude/commands"));
const habilidadesJaExistiam = existsSync(path.join(raiz, ".claude/skills"));
if (!noProprioProjeto && raizJaExistia && antes.size) erros.push(`a pasta ${raiz} já existe e não está vazia`);
if (erros.length) {
  console.error("Ordem de produção com erro (nada foi criado):\n" + erros.map((e) => `  - ${e}`).join("\n"));
  process.exit(2);
}

const FORA = new Set(["node_modules", ".next", "out", ".regua", "test-results", ".DS_Store", "next-env.d.ts"]);
const copiar = (de, para, filtro = () => true) =>
  cpSync(de, para, { recursive: true, filter: (f) => !FORA.has(path.basename(f)) && !f.endsWith(".tsbuildinfo") && filtro(f) });

/** Troca um trecho; a troca é uma função dos grupos, para nenhum "$" dos dados virar padrão de substituição. */
function editar(relativo, trocas) {
  const arquivo = path.join(raiz, relativo);
  let texto = readFileSync(arquivo, "utf8");
  for (const [de, para] of trocas) {
    if (!de.test(texto)) throw new Error(`novo-site: o trecho ${de} não existe em ${relativo} (a base mudou: atualize este script)`);
    texto = texto.replace(de, para);
  }
  writeFileSync(arquivo, texto);
}

const servidor = !exemplo && (plano.servidor || modulos.includes("agenda"));
const hoje = new Date();
const dataBR = (d) => d.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }).replace(/\//g, ".");
const dataHoraBR = (d) => `${dataBR(d)}, ${d.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit" })}`;
const rascunhoAte = briefingEm ? new Date(briefingEm.getTime() + 24 * 3600 * 1000) : null;
const textoDosModulos = modulos.length ? modulos.map((m) => (m === "pagina-adicional" ? `Página adicional ×${paginasAdicionais}` : { agenda: "Agenda", presenca: "Presença" }[m])).join(" · ") : "nenhum";
const linhaDoNicho = nichoNovo ? `${slugDoNicho} (nicho novo: \`producao/esteira/nichos/${slugDoNicho}.md\` a escrever na etapa 3; \`producao/00-do-pedido-ao-site.md\`, seção 3)` : `${ordem.nicho} (\`producao/esteira/nichos/${ordem.nicho}.md\`)`;
const limite = plano.paginas === Infinity ? "sem limite" : `até ${plano.paginas} + ${paginasAdicionais} adicional(is); as legais e as do módulo não contam`;
const modelo = (arquivo) => readFileSync(path.join(KIT, "esteira/modelos", arquivo), "utf8");
/** Tira o comentário "MODELO" do topo, como o próprio modelo manda. */
const semComentarioDeModelo = (t) => t.replace(/^<!--[\s\S]*?MODELO[\s\S]*?-->\s*/, "");
const nomeDoc = (t) => t.replaceAll("[Nome de fachada do cliente]", nome).replaceAll("[Nome de fachada]", nome);

try {
  // ---------- 2. O kit (só na pasta nova), a base, a régua, os comandos e os registros ----------
  mkdirSync(raiz, { recursive: true });
  // Na pasta nova, o projeto leva o kit inteiro (a esteira, a qualidade, os módulos, os gestos e o exemplo),
  // como no projeto vazio em que a pasta foi posta à mão.
  if (!noProprioProjeto) copiar(KIT, path.join(raiz, "producao"));
  copiar(path.join(KIT, "base"), raiz);
  execFileSync(process.execPath, [path.join(KIT, "ferramentas/portar-regua.mjs"), raiz], { stdio: "inherit" });
  // Os comandos do Claude Code, no lugar em que ele os procura.
  copiar(path.join(KIT, "claude/commands"), path.join(raiz, ".claude/commands"));
  // As habilidades da produção (claude/ferramental.md, seção 2): cópia fixa, com a licença e a nota de precedência do kit.
  copiar(path.join(KIT, "claude/skills"), path.join(raiz, ".claude/skills"));
  // Os relatórios de QA do site ficam fora do kit, para o kit poder ser trocado sem levar nada do projeto.
  mkdirSync(path.join(raiz, "registros"), { recursive: true });
  writeFileSync(
    path.join(raiz, "registros/README.md"),
    "# Registros\n\nOs relatórios de QA deste site, um por rodada: o modelo é `producao/qualidade/modelos/relatorio-de-qa.md`, e o nome segue `producao/qualidade/14-ciclo-de-qa.md`. Ficam aqui, fora de `producao/`, para o kit poder ser trocado por uma versão nova sem levar nada do projeto.\n",
  );

  // ---------- 3. O que a ordem já sabe, escrito no código ----------
  editar("conteudo/contato.ts", [
    [/^(\s*)whatsapp: "\d*"/m, (_, recuo) => `${recuo}whatsapp: "${whatsapp}"`],
    [/^(\s*)telefone: "\d*"/m, (_, recuo) => `${recuo}telefone: "${telefone}"`],
    [/^(\s*)dominio: "[^"]*"/m, (_, recuo) => `${recuo}dominio: "${dominio}"`],
  ]);
  editar("conteudo/negocio.ts", [
    [/^(\s*)exemplo: (true|false),/m, (_, recuo) => `${recuo}exemplo: ${exemplo},`],
    [/^(\s*)nome: "[^"]*",/m, (_, recuo) => `${recuo}nome: ${JSON.stringify(nome)},`],
    [/^(\s*)plano: "[^"]*",/m, (_, recuo) => `${recuo}plano: "${plano.nome}",`],
    ...(SEM_PRECO_NA_BUSCA.includes(ordem.nicho) ? [[/^(\s*)faixaDePreco: "[^"]*",/m, (_, recuo) => `${recuo}faixaDePreco: "",`]] : []),
  ]);
  editar("next.config.ts", [[/process\.env\.SAIDA \?\? "(estatico|servidor)"/, () => `process.env.SAIDA ?? "${servidor ? "servidor" : "estatico"}"`]]);
  editar("package.json", [[/"name": "[^"]*"/, () => `"name": "${ordem.pasta}"`]]);

  // O conteúdo de fábrica, marcado: o `npm run pronto` acusa a marca até o arquivo ser reescrito.
  const MARCA = "[EXEMPLO] conteúdo de fábrica (o banho e tosa de exemplo): reescreva pelo briefing.md e pela identidade.md, e apague esta linha.";
  for (const relativo of ["conteudo/site.ts", "conteudo/negocio.ts", "conteudo/legal.ts", "app/fontes.ts", "app/page.tsx", "app/servicos/page.tsx", "app/onde/page.tsx", "components/mapa-do-bairro.tsx"]) {
    const arquivo = path.join(raiz, relativo);
    writeFileSync(arquivo, `// ${MARCA}\n${readFileSync(arquivo, "utf8")}`);
  }
  const css = path.join(raiz, "app/identidade.css");
  writeFileSync(css, `/* ${MARCA} */\n${readFileSync(css, "utf8")}`);

  // ---------- 4. Os documentos do cliente, dos modelos ----------
  let claude = nomeDoc(semComentarioDeModelo(modelo("claude-do-projeto.md")));
  const linhas = {
    Cliente: `${nome} · ${exemplo ? "**site de exemplo** (estabelecimento fictício: selo de ficção, `noindex`, número fictício)" : "[razão social] · CNPJ [número] (ou: profissional pessoa física, [conselho e registro]) — do briefing"}`,
    Nicho: linhaDoNicho,
    Plano: `${plano.nome} (\`producao/esteira/03-planos.md\`), páginas: ${limite}`,
    Módulos: textoDosModulos,
    "Condição de Fundação": ordem.condicaoDeFundacao ? `sim, contrato n.º ${ordem.condicaoDeFundacao}` : "não",
    Domínio: `${dominio}${exemplo ? " (o subdomínio da vitrine)" : " · registrado em nome de [titular]"}`,
    "Onde roda": servidor
      ? "web app Node.js na Hostinger (`SAIDA` padrão `servidor`, em `standalone`; `producao/esteira/18-publicacao-e-manutencao.md`, seção 2)"
      : "site estático na hospedagem comum (`out/` e `.htaccess`; `producao/esteira/18-publicacao-e-manutencao.md`, seção 3)",
    "Briefing completo no grupo": briefingEm ? `${dataHoraBR(briefingEm)} — o relógio das 24 horas começa aqui` : "— (site de exemplo)",
    "Rascunho prometido": rascunhoAte ? `${dataHoraBR(rascunhoAte)} (o relógio padrão; se o briefing, seção 11, diz outra hora, vale a do briefing), por [canal]` : "— (site de exemplo)",
    ...(exemplo ? { "Publicação prometida até": "— (site de exemplo)" } : {}),
  };
  for (const [campo, valor] of Object.entries(linhas)) {
    const re = new RegExp(`^\\| ${campo} \\|.*$`, "m");
    if (!re.test(claude)) throw new Error(`novo-site: a linha "${campo}" não existe em producao/esteira/modelos/claude-do-projeto.md (o modelo mudou: atualize este script)`);
    claude = claude.replace(re, () => `| ${campo} | ${valor} |`);
  }
  claude = claude.replace(
    /^## Estado\n[\s\S]*$/m,
    () => `## Estado\n\n- ${dataBR(hoje)} — repositório criado por \`producao/ferramentas/novo-site.mjs\` a partir de \`producao/base/\`, com a régua portada. Próximo passo: \`producao/01-roteiro-da-sessao.md\`, etapa 2 (instalar, compilar, servir e rodar a régua), e depois o comando \`/proxima-etapa\`.\n`,
  );
  writeFileSync(path.join(raiz, "CLAUDE.md"), claude);
  // Vazio, antes do primeiro npm run dev: sem ele, o Next grava o bloco dele dentro do CLAUDE.md (esteira/13, seção 2).
  writeFileSync(path.join(raiz, "AGENTS.md"), "");

  // O briefing: o recebido (cliente) ou o modelo, com a legenda dos ● (exemplo, para o briefing fictício).
  writeFileSync(
    path.join(raiz, "briefing.md"),
    briefing ??
      `<!-- Do modelo producao/esteira/modelos/briefing.md. ● = bloqueante: sem ele o site não sai ("Não sei" é resposta;
     em branco, não). Site de exemplo: o briefing é fictício, coerente com producao/esteira/nichos/${slugDoNicho}.md, e
     escrito antes do conteúdo (producao/00-do-pedido-ao-site.md, seção 7). -->

${nomeDoc(semComentarioDeModelo(modelo("briefing.md")))}`,
  );
  writeFileSync(path.join(raiz, "identidade.md"), nomeDoc(semComentarioDeModelo(modelo("identidade.md"))));
  let decisoes = nomeDoc(semComentarioDeModelo(modelo("decisoes.md")));
  const registros = [
    `| ${dataBR(hoje)} | Repositório criado a partir de \`producao/base/\` (versão de 08.10.2026): ${plano.nome}, ${linhaDoNicho}, módulos: ${textoDosModulos}, ${servidor ? "web app Node.js" : "site estático"} | A ordem de produção (\`ordem.json\`) | — | novo-site | vigente |`,
    ...(modulos.includes("presenca") ? [`| ${dataBR(hoje)} | A Presença contratada | A ordem | — | novo-site | a confirmar: a função não tem titular desde 30.09.2026 (\`producao/esteira/14-funcionalidades/06-presenca.md\`) |`] : []),
  ];
  const cabecalhoDoRegistro = /(\| Data \| Decisão \| Razão \| Revoga \| Quem decidiu \| Estado \|\n\|[-|]+\|\n)/;
  if (!cabecalhoDoRegistro.test(decisoes)) throw new Error("novo-site: a tabela de registro não existe em producao/esteira/modelos/decisoes.md (o modelo mudou: atualize este script)");
  decisoes = decisoes.replace(cabecalhoDoRegistro, (m) => m + registros.join("\n") + "\n");
  writeFileSync(path.join(raiz, "decisoes.md"), decisoes);
  writeFileSync(path.join(raiz, "conteudo/ROTEIRO.md"), nomeDoc(semComentarioDeModelo(modelo("conteudo.md"))));
  writeFileSync(path.join(raiz, "ordem.json"), JSON.stringify({ ...ordem, whatsapp, telefone, dominio, criadoEm: hoje.toISOString() }, null, 2) + "\n");

  // O README do projeto (o da base fica em producao/base/README.md).
  const linhasDoReadme = [
    `# ${nome} · site`,
    "",
    `${exemplo ? "Site de **exemplo** (estabelecimento fictício)" : "Site de cliente"} do Atlas Digital: plano ${plano.nome}${modulos.length ? ` + ${textoDosModulos}` : ""}, nicho ${linhaDoNicho}, ${servidor ? "web app Node.js" : "site estático"}. Criado em ${dataBR(hoje)} a partir da base de produção do Atlas (` + "`producao/base/README.md`" + " diz o que ela já resolve).",
    "",
    "- **O projeto, as regras e o estado:** `CLAUDE.md`.",
    "- **O processo:** `producao/01-roteiro-da-sessao.md`, ou `/proxima-etapa` no Claude Code.",
    "- **O briefing, a identidade e as decisões:** `briefing.md`, `identidade.md`, `decisoes.md`.",
    "- **Como se faz e como se prova:** `producao/esteira/` e `producao/qualidade/`. A pasta `producao/` é o kit: fica como veio.",
    "- **Os relatórios de QA:** `registros/`.",
    "",
    "```bash",
    "PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm ci",
    "npm test && npm run build",
    `${servidor ? "PORT=3100 npm run servidor" : "npm run estatico"}          # em segundo plano (não retorna)`,
    "npm run regua -- --base=http://localhost:3100",
    `npm run pronto${exemplo ? " -- --exemplo" : ""}`,
    "```",
    "",
  ];
  writeFileSync(path.join(raiz, "README.md"), linhasDoReadme.join("\n"));
} catch (erro) {
  // Nada pela metade: sai o que esta execução criou, e a ordem pode rodar de novo.
  if (!raizJaExistia) rmSync(raiz, { recursive: true, force: true });
  else {
    for (const e of readdirSync(raiz)) if (!antes.has(e)) rmSync(path.join(raiz, e), { recursive: true, force: true });
    if (!comandosJaExistiam) rmSync(path.join(raiz, ".claude/commands"), { recursive: true, force: true });
    if (!habilidadesJaExistiam) rmSync(path.join(raiz, ".claude/skills"), { recursive: true, force: true });
  }
  console.error(`A criação falhou, e o que ela criou foi apagado: ${erro.message}`);
  process.exit(1);
}

// ---------- 5. O que fazer agora ----------
for (const a of avisos) console.warn(`aviso: ${a}`);
const ondeRodar = noProprioProjeto ? "" : `  cd ${raiz}\n`;
console.log(`
Site criado ${noProprioProjeto ? "neste projeto, ao lado de producao/" : "numa pasta nova, com uma cópia de producao/ dentro"}: ${raiz}
  ${plano.nome}${modulos.length ? ` + ${textoDosModulos}` : ""} · ${linhaDoNicho} · ${servidor ? "web app Node.js" : "site estático"} · ${exemplo ? "EXEMPLO" : "cliente"}

Próximos passos (producao/01-roteiro-da-sessao.md, etapa 2):
${ondeRodar}  PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm ci        # com o sandbox desligado (rede)
  npm test && npm run build                        # a base compila antes de qualquer mudança
  Depois, /proxima-etapa no Claude Code${noProprioProjeto ? " (os comandos em .claude/commands/ aparecem ao reabrir a sessão; até lá, leia .claude/commands/proxima-etapa.md e siga)" : ", aberto na pasta do site"}.${exemplo && !briefing ? "\n  Exemplo: escreva antes o briefing fictício em briefing.md (producao/00-do-pedido-ao-site.md, seção 7)." : ""}${servidor ? "\n  Formulário ou Agenda: producao/modulos/README.md (o passo de instalação traz o nodemailer e o mysql2, aprovados em 08.10.2026)." : ""}
`);
