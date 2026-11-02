# 18 · Publicação e manutenção

> **Para que serve.** Dizer onde cada site roda, como se publica (no web app Node.js da Hostinger e como site estático), o que se confere depois de publicar, como o ramo `producao` e a homologação protegem o site no ar, e como se faz a manutenção mensal. Cobre também as atualizações em ondas, as cópias de segurança, o fim do contrato e o crédito.
>
> **Quando ler.** Antes do rascunho de 24 horas (que já é publicado num endereço de homologação), na publicação (etapa 11 de `01-processo.md`), a cada mês de manutenção e antes de qualquer atualização de segurança em vários sites.
>
> **Depende de.**
> - `01-processo.md` (etapas 8, 11, 12 e 13) e `03-planos.md` (o que cada plano inclui no acompanhamento);
> - `13-tecnologia-e-estrutura.md` (o `next.config.ts`, o `postbuild`, o export estático) e `15-desempenho.md` (a medição no endereço publicado);
> - `17-conformidade-e-normas.md` (a porta de publicação, o domínio e a titularidade);
> - a verificação: `../qualidade/09-seguranca-e-privacidade.md`, `../qualidade/13-integracao-continua.md` e `../qualidade/14-ciclo-de-qa.md`.
>
> **Estado.**
> - **Modo de publicação do site do Atlas:** o web app Node.js da Hostinger, a recomendação de 03.10.2026. O site está no ar nesse modo (informado pelo usuário e conferido em 08.10.2026: `x-nextjs-cache`, `platform: hostinger`); a versão publicada é a do ramo `main`.
> - **Divisão entre estático e Node por plano:** RATIFICADO (de 07.10.2026).
> - **Publicação estática de um site em Next.js:** RATIFICADO, **nunca executada**.
> - **Mensalidade:** o que ela compreende é DECIDIDO (ata v3.0, IV.2.1, item 5).
> - **Prazos de resposta, janela mensal e ondas:** RATIFICADO.
> - **A busca e as respostas de IA na publicação** (seção 5, itens 16 a 20; seção 5.1): DECIDIDO em 16.10.2026, para todo site, em todo plano (`21-busca-e-ias.md`).
>
> **Atualizado em:** 16.10.2026. Antes, 08.10.2026.

---

## 1. Onde cada site roda

**Regra (RATIFICADO (de 07.10.2026)):** o site roda no modo mais simples que atende ao que ele faz.

| Situação | Onde roda | Por quê |
|---|---|---|
| Sem formulário nem Agenda: em geral o **[E]** | **Site estático** na hospedagem comum da Hostinger (`output: "export"`), seção 3 | Não ocupa vaga de web app; não dorme; não tem servidor para atualizar nem para atacar |
| Com formulário (**[P][C]**) ou com o módulo Agenda | **Web app Node.js** da Hostinger, com o MySQL do plano, seção 2 | Precisa de servidor para receber, validar, guardar e enviar |
| O site do Atlas, com os três sites de exemplo dentro dele (`/demos/...`) | Web app Node.js (a recomendação de 03.10; no ar, conferido em 08.10.2026) | É o modo em que o site foi medido e verificado; os cabeçalhos e redirecionamentos do `next.config.ts` valem sem `.htaccess` |

**Desempate.** Entre duas formas de fazer uma funcionalidade, fica a que funciona sem servidor (a que compõe a mensagem no aparelho e envia pelo WhatsApp), porque cabe num site estático (`14-funcionalidades/README.md`).

**O site do Atlas em versão estática (RATIFICADO).** O site do Atlas segue a recomendação do web app Node.js, e mesmo assim vale medir uma versão estática dele (`output: "export"`, seção 3), por causa da cota de web apps e da partida a frio do app Node (relatório do `shadcn create`, 07.10.2026). A medição nunca foi feita, e o resultado entra na decisão do modo de publicação, que segue PENDENTE.

**A cota de web apps (A CONFIRMAR no hPanel).**
- **O número:** o plano Business comporta poucos web apps Node.js. Fontes de terceiros dizem 5; a documentação oficial só diz "um número definido". O site do Atlas ocupa um.
- **O nível equivalente vendido hoje** oferece 150 bancos MySQL de 3 GB, 3 GB de RAM e backup diário (página de preços da Hostinger, consultada em 07.10.2026) [FU]. Supõe-se que o Business tenha virado o "Unlimited" no catálogo atual, sem confirmação [NV]: A CONFIRMAR no hPanel.
- **Antes do quinto site com servidor,** escolher entre:
  - subir para o Cloud Startup, com 10 web apps [FU];
  - um **único web app de serviços**, que recebe os formulários e as Agendas de vários clientes, com os sites deles estáticos.
- **Também A CONFIRMAR:** quantos sites o plano comporta no total, e se um domínio estacionado serve um web app.

**O plano da Hostinger** é o Business, contratado pelo Atlas. Ele expira em **05.01.2027**, com lembrete de renovação em **20.12.2026** (contexto de produto do repositório do Atlas, seção 6).

---

## 2. A publicação no web app Node.js

### 2.1 · Como a Hostinger roda o Next

- **Compilação:** a Hostinger roda o Next.js só em modo servidor e aplica `output: "standalone"` antes de compilar. O export estático "não tem efeito" lá (documentação da Hostinger, consultada em 03.10.2026) [V]. Para isso, ela troca o `next.config.ts` por um invólucro e guarda o original em `<hash>.next.config.ts`: código que lê esse arquivo no build não acha o que espera (o R10 do Atlas falhou assim, em 02.11.2026). Antes de publicar, simule: renomeie o original, ponha o invólucro com `output: "standalone"` e compile.
- **O `postbuild`:** copia `public/` e `.next/static` para dentro do pacote standalone. Sem ele, o logotipo, as imagens e o cartão de compartilhamento dão 404 (`13-tecnologia-e-estrutura.md`, seção 5.1).
- **Versão do Node:** de 18 a 24 disponíveis; o Atlas usa a 22 (LTS).

**O que se sabe do comportamento** [FU: documentação da Hostinger, consultada entre 03 e 08.10.2026; nada disso foi exercitado num site do Atlas]:

| Comportamento | O que implica |
|---|---|
| O app roda **sob demanda**: o processo para sem tráfego e acorda no pedido seguinte | Partida a frio no primeiro visitante depois de uma pausa (medir: seção 5). Fila, limite de envios e lembrete não podem morar só na memória |
| **Uma implantação por vez** por site; os envios seguintes entram em fila | Dois envios seguidos publicam em ordem; não há corrida |
| **Uma conta do GitHub** conectada | Os repositórios dos clientes ficam na mesma conta do repositório do Atlas (hoje a pessoal, `gabriel-yida`), que a Hostinger enxerga |
| A integração lê o **repositório inteiro** | Nenhum segredo no repositório (seção 2.3). No repositório do Atlas, que tem `juridico/` e `comercial/`, a alternativa é enviar um arquivo compactado só com `web/`, sem implantação automática |
| Um app por subpasta, num monorepo | Cada cliente é um app com o próprio diretório raiz (`13-tecnologia-e-estrutura.md`, seção 8) |
| A etapa de compilação tem **limite de 15 min** | Compilação que passa disso falha. O site do Atlas compila em bem menos |
| Os **registros de execução zeram a cada implantação** (até 5.000 linhas, baixáveis em `.txt`) | Baixe o registro **antes** de reimplantar quando estiver investigando um erro |
| As pastas do app (`hbuilds/`, `public_html`) são **reescritas** a cada implantação | Nada se edita à mão no servidor: tudo passa pelo repositório |
| Voltar a uma versão anterior **não está documentado** | Volta-se pelo git (seção 6.3) |
| O MySQL do plano atende em `127.0.0.1` | A conexão nunca sai do servidor |
| As **tarefas agendadas** (cron) ficam no hPanel, em UTC, como comando próprio | A Agenda chama um endereço protegido a cada 15 min; a chamada também acorda o app (`14-funcionalidades/05-agenda.md`). A CONFIRMAR se aparecem para web apps Node |
| As **variáveis de ambiente** valem na compilação e na execução | Mudou uma variável: reimplante |

### 2.2 · Passo a passo

**Antes de começar:**
- régua aprovada contra o build de produção local;
- `npm audit --omit=dev` limpo;
- o rascunho aprovado pelo cliente por escrito (etapa 9 de `01-processo.md`).

**A ordem da ata vale para o site do Atlas:** contadora, depois a LTDA, depois o site.

| # | Passo | Como | Por quê |
|---|---|---|---|
| 1 | O repositório | Privado, na conta do GitHub em que está o repositório do Atlas (hoje a pessoal, `gabriel-yida`; uma organização do Atlas é A CONFIRMAR). O ramo **`producao`** aponta para o commit aprovado (seção 6.1) | A Hostinger publica `producao`, nunca a `main`: só vai ao ar o que passou |
| 2 | Criar o web app | No hPanel, um web app Node.js a partir do repositório do GitHub (os nomes exatos dos menus: A CONFIRMAR no painel) | — |
| 3 | Origem | Repositório do cliente, ramo `producao`, **diretório raiz**: `.` num repositório de um site só; `web` no repositório do Atlas; `apps/clientes/<cliente>` no monorepo proposto | Só o diretório raiz é compilado |
| 4 | Compilação | Framework Next.js; script `build`; diretório de saída `.next`; Node 22 | É a configuração recomendada para o Atlas em 03.10 (especificação do site, seção 9) |
| 5 | Variáveis | `SITE_HOMOLOGACAO=1` enquanto for rascunho; `SITE_NO_DOMINIO` vazia; os segredos do formulário e da Agenda (seção 2.3) | O rascunho fica fora da busca (seção 6.2); o endereço temporário serve para conferir |
| 6 | Implantar | Acompanhe o registro da compilação até o fim | Erro de tipo derruba a compilação, como deve |
| 7 | Conferir no endereço temporário (`*.hostingersite.com`) | A conferência da seção 5, menos o domínio. Com formulário, um envio real de ponta a ponta | É aqui que o rascunho de 24 horas é entregue ao cliente (etapa 8 de `01-processo.md`) |
| 8 | A porta de publicação | Todos os itens de `17-conformidade-e-normas.md`, seção 9 | Nenhum site de cliente vai ao domínio sem ela |
| 9 | O domínio | Apontar o domínio para o web app (seção 4) e esperar o certificado | — |
| 10 | A virada | Tirar `SITE_HOMOLOGACAO`; ligar `SITE_NO_DOMINIO=1`; ligar o "forçar HTTPS" do painel, se existir para o app (A CONFIRMAR); reimplantar | Só então o endereço temporário converge para o domínio, e o `www` sempre converge |
| 11 | Conferir no domínio | A conferência inteira da seção 5 | O cabeçalho é configurado no Next, mas quem responde é o servidor da Hostinger |
| 12 | Registrar | Em `decisoes.md`: data, commit, endereço, modo e os **nomes** das variáveis (nunca os valores) | A próxima pessoa sabe o que está no ar |

**O trecho do `next.config.ts` para a homologação** (RATIFICADO; o resto do arquivo está em `13-tecnologia-e-estrutura.md`, seção 5):
```ts
// Rascunho e homologação: fora da busca enquanto não forem o site publicado.
// Ligue SITE_HOMOLOGACAO=1 nas variáveis do web app; desligue na virada do domínio.
const homologacao = process.env.SITE_HOMOLOGACAO === "1";

const seguranca = [
  // ...os cabeçalhos de segurança de 13-tecnologia-e-estrutura.md, seção 5...
  ...(homologacao ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
];
```
O `noindex` vai por cabeçalho, e não por um `Disallow` no `robots.txt`: o robô que não pode ler a página também não lê o `noindex` dela.

### 2.3 · Segredos

**Regra:**
- os segredos ficam **só** nas variáveis de ambiente do web app e num `.env.local` fora do git: a senha do SMTP, a conexão do banco, a chave do carimbo do formulário, o segredo da tarefa agendada;
- nada com o prefixo `NEXT_PUBLIC_`, que vai para o script do visitante;
- a lista das variáveis está em `14-funcionalidades/02-formulario.md`, seção 4.

**Objetivo:** a Hostinger lê o repositório inteiro, e o repositório é compartilhado. Um segredo no histórico do git continua lá mesmo depois de apagado.

**Como conferir:** `../qualidade/09-seguranca-e-privacidade.md`, seção 6. Depois de cada reimplantação, confira que as variáveis continuam lá: uma variável faltando aparece como formulário que nunca envia.

---

## 3. A publicação estática (RATIFICADO)

Para o site sem servidor (seção 1). **Nunca foi executada com um site em Next.js:** os sites estáticos que o Atlas já publicou eram HTML de arquivo único. Tudo o que está marcado [NV] se confere pela seção 5 na primeira vez.

### 3.1 · A configuração

```ts
// next.config.ts — site estático (sem formulário nem Agenda).
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A compilação grava o site pronto em out/: um HTML por página, mais os arquivos de _next/static.
  output: "export",
  // /servicos vira out/servicos/index.html: o servidor comum serve a pasta sem regra de reescrita.
  // O pedido sem a barra (/servicos) costuma ser redirecionado pelo próprio servidor para /servicos/
  // [NV: conferir no ar, seção 5].
  trailingSlash: true,
  // O export não otimiza imagem sob demanda: sem isto, um <Image> do next/image para o build.
  // As imagens já saem preparadas em WebP/AVIF (08-imagem-e-fotografia.md).
  images: { unoptimized: true },
  // Sem headers() nem redirects(): o export não os aplica (documentação do Next) [V].
  // Eles vão no .htaccess, gerado no postbuild (seção 3.2).
};

export default nextConfig;
```

**O que o export não tem** (documentação do Next, guia de export estático) [V]:
- cabeçalhos, redirecionamentos e reescritas;
- o `proxy`;
- cookies;
- Server Actions;
- a regeneração incremental;
- a otimização de imagem padrão;
- rotas dinâmicas sem `generateStaticParams`.

Nada disso faz falta a um site sem formulário, com as imagens já preparadas (`15-desempenho.md`, seção 5.9). Por isso a configuração leva `images: { unoptimized: true }`: a otimização com o carregador padrão está entre as funções que o export não tem ("Image Optimization with the default `loader`", `02-guides/static-exports.md`), e um `<Image>` do `next/image` sem ela para o build. Ligada no `next.config.ts`, ela vale para todas as imagens, e não só para as que se lembrarem do `unoptimized`.

**Com `trailingSlash: true`, os endereços terminam em barra** (`/servicos/`) [V]:
- o canônico de cada página, o mapa do site e os vínculos escritos em `conteudo/` usam a barra no fim;
- confira no ar que o canônico é igual ao endereço servido [NV].

### 3.2 · O `.htaccess`

**Regra:** no site estático, os cabeçalhos de segurança, os redirecionamentos, o cache e a página 404 vão num `.htaccess` **gerado** junto com o export e **conferido** depois de publicar.

**Objetivo:** são os mesmos que o `next.config.ts` aplica no modo servidor. Sem eles, o site estático fica sem política de conteúdo, sem HSTS e com a 404 padrão da hospedagem.

**As lições do `.htaccess` do Atlas** (contexto de produto do repositório do Atlas, seção 5):
- **A regra canônica de 29.08 engolia os subdomínios.** Ela mandava qualquer host diferente do domínio raiz para a raiz. Agora só o `www` e o endereço temporário convergem, e a passagem para HTTPS preserva o host.
- **`X-Frame-Options: SAMEORIGIN` saiu.** Ele compara o host e recusava o enquadramento dos demos nos subdomínios. No lugar, `Content-Security-Policy: frame-ancestors`, com o domínio e os subdomínios.
- **O arquivo pode não estar em vigor.** Em 08.09 e 30.09.2026, o `.htaccess` da raiz do Atlas não estava, com três sintomas:
  - nenhum cabeçalho enviado;
  - o `www` sem redirecionar;
  - a 404 padrão da hospedagem no lugar da página da marca.

  A causa não foi determinada: arquivo ausente, fora do lugar ou não lido. O Gerenciador de Arquivos da Hostinger só mostra arquivos iniciados por ponto com "mostrar arquivos ocultos" ligado, e isso já causou dois diagnósticos falsos.
- **Nunca republicar** o pacote `rascunhos/site-2026-08-29/` do repositório do Atlas: o `.htaccess` dele tem os dois defeitos acima.

**O modelo** (`ferramentas/htaccess.modelo`; `__DOMINIO__` e `__DOMINIO_RE__` são trocados pelo gerador):
```apache
# .htaccess do site estático (export do Next), na raiz do que se publica (a pasta out/).
# Gerado no postbuild por ferramentas/gerar-htaccess.mjs: não edite o de out/.
# Repete o que o next.config.ts faria no modo servidor (13-tecnologia-e-estrutura.md, seção 5).

# Sem listagem de pasta; a página 404 da marca.
Options -Indexes
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
  RewriteEngine On

  # 1. HTTP → HTTPS, no mesmo host. Nunca mandar um subdomínio para a raiz.
  RewriteCond %{HTTPS} !=on
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

  # 2. Só o www converge para o domínio raiz.
  RewriteCond %{HTTP_HOST} ^www\.__DOMINIO_RE__$ [NC]
  RewriteRule ^ https://__DOMINIO__%{REQUEST_URI} [R=301,L]

  # 3. Depois da virada do domínio, o endereço temporário da hospedagem também converge.
  #    Descomente só quando o domínio já servir o site.
  # RewriteCond %{HTTP_HOST} \.hostingersite\.com$ [NC]
  # RewriteRule ^ https://__DOMINIO__%{REQUEST_URI} [R=301,L]
</IfModule>

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self' https://__DOMINIO__ https://*.__DOMINIO__"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
  # O navegador ignora o HSTS recebido em http. Sem includeSubDomains: nem todo subdomínio tem HTTPS garantido.
  Header always set Strict-Transport-Security "max-age=31536000"
  Header always set Cross-Origin-Opener-Policy "same-origin"

  # JS, CSS e fontes saem do export em /_next/static/, com hash no nome: um ano, imutáveis.
  # Por isso, nunca ponha .js, .css ou .woff2 em public/.
  <FilesMatch "\.(js|css|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  # O HTML, os dados da navegação interna (.txt) e o que vem de public/ (sem hash): o navegador
  # confere a cada visita, como o Next faz no modo servidor.
  <FilesMatch "\.(html|txt|xml|json|svg|png|jpe?g|webp|avif|ico)$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>
</IfModule>
```

- **O cache:** reproduz o do Next no modo servidor: um ano e imutável para `/_next/static/`, `max-age=0` para `public/` [V: documentação do Next] (`15-desempenho.md`, seção 5.13).
- **O servidor:** a hospedagem comum da Hostinger usa um servidor compatível com o `.htaccess` do Apache [FU].
- **No rascunho e no site de exemplo:** acrescente `Header always set X-Robots-Tag "noindex, nofollow"` dentro do bloco `mod_headers` (o gerador da base o faz sozinho).

**O gerador** (roda no `postbuild`, ao lado do `preparar-standalone.mjs`, e cada um só age se a pasta dele existir). **Implementado na base de produção** em 08.10.2026 (`producao/base/ferramentas/gerar-htaccess.mjs` e `htaccess.modelo`), com estes acréscimos ao trecho abaixo:
- o domínio lido de `conteudo/contato.ts`, e não de uma constante;
- `RASCUNHO=1` e, desde 16.10.2026, o site de exemplo (`exemplo: true` em `conteudo/negocio.ts`) acrescentam o `X-Robots-Tag`;
- um bloco `mod_deflate` de compressão [NV: conferir no ar];
- desde 16.10.2026, o `AddDefaultCharset UTF-8`, para o `llms.txt` sair com o acento certo [NV: conferir no ar]. O `llms.txt` não leva `X-Robots-Tag` próprio (`21-busca-e-ias.md`, seção 7).

O `.htaccess` gerado foi conferido localmente pelo `servir.mjs`, que aplica os mesmos cabeçalhos. A publicação estática **nunca foi executada**, e o que está marcado [NV] se confere no primeiro site (seção 5).
```js
// ferramentas/gerar-htaccess.mjs — no site estático, grava out/.htaccess a partir do modelo,
// com o domínio do site. Sem out/ (modo servidor), não faz nada.
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const DOMINIO = "exemplo.com.br"; // o mesmo de conteudo/contato.ts, sem "www"

if (existsSync("out")) {
  const modelo = readFileSync("ferramentas/htaccess.modelo", "utf8");
  const htaccess = modelo
    .replaceAll("__DOMINIO_RE__", DOMINIO.replaceAll(".", "\\.")) // nas expressões regulares, o ponto escapado
    .replaceAll("__DOMINIO__", DOMINIO);
  writeFileSync("out/.htaccess", htaccess);
  console.log(`export: out/.htaccess gravado para ${DOMINIO}`);
}
```
```json
{
  "scripts": {
    "postbuild": "node ferramentas/preparar-standalone.mjs && node ferramentas/gerar-htaccess.mjs"
  }
}
```

### 3.3 · Como enviar o `out/` para a Hostinger

| Forma | Como | Quando |
|---|---|---|
| **Pelo Git da hospedagem comum** (recomendada, RATIFICADO) | O hPanel tem implantação por Git para a hospedagem comum: repositório, ramo e pasta de instalação (`public_html` ou uma subpasta), com um endereço de *webhook* para implantar a cada envio [FU]. Ela **não compila**: publica os arquivos do ramo como estão. Repositório privado pede a chave de implantação que o painel mostra, cadastrada no GitHub | Sempre que houver integração contínua |
| **Ramo de artefatos** (RATIFICADO (de 07.10.2026)) | A integração contínua compila, roda a régua e envia o conteúdo de `out/` (com o `.htaccess`) para o ramo do cliente num repositório só de artefatos. A Hostinger publica esse ramo | É o que faz a forma acima funcionar sem compilar no servidor. Voltar atrás é reverter o commit do artefato |
| **À mão** (contingência) | Compactar o `out/`, enviar pelo Gerenciador de Arquivos e extrair em `public_html`, com "mostrar arquivos ocultos" ligado para ver o `.htaccess` | Sem integração contínua, ou numa emergência |

---

## 4. O domínio

1. **Regra:** o domínio `.com.br` se registra no registro.br, com o CPF ou o CNPJ do titular.
   - **RATIFICADO:** em nome do **cliente**, com o Atlas como contato técnico, e o acesso anotado em `decisoes.md` (`17-conformidade-e-normas.md`, seção 8).
   - **Objetivo:** o nome do negócio é do negócio.
2. **Regra:** o domínio aponta para a Hostinger. Há duas formas:
   - delegar os servidores de nome à Hostinger (os do Atlas são `ns1.dns-parking.com` e `ns2.dns-parking.com`);
   - manter o DNS no registro.br e criar os registros que o hPanel indicar para o site ou o app.

   **RATIFICADO:** delegar. A zona inteira (site, certificado, e-mail) fica num painel só.
   - **A CONFIRMAR no hPanel:** como se conecta um domínio a um web app Node.js, e o tempo de emissão do certificado.
3. **Regra:** o certificado é o gerenciado pela Hostinger, com renovação automática. Ele é conferido na publicação e a cada mês (seção 7).
4. **Regra:** com formulário, a caixa que envia é do domínio do cliente. Os registros de entrega (SPF, DKIM e DMARC) ficam na zona e são testados com um envio real antes da virada.
   - **Exemplo:** o domínio do Atlas tem nove registros de e-mail: 2 MX, SPF, DMARC, 3 DKIM, autodiscover e autoconfig.
   - **Custo:** a caixa custa ~R$ 9 por mês depois do primeiro ano (`14-funcionalidades/02-formulario.md`).

---

## 5. A conferência depois de publicar

**Regra:** toda publicação, a primeira e cada atualização, termina com esta conferência **no endereço publicado**. Item que falha volta a publicação (seção 6.3).

**Objetivo:** a configuração mora no repositório, mas quem responde é o servidor da Hostinger. Os cabeçalhos do Atlas já estiveram escritos e não chegavam ao navegador (seção 3.2).

**Cuidado:** pedido com `curl --compressed` recebe da CDN da Hostinger uma página de verificação de navegador, e não o site. Use `curl` sem `--compressed`.

| # | O que | Como | O certo |
|---|---|---|---|
| 1 | Cabeçalhos de segurança | `node ferramentas/verificar-cabecalhos.mjs https://<domínio>` (o script está em `../qualidade/09-seguranca-e-privacidade.md`, seção 3) | Política de conteúdo, HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy` e COOP em `/`, na 404 e no `robots.txt`; nenhum `X-Powered-By` |
| 2 | HTTP vai para HTTPS | `curl -sI http://<domínio>/` | `301` ou `308`, com `location: https://` no mesmo host |
| 3 | `www` converge | `curl -sI https://www.<domínio>/` | `308` (Node) ou `301` (estático) para o domínio raiz |
| 4 | Endereço temporário converge (depois da virada) | `curl -sI https://<temporário>.hostingersite.com/` | Redireciona para o domínio |
| 5 | Subdomínio não é engolido | `curl -sI https://<subdomínio>.<domínio>/`, quando houver | Responde ele mesmo, sem ir para a raiz |
| 6 | Página 404 da marca | `curl -s -o /dev/null -w "%{http_code}\n" https://<domínio>/nao-existe` e a página aberta no navegador | `404`, com a página da marca e o caminho de volta |
| 7 | Certificado | `curl -vI https://<domínio>/ 2>&1 \| grep -i "expire"` | Válido; renovação automática |
| 8 | Cartão de compartilhamento | Enviar o endereço numa conversa do WhatsApp; pedir a imagem do `og:image` | O cartão com imagem, título e descrição; a imagem com `200` e menos de 600 KB |
| 9 | Mapa do site e robôs | `curl -s https://<domínio>/sitemap.xml` e `/robots.txt` | Os endereços com o domínio certo, iguais aos canônicos (a barra no fim, no estático), com a data da última mudança e sem `changefreq` nem `priority`; o `robots.txt` aponta o mapa |
| 10 | A régua no ar | `npm run regua -- --base=https://<domínio>` | 0 falhas, como no build local |
| 11 | Desempenho no ar | O protocolo de `15-desempenho.md` (seção 4.3) contra o domínio, na página inicial | LCP e TBT na faixa medida localmente; diferença grande é investigada |
| 12 | Primeiro byte e partida a frio (Node) | `curl -s -o /dev/null -w "%{time_starttransfer}\n" https://<domínio>/`, uma vez depois de uma pausa longa sem visitas e outra logo em seguida | Os dois números registrados. **A CONFIRMAR:** a partida a frio nunca foi medida, nem o tempo de inatividade que faz o app dormir |
| 13 | Formulário e Agenda (Node) | Um envio real, uma marcação e um cancelamento no endereço publicado | Chegam à caixa do cliente; nada fica preso por origem (`14-funcionalidades/02-formulario.md`, seção 4) |
| 14 | Crédito e rodapé | Olhar o rodapé de três páginas | "Site por Atlas Digital" em texto (seção 11); o rodapé de conformidade completo (`17-conformidade-e-normas.md`, seção 4) |
| 15 | Rascunho fora da busca | `curl -sI <endereço do rascunho> \| grep -i x-robots-tag` | `noindex, nofollow` enquanto for rascunho; **ausente** no site publicado |
| 16 | O `robots.txt` por robô | `curl -s https://<domínio>/robots.txt` | Cliente: só o `*` liberado, nenhum robô de IA barrado. Exemplo: mais o grupo dos 11 robôs de IA com `Disallow: /` (`21-busca-e-ias.md`, seção 2) |
| 17 | O `X-Robots-Tag` só onde é previsto | `curl -sI https://<domínio>/ \| grep -i x-robots-tag` e o mesmo em `/llms.txt` | Cliente publicado: nada em `/` nem em `/llms.txt`. Exemplo: `noindex, nofollow` em toda resposta |
| 18 | O texto, os dados e o `llms.txt` | `node ferramentas/texto-do-robo.mjs https://<domínio>` e `curl -s https://<domínio>/llms.txt \| head -20` | Sai com 0 (nenhuma palavra colada; JSON-LD válido, com `WebSite` e o negócio na capa do cliente); o `llms.txt` começa por `# <Nome>`; no cliente, as páginas pelo canônico, nenhuma `noindex`; no exemplo, só o nome e o selo |
| 19 | O IndexNow **[cli]** | `node ferramentas/avisar-indexnow.mjs --ensaio <páginas>`, depois sem `--ensaio` | `200` ou `202`, só com as páginas que mudaram (na primeira publicação, todas) (`21-busca-e-ias.md`, seção 8) [NV: o envio nunca foi executado; o primeiro será o do site do Atlas] |
| 20 | Search Console e Bing **[cli]** | Com o dono (seção 5.1) | O mapa do site aceito nos dois; o controle de IA generativa do Search Console em incluir |

Os itens 19 e 20 vêm depois do site no ar e não voltam a publicação: o que falhar neles fica como pendência registrada, com quem a tem.

O resultado vai para o relatório de QA da publicação (`../qualidade/modelos/relatorio-de-qa.md`), com a data e o commit.

### 5.1 · A busca e as respostas de IA na primeira publicação [cli]

**Regra** (DECIDIDO em 16.10.2026, em todo plano; `21-busca-e-ias.md`, seções 8 e 9). Na primeira publicação de um site de cliente, além da tabela acima:
1. **Antes do build:** `node ferramentas/avisar-indexnow.mjs --chave-nova`, para a chave do IndexNow ir ao ar com o site (`public/<chave>.txt`).
2. **O Google Search Console:** a propriedade de domínio, verificada pelo registro TXT na zona da Hostinger (seção 4), na conta Google do cliente, com o Atlas como usuário [NV: o princípio do Perfil da Empresa, `14-funcionalidades/06-presenca.md`, seção 1; a confirmar pelo aprovador]; o envio do `sitemap.xml`; o controle "Search generative AI" em **incluir** (support.google.com/webmasters/answer/16908024) [V].
3. **O Bing Webmaster Tools:** a importação do Search Console, que traz o mapa e a verificação.
4. **O aviso ao IndexNow** de todas as páginas, depois do item 18 da tabela: `--ensaio`, e então o envio.
5. **O Perfil da Empresa no Google:** com o módulo Presença, pelo procedimento de `14-funcionalidades/06-presenca.md`, seção 4.1; sem ele, o dono recebe a lista do que preencher igual ao site (`21-busca-e-ias.md`, seção 9, item 4).
6. **A lista do que depende do dono** (`21-busca-e-ias.md`, seção 9) vai ao cliente na entrega, com o que já foi feito marcado.

**Objetivo.** O código faz a parte do site; o resto (a conta do Google, o Bing, o Perfil, os perfis com o mesmo nome e telefone) só o dono pode abrir ou autorizar. Sem a lista, ninguém faz.

**Como conferir.** O registro da publicação, no relatório de QA, com cada item marcado ou com a pendência e quem a tem.

---

## 6. O ramo `producao`, a homologação e a volta atrás

### 6.1 · O ramo `producao` (RATIFICADO)

**Regra:** a Hostinger publica o ramo **`producao`**, nunca a `main`. Só chega a `producao` o commit da `main` que passou em todas as verificações.

**Objetivo:** hoje, a publicação a cada envio para a `main` não passa por verificação nenhuma antes. Um envio com defeito iria ao ar sozinho.

**Como fazer:**
- **Com integração contínua:** um trabalho final, que só roda se todos os outros passaram, avança `producao` até o commit verificado (`../qualidade/13-integracao-continua.md`).
- **Sem ela** (até ser montada): quem publica roda a régua contra o build local e só então avança `producao` (`git push origin main:producao`), **a pedido explícito** do sócio responsável.

O Claude Code não faz commit, push nem publicação sem pedido (`01-processo.md`).

**A proteção do ramo:**
- **Hoje:** em repositório privado de conta pessoal gratuita, a proteção de ramo exige o GitHub Pro (cerca de US$ 4 por mês) [FU]. Até lá, a regra é de processo, não de máquina.
- **Com o Pro:** as verificações viram obrigatórias quando o trabalho passar a ser por pedido de mescla.

### 6.2 · A homologação

**Regra (RATIFICADO):**
1. **O rascunho de 24 horas** e as rodadas de ajuste ficam no **endereço temporário** do próprio site do cliente. É o web app ou o site estático que depois recebe o domínio, com `noindex` por cabeçalho (seção 2.2, passo 5). O vínculo vai ao cliente pelo canal combinado no briefing.
2. **Depois da publicação,** as mudanças se conferem no build local, com a régua, antes de avançar `producao`.
3. **Homologação permanente:** um segundo web app num subdomínio gratuito, publicando o ramo `homologacao` com o mesmo `noindex`, onde os sócios conferem antes do ar. Só entra se a cota de web apps permitir (seção 1, A CONFIRMAR).

**Objetivo:** o cliente vê o site no servidor real antes do domínio, e nenhuma busca indexa o rascunho.

**Como conferir:** o item 15 da seção 5.

### 6.3 · Voltar atrás

A Hostinger não documenta como voltar a uma implantação anterior. A volta é pelo git:

| Situação | Como (RATIFICADO) |
|---|---|
| Defeito sem urgência | `git revert <commit>` na `main`; a reversão passa pelas verificações e avança `producao` como qualquer mudança |
| Site quebrado agora | Apontar `producao` para o último commit bom: `git push --force-with-lease origin <commit-bom>:producao`, **a pedido explícito**. A implantação refaz o site anterior. A correção segue depois, pela `main` |
| Site estático | Reverter o commit no ramo de artefatos (seção 3.3) |

Em todos os casos, a conferência da seção 5 é refeita, e o ocorrido vai para `decisoes.md`.

---

## 7. A manutenção mensal

### 7.1 · O que a mensalidade compreende

- **DECIDIDO** (ata v3.0, IV.2.1, item 5; texto do site): domínio, hospedagem, certificado de segurança e manutenção mensal.
- **No método contado ao cliente** (contexto comercial do repositório do Atlas, seção 4): "correções, alterações de texto, preço ou horário, e cópias de segurança".
- **O limite mensal de alterações não está definido** nos documentos vigentes (PENDENTE, decisão dos sócios). O "1 / 3 / 6 alterações por mês" (Essencial, Profissional, Completo) é de agosto de 2026 e está **sem vigência** (contexto comercial do repositório do Atlas, §8; `03-planos.md`, seção 8): não se promete nem se conta até decisão dos sócios. O que excede o escopo do plano (página, funcionalidade, módulo, redesenho) é orçado antes, como abaixo.
- **Começo:** a mensalidade começa no mês seguinte à publicação (afirmação do site; A CONFIRMAR, `01-processo.md`, etapa 12).

| Plano | Acompanhamento (ata) | Resposta ao cliente (RATIFICADO; ata IV.2.1, item 6) |
|---|---|---|
| **[E]** | Manutenção mensal: texto, preço, horário | Até 1 dia útil |
| **[P]** | O do [E] e o relatório mensal de acessos | Até 1 dia útil |
| **[C]** | O do [P], a revisão trimestral de conteúdo e o atendimento prioritário | No mesmo dia útil (o "prioritário") |

- **"Resposta"** é a confirmação do pedido, com o prazo em que a mudança vai ao ar. O prazo de execução de cada pedido é dado nessa resposta.
- **RATIFICADO:** a mudança simples (um texto, um preço, um horário) vai ao ar na mesma semana do pedido.

**Fora da mensalidade, orçado antes de ser feito:**
- página nova no [E] e no [P] (a Página adicional, R$ 250);
- funcionalidade nova;
- módulo;
- redesenho;
- mudança de plano (`03-planos.md`, seção 7).

"O que excede o escopo é orçado antes de ser feito, nunca cobrado depois" (`01-processo.md`, etapa 9).

### 7.2 · O pedido do cliente, sem CMS

**Regra:** nenhum site tem CMS por padrão. O cliente pede a mudança, e o Atlas a faz.

**Objetivo:**
- **Sem CMS** não há serviço de terceiro, nem servidor de autenticação, nem pedido externo.
- **Toda mudança é conferida:** o texto continua dentro da norma do conselho, e a régua roda sempre.
- **O peso fica:** a página continua com os bytes medidos.

A alternativa e as opções avaliadas estão em `13-tecnologia-e-estrutura.md`, seção 8.2. Um CMS sobre o Git entra só a pedido do cliente e para campos estreitos (horário, preço, fotos).

**Como fazer:**
1. **O pedido chega** pelo canal combinado (o WhatsApp do suporte). Matheus Azevedo Abreu, no suporte, responde no prazo do plano (seção 7.1).
2. **O registro:** o pedido vai para `decisoes.md`, com a data e as palavras do cliente.
3. **A mudança:** o Claude Code a faz em `conteudo/` (texto, preço, horário) ou em `public/` (foto preparada).
   - Preço com o mês de referência.
   - Texto conferido contra a norma do nicho (`nichos/<nicho>.md`).
   - A data do mapa do site (`ultimaAlteracao`, em `conteudo/negocio.ts`) passa à do dia, só se o conteúdo mudou (`21-busca-e-ias.md`, seção 3).
4. **A verificação:** o build, a régua e a comparação de telas, quando houver (`../qualidade/07-regressao-visual.md`).
5. **A publicação:** pela seção 6.1 e a conferência curta da seção 5 (itens 1, 6, 10 e 14). Depois, o aviso ao IndexNow só das páginas que mudaram (seção 5, item 19).
6. **O aviso:** o cliente recebe o endereço da página mudada.

### 7.3 · A janela mensal (RATIFICADO)

Uma semana fixa por mês para cada cliente. O pedido do cliente não espera a janela: ele sai no prazo da seção 7.1. A janela é para o que o Atlas faz por conta própria.

| # | Tarefa | Como | Plano |
|---|---|---|---|
| 1 | Atualizações | Os pedidos do Dependabot (com a quarentena de 7 dias de `13-tecnologia-e-estrutura.md`, seção 10); `npm audit --omit=dev`; o build; a régua; a comparação de telas; a publicação em onda (seção 8) | [todos] |
| 2 | O site no ar | Os itens 1, 2, 3, 6, 7, 9 e 10 da seção 5; o Lighthouse da página inicial, comparado ao do mês anterior | [todos] |
| 3 | Cópias de segurança | Confirmar que a cópia do dia existe; a cada trimestre, restaurar uma vez num teste (seção 9) | [todos]; o banco, só com formulário ou Agenda |
| 4 | Relatório de acessos | As leituras semanais do hPanel, somadas no fim do mês (`14-funcionalidades/04-relatorio-de-acessos.md`) | [P][C] |
| 5 | Revisão trimestral de conteúdo | Releitura dos textos, preços, fotos e páginas de busca, com relatório (`03-planos.md`) | [C], a cada três meses |
| 6 | Renovações | O vencimento do domínio no registro.br; o certificado; o plano da Hostinger (05.01.2027); a caixa de e-mail | [todos] |
| 7 | Os dados guardados | A tarefa de eliminação rodou; nada guardado além do prazo publicado no aviso de privacidade | Com formulário ou Agenda |
| 8 | O registro | Um registro do mês em `registros/` (`relatorio-de-qa--manutencao--<aaaa-mm-dd>.md`, modelo em `producao/qualidade/modelos/relatorio-de-qa.md`): o que se fez, o que se mediu, o que ficou pendente | [todos] |

**Objetivo:** o site não envelhece em silêncio. Sem a janela, o domínio vence, a dependência fica vulnerável e a cópia que nunca foi restaurada falha no dia em que for precisa.

**Quem:**
- **Matheus Castro Oliveira de Luna Garcia:** as atualizações e a conferência técnica;
- **Matheus Azevedo Abreu:** o suporte e o relatório ao cliente;
- **Claude Code:** executa a pedido (`01-processo.md`, etapa 13).

---

## 8. Atualizações em vários sites: as ondas

**Regra (RATIFICADO):** as mudanças que atingem muitos sites se dividem em três classes, e cada uma tem o seu caminho.

| Classe | O que é | Como vai ao ar |
|---|---|---|
| **Segurança e infraestrutura** | Next, React, a política de conteúdo, a versão do Node | Uma mudança agrupada, igual para todos, **em ondas**: primeiro os canários (os três sites de exemplo, no repositório do Atlas), depois um ou dois clientes, depois o resto. Cada site com o build, a régua e a comparação de telas a 390 e 1440 px antes de avançar a onda |
| **Melhoria de peça** | Um componente que ficou melhor num site (a galeria, o formulário) | Opcional, por cliente, na janela mensal (seção 7.3), num pedido de mescla aberto pelo agente, com relatório do que mudou e do que a régua mediu (RATIFICADO; vem do relatório do `shadcn create`, 07.10.2026) |
| **Identidade** | Fonte, paleta, forma, gesto, peça-assinatura | **Nunca compartilhada.** Cada site tem a sua (`04-direcao-de-arte.md`) |

**Objetivo:**
- **A onda:** um defeito numa atualização comum aparece primeiro num site de exemplo, onde não custa nada, e não em todos os clientes ao mesmo tempo.
- **A separação das classes** impede que uma "melhoria" leve a identidade de um cliente para outro.

**A urgência.** Uma falha crítica numa dependência de produção pula a quarentena e a janela.
- **Exemplo:** a falha de nota 10 nos React Server Components, de dezembro de 2025, exigiu atualização imediata [V: https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components].
- **Onde chega primeiro:** nos sites com servidor (web app Node), no mesmo dia, ainda em onda, mas com as etapas encurtadas.
- **Nos estáticos:** eles não rodam o servidor do React. Uma falha só de servidor não os alcança [FU], e a atualização segue a onda normal.

**De onde vem o aviso:**
- os alertas do Dependabot em cada repositório (as atualizações de segurança não esperam a quarentena das de versão [FU]);
- os avisos de segurança do Next e do React.

**No monorepo proposto** (`13-tecnologia-e-estrutura.md`, seção 8), `turbo run build --affected` compila só o que a mudança atinge, e a onda vira a ordem de publicação dos apps.

---

## 9. Cópias de segurança

| O quê | Onde está a cópia | O que conferir |
|---|---|---|
| **O código e o conteúdo** (textos, preços, fotos preparadas) | O próprio repositório no GitHub: o site inteiro se refaz a partir dele | Que o ramo `producao` corresponde ao que está no ar |
| **As fotos originais** | Fora de `public/` (`08-imagem-e-fotografia.md`) | Que existem, com as autorizações de imagem |
| **Os arquivos no servidor** | A cópia automática diária da Hostinger cobre os arquivos do site e o MySQL [FU]. A CONFIRMAR: se cobre os web apps Node, e por quantos dias guarda | Que a cópia do dia existe |
| **Os dados do formulário e da Agenda** | A mesma cópia diária do MySQL | **Restaurar uma vez por trimestre,** num banco de teste: cópia nunca restaurada não é cópia (`../qualidade/09-seguranca-e-privacidade.md`, seção 9) |
| **As leituras do relatório de acessos** | As capturas semanais, na pasta do cliente | Uma por semana do mês |

**A cópia e a LGPD.** O dado apagado do banco continua nas cópias até elas vencerem. O aviso de privacidade diz isso, com o prazo de guarda das cópias, que é A CONFIRMAR no hPanel (`17-conformidade-e-normas.md`, seção 5.3).

---

## 10. O fim do contrato (RATIFICADO)

**O estado:** o que acontece com o domínio e os arquivos no fim do contrato está **em consulta ao contador** (decisão de 02.10.2026). O site do Atlas não promete nada sobre isso até a decisão (`17-conformidade-e-normas.md`, seções 8 e 10). O roteiro abaixo é o que se faz em qualquer resultado da consulta; o que depende dela está marcado.

1. **A data.** A data de saída do ar é combinada por escrito e registrada em `decisoes.md`.
2. **Os dados (com formulário ou Agenda).** São devolvidos ao cliente, que é o controlador, ou eliminados, como mandar o contrato de operador. Depois, a eliminação é registrada. As cópias da hospedagem vencem no prazo delas (seção 9).
3. **O site.** Sai da hospedagem: o web app, ou os arquivos de `public_html`. A tarefa agendada sai também.
4. **Os acessos.** Trocam-se ou apagam-se a senha do SMTP, o usuário do banco e os segredos do app. A integração com o repositório é desligada.
5. **O domínio.** Segue o contrato (A CONFIRMAR, contador). Registrado em nome do cliente, como propõe a seção 4, sai só o contato técnico do Atlas.
6. **Os arquivos e o repositório.** Seguem o contrato (A CONFIRMAR, contador). O repositório do cliente é arquivado, só para leitura, na conta do Atlas.
7. **O registro.** O que foi feito vai para o registro de decisões do Atlas, com a data.

**Objetivo:** nada do cliente fica rodando, guardado ou acessível depois do contrato sem que alguém tenha decidido isso.

---

## 11. O crédito

**Regra:** o site de cliente leva "Site por Atlas Digital" em texto, no rodapé, sem o logotipo do Atlas. O site de exemplo leva o selo de ficção e o crédito do plano. Se o crédito virar vínculo, leva só a marca, nunca palavra-chave: as políticas antispam do Google citam "widely distributed links in the footers or templates of various sites" (`21-busca-e-ias.md`, seção 10) [V]. As regras e o texto estão em `10-texto-e-conteudo.md` (seção 12), `14-funcionalidades/01-base-de-todo-site.md` (seção 9) e `17-conformidade-e-normas.md` (seção 4).

**Na publicação e na manutenção:**
- **A cada publicação:** o crédito é conferido (seção 5, item 14).
- **Numa mudança pedida pelo cliente:** ele não sai sem decisão registrada.
- **No fim do contrato:** o crédito sai com o site. Se os arquivos forem entregues ao cliente e o site continuar noutro lugar, o que acontece com o crédito segue o contrato (A CONFIRMAR, com o domínio e os arquivos).

---

## 12. Conferência rápida

**Na publicação:**
- [ ] Modo certo para o site (seção 1): estático sem servidor; web app Node com formulário ou Agenda.
- [ ] Régua aprovada no build local; `npm audit --omit=dev` limpo; o rascunho aprovado por escrito.
- [ ] Segredos só nas variáveis do app; nada de `NEXT_PUBLIC_` com segredo.
- [ ] `producao` aponta para o commit verificado; a Hostinger publica `producao`.
- [ ] O rascunho no endereço temporário com `X-Robots-Tag: noindex, nofollow`.
- [ ] A porta de publicação de `17-conformidade-e-normas.md` (seção 9) completa antes do domínio.
- [ ] Na virada: `SITE_HOMOLOGACAO` desligada, `SITE_NO_DOMINIO=1`, reimplantado.
- [ ] Estático: `.htaccess` gerado, presente em `public_html` (com "mostrar arquivos ocultos") e **em vigor** (os itens 1 a 3 da seção 5).
- [ ] A conferência da seção 5 inteira, no domínio, com o resultado no relatório de QA, inclusive a busca e as IAs (itens 16 a 20) e a seção 5.1.
- [ ] Registro em `decisoes.md`: data, commit, endereço, modo, nomes das variáveis.

**A cada mês:**
- [ ] Pedidos do cliente respondidos no prazo do plano e publicados com a régua.
- [ ] Atualizações em onda; nenhuma dependência de produção vulnerável.
- [ ] O site no ar conferido; o Lighthouse comparado ao mês anterior.
- [ ] A cópia do dia existe; a restauração trimestral em dia.
- [ ] **[P][C]** Relatório de acessos; **[C]** revisão trimestral no mês dela.
- [ ] Renovações em dia (domínio, certificado, plano, caixa de e-mail).
- [ ] O registro do mês em `registros/`.
