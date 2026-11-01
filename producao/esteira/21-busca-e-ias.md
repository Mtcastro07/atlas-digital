# 21 · A busca e as respostas de IA

> **Para que serve.** Dizer como todo site do Atlas aparece nas buscas (Google, Bing) e nas respostas das IAs (AI Overviews e AI Mode do Google, Copilot, ChatGPT, Claude, Perplexity): o que cada robô faz e como tratá-lo, o que a base já entrega, o que se faz na construção, na publicação e na manutenção, e o que depende do dono do negócio.
>
> **Quando ler.** Na construção (o conteúdo que o robô lê), na publicação (seção 11 e `18-publicacao-e-manutencao.md`, seção 5.1) e a cada publicação de manutenção (o aviso ao IndexNow).
>
> **Depende de.** `14-funcionalidades/01-base-de-todo-site.md` (seções 6 e 10 a 13, e a 19, o texto que o robô lê), onde moram as regras de implementação; `10-texto-e-conteudo.md`, seção 10; `18-publicacao-e-manutencao.md`, seções 5 e 5.1; `../qualidade/14-ciclo-de-qa.md`, seção 5. O código está na base (`../base/`).
>
> **Estado.** DECIDIDO em 16.10.2026, a pedido do usuário: "adicione a capacidade de aparecer nas pesquisas e nas IAs em todos os sites, independentemente do plano, dentro da documentação da produção." Vale para **todo site, em todo plano** (Essencial, Profissional e Completo): é da base, não diferencial de plano (`03-planos.md`, seção 1, regra 5). O que o Completo acrescenta são páginas de busca (uma por serviço, profissional ou bairro), não a capacidade.
>
> **Fontes.** A pesquisa de 16.10.2026, com a data de cada fonte, e a auditoria e o plano do site do Atlas do mesmo dia (`99-rastreabilidade.md`, seção 8). As páginas de ajuda da OpenAI e do Bing recusaram a leitura direta: o que vem delas saiu de resultado de busca e de reportagem, e leva [FU].
>
> **Atualizado em:** 16.10.2026.

---

## O que todo site tem

| # | O quê | O que a base já faz | O que o produtor faz | Seção |
|---|---|---|---|---|
| 1 | O `robots.txt` por tipo de site | `app/robots.ts` | Nada | 2 |
| 2 | O mapa do site com o endereço canônico e a data verdadeira | `app/sitemap.ts` | Atualizar `ultimaAlteracao` (`conteudo/negocio.ts`) a cada mudança de conteúdo | 3 |
| 3 | O título e a descrição que dizem o que se vende e onde | `lib/metadados.ts` | Escrever os títulos em `conteudo/site.ts` | 4 |
| 4 | O JSON-LD `WebSite` + negócio, do conteúdo visível **[cli]** | `lib/dados-estruturados.ts` | O subtipo, o `geo`, a faixa de preço onde o conselho permite | 5 |
| 5 | O texto que o robô lê | Os `{" "}` dos componentes; `ferramentas/texto-do-robo.mjs` | A definição no início; o `{" "}` em todo componente novo | 6 |
| 6 | O `/llms.txt` | `app/llms.txt/route.ts`, `lib/llms.ts` | Nada: sai do conteúdo | 7 |
| 7 | O aviso ao IndexNow **[cli]** | `ferramentas/avisar-indexnow.mjs` | A chave na primeira publicação; o aviso a cada publicação | 8 |
| 8 | Search Console, Bing, Perfil da Empresa, perfis, menções **[cli]** | — | O dono, com o Atlas | 9 |

Nada disso põe script, cookie ou pedido de terceiro no site: tudo é arquivo servido pelo próprio domínio, e o IndexNow é um aviso que o produtor manda, da máquina dele, depois de publicar.

---

## 1. Os robôs, e o índice que cada IA consulta

| Robô (o nome no `robots.txt`) | De quem, para quê | Obedece ao `robots.txt` | Lê o `noindex` | Cliente | Exemplo |
|---|---|---|---|---|---|
| `Googlebot` | Google: a busca, inclusive AI Overviews e AI Mode | Sim | Sim, se puder rastrear a página | Liberado | Liberado, para ler o `noindex` |
| `Google-Extended` | Google: não é robô, é um nome; o treino do Gemini e o embasamento nos apps Gemini e no Vertex AI. "Does not impact a site's inclusion in Google Search" | Sim | — | Liberado | `Disallow: /` |
| `bingbot` | Microsoft: o índice do Bing, que embasa o Copilot e os resumos de IA do Bing | Sim | Sim | Liberado | Liberado |
| `OAI-SearchBot` | OpenAI: a busca do ChatGPT | Sim (cerca de 24 h para valer) | Sim: a OpenAI manda usar o `noindex`, e o robô precisa rastrear para lê-lo [FU] | Liberado | Liberado |
| `GPTBot` | OpenAI: treino | Sim | Não documentado | Liberado | `Disallow: /` |
| `Claude-SearchBot` | Anthropic: a busca | Sim | Não mencionado | Liberado | `Disallow: /` |
| `ClaudeBot` | Anthropic: treino | Sim | Não mencionado | Liberado | `Disallow: /` |
| `PerplexityBot` | Perplexity: o índice de busca, "not used to crawl content for AI foundation models" | Sim | Não documentado | Liberado | `Disallow: /` |
| `Applebot` | Apple: Spotlight, Siri, Safari | Sim | Sim | Liberado | Liberado |
| `Applebot-Extended` | Apple: não rastreia; decide se o que o `Applebot` coletou entra no treino | Sim | — | Liberado | `Disallow: /` |
| `Amzn-SearchBot` | Amazon: a busca | Sim | Sim | Liberado | Liberado |
| `Amazonbot` | Amazon: treino possível | Sim | Sim (`noarchive`: sem treino) | Liberado | `Disallow: /` |
| `meta-webindexer` | Meta: a busca e as citações do Meta AI | Sim | — | Liberado | `Disallow: /` |
| `meta-externalagent` | Meta: treino e indexação | Sim | — | Liberado | `Disallow: /` |
| `CCBot` | Common Crawl: o arquivo aberto da web, muito usado em treino | Sim | Não mencionado | Liberado | `Disallow: /` |
| `DuckAssistBot` | DuckDuckGo: as respostas com IA; "not used in any way to train AI models" | Sim (cerca de 72 h para valer) | — | Liberado | `Disallow: /` |
| `Claude-User` | Anthropic: a visita que a pessoa pede ao Claude, na hora | Sim, pelo texto da Anthropic; bloqueá-lo "may reduce your site's visibility for user-directed web search" | Não mencionado | Liberado | Liberado: a defesa é o selo de ficção em texto |
| `ChatGPT-User`, `Perplexity-User`, `Google-Agent`, `meta-externalfetcher`, `Amzn-User` | A visita que a pessoa pede à IA, na hora | Podem ignorar ("robots.txt rules may not apply"; "generally ignores robots.txt rules"; "may not follow all") | Não se aplica | Liberado | Sem grupo: a defesa é o selo de ficção em texto |

Fontes: as páginas oficiais de cada empresa, consultadas em 16.10.2026 (lista no fim) [V], salvo onde a marca diz [FU].

**Que índice cada IA consulta:**
- **Google** (AI Overviews, AI Mode): o próprio índice. A página precisa estar indexada e ter trecho elegível, e o site, incluído no controle "Search generative AI" do Search Console, que vem incluído por padrão (support.google.com/webmasters/answer/16908024) [V].
- **Copilot e os resumos do Bing:** o índice do Bing [V].
- **ChatGPT:** "third-party search providers", sem nome; a página de Enterprise e Edu cita o Bing (help.openai.com/en/articles/10093903) [FU]; e o próprio `OAI-SearchBot`. Não há confirmação oficial de 2026 de que o ChatGPT comum use o Bing.
- **Claude:** o Brave Search, pela lista de subprocessadores de 19.03.2025 e pelo teste de Simon Willison (simonwillison.net/2025/Mar/21/anthropic-use-brave/) [FU]; e o `Claude-SearchBot`.
- **Perplexity:** o próprio índice (`PerplexityBot`).

**A consequência** [NV: inferência das fontes acima]: estar bem no Google e no Bing, e não barrar os robôs de busca das IAs, cobre quase todas as respostas. Não há atalho próprio "para IA".

---

## 2. O `robots.txt`, por tipo de site

**Regra.**
- **[cli] Site de cliente:** `User-Agent: *` com `Allow: /`, e o mapa do site apontado. **Nenhum robô de IA fica de fora, nem o de treino:** o cliente quer ser achado e citado (DECIDIDO em 16.10.2026). Bloquear o grupo de treino não tira o site da busca do Google ("does not impact a site's inclusion in Google Search") [V], **mas o `Google-Extended` controla também o embasamento nos apps Gemini e no Vertex AI** (seção 1) [V]: barrado, o site sai dessas respostas. Se o cliente pedir para ficar fora do treino, o produtor lhe diz isso antes; a decisão é dele, registrada no `decisoes.md`, e o grupo de treino (`GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended`, `Applebot-Extended`, `meta-externalagent`, `Amazonbot`) entra com `Disallow: /`.
- **[ex] Site de exemplo:**
  - o `*` continua liberado, e os 11 robôs da tabela com `Disallow: /` ficam num grupo próprio: os de treino e os de busca que não documentam respeito ao `noindex`;
  - o `noindex, nofollow` vai na página (o layout) e no cabeçalho (`X-Robots-Tag`, que o `gerar-htaccess` grava no exemplo e que alcança também as imagens e os arquivos que a meta não cobre) [V: Google, block-indexing];
  - o mapa do site fica vazio.

**Objetivo.**
- **Não barrar quem lê o `noindex`.** A página bloqueada no `robots.txt` não deixa o robô ver o `noindex`, e o endereço "can still appear in search results" (Google, block-indexing, 10.12.2025) [V]. Por isso `Googlebot`, `bingbot`, `OAI-SearchBot`, `Applebot` e `Amzn-SearchBot` nunca entram no grupo: precisam rastrear para obedecer.
- **Cada robô usa um só grupo,** o mais específico que casar com o nome dele, e o grupo com nome não se soma ao `*` (RFC 9309; Google, robots-txt-spec, 31.08.2026) [V]. Uma regra nova no `*` tem de ser repetida no grupo dos 11.
- **Os robôs acionados pelo usuário podem ignorar o `robots.txt`.** Contra eles, a defesa é o que está escrito na página: o selo de ficção, a descrição terminada em "Estabelecimento fictício." e o `llms.txt` do exemplo, que só traz o nome e o selo, como resumo (`14-funcionalidades/01-base-de-todo-site.md`, seção 13).

**Como fazer.** A base já faz (`../base/app/robots.ts`): o grupo dos 11 entra sozinho quando `exemplo: true`. Nome novo na lista, só com a documentação oficial do robô. O `robots.txt` vale só para o host em que está: cada site de exemplo, no subdomínio dele, serve o seu.

**Como conferir.** `curl -s https://<domínio>/robots.txt`:
- **cliente:** só `User-Agent: *`, `Allow: /` e a linha `Sitemap:`;
- **exemplo:** o mesmo, mais um grupo com as 11 linhas `User-Agent` e `Disallow: /`. O Next escreve o grupo assim, com várias linhas `User-Agent` seguidas, o que a RFC 9309 admite (conferido no servidor do Atlas em 16.10.2026). `Googlebot`, `bingbot`, `OAI-SearchBot`, `Applebot` e `Amzn-SearchBot` nunca aparecem pelo nome.

---

## 3. O mapa do site

**Regra.**
- Só as páginas indexáveis: nenhuma `noindex`, nenhuma de exemplo.
- **O `<loc>` é o endereço canônico.** No estático (`trailingSlash: true`), termina em barra: a base lê o `trailingSlash` do `next.config.ts`. Até 16.10.2026, o mapa da base listava `/servicos`, que redireciona para `/servicos/`.
- **O `<lastmod>` é a data verdadeira** da última mudança de conteúdo, escrita à mão em `ultimaAlteracao` (`conteudo/negocio.ts`), nunca a do build. O Google só usa a data que é "consistently and verifiably accurate" [NV: consolidado; não reconferido em 16.10.2026], e mudar a data sem mudar o conteúdo é sinal ruim (Google, creating-helpful-content, 05.10.2026) [V].
- **Sem `priority` nem `changefreq`:** o Google os ignora [consolidado; não reconferido em 16.10.2026].
- **[ex]:** vazio.

**Como fazer.** A base já faz (`../base/app/sitemap.ts`). A cada publicação com mudança de conteúdo, `ultimaAlteracao` passa à data do dia. É uma data para o site inteiro: quando uma mudança tocar uma página só, a data pode passar para cada entrada (o `shortcut:` está no código).

**Como conferir.** `curl -s https://<domínio>/sitemap.xml`: as páginas do menu e as legais, com o domínio certo, a barra no fim (no estático), a data da última mudança e nenhum `changefreq` nem `priority`.

---

## 4. O título e a descrição

**Regra** (`10-texto-e-conteudo.md`, seção 10; `14-funcionalidades/01-base-de-todo-site.md`, seção 10):
- **No início:** "Nome · o que faz, onde" ("Banho e Tosa Fonseca · banho e tosa no Fonseca, Niterói").
- **Nas internas:** o título diz o que a página tem e, quando cabe, o serviço e o lugar ("Valores da consulta em Icaraí · Nutrição Icaraí"). **Nunca só o rótulo do menu** ("Onde", "O Atlas", "Orçamento"): o rótulo serve ao menu; o título, à busca. Até cerca de 60 caracteres [NV: prática de busca].
- **A descrição** começa pelo fato principal, nos primeiros 80 caracteres, com o serviço e o lugar.

**Objetivo.** O título é a primeira coisa que a busca e a resposta da IA mostram. A auditoria do site do Atlas (16.10.2026) achou títulos como "O Atlas · Atlas Digital": nenhum dizia "sites" nem "Niterói".

**Como conferir.** A régua, bloco 3 (títulos e descrições distintos); a leitura dos títulos de `conteudo/site.ts`.

---

## 5. Os dados estruturados [cli]

**O que a base faz** (`../base/lib/dados-estruturados.ts`; a regra em `14-funcionalidades/01-base-de-todo-site.md`, seção 11): na página inicial, um `@graph` com o `WebSite` (o nome do site que a busca mostra: Google, site-names, 10.12.2025) [V] e o negócio no subtipo de `LocalBusiness`, ligados pelo `@id` (`<domínio>/#site` e `<domínio>/#negocio`), tudo do mesmo conteúdo que a página mostra. Nunca no site de exemplo.

**O que a evidência diz:**
- **Não há marcação especial para IA:** "Structured data isn't required for generative AI search, and there's no special schema.org markup" (Google, 10.07.2026) [V].
- **Os estudos não acham ganho nas citações:** Ahrefs (05.2026, diferença-em-diferenças com 1.885 páginas: AI Mode +2,4% e ChatGPT +2,2%, dentro do ruído; AI Overviews −4,6%) e Fischman (SSRN, 02.2026, pré-print, efeito nulo) [FU].
- **O Bing declara que usa** o schema nos modelos dele (Fabrice Canel, 18.03.2025): é declaração, não medição [FU].

Por isso, só o que é verdadeiro e visível, sem acréscimo "para a IA".

**O que não se marca:**
- avaliação do próprio negócio (`review`, `aggregateRating`) [V];
- `ProfessionalService`: obsoleto, "due to confusion with Service" (schema.org) [V];
- `Product` para serviço;
- o que a página não mostra ("Don't mark up content that is not visible to readers", Google, sd-policies, 10.07.2026) [V]: nada de `knowsAbout` ou `alumniOf` que o texto não afirma;
- o preço onde o conselho o veda (`14-funcionalidades/01-base-de-todo-site.md`, seção 11);
- nada no site de exemplo.

**O que se acrescenta, quando existe:**
- `sameAs` com os perfis reais do negócio (seção 9);
- `founder` e `Person` só na página que mostra o nome e a função;
- `Offer` em BRL só com o preço igual ao da página (`UnitPriceSpecification` para a mensalidade). Não há resultado rico de serviço, e o ganho é especulativo [NV];
- `FAQPage` pode ficar, se idêntico ao texto, mas o resultado rico de perguntas frequentes deixou de aparecer em 07.05.2026 (retirada confirmada em 15.06.2026) [V].

**Como conferir.**
- `node ferramentas/texto-do-robo.mjs <endereço>`: o JSON-LD de cada página é JSON válido e traz os tipos esperados (`WebSite, <subtipo>` na capa);
- antes da primeira publicação, e quando o JSON-LD mudar, à mão: o Teste de Pesquisa Aprimorada (https://search.google.com/test/rich-results) e https://validator.schema.org, que exigem rede e navegador.

---

## 6. O texto que o robô lê [todos]

**O fato.** Os grandes robôs de IA não executam JavaScript: leem o HTML que o servidor entrega (Vercel, 17.12.2024) [FU]. A base pré-renderiza toda página, e o texto já está lá; o risco é o que o CSS desenha e o HTML não diz.

**A regra** (o detalhe, com os casos, em `14-funcionalidades/01-base-de-todo-site.md`, seção 19):
- um `{" "}` entre as linhas de um título e entre o rótulo e o valor que a tela mostra separados;
- a cópia decorativa de texto só pelo CSS, nunca repetida no HTML;
- o nome fictício numa página real sempre junto do aviso de ficção;
- a definição no início: o nome, o que o negócio faz e onde, em texto, nas primeiras linhas (Bing, diretrizes de 02.2026: o essencial no topo, os fatos afirmados direto, o nome das entidades igual em toda parte, um assunto por endereço) [FU];
- os números concretos (o preço, o prazo, o horário) em texto: no estudo controlado de Aggarwal et al. (KDD 2024), citações, trechos citados e números aumentaram a visibilidade em 30% a 40%, e o enchimento de palavra-chave piorou [FU].

**O que não se faz:** picotar o texto "para a IA" ("no requirement to break your content into tiny pieces"; "You don't need to write in a specific way just for generative AI search", Google, 10.07.2026) [V]; encher de palavra-chave; trocar a data sem mudar o conteúdo.

**Como conferir.** `node ferramentas/texto-do-robo.mjs http://localhost:3100` (depois do `npm run estatico`) e, no ar, contra o domínio. Ele mostra os títulos como saem do HTML, as palavras coladas, o "fictício" e o JSON-LD, e sai com 1 se houver palavra colada ou JSON-LD inválido. `--texto` imprime o texto inteiro, para ler: número colado em número ("R$ 501h") só a leitura acha.

---

## 7. O `llms.txt` [todos]

**O que é.** A proposta de Jeremy Howard (03.09.2024, revista em 10.08.2026; https://llmstxt.org) [V]: um arquivo Markdown em `/llms.txt`, com um H1 com o nome do site (o único item obrigatório), uma citação com o resumo, listas de vínculos e uma seção "Optional", que o leitor pode pular.

**A evidência, sem exagero:**
- **o Google não o usa:** "Google Search itself doesn't use them" (guia de otimização para IA, nota de 15.06.2026) [V];
- **não há correlação medida:** SE Ranking (15.10.2026, cerca de 300 mil domínios): "no correlation between AI citations and LLMs.txt" [FU];
- **quase ninguém o pede:** a Otterly contou 84 pedidos em 62.100 visitas de robôs de IA [FU, mercado]. Pedir o arquivo não prova que ele é usado;
- **a favor,** só um estudo de fornecedor (+11% de citações, no Claude e na Perplexity), sem confirmação independente [FU].

**O veredito: aposta de custo baixo.** O arquivo sai do conteúdo, sem trabalho por site, e pode servir ao agente que a pessoa manda ler o site [NV]. Não é alavanca e não se promete ao cliente.

**O que a base faz** (`../base/app/llms.txt/route.ts` e `lib/llms.ts`):
- **[cli]** o nome, a descrição do início, o endereço, o telefone, o horário, o prazo de resposta e o registro do conselho, quando há;
- **[cli]** as páginas do menu com a descrição de cada uma e, em "Optional", as legais, todas pelo endereço canônico. É um índice: o detalhe (os serviços, os preços) fica nas páginas, que o leitor abre;
- **[ex]** só o nome, no H1, e o selo de ficção, como resumo: nem o contato fictício nem as páginas, que são todas `noindex` (o mapa do site também sai vazio);
- nunca o que é `noindex` ou fictício;
- **sem `X-Robots-Tag` próprio:** o arquivo fica legível e indexável como as páginas, como no site do Atlas (`app/llms.txt/route.ts`; decisão do coordenador, 16.10.2026). No exemplo, o `noindex, nofollow` de toda resposta o alcança também (seção 2);
- o UTF-8 declarado no `.htaccess` (`AddDefaultCharset`) [NV: conferir no ar].

**Sem `llms-full.txt` nem versão `.md` de cada página:** não há evidência, e duplicariam o HTML. O `llms-full.txt` nem está na proposta: é convenção da Mintlify [FU].

**A medir antes de afirmar qualquer efeito:** os pedidos ao `/llms.txt` nos registros de acesso da Hostinger, no site do Atlas (`13-tecnologia-e-estrutura.md`, seção 9.3).

**Como conferir.** `curl -s https://<domínio>/llms.txt` começa por `# <Nome>`: no cliente, com as páginas pelo canônico e nenhum endereço `noindex`; no exemplo, só o nome e o selo. `curl -sI https://<domínio>/llms.txt` traz `text/plain; charset=utf-8` e, no cliente publicado, nenhum `x-robots-tag`.

---

## 8. O IndexNow, depois de cada publicação [cli]

**O que é** (https://www.indexnow.org/documentation e /faq) [V]: um aviso de que um endereço foi criado, mudou ou saiu, que chega de uma vez a Bing, Yandex, Naver, Seznam, Yep e Amazon. O Google não participa: para ele, basta o mapa do site. O Bing diz que o IndexNow mantém a informação atual "across search and AI experiences" (02.2026) [V]; para o ChatGPT, o efeito viria por tabela, via Bing [NV].

**Regra.**
- **Só o que mudou:** "Submit only when content has changed". Nunca reenviar sem mudança, nunca o site de exemplo.
- **A chave** prova a posse do domínio e é pública por desenho: de 8 a 128 caracteres, num arquivo `/<chave>.txt` na raiz, em UTF-8, com a própria chave.
- **A resposta 200 quer dizer recebido**, não indexado; o mapa do site continua o inventário completo.
- **Sem dado do visitante:** é um aviso do produtor, compatível com a política de nenhum cookie e nenhum rastreador.

**Como fazer** (`../base/ferramentas/avisar-indexnow.mjs`, na raiz do site) [NV: o envio nunca foi executado; o primeiro será o do site do Atlas, e a ferramenta só se dá por conferida depois dele; até lá, conferida só contra um servidor local, sem envio]:
1. **Na primeira publicação,** antes do build: `node ferramentas/avisar-indexnow.mjs --chave-nova` grava `public/<chave>.txt`, que vai ao ar com o site.
2. **Depois de publicar e de passar a conferência no ar** (`18-publicacao-e-manutencao.md`, seção 5): `node ferramentas/avisar-indexnow.mjs --ensaio / /servicos/`. Ele confere que a chave responde no domínio e que cada endereço está no mapa do site, e mostra o pedido sem enviar.
3. **O envio:** o mesmo comando sem `--ensaio`. Na primeira publicação, todas as páginas; depois, só as que mudaram.

**Cuidado.** A CDN da Hostinger pode responder com a página de verificação de navegador: se a chave não voltar, a ferramenta para antes de enviar. Ela recusa também o site de exemplo, o endereço fora do mapa e o envio contra outro endereço que não o domínio.

**Como conferir.** A resposta `200` ou `202`; depois, o relatório IndexNow do Bing Webmaster Tools (aceitos e erros), com o dono (seção 9).

---

## 9. O que depende do dono [cli]

O site faz a parte dele sozinho. Estes itens estão fora do código e dependem do dono do negócio, com a ajuda do Atlas. A lista vai ao cliente na entrega (`18-publicacao-e-manutencao.md`, seção 5.1).

| # | O quê | Por quê | Fonte |
|---|---|---|---|
| 1 | **Google Search Console:** a propriedade de domínio, verificada pelo registro TXT na zona da Hostinger, que o Atlas administra como contato técnico (`18-publicacao-e-manutencao.md`, seção 4); o envio do `sitemap.xml`; o controle "Search generative AI" em **incluir**; o relatório de IA generativa | Sem o controle incluído, o site não entra em AI Overviews, AI Mode e Discover. O controle chegou a todos os sites em 31.08.2026, e o padrão é incluir | support.google.com/webmasters/answer/16908024 e /16984139 [V] |
| 2 | **A conta é do cliente,** e o Atlas entra como usuário: o mesmo princípio do Perfil da Empresa (`14-funcionalidades/06-presenca.md`, seção 1) | O cliente não perde a propriedade no fim do contrato | [NV: aplicação do princípio do Perfil; a confirmar pelo aprovador] |
| 3 | **Bing Webmaster Tools:** importar do Search Console (o mapa vem junto, e a verificação é automática); acompanhar o IndexNow e o relatório AI Performance | O Bing embasa o Copilot; o AI Performance mostra as citações no Copilot, nos resumos de IA do Bing e em parceiros | blogs.bing.com (09.2019; 10.02.2026) [V] |
| 4 | **Perfil da Empresa no Google:** é do cliente (proprietário principal). Com o módulo Presença, o Atlas o abre e o mantém (`14-funcionalidades/06-presenca.md`); sem o módulo, o dono cuida, e o Atlas entrega a lista do que preencher igual ao site: o nome real, sem descrição nem bairro; o endereço, ou a área de atendimento com o endereço oculto, para quem vai até o cliente; o telefone sob controle do negócio; o horário; o site | Na busca local pesam a relevância, a distância e a notoriedade, e as avaliações contam | support.google.com/business/answer/3038177 e /7091 [V] |
| 5 | **Os perfis do negócio** (Instagram, WhatsApp Business, LinkedIn, diretórios): o mesmo nome, telefone, e-mail e site do rodapé (`14-funcionalidades/01-base-de-todo-site.md`, seção 6). Quando existirem, entram no `sameAs` do JSON-LD | O nome igual em toda parte é o que liga as fontes ao mesmo negócio (Bing, 02.2026) | [FU] |
| 6 | **Menções autênticas:** a associação do bairro, a imprensa local, os fornecedores, os clientes. Nunca compradas | As menções à marca na web correlacionam com a presença nas respostas de IA (0,664, contra 0,218 dos vínculos): é correlação, não experimento; menção inautêntica "isn't as helpful as it might seem" | Ahrefs, 26.05.2025 [FU]; Google, 10.07.2026 [V] |
| 7 | **As avaliações:** só no Perfil, pedidas a todos, sem incentivo (`14-funcionalidades/06-presenca.md`, seção 2.1); nunca no JSON-LD | A política do Google veda o incentivo e o pedido seletivo | [V] |

---

## 10. O que não fazer

- **Barrar `Googlebot`, `bingbot`, `OAI-SearchBot`, `Applebot` ou `Amzn-SearchBot` num site de exemplo:** esconderia o `noindex`.
- **Barrar robô de IA num site de cliente** sem o pedido dele, registrado.
- **Pôr no mapa do site, no `llms.txt` ou no JSON-LD** o que é `noindex` ou fictício (no exemplo, o `llms.txt` só traz o nome e o selo).
- **Marcar o que a página não mostra,** usar `ProfessionalService`, `Product` para serviço ou avaliação do próprio negócio.
- **Esperar resultado rico de perguntas frequentes** (retirado em 07.05.2026) ou tratar o `llms.txt` como alavanca.
- **Picotar o texto, encher de palavra-chave, comprar menções ou vínculos.** As políticas antispam do Google citam "widely distributed links in the footers or templates of various sites": o crédito "Site por Atlas Digital" fica em texto, só com a marca (`18-publicacao-e-manutencao.md`, seção 11).
- **Trocar a data do mapa sem mudar o conteúdo.**
- **Excluir o site do controle de IA generativa** do Search Console.
- **Pôr script de medição, cookie ou chamada de terceiro:** os relatórios do Search Console e do Bing bastam.
- **Prometer posição ou citação ao cliente:** "GEO doesn't guarantee citations" (Bing, 02.2026) [FU].

---

## 11. Como conferir: a linha da porta de publicação

"Aparece nas buscas e nas IAs" é uma linha da porta de publicação de todo site, em todo plano (`../qualidade/14-ciclo-de-qa.md`, seção 5; `../qualidade/modelos/checklist-de-publicacao.md`). `<base>` é `http://localhost:3100` no build local (`npm run estatico`, ou `PORT=3100 npm run servidor`) e `https://<domínio>` no ar, com `curl` **sem** `--compressed`, por causa da CDN da Hostinger.

| # | O quê | Como | O certo |
|---|---|---|---|
| 1 | O `robots.txt` | `curl -s <base>/robots.txt` | Cliente: só o `*` liberado e o `Sitemap:`. Exemplo: mais o grupo dos 11 com `Disallow: /` (seção 2) |
| 2 | O mapa do site | `curl -s <base>/sitemap.xml` | Cliente: as páginas, com o endereço canônico e a data da última mudança; sem `changefreq` nem `priority`. Exemplo: vazio |
| 3 | O `llms.txt` | `curl -s <base>/llms.txt \| head -20`; `curl -sI <base>/llms.txt` | Começa por `# <Nome>`, em `text/plain; charset=utf-8`. Cliente: as páginas pelo canônico, nenhuma `noindex`, e nenhum `x-robots-tag` no ar. Exemplo: só o nome e o selo, sem contato nem páginas (seção 7) |
| 4 | O `noindex` por cabeçalho | `curl -sI <base>/ \| grep -i x-robots-tag` | Cliente publicado: nada. Exemplo e rascunho: `noindex, nofollow` |
| 5 | O texto e o JSON-LD | `node ferramentas/texto-do-robo.mjs <base>` | Sai com 0: nenhuma palavra colada; JSON-LD válido, `WebSite, <subtipo>` na capa do cliente e nenhum no exemplo; "fictício" em toda página do exemplo |
| 6 | O JSON-LD no validador **[cli]** | O Teste de Pesquisa Aprimorada e o validator.schema.org, à mão | Sem erro; os dados iguais aos do rodapé |
| 7 | O IndexNow **[cli]** | `node ferramentas/avisar-indexnow.mjs --ensaio <páginas>`, depois sem `--ensaio` | `200` ou `202`, só com as páginas que mudaram |
| 8 | Search Console e Bing **[cli]** | Com o dono (seção 9) | O mapa aceito nos dois; o controle de IA generativa em incluir |

Os itens 1 a 5 rodam também antes do rascunho; os itens 6 a 8 são da publicação no domínio.

---

## Fontes

Consultadas em 16.10.2026, salvo outra data.

- **Google:** os robôs comuns (https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers, 15.10.2026) e os acionados pelo usuário (…/google-user-triggered-fetchers, 19.08.2026); as funções de IA da busca (https://developers.google.com/search/docs/appearance/ai-features, 10.12.2025); o guia de otimização para IA (https://developers.google.com/search/docs/fundamentals/ai-optimization-guide, 15.05.2026, revisto em 10.07.2026); bloquear a indexação (https://developers.google.com/search/docs/crawling-indexing/block-indexing, 10.12.2025); a especificação do `robots.txt` (https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec, 31.08.2026); o nome do site (https://developers.google.com/search/docs/appearance/site-names, 10.12.2025); as políticas dos dados estruturados (https://developers.google.com/search/docs/appearance/structured-data/sd-policies, 10.07.2026); o negócio local (…/structured-data/local-business, 08.09.2026); o conteúdo útil (https://developers.google.com/search/docs/fundamentals/creating-helpful-content, 05.10.2026); o controle de IA generativa (https://support.google.com/webmasters/answer/16908024) e o relatório (…/16984139); o Perfil da Empresa (https://support.google.com/business/answer/3038177 e /7091).
- **OpenAI:** https://developers.openai.com/api/docs/bots; https://help.openai.com/en/articles/12627856 e /10093903 [FU: trechos do resultado de busca].
- **Anthropic:** https://support.claude.com/en/articles/8896518 (07.04.2026).
- **Perplexity:** https://docs.perplexity.ai/guides/bots.
- **Apple:** https://support.apple.com/en-us/119829 (04.09.2026).
- **Microsoft Bing:** https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview (10.02.2026); as diretrizes de 02.2026, pela reportagem https://www.searchenginejournal.com/bing-adds-geo-to-official-guidelines-expands-ai-abuse-definitions/568442/ (27.02.2026) [FU].
- **Meta:** https://developers.facebook.com/docs/sharing/webmasters/web-crawlers. **Amazon:** https://developer.amazon.com/support/amazonbot. **Common Crawl:** https://commoncrawl.org/ccbot. **DuckDuckGo:** https://duckduckgo.com/duckduckgo-help-pages/results/duckassistbot.
- **IndexNow:** https://www.indexnow.org/documentation e https://www.indexnow.org/faq.
- **llms.txt:** https://llmstxt.org; SE Ranking, https://seranking.com/blog/llms-txt/ (15.10.2026).
- **schema.org:** https://schema.org/ProfessionalService; https://schema.org/UnitPriceSpecification (v30.1).
- **Estudos:** Aggarwal et al., "GEO: Generative Engine Optimization", KDD 2024 (arXiv 2311.09735); Ahrefs sobre schema e citações (pela reportagem https://www.searchenginejournal.com/schema-markup-didnt-move-ai-citations-in-ahrefs-test/574568/, 11.05.2026); Ahrefs sobre menções à marca (26.05.2025); Vercel sobre os robôs de IA e o JavaScript (17.12.2024).
- **RFC 9309**, o Robots Exclusion Protocol.
