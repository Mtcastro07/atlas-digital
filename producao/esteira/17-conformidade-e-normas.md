# 17 · Conformidade e normas

> **Para que serve.** O que a lei e os conselhos exigem de um site do Atlas, o que o Atlas exige além deles, e a porta de publicação que impede um site sem conformidade de ir ao ar. As normas de cada conselho estão em `nichos/<nicho>.md`; aqui ficam a lei que vale para todo site, o pacote que todo site leva e a lista do que precisa de advogado.
>
> **O que não é: parecer jurídico.** É leitura de texto legal e de guias oficiais, feita por quem não é advogado. **Todo o pacote precisa de revisão profissional antes da primeira venda** (`documentacao/atlas--conformidade.md`, cabeçalho, no repositório do Atlas); o que está marcado A CONFIRMAR e a lista da seção 10 vêm primeiro. A divisão de papéis — o cliente controla, o Atlas constrói e, havendo coleta, opera — também passa pelo advogado antes da primeira venda.
>
> **Estado e fontes.**
> - **Base:** o pacote de conformidade de 30.08.2026 e o acréscimo de 07.10.2026 (`documentacao/atlas--conformidade.md`, no repositório do Atlas), consolidados aqui.
> - **Texto primário lido em 08.10.2026** [V], no Planalto e no Diário Oficial:
>   - Decreto 7.962/2013, art. 2º;
>   - Lei 12.965/2014 (Marco Civil), art. 15;
>   - Lei 13.146/2015 (LBI), art. 63;
>   - Lei 13.709/2018 (LGPD), arts. 5º, 7º, 39, 41, 42, 46 e 48;
>   - Lei 8.078/1990 (CDC), arts. 26, 30, 31, 37, 39 e 40;
>   - Código Civil, art. 20;
>   - Resolução CD/ANPD 2/2022, arts. 2º a 4º, 11 e 14;
>   - Resolução CD/ANPD 15/2024, arts. 6º e 9º.
> - O resto é RATIFICADO em 08.10.2026 ou A CONFIRMAR, como indicado.

---

## 1. Três situações

| Situação | O que precisa | Por quê |
|---|---|---|
| **[cli] Site de cliente** | O pacote inteiro (seção 4) e a porta de publicação (seção 9) | **O cliente é o controlador dos dados; o Atlas constrói** e, quando há coleta, é o operador. Quem responde perante a ANPD e o conselho é o cliente; o Atlas responde pela confiança e, como operador, junto com ele se descumprir a lei ou as instruções (LGPD, art. 42, § 1º, I) [V] |
| **[ex] Site de exemplo** | Selo de ficção visível, `noindex`, nenhuma coleta, WhatsApp fictício | É um estabelecimento inventado: nada nele pode ser confundido com um negócio real nem coletar dado de quem o visita |
| **Site do Atlas** | O pacote inteiro, menos o que depende de CNPJ | **O Atlas não tem CNPJ** (o MEI foi baixado em 31.07.2026): o site não declara registro, nota fiscal nem razão social que não existem |

**O selo de ficção dos sites de exemplo**, no repositório do Atlas (`web/conteudo/demos/comum.ts`): "Estabelecimento fictício, criado pela Atlas Digital para demonstração. Nenhum pedido é processado e nenhum dado é coletado nesta página."
- O selo aparece no rodapé de cada página.
- A descrição de cada página termina em "Estabelecimento fictício."
- O `noindex` vem do layout comum (`web/app/demos/layout.tsx`).
- O WhatsApp é um número fictício (`5521900000000`).

---

## 2. Quem responde pelo quê

| Papel | Quem | O que faz | Fonte |
|---|---|---|---|
| **Controlador** | O cliente | Decide para que e como os dados são tratados; publica o aviso de privacidade; atende o titular; comunica incidente à ANPD e ao titular | LGPD, art. 5º, VI [V] |
| **Operador** | O Atlas, quando o site coleta (formulário, Agenda) | Trata os dados em nome do cliente, **segundo as instruções dele** (art. 39) [V]; responde junto se descumprir a lei ou as instruções (art. 42, § 1º, I) [V] | LGPD, art. 5º, VII [V] |
| **Suboperador** | A Hostinger (hospedagem, banco, e-mail) | Guarda os dados e os registros de acesso | Contrato de operador (seção 5.6) |
| **Fora da cadeia** | O WhatsApp | A conversa começa no aplicativo, sob os termos dele; o site **não recebe nem guarda** o conteúdo | O vínculo `wa.me` só abre o aplicativo |

**Sem coleta, não há operador.** O site do Essencial sem módulo só exibe informação e leva ao WhatsApp. O Atlas não trata dado do visitante; os registros de acesso ficam na hospedagem.

---

## 3. A lei que vale para todo site

### 3.1 · Informação do fornecedor: Decreto 7.962/2013, art. 2º [V]

- **O texto.** "Os sítios eletrônicos [...] utilizados para oferta ou conclusão de contrato de consumo devem disponibilizar, em local de destaque e de fácil visualização":
  - I. nome empresarial e número de inscrição, "quando houver", no CPF ou no CNPJ;
  - II. endereço físico e eletrônico, e demais informações necessárias para a localização e o contato;
  - III. características essenciais do produto ou serviço, incluídos os riscos à saúde e à segurança dos consumidores;
  - IV. discriminação, no preço, de despesas adicionais (entrega, seguro);
  - V. condições integrais da oferta (pagamento, disponibilidade, forma e prazo de execução ou entrega);
  - VI. restrições à fruição da oferta.
- **Regra (leitura cautelosa, RATIFICADO).** Todo site de cliente que apresenta serviços ou produtos é tratado como "oferta".
  - **No rodapé:** a razão social e o CNPJ do cliente, o endereço e o e-mail ou o telefone.
  - **Quem mostra preço:** mostra o que entra (III), a taxa de entrega ou o deslocamento (IV), as formas de pagamento e o prazo (V), e as restrições (VI) — por exemplo, "entrega só nos bairros listados".
- **A CONFIRMAR com advogado.**
  - **O alcance:** se o site que só apresenta e leva ao WhatsApp é "oferta" no sentido do decreto.
  - **O profissional pessoa física sem CNPJ:** se precisa publicar o CPF. Até o parecer, publica-se o nome completo, o registro do conselho e o endereço; **o CPF não se publica**, porque a exposição facilita fraude e o registro do conselho identifica o profissional.
- **Como conferir.** A leitura do rodapé de toda página, no celular e na mesa, contra o `briefing.md`. A régua de hoje não confere o rodapé: no bloco 9 ela só **avisa** de toda menção a CNPJ, porque o site do Atlas não pode declarar um. No repositório do cliente, essa verificação se inverte — rodapé **sem** razão social e CNPJ é que se acusa (`../qualidade/02-regua.md`, como portar; `../qualidade/10-conteudo-normas-e-texto.md`).

### 3.2 · A oferta obriga: CDC, arts. 30, 31 e 37 [V]

- **O texto.**
  - **Art. 30:** a informação "suficientemente precisa" veiculada "obriga o fornecedor" e "integra o contrato".
  - **Art. 31:** a oferta deve trazer informações "corretas, claras, precisas, ostensivas e em língua portuguesa".
  - **Art. 37:** é proibida a publicidade enganosa, "inteira ou parcialmente falsa".
  - **Art. 26:** o direito de reclamar de vício aparente ou de fácil constatação caduca em 30 dias, no serviço e no produto não durável, e em 90 dias, no serviço e no produto durável, contados da entrega do produto ou do término do serviço [V]. É prazo legal para reclamar, e não garantia que o fornecedor oferece: o texto do site não o apresenta como garantia (`nichos/oficina.md`).
- **Regra.**
  - **O preço publicado vale.** A tabela de preços leva o mês de referência ("Valores de outubro de 2026"), e a mudança de preço é a alteração de manutenção mais urgente: entra no mesmo dia útil (RATIFICADO).
  - **Nada parcialmente falso:** prazo, horário, entrega e o que o serviço compreende saem do briefing e se conferem a cada revisão.
  - **"A partir de"** só quando o menor preço existe de fato para o serviço descrito.
- **Varia por:**
  - **Oficina e serviços com orçamento** (CDC, art. 39, VI, e art. 40) [V]: executar serviço sem orçamento prévio e autorização expressa é prática abusiva. O orçamento discrimina mão de obra, materiais, condições de pagamento e datas, e vale dez dias.
  - **O que o site oferece:** **estimativa**, nunca o orçamento do art. 40. A faixa de preço e a hora técnica levam a frase "estimativa; o orçamento é feito com o carro na oficina".

### 3.3 · Acessibilidade: Lei 13.146/2015, art. 63 [V]

- **O texto.**
  - **Caput:** "É obrigatória a acessibilidade nos sítios da internet mantidos por empresas com sede ou representação comercial no País [...] conforme as melhores práticas e diretrizes de acessibilidade adotadas internacionalmente."
  - **§ 1º:** "Os sítios devem conter **símbolo de acessibilidade em destaque**."
- **Regra.**
  - **O padrão:** WCAG 2.2 nível AA, em todo site (`16-acessibilidade.md`).
  - **RATIFICADO (o § 1º, não cumprido por nenhum site do Atlas até 08.10.2026):** um símbolo de acessibilidade no rodapé de toda página, ligado à **declaração de acessibilidade**: o padrão seguido, como foi verificado, as limitações conhecidas, como relatar uma barreira e a data da última revisão.
  - **A forma do símbolo é A CONFIRMAR com advogado:** a lei não a especifica. Modelo da declaração: `modelos/declaracao-de-acessibilidade.md`. A Lei 7.405/1985 (Símbolo Internacional de Acesso) não pôde ser conferida: o Planalto respondeu "conteúdo não encontrado" em 08.10.2026, e a relação dela com o símbolo do art. 63, § 1º, é A CONFIRMAR [NV].
  - **Achado de 08.10.2026, no texto da lei:** nenhum documento do projeto registrava o § 1º, e nenhum site do Atlas tem o símbolo. Ele entra na ratificação da esteira (ata v3.0, VI, item 17), junto com a declaração de acessibilidade. A Lei 7.405/1985 (Símbolo Internacional de Acesso) não pôde ser conferida: o Planalto respondeu "conteúdo não encontrado" [NV].
- **Como conferir.** A régua (blocos 1, 3 e 4), o roteiro do leitor de tela e a presença do símbolo e da declaração na porta de publicação.

### 3.4 · Proteção de dados: LGPD (Lei 13.709/2018)

| Ponto | O que a lei diz | O que o Atlas faz |
|---|---|---|
| **Base legal do contato e da marcação** | "Procedimentos preliminares relacionados a contrato [...] a pedido do titular" (art. 7º, V) [V] | Formulário e Agenda **sem caixa de consentimento**: o visitante pede o contato |
| **Base legal de novidades por e-mail** | Consentimento (art. 7º, I) [V] | Caixa separada, **desmarcada**; sem ela, nenhum envio. Por padrão, o Atlas não oferece lista de novidades |
| **Base legal dos registros de acesso** | Legítimo interesse (art. 7º, IX) [V] | Declarado no aviso de privacidade, para segurança e funcionamento |
| **Dado sensível** | É sensível o dado pessoal sobre origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou a organização de caráter religioso, filosófico ou político, dado referente à saúde ou à vida sexual, dado genético ou biométrico, quando vinculado a uma pessoa natural (art. 5º, II) [V] | **Nenhum dado de saúde** no formulário nem na Agenda: nada de "descreva seus sintomas", peso, medida, diagnóstico. Na academia, o peso e a medida do aluno ficam fora; na nutrição, a anamnese é feita na consulta, nunca no formulário (`14-funcionalidades/02-formulario.md`, seção 2) |
| **Encarregado** | O controlador indica encarregado (art. 41) [V]. O agente de pequeno porte é dispensado, mas mantém **um canal com o titular** (Resolução CD/ANPD 2/2022, art. 11, § 1º) [V] | O aviso de privacidade publica o canal (e-mail ou telefone) |
| **Exceção do pequeno porte** | Não se beneficia quem faz tratamento de **alto risco**: larga escala ou efeito significativo, somado a um critério específico, como **dado sensível** (Resolução 2/2022, arts. 3º e 4º) [V] | Na saúde, a cautela pesa mais: nada de dado sensível no site, e, se um dia houver, o advogado decide sobre o encarregado |
| **Regime do pequeno porte** | A Resolução CD/ANPD 2/2022 [V] alcança a microempresa, a empresa de pequeno porte, a startup e o MEI, até o teto de receita da LC 123 (para a startup, o da LC 182; arts. 2º e 3º), salvo tratamento de alto risco. Dispensa o encarregado (art. 11); admite o registro das operações de forma simplificada (art. 9º) e a política de segurança simplificada (art. 13); dobra os prazos (art. 14); permite a declaração simplificada ao titular em até 15 dias (art. 15). A ANPD pode exigir as obrigações dispensadas (art. 16) | O canal com o titular continua publicado (art. 11, § 1º). O guia de segurança da ANPD para o agente de pequeno porte serve de lista de medidas [FU] |
| **Segurança** | Medidas técnicas e administrativas contra acesso não autorizado (art. 46) [V] | HTTPS, HSTS, cabeçalhos, segredos fora do repositório, senha forte no painel, banco sem acesso externo (`13-tecnologia-e-estrutura.md`; `../qualidade/09-seguranca-e-privacidade.md`) |
| **Incidente** | O controlador comunica à ANPD e ao titular (art. 48) [V] em **três dias úteis** (Resolução CD/ANPD 15/2024, arts. 6º e 9º) [V]; o pequeno porte tem **prazo em dobro**, salvo risco à integridade física ou moral (Resolução 2/2022, art. 14, II) [V] | O contrato de operador obriga o Atlas a avisar o cliente **em até 24 horas** depois de saber do incidente (RATIFICADO), para o cliente cumprir o prazo dele |
| **Incidente: contagem e declaração** | Os três dias úteis contam do conhecimento, pelo controlador, de que o incidente afetou dados pessoais (Resolução CD/ANPD 15/2024, art. 6º, § 1º, e art. 9º, caput) [V]. Em até três dias úteis depois do fim desse prazo, o controlador junta ao processo a declaração de que comunicou os titulares, com os meios usados (art. 9º, § 4º) [V]. Para o pequeno porte, os dois prazos são em dobro (art. 6º, § 8º, e art. 9º, § 6º) [V] | Por isso o aviso do operador ao controlador vem em horas, e não em dias: 24 horas no contrato de operador (ata v3.0, VI, item 17; ratificado em 08.10.2026) |
| **Direitos do titular** | Confirmação, acesso, correção, eliminação e os demais do art. 18 | O canal do aviso de privacidade; o Atlas, como operador, ajuda o cliente a atender |
| **Conteúdo do aviso** | O titular tem direito a informação clara, adequada e ostensiva sobre o tratamento (art. 9º): finalidade específica; forma e duração; identificação e contato do controlador; uso compartilhado e sua finalidade; responsabilidades dos agentes; direitos do art. 18 [FU: pesquisa de 07.10.2026] | O aviso de privacidade traz esses pontos (`modelos/aviso-de-privacidade.md`); o prazo de guarda é definido e publicado pelo cliente (seção 5.3) |

### 3.5 · Registros de acesso: Marco Civil, art. 15 [V]

- **O texto.** "O provedor de aplicações de internet constituído na forma de pessoa jurídica e que exerça essa atividade de forma organizada, profissionalmente e com fins econômicos deverá manter os respectivos registros de acesso [...] pelo prazo de 6 (seis) meses."
- **A dúvida (A CONFIRMAR com advogado).** Se o site institucional de uma pequena empresa a torna "provedor de aplicações" que "exerce essa atividade" com fins econômicos. A atividade do cliente é cortar cabelo, não prover aplicações.
- **A janela da Hostinger:** os registros ficam por cerca de 7 dias (A CONFIRMAR no painel), menos que os seis meses do artigo.
- **O art. 13 não se aplica.** Ele trata do provedor de conexão (o administrador de sistema autônomo que provê a conexão à internet) e fixa 1 ano para os registros de conexão; o site de uma empresa é, quando muito, provedor de aplicações, do art. 15 [V: texto do Planalto, lido em 08.10.2026].
- **Se a leitura for de que o artigo alcança o cliente:**
  - exportar os registros da Hostinger toda semana;
  - guardá-los por seis meses, numa tabela à parte, de acesso restrito e fora do relatório de acessos (a contagem própria não os substitui: `14-funcionalidades/04-relatorio-de-acessos.md`, seção 8);
  - apagar o que vencer;
  - declarar tudo isso no aviso de privacidade.
- **Até lá:** nenhuma guarda própria. Guardar IP é guardar dado pessoal, e a guarda sem obrigação também é risco.

### 3.6 · Imagem e autoria

| Ponto | Regra | Fonte |
|---|---|---|
| **Imagem de pessoa** | A publicação ou o uso da imagem de alguém pode ser proibido, a pedido dele e sem prejuízo da indenização, se lhe atingir a honra, a boa fama ou a respeitabilidade, ou se se destinar a fins comerciais: **autorização escrita** de cada pessoa que aparece, guardada pelo cliente e anotada em `decisoes.md` | Código Civil, art. 20 [V]; o artigo foi interpretado pelo STF na ADI 4815 (biografias) [FU]; o alcance da decisão para o uso comercial fica A CONFIRMAR com advogado |
| **Aluno, paciente, criança** | Não aparecem identificáveis: academia (peso e medida são dado sensível), saúde (paciente), nutrição (corpo, vedado pelo conselho) | `nichos/<nicho>.md`; LGPD, art. 5º, II [V] |
| **Fotos feitas pelo sócio do Atlas** | O autor da foto é quem a tira. O contrato precisa licenciar o uso ao cliente, e o site do Atlas só usa a foto de cliente com autorização (estudo de caso) | Lei 9.610/1998 [NV]; **A CONFIRMAR com advogado** |
| **Fontes** | Licença conferida antes do uso; o arquivo da licença ao lado do `.woff2` (os sites de exemplo guardam `OFL-<familia>.txt`); **San Francisco nunca hospedada** (licença da Apple) | `05-tipografia.md` |
| **Mapa** | O mapa do bairro em vetor é desenhado pelo Atlas ou derivado de dados abertos com a atribuição exigida (o OpenStreetMap pede "© colaboradores do OpenStreetMap"); **nunca decalcado do Google Maps**. O mapa externo é só um vínculo, sem incorporação | Termos de cada fonte [NV] |
| **Marcas de terceiros** | Montadoras, fabricantes, bandeiras de cartão: o nome em texto basta; logotipo só com autorização | Cautela do Atlas [NV] |

---

## 4. O pacote de conformidade de todo site [cli]

| Peça | O que é | Onde | Plano |
|---|---|---|---|
| **Rodapé de conformidade** | Razão social e CNPJ (seção 3.1); endereço; contato; vínculo para o aviso de privacidade; símbolo e vínculo da declaração de acessibilidade; registro do conselho quando houver | Toda página | [todos] |
| **Registro do conselho** | Sigla e número (CRN, CRO, CRP, CRM com RQE, CREF, CRECI, OAB, CRMV) e o responsável técnico quando exigido, **também no cabeçalho do celular**. **O CRECI (sigla e número) junto do nome da imobiliária, onde ele aparecer, com no mínimo 25% do tamanho desse nome** (COFECI 1.065/2007, arts. 2º, § 2º, e 5º, b) [V]: o rodapé e o cabeçalho não podem reduzir esse corpo | Cabeçalho e rodapé | Nichos regulados |
| **Aviso de privacidade** | Página própria, ajustada ao que o site faz (modelo em `modelos/aviso-de-privacidade.md`). Um aviso genérico, que não descreve o que a empresa faz, é risco em si | Vínculo no rodapé | [todos] |
| **Declaração de acessibilidade** | RATIFICADO (seção 3.3); modelo em `modelos/declaracao-de-acessibilidade.md` | Vínculo no rodapé | [todos] |
| **Fontes hospedadas** | `.woff2` servidos do próprio domínio, por `next/font/local` (`05-tipografia.md`). Fonte carregada de servidor externo envia o IP do visitante para fora do país, sem base legal declarada | — | [todos] |
| **Zero cookie e zero armazenamento** | Nenhum cookie, `localStorage` ou `sessionStorage` no site público (seção 6) | — | [todos] |
| **Nenhum pedido externo** | Política de conteúdo `default-src 'self'`; nada de terceiros: fonte, mapa incorporado, vídeo incorporado, analítica, feed | `next.config.ts` (`13-tecnologia-e-estrutura.md`) | [todos] |
| **HTTPS e cabeçalhos** | SSL ativo, HSTS, COOP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` | Hospedagem e `next.config.ts` | [todos] |
| **Crédito** | "Site por Atlas Digital", em texto, no rodapé | Rodapé | [todos] |
| **Coleta** | O pacote da seção 5 | Formulário, Agenda | [P][C] e módulo |

**As páginas legais não contam no limite de páginas do plano** (RATIFICADO): o aviso de privacidade e a declaração de acessibilidade são obrigação, não conteúdo.

---

## 5. Quando o site coleta: formulário e Agenda

### 5.1 · O mínimo

- **O que se pede:** nome; telefone ou e-mail (um basta); o serviço; o horário (na Agenda); a mensagem (opcional).
- **O que nunca se pede:** CPF, data de nascimento, endereço (salvo entrega), **dado de saúde**.
- **Varia por nicho:** na psicologia, a Agenda pede o mínimo do mínimo, porque marcar com um psicólogo já revela algo da saúde de quem marca (`nichos/psicologia.md`); na advocacia, nenhum módulo.

### 5.2 · O aviso no ponto da coleta

Junto do botão de enviar, uma frase curta e um vínculo, por exemplo: "Usamos estes dados só para responder ao seu pedido. Eles ficam guardados por 12 meses. [Aviso de privacidade]". Sem caixa de consentimento (seção 3.4).

### 5.3 · O prazo de guarda

- **O cliente define e publica o prazo** no aviso de privacidade.
- **Exemplos:** contatos por 12 meses; marcações até 12 meses depois do atendimento.
- **Uma tarefa agendada apaga o que venceu** — no banco e também nas caixas de e-mail que recebem os avisos (`14-funcionalidades/02-formulario.md`; `14-funcionalidades/05-agenda.md`).

### 5.4 · Proteção sem terceiros

Campo-armadilha, carimbo de tempo e limite por IP (`14-funcionalidades/02-formulario.md`). **Nunca reCAPTCHA nem Turnstile**: são pedidos externos e tratam dados do visitante fora do país.

### 5.5 · O cookie de sessão do painel do dono (Agenda)

- **É o único cookie permitido**, e só na área restrita do dono.
- **Atributos:** `HttpOnly; Secure; SameSite=Lax; Path=/painel`, com validade de horas.
- **No aviso de privacidade:** é "estritamente necessário" e não alcança o site público.
- **Sem banner:** cookie estritamente necessário não exige consentimento (Guia Orientativo de Cookies da ANPD, 2022) [FU].

### 5.6 · O contrato de operador

Entre o cliente (controlador) e o Atlas (operador), com:
- o objeto, a duração e a finalidade;
- os tipos de dados e as responsabilidades;
- o aviso dos suboperadores (Hostinger);
- **o aviso de incidente em até 24 horas** (RATIFICADO);
- a ajuda nos pedidos dos titulares;
- **a eliminação no fim do contrato.**

**Depende do CNPJ do Atlas e de advogado.** Sem ele, **o site com coleta não vai ao ar** (porta de publicação, seção 9).

### 5.7 · O relatório de acessos

- **Fonte:** sai do painel da Hostinger, sem cookie no site.
- **Contagem própria:** se um dia vier a contagem no próprio servidor, o IP nunca é gravado (hash diário com sal que se descarta), e a base é o legítimo interesse, declarado no aviso (`14-funcionalidades/04-relatorio-de-acessos.md`).

---

## 6. Cookies e armazenamento

- **Regra.** Nenhum cookie e nenhum `localStorage` ou `sessionStorage` no site público. O que precisa lembrar algo usa a classe na `<html>` e o histórico da navegação, nunca o aparelho do visitante: a entrada uma vez por visita (`09-movimento.md`, seção 5) e o filtro escolhido no endereço.
- **Objetivo.**
  - **Sem banner:** o banner só é exigido com cookie não essencial, e, sem cookie, a página abre limpa.
  - **Argumento de venda:** "zero cookie e zero rastreador" é verdade medida pela régua, não limitação.
  - **Recusados em 12.09.2026** (registro de decisões do Atlas, vigente): o Google Analytics, porque a analítica destrói a vantagem do zero cookie, e as avaliações de clientes no site, porque são inventáveis e vedadas em quatro nichos (`14-funcionalidades/README.md`, seção 4; `14-funcionalidades/06-presenca.md`, seção 5) [V].
- **Se um dia entrar analítica** (só com pedido do cliente e decisão registrada), valem as três exigências do Guia Orientativo da ANPD [FU]:
  - nenhum cookie de terceiro antes do aceite;
  - **recusar com o mesmo destaque de aceitar;**
  - escolha por categoria.

  E o argumento de venda deixa de valer para aquele site.
- **Como conferir.** A régua (bloco 5) lê cookies e armazenamento depois da carga e da rolagem de cada página, sem clicar; deve ser vazio. O que só gravaria depois de uma interação (abrir o menu, usar o montador, enviar o formulário) se pega nos testes de ponta a ponta, que conferem o mesmo depois de cada fluxo (`../qualidade/05-ponta-a-ponta.md`).

---

## 7. Os conselhos profissionais

**A norma de cada nicho está em `nichos/<nicho>.md`, lida na fonte primária.** O quadro abaixo é o resumo para a porta de publicação; quando ele e o documento do nicho divergirem, vale o documento do nicho, e a divergência se corrige.

| Nicho | Norma principal | O site precisa ter | O site não pode ter |
|---|---|---|---|
| Nutrição | CFN 599/2018 (Código de Ética), e a resolução que a sucede (`nichos/nutricao.md`) | Nome e CRN | Corpo de paciente, mesmo com consentimento (art. 58); antes e depois; promessa de resultado; linguagem de emagrecimento |
| Odontologia | CFO-196/2019; Código de Ética Odontológico | Nome, CRO e o responsável técnico da clínica | **Preço** (Código de Ética, art. 44); imagem do procedimento em andamento (CFO-196/2019, art. 3º); superlativo; garantia. **Antes e depois: fora** — a CFO-196/2019 (art. 2º) permite, com termo de consentimento e só pelo dentista que fez o tratamento; a nota do CFO de 16.01.2026 lê a CFO-196/2019 como proibindo a divulgação de resultados por terceiros, inclusive pessoas jurídicas [V]; no consultório, política do Atlas |
| Medicina | CFM 2.336/2023 | Nome, CRM, RQE para especialidade; o diretor técnico do estabelecimento | Promessa de resultado; preço de procedimento (consulta, sim); paciente (política do Atlas, mais restrita que a norma) |
| Psicologia | CFP 010/2005 (Código de Ética); CFP 003/2007, arts. 53 e 54 | Nome e CRP | Preço com moldura promocional (art. 20, "d"); promessa; depoimento; paciente |
| Pet shop | CFMV 1.649/2025, **só se houver veterinário** | Nome e CRMV do responsável técnico | Preço de procedimento que pede avaliação |
| Academia e pilates | CONFEF 307/2015; Lei 9.696/1998 (ou CREFITO, se fisioterapeuta) | CREF do responsável | Aluno identificável; promessa de resultado no corpo |
| Imobiliária | COFECI 1.065/2007; Lei 6.530/1978, art. 20, IV | **O CRECI junto do nome, onde ele aparecer, com no mínimo 25% do tamanho do nome** (arts. 2º e 5º; a leitura de setembro, superada, media contra o `h1`); o número de inscrição em todo anúncio; a data da foto de cada imóvel | — |
| Advocacia | Provimento 205/2021 da OAB; Estatuto da OAB | Razão social com o nome de ao menos um advogado; OAB | **Honorário**, inclusive a gratuidade; comparação; superlativo; foto da estrutura física; captação |
| Construção, oficina, restaurante | CDC | O do Decreto 7.962/2013 (seção 3.1); na oficina, a estimativa marcada como estimativa (seção 3.2) | Promessa falsa; preço sem as despesas adicionais |

**Regras comuns aos conselhos:**
- **Lida na fonte primária, nunca na imprensa setorial**, que já inverteu achados: a leitura de 30.09.2026 dizia que a CFO-196/2019 vedava o antes e depois, e o texto primário diz o contrário.
- **Pedido do cliente que fere a norma:** recusado com o artigo citado e registrado em `decisoes.md`.
- **Conteúdo em português não significa norma brasileira.** Referências estrangeiras e modelos prontos embutem práticas vedadas aqui. O modelo de dentista mais vendido do Webflow tinha três das seis vedações, uma no título.

---

## 8. Domínio e titularidade

- **O registro do domínio** no registro.br exige o CPF ou o CNPJ do titular.
  - **RATIFICADO:** registrar em nome do **cliente**, com o Atlas como contato técnico, e anotar o acesso em `decisoes.md`.
  - **Objetivo:** o nome do negócio é do negócio.
- **O que acontece com o domínio e os arquivos no fim do contrato** está em consulta ao contador (decisão de 02.10.2026). O site do Atlas não promete nada sobre isso até a decisão.

---

## 9. A porta de publicação

Nenhum site de cliente vai ao ar sem todos os itens marcados (etapa 10 de `01-processo.md`). O modelo do relatório está em `../qualidade/modelos/relatorio-de-qa.md`.

**Todo site [cli]**
- [ ] Rodapé com razão social e CNPJ do cliente (ou nome e registro do conselho, seção 3.1), endereço e contato.
- [ ] Registro do conselho no rodapé e no cabeçalho do celular, no corpo exigido (o CRECI com no mínimo 25% do tamanho do nome que ele acompanha).
- [ ] Aviso de privacidade publicado, ajustado ao que o site faz, com a data.
- [ ] Canal com o titular publicado (encarregado, ou o canal do pequeno porte).
- [ ] Símbolo e declaração de acessibilidade (RATIFICADO, seção 3.3).
- [ ] Fontes servidas do próprio domínio, com a licença guardada.
- [ ] Nenhum cookie nem armazenamento no site público (régua, bloco 5).
- [ ] Nenhum pedido externo; política de conteúdo sem violação (régua, bloco 5).
- [ ] HTTPS ativo; cabeçalhos conferidos no endereço publicado.
- [ ] Autorizações de imagem de cada pessoa que aparece.
- [ ] Normas do nicho conferidas no texto final (`nichos/<nicho>.md`; `../qualidade/10-conteudo-normas-e-texto.md`).
- [ ] Preços com o mês de referência e as despesas adicionais (quando há preço).
- [ ] Régua integral aprovada.

**Com formulário ou Agenda [P][C] e módulo**
- [ ] O aviso de privacidade descreve o formulário ou a Agenda, os dados, a finalidade, o prazo de guarda, os suboperadores e o cookie de sessão do painel.
- [ ] O aviso curto no ponto da coleta.
- [ ] A tarefa de eliminação agendada e testada.
- [ ] O contrato de operador assinado (depende do CNPJ do Atlas).
- [ ] O teste de envio e de cancelamento feito **no endereço publicado**.

**Site de exemplo [ex]**
- [ ] Selo de ficção visível em toda página.
- [ ] `noindex` (e `follow: false`) no layout.
- [ ] "Estabelecimento fictício." na descrição de cada página.
- [ ] Nenhuma coleta; WhatsApp fictício.

---

## 10. O que precisa de advogado (e de contador)

| # | Ponto | Por quê | Até o parecer |
|---|---|---|---|
| 1 | O aviso de privacidade-modelo, ajustado a cada cliente | Aviso genérico é risco em si | Usar o modelo e marcar como provisório |
| 2 | A divisão de responsabilidade no contrato e o **contrato de operador** | O operador responde junto (LGPD, art. 42) | Site com coleta não vai ao ar |
| 3 | **Marco Civil, art. 15**: se o dever de guarda de seis meses alcança site de pequena empresa | A janela da Hostinger é de ~7 dias | Nenhuma guarda própria |
| 4 | **Decreto 7.962/2013**: o alcance e o CPF do profissional pessoa física | Exposição do CPF | Nome, registro do conselho e endereço |
| 5 | **LBI, art. 63, § 1º**: a forma do símbolo de acessibilidade | A lei não a especifica | O símbolo da proposta, com a declaração |
| 6 | **Os pontos dos conselhos:** os 25% do CRECI (o texto mede contra o nome; a leitura de setembro, contra o `h1`); a CFO-196/2019 diante do Código de Ética de 2012 [DIV]; o art. 20, "d", da CFP 010/2005; o Provimento 205/2021; a razão social pelo Estatuto da OAB; a transição da norma da nutrição (`nichos/nutricao.md`) | Fontes divergem ou a leitura é de leigo | A leitura cautelosa de cada nicho |
| 7 | A autoria das fotos feitas pelo Atlas (Lei 9.610/1998) | O autor é quem fotografa | Cláusula de licença de uso no contrato |
| 8 | **A ausência de CNPJ do Atlas** | Sem CNPJ não há contrato de operador nem nota | Nenhum site com coleta; o site do Atlas não declara registro |
| 9 | **Contador:** a titularidade do domínio e dos arquivos no fim do contrato | Decisão de 02.10.2026 | Nada prometido no site |
| 10 | **A marcação de horário na saúde** (a Agenda): se marcar uma consulta já revela dado de saúde (LGPD, arts. 5º, II, e 11) | Na psicologia, o nicho já pede o consentimento; nos outros nichos de saúde, a Agenda usa o art. 7º, V | Psicologia: consentimento destacado. Medicina, odontologia e nutrição: art. 7º, V, e nenhum dado de saúde (`14-funcionalidades/05-agenda.md`, seção 12) |

---

## 11. Como conferir

| O quê | Como | Onde |
|---|---|---|
| Cookie, armazenamento, pedido externo, violação da política de conteúdo | Régua, bloco 5, em toda página, depois da carga e da rolagem; os testes de ponta a ponta, depois de cada fluxo | `../qualidade/02-regua.md`; `../qualidade/05-ponta-a-ponta.md` |
| Cabeçalhos de segurança | `curl -sI` no endereço publicado (a régua não lê cabeçalhos) | `../qualidade/09-seguranca-e-privacidade.md` |
| Rodapé, registro, aviso, declaração | Leitura de toda página no celular e na mesa. A régua confere só o vínculo do formulário para o aviso de privacidade e, nos sites de exemplo, o `noindex` e o selo (bloco 9); a presença do rodapé, do registro e da declaração é verificação a acrescentar ao portar a régua | `../qualidade/10-conteudo-normas-e-texto.md` |
| Normas do conselho no texto | A lista de vedações do nicho contra o texto final, frase a frase | `nichos/<nicho>.md` |
| Coleta | O teste de ponta a ponta do formulário e da Agenda, com e sem script, no endereço publicado | `../qualidade/05-ponta-a-ponta.md` |
| Eliminação | A tarefa rodada com dado vencido de teste, e a conferência do banco e da caixa | `../qualidade/09-seguranca-e-privacidade.md` |
