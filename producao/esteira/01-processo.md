# 01 · O processo, da venda à manutenção

> **Para que serve.** As etapas de produção de um site do Atlas, na ordem: quem faz cada uma, o que entra, o que sai, a porta que impede a passagem e o prazo. É o roteiro que o Claude Code segue num repositório novo, e que os sócios seguem fora dele.
>
> **Estado.**
> - **DECIDIDO** (ata v3.0, IV.4): o prazo do rascunho em 24 horas e a publicação em sete a quinze dias úteis.
> - **DECIDIDO** (contexto comercial, §4): as duas rodadas incluídas.
> - **DECIDIDO** (ata v3.0, I.1 e I.3): os papéis.
> - **RATIFICADO em 08.10.2026:** o resto.

---

## 1. Os papéis

| Quem | Faz | Nunca faz |
|---|---|---|
| **Gabriel Ribeiro Ota Yida** (vendas, direção) | Prospecção, venda, a assinatura do contrato (redigido por Matheus Azevedo Abreu), cobrança, o briefing no estabelecimento, as fotos do protocolo no Profissional e no Completo (no Essencial, o cliente as envia, orientado na visita: decisão do usuário de 08.10.2026), o contato com o cliente durante a produção | Decidir a direção de arte sozinho, prometer o que o plano não inclui |
| **Matheus Castro Oliveira de Luna Garcia** (desenvolvimento) | A direção de arte, a revisão do que o Claude Code constrói, a régua, a avaliação anti-IA, a publicação, a manutenção técnica | Mudar o escopo sem orçamento |
| **Matheus Azevedo Abreu** (parte legal, suporte) | A redação do contrato, o aviso de privacidade, o contrato de operador (quando houver coleta), a conferência das normas com o advogado, o suporte ao cliente depois da publicação | Aprovar texto de site sem a norma do conselho conferida |
| **Claude Code** | Ler a esteira e o briefing, propor a direção de arte, construir, verificar com a régua, registrar decisões | Commit, push ou publicação sem pedido; inventar dado; decidir preço, escopo, prazo, nicho ou conselho |

**Todos os sócios podem atuar no desenvolvimento** (ata v3.0, I.3, cláusula a ratificar). A titularidade é de Matheus Castro Oliveira de Luna Garcia.

**Os títulos** (A RATIFICAR). Gabriel Ribeiro Ota Yida é o diretor executivo (CEO; ata v3.0, I.1). Desde 03.10.2026, por pedido do usuário, Matheus Castro Oliveira de Luna Garcia é o diretor de tecnologia (CTO): a ata v3.0 define a função dele, o desenvolvimento dos sites, e não o título, que entra na ratificação e no contrato social. O site do Atlas mostra funções, não títulos. **A função de presença digital dos clientes não tem titular** desde 30.09.2026 (ata v3.0, I.3 e VI, item 10): enquanto não for atribuída, o módulo Presença não deve ser vendido como se tivesse dono (`14-funcionalidades/06-presenca.md`).

**Onde se produz: no Claude Code, no repositório do cliente** (DECIDIDO em 12.09.2026; registro de decisões do Atlas). **Objetivo:** o contêiner do Claude.ai é efêmero e, em 11.09.2026, apagou o ferramental de produção; no repositório, cada passo fica versionado. A deliberação, a análise e os documentos da sociedade podem continuar no Claude.ai. O que precisa ser garantido vira gancho, não instrução: "instrução em arquivo é pedido; gancho é garantia" (`../qualidade/13-integracao-continua.md`, seção 7).

**O que a produção não decide** (vem pronto do briefing):
- o preço e o escopo;
- o prazo;
- o nicho;
- o nome do estabelecimento;
- a escolha do conselho profissional.

**Briefing incompleto interrompe a produção; não a autoriza a supor.**

**A ordem de trabalho da sociedade** (ata, bloco 09, de 05.08.2026; DECIDIDO): contadora → LTDA → site do Atlas → template de construção → piloto → clientes. A esteira e a base de produção proposta (`13-tecnologia-e-estrutura.md`, seção 8) são a forma atual da etapa do template (RATIFICADO); o piloto é a nutrição (registro de decisões do Atlas, 12.09.2026). **Pendência em aberto:** a consulta ao contador (tipo societário, CNAE, regime tributário e sede) está parada desde a reunião de agosto de 2026, e a LTDA será constituída depois dela (ata, bloco 01). Sem o CNPJ do Atlas, o contrato de operador (etapa 10) e a publicação do site do Atlas (`18-publicacao-e-manutencao.md`, seção 2.2) esperam.

---

## 2. As etapas

### Etapa 0 · Venda

- **Quem:** Gabriel Ribeiro Ota Yida.
- **Entra:**
  - o contato (rede pessoal até três clientes; depois, prospecção fria);
  - o site de exemplo do nicho, aberto no celular do vendedor;
  - a tabela (`03-planos.md`).
- **Faz:**
  1. Mostra o site de exemplo do nicho no celular, no **plano de referência do nicho** (`nichos/<nicho>.md`), e a escada dos três planos.
  2. Recomenda o plano pela **tarefa do site**:
     - Essencial: ser encontrado e chamado;
     - Profissional: ser escolhido;
     - Completo: trabalhar pelo negócio.

     Nunca pela "quantidade de animação".
  3. Usa o argumento na ordem da ata (IV.1): padrão de execução, eficiência, preço declarado. Nunca preço baixo; nunca "mais escolhido" — sobre zero clientes, é falso.
  4. Oferece a **Condição de Fundação** só enquanto houver vaga: os três primeiros contratos têm metade da criação e a mensalidade congelada por doze meses, em troca do estudo de caso com autorização assinada no início.
  5. Aplica as **cinco travas dos primeiros clientes** (ata v3.0, IV.5):
     - tabela ou Condição de Fundação, nunca zero;
     - contrato de uma página, mesmo com parente;
     - cláusula de estudo de caso assinada no início;
     - uma conta receptora, com registro escrito;
     - teto de três clientes vindos da rede pessoal.
- **O método, como se conta ao cliente** (contexto comercial, §4; as duas rodadas são DECIDIDO). Quatro frases, sempre as mesmas:
  1. **Visita e briefing:** encontro presencial no próprio estabelecimento (etapa 1).
  2. **Rascunho em 24 horas:** com textos e fotografias reais, entregue por link (etapa 8). O material visual vem do cliente, exigido no briefing (`08-imagem-e-fotografia.md`).
  3. **Revisões:** duas rodadas sem custo adicional; o que exceder o escopo é orçado antes de ser feito, nunca cobrado depois (etapa 9).
  4. **Publicação e manutenção:** domínio, hospedagem e certificado configurados pela agência (etapas 11 e 13); o que a mensalidade compreende é o da ata v3.0, IV.2.1, item 5 (`03-planos.md`, seção 2).
  - **Objetivo:** o vendedor não promete mais do que as etapas cumprem. "Sua empresa online em 24h" significa o passo 2 e nada mais (etapa 8).
- **Sai:** o contrato assinado e a primeira parcela da criação (metade, no briefing; a outra metade, na publicação).
- **Porta:** sem contrato e sem a primeira parcela (ou a data dela registrada), o briefing não acontece.

### Etapa 1 · Briefing no estabelecimento

- **Quem:** Gabriel Ribeiro Ota Yida, no estabelecimento, conversando. Nunca se entrega o formulário ao cliente para responder depois: ele não responde, e o prazo morre esperando.
- **Duração:** 30 min no Essencial, 45 min no Profissional, 1 h no Completo (o formulário v1.0 previa 20 a 30 minutos e "no mínimo seis" fotos: `02-briefing.md`, Origem). Mais o tempo das fotos no local, no Profissional e no Completo (no Essencial, o cliente as envia).
- **Faz:** preenche todos os campos de `02-briefing.md`, com os campos bloqueantes (●) completos; no Profissional e no Completo, tira as fotos pelo protocolo (`08-imagem-e-fotografia.md`); no Essencial, orienta o cliente pelo protocolo e recebe as fotos dele; recebe ou fotografa o logotipo; confere o endereço no mapa e a disponibilidade do domínio; anota três concorrentes locais.
- **Sai:** o briefing completo, as fotos, o logotipo e o contrato, enviados ao grupo no mesmo dia.
- **Porta:**
  - **O relógio das 24 horas só começa quando o briefing completo e o material chegam ao grupo.**
  - Se faltar campo bloqueante, anota-se a data em que o material chegar e o prazo se recalcula a partir dela.

### Etapa 2 · Abertura do repositório

- **Quem:** o sócio de desenvolvimento, com o Claude Code.
- **Faz:**
  1. Cria o repositório privado do cliente (ou o app do cliente no monorepo, quando a base de produção existir: `13-tecnologia-e-estrutura.md`, seção 8).
  2. Copia `producao/esteira/` e `producao/qualidade/` para a raiz.
  3. Copia `producao/esteira/modelos/claude-do-projeto.md` para a raiz e preenche o cabeçalho; cria um `AGENTS.md` vazio na raiz **antes do primeiro `npm run dev`** (o Next o preenche com o bloco que manda ler a documentação da versão instalada; sem ele, o Next grava esse bloco dentro do `CLAUDE.md`: `13-tecnologia-e-estrutura.md`, seção 2).
  4. Salva o briefing como `briefing.md`.
  5. Cria `identidade.md` e `decisoes.md` a partir dos modelos.
  6. Monta a estrutura de pastas (`13-tecnologia-e-estrutura.md`, seção 2).
  7. Copia a régua (`../qualidade/02-regua.md`, seção de portar).
- **Sai:** o repositório que compila, com a página inicial vazia e a régua rodando.
- **Porta:** `npm run build` passa; `npm run regua` roda.

### Etapa 3 · Verificação normativa

- **Quem:** Claude Code, conferido por Matheus Azevedo Abreu quando há conselho.
- **Faz:**
  1. Lê `nichos/<nicho>.md`, seção de normas.
  2. Confere cada vedação e cada obrigação na fonte primária.
  3. Lista no `decisoes.md` o que o site não pode ter (preço, antes e depois, depoimento, imagem de paciente, estrutura física) e o que precisa ter: registro do conselho no rodapé e no cabeçalho do celular; responsável técnico; o CRECI junto do nome da imobiliária, com no mínimo 25% do tamanho dele.
- **Sai:** a lista de vedações e obrigações do cliente.
- **Porta:** nenhuma linha de texto antes desta lista. Leitura que a fonte não resolve vai ao advogado e, até o parecer, vale a leitura cautelosa.

### Etapa 4 · Direção de arte

- **Quem:** o Claude Code propõe; Matheus Castro Oliveira de Luna Garcia decide.
- **Faz** (`04-direcao-de-arte.md` em detalhe):
  1. O **briefing visual** em cinco linhas: o assunto, o público, a tarefa principal da página, três adjetivos da marca e o único elemento memorável.
  2. **Os adjetivos do dono**, por pares de opostos (tradicional ou moderno? sóbrio ou caloroso? popular ou exclusivo?).
  3. **Referências do mundo físico do cliente:** no mínimo cinco (letreiro, embalagem, material, uniforme, o próprio lugar).
  4. **O plano de design:** 4 a 6 cores nomeadas pela função, os tipos e os papéis deles, o conceito de leiaute em uma frase com um esboço em ASCII, os princípios.
  5. **Painéis de estilo:**
     - **[P][C]:** dois ou três (tipo, cor, textura e um botão, sem página);
     - **[E]:** um, que é o sistema do nicho ajustado à marca.
  6. **O teste do prompt parecido:** comparar o plano com o resultado padrão de um pedido parecido ("site de barbearia de bairro") e revisar tudo o que coincidir.
  7. **[C]:** a peça-assinatura (`14-funcionalidades/08-peca-assinatura.md`).
  8. Registra tudo em `identidade.md`.
- **Sai:** `identidade.md` preenchido e aprovado, com as capturas da mesa (1440 px); a do celular vem no passe dele, na etapa 6 (`00-principios.md`, seção 5).
- **Porta:** a avaliação anti-IA do **plano** (antes do código): nenhuma escolha por omissão sem motivo escrito (`11-anti-ia.md`, passo 3).

### Etapa 5 · Conteúdo

- **Quem:** Claude Code.
- **Faz:**
  1. Escreve os textos em `conteudo/`, como dados tipados (`10-texto-e-conteudo.md`), a partir do briefing, com as palavras do próprio dono onde servirem: a frase de abertura sai de "o que o senhor responde quando perguntam o que faz".
  2. Aplica as vedações da etapa 3.
  3. Escreve os metadados de cada página.
- **Sai:** `conteudo/` completo.
- **Porta:** cada fato tem origem no briefing; nenhuma afirmação sem fonte.

### Etapa 6 · Construção

- **Quem:** Claude Code.
- **Faz, em dois passes, nesta ordem, cada um com foco total, nunca os dois juntos** (`00-principios.md`, seção 5):
  1. **O passe da mesa** (1440 px): as páginas do plano, com a estrutura do nicho (`nichos/<nicho>.md`), a identidade (`identidade.md`), as funcionalidades (`14-funcionalidades/`), as fotos (`08-imagem-e-fotografia.md`) e o movimento da camada do plano (`09-movimento.md`), acabados no computador. Antes da porta, no mínimo três rodadas de lapidação, cada uma com o crítico de fora (`19-o-padrao-atlas.md`, seções 8.4 e 8.5). Porta: as capturas a 1440 px aprovadas, o teste da vitrine na mesa, com o veredito (`00-principios.md`, seção 9; `19-o-padrao-atlas.md`, seção 8.6), a régua sem falha na mesa e a avaliação anti-IA na mesa, com a contagem da série por página (`20-repeticao-dentro-do-site.md`, seção 3).
  2. **O passe do celular** (390 px): a tabela "O premium no celular" do `identidade.md`, e depois as mesmas páginas, inteiras, no celular: a disposição própria (`07-composicao.md`, seção 8) e a versão de toque de cada momento premium (`09-movimento.md`, seção 11). Antes da porta, as rodadas de lapidação no celular, com o crítico de fora. Porta: as capturas a 390 px aprovadas, o teste da vitrine no celular, com o veredito, a régua inteira e a avaliação anti-IA no celular, com a contagem da série a 390 px.
  3. Segue as convenções de código (`13-tecnologia-e-estrutura.md`).
  4. Quando a construção se divide entre agentes, segue o método por contrato (`19-o-padrao-atlas.md`, seção 8.8).
- **Sai:** o site completo do plano, compilando, com as duas portas abertas.
- **Porta:** `npm run build` sem erro de tipo, e as portas da mesa e do celular, nesta ordem.

### Etapa 7 · Verificação

- **Quem:** Claude Code; Matheus Castro Oliveira de Luna Garcia confere.
- **Faz** (`../qualidade/14-ciclo-de-qa.md`, "antes do rascunho"):
  1. A régua inteira, sem falha.
  2. A avaliação anti-IA do **resultado**: capturas a 390 e a 1440 px; nenhuma marca de peso alto.
  3. A lista de revisão de 22 itens (`../qualidade/11-design-e-anti-ia.md`).
  4. As normas do nicho conferidas no texto final.
  5. A leitura do texto em voz alta.
  6. **A revisão de sentido** (herdada da ESTEIRA v2.1, III.8): **erro de domínio** — um fato do ofício ou do lugar errado (a barbearia de setembro dizia "a duas quadras da praia" de Santa Rosa, que não fica na orla); **erro estético** — o que a avaliação anti-IA não pegou; **ferramenta magra** — a funcionalidade que existe mas não resolve a tarefa do ofício nem termina na ação principal (`14-funcionalidades/README.md`, seção 3). Inclui o teste do desconhecido em cada peça desenhada (`04-direcao-de-arte.md`, passo 8). A conferência criptográfica de entrega da v2.1 (SHA-256 entre `publicar/` e `enviar/`) era do gerador estático antigo; no Next, o equivalente é o commit do artefato publicado, registrado no relatório da publicação (`18-publicacao-e-manutencao.md`, seção 5).
  7. **A revisão do Impeccable a 100%**, a última conferência antes do commit (desde 16.10.2026, pedido do usuário). Rodam o detector, o `critique` (A e B isolados) e o `audit`. Monta-se o mapa do que converge ou não com o kit anti-IA, fazem-se as mudanças devidas, e o relatório do que foi feito e descoberto vai ao chat (`../qualidade/15-revisao-do-impeccable.md`).
- **Sai:** o relatório de QA do rascunho e o relatório da revisão do Impeccable, no chat e nos registros.
- **Porta:** régua sem falha; anti-IA sem marca de peso alto; e nada do mapa de convergência real aberto sem decisão.

### Etapa 8 · Rascunho de 24 horas

- **Quem:** o sócio de desenvolvimento publica, ou pede ao Claude Code que publique (publicação só com pedido explícito: `modelos/claude-do-projeto.md`, "Regras de trabalho"); Gabriel Ribeiro Ota Yida envia ao cliente.
- **Faz:**
  1. Publica o rascunho no endereço temporário do próprio site, com `noindex` (`18-publicacao-e-manutencao.md`, seção 6.2).
  2. Envia o vínculo ao cliente pelo canal combinado no briefing.
- **O que o rascunho contém** (detalhe em `03-planos.md`):
  - **[E]:** as três páginas completas, com texto e fotos reais;
  - **[P]:** todas as páginas, com a funcionalidade sob medida em versão inicial;
  - **[C]:** a versão inicial — as páginas principais, as duas funcionalidades em versão inicial, a peça-assinatura na versão de reserva.
- **Porta:** é um **rascunho navegável**, não o site publicado (ata v3.0, IV.4). A frase "Sua empresa online em 24h" significa isso e nada mais.

### Etapa 9 · Rodadas

- **Quem:** o cliente pede; Gabriel Ribeiro Ota Yida registra; Claude Code faz; Matheus Castro Oliveira de Luna Garcia confere.
- **Faz:**
  1. Duas rodadas de ajuste, incluídas.
  2. Cada pedido vai para o `decisoes.md`.
  3. **O que excede o escopo do plano é orçado antes de ser feito, nunca cobrado depois** (contexto comercial, §4): uma página a mais no Essencial ou no Profissional (Página adicional, R$ 250), uma funcionalidade fora do plano, um módulo.
  4. A régua roda a cada rodada.
- **Porta:** o cliente aprova por escrito (mensagem basta), e a régua passa.

### Etapa 10 · Conformidade

- **Quem:** Matheus Azevedo Abreu, com o Claude Code.
- **Faz:** a porta de publicação (`17-conformidade-e-normas.md`, seção 9):
  - o aviso de privacidade (quando há coleta) e o prazo de guarda;
  - o registro do conselho visível;
  - a razão social e o CNPJ **do cliente** no rodapé de toda página (Decreto 7.962/2013, na leitura cautelosa de `17-conformidade-e-normas.md`, seção 3.1; o alcance, A CONFIRMAR com advogado);
  - as fontes hospedadas e zero cookie;
  - o HTTPS;
  - o contrato de operador quando há coleta (depende do CNPJ do Atlas).
- **Porta:** todos os itens marcados.

### Etapa 11 · Publicação

- **Quem:** Matheus Castro Oliveira de Luna Garcia, com o Claude Code.
- **Faz:**
  1. Antes de publicar, a reavaliação anti-IA com o texto e as fotos finais, e o teste do desconhecido (`11-anti-ia.md`; `../qualidade/11-design-e-anti-ia.md`, seção 2).
  2. Publica conforme `18-publicacao-e-manutencao.md`: estático ou web app Node, conforme o plano e os módulos.
  3. Aponta o domínio e confere o SSL.
  4. Confere no endereço publicado: cabeçalhos, cartão do WhatsApp, 404, régua contra o endereço real.
- **Prazo** (RATIFICADO, dentro dos sete a quinze dias úteis da ata): **[E]** até 7 dias úteis depois da aprovação do rascunho, **[P]** até 10, **[C]** até 15.
- **Porta:** a conferência pós-publicação sem falha. A segunda parcela da criação é cobrada aqui.

### Etapa 12 · Entrega

- **Quem:** Gabriel Ribeiro Ota Yida e Matheus Azevedo Abreu.
- **Faz:**
  1. Envia ao cliente o resumo do que foi entregue e os canais de suporte.
  2. **[cli] Condição de Fundação:** abre o estudo de caso — problema, o que foi feito, o que mudou, com número verificável e a autorização assinada.
     **Objetivo.** A maior lacuna do Atlas é a prova, não a estética (contexto comercial, §5): o primeiro estudo de caso vale mais que qualquer refinamento de site, e prova inventada é vedada (`00-principios.md`, princípio 1). Por isso a autorização é assinada no início do contrato e o resultado só entra com número verificável.
- **Sai:** o cliente com o site no ar e a mensalidade começando no mês seguinte à publicação (afirmação do site, A CONFIRMAR).

### Etapa 13 · Manutenção

- **Quem:** Matheus Azevedo Abreu (suporte); Claude Code e o sócio de desenvolvimento (mudanças); Matheus Castro Oliveira de Luna Garcia (atualizações).
- **Faz** (`18-publicacao-e-manutencao.md`):
  - as alterações de texto, preço e horário;
  - as atualizações de segurança;
  - a conferência do backup;
  - **[P][C]** o relatório mensal de acessos;
  - **[C]** a revisão trimestral de conteúdo e o atendimento prioritário.
- **Porta:** toda mudança passa pela régua antes de ir ao ar.

---

## 3. As 24 horas, hora a hora (RATIFICADO)

Para o rascunho chegar em 24 horas, a partir do briefing completo no grupo (H0):

| Hora | O quê | Quem |
|---|---|---|
| H0 a H+1 | Abertura do repositório; leitura do briefing; conferência dos campos | Sócio de desenvolvimento, Claude Code |
| H+1 a H+3 | Verificação normativa; briefing visual; plano de design | Claude Code |
| H+3 a H+4 | Aprovação da direção de arte (identidade.md) | Matheus Castro Oliveira de Luna Garcia |
| H+4 a H+6 | Conteúdo em `conteudo/`; tratamento das fotos | Claude Code |
| H+6 a H+16 | Construção | Claude Code, sob revisão |
| H+16 a H+20 | Régua, anti-IA, lista de revisão de 22 itens, leitura do texto; correções | Claude Code e Matheus Castro Oliveira de Luna Garcia |
| H+20 a H+22 | Publicação no endereço temporário; conferência | Sócio de desenvolvimento |
| H+22 a H+24 | Envio ao cliente | Gabriel Ribeiro Ota Yida |

**O prazo de 24 horas nunca foi cronometrado num cliente real** (contexto comercial, §3). Mede-se no piloto (a nutrição), e esta tabela se corrige.

---

## 4. O que interrompe a produção

| Situação | O que fazer |
|---|---|
| Campo bloqueante do briefing vazio | Parar; pedir ao sócio do briefing; recalcular o prazo a partir da chegada |
| Norma sem fonte primária, ou leitura duvidosa | Aplicar a leitura cautelosa e registrar; se a dúvida for central (preço, imagem de paciente), parar e consultar |
| Pedido do cliente que fere a norma do conselho | Recusar, explicar com a norma, registrar |
| Pedido fora do plano | Orçar antes; nunca fazer e cobrar depois |
| Foto insuficiente ou de baixa qualidade | Pedir nova sessão pelo protocolo; até lá, usar os substitutos sem foto (tipografia em escala, mapa do bairro, número como elemento gráfico, espaço), nunca banco de imagens nem IA |
| Régua com falha ou anti-IA com marca de peso alto | Não enviar o rascunho |
| Dependência nova necessária | Pedir autorização (`13-tecnologia-e-estrutura.md`, seção 9) |

---

## 5. O que fica registrado no repositório do cliente

| Arquivo | Conteúdo | Quando |
|---|---|---|
| `CLAUDE.md` | O cabeçalho do cliente e as regras de trabalho (modelo em `modelos/claude-do-projeto.md`) | Etapa 2 |
| `briefing.md` | O briefing completo, com a data em que chegou | Etapa 1 |
| `identidade.md` | A direção de arte e os tokens | Etapa 4 |
| `decisoes.md` | Cada decisão, com data e razão: normas, exceções, pedidos, rodadas | Sempre |
| `.regua/relatorio.json` | O último relatório da régua (fora do git) | A cada verificação |
| `registros/` | Os relatórios de QA do rascunho e da publicação, os defeitos, as explorações e a lista de publicação, com o nome tipado de cada modelo (`../qualidade/modelos/README.md`) | Etapas 7, 9 e 11 |
