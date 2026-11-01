# Identidade · Odontologia Boa Viagem

- **Plano:** C
- **Aprovada em:** 08.10.2026. **Aprovação simulada no teste:** o kit exige a de Matheus Castro Oliveira de Luna Garcia, ou de outro sócio de desenvolvimento, e nunca a de Gabriel Ribeiro Ota Yida sozinho. Nenhuma pessoa aprovou. Lida como "proposta do Claude Code, a confirmar".
- **Ponto de partida:** identidade própria, com o sistema do nicho (`producao/esteira/nichos/odontologia.md`, seção 6) como referência: contenção tipográfica, branco quente, cantos arredondados, o mapa dos dentes como gesto do ofício. Nenhum cliente de odontologia no Atlas para comparar (a única odontologia é a versão estática de setembro, "vinho sobre branco quente, Instrument Serif").

## 1. Briefing visual

1. **O assunto:** uma clínica odontológica de bairro que examina antes de tratar e diz, por escrito, quantas sessões cada tratamento leva. Nas palavras do dono: "Na primeira consulta a gente só examina e conversa."
2. **O público:** adultos da Boa Viagem e dos bairros vizinhos que adiaram a consulta. Chegam pela busca ("canal na Boa Viagem"), pelo cartão de retorno ou por indicação, quase sempre no celular, às vezes com dor.
3. **A tarefa principal da página:** pedir uma avaliação pelo WhatsApp, escolhendo o atendimento e, se quiser, a região da boca. Nunca o sintoma.
4. **Três adjetivos:** calmo, preciso, de bairro.
5. **O único elemento memorável:** o mapa dos dentes, no traço da ficha clínica impressa. Toca-se uma região, o lápis vermelho a circula, e a página responde com sessões, intervalos e cuidados: o tempo no lugar do preço, que a norma veda.

## 2. Os adjetivos e as consequências

| Adjetivo (do par de opostos) | Consequência escrita |
|---|---|
| Calmo (e não impactante; "discreto", "sóbrio" no briefing) | Postura de **contenção**: título de, no máximo, 2 vezes o corpo; nenhum ambiente contínuo, nenhuma pausa a oferecer; um só gesto, a inclinação leve do mapa, só com ponteiro fino; o acento aparece só ao marcar a região, na urgência e no foco |
| Preciso (e não decorado; "acolhedor, com precisão") | Algarismos tabulares em tudo o que é número (sessões, minutos, dias, CRO, numeração dos dentes); sessões em sequência numerada, porque são uma sequência de verdade; filetes finos só onde há tabela ou ficha; nenhum degradê, nenhuma textura |
| De bairro (e não de rede; "popular" no briefing) | O bairro no título, o mapa do bairro desenhado das ruas reais, o endereço à vista, a clínica diz o que não faz. **A palavra "popular" nunca aparece** (Código de Ética Odontológica, art. 44, VII); "de bairro" é o adjetivo |

## 3. Referências do mundo físico

Descritas, sem foto (site de exemplo, sem negócio real). Num cliente, as cinco seriam fotografadas no briefing.

| # | O quê | O que se tira dela |
|---|---|---|
| 1 | A ficha clínica impressa, com o odontograma em linhas finas e a numeração dos dentes (notação FDI) | O mapa dos dentes: traço fino, números pequenos em volta, a região circulada a lápis |
| 2 | O cartão de retorno, com a data da próxima sessão escrita à mão | As sessões em sequência numerada, cada uma com o dia depois da anterior: "Sessão 2 · 7 dias depois" |
| 3 | O instrumental de aço escovado na bandeja, sob o refletor | A tinta grafite e o texto secundário em cinza-aço; nenhuma cor de "clínica" |
| 4 | A cerâmica branca-quente da pia e do balcão | O fundo (esmalte quente) e a superfície do cartão, mais clara que o fundo, como uma folha sobre o balcão |
| 5 | A placa de vidro jateado na porta, com nome, CRO e horário | A hierarquia da placa no cabeçalho e na equipe: o nome, o registro e o horário, nessa ordem, em corpo sóbrio |

## 4. Plano de design

### Paleta (OKLCH, por função; contraste medido por `npm run paleta` em 08.10.2026: 12 de 12 pares acima do mínimo)

| Token | Valor | Papel | Contraste do par de texto |
|---|---|---|---|
| `--background` | `oklch(0.975 0.007 85)` | Fundo: o esmalte, branco quente | — |
| `--foreground` | `oklch(0.27 0.012 60)` | Texto e ação: o grafite | 14,03:1 sobre o fundo; 12,95:1 sobre o suave |
| `--card` | `oklch(0.997 0.003 85)` | Superfície: a folha sobre o balcão | 15,00:1 (tinta sobre a folha) |
| `--primary` / `--primary-foreground` | `oklch(0.27 0.012 60)` / `oklch(0.985 0.006 85)` | A ação: botão grafite, texto esmalte | 14,50:1 |
| `--accent` | `oklch(0.47 0.16 27)` | O lápis vermelho: a região marcada, a urgência, o foco | 6,92:1 sobre o fundo; 7,40:1 sobre a folha |
| `--muted-foreground` | `oklch(0.45 0.012 60)` | Texto secundário: o aço | 6,92:1 sobre o fundo; 7,40:1 sobre a folha |
| `--marcador` | `oklch(0.93 0.04 27)` | O preenchimento da região marcada | 12,03:1 (a tinta por cima) |
| `--border` | `oklch(0.27 0.012 60 / 0.16)` | Borda translúcida | Não é limite de controle |

Seis cores, uma só de acento, em menos de 10% da tela. Escuro não: a cena é o consultório claro, de papel impresso.

### Tipos

| Família | Papel | Postura | Pesos e eixos | Licença (arquivo) | Peso em KB |
|---|---|---|---|---|---|
| Red Hat Display | Títulos e números grandes (`--font-titulo`, `font-display`) | Contenção | 400–700, variável, recorte latino | OFL (`app/fontes/OFL-redhatdisplay.txt`) | 29,9 |
| Red Hat Text | Texto e interface (`--font-texto`, `font-sans`) | Contenção | 400–700, variável, recorte latino | OFL (`app/fontes/OFL-redhattext.txt`) | 29,5 |

Total: 59,4 KB (o teto é 200 KB). Duas famílias, a mesma desenhista: o teto do kit é duas.

**Por que o par Red Hat, e não a Albert Sans:** a primeira escolha foi a Albert Sans, que o arquivo do nicho recomenda como família única ("sem serifa geométrica, limpa, com pesos para separar título e texto"). Na verificação, ao medir os algarismos, ela não tem o recurso `tnum` (a Albert Sans baixada traz só `kern`, `ccmp`, `frac`, `liga` e `locl`): o `font-variant-numeric: tabular-nums` do site não fazia nada, e as sessões, os minutos e o horário se alinhavam por larguras diferentes (o "1111" media metade do "0000" a 40 px). A Red Hat Display e a Red Hat Text, alternativas do arquivo do nicho, trazem `tnum` (medido: "1111" e "0000" com 96 px cada, a 40 px), e a ficha impressa continua pedindo letra neutra. **Por que não as da lista de excesso:** nenhuma delas (Inter, Roboto, Geist, Fraunces, Instrument Serif) entra.

**A escala** (7 degraus, na mesa; o celular usa o início de cada faixa): rótulo 13 px · nota 15 · corpo 17→18 · destaque 19→21 · número 24→32 · título 24→28 · display 30→35. **Razão título/corpo:** 1,94 na mesa (35 ÷ 18) e 1,76 no celular: postura de contenção, razão menor que 2.

### Leiaute

- **Conceito, numa frase:** uma ficha clínica aberta: o texto corre numa coluna estreita, como as anotações, e o mapa dos dentes ocupa a folha ao lado.
- **Alinhamento:** à esquerda; nada centralizado além de três linhas.
- **A capa no celular:**

```
┌───────────────────────────┐
│ Odontologia Boa Viagem [≡]│
│ CRO-RJ 00000 · clínica    │
│                           │
│ Odontologia na Boa Viagem:│
│ primeiro a avaliação,     │
│ depois o tratamento.      │
│ A primeira consulta é só  │
│ avaliação. Resp. técnica: │
│ Dra. Beatriz da Silva ... │
│ [ Pedir avaliação ]       │
│ Aberto agora · fecha 18h  │
│ Com dor? Avise até 16h.   │
│ ┌───────────────────────┐ │
│ │  mapa dos dentes      │ │
└───────────────────────────┘
```

- **A capa na mesa:**

```
┌───────────────────────────────────────────────────────┐
│ Odontologia Boa Viagem  Início Tratamentos ... [Pedir]│
│                                                       │
│ Odontologia na Boa Viagem:    ┌───────────────────┐   │
│ primeiro a avaliação,         │   ficha: mapa     │   │
│ depois o tratamento.          │   dos dentes      │   │
│ A primeira consulta é só...   │  (uma folha)      │   │
│ [ Pedir avaliação ]           │ ( ) regiões       │   │
│ Aberto agora · fecha 18h      └───────────────────┘   │
└───────────────────────────────────────────────────────┘
```

### Forma

| Item | Escolha | Motivo |
|---|---|---|
| Raio por nível (ação · cartão · marcação · faixa) | Pílula · 20 px · 8 px · — | Preferência do usuário por cantos arredondados; a folha da ficha com cantos macios; o raio de dentro menor que o de fora |
| Borda | Translúcida, 16% da tinta; filete de 1 px nas tabelas | A ficha impressa: separar sem pesar |
| Sombra (uma luz) | Nenhuma | Fundo liso; a folha se separa pela borda e pela cor |
| Textura | Nenhuma | Nenhum degradê decorativo, nenhuma grade, nenhum quadriculado |

### Movimento

| Item | Escolha |
|---|---|
| Camada do plano | Completa, **contida** (ramo de saúde, como a medicina): revelação uma vez abaixo da dobra, troca de página, estado ao vivo ("aberto agora"), copiar. Sem ambiente contínuo e, por isso, sem o botão de pausa |
| O gesto da marca (um) e o motivo | A inclinação leve do mapa dos dentes sob o ponteiro (até 3°), só com ponteiro fino e sem movimento reduzido, e sem o brilho que o componente traz: a folha da ficha inclina sob a mão, e o brilho seria "brilho de sorriso" (`nichos/odontologia.md`, seção 6.6) |
| O que não se move | O título, o lide e a ação (entram já legíveis: o LCP); o mapa em repouso; o círculo de lápis aparece por opacidade e escala, só em resposta a quem escolhe |

### Imagem

| Seção | Foto (do protocolo) | Direção (luz, ângulo, recorte) |
|---|---|---|
| — | Nenhuma (site de exemplo, sem negócio real) | Os substitutos: o mapa dos dentes, o mapa do bairro desenhado das ruas reais (OpenStreetMap), os números das sessões em corpo grande e a tipografia. **Risco registrado:** a marca I6 (ausência total de imagem num ramo em que gente e lugar são a prova) |

**Proibido nesta marca:**
- antes e depois, paciente, boca em close, imagem de procedimento em andamento (CFO-196/2019, art. 3º; política do Atlas);
- sorriso de modelo, ícone de dente com brilho, turquesa e azul-hospital;
- preço, "a partir de", gratuidade, forma de pagamento, convênio (Código de Ética, art. 44, I; art. 43, § 1º, IV, fica fora até o parecer);
- "popular", "sem dor", "premium", "o melhor", "garantia", "sorriso perfeito", "especialista" sem título;
- foto de banco ou gerada; ilustração figurativa (o mapa é um diagrama, não uma figura);
- degradê, textura, grade, sombra pesada, halo, brilho;
- a letra monoespaçada como fantasia de "técnico".

### Princípios (três frases)

1. O tempo ocupa o lugar do preço: cada tratamento diz quantas sessões leva, e o intervalo entre elas.
2. A página responde ao toque e nunca se move sozinha.
3. A norma aparece como ausência declarada, não como nota de rodapé.

## 5. Painéis de estilo [P][C]

Os três estão em `material/paineis/paineis.html`, com a captura em `material/capturas/paineis-de-estilo.png` (fora do git).

| Painel | Direção | Escolhido? | Por quê |
|---|---|---|---|
| A | Ficha clínica: esmalte quente, grafite, lápis vermelho; Albert Sans (trocada pela Red Hat na verificação, por causa do `tnum`: seção 3, "Tipos"); filetes de 1 px | **Sim** | Vem da referência 1 (a ficha impressa) e da convenção do odontograma (o lápis circula o que se vai tratar). Foge do clichê do ramo, o azul e o turquesa. O acento só marca |
| B | Esmalte e cerâmica: verde de louça, Red Hat Display e Red Hat Text, raios de 28 px | Não | Lê como "bem-estar" e se parece com a nutrição; o par de fontes é o das alternativas do nicho, mas sem a ficha |
| C | Instrumental: cinzas de aço, azul de caneta, numerais grandes | Não | Lê como clínica genérica (o azul é o clichê do ramo e se aproxima do navy do Atlas); o número grande como imagem é a marca L2 |

**A colagem de elementos** (cabeçalho, ação, cartão de tratamento, rodapé, campo e foco): feita na própria base, sobre as páginas de fábrica, antes de reescrever o conteúdo (as capturas de `material/capturas/`).

## 6. Peça-assinatura [C]

- **O objeto:** o mapa dos dentes: duas arcadas de 16 dentes, vistas de cima, na notação FDI (11 a 48), no traço da ficha clínica; as quatro regiões (dentes da frente e do fundo, arcada superior e inferior) são o controle do pedido de avaliação e do plano de sessões.
- **Por que é do ofício:** é o odontograma da ficha que o dentista preenche em toda consulta; só uma clínica odontológica o tem. Serve às duas funcionalidades do plano com o mesmo componente (`nichos/odontologia.md`, seção 5).
- **Teste do desconhecido** (primeira palavra de quem não participou): **pendente de pessoa.** Quem fez a peça sabe o que desenhou e não enxerga o erro de leitura. A leitura própria, só como registro: arcadas de dentes, numeradas. O risco é ler-se como "ferradura" ou "teclas". Se a primeira palavra for outra, a peça cai e fica a tabela, que já existe sem script.
- **Técnica:** SVG gerado por código a partir de dados (a numeração FDI e as larguras médias das coroas, de Wheeler, a conferir com um dentista; não verificado); sem biblioteca, sem WebGL; peso a medir. **Conflito do kit, decidido aqui:** `esteira/08-imagem-e-fotografia.md`, seção 2.3, diz que a produção não desenha figuras e que a ilustração é do ilustrador; `esteira/14-funcionalidades/08-peca-assinatura.md`, seção 5, repete; mas `nichos/odontologia.md`, seção 6.7, e `14-funcionalidades/07-funcionalidades-do-oficio.md`, seção 4.1, mandam desenhar o mapa dos dentes em vetor, e a esteira recomenda para a oficina um diagrama vetorial com regiões navegáveis. Leitura adotada: o mapa é um **diagrama funcional** (um controle), não uma ilustração figurativa; as formas são esquemáticas e medidas, não anatômicas. A decisão vai aos sócios.
- **Reserva sem WebGL e sem script:** não há WebGL. Sem script, o mapa fica desenhado, em repouso; os controles viram a tabela de tratamentos por região, completa, no HTML.

## 7. Testes

| Teste | Resultado | Data |
|---|---|---|
| Prompt parecido ("site de dentista de bairro em Niterói, claro e acolhedor"), imaginado nesta sessão (não numa sessão limpa: não há como abri-la sem subagente) | O padrão traria azul ou turquesa, foto de sorriso, capa centralizada com dois botões ("Agende sua consulta" e "Saiba mais"), seis cartões iguais com ícone de dente, depoimentos e "o melhor". **Coincidem, e ficam com motivo:** o fundo claro e a sans limpa (a cena é o consultório de papel; a sans é do arquivo do nicho). **Saem ou mudam:** a cor (grafite e lápis vermelho), a capa (texto à esquerda, ficha ao lado, uma ação), os cartões (tabela de sessões), o ícone (monograma "B"), o texto ("A primeira consulta é só avaliação.") e os depoimentos (vedados) | 08.10.2026 |
| Teste do desconhecido, em cada peça visual | Ícone "B": pendente de pessoa. Mapa dos dentes: pendente de pessoa (seção 6) | 08.10.2026 |
| Unicidade contra os clientes do mesmo nicho | Nenhum cliente de odontologia. Contra a versão estática de setembro (vinho sobre branco quente, Instrument Serif): muda o par de fontes (Red Hat Display e Red Hat Text) e a família de cor (grafite com lápis vermelho, contra o vinho); a forma, a conferir. Dois de três | 08.10.2026 |
| [P][C] Unicidade contra três concorrentes locais | **Não se aplica no exemplo** (nenhum concorrente real anotado). Contra as referências do nicho (Aventura Dental Arts, Halo Dental, LAVA Dental): nenhuma usa ficha clínica, grafite ou numeração dos dentes | 08.10.2026 |
| Avaliação anti-IA do plano (antes do código) | Sem escolha por omissão sem motivo. **Dois pontos a vigiar:** o acento vermelho sobre fundo quente se parece com C1 (creme, serifa e terracota) só pelo fundo e pelo matiz, sem serifa e sem terracota; e o mapa feito de formas simples pode ser lido como I3. Ficam com o motivo da seção 6 | 08.10.2026 |
| Avaliação anti-IA do resultado (390 e 1440 px) | A fazer na etapa 7 | — |
