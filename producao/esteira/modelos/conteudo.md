<!--
  MODELO. O roteiro do conteúdo, página por página, escrito na etapa 5
  (producao/esteira/01-processo.md) ANTES de passar os textos para conteudo/*.ts.
  Serve para provar que cada fato tem origem (producao/esteira/00-principios.md,
  princípio 1) e que as vedações do conselho foram aplicadas. Salve como
  conteudo/ROTEIRO.md no repositório do cliente; o formato dos dados tipados
  está em producao/esteira/10-texto-e-conteudo.md e producao/esteira/13-tecnologia-e-estrutura.md, seção 3.2.
-->

# Roteiro de conteúdo · [Nome de fachada]

- **Plano:** [E: até 3 páginas · P: até 6 · C: sem limite] + Páginas adicionais: [n]
- **Registro verbal:** impessoal, específico, sem superlativo sem prova (`producao/esteira/10-texto-e-conteudo.md`)
- **Vedações do conselho aplicadas:** ver `decisoes.md`, "Normas do conselho aplicadas"

## Páginas

| # | Página | Caminho | Objetivo (uma frase) | Conta no limite do plano? |
|---|---|---|---|---|
| 1 | Início | `/` | [ser entendido em cinco segundos e chamar] | sim |
| 2 | | | | sim |
| 3 | | | | sim |
| — | Aviso de privacidade | `/privacidade` | Obrigação legal | não |
| — | Acessibilidade | `/acessibilidade` | Obrigação legal (RATIFICADO) | não |

## Página 1 · Início

**Metadados**
- `title` (até ~60 caracteres, distinto de toda outra página): [ ]
- `description` (até ~155 caracteres, o que é, onde, a ação): [ ]
- Cartão de compartilhamento: [qual imagem, 1200 × 630]

**Seções, na ordem**

| Seção | Texto (rascunho) | Fato e **fonte** (campo do briefing ou documento) |
|---|---|---|
| Capa: `h1` | [ ] | [ex.: "O que faz, nas palavras do dono", briefing §1] |
| Capa: lide | [ ] | |
| Capa: ação | [ex.: "Chamar no WhatsApp"] → mensagem pronta: "[ ]" | WhatsApp, briefing §3 |
| | | |

**Cada fato aparece uma vez.** Fato repetido em outra seção ou página: [onde, e por quê, se for a chamada para a ação].

## Página 2 · [ ]

[Repita a estrutura da página 1.]

## Dados que alimentam várias páginas (`conteudo/contato.ts`, `conteudo/site.ts`)

| Dado | Valor | Fonte | Onde aparece |
|---|---|---|---|
| Nome de fachada | | briefing §1 | cabeçalho, rodapé, metadados, JSON-LD |
| Razão social e CNPJ | | briefing §1 | rodapé, aviso de privacidade |
| Endereço | | briefing §3 | contato, rodapé, JSON-LD |
| Horário | | briefing §3 | contato, estado ao vivo, JSON-LD |
| WhatsApp e mensagem pronta | | briefing §3 | ação de toda página |
| Prazo de resposta | | briefing §3 | contato, confirmação do formulário |
| Registro do conselho | | briefing §4 | cabeçalho do celular, rodapé |
| Preços (com o mês de referência) | | briefing §2 | serviços, JSON-LD |

## Conferência do texto

- [ ] Todo fato tem fonte na coluna da direita.
- [ ] Nenhum termo vedado pelo conselho (lista em `decisoes.md`).
- [ ] Nenhuma palavra da lista vedada (`producao/esteira/10-texto-e-conteudo.md`).
- [ ] Nenhum aforismo em dois tempos ("Não é X. É Y.").
- [ ] Períodos com mediana até 14 palavras; nenhum acima de 28 (a régua mede).
- [ ] `title` e `description` distintos em toda página.
- [ ] Lido em voz alta.
