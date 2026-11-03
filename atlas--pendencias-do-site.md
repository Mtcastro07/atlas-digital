# Pendências do site do Atlas

> Retiradas do kit de produção (`producao/esteira/99-rastreabilidade.md`) em 03.11.2026, a pedido do usuário: "Isso é sobre o Atlas, pode retirar da pasta produção" (C3), "Também sobre o Atlas, não importa aqui, pode tirar da produção" (C4), "Caso seja bom, continue, mas novamente, é sobre o Atlas" (C5). O kit trata dos sites de cliente e de exemplo; o que é só deste site fica aqui. Os números de seção citados são os do kit.

## Da tabela A (decisões que tocam o site do Atlas e os exemplos dele)

| Pendência | Onde a esteira tratava |
|---|---|
| A linha de base anti-IA do site do Atlas e dos exemplos: a tarja no título, a onda no "24h", os rótulos "01 / 06", a capa centralizada, as faixas de números, a grade de cartões iguais, as entradas acima de 600 ms; o título do Atlas entre os extremos da escala | `11-anti-ia.md`, seção 7; `../qualidade/11-design-e-anti-ia.md` |
| A ordem decrescente dos planos no site do Atlas (do Completo ao Essencial), que contraria a metáfora da escada | `03-planos.md`, seção 1 |
| Os cantos retos do depósito de exemplo (e as sombras que o chanfro corta) | `06-cor-forma-e-superficie.md`, seção 6 |
| O texto dos planos no site do Atlas pela tarefa de cada degrau, e os prazos de publicação por plano, que o site também não traz (nada foi mudado; depende de ratificação) | `03-planos.md`, seção 1 |
| A Página adicional no montador da página Orçamento × "nunca no montador" (contexto comercial, §2) | — (site do Atlas) |
| Afirmações do texto do site do Atlas sem fonte nos documentos: a avaliação gratuita do site atual do cliente (`conteudo/duvidas.ts`) e a mensalidade a partir do mês seguinte à publicação (a formação dos sócios tem linha própria, nesta seção) | `10-texto-e-conteudo.md`, seção 11; `18-publicacao-e-manutencao.md`, seção 7.1 |
| Divergências de marca: a tipografia do site × a ata v3.0, V (as fontes de 28/08 voltaram em 05.10, a pedido de Gabriel Ribeiro Ota Yida, e o usuário as manteve em 08.10) e × o manual v3.1, nos detalhes; o Navy Sombra com dois valores (a do logotipo sem a mão × os arquivos-mestre acabou em 05.10, com a volta do original, que entrou na fusão de 08.10) | — (marca) |
| A formação dos sócios (Ciência da Computação na UFF) a conferir pelos três antes da publicação; as fotos dos sócios ainda não foram enviadas; os JPEG originais seguem publicados em `public/socios/`, sem uso | `08-imagem-e-fotografia.md`, seção 8; `../qualidade/12-ataque-a-falhas.md`, seção 5 |
| Desativar os subdomínios antigos dos exemplos (`obra.`, `nutricao.`) na publicação | `18-publicacao-e-manutencao.md` |
| Levar as correções de 07 e 08.10.2026 do `web/` (no ramo `branchCEO`) para a `main`, de onde a Hostinger publica: o site no ar é a versão de 05.10 (conferido em 08.10.2026) | `18-publicacao-e-manutencao.md`, seção 2 |

## Das seções 9 e 10 do registro do kit, e da lista "A confirmar"

- **O site do Atlas em versão estática** nunca foi medido (cota de web apps e partida a frio; `18-publicacao-e-manutencao.md`, seção 1).
- **O site do Atlas não cumpre a regra na navegação.** A implementação de 27 e 28.10.2026 não entrou no site: a verificação não a aprovou (a navegação instável, sobretudo na mesa, e a faixa fixa do montador de `/orcamento` fora da tela durante a entrada). A entrada por CSS só chegou com o redesenho de 02.11.2026 (seção 10), e a navegação segue fora da porta no celular 4×. Decisão do aprovador, Matheus Castro Oliveira de Luna Garcia.
- **As demos** continuam com o `<ViewTransition>` e reprovam a navegação no celular; a medida de 22.10.2026 é anterior à reversão do site e precisa ser refeita.
- **A cobertura das passivas** só rodou no autoteste, em páginas de prova; nenhuma página real a mediu com a ferramenta. O site do Atlas, medido por outro roteiro, não a cumpre (26% a 36%): a decisão é do aprovador.

## B. Defeitos no site do Atlas e nos sites de exemplo** (a corrigir; cada um com a regra no kit)

| Defeito | Onde | A regra no kit |
|---|---|---|
| Abaixo de 640 px, a barbearia de exemplo fica sem ação na primeira tela (o "Agendar" da barra some, e o da capa cai abaixo da dobra) | `components/ilhas/demos/barra-da-barbearia.tsx`; `app/demos/barbearia/page.tsx` | `07-composicao.md`, seção 6; régua, bloco 6 (aviso) |
| O 3D pausado continua redesenhando cada quadro | `palco-3d/motor.ts` | `14-funcionalidades/08-peca-assinatura.md`, seção 3.6 |
| O estado da loja diz "encerrado" antes de a loja abrir | `estado-da-loja.tsx` | `14-funcionalidades/07-funcionalidades-do-oficio.md`, seção 2.2 |
| `viewportFit: "cover"` sem os recuos laterais | `app/layout.tsx` | `13-tecnologia-e-estrutura.md`, seção 6 |
| `.ja-aberto` dura o documento: depois de recarregar, a navegação interna perde as entradas | `app/layout.tsx`; `app/movimento.css` | `09-movimento.md`, seção 5 |
| Dois mecanismos de pausa (`data-pausa` e `data-fora`) | `esfera-viva.tsx`; `movimento.css` | `09-movimento.md`, seção 5 |
| `decodeURIComponent` solto no clique de vínculo interno | `components/ilhas/ancoras.tsx`, linha 151 | `14-funcionalidades/01-base-de-todo-site.md`, seção 16 |
| O painel do menu importa `acaoOrcamento` de `conteudo/site.ts`: o pedaço sob demanda (34,5 KB comprimidos) leva frases da página | `components/ilhas/painel-menu.tsx` | `13-tecnologia-e-estrutura.md`, seção 3.2; `15-desempenho.md`, seção 6 |
| O pedido por mensagem do depósito não funciona sem script | `pedido-por-mensagem.tsx` | `14-funcionalidades/README.md` (degradação) |
| A hora de São Paulo lida de um texto formatado | `estado-da-loja.tsx` | `14-funcionalidades/01-base-de-todo-site.md`, seção 5 |
| As setas da galeria andam 16 px, e o vão é de 20 px | `setas-da-galeria.tsx` | `14-funcionalidades/03-galeria.md` |
| Três campos dos exemplos com `outline-none` (somem com cores forçadas); sem `scroll-padding-top` sob o cabeçalho fixo | Exemplos; `app/globals.css` | `16-acessibilidade.md` |
| `aria-label` num `<p>`; os nomes das etapas de O trabalho somem no celular; vínculo para outra aba sem aviso | `figuras.tsx`; O trabalho | `16-acessibilidade.md`, seção 5 |
| Os botões do simulador com 36 px (a régua não os vê: só aparecem com o diálogo aberto) | `painel-do-simulador.tsx` | `../qualidade/02-regua.md` (pontos cegos) |
| O lide das aberturas entra de opacidade 0, o que deve atrasar o LCP no celular | `abertura-de-pagina.tsx` | `15-desempenho.md`, seção 5.1 |
| Os detalhes do navegador que faltam (`caret-color`, `scrollbar-color`, `scrollbar-gutter`, `color-scheme`; o `font-synthesis-weight` entrou em 05.10); o `web/app/fontes/README.md` cita uma regra que o `globals.css` não tem | `app/globals.css` | `06-cor-forma-e-superficie.md`, seção 11 |
| A data do mapa do site escrita à mão (01.10) | `app/sitemap.ts` | `14-funcionalidades/01-base-de-todo-site.md`, seção 12 |
| Esqueletos com regras diferentes: o dos exemplos (`.dm-esqueleto`) pulsa sem fim; o do Atlas (`.vd-esqueleto`) pulsa seis vezes e para | `app/demos/demos.css`; `app/vidro.css` | `08-imagem-e-fotografia.md`, seção 8; `09-movimento.md`, seção 5 (pausa do que se move sozinho) |
| O simulador consulta o `iframe` a cada 400 ms, com o diálogo aberto | `painel-do-simulador.tsx`, linha 296 | `15-desempenho.md` (nada de script por quadro sem motivo) |
| "Costumam", perto do vocabulário vedado, no texto de Dúvidas | `conteudo/site.ts` | `10-texto-e-conteudo.md` |
| A variante `vidro` sem uso de `button.tsx` e o `Toggle` sem uso de `toggle.tsx` (arquivos marcados "Não alterar": só com pedido) | `components/ui/button.tsx`; `components/ui/toggle.tsx` | `13-tecnologia-e-estrutura.md`, seção 3.5 |
| A barbearia repete "esquina" em quatro títulos; o fundo `#0b0908` é o quase-preto tingido da lista | Barbearia de exemplo | `11-anti-ia.md` |
| O Spell UI adaptado vai sem o aviso da licença MIT, que o kit passou a levar em 13.10.2026 (`LICENCA-spell-ui.txt`) | `components/ui/spell/` | `../componentes/README.md`, seção 3.2 |
| **Corrigidos em 08.10.2026:** o marcador "agora" da entrega do depósito saía da tela de manhã (a régua o achou às 7h31); as telas de erro chamavam o `reset` (agora o `retry` do Next 16.3) e a de erro global saía na serifa padrão | `estado-da-loja.tsx`; `app/error.tsx`; `app/global-error.tsx`; `app/globals.css` | `web/CLAUDE.md`, 08.10; e, com o trabalho de 05.10 que entrou na fusão de 08.10, deixaram de ser defeito a imagem de compartilhamento com a Archivo Black (o site voltou às fontes de 28/08, mantidas em 08.10) e o total do montador abaixo de 375 px (os totais se empilham abaixo de 400 px) |

**C. Melhorias propostas pela auditoria técnica de 07.10** (P1 e P2): o layout raiz próprio dos exemplos (a folha global e o Inter do Atlas nas 16 páginas deles); o recorte do Newsreader; a esfera da capa num `<canvas>`; as ilhas só de ponteiro no ócio; o movimento reduzido lido 18 vezes e não reativo; os 36 seletores `[data-*]` sem tipo; o `<dialog>` nativo no menu; o cartão de compartilhamento PNG de 158 KB; o cache das imagens de `public/`, hoje com `max-age=0` (`15-desempenho.md`, seção 5.13); a leitura de tons do cabeçalho por `IntersectionObserver`, no lugar dos 13 pontos lidos a cada ~80 ms (`06-cor-forma-e-superficie.md`, seção 10); o JSON-LD sem `@id`, `logo` e `sameAs`; `engines` e `.nvmrc`; o `package.json` perdido na raiz (commit `7cf1e85`) e os pacotes estranhos; o `eslint-disable` órfão; vendorizar o `shadcn/tailwind.css`; portar como teste os 12 scripts de `.playwright-mcp/` (fora do git). Onde no kit: `13-tecnologia-e-estrutura.md`, seções 3 e 10; `15-desempenho.md`, seções 5 e 6.

**C2. Pendências de desempenho abertas:** a hidratação seletiva, bloqueada pelo erro 418 (TBT de 716 ms de mediana com CPU 20×); o CLS intermitente de 0,1, em uma execução de sete com CPU 20×; o texto do LCP esmaecido nas aberturas (já listado na seção 5.B). Onde no kit: `15-desempenho.md`, seções 5.14 e 6; `../qualidade/12-ataque-a-falhas.md`, seção 5.

