# As funcionalidades do ofício

> **Para que serve.** Especifica as funcionalidades sob medida de cada nicho — uma no Profissional, duas no Completo —: o que cada uma faz, as entradas e saídas, as regras do ofício e da norma, o comportamento sem script, onde termina e como se testa. Onde o Atlas já construiu a funcionalidade (nos sites de exemplo), o código de referência está copiado.
>
> **Quando ler.** Ao escolher a funcionalidade com o dono (`README.md`, seção 3) e ao construí-la.
>
> **Depende de.** `README.md` (a regra geral e a escolha), `01-base-de-todo-site.md` (o WhatsApp, o relógio de Niterói), `02-formulario.md` (o talão), `05-agenda.md` (quando a funcionalidade leva à marcação de verdade), `../nichos/<nicho>.md` (a norma e a direção de arte), `../09-movimento.md`.
>
> **Implementação de referência.** No repositório do Atlas, `web/components/ilhas/demos/`:
> - `calculadora.tsx` (depósito);
> - `estado-da-loja.tsx` (depósito);
> - `pedido-por-mensagem.tsx` (depósito);
> - `agenda-da-barbearia.tsx` (barbearia: o pedido de horário e a janela de retorno, que o código chama de agendador e agenda de retorno).
>
> Os dados estão em `web/conteudo/demos/`. Num projeto que só tem o kit, a cópia para estudo das ilhas e dos dados fica em `../../referencias/sites-de-exemplo/`, com os mesmos caminhos (`../../referencias/README.md`, seção 2). As outras funcionalidades deste documento são especificação, ainda sem código.
>
> **Estado.** A quantidade por plano é RATIFICADO (ata v3.0, IV.2.1). A funcionalidade de cada nicho segue `../nichos/README.md`, seção 1 (decidido em 07.10.2026, ratificado em 08.10.2026); o arquivo do nicho prevalece. As especificações são RATIFICADO.
>
> **Atualizado em:** 08.10.2026.

---

## 1. O que vale para todas

**Regra.** Toda funcionalidade do ofício segue um desenho só:
1. **Uma página própria** no Profissional e no Completo: a página da ferramenta (`../03-planos.md`, seção 4.3). O início leva até ela.
2. **A conta é uma função pura** em `lib/oficio/`: recebe tudo, inclusive o "agora", e devolve o resultado. A ilha só liga a função à tela. A função se testa sem navegador.
3. **Os dados vêm do cliente** e moram no conteúdo tipado (`conteudo/`): índices, preços, horários, janelas, convênios. Cada número tem dono e data de conferência (`README.md`, seção 3, pergunta 5).
4. **A ilha recebe só os campos que usa.** Em 03.10, duas ilhas dos sites de exemplo recebiam o objeto inteiro do site, serializado no HTML de cada página: ~11 KB (o estado da loja) e ~6 KB (o agendador) por página. Corrigido, o HTML das 23 páginas ficou 73,5 KB menor.
5. **Termina na ação principal.** Uma mensagem pronta para o WhatsApp (`01-base-de-todo-site.md`, seção 1), o formulário (`02-formulario.md`) ou a Agenda (`05-agenda.md`). Ao lado, quando ajuda, o "Copiar" (`CopyButton` do Spell UI, que só confirma se copiou).
6. **Nada é registrado.** A funcionalidade compõe no aparelho, e a mensagem sai pelo aplicativo da pessoa. Coleta, só pelo formulário ou pela Agenda.
7. **Diz a verdade sobre o próprio estado:**
   - medida inválida mostra traço, nunca zero;
   - o envio fica desabilitado até haver o que enviar;
   - antes da hidratação, um esqueleto (com `aria-busy`) no lugar do que depende do aparelho, como a data de hoje.
8. **O resultado que muda** fica numa região `aria-live="polite"`.
9. **As escolhas são controles nativos:** rádios num `<fieldset>` com `<legend>`, campos com rótulo. O desenho (cartões, bilhetes, máquinas) fica por cima, com `peer` e `sr-only`. O foco aparece também sobre a cor de ação.

   **A lição de 03.10:** o contorno de foco laranja sobre o laranja da opção marcada não se via. Corrigido para grafite.
10. **Sem script,** o conteúdo da ferramenta (a tabela de índices, a grade, a lista de imóveis) está no HTML, e a ação principal tem um vínculo que funciona. A conta ao vivo é o que o script acrescenta.

**Objetivo.** Uma funcionalidade que segue este desenho cabe no orçamento de script, testa-se em segundos, sobrevive à troca de dados do cliente e nunca deixa a pessoa agir sobre um número falso.

---

## 2. Construção (material de construção)

### 2.1 · Calculadora de materiais [P]

**O que faz.** Da área de uma parede ou de um piso, a lista do que comprar, com a perda, pronta para o WhatsApp do balcão. O cliente chega com a quantidade certa, e o balcão orça sem perguntar de novo.

**Entradas → saídas.**
- **Entradas:**
  - o serviço (alvenaria, contrapiso, reboco, piso);
  - as duas medidas, em metros, com vírgula ou ponto;
  - a perda (5% obra organizada, 10% padrão da casa, 15% recorte e canto).
- **Saída:** uma linha por material, com a quantidade e a unidade de venda.

**As regras da conta:**
- **A fórmula:** quantidade = m² × índice de consumo × fator de perda.
- **Sacos e unidades** sobem para o inteiro.
- **Metro cúbico** sobe na segunda casa decimal.
- **Medida que não é número maior que zero:**
  - fica marcada (`aria-invalid`);
  - o cupom mostra traços;
  - o envio e o "Copiar" ficam desabilitados.

  Até 03.10, "3 m" e "abc" viravam zero em silêncio, e a lista saía zerada.

```ts
// lib/oficio/calculadora.ts — a conta da calculadora (da referência do depósito).
export type Item = { nome: string; porM2: number; unidade: string; inteiro: boolean };

/** A medida digitada, em metros (vírgula ou ponto); null se não for um número maior que zero. */
export function lerMedida(texto: string) {
  const limpo = texto.trim().replace(",", ".");
  const valor = Number(limpo);
  return limpo !== "" && Number.isFinite(valor) && valor > 0 ? valor : null;
}

/** m² × índice × fator de perda (1,05; 1,10; 1,15). */
export function calcularMateriais(itens: Item[], areaM2: number, fatorDePerda: number) {
  return itens.map((item) => {
    const bruto = item.porM2 * areaM2 * fatorDePerda;
    // −1e-9: a conta que dá 20,000000000004 pelo arredondamento binário não vira 21 sacos.
    const quantidade = item.inteiro ? Math.ceil(bruto - 1e-9) : Math.ceil(bruto * 100) / 100;
    return { ...item, quantidade };
  });
}
```

**A mensagem:**

```
Olá. Lista de materiais para alvenaria (12,96 m², com 10% de perda):
- 179 blocos: Bloco cerâmico 9 × 19 × 39
- 5 sacos: Argamassa de assentamento, 20 kg
- 3 sacos: Cimento CP-II, 50 kg
```

**Os índices são do cliente.** Os da referência (bloco cerâmico 12,5 por m²; argamassa 0,35 saco por m²…) são ilustrativos, de um site fictício. No site de cliente, quem dá os índices é o balcão, e a página diz: "Estimativa de referência. A quantidade final é conferida no balcão, com o projeto à vista."

**Sem script.**
- **O que fica:** a tabela de índices (o material, o consumo por m² e a unidade) aparece no HTML, e o vínculo "Pedir orçamento pelo WhatsApp" leva a mensagem curta.
- **O que o script acrescenta:** a conta ao vivo.

**Como conferir.**
- **Unidade:**
  - `lerMedida`: "4,8"; "4.8"; " 4,8 "; "0"; "-1"; "abc"; "3 m"; "".
  - `calcularMateriais`: um caso que cai exatamente no inteiro; um que passa por 1e-12; o metro cúbico na segunda casa.
- **Ponta a ponta:**
  - a medida inválida desabilita o envio e o "Copiar" e mostra traços;
  - o `href` do WhatsApp tem a lista com as quebras de linha codificadas;
  - o "Copiar" com a área de transferência negada diz "Cópia indisponível".

**Referência.** `calculadora.tsx` e `conteudo/demos/deposito.ts` (`calculadora`), no repositório do Atlas: a "máquina de grafite" que imprime a lista num cupom de conferência.

### 2.2 · Estado da loja e o corte da entrega [C]

**O que faz.** Diz, no topo de todas as páginas:
- se a loja está aberta agora e quando fecha, ou quando abre;
- nos dias úteis, quanto falta para o corte da entrega no mesmo dia ("Pedido até as 15h sai hoje · faltam 2h10").

Na página de entrega, um marcador de "agora" anda sobre a linha do dia do caminhão.

**As regras.**
- **O relógio:** o de Niterói, no aparelho, a cada 30 s (`01-base-de-todo-site.md`, seção 5).
- **O corte, em três estados:** **antes da abertura**, num dia útil, o corte ainda vem ("Abre às 7h · pedido até as 15h sai hoje"); **da abertura à hora do corte**, a contagem ("faltam 2h10"); **depois do corte**, ou fora de dia útil, "sai no próximo dia útil". Nunca "encerrado" antes de a loja abrir: era o defeito apontado em 03.10.2026, ainda aberto no exemplo do Atlas (`estado-da-loja.tsx`).
- **O marcador de "agora":** só em dia útil, dentro do expediente. Até 07.10, ele aparecia no sábado sobre a linha de segunda a sexta, e até as 18h, depois de a loja fechar às 13h.
- **Sem script e antes da hidratação:** o horário escrito.

**Termina em.** O vínculo do pedido (o talão, `02-formulario.md`, seção 10) e o mapa do raio de entrega (`MapaDaEntrega` na referência).

**Como conferir.** Os instantes fixos de `01-base-de-todo-site.md`, seção 5, mais:
- o corte às 14h59 e às 15h01;
- terça às 6h, antes de abrir: o corte de hoje ainda vem;
- sábado às 10h, sem corte nem marcador;
- o marcador no início e no fim do expediente.

**Referência.** `estado-da-loja.tsx` (`EstadoDaLoja` e `MarcadorDoAgora`), no repositório do Atlas.

---

## 3. Barbearia

### 3.1 · Pedido de horário [C; P no cliente que contratar o Profissional]

**O que faz.** Serviço, profissional, dia e período viram uma mensagem para o WhatsApp da casa; o horário é confirmado por resposta. Com a Agenda contratada, a mesma tela passa a mostrar os horários livres de verdade (`05-agenda.md`).

**Entradas → saída.**
- **O serviço:** com preço e duração ("O Clássico · R$ 45 · 40 min").
- **O profissional,** ou "Sem preferência".
- **O dia:** os dias de atendimento.
- **O período:** Manhã, Tarde ou Noite, com a faixa no `title`.
- **A saída:** "Olá. Gostaria de agendar: O Clássico, com Téo da Silva, sexta de manhã."

**As regras.**
- **O período que não existe no dia fica desabilitado:** na referência, o sábado à noite. Se estava marcado, a escolha passa para o primeiro período válido, e o resumo mostra a troca.
- **A chegada com o serviço marcado:** o quadro de serviços e a janela de retorno levam ao agendador com `#servico-<id>` no endereço, e o serviço chega marcado. A âncora se lê com uma expressão que só aceita ids da lista, sem decodificar o resto (`01-base-de-todo-site.md`, seção 16).
- **O hover não acende a opção desabilitada** (lição de 03.10).
- **O resumo** é um bilhete com `aria-live="polite"`, que o leitor de tela lê a cada mudança.

```ts
// lib/oficio/pedido-de-horario.ts — a mensagem do pedido (da referência da barbearia).
export function mensagemDoPedido(p: { servico: string; profissional?: string; dia: string; periodo: string }) {
  const com = p.profissional ? `, com ${p.profissional}` : "";
  return `Olá. Gostaria de agendar: ${p.servico}${com}, ${p.dia.toLowerCase()} de ${p.periodo.toLowerCase()}.`;
}
```

**Sem script.** Os serviços, a equipe e o horário da casa estão no HTML. O vínculo "Agendar pelo WhatsApp" leva a mensagem curta ("Olá. Gostaria de agendar.").

**Como conferir.**
- **Unidade:** a mensagem com e sem profissional.
- **Ponta a ponta:**
  - o sábado desabilita a noite e move a escolha;
  - `#servico-navalha` chega marcado;
  - um id fora da lista é ignorado;
  - o `href` final.

### 3.2 · Janela de retorno [C]

**O que faz.** O tipo de corte e a data do último atendimento devolvem a janela sugerida para o próximo, com uma régua dos dias até lá. "Agendar o retorno" leva ao pedido de horário com o serviço marcado.

**As janelas** (da casa; as da referência são da barbearia fictícia):

| Corte | Janela |
|---|---|
| Degradê | 12 a 18 dias |
| Social | 21 a 30 dias |
| Tesoura | 35 a 45 dias |
| Barba | 10 a 15 dias |

```ts
// lib/oficio/retorno.ts — a conta da janela (da referência). Datas à meia-noite UTC: a conta de dias não sofre com horário de verão.
const DIA = 86_400_000;
export type Corte = { minimo: number; maximo: number };

export function janelaDeRetorno(corte: Corte, ultimo: string /* "2026-10-01" */, hoje: Date /* meia-noite UTC do dia de hoje */) {
  const base = new Date(`${ultimo}T00:00:00Z`).getTime();
  const inicio = new Date(base + corte.minimo * DIA);
  const fim = new Date(base + corte.maximo * DIA);
  const ate = (alvo: Date) => Math.round((alvo.getTime() - hoje.getTime()) / DIA);
  if (ate(inicio) > 0) return { inicio, fim, estado: "antes" as const, dias: ate(inicio) }; // "A janela abre em 3 dias."
  if (ate(fim) >= 0) return { inicio, fim, estado: "aberta" as const };                      // "A janela está aberta."
  return { inicio, fim, estado: "passou" as const, dias: -ate(fim) };                       // "A janela fechou há 2 dias."
}
```

**As regras.**
- **A data de hoje só existe no aparelho.** É uma conta pessoal, e a data do aparelho serve. Até a hidratação:
  - o campo de data fica vazio;
  - o bilhete mostra o esqueleto no lugar da janela, do estado e da régua, com `aria-busy`.

  Até 03.10, mostrava "…" e uma régua sem o dia.
- **O campo de data** tem `max` igual a hoje: o último corte não fica no futuro.
- **Campo apagado** por quem usa mostra "…": espera a data, não carrega.
- **Singular e plural:** "1 dia", "2 dias".
- **A régua dos dias** é decorativa (`aria-hidden`); o texto diz o mesmo.

**Como conferir.**
- **Unidade:** os três estados; os limites (o dia exato do início e do fim); a virada de mês e de ano.
- **Ponta a ponta:**
  - com o relógio fixo (`page.clock`), o esqueleto antes da hidratação e o estado certo depois;
  - "Agendar o retorno" chega ao pedido de horário com o serviço da janela.

**Referência.** `agenda-da-barbearia.tsx` (`Agendador` e `AgendaDeRetorno`) e `conteudo/demos/barbearia.ts` (`agendador`, `retorno`), no repositório do Atlas.

---

## 4. Odontologia [C]

**A norma manda aqui** (`../nichos/odontologia.md`):
- **sem preço** (Código de Ética Odontológica);
- **sem promessa de resultado;**
- **sem antes e depois** até o parecer do advogado [DIV];
- **o CRO de quem assina** (`01-base-de-todo-site.md`, seção 7).

### 4.1 · Pedido de avaliação, com o mapa dos dentes

**O que faz.** A pessoa indica, se quiser, a região da boca e o tipo de atendimento, e a mensagem do pedido de avaliação sai pronta para o WhatsApp do consultório.

**Entradas → saída.**
- **A região** (opcional), uma de quatro: os dentes da frente ou do fundo, em cima ou embaixo. É a do arquivo do nicho (`../nichos/odontologia.md`, seção 5.2), que vale sobre esta seção na funcionalidade do ofício (`../nichos/README.md`, seção 6).
- **O atendimento:** avaliação de rotina, urgência (encaixe no mesmo dia, se for a política da clínica), limpeza, clareamento, aparelho, implante, continuar tratamento iniciado ou outro.
- **A última visita ao dentista e o período de preferência** (opcionais).
- **A saída:** "Olá. Gostaria de marcar uma avaliação. Atendimento: implante. Região: dentes do fundo, embaixo."
- **O mesmo mapa abre o plano de sessões** (4.2): é um componente só para as duas funcionalidades (`../nichos/odontologia.md`, seção 5).

**As regras.**
- **Sem preço e sem duração de tratamento:** a avaliação define.
- **A lista é de atendimentos, não de sintomas.** Nada de "dor" nem "sangramento" como opção pronta: a pessoa escreve o que quiser na conversa.
- **O mapa** é um diagrama do ofício (`../08-imagem-e-fotografia.md`, seção 2.3), desenhado pela numeração FDI, com as duas arcadas e o contorno de cada tipo de dente. O dentista do cliente o revê antes do rascunho. Ele é um espelho visual das escolhas:
  - os controles de verdade são rádios num `<fieldset>`;
  - o SVG reflete a escolha e, com ponteiro, também escolhe (cada região é um vínculo da opção correspondente);
  - para o leitor de tela, o SVG é `aria-hidden` e os rádios bastam.
- **Nada é registrado.** A mensagem sai do aparelho; o site não coleta dado de saúde.

**Sem script.** A lista de atendimentos e o vínculo "Pedir avaliação pelo WhatsApp", com a mensagem curta.

### 4.2 · Plano de sessões

**O que faz.** Para cada tratamento, o que esperar:
- o número de sessões, numa faixa ("de 2 a 4 sessões"), sem "costuma" (`../10-texto-e-conteudo.md`);
- quanto dura cada uma;
- o intervalo entre elas;
- os cuidados antes e depois.

Termina no pedido de avaliação com o tratamento marcado.

**As regras.**
- **Os números são do dentista**, com a frase "O número de sessões é definido na avaliação."
- **Sem preço, sem resultado, sem foto de paciente.**
- **Uma página por tratamento** no Completo (`../03-planos.md`, seção 5.3), com o plano de sessões nela.

**Como conferir.** O léxico de termos vedados do nicho (`../../qualidade/10-conteudo-normas-e-texto.md`) e a leitura humana.

---

## 5. Restaurante [P]

### 5.1 · Montador de pedido com o total

**O que faz.** A pessoa marca os pratos e as quantidades, vê o total e envia o pedido pronto para o WhatsApp da casa. Pedido próprio, sem a taxa do aplicativo de entrega (12% a 23%, mais 3,2% de pagamento, no iFood) [FU, contexto dos nichos].

**As regras.**
- **Dinheiro em centavos inteiros:** nada de 0,1 + 0,2.
- **O total se recalcula a cada mudança** e fica numa região `aria-live="polite"`.
- **Quantidade:** botões de menos e mais com nome ("Diminuir feijoada", "Aumentar feijoada") e o número entre eles. O de menos fica desabilitado no zero, com `aria-disabled` para não perder o foco.
- **Retirada ou entrega:** com a taxa por bairro, se a casa entrega (dado do cliente).
- **O envio fica desabilitado** com o pedido vazio.
- **A mensagem diz** que os preços são os do site, e a casa confirma o total na resposta.
- **Alérgenos,** se a casa declarar: é decisão dela (`../nichos/restaurante.md`).

```ts
// lib/oficio/pedido.ts
export type Prato = { id: string; nome: string; centavos: number };
const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
export const reaisDeCentavos = (centavos: number) => brl.format(centavos / 100); // "R$ 45,90" (não confundir com reais(), de lib/moeda.ts, que recebe reais inteiros)

/** As linhas marcadas e o total, em centavos. */
export function somarPedido(cardapio: Prato[], quantidades: Record<string, number>) {
  const linhas = cardapio
    .filter((p) => (quantidades[p.id] ?? 0) > 0)
    .map((p) => ({ ...p, quantidade: quantidades[p.id], subtotal: p.centavos * quantidades[p.id] }));
  return { linhas, total: linhas.reduce((soma, l) => soma + l.subtotal, 0) };
}

export function mensagemDoPedido(pedido: ReturnType<typeof somarPedido>, recebimento: string) {
  return [
    "Olá. Gostaria de fazer um pedido:",
    ...pedido.linhas.map((l) => `${l.quantidade} × ${l.nome}: ${reaisDeCentavos(l.subtotal)}`),
    `Total: ${reaisDeCentavos(pedido.total)} (preços do site; a casa confirma na resposta)`,
    recebimento, // "Retirada no balcão." ou "Entrega em Icaraí (taxa de R$ 6,00)."
  ].join("\n");
}
```

O desenho de soma e mensagem segue o do montador de orçamento do site do Atlas (`somar` e `mensagemDeOrcamento`, em `web/components/ilhas/montador.tsx` e `web/lib/whatsapp.ts`, no repositório do Atlas).

**Sem script.** O cardápio inteiro, com os preços, está no HTML; o vínculo "Pedir pelo WhatsApp" leva a mensagem curta.

**Como conferir.**
- **Unidade:** a soma com centavos (três de R$ 0,10 dão R$ 0,30); o pedido vazio; a mensagem.
- **Ponta a ponta:** o total anunciado; o menos desabilitado no zero; o envio desabilitado com o pedido vazio.

### 5.2 · Prato do dia por dia da semana [C]

**O que faz.** O cardápio da semana, um prato por dia, com o de hoje em destaque.

**As regras.**
- **No HTML, a semana inteira:** sem script, a pessoa lê os sete dias.
- **Com script,** o dia de **Niterói** (`agoraEmNiteroi`, `01-base-de-todo-site.md`, seção 5) põe o prato de hoje primeiro e marca "Hoje". O servidor não sabe o dia de quem lê, e uma página pré-renderizada congelaria o dia do build.
- **Fechado no dia:** "Hoje a cozinha não abre; amanhã, <prato>".
- **A marcação é de lista** (`<ul>` ou `<dl>`). O elemento `<menu>` do HTML é para comandos, não para cardápio.

**Dados estruturados** [cli], opcionais: `hasMenu` com `Menu`, `MenuSection` e `MenuItem` [NV: conferir no schema.org e no guia do Google antes de usar].

---

## 6. Oficina mecânica [P]

**A norma** é o CDC (Lei 8.078/1990) [V: duas fontes independentes sobre o texto da lei]:
- **Art. 40:** o orçamento discrimina a mão de obra, os materiais, as condições de pagamento e as datas, e vale por **10 dias** do recebimento, salvo estipulação em contrário (§1º).
- **Art. 39, VI:** executar serviço sem orçamento e sem autorização expressa é prática abusiva.
- **Art. 26:** o prazo para reclamar do vício aparente é de **30 dias** para serviço e produto não duráveis e de **90 dias** para os duráveis.

### 6.1 · "Descreva o problema": o compositor de sintoma, com o diagrama das zonas do carro

**O que faz.** A pessoa descreve o problema pelo que percebe, sem saber o nome da peça, e a oficina recebe uma descrição útil.

**O caminho:**
1. a **zona** do carro: frente, motor, rodas e freios, embaixo, interior, traseira;
2. o **sintoma** daquela zona: barulho, vibração, luz no painel, cheiro, vazamento;
3. **quando acontece:** ao frear, ao virar, em velocidade, parado, na partida.

A saída: "Olá. Gostaria de um orçamento. Carro: Onix 2019. Zona: rodas e freios. Sintoma: barulho ao frear."

**As regras.**
- **O diagrama** é um SVG 2D, desenhado à mão, com as zonas como regiões navegáveis. Os controles de verdade são rádios; o desenho espelha a escolha (como em 4.1).
- **Sem 3D:** o público é de celular médio (`../nichos/oficina.md`). Foi a proposta de objeto 3D na oficina que levou à medição de 12.09: um showroom em WebGL pesava 639 KB de script, doze vezes um demo inteiro, e sem script a página não existia (registro de decisões, 12.09) [V, medido].
- **Sem diagnóstico e sem preço de reparo:** o site não sabe o que o carro tem. A página diz: "O diagnóstico é feito na oficina, com o carro à vista."
- **O carro:** modelo e ano, nunca a placa (identifica o dono).

**Sem script.** As zonas e os sintomas comuns, em lista; o vínculo do WhatsApp com a mensagem curta.

### 6.2 · Ordem de serviço [C]

**O que faz.** Mostra como a oficina trabalha, em forma de ordem de serviço, e compõe o pedido de orçamento nesse formato. O dono escolhe trabalhar assim, e a página mostra o compromisso:
- **o orçamento por escrito,** com mão de obra e peças separadas, válido por 10 dias;
- **o serviço só depois da autorização;**
- **a garantia legal** de 90 dias para o serviço no carro (bem durável), além da garantia da peça.

**As regras.**
- **O texto cita o artigo do CDC** e não promete o que a lei não promete.
- **A garantia contratual,** se a casa der, aparece separada da legal, com o prazo.

**Como conferir.** A leitura humana com o artigo à vista; o léxico do nicho.

---

## 7. Academia e pilates [P]

### 7.1 · Grade semanal com vagas por turma e "próxima aula em"

**O que faz.** A grade da semana: modalidade, dia, hora, professor e o tamanho da turma. No topo, a próxima aula a começar ("Pilates, hoje às 18h30 · em 2h10"). Cada aula leva ao pedido de aula experimental.

**As regras.**
- **"Vagas por turma" é a capacidade** ("até 8 alunos"), não as vagas que sobram. Vagas restantes ao vivo exigem servidor: são a Agenda (`05-agenda.md`).
- **A grade é uma tabela de verdade:**
  - `<table>` com `<caption>`;
  - cabeçalhos de dia e de hora com `scope`;
  - no celular, a disposição muda: um dia por vez, com abas que são vínculos para cada dia, ou a lista do dia.
- **O filtro por modalidade** é um grupo de rádios. Sem script, a grade inteira aparece.
- **"Próxima aula em"** usa o relógio de Niterói, depois da hidratação. Antes dela, nada no lugar: a grade já diz tudo.
- **O CREF do responsável** fica visível (`01-base-de-todo-site.md`, seção 7). Se o estúdio for de fisioterapeuta, vale o CREFITO (`../nichos/academia.md`).

```ts
// lib/oficio/proxima-aula.ts
import { agoraEmNiteroi } from "@/lib/agora";

export type Aula = { dia: 0 | 1 | 2 | 3 | 4 | 5 | 6; inicio: string; modalidade: string; capacidade: number };
const emMinutos = (h: string) => Number(h.slice(0, 2)) * 60 + Number(h.slice(3, 5));

/** A próxima aula a começar, e em quantos minutos. A aula de hoje que já começou volta na semana seguinte. */
export function proximaAula(grade: Aula[], instante = new Date()) {
  const agora = agoraEmNiteroi(instante);
  const ate = (a: Aula) => {
    const minutos = ((a.dia - agora.dia + 7) % 7) * 1440 + emMinutos(a.inicio) - agora.minutos;
    return minutos < 0 ? minutos + 7 * 1440 : minutos;
  };
  return grade.map((aula) => ({ aula, minutos: ate(aula) })).sort((x, y) => x.minutos - y.minutos)[0];
}
```

**Como conferir.**
- **Unidade:** domingo à noite (a próxima é segunda); a aula que começa agora (zero minutos); a que começou há um minuto (a da semana seguinte).
- **Ponta a ponta:** o filtro, e a grade sem script.

### 7.2 · Montador de plano [C]

**O que faz.** Modalidade e vezes por semana → o plano e a mensalidade, com o que o plano inclui. Termina no pedido de matrícula ou de aula experimental.

**As regras.**
- **Preço permitido.** Os planos e as regras de desconto são do cliente. Desconto aparece como tal, sem relógio de urgência nem "últimas vagas" inventadas.
- **A soma** segue o desenho do montador do restaurante (5.1), em centavos.

---

## 8. Imobiliária [C]

**A norma:**
- **o CRECI** junto do nome da imobiliária, com no mínimo 25% do tamanho dele (COFECI 1.065/2007, arts. 2º e 5º; `01-base-de-todo-site.md`, seção 7);
- **as fotos** com data;
- **uma página por imóvel** (`../03-planos.md`, seção 5.3).

### 8.1 · Filtro da carteira

**O que faz.** A carteira filtrada por:
- finalidade (comprar ou alugar);
- bairro;
- tipo;
- quartos;
- faixa de valor.

Cada imóvel leva à página dele, com a galeria (`03-galeria.md`), os dados, o mapa do bairro e "Agendar visita".

**As regras.**
- **O filtro é um `<Form>` do `next/form`** (GET, os critérios no endereço: `/imoveis?finalidade=venda&bairro=icarai&quartos=2`):
  - a página (dinâmica, no web app do Completo) lista o resultado;
  - **sem script, funciona como um formulário comum;**
  - com script, a troca é navegação no cliente;
  - o endereço filtrado se compartilha pelo WhatsApp.
- **O número de resultados** fica num `role="status"` ("12 imóveis"). Nenhum resultado: "Nenhum imóvel com esses critérios", com o vínculo para limpar o filtro e o WhatsApp ("Avisar quando houver").
- **A carteira vem do cliente,** no conteúdo tipado: código, finalidade, bairro, tipo, quartos, vagas, área, valor, condomínio, IPTU, data das fotos e situação. Imóvel vendido sai no mesmo dia: a manutenção cuida (`../18-publicacao-e-manutencao.md`).
- **O endereço exato do imóvel** só se o cliente quiser publicá-lo; senão, o bairro e a rua.

**Como conferir.** Ponta a ponta com e sem script: cada critério sozinho, combinados, nenhum resultado, o endereço com os critérios recarregado.

### 8.2 · Custo de entrada na escritura

**O que faz.** Do valor do imóvel, quanto a pessoa precisa ter para fechar:
- a entrada;
- o ITBI;
- a escritura e o registro.

Separado para a compra à vista e a financiada. Termina em "Conversar com um corretor" pelo WhatsApp, com os números na mensagem.

```ts
// lib/oficio/escritura.ts — RATIFICADO. Todo percentual e toda tabela vêm do cliente e da lei do ano.
export type Parametros = {
  itbi: number;                                   // alíquota do ITBI de Niterói, da lei municipal vigente [NV]
  cartorio: (valor: number, financiado: boolean) => number; // emolumentos do TJRJ do ano [NV]
  entradaMinima: number;                          // a fração que o financiamento não cobre (do cliente)
};

export function custoDeEntrada(valor: number, financiado: boolean, p: Parametros) {
  const entrada = financiado ? Math.ceil(valor * p.entradaMinima) : valor;
  const itbi = Math.ceil(valor * p.itbi);
  const cartorio = p.cartorio(valor, financiado);
  return { entrada, itbi, cartorio, total: entrada + itbi + cartorio };
}
```

**As regras.**
- **É estimativa para planejamento,** e a página diz: "Os valores exatos vêm da prefeitura, do cartório e do banco."
- **As tabelas mudam todo ano** (os emolumentos sobem em janeiro). A data da conferência fica na página, e a revisão trimestral do Completo a confere.
- **Com financiamento,** o contrato do banco pode ter força de escritura pública (Lei 9.514/1997, art. 38) [FU], e o custo de cartório muda. A imobiliária dá as duas tabelas.
- **Nada de "você economiza" nem de comparação com aluguel.** Só a conta.

---

## 9. Medicina [C]

**A norma** (CFM 2.336/2023; `../nichos/medicina.md`):
- **preço:** o da consulta, sim; o de procedimento, não;
- **especialidade** só com o RQE;
- **nenhuma promessa;**
- **movimento sereno**, com a camada do plano inteira e sem sensacionalismo (`../03-planos.md`, seção 5.6; até 08.10.2026, à noite, "contido mesmo no Completo").

### 9.1 · Agendamento com duração e valor

**O que faz.** A primeira consulta em três passos:
1. **O tipo:** primeira consulta, retorno, teleconsulta, se houver.
2. **O que esperar:** a duração, o valor da consulta, os convênios aceitos e o que levar.
3. **O pedido de horário:** pelo WhatsApp, ou pela Agenda, se contratada (`05-agenda.md`).

**As regras.**
- **Os convênios** são uma lista simples, do cliente, com a data da conferência. Sem número de carteirinha nem plano no pedido.
- **Nenhum dado de saúde** no pedido: sem motivo, sem sintoma.

### 9.2 · Preparo por tipo de consulta

**O que faz.** Para cada tipo de consulta ou exame do consultório, o preparo em lista de conferência: jejum, exames anteriores, documentos, medicamentos em uso (levar a lista, não escrever no site), chegada antecipada.

**As regras.**
- **O texto é do médico,** com a frase "Este preparo não substitui a orientação do consultório."
- **Imprimível:** a folha de impressão (`@media print`) deixa só o preparo. "Imprimir o preparo" chama `window.print()` com script; sem script, a impressão do navegador dá o mesmo.
- **Nada é coletado.**

---

## 10. Os nichos do Essencial, se contratarem o Profissional

**Estado.** RATIFICADO. No Essencial, esses nichos não têm funcionalidade sob medida (`README.md`, seção 5); o arquivo do nicho prevalece. A segunda funcionalidade de cada um, no Completo, está no arquivo do nicho: a biblioteca filtrável (nutrição, seção 4.2), o leva e traz por bairro (pet shop, 5.3), "o que perguntar" (psicologia, 5.3) e a consulta por área (advocacia, 5.3).

| Nicho | Funcionalidade | Regras principais |
|---|---|---|
| **Nutrição** | A primeira consulta em três passos: antes (o que levar: exames recentes, a lista de medicamentos), durante (a conversa, as medidas), depois (o plano, o retorno) | Sem resultado prometido, sem depoimento, sem antes e depois; preço sem lógica promocional (CFN 599/2018; a CFN 856/2026 vale a partir de 23.01.2027) |
| **Pet shop** | Porte × pelagem: o porte (por peso, com as faixas da casa), a pelagem e o serviço dão o tempo e o preço da rotina (banho; banho e tosa) | Preço só da rotina; procedimento que pede avaliação de veterinário, sem preço ("sob avaliação"). Com veterinário, o responsável técnico visível (CFMV 1.649/2025) |
| **Psicologia** | Como é a primeira sessão: presencial ou a distância, a duração, o que acontece, o sigilo e o valor, sem moldura promocional | Sem depoimento, sem promessa; no atendimento a distância, as exigências do CFP para o serviço on-line [NV: a resolução vigente, em `../nichos/psicologia.md`] |
| **Advocacia** | Nenhuma no Essencial. O Provimento 205/2021 coincide com os limites do plano: sem formulário, sem galeria, sem honorário. Num Profissional, as áreas como índice de código, com notas laterais (`../nichos/advocacia.md`, seção 5.2) | Sem captação, sem preço, sem resultado |

---

## 11. Como conferir, em resumo

| Verificação | Onde |
|---|---|
| A conta é uma função pura com teste de unidade, inclusive os limites | `../../qualidade/04-unidade.md` |
| O fluxo inteiro, com e sem script, termina num `href` ou num envio certo | `../../qualidade/05-ponta-a-ponta.md` |
| Estado verdadeiro: traço no inválido, envio desabilitado sem conteúdo, esqueleto antes da hidratação | Ponta a ponta, caminho de falha |
| A ilha recebe só o que usa (o HTML não leva o site inteiro) | Leitura do código; o tamanho do HTML de cada página, antes e depois (régua, bloco 5: o peso total da carga) |
| Teclado, nomes, `aria-live`, foco visível sobre a cor de ação | Régua, blocos 3 e 4; axe; leitor de tela |
| A norma do nicho: preço, resultado, depoimento, dado de saúde | `../../qualidade/10-conteudo-normas-e-texto.md`; leitura humana |
| Os dados do cliente com dono e data de conferência | `decisoes.md` do cliente; a manutenção mensal |
