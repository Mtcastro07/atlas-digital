# Mapa do projeto · Odontologia Boa Viagem · atualizado em 08.10.2026

O modelo é o de `producao/qualidade/00-entender-o-projeto.md`, seção 9. Fica em `registros/`, e não em `producao/qualidade/`: o kit não se edita por cliente (`producao/README.md`, "A regra da pasta"; lacuna registrada no diário do teste).

## Identificação
- **Nicho:** odontologia · **Plano:** C (Completo, sem limite de páginas) · **Módulos:** nenhum (a Agenda e a Presença não foram contratadas no exemplo)
- **Publicação:** estático (`out/`, `.htaccess` gerado) · **Endereço:** `odontologia.agenciaatlasdigital.com` (o subdomínio da vitrine; **não publicado**)
- **Conselho:** CFO. Código de Ética Odontológica (CFO-118/2012, com a CFO-271/2025), arts. 41 a 46; CFO-196/2019 · **O que o site precisa mostrar:** nome e CRO da clínica e do responsável técnico em toda página; título de especialista só com registro; a relação dos especialistas e dos clínicos gerais · **O que é vedado:** preço, serviço gratuito, forma de pagamento, antes e depois, imagem de procedimento, "popular", diagnóstico, convênio (até o parecer). Detalhe e fontes: `decisoes.md`.
- **Site de exemplo [ex]:** selo de ficção em todo rodapé, `noindex, nofollow`, WhatsApp fictício, sem dado estruturado, sem coleta.

## Rotas
| Caminho | Tipo | No mapa do site? | `h1` esperado | Ilhas |
|---|---|---|---|---|
| `/` | estática | não (exemplo: o mapa do site sai vazio) | Odontologia na Boa Viagem: primeiro a avaliação, depois o tratamento. | `EstadoDaClinica`, `Navegacao`, `Revelacao` |
| `/tratamentos` | estática | não | Tratamentos e plano de sessões | `PlanoDeSessoes` > `EscolhaDeRegiao` > `TiltCard` |
| `/tratamentos/{limpeza, restauracao, canal, clareamento, coroa, aparelho}` | estática, `generateStaticParams` | não | "<Tratamento>: <sessões e intervalo>" | nenhuma além das do layout |
| `/avaliacao` | estática | não | Pedir uma avaliação | `PedidoDeAvaliacao` > `EscolhaDeRegiao`, `CopyButton` |
| `/equipe`, `/guias`, `/onde` | estáticas | não | A equipe e a clínica; Antes da avaliação e perguntas comuns; Onde fica | nenhuma além das do layout |
| `/privacidade`, `/acessibilidade` | estáticas, legais | não | Aviso de privacidade; Acessibilidade | nenhuma |
| `/_not-found` (404), `/robots.txt`, `/sitemap.xml`, `/icon.svg`, `/apple-icon.png` | especiais | — | Esta página não existe. | — |

## Ilhas
| Arquivo | Estado | Escreve | Entrada ou sob demanda | Sem script | Movimento reduzido |
|---|---|---|---|---|---|
| `components/ilhas/navegacao.tsx`, `menu-celular.tsx` | caminho aberto; `<dialog>` | nada | entrada | o gatilho leva ao índice do rodapé | sem animação própria |
| `components/ilhas/revelacao.tsx` | `data-visivel` | atributo no DOM | entrada | tudo visível (a classe `.js` não existe) | tudo visível |
| `components/ilhas/estado-da-clinica.tsx` | o relógio de Niterói, a cada 30 s | nada | entrada | o horário escrito | igual |
| `components/ilhas/plano-de-sessoes.tsx` | a região escolhida | `data-regiao` no invólucro | entrada | a lista inteira, de servidor | igual |
| `components/ilhas/escolha-de-regiao.tsx` | a região (controlada pelo pai) | nada | entrada | o desenho em repouso; os rádios sem efeito | a inclinação não liga |
| `components/ilhas/pedido-de-avaliacao.tsx` | atendimento, região, última visita, período | nada | entrada | o vínculo com a mensagem curta e a lista dos atendimentos (`.sem-script`) | igual |
| `components/ui/spell/tilt-card.tsx` | o ponteiro | `style.transform` do invólucro, uma escrita por quadro | entrada | parado | não liga o ouvinte |
| `components/ui/spell/copy-button.tsx` | "copiado" ou "falhou" por 1,8 a 2,6 s | área de transferência, só no toque do botão | entrada | o texto da mensagem fica à vista | troca seca |

## Fluxos de dado
| Fluxo | Origem → destino | Guardado onde, por quanto tempo | Quem vê | Teste |
|---|---|---|---|---|
| A mensagem do pedido de avaliação | o aparelho → o aplicativo do WhatsApp, pelo vínculo `wa.me` | **em lugar nenhum**: o site não recebe nem grava | quem toca no botão e o WhatsApp | `testes/oficio.test.ts` (a mensagem); `testes/e2e/fluxos.mjs` (o `href`, "nada gravado") |
| A cópia da mensagem | o aparelho → a área de transferência | a do aparelho | quem copiou | `fluxos.mjs` (recusada e autorizada) |
| O estado ao vivo | o relógio do aparelho → a tela, no fuso de Niterói | nada | quem lê | `testes/oficio.test.ts`; `fluxos.mjs` (relógio fixo) |
| A região escolhida no plano de sessões | o aparelho → o pedido de avaliação, pelo vínculo `/avaliacao/#regiao-<id>` (só um `id` da lista é aceito) | **em lugar nenhum**: vai no endereço | quem toca no vínculo | `fluxos.mjs` (a âncora, e a escolha que só aceita `id` da lista) |
| O telefone | o aparelho → o aplicativo de telefone, pelo vínculo `tel:+5521900000000` (capa, Onde, rodapé) | em lugar nenhum | quem toca | `fluxos.mjs` (o `href` e a linha única a 320 px) |
| Os registros de acesso | o visitante → a hospedagem | os da Hostinger, fora do site | a hospedagem | declarado em `/privacidade` |

Nenhum formulário, nenhuma Agenda, nenhum servidor, nenhum cookie, nenhum `localStorage`.

## Dependências de produção e cabeçalhos
- **Produção** (`npm ls --omit=dev`): `next` 16.3.8, `react` 19.2.8, `react-dom` 19.2.8. Nenhuma dependência além da pilha do kit; nada instalado nesta produção (o `npm audit --omit=dev` dá 0 vulnerabilidade).
- **Cabeçalhos** (`curl -sI` no servidor local, igual ao `.htaccess` gerado): `Content-Security-Policy: default-src 'self'; …`, `Strict-Transport-Security`, `Cross-Origin-Opener-Policy: same-origin`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`. Conferidos no servidor de medição, **não** no endereço publicado.

## Afirmações e fontes
Cada afirmação tem a fonte no `briefing.md` (fictício; as seções entre parênteses) ou no documento citado. Conferido em 08.10.2026, por leitura do texto compilado contra o briefing.

| Afirmação | Página | Fonte | Conferido |
|---|---|---|---|
| "A primeira consulta é só avaliação"; "o dentista examina e conversa"; "sessões combinado por escrito" | Início, Guias | briefing §1 (o que faz, nas palavras do dono) e §12 (avaliação) | sim |
| Resposta em até 30 minutos, no horário de funcionamento | Início, Onde, rodapé | briefing §3 | sim |
| Horário: seg. a qui. 8h–12h e 13h30–18h; sex. até 17h; sáb. 8h–12h; dom. e feriados fechado | Início, Onde, rodapé, estado ao vivo | briefing §3 | sim |
| Feriados nacionais de 2026 que restam (12.10, 02.11, 15.11, 20.11, 25.12) | estado ao vivo, Onde | calendário oficial de feriados nacionais; **a conferir antes de uso real** (não é do briefing) | parcial |
| Com dor, encaixe no mesmo dia, de segunda a sexta, para quem avisar até as 16h; "controla a dor" | Início, Avaliação, Guias | briefing §12 (urgência) e nicho, seção 7 (texto de exemplo) | sim |
| Rua Presidente Domiciano, 000, Boa Viagem, Niterói, CEP 24210-320 | Início, Onde, rodapé | briefing §3; rua, bairro e CEP conferidos no OpenStreetMap (Nominatim) em 08.10.2026; número fictício | sim |
| O mapa do bairro | Onde | OpenStreetMap, ODbL, gerado por `gerar-mapa.mjs` em 08.10.2026 (crédito na legenda) | sim |
| Dra. Beatriz da Silva, clínica geral, responsável técnica; Dr. Caio da Silva, Especialista em Endodontia; Dra. Helena da Silva, Especialista em Ortodontia; CRO-RJ 00000 | Início, Equipe, tratamentos, rodapé | briefing §4 e §12; Código de Ética Odontológica, arts. 43, caput e § 1º, e 43, § 2º | sim |
| Cada tratamento: sessões, durações, intervalos, o que se faz, cuidados, região, quem atende | Início, Tratamentos, cada tratamento | briefing §12 (tabela dos tratamentos); **protocolos "da casa" fictícia, sem revisão de dentista** | sim, com a ressalva |
| "Em uma frase": o que é cada tratamento | Tratamentos, cada tratamento | briefing §12 ("Em uma frase") | sim |
| Três consultórios e uma sala de espera; entrada sem degrau; esterilização em autoclave; sem estacionamento próprio | Equipe, Onde | briefing §3 e §12 | sim |
| O que levar; os quatro passos da avaliação; a avaliação dura 40 minutos | Guias | briefing §12 e §2 | sim |
| Nenhum valor, forma de pagamento, convênio, antes e depois | todas | a norma (`decisoes.md`): ausência, não fato | sim |
| As larguras e profundidades das coroas do desenho do mapa dos dentes | mapa dos dentes | médias de livro-texto (Wheeler), de memória, **não conferidas nesta produção** | **não** |

## Matriz de risco
Nota = probabilidade × impacto, de 1 a 3 (`producao/qualidade/00-entender-o-projeto.md`, seção 8).

| Item | Prob. | Impacto (dimensão) | Nota | Teste | Resultado |
|---|---|---|---|---|---|
| Vínculo do WhatsApp com a mensagem pronta (cabeçalho, capa, cartão da mensagem, página de cada tratamento) | 2 | 3 (conversão) | 6 | Unidade (mensagem, codificação) + ponta a ponta (o `href` de cada página) | passa |
| Registro do conselho e responsável técnica em toda página, também no celular | 2 | 3 (legal) | 6 | Régua (paridade) + leitura de cada página a 390 px | passa: CRO no cabeçalho em todas as larguras; a responsável técnica na capa e no rodapé |
| Ação na primeira tela do celular | 2 | 3 (conversão) | 6 | Régua, composição | passa: 18% a 53% da altura; só as duas páginas legais não têm (decisão) |
| Contraste e foco | 2 | 3 (acessibilidade) | 6 | `npm run paleta`; régua (contraste e teclado); roteiro de teclado | passa: 12 de 12 pares; 103 pontos medidos no celular e 110 na mesa, na capa; foco de 2 px, sem encobrimento |
| Funciona sem script e com movimento reduzido | 2 | 2 (acessibilidade) | 4 | Régua (degradação); `fluxos.mjs` com `javaScriptEnabled: false` | passa |
| Nenhum pedido externo, cookie ou armazenamento | 1 | 3 (privacidade) | 3 | Régua, bloco 5; `fluxos.mjs` depois de cada fluxo | passa |
| Marcações de compartilhamento | 2 | 2 (conversão) | 4 | Régua, semântica | passa: título e descrição distintos em cada página; cartão de 80 KB, fotografado sem script |
| **Funcionalidade 1: o pedido de avaliação** | 3 | 2 (conversão, verdade) | 6 | Unidade + ponta a ponta (fluxo, cópia recusada, âncora, teclado) | passa |
| **Funcionalidade 2: o plano de sessões e o mapa dos dentes** | 3 | 2 (conversão, verdade) | 6 | Unidade (geometria, dados) + ponta a ponta (filtro, sem script, teclado) | passa |
| **Estado ao vivo** (aberto agora, feriado, urgência do dia) | 3 | 2 (verdade) | 6 | Unidade com datas fixas, inclusive almoço, sexta, sábado, domingo, feriado, UTC contra São Paulo; ponta a ponta com relógio fixo | passa |
| Normas do nicho no texto (preço, antes e depois, "popular", convênio, diagnóstico) | 2 | 3 (legal) | 6 | `verificar-termos.mjs` + leitura frase a frase | passa: 0 falha; 28 avisos, todos ausências declaradas ou títulos registrados |
| **Peça-assinatura** (o mapa dos dentes, SVG) | 3 | 2 (acessibilidade, verdade) | 6 | Peso (régua); reserva sem script; **teste do desconhecido** | peso 14,4 KB e reserva passam; **o teste do desconhecido está pendente (pessoa)** |
| O desenho do mapa dos dentes é anatomicamente correto | 3 | 2 (verdade) | 6 | Revisão de um dentista | **pendente (pessoa)** |

## Decisões de teste
- **Não se testa:** o Safari e o Firefox (o piso de compatibilidade do kit é o Chrome); o WebGL (não há); a Agenda e o formulário (não há); a leitura com VoiceOver, TalkBack e NVDA (de pessoa: ficou o proxy da árvore de acessibilidade); o Lighthouse e o INP (antes da publicação, `producao/qualidade/08-desempenho.md`); aparelho real.
- **Os testes de ponta a ponta usam a biblioteca `playwright` e o `node:assert`**, e não o `@playwright/test`, que não é dependência aprovada.
