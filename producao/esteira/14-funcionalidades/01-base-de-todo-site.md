# Base de todo site

> **Para que serve.** O que **todo** site do Atlas tem, em qualquer plano e em qualquer nicho, com a implementação de referência. É o piso: um site sem um destes itens não está pronto, por menor que seja o plano.
>
> **Quando ler.** No começo da construção, antes das funcionalidades do plano. A régua (`../../qualidade/02-regua.md`) cobra boa parte deste documento.
>
> **Depende de.** `README.md` (a regra geral de toda funcionalidade), `../13-tecnologia-e-estrutura.md` (estrutura e convenções), `../17-conformidade-e-normas.md`.
>
> **Implementação de referência.** No repositório do Atlas: `web/lib/whatsapp.ts`, `web/conteudo/demos/comum.ts`, `web/components/ilhas/demos/estado-da-loja.tsx`, `web/lib/metadados.ts`, `web/lib/dados-estruturados.ts`, `web/app/not-found.tsx`, `web/app/error.tsx`, `web/app/global-error.tsx`, `web/components/ilhas/controle-do-movimento.tsx`, `web/components/ilhas/ancoras.tsx`, `web/components/ilhas/menu-celular.tsx`, `web/app/layout.tsx`. O código necessário está copiado abaixo; no repositório novo, esses caminhos não existem.
>
> **Atualizado em:** 16.10.2026: a busca e as respostas de IA em todo site, de qualquer plano (seções 11 a 13 e a nova 19; `../21-busca-e-ias.md`; pedido do usuário de 16.10.2026). O código está na base (`../../base/`). Antes, 08.10.2026.

---

## 1. O vínculo do WhatsApp com a mensagem pronta [todos]

**Regra.** A ação principal de todo site é uma conversa no WhatsApp, aberta com uma mensagem já escrita. O vínculo:
- aparece na primeira tela do celular, até 60% da altura;
- repete-se no cabeçalho (na mesa), no contato e no rodapé;
- **na página cujo assunto é a própria ação** (o pedido de avaliação, o orçamento, a marcação), a ação do fim não se repete; e dois vínculos com mensagens diferentes nunca levam o mesmo rótulo (achado do teste de 08.10.2026: três botões iguais, com três mensagens);
- abre em outra aba (`target="_blank"` com `rel="noopener noreferrer"`);
  e avisa: o nome acessível termina em ", abre em nova aba", em texto só para leitor de tela (RATIFICADO; a auditoria técnica de 07.10.2026 achou o aviso ausente no Atlas);
- tem texto visível que diz o que acontece ("Chamar no WhatsApp", "Agendar pelo WhatsApp", "Enviar a lista pelo WhatsApp"), com o ícone oficial ao lado e `aria-hidden` no ícone.

**Objetivo.**
- **Canal:** o pequeno negócio de Niterói atende pelo WhatsApp; ~80% dos usuários brasileiros falam com empresas pelo aplicativo (Opinion Box e Infobip, 2021, n = 2.038) [FU].
- **Mensagem pronta:** tira o atrito da primeira frase e diz ao balcão de onde veio o contato.
- **Sem servidor:** nada passa por servidor nem é coletado pelo site; o vínculo é navegação, que a política de conteúdo não restringe.

**Como fazer.** O formato é `https://wa.me/<número>?text=<mensagem>`. O número leva só algarismos — código do país (55), DDD e número, sem `+`, espaço, parêntese nem hífen (https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat/) [FU] — e a mensagem vai com `encodeURIComponent`.

A referência do Atlas (`web/lib/whatsapp.ts`, `linkWhatsApp`) lê o número de uma constante e não o confere. A versão abaixo (RATIFICADO) acrescenta a conferência do formato, para que um número digitado errado no conteúdo pare o build em vez de publicar um vínculo que não abre.

```ts
// lib/whatsapp.ts — o vínculo do WhatsApp com a mensagem já escrita. Nada passa por servidor.

/** Número brasileiro no formato do wa.me: 55 + DDD (2) + número (8 ou 9 algarismos). */
const FORMATO = /^55\d{10,11}$/;

export function vinculoDoWhatsapp(numero: string, mensagem?: string) {
  const algarismos = numero.replace(/\D/g, "");
  // Falha no build (a página é pré-renderizada) e no teste, não no aparelho do cliente.
  if (!FORMATO.test(algarismos)) throw new Error(`WhatsApp fora do formato 55DDDNNNNNNNN: "${numero}"`);
  const base = `https://wa.me/${algarismos}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}
```

**A mensagem:**
- **Registro:** é a voz de quem envia, curta, cortês e sem gíria. Nos sites de exemplo: "Olá. Gostaria de agendar uma consulta." (nutrição), "Olá. Gostaria de um orçamento de material." (depósito). O site do próprio Atlas usa o impessoal ("Contato solicitado pelo site."). Cada site escolhe um registro e o mantém em todas as mensagens.
- **O que leva:** o que a funcionalidade já sabe — o serviço, o profissional, o dia, a medida, a lista —, para o balcão responder sem perguntar de novo. Exemplo do pedido de horário da barbearia de exemplo: "Olá. Gostaria de agendar: O Clássico, com Téo da Silva, sexta de manhã."
- **O que nunca leva:** dado pessoal pré-preenchido pelo site (nome, telefone). A pessoa escreve o que quiser na conversa.
- **Sem quebras de linha** quando a mensagem é curta. Lista longa (a da calculadora) usa `\n`, que o `encodeURIComponent` codifica.

**Onde o número mora.**
- **Uma constante só**, no conteúdo (`conteudo/contato.ts`), num módulo mínimo que as ilhas importam sem arrastar o texto do site inteiro para o script.
- **No site de exemplo [ex]**, o número é fictício: `5521900000000`, mostrado como "(21) 90000-0000". O vínculo abre o WhatsApp sem destinatário real.

**O atalho flutuante** [P][C] (o botão que flutua sobre o texto no celular):
- aparece só **depois** da primeira tela;
- recolhe ao rolar para baixo e volta ao rolar para cima: responde à direção, nunca à posição;
- some quando a ação já está à vista (a capa, o montador);
- some a partir de 1024 px;
- alvo de 44 px;
- sem script, fica oculto (o vínculo da página continua lá).

Implementação de referência: `web/components/ilhas/acao-flutuante.tsx`, no repositório do Atlas. *Objetivo:* a ação ao alcance do polegar sem cobrir o que se lê. A versão de 01.10 cobria o texto, observava só os alvos da primeira página e entrava sem passagem; foi corrigida pela regra de direção, e o atalho observa as ações de toda página (a capa, o montador), e não só as da primeira.

**Como conferir.**
- A régua (bloco 6) avisa quando nenhuma ação aparece até 60% da primeira tela do celular.
- O teste de ponta a ponta abre o vínculo e confere o `href` (algarismos, `text=` codificado).
- [cli] O teste de conteúdo reprova o número fictício (`5521900000000`) num site de cliente: os exemplos desta esteira usam esse número, e ele não pode chegar ao ar por descuido.
- O teste de unidade passa por `vinculoDoWhatsapp` um número com máscara (`"+55 (21) 90000-0000"`), um número curto (falha) e uma mensagem com acento, quebra de linha e `&` (codificados).

**Varia por.** A mensagem e o rótulo, por nicho (`../nichos/<nicho>.md`). **Psicologia:** a mensagem não leva o motivo da consulta, para não registrar dado sensível na conversa por padrão.

---

## 2. O telefone [todos]

**Regra.** O telefone aparece como texto legível ("(21) 90000-0000", com algarismos tabulares) e como vínculo `tel:+5521900000000`. Fica ao lado do WhatsApp, nunca no lugar dele: no contato, em Onde e no rodapé, e também na primeira tela quando o negócio atende por telefone (o briefing diz; a lista de revisão, item 21, segue esta regra).

**Objetivo.** Quem prefere ligar — o público de 35 a 60 anos que chega pelo cartão — liga com um toque. A NN/g recomenda o telefone sempre visível no contato (https://www.nngroup.com/articles/contact-us-pages/) [V].

**Como fazer.** `<a href="tel:+5521900000000">(21)&nbsp;90000-0000</a>`, com `font-variant-numeric: tabular-nums` (`tabular-nums` no Tailwind) e espaço sem quebra (`&nbsp;`) entre o DDD e o número, para não partir a linha. Na base, o `telefoneVisivel` já põe o espaço sem quebra (corrigido em 08.10.2026), e o texto inteiro ("WhatsApp (21) 90000-0000") leva `whitespace-nowrap`.

**Como conferir.** O teste confere o `href` (`tel:+55…`, só algarismos depois do `+`).

---

## 3. O endereço e o mapa [todos]

**Regra.**
- **Texto:** o endereço completo vai num `<address>`, com vínculo para o mapa externo como **navegação**.
- **Mapa:** quando há um, é **desenhado**: o bairro em vetor (SVG), a partir de dados abertos, servido pelo próprio site.
- **Nunca `<iframe>` do Google Maps** nem mapa de terceiros carregado na página.

**Objetivo.**
- **Privacidade:** o `iframe` faz pedidos externos, grava cookies de terceiros e envia o IP do visitante para fora. A política de conteúdo do Atlas (`frame-src 'self'`) o bloqueia; o site perderia o "zero cookie" e passaria a precisar de banner (`../17-conformidade-e-normas.md`).
- **Peso:** o mapa embutido do Google pesa centenas de KB de script.
- **Identidade:** o mapa desenhado vira parte dela. Nenhum dos 46 sites de referência medidos em setembro usava, e ele é um dos substitutos de custo zero da figura desenhada, suspensa em setembro (contexto dos nichos, no repositório do Atlas).

**Como fazer: o vínculo para o mapa.** Monta-se a busca pelo endereço, que abre o aplicativo de mapas do aparelho ou o site:

```ts
/** Abre o mapa externo na busca pelo endereço (navegação: nenhum pedido sai desta página). */
export function vinculoDoMapa(endereco: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
}
```

É o formato das "Maps URLs" do Google (https://developers.google.com/maps/documentation/urls/get-started) [V]: o `api=1` é obrigatório (sem ele, os outros parâmetros são ignorados), o `query` leva o endereço codificado, e no celular o vínculo abre o aplicativo do Google Maps, se instalado, ou o navegador. O rótulo diz o que acontece: "Ver no mapa".

**Como fazer: o mapa desenhado.**
- **Fonte dos dados:** o OpenStreetMap. A licença ODbL exige o crédito "© colaboradores do OpenStreetMap", que vai na legenda do mapa [FU]; ou a base cartográfica aberta da Prefeitura de Niterói [NV: conferir licença e formato]. Nunca o decalque de um mapa do Google: os termos do Google Maps vedam criar dado cartográfico a partir do conteúdo deles [NV: conferir os termos vigentes].
- **Referências** (no repositório do Atlas, com bairros reais e desenho estilizado): o entorno de Santa Rosa, com o monograma como alfinete (`MapaDeSantaRosa`, barbearia); o bairro em papel de projeto, com o raio da entrega (`MapaDaEntrega`, depósito); o mapa gravado, com a baía em hachura (`MapaGravado`, nutrição). O traço segue a identidade de cada marca.
- **Recorte:** só o necessário — as ruas em volta, o ponto do estabelecimento, uma referência conhecida (a praça, a estação das barcas). Simplificado num editor vetorial e salvo como SVG estático, servido do próprio domínio.
- **Acessibilidade:** o SVG leva `role="img"` e um `aria-label` que diz o lugar em palavras ("Mapa: Rua Gavião Peixoto, entre a praia e a Rua Moreira César, em Icaraí"); o endereço em texto está ao lado. Sem os rótulos das ruas, o mapa é decorativo (`aria-hidden="true"`) e o texto basta.
- **Movimento** [P][C]: o traço das ruas pode se desenhar **uma vez**, na entrada (`stroke-dasharray` e `stroke-dashoffset`, CSS puro). Com movimento reduzido, o mapa já está desenhado (`../09-movimento.md`).
- **No Essencial** [E], o mapa desenhado entra na página do lugar, estático e sem movimento (`../03-planos.md`, seção 3.3; `README.md`, seção 2.1), com o vínculo para o mapa externo ao lado.

**Como conferir.**
- A régua (bloco 5) reprova qualquer pedido externo.
- O teste de ponta a ponta confere o vínculo do mapa.
- No mapa desenhado, quem revisa confere o crédito da fonte de dados na legenda.

**Varia por.**
- **Advocacia:** nunca foto nem desenho da estrutura física do escritório (Provimento 205/2021). O mapa da rua não mostra o imóvel, mas o desenho do edifício seria estrutura física.
- **Imobiliária:** o mapa do bairro vira ferramenta (a localização de cada imóvel; `07-funcionalidades-do-oficio.md`).

---

## 4. O horário de funcionamento [todos]

**Regra.**
- **Onde:** no início, no contato e no rodapé, ao lado do telefone.
- **Como:** numa lista de definição (`<dl>`) ou tabela, dia a dia, com os fechamentos ditos ("Domingo: fechado") e as exceções (feriados, férias coletivas) com data.
- **Formato:** "Seg. a sex., 7h às 18h; sáb., 8h às 13h"; horas sem ":00" quando cheias; os grupos separados por ponto e vírgula, nunca pelo ponto médio (marca K1, `../11-anti-ia.md`).
- **Os feriados:** o que a casa faz em cada um vem do briefing ("Feriados:"). As datas do ano saem das fontes oficiais — os feriados nacionais (gov.br), os do estado do Rio e os de Niterói (a prefeitura) — e entram em `fechamentos`, conferidas na etapa de conteúdo e refeitas na manutenção de janeiro (`../18-publicacao-e-manutencao.md`). Sem elas, o estado ao vivo diz "aberto agora" num feriado.

**Objetivo.** O horário é a segunda pergunta de quem procura um negócio local, depois do endereço (a ordem da página: o quê → onde → quando → quanto → contato). A NN/g recomenda o horário ao lado de cada canal de contato [V].

**Como fazer.** O horário mora no conteúdo, num formato só, que alimenta o texto, os dados estruturados (seção 11) e o estado ao vivo (seção 5):

```ts
// conteudo/negocio.ts — o expediente por dia da semana (0 = domingo), em horas e minutos de parede de São Paulo.
export type Faixa = { abre: string; fecha: string }; // "07:00", "18:00"
export const expediente: Record<0 | 1 | 2 | 3 | 4 | 5 | 6, Faixa[]> = {
  0: [],                                            // domingo: fechado
  1: [{ abre: "07:00", fecha: "18:00" }],
  2: [{ abre: "07:00", fecha: "18:00" }],
  3: [{ abre: "07:00", fecha: "18:00" }],
  4: [{ abre: "07:00", fecha: "18:00" }],
  5: [{ abre: "07:00", fecha: "18:00" }],
  6: [{ abre: "08:00", fecha: "13:00" }],           // sábado: só de manhã
};
/** Dias fechados fora da regra (feriados, recessos), em AAAA-MM-DD. */
export const fechamentos: { data: string; motivo: string }[] = [];
```

Mais de uma faixa no dia (o consultório que fecha para o almoço) é uma lista com duas faixas.

**Como conferir.** O teste de unidade gera o texto do horário a partir do `expediente`, inclusive o dia com duas faixas e o domingo fechado.

---

## 5. O estado ao vivo: "aberto agora" e o corte [P][C]

**Regra.** A navegação viva do Profissional pode dizer, no topo, se o estabelecimento está aberto agora, quando fecha ou quando abre, e quanto falta para um corte do dia (o "pedido até as 15h sai hoje" do depósito).

O cálculo usa **sempre o relógio de Niterói** (`America/Sao_Paulo`), nunca o fuso do aparelho de quem lê. Ele roda **só no aparelho**, depois da hidratação. Antes dela e sem script, a página mostra o horário escrito.

**Objetivo.** Responder "posso ir agora?" sem a pessoa fazer conta. Ela pode estar em outro fuso, ou com o relógio do aparelho errado, e por isso a conta não usa o fuso do aparelho.

**A lição do sábado** (achada em 03.10, corrigida em 07.10.2026). O marcador de "agora" da página de entrega do depósito usava a faixa de segunda a sexta também no sábado: aparecia sobre a linha dos dias úteis e continuava aceso depois de a loja fechar. **Regra que ficou:** o estado ao vivo lê a faixa **do dia da semana de Niterói**, e o que só vale em dia útil (o corte, a linha do caminhão) não aparece no fim de semana.

**Como fazer.** Para ler o dia e a hora de São Paulo, use `Intl.DateTimeFormat` com `formatToParts`. A referência do Atlas (`estado-da-loja.tsx`) converte por texto, `new Date(agora.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }))`: funciona nos navegadores atuais, mas depende de o `Date` ler um formato fora do padrão ISO, o que a especificação deixa a cargo de cada navegador. A versão abaixo (RATIFICADO) lê as partes:

```ts
// lib/agora.ts — a data, o dia da semana, a hora e o minuto de parede de Niterói, num instante qualquer.
const DIAS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 } as const;
const relogio = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Sao_Paulo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function agoraEmNiteroi(instante = new Date()) {
  const partes = Object.fromEntries(relogio.formatToParts(instante).map((p) => [p.type, p.value]));
  return {
    data: `${partes.year}-${partes.month}-${partes.day}`, // "2026-10-12": para conferir os fechamentos
    dia: DIAS[partes.weekday as keyof typeof DIAS],      // 0 = domingo
    minutos: Number(partes.hour) * 60 + Number(partes.minute),
  };
}
```

**O fuso pelo nome.** O fuso vai pelo nome (`America/Sao_Paulo`), nunca como "−03:00" fixo. O horário de verão está suspenso desde 2019, mas o governo ainda avalia a volta (https://diariodepernambuco.com.br/dpmais/governo-do-brasil-tomou-decisao-sobre-horario-de-verao-em-2026/) [FU]; com o nome, a base de fusos do navegador cuida disso.

```tsx
// components/ilhas/estado-da-loja.tsx — o estado ao vivo (resumido da referência do depósito).
"use client";
import { useEffect, useState } from "react";
import { agoraEmNiteroi } from "@/lib/agora";

type Faixa = { abre: string; fecha: string };

export function EstadoDaLoja({ expediente, fechamentos, semScript }: {
  expediente: Record<number, Faixa[]>;
  fechamentos: readonly { data: string; motivo: string }[]; // conteudo/negocio.ts: feriados e recessos
  semScript: string;
}) {
  const [agora, setAgora] = useState<ReturnType<typeof agoraEmNiteroi> | null>(null);
  useEffect(() => {
    const tique = () => setAgora(agoraEmNiteroi());
    tique();
    const intervalo = window.setInterval(tique, 30_000); // o estado muda com o relógio: a cada meio minuto basta
    return () => window.clearInterval(intervalo);
  }, []);
  // Antes da hidratação (e sem script), o horário escrito: o servidor não sabe a hora de quem lê.
  if (!agora) return <span>{semScript}</span>;
  // O fechamento vem antes da regra semanal: num feriado, a faixa do dia não vale.
  const fechado = fechamentos.find((f) => f.data === agora.data);
  if (fechado) return <span>{`Fechado hoje (${fechado.motivo})`}</span>;
  const emMinutos = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));
  const hora = (hhmm: string) => `${Number(hhmm.slice(0, 2))}h${hhmm.slice(3, 5) === "00" ? "" : hhmm.slice(3, 5)}`; // "07:00" → "7h"; "18:30" → "18h30"
  const faixas = expediente[agora.dia] ?? [];
  const aberta = faixas.find((f) => agora.minutos >= emMinutos(f.abre) && agora.minutos < emMinutos(f.fecha));
  return <span>{aberta ? `Aberto agora · fecha às ${hora(aberta.fecha)}` : "Fechado agora"}</span>;
}
```

**Detalhes que importam:**
- **Antes da hidratação, o texto fixo.** O estado só aparece depois dela; antes, `semScript`. Renderizar o estado no servidor causaria diferença de hidratação: o servidor e o aparelho veem horas diferentes.
- **Intervalo de 30 s.** O estado muda no máximo a cada minuto.
- **Sem `aria-live`** no estado: uma mudança a cada meio minuto anunciada pelo leitor de tela seria ruído.
- **Os fechamentos** (seção 4) entram antes da regra semanal: "Fechado hoje (feriado)". Por isso a ilha recebe `fechamentos`, e `agoraEmNiteroi` devolve também a **data** de Niterói, para compará-los: sem isso, num feriado em dia útil, a página afirmaria "Aberto agora", estado falso.
- **A hora no formato da seção 4:** "7h", e não "07h"; "18h30".
- **O "quando abre"** procura o próximo dia com faixa, na semana, e diz "abre amanhã, 7h" ou "abre seg., 7h" (a função pura de `../../qualidade/04-unidade.md`, seção 4.3; a ilha acima é o resumo, sem ele).
- **O lint do `react-hooks` 7** deve acusar o `setState` dentro do efeito (`set-state-in-effect`), como nas ilhas do Atlas (`../../qualidade/03-estatica.md`, seção 2) [NV: não rodado contra esta ilha].

**Como conferir.** A conta, isolada numa função pura, recebe instantes fixos em teste de unidade, com o fuso de São Paulo:
- sábado às 12h59 e às 13h01;
- domingo;
- segunda às 6h59;
- um feriado;
- 23h59 da sexta;
- um instante em UTC que já é sábado em UTC e ainda é sexta em São Paulo.

No teste de ponta a ponta, o relógio fixo do Playwright (`page.clock`) leva a página a um sábado à tarde.

**Varia por.**
- **Imobiliária e advocacia:** o estado ao vivo não é necessário (o atendimento é por marcação).
- **Restaurante:** fica bem perto do prato do dia.
- **Depósito:** é a funcionalidade 2 (`07-funcionalidades-do-oficio.md`).

---

## 6. Nome, endereço e telefone iguais em todo lugar [todos]

**Regra.** O nome do negócio, o endereço e o telefone (o "NAP", na sigla em inglês) são escritos **do mesmo jeito** em todo lugar:
- no início e no contato;
- no rodapé;
- nos dados estruturados (seção 11);
- no perfil da empresa no Google (`06-presenca.md`).

**Objetivo.** A busca local cruza essas fontes; divergência ("R. Gavião Peixoto, 000" num lugar, "Rua Gavião Peixoto 000 - sala 3" no outro) enfraquece a confiança do buscador e do visitante [NV: prática de SEO local, sem estudo citado].

**Como fazer.** Uma fonte só no conteúdo (`conteudo/negocio.ts`), de onde o texto, o rodapé e os dados estruturados leem. O endereço segue a forma dos Correios: logradouro, número, complemento, bairro, cidade, UF, CEP.

**Como conferir.** O teste de conteúdo (`../../qualidade/10-conteudo-normas-e-texto.md`) compara o texto do rodapé com o JSON-LD.

---

## 7. O registro do conselho [todos, nos nichos regulados]

**Regra.** Onde há conselho, o registro aparece **também no celular**: no cabeçalho, ou na primeira tela, e no rodapé, no corpo mínimo que a norma exigir. Sem quebra de linha (`whitespace-nowrap`): "CRO-" numa linha e "RJ 00000" na outra não se leem como um registro (teste de 08.10.2026).

| Nicho | O que aparece | Fonte |
|---|---|---|
| Medicina | Nome, CRM e a palavra "médico"; especialidade só com o RQE; o diretor técnico, no estabelecimento | CFM 2.336/2023 [FU nas reproduções; texto primário em https://sistemas.cfm.org.br/normas/arquivos/resolucoes/BR/2023/2336_2023.pdf] |
| Odontologia | Nome e CRO (da pessoa física ou da jurídica) e a palavra "cirurgião-dentista"; na clínica, também o nome e o CRO do responsável técnico | Código de Ética Odontológica, art. 43 [V, lido no PDF do CFO em 08.10.2026]; CFO-196/2019, art. 4º |
| Psicologia | Nome e CRP | CFP 003/2007, art. 53 |
| Nutrição | Nome e CRN | CFN 599/2018 |
| Advocacia | O nome do advogado ou da sociedade de advogados e o número de inscrição na OAB | Código de Ética e Disciplina da OAB, art. 44 [FU]; Provimento 205/2021 |
| Imobiliária | O CRECI (sigla e número) **junto do nome da imobiliária, onde ele aparecer, com no mínimo 25% do tamanho desse nome**. A leitura de setembro — 25% do `h1`, mesmo sem o nome — é mais restritiva que o texto (`../nichos/imobiliaria.md`, seção 3) | COFECI 1.065/2007, arts. 2º, § 2º, e 5º, b [V]; *a confirmar com advogado* |
| Pet shop com veterinário | Nome e número de registro do responsável técnico | CFMV 1.649/2025, art. 4º, §3º [FU] |
| Academia | CREF do responsável | CONFEF 307/2015 |

**Objetivo.** A credencial é a prova de que o profissional pode exercer, e o conselho a exige na publicidade. Medido em setembro: em 11 dos 12 demos estáticos, ela **sumia do cabeçalho abaixo de 480 px**, justo no aparelho de onde vem a maior parte do tráfego.

**Como conferir.**
- A régua (bloco 7, paridade) avisa o que existe na mesa e não existe no celular.
- Na imobiliária, a razão entre o corpo do CRECI e o do nome que ele acompanha é medida em cada lugar onde o nome aparece (≥ 0,25).

---

## 8. O prazo de resposta [todos]

**Regra.** O site publica em quanto tempo o contato é respondido ("Resposta em até 1 dia útil"), perto da ação principal e no contato. O prazo é campo obrigatório do briefing (`../02-briefing.md`), e quem o promete é o cliente.

**Objetivo.** A NN/g recomenda publicar o tempo de resposta — e cumpri-lo (https://www.nngroup.com/articles/contact-us-pages/) [V]. Nenhum dos doze demos de setembro o declarava. É barato e verificável.

---

## 9. O crédito do Atlas [cli] [ex]

**Regra.**
- **[cli]:** no rodapé, em texto: "Site por Atlas Digital". Sem logotipo do Atlas no site do cliente.
- **[ex]:** "Site do plano <Plano>, feito pela Atlas Digital." (`creditoDoPlano`), ao lado do selo de ficção (seção 13).

**Objetivo.** O site é do cliente: a marca dele manda. O crédito discreto serve à prospecção sem competir com a identidade.

---

## 10. Os metadados e o cartão de compartilhamento [todos]

*A regra técnica (o `metadataBase`, o canônico por página, o `sitemap`) está em `../13-tecnologia-e-estrutura.md`, seção 6. Aqui ficam o que o cartão diz e a versão com título curto para o WhatsApp.*

**Regra.** Cada página tem, **distintos das outras páginas do mesmo site**:
- `<title>`;
- `meta description`;
- `og:title`, `og:description` e `og:image`;
- `og:url` e `og:site_name`;
- `twitter:card` como `summary_large_image`.

O cartão (a imagem) tem 1200 × 630, em JPEG, **abaixo de 600 KB**.

**Objetivo.** O vendedor manda o endereço pelo WhatsApp. Sem as marcações, o cartão sai como endereço cru: faltavam no próprio site do Atlas em setembro e nos sites de exemplo até 07.10.

**O padrão do WhatsApp** (Meta, https://developers.facebook.com/documentation/business-messaging/whatsapp/link-previews/) [V]:
- imagem com menos de 600 KB, 300 px de largura ou mais e proporção até 4:1;
- o `<head>` inteiro nos primeiros 300 KB do HTML;
- título sem o nome da marca (a marca vai no `og:site_name`);
- descrição de ~80 caracteres.

**Para as redes em geral** [FU]: 1200 × 630, proporção de 1,91:1.

**Como fazer: os textos.**

| Campo | Regra | Exemplo |
|---|---|---|
| `<title>` | "Página · Nome do negócio", com a página dizendo o que tem e, quando cabe, o serviço e o lugar, nunca só o rótulo do menu (desde 16.10.2026: `../21-busca-e-ias.md`, seção 4); a página inicial, "Nome do negócio · o que faz em Niterói" | "Valores da consulta em Icaraí · Nutrição Icaraí" |
| `og:title` | A página, sem a marca | "Valores da consulta" |
| `og:site_name` | O nome do negócio | "Nutrição Icaraí" |
| `meta description` | Até ~155 caracteres [NV: prática de busca], o fato principal da página | — |
| `og:description` | ~80 caracteres (WhatsApp) | — |
| [ex] | O título termina em "· demonstração"; a descrição, em "Estabelecimento fictício." | "Valores da consulta em Icaraí · Nutrição Icaraí · demonstração" |

**Como fazer: a imagem.** É a primeira tela do próprio site em 1200 × 630, fotografada do build por uma ferramenta de captura. É o método de `web/ferramentas/capturar-simulador.mjs` no repositório do Atlas, que grava `public/simulador/<plano>-compartilhar.jpg` em JPEG de qualidade 80: 53 a 92 KB nos três sites de exemplo.
- **Ferramenta:** um Chrome sem janela, comandado pelo DevTools Protocol, sem dependência; ou pelo Playwright, já instalado para a régua (`../../qualidade/02-regua.md`).
- **Antes de fotografar,** espera-se a entrada da capa (e o 3D, quando há).
- **Primeira tela com estado ao vivo** ("Aberto agora", o corte da entrega): fotografe sem script (`node ferramentas/capturar-compartilhamento.mjs --sem-script`). A imagem é fixa, e o estado do minuto da foto ficaria escrito nela; sem script, a ilha mostra o texto que vale sempre.
- **Uma imagem por site basta.** O texto, não a imagem, distingue as páginas: a régua cobra título e descrição distintos, não imagem distinta.

**Como fazer: o código.**

```ts
// lib/metadados.ts — os metadados de uma página (Next 16, API Metadata).
import type { Metadata } from "next";
import { negocio } from "@/conteudo/negocio";

const cartao = { url: "/compartilhar.jpg", width: 1200, height: 630, alt: `${negocio.nome}: a primeira tela do site.` };

export function metadadosDaPagina(p: { titulo: string; tituloCurto: string; descricao: string; descricaoCurta: string; caminho: string }): Metadata {
  return {
    title: p.caminho === "/" ? p.titulo : `${p.titulo} · ${negocio.nome}`,
    description: p.descricao,
    alternates: { canonical: p.caminho },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: negocio.nome,
      url: p.caminho,
      title: p.tituloCurto,          // sem a marca: o WhatsApp mostra o site_name à parte
      description: p.descricaoCurta, // ~80 caracteres
      images: [cartao],
    },
    twitter: { card: "summary_large_image", title: p.tituloCurto, description: p.descricaoCurta, images: [cartao.url] },
  };
}
// Na página: export const metadata = metadadosDaPagina(paginaDe("servicos"));
// (os campos vêm de conteudo/site.ts, com o titulo sem a marca: ../10-texto-e-conteudo.md, seção 7)
```

**Uma versão só.** Esta é a única `metadadosDaPagina` da esteira (`../13-tecnologia-e-estrutura.md`, seção 6, remete a ela). O título que já trouxesse a marca sairia com ela duas vezes.

**Dois cuidados aprendidos no Atlas:**
- **O `metadataBase`** do layout raiz (`new URL("https://dominio-do-cliente")`) torna absolutos os endereços do cartão.
- **O layout raiz não declara `alternates.canonical`.** Até 07.10, a página 404 herdava o canônico "/" e dizia à busca que era a capa. Cada página declara o seu.

**Como conferir.** Régua, bloco 3:
- falta de qualquer marcação reprova;
- `og:image` que não abre reprova;
- título ou descrição iguais aos de outra página do mesmo site reprovam.

No celular, cole o endereço numa conversa de WhatsApp de teste e confira o cartão.

---

## 11. Os dados estruturados: o site e o negócio local [cli]

**Regra.** A página inicial do site de cliente leva um `<script type="application/ld+json">` com um grafo (`@graph`) de dois nós, gerado do **mesmo conteúdo** que a página mostra: o `WebSite` e o negócio local, ligados pelo `@id`. Nunca no site de exemplo [ex]: seria declarar à busca um negócio que não existe.

**Objetivo.**
- **O negócio:** dar à busca o nome, o endereço, o telefone, o horário e a faixa de preço sem ambiguidade, sem que o texto visível e os dados divirjam.
- **O site:** o `WebSite`, na página inicial, com `name` e `url`, define o nome do site que a busca mostra (https://developers.google.com/search/docs/appearance/site-names, 10.12.2025) [V]. O `publisher` aponta o `@id` do negócio: os dois nós falam do mesmo dono (desde 16.10.2026; `../21-busca-e-ias.md`, seção 5).
- **Nas respostas de IA:** "Structured data isn't required for generative AI search, and there's no special schema.org markup" (Google, 10.07.2026) [V], e os estudos não acham ganho de citação com o schema (Ahrefs, 05.2026; Fischman, SSRN, 02.2026) [FU]. O grafo serve à busca e aos leitores que o usam (o Bing declara que usa), sem acréscimo "para a IA".

**O que o Google pede** (https://developers.google.com/search/docs/appearance/structured-data/local-business, atualizado em 08.09.2026) [V]:
- **Obrigatórios:** `name` e `address`.
- **Recomendados:**
  - `telephone`, com o código do país;
  - `geo`, com 5 casas decimais;
  - `openingHoursSpecification`;
  - `priceRange`, com menos de 100 caracteres;
  - `url` e `image`.
- **`review` e `aggregateRating` só para sites que avaliam outros negócios.** Avaliação do próprio negócio não entra. **Nunca marcar depoimento próprio como avaliação.**

**O subtipo.** Use o tipo mais específico de `LocalBusiness` que exista no schema.org [NV: conferir cada um em https://schema.org/LocalBusiness antes de usar]:

| Nicho | Subtipo sugerido |
|---|---|
| Barbearia | `HairSalon` |
| Odontologia | `Dentist` |
| Medicina | `Physician` |
| Restaurante | `Restaurant` |
| Oficina | `AutoRepair` |
| Construção | `HardwareStore` ou `HomeAndConstructionBusiness` |
| Imobiliária | `RealEstateAgent` |
| Pet shop | `PetStore` |
| Academia | `ExerciseGym` |
| Advocacia | `LegalService` (o tipo `Attorney` está marcado como obsoleto no schema.org) |
| Psicologia e nutrição | `MedicalBusiness`, ou o próprio `LocalBusiness`. Nunca `ProfessionalService`: o schema.org o marca como obsoleto, "due to confusion with Service" (https://schema.org/ProfessionalService) [V] |

**Varia por.** O `priceRange` fica **fora** onde o conselho veda preço (odontologia, advocacia) e onde o preço é só de consulta (medicina: "consulta sim, procedimento não").

**O telefone e o endereço vêm dos mesmos campos do texto visível.** O `telephone` é o telefone da seção 2 (`negocio.telefone`), não o número do WhatsApp, que pode ser outro. O `streetAddress` junta logradouro, número e complemento (`negocio.endereco.numero` e `negocio.endereco.complemento`, em `conteudo/negocio.ts`), na forma do rodapé (seção 6): só o logradouro divergiria do rodapé, e o teste que os compara acusaria.

```ts
// lib/dados-estruturados.ts — o site e o negócio local, do mesmo conteúdo da página (a base: ../../base/lib/).
import { expediente, negocio } from "../conteudo/negocio.ts"; // relativo: os testes rodam no node:test

const NOMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const idDoNegocio = `${negocio.url}/#negocio`; // o mesmo nó, em toda página que falar do negócio

export const dadosDaCapa = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${negocio.url}/#site`, name: negocio.nome, url: `${negocio.url}/`, inLanguage: "pt-BR", publisher: { "@id": idDoNegocio } },
    {
      "@type": negocio.tipoSchema, // ex.: "HairSalon"
      "@id": idDoNegocio,
      name: negocio.nome,
      url: negocio.url,
      telephone: `+${negocio.telefone}`, // o telefone da seção 2, só algarismos com o 55
      image: `${negocio.url}/compartilhar.jpg`,
      address: {
        "@type": "PostalAddress",
        // Logradouro, número e complemento, como no rodapé (seção 6): a busca cruza os dois.
        streetAddress: [negocio.endereco.logradouro, negocio.endereco.numero, negocio.endereco.complemento].filter(Boolean).join(", "),
        addressLocality: negocio.endereco.cidade,
        addressRegion: negocio.endereco.uf,
        postalCode: negocio.endereco.cep,
        addressCountry: "BR",
      },
      ...(negocio.geo ? { geo: { "@type": "GeoCoordinates", latitude: negocio.geo.latitude, longitude: negocio.geo.longitude } } : {}), // 5 casas decimais
      openingHoursSpecification: Object.entries(expediente).flatMap(([dia, faixas]) =>
        faixas.map((f) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: NOMES[Number(dia)], opens: f.abre, closes: f.fecha })),
      ),
      ...(negocio.faixaDePreco ? { priceRange: negocio.faixaDePreco } : {}), // fora onde o conselho veda preço
    },
  ],
};

/** JSON seguro dentro de <script>: o "<" escapado impede fechar a tag por dentro do texto (guia de JSON-LD do Next). */
export function jsonLd(dados: object) {
  return { __html: JSON.stringify(dados).replace(/</g, "\\u003c") };
}
// Na página inicial, só no site de cliente:
// {!negocio.exemplo && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(dadosDaCapa)} />}
```

**Perguntas frequentes.** Uma página de dúvidas pode levar o `FAQPage`, gerado das mesmas perguntas da página. Nunca pergunta que não aparece no texto.
- **O `FAQPage` não rende mais resultado rico, em site nenhum:** o Google deixou de mostrar as perguntas frequentes nos resultados em 07.05.2026, para todos os sites, e confirmou a retirada em 15.06.2026 (página de FAQ do Google; pesquisa de 16.10.2026) [V]. Desde 08.2023, já só aparecia para sites de governo e de saúde. Ele continua válido como descrição da página, idêntico ao texto, sem expectativa de destaque.
- **Também recomendados** (RATIFICADO em 08.10.2026; revisto em 16.10.2026):
  - o `@id` estável, já no grafo acima;
  - `sameAs` com o perfil do Google e as redes do negócio, quando existirem (`06-presenca.md`; `../21-busca-e-ias.md`, seção 9);
  - num nó `Organization`, o `logo` com no mínimo 112 × 112 px (Google, Organization, 08.09.2026) [V];
  - `founder` e `Person` só na página que mostra o nome e a função de cada pessoa (Google, sd-policies: "Don't mark up content that is not visible to readers") [V];
  - `Offer` em BRL só se valer, com o mesmo preço da página (`UnitPriceSpecification` para a mensalidade): não há resultado rico de serviço [NV: ganho especulativo];
  - o `BreadcrumbList` só quando o site tiver páginas em mais de um nível (o resultado rico dele aparece só no computador, 08.09.2026) [V].
- **Nunca:** `ProfessionalService` (tabela acima), `Product` para serviço, avaliação do próprio negócio, `knowsAbout` ou `alumniOf` que o texto não afirma (`../21-busca-e-ias.md`, seção 5).

**Como conferir.**
- `node ferramentas/texto-do-robo.mjs <endereço>`: o JSON-LD de cada página é JSON válido, com `WebSite, <subtipo>` na capa do cliente e nenhum no exemplo.
- O Teste de Pesquisa Aprimorada do Google e o validator.schema.org, à mão, antes de publicar.
- O teste de conteúdo compara os dados com o texto visível (seção 6).

---

## 12. O mapa do site e o `robots` [todos]

**Regra** (revista em 16.10.2026: `../21-busca-e-ias.md`, seções 2 e 3).
- **[cli] O `robots.txt`** libera tudo, **inclusive os robôs de IA**, os de busca e os de treino: o cliente quer ser achado e citado. Aponta o mapa.
- **[cli] O mapa do site** (`app/sitemap.ts`) lista as páginas indexáveis:
  - pelo **endereço canônico**: no estático (`trailingSlash: true`), com a barra no fim (até 16.10.2026, a base listava `/servicos`, que redireciona);
  - com a data da **última mudança de conteúdo** (não a data do build, que diria à busca que tudo mudou a cada publicação). A auditoria técnica de 07.10.2026 propôs derivar a data do build (P2); fica a data escrita à mão, pelo motivo acima, em `ultimaAlteracao` (`conteudo/negocio.ts`), atualizada a cada publicação com mudança de conteúdo. O Google só usa a data verificável, e mudar a data sem mudar o conteúdo é sinal ruim (creating-helpful-content, 05.10.2026) [V];
  - **sem `priority` nem `changefreq`,** que o Google ignora [consolidado; não reconferido em 16.10.2026].
- **[ex] O site de exemplo, no host próprio:**
  - `noindex, nofollow` no layout e no cabeçalho (`X-Robots-Tag`, que o `gerar-htaccess` grava quando `exemplo: true`: cobre também as imagens e os arquivos que a meta não alcança, Google, block-indexing) [V];
  - fora do mapa do site (o mapa sai vazio);
  - no `robots.txt`, o `*` liberado, para os buscadores lerem o `noindex`, e um grupo com os 11 robôs de IA de treino, ou de busca sem respeito documentado ao `noindex`, com `Disallow: /`: `GPTBot`, `ClaudeBot`, `Claude-SearchBot`, `CCBot`, `Google-Extended`, `Applebot-Extended`, `meta-externalagent`, `meta-webindexer`, `Amazonbot`, `PerplexityBot` e `DuckAssistBot` (a tabela de `../21-busca-e-ias.md`, seção 1). `Googlebot`, `bingbot`, `OAI-SearchBot`, `Applebot` e `Amzn-SearchBot` nunca entram no grupo: precisam rastrear para obedecer ao `noindex`.
  - **A regra dos grupos** (RFC 9309; Google, robots-txt-spec, 31.08.2026) [V]: cada robô usa um só grupo, o mais específico; o grupo com nome não se soma ao `*`. Regra nova no `*` se repete no grupo dos 11.
  - **No site do Atlas,** onde os exemplos moram em `/demos/` do mesmo host, o grupo leva `Disallow: /demos/` em vez de `/`.

```ts
// app/robots.ts (a base: ../../base/app/robots.ts)
import type { MetadataRoute } from "next";
import { negocio } from "@/conteudo/negocio";

export const dynamic = "force-static";

const foraDoExemplo = [
  "GPTBot", "ClaudeBot", "Claude-SearchBot", "CCBot", "Google-Extended", "Applebot-Extended",
  "meta-externalagent", "meta-webindexer", "Amazonbot", "PerplexityBot", "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...(negocio.exemplo ? [{ userAgent: foraDoExemplo, disallow: "/" }] : [])],
    sitemap: `${negocio.url}/sitemap.xml`,
  };
}
```

```ts
// app/sitemap.ts (a base: ../../base/app/sitemap.ts)
import type { MetadataRoute } from "next";
import nextConfig from "@/next.config";
import { negocio, ultimaAlteracao } from "@/conteudo/negocio";
import { paginas } from "@/conteudo/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (negocio.exemplo) return [];
  const barra = nextConfig.trailingSlash ? "/" : ""; // o canônico do estático termina em "/"
  return paginas.map((p) => ({ url: `${negocio.url}${p.caminho === "/" ? "/" : p.caminho + barra}`, lastModified: ultimaAlteracao }));
}
```

**Como conferir.**
- `curl -s <endereço>/robots.txt`: no cliente, só o `*` liberado e o `Sitemap:`; no exemplo, mais o grupo dos 11 com `Disallow: /` (o Next escreve um grupo só, com as 11 linhas `User-Agent`).
- `curl -s <endereço>/sitemap.xml`: os endereços canônicos e a data; nada de `changefreq` nem `priority`.
- O teste de conteúdo confere que toda página do menu está no mapa, e só elas, e que o `noindex` aparece exatamente nos sites de exemplo e na 404.

---

## 13. O selo de ficção e o `noindex` [ex]

**Regra.** Todo site de exemplo leva:
1. **O selo de ficção** no rodapé, visível, com este texto: "Estabelecimento fictício, criado pela Atlas Digital para demonstração. Nenhum pedido é processado e nenhum dado é coletado nesta página."
2. **O `noindex`:** `robots: { index: false, follow: false }` no layout dos sites de exemplo e, desde 16.10.2026, o `X-Robots-Tag: noindex, nofollow` no cabeçalho (seção 12). **[DIV], resolvida na ratificação de 08.10.2026 pela recomendação abaixo:** o contexto de nichos do Atlas (seção 4) pede também o `robots.txt` bloqueando tudo no subdomínio, mas o robô bloqueado não lê o `noindex` (`../18-publicacao-e-manutencao.md`, seção 2.2), e a página com vínculo de fora pode aparecer na busca, sem descrição. Recomendação: `noindex` sem `Disallow` para os buscadores. **Desde 16.10.2026,** só os 11 robôs de IA que não leem o `noindex`, ou que treinam, levam `Disallow: /` (seção 12); os buscadores continuam livres para ler o `noindex`.
   - **Os agentes acionados pelo usuário** (`ChatGPT-User`, `Perplexity-User`, `Google-Agent`, `meta-externalfetcher`, `Amzn-User`) podem ignorar o `robots.txt` (`../21-busca-e-ias.md`, seção 1). Contra eles, a defesa é o texto: o selo (item 1), a descrição (item 5) e o `llms.txt` do exemplo, que só traz o nome, no H1, e o selo, como resumo: nem o contato fictício nem as páginas, que são `noindex` (`../21-busca-e-ias.md`, seção 7).
3. **O nome com a marca de ficção:** o bairro de Niterói no nome do estabelecimento e o sobrenome "da Silva" nas pessoas, com as exceções da advocacia ("Silva Advogados", pelo Estatuto da OAB) e da medicina (`../nichos/README.md`, seção 3.8).
4. **O número fictício** de WhatsApp (seção 1) e o registro fictício ("CRN4 00000").
5. **A descrição** termina em "Estabelecimento fictício.".
6. **Nenhuma coleta:**
   - o formulário só compõe uma mensagem que sai do aparelho;
   - a Agenda é demonstrada como pedido de horário pelo WhatsApp, sem servidor;
   - nada é enviado nem gravado.

**Objetivo.** O site de exemplo prova o padrão de execução sem mentir. Indexado, um negócio fictício poluiria a busca e enganaria quem procura uma nutricionista em Icaraí. A regra é obrigatória (contexto dos nichos, seção 2; `CLAUDE.md` do Atlas, "Não alterar").

**Como conferir.** Régua, bloco 9: site de exemplo sem `noindex` ou sem o selo reprova.

---

## 14. As páginas de erro [todos]

**Regra.**
- **`app/not-found.tsx`:** a 404, na composição do site, com o caminho de volta ("Voltar ao início") e a ação principal. O vínculo de volta é um caminho absoluto do próprio site (`href="/"`, `href="/contato"`), nunca a concatenação de `"/"` com um caminho que já começa por `/`: em 03.10, a 404 do Atlas montava `//orcamento`, que o navegador lê como **outro domínio**.
- **`app/error.tsx`:** o erro dentro de uma página, em português, com "Tentar de novo" (o `retry` do Next) e "Voltar ao início".
- **`app/global-error.tsx`:** o erro no layout raiz, com o próprio `<html lang="pt-BR">`, o CSS e as fontes do site.

**Por que `retry`, e não `reset`.** No Next 16.3, as telas de erro recebem `retry`, estável desde a 16.3.0, que pede de novo ao servidor e redesenha; o `reset` só redesenha o que já deu erro, e a documentação diz: "In most cases, you should use `retry()` instead" (documentação local do Next 16.3, `03-api-reference/03-file-conventions/error.md`) [V]. Com `reset`, um erro vindo do servidor (o banco fora do ar na página de contato) reapareceria no mesmo instante, e "Tentar de novo" não adiantaria.

**Objetivo.** Em 03.10, um vínculo com âncora malformada trocava a página inteira pela tela padrão do Next, em inglês ("Application error"). A NN/g pede a 404 em linguagem simples, com rotas de saída (https://www.nngroup.com/articles/improving-dreaded-404-error-message/) [V].

**Como fazer.**
1. **A 404** é componente de servidor. Usa o título "Página não encontrada · Nome", o texto curto e os dois vínculos. **Não declara `robots`:** o Next já põe `noindex` na 404, e declarar de novo duplicava a marcação (medido em 07.10).
2. **O erro da página é parte do script de toda página.** Por isso, só classes: sem `cn`, sem `cva`/`buttonVariants`, sem nada de `conteudo/`. Com o `buttonVariants`, custava +2,0 KB de script inicial; só com classes, +1,0 KB (medido no Atlas em 07.10).

```tsx
// app/error.tsx — erro numa página, em português. Parte do script de toda página: só classes.
"use client";

// retry (Next 16.3): pede de novo ao servidor e redesenha; o reset só redesenharia o que já deu erro.
export default function ErroNaPagina({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <main id="conteudo" tabIndex={-1} className="grid min-h-svh items-center text-center">
      <div className="mx-auto w-full max-w-pagina px-6 py-16 md:px-10">
        <h1 className="mx-auto max-w-[14ch] text-display">Esta página não abriu.</h1>
        <p className="mx-auto mt-6 max-w-[44ch] text-destaque text-muted-foreground">Um erro interrompeu a página. O restante do site continua no lugar.</p>
        <p className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          <button type="button" onClick={() => retry()} className="inline-flex min-h-12 cursor-pointer items-center rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-[filter] duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            Tentar de novo
          </button>
          <a href="/" className="inline-flex min-h-11 items-center text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">Voltar ao início</a>
        </p>
      </div>
    </main>
  );
}
```

3. **O erro global** importa `./globals.css` e as fontes de `app/fontes.ts`, e usa os tokens (nunca hexadecimal no componente). Ele troca o documento inteiro e não herda o `<html>` do layout: a documentação do Next diz que ele "must define its own `<html>` and `<body>` tags, global styles, fonts". Sem a classe do `next/font` no `<html>`, a variável da família não existe, e o texto cairia na fonte padrão do navegador (`../05-tipografia.md`, seção 4.1).

```tsx
// app/global-error.tsx — erro no próprio layout raiz: o documento inteiro é trocado por este.
"use client";
import "./globals.css";
import { texto, titulo } from "./fontes"; // a global-error não herda o <html> do layout: a fonte vem aqui

export default function ErroGlobal({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="pt-BR" className={`${texto.variable} ${titulo.variable}`}>
      <body className="grid min-h-svh items-center bg-background text-center text-foreground">
        <title>O site não abriu</title>
        <main className="mx-auto w-full max-w-pagina px-6 py-16 md:px-10">
          <h1 className="mx-auto max-w-[14ch] text-display">O site não abriu.</h1>
          <p className="mx-auto mt-6 max-w-[44ch] text-destaque text-muted-foreground">Um erro interrompeu o carregamento.</p>
          <p className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            <button type="button" onClick={() => retry()} className="inline-flex min-h-11 cursor-pointer items-center rounded-full bg-primary px-6 font-semibold text-primary-foreground transition-[filter] duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">Tentar de novo</button>
            <a href="/" className="inline-flex min-h-11 items-center text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">Voltar ao início</a>
          </p>
        </main>
      </body>
    </html>
  );
}
```

O botão e o vínculo das duas telas têm `hover` e `focus-visible` próprios (Diretrizes, regra 4).

**Como conferir.**
- Um teste de ponta a ponta visita um endereço inexistente: espera status 404, `noindex`, o `h1` e o vínculo de volta.
- O erro da página se força num teste de unidade do componente ou numa rota de teste que lança. As telas de erro do Atlas ainda não foram exercitadas, porque nenhuma página quebra hoje.
- A tela de erro global sai na fonte do site, e não na padrão do navegador; "Tentar de novo" chama o `retry`.

---

## 15. A pausa do movimento [C]

**Regra.** Se algo na página se move sozinho por mais de 5 segundos, há um botão que pausa tudo, no cabeçalho, com:
- o rótulo para leitor de tela "Pausar animações";
- `aria-pressed`;
- o mesmo alvo de 44 px.

Além disso:
- **Fora da tela,** cada elemento de ambiente para.
- **Abaixo da dobra,** o que nasce lá só começa ao entrar na tela.
- **Com movimento reduzido,** não há ambiente, e o botão não aparece.
- **A escolha não é gravada:** nada no aparelho.

**Objetivo.** WCAG 2.2.2 (nível A): movimento automático que dura mais de 5 s precisa de pausa [V]. Animar fora da tela também custa CPU: em 01.10, o estilo recalculado a cada quadro de elementos invisíveis atrasava a página no aparelho modesto.

**Varia por.** O Essencial e o Profissional não têm ambiente contínuo (`../09-movimento.md`, seção 4), e portanto não têm o botão. Se um site [P] ganhar algo que se move sozinho por mais de 5 s, ganha a pausa junto.

**Como fazer.** Os elementos de ambiente levam `data-ambiente`. Uma ilha no layout cuida das três coisas:
- marca `data-fora` e `data-visivel` pelo `IntersectionObserver`. O `data-fora` vai e vem com a tela; o `data-visivel` só se acrescenta, na primeira entrada, e nunca se tira: é ele que declara a animação, e tirá-lo a removeria (ao voltar, ela recomeçaria do zero), em vez de deixá-la pausada pelo `data-fora`. A referência do Atlas (`web/components/ilhas/controle-do-movimento.tsx`) ainda alterna os dois;
- alterna a classe `ambiente-pausado` na raiz;
- refaz a lista a cada troca de página.

```tsx
// components/ilhas/controle-do-movimento.tsx (resumido da referência)
"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function ControleDoMovimento() {
  const [disponivel, setDisponivel] = useState(false);
  const [pausado, setPausado] = useState(false);
  const caminho = usePathname();

  useEffect(() => {
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)");
    const atualizar = () => setDisponivel(!reduzir.matches);
    atualizar();
    reduzir.addEventListener("change", atualizar);
    return () => reduzir.removeEventListener("change", atualizar);
  }, []);

  // Fora da tela, cada elemento de ambiente pausa; o que nasce abaixo da dobra só começa ao entrar nela.
  useEffect(() => {
    const observador = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        e.target.toggleAttribute("data-fora", !e.isIntersecting);
        // data-visivel só se acrescenta: tirá-lo removeria a animação (e ela recomeçaria do zero), em vez de pausá-la.
        if (e.isIntersecting) e.target.setAttribute("data-visivel", "");
      }
    });
    document.querySelectorAll("[data-ambiente]").forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, [caminho]); // a lista é refeita a cada troca de página

  useEffect(() => {
    document.documentElement.classList.toggle("ambiente-pausado", pausado);
  }, [pausado]);

  // Antes da hidratação e com movimento reduzido, o lugar fica reservado e o botão, invisível e inerte.
  return (
    <button type="button" aria-pressed={pausado} aria-hidden={!disponivel || undefined} disabled={!disponivel} onClick={() => setPausado((p) => !p)}
      className="grid size-11 place-items-center rounded-full disabled:pointer-events-none disabled:opacity-0">
      <span className="sr-only">Pausar animações</span>
      {/* ícone de pausa ou de reprodução, aria-hidden */}
    </button>
  );
}
```

```css
/* O ambiente só é declarado com script (.js, posta por um script curto no <head> do layout:
   é o script que oferece a pausa), sem movimento reduzido e depois de entrar na tela. */
@media (prefers-reduced-motion: no-preference) {
  .js [data-visivel] .mov-faixa { animation: mov-faixa 60s linear infinite; }
}
/* Pausa fora da tela e pelo botão. A lista nomeia as peças que correm: um seletor
   universal seria testado em cada elemento da página a cada recálculo de estilo.
   O data-visivel fica depois da primeira entrada: a animação continua declarada, e o data-fora só a pausa. */
.ambiente-pausado .mov-faixa,
[data-fora] .mov-faixa { animation-play-state: paused !important; }
```

**Como conferir.** Régua, bloco 2: animação sem fim rodando com movimento reduzido reprova. O teste de ponta a ponta clica na pausa e confere `animation-play-state: paused` nos elementos de ambiente; e rola um elemento de ambiente para fora da tela e de volta: fora, `paused`; de volta, a animação continua de onde parou (o `currentTime` da animação não volta a zero).

---

## 16. A âncora com decodificação segura [todos]

**Regra.** Todo `decodeURIComponent` de algo que vem de fora — a âncora do endereço, um parâmetro, o `href` de um vínculo — passa por uma função que **não lança**.

**Objetivo.** Em 03.10, um vínculo para `/#%E0` derrubava a página inteira do Atlas. O `decodeURIComponent` lançava `URIError` dentro de um efeito do React, e a página virava a tela de erro. Uma âncora malformada deve valer como nenhuma.

```ts
// lib/ancoras.ts — a decodificação que nunca derruba a página (o mesmo arquivo do EVENTO_ANCORA).
/** "#duvida-2" → "duvida-2"; "#%C3%A1" → "á"; malformada ("#%E0") → "", que vale como nenhuma. */
export function decodificarAncora(hash: string) {
  try {
    return decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    return "";
  }
}
export const ancoraDoEndereco = () => decodificarAncora(window.location.hash);
```

**Como conferir.**
- O teste de unidade passa `"%E0"`, `"%"` e `"%E0%A4%A"`.
- O teste de ponta a ponta abre `/#%E0%A4%A`, `/contato#%E0` e `/#%`, e espera a página normal, sem tela de erro.
- Uma regra de lint proíbe `decodeURIComponent` solto (`../../qualidade/03-estatica.md`).

**Navegação interna com endereço limpo** [P][C, opcional]. As regras e o código estão em `../13-tecnologia-e-estrutura.md`, seção 3.7. A referência do Atlas (`web/components/ilhas/ancoras.tsx`):
- os vínculos `#parte` rolam até o destino, centrado quando cabe, e levam o foco;
- não deixam a âncora no endereço nem entradas no histórico;
- um destino dentro de `<details>` abre o `<details>`;
- a rolagem da pessoa (roda, toque, tecla) interrompe a animação;
- com movimento reduzido, o salto é seco;
- quem precisa saber o destino ouve um evento próprio, nunca `location.hash`.

No Essencial, a âncora comum do navegador basta.

---

## 17. O cabeçalho, a navegação e o menu do celular [todos]

**Regra.**
- **No cabeçalho:** a marca (vínculo para o início, com nome acessível mesmo quando o nome não cabe), as páginas (`<nav aria-label="Páginas do site">`, `aria-current="page"` na aberta), a ação principal e, quando houver ambiente, a pausa.
- **No celular, o gatilho do menu é um vínculo para o índice do rodapé** (`href="#indice"`), não um botão. Sem script, ou antes de o script chegar num aparelho lento, o toque leva ao índice; com script, abre o painel.
- **O painel é um diálogo de tela cheia:**
  - o foco fica preso dentro;
  - Esc fecha;
  - o foco volta ao gatilho;
  - o resto da página fica inerte.
- **O código do painel** não entra no script inicial: carrega no **primeiro sinal de intenção** (ponteiro sobre o gatilho, toque começando, foco), ~100 ms antes do clique. Se o código ainda não chegou no toque, o gatilho mostra a espera (`aria-busy` e as barras de espera) e o painel abre quando ele chega.
- **O cabeçalho que recolhe** (some ao rolar para baixo e volta ao rolar para cima) responde à **direção**, nunca à posição da rolagem.
- **A lista das páginas cabe numa linha.** Na base, ela aparece a partir de `lg` (1024 px), e a ação do cabeçalho, a partir de `xl` (1280 px): com seis páginas ou mais, a lista não cabia entre 768 e 1023 px (teste de 08.10.2026). Ao acrescentar página, confira o cabeçalho de 768 a 1280 px; a régua avisa o rótulo partido em duas linhas.
- **A página-mãe fica marcada** quando se está numa filha (`aria-current="true"` em Tratamentos, dentro de `/tratamentos/canal`), e a própria página, com `aria-current="page"`.

**Objetivo.**
- **Navegação sempre alcançável.** Quem carrega em rede ruim consegue navegar antes do script.
- **Desempenho.** Pré-carregar o painel com o navegador ocioso executava o módulo inteiro (tarefa de 160 ms com CPU 20×) mesmo para quem nunca abre o menu (medido no Atlas).

**Como conferir.** O teste de ponta a ponta:
- sem script, toca o menu e espera o rodapé;
- com script, abre o painel, aperta Tab até voltar ao primeiro item (o foco não escapa), aperta Esc e confere o foco no gatilho.

---

## 18. "Ir para o conteúdo" e o documento [todos]

**Regra.** O primeiro elemento focável da página é o vínculo "Ir para o conteúdo", invisível até receber o foco. O `<main>` de cada página tem `id="conteudo"` e `tabIndex={-1}`.

```tsx
// app/layout.tsx (trecho)
<body>
  <a href="#conteudo" className="fixed top-3 left-3 z-[70] -translate-y-24 rounded-full bg-primary px-5 py-2.5 text-primary-foreground focus:translate-y-0">
    Ir para o conteúdo
  </a>
  {children}
</body>
```

**O documento:**
- `<html lang="pt-BR">`;
- `viewport` **sem** `maximum-scale` nem `user-scalable=no`: o zoom é direito de quem lê;
- `theme-color` na cor do cabeçalho, `viewportFit: "cover"` (a área segura dos celulares com recorte) e `color-scheme`;
- os ícones: `favicon.ico` de 32 px, `icon.svg` com modo escuro, `apple-icon` de 180 px e, se houver manifesto, os de 192 e 512 px, um deles mascarável (https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs) [V]. O Atlas tem só o SVG e o da Apple; o conjunto completo no site de cliente é RATIFICADO.

O layout raiz completo, com a fonte, o script de `.js` e o vínculo, está em `../13-tecnologia-e-estrutura.md`, seção 7.

**Objetivo.** O vínculo poupa quem usa teclado ou leitor de tela de atravessar o cabeçalho em toda página (WCAG 2.4.1). O idioma certo faz o leitor de tela pronunciar em português (régua, bloco 3).

**Como conferir.** Régua: o idioma é bloco 3; o primeiro Tab, bloco 4. O teste confere que o primeiro Tab foca "Ir para o conteúdo" e que Enter leva o foco ao `<main>`.

---

## 19. O texto que o robô lê [todos]

*Desde 16.10.2026, a pedido do usuário (aparecer nas buscas e nas IAs em todo site, de qualquer plano: `../21-busca-e-ias.md`, seção 6).*

**Regra.** O texto que o HTML do servidor entrega, lido sem montar a página, diz o mesmo que a tela, com as palavras separadas:
1. **Entre as linhas de um título e entre o rótulo e o valor** que a tela mostra separados (por `block`, `flex` ou `grid`), um `{" "}`. O espaço no fim de uma linha em bloco some no desenho.

   ```tsx
   <span key={linha} className="block">
     {linha}{" "}
   </span>
   ```

   Casos achados: o endereço em linhas da base (`components/endereco.tsx`, que entregava "…, 000Fonseca, Niterói – RJCEP 24120-000"), o nome e o registro no cabeçalho, o preço e a duração na tabela, o nome do porte e o peso; no site do Atlas, os títulos em duas linhas ("Trêsdegraus.", "Origemna UFF.") e o rótulo da abertura de cada página colado ao título.
2. **A cópia decorativa de texto só pelo CSS** (`content: attr(data-texto)` num pseudoelemento), nunca repetida no HTML. O `data-nosnippet` só vale para o Google; o robô que lê o HTML lê a palavra duas vezes ("Sua empresa online em 24h24h", no h1 do Atlas). **PENDENTE no kit:** os gestos `gradient-wave-text`, `highlighted-text` e `shimmer-text` (`../../gestos/components/ui/spell/`) ainda levam a cópia no HTML; a correção é a do site do Atlas, levada aos gestos depois de conferida na tela (`../99-rastreabilidade.md`, seção 8).
3. **O nome fictício numa página real** (a vitrine que cita os sites de exemplo) anda sempre com o aviso de ficção em texto, na mesma página: uma IA pode afirmar que o Atlas fez o site de um estabelecimento que não existe.
4. **A definição no início:** o nome do negócio, o que faz e onde, em texto, nas primeiras linhas da página inicial (`../10-texto-e-conteudo.md`, seção 10).

**Objetivo.** A maioria dos robôs de IA não executa script nem monta a página: lê o HTML (Vercel, 17.12.2024) [FU]. O que a tela separa com o CSS chega a eles colado, e uma palavra colada no título é a que a resposta da IA cita errado. A auditoria do site do Atlas (16.10.2026) achou seis títulos colados e o h1 da capa repetido.

**Como conferir.** `node ferramentas/texto-do-robo.mjs <endereço>` (`../../base/ferramentas/`), depois do build, servido como no ar (`npm run estatico`), e de novo contra o domínio. Ele mostra os títulos como saem do HTML, aponta cada palavra colada (letra ou algarismo, marcação inline sem espaço, letra ou algarismo) e sai com 1 se houver alguma. `--texto` imprime o texto inteiro: número colado em número ("R$ 501h") só a leitura acha. A régua confere o h1 lido contra o desenhado (bloco 3).
