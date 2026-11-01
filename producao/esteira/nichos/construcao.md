# Material de construção · Profissional

> **Para que serve.** Tudo o que um site de depósito de material de construção precisa, do briefing à entrega: a norma, as páginas, a calculadora, a direção de arte de partida, o texto e a conferência. Vale para o depósito de bairro que vende no balcão e entrega com caminhão próprio.
>
> **Estado.** Ordem comercial (1º) e plano de referência (Profissional): RATIFICADO (decidido em 07.10.2026; ratificado em 08.10.2026). Norma: o Código de Defesa do Consumidor e o decreto do comércio eletrônico, conferidos no texto oficial [V]; nenhum conselho. Direção de arte: RATIFICADO.
>
> **Leia com.** `README.md` (o quadro comum); `../03-planos.md`, seção 4; `../14-funcionalidades/07-funcionalidades-do-oficio.md`; `../17-conformidade-e-normas.md`.
>
> **Implementação de referência.** O Depósito Engenhoca, no repositório do Atlas: `web/app/demos/deposito/` (seis páginas), o conteúdo em `web/conteudo/demos/deposito.ts`, a calculadora em `web/components/ilhas/demos/calculadora.tsx`, o estado da loja em `estado-da-loja.tsx`.
>
> **Atualizado em:** 08.10.2026.

---

## 1. Ficha

| Campo | Valor |
|---|---|
| **Ordem comercial** | **1º de 12.** Razão de 29.08.2026: "ticket alto, decisão de um só, zero regulação". Conferida em 07.10.2026: volume 3, facilidade 5, ticket 4, atrito 5 — 1º com os dois pesos (4,10 e 4,55) (`README.md`, seção 4) |
| **Plano de referência** | **Profissional** [P]: catálogo, fotos do pátio e do caminhão, orçamento; o visitante compara antes de comprar, e a calculadora decide (contexto de nichos do Atlas, 5.1) |
| **Módulos** | **Presença** (perfil no Google). Agenda não se aplica: o depósito não trabalha com hora marcada |
| **Norma** | Nenhum conselho. CDC (Lei 8.078/1990), arts. 30, 31, 35, 37 e 49; Decreto 7.962/2013, art. 2º (`../17-conformidade-e-normas.md`) |
| **Preço no site** | **Permitido**, e vincula o depósito (CDC, art. 30) [V] |
| **Volume em Niterói** | CNAE 47.44-0 (ferragens, madeira e materiais de construção): 503 unidades em 2022, 538 em 2023, **550 em 2024**; 2.343 pessoas ocupadas (IBGE/CEMPRE, tabela 9528, sem MEI) [V] |
| **Público** | Quem decide é o dono do depósito, sozinho. Quem visita o site: o pedreiro ou mestre de obras, do canteiro, pelo celular; e o morador que reforma, que não sabe quanto material comprar |
| **Site de exemplo** | **Depósito Engenhoca**, Engenhoca, "desde 1998" [ex]: seis páginas em Next.js (Início, Materiais, Calculadora, Entrega, Orçamento, A casa). A versão estática de setembro ("obra") existe só em pacote |

---

## 2. O cliente e a dor

**Quem decide e quanto paga.** O dono, sem sócio para consultar. Profissional: R$ 1.500 de criação e R$ 250 por mês; Presença, +R$ 300 e +R$ 100 por mês (ata v3.0, IV.2).

**O que o visitante procura**, na ordem em que pergunta ao balcão:
1. Se tem o material agora, e quanto custa.
2. Se entrega no bairro dele, e até que horas o pedido entra na entrega do mesmo dia.
3. Quanto material comprar para a área que ele tem.
4. O horário, e se o balcão está aberto agora.
5. Como pagar, e qual é o frete.

**A dor registrada** (documento comercial de 15.08.2026, no repositório do Atlas: `comercial/atlas--produtos-e-esteira--2026-08-15.html`): "cliente não acha preço, horário nem se a loja entrega".

**A tarefa do site no Profissional — ser escolhido.**
- Responder antes do telefonema o que o balcão responde todo dia.
- Transformar a obra do visitante numa lista com quantidades, que chega pronta ao WhatsApp.
- Provar com foto: o pátio, o estoque, o caminhão.

**O que distingue o depósito de bairro** (e o site precisa dizer com número): o caminhão é da casa; a hora do corte da entrega; a troca de material íntegro; os anos no mesmo endereço. No exemplo: "1998 · no mesmo endereço", "15h · corte para a entrega do mesmo dia", "0 · intermediários: o caminhão é da casa", "7 · dias para trocar material íntegro".

---

## 3. Normas

Nenhum conselho regula o ramo. Valem as regras de consumo, e elas pesam exatamente onde o site é forte: preço e entrega publicados.

| Tema | Regra | Fonte | Evidência |
|---|---|---|---|
| **Preço publicado vincula** | "Toda informação ou publicidade, suficientemente precisa [...] obriga o fornecedor que a fizer veicular". Preço desatualizado no site é oferta que o depósito terá de cumprir | CDC, art. 30 | [V] |
| **Recusa da oferta** | Se o depósito recusar o preço publicado, o consumidor pode exigir o cumprimento, aceitar equivalente ou rescindir | CDC, art. 35 | [V] |
| **Informação** | Correta, clara, em português, com preço, quantidade e prazo | CDC, art. 31 | [V] |
| **Publicidade enganosa** | Vedada, "mesmo por omissão" (ex.: "entrega grátis" sem dizer o raio e o pedido mínimo) | CDC, art. 37, § 1º | [V] |
| **Site que oferta com preço** | Em destaque: nome empresarial e CNPJ (ou CPF); endereço físico e eletrônico; características do produto; **despesas de entrega discriminadas no preço**; condições integrais (pagamento, disponibilidade, prazo de entrega); restrições da oferta | Decreto 7.962/2013, art. 2º | [V] texto; se alcança o pedido fechado pelo WhatsApp é leitura do Atlas [NV] — por cautela, cumprir |
| **Arrependimento** | Compra fora do estabelecimento ("especialmente por telefone ou a domicílio"): sete dias para desistir, a contar do recebimento | CDC, art. 49 | [V] texto; se vale para o pedido por WhatsApp com entrega, e o que diz o site sobre isso, **pergunta ao advogado** [NV] |
| **Imagem de pessoa** | Fotografar **sem pessoas**: dispensa autorização de imagem (Código Civil, art. 20) | `../02-briefing.md`, bloco 7 | Política do Atlas |
| **Avaliações** | Sem conselho que as vede; mas o site não incorpora avaliações de terceiros (pedido externo e cookie). O perfil no Google é o módulo Presença | `../17-conformidade-e-normas.md` | DECIDIDO |
| **Dado pessoal** | A calculadora e a lista não coletam nada: a mensagem sai do aparelho de quem a envia. O formulário do Profissional coleta nome, telefone e bairro de entrega — com aviso de privacidade e o pacote de conformidade | Ata v3.0, IV.2.1; `../14-funcionalidades/02-formulario.md` | DECIDIDO |

**Regra de manutenção que nasce da norma.**
- **Regra:** toda tabela de preço do site mostra a data em que foi conferida ("preços conferidos em 06.10.2026") e entra na manutenção mensal.
- **Objetivo:** o preço publicado vincula (art. 30). A data não exime o depósito, mas mostra ao visitante a idade do número e obriga o Atlas a conferi-lo todo mês.
- **Como conferir:** a data da tabela tem menos de 35 dias em toda revisão mensal (`../18-publicacao-e-manutencao.md`).

---

## 4. Estrutura de páginas

### 4.1 · No Profissional [P] (até seis páginas)

| Página | Objetivo | Seções, na ordem | Obrigatório |
|---|---|---|---|
| **Início** | Ser entendido em cinco segundos e chamar | Capa (nome, a frase do que faz, o WhatsApp na primeira tela do celular, o estado ao vivo "aberto agora"); a ficha da casa em quatro números; o caminho para as páginas (catálogo, calculadora, entrega, orçamento); as ausências declaradas; horário e endereço | A ação até 60% da primeira tela do celular; o estado ao vivo no fuso de São Paulo |
| **Materiais** (o catálogo) | Mostrar o que há, agrupado pela etapa da obra | Do alicerce ao acabamento (estrutura, alvenaria, revestimento, hidráulica, elétrica, acabamento); por item: nome comercial, unidade de venda, preço com a data da tabela, disponibilidade | Preço, unidade e data da tabela |
| **Calculadora** | A conta que o balcão faria | A ferramenta (seção 5.1); os índices de consumo publicados, com a fonte (o depósito); a nota "estimativa de referência; a quantidade final se confere no balcão, com o projeto" | Índices e perda à vista |
| **Entrega** | Dizer onde e quando o caminhão chega | O dia do caminhão (abertura, saídas, corte do mesmo dia, fechamento); os bairros atendidos com o frete de cada um; pedido mínimo; o que o caminhão leva (peso, comprimento de barra) | Frete discriminado (Decreto 7.962/2013) |
| **Orçamento** (o pedido) | Receber o pedido organizado | O formulário (nome, telefone, bairro, a lista); o WhatsApp com a mensagem pronta; o prazo de resposta; formas de pagamento | Aviso de privacidade; prazo de resposta |
| **A casa** | Provar que existe e há quanto tempo | A história em datas; o pátio e o caminhão em fotos; a equipe só se autorizar; o que a casa não faz; endereço com o mapa do bairro em vetor | Nome empresarial e CNPJ, endereço |

**A galeria** [P] mora em A casa e em Materiais (fotos do pátio, do estoque, do caminhão, do material empilhado), com legenda.

### 4.2 · Se o cliente contratar outro plano

| Plano | O que muda |
|---|---|
| **Essencial** [E] | Três páginas: Início (com os serviços e a entrega em resumo), Materiais e preços, A casa e o contato. Sem calculadora, sem formulário, sem galeria. O pedido sai pelo WhatsApp com mensagem pronta genérica |
| **Completo** [C] | As seis, mais: a segunda funcionalidade (o estado da loja e o corte da entrega do mesmo dia, ao vivo); uma página por etapa da obra (alvenaria, contrapiso, reboco, piso) para a busca local; uma página por bairro atendido; a peça-assinatura (a planta que se desenha, seção 6.7); a revisão trimestral do catálogo |

**No briefing, bloqueante neste nicho:** em todo plano, o catálogo de materiais, agrupado pela etapa da obra (de cada item, o nome comercial, a unidade de venda, o preço e a disponibilidade), com a data em que os preços foram conferidos; a entrega (os bairros atendidos e o frete de cada um, o pedido mínimo, a hora do corte da entrega do mesmo dia e o que o caminhão leva, em peso e comprimento de barra); as formas de pagamento e as restrições da oferta (Decreto 7.962/2013, art. 2º); e se o caminhão é da casa e o prazo de troca do material íntegro. No Profissional e no Completo [P][C], os índices de consumo do depósito por m², em cada serviço da calculadora (alvenaria de bloco, contrapiso, reboco, assentamento de piso), a perda padrão da casa e quem atualiza os índices. Só no Completo [C], os horários de saída do caminhão e o corte de cada dia, com a faixa própria do sábado e do feriado (o estado da loja). Sem isso, o catálogo, a página de entrega e a calculadora não se escrevem.

---

## 5. Funcionalidades

### 5.1 · A do ofício [P]: calculadora de materiais

| Item | Especificação |
|---|---|
| **Objetivo de negócio** | O cliente chega ao balcão, ou ao WhatsApp, com a lista certa — e compra a lista inteira num lugar só |
| **Entradas** | Medidas (largura e altura, ou área em m²); o serviço (alvenaria de bloco, contrapiso, reboco, assentamento de piso); a perda (5% obra organizada, 10% padrão do depósito, 15% recorte e canto) |
| **Regras** | Índices de consumo **do próprio depósito**, por m², publicados abaixo da ferramenta; arredondamento para a unidade de venda (saco, bloco, m³), sempre para cima; a perda aplicada antes do arredondamento |
| **Saída** | A lista com quantidades por unidade de venda → "Enviar a lista pelo WhatsApp" (mensagem pronta) e "Copiar a lista" |
| **Estados** | Sem medida: traço, nunca zero; o envio desabilitado com a lista vazia (o defeito de 03.10: a lista zerada saía); "Copiar" confirma só se copiou |
| **Sem script** | A tabela de índices fica visível, com a instrução de pedir a conta pelo WhatsApp com a área em m² |
| **Quem mantém os dados** | O dono informa os índices e os preços; mudança entra pela manutenção mensal. Os índices do exemplo são fictícios |
| **Especificação** | `../14-funcionalidades/07-funcionalidades-do-oficio.md`; implementação de referência em `web/components/ilhas/demos/calculadora.tsx`, no repositório do Atlas |

### 5.2 · A segunda, no Completo [C]: o estado da loja

O balcão aberto ou fechado agora, o próximo caminhão e o corte da entrega do mesmo dia, calculados no fuso de São Paulo, nunca no do aparelho; feriado e sábado com faixa própria (defeito de 07.10: no sábado, o "Agora" aparecia sobre a linha dos dias úteis). Sem script: a tabela de horários inteira. Referência: `web/components/ilhas/demos/estado-da-loja.tsx`, no repositório do Atlas.

### 5.3 · Módulos

- **Presença** (`../14-funcionalidades/06-presenca.md`): o perfil no Google com as fotos do pátio, o horário igual ao do site e as categorias certas. Pedir avaliação é permitido neste nicho.
- **Agenda:** não se vende. Se o depósito quiser "marcar retirada", a mensagem pronta resolve.

---

## 6. Direção de arte (ponto de partida · RATIFICADO)

### 6.1 · Materiais e vocabulário

Kraft do saco de cimento, aço galvanizado, estêncil de saco e de placa de obra, a nota de balcão, a planta com cotas. O vocabulário é o do canteiro e do balcão: traço, saco, milheiro, m³, perda, corte, frete.

### 6.2 · Fotografia

- **O que fotografar:** o pátio; o material empilhado, de frente e em 45°; o caminhão da casa; o balcão; a fachada dos dois lados e em horas diferentes.
- **Sem pessoas** (dispensa autorização; o material é o assunto).
- **Mínimo:** 20 a 30 fotos na sessão guiada do Profissional, pelo protocolo de `../08-imagem-e-fotografia.md`.
- **Nunca** banco de imagens nem imagem gerada: "capacete branco sorrindo" é o clichê do ramo.

### 6.3 · Tipografia

- **Postura:** **exibição** (razão título/corpo ≥ 5). Em setembro, o `h1` de 84 px ficou entre 14 e 173 px das referências, "escala indecisa": escolher um extremo e se comprometer.
- **Famílias candidatas** (OFL 1.1 [V]; `README.md`, seção 2):

| Papel | Família | Por quê |
|---|---|---|
| Exibição | **Big Shoulders Stencil** | Estêncil condensado, nascido da sinalização urbana de Chicago: a letra do saco e da placa de obra |
| Texto | **Public Sans** | Grotesca neutra e legível, feita para serviço público; aguenta tabela de preço e índice |
| Alternativa de exibição | **Saira Stencil One** | Estêncil mais largo, para uma marca menos industrial |

- **Algarismos tabulares** em preço, quantidade e índice.
- **O exemplo usa** Oswald, Barlow e IBM Plex Mono: não repetir num cliente (`../04-direcao-de-arte.md`, seção 6).

### 6.4 · Cor

- **Partida:** cinza de cimento e branco de cal como fundo; **um** amarelo ou laranja de sinalização como acento, em até ~10% da tela (só ações e o estado ao vivo).
- **Contraste medido** do acento como texto sobre o fundo real (o laranja do exemplo caía a 4,41:1 sobre o quadriculado e foi escurecido em 07.10).
- **Se o depósito tem cor de marca** (fachada, caminhão), ela substitui o acento, com o contraste conferido.

### 6.5 · Forma

- **Cantos arredondados**, por preferência do usuário (03.10.2026, RATIFICADO): pílula no botão, raio nos cartões (`../06-cor-forma-e-superficie.md`, seção 6).
- **O exemplo** tem cantos retos e botão chanfrado, por ser uma ficha técnica de obra: exceção **a decidir** pelo usuário. Num cliente, canto reto só com motivo escrito no `identidade.md` e pergunta ao usuário.

### 6.6 · O gesto

- **Do ofício:** a planta com cotas que **se desenha** ao entrar na tela (`stroke-dasharray`, uma vez, custo zero de peso). Em setembro, a planta não se desenhava: 2 elementos contra 126 caminhos animados na Heron AI.
- **Do Spell UI no Profissional:** **copiar** ("Copiar a lista", "Copiar o pedido"), que confirma só se copiou, e a **espera** visível onde se espera (`../09-movimento.md`). Um gesto por marca, no ponto de decisão: o fim da calculadora.

### 6.7 · A peça-assinatura (só no Completo)

A planta do depósito em traço técnico, com cotas e o norte, desenhada a partir da medição real do pátio; ou o caminhão em vetor, com a rota do dia. Passa no teste do desconhecido (`../04-direcao-de-arte.md`, passo 8). 3D só nas cinco condições de `../09-movimento.md`, seção 7.

### 6.8 · O que não fazer

| Não | Por quê |
|---|---|
| Faixa zebrada de obra e papel quadriculado como fundo | Marcas de IA da lista ("repeating-stripes-gradient", "codex-grid-background"); o exemplo as tem e está na linha de base de 07.10 (`../11-anti-ia.md`) |
| Rótulos em monoespaçada caixa-alta ("01 MATERIAIS") e navegação numerada | Monoespaçada como fantasia de "técnico" e navegação numerada: marcas da avaliação de 07.10 |
| Grade de cinco cartões iguais | O "kit de cartões" genérico, também acusado no exemplo |
| Foto de pessoa de capacete, de banco | Banco de imagens é vedado; o material é o assunto |
| Animação pesada de canteiro (guindaste, tijolos caindo) | Peso e enfeite; o aparelho do pedreiro é modesto |

---

## 7. Texto

**Registro.** Impessoal, com o vocabulário do balcão. O número do ofício no lugar do adjetivo.

**O que dizer:**
- o preço, a unidade de venda e a data da tabela;
- o corte da entrega do mesmo dia, em hora;
- os bairros e o frete de cada um;
- o pedido mínimo e o que o caminhão leva;
- que o caminhão é da casa, se for;
- o prazo de troca do material íntegro;
- os índices de consumo da calculadora.

**O que é vedado ou arriscado dizer:**

| Evite | Por quê |
|---|---|
| "Menor preço da região", "o mais barato de Niterói" | Não se prova; publicidade enganosa (CDC, art. 37) |
| "Entrega grátis" sem raio e pedido mínimo | Omissão enganosa (art. 37, § 1º) |
| "Sua obra começa aqui" | Cabe em qualquer depósito do país (título do demo de setembro, reprovado na avaliação anti-IA por genérico) |
| Preço sem data | Vincula (art. 30) e envelhece em silêncio |

**Exemplos no registro certo:**
- "Material para obra, com entrega no bairro." (título do exemplo)
- "Pedido até as 15h, entrega no mesmo dia."
- "A conta que o balcão faria." (a calculadora)
- "O orçamento volta com preço, disponibilidade e prazo de entrega — as três informações na mesma resposta."
- "Estimativa de referência. A quantidade final é conferida no balcão, com o projeto à vista."

---

## 8. Referências para estudar

| Referência | Endereço | Sob que norma opera | O que aprender | O que não copiar |
|---|---|---|---|---|
| Marvell Tile & Stone (SOTD, 07.05.2026) | https://www.awwwards.com/sites/marvell-tile-stone | Estrangeira | Duas cores, percurso contínuo pelos casos, Next.js | A escala de produção de uma marca grande |
| Haven Constructions (menção honrosa, 10.06.2026) | https://www.havenconstructions.com.au/ | Austrália | O nome da casa em tipo gigante ocupando a primeira tela; 14 fotos reais bastam | A página sem `h1` (medido em 07.10) e a rolagem com inércia |
| Composites.archi (SOTD, 08.04.2025) | https://www.awwwards.com/sites/composites-archi | Estrangeira | O material explicado por uma história ("a queda da pena") | A narrativa longa: o pedreiro quer o preço |
| Kōzōwood (SOTD, 2024) | https://www.awwwards.com/sites/kozowood-made-of-nature | Estrangeira | Material natural como identidade | O som |
| Materials Market (setembro) | Endereço não registrado na análise | Estrangeira | O único par verdadeiro: catálogo de material com preço | 197 pedidos, 7,5 s de carga e o `h1` que é o banner de cookies |
| Heron AI (setembro) | Endereço não registrado na análise | Estrangeira | O traço que se desenha (126 de 368 caminhos animados) | A pilha (GSAP, Lenis, Barba, Swiper, jQuery) |

*"Estrangeira": nenhuma dessas opera sob a norma brasileira de consumo; aproveita-se a forma, nunca o texto nem a promessa (`README.md`, seção 3.1).*

---

## 9. O que a pesquisa de setembro mediu

Análise de setembro de 2026 (`nichos/analises/atlas--analise-construcao.md`, no repositório do Atlas), 1440 × 900:

| Site | Pedidos | Peso | Carga | Telas | Imagens | `h1` |
|---|---|---|---|---|---|---|
| Era Residence | 79 | 40,7 MB | 5,9 s | 24,1 | 41 | 173 px |
| Lacoste · Polo | 83 | 18,1 MB | 11,0 s | 1 | 0 | — |
| Belgrade Arbor | 79 | 11,2 MB | 5,8 s | 22,4 | 51 | 151 px |
| Kononenko | 99 | 2,9 MB | 5,8 s | 21,1 | 27 | 14 px |
| Heron AI | 59 | 1,5 MB | 6,8 s | 1 | 45 | 47 px |
| Materials Market | 197 | 1,3 MB | 7,5 s | 3,5 | 47 | 16 px |
| **Demo do Atlas** | **4** | **0,053 MB** | **2,8 s** | 11,3 | **0** | 84 px |

- **"Não há competição estética neste ofício"**: as referências bonitas são de alto padrão (inércia em 5 de 6); o único par verdadeiro é lento e mal estruturado.
- **O que mudou por causa disso:** a planta que se desenha; a escala comprometida; a foto do depósito e do material, sem pessoa; o peso e a velocidade, **não perder** (25 vezes mais leve, 2,7 vezes mais rápido).

---

## 10. Riscos e pendências

- **Preço desatualizado** é o maior risco jurídico do nicho (art. 30): a data da tabela e a manutenção mensal são a defesa.
- **Arrependimento de sete dias** no pedido por WhatsApp com entrega (art. 49): a confirmar com advogado [NV].
- **Decreto 7.962/2013** no site que só compõe a mensagem: alcance a confirmar [NV]; cumprir por cautela.
- **Cantos retos e botão chanfrado** do exemplo: a decidir pelo usuário.
- **As marcas de IA** do exemplo (faixa zebrada, quadriculado, monoespaçada, navegação numerada, cinco cartões iguais): registradas para a decisão dos sócios (`../11-anti-ia.md`).
- **Os índices de consumo** do cliente precisam de dono: sem ele, a calculadora mente com o tempo.

---

## 11. Lista de conferência do nicho

- [ ] Toda tabela de preço tem a data em que foi conferida.
- [ ] O frete aparece por bairro, com o pedido mínimo; nenhuma "entrega grátis" sem condição.
- [ ] Nome empresarial, CNPJ e endereço em A casa e no rodapé (Decreto 7.962/2013).
- [ ] A calculadora usa os índices **do cliente**, publicados abaixo dela, e mostra traço sem medida.
- [ ] "Enviar a lista" fica desabilitado com a lista vazia; "Copiar" só confirma se copiou.
- [ ] Sem script, a tabela de índices e a instrução de pedir pelo WhatsApp aparecem.
- [ ] O estado ao vivo usa o fuso de São Paulo e tem faixa de sábado e de feriado.
- [ ] Nenhuma foto com pessoa; nenhuma de banco ou gerada.
- [ ] A postura tipográfica é exibição (razão ≥ 5, régua `razaoDoTitulo`).
- [ ] Nenhuma faixa zebrada, quadriculado ou monoespaçada de fantasia (avaliação anti-IA).
- [ ] O `h1` descreve a página e é o mesmo para a tela e o leitor de tela.
- [ ] Nenhum superlativo de preço ("o menor", "o mais barato").
