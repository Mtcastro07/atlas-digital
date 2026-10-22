# Relatório · o Atlas Digital (17 e 18.10.2026)

Pedido de Matheus Castro Oliveira de Luna Garcia, que aprova os sites, em 17.10.2026 (resumido; as palavras entre aspas são as dele):
- o site estava "muito puxado para o lado do globo, do atlas"; o pedido é "a pegada digital", "o que formaria de fato o atlas digital";
- mais animações passivas, "como o globo girando", "números mudando";
- a fonte combinada fica (Archivo Black, Archivo 300–500, Inter 400–700);
- bordas mais arredondadas e cores de texto mais uniformes;
- O trabalho e Orçamento menos simples; no celular, nada de "textos jogados";
- o "Recomendado" dentro do plano Profissional e do botão dele, sobretudo no celular;
- em todos os planos, o preço cortado e, ao lado, o novo pela metade; sem a "mensalidade congelada";
- o simulador só na mesa;
- toda página abre no topo;
- "Foque primeiro no desktop, 100%, depois o mesmo no celular."
- Depois do primeiro estudo: "Não quero algo que tenha timidez... Não quero algo raso, e sim algo completo, para ser metade da identificação, não apenas detalhes."
- "Ao final de tudo, faça o commit, push e merge com a main."

Em 18.10.2026, dois pedidos a mais:
> "O globo que está posicionado dentro da página principal, na versão do celular, está estranho, quero que você diminua ou ajuste o ângulo para ficar mais harmônico. Também quero que você veja sobre o modelo 3D na página de odontologia para mobile, pois está travando dentro do scroll."

Este é o relatório desse lote. O anterior segue em `atlas--relatorio--2026-10-17-identidade-e-celular.md`. Os sites de demonstração não mudaram, salvo o desempenho da arcada 3D da odontologia no celular, por pedido expresso (seção 6). O SEO e o GEO continuam intactos. O site continua com 0 cookies e sem rastreadores.

**Como foi feito:**
1. **O estudo:** o primeiro desenho, "a carta eletrônica". Ele escondia o digital em 12 px, e o pedido de 17.10 ("não quero algo que tenha timidez") o descartou.
2. **A pesquisa:** cinco frentes (seção 1).
3. **A direção:** três propostas concorrentes, três juízes e uma direção final com esboço (seção 2).
4. **A construção da mesa:** 33 agentes, cada peça construída, revista por um agente novo e corrigida (seção 3).
5. **O passe do celular:** 29 agentes, no mesmo ciclo, mais um passe de costuras entre as peças (seção 4).
6. **A odontologia:** diagnóstico, correção e verificação adversarial (seção 6).
7. **O fechamento no build de produção:**
   - a régua, as conferências, o Impeccable A e B e o teste do desconhecido;
   - a síntese, quatro corretores e os registros no kit;
   - um segundo build e a verificação final (seções 7 e 8).

---

## 1. O estudo e a pesquisa

**O diagnóstico.** A identidade de 16.10 ("o Atlas é um atlas") era só metade do nome. A esfera de arame girava sem medir nada. O "digital" aparecia em leituras de 12 px no pé da capa. As páginas internas eram texto em papel.

**A pesquisa**, em cinco frentes, com capturas e medidas no rascunho da sessão:
- **R1:** os vencedores do Awwwards no recorte "analógico com digital";
- **R2:** as marcas de tecnologia que tratam o dado como matéria;
- **R3:** a passagem da gravura ao ponto de tela (o meio-tom, a retícula, a carta eletrônica náutica);
- **R4:** o movimento vivo, isto é, o que se move porque mede, e não por enfeite;
- **R5:** as restrições do site e o inventário do que já existia.

A regra que saiu da pesquisa: **o que se move tem de medir algo verdadeiro.** É o K6 e o M4 do kit anti-IA. Esse é o limite entre "o globo girando" e o efeito de modelo.

## 2. A direção: "A gravura que vira dado"

Houve três propostas (P1, P2 e P3) e três juízes:
- J1, a identidade e a fusão;
- J2, o ofício e o anti-IA;
- J3, a viabilidade e a verdade.

**A base é a P2.** Dois dos três juízes a escolheram. A soma ponderada deu P2 164,25, P3 153 e P1 134,5. Ela foi a única em que o digital não pode ser tirado sem desmontar o desenho, o que responde ao "metade da identificação". Os defeitos que levaram o J3 à P3 viraram cortes. Da P3 entraram as regras de engenharia: o SVG gerado uma vez, a escala gráfica e a regra da janela.

**A tese:** cada desenho existe em dois estados, o traço gravado (o atlas) e o ponto de tela (o digital). A fronteira entre os dois é sempre um dado verdadeiro: o crepúsculo de agora, o prazo a partir de agora, a carga desta visita, o Sol sobre Niterói.

**O sistema:**
- **A tela:** recortada no papel, com raio de 40 px na mesa e 28 no celular, e margem de 12 e 8 px. Os instrumentos têm raio de 24/20 px, e as fichas, de 12 px. É o pedido de bordas mais arredondadas.
- **O texto em três tintas:** a tinta, o apagado e o bronze, este só no que se toca. No papel claro, o apagado é #44566b. É o pedido de cores mais uniformes.
- **A letra:** a mesma combinação de antes. Todo número e preço vai em Archivo Black, com caixa de largura fixa quando muda.
- **O relógio comum:** todo laço passa por `aoVivo` (`lib/ambiente.ts`). Ele para com o botão de pausa, fora da tela e com o movimento reduzido.
- **Os dados de verdade:**
  - a posição do Sol pela NOAA (`lib/sol.ts`);
  - os feriados nacionais de 2026 e 2027 (`lib/prazo.ts`);
  - a Terra do Natural Earth 1:110m (`public/dados/terra-05.bin`, 32 KB);
  - as ruas de Niterói do OpenStreetMap, com o crédito da ODbL (`public/dados/ruas-niteroi.svg`, 40 KB).

**A decisão 8, tomada no meio da construção:** o número calculado é chapado em todo o site. No primeiro teste do desconhecido, os três leitores leram o número em meio-tom como "painel de LED de rodoviária". A reserva chapada substituiu o meio-tom. A troca de algarismo continua em dissolução Bayer, de 220 ms, só na casa que muda.

## 3. Página por página (a mesa)

- **Início:**
  - **A capa** é uma tela assimétrica. À direita, a Terra em dois estados: o dia em gravura de bronze, pela incidência real do Sol, e a noite em pontos, separados pelo crepúsculo de agora. Ela gira, com o giro acelerado declarado na legenda, dentro de uma esfera armilar com o anel das horas solares e Niterói marcada.
  - **O mostrador do prazo:** "Se o briefing completo fechar agora, o rascunho chega até…", com a data e a hora contadas deste aparelho.
  - **Os destaques:** a chapa da carga desta visita, um traço por arquivo sobre a régua de milissegundos, e o "0 pedidos a outros domínios".
  - **A carta do prazo:** 24 dias reais, com um ponto a cada 20 minutos de Sol. Os fins de semana e os feriados vão em hachura. O rumo vai do briefing à publicação.
  - **O montador:** em ficha de papel, com o total chapado.
  - **As portas:** levam o caminho desta visita (traço para a página vista, ponto para a não vista), guardado só na memória da navegação.
  - **O Fim:** o próximo amanhecer em Niterói, calculado.
- **/para-quem:** a carta eletrônica de Niterói.
  - As ruas do OSM em gravura; uma lente que as converte em pontos.
  - As réguas de minutos de arco, a escala gráfica e as teclas "Gravura / Pontos / Graus".
  - Os bairros na borda. Os 11 nichos, com o símbolo cheio nos que têm site de exemplo.
  - As cotas da vitrine.
- **/planos:**
  - **A escada em dois estados,** em escala exata. A metade de baixo é o que se paga, chapada. A de cima, em pontos, traz o valor cheio riscado.
  - **A tabela,** com o preço cortado e a metade ao lado em todos os planos. O "Recomendado" fica dentro da coluna e do botão do Profissional.
  - **Removidos:** a mensalidade congelada e a moldura de navegador do simulador.
- **/orcamento:**
  - **A conta:** o plano pela metade em traço e cada módulo em pontos, um ponto por R$ 10.
  - **A carta dos pagamentos:** 13 meses reais, com a janela da publicação e os feriados.
  - **"Preparar mensagem"** grava a conta em traço e abre o WhatsApp.
- **/o-trabalho:**
  - **A folha das 72 horas,** de 20 em 20 minutos, com a noite real de Niterói. O marcador do briefing se arrasta, e a leitura presa a ele é chapada.
  - **As etapas:** numa faixa só.
- **/o-atlas:** a projeção. O globo se desenrola da ortográfica à equirretangular, numa grade de um grau por casa. A leitura sob o ponteiro dá a latitude, a longitude e se a casa é terra ou mar.
- **/duvidas:** a rosa do Sol. A metade voltada para o Sol de agora vai em bronze, a outra em pontos. À noite, a rosa inteira vira pontos, com a marca do nascer.
- **Em todo o site:**
  - **A pausa:** o botão no cabeçalho para tudo, inclusive o globo do logotipo, desde 18.10.
  - **O topo:** toda página abre nele (`components/ilhas/ao-topo.tsx`).
  - **O simulador:** só na mesa. Abaixo de 1024 px, ou sem ponteiro fino, o vínculo abre o site de exemplo numa aba nova (`components/ilhas/simulador.tsx`).

## 4. O celular

O mesmo sistema, redesenhado para 390 px, nunca encolhido. Cada peça foi:
- construída por um agente;
- revista por um agente novo, a 390, 360, 320, 768, deitado e 1440, às 10:00, 17:50 e 22:00, com a pausa, o movimento reduzido e a letra a 200%;
- corrigida pelo dono.

**O globo do início (o pedido de 18.10).** Foram desenhadas três variantes, capturadas às três horas:
- **A:** 72% da largura, vista a 23,44° abaixo do equador;
- **B:** 80% da largura, vista a 16°;
- **C:** 88% da largura, vista de cima.

**A escolhida foi a A:**
- **O tamanho:** o raio passou de 60% para 36% da largura (de 234 px para 135 px a 390). A Terra fica centrada, 40 px abaixo do texto. Nenhum texto cai dentro do anel, em nenhuma largura nem hora.
- **O ângulo:** de 16° para 23,44° abaixo do equador, que é a obliquidade da Terra e a latitude do Trópico de Capricórnio, a 0,56° de Niterói. O anel das horas e o equador abrem em elipses de 0,40 (antes, 0,28, uma fatia quase de perfil).
- **O anel graduado:** continua no papel, em meia-lua. Os rótulos "12 h" e "24 h" cabem inteiros na tela.
- **Por que não B e C:** na B, o anel encostava nas bordas e os rótulos sumiam. Na C, o anel era cortado dos dois lados, e às 22:00 Niterói ficava abaixo do corte.
- **Quando Niterói está do outro lado do globo** (das ~23h40 às ~11h40, e sempre com a pausa ou o movimento reduzido): ela aparece num anel tracejado, com "Niterói / do outro lado". Tocar nele traz o globo até ela.

**As outras peças:**
- **A barra do polegar** (`components/ilhas/barra-do-polegar.tsx`) substitui o atalho flutuante do WhatsApp abaixo de 1024 px.
  - Traz o prazo vivo ("Rascunho até dom. 18/10, 18:28") e a pílula do WhatsApp.
  - Recolhe ao descer e volta ao subir.
  - Some onde a cena já mostra o prazo ou a ação.
- **A carta do prazo:** transposta, com os dias em linhas e o rumo à direita.
- **A chapa da carga:** desenhada para 340 px. Ao lado do aparelho, a legenda numerada dos 10 blocos de verificação.
- **A carta dos pagamentos:** de pé, um mês por coluna.
- **A carta de Niterói:** as teclas dos bairros saem da borda à altura do nó, com fio de chamada. A lente segue o dedo.
- **A projeção:** uma janela de 120° de longitude, do polo ao polo, com a costa legível a 390.
- **A rosa do Sol:** uma rosa própria do celular, e não a da mesa encolhida.
- **As portas:** em galeria, com a rota da visita na fileira.
- **/planos:** a escada sobe na primeira tela, e o fólio passa ao canto do título.

**As costuras entre peças (18.10):**
- **A letra a 200%:** a 320 px, nenhuma página alarga mais. A causa era o índice e o e-mail do rodapé.
- **O fólio solto:** foi para o canto de cima da tela.
- **O respiro de cima:** igual ao da capa, 104 px.
- **A ação do cabeçalho e do menu:** some na página a que leva.
- **A pausa:**
  - para também o pulso das imagens que carregam, o trilho das galerias e o giro do globo do logotipo;
  - o pulso passou a ser de opacidade, cancelado quando a imagem chega;
  - a linha principal de /planos parada a 390, com a CPU 4×, caiu de 7,5–18,6% para 0,0–1,8%.

## 5. O kit e as ferramentas

- **Ferramentas novas:**
  - `ferramentas/custo.mjs`: a maior tarefa, o bloqueio, a linha ocupada parada e os quadros lentos, com a CPU 4×;
  - `ferramentas/regua/medir-metade.mjs`: a área de tela por página;
  - `ferramentas/gerar-mascara-da-terra.mjs` e `ferramentas/gerar-ruas.mjs`: os dados, gerados uma vez.
- **A conferência da pausa** (`producao/ferramentas/conferir-pausa.mjs`): passou a medir pela diferença de pixels.
- **O contraste** (`ferramentas/regua/contraste.mjs`): mede a cor desenhada do texto em figura.
- **Os registros do fechamento:**
  - `producao/qualidade/15-revisao-do-impeccable.md`, seção 7;
  - `producao/esteira/11-anti-ia.md`, com a marca nova X9, "a prova em jargão de ofício";
  - `registros/atlas/decisoes.md`, com o mapa de convergência inteiro.
- **As referências velhas, corrigidas:** a do pulso das imagens, nos documentos 08 e 03-galeria do kit, e a da régua (`02-regua.md`).

## 6. A odontologia: a arcada 3D que travava na rolagem

**O diagnóstico,** em duas hipóteses:
- A primeira correção baixava a densidade durante a rolagem pelo toque (60%, num buffer fora da tela).
- O verificador adversarial a refutou: o desenho custa menos de 1 ms por quadro num M2. A causa mais forte era o canvas fixo, reposicionado pela linha principal a cada quadro, enquanto o compositor rolava a página.

**A correção** (`components/ilhas/demos/odontologia/arcada-3d/motor.ts` e `app/demos/odontologia/odontologia.css`):
- **Onde vale:** só no celular (ponteiro grosso, abaixo de 1024 px, no modo ancorado).
- **O que muda:** o canvas passa a `position: absolute`, com `data-rola`, e é movido por `translate` a cada quadro. Assim ele rola com a página, no compositor.
- **A mesa:** ficou idêntica. O hash dos pixels lidos no SwiftShader é igual em 7 de 7 cenas.
- **A arcada:** continua a mesma; só o desempenho mudou.

**Não verificado:**
- um telefone real e o Safari do iOS;
- um deslocamento de 12 a 17 px, por um quadro, nas transições do trecho preso.

## 7. O fechamento no build de produção

Contra o primeiro build de produção (`npm run build`, servido localmente):

**A régua:** 4 falhas em 50 páginas.
- Só uma era do Atlas: o script inicial de /planos, com 180,6 KB, contra o teto de 180.
- As outras três eram da demo do depósito e não se repetiram sozinhas.

**As conferências:**
- **A pausa:** zera o movimento nas sete páginas, a 1440 e a 390.
- **O texto do robô:** achou 17 palavras coladas, em /para-quem, /orcamento e /duvidas.
- **O SEO e o GEO:** intactos.
- **A privacidade:** nenhum Set-Cookie e nenhum pedido a terceiros.
- **O topo:** toda página abriu nele, em 72 navegações.
- **O custo:** dentro da barreira em todas as páginas.

**O Impeccable,** a 1440 e a 390:
- **As notas:** Nielsen 25/36, "Aceitável, no limite do Bom"; a auditoria, 16/20.
- **O detector:**
  - no código, de 4 achados para 2;
  - nas páginas, de 75 para 68 a 1440 e de 79 para 73 a 390;
  - os achados reais foram 8 e 6.

**O teste do desconhecido:** três leitores, só com as capturas, sem o texto ao redor.
- **Acertaram:**
  - o que é o site e o que se pode fazer nele;
  - a Terra, a chapa da carga, a carta do prazo, a escada e a folha das 72 h.
- **Erraram, com peso alto:** a conta de /orcamento ("barra de progresso?").
- **Acertaram em parte ou por palpite:** a carta de Niterói, a projeção e a rosa.
- **A impressão:** "meticuloso" e "caprichado", mas também "relatório de engenheiro".
- **Ressalva:** os leitores foram agentes, e não pessoas. O kit exige uma pessoa real (seção 10).

**As correções**, em quatro grupos de arquivos disjuntos:
1. **O peso:** as páginas internas não baixam mais o pedaço do início. O `PeDaPorta` foi para `components/ilhas/pe-da-porta.tsx`.
2. **A legenda da Terra:** ganhou a frase do anel das horas. As teclas Início e Fim agora funcionam no globo.
3. **A conta de /orcamento:** ganhou os rótulos dentro do desenho (o nome, o valor e o estado de cada trecho). A lista dos módulos subiu para logo abaixo das pílulas. As palavras coladas do robô foram separadas.
4. **A esfera de /o-atlas no celular:** cabe inteira na largura, sem o corte em duas retas. O toque agora atualiza o leitor de tela.
5. **As folhas de estilo:**
   - em cores forçadas, as teclas de camada, os seletores e a tecla Esfera/Grade passaram a mostrar o estado pelo realce do sistema;
   - as legendas ficam em 54ch, com no máximo 80 caracteres por linha;
   - a leitura de /para-quem ganhou o halo de carta;
   - a tinta do cabeçalho claro passou a #44566b.

## 8. A verificação final (o segundo e o terceiro build)

Contra o segundo build, com todas as correções, três agentes novos:

**As conferências:**
- **A régua:** aprova nas 50 páginas, com 0 falhas e 117 avisos. Antes eram 4 falhas.
- **O script inicial:** de 146,5 a 176,2 KB por página, contra o teto de 180.
  - /planos caiu de 180,6 para 157,4 KB.
  - O início subiu de 172,0 para 176,2 KB e é o mais perto do teto.
- **O texto do robô:** 0 palavras coladas nas sete páginas do Atlas; antes eram 17.
- **A pausa:** com o botão, 0 px nas sete páginas, a 1440 e a 390.
- **O SEO e o GEO:** intactos, nenhum cookie e 0 pedidos a terceiros.
- **O topo:** 72 de 72 navegações chegaram nele.
- **O console:** nenhum erro nem aviso de hidratação.

**A revisão adversarial das correções:** confirmou cada uma, com medida. Achou dois defeitos novos:
- **P2:** na conta, com a letra a 150% e a 200%, os rótulos se sobrepunham em 28 combinações de largura e escolha.
- **P3:** a frase "o anel marca a hora solar" deixava dúvida, porque a figura tem dois anéis.

**O reteste do desconhecido:**
- **A conta:** os três agora a leem certo: "a conta do orçamento, com o plano e os extras; o que está em traço entra, o que está em ponto ficou de fora". Antes, os três diziam "não sei".
- **O anel das horas:** continua lido só como "um relógio de 24 horas", sem saber o que mede. A legenda, que explica, não estava no recorte.

**A última correção**, com revisão de um agente novo:
- **Os rótulos da conta:** passaram a ser dispostos por busca entre as disposições possíveis. Na matriz de 12 escolhas, 7 larguras e 4 tamanhos de letra, nenhum rótulo cobre outro, nenhum sai do desenho e cada fio chega ao seu.
- **A carga:** nada pula na carga da conta (CLS 0).
- **O estado do plano:** passou de "pela metade" para "50% de desconto (fundação)".
- **A ordem do HTML na mesa:** segue a ordem visual.
- **A legenda:** passou a dizer "o anel das horas" e não passa de 80 caracteres por linha em nenhuma largura.

**O terceiro build,** o que vai para a main:
- **A régua nas sete páginas do Atlas:** aprova, com 0 falhas e 30 avisos.
- **O texto do robô:** 0 palavras coladas no Atlas.
- **O script inicial:** de 146,5 KB (/para-quem) a 176,6 KB (o início).
- **A pausa:** 0 px no início e em /orcamento, a 1440 e a 390.
- **Os testes:** 81 de 81.
- **O `tsc`:** sem erros.

## 9. O que fica com o aprovador

Para Matheus Castro Oliveira de Luna Garcia. Cada item muda o mundo aprovado, o texto vinculante ou uma decisão de sócio, e por isso nenhum foi aplicado sem a decisão dele.

**As decisões tomadas por omissão, para confirmar ou reverter:**
1. **O rascunho no domingo.** Foi mantida a contagem em 24 horas corridas: a capa mostra "dom." quando o briefing fecha no sábado.
2. **A capa assimétrica,** no lugar da centrada.
3. **O crepúsculo calculado** no lugar da madrugada fixa.
4. **O halo, o reflexo do Fim e a onda do "24h"** ficaram, a pedido anterior.
5. **O envelope da página** ficou como estava.
6. **O custo do primeiro ano** não foi mostrado em /planos.
7. **O giro da Terra** é acelerado 720× e declarado na legenda.
8. **O número calculado** é chapado em todo o site (decisão 8), pelo teste do desconhecido.
9. **O globo do celular** ficou na variante A. As três variantes estão capturadas no rascunho da sessão.
10. **O anel tracejado "Niterói / do outro lado"** é um elemento novo, também na mesa.

**Do fechamento:**
1. **A promessa "Sua empresa online em 24h".** Dois dos três leitores a acharam maior que a real, porque a publicação leva de 7 a 15 dias úteis.
2. **A cidade e o "briefing" na primeira tela.** Niterói só aparece no rótulo do globo, e nenhum leitor sabia o que é "briefing". O lide é texto vinculante.
3. **A dissolução do segundo no mostrador.** Os três leitores leram o algarismo em troca como "quebrado". Uma alternativa é trocar o segundo sem dissolução.
4. **A "metade da identificação" medida.**
   - Pela área de tela, a maioria das páginas fica entre 20% e 32%, abaixo da faixa de 40 a 60% da direção.
   - Só /o-trabalho e /duvidas, na mesa, passam.
   - A primeira tela fica entre 95% e 98% em cinco páginas.
   - A decisão: o critério passa a ser a primeira tela, ou as páginas ganham telas?
5. **/o-trabalho.** A avaliação A pede tirar os parágrafos corridos de dentro do instrumento. A medida da metade aponta o contrário.
6. **O jargão.** A chapa da carga e os "10 blocos" foram lidos como "coisa de programador". Uma alternativa é trocar os rótulos e os KB por palavras de quem tem comércio.
7. **O preço cheio "R$ 900 a R$ 2.400".** Ele aparece nas portas, na equação de /orcamento e no rodapé. O rodapé é a description do JSON-LD.
8. **"Nutrição, direito, odontologia".** A lista dos 11 nichos não tem Direito.
9. **O "Recomendado" duas vezes** na coluna do Profissional, na mesa.
10. **As portas:** seis cartões iguais, com número de destaque.
11. **A pausa com movimento reduzido.** Com movimento reduzido, a hora e o Sol trocam de minuto em minuto, de uma vez. A conferência da pausa reprova isso; o código diz que trocar o texto não é movimento. A rosa de /duvidas, porém, redesenha a figura.
12. **As páginas internas** não mudam nada em 3 segundos. O pedido era "números mudando", e a direção ficou na troca de minuto.
13. **A lente de /para-quem, a projeção e a rosa.** Os leitores não souberam o que elas medem. Há duas saídas:
    - registrá-las como figuras de narrativa, com a leitura na legenda;
    - para a rosa, dar a letra O ao lado aceso da tarde, que hoje sai cortado.
14. **"Gabriel Yida"** no llms.txt e no JSON-LD, e não o nome completo, Gabriel Ribeiro Ota Yida. Não mudei.
15. **O retrato de Matheus Azevedo Abreu** é uma selfie. Trocar pede foto nova, que está vedada.
16. **Detalhes da mesa:**
    - o título de /o-trabalho em uma linha;
    - a composição de /para-quem e a legenda encurtada;
    - a barra do quadro do simulador;
    - a moldura de 40 px por minuto de arco;
    - o disco do Sol no Fim;
    - o fio do carimbo em bronze;
    - a legenda da visita no início, em linha única de 126 caracteres na mesa.
17. **Detalhes do celular:**
    - a barra do polegar só aparece ao subir, e fica em largura inteira a 768;
    - a faixa das etapas de /o-trabalho fica sem a barra;
    - a metade direita da capa a 768 em pé fica vazia;
    - sobram cerca de 121 px acima e abaixo da esfera de /o-atlas a 390;
    - em /planos, os celulares baixos não mostram nenhum preço na primeira tela;
    - a frase "As chaves, de cima para baixo" e os dez textos dos blocos dos destaques são redação nova;
    - no reteste, dois dos três leitores acharam que o anel graduado, que atravessa da tela para o papel, "vazou".

## 10. O que não foi verificado

- **O teste do desconhecido com pessoas reais.** As leituras deste relatório são de agentes que viram só as capturas. O kit exige uma pessoa de fora (`producao/qualidade/11-design-e-anti-ia.md`, seção 4).
- **Os aparelhos e as telas:** o aparelho real, o Safari do iOS, as telas OLED e a densidade 1.
  - O anel das horas do celular é achatado por CSS num `<g>` de SVG, e o rótulo tracejado usa `setLineDash`. Os dois só foram vistos no Chrome.
  - A arcada da odontologia não foi vista num telefone real.
- **A forma nova da conta de /orcamento,** com os rótulos dispostos por busca, não foi relida por leitores de fora.
- **A carta dos pagamentos** muda de altura na carga, fora da tela (o CLS medido é 0). Já era assim antes deste lote.
- **O alto contraste real do Windows:** só a emulação de cores forçadas do Chrome.
- **Um leitor de tela real:** só a árvore de acessibilidade do Chrome.
- **A medida limpa do custo do início na mesa:** a linha ocupada parada ficou entre 6,5% e 7,9%, contra a meta de 6%. As medidas foram feitas com a máquina carregada por outros agentes.
- **O texto do robô sai com código 1** por causa de 43 palavras coladas na demo de odontologia. Elas são anteriores, e as demos não mudam.
