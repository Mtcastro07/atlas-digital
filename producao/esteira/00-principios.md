# 00 · Princípios

> **Para que serve.** Os princípios que valem para todo site do Atlas, de qualquer plano e de qualquer nicho, e que nenhum pedido derruba. São a primeira leitura: quando uma regra dos outros documentos parecer conflitar com um princípio, vale o princípio, e o conflito vai para o registro de decisões.
>
> **Estado.** RATIFICADO em 08.10.2026; a maior parte já era DECIDIDO em ata ou no registro de decisões, indicado em cada item.

Cada princípio traz a **regra**, o **objetivo** (o porquê) e **como conferir**.

---

## 1. Verdade: nada inventado

- **Regra.** O site afirma só o que é verdade e verificável sobre o cliente:
  - nenhum depoimento, avaliação, número de clientes, selo, prêmio ou "anos de experiência" sem fonte do próprio cliente;
  - nenhuma foto de banco de imagens nem imagem gerada por IA (a imagem de IA, vedada desde 12.09.2026; o banco de imagens, pelo contexto de nichos de 30.09.2026);
  - nenhum CNPJ, nota fiscal ou registro que não exista;
  - nenhuma urgência artificial, contador regressivo ou faixa de desconto falsa.
- **Objetivo.** Três razões:
  - **Confiança.** O site é a prova do negócio. Imagem de IA revelada faz a confiança migrar para quem mostra foto real, com mais força em saúde (CHI 2026, n = 43) [V], e conteúdo tido como de IA perde confiança e autenticidade (Raptive, 2025) [FU].
  - **Lei.** O Código de Defesa do Consumidor proíbe a publicidade enganosa (art. 37), e os conselhos vedam a promessa de resultado.
  - **Verdade sobre o produto.** No site de exemplo, imagem sintética mentiria sobre a entrega: o exemplo mostra o padrão que o cliente vai receber.
- **Como conferir.** Cada afirmação do texto tem origem no briefing (`briefing.md`) ou num documento do cliente. A avaliação anti-IA e a leitura do texto procuram afirmações sem fonte (`../qualidade/10-conteudo-normas-e-texto.md`).

## 2. A norma do conselho manda, lida na fonte primária

- **Regra.** Antes de escrever uma linha, lê-se a norma do conselho do nicho (`nichos/<nicho>.md`) **na fonte primária**: resolução, provimento, decreto ou lei, nunca imprensa setorial. O que a norma veda não entra, mesmo a pedido do cliente. O que a norma obriga entra (registro profissional, responsável técnico, CRECI no tamanho mínimo).
- **Objetivo.** O cliente responde no conselho pelo próprio site, e o Atlas responde pela confiança. **Conteúdo em português não significa norma brasileira:** referências de fora (o modelo de dentista mais vendido do Webflow trazia três das seis vedações do conselho, uma no título) embutem práticas proibidas aqui. A imprensa setorial já inverteu achados; a fonte primária não.
- **Como conferir.** A regra aplicada fica registrada no `decisoes.md` do cliente, com o número da norma e o artigo. Leitura que a fonte não resolve vai para o advogado e, até o parecer, aplica-se a leitura mais cautelosa (marca **[DIV]**).

## 3. Privacidade por construção

- **Regra.**
  - **Nenhum pedido externo:** fontes, imagens e scripts saem do próprio domínio, sem rastreador nem analítica de terceiros.
  - **Nada gravado no aparelho do visitante:** nenhum cookie, `localStorage` ou `sessionStorage`. A única exceção é o cookie de sessão da área restrita do dono, no módulo Agenda.
  - **Coleta só pelo formulário declarado**, com o pacote de conformidade inteiro (`17-conformidade-e-normas.md`).
- **Objetivo.**
  - Fonte carregada de outro servidor transmite o IP do visitante para fora do país.
  - Sem cookie não há banner de consentimento: a página abre limpa e o Atlas pode dizer, com verdade, "zero cookie e zero rastreador".
  - Cada coleta cria obrigações da LGPD para o cliente; coletar o mínimo protege os dois lados.
- **Como conferir.** A régua (bloco 5) acusa pedido externo, cookie e armazenamento; a política de conteúdo do navegador (`default-src 'self'`) bloqueia o que escapar e a régua registra a violação.

## 4. Funciona sem script e com movimento reduzido

- **Regra.**
  - **Sem JavaScript**, todo o conteúdo é legível e toda a navegação é alcançável.
  - **Com `prefers-reduced-motion`**, nada se move e nada some.
  - **O que se move sozinho** por mais de 5 segundos tem pausa.
- **Objetivo.** O HTML vem pronto do servidor (Server Components), e o script só acrescenta. Uma parte dos visitantes navega com script bloqueado, com conexão que falha ou com sensibilidade a movimento (vestibular). A pausa é exigência do WCAG 2.2.2.
- **Como conferir.** A régua (bloco 2) carrega cada página sem script e com movimento reduzido e acusa texto invisível e animação sem fim (`../qualidade/02-regua.md`).

## 5. A mesa primeiro, depois o celular; o premium nos dois

- **Regra** (DECIDIDO em 08.10.2026, pedido do usuário: "em todo projeto, a experiência premium do computador seja transmitida tão bem quanto nos celulares, mesmo de forma mais leve... deve ser desktop first focado 100%, e só depois focar 100% no celular, nunca os 2 juntos"):
  1. **Dois passes, nesta ordem, cada um com foco total:**
     - **o passe da mesa** (1440 × 900): a página inteira, desenhada e acabada no computador, no nível dos premiados. A porta dele: as capturas a 1440 px aprovadas, a régua sem falha na mesa e a avaliação anti-IA na mesa;
     - **o passe do celular** (390 × 844): só depois da porta da mesa, a página inteira de novo, agora no celular, com o mesmo foco. A porta dele: as capturas a 390 px aprovadas, a régua inteira (as larguras de toque, o celular deitado, a carga no 4G) e a avaliação anti-IA no celular.
  2. **Nunca os dois juntos.** No passe da mesa, o celular não se julga; no passe do celular, a mesa só se mexe para corrigir defeito. Quem volta à mesa reabre a porta dela.
  3. **O premium chega inteiro ao celular, mais leve no gesto, nunca mais pobre.** "Mais leve" é o gesto que cabe no polegar, não menos bytes: o peso só entra em questão se a página travar (a barreira, abaixo). Cada momento premium da mesa tem a sua versão de toque, escrita no `identidade.md` no começo do passe do celular e construída nele (`09-movimento.md`, seção 11). O celular não é a mesa encolhida (`07-composicao.md`, seção 8): é a mesma marca, com o mesmo capricho, no gesto e no peso do toque.
  4. **No CSS, nada muda:** o Tailwind e a base escrevem sem prefixo o que vale no celular e com `lg:` e `xl:` o que é da mesa. No passe da mesa, o que é da mesa vai com o prefixo; o valor sem prefixo fica para o passe do celular afinar. A ordem é do trabalho, não da folha de estilo.
  5. **Os orçamentos** (`15-desempenho.md`, seção 2):

     | Medida | Limite | Tipo |
     |---|---|---|
     | Script inicial, fontes e página na carga | **Sem teto nos sites de marca** desde 08.10.2026, à noite: a régua mede e relata (no site do Atlas, 180 KB, 90 KB e 1,5 MB) | Medida; no Atlas, teto |
     | CLS (deslocamento de leiaute) | 0,05 | Teto: a régua reprova |
     | **A barreira do travamento**, no aparelho médio (CPU 4×, 4G lento) | Nenhuma tarefa acima de 1 s, na carga ou ao rolar; até 3 s de bloqueio somado; até 10% de quadros lentos na rolagem; a primeira tela em até 10 s | Barreira: a régua reprova |
     | **O ritmo dos quadros** (desde 28.10.2026), no celular médio (CPU 4×) e na mesa | 60 quadros por segundo na rolagem, no menu, na navegação e na figura: ≥ 95% dos quadros em dia e o pior intervalo até 50 ms; o aparelho de entrada (CPU 6×) avisa | Porta: a régua dos quadros reprova, lida em duas sessões |
     | LCP, TBT e INP | Nos sites de marca, sem meta (só medidos); no Atlas, 2,5 s, 300 ms e 200 ms (**o TBT do Atlas não cumpre hoje**: 716 ms de mediana com a CPU 20×) | Nos sites de marca, medida; no Atlas, meta que avisa |

     **Nos sites de marca, o tamanho não importa; importa o design** (decisão de Gabriel Ribeiro Ota Yida (CEO), transmitida pelo usuário em 08.10.2026, à noite: "o tamanho do site não importa, e sim só seu design. Apenas em casos extremos, onde ele ultrapassa uma barreira muito grande e fica travado até mesmo para dispositivos médios"). Nem os bytes nem o tempo de carga reprovam: só a barreira do travamento, quando a página trava até num aparelho médio, e, desde 28.10.2026, o ritmo dos quadros (pedido do usuário: 60 quadros por segundo no site do Atlas e nos sites da esteira; `15-desempenho.md`, seção 2.4). Ela é alta de propósito (cinco a dez vezes o pior site do Atlas na calibração) e não reprova por sorte (`15-desempenho.md`, seção 2). No site do Atlas, os tetos de bytes e a regressão relativa continuam (`15-desempenho.md`, seção 4.4).

     **O peso não corta o design** (08.10.2026, pedido do usuário; os tetos dos sites de marca saíram na mesma noite: "retire limites de tamanho"). O que corta é a experiência: o que pula, o que trava, o que não funciona sem script ou com movimento reduzido (`15-desempenho.md`, seção 1).
- **No site do Atlas,** vale a ordem do `CLAUDE.md` do repositório do Atlas (celular primeiro), que esta regra não muda.
- **Objetivo.** O design premium nasce inteiro onde cabe inteiro, na tela grande, e o celular recebe uma tradução pensada, nem encolhimento nem sobra. Trabalhar os dois ao mesmo tempo divide a atenção: a mesa sai contida para caber no celular, e o celular sai como resto da mesa. O cliente do comércio local continua abrindo o site num Android intermediário, no 4G, na rua: por isso o passe do celular tem o mesmo peso do da mesa, e a experiência nele se mede (a carga no 4G, o aparelho real).
- **Como conferir.** O "Estado" do `CLAUDE.md` do projeto diz em que passe a construção está, e o relatório de QA traz as duas portas, com as capturas de cada uma. A régua mede os bytes, os erros, o CLS e a barreira do travamento no aparelho médio em toda página, e a régua dos quadros, o ritmo dos gestos; o Lighthouse diagnostica a causa quando a barreira reprova (`../qualidade/08-desempenho.md`); o aparelho real fecha a porta da publicação (`../qualidade/08-desempenho.md`, seção 8).

## 6. Acessível por lei

- **Regra.** WCAG 2.2 nível AA em todo site:
  - contraste medido de 4,5:1 (3:1 no texto grande);
  - foco visível em todo controle;
  - teclado completo, sem armadilha;
  - alvo de toque de 44 px;
  - um `h1` que descreve a página;
  - nomes acessíveis e rótulos (`16-acessibilidade.md`).
- **Objetivo.** É obrigação legal (Lei 13.146/2015, art. 63). É também a maior vantagem técnica possível: entre 24 sites do dia do Awwwards amostrados, a acessibilidade foi a nota técnica mais baixa em 18.
- **Como conferir.** A régua (blocos 1, 3 e 4), o axe nos testes de ponta a ponta e o roteiro com leitor de tela (`../qualidade/06-acessibilidade.md`).

## 7. Identidade própria, sem cara de gerado

- **Regra.**
  - **A origem da identidade.** Cada site tem identidade própria, tirada do ofício e da marca do cliente: o material, o vocabulário, o público. A paleta do Atlas nunca vai para o site de cliente.
  - **Uma só ideia ousada, levada a toda a página** (revisto em 09.10.2026; antes, "um elemento memorável por site; o resto, quieto e disciplinado"). A ideia é o mundo da marca (`19-o-padrao-atlas.md`, seção 3), e ela pode ter muitos efeitos, desde que todos saiam da mesma matéria e da mesma luz, como o bronze do Atlas e o latão da barbearia: um sistema, e não efeitos espalhados (M2). Em cada cena, um ponto focal (`07-composicao.md`, seção 4). O freio de antes, lido como "uma peça boa na capa e o resto quieto", deixou os sites de 09.10.2026 chapados (`19-o-padrao-atlas.md`, seção 2).
  - **Avaliação anti-IA.** O site passa por ela antes do rascunho e antes da publicação (`11-anti-ia.md`).
- **Objetivo.** Sites ficaram mais parecidos desde ~2007, sobretudo no leiaute (Goree et al., CHI 2021) [V]. Modelos de linguagem agravam: produzem a resposta mais típica, a "convergência distributiva" que a Anthropic descreve [V]. Um ativo distintivo só vale se for famoso **e** só da marca (Ehrenberg-Bass): um efeito de catálogo, que qualquer concorrente pode ter, não distingue ninguém.
- **Como conferir.** A tabela de achados da avaliação anti-IA, com nenhuma "marca de IA" de peso alto, a página chapada inclusive. A ferramenta de unicidade compara o código de identidade com o dos outros sites do Atlas (`npm run unicidade`), e o teste de unicidade compara o site com os outros clientes do Atlas no mesmo nicho e, no Profissional e no Completo, também com três concorrentes locais (`04-direcao-de-arte.md`, passo 9).

## 8. Cada fato uma vez, em registro impessoal

- **Regra.**
  - **Registro.** Impessoal e moderadamente formal: o calor vem da especificidade, nunca da informalidade.
  - **Repetição.** Cada fato aparece uma vez (a repetição só se admite na chamada para a ação).
  - **Frases.** Mediana de até 14 palavras por período; nenhum período acima de 28.
  - **Vocabulário vedado.** Preço baixo ("barato", "imbatível"), superlativo sem prova, palavras-moldura ("eleve", "transforme") e aforismos em dois tempos ("Não é X. É Y.") (`10-texto-e-conteudo.md`).
- **Objetivo.**
  - **Repetição pesa.** O mesmo fato em três blocos (a barbearia de setembro dizia os trinta anos três vezes) ocupa espaço e soa a enchimento.
  - **Moldura denuncia.** O texto de moldura é uma das marcas mais fortes de texto gerado.
  - **Argumento da ata.** A ata v3.0 (IV.1) fixa a ordem do argumento: padrão de execução, eficiência, preço declarado — nunca preço baixo.
- **Como conferir.** A régua (bloco 10) mede os períodos e o vocabulário; a leitura humana confere a repetição de fatos.

## 9. O plano define o escopo; a qualidade é a mesma

- **Regra.** O plano contratado decide o número de páginas, as funcionalidades, a profundidade da direção de arte e a camada de movimento (`03-planos.md`). **Ele nunca decide a qualidade:** régua, acessibilidade, desempenho, conformidade e anti-IA são iguais nos três.
- **O design premium é de todo plano** (08.10.2026, pedido do usuário: "os sites devem haver o design premium, independente do plano"). O Essencial sai com o mesmo nível de acabamento do Completo, o dos premiados (Awwwards, CSS Design Awards), no computador e no celular:
  - a tipografia escolhida e afinada;
  - a composição com ritmo;
  - a cor e a forma da marca;
  - a fotografia tratada;
  - o detalhe e os estados;
  - o movimento da camada dele, executado no mesmo padrão.

  O plano muda o tamanho e o que o site faz, nunca o capricho. Nos sites de marca, não há teto de peso (`15-desempenho.md`, seção 2.1).

  **O piso do acabamento** (o estudo completo, com o diagnóstico de 09.10.2026 e o método de construção, está em `19-o-padrao-atlas.md`) (DECIDIDO, pedido do usuário em 08.10.2026, à noite, depois de ver o site de exemplo de odontologia: "não está nem um pouco perto de um site premium, como o Atlas ou o da barbearia... retire limites de tamanho, e preze por um site muito bem trabalhado e referência, mantendo a identidade. Isso até mesmo para outras categorias, mas respeitando a hierarquia. Senti falta de efeitos e derivados"). Todo site de marca, em todo plano e em todo nicho, tem as sete camadas, cada uma na medida do plano (`03-planos.md`) e na identidade da marca:
  1. **O momento de exibição na capa:** o título em escala de cartaz, comprometido. A razão entre o título e o corpo, na mesa, é de 5 ou mais (a exibição plena) ou de 4 ou mais (a exibição serena, dos nichos de saúde e de escuta: peso leve, entrelinha aberta, poucas palavras, muito ar) (`05-tipografia.md`, seção 6.3).
  2. **A matéria:** a superfície tem o material da identidade (o latão, o couro, a cerâmica, o papel, o concreto, o vidro), em textura, grão, relevo ou reflexo. O fundo liso com borda fina, sozinho, em todas as seções, é a página chapada (`11-anti-ia.md`, seção 5.10).
  3. **A luz e a profundidade:** a luz da marca (o halo, o reflexo, o brilho do material, a sombra longa) e planos que se sobrepõem.
  4. **A imagem forte em cada página de decisão:** a fotografia tratada; onde ela não é possível (o exemplo fictício de saúde), a imagem construída: o objeto do ofício em 3D ou em CSS 3D com a matéria da marca, o estudo de material, a tipografia como imagem. O diagrama de traço é função, nunca a única imagem da capa.
  5. **Os efeitos da identidade:** os efeitos que saem da matéria da marca, feitos para ela, e não tirados de um catálogo (`09-movimento.md`, seção 12). As referências são o site do Atlas e o da barbearia.
  6. **O movimento orquestrado da camada do plano:** a capa entra como um momento composto, e não como um esmaecimento. Cada camada do plano vem inteira (`09-movimento.md`, seção 4).
  7. **O detalhe:** os estados, a seleção, o cursor, o sublinhado, os numerais, as marcações, o rodapé com a assinatura da marca.

  **O teste da vitrine (a porta do acabamento).** Na porta de cada passe (seção 5), a capa e uma página interna, a 1440 px e depois a 390 px, ficam lado a lado com o site do Atlas e com o site de exemplo do mesmo plano: a nutrição no Essencial, o depósito no Profissional e a barbearia no Completo (`../referencias/sites-de-exemplo/`). O site mais pobre que a referência do seu plano não passa, por mais correto que esteja. Quem julga é o sócio de desenvolvimento, e o veredito vai ao relatório de QA.

  **O efeito é da marca, nunca do catálogo.** Os acordos anti-IA valem por inteiro em todo plano: a avaliação anti-IA, sem marca de peso alto no ponto de decisão (`11-anti-ia.md`); as Diretrizes de Design Premium (seção 14); o componente do Spell UI como gesto da marca, um por site (`09-movimento.md`, seção 6). O que separa o efeito premium do efeito de IA é a origem, o motivo e o lugar, não a quantidade: o halo de bronze do Atlas e o latão em relevo da barbearia saem da matéria da marca e respondem à mão; o brilho igual em todo botão sai do catálogo. Dentro do site, nenhum efeito se aplica em série: cada um fica onde é o momento (DECIDIDO em 14.10.2026, `20-repeticao-dentro-do-site.md`). **A ausência de acabamento também reprova:** o site chapado (o título pequeno, o fundo liso, o diagrama de traço, nada que responda) é a outra cara do modelo pronto (`11-anti-ia.md`, seção 5.10).

  **A hierarquia continua, e se vê** (pedido do usuário no mesmo dia: "mesmo que todos tenham gosto de premium, ainda se deve haver diferenças entre hierarquias"). O premium é o piso dos três, e cada degrau acima acrescenta, sem que o de baixo pareça inacabado:
  - **a profundidade da identidade:** o sistema do nicho afinado à marca (Essencial), a identidade própria com painéis de estilo (Profissional), a identidade própria com a peça-assinatura do ofício (Completo);
  - **a camada de movimento:** a revelação e as transições; mais a resposta à ação, o estado ao vivo, a galeria e o vidro; mais o ambiente, a assinatura e o 3D nas cinco condições (`09-movimento.md`);
  - **o que o site faz:** ser encontrado e chamado; ser escolhido (formulário, galeria, uma funcionalidade do ofício); trabalhar pelo negócio (duas funcionalidades, as páginas de busca);
  - **o tamanho e a fotografia:** até três páginas com as fotos do cliente; até seis com a sessão guiada; sem limite, com a sessão ampliada e o vídeo.

  O Essencial premium é um site pequeno, rico e impecável, com as sete camadas do piso; o Completo premium é um site grande, com a assinatura, a cena e o 3D que o distinguem. Um gesto de um degrau acima, num degrau abaixo, segue vedado: apaga a diferença que o cliente compra ao subir.
- **Objetivo.** O Essencial é um site pequeno e acabado, não um site grande pela metade. Um gesto de um plano acima, num plano abaixo, apaga a diferença entre os planos — e a diferença é o que o cliente compra ao subir de plano.
- **Como conferir.** O teste da vitrine, na porta de cada passe, e as sete camadas no `identidade.md` ("O acabamento"). A conferência do escopo, no aceite (`../qualidade/14-ciclo-de-qa.md`), compara o site com a seção do plano em `03-planos.md`.

## 10. Medido, não estimado

- **Regra.** Toda afirmação de qualidade vem de uma medição: régua, Lighthouse, leitor de tela, captura. A medição é feita contra o build de produção (`npm run build && npm start`), nunca contra o servidor de desenvolvimento.
- **Regra de calibração.** Porta que acusa o que não é defeito volta a ser aviso até ser corrigida. **Antes de acusar defeito, verifica-se o instrumento.** Em setembro, uma sonda acusou 207 componentes invisíveis porque rolava a página mais rápido que um polegar; em outubro, a régua nova precisou de onze ajustes de calibração antes de valer (`../qualidade/02-regua.md`, seção 6).
- **Objetivo.** Porta que dispara à toa ensina a ignorar portas, e "está bom" sem medida é opinião.
- **Como conferir.** O relatório de QA cita a medida, a ferramenta e a data (`../qualidade/modelos/relatorio-de-qa.md`).

## 11. Simples e compreensível

- **Regra.**
  - **Código.** Server Components por padrão, script só onde há estado, nenhuma abstração antes de três usos, nenhuma dependência sem pedido explícito.
  - **Comentários.** Explicam o porquê, não o histórico: o histórico vai no registro de decisões e nos commits.
- **Objetivo.** O site é mantido por anos, por pessoas e agentes diferentes, e cada dependência é superfície de ataque e de quebra. Em dezembro de 2025, uma falha de nota 10 no React exigiu atualização imediata em todo site com servidor.
- **Como conferir.** A revisão de código e as regras de lint da casa (`../qualidade/03-estatica.md`).

## 12. Toda decisão registrada, com a razão

- **Regra.** Cada escolha que não é óbvia vai para o `decisoes.md` do cliente, com data, razão e o que ela revoga; cada defeito que reaparece vira regra nesta esteira:
  - a fonte escolhida e a licença;
  - a leitura da norma;
  - a exceção a uma regra;
  - o pedido do cliente fora do escopo.
- **Objetivo.** Regra sem motivo escrito é revogada por conveniência em seis meses. O registro é o que permite a outro sócio, ou a outra sessão do Claude Code, continuar o trabalho sem refazer o caminho.
- **Como conferir.** O `decisoes.md` existe, está datado e cita a fonte de cada decisão.

## 13. O repositório não muda sem pedido

- **Regra.** Commit, push, dependência nova e publicação só com pedido explícito. Documentos da sociedade (atas, contratos) só se leem, salvo pedido.
- **Objetivo.** O repositório é compartilhado entre os sócios e publica sozinho na Hostinger. Uma mudança enviada sem pedido vai ao ar sem ninguém ter visto.
- **Como conferir.** O `CLAUDE.md` do repositório repete esta regra (`modelos/claude-do-projeto.md`).

---

## 14. As Diretrizes de Design Premium valem em toda interface

- **Regra.** Quatro regras do usuário valem para toda interface do Atlas, de qualquer plano e de qualquer nicho (ata v3.0, V.1, acréscimo de 03.10.2026, ratificado em 08.10.2026; texto integral em `modelos/claude-do-projeto.md`):
  1. **Uma fonte sans-serif limpa,** numa escala rigorosa, sem misturar fontes sem propósito. No site do Atlas, San Francisco e Inter; nos sites de marca, a fonte da identidade, em até duas famílias com papéis distintos (`05-tipografia.md`, seções 2.1 e 2.2).
  2. **Espaço na escala do Tailwind,** em múltiplos de 4 px e sem colchetes (`07-composicao.md`, seção 3).
  3. **Fundos limpos, bordas sutis, nenhum degradê decorativo novo e nenhuma sombra pesada.** O slate do texto da regra não entra: a paleta é a da marca, e os efeitos de identidade decididos ficam (`06-cor-forma-e-superficie.md`, seções 7 a 9).
  4. **Estados em todo controle:** hover, foco visível, desabilitado e esqueleto no que carrega tarde (`16-acessibilidade.md`, seções 3.3, 3.4 e 3.11).
- **Objetivo.** Evitar a interface genérica (o "UI slop"). O Atlas vende um padrão de execução (ata v3.0, IV.1), e fonte por omissão, espaço sem ritmo e controle sem estado são marcas de página gerada (`11-anti-ia.md`, marcas T4 e D2; `07-composicao.md`, seção 3). As regras 2 e 4 valem por inteiro nos sites de cliente e de exemplo; nas regras 1 e 3, vale a identidade da marca.
- **Como conferir.** A lista de revisão de 22 itens (`../qualidade/11-design-e-anti-ia.md`, seção 5) e, ao aplicar as regras a um site que já existe, a auditoria regra a regra (`../qualidade/11-design-e-anti-ia.md`, seção 10).
