# 03 · Os planos: a hierarquia de produção

> **Para que serve.** O que cada plano — Essencial, Profissional e Completo — entrega, para quem e com que esforço; o que distingue um degrau do outro em cada eixo; os módulos; o que fazer quando o pedido mistura planos; e o que fica fora de cada um. É o documento que decide o escopo de um site.
>
> **Fontes e estado.**
> - **Preço, páginas, funcionalidades e módulos:** DECIDIDO, com o conteúdo de cada plano RATIFICADO em 08.10.2026 (ata v3.0, IV.2 e IV.2.1; texto do site: `web/conteudo/planos.ts`, no repositório do Atlas).
> - **De onde veio o conteúdo de cada plano.** Até 07.10.2026 ele só existia no texto do site (`web/conteudo/planos.ts`, de 08.09), sem ata, e quatro itens contradiziam regras vigentes: o relatório mensal de acessos, com o site sem rastreador (resolvido com os dados da Hostinger, sem cookie: `14-funcionalidades/04-relatorio-de-acessos.md`); o formulário, com o site sem coleta (a coleta é pelo formulário: `14-funcionalidades/02-formulario.md`); as páginas sem limite, com a Página adicional cobrada a R$ 250 (sem limite só no Completo; nos outros, a Página adicional); e a confirmação automática da Agenda, sem servidor que a faça (a Agenda é um módulo no próprio site, com servidor próprio: `14-funcionalidades/05-agenda.md`). Os esclarecimentos do usuário de 07.10.2026 entraram na ata (IV.2.1).
> - **A escada pela tarefa de cada degrau** (seção 1: ser encontrado e chamado, ser escolhido, trabalhar pelo negócio) **e a forma de produzir cada plano** (direção de arte, fotografia, rascunho, prazos por plano, esforço): RATIFICADO em 08.10.2026.
> - **As horas** são estimativas, a medir no primeiro cliente de cada plano.

---

## 1. O princípio da escada

**Cada degrau muda o que o site faz pelo negócio, não a quantidade de animação.** O dono do negócio compra resultado, e três perguntas dele organizam a escada:

| Plano | A pergunta do dono | A tarefa do site |
|---|---|---|
| **Essencial** | "Quem procura me acha e me chama?" | **Ser encontrado e chamado:** quem é, o que faz, onde, quando, como chamar |
| **Profissional** *(o recomendado)* | "Quem compara me escolhe?" | **Ser escolhido:** provar com imagem e detalhe, responder a dúvida antes do contato, receber o pedido organizado |
| **Completo** | "O site trabalha por mim?" | **Trabalhar pelo negócio:** marcar, orçar, lembrar o retorno, ocupar a busca por serviço e por bairro, ser lembrado |

**Cinco regras valem para os três degraus:**

1. **O piso de qualidade é o mesmo, e o design é premium nos três.**
   - **O quê:** régua aprovada, avaliação anti-IA sem marca de peso alto, conformidade, acessibilidade e desempenho no aparelho modesto; e o acabamento do design no nível dos premiados, no computador e no celular, com o piso do acabamento (as sete camadas e o teste da vitrine) e sem teto de peso (`00-principios.md`, seção 9; pedidos do usuário em 08.10.2026).
   - **A hierarquia continua:** o premium é o piso, e a diferença entre os degraus está na profundidade da identidade, na camada de movimento, no que o site faz, no tamanho e na fotografia (a seção 2, eixo por eixo). O Essencial é premium e contido; o Completo é premium e tem a assinatura. O cliente tem de ver a diferença ao comparar os três exemplos.
   - **Objetivo:** o Essencial é um site pequeno e acabado, não um site grande pela metade. Nenhum plano é o rascunho de outro.
2. **Cada plano inclui o que o anterior inclui** (ata v3.0, IV.2.1).
3. **O movimento é consequência da tarefa, e cada camada vem inteira.**
   - **Por degrau:** a revelação e a matéria apresentam (Essencial), a resposta à ação e a matéria que responde à mão confirmam (Profissional), a assinatura, a cena e o 3D distinguem (Completo) (`09-movimento.md`, seção 4).
   - **Objetivo:** um gesto de um degrau acima, num degrau abaixo, apaga a diferença que o cliente compra ao subir.
4. **A identidade cresce em profundidade, e o acabamento é o mesmo.** Do sistema do nicho ajustado à marca (Essencial) à identidade própria (Profissional) e à identidade própria com uma peça-assinatura (Completo). Os efeitos da identidade estão nos três, na medida da camada (`09-movimento.md`, seção 12); o que não entra é o efeito de catálogo.
5. **Aparecer nas buscas e nas respostas de IA é da base, nos três** (DECIDIDO em 16.10.2026, a pedido do usuário: "adicione a capacidade de aparecer nas pesquisas e nas IAs em todos os sites, independentemente do plano").
   - **O quê:** o `robots.txt` que libera os robôs de busca e de IA, o mapa do site com a data verdadeira, o título que diz o que se vende e onde, os dados estruturados do conteúdo visível, o texto que o robô lê sem montar a página, o `llms.txt`, o aviso ao IndexNow em cada publicação e a lista do que depende do dono (Search Console, Bing, Perfil da Empresa) (`21-busca-e-ias.md`).
   - **Não é diferencial de plano:** o vendedor não a oferece como item do Profissional ou do Completo. O que o Completo acrescenta são as páginas de busca por serviço, profissional e bairro (seção 2, eixo Busca), não a capacidade.
   - **Objetivo:** a tarefa do Essencial é "ser encontrado e chamado" (o quadro acima). Um site que a busca e as IAs não acham falha na primeira tarefa da escada, em qualquer degrau.

**O que o vendedor não usa como argumento:** "o Completo tem mais animação". O argumento é a tarefa do site e o que ela faz pelo negócio (ata v3.0, IV.1: padrão de execução, eficiência, preço declarado).

**Objetivo da escada pela tarefa.** A escada anterior, a do texto do site, diferenciava os planos sobretudo pela quantidade de movimento. A análise de 07.10.2026, feita na sessão de desenvolvimento e sem registro em documento do repositório [FU], achou três fraquezas: em design, o movimento é o eixo mais fraco, porque o dono do negócio compra agendamento, pedido e confiança, não animação; o Essencial ficava menos premium por regra, o que contraria o posicionamento do Atlas, "um produto entregue muito acima do padrão" (contexto comercial, §1); e, nos sites premiados, quem investe mais recebe mais direção de arte, fotografia, texto e uma interação própria do ramo (estudo do Awwwards de 07.10.2026: `12-inspiracao-e-referencias.md`, seções 3.4 e 4). Por isso o que sobe de degrau é o que o site faz pelo negócio, e o piso de qualidade não muda.

---

## 2. A escada, eixo por eixo

| Eixo | Essencial [E] | Profissional [P] | Completo [C] |
|---|---|---|---|
| **Criação · mensalidade** (ata, DECIDIDO) | R$ 900 · R$ 190 | R$ 1.500 · R$ 250 | R$ 2.400 · R$ 400 |
| **Páginas** (ata) | Até 3; cada página a mais é a Página adicional, R$ 250 | Até 6; idem | **Sem limite** de páginas criadas |
| **Texto** (ata) | Redação incluída | Idem | Idem |
| **Contato e local** (ata) | Botão de WhatsApp e mapa | Idem | Idem |
| **Busca** (ata) | Otimização para a busca local e, desde 16.10.2026, para as respostas de IA (DECIDIDO; `21-busca-e-ias.md`): a mesma base nos três | Idem | Idem; mais as páginas de busca por serviço, profissional e bairro (RATIFICADO; a ata não as lista) |
| **Conversão** | WhatsApp com mensagem pronta, telefone, mapa, horário, prazo de resposta | + **formulário** (pedido organizado, com aviso de privacidade) e **galeria** | + as funcionalidades que fazem o trabalho (marcar, orçar, lembrar) |
| **Funcionalidade sob medida** (ata) | — | Uma, do ofício do cliente | Duas |
| **Direção de arte** | O **sistema do nicho** (paleta, tipografia e forma estudadas para o ramo), ajustado à marca do cliente | **Identidade própria:** tipografia escolhida para a marca, paleta própria, forma própria | Identidade própria **e uma peça-assinatura** do ofício (objeto 3D, mapa do bairro, ilustração encomendada) |
| **Fotografia** | As fotos do cliente pelo protocolo (celular, no mínimo três por categoria do nicho; o formulário de briefing v1.0 e a definição dos planos de 07.10.2026 diziam "no mínimo seis" no total: `02-briefing.md`, Origem) | **Sessão guiada** no estabelecimento, pelo protocolo (celular e luz; 20 a 30 fotos) | Sessão guiada ampliada, com vídeo curto onde o nicho pede (restaurante); fotógrafo profissional como item a orçar |
| **Movimento** (ata, revista em 09.10.2026) | **O toque Atlas inteiro** (`19-o-padrao-atlas.md`): a assinatura da capa em movimento (SVG, CSS, canvas 2D), a matéria, a luz, a inclinação, o vidro, a entrada orquestrada, as transições | + o objeto em CSS 3D, a galeria, o estado ao vivo e a resposta à ação | + o objeto em WebGL e a cena ligada à rolagem (`09-movimento.md`, seções 4 e 12) |
| **Acabamento** (`00-principios.md`, seção 9) | O piso das sete camadas e o teste da vitrine, ao lado da nutrição | Idem, ao lado do depósito | Idem, ao lado da barbearia |
| **Gesto do Spell UI** | Revelação: o marca-texto (ou a tarja, nunca no título: `09-movimento.md`, seção 6.2) | Utilidade: copiar, espera | Camada completa: onda, brilho, inclinação |
| **Acompanhamento** (ata) | Manutenção mensal (texto, preço, horário) | + **relatório mensal de acessos** (dados da Hostinger) | + **revisão trimestral** de conteúdo e **atendimento prioritário** |
| **O que a mensalidade compreende** (ata, IV.2.1, 5) | Domínio, hospedagem, certificado de segurança e manutenção mensal | Idem | Idem |
| **Onde roda** | Estático, na hospedagem comum, se não houver módulo com servidor | Web app Node.js (o formulário exige servidor) | Web app Node.js |
| **Publicação depois do rascunho aprovado** (RATIFICADO) | Até 7 dias úteis | Até 10 dias úteis | Até 15 dias úteis |
| **Resposta ao cliente na manutenção** (RATIFICADO) | Até 1 dia útil | Até 1 dia útil | No mesmo dia útil (o "prioritário") |

*Os prazos de publicação por plano cabem nos "sete a quinze dias úteis" da ata (IV.4); a resposta ao cliente dá número ao "atendimento prioritário", que hoje não tem.*

*As páginas legais — o aviso de privacidade e a declaração de acessibilidade — não contam no limite de páginas do plano (RATIFICADO): são obrigação, não conteúdo (`17-conformidade-e-normas.md`, seção 4).*

---

## 3. Essencial [E]

### 3.1 · Para quem

O profissional ou o negócio pequeno, com um serviço principal e um decisor, que hoje só existe no boca a boca e no Instagram. Precisa de um endereço próprio que responda o básico e leve ao WhatsApp. Ticket baixo; decisão rápida.

**Nichos de referência:**
- nutrição (2º na ordem comercial);
- pet shop (6º);
- psicologia (9º);
- advocacia (12º).

**O que os une:** o conselho limita o que se pode mostrar (nutrição, psicologia, advocacia), ou o ticket é baixo (pet shop). E a coleta pelo site fica fora, pelo sigilo e pela norma (`nichos/README.md`).

### 3.2 · O que o site faz

Numa tela de celular, diz quem é, o que faz, onde e quando, e oferece a ação de chamar. Nada mais.

### 3.3 · Estrutura (até três páginas)

| Página | Objetivo | Conteúdo, na ordem |
|---|---|---|
| **Início** | Ser entendido em cinco segundos e chamar | A capa (nome, a frase do que faz nas palavras do dono, a ação na primeira tela do celular); os serviços em resumo; as ausências declaradas; o horário e o caminho; o registro do conselho |
| **Serviços ou valores** | Responder "o que entra, quanto tempo, quanto custa" antes do contato | O que cada serviço compreende; a duração; o preço quando o conselho permite; a forma de pagamento |
| **Contato ou o lugar** | Levar até a porta | Endereço com o mapa do bairro em vetor (sem pedido externo) e o vínculo para o mapa externo; horário dia a dia; telefone; WhatsApp; prazo de resposta; registro do conselho; razão social e CNPJ do cliente, ou nome e registro do conselho (leitura cautelosa: `17-conformidade-e-normas.md`, seção 3.1) |

**Implementação de referência:** a Nutrição Icaraí, no repositório do Atlas (`web/app/demos/nutricao/`): A consulta, Valores, Consultório.

### 3.4 · Obrigatório em toda página [E]

- A ação (WhatsApp com mensagem pronta) visível na primeira tela do celular, até 60% da altura.
- O registro profissional, quando houver conselho, **também no cabeçalho do celular** (em setembro, sumia abaixo de 480 px em onze de doze demos).
- O prazo de resposta ao contato.
- As marcações de compartilhamento: título, descrição e imagem distintos por página.
- O crédito "Site por Atlas Digital", em texto, no rodapé.

### 3.5 · Identidade [E]

O **sistema do nicho** (`nichos/<nicho>.md`, seção de direção de arte), ajustado à marca do cliente:
- o logotipo dele, ou um letreiro tipográfico se não houver;
- a cor dele, quando existir e tiver contraste;
- **uma família de fonte, ou duas com papéis distintos**, licenciadas e hospedadas.

O plano de design e a avaliação anti-IA valem como em todo plano: o sistema do nicho é ponto de partida, nunca resultado, e dois clientes do mesmo nicho no Essencial não podem sair iguais (`04-direcao-de-arte.md`, seção 6).

### 3.6 · Movimento [E]

**O toque Atlas inteiro** (`19-o-padrao-atlas.md`; `09-movimento.md`, seção 4; desde 09.10.2026, pedido do usuário: "sites tão trabalhados como o Atlas, independente do plano"):
- a entrada da capa, orquestrada, uma vez, em até 600 ms; a revelação ao entrar na tela, onde ela é o momento da cena, e nunca em toda seção (`20-repeticao-dentro-do-site.md`); a transição entre páginas;
- **a assinatura da capa em movimento,** construída em SVG, CSS ou canvas 2D, com o ambiente pausável e parado fora da tela;
- **os efeitos da identidade** (`09-movimento.md`, seção 12): a matéria na superfície, a luz da marca que responde ao ponteiro na mesa e ao toque no celular, o brilho do material nas ações, as sombras longas, a inclinação e o relevo, o vidro onde serve à leitura.

**O que o Essencial não tem:** o objeto em 3D (CSS 3D ou WebGL), a cena ligada à rolagem, a galeria, o estado ao vivo e a funcionalidade do ofício. **Um gesto de revelação:** o marca-texto numa palavra-chave que **não** seja do título (destacar uma palavra do título está entre as marcas mais comuns de página gerada: `11-anti-ia.md`).

### 3.7 · O rascunho de 24 horas [E] contém

- As três páginas completas.
- O texto real, escrito a partir do briefing.
- As fotos do cliente, tratadas.
- A régua aprovada.

### 3.8 · Fora do Essencial

Formulário, galeria, funcionalidade sob medida, relatório de acessos, revisão trimestral, peça-assinatura, página além da terceira (que vira Página adicional). O ambiente da assinatura e as passivas são de todo plano (`09-movimento.md`, seções 4 e 14).

### 3.9 · Esforço [E] (estimativa)

~4 a 6 horas de sócio:
- briefing de 30 min;
- direção de arte em 1 h;
- revisão em 1 h;
- conformidade em 30 min;
- rodadas e publicação em 1 a 2 h.

O código e o texto ficam, na maior parte, com o Claude Code.

---

## 4. Profissional [P] *(o recomendado)*

### 4.1 · Para quem

O negócio que é comparado antes da compra: tem catálogo, serviços variados ou obra para mostrar, e perde cliente por não responder a dúvida antes do contato. Precisa provar e receber o pedido organizado.

**Nichos de referência:**
- construção (1º);
- restaurante (5º);
- oficina (7º);
- academia (8º).

**O que os une:** são comparados antes da compra, vendem por foto e por detalhe, e a funcionalidade do ofício decide (a calculadora, o montador de pedido, o diagnóstico por zona do carro, a grade de aulas).

### 4.2 · O que o site faz

Mostra com imagem e detalhe, responde as perguntas que o balcão responde todo dia e transforma o interesse num pedido que chega pronto.

### 4.3 · Estrutura (até seis páginas)

| Página | Objetivo |
|---|---|
| **Início** | A capa e o caminho para as outras páginas; o que distingue o negócio |
| **O catálogo ou os serviços** | Mostrar o que há, agrupado, com o que cada item compreende |
| **A funcionalidade sob medida** | A página da ferramenta do ofício (calcular, montar o pedido, filtrar, consultar a grade) |
| **A galeria ou as obras** | Provar com fotos reais, legendadas |
| **A casa** | História, equipe, método; o que o negócio não faz |
| **O pedido ou o contato** | O formulário e os canais; o horário; o mapa; o prazo de resposta |

**Implementação de referência:** o Depósito Engenhoca, no repositório do Atlas (`web/app/demos/deposito/`): Materiais, Calculadora, Entrega, Orçamento, A casa.

### 4.4 · Funcionalidades [P]

- **Galeria** com as fotos da sessão guiada (`14-funcionalidades/03-galeria.md`).
- **Formulário:**
  - campos mínimos e aviso de privacidade;
  - proteção sem terceiros: campo-armadilha, carimbo de tempo, limite por IP;
  - entrega por e-mail;
  - continua funcionando sem script.

  Coletando, vale o pacote de conformidade inteiro (`14-funcionalidades/02-formulario.md`).
- **Uma funcionalidade sob medida, do ofício** (`14-funcionalidades/07-funcionalidades-do-oficio.md`, escolhida com o dono na lista do nicho).
- **Relatório mensal de acessos:** dos dados da Hostinger, sem cookie (`14-funcionalidades/04-relatorio-de-acessos.md`).

### 4.5 · Identidade [P]

Própria da marca (`04-direcao-de-arte.md`):
- **tipografia** escolhida para ela, com a licença conferida;
- **paleta** própria, com o contraste medido;
- **forma** própria (cantos, retícula, textura), com o motivo escrito;
- **painéis de estilo:** dois ou três antes do código;
- **avaliação anti-IA** obrigatória antes do rascunho, com o teste de unicidade contra os clientes do mesmo nicho e contra três concorrentes locais.

### 4.6 · Movimento [P]

O do Essencial, mais:
- **o objeto da assinatura em CSS 3D:** faces, relevo e giro, como a peça de cerâmica ou o quadro-negro de madeira;
- **a resposta à ação:** o "copiar" que confirma só se copiou, e a espera visível onde se espera;
- **a navegação viva:** a aba da página atual, o estado ao vivo — "aberto agora", o corte da entrega;
- **a galeria de deslizar.**

**O que o Profissional não tem:** o WebGL e a cena ligada à rolagem.

### 4.7 · O rascunho de 24 horas [P] contém

- Todas as páginas, com o texto real.
- A galeria com as fotos tratadas.
- A funcionalidade sob medida em versão inicial, já funcionando.

### 4.8 · Fora do Profissional

A segunda funcionalidade sob medida, a peça-assinatura, o 3D, a revisão trimestral, o atendimento prioritário, páginas além da sexta (viram Página adicional). O ambiente da assinatura e as passivas são de todo plano (`09-movimento.md`, seções 4 e 14).

### 4.9 · Esforço [P] (estimativa)

~9 a 13 horas de sócio:
- briefing de 45 min;
- fotos no local em 1 h;
- direção de arte em 2 a 3 h;
- revisão em 2 h;
- conformidade em 1 h;
- rodadas e publicação em 2 a 3 h.

---

## 5. Completo [C]

### 5.1 · Para quem

O negócio que quer operar pelo site — marcar horário, orçar, preparar a consulta, lembrar o retorno — e a marca com ambição de ser lembrada. Ticket maior; o site é parte do atendimento.

**Nichos de referência:**
- barbearia (3º);
- odontologia (4º);
- medicina (10º);
- imobiliária (11º).

**O que os une:** o site faz parte do atendimento (marcar, preparar, filtrar) ou precisa de muitas páginas (um imóvel, um tratamento, um tipo de consulta por página).

**Ressalva registrada:** a barbearia típica de bairro compraria o Profissional com a Agenda. O Completo fica como referência porque o site de exemplo mostra a camada inteira.

### 5.2 · O que o site faz

Tudo o que o Profissional faz, e mais:
- **executa** parte do atendimento: marcar, orçar, preparar a consulta, calcular a janela de retorno;
- **ocupa a busca local** com uma página por serviço, por profissional, por bairro ou unidade;
- **é lembrado** por uma peça-assinatura que só esta marca tem.

### 5.3 · Estrutura (sem limite de páginas)

As do Profissional, mais:
- as páginas por serviço, por profissional, por bairro ou unidade;
- as páginas das duas funcionalidades;
- o conteúdo editorial: guias e perguntas do ramo.

**Implementação de referência:** a Barbearia Santa Rosa, no repositório do Atlas (`web/app/demos/barbearia/`), com sete páginas: Início, Serviços, A casa, Equipe, Agendar, Retorno, Onde.

### 5.4 · Funcionalidades [C]

- **Duas funcionalidades sob medida.** Na barbearia: o pedido de horário e a janela de retorno.
- **A Agenda**, quando o cliente quer a marcação de verdade: o módulo, no próprio site, com servidor próprio (`14-funcionalidades/05-agenda.md`).
- **Revisão trimestral de conteúdo:** releitura dos textos, preços, fotos e páginas de busca, com relatório.
- **Atendimento prioritário:** resposta no mesmo dia útil (RATIFICADO).

### 5.5 · Identidade [C]

Própria, com uma **peça-assinatura do ofício** (`14-funcionalidades/08-peca-assinatura.md`):
- objeto 3D em WebGL próprio (as fichas de latão da barbearia), objeto do ofício em CSS 3D com a matéria da marca, mapa do bairro desenhado, ilustração encomendada ou som;
- **é peça de vitrine:** em escala de capa, com a matéria, a luz e o movimento da marca. Um diagrama de traço fino é funcionalidade, não peça-assinatura;
- passa no teste do desconhecido;
- com 3D, cumpre as cinco condições (`09-movimento.md`, seção 7);
- avaliação anti-IA completa, com o **teste de unicidade** contra três concorrentes locais.

### 5.6 · Movimento [C]

O do Profissional, mais:
- **o objeto da assinatura em WebGL,** nas cinco condições (`09-movimento.md`, seção 7);
- **a cena ligada à rolagem:** a assinatura que acompanha a rolagem, como o palco da barbearia (`09-movimento.md`, seção 5, item 7);
- **as interações de conteúdo** (`09-movimento.md`, seção 13.2): a imagem do item junto do ponteiro, o rótulo do ponteiro sobre a imagem, a assinatura que segue o ponteiro, os números que contam, a transição de página com a assinatura e o menu que abre como cena. Em toda cena, algo responde à mão além das ações;
- os gestos de onda, brilho e inclinação.

Sempre só `transform` e `opacity`, com reserva sem script e parado com movimento reduzido.

**Nos nichos de saúde e de escuta** (odontologia, medicina, psicologia, nutrição), o movimento é **sereno**, não menor: as curvas lentas, nada de quique nem de brilho em promessa, a camada do plano inteira. Desde 08.10.2026, à noite, o "contido mesmo no Completo" saiu (pedido do usuário: "isso até mesmo para outras categorias, mas respeitando a hierarquia"). O que a norma do conselho veda é o sensacionalismo no conteúdo, não o acabamento.

### 5.7 · O rascunho de 24 horas [C] contém a versão inicial

Meta do usuário em 07.10.2026: "criar um site em sua versão inicial, com a maioria das funcionalidades trabalhadas por ti".
- As páginas principais, com o texto real.
- As duas funcionalidades em versão inicial, construídas pelo Claude Code.
- A peça-assinatura na versão de **reserva** (estática), a mesma que aparece sem WebGL.

A versão final da peça e as páginas de busca chegam até a publicação.

**Objetivo.** O Completo inclui páginas sem limite, duas funcionalidades sob medida e uma peça-assinatura (no exemplo, um motor WebGL próprio) por R$ 2.400, ou R$ 1.200 na Condição de Fundação, e o esforço dele nunca foi medido: não há horas medidas, e um site completo em 24 horas seria irrealista para trabalho sob medida. Por isso o rascunho do Completo é a versão inicial, e as horas se medem no primeiro cliente do plano (análise de 07.10.2026, na sessão de desenvolvimento [FU]; RATIFICADO).

### 5.8 · Esforço [C] (estimativa)

~15 a 22 horas de sócio:
- briefing de 1 h;
- fotos no local em 2 h;
- direção de arte em 4 a 6 h;
- revisão em 3 a 4 h;
- conformidade em 1 a 2 h;
- rodadas e publicação em 4 a 6 h.

A primeira Agenda custa de 40 a 80 h a mais, uma vez só (`14-funcionalidades/05-agenda.md`).

---

## 6. O que nenhum plano faz

- **Inventar:** depoimento, número sem fonte, foto de banco, imagem de IA, selo, prêmio.
- **Fazer o que o conselho veda:**
  - preço na odontologia (Código de Ética, art. 44) e honorário na advocacia (Provimento 205/2021);
  - promessa de resultado na nutrição (CFN 599/2018) e na medicina;
  - imagem do procedimento em andamento na odontologia (CFO-196/2019, art. 3º).

  **O antes e depois odontológico** fica fora. A CFO-196/2019 (art. 2º) o permite com termo de consentimento e só pelo dentista que fez o tratamento; a nota do CFO de 16.01.2026 lê a CFO-196/2019 como proibindo a divulgação de resultados por terceiros, inclusive pessoas jurídicas [V]. Na clínica, vedado; no consultório, o Atlas não publica paciente (`nichos/odontologia.md`, seção 3).
- **Coletar dado sem formulário declarado** e sem o pacote de conformidade.
- **Rastrear o visitante:** nenhum cookie e nenhuma analítica de terceiros no site público.
- **Prometer "site pronto em 24 horas":** o que chega em 24 horas é o rascunho navegável.

---

## 7. Pedido misto, mudança de plano e o que se orça

| Situação | O que fazer | Por quê |
|---|---|---|
| **[E] com a Agenda** | Permitido: o módulo se vende em qualquer plano. O site passa a rodar num web app Node (a Agenda exige servidor) | O módulo é independente do plano (ata, IV.2) |
| **[E] com formulário** | O formulário é do Profissional. Oferecer a subida para o Profissional, ou orçar o formulário como funcionalidade fora do plano, **antes** de fazer | Cada plano inclui o anterior; o formulário traz servidor e obrigações da LGPD |
| **Página além do limite** (E, P) | Página adicional, R$ 250, sem recorrência, orçada antes | Ata, IV.2 |
| **Segunda funcionalidade no [P]** | Subida para o Completo, ou orçamento à parte antes de fazer | A quantidade de funcionalidades é o que separa P de C |
| **Gesto ou movimento de um plano acima** | Não entra: explicar que é da camada de cima | O gesto de cima apaga a diferença entre os planos |
| **Subir de plano depois de publicado** | Paga-se a diferença da criação e a mensalidade nova a partir do mês seguinte (RATIFICADO); o que já existe se aproveita | Nada se refaz à toa |
| **Descer de plano** | O que excede o novo plano sai do site no ciclo seguinte; registrar o que saiu (RATIFICADO) | O escopo acompanha o que se paga |
| **Pedido fora do escopo durante as rodadas** | Orçar antes de fazer; nunca cobrar depois | Contexto comercial, §4 |
| **Pedido que fere o conselho** | Recusar, citando a norma, e registrar | A norma manda (`00-principios.md`, princípio 2) |
| **Pedido de desconto na mensalidade** | Não reduzir a mensalidade: o desconto vai só na criação. Quem pede desconto recorrente recebe o congelamento da mensalidade por doze meses (DECIDIDO em 05.08.2026, ata v1.0, bloco 07; **vigência indefinida**: a ata v2.0 não a repete e a v3.0 não a traz) | Contexto comercial, §8; os pacotes de agosto a contradiziam (seção 8) |

**A Condição de Fundação** (ata v3.0, IV.3, DECIDIDO): os três primeiros contratos pagam metade da criação e têm a mensalidade congelada por doze meses. Pela tabela, a criação fica em R$ 450 (E), R$ 750 (P) e R$ 1.200 (C) — valores calculados, A CONFIRMAR, porque a fonte diz só "metade". Os três contratos têm o estudo de caso com autorização assinada no início, e a condição se encerra com eles.

**O pagamento:** a criação em duas parcelas, metade no briefing e metade na publicação (ata v3.0, IV.2.1, item 5, ratificado em 08.10.2026). A mensalidade começa no mês seguinte à publicação: afirmação do texto do site de 08.09.2026, **sem fonte em ata** (A CONFIRMAR; `01-processo.md`, etapa 12).

---

## 8. Os módulos

**As páginas do módulo não contam no limite de páginas do plano** (RATIFICADO em 08.10.2026, como as páginas legais): a marcação, a confirmação, o cancelamento e o painel da Agenda, e a confirmação do formulário. O módulo tem preço próprio, e as páginas dele são o funcionamento do módulo, não conteúdo.

| Módulo | Para quem | O que entrega | Preço (ata) | Documento |
|---|---|---|---|---|
| **Agenda** | Quem atende por horário: barbearia, nutrição, psicologia, academia, pet shop, odontologia, medicina; a imobiliária, para visitas; o restaurante, só com reserva de mesa; a oficina, opcional (a advocacia não leva módulo: `nichos/README.md`, seção 1) | Marcação e confirmação **no próprio site, com servidor próprio**: horários livres, reserva sem conflito, e-mail com convite de calendário, lembrete, painel do dono, cancelamento | +R$ 400 e +R$ 80/mês | `14-funcionalidades/05-agenda.md` |
| **Presença** | Todos, com cautela nos regulados, menos a psicologia (sigilo) e a advocacia (nenhum módulo); quadro em `14-funcionalidades/06-presenca.md`, seção 3 | Perfil da empresa no Google e gestão de avaliações. *A função não tem titular desde 30.09 (ata, I.3)* | +R$ 300 e +R$ 100/mês | `14-funcionalidades/06-presenca.md` |
| **Página adicional** | Essencial e Profissional | Redação, diagramação e publicação de uma página nova | R$ 250, sem recorrência: é evento, não assinatura (ata v3.0, IV.2) | Este documento, seção 7 |

**Fora da tabela, sem vigência** (contexto comercial, §8; não oferecer): o módulo Conteúdo, os pacotes (Profissional + Agenda, Consultório, que contradizem a regra de desconto só na criação), a garantia, o "sem fidelidade", o e-mail profissional, o prazo único de dez dias úteis.

Os números, para reconhecer essas regras quando aparecerem num documento antigo ou na fala de alguém (contexto comercial do repositório do Atlas, §8) [V]:

| Regra de agosto de 2026 | O que dizia | Por que não se oferece |
|---|---|---|
| Entregas por plano | Essencial: 3 páginas, 1 alteração por mês · Profissional: 5 páginas, 3 alterações por mês, 1 e-mail profissional · Completo: 5 páginas mais catálogo ou blog, 6 alterações por mês, 5 e-mails | A ata v3.0 (IV.2.1) fixa 3, 6 e sem limite de páginas; a mensalidade vigente não tem limite de alterações (`18-publicacao-e-manutencao.md`, seção 7.1) |
| Módulo Conteúdo | +R$ 150/mês, sem criação: uma página nova ou uma atualização de conteúdo por mês | Fora da tabela vigente |
| Pacote Profissional + Agenda | R$ 1.700 de criação · R$ 300/mês | R$ 250 + R$ 80 = R$ 330: desconto recorrente de R$ 30/mês, contra a regra de desconto só na criação |
| Pacote Consultório (Completo + Agenda + Presença) | R$ 2.700 · R$ 520/mês | R$ 400 + R$ 80 + R$ 100 = R$ 580: desconto recorrente de R$ 60/mês |
| Garantia | Rascunho de 24 horas não aprovado encerra o contrato sem custo | Fora da versão vigente |
| Prazo de publicação | 10 dias úteis, igual para todos | A ata v3.0 (IV.4) diz de 7 a 15 dias úteis |
| Fidelidade | Nenhuma: o cliente cancela quando quiser | Fora da versão vigente |

Reativar qualquer uma é decisão dos sócios, registrada; até lá, vale a tabela da seção 2.

---

## 9. O aceite de cada plano

O que precisa estar verde para o rascunho sair e para a publicação; o detalhe está em `../qualidade/14-ciclo-de-qa.md`.

| Item | [E] | [P] | [C] |
|---|---|---|---|
| Régua sem falha nas páginas do plano | ✓ | ✓ | ✓ |
| Avaliação anti-IA sem marca de peso alto, com o teste de unicidade (`04-direcao-de-arte.md`, passo 9) | ✓ (contra os clientes do mesmo nicho) | ✓ (e contra três concorrentes locais) | ✓ (idem) |
| Lista de revisão de 22 itens (`../qualidade/11-design-e-anti-ia.md`) | ✓ | ✓ | ✓ |
| Normas do nicho conferidas no texto final | ✓ | ✓ | ✓ |
| Ação na primeira tela do celular | ✓ | ✓ | ✓ |
| Funcionalidade sob medida de ponta a ponta, com e sem script | — | ✓ (uma) | ✓ (duas) |
| Formulário: envio, falha e aviso de privacidade | — | ✓ | ✓ |
| Agenda: marcar, corrida de dois pedidos, cancelar, lembrete, fuso | Se contratada | Se contratada | Se contratada |
| Peça-assinatura com reserva sem WebGL e parada com movimento reduzido | — | — | ✓ |
| A barreira do travamento no aparelho médio, sem falha (régua, passagem 2b; `15-desempenho.md`, seção 2.1); LCP e TBT só medidos, sem meta nem porta de regressão (desde 08.10.2026, à noite, decisão de Gabriel Ribeiro Ota Yida) | ✓ | ✓ | ✓ |
| A régua dos quadros sem falha, em duas sessões: 60 quadros por segundo na rolagem, no menu, na navegação e na figura, no celular 4× e na mesa (`15-desempenho.md`, seção 2.4; desde 28.10.2026) | ✓ | ✓ | ✓ |
| As passivas, onde houver, sem falha: as três paradas e a amplitude, sem cota (`conferir-passivas`; `09-movimento.md`, seção 14; revisto em 03.11.2026) | ✓ | ✓ | ✓ |
| Leitor de tela (roteiro curto) | ✓ | ✓ | ✓ |
| Porta de publicação da conformidade | ✓ | ✓ | ✓ |
| Aparece nas buscas e nas IAs: `robots.txt`, mapa do site, `llms.txt`, JSON-LD e o texto que o robô lê (`21-busca-e-ias.md`, seção 11; DECIDIDO em 16.10.2026) | ✓ | ✓ | ✓ |

---

## 10. Quem faz o quê, e o esforço

| Etapa | Quem | [E] | [P] | [C] |
|---|---|---|---|---|
| Briefing no estabelecimento | Gabriel Ribeiro Ota Yida | 30 min | 45 min | 1 h |
| Fotografia pelo protocolo | O cliente ([E]) ou o sócio do briefing | O cliente envia | 1 h no local | 2 h no local |
| Direção de arte | Matheus Castro Oliveira de Luna Garcia | 1 h | 2–3 h | 4–6 h |
| Construção do rascunho (código e texto) | **Claude Code**, sob direção | Maior parte | Maior parte | Maior parte, inclusive as funcionalidades |
| Revisão: régua, anti-IA, texto | Claude Code e Matheus Castro Oliveira de Luna Garcia | 1 h | 2 h | 3–4 h |
| Conformidade | Matheus Azevedo Abreu | 30 min | 1 h | 1–2 h |
| Rodadas e publicação | Claude Code e o sócio de desenvolvimento | 1–2 h | 2–3 h | 4–6 h |
| **Horas de sócio, estimadas** | | **~4–6 h** | **~9–13 h** | **~15–22 h** |

**Como ler.**
- **Por hora de sócio, contra a criação cheia:** ~R$ 150–225 no Essencial, ~R$ 115–165 no Profissional, ~R$ 110–160 no Completo. Na Condição de Fundação, pela metade.
- **Medição:** medir as horas reais no primeiro cliente de cada plano e corrigir esta tabela.
