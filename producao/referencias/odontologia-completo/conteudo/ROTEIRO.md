# Roteiro de conteúdo · Odontologia Boa Viagem

- **Plano:** C (sem limite de páginas) + Páginas adicionais: não se aplica
- **Registro verbal:** impessoal, específico, sem superlativo sem prova (`producao/esteira/10-texto-e-conteudo.md`)
- **Vedações do conselho aplicadas:** ver `decisoes.md`, "Normas do conselho aplicadas". Nenhum valor, forma de pagamento, convênio, antes e depois, paciente, diagnóstico, "popular", "especialista" sem título.
- **Origem de todo fato:** o `briefing.md` fictício (seção entre parênteses). Os protocolos de tratamento são "da casa" fictícia e dependem de revisão de um dentista antes de qualquer uso real.

## Páginas

| # | Página | Caminho | Objetivo (uma frase) | Conta no limite do plano? |
|---|---|---|---|---|
| 1 | Início | `/` | Dizer em cinco segundos o que a casa faz, a regra da casa e como pedir uma avaliação | não há limite [C] |
| 2 | Tratamentos | `/tratamentos` | O plano de sessões, aberto pelo mapa dos dentes: a funcionalidade 2 | idem |
| 3 a 8 | Limpeza, Restauração, Canal, Clareamento, Coroa, Aparelho | `/tratamentos/<id>` | Explicar cada tratamento e ocupar a busca ("canal na Boa Viagem") | idem (páginas de busca por serviço) |
| 9 | Avaliação | `/avaliacao` | O pedido de avaliação: a funcionalidade 1 | idem |
| 10 | A equipe e a clínica | `/equipe` | Dizer quem atende, com CRO e título, e como é a clínica | idem (a página "O consultório" do nicho se funde aqui: sem foto, seria vazia; ver `decisoes.md`) |
| 11 | Guias | `/guias` | O que acontece na avaliação, o que levar e as perguntas comuns, sem consulta nem diagnóstico | idem (conteúdo editorial) |
| 12 | Onde | `/onde` | Levar até a porta | idem |
| — | Aviso de privacidade | `/privacidade` | Obrigação legal | não |
| — | Acessibilidade | `/acessibilidade` | Obrigação legal | não |

**Fora do plano de páginas, por escolha:** formulário e relatório de acessos (o exemplo não coleta dado; o relatório é do dono, fora do site); galeria (o exemplo não tem foto); Agenda e Presença (módulos vendidos à parte).

## Página 1 · Início

**Metadados:** título "Odontologia Boa Viagem · clínica odontológica em Niterói" (+ " · demonstração"); descrição "Odontologia na Boa Viagem, em Niterói. A primeira consulta é só avaliação; cada tratamento sai com as sessões por escrito." (+ "Estabelecimento fictício."); cartão: a primeira tela, 1200 × 630, capturada.

| Seção | Texto | Fato e fonte |
|---|---|---|
| Capa: `h1` | "Odontologia na Boa Viagem: primeiro a avaliação, depois o tratamento." | Nome e bairro (briefing §1, §3); o fato da casa (diferencial 1, §1) |
| Capa: lide | "Na primeira consulta, o dentista examina e conversa. O tratamento começa depois, com o número de sessões combinado por escrito." | "O que faz, nas palavras do dono" (§1), em registro impessoal |
| Capa: ação | "Pedir avaliação pelo WhatsApp" → "Olá. Gostaria de marcar uma avaliação." | Ação principal (§5); WhatsApp (§3) |
| Capa: prazo | "Resposta em até 30 minutos, no horário de funcionamento." | §3 |
| Capa: estado ao vivo | "Aberto agora · fecha às 12h" / "Fechado agora · abre às 13h30" (calculado no relógio de Niterói) | Horário e feriados (§3) |
| Capa: responsável técnica | "Dra. Beatriz da Silva, cirurgiã-dentista, CRO-RJ 00000" | §4; Código de Ética, art. 43 |
| Urgência | "Com dor, o encaixe é no mesmo dia. De segunda a sexta, para quem avisar até as 16h..." | Urgência (§12) |
| Tratamentos | Tabela: nome, sessões, intervalo, de cada um | §2 e §12 |
| Quem atende | Três nomes, título e CRO | §12 |
| O que não se faz aqui | Quatro ausências, cada uma com o motivo | "O que o negócio não faz" (§2); a norma (`decisoes.md`) |
| Horário e onde | Horário dia a dia; endereço | §3 |

**Cada fato aparece uma vez.** O prazo de resposta e a urgência aparecem na capa e, resumidos, na chamada final e no rodapé: só a ação repete. O horário aparece em "Horário" e no rodapé (o resumo de uma linha é o do rodapé de todo site).

## Página 2 · Tratamentos

**Metadados:** título "Tratamentos e plano de sessões"; descrição "Seis tratamentos, com sessões, intervalos e cuidados depois. Sem valores: a norma do conselho os veda."

| Seção | Texto | Fato e fonte |
|---|---|---|
| `h1` e lide | "Tratamentos e plano de sessões"; "Escolha uma região da boca... não é um orçamento..." | Ressalva do nicho (seção 5.2) |
| Mapa dos dentes | Quatro regiões, a numeração FDI, a lista das regiões como controle | Regiões por tratamento (§12) |
| Tabela | Tratamento, sessões, intervalo e regiões, com vínculo para cada página | §2 e §12 |
| Notas | "Esta página não divulga valores, porque a norma do conselho o veda."; "Implante e cirurgia do siso: a clínica encaminha a outro profissional." | Texto da norma (nicho, seção 5.1); "o que o negócio não faz" (§2) |

## Páginas 3 a 8 · Um tratamento por página

**Metadados:** título e descrição por tratamento (`conteudo/site.ts`); cada um traz as sessões na descrição.

| Seção | Texto | Fato e fonte |
|---|---|---|
| `h1` | "<Tratamento>: <sessões e intervalo>" | §12 |
| Lide | O que é, em uma frase; quem atende, com o título | §12, "Em uma frase" e "Quem atende" |
| Sessão a sessão | Cada sessão, com a duração, o que se faz e o tempo até a seguinte | §12, "O que se faz em cada sessão" |
| Cuidados depois | O texto da casa | §12, "Cuidados depois" |
| Onde se aplica | O mapa com as regiões do tratamento | §12, "Região no mapa dos dentes" |
| Ressalva | "O número de sessões de cada caso sai do exame clínico, e consta do plano entregue por escrito." | Nicho, seção 5.2 |
| Ação | "Pedir avaliação para este caso" → "Olá. Gostaria de marcar uma avaliação. Atendimento: <tratamento>." | §5 |

## Página 9 · Avaliação

| Seção | Texto | Fato e fonte |
|---|---|---|
| `h1` e lide | "Pedir uma avaliação"; "Escolha o atendimento e, se quiser, a região da boca..." | Nicho, seção 5.1 |
| Atendimento | Sete opções (rotina, urgência, limpeza, estética, aparelho, continuar tratamento, outro) | Nicho, seção 5.1, sem "implante" (a clínica encaminha: §2) e sem sintoma |
| Região, última visita, período | Opcionais | Nicho, seção 5.1 |
| A mensagem | "Olá. Gostaria de marcar uma avaliação. Atendimento: limpeza. Região: ... " | Nicho, seção 5.1 |
| Urgência | "Com dor, o encaixe é no mesmo dia, de segunda a sexta, para quem avisar até as 16h." | §12 |
| Norma | "Esta página não divulga valores, porque a norma do conselho o veda." | Nicho, seção 5.1 |

## Página 10 · A equipe e a clínica

| Seção | Texto | Fato e fonte |
|---|---|---|
| Equipe | Três profissionais: nome, profissão, CRO, título, formação, o que atendem | §12 |
| Relação dos especialistas | Endodontia: Dr. Caio da Silva; Ortodontia: Dra. Helena da Silva | §12; Código de Ética, art. 43, § 2º |
| A clínica | Três consultórios e uma sala de espera; entrada sem degrau; esterilização em autoclave | §3 e §12 |

## Página 11 · Guias

| Seção | Texto | Fato e fonte |
|---|---|---|
| O que acontece na avaliação | Quatro passos, em sequência | §12 |
| O que levar | O documento, as radiografias anteriores e a lista de medicamentos | §12 |
| Perguntas comuns | Seis perguntas, só com fato do briefing | §2, §12 |

## Página 12 · Onde

| Seção | Texto | Fato e fonte |
|---|---|---|
| Endereço e mapa | Rua Presidente Domiciano, 000, Boa Viagem; o mapa desenhado do OpenStreetMap | §3 |
| Horário | Dia a dia, com o almoço, e "Feriados: fechado." | §3 |
| Contato | WhatsApp, telefone e o prazo de resposta | §3 |
| Como chegar | Entrada sem degrau; sem estacionamento próprio | §3 |

## Dados que alimentam várias páginas (`conteudo/contato.ts`, `conteudo/negocio.ts`)

| Dado | Valor | Fonte | Onde aparece |
|---|---|---|---|
| Nome de fachada | Odontologia Boa Viagem | briefing §1 | cabeçalho, rodapé, metadados |
| Razão social e CNPJ | não se aplica (fictício) | briefing §1 | selo de ficção no rodapé |
| Endereço | Rua Presidente Domiciano, 000, Boa Viagem, Niterói – RJ, CEP 24210-320 | briefing §3 | contato, rodapé |
| Horário | Seg a qui, 8h às 12h e 13h30 às 18h; sex, 8h às 12h e 13h30 às 17h; sáb, 8h às 12h | briefing §3 | Início, Onde, rodapé, estado ao vivo |
| WhatsApp e mensagem pronta | 5521900000000 | briefing §3 | ação de toda página |
| Prazo de resposta | até 30 minutos | briefing §3 | capa, contato, rodapé |
| Registro do conselho | CRO-RJ 00000 (clínica); responsável técnica: Dra. Beatriz da Silva, CRO-RJ 00000 | briefing §4 | cabeçalho, capa, rodapé, equipe |
| Preços | nenhum: vedado | briefing §2; Código de Ética, art. 44, I | nenhum lugar |

## Conferência do texto

- [x] Todo fato tem fonte na coluna da direita.
- [x] Nenhum termo vedado pelo conselho (lista em `decisoes.md`).
- [ ] Nenhuma palavra da lista vedada (`producao/esteira/10-texto-e-conteudo.md`): conferida pela régua (bloco 10) e à mão na etapa 7.
- [x] Nenhum aforismo em dois tempos.
- [ ] Períodos com mediana até 14 palavras; nenhum acima de 28 (a régua mede, etapa 7).
- [x] `title` e `description` distintos em toda página.
- [ ] Lido em voz alta: **pendente, é de pessoa** (etapa 7, item 6).
