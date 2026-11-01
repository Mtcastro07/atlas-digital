<!--
  A identidade do site de exemplo da base de produção (producao/base/), preenchida pelo modelo
  producao/esteira/modelos/identidade.md. Site fictício: as referências são descritas, sem foto.
-->

# Identidade · Banho e Tosa Fonseca

- **Plano:** E
- **Aprovada em:** 08.10.2026, com a base de produção (proposta do Claude Code; a confirmar por Matheus Castro Oliveira de Luna Garcia, como toda identidade)
- **Ponto de partida:** o sistema do nicho (`producao/esteira/nichos/pet-shop.md`, seção 6), ajustado à marca

## 1. Briefing visual

1. **O assunto:** banho e tosa com hora marcada, no Fonseca.
2. **O público:** o tutor de cão de pequeno e médio porte do bairro, que chega pelo cartão no balcão ou pela busca "banho e tosa Fonseca".
3. **A tarefa principal da página:** marcar o banho pelo WhatsApp, sabendo antes o preço e o tempo.
4. **Três adjetivos:** cuidadoso, claro, de bairro.
5. **O único elemento memorável:** o preço por porte na primeira tela, ao lado do título, com o marca-texto em "por porte".

## 2. Os adjetivos e as consequências

| Adjetivo (do par de opostos) | Consequência escrita |
|---|---|
| Cuidadoso (e não brincalhão) | Nenhuma patinha, ossinho, bolha ou diminutivo; o calor vem do fato (um animal por vez, o secador de baixo ruído), não da voz |
| Claro (e não decorado) | A tabela é o elemento principal; números grandes, tabulares; fundo liso; nenhum degradê |
| De bairro (e não de franquia) | O bairro no título; a casa diz o que não faz (gatos, sedação, leva e traz) |

## 3. Referências do mundo físico

| # | O quê | O que se tira dela |
|---|---|---|
| 1 | As toalhas da casa, cor de vinho | O acento (`--primary`) e o ícone |
| 2 | A mesa de tosa, de cantos arredondados | O raio generoso dos cartões |
| 3 | A tabela de preços impressa no balcão | A tabela como peça principal; o porte na coluna |
| 4 | O quadro de horários na parede | O horário dia a dia, em lista de definição |
| 5 | A etiqueta escrita à mão no pote de xampu | O marca-texto: a marcação de quem escreve a mão |

## 4. Plano de design

### Paleta (OKLCH, por função; contraste medido por `npm run paleta`, 08.10.2026)

| Token | Valor | Papel | Contraste do par de texto |
|---|---|---|---|
| `--background` | `oklch(0.985 0.008 80)` | Fundo: branco quente | — |
| `--foreground` | `oklch(0.27 0.03 320)` | Texto: tinta de vinho escuro | 14,6:1 sobre o fundo |
| `--primary` | `oklch(0.46 0.15 352)` | Fundo da ação: o vinho das toalhas | — |
| `--primary-foreground` | `oklch(0.99 0 0)` | Texto da ação | 7,6:1 sobre `--primary` |
| `--accent` | `oklch(0.44 0.15 352)` | Vínculos e a página atual | 8,1:1 sobre o fundo |
| `--muted-foreground` | `oklch(0.45 0.03 320)` | Texto secundário | 7,3:1 sobre o fundo |
| `--marcador` | `oklch(0.9 0.06 352)` | O marca-texto | A tinta por cima: 11,0:1 |
| `--border` | `oklch(0.27 0.03 320 / 0.14)` | Borda translúcida | Não é limite de controle |
| `--ring` | `oklch(0.46 0.15 352)` | Foco | 7,4:1 sobre o fundo |

### Tipos

| Família | Papel | Postura | Pesos e eixos | Licença (arquivo) | Peso em KB |
|---|---|---|---|---|---|
| Fredoka | Título | Exibição | 400–700, variável | OFL (`app/fontes/OFL-fredoka.txt`) | 29,0 |
| Nunito | Texto | — | 400–700, variável | OFL (`app/fontes/OFL-nunito.txt`) | 38,2 |

**A escala:**
- rótulo 13 px;
- nota 15;
- corpo 17;
- destaque 18→22;
- número 24→36;
- título 30→52;
- display 40→92.

**A razão título/corpo:** 6,1 na mesa e 2,9 no celular, medida pela régua.

### Leiaute

- **Conceito, numa frase:** a tabela de preço por porte é a peça principal, ao lado do título na mesa e logo abaixo da ação no celular.
- **Alinhamento:** à esquerda.
- **A capa no celular:**

```
┌───────────────────────────┐
│ Banho e Tosa Fonseca   [≡]│
│                           │
│ Banho e tosa no           │
│ Fonseca, com              │
│ hora marcada.             │
│ O valor e o tempo... por  │
│ porte e pelagem...        │
│ [ Agendar pelo WhatsApp ] │
│ Resposta em até 1 hora    │
│ ┌───────────────────────┐ │
│ │ O banho, por porte    │ │
│ │ Pequeno  ....  R$ 50  │ │
└───────────────────────────┘
```

- **A capa na mesa:**

```
┌───────────────────────────────────────────────────────┐
│ Banho e Tosa Fonseca   Início Serviços Onde [Agendar] │
│                                                       │
│ Banho e tosa              ┌─────────────────────────┐ │
│ no Fonseca,               │ O banho, por porte      │ │
│ com hora                  │ Pequeno até 10 kg  R$ 50│ │
│ marcada.                  │ Médio 10 a 25 kg   R$ 65│ │
│ O valor e o tempo... por  │ Grande + de 25 kg  R$ 85│ │
│ porte e pelagem...        │ Ver a tabela inteira    │ │
│ [ Agendar pelo WhatsApp ] └─────────────────────────┘ │
└───────────────────────────────────────────────────────┘
```

### Forma

| Item | Escolha | Motivo |
|---|---|---|
| Raio por nível (ação · cartão · marcação · faixa) | Pílula · 24 px · 8 px · — | A mesa de tosa arredondada; a preferência do usuário por cantos arredondados |
| Borda | Translúcida, 14% da tinta | Separar sem pesar |
| Sombra (uma luz) | Nenhuma | Fundo liso; a tabela se separa pela borda |
| Textura | Nenhuma | Claro, não decorado |

### Movimento

| Item | Escolha |
|---|---|
| Camada do plano | Revelação (Essencial): a revelação uma vez ao entrar na tela, a troca de página, o marca-texto |
| O gesto da marca (um) e o motivo | O marca-texto em "por porte", no lide: a etiqueta escrita à mão no pote de xampu, e a resposta à pergunta de todo tutor ("quanto custa para o meu?") |
| O que não se move | O título, o lide e a ação: entram já legíveis (o LCP) |

### Imagem

| Seção | Foto (do protocolo) | Direção (luz, ângulo, recorte) |
|---|---|---|
| — | Nenhuma (site de exemplo, sem negócio real) | Os substitutos: a tabela como peça principal e a tipografia em escala |

**Proibido nesta marca:**
- patinha, ossinho, bolhas;
- a voz do cachorro, diminutivos;
- desconto com urgência;
- foto de banco ou gerada;
- ilustração improvisada (`producao/esteira/nichos/pet-shop.md`, seção 6.8).

### Princípios (três frases)

1. O preço por porte responde antes da pergunta.
2. O calor vem do fato da casa, nunca da voz do bicho.
3. Nada se move que o tutor não precise ver se mover.

## 7. Testes

| Teste | Resultado | Data |
|---|---|---|
| Prompt parecido ("site de pet shop de bairro"): o que coincidiu com o padrão e o que se mudou | O padrão traria azul-piscina, patinhas, bolhas e cartões iguais de serviço. Ficaram o fundo claro e o arredondado (do assunto e da preferência); saíram as patinhas e os cartões iguais; a tabela virou a peça principal | 08.10.2026 |
| Teste do desconhecido, em cada peça visual | O ícone "B" em traço redondo lê-se como a inicial da casa | 08.10.2026 |
| Avaliação anti-IA do plano (antes do código) | Sem escolha por omissão sem motivo; a fonte, a cor e o gesto têm referência | 08.10.2026 |
| Avaliação anti-IA do resultado (390 e 1440 px) | Corrigido na construção: a página de serviços em três cartões iguais, com três cartões menores dentro (o "kit de cartões"), virou tabela na mesa e fichas no celular; a metade direita vazia da capa recebeu o resumo de preço | 08.10.2026 |
