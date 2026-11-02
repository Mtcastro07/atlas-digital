<!--
  MODELO. Escrito ANTES de qualquer componente (producao/esteira/04-direcao-de-arte.md).
  Proposto pelo Claude Code, aprovado por Matheus Castro Oliveira de Luna Garcia.
  Salve como identidade.md na raiz do repositório do cliente.
-->

# Identidade · [Nome de fachada]

- **Plano:** [E · P · C]
- **Aprovada em:** [dia.mês.ano], por [nome completo] (a identidade e a mesa)
- **O celular aprovado em:** [dia.mês.ano], por [nome completo] (no fim do passe do celular: `producao/esteira/00-principios.md`, seção 5)
- **Ponto de partida:** [o sistema do nicho (`producao/esteira/nichos/<nicho>.md`) · identidade própria]

*A seção 5 (painéis de estilo) é do Profissional e do Completo; a 6 (peça-assinatura), só do Completo. Apague a que não vale para o plano e mantenha a numeração das outras, para que as remissões da esteira continuem certas: no Essencial, ficam 1 a 4 e 7; no Profissional, 1 a 5 e 7.*

## 1. Briefing visual

1. **O assunto:** [o que é o negócio, nas palavras do dono]
2. **O público:** [quem chega e de onde: cartão, busca, indicação]
3. **A tarefa principal da página:** [a ação única]
4. **Três adjetivos:** [a], [b], [c]
5. **O único elemento memorável:** [o que só este site terá]

## 2. Os adjetivos e as consequências

| Adjetivo (do par de opostos) | Consequência escrita |
|---|---|
| [ex.: sóbrio (e não caloroso)] | [ex.: pouca saturação; nenhum ambiente contínuo; acento só na ação] |
| | |
| | |

## 3. Referências do mundo físico

| # | O quê (foto em `public/referencias/` ou na pasta do briefing) | O que se tira dela |
|---|---|---|
| 1 | [letreiro pintado à mão] | [a serifa do título; o filete] |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |

## 4. Plano de design

### Paleta (OKLCH, por função; contraste medido)

| Token | Valor | Papel | Contraste do par de texto |
|---|---|---|---|
| `--background` | | Fundo | — |
| `--foreground` | | Texto | [x:1 sobre `--background`] |
| `--primary` | | Fundo da ação | — |
| `--primary-foreground` | | Texto da ação | [x:1 sobre `--primary`] |
| `--accent` | | Destaque (até 10% da tela) | [x:1] |
| `--muted-foreground` | | Texto secundário | [x:1] |
| `--border` | | Borda translúcida | [≥ 3:1 se for limite de controle] |
| `--ring` | | Foco | [≥ 3:1] |

### Tipos

| Família | Papel | Postura | Pesos e eixos | Licença (arquivo) | Peso em KB |
|---|---|---|---|---|---|
| | Título | [exibição plena (≥ 5) · exibição serena (≥ 4)] | | [OFL · comercial, com o arquivo] | |
| | Texto | | | | |

Escala (do menor ao maior degrau, com a entrelinha): [ ... ] · Razão título/corpo: [ ]

### Leiaute

- **Conceito, numa frase:** [ ]
- **Alinhamento:** [esquerda; centralizado só em bloco de até três linhas]
- **A capa no celular:**

```
┌───────────────────────────┐
│                           │
│                           │
│                           │
└───────────────────────────┘
```

- **A capa na mesa:**

```
┌───────────────────────────────────────────────────────┐
│                                                       │
└───────────────────────────────────────────────────────┘
```

### O mundo da marca (a tradução dos componentes)

*Cada componente da página traduzido para o mundo da marca, e não a pele da marca sobre o componente genérico (`producao/esteira/19-o-padrao-atlas.md`, seção 3). Exemplo da nutrição: o cabeçalho é o cabeçalho de jornal, a lista de passos é o sumário com numerais romanos, o aviso da norma é a nota de rodapé, o rodapé é o colofão.*

- **O conceito, numa frase** (o mundo de onde tudo sai): [ ]

| Componente | O genérico (o que a base traz) | Neste site, no mundo da marca |
|---|---|---|
| Cabeçalho e navegação | Nome à esquerda, vínculos, botão em pílula | |
| A ação principal (botão) | Pílula escura | |
| Os vínculos de texto | Sublinhado | |
| A lista de serviços ou de preços | Cartões iguais | |
| Os passos ou o processo | 1 · 2 · 3 | |
| Os números (preço, duração, tempo) | Número grande com legenda | |
| O horário e o endereço | Duas colunas e o mapa | |
| O aviso da norma ou o "o que não fazemos" | Grade 2 × 2 de texto | |
| A chamada final | Cartão com botão | |
| O rodapé | Três colunas | |
| Os separadores entre seções | Fundo levemente diferente | |

### As passivas e o código

- **As passivas, por página** (`09-movimento.md`, seção 14): o objeto, o mecanismo e o sentido; a peça grande que dá a cobertura.
- **O código como tema** (`19-o-padrao-atlas.md`, seção 4.3): se o nicho admite, e o trecho verdadeiro de cada página, com a frase para o leigo; ou "não entra", com o motivo.

### O vocabulário de interação

*Cada papel com a sua resposta, saída da matéria da marca; dois papéis nunca com a mesma (`producao/esteira/09-movimento.md`, seção 13). No Completo, também as interações de conteúdo.*

| Papel | Na mesa (hover e foco) | No toque | Com movimento reduzido |
|---|---|---|---|
| A ação principal | | | |
| O vínculo de texto | | | |
| O item de lista ou de índice | | | |
| A peça ou o cartão | | | |
| A imagem | | | |
| A navegação | | | |
| A assinatura [C] | | | |

### A estratégia de cor e de valor

*Uma das três, escolhida e levada até o fim (`producao/esteira/19-o-padrao-atlas.md`, seção 5): o **campo de cor** (a cor da marca ocupando grandes áreas, com viradas de valor entre as cenas, como o Atlas: 54% da página em azul-marinho e 7 viradas), a **cena imersiva** (um valor dominante, escuro ou saturado, iluminado pela matéria, como a barbearia) ou a **folha clara extrema** (o claro com a tipografia em escala de cartaz e a textura do material, como a nutrição).*

- **A estratégia:** [campo de cor · cena imersiva · folha clara extrema], e por quê: [ ]
- **Quanto da página inicial ela ocupa** (na captura inteira a 1440 px): [ ]

### O roteiro de cenas da página inicial

*A composição da página inteira, e não só da capa, desenhada antes do código (`producao/esteira/19-o-padrao-atlas.md`, seção 4). Duas cenas seguidas nunca têm a mesma composição, o mesmo valor de fundo e a mesma escala, e nenhuma cena repete o momento nem o molde de outra (`producao/esteira/20-repeticao-dentro-do-site.md`).*

| Cena | A tarefa (o que o visitante resolve aqui) | O esboço | O fundo (valor e cor) | O evento tipográfico | A imagem | O efeito da identidade | O movimento |
|---|---|---|---|---|---|---|---|
| 1 · Capa | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |

```
[o esboço ASCII de cada cena, na mesa e no celular]
```

### Forma

| Item | Escolha | Motivo |
|---|---|---|
| Raio por nível (ação · cartão · marcação · faixa) | | |
| Borda | | |
| Sombra (uma luz) | | |
| Textura | | |

### Movimento

| Item | Escolha |
|---|---|
| Camada do plano | [revelação · + resposta e navegação viva · completa] |
| O gesto da marca (um) e o motivo | |
| O que não se move | |
| Onde mora cada efeito (um lugar por efeito, nenhum em série: `producao/esteira/20-repeticao-dentro-do-site.md`) | |

### O acabamento (o piso das sete camadas)

*Preencha na direção de arte, antes do código, e confira no teste da vitrine de cada passe (`producao/esteira/00-principios.md`, seção 9). Os efeitos da identidade se derivam pelos cinco passos de `producao/esteira/09-movimento.md`, seção 12.*

| Camada | O que este site tem |
|---|---|
| 1 · O momento de exibição na capa (a postura e a razão: plena ≥ 5, serena ≥ 4) | |
| 2 · A matéria (o material da marca e como ele aparece na superfície) | |
| 3 · A luz e a profundidade | |
| 4 · A imagem forte de cada página de decisão (a foto, ou a imagem construída) | |
| 5 · Os efeitos da identidade (a matéria → a luz → a resposta à mão → a entrada → onde mora) | |
| 6 · O movimento da camada do plano, inteiro (o que o plano entrega: `09-movimento.md`, seção 4) | |
| 7 · O detalhe | |
| **O teste da vitrine:** ao lado do Atlas e de [nutrição · depósito · barbearia], a 1440 e a 390 px | [veredito, quem, data] |

### O premium no celular (o passe do celular)

*Preencha no começo do passe do celular, depois da porta da mesa, e aprove junto com as capturas a 390 px. Cada momento premium da mesa tem a sua versão de toque, mais leve e nunca mais pobre (`producao/esteira/09-movimento.md`, seção 11).*

| O momento na mesa | A versão no celular | O que fica mais leve |
|---|---|---|
| | | |

### Imagem

| Seção | Foto (do protocolo) | Direção (luz, ângulo, recorte) |
|---|---|---|
| | | |

**Proibido nesta marca:** [o que a norma veda e o que a deixaria genérica]

### Princípios (três frases)

1. [ ]
2. [ ]
3. [ ]

## 5. Painéis de estilo [P][C]

| Painel | Direção | Escolhido? | Por quê |
|---|---|---|---|
| A | | | |
| B | | | |
| C | | | |

## 6. Peça-assinatura [C]

- **O objeto:** [ ]
- **Por que é do ofício:** [ ]
- **Teste do desconhecido** (primeira palavra de quem não participou): [ ]
- **Técnica:** [WebGL próprio · CSS 3D · SVG · ilustração encomendada]; peso medido: [ ] KB
- **Reserva sem WebGL e sem script:** [ ]

## 7. Testes

| Teste | Resultado | Data |
|---|---|---|
| Prompt parecido: o que coincidiu com o padrão e o que se mudou | | |
| Teste do desconhecido, em cada peça visual | | |
| Unicidade contra os clientes do mesmo nicho | | |
| [P][C] Unicidade contra três concorrentes locais | | |
| Avaliação anti-IA do plano (antes do código) | | |
| Avaliação anti-IA do resultado (390 e 1440 px) | | |
