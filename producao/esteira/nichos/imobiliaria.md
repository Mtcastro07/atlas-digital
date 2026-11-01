# Imobiliária · Completo

> **Para que serve.** Tudo o que o site de uma imobiliária de bairro precisa, do briefing à entrega: a lei do corretor e a resolução do CRECI, a página de cada imóvel, o filtro da carteira, o custo de entrada na escritura, a direção de arte de partida, o texto e a conferência.
>
> **Estado.** Ordem comercial (11º) e plano de referência (Completo): RATIFICADO (decidido em 07.10.2026; ratificado em 08.10.2026). Norma: a Lei 6.530/1978 conferida no texto oficial [V]; a COFECI 1.065/2007 conferida na cópia publicada pelo CRECI-SC [V] — e ela **corrige** a leitura de setembro sobre os 25% (seção 3). Direção de arte: RATIFICADO.
>
> **Leia com.** `README.md` (o quadro comum); `../03-planos.md`, seção 5; `../14-funcionalidades/07-funcionalidades-do-oficio.md` e `../14-funcionalidades/08-peca-assinatura.md`; `../17-conformidade-e-normas.md`.
>
> **Implementação de referência.** Nenhuma em Next.js. A versão estática de setembro ("Imóveis Piratininga") existe só em pacote, no repositório do Atlas (`nichos/atlas--demo-imobiliaria--2026-09-03.zip`; ler em memória, nunca extrair).
>
> **Atualizado em:** 08.10.2026.

---

## 1. Ficha

| Campo | Valor |
|---|---|
| **Ordem comercial** | **11º de 12.** Razão de 29.08.2026: "CRECI obrigatório e concorrência dos portais". Conferida em 07.10.2026: volume 3, facilidade 2, ticket 5, atrito 3 — 9º com os pesos escritos (3,10), 11º com os pesos "agora" (2,90) |
| **Plano de referência** | **Completo** [C]: uma página por imóvel pede páginas sem limite; o maior ticket por negócio |
| **Módulos** | **Presença**; **Agenda para visitas** |
| **Norma** | Lei 6.530/1978, art. 20, III, IV e V [V]; COFECI 1.065/2007, arts. 2º, 5º, 6º e 7º [V]; CDC, arts. 30 e 37 [V]; LGPD (a Agenda) |
| **Preço no site** | **Permitido**, e o Atlas publica: a imobiliária de bairro vende a quem filtra por preço (`README.md`, seção 3.2) |
| **Volume em Niterói** | Intermediação imobiliária (CNAE 68.21-8): 338 unidades em 2022, 371 em 2023, **417 em 2024**, 993 ocupados; gestão de imóveis de terceiros (68.22-6): **169 em 2024**, 609 ocupados — **586** no total (IBGE/CEMPRE, sem MEI) [V]. No estado: 62.746 corretores ativos (CRECI-RJ, via Tupi, 06.08.2025) [FU]; 6.597 imobiliárias (COFECI, dados de 2021) [FU] |
| **Público** | Quem decide é o corretor-dono ou os sócios da imobiliária. Quem visita: o comprador ou inquilino do bairro, que filtra por preço, bairro e dormitórios, e quer saber quanto precisa ter em caixa |
| **Site de exemplo** | **Imóveis Piratininga** [ex]: só a versão estática de setembro (azul-claro sobre azul-marinho, Familjen Grotesk; filtro da carteira e custo de entrada; quatro bairros da região oceânica) |

---

## 2. O cliente e a dor

**Quem decide e quanto paga.** O dono ou os sócios. Completo: R$ 2.400 de criação e R$ 400 por mês; Agenda, +R$ 400 e +R$ 80 (ata v3.0, IV.2). Um negócio fechado paga anos do site.

**O que o visitante procura:**
1. Os imóveis **dentro do preço dele**, no bairro e com os dormitórios que precisa.
2. As fotos verdadeiras e recentes; a planta; a metragem; a distância da praia; o sol.
3. Quanto precisa ter em caixa na escritura (entrada, ITBI, escritura, registro).
4. Marcar a visita.
5. Se a imobiliária conhece o bairro.

**A dor do ramo:** os portais. A imobiliária de bairro não ganha em volume; ganha em carteira curada, conhecimento do bairro e na resposta. O demo de setembro dizia: "A carteira cobre quatro bairros da região oceânica, e o que não está aqui não está na casa."

**A tarefa do site no Completo — trabalhar pelo negócio.** Cada imóvel com a sua página (que também ocupa a busca), o filtro da carteira, a conta da escritura, a visita marcada, os bairros explicados.

---

## 3. Normas

**A correção dos 25%.**
- **Leitura de setembro, superada em 08.10.2026 (não usar):** o CRECI com tamanho de, no mínimo, 25% "da maior expressão do anúncio", lida como o `h1` da capa.
- **O texto da COFECI 1.065/2007** mede contra **o nome em uso** [V]:
  - pessoa física (art. 2º, § 2º): a expressão obrigatória ("Corretor de Imóveis"), seguida de "CRECI" e do número com o mesmo destaque, não pode ter tamanho de impressão inferior a 25% do nome, completo ou abreviado;
  - pessoa jurídica (art. 5º): o nome, a razão social ou o nome de fantasia, sempre seguido da sigla CRECI e do número de inscrição (com a letra J), em tamanho não inferior a 25% do nome em uso.
- **Regra do Atlas a partir de agora:** **onde o nome da imobiliária aparecer, o CRECI aparece junto, com pelo menos 25% do tamanho daquele nome** — no cabeçalho, no rodapé e na capa se o nome estiver nela. O CRECI-SP aplica o mesmo piso ao conjunto da sigla, do número e da letra (manual de divulgação de 2023) [FU]. A leitura de setembro (25% do `h1`, mesmo sem o nome) é mais restritiva que o texto; o advogado confirma [A CONFIRMAR].

| Tema | Regra | Fonte | Evidência |
|---|---|---|---|
| **Número de inscrição** | Vedado "fazer anúncio ou impresso relativo à atividade de profissional sem mencionar o número de inscrição" | Lei 6.530/1978, art. 20, IV | [V] |
| **Autorização escrita** | Vedado "anunciar publicamente proposta de transação a que não esteja autorizado através de documento escrito" — cada imóvel do site tem a autorização do proprietário | Lei 6.530/1978, art. 20, III | [V] |
| **Loteamento ou condomínio** | Vedado anunciar imóvel loteado ou em condomínio "sem mencionar o número de registro do loteamento ou da incorporação no Registro de Imóveis" | Lei 6.530/1978, art. 20, V | [V] |
| **Formato do registro** | PF: nome + "Corretor de Imóveis" + "CRECI nº … F"; PJ: nome + "CRECI nº … J"; o tamanho, acima | COFECI 1.065/2007, arts. 2º e 5º | [V] |
| **Nome de fantasia ou abreviado** | Só depois de registrado no CRECI da jurisdição | COFECI 1.065/2007, art. 6º | [V] |
| **Toda mídia** | As regras valem para qualquer divulgação; na mídia falada, o número é dito | COFECI 1.065/2007, art. 7º | [V] |
| **Preço e imóvel anunciados** | Vinculam; imóvel vendido que segue no site como isca é publicidade enganosa | CDC, arts. 30 e 37 | [V] |
| **Foto** | Verdadeira e datada; mobília virtual ou retoque que mude o imóvel enganam | CDC, art. 37 [V]; política do Atlas | DECIDIDO |
| **Endereço exato** | O site mostra o bairro e a rua aproximada, nunca o número, até a visita (segurança do proprietário) | Cautela do Atlas | RATIFICADO [NV] |
| **Mapa com dados abertos** | OpenStreetMap: licença ODbL; crédito a "OpenStreetMap e colaboradores"; o dado alterado só se distribui sob a mesma licença | https://www.openstreetmap.org/copyright | [V] |
| **Visitas** | A Agenda coleta nome, telefone, imóvel e horário; aviso de privacidade | LGPD; `../14-funcionalidades/05-agenda.md` | DECIDIDO |

**Para o advogado:** os 25%; o Decreto 81.871/1978 (regulamento da Lei 6.530), não lido [NV]; a precisão do endereço.

---

## 4. Estrutura de páginas

### 4.1 · No Completo [C] (sem limite de páginas)

| Página | Objetivo | Seções, na ordem | Obrigatório |
|---|---|---|---|
| **Início** | Dizer a carteira e o bairro, e chamar | Capa (o fato da casa; o nome com o CRECI a 25%; a ação); os imóveis mais recentes; os bairros; a entrada no filtro; a conta da escritura; o que a casa não faz | CRECI junto do nome, no tamanho |
| **Carteira** (a funcionalidade 1) | Achar o imóvel | O filtro (seção 5.1) e a lista | Sem script, a carteira inteira |
| **Uma página por imóvel** | Decidir a visita | Fotos com a **data de captura**; a planta com o norte e o sol; metragem, dormitórios, vagas, distância da praia; o valor (venda ou locação), condomínio e IPTU; o registro da incorporação, se em condomínio ou loteamento; o custo de entrada já calculado; "Marcar visita" | Data da foto; registro da incorporação quando couber |
| **Custo de entrada** (a funcionalidade 2) | Quanto ter em caixa | A conta (seção 5.2) e a explicação de cada parcela | "Estimativa" |
| **Os bairros** (uma por bairro) | Ocupar a busca e mostrar que conhece | O mapa do bairro em vetor (dados abertos, com o crédito); praia, comércio, transporte; os imóveis daquele bairro | Crédito do OpenStreetMap, se usado |
| **A imobiliária** | Quem está por trás | A história; os corretores com nome e CRECI F (retratos autorizados); como a casa trabalha | CRECI de cada corretor |
| **Para proprietários** | Captar imóveis | Como anunciar com a casa; a autorização escrita; a avaliação | — |
| **Contato** | Levar até a porta | Endereço do escritório, mapa, horário, WhatsApp, prazo de resposta | — |

### 4.2 · Se o cliente contratar outro plano

| Plano | O que muda |
|---|---|
| **Profissional** [P] | Seis páginas: Início, Carteira (o filtro como funcionalidade do ofício, com as fichas dos imóveis numa página só), A imobiliária, Para proprietários, Os bairros, Contato. Sem página por imóvel (cada página a mais custaria R$ 250); sem a conta da escritura |
| **Essencial** [E] | Não recomendado: três páginas não comportam uma carteira. Se contratado, a carteira resumida numa página e o resto pelo WhatsApp |

**No briefing, bloqueante neste nicho:** em todo plano, a carteira — de cada imóvel, a finalidade (venda ou locação), o tipo, o bairro, a metragem, os dormitórios, as vagas, um atributo (quintal, vaga coberta, piscina), a distância da praia, o valor, o condomínio e o IPTU; a autorização escrita do proprietário de cada imóvel anunciado (Lei 6.530/1978, art. 20, III); o número de registro da incorporação ou do loteamento de cada imóvel em condomínio ou loteamento (art. 20, V); e, se o nome de fachada for de fantasia ou abreviado, o registro dele no CRECI (COFECI 1.065/2007, art. 6º). No Profissional e no Completo [P][C], o nome e o CRECI (com F) de cada corretor (a página da imobiliária). Só no Completo [C], a alíquota do ITBI, conferida na Prefeitura de Niterói, e a tabela do cartório para escritura e registro, por faixa de valor, do ano (o custo de entrada); e a planta de cada imóvel, com o norte (a página do imóvel). Sem isso, a carteira, a página de cada imóvel e a conta da escritura não se escrevem.

---

## 5. Funcionalidades

### 5.1 · Funcionalidade 1 [P][C]: o filtro da carteira

| Item | Especificação |
|---|---|
| **Objetivo de negócio** | O visitante acha, em segundos, os imóveis que pode comprar ou alugar |
| **Filtros** | Finalidade (venda e locação, venda, locação); bairro (os da casa); dormitórios (qualquer, 1 ou mais… 4 ou mais); faixa de preço (no Completo) |
| **Saída** | A lista com tipo, bairro, dormitórios, metragem, um atributo (quintal, vaga coberta, piscina), distância da praia e valor; cada item leva à página do imóvel |
| **Reserva declarada** | "A carteira cobre quatro bairros, e o que não está aqui não está na casa" — o filtro não finge ser portal |
| **Dado vivo** | Imóvel vendido ou alugado sai do site na manutenção seguinte (ou no mesmo dia, no atendimento prioritário do Completo) |
| **Sem script** | A carteira inteira, com finalidade, bairro, metragem e valor |
| **Especificação** | `../14-funcionalidades/07-funcionalidades-do-oficio.md` |

No demo de setembro, nove imóveis de venda entre R$ 545.000 e R$ 1.750.000 e locações de R$ 3.200 a R$ 6.500 por mês, em Piratininga, Camboinhas, Itaipu e Cafubá — números fictícios.

### 5.2 · Funcionalidade 2 [C]: o custo de entrada na escritura

| Item | Especificação |
|---|---|
| **Objetivo de negócio** | O comprador chega à proposta sabendo quanto precisa em caixa — "o que falta na conta raramente é o preço do imóvel" |
| **Entradas** | Valor do imóvel; entrada (20%, 30%, 50% ou à vista); a alíquota do ITBI |
| **Saída** | Entrada + ITBI + escritura + registro, parcela por parcela |
| **Regras** | O ITBI é municipal: a alíquota vem do cliente, conferida na Prefeitura de Niterói, nunca fixada pelo Atlas [NV]; escritura e registro seguem a tabela do cartório, por faixa de valor, informada pelo cliente e atualizada no ano |
| **Ressalva** | "Estimativa. Nada aqui substitui a conferência antes da proposta." |
| **Sem script** | A explicação das três parcelas e o convite a pedir a conta pelo WhatsApp |

### 5.3 · Módulos

- **Agenda para visitas:** o horário da visita por imóvel, com confirmação.
- **Presença:** perfil no Google com as fotos do escritório; avaliação permitida.

---

## 6. Direção de arte (ponto de partida · RATIFICADO)

### 6.1 · Materiais e vocabulário

A planta baixa, a rosa dos ventos e o norte, a areia e a lagoa (na região oceânica), o concreto e a madeira. O vocabulário: carteira, dormitórios, metragem, vaga, nascente, poente, escritura, ITBI, registro, visita.

### 6.2 · Fotografia

- **Cada imóvel**, com luz do dia e a **data de captura publicada** junto da foto.
- **Verdadeira:** sem lente que dobre a sala, sem mobília virtual não declarada, sem céu trocado.
- O escritório e os corretores (autorizados).

### 6.3 · Tipografia

- **Postura:** **exibição**. O Arete (Itália) usa `h1` de **256 px** com a página inteira em **0,37 MB**; o demo de setembro tinha 74 px — "elevar".
- **Famílias candidatas** (OFL 1.1 [V]; `README.md`, seção 2):

| Papel | Família | Por quê |
|---|---|---|
| Exibição e texto | **Chivo** | Grotesca técnica, de muitos pesos, firme em tamanho grande |
| Dados | **Chivo Mono** | Monoespaçada da mesma família, **só** para metragem, distância e valor na ficha do imóvel |

- **O demo de setembro usava** Familjen Grotesk: não repetir.
- **O CRECI** ao lado do nome, na mesma família, com pelo menos 25% do tamanho dele.

### 6.4 · Cor

- **Partida:** areia e a cor da lagoa (padrão de design de 08.10), sobre fundo claro.
- **Evitar o azul-marinho:** é a cor do Atlas (`../04-direcao-de-arte.md`, seção 5) e estava no demo de setembro.

### 6.5 · Forma

Cantos arredondados (preferência do usuário); as fichas de imóvel com raio; a planta em traço técnico.

### 6.6 · O gesto

- **Do ofício:** a **planta com o sol** em cada imóvel (o lado do nascente e do poente), e o mapa do bairro.
- **Do Spell UI no Completo:** **um** gesto — o brilho que atravessa a planta uma vez, no sentido do sol (leste para oeste), no ponto de decisão (a página do imóvel).

### 6.7 · A peça-assinatura (Completo)

O mapa dos bairros da casa, desenhado a partir do OpenStreetMap com o traço da marca e o crédito da licença, com a carteira posicionada por bairro (nunca o endereço exato). A casa vende o bairro, não um modelo: o 3D, se entrar, é o do relevo dos bairros, nunca uma maquete inventada. Desde 09.10.2026, o "sem 3D" saiu: no Completo, a peça pode ganhar o objeto em WebGL quando o objeto é do ofício e passa no teste do desconhecido (`../09-movimento.md`, seção 7), e o desenho em traço fica como reserva sem script.

### 6.8 · O que não fazer

| Não | Por quê |
|---|---|
| Rolagem com inércia | 8 de 11 referências de alto padrão a usam; é assinatura de luxo |
| "Valor sob consulta" | Convenção do alto padrão; a casa de bairro vende por preço |
| Busca que imita portal | O vídeo da "Imobiliária Lima" (TikTok, setembro): o portal ganha nesse jogo |
| Foto com selo de IA, "+2.500 clientes" sem contagem | A "Casa Nova Imóveis" (TikTok) fazia os dois |
| Página de 57 telas | likova |
| Imóvel vendido como isca | CDC, art. 37 |
| Azul-marinho | Paleta do Atlas |

---

## 7. Texto

**Registro.** Impessoal, preciso, de corretor que conhece a rua.

**O que dizer:** os bairros da carteira; a metragem, os dormitórios, as vagas, a distância da praia, o sol; o valor, o condomínio e o IPTU; a data das fotos; a conta da escritura; o CRECI; o registro da incorporação quando couber.

**O que evitar:** "oportunidade única", "imperdível", "valorização garantida", "últimas unidades" (se não for), "a melhor imobiliária", número de clientes sem contagem.

**Exemplos no registro certo** (demo de setembro):
- "Quatro bairros, e só eles." (título)
- "Três filtros, e a carteira inteira à vista."
- "O que falta na conta raramente é o preço do imóvel: é a soma da entrada com ITBI, escritura e registro."
- "Nada aqui substitui a conferência antes da proposta."

---

## 8. Referências para estudar

| Referência | Endereço | Sob que norma opera | O que aprender | O que não copiar |
|---|---|---|---|---|
| Arete, Itália (setembro) | Endereço não registrado na análise | Itália | **Tipografia:** `h1` de 256 px com 0,37 MB | A inércia |
| ERA Residence (SOTM, agosto de 2026) | https://www.awwwards.com/sites/era-residence | Estrangeira; alto padrão | Fotografia e vídeo contando o imóvel | 40,7 MB, 24 telas, GSAP, Lenis, Barba |
| Realevate (SOTD, 27.09.2026) | https://www.awwwards.com/sites/realevate | Estrangeira | Transição entre páginas | O carregador na entrada |
| likova e Storey Architecture (setembro) | Endereços não registrados na análise | Estrangeiras | As duas que têm busca | 57,2 telas (likova) |
| dviga (setembro) | Endereço não registrado na análise | Estrangeira | O registro legal repetido (21 vezes) | 240 pedidos |

---

## 9. O que a pesquisa de setembro mediu

Análise de setembro de 2026 (`nichos/analises/atlas--analise-imobiliaria.md`, no repositório do Atlas), onze referências, todas de alto padrão:

| Site | Pedidos | Peso | Telas | Imagens | `h1` | Busca | Registro legal |
|---|---|---|---|---|---|---|---|
| Era Residence | 79 | 40,7 MB | 24,1 | 41 | 173 px | — | — |
| dviga · Masters | 240 | 26,2 MB | 35,2 | 56 | — | não | 21 |
| likova | 85 | 18,5 MB | 57,2 | 96 | 143 px | sim | 5 |
| 250 Broadway | 112 | 13,9 MB | 20,3 | 61 | 64 px | não | 8 |
| Luxury Places | 52 | 11,2 MB | 11,0 | 35 | 88 px | não | — |
| Belgrade Arbor | 79 | 11,2 MB | 22,4 | 51 | 151 px | — | — |
| Rio Property | 80 | 11,1 MB | 10,6 | 14 | 74 px | não | 2 |
| Storey Architecture | 65 | 5,0 MB | 15,8 | 49 | — | sim | — |
| Kononenko | 99 | 2,9 MB | 21,1 | 27 | 14 px | — | — |
| **Arete (Itália)** | 38 | **0,37 MB** | 2,8 | 4 | **256 px** | não | 2 |
| Emaar | 4 | 0,49 MB | 1,0 | 0 | — | não | — |
| **Demo do Atlas** | **4** | **0,060 MB** | 11,4 | **0** | 74 px | **sim** | **7** |

- **Timidez tipográfica:** 74 px contra 256 px ao mesmo peso → elevar.
- **Fotografia:** 0 contra 14 a 96 → foto de cada imóvel, com a data.
- **Preço:** 19 contra 0 → **manter** (modelo distinto).
- **Filtro:** 2 de 8 têm → manter, com a reserva declarada.
- **CRECI:** 7 ocorrências → manter; a única vantagem estrutural.
- **Inércia:** 8 de 11.

---

## 10. Riscos e pendências

- **Os 25%:** a regra do Atlas segue o texto (o nome em uso); a leitura de setembro, mais restrita, espera o advogado [A CONFIRMAR].
- **Autorização escrita** de cada imóvel antes de publicá-lo (art. 20, III): conferir no briefing e a cada imóvel novo.
- **Registro da incorporação** nos imóveis em condomínio ou loteamento (art. 20, V).
- **ITBI de Niterói** e tabela do cartório: vêm do cliente, por ano [NV].
- **Imóvel vendido** no site: o maior risco de publicidade enganosa; prazo de retirada no contrato de manutenção.
- **Nenhum par de bairro** entre as referências de setembro: estudar duas imobiliárias de bairro brasileiras antes do primeiro cliente.

---

## 11. Lista de conferência do nicho

- [ ] Onde o nome da imobiliária aparece, o CRECI (com J) aparece junto, com pelo menos 25% do tamanho do nome.
- [ ] Cada corretor citado tem "Corretor de Imóveis" e o CRECI com F.
- [ ] Cada imóvel publicado tem autorização escrita do proprietário guardada.
- [ ] Imóvel em condomínio ou loteamento mostra o registro da incorporação ou do loteamento.
- [ ] Cada foto tem a data de captura; nenhuma foto retocada, com mobília virtual ou gerada.
- [ ] O filtro funciona sem script (a carteira inteira) e declara a reserva.
- [ ] A conta da escritura usa a alíquota e a tabela informadas pelo cliente e diz "estimativa".
- [ ] Nenhum endereço exato de imóvel; o mapa com dado aberto credita o OpenStreetMap.
- [ ] Nenhum imóvel vendido ou alugado na carteira.
- [ ] Nenhuma rolagem com inércia; nenhum azul-marinho.
