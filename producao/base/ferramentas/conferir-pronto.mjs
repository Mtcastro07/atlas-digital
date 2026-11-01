// ferramentas/conferir-pronto.mjs — a conferência do conteúdo antes de publicar: o que a régua não vê,
// porque está fora da página desenhada (producao/qualidade/10-conteudo-normas-e-texto.md; producao/esteira/18-publicacao-e-manutencao.md,
// seção 4). Dado de exemplo esquecido, campo bloqueante do briefing em branco, marcador de pendência no
// conteúdo, CNPJ que não confere, foto com metadados, arquivo cru em public/, fonte sem licença.
//
// Uso (na raiz do site; o script do package.json liga a remoção de tipos do Node, para ler lib/cnpj.ts):
//   npm run pronto                  site de cliente: tudo do cliente no lugar, nada de exemplo
//   npm run pronto -- --exemplo     site de exemplo: o contrário (exemplo: true, número fictício, sem CNPJ)
// Sai com código 1 se houver falha. Aviso é para olhar: pode ter motivo.
import { createHash } from "node:crypto";
import { camposBloqueantesEmBranco, listaEmAberto } from "./briefing.mjs";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const EXEMPLO = process.argv.includes("--exemplo");
const falhas = [];
const avisos = [];
const falha = (t) => falhas.push(t);
const aviso = (t) => avisos.push(t);
const ler = (arquivo) => (existsSync(arquivo) ? readFileSync(arquivo, "utf8") : "");
// Só a linha que começa pelo campo: um comentário que cita o campo não conta.
const campo = (texto, nome) => texto.match(new RegExp(`^\\s*${nome}:\\s*"([^"]*)"`, "m"))?.[1] ?? "";
const arquivos = (pasta, filtro = () => true) =>
  existsSync(pasta) ? readdirSync(pasta, { recursive: true }).map(String).map((f) => path.join(pasta, f)).filter((f) => statSync(f).isFile() && filtro(f)) : [];
const hash = (arquivo) => createHash("sha256").update(readFileSync(arquivo)).digest("hex").slice(0, 16);

// O número fictício dos exemplos e as marcas de fábrica da base (producao/base): não podem chegar ao ar num cliente.
const NUMERO_FICTICIO = "5521900000000";
// O nome do banho e tosa de exemplo da base: num site de cliente, sobra de fábrica.
const NOME_DE_FABRICA = "Banho e Tosa Fonseca";
const DOMINIO_DE_EXEMPLO = "exemplo.com.br";
// O cartão de compartilhamento e o ícone de fábrica (o banho e tosa de exemplo), pela impressão digital.
const FABRICA = {
  "public/compartilhar.jpg": "d4634ea91b08b749",
  "app/icon.svg": "67f834e91586a6bd",
  "app/apple-icon.png": "c6791a9dedef25ab",
  "app/favicon.ico": "d9757daaa9129827",
};

// ---------- 1. Os dados do negócio (conteudo/negocio.ts e conteudo/contato.ts) ----------
const negocio = ler("conteudo/negocio.ts");
const contato = ler("conteudo/contato.ts");
if (!negocio || !contato) falha("conteudo/negocio.ts ou conteudo/contato.ts não existe");
const ehExemplo = /^\s*exemplo:\s*true\b/m.test(negocio);
const whatsapp = campo(contato, "whatsapp");
const telefone = campo(contato, "telefone");
const dominio = campo(contato, "dominio");
const razaoSocial = campo(negocio, "razaoSocial");
const cnpj = campo(negocio, "cnpj");
const registro = campo(negocio, "registro");
const nomeCompleto = campo(negocio, "nomeCompleto");

for (const [nome, n] of [["whatsapp", whatsapp], ["telefone", telefone]]) {
  if (!/^55\d{10,11}$/.test(n)) falha(`contato.${nome} fora do formato 55DDDNNNNNNNN: "${n}"`);
}
if (EXEMPLO) {
  if (!ehExemplo) falha("site de exemplo com `exemplo: false` (o selo de ficção e o noindex dependem dele)");
  if (whatsapp !== NUMERO_FICTICIO) falha(`site de exemplo com número real (${whatsapp}): use o fictício ${NUMERO_FICTICIO}`);
  if (cnpj || razaoSocial) falha("site de exemplo com razão social ou CNPJ: o estabelecimento é fictício");
  if (dominio === DOMINIO_DE_EXEMPLO && campo(negocio, "nome") !== NOME_DE_FABRICA) {
    falha(`domínio de fábrica ("${dominio}"): o exemplo vai ao ar em <nicho>.agenciaatlasdigital.com (producao/esteira/nichos/README.md, seção 3.8)`);
  }
} else {
  if (ehExemplo) falha("`exemplo: true` em conteudo/negocio.ts: o site sairia com o selo de ficção e fora da busca");
  if (whatsapp === NUMERO_FICTICIO || telefone === NUMERO_FICTICIO) falha(`o número fictício ${NUMERO_FICTICIO} ainda está em conteudo/contato.ts`);
  if (!dominio || dominio === DOMINIO_DE_EXEMPLO) falha(`domínio de exemplo em conteudo/contato.ts ("${dominio}")`);
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(dominio)) falha(`domínio inválido ("${dominio}"): sem "www" nem "https://"`);
  // A identificação do fornecedor no rodapé (Decreto 7.962/2013, art. 2º; producao/esteira/17-conformidade-e-normas.md, seção 3.1).
  if (cnpj) {
    const { cnpjValido } = await import("../lib/cnpj.ts"); // a mesma função dos testes (o script roda com a remoção de tipos)
    if (!cnpjValido(cnpj)) falha(`CNPJ que não confere nos dígitos verificadores: "${cnpj}"`);
    if (!razaoSocial) falha("CNPJ sem a razão social");
  } else if (registro && nomeCompleto) {
    aviso(`sem CNPJ: o rodapé identifica a pessoa física por "${nomeCompleto}" e "${registro}"; confira no briefing`);
  } else if (registro || nomeCompleto) {
    falha("profissional pessoa física: o rodapé precisa do nome completo (nomeCompleto) e do registro do conselho (registro), os dois");
  } else {
    falha("sem razão social e CNPJ (nem, se pessoa física, o registro do conselho): o rodapé não identifica o fornecedor");
  }
  if (/^\s*numero:\s*"0+"/m.test(negocio)) falha('o número do endereço ainda é o de exemplo ("000")');
  if (/^\s*geo:\s*null\b/m.test(negocio)) aviso("sem coordenadas (geo) nos dados estruturados: o mapa da busca usa o endereço");
}

// O preço nos dados estruturados (a faixa aparece na busca): vazio onde o conselho veda o preço ou só o admite
// na página de valores, sóbrio (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 11; os nichos).
const nicho = (() => {
  try {
    return JSON.parse(ler("ordem.json") || "{}").nicho ?? "";
  } catch {
    return "";
  }
})();
if (["nutricao", "psicologia", "odontologia", "medicina", "advocacia"].includes(nicho) && campo(negocio, "faixaDePreco")) {
  falha(`faixaDePreco preenchida no nicho ${nicho}: o preço não vai aos dados estruturados (a busca o mostraria fora da página de valores)`);
}

// ---------- 2. Marcadores de pendência no que vai ao ar ----------
// Os marcadores de pendência: entre colchetes ou "lorem ipsum", em qualquer caixa; TODO, FIXME e XXX só
// em maiúsculas, porque "todo" é palavra do português ("todo site", "base-de-todo-site").
const MARCADOR_DE_TEXTO = /\[(A CONFIRMAR|PREENCHER|PENDENTE|EXEMPLO)[^\]]*\]|lorem ipsum/i;
const MARCADOR_DE_CODIGO = /\b(TODO|FIXME|XXX)\b/;
const marcado = (linha) => MARCADOR_DE_TEXTO.test(linha) || MARCADOR_DE_CODIGO.test(linha);
for (const f of [...arquivos("conteudo", (f) => /\.tsx?$/.test(f)), ...arquivos("app", (f) => /\.(tsx?|css)$/.test(f)), ...arquivos("components", (f) => /\.tsx?$/.test(f))]) {
  ler(f).split("\n").forEach((linha, i) => {
    if (marcado(linha)) falha(`marcador de pendência em ${f}:${i + 1}: ${linha.trim().slice(0, 90)}`);
    else if (!EXEMPLO && linha.includes(NOME_DE_FABRICA)) falha(`o nome do exemplo de fábrica em ${f}:${i + 1}`);
  });
}

// ---------- 3. Os documentos do projeto ----------
const PLACEHOLDER = /\[(?!\s?\]|x\])([^\]\n]{2,80})\](?!\()/i; // [Nome de fachada]; não [ ], [x] nem [vínculo](url)
// As marcas da própria esteira não são campo de modelo: a evidência ([V], [FU], [NV: ...], [DIV]), o plano ([E], [P], [C])
// e o exemplo ([ex]) (producao/esteira/README.md, seção 3). Antes, o pronto as cobrava como campo vazio (teste de 08.10.2026).
const MARCA_DA_ESTEIRA = /\[(?:V|FU|DIV|ex|E|P|C|NV(?::[^\]\n]*)?)\]/g;
const semComentarios = (t) => t.replace(/<!--[\s\S]*?-->/g, "").replace(/```[\s\S]*?```/g, "");
// O briefing, nos dois modos: no exemplo, o briefing fictício escrito antes do conteúdo (producao/00-do-pedido-ao-site.md, seção 7).
const briefing = ler("briefing.md");
if (!briefing) falha("briefing.md não existe (producao/esteira/modelos/briefing.md)");
else {
  for (const campo of camposBloqueantesEmBranco(briefing)) falha(`briefing: campo bloqueante em branco: ${campo.slice(0, 80)}`);
  if (!EXEMPLO) for (const item of listaEmAberto(briefing)) aviso(`briefing, lista do fim da visita, em aberto: ${item}`);
}
for (const doc of ["identidade.md", "decisoes.md", "CLAUDE.md"]) {
  const t = ler(doc);
  if (!t) {
    falha(`${doc} não existe (producao/esteira/modelos/${doc})`);
    continue;
  }
  // O código em linha (`...`) é literal, nunca campo de modelo: "a marca `[EXEMPLO]`" não é pendência.
  const restos = semComentarios(t).split("\n").filter((l) => PLACEHOLDER.test(l.replace(/`[^`]*`/g, "").replace(MARCA_DA_ESTEIRA, "")));
  if (restos.length) (doc === "decisoes.md" ? aviso : falha)(`${doc}: ${restos.length} campo(s) do modelo sem preencher, como "${restos[0].trim().slice(0, 70)}"`);
}

// ---------- 4. public/: nada cru, nada com metadados, nada que o cache trate errado ----------
for (const f of arquivos("public")) {
  const kb = statSync(f).size / 1024;
  if (/\.(md|markdown)$/i.test(f) || /(^|[/\\])(notas|rascunho)[^/\\]*\.txt$/i.test(f)) falha(`${f}: documento em public/ é publicado no endereço do site`);
  if (/\.(js|css|woff2?)$/i.test(f)) falha(`${f}: script, folha ou fonte em public/ fica sem hash no nome e sem cache longo (o .htaccess); importe pelo código`);
  if (kb > 400) falha(`${f}: ${kb.toFixed(0)} KB (foto crua? prepare com ferramentas/preparar-fotos.mjs)`);
  if (/\.(jpe?g|webp|png|avif)$/i.test(f)) {
    const b = readFileSync(f);
    const temExif = b.includes(Buffer.from("Exif\0\0")) || b.includes(Buffer.from("EXIF")) || b.includes(Buffer.from("eXIf"));
    const temXmp = b.includes(Buffer.from("http://ns.adobe.com/xap/1.0/")) || b.includes(Buffer.from("XMP "));
    if (temExif || temXmp) falha(`${f}: metadados gravados (localização, aparelho, data); prepare com ferramentas/preparar-fotos.mjs`);
  }
}
// O mapa do bairro (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 3): no Essencial, entra na página do lugar.
if (!EXEMPLO && /SEM MAPA: não desenha nada/.test(ler("components/mapa-do-bairro.tsx"))) {
  aviso("sem o mapa do bairro: gere com ferramentas/gerar-mapa.mjs, ou registre no decisoes.md por que o site não o tem");
}
if (!existsSync("public/compartilhar.jpg")) falha("public/compartilhar.jpg não existe (ferramentas/capturar-compartilhamento.mjs)");
// O cartão e os ícones de fábrica, em todo site que não seja o próprio exemplo de fábrica.
if (campo(negocio, "nome") !== NOME_DE_FABRICA) {
  for (const [f, impressao] of Object.entries(FABRICA)) {
    if (existsSync(f) && hash(f) === impressao) falha(`${f} ainda é o de fábrica (o banho e tosa de exemplo)`);
  }
}

// ---------- 5. As fontes: com licença ao lado (o peso, sem teto desde 08.10.2026, só se relata) ----------
const fontes = arquivos("app/fontes", (f) => f.endsWith(".woff2"));
const licencas = arquivos("app/fontes", (f) => /(OFL|LICEN[SC]E|LICENCA|UFL|APACHE)[^/]*\.txt$/i.test(path.basename(f)));
// Uma licença por família: os arquivos se chamam pelo papel (titulo*, texto*), e cada família traz a sua.
const familias = new Set(fontes.map((f) => path.basename(f).replace(/[-.].*$/, "")));
if (licencas.length < familias.size) falha(`app/fontes/: ${familias.size} família(s) e ${licencas.length} licença(s); cada família leva a sua (OFL-*.txt)`);

// ---------- 6. O modo de saída combina com o que o site faz ----------
const config = ler("next.config.ts");
const modoPadrao = config.match(/process\.env\.SAIDA\s*\?\?\s*"(estatico|servidor)"/)?.[1];
// A rota estática (force-static, como a do llms.txt) vira arquivo no export: não pede servidor.
const precisaDeServidor = [...arquivos("app"), ...arquivos("components"), ...arquivos("lib")].some(
  (f) => /\.(tsx?)$/.test(f) && (/^\s*["']use server["']/m.test(ler(f)) || (/[/\\]route\.ts$/.test(f) && !/(robots|sitemap)/.test(f) && !/dynamic\s*=\s*["']force-static["']/.test(ler(f)))),
);
if (precisaDeServidor && modoPadrao !== "servidor") falha('o site tem ação de servidor ou rota de API, e o next.config.ts sai em "estatico": mude o padrão para "servidor"');
if (!precisaDeServidor && modoPadrao === "servidor") aviso('o next.config.ts sai em "servidor", mas o site não tem nada de servidor: o estático serve mais barato');

// ---------- relatório ----------
console.log(`Conferência de pronto · ${EXEMPLO ? "site de exemplo" : "site de cliente"}\n`);
for (const t of falhas) console.log(`  FALHA  ${t}`);
for (const t of avisos) console.log(`  aviso  ${t}`);
console.log(`\n${falhas.length ? "REPROVA" : "APROVA"} · ${falhas.length} falha(s), ${avisos.length} aviso(s)`);
process.exit(falhas.length ? 1 : 0);
