---
description: Etapas 8 e 11 — publica o rascunho (noindex) ou o site, SÓ com pedido explícito, e confere no ar
argument-hint: "rascunho | site"
---

Etapas 8 e 11 (`producao/esteira/18-publicacao-e-manutencao.md`; `producao/01-roteiro-da-sessao.md`, etapas 8 e 11). Modo: $ARGUMENTS

**Só com pedido explícito do usuário nesta conversa.** Publicar é ação externa: confirme antes.

1. Confira a porta anterior:
   - **rascunho:** a etapa 7, sem falha;
   - **site:** as etapas 9 e 10, com a aprovação do cliente por escrito.
2. Antes do site final:
   - a reavaliação anti-IA com o texto e as fotos finais, na mesa e no celular;
   - **o aparelho real,** em todo plano: um Android intermediário e um iPhone, em pé e deitado, no endereço do rascunho, com a lista de `producao/qualidade/08-desempenho.md`, seção 8. É de pessoa: sem ele marcado na lista de publicação, o site não vai ao ar;
   - `npm run pronto` sem falha.
3. Compile no modo do `CLAUDE.md` ("Onde roda"):
   - **Estático, rascunho:** `RASCUNHO=1 npm run build`. Grava o `noindex` no `.htaccess`, além do `noindex` da página, se for exemplo.
   - **Estático, site:** `npm run build`. Envie o conteúdo de `out/`, com o `.htaccess` (arquivo oculto), pela seção 3.3.
   - **Servidor:** o web app Node.js, pela seção 2, com as variáveis de ambiente. No rascunho, `SITE_HOMOLOGACAO=1`, que manda o `X-Robots-Tag` (`next.config.ts`); na virada do domínio, tire-a e ligue `SITE_NO_DOMINIO=1`.
4. Confira no endereço publicado (seção 5):
   - os cabeçalhos (`curl -sI`) e a compressão;
   - o `www` e o HTTP redirecionando;
   - a 404 da marca;
   - o cartão do WhatsApp;
   - a régua contra o endereço real (`npm run regua -- --base=https://<endereço>`);
   - a busca e as IAs, em todo plano (seção 5, itens 16 a 20; `producao/esteira/21-busca-e-ias.md`, seção 11): o `robots.txt`, o `sitemap.xml` e o `llms.txt` por `curl`, e `node ferramentas/texto-do-robo.mjs https://<endereço>` saindo com 0. No site de cliente, a chave do IndexNow vai no build da primeira publicação (`--chave-nova`), e o aviso sai depois da conferência; o Search Console, o Bing e o Perfil, com o dono (seção 5.1).
5. Registre no "Estado" e no relatório de publicação:
   - o endereço;
   - o commit publicado;
   - as medidas.
