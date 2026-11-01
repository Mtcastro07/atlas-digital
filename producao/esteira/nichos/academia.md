# Academia e pilates · Profissional

> **Para que serve.** Tudo o que o site de um estúdio de pilates, de treino funcional ou de uma academia de bairro precisa, do briefing à entrega: a norma profissional, as páginas, a grade semanal com vagas, a aula experimental, a direção de arte de partida, o texto e a conferência.
>
> **Estado.** Ordem comercial (8º) e plano de referência (Profissional): RATIFICADO (decidido em 07.10.2026; ratificado em 08.10.2026). Norma: a Lei 9.696/1998 conferida no texto oficial [V]; o Código de Ética do CONFEF lido em fonte secundária [FU]; o conselho do pilates diverge [DIV]. Direção de arte: RATIFICADO.
>
> **Leia com.** `README.md` (o quadro comum); `../03-planos.md`, seção 4; `../14-funcionalidades/07-funcionalidades-do-oficio.md` e `../14-funcionalidades/05-agenda.md`; `../17-conformidade-e-normas.md`.
>
> **Implementação de referência.** Nenhuma em Next.js. A versão estática de setembro ("Movimento Charitas") existe só em pacote, no repositório do Atlas (`nichos/atlas--demo-academia--2026-09-05.zip`; ler em memória, nunca extrair).
>
> **Atualizado em:** 08.10.2026.

---

## 1. Ficha

| Campo | Valor |
|---|---|
| **Ordem comercial** | **8º de 12.** Razão de 29.08.2026: "mensalidade recorrente; disciplina de promessa de resultado". Conferida em 07.10.2026: volume 2, facilidade 3, ticket 3, atrito 4 — 11º com os pesos escritos (2,80), 7º com os pesos "agora" (3,15, empatado com odontologia e psicologia) |
| **Plano de referência** | **Profissional** [P]: estúdio, modalidades e planos cabem em seis páginas; a grade decide |
| **Módulos** | **Agenda** (a aula experimental) e **Presença** |
| **Norma** | Lei 9.696/1998, art. 1º [V]; CONFEF 307/2015, art. 3º [FU]; pilates com CREF ou CREFITO [DIV]; LGPD, arts. 5º, II, e 11 [V] |
| **Preço no site** | **Permitido**; urgência artificial, não |
| **Volume em Niterói** | CNAE 93.13-1 (atividades de condicionamento físico): 235 unidades em 2022, 254 em 2023, **284 em 2024**; 1.654 pessoas ocupadas (IBGE/CEMPRE, sem MEI) [V]. No estado do RJ, ~6 mil academias ativas, +11% (Panorama Setorial Fitness Brasil 2025, via Diário do Rio, 19.05.2026) [FU] |
| **Público** | Quem decide é o dono do estúdio. Quem visita: o adulto que quer começar ou voltar, que procura horário com vaga perto de casa e uma aula para experimentar |
| **Site de exemplo** | **Movimento Charitas** [ex]: só a versão estática de setembro (violeta sobre escuro, Sora; grade filtrável, aula experimental) |

---

## 2. O cliente e a dor

**Quem decide e quanto paga.** O dono. Profissional: R$ 1.500 de criação e R$ 250 por mês; Agenda, +R$ 400 e +R$ 80 (ata v3.0, IV.2). A mensalidade do aluno é recorrente: o site se paga com poucos alunos retidos.

**O que o visitante procura:**
1. **Que horário tem vaga**, no dia e no turno dele.
2. Se pode experimentar antes, e quanto custa.
3. Quantos alunos por turma, e quem dá a aula (com registro).
4. Os planos e os preços; se há fidelidade e multa.
5. Onde fica.

**A dor do ramo:** as referências vendem promessa e corpo; quase nenhuma mostra a grade. Em setembro: grade de horários em 1 de 6 referências, aula experimental em nenhuma, preço em uma.

**A tarefa do site no Profissional — ser escolhido.** A grade da semana com vagas, a próxima aula em contagem, a aula experimental pedida em três escolhas, o estúdio real em fotos.

---

## 3. Normas

| Tema | Regra | Fonte | Evidência |
|---|---|---|---|
| **Quem é "profissional de Educação Física"** | A designação é prerrogativa de quem tem registro no CREF | Lei 9.696/1998, art. 1º | [V] |
| **Registro no site** | O número do CREF de cada professor (ou do CREFITO, se fisioterapeuta), na página da equipe e no rodapé | Política do Atlas | DECIDIDO |
| **Pilates** | Pode ser dado por profissional de Educação Física (CREF) ou por fisioterapeuta (CREFITO); o site diz **qual** | LEIA-ME de setembro; o COFFITO reconhece o pilates como recurso da fisioterapia [NV] | **[DIV]** |
| **Expor aluno** | Vedado sem autorização | CONFEF 307/2015, art. 3º | [FU] |
| **Expectativa de resultado** | Vedado criar expectativa enganosa de resultado | CONFEF 307/2015, art. 3º | [FU] |
| **Dado do aluno** | Imagem, peso, medidas e evolução são dado de saúde, sensível | LGPD, arts. 5º, II, e 11 | [V] |
| **Imagem de pessoa** | Autorização escrita; **nenhum aluno identificável** (política do Atlas) | Código Civil, art. 20 | [V] |
| **Preço e plano** | Permitidos; vinculam. "Sem fidelidade e sem multa" só se o contrato disser | CDC, arts. 30 e 37 | [V] |
| **Urgência artificial** | Fora ("só hoje", contagem regressiva de oferta, "últimas vagas" falsas) | Leitura de setembro | DECIDIDO |
| **Questionário de saúde** | Fica na avaliação presencial; nunca no site nem na Agenda | LGPD, art. 11 | [V] |

**Para o advogado:** o texto primário da CONFEF 307/2015 (art. 3º) e a posição sobre o pilates por fisioterapeuta.

---

## 4. Estrutura de páginas

### 4.1 · No Profissional [P] (até seis páginas)

| Página | Objetivo | Seções, na ordem | Obrigatório |
|---|---|---|---|
| **Início** | Ser entendido e marcar a experimental | Capa (o fato da casa em número, a próxima aula em contagem, a ação "Pedir a aula experimental"); as modalidades; o que não se faz aqui; horário | A ação até 60% da primeira tela do celular |
| **Grade** (a funcionalidade) | Mostrar o horário com vaga | A semana inteira, filtrável por dia, com modalidade, horário e vagas (seção 5.1) | Sem script, a semana inteira |
| **Modalidades e planos** | O que se faz, quanto custa | Cada modalidade (no demo de setembro: pilates em aparelhos em dupla ou individual, solo, funcional em grupo), o número máximo de alunos, a duração; os planos com preço; a avaliação inicial com valor; a aula experimental | Preço; a regra de saída do plano |
| **O estúdio** | Provar | A galeria (os aparelhos — reformer, cadillac, barril, cadeira —, o espaço, a luz); os professores com o registro (CREF ou CREFITO), autorizados | Registro de cada professor |
| **Aula experimental** | Receber o pedido | Modalidade, experiência anterior, turno → a mensagem ou o formulário; o que acontece na aula; o prazo de resposta | Sem dado de saúde |
| **Onde** | Levar até a porta | Endereço, mapa do bairro em vetor, horário, estacionamento, acessibilidade | — |

### 4.2 · Se o cliente contratar outro plano

| Plano | O que muda |
|---|---|
| **Essencial** [E] | Três páginas: Início (modalidades e a grade resumida), Planos e grade, Onde. A experimental pela mensagem pronta |
| **Completo** [C] | A segunda funcionalidade (o montador de plano: modalidade e vezes por semana → o plano e a mensalidade; `../14-funcionalidades/07-funcionalidades-do-oficio.md`, seção 7.2); a aula experimental com vaga real é do módulo Agenda; uma página por modalidade e por professor; a peça-assinatura (o relógio da próxima aula em escala de cartaz, seção 6.7) |

**No briefing, bloqueante neste nicho:** em todo plano, a grade da semana (o dia, o horário e a modalidade de cada turma); as modalidades, com o número máximo de alunos por turma e a duração; os planos, com o preço e a regra de saída (fidelidade e multa, como o contrato disser); a avaliação inicial, com o valor; o custo da aula experimental, ou que ela não tem custo; e o nome e o registro de cada professor (CREF ou, se fisioterapeuta, CREFITO). No Profissional e no Completo [P][C], as vagas de cada turma e quem as atualiza (sem quem as atualize, a grade diz "consultar vaga"). Só no Completo [C], os planos por modalidade e vezes por semana, com a mensalidade e o que cada um inclui (o montador de plano). Sem isso, a grade e a página de modalidades e planos não se escrevem.

---

## 5. Funcionalidades

### 5.1 · Funcionalidade 1 [P]: a grade semanal com vagas e a próxima aula

| Item | Especificação |
|---|---|
| **Objetivo de negócio** | O visitante acha um horário com vaga e pede a experimental naquele horário |
| **Conteúdo** | Dia, horário, modalidade e vagas de cada turma; a grade muda no início de cada mês |
| **Filtro** | Por dia ("Semana toda", segunda a sábado), com script; sem script, a semana inteira aparece |
| **"Próxima aula em"** | A contagem até a próxima turma, no fuso de São Paulo (padrão de design de 08.10: "próxima aula em 00:42"); algarismos tabulares; sem movimento contínuo com movimento reduzido |
| **Vagas verdadeiras** | Se ninguém atualiza as vagas, a grade diz "consultar vaga" no lugar do número — dado que ninguém atualiza mente (`../14-funcionalidades/README.md`, seção 3) |
| **Saída** | Cada turma leva ao pedido da experimental já preenchido |
| **Acessibilidade** | A grade é tabela (ou lista) com cabeçalhos; o filtro é um grupo de botões com estado anunciado |
| **Especificação** | `../14-funcionalidades/07-funcionalidades-do-oficio.md` |

### 5.2 · Funcionalidade 2 [C]: o montador de plano

Modalidade e vezes por semana → o plano e a mensalidade, com o que o plano inclui; termina no pedido de matrícula ou de aula experimental (`../14-funcionalidades/07-funcionalidades-do-oficio.md`, seção 7.2). A aula experimental com vaga real é do módulo Agenda (seção 5.3), que não conta como funcionalidade sob medida (`../14-funcionalidades/README.md`, seção 5): a Agenda mostra as turmas com vaga real e marca a experimental com confirmação. Dados: nome, telefone, modalidade, turma. Nunca questionário de saúde, peso, medida ou lesão (seção 3). No demo de setembro, o pedido saía por mensagem: modalidade, experiência anterior ("nunca pratiquei", "já pratiquei, estou parado", "pratico atualmente") e turno.

### 5.3 · Módulos

- **Agenda:** a experimental e, depois, a reposição de aula.
- **Presença:** perfil no Google com fotos do estúdio; pedir avaliação é permitido (sem foto de aluno).

---

## 6. Direção de arte (ponto de partida · RATIFICADO)

### 6.1 · Materiais e vocabulário

Borracha do piso, magnésio, aço, as anilhas coloridas; no pilates, a madeira e as molas dos aparelhos, o couro do estofado. O vocabulário: turma, vaga, aparelho, solo, reformer, experimental, reposição, avaliação.

### 6.2 · Fotografia e vídeo

- **O que fotografar:** o estúdio vazio e em aula, os aparelhos, os professores (autorizados), a luz do lugar.
- **Nenhum aluno identificável:** de costas, fora de foco ou fora do quadro (LGPD).
- **Vídeo curto** de capa permitido (até 15 s, sem som, com pausa), pelo protocolo de `../08-imagem-e-fotografia.md`.

### 6.3 · Tipografia

- **Postura:** **exibição**. Em setembro, o `h1` do demo tinha 76 px contra 104 a 158 px das referências: "elevar e comprometer-se".
- **Famílias candidatas** (OFL 1.1 [V]; `README.md`, seção 2):

| Papel | Família | Por quê |
|---|---|---|
| Exibição | **League Gothic** | Grotesca condensada clássica, de placar e de cartaz |
| Texto | **Figtree** | Sem serifa limpa e amigável, legível na grade |
| Alternativa, exibição | **Anton** | Condensada pesada, um peso só |

- **Algarismos tabulares** na grade e na contagem. O demo de setembro usava Sora: não repetir.

### 6.4 · Cor

- **Partida:** concreto claro e **uma cor de anilha** como acento (a da casa); no pilates, a madeira e o tecido do estúdio.
- **Evitar** o violeta sobre quase-preto do demo de setembro (agrupamento "quase-preto com um acento") e o neon sobre preto, clichê de academia.

### 6.5 · Forma

Cantos arredondados (preferência do usuário); a pílula do botão; o raio das fichas de turma.

### 6.6 · O gesto

- **Do ofício:** a **próxima aula em contagem** (a navegação viva do Profissional).
- **Do Spell UI no Profissional:** o **copiar** do pedido da experimental, ou a **espera** visível; um gesto, no ponto de decisão.

### 6.7 · A peça-assinatura (só no Completo)

O relógio da próxima aula em escala de cartaz, como um placar de intervalo, com os aparelhos da casa desenhados por ilustrador. Desde 09.10.2026, o "sem 3D" saiu: no Completo, a peça pode ganhar o objeto em WebGL quando o objeto é do ofício e passa no teste do desconhecido (`../09-movimento.md`, seção 7), e o desenho em traço fica como reserva sem script.

### 6.8 · O que não fazer

| Não | Por quê |
|---|---|
| Antes e depois, corpo à mostra, peso e medida | LGPD e CONFEF 307/2015 |
| Frase motivacional ("sem dor, sem ganho"), "projeto verão" | Promessa e clichê |
| Contagem regressiva de oferta, "últimas vagas" falsas | Urgência artificial |
| Neon sobre preto, violeta sobre quase-preto | Clichê e agrupamento de IA |
| Letras duplicadas por animação | O Fenriz Gym lia "MMaarrttiiaall" no leitor de tela |

---

## 7. Texto

**Registro.** Impessoal, numérico, sem exortação.

**O que dizer:** o número máximo de alunos por turma; a duração; as vagas; a aula experimental (sem custo, se for); a avaliação inicial e o valor; os planos e a regra de saída; o registro de cada professor; o que a casa não faz.

**O que evitar:** prazo de resultado ("em 30 dias"); "perca X kg"; "corpo dos sonhos"; "o melhor estúdio"; "personal" para quem não tem registro; urgência.

**Exemplos no registro certo** (demo de setembro):
- "Seis alunos por turma, no máximo." (título)
- "A semana inteira, com vaga por turma."
- "A aula experimental não tem custo nem prazo de validade."
- "Nenhuma turma funciona por vídeo, por aplicativo ou por ficha na parede. Professor registrado acompanha a sessão inteira."
- "Sem promessa de resultado: nenhum prazo, medida ou número é prometido."

---

## 8. Referências para estudar

| Referência | Endereço | Sob que norma opera | O que aprender | O que não copiar |
|---|---|---|---|---|
| Phive Clubs (SOTD, 05.08.2025) | https://www.awwwards.com/sites/phive-clubs | Portugal (rede de academias) | A **grade de aulas como interação**; a tipografia que responde; um amarelo só | A nota de acessibilidade, 6,2 |
| Core Atelier Pilates (menção honrosa, 25.03.2026) | https://www.awwwards.com/sites/core-atelier-pilates | Estrangeira | O estúdio de pilates como ateliê | — |
| Essor Fitness (menção honrosa, janeiro de 2026) | https://www.awwwards.com/sites/essor-fitness | Estrangeira | — | — |
| Ethos Fitness (setembro) | Endereço não registrado na análise | Estrangeira | `h1` de 104 px com 82 imagens | — |
| BucklerFit, Brasil (setembro) | Endereço não registrado na análise | Brasil; vende para academias | — | 57,2 MB, 397 imagens, 10,6 s, `h1` de 16 px |

---

## 9. O que a pesquisa de setembro mediu

Análise de setembro de 2026 (`nichos/analises/atlas--analise-academia.md`, no repositório do Atlas):

| Site | Pedidos | Peso | Carga | Telas | Imagens | `h1` |
|---|---|---|---|---|---|---|
| BucklerFit (Brasil) | 112 | 57,2 MB | 10,6 s | 11,4 | 397 | 16 px |
| Gymnase Web | 61 | 29,3 MB | 6,6 s | 2,5 | 7 | vazio |
| Fit and You | 30 | 24,4 MB | 6,0 s | 11,6 | 76 | 158 px |
| UFC Gym | 126 | 6,3 MB | 6,0 s | 5,0 | 22 | 30 px |
| Ethos Fitness | 48 | 3,6 MB | 5,9 s | 18,5 | 82 | 104 px |
| Fenriz Gym | 61 | 2,1 MB | 6,2 s | 11,1 | 53 | 120 px |
| **Demo do Atlas** | **4** | **0,052 MB** | **2,8 s** | 12,4 | **0** | 76 px |

| Função | Referências | Demo do Atlas |
|---|---|---|
| Grade de horários | 1 menção em 6 | grade filtrável, funcional |
| Aula experimental | 0 menções | 16 menções, chamada principal |
| Preço publicado | 1 site | 11 ocorrências |

- **Vedações do conselho nas referências:** antes e depois, 1; promessa de resultado corporal, 0; depoimento de aluno, 1 — "nenhuma mudança necessária".
- **Fotografia:** 0 contra 22 a 397 → estúdio e aparelhos, sem aluno identificável.
- **Função:** à frente → **não perder**.

---

## 10. Riscos e pendências

- **Pilates: CREF ou CREFITO** [DIV]: o site diz o registro de cada professor.
- **CONFEF 307/2015** lido em fonte secundária [FU].
- **Vagas** que ninguém atualiza: sem a Agenda, a grade mostra "consultar vaga".
- **"Sem fidelidade e sem multa"** só se o contrato do cliente disser (o site do Atlas tirou a frase do próprio texto em 02.10 por outro motivo: lá, a regra é do Atlas e não está decidida).
- **Aluno identificável** nas fotos: conferir quadro a quadro antes de publicar.

---

## 11. Lista de conferência do nicho

- [ ] Cada professor tem nome e registro (CREF ou CREFITO) visíveis.
- [ ] A grade aparece inteira sem script; o filtro anuncia o estado.
- [ ] As vagas são verdadeiras ou a grade diz "consultar vaga".
- [ ] A contagem da próxima aula usa o fuso de São Paulo e algarismos tabulares, sem movimento com movimento reduzido.
- [ ] Nenhum aluno identificável; nenhum antes e depois, peso ou medida.
- [ ] Nenhuma promessa de resultado nem urgência artificial.
- [ ] A Agenda e o formulário não pedem dado de saúde.
- [ ] Os planos têm preço e a regra de saída.
- [ ] Postura de exibição (razão ≥ 5).
