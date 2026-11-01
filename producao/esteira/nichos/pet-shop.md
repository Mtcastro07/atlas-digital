# Pet shop (banho e tosa) · Essencial

> **Para que serve.** Tudo o que o site de um banho e tosa de bairro precisa, do briefing à entrega: a norma (que só existe se houver veterinário), as três páginas, a tabela por porte e pelagem, o leva e traz, a direção de arte de partida, o texto e a conferência.
>
> **Estado.** Ordem comercial (6º) e plano de referência (Essencial): RATIFICADO (decidido em 07.10.2026; ratificado em 08.10.2026). É a posição mais fraca da lista; a troca com a oficina (oficina em 6º, pet shop em 7º) não entrou na ratificação. Norma: banho e tosa sem conselho; com veterinário, a CFMV 1.649/2025, lida em fonte secundária [FU]. Direção de arte: RATIFICADO.
>
> **Leia com.** `README.md` (o quadro comum); `../03-planos.md`, seção 3; `../14-funcionalidades/05-agenda.md`; `../17-conformidade-e-normas.md`.
>
> **Implementação de referência.** Nenhuma em Next.js. A versão estática de setembro ("Banho e Tosa São Francisco") existe só em pacote, no repositório do Atlas (`nichos/atlas--demo-petshop--2026-09-02.zip`; ler em memória, nunca extrair).
>
> **Atualizado em:** 08.10.2026.

---

## 1. Ficha

| Campo | Valor |
|---|---|
| **Ordem comercial** | **6º de 12.** Razão de 29.08.2026: "setor em crescimento, agendamento, sem regulação" — "sem regulação" vale só para banho e tosa. Conferida em 07.10.2026: volume 2, facilidade 3, ticket 2, atrito 4 — 12º com os pesos escritos (2,60), 9º com os pesos "agora" (3,00). **A posição mais fraca:** menor volume, ticket baixo, crescimento do setor perdendo força |
| **Plano de referência** | **Essencial** [E]: a tabela por porte resolve preço e tempo; menor volume e menor ticket |
| **Módulos** | **Agenda** e **Presença** |
| **Norma** | Banho e tosa: nenhum conselho; CDC, arts. 30, 31 e 37 [V]. Com veterinário: CFMV 1.649/2025 [FU] |
| **Preço no site** | **Permitido** (a tabela por porte). Com veterinário: preço de rotina, sim; de procedimento que pede avaliação, não [FU] |
| **Volume em Niterói** | Três classes do IBGE/CEMPRE 2024, sem MEI [V]: serviços pessoais não especificados, que incluem banho e tosa (CNAE 96.09-2), **112 unidades** (96 em 2022), 294 ocupados; veterinária (75.00-1), **144** (119 em 2022), 427 ocupados; varejo de outros produtos, classe mista que inclui o pet shop (47.89-0), 687 (688 em 2022), 2.204 ocupados. O mercado pet projetado para 2025: R$ 77,2 bilhões, +2,4% (Abinpet e Instituto Pet Brasil, via Diário do Comércio, 29.09.2025) [FU] |
| **Público** | Quem decide é o dono do banho e tosa. Quem visita: o tutor, que quer o preço do porte do animal dele, o tempo e se há busca em casa |
| **Site de exemplo** | **Banho e Tosa São Francisco** [ex]: só a versão estática de setembro (verde-azulado sobre menta, Outfit, bolhas e tesoura; agendamento por porte e pelagem, leva e traz por bairro) |

---

## 2. O cliente e a dor

**Quem decide e quanto paga.** O dono. Essencial: R$ 900 de criação e R$ 190 por mês; Agenda, +R$ 400 e +R$ 80; Presença, +R$ 300 e +R$ 100 (ata v3.0, IV.2).

**O que o visitante procura:**
1. **Quanto custa para o meu animal:** o preço depende do porte e da pelagem.
2. Quanto tempo leva, e quando dá para ir.
3. Se buscam e levam em casa, em que dia, por quanto.
4. Como o animal é tratado (sem sedação? quem cuida?).
5. O horário e o endereço.

**A dor do ramo, como o demo de setembro a leu:** o preço "depende" e o tutor precisa perguntar; a tabela por porte e pelagem responde antes da mensagem.

**A tarefa do site no Essencial — ser encontrado e chamado.** A tabela publicada, o horário, o leva e traz e a ação de pedir horário.

---

## 3. Normas

**Sem veterinário,** valem só as regras de consumo. **Com veterinário** atendendo no estabelecimento, vale a **CFMV 1.649/2025** — resolução de 13.06.2025 sobre propaganda e publicidade na medicina veterinária (data e objeto conferidos no texto do CFMV [V]), publicada no DOU de 18.06.2025 e em vigor desde 17.10.2025 [FU]. Os artigos abaixo vêm de leitura secundária (Legisweb e o LEIA-ME de setembro) [FU].

| Tema | Regra | Fonte | Evidência |
|---|---|---|---|
| **Preço publicado** | Vincula | CDC, arts. 30 e 35 | [V] |
| **Publicidade enganosa** | Vedada | CDC, art. 37 | [V] |
| **Responsável técnico** (com veterinário) | Nome e registro no CRMV do responsável técnico na publicidade | CFMV 1.649/2025, art. 4º, § 3º | [FU] |
| **Resultado** (com veterinário) | Sem garantia de resultado | Art. 6º, III | [FU] |
| **Método** (com veterinário) | Sem método não comprovado | Art. 6º, IV | [FU] |
| **Preço de procedimento** (com veterinário) | Sem preço de procedimento que dependa de avaliação; cirurgia sem preço; preço de rotina permitido | Art. 6º, V; LEIA-ME | [FU] |
| **Vedações gerais** (com veterinário) | Propaganda enganosa, sensacionalismo, concorrência desleal, preço predatório, venda casada | CFMV 1.649/2025 | [FU] |
| **Imagem do animal** | Permitida pela norma (com veterinário, segundo o Código Civil e a LGPD, art. 8º) [FU]; o Atlas pede **consentimento escrito do tutor** em todo caso | Política do Atlas | DECIDIDO |
| **Imagem do tutor ou da equipe** | Autorização escrita | Código Civil, art. 20 | [V] |
| **Dado pessoal** | A Agenda coleta nome e telefone do tutor, o nome e o porte do animal, o serviço e o horário — nada mais | LGPD; `../14-funcionalidades/05-agenda.md` | DECIDIDO |

**Para o advogado:** o texto primário da CFMV 1.649/2025 (art. 4º, § 3º; art. 6º; art. 8º) e se a avaliação de cliente no Google conta como depoimento quando há veterinário [NV].

---

## 4. Estrutura de páginas

### 4.1 · No Essencial [E] (até três páginas)

| Página | Objetivo | Seções, na ordem | Obrigatório |
|---|---|---|---|
| **Início** | Ser entendido e chamar | Capa (o fato da casa, a ação na primeira tela do celular); a tabela por porte em resumo; como o animal é tratado; o que não se faz aqui; horário | A ação até 60% da primeira tela do celular |
| **Serviços e valores** | Responder preço e tempo antes da mensagem | A tabela porte × pelagem × serviço (banho, tosa na máquina, tosa na tesoura; hidratação como acréscimo), com o valor e a duração; o que cada serviço compreende; o leva e traz por bairro (dia, janela, valor); as condições ("pelo com nó pode exigir tosa prévia, informada na chegada, com o valor") | Valor e duração por porte |
| **Onde** | Levar até a porta | Endereço, mapa do bairro em vetor, horário, WhatsApp, prazo de resposta; com veterinário, o responsável técnico e o CRMV | Prazo de resposta |

**O porte em peso** (demo de setembro): pequeno até 10 kg; médio de 10 a 25 kg; grande acima de 25 kg. A pelagem: curta, longa, dupla, encaracolada.

**No briefing, bloqueante neste nicho:** as faixas de porte por peso, as pelagens, o preço e a duração de cada serviço por porte e pelagem, a condição do pelo com nó e, se houver, o leva e traz (bairros, dias, janelas e valor). Sem isso, a página de valores não se escreve.

### 4.2 · Se o cliente contratar outro plano

| Plano | O que muda |
|---|---|
| **Profissional** [P] | Até seis páginas: Início, Serviços e valores, a funcionalidade do ofício (porte × pelagem → tempo e preço → WhatsApp), Leva e traz, A casa (galeria com o banho e a tosa reais), Onde. Formulário com os dados do tutor e do animal, sem nada além do necessário |
| **Completo** [C] | A segunda funcionalidade (o leva e traz por bairro: dia, janela e valor); uma página por serviço e por bairro atendido; ilustração encomendada como peça-assinatura (seção 6.7) |

---

## 5. Funcionalidades

### 5.1 · No Essencial: a mensagem pronta

Não há funcionalidade sob medida no Essencial. O vínculo do WhatsApp leva a mensagem pronta pedindo porte, peso, pelagem e serviço; a tabela está publicada acima. Especificação em `../14-funcionalidades/01-base-de-todo-site.md`.

### 5.2 · No Profissional [P]: porte × pelagem → tempo e preço

| Item | Especificação |
|---|---|
| **Objetivo de negócio** | O pedido chega com o porte, a pelagem e o serviço, e o tutor já sabe o valor e o tempo |
| **Entradas** | Porte (por peso); pelagem; serviço; hidratação (acréscimo) |
| **Saída** | O valor, a duração e a mesa, de imediato → "Pedir horário no WhatsApp" com a mensagem pronta |
| **Regras** | Os valores da tabela publicada (mesma fonte de dados); a condição do pelo com nó dita antes do envio |
| **Sem script** | A tabela completa e o WhatsApp com a instrução de informar peso e pelagem |
| **Ressalva** | "O valor e a duração aparecem antes do envio. Nada é registrado nesta página." |

### 5.3 · No Completo [C]: o leva e traz por bairro

Bairro e número de trechos (só ida ou volta; ida e volta) → o dia, a janela de horário e o valor → "Pedir leva e traz". No demo de setembro: São Francisco, terça a sábado, 8h às 10h e 16h às 18h, R$ 18; Charitas, terça e quinta, R$ 25; Jurujuba, quarta, R$ 30; Ingá, sexta, R$ 25; Icaraí, terça e sexta, R$ 25. Sem script: o roteiro completo em tabela. O porquê, dito na página: "o roteiro segue dias fixos, para que o animal passe o menor tempo possível no carro".

### 5.4 · Módulos

- **Agenda:** o tutor marca e recebe a confirmação; dados mínimos (seção 3).
- **Presença:** perfil no Google com as fotos e o horário; pedir avaliação é permitido no banho e tosa sem veterinário.

---

## 6. Direção de arte (ponto de partida · RATIFICADO)

### 6.1 · Materiais e vocabulário

Toalhas, a banheira, o secador, a mesa de tosa, a escova, a coleira na parede. O vocabulário: porte, pelagem, banho, tosa na máquina, tosa na tesoura, hidratação, nó, leva e traz, tutor.

### 6.2 · Fotografia

- **O que fotografar:** a loja, a mesa de tosa, o banho em andamento, os animais reais (consentimento escrito do tutor), a equipe (autorização), a fachada.
- **A ilustração** é o substituto que as referências usam (JustRussel: 48 de 80 imagens em SVG; Kindred: Lottie), mas a produção de figuras do Atlas está **suspensa**: em setembro, dez figuras improvisadas foram recusadas, inclusive a mesa de tosa e a tesoura. Ilustração só **encomendada**, e só no Completo.

### 6.3 · Tipografia

- **Postura:** **exibição**.
- **Famílias candidatas** (OFL 1.1 [V]; `README.md`, seção 2):

| Papel | Família | Por quê |
|---|---|---|
| Exibição | **Fredoka** | Sem serifa arredondada, com eixo de largura: macia sem ser infantil |
| Texto | **Nunito** | Sem serifa de terminais arredondados, legível em tabela |

- **O demo de setembro usava** Outfit: não repetir.

### 6.4 · Cor

- **Partida:** branco quente como fundo; a cor das toalhas ou da fachada da casa como acento, com o contraste medido.
- **Evitar** o pastel de bala, o azul-piscina com bolhas e o verde-menta de clínica (o demo de setembro).

### 6.5 · Forma

Cantos bem arredondados (preferência do usuário): a pílula, o raio generoso; a forma macia é do assunto.

### 6.6 · O gesto

- **Do Spell UI no Essencial:** o **marca-texto**, uma vez, numa palavra que **não** esteja no título — por exemplo, "por porte" na frase do preço.
- **Do ofício** (no Profissional): a tabela que responde porte × pelagem com o tempo e o preço.
- **Movimento do Essencial:** entrada da capa, revelação uma vez, transição entre páginas.

### 6.7 · A peça-assinatura (só no Completo)

Ilustração **encomendada** a um ilustrador (os animais da casa, a mesa de tosa), nunca improvisada pelo agente (`../04-direcao-de-arte.md`, seção 5).

### 6.8 · O que não fazer

| Não | Por quê |
|---|---|
| Patinha, ossinho, bolhas | O padrão de design de 08.10 veda a patinha; as 17 bolhas do demo de setembro "não representam o ofício" |
| A voz do cachorro (no premiado Don't Board Me: "Our Services, Woof") | Funciona lá; aqui é o oposto do registro da casa |
| Diminutivo e informalidade afetuosa ("aumigo", "rabinhos felizes") | O calor vem da especificidade (`README.md`, seção 3.10) |
| Faixa de "-10% hoje" | Urgência artificial; o PetSpot faz o contrário do que o Atlas defende |
| Foto de banco ou gerada | Vedado; o tutor quer ver a loja real |
| Ilustração improvisada | Ofício; produção suspensa |

---

## 7. Texto

**Registro.** Impessoal, cuidadoso, com números.

**O que dizer:** o valor e o tempo por porte e pelagem; o que cada serviço compreende; a condição do pelo com nó; o leva e traz com dia, janela e valor; como o animal é tratado (sem sedação, se for a política; quem cuida); o horário; com veterinário, o responsável técnico e o CRMV.

**O que evitar:** "o melhor banho de Niterói"; "pet feliz garantido"; diminutivos; urgência de desconto; com veterinário, preço de procedimento que pede avaliação e qualquer garantia de resultado.

**Exemplos no registro certo** (demo de setembro):
- "Uma mesa para cada porte." (título)
- "Porte e pelo definem o preço e o tempo."
- "Cada bairro tem dia e janela próprios."
- "Pelo com nó pode exigir tosa prévia, e isso é informado na chegada, com o valor."

---

## 8. Referências para estudar

| Referência | Endereço | Sob que norma opera | O que aprender | O que não copiar |
|---|---|---|---|---|
| Don't Board Me (SOTD, 11.03.2024; site do ano de 2024) | https://www.awwwards.com/sites/dont-board-me | Estrangeira; passeio e hospedagem | A personalidade e a página 404 bem-humorada | A voz do cachorro |
| Kindred Pet Care (menção honrosa, 26.04.2024) | https://www.awwwards.com/sites/kindred-pet-care | Estrangeira; veterinária | A ilustração própria, rosa e pêssego | 413 pedidos e 383 imagens (setembro) |
| ROOOF Pet Furniture (menção honrosa, 04.11.2025) | https://www.awwwards.com/sites/rooof-pet-furniture | Estrangeira; mobiliário | O produto do ofício como protagonista | — |
| JustRussel (setembro) | Endereço não registrado na análise | Estrangeira | A ilustração vetorial como identidade (48 de 80 imagens) | — |

---

## 9. O que a pesquisa de setembro mediu

Análise de setembro de 2026 (`nichos/analises/atlas--analise-petshop.md`, no repositório do Atlas):

| Site | Pedidos | Peso | Carga | Telas | Imagens | Ilustração vetorial | `h1` |
|---|---|---|---|---|---|---|---|
| PetFood Kitchen | 50 | 43,3 MB | 6,8 s | 9,1 | 39 | 25 SVG, nenhum grande | 67 px |
| Kindred | 413 | 29,6 MB | 5,4 s | 8,9 | 383 | 18 SVG + Lottie | 92 px |
| JustRussel | 116 | 3,1 MB | 6,1 s | 8,6 | 80 | 48 das 80 imagens em SVG | 40 px |
| Zamov | 39 | 0,95 MB | 6,2 s | 1 | 129 | 29 SVG, 16 grandes | 36 px |
| askperi.ai | 12 | 0,06 MB | 4,8 s | 0,7 | 2 | 2 SVG | 36 px |
| **Demo do Atlas** | **4** | **0,052 MB** | **2,7 s** | 11,0 | **0** | 2 SVG, 17 círculos, nenhuma figura | 84 px |

- **Pares:** só o Kindred é serviço; Zamov é programa e askperi.ai, aplicativo.
- **Ilustração figurativa:** 0 contra 16 a 48 peças — "a maior mudança do nicho", hoje bloqueada pela suspensão das figuras.
- **Altura:** 11,0 telas contra 8,6 a 9,1 dos três pares — o demo era mais alto; rever.

---

## 10. Riscos e pendências

- **A posição mais fraca da ordem**; a troca com a oficina espera a ratificação.
- **CFMV 1.649/2025** lida em fonte secundária [FU]; conferir o texto antes de cliente com veterinário.
- **Ilustração suspensa:** sem fotos reais, o site fica sem imagem — o briefing não pode sair sem o material visual.
- **Altura:** a página tende a crescer com a tabela; usar fichas no celular, não tabela encolhida.

---

## 11. Lista de conferência do nicho

- [ ] A tabela mostra valor e duração por porte (com o peso) e por pelagem.
- [ ] A condição do pelo com nó está dita antes do envio.
- [ ] O leva e traz tem dia, janela e valor por bairro.
- [ ] Com veterinário: o responsável técnico e o CRMV aparecem; nenhum preço de procedimento que dependa de avaliação; nenhuma garantia.
- [ ] Toda foto de animal tem o consentimento escrito do tutor; nenhuma foto de banco ou gerada.
- [ ] Nenhuma patinha, osso, bolha ou voz de cachorro.
- [ ] O marca-texto está fora do título e acontece uma vez.
- [ ] Sem script, a tabela e o WhatsApp funcionam.
- [ ] No celular, a tabela vira fichas (sem rolagem lateral).
