# 10 · Texto e conteúdo

> **Para que serve.** Escrever o texto do site — títulos, parágrafos, botões, erros, metadados, texto alternativo — no registro do Atlas, dentro do que a ata e os conselhos permitem, e guardá-lo como dado tipado, separado do código de tela.
>
> **Quando ler.** Ao escrever o conteúdo (etapa de conteúdo, `01-processo.md`), ao revisar e sempre que um texto novo entrar.
>
> **Depende de.** `02-briefing.md` (os fatos do cliente), `nichos/<nicho>.md` (o que o conselho veda no texto), `17-conformidade-e-normas.md`, `11-anti-ia.md` (o texto que soa a modelo).
>
> **Atualizado em:** 03.11.2026: o texto para o cliente, sem bastidores, e a palavra do que se mede (seção 1). Antes, 16.10.2026: o título que diz o que se vende e onde, a definição no início e a cópia decorativa fora do HTML (seções 9 e 10; `21-busca-e-ias.md`). Antes, 08.10.2026.

---

## 1. O registro

**Regra.** Texto **impessoal, simples e moderadamente formal**, sem gíria nem intimidade:
- **no site do Atlas, a agência nunca é sujeito** ("O rascunho chega em 24 horas", não "Nós entregamos em 24 horas");
- **nos sites de cliente e de exemplo,** o registro impessoal vale do mesmo modo: sem coloquialismo e sem superlativo sem prova (`contextos/atlas--contexto-02-nichos.md`, seção 2, no repositório do Atlas);
- **a mensagem de WhatsApp que o site compõe** também é impessoal, e as dúvidas frequentes ficam em terceira pessoa, nunca na voz do cliente (`contextos/atlas--contexto-01-produto.md`, seção 2, no repositório do Atlas); no site do Atlas, revisto em 03.11.2026 (abaixo);
- **no atendimento presencial,** "o senhor" e "a senhora".
- **o público presumido** é de donos de comércio de 35 a 60 anos, que chegam pelo cartão ou por busca fria [NV: presunção, sem pesquisa]. É para ele que o texto é simples e específico, e não informal.

**Para o cliente, o que ele ganha, e não como se fez** (03.11.2026, pedido do usuário no site do Atlas: "textos mais direcionados ao cliente com linguagem simples"):
- **sem processo nem bastidores:** o texto diz o que muda para quem lê, e não a regra técnica, a ferramenta ou a fonte do desenho. No Atlas, a frase sobre a regra de segurança do site virou "O seu site sai igual: sem rastreador e sem aviso de cookies para o seu cliente aceitar." (`conteudo/paginas/inicio.ts`); a explicação do OpenStreetMap saiu da carta, e fica só o crédito que a licença exige (`conteudo/paginas/para-quem.ts`);
- **o termo técnico pelo que faz ao cliente:** "aviso de cookies", e não "banner de consentimento"; "extra", e não "módulo"; "dez testes", e não "dez blocos de verificação" (`conteudo/duvidas.ts`). O termo que fica vem depois do que ele faz: "o endereço próprio (o domínio)";
- **nenhum número que o site não mede:** a palavra é a do que o relatório conta. Se ele conta acessos, a frase diz "acessos", e não "visitas", que é outra conta. No Atlas, até 03.11.2026, o relatório mensal dizia "pedidos", que o leigo lê como encomendas (`conteudo/paginas/planos.ts`).

**No site do Atlas, desde 03.11.2026,** as respostas das dúvidas falam com o cliente ("você"), e a mensagem do WhatsApp vai na voz de quem a envia ("Olá! Vi o site do Atlas Digital e quero conversar sobre um site."), pelo mesmo pedido (`conteudo/duvidas.ts`, `conteudo/contato.ts`). É decisão do Atlas: nos sites de cliente, o registro acima continua.

**Objetivo.** O registro é parte do posicionamento: padrão de execução antes de preço, à maneira da Apple, sóbrio e verificável. **O calor vem da especificidade, nunca da informalidade:** "Corte na tesoura, 40 minutos, R$ 45" aquece mais que "Vem cortar com a gente!".

**Como conferir.**
- Ler em voz alta: nada soa como anúncio, nem como conversa de rede social.
- A régua lista o vocabulário vedado (bloco 10, aviso; `../qualidade/02-regua.md`).

**Divergência registrada.** As seções verbais do manual de marca v1 (de 15.08.2026) usam "a gente" e "você" e dizem "barato de manter" e "sem fidelidade". Estão revogadas na prática pelo registro atual e pela ata.

---

## 2. Cada fato uma vez

**Regra.** Cada fato aparece **uma vez** por página. A repetição só se admite na chamada à ação.

**Objetivo.** O defeito não é o excesso de palavras; é o mesmo fato ocupando vários blocos. Medido em setembro de 2026:
- a barbearia de exemplo dizia os **trinta anos** no título, no bento e em "o estúdio";
- a academia dizia os **seis alunos por turma** três vezes.
- na verificação de unicidade de 01.10.2026, no site do Atlas: aberturas de página que repetiam o título ou o lide da seção seguinte; a formação dos sócios, dita seis vezes; o índice das dúvidas, que repetia a lista que indexa; a régua do trabalho, que repetia os números das etapas; a porta "24 h", que repetia a capa; e, na nutrição, "48 h" ao lado de "dois dias úteis" para o mesmo prazo.

**As regras que resultaram.** A abertura de uma página não repete o título nem o lide da seção seguinte; o índice não repete a lista que indexa; e um fato tem uma só redação em todo o site (`../qualidade/10-conteudo-normas-e-texto.md`, seção 6).

**Não há teto de palavras** (decisão de Gabriel Ribeiro Ota Yida em 12.09.2026: o limite depende do nicho e do caso). "Economia não é secura": o modo de falha oposto ("Sócio: Gabriel Yida. Habilidade: desenvolver sites.") é pior.

**Como conferir.** Liste os números e os fatos de cada página; nenhum aparece duas vezes fora da ação. A régua, ao portar, pode acusar números repetidos (`../qualidade/10-conteudo-normas-e-texto.md`).

---

## 3. O tamanho dos períodos

**Regra.** Mediana de **até 14 palavras** por período; **nenhum período com mais de 28**.

**Objetivo.** Período curto se lê no celular, de pé, em trânsito.

**Como fazer.**
- **Enumeração numa oração só estoura o teto.** Aconteceu três vezes em setembro, sempre no aviso de degradação sem JavaScript. Quebrada em orações curtas, passa e se lê melhor.
- **Uma ideia por período;** a ressalva vai noutro.

**Como conferir.** A régua mede a mediana e lista os períodos acima de 28 palavras (bloco 10, aviso). Em 08.10.2026, O Atlas tinha mediana de 16: aviso aberto.

---

## 4. O vocabulário vedado

**Regra.** Fica fora do texto:

| Categoria | Exemplos | Por quê |
|---|---|---|
| **Preço baixo** | "barato", "imbatível", "menor preço", "preço baixo", "promoção" | A ata v3.0 (IV.1) veda o posicionamento por preço baixo. No texto do **Atlas** sobre si mesmo, o vocabulário certo é **"preço declarado", "sem surpresa"** e "preço justo". No site do **cliente**, "preço justo" só com prova (o que entra no preço, a comparação verificável); sem ela, é afirmação vazia (`nichos/oficina.md`, seção 7) |
| **Superlativo sem prova** | "o melhor", "líder", "número 1", "o mais completo" | Promessa que não se prova; os conselhos de saúde e a OAB vedam |
| **Popularidade sem fonte** | "mais escolhido", "o preferido" | O plano Profissional é **"recomendado"**, nunca "mais escolhido" (contexto comercial, no repositório do Atlas) |
| **Hedge** | "costuma", "geralmente", "pode ser que" | Reprovado duas vezes em setembro: enfraquece a afirmação e não diz nada |
| **Narrativa de dor e remate de contraste** | "Cansado de…?", "Chega de…" | A régua verbal de setembro vedava (ESTEIRA v2.0 e v2.1, de 12.09 e 30.09.2026, bloco 10, no repositório do Atlas). Manipula em vez de informar |
| **Intensificador** | "muito", "extremamente", "super", "realmente" | Também vedado pela régua verbal de setembro: pede ênfase em vez de dar o fato. O calor vem da especificidade (seção 1) |
| **Conector de ligação** | [NV] A fonte lista o termo sem exemplos; os usuais são "além disso", "dessa forma", "ademais" | Também vedado pela régua verbal de setembro (ESTEIRA v2.0 e v2.1, bloco 10, no repositório do Atlas). A definição e os exemplos são A CONFIRMAR com os sócios; até lá, a leitura humana procura o conectivo que só costura um período ao outro |
| **Segunda pessoa no site do Atlas** | "você", "seu negócio" | O registro é impessoal; o slogan ("Sua empresa online em 24h") era a única exceção decidida. Desde 03.11.2026, também as respostas das dúvidas e a frase para o leigo (seção 1) |
| **Palavras-moldura de IA** | "eleve", "transforme", "potencialize", "solução completa", "de ponta", "nível empresarial", "próxima geração" | Marca de texto gerado (Impeccable, `marketing-buzzword`) [FU] |
| **Aforismo em dois tempos** | "Não é um site. É uma vitrine.", "X. Sem Y." repetido em várias seções | A cadência de contraste fabricado é marca de texto gerado (Impeccable, `aphoristic-cadence`) [FU]. No site do Atlas, "Quatro etapas. Nenhuma delas opcional." e "A distância não está na lista. Está na tela." seguem essa cadência (linha de base, `11-anti-ia.md`) |
| **Travessão em excesso** | Vários travessões por parágrafo | Cadência de texto gerado, quando satura (Impeccable, `em-dash-overuse`) [FU]. Humano usa travessão; o problema é a saturação |
| **"Teatro"** | "não é teatro", "sem teatro" | Tique de texto gerado (Impeccable, `theater-slop-phrase`) [FU]. Diga o que a coisa faz ou não faz |
| **Urgência falsa** | "Últimas vagas!", contagem regressiva | "Urgência artificial" é vedada pelo registro da casa (contexto de produto, seção 2, no repositório do Atlas). A única escassez real é a da Condição de Fundação: três contratos (ata v3.0, IV.3) |
| **Emoji como ícone ou ênfase** | — | Vedado pelo registro da casa (contexto de produto, seção 2). O sistema de ícones é desenhado, num traço só (piso de ofício do Impeccable) [FU] |

**A ressalva da busca por palavra.** A busca acusa quem **declara a ausência** tanto quanto quem comete o ato: um site que diz "não publicamos antes e depois" é acusado pelo termo. Por isso, na régua, o vocabulário é aviso para ler, não falha automática.

---

## 5. O que o conselho veda no texto

**Regra.** Antes de escrever, leia a seção de normas de `nichos/<nicho>.md` e confira na fonte primária. **Conteúdo em português não significa norma brasileira**: texto copiado de referência estrangeira traz prática vedada aqui.

**Objetivo.** O site é publicidade do profissional, e o profissional responde ao conselho.

**O resumo** (detalhe e fontes em `nichos/` e em `17-conformidade-e-normas.md`):

| Nicho | No texto, é vedado | No texto, é obrigatório |
|---|---|---|
| Nutrição | Promessa de resultado (CFN 599/2018, art. 56); depoimento; linguagem de emagrecimento | Nome e CRN |
| Odontologia | Preço (Código de Ética, art. 44); superlativo; garantia; "especialista" sem título registrado | Nome e CRO |
| Medicina | Preço de procedimento (o da consulta pode); especialidade sem RQE; promessa de resultado | Nome e CRM; a especialidade só com o RQE; em estabelecimento, o diretor técnico (CFM 2.336/2023) [FU] |
| Psicologia | Preço como propaganda (o valor sóbrio pode; CFP 010/2005, art. 20, "d"); depoimento | O CRP visível (CFP 003/2007, art. 53) |
| Advocacia | Honorário; depoimento; comparação; estrutura física; captação | Nome do advogado e OAB (Provimento 205/2021) |
| Imobiliária | — | O CRECI junto do nome da imobiliária, onde ele aparecer, em pelo menos **25% do tamanho do nome** (COFECI 1.065/2007, arts. 2º e 5º) |
| Pet shop (com veterinário) | Preço de procedimento que pede avaliação; resultado garantido | O nome e o registro do responsável técnico (CFMV 1.649/2025, art. 4º, §3º) [FU] |
| Academia | Promessa de resultado no corpo | O registro profissional do educador físico (CONFEF 307/2015; Lei 9.696/1998) |
| Oficina | — | Orçamento por escrito antes do serviço, com validade de 10 dias (CDC, art. 40, §1º); o prazo legal de 30 ou 90 dias para reclamar do serviço (art. 26), que não é garantia: a garantia contratual exige termo escrito (art. 50; `nichos/oficina.md`) |
| Restaurante | — | Ver `nichos/restaurante.md` (cardápio, preço e alergênicos) |

---

## 6. As ausências declaradas

**Regra.** Cada site diz **o que o negócio não faz**. Nos sites de exemplo:
- **barbearia:** "O que não se faz aqui." — pacote ou fidelidade, taxa de cancelamento, venda de produto;
- **nutrição:** o plano alimentar "não [é] uma lista de proibições"; e a nota "Este site não exibe depoimento, avaliação, resultado de paciente nem fotografia de antes e depois", com a resolução do CFN que explica o porquê.

**Objetivo.** A ausência declarada responde à dúvida antes da mensagem e filtra o cliente errado. Nos nichos regulados, mostra também que a norma foi lida.

**Como fazer.**
- **Fonte.** As ausências vêm do campo "o que o negócio **não** faz" do briefing (`02-briefing.md`). Nunca se inventam.
- **Forma.** Cada ausência é um fato curto.
- **Lugar.** Na seção de serviços ou de valores.

---

## 7. O conteúdo tipado

**Regra.** Todo texto do site mora em **`conteudo/`**, como **dado tipado**, nunca em JSX. O componente só tem rótulos curtos de controle.

**Objetivo.**
- Mudar um texto é editar um arquivo, sem tocar na tela.
- O conteúdo inteiro se revisa num lugar só (contra o briefing e a norma).
- Os tipos derivados impedem um vínculo para uma página que não existe.

**Como fazer** (a forma do `web/conteudo/site.ts`, no repositório do Atlas):

```ts
// conteudo/site.ts — os textos do site, seção por seção.
// Registro: impessoal, moderadamente formal. Títulos são listas de linhas.

/** As páginas, na ordem do menu: o menu, o sitemap e a "próxima página" seguem esta lista.
 *  `titulo` sem a marca, salvo no início: o metadadosDaPagina (01-base-de-todo-site.md, seção 10) acrescenta
 *  " · Barbearia Santa Rosa". `tituloCurto` e `descricaoCurta` vão para o cartão do WhatsApp. */
export const paginas = [
  {
    id: "inicio",
    caminho: "/",
    menu: "Início",
    titulo: "Barbearia Santa Rosa · corte, barba e navalha em Niterói",
    tituloCurto: "Corte, barba e navalha em Santa Rosa",
    descricao: "Três cadeiras em Santa Rosa desde 1996. Preço e duração de cada serviço informados antes.",
    descricaoCurta: "Três cadeiras em Santa Rosa desde 1996.",
  },
  {
    id: "servicos",
    caminho: "/servicos",
    menu: "Serviços",
    titulo: "Serviços e preços",
    tituloCurto: "Serviços e preços",
    descricao: "Quatro serviços, com o preço e a duração de cada um.",
    descricaoCurta: "O preço e a duração de cada serviço.",
    abertura: { titulo: ["Quatro serviços,", "com preço e tempo."] },
  },
] as const;

export type IdDaPagina = (typeof paginas)[number]["id"];
export const paginaDe = (id: IdDaPagina) => paginas.find((p) => p.id === id)!;
```

**As regras do conteúdo tipado:**
- **`as const`** em toda lista, para os tipos saírem dela (`IdDaPagina`).
- **Título em lista de linhas** (`["Quatro serviços,", "com preço e tempo."]`): cada entrada é uma linha no desenho, sem `<br>` no texto.
- **Um arquivo por site**, e por área quando o site é grande (`conteudo/planos.ts`, `conteudo/duvidas.ts`). O que é comum aos sites de exemplo fica num `conteudo/demos/comum.ts` (o número fictício, o selo de ficção, o crédito).
- **Preço numa fonte só.** Os planos do Atlas leem de `conteudo/planos.ts` a tabela, o montador, os destaques da capa e os dados estruturados.
- **A ilha recebe só os campos que usa, nunca o objeto inteiro do site.** O objeto vai serializado no HTML de cada página. Até 03.10.2026, o estado da loja do depósito levava ~11 KB por página e o agendador da barbearia, ~6 KB; com só os campos usados, o HTML das 23 páginas ficou **73,5 KB menor**.

**O valor em reais tem espaço fixo.** `reais()` (`lib/moeda.ts`) separa "R$" do número por U+00A0: a linha nunca os parte. A base já faz, e o teste confere. O mesmo caractere vai aos dados estruturados (`priceRange`, `description`), ao `llms.txt` e à mensagem do WhatsApp; as palavras são as mesmas, e o efeito em busca não foi medido [I]. Quem compara o JSON-LD byte a byte espera essa diferença.

---

## 8. Títulos, botões, erros e estados

| Peça | Regra | Exemplo bom | Exemplo ruim |
|---|---|---|---|
| **Título** | Diz o conteúdo, com a palavra-chave na frente | "Corte e barba: R$ 70, em 50 minutos" | "Conheça nossos serviços" |
| **Botão** | Diz o que acontece ao tocar; o mesmo nome em todo o fluxo | "Montar orçamento" → "Preparar mensagem" → "Copiar" → "Copiado" | "Enviar", "Saiba mais", "Clique aqui" |
| **Falha** | Diz o problema e a saída, sem pedir desculpa, sem vagueza | "Cópia indisponível. O texto continua à vista para copiar à mão." | "Ops! Algo deu errado :(" |
| **Erro de página** | O que houve e o caminho de volta | "Esta página não abriu. Um erro interrompeu a página. O restante do site continua no lugar." + "Tentar de novo" + "Voltar ao início" | A tela padrão do Next, em inglês |
| **404** | Linguagem simples, saídas claras (NN/g) | "Esta página não existe. O endereço pode ter mudado, ou foi digitado com algum caractere a mais." | "404 Not Found" |
| **Vazio** | Convite à ação, não lamento | "Nenhum horário escolhido. Escolha o serviço para ver os horários livres." | "Nada aqui." |
| **Carregando** | Mantém o rótulo; a espera aparece depois de 150–300 ms (Vercel) | O botão com as barras de espera ao lado do rótulo | O rótulo trocado por "Carregando…" |
| **Campo de formulário** | Rótulo visível; obrigatório e opcional marcados (Baymard) | "Nome (obrigatório)", "Bairro (opcional)" | Placeholder no lugar do rótulo |
| **Confirmação de envio** | Diz o que acontece e o prazo de resposta | "Pedido enviado. A resposta chega em até 1 dia útil, pelo WhatsApp." | "Obrigado!" |

**A confirmação só diz o que aconteceu.** Até 03.10.2026, o montador do Atlas dizia "Copiado" mesmo quando o navegador recusava a área de transferência. O estado diz a verdade (`09-movimento.md`, os gestos).

---

## 9. Texto alternativo e texto só para leitor de tela

**Regra.**
- **Imagem informativa:** `alt` que descreve o que ela mostra.
- **Imagem decorativa:** `alt=""`.
- **Controle com ícone:** nome acessível (texto `sr-only` ou `aria-label`).
- **Cópias decorativas de texto** (as camadas do Spell UI, as letras que rolam): ficam fora da árvore de acessibilidade (`aria-hidden="true"`), fora dos trechos da busca (`data-nosnippet`) e fora da seleção (`user-select: none`). **Desde 16.10.2026, a cópia vem do CSS** (`content: attr(data-texto)`), e não repetida no HTML: o `data-nosnippet` só vale para o Google, e o robô de IA que lê o HTML lê a palavra duas vezes (`14-funcionalidades/01-base-de-todo-site.md`, seção 19, onde está a pendência dos gestos do kit).

**Objetivo.** O leitor de tela lê o que a tela mostra, uma vez. Uma cópia decorativa sem `aria-hidden` faz o título ser lido duas vezes; uma animação por letra mal feita corrompe o título acessível sem mudar nada na tela. Um em cada sete dos 46 sites medidos tinha defeito assim, invisível na tela (`nichos/analises/atlas--indice-pesquisa.md`, no repositório do Atlas).

**Como conferir.** A régua compara o `h1` lido com o `h1` desenhado (bloco 3).

---

## 10. Metadados e o cartão do WhatsApp

**Regra.** Cada página tem:
- `<title>` e `meta description` **distintos** dos das outras páginas;
- `og:title`, `og:description` e `og:image`;
- endereço canônico.

O texto segue as regras do cartão do WhatsApp.

**Objetivo.** O vendedor e o cliente mandam o endereço pelo WhatsApp; sem as marcações, o cartão chega cru. Em setembro de 2026 elas faltavam no próprio site do Atlas, e em 07.10.2026 faltavam nos três sites de exemplo (corrigido).

**Como fazer** (orientações da Meta para o cartão do WhatsApp, https://developers.facebook.com/documentation/business-messaging/whatsapp/link-previews/ [V]):
- **`og:title` sem a marca:** o nome do site já vai no `og:site_name`.
- **`og:description` de ~80 caracteres:** o essencial nos primeiros 80. A `meta description` da busca pode ser mais longa, desde que comece pelo mesmo essencial.
- **`og:image`:** menor que 600 KB, com 300 px de largura ou mais, sem passar de 4:1 de proporção. O recomendado é 1200 × 630 (1,91:1) [FU].
- **O `<head>` dentro dos primeiros 300 KB do HTML.**

**Os títulos** seguem o padrão "Página · Marca" no `<title>` ("Corte e barba em Santa Rosa · Barbearia Santa Rosa"), e "Marca · o que faz, onde" no início. No `conteudo/site.ts` (seção 7), o `titulo` vai **sem a marca**, salvo no início: o `metadadosDaPagina` a acrescenta, e um título que já a trouxesse sairia com ela duas vezes ("Corte e barba em Santa Rosa · Barbearia Santa Rosa · Barbearia Santa Rosa"). Cada página leva também o `tituloCurto` e a `descricaoCurta`, que vão para o cartão do WhatsApp.

**Busca local:** o serviço, o bairro e a cidade aparecem no título e na descrição do início ("corte, barba e navalha em Niterói").

**O título de cada página interna diz o que ela tem** e, quando cabe, o serviço e o lugar, com "· Marca" no fim ("Valores da consulta em Icaraí · Nutrição Icaraí"). **Nunca só o rótulo do menu** ("Onde", "Sobre", "Orçamento"): o rótulo serve ao menu; o título, à busca e à resposta da IA, que o mostram sozinho. Até cerca de 60 caracteres com o "· Marca" [NV: prática de busca]. A auditoria do site do Atlas (16.10.2026) achou "O Atlas · Atlas Digital" e "Orçamento · Atlas Digital": nenhum título interno dizia "sites" nem "Niterói" (`21-busca-e-ias.md`, seção 4).

- **O `titulo` é também o `h1`** (a base usa o mesmo campo nas duas coisas, como em `app/servicos/page.tsx`): escreva-o para servir às duas, com o serviço e o lugar ("Valores do banho e da tosa no Fonseca", na base), e confira a quebra do `h1` na mesa e a 390 px. Só quando o `h1` pedir outra forma, separe-o num campo próprio de `conteudo/site.ts` e registre no `decisoes.md`.
- **Em vigor desde 16.10.2026,** como parte do pedido do usuário de aparecer nas buscas e nas IAs; a base de fábrica já a cumpre. O aprovador (Matheus Castro Oliveira de Luna Garcia) pode rever a redação (`99-rastreabilidade.md`, seção 8, pendência 6); até lá, a lista da seção 13 a cobra.

**A busca e as respostas de IA** (DECIDIDO em 16.10.2026, em todo plano; `21-busca-e-ias.md`, seção 6):
- **A definição no início:** o nome do negócio, o que ele faz e onde, em texto, nas primeiras linhas da página inicial. O aposto basta, sem frase de efeito ("Barbearia Santa Rosa: corte, barba e navalha em Santa Rosa, Niterói."); no site do Atlas, ele respeita a regra de que a agência nunca é sujeito;
- **o essencial no topo e os fatos afirmados direto,** com os números concretos (o preço, o prazo, o horário) em texto (Bing, diretrizes de 02.2026) [FU];
- **o nome de cada coisa igual em toda parte** (o negócio, o serviço, o bairro), como o nome, o endereço e o telefone (`14-funcionalidades/01-base-de-todo-site.md`, seção 6);
- **um assunto por página;**
- **não se picota o texto "para a IA"** nem se enche de palavra-chave: o Google diz que não é preciso escrever de um jeito próprio para a busca com IA (10.07.2026) [V], e no estudo controlado de Aggarwal et al. (KDD 2024) o enchimento de palavra-chave piorou a visibilidade [FU].

A implementação (o `metadadosDaPagina`, o cartão de compartilhamento capturado da primeira tela, os dados estruturados) está em `14-funcionalidades/01-base-de-todo-site.md`.

---

## 11. O que a ata exige do texto

**Regra.** Nenhum texto do site do Atlas ou de cliente afirma o que a ata e os documentos não sustentam.

| Regra | Fonte |
|---|---|
| **Ordem do argumento:** padrão de execução → eficiência → preço declarado; nunca alardeado | Ata v3.0, IV.1 |
| **Nada de CNPJ, nota fiscal ou registro que não existe.** O Atlas não tem CNPJ; um cliente sem registro também não declara | Ata v3.0, III.2, item 2 |
| **O slogan "Sua empresa online em 24h"** quer dizer "primeiro rascunho navegável em até 24 horas após o briefing completo". Nunca site publicado em 24 horas. A publicação ocorre entre sete e quinze dias úteis | Ata v3.0, IV.4 |
| **A formulação de apoio do slogan**, do manual de identidade visual v3.1 (seção 4): "Primeiro rascunho navegável em 24 horas após o briefing — publicação após sua aprovação." | Contexto comercial, §3 |
| **Fora do texto enquanto não houver decisão:** "sem fidelidade" e garantia (regras de vigência indefinida); titularidade do domínio e entrega dos arquivos (em consulta ao contador); "mais escolhido"; número de mercado sem fonte | `web/CLAUDE.md`, no repositório do Atlas |
| **A Condição de Fundação** em "50%" na criação; em reais, não, porque os valores estão "a confirmar" | Contexto comercial, §2 |

**Nos sites de cliente:** nada que o cliente não tenha confirmado no briefing — nem número, nem prêmio, nem ano de fundação, nem depoimento. **Depoimento inventado é vedado** sempre, e depoimento real é vedado em vários conselhos.

**Quatro números de mercado suspensos.** Constaram do contexto comercial até 28.08.2026, sem fonte citada (`[SEM FONTE]` no original), e não entram em texto de site nem em peça comercial até haver verificação [NV]:
- 79% dos compradores B2B apontariam o estudo de caso como o conteúdo mais influente na decisão;
- páginas com estudos de caso detalhados converteriam "até 70%" melhor que páginas apenas com depoimentos;
- dados específicos e verificáveis elevariam a credibilidade em 43%;
- a especificidade persuadiria porque um número exato parece menos tirado do ar (afirmação qualitativa, sem referência).

A conclusão prática não depende deles: sem cliente não há prova, e prova inventada é vedada (contexto comercial, §5).

---

## 12. O crédito e o selo

**Regra.**
- **[cli] Site de cliente:** leva só um crédito em texto no rodapé: "Site por Atlas Digital". Sem logotipo do Atlas.
- **[ex] Site de exemplo:** leva o selo de ficção e o crédito do plano:
  - selo: "Estabelecimento fictício, criado pela Atlas Digital para demonstração. Nenhum pedido é processado e nenhum dado é coletado nesta página.";
  - crédito: "Site do plano Profissional, feito pela Atlas Digital.".

**Objetivo.** No cliente, o site é dele, e o crédito é discreto. No exemplo, ninguém pode tomar o estabelecimento fictício por real (`17-conformidade-e-normas.md`).

**Como conferir.** A régua reprova o site de exemplo sem o selo ou sem `noindex` (bloco 9).

---

## 13. Lista de conferência

1. Registro impessoal e moderadamente formal; nenhuma intimidade; o calor está nos fatos específicos. O texto diz o que o cliente ganha, sem bastidores; o termo técnico, pelo que faz; o número, pela palavra do que se mede.
2. Cada fato uma vez por página; nenhuma repetição fora da ação.
3. Mediana de até 14 palavras por período; nenhum acima de 28.
4. Nenhum termo da tabela da seção 4; nenhum aforismo em dois tempos repetido; nenhum excesso de travessões.
5. As vedações e as obrigações do conselho do nicho conferidas na fonte primária.
6. As ausências declaradas vêm do briefing.
7. Todo texto em `conteudo/`, tipado com `as const`; as ilhas recebem só os campos que usam.
8. Títulos com a palavra-chave na frente; botões que dizem a ação; o mesmo nome no fluxo inteiro.
9. Falhas que dizem o problema e a saída; páginas de erro e 404 em português.
10. Texto alternativo nas imagens informativas; vazio nas decorativas; cópias decorativas fora da acessibilidade, da busca e da seleção.
11. Título e descrição distintos por página; `og:` completo; descrição com o essencial nos primeiros 80 caracteres; nenhum título interno que seja só o rótulo do menu; o início diz, em texto, o nome, o que o negócio faz e onde.
12. Nada de CNPJ, nota fiscal, registro inexistente, número sem fonte nem depoimento inventado.
13. Crédito discreto no cliente; selo de ficção e crédito do plano no exemplo.

---

## Fontes citadas

- Meta, prévia de vínculos no WhatsApp: https://developers.facebook.com/documentation/business-messaging/whatsapp/link-previews/
- NN/g, a página 404: https://www.nngroup.com/articles/improving-dreaded-404-error-message/
- Baymard, campos obrigatórios e opcionais; validação: https://baymard.com/blog/required-optional-form-fields · https://baymard.com/blog/inline-form-validation
- Vercel, diretrizes de interface: https://vercel.com/design/guidelines
- Impeccable: https://github.com/pbakaus/impeccable
- CFN 599/2018: https://cfn.org.br/wp-content/uploads/resolucoes/Res_599_2018.html
- CFM 2.336/2023: https://portal.cfm.org.br/noticias/cfm-atualiza-resolucao-da-publicidade-medica
- CFMV 1.649/2025 (cópia secundária): https://www.legisweb.com.br/legislacao/?id=479765
