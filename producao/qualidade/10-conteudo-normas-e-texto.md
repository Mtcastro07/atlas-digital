# 10 · Conteúdo, normas e texto

> **Para que serve.** Como conferir o que o site **diz**:
> - a verdade de cada afirmação;
> - o que a norma do conselho veda e o que obriga a exibir;
> - a lei do consumidor e o que a ata do Atlas proíbe;
> - o registro verbal;
> - a coerência entre as páginas;
> - os metadados, o mapa do site e os dados estruturados.
>
> *O que* escrever está em `../esteira/10-texto-e-conteudo.md` e em `../esteira/nichos/<nicho>.md` (seção 3, normas; seção 7, texto). Aqui está a conferência.
>
> **Estado.** A régua confere parte disto desde 07.10.2026 (blocos 3, 9 e 10). O script de termos do nicho e as verificações de coerência e de metadados são RATIFICADO.

---

## 1. Por que o texto é o lugar do risco

**Regra.** O texto final de todo site passa por uma conferência automática e por uma leitura humana, frase a frase, **antes do rascunho ir ao cliente e de novo antes da publicação**.

**Objetivo.**
- **O conselho pune o profissional, e o site é a peça de publicidade dele.**
  - Odontologia com preço viola o Código de Ética Odontológico.
  - Advocacia com honorário viola o Provimento 205/2021.
  - Antes e depois, onde é vedado, é processo ético.
- **A oferta obriga:** um preço publicado vincula o fornecedor (CDC, art. 30).
- **O Atlas não pode afirmar o que não é:** nenhuma peça pode declarar CNPJ, prometer nota fiscal ou afirmar registro que não existe (ata v3.0, III.2).

Uma frase errada, aqui, custa mais que qualquer defeito de leiaute (`00-entender-o-projeto.md`, matriz de risco: dimensão "conformidade").

---

## 2. As afirmações e as fontes

**Regra.** Toda afirmação de fato do site está na **tabela de afirmações** do projeto (`00-entender-o-projeto.md`, seção 7), com a fonte e a data. Afirmação sem fonte sai do texto ou vira pergunta ao cliente.

**O que é afirmação de fato:**
- números ("desde 1996", "30 anos", "entrega em 24 horas");
- preços e horários;
- registros ("CRO-RJ 12345") e qualificações ("especialista em…");
- prêmios, parcerias, quantidades ("mais de 2 mil atendimentos");
- promessas ("o rascunho em até 24 horas").

**Como fazer.**
1. Extraia os números do texto: a busca por algarismos e por palavras de quantidade nos arquivos de conteúdo.
2. Cada um tem a linha dele na tabela: fonte (o briefing, o documento do cliente, a ata), data e quem confirmou.
3. A promessa do Atlas vai sempre com a definição da ata: "rascunho em até 24 horas após o briefing **completo**" (ata v3.0, IV.4).

**O exemplo do Atlas (02.10.2026).** A conferência dos textos do site contra os documentos da sociedade:
- **Saíram:**
  - "sem fidelidade", que não está decidido;
  - a promessa sobre domínio e arquivos no encerramento, em consulta ao contador;
  - a frase do briefing feito por quem constrói, que deixou de ser verdade com a mudança de funções de 30.09.
  - "as fotografias são feitas na ocasião", que os documentos da sociedade não sustentam: o material visual vem do cliente, exigido no briefing (contexto comercial, §4);
  - "prazo medido", porque o prazo de 24 horas nunca foi cronometrado num cliente real (contexto comercial, §3);
  - a frase sem fonte "é onde a maioria dos clientes locais abre o endereço".
- **Entraram, cada um com a fonte:** a régua de dez blocos e o zero de cookies e rastreadores nos destaques da capa (no lugar de dois destaques de preço), a norma do conselho conferida na fonte antes do rascunho, fotografias reais sem banco de imagens nem IA, "nada suposto nem inventado" e o estudo de caso com autorização assinada na Condição de Fundação (`CLAUDE.md` do repositório do Atlas, decisões de 02.10.2026). O texto do site só afirma o que os documentos da sociedade sustentam.

**Como conferir.** Nenhum número do texto final está fora da tabela.

---

## 3. A norma do nicho

**Regra.** O texto final é conferido contra a lista de vedações e de obrigações do nicho (`../esteira/nichos/<nicho>.md`, seções 3 e 7), **frase a frase**.

**A conferência automática** (RATIFICADO): um script lê o texto das páginas compiladas e acusa os termos da lista do nicho. É **aviso**, porque a busca por palavra acusa também quem declara a ausência: "não publicamos antes e depois" contém "antes e depois". Exceção: o que é inequívoco, como cifrão num site de odontologia ou de advocacia, é **falha**.

**A ferramenta está na base** (desde 08.10.2026): `ferramentas/verificar-termos.mjs`, pelo `npm run termos`, depois do build.
- **O que lê:** o `out/` do export estático, ou o `.next/server/app/` no modo servidor. A página dinâmica, renderizada a cada pedido, não tem HTML no build: confira-a pela página no navegador.
- **O nicho:** o do `CLAUDE.md` do projeto, ou o que se passa (`npm run termos -- odontologia`).
- **As listas:** uma geral (o superlativo, a garantia, o preço baixo como argumento) e a dos cinco nichos regulados, tiradas dos arquivos de cada nicho: odontologia, advocacia, medicina, psicologia e nutrição. O nicho sem lista própria usa só a geral, e a etapa 3 (`/normas`) acrescenta a dele no arquivo, com a norma e a data da leitura no `decisoes.md`.
- **A classe:** falha só no inequívoco (o cifrão com valor onde o conselho veda o preço, o parcelamento, a gratuidade, "popular"); aviso no resto. "Especialista" na odontologia e na medicina só vale com o registro da especialidade no conselho: por isso é aviso.
- **Achado do teste de 08.10.2026:** a forma que este documento trazia punha "preço" em falha, o que reprovaria toda ausência declarada, e só lia o `.next/server/app`. No site estático, que grava em `out/`, ela não achava página nenhuma.

**A leitura humana.** Com a página aberta no celular, uma pessoa lê cada frase contra três perguntas:
1. A norma do nicho permite dizer isto?
2. O que a norma obriga a exibir está aqui? O registro do conselho, o responsável técnico, o "imagem meramente ilustrativa" onde couber.
3. A imagem que acompanha a frase é permitida? Paciente identificável, antes e depois, procedimento.

**Como conferir.** O relatório de QA traz a lista do nicho marcada, com a data da norma lida e quem leu. O que precisa de advogado fica marcado como tal (`../esteira/17-conformidade-e-normas.md`, seção 10).

---

## 4. A lei do consumidor e a ata

| Verificação | O certo | Fonte |
|---|---|---|
| Identificação do fornecedor | Razão social e CNPJ do cliente (ou nome e registro no conselho), endereço e contato, no rodapé | Decreto 7.962/2013, art. 2º; `../esteira/17-conformidade-e-normas.md`, seção 3.1 |
| Preço publicado | Com o mês de referência e as despesas adicionais (entrega, taxa), quando houver preço | CDC, arts. 30 e 31; `../esteira/17-conformidade-e-normas.md`, seção 9 |
| Oferta e publicidade | Nada que induza a erro: foto de outro lugar, prazo que não se cumpre, "a partir de" sem o valor máximo quando ele importa | CDC, art. 37 |
| O site do Atlas e as peças do Atlas | Nenhuma declaração de CNPJ, nota fiscal ou registro inexistente | Ata v3.0, III.2 (a régua avisa as menções, bloco 9) |
| O vocabulário do preço | "Preço justo", "preço declarado", "sem surpresa"; nunca "barato", "imbatível", "menor preço" | Ata v3.0, IV.1 (a régua avisa, bloco 10) |
| Fora do texto até decisão | "Sem fidelidade", garantia, a titularidade do domínio e a entrega dos arquivos no encerramento, "mais escolhido", número sem fonte, depoimento inventado | `../esteira/10-texto-e-conteudo.md` |
| O plano Profissional | "Recomendado", nunca "mais escolhido" | Contexto comercial, no repositório do Atlas |

---

## 5. O registro verbal

**Regra.** O texto é impessoal, de frases curtas, sem superlativo sem prova, sem as marcas de texto gerado (`../esteira/10-texto-e-conteudo.md`).

**A conferência automática** é da régua, bloco 10, e é **aviso**:
- a mediana acima de 14 palavras por período;
- o período acima de 28 palavras;
- o vocabulário vedado.

**A leitura humana**, antes do rascunho, procura o que a máquina não vê:

| Procurar | Exemplo | Por quê |
|---|---|---|
| Aforismo em dois tempos repetido | "Quatro etapas. Nenhuma delas opcional." | Cadência de texto gerado (`../esteira/11-anti-ia.md`) |
| Palavra-moldura | "eleve", "transforme", "solução completa" | Idem |
| Narrativa de dor | "Cansado de…?" | Manipula em vez de informar |
| Hedge | "costuma", "geralmente" | Enfraquece a afirmação e não diz nada |
| Intensificador | "muito", "extremamente", "super", "realmente" | Pede ênfase em vez de dar o fato (`../esteira/10-texto-e-conteudo.md`, seção 4) |
| Conector de ligação | [NV] "além disso", "dessa forma", "ademais" | Vedado pela régua verbal de setembro; definição A CONFIRMAR (`../esteira/10-texto-e-conteudo.md`, seção 4) |
| Travessão em excesso | Vários por parágrafo | Cadência de texto gerado, quando satura |
| Segunda pessoa no site do Atlas | "você", "seu negócio" | O registro é impessoal; o slogan é a única exceção decidida |
| O mesmo fato dito duas vezes | O horário no topo, no corpo e no rodapé, com palavras diferentes | Cada fato uma vez (`../esteira/10-texto-e-conteudo.md`) |

**O aviso aberto do Atlas.** A mediana de 16 palavras por período em O Atlas (rodada de 08.10.2026) espera decisão. É o tipo de aviso que exige leitura, não correção automática.

---

## 6. A coerência entre as páginas

**Regra.** O mesmo fato tem o mesmo valor em todas as páginas e em todos os formatos: no texto, no rodapé, nos metadados, nos dados estruturados e na mensagem pronta do WhatsApp.

**Objetivo.** O conteúdo tipado existe para isso (`../esteira/10-texto-e-conteudo.md`): um fato num lugar só, lido por todos. A coerência quebra quando alguém escreve o fato à mão num componente.

**Como conferir** (RATIFICADO, no script de termos ou num teste de unidade):

| Fato | Verificação |
|---|---|
| Telefone e WhatsApp | Todo `wa.me/<número>` e todo `tel:` do site tem o número do briefing (no site de exemplo, o número fictício) |
| Preço | Todo `R$` do texto existe na tabela de preços do conteúdo |
| Horário | O horário do rodapé, o da página de contato e o dos dados estruturados são o mesmo |
| Endereço | O do rodapé, o do mapa e o dos dados estruturados são o mesmo |
| Nome | O nome do estabelecimento é escrito igual em toda parte, inclusive no `og:title` |

No repositório do Atlas, os dados estruturados (`lib/dados-estruturados.ts`) são gerados **do mesmo conteúdo** que a página exibe: preço, contato e perguntas não divergem do texto visível. É o modelo.

---

## 7. Metadados, mapa do site e dados estruturados

| Verificação | O certo | Instrumento |
|---|---|---|
| `<title>` e descrição | Presentes, próprios de cada página, sem repetir os de outra página do mesmo site | Régua, bloco 3 (falha) |
| `og:title`, `og:description`, `og:image` | Presentes; a imagem abre (200), em 1200 × 630; pode se repetir dentro de um site, por decisão | Régua, bloco 3 |
| O cartão no WhatsApp | Colar o endereço numa conversa de teste e olhar o cartão: título, descrição e imagem certos | À mão, na publicação (o WhatsApp guarda o cartão em cache por um tempo) |
| Endereço canônico | Cada página aponta para si mesma; a 404 não tem canônico | Teste de ponta a ponta (`05`, seção 5.3) |
| `noindex` | Nos sites de exemplo (com `follow: false`) e na área restrita; em nenhuma página pública de cliente | Régua, bloco 9 (sites de exemplo); leitura do layout |
| `robots.txt` | Libera o site e aponta o mapa; no site de cliente, nenhum robô de IA barrado. **Nunca bloqueia uma página `noindex` para quem lê o `noindex`** (`Googlebot`, `bingbot`, `OAI-SearchBot`, `Applebot`, `Amzn-SearchBot`): bloqueada, o buscador não lê o `noindex` e pode listar o endereço mesmo assim [V]. No site de exemplo, só os 11 robôs de IA de treino ou sem `noindex` documentado levam `Disallow: /` (`../esteira/21-busca-e-ias.md`, seção 2) | `curl` no endereço publicado |
| Mapa do site | Lista toda página pública, pelo endereço canônico (a barra no fim, no estático), sem `changefreq` nem `priority`, nenhuma `noindex`, nenhuma que responda diferente de 200; a data da última alteração atualizada na publicação com mudança de conteúdo (no repositório do Atlas, `ultimaAlteracao` em `app/sitemap.ts`, escrita à mão) | Script abaixo |
| Dados estruturados | Na capa do cliente, o `WebSite` e o `LocalBusiness` (ou o tipo do nicho) num grafo com `@id`, com nome, endereço, telefone e horário iguais aos do texto; JSON válido (`node ferramentas/texto-do-robo.mjs`); **nenhuma** avaliação ou nota (`aggregateRating`) que não seja real e verificável; o JSON escapado (`<` vira `<`) | Leitura, e o teste de resultados avançados do Google, à mão |
| `lang` | `pt-BR` em toda página, inclusive nas de erro | Régua, bloco 3; `05`, seção 5.4 |
| Vínculos internos | Toda âncora tem destino; toda página do mapa responde 200 | Régua, bloco 3; o script do mapa, abaixo |
| Vínculos externos | O perfil no Google, as redes, a norma citada, o mapa: todos abrem | Semanal e como **aviso** (o site de fora sai do ar sem aviso), com o `linkinator` (RATIFICADO; dependência, entra com a etapa) ou à mão na manutenção mensal |
| Conteúdo estático (HTML pré-renderizado) | Um `h1` por página; `lang` em português; `title`, descrição e `og:` presentes e distintos por página (a imagem pode se repetir dentro do site); `noindex` exatamente nos sites de exemplo e na 404; mapa do site e dados estruturados; nenhuma frase vedada pela norma do nicho | Os protótipos abaixo e o léxico da seção 3, sobre `.next/server/app/**/*.html`; a régua, blocos 3 e 9, no navegador. O protótipo da pesquisa de QA (07 e 08.10.2026) achou o `og:image` com só 4 valores distintos nas 23 páginas (decisão: pode se repetir) e a `/_global-error` sem `lang` (corrigida) |

**Os metadados do HTML pré-renderizado, conferidos** (protótipo `ferramentas/og-distintos.mjs`, da pesquisa de QA de 07 e 08.10.2026; `node og-distintos.mjs <pasta-da-aplicação>` depois do `npm run build`). Para `og:title`, `og:description`, `og:image`, `description` e `title`, conta os valores distintos em todas as páginas e lista os repetidos. A repetição da imagem é aceita; a do título e a da descrição é falha da régua (bloco 3). Na primeira rodada, achou o `og:image` com só 4 valores distintos em 23 páginas:

    // Protótipo: marcações presentes e distintas por página, lidas do HTML pré-renderizado.
    import { readFileSync, readdirSync, statSync } from "node:fs";
    import { join, relative } from "node:path";
    const appDir = join(process.argv[2], ".next/server/app");
    const files = [];
    (function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") && !/_(global-error|not-found)/.test(p) && files.push(p); } })(appDir);
    const pega = (html, re) => (html.match(re) || [])[1];
    const chaves = { "og:title": /property="og:title" content="([^"]*)"/, "og:description": /property="og:description" content="([^"]*)"/, "og:image": /property="og:image" content="([^"]*)"/, description: /name="description" content="([^"]*)"/, title: /<title>([^<]*)<\/title>/ };
    const valores = {};
    for (const f of files) { const html = readFileSync(f, "utf8"); const rota = "/" + relative(appDir, f).replace(/(index)?\.html$/, ""); for (const [k, re] of Object.entries(chaves)) ((valores[k] ||= {})[pega(html, re) ?? "(ausente)"] ||= []).push(rota); }
    for (const [k, mapa] of Object.entries(valores)) { const repetidos = Object.entries(mapa).filter(([, r]) => r.length > 1); console.log(`${k}: ${Object.keys(mapa).length} valores distintos em ${files.length} páginas; repetidos: ${repetidos.map(([v, r]) => `"${v.slice(0, 50)}" ×${r.length}`).join(" | ") || "nenhum"}`); }

**O mapa do site, conferido:**

```js
// ferramentas/verificar-mapa.mjs — node ferramentas/verificar-mapa.mjs http://localhost:3000
const base = process.argv[2] ?? "http://localhost:3000";
const xml = await (await fetch(`${base}/sitemap.xml`)).text();
let falhas = 0;
for (const [, loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const caminho = new URL(loc).pathname; // o mapa traz o domínio de produção; testa-se o caminho na base dada
  const resposta = await fetch(base + caminho, { redirect: "manual" });
  const html = resposta.status === 200 ? await resposta.text() : "";
  const robots = html.match(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/)?.[1] ?? "";
  if (resposta.status !== 200) (falhas++, console.error(`${caminho}: ${resposta.status}`));
  else if (/noindex/.test(robots)) (falhas++, console.error(`${caminho}: noindex dentro do mapa`));
}
process.exitCode = falhas ? 1 : 0;
```

---

## 8. Os sites de exemplo

**Regra.** Todo site de exemplo leva, em toda página:
- **o selo de ficção visível;**
- **`noindex`** (com `follow: false`) no layout;
- **"Estabelecimento fictício."** na descrição;
- **o WhatsApp fictício;**
- **nenhuma coleta.**

São obrigatórios (`CLAUDE.md` do repositório do Atlas; `../esteira/17-conformidade-e-normas.md`, seção 9).

**Como conferir.**
- **A régua (bloco 9)** reprova a página sob `/demos/` sem `noindex` ou sem o selo.
- **À mão:** a descrição de cada página e o número do WhatsApp. O número fictício está em `conteudo/demos/comum.ts`, no repositório do Atlas.
- **O conteúdo fictício segue as normas do nicho** como se fosse real. O site de exemplo é a vitrine do que o Atlas entrega, e um exemplo que viola a norma ensina o cliente a violá-la.

---

## 9. Quando conferir

| Momento | O quê |
|---|---|
| A cada mudança de texto | Régua (blocos 3, 9 e 10) nas páginas tocadas |
| Antes do rascunho ir ao cliente | Tabela de afirmações completa; norma do nicho, frase a frase; leitura do registro |
| Antes da publicação | Tudo de novo, no texto **final**, aprovado pelo cliente; o cartão do WhatsApp; o mapa do site; os dados estruturados |
| Na manutenção mensal | O que mudou; a data dos preços; a norma do nicho, se mudou. A nutrição tem norma nova a partir de 23.01.2027 (`../esteira/nichos/README.md`) |
