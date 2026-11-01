# Oficina mecânica · Profissional

> **Para que serve.** Tudo o que o site de uma oficina mecânica de bairro precisa, do briefing à entrega: o Código de Defesa do Consumidor, que aqui decide o texto, as páginas, o "descreva o problema" com o diagrama do carro, a direção de arte de partida, o texto e a conferência.
>
> **Estado.** Ordem comercial (7º; a troca para 6º não entrou na ratificação) e plano de referência (Profissional): RATIFICADO (decidido em 07.10.2026; ratificado em 08.10.2026). Norma: o CDC conferido no texto oficial [V]; a cobrança do orçamento lida em fonte secundária [FU]. Direção de arte: RATIFICADO.
>
> **Leia com.** `README.md` (o quadro comum); `../03-planos.md`, seção 4; `../14-funcionalidades/07-funcionalidades-do-oficio.md`; `../17-conformidade-e-normas.md`.
>
> **Implementação de referência.** Nenhuma em Next.js. A versão estática de setembro ("Mecânica Fonseca") existe só em pacote, no repositório do Atlas (`nichos/atlas--demo-oficina--2026-09-03.zip`; ler em memória, nunca extrair).
>
> **Atualizado em:** 08.10.2026.

---

## 1. Ficha

| Campo | Valor |
|---|---|
| **Ordem comercial** | **7º de 12.** Razão de 29.08.2026: "lacuna digital enorme, ticket bom". Conferida em 07.10.2026: volume 2, facilidade 3, ticket 4, atrito 5 — 8º com os pesos escritos (3,15), **5º** com os pesos "agora" (3,60). A única troca que os dados sustentam: oficina em 6º, pet shop em 7º |
| **Plano de referência** | **Profissional** [P]: a confiança vem de foto real e de orçamento por escrito (CDC, art. 40); público de celular médio — nada de 3D |
| **Módulos** | **Presença**; **Agenda opcional** (hora marcada para revisão) |
| **Norma** | Nenhum conselho. CDC, arts. 21, 26, 30, 37, 39, VI, 40 e 50 [V] |
| **Preço no site** | **Permitido**: a hora técnica, a revisão por faixa; o reparo depende do diagnóstico e vai no orçamento escrito |
| **Volume em Niterói** | CNAE 45.20-0 (manutenção e reparação de veículos automotores): 239 unidades em 2022, 259 em 2023, **266 em 2024**; 864 pessoas ocupadas (IBGE/CEMPRE, sem MEI) [V] |
| **Público** | Quem decide é o mecânico-dono. Quem visita: o motorista com um sintoma (barulho, luz no painel), com medo de ser enganado, que decide no balcão e usa celular médio |
| **Site de exemplo** | **Mecânica Fonseca** [ex]: só a versão estática de setembro (escuro e amarelo, IBM Plex; compositor de sintoma e plano de revisão por quilometragem) |

---

## 2. O cliente e a dor

**Quem decide e quanto paga.** O dono. Profissional: R$ 1.500 de criação e R$ 250 por mês; Presença, +R$ 300 e +R$ 100 (ata v3.0, IV.2).

**O que o visitante procura:**
1. Se a oficina resolve o problema dele (o sistema do carro).
2. **Se vai ser enganado:** orçamento por escrito, peça trocada mostrada, nada feito sem autorização.
3. Quanto tempo o carro fica, e se há garantia.
4. Onde fica, o horário, se dá para deixar o carro cedo.
5. O preço da revisão e da hora técnica.

**A dor do ramo:** a desconfiança. A pesquisa de setembro registrou que foto de banco ("modelo de macacão") **destrói** a confiança, e que a referência premiada do ramo é de alto padrão.

**A tarefa do site no Profissional — ser escolhido.** Provar com a oficina real, prometer o que a lei já obriga (e cumprir), e receber o carro com o sintoma descrito antes.

---

## 3. Normas

O CDC é a norma do nicho, e o site o transforma em argumento: o que a lei obriga é exatamente o que o cliente quer ouvir.

| Tema | Regra | Fonte | Evidência |
|---|---|---|---|
| **Orçamento prévio** | Obrigatório, "discriminando o valor da mão-de-obra, dos materiais e equipamentos a serem empregados, as condições de pagamento, bem como as datas de início e término dos serviços" | CDC, art. 40 | [V] |
| **Validade do orçamento** | Dez dias do recebimento, salvo estipulação em contrário | CDC, art. 40, § 1º | [V] |
| **Orçamento aprovado** | Obriga as partes; só muda por negociação livre | CDC, art. 40, § 2º | [V] |
| **Serviço de terceiro** | O consumidor não paga o que não estava no orçamento | CDC, art. 40, § 3º | [V] |
| **Executar sem autorização** | Prática abusiva: "executar serviços sem a prévia elaboração de orçamento e autorização expressa do consumidor" | CDC, art. 39, VI | [V] |
| **Peças** | Obrigação implícita de usar "componentes de reposição originais adequados e novos", ou que mantenham as especificações do fabricante — estes últimos só com autorização do consumidor | CDC, art. 21 | [V] |
| **Prazo para reclamar** | 90 dias para serviço em produto durável (30 para não durável), contados do término do serviço | CDC, art. 26, II e § 1º | [V] |
| **Garantia contratual** | Complementar à legal, por termo escrito | CDC, art. 50 | [V] |
| **Cobrar o orçamento** | Abusivo; a desmontagem para avaliar pode ser cobrada se informada antes | Idec, segundo o LEIA-ME de setembro | [FU] |
| **Preço e promessa publicados** | Vinculam; publicidade enganosa vedada | CDC, arts. 30 e 37 | [V] |
| **Imagem** | Equipe com autorização escrita (Código Civil, art. 20) [V]; placa dos carros de clientes desfocada (cautela do Atlas) | Política do Atlas | RATIFICADO |

**Cuidado de texto:** os 90 dias do art. 26 são o **prazo para reclamar** do serviço malfeito, não uma "garantia" que a oficina oferece. "Garantia de 90 dias" sem termo escrito confunde as duas coisas; garantia contratual precisa de termo (art. 50).

---

## 4. Estrutura de páginas

### 4.1 · No Profissional [P] (até seis páginas)

| Página | Objetivo | Seções, na ordem | Obrigatório |
|---|---|---|---|
| **Início** | Confiança em cinco segundos, e a ação | Capa (a promessa do orçamento por escrito, a ação, o estado ao vivo); os sistemas atendidos; como a oficina trabalha, em quatro passos; o que não se faz aqui; horário | A ação até 60% da primeira tela do celular |
| **Serviços** | O que a oficina faz, por sistema | Motor, freios, suspensão, câmbio, elétrica, direção, arrefecimento, escapamento, pneus; a revisão por faixa de quilometragem; a hora técnica | O manual do fabricante prevalece (dito na página) |
| **Descreva o problema** (a funcionalidade) | Receber o sintoma descrito | O compositor com o diagrama do carro (seção 5.1) | "Não emite diagnóstico" |
| **A oficina** | Provar | A galeria (pátio, elevador, bancada, carro na rampa, o painel de ferramentas); a equipe (autorizada); a história | Nenhuma foto de banco |
| **Orçamento e garantia** | Dizer o que a lei obriga, como compromisso | O orçamento discriminado e por escrito; validade de 10 dias; nada executado sem autorização; peças novas e originais ou equivalentes com autorização; a peça trocada devolvida; o prazo de 90 dias para reclamar; a garantia contratual, se houver, com o termo | Arts. 21, 26, 39, VI, 40 e 50 |
| **Contato** | Receber o carro | O formulário (nome, telefone, modelo, ano, quilometragem, o sintoma); o WhatsApp; o horário de entrega do carro; o mapa do bairro em vetor; o prazo de resposta | Aviso de privacidade |

### 4.2 · Se o cliente contratar outro plano

| Plano | O que muda |
|---|---|
| **Essencial** [E] | Três páginas: Início (sistemas e a promessa do orçamento escrito), Orçamento e garantia (com a hora técnica), Onde. A descrição do problema vai pela mensagem pronta, com as quatro perguntas |
| **Completo** [C] | A segunda funcionalidade (a ordem de serviço, com a validade de 10 dias e o prazo para reclamar; ou o plano de revisão por quilometragem do demo de setembro); uma página por sistema e por serviço para a busca local; o diagrama do carro como peça-assinatura (seção 6.7) |

**No briefing, bloqueante neste nicho:** em todo plano, os sistemas que a oficina atende (motor, freios, suspensão, câmbio, elétrica, direção, arrefecimento, escapamento, pneus); o valor da hora técnica; a garantia contratual, se houver, com o termo escrito (CDC, art. 50); se a peça trocada é devolvida; e, se a oficina cobra a desmontagem para avaliar, o valor. No Profissional e no Completo [P][C], o preço da revisão por faixa de quilometragem. Só no Completo [C], se a segunda funcionalidade for o plano de revisão, os intervalos de cada item, em quilômetros (os do cliente e do manual, nunca os do exemplo). Sem isso, a página de serviços e a de orçamento e garantia não se escrevem.

---

## 5. Funcionalidades

### 5.1 · Funcionalidade 1 [P]: "Descreva o problema" (o compositor de sintoma), com o diagrama das zonas do carro

| Item | Especificação |
|---|---|
| **Objetivo de negócio** | O carro chega com o sintoma descrito, e a oficina sabe que sistemas a inspeção vai cobrir |
| **Entradas** | **Onde parece vir** — pelo diagrama ou pela lista: motor, freios, suspensão, câmbio, elétrica, direção, "não sei dizer"; **como se manifesta**: ruído, vibração, luz no painel, perda de força, cheiro, vazamento; **quando aparece**: motor frio, depois de aquecer, ao acelerar, ao frear, ao virar, o tempo todo; **há quanto tempo**: hoje, dias, semanas, meses |
| **Saída** | A descrição organizada → "Enviar descrição" pelo WhatsApp; "Copiar a descrição" |
| **O diagrama** | O carro em SVG com as zonas nomeadas (motor, freios, suspensão, elétrica, escapamento, pneus), ~10 a 15 KB estimados; cada zona é um botão com nome, operável por teclado; o desenho é decoração do controle |
| **Sem script** | O diagrama aparece inteiro e legível; a instrução de mandar pelo WhatsApp onde, como, quando e há quanto tempo |
| **Ressalva obrigatória** | "Esta página organiza a descrição do sintoma; não emite diagnóstico. O que causa o sintoma só se determina com o veículo no elevador, e o resultado sai em relatório escrito." |
| **Por que não 3D** | Medido em setembro: o showroom em WebGL (Otherlife) trafegava 639 KB de script e 59 KB de decodificador, e sem script não existia; o SVG pesa ~1/50 disso, funciona sem script e é **o carro com as zonas de serviço nomeadas**, não um carro genérico |
| **Especificação** | `../14-funcionalidades/07-funcionalidades-do-oficio.md` |

### 5.2 · Funcionalidade 2 [C]: a ordem de serviço, ou o plano de revisão

- **Ordem de serviço** (padrão de design de 08.10): o pedido de orçamento com a forma do bloco de ordem de serviço — o carro, o sintoma, a autorização —, que lembra a validade de 10 dias e o prazo de 90 dias para reclamar.
- **Plano de revisão por quilometragem** (demo de setembro): a quilometragem atual e a da última revisão → os itens vencidos. Intervalos de referência do demo: óleo e filtro, 10.000 km; filtro de ar, 20.000; filtro de combustível, 30.000; velas e fluido de freio, 40.000; arrefecimento e correia, 60.000 — "o manual do fabricante prevalece quando divergir". Os intervalos do cliente vêm dele.

### 5.3 · Módulos

- **Presença:** perfil no Google com as fotos da oficina real; pedir avaliação é permitido.
- **Agenda opcional:** hora marcada para revisão e para deixar o carro.

---

## 6. Direção de arte (ponto de partida · RATIFICADO)

### 6.1 · Materiais e vocabulário

Aço, o painel perfurado de ferramentas, o bloco de ordem de serviço, o elevador, o macacão de trabalho real. O vocabulário: sintoma, elevador, orçamento, peça, mão de obra, hora técnica, revisão, quilometragem.

### 6.2 · Fotografia

- **O que fotografar:** o pátio, o elevador com carro, a bancada, o painel de ferramentas, a equipe trabalhando (autorizada), a fachada.
- **Placas** dos carros de clientes desfocadas.
- **Nunca** banco de imagens: a pesquisa do ramo aponta que o "modelo de macacão" destrói a confiança. O par verdadeiro de setembro (Mechanic) tinha 49 fotos.

### 6.3 · Tipografia

- **Postura:** **exibição**.
- **Famílias candidatas** (OFL 1.1 [V]; `README.md`, seção 2):

| Papel | Família | Por quê |
|---|---|---|
| Exibição | **Sofia Sans Condensed** | Condensada de oficina e de placa, com muitos pesos |
| Texto | **Sofia Sans** | A mesma família, na largura normal |
| Dados (só com motivo escrito) | **Martian Mono** | Monoespaçada **só** em quilometragem, código de peça e valor do orçamento — nunca em rótulo |

- **O demo de setembro usava** IBM Plex, e o depósito de exemplo usa IBM Plex Mono: não repetir.

### 6.4 · Cor

- **Partida:** cinza-azulado (o macacão, o aço) e **um** laranja de ferramenta como acento, sobre fundo claro.
- **Evitar** o quase-preto com amarelo ácido do demo de setembro: é o agrupamento "quase-preto com um acento ácido" (`../04-direcao-de-arte.md`, seção 5).

### 6.5 · Forma

Cantos arredondados (preferência do usuário). O bloco de ordem de serviço pode ter o picote e a numeração — com raio nos cantos.

### 6.6 · O gesto

- **Do ofício:** o diagrama do carro, em que cada zona responde ao toque e entra na descrição.
- **Do Spell UI no Profissional:** o **copiar** da descrição, que confirma só se copiou; a **espera** visível onde houver espera.

### 6.7 · A peça-assinatura (só no Completo)

O diagrama do carro desenhado para a marca: uma silhueta de carro de passeio **genérica** (sem desenho de modelo registrado), com as zonas da oficina e o traço da identidade. Desde 09.10.2026, o "sem 3D" saiu: no Completo, a peça pode ganhar o objeto em WebGL quando o objeto é do ofício e passa no teste do desconhecido (`../09-movimento.md`, seção 7), e o desenho em traço fica como reserva sem script.

### 6.8 · O que não fazer

| Não | Por quê |
|---|---|
| Carro em 3D | Peso, nada sem script, carro genérico (medido em setembro) |
| Foto de banco, "modelo de macacão" | Destrói a confiança |
| Quase-preto com amarelo; faixa zebrada de alerta | Agrupamento de IA; clichê de oficina |
| Monoespaçada em rótulo ("01 SERVIÇOS") | Fantasia de "técnico" |
| "Diagnóstico on-line" | O site não diagnostica; e cria promessa |
| "Garantia de 90 dias" sem termo | Confunde o prazo legal com garantia contratual |

---

## 7. Texto

**Registro.** Impessoal, técnico e direto; o vocabulário do balcão, explicado.

**O que dizer:** o orçamento discriminado e por escrito; a validade de 10 dias; nada executado sem autorização; as peças (novas, originais ou equivalentes com autorização); a peça trocada devolvida; o prazo para reclamar; a garantia contratual com termo, se houver; a hora técnica; o tempo médio dos serviços comuns.

**O que evitar:** "o mais barato", "preço justo" (sem prova), "diagnóstico pelo site", "garantia total", "peça original" quando não for, "mecânico de confiança" (diga o que faz confiar).

**Exemplos no registro certo** (demo de setembro):
- "O orçamento vem por escrito." (título)
- "Descreva o problema antes de trazer o carro."
- "A mensagem sai pronta, e a oficina chega informada à entrada do veículo."
- "Intervalos de referência para carro de passeio. O manual do fabricante prevalece quando divergir."

---

## 8. Referências para estudar

| Referência | Endereço | Sob que norma opera | O que aprender | O que não copiar |
|---|---|---|---|---|
| Forge Automotive (indicado no Awwwards, 19.09.2026) | https://www.awwwards.com/sites/forge-automotive | Estrangeira; funilaria e película | Uma interação do ofício: a fumaça de escapamento na página 404 | O WebGL e o GSAP |
| BALLSYSTEM (CSSDA, 2020, nota 8,21) | https://www.cssdesignawards.com/sites/ballsystem/36851/ | Estrangeira | "Beleza saída da garagem" | — |
| Sperotto (CSSDA, 15.02.2025, nota 7,85) | https://www.cssdesignawards.com/sites/sperotto/46873/ | Estrangeira; acessórios automotivos | — | O WebGL |
| Spades Motorsports (CSSDA, 2022) | https://www.cssdesignawards.com/sites/spades-motorsports/40862/ | Estrangeira; estética automotiva | — | — |
| Mechanic, modelo do Webflow (setembro) | Endereço não registrado na análise | Estrangeira | O único par: 49 fotos da oficina, 1,31 MB | Ser modelo de catálogo |
| Otherlife · showroom (setembro) | Endereço não registrado na análise | Estrangeira | — | 639 KB de script de 3D, nada sem script |

*O Awwwards não tem oficina independente entre os premiados; por isso as referências vêm quase todas do CSS Design Awards.*

---

## 9. O que a pesquisa de setembro mediu

Análise de setembro de 2026 (`nichos/analises/atlas--analise-oficina.md`, no repositório do Atlas):

| Site | Pedidos | Peso | Carga | Telas | Imagens | SVG | WebGL |
|---|---|---|---|---|---|---|---|
| Mechanic (Webflow) | 53 | 1,31 MB | 8,0 s | 7,9 | 49 | 4 | não |
| 363 Sudbury | 77 | 5,04 MB | 6,8 s | 1,0 | 5 | 30 | não |
| Otherlife · showroom | 29 | 0,85 MB | 8,8 s | 0 | 0 | 33 | sim |
| **Demo do Atlas** | **4** | **0,055 MB** | **2,9 s** | 11,6 | 0 | 6 | não |

| | Peso |
|---|---|
| Script do showroom 3D | 639 KB |
| Decodificador de geometria (`draco_decoder.wasm`) | 59 KB |
| Total trafegado pelo showroom | 847 KB |
| **O demo do Atlas inteiro** | **55 KB** |
| **O script do demo inteiro** | **7 KB** |

- **Fotografia:** 0 contra 49 → foto da oficina real, nunca de banco.
- **Objeto interativo:** proposta de Gabriel Ribeiro Ota Yida → o diagrama em SVG com zonas, no lugar do 3D.
- **Altura:** 11,6 telas contra 7,9 do par → o demo era mais alto.
- **Peso e script:** 24 vezes mais leve, 91 vezes menos script → **não perder**.

---

## 10. Riscos e pendências

- **Ordem:** a troca com o pet shop espera a ratificação.
- **"Garantia"**: o texto distingue o prazo legal (art. 26) da garantia contratual com termo (art. 50); conferir com o dono o que ele de fato oferece.
- **Cobrança da desmontagem** [FU]: se a oficina cobra, o site diz antes, com o valor.
- **Placas** em fotos: desfocar (cautela; leitura jurídica não feita) [NV].
- **Os intervalos de revisão** são do cliente e do manual; nunca os do exemplo.

---

## 11. Lista de conferência do nicho

- [ ] O site diz: orçamento discriminado e por escrito, validade de 10 dias, nada executado sem autorização.
- [ ] As peças: novas e originais, ou equivalentes só com autorização (art. 21).
- [ ] O prazo de 90 dias aparece como prazo para reclamar; garantia contratual só com termo.
- [ ] O compositor tem a ressalva de que não emite diagnóstico.
- [ ] O diagrama funciona por teclado, tem nome em cada zona e aparece inteiro sem script.
- [ ] Nenhum 3D; nenhuma foto de banco; placas desfocadas.
- [ ] Monoespaçada só em dado (quilometragem, código, valor), nunca em rótulo.
- [ ] Nada de quase-preto com amarelo ácido nem faixa zebrada.
- [ ] Copiar só confirma se copiou.
