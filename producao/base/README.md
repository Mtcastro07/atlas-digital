# A base de todo site

O projeto Next.js de onde nasce cada site do Atlas: a camada que todo site tem, em qualquer plano e nicho (`producao/esteira/14-funcionalidades/01-base-de-todo-site.md`), já escrita, compilada e aprovada pela régua. Vem preenchida com um **site de exemplo**: um banho e tosa fictício no bairro do Fonseca, no plano Essencial (`producao/esteira/nichos/pet-shop.md`). Por isso, sai com selo de ficção, `noindex` e o número fictício.

> **Como se usa.** Não se copia à mão: `node producao/ferramentas/novo-site.mjs <ordem.json>` monta o repositório do cliente a partir desta pasta (`producao/02-ordem-de-producao.md`). Depois, cada arquivo marcado abaixo como **do cliente** é reescrito na sessão de produção (`producao/01-roteiro-da-sessao.md`).
>
> **Estado.** Verificada em 08.10.2026, no modo estático. Build sem erro, 9 testes de unidade e régua **APROVA** nas 5 páginas, com 0 falha e 2 avisos esperados (as páginas legais não têm ação na primeira tela, de propósito). O acréscimo de 16.10.2026 (a busca e as IAs, seção "A busca e as IAs, em todo plano") foi conferido sem build: o build e a régua ficam para a próxima compilação da base.
>
> | Medida | Valor | Teto |
> |---|---|---|
> | Script inicial | 116,1 KB | 180 |
> | Fontes | 67,2 KB | 200 |
> | Carga total | ~207 KB | 1.500 |
> | CLS | 0 | 0,05 |
>
> A primeira ação aparece a 51% da tela do celular no início e a 46% em Serviços.

## O que já vem pronto

| Peça | Onde | Regra de origem |
|---|---|---|
| A ação do WhatsApp com a mensagem pronta, "abre em nova aba" para leitor de tela | `components/acao-whatsapp.tsx`, `lib/whatsapp.ts` | `producao/esteira/14-funcionalidades/01-base-de-todo-site.md`, seção 1 |
| O mapa do bairro em vetor, do OpenStreetMap, com os tokens e o crédito (no exemplo, o do Fonseca) | `components/mapa-do-bairro.tsx`, gerado por `ferramentas/gerar-mapa.mjs` | Seção 3 |
| O número que para o build se estiver fora do formato `55DDDNNNNNNNN` | `lib/whatsapp.ts` | Idem |
| Telefone, endereço em linhas, "Ver no mapa" sem pedido externo | `components/endereco.tsx`, `components/vinculo-do-mapa.tsx` | Seções 2 e 3 |
| O horário dia a dia (`<dl>`) e o resumo de uma linha, gerados do expediente | `components/horario.tsx`, `lib/horario.ts` | Seção 4 |
| Os dados do negócio numa fonte só | `conteudo/negocio.ts`, `conteudo/contato.ts` | Seção 6 |
| O rodapé de conformidade: razão social e CNPJ (ou o selo de ficção), o registro do conselho, o aviso de privacidade, o símbolo e a declaração de acessibilidade, o crédito | `components/rodape.tsx` | `producao/esteira/17-conformidade-e-normas.md`, seções 3 e 4 |
| Metadados distintos por página, o canônico (com a barra final no estático) e o cartão de compartilhamento | `lib/metadados.ts`, `public/compartilhar.jpg` | Seção 10 |
| O site e o negócio local (JSON-LD `WebSite` + `LocalBusiness`, num grafo com `@id`), só no site de cliente | `lib/dados-estruturados.ts` | Seção 11 |
| `robots.txt` por tipo de site (o cliente libera tudo, inclusive os robôs de IA; o exemplo fecha os 11 robôs de IA) e o mapa do site com o endereço canônico e a data verdadeira; `noindex` no exemplo, na página e no cabeçalho | `app/robots.ts`, `app/sitemap.ts`, `app/layout.tsx`, `ferramentas/gerar-htaccess.mjs` | Seções 12 e 13; `producao/esteira/21-busca-e-ias.md`, seções 2 e 3 |
| O `/llms.txt`, gerado do conteúdo (o nome, o que faz, o contato e as páginas; no exemplo, só o nome e o selo), sem `X-Robots-Tag` próprio | `app/llms.txt/route.ts`, `lib/llms.ts` | `producao/esteira/21-busca-e-ias.md`, seção 7 |
| O texto que o robô lê: o espaço entre as linhas e entre o rótulo e o valor, e a conferência pelo HTML | `components/endereco.tsx` e os `{" "}` das páginas; `ferramentas/texto-do-robo.mjs` | Seção 19 |
| O aviso ao IndexNow depois de publicar, só do que mudou (nunca no exemplo) | `ferramentas/avisar-indexnow.mjs` | `producao/esteira/21-busca-e-ias.md`, seção 8 |
| A 404 e as telas de erro em português, com `retry` | `app/not-found.tsx`, `app/error.tsx`, `app/global-error.tsx` | Seção 14 |
| A âncora decodificada sem derrubar a página | `lib/ancoras.ts` | Seção 16 |
| O menu do celular: `<dialog>` nativo, com o índice do rodapé como reserva sem script | `components/ilhas/menu-celular.tsx`, `components/ilhas/navegacao.tsx` | Seção 17 |
| "Ir para o conteúdo", o foco sempre visível e os alvos de 44 px | `app/layout.tsx`, `app/globals.css` | `producao/esteira/16-acessibilidade.md` |
| A troca de página com `<ViewTransition>` e o cabeçalho parado | `app/template.tsx`, `components/transicao-de-pagina.tsx` | `producao/esteira/09-movimento.md`, seção 8 |
| A camada de movimento do Essencial: revelação única ao entrar na tela e o marca-texto (fora do título), nada com movimento reduzido | `app/globals.css`, `components/ilhas/revelacao.tsx` | `producao/esteira/09-movimento.md`, seção 4 |
| As fontes hospedadas, com a licença ao lado | `app/fontes.ts`, `app/fontes/` | `producao/esteira/05-tipografia.md`, seção 4 |
| Os cabeçalhos de segurança: no `next.config.ts` (servidor) e no `.htaccess` gerado (estático) | `next.config.ts`, `ferramentas/htaccess.modelo` | `producao/esteira/13-tecnologia-e-estrutura.md`, seção 5; `producao/esteira/18-publicacao-e-manutencao.md`, seção 3.2 |
| O aviso de privacidade e a declaração de acessibilidade, com os blocos [SEMPRE] dos modelos | `conteudo/legal.ts`, `components/texto-legal.tsx` | `producao/esteira/modelos/` |
| Os ícones: o `icon.svg` com modo escuro, o `apple-icon.png` de 180 px e o `favicon.ico` | `app/`, `ferramentas/gerar-icones.mjs` | `producao/esteira/13-tecnologia-e-estrutura.md`, seção 6, regra 6 |
| O recuo lateral que respeita a área segura do celular com recorte (`viewportFit: "cover"`) | O utilitário `envelope`, em `app/globals.css` | `producao/esteira/13-tecnologia-e-estrutura.md`, seção 6, regra 4 |
| O rodapé do profissional pessoa física: o nome completo e o registro, sem CPF | `conteudo/negocio.ts` (`nomeCompleto`), `components/rodape.tsx` | `producao/esteira/17-conformidade-e-normas.md`, seção 3.1 |

## Comandos

```bash
npm install                         # PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 antes: a régua usa o Chrome instalado
npm run dev                         # desenvolvimento, http://localhost:3000 (nunca se mede aqui)
npm run build                       # compila; no estático, grava out/ e out/.htaccess (postbuild)
npm run estatico                    # serve out/ como a hospedagem: comprimido e com os cabeçalhos do .htaccess (porta 3100)
SAIDA=servidor npm run build && PORT=3100 npm run servidor   # o modo servidor (formulário, Agenda): o server.js do standalone
npm run regua -- --base=http://localhost:3100           # a régua portada (ferramentas/regua/)
npm test                            # testes de unidade (node:test, sem dependência)
npm run paleta                      # o contraste dos pares de cor da identidade, antes de construir
npm run pronto                      # a conferência de conteúdo antes de publicar (site de cliente)
npm run pronto -- --exemplo         # a mesma, para site de exemplo
node ferramentas/texto-do-robo.mjs [http://localhost:3100]        # o texto que o robô lê: títulos, palavras coladas, JSON-LD
node ferramentas/avisar-indexnow.mjs --chave-nova                 # a chave do IndexNow, uma vez por site de cliente
node ferramentas/avisar-indexnow.mjs --ensaio / /servicos/        # depois de publicar: confere e mostra o aviso; sem --ensaio, envia
node ferramentas/baixar-fonte.mjs "Família:wght@400..700" titulo   # fonte do Google Fonts, com a licença
node ferramentas/preparar-fotos.mjs <foto> <nome> --proporcao=3:2  # foto → WebP em várias larguras, sem metadados
node ferramentas/capturar-compartilhamento.mjs                     # o cartão de 1200 × 630 da primeira tela
node ferramentas/gerar-icones.mjs                                  # apple-icon.png e favicon.ico, do icon.svg
node ferramentas/fotografar.mjs                                    # as páginas a 390 e 1440 px, em material/capturas/
node ferramentas/gerar-mapa.mjs [--lat=… --lon=…] [--sem-mapa]       # o mapa do bairro, do OpenStreetMap (rede)
```

O Chrome não abre no sandbox do Claude Code: a régua, as capturas, as fotos e o `npm install` rodam com o sandbox desligado.

## Do cliente (reescrever) e da base (não mexer sem decisão)

| Do cliente: reescrever a cada site | Da base: mudar só com decisão registrada |
|---|---|
| `conteudo/` inteiro (negócio, contato, páginas, textos, legal) | `lib/` (as funções testadas) |
| `app/identidade.css` (os tokens da marca) | `app/globals.css` (o comum a todo site) |
| `app/fontes.ts` e `app/fontes/` | `app/layout.tsx` (salvo o `themeColor`, que é a cor de fundo do cliente), `template.tsx`, `error.tsx`, `global-error.tsx`, `not-found.tsx`, `robots.ts`, `sitemap.ts` |
| `app/icon.svg` (e os derivados, pelo `gerar-icones`), `components/mapa-do-bairro.tsx` (pelo `gerar-mapa`) e `public/` (fotos, cartão) | `components/ilhas/`, `components/rodape.tsx` (a ordem dos blocos de conformidade) |
| As páginas (`app/page.tsx` e as pastas), conforme o nicho e o plano | `next.config.ts` (só o padrão do modo de saída muda com o plano) |
| `components/` novos da marca (a peça, o gesto) | `ferramentas/` (a régua é portada, nunca editada) |

O `npm run pronto` acusa o que ficou da fábrica:
- `exemplo: true`;
- o número fictício;
- o domínio de exemplo;
- o cartão e o ícone de fábrica;
- marcadores de pendência;
- campos bloqueantes do briefing em branco.

## `public/` (sem README: tudo nela é publicado)

O que o site serve pelo endereço, sem hash no nome. **Tudo é do cliente.**
- `compartilhar.jpg`: o cartão de 1200 × 630 (o `og:image`), fotografado por `ferramentas/capturar-compartilhamento.mjs`. O de fábrica é o do exemplo.
- `fotos/`: as fotos preparadas por `ferramentas/preparar-fotos.mjs` (`<nome>-<largura>.webp`, sem metadados).

**Nunca em `public/`:**
- foto crua;
- `.js`, `.css` e `.woff2`: ficariam sem cache longo;
- documento (`.md`, `.txt` de notas): seria publicado.

O `npm run pronto` acusa os três.

## Avisos esperados da régua

- **Composição, nas páginas legais:** "no celular, nenhuma ação até 60% da primeira tela". Aviso, não falha: o aviso de privacidade e a declaração de acessibilidade são texto corrido, sem ação no alto.

## A busca e as IAs, em todo plano (16.10.2026)

A pedido do usuário ("adicione a capacidade de aparecer nas pesquisas e nas IAs em todos os sites, independentemente do plano"), a base leva o mecanismo inteiro, para qualquer plano (`producao/esteira/21-busca-e-ias.md`): o `robots.txt` por tipo de site, o mapa do site com o endereço canônico (a barra no fim, no estático; antes, o mapa listava `/servicos`, que redireciona) e a data verdadeira, o grafo `WebSite` + negócio, o espaço entre as linhas e os rótulos (o endereço saía "…, 000Fonseca, Niterói – RJCEP …" para quem lê o HTML), o `/llms.txt` (no exemplo, só o nome e o selo de ficção), o `noindex` por cabeçalho no exemplo e as ferramentas `texto-do-robo` e `avisar-indexnow`. O `conferir-pronto` deixou de tomar a rota estática (`force-static`) por rota de servidor. Conferido em 16.10.2026: `npm test` (11 testes), `tsc` sem erro, as saídas do `robots`, do mapa, do `llms.txt` e do JSON-LD no Node, nos dois tipos de site, e o `avisar-indexnow` contra um servidor local, sem envio. **Falta:** o `npm run build`, a régua e o `texto-do-robo` contra o `out/` (não rodados nesta sessão).

## Decisões desta base (08.10.2026)

| Decisão | Por quê |
|---|---|
| Sem shadcn/ui, Base UI, Motion, `cn` ou lucide | O Essencial não precisa de nenhum. Cada um custa script inicial (`producao/esteira/13-tecnologia-e-estrutura.md`, seção 1). Entram quando o plano pede, pela receita de `producao/03-da-identidade-ao-codigo.md` |
| Saída estática por padrão; servidor quando há formulário ou Agenda | O site sem servidor é mais barato e não cai (`producao/esteira/18-publicacao-e-manutencao.md`, seção 1) |
| Testes no `node:test` com a remoção de tipos do Node | O Vitest de `producao/qualidade/04-unidade.md` ainda não foi autorizado. Os módulos de `lib/` importam valores por caminho relativo |
| `npm run estatico` com um servidor próprio (`ferramentas/servir.mjs`) | O `python3 -m http.server` não comprime e recusa conexões em paralelo: a régua acusava 457 KB de script e `ERR_CONNECTION_RESET` (medido em 08.10.2026) |
| Os dados que as ferramentas leem (`exemplo`, `cnpj`, `dominio`...) ficam um por linha, entre aspas duplas | A régua portada e o `conferir-pronto` os leem como texto (o Node 22.17 não importa TypeScript sem opção) |
