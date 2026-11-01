# O relatório mensal de acessos [P][C]

> **Para que serve.** Diz como fazer o relatório mensal de acessos do Profissional e do Completo com os dados da Hostinger, sem cookie e sem rastreador no site: o que o painel dá, o que ele não dá, como somar o mês e como escrever o relatório sem prometer o que os números não dizem. Traz também a alternativa ainda não decidida, a contagem no próprio servidor.
>
> **Quando ler.** Ao publicar um site [P] ou [C] (a primeira leitura começa na semana da publicação) e a cada fechamento de mês.
>
> **Depende de.** `README.md`, `../17-conformidade-e-normas.md` (cookies, LGPD), `../18-publicacao-e-manutencao.md` (a manutenção mensal), `../../qualidade/14-ciclo-de-qa.md`.
>
> **Estado.**
> - O relatório **com os dados da Hostinger** e **sem cookie** é RATIFICADO (ata v3.0, IV.2.1; decisão do usuário em 07.10.2026).
> - O procedimento e o modelo abaixo são RATIFICADO.
> - A contagem no servidor (seção 7) é alternativa **não adotada**: vale a leitura dos dados da Hostinger, e nada foi construído.
>
> **Atualizado em:** 08.10.2026.

---

## 1. O que o cliente recebe

**Regra.** Todo mês, até o quinto dia útil (RATIFICADO), o cliente [P][C] recebe um relatório curto sobre o mês anterior:
- o que foi medido;
- os números;
- o que eles dizem e o que não dizem;
- o que mudou no site;
- os erros achados e corrigidos.

**Objetivo.** Mostrar que o site está no ar, sendo procurado e cuidado, com números que o cliente pode conferir. O relatório é o produto do acompanhamento: uma página de números honestos vale mais que um painel bonito com números que ninguém sabe ler.

**Sem cookie e sem rastreador, sempre.** Nada de Google Analytics, Meta Pixel, Hotjar, Clarity ou similar no site. Eles gravam no aparelho, fazem pedidos externos, exigem banner de consentimento e quebram a política de conteúdo (`../17-conformidade-e-normas.md`). A régua reprova qualquer um deles (bloco 5).

---

## 2. O que o painel da Hostinger dá

Fonte: hPanel → Analytics (https://docs.hostinger.com/websites/analytics.md, consultada em 08.10.2026) [V].

| Área | O que mostra |
|---|---|
| Visão geral | Banda total, pedidos totais, países mais frequentes, IPs, endereços e domínios mais pedidos |
| Analytics | Pedidos HTTP e HTTPS, IPs únicos, banda; e 30 dias de uso de memória e de processador |
| Registro de acessos | Pedido a pedido: hora, IP, tipo do pedido, aparelho, país, tamanho em bytes e tempo de resposta em ms |
| Erros 4xx e 5xx | O mesmo registro, filtrado por esses códigos |

## 3. O que ele não dá

| Limite | Consequência |
|---|---|
| Só as janelas de **1 h, 6 h, 24 h e 7 dias**; "No custom date ranges" | Não existe "o mês". O mês se monta com quatro ou cinco leituras semanais (seção 4) |
| **Pedidos** incluem arquivos (imagens, fontes, scripts), chamadas internas e robôs | Pedido não é visita nem página vista. Uma página com 30 arquivos são 31 pedidos |
| **IPs únicos** contam robôs e contam por IP | Uma família atrás do mesmo roteador é um IP; uma pessoa no 4G e depois no Wi-Fi são dois |
| Sem páginas vistas, sem sessões, sem de onde o visitante veio | O relatório não diz "veio do Google" nem "ficou 2 minutos" |
| Exportação e API não documentadas | A leitura é à mão, com captura de tela |
| Não diz se vale para web app Node | A CONFIRMAR no hPanel, no primeiro site [P] publicado |
| Não diz por quanto tempo guarda o registro de acessos | A CONFIRMAR |
| Os registros de execução do web app (*Runtime Logs*) baixam em `.txt`, até 5.000 linhas, mas **zeram a cada implantação** | Não servem de histórico; baixe antes de reimplantar (`../18-publicacao-e-manutencao.md`, seção 2.1) |
| A CDN guarda só os arquivos estáticos; o HTML vai sempre ao servidor | Toda abertura de página passa pelo app: é o que permite a contagem própria da seção 7. A navegação interna a uma página estática já pré-carregada não volta ao servidor (seção 7, item 4) |
| O registro bruto do servidor (*access log*) não aparece na documentação | O GoAccess (com `--anonymize-ip`), que montaria o relatório sem cookie, dependeria dele: fica de fora até a Hostinger o oferecer [FU: pesquisa de 07.10.2026] |

**Objetivo desta tabela.** Quem escreve o relatório precisa saber o que o número **não** é, para não escrever "312 visitantes" onde o painel diz "312 IPs únicos, robôs incluídos".

---

## 4. Como montar o mês

**Regra.** Uma leitura por semana, sempre no mesmo dia e hora (RATIFICADO: segunda-feira de manhã), na janela de **7 dias**; no fim do mês, a soma das semanas.

**Como fazer.**
1. **Na segunda-feira,** abra hPanel → Analytics do site, janela de 7 dias.
2. **Anote numa planilha do cliente** (uma linha por semana):
   - pedidos;
   - IPs únicos;
   - banda;
   - os três países mais frequentes;
   - as páginas mais pedidas: só endereços de página, sem imagem, fonte ou script; anote o endereço e a contagem;
   - o número de respostas 4xx e 5xx e os endereços delas.
3. **Guarde a captura de tela** de cada área, com a data, na pasta do cliente. A captura é a prova do número, já que o painel não exporta.
4. **No fechamento do mês,** some as semanas que caem nele. A semana que atravessa a virada do mês entra no mês em que tem mais dias. Diga isso no relatório.
5. **Semana sem leitura** (feriado, esquecimento): a janela de 7 dias não volta. Escreva "semana sem leitura" no relatório; **nunca estime** o número que falta.

**Objetivo.** Com a janela máxima de 7 dias, a leitura semanal é o único jeito de cobrir o mês inteiro.

**Como conferir.** A planilha tem uma linha por segunda-feira do mês, cada uma com a captura correspondente. Linha sem captura não entra na soma.

**Os números somados, e o que não se pode dizer deles:**

| Número | Pode dizer | Não pode dizer |
|---|---|---|
| Soma dos pedidos | "O site recebeu ~N pedidos no mês" | "N visitas" |
| Soma dos IPs únicos das semanas | "~N IPs diferentes por semana, robôs incluídos" | "N pessoas": quem volta em semanas diferentes conta de novo, e robôs entram |
| Páginas mais pedidas | "A página de Valores foi a mais pedida, depois do início" | "N pessoas leram Valores" |
| Países | "Quase todos os pedidos vêm do Brasil" | — |
| 4xx | "N endereços inexistentes foram pedidos; os de dentro do site foram corrigidos" | — |
| 5xx | "Houve N erros do servidor, em [data]; a causa foi [causa]" | "O site ficou fora do ar" (sem confirmar) |

---

## 5. O modelo do relatório

**Regra.** Uma página, nesta ordem, no registro impessoal do Atlas (`../10-texto-e-conteudo.md`):

```markdown
# Relatório de acessos · <Nome do negócio> · <mês>/<ano>

## Como foi medido
Pelos dados da hospedagem (Hostinger), lidos uma vez por semana, na janela de 7 dias. O site não usa cookie
nem rastreador: os números contam pedidos ao servidor, não pessoas. Robôs de busca estão incluídos.
<Semanas sem leitura, se houver.>

## Os números
| Semana (início) | Pedidos | IPs únicos | Banda | Erros 4xx | Erros 5xx |
|---|---|---|---|---|---|
| dd.mm | … | … | … | … | … |
| **Mês** | **…** | (não se soma: ver nota) | **…** | **…** | **…** |

Páginas mais pedidas: <página> (N), <página> (N), <página> (N).
Países: Brasil (N%), <outros>.

## O que os números dizem
<Duas ou três frases. Comparação só com o próprio site, nos meses anteriores. Nada de "cresceu muito" sem número.>

## O que mudou no site
<As mudanças da manutenção mensal: texto, preço, horário, foto. Com a data.>

## Erros e correções
<Endereços com 4xx que eram do site e o que se fez (vínculo corrigido, redirecionamento). 5xx: quando, por quê, o que se fez.>

## Para o próximo mês
<Uma ou duas sugestões, ligadas a um número deste relatório. Nenhuma promessa de resultado.>
```

**Regras de redação:**
- **Comparar** só com o próprio site no tempo, nunca com "o mercado" ou com concorrentes: não há dado para isso.
- **Sem adjetivo sem número:** nada de "excelente desempenho". Escreve-se "1.240 pedidos, 180 a mais que em setembro".
- **A primeira linha diz o método** (pedidos, não pessoas). O cliente que lê só o começo não sai enganado.
- **No Completo,** o relatório entra na revisão trimestral de conteúdo (`../03-planos.md`, seção 5.4): três meses lado a lado.

---

## 6. Os erros como manutenção

**Regra.** Os 4xx e 5xx da semana são lidos na mesma segunda-feira, e não só no fim do mês:
- **404 num endereço que é do site** (vínculo quebrado, página renomeada): corrige-se o vínculo ou cria-se o redirecionamento na mesma semana.
- **404 de robô** procurando `wp-login.php`, `.env` e afins: ruído; não se corrige nada, e o relatório não alarma o cliente com isso.
- **5xx:** é incidente. Confere-se o site no ar na hora e o registro do web app (`../18-publicacao-e-manutencao.md`).

**Objetivo.** O registro de erros é o único sinal de defeito no ar que o Atlas tem sem rastreador. Ler toda semana encurta o tempo do defeito.

---

## 7. A alternativa não adotada: contar no próprio servidor

**Estado.** Alternativa de 07.10.2026, **não adotada** na ratificação de 08.10.2026: entra só por nova decisão (no repositório do Atlas, `documentacao/atlas--tecnologia.md`, seção 5.3). Só para sites em web app Node: o site estático não tem servidor próprio.

**O que daria a mais:**
- aberturas de página por dia e por página (o que o número conta e o que não conta: item 4, abaixo);
- de onde veio a visita: só o domínio (google.com, instagram.com), nunca o endereço completo;
- celular ou computador;
- visitantes aproximados por dia.

Tudo **sem cookie** e **sem gravar o IP**.

**Como funcionaria.**
1. **Onde:** o `proxy.ts` do Next 16 (o antigo `middleware`), que roda no Node por padrão (documentação local do Next 16.3, `03-file-conventions/proxy.md`) [V], conta cada pedido de página.
2. **Quando:** a gravação no MySQL vai por `event.waitUntil()`, depois da resposta. A página não espera o banco.
3. **O que fica fora:**
   - os arquivos (imagens, fontes, scripts);
   - a pré-carga dos vínculos do Next, excluída no `matcher` pelos cabeçalhos `next-router-prefetch` e `purpose: prefetch`, como a documentação mostra [V];
   - os pedidos que não são `GET`;
   - os robôs, reconhecidos pelo navegador declarado;
   - o caminho de todo endereço que não está no mapa do site (`paginas`, de `conteudo/site.ts`): o vínculo de cancelamento da Agenda (`/cancelar/<código>`, cujo código é guardado só em hash, `05-agenda.md`, seção 8) e os endereços inventados por robôs (`/admin`, `/wp-login`) contam como `"(outra)"`, sem o caminho. O `matcher` ainda exclui o `/cancelar`, como defesa a mais.
4. **A navegação interna só conta quando chega ao servidor.** A página estática que o `<Link>` já pré-carregou abre sem pedido ("Server roundtrip on click: No", `02-guides/prefetching.md`), e a pré-carga, excluída no `matcher`, também não conta. O número é de **aberturas de página** (pelo endereço, pela busca, por vínculo de fora) e de navegações a páginas dinâmicas. Contar toda navegação exigiria um aviso do aparelho ao próprio servidor a cada troca de página (uma ilha com `navigator.sendBeacon`), a decidir.
5. **O visitante aproximado** é um hash do IP com o navegador declarado e o **sal aleatório do dia**, o mesmo do limite do formulário (`02-formulario.md`, seção 5.3). Fica numa tabela do dia; à meia-noite, sobra só a contagem, e o sal é apagado.

```ts
// proxy.ts — conta aberturas de página sem cookie. Só no web app Node.
import { type NextFetchEvent, type NextRequest, NextResponse } from "next/server";

import { paginas } from "@/conteudo/site";
import { contarPagina } from "@/lib/acessos";

const ROBO = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|lighthouse|headless/i;
// Só os caminhos do mapa do site vão para a tabela. Um endereço com segredo (/cancelar/<código>)
// ou inventado por robô (/wp-login, /admin) vira "(outra)": nada de código nem de lixo no banco.
const CONHECIDOS = new Set<string>(paginas.map((p) => p.caminho));

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const navegador = request.headers.get("user-agent") ?? "";
  if (request.method === "GET" && !ROBO.test(navegador)) {
    const caminho = request.nextUrl.pathname.replace(/(.)\/$/, "$1"); // "/servicos/" → "/servicos"
    event.waitUntil(
      contarPagina({
        caminho: CONHECIDOS.has(caminho) ? caminho : "(outra)",
        origem: dominioDe(request.headers.get("referer"), request.nextUrl.host),
        celular: /Mobi|Android/i.test(navegador),
        ip: (request.headers.get("x-forwarded-for") ?? "").split(",").at(-1)?.trim() ?? "", // A CONFIRMAR atrás do proxy
        navegador,
      }).catch(() => {}), // a contagem nunca derruba a página
    );
  }
  return NextResponse.next();
}

/** Só o domínio de origem, e só se for de fora do site; o endereço completo pode ter dado pessoal. */
function dominioDe(referer: string | null, host: string) {
  try {
    const sem = (h: string) => h.replace(/^www\./, "").split(":")[0]; // sem o www e sem a porta
    const origem = sem(new URL(referer ?? "").hostname);
    return origem && origem !== sem(host) ? origem : null;
  } catch {
    return null;
  }
}

export const config = {
  matcher: [
    {
      // Páginas: nada de _next, de arquivo com extensão, da área restrita nem do cancelamento.
      source: "/((?!_next/|api/|painel|cancelar|.*\\.[a-z0-9]+$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
```

```sql
-- O agregado do dia: é o que fica. Nenhuma coluna guarda IP, navegador ou endereço de origem completo.
CREATE TABLE acesso_do_dia (
  dia DATE NOT NULL,
  caminho VARCHAR(191) NOT NULL,
  origem VARCHAR(100) NOT NULL DEFAULT '',   -- só o domínio; '' = direto ou do próprio site
  celular BOOLEAN NOT NULL,
  vistas INT UNSIGNED NOT NULL,
  PRIMARY KEY (dia, caminho, origem, celular)
);
-- O visitante do dia: hash com o sal do dia, apagado na virada. Só a contagem sobrevive.
CREATE TABLE visitante_do_dia (
  dia DATE NOT NULL,
  hash CHAR(64) NOT NULL,
  PRIMARY KEY (dia, hash)
);
CREATE TABLE visitantes_por_dia (
  dia DATE PRIMARY KEY,
  visitantes INT UNSIGNED NOT NULL
);
-- Tarefa diária (cron do hPanel), logo depois da meia-noite UTC. Pode rodar de novo sem erro: se a primeira
-- rodada parar no meio, a segunda refaz a contagem, e o sal e os hashes do dia ainda são apagados.
-- A tabela derivada permite referir a contagem no ON DUPLICATE KEY UPDATE de um SELECT agrupado (MySQL 8 e MariaDB).
-- [NV: SQL lido, não executado; conferir num MySQL ou MariaDB de teste]
--   INSERT INTO visitantes_por_dia (dia, visitantes)
--     SELECT * FROM (SELECT dia, COUNT(*) AS n FROM visitante_do_dia WHERE dia < UTC_DATE() GROUP BY dia) AS t
--     ON DUPLICATE KEY UPDATE visitantes = t.n;
--   DELETE FROM visitante_do_dia WHERE dia < UTC_DATE();
--   DELETE FROM sal_do_dia WHERE dia < UTC_DATE();
```

**A base legal e o aviso.**
- **Base legal:** legítimo interesse (LGPD, art. 7º, IX), declarado no aviso de privacidade, com o teste de legítimo interesse registrado [NV: o formato do teste, com o advogado].
- **Banner:** nenhum, porque nada é gravado no aparelho.
- **Prazo:** os agregados não identificam ninguém e podem ficar 25 meses, para comparar o mesmo mês de dois anos (RATIFICADO).

**O custo.**
- Uma dependência (`mysql2`, a mesma do formulário).
- Uma gravação por abertura de página.
- O teste de que a pré-carga não conta.
- Ganha o relatório com aberturas de página e origem. Perde a simplicidade de não ter código de contagem.

**Como conferir, se adotada.**
- **Teste de ponta a ponta,** com um `userAgent` de navegador comum no contexto do Playwright (o do Chrome sem janela diz `HeadlessChrome` e é tratado como robô, o que também deixa a régua fora da contagem):
  - abrir uma página soma 1;
  - passar o ponteiro sobre um vínculo (a pré-carga) não soma;
  - navegar pelo menu até uma página estática não soma (ela veio da pré-carga);
  - pedir uma imagem não soma;
  - um navegador declarado como robô não soma;
  - abrir um endereço fora do mapa do site (`/admin`) soma em `"(outra)"`, e abrir o vínculo de cancelamento da Agenda não grava nada: nenhuma linha da tabela leva o código.
- **Teste do banco:** nenhuma coluna aceita um IP; a tabela do dia anterior fica vazia depois da tarefa; a tarefa rodada duas vezes no mesmo dia não dá erro nem duplica a contagem.
- **Régua, bloco 5:** nenhum cookie e nenhuma gravação no aparelho.

---

## 8. Para o advogado

**O Marco Civil da Internet** (Lei 12.965/2014, art. 15) manda o provedor de aplicações constituído como pessoa jurídica, que exerce a atividade de forma organizada, profissional e com fins econômicos, guardar os registros de acesso (IP, data e hora) por **6 meses**, sob sigilo. A janela de 7 dias do painel da Hostinger não cobre isso. Há três perguntas:
1. O site de um comércio local é "provedor de aplicações" nesse sentido?
2. Se for, quem guarda o registro: a hospedagem, o cliente ou o Atlas, como operador?
3. Como conciliar isso com "o IP nunca é gravado" da contagem da seção 7? A contagem não substitui o registro de acesso; seriam coisas separadas.

A pergunta está em `../17-conformidade-e-normas.md` (seção 3.5, com o texto do artigo, e seção 10, na lista do advogado). Até a resposta, **nenhuma guarda própria**: guardar IP é guardar dado pessoal, e a guarda sem obrigação também é risco.

---

## 9. Como conferir, em resumo

| Verificação | Quando |
|---|---|
| A leitura semanal feita, com captura, toda segunda-feira | Toda semana; o relatório entra na janela mensal (`../18-publicacao-e-manutencao.md`, seção 7.3), com o suporte ao cliente |
| O relatório começa pelo método e não chama pedido de visita nem IP de pessoa | Revisão antes de enviar ao cliente |
| Os 404 do próprio site, corrigidos na semana | Toda semana |
| Nenhum rastreador, cookie ou pedido externo no site | Régua, bloco 5, a cada publicação |
| O Analytics aparece para o web app Node | Uma vez, no primeiro site [P] publicado (A CONFIRMAR) |
