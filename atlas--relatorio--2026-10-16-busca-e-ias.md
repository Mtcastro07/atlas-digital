# Relatório · as decisões do aprovador, o SEO e o GEO do Atlas e a busca nas IAs em todo site (16.10.2026)

Pedidos de Matheus Castro Oliveira de Luna Garcia, que aprova os sites:

1. **As respostas à revisão do Impeccable:**
   - pôr um demonstrativo no início do Atlas;
   - tirar o vidro do Agendar e do Retorno da barbearia;
   - não guardar a comanda do restaurante no aparelho;
   - corrigir a régua, que reprovava o título por diferença da odontologia.
2. "Adapte o site, aplicando SEO e GEO dentro dele para que seja possível aparecer nas IAs; se quiser, adicione o possível para que isso aconteça."
3. "Adicione a capacidade de aparecer nas pesquisas e nas IAs em todos os sites, independentemente do plano, dentro da documentação da produção. Ao terminar, crie um md relatório dessas mudanças, e faça o commit, o push e o merge na main."

Este é o relatório desse lote. O relatório anterior, de 13 a 16.10, segue em `atlas--relatorio--2026-10-14.md`.

**Como foi feito.** Cada frente teve um agente que implementou, um crítico de fora que conferiu de verdade (sem editar) e um corretor que fechou o que o crítico achou. Os documentos-base do SEO e do GEO foram três: uma pesquisa atual, com a fonte e a data de cada ponto; uma auditoria do site; e um plano de implementação. Os três ficaram no rascunho da sessão, e o essencial deles foi levado ao kit (seção 3).

---

## 1. As decisões do aprovador

| Decisão | O que mudou | Conferência |
|---|---|---|
| **Pôr o demonstrativo no início do Atlas** | Na segunda dobra, ao lado das duas frases, a primeira tela da Odontologia Boa Viagem num celular, parada. O vínculo abre o site, em nova aba. Escolhi outro nicho e um aparelho só, para não repetir o bloco da vitrine de /para-quem (documento 20 do kit). A imagem é nova e leve: `public/simulador/odontologia-inicio-{390,780}.webp`, sem iframe | O crítico de fora aprovou. Ele deixou quatro notas leves: a foto mostra a clínica "aberta" numa quinta às 15h; o molde texto e objeto aparece em 2 das 7 cenas do início, sem serem vizinhas; o aparelho fica pequeno a 768 px; e a nota de que esta decisão reverte em parte o pedido de 03.10 |
| **Tirar o vidro da barbearia** | No Agendar e no Retorno, as opções ficam direto sobre a noite, e o bilhete do pedido passou a ser a única superfície. O vidro saiu nas duas larguras | O crítico aprovou. Ficaram duas notas leves de alinhamento e de espaço |
| **Não guardar a comanda do restaurante** | Nada no código. O aviso de privacidade continua dizendo que "nenhuma informação é gravada no navegador", e a decisão foi registrada em `registros/demos/restaurante/decisoes.md` | — |
| **Corrigir a régua** | Quando o texto se mistura ao fundo (`mix-blend-mode`), a régua mede o contraste sobre os pixels desenhados, pela captura com o texto e sem ele. Se não consegue medir, dá aviso e não aprova em silêncio. A mesma mudança foi para a régua do kit, com uma autoconferência de 15 casos (`ferramentas/regua/autoconferencia.mjs`) | A inicial da odontologia, que reprovava com 7 falhas desde 13.10, passa: as palavras medem de 4,87 a 10,36:1. **Fica uma escolha sua** (seção 6) |

## 2. SEO e GEO no site do Atlas

O GEO é a otimização para os mecanismos generativos: o ChatGPT, a Perplexity, o Gemini, o Claude e as respostas de IA do Google e do Bing. Quase todos esses robôs leem o HTML que o servidor entrega, sem montar a página.

**O texto que o robô lê:**
- **As palavras coladas:** o HTML entregava "Trêsdegraus.", "Origemna UFF.", "02 / 06Planos" e o h1 "Sua empresa online em 24h24h". Agora não entrega mais nenhuma.
  - Entre as linhas dos títulos e entre o rótulo e o valor entrou um espaço que não aparece no desenho.
  - A cópia pintada da onda do "24h" saiu do HTML e vem do CSS (`::before` com `attr()`). A onda continua igual na mesa e a 390 px, também com o movimento reduzido.
- **O aviso de ficção:** /planos citava os seis estabelecimentos fictícios, e /orcamento citava o Depósito Engenhoca, sem dizer que são fictícios. Agora dizem. Antes, uma IA poderia afirmar que o Atlas fez esses sites para clientes reais.

**Os robôs e os sites fictícios:**
- **O `robots.txt`:** continua liberado para todos. Onze robôs de treino, ou de busca que não documentam respeito ao `noindex`, ficam fora de `/demos/`: GPTBot, ClaudeBot, Claude-SearchBot, CCBot, Google-Extended, Applebot-Extended, meta-externalagent, meta-webindexer, Amazonbot, PerplexityBot e DuckAssistBot.
- **Os robôs que continuam livres:** o Googlebot, o bingbot, o OAI-SearchBot e o Applebot precisam ler a página para ver o `noindex`. O Google documenta que bloquear pelo `robots.txt` esconde o `noindex`, e a URL pode aparecer mesmo assim.
- **O cabeçalho `X-Robots-Tag`:** `noindex, nofollow` em `/demos/*` e `noindex` nas capturas (`/simulador/*` e `/telas/*`). Nenhum em páginas reais, no sitemap ou no `llms.txt`.

**Os dados estruturados**, saídos do mesmo conteúdo que a página mostra:
- **na capa:** o `WebSite`, que dá o nome do site exibido na busca, e o `LocalBusiness`, com `@id`, logotipo, imagem, telefone, e-mail, área (Niterói), faixa de preço (R$ 900 a R$ 2.400) e a frase de definição;
- **em /o-atlas:** os três sócios como fundadores, só nesta página, que é a que mostra os nomes;
- **em /duvidas:** o `FAQPage`, que já existia, com 10 perguntas.
- **O que ficou de fora, de propósito:** `ProfessionalService`, que está obsoleto; `Offer` e `knowsAbout`, que não têm ganho medido e afirmariam o que a página não diz; e `BreadcrumbList`.

**O mapa e os títulos:**
- **O sitemap:** as 7 páginas, com a data verdadeira (16.10), sem `priority` nem `changefreq`, que o Google ignora. As demos ficam fora.
- **Os títulos novos dizem o que se vende e onde**, por exemplo "Planos e preços de sites em Niterói · Atlas Digital" e "Orçamento de site com valor na hora · Atlas Digital".
- **A frase de definição** foi para o rodapé de todas as páginas e para o `LocalBusiness`, só com fatos que o site já mostra: "Atlas Digital: sites para pequenos negócios de Niterói (RJ), feitos por três estudantes de Ciência da Computação da UFF…".

**O `llms.txt`** fica em `agenciaatlasdigital.com/llms.txt`. É gerado do conteúdo e traz:
- o resumo e o contato;
- os três planos e os módulos, com os preços iguais aos de /planos;
- o processo e os sócios;
- o aviso de que os sites de exemplo são fictícios;
- as 7 páginas.

Ele é uma aposta de custo baixo: o Google declara que não o usa, e não há correlação medida.

**O IndexNow:** avisa o Bing, e por ele o Copilot e os parceiros, a cada publicação. A chave está em `public/dc198b8d6b2e738cfb9b94abfcf664b7.txt`, e o script, em `ferramentas/avisar-indexnow.mjs` (`--ensaio` para conferir). **Ainda não enviei nada:** é uma ação externa, a fazer depois que a Hostinger publicar.

**Nada de rastreador, cookie ou script de terceiros.** A política de 0 cookies continua.

## 3. O kit: aparecer nas buscas e nas IAs em todo site, de qualquer plano

**O documento novo:** `producao/esteira/21-busca-e-ias.md` (DECIDIDO em 16.10.2026, com a sua fala). Ele traz:
- o que cada robô faz e como tratá-lo, com as fontes;
- o `robots.txt` por tipo de site: o de cliente libera tudo, inclusive os robôs de IA, porque o cliente quer ser citado; o fictício fecha os 11 robôs;
- o sitemap com a data verdadeira;
- o título que diz o que se vende e onde;
- o JSON-LD saído do conteúdo visível, e o que não se marca;
- o texto que o robô lê;
- o `llms.txt`, com a evidência sem exagero;
- o IndexNow depois de cada publicação;
- a conferência da porta de publicação;
- o que depende do dono.

**A regra de todo plano:**
- `esteira/03-planos.md` (regra 5): aparecer nas buscas e nas IAs é da base, no Essencial, no Profissional e no Completo, e não é diferencial.
- A tabela de funcionalidades marca a regra como "[todos]".

**A esteira ajustada:**
- `14-funcionalidades/01-base-de-todo-site.md` (seções 10 a 13 e a nova seção 19, "O texto que o robô lê");
- o README das funcionalidades;
- `13-tecnologia-e-estrutura.md`;
- `18-publicacao-e-manutencao.md` (itens 16 a 20 da publicação e a nova seção 5.1, "A busca e as respostas de IA na primeira publicação");
- `10-texto-e-conteudo.md`;
- os README;
- `99-rastreabilidade.md`.

**A qualidade:**
- a linha "aparece nas buscas e nas IAs" na lista de publicação (`qualidade/14-ciclo-de-qa.md`);
- o checklist de publicação.

**A base de código**, que todo site novo copia:
- `app/robots.ts`, por tipo de site;
- o sitemap sem `priority`;
- o `WebSite` no grafo do JSON-LD;
- a correção do endereço colado;
- a rota do `llms.txt`: no site fictício, só o nome e o selo de ficção;
- o `ferramentas/avisar-indexnow.mjs`;
- `ferramentas/texto-do-robo.mjs`, a conferência do texto que o robô lê;
- os títulos de fábrica que dizem o que se vende e onde.

A base passa nos testes (11 de 11), no `tsc` e no build.

**Atenção:** `producao/` não é versionado nesta cópia (`.gitignore`). O kit precisa ir ao repositório principal (`/Volumes/Matheus/Projetos/atlas-digital`), com o registro em `documentacao/atlas--decisoes.md`.

## 4. A verificação

- **O build de produção:** sem erro, servido na porta 3300.
- **As conferências por `curl`, em produção:**
  - o `robots.txt`, o `sitemap.xml` e o `llms.txt` como descritos acima;
  - o `X-Robots-Tag` só nas demos e nas capturas;
  - os sete títulos novos.
- **Os dados estruturados:** JSON válido e coerente com o texto visível, com os `@id` ligados entre a capa e /o-atlas.
- **O texto do robô** (`producao/base/ferramentas/texto-do-robo.mjs`): 0 palavras coladas nas 7 páginas do Atlas.
- **Os testes:** odontologia, 15 de 15; restaurante, 10 de 10; pet shop, 13 de 13; barbearia, 6 de 6.
- **O `tsc`:** sem erro.
- **A régua nas 50 páginas:** **APROVA, com 0 falha em 50 páginas, pela primeira vez** (759 s). As 7 falhas da odontologia saíram com a régua que mede a cor desenhada. São 89 avisos, nenhum reprova. A barreira do travamento fica dentro do teto: maior tarefa de 270 ms, bloqueio de 299 ms, 0% de quadros lentos e LCP de 3,9 s.

## 5. O que depende de você (fora do código)

1. **O Google Search Console:**
   - verificar o domínio pelo DNS da Hostinger e enviar o `sitemap.xml`;
   - deixar a IA generativa em "incluir";
   - inspecionar `/demos/nutricao`, onde o esperado é "excluída pela tag noindex".
2. **O Bing Webmaster Tools:** importar do Search Console. Depois de publicar, rodar `node ferramentas/avisar-indexnow.mjs` (primeiro com `--ensaio`) e acompanhar o relatório de IA.
3. **O Perfil da Empresa no Google:** como negócio que atende na área do cliente, com o endereço oculto e a área em Niterói. Nome exato "Atlas Digital", o telefone do WhatsApp e o site.
4. **As redes** (Instagram, LinkedIn, WhatsApp Business), com o mesmo nome, telefone e site. Quando existirem, os endereços entram no `sameAs` do JSON-LD.
5. **As menções autênticas:** a UFF, os clientes e a imprensa local, sem compra de vínculos.

## 6. Pendências e decisões abertas

- **A régua, o percentil.** O veredito sobre os pixels usa o 10º percentil, e as palavras da odontologia passam. Com o 5º, mais rígido, o "a" do título reprova a 390 px (2,60:1). A escolha é sua, e está registrada no `02-regua.md` do kit e no registro da odontologia.
- **A formação na UFF.** Ela já aparecia em /o-atlas e agora está também no rodapé, no JSON-LD e no `llms.txt`. O próprio conteúdo a marca como "deve ser conferida pelos três". Se não se confirmar, sai de tudo.
- **O nome público do Gabriel:** "Gabriel Yida" na página e "Gabriel Ribeiro Ota Yida" no arquivo da foto. O JSON-LD segue o da página.
- **Os subdomínios:** um comentário do código diz que as demos podem viver em subdomínios. Se alguma for servida assim, aquele endereço precisa do próprio `robots.txt` e do `noindex`.
- **O kit vai ao repositório principal** (seção 3).
