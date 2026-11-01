# components/

Componentes de servidor por padrão. O que tem estado mora em `ilhas/` (`"use client"`), recebe só o que usa e nunca importa o texto do site inteiro.

| Arquivo | O que faz |
|---|---|
| `cabecalho.tsx` | A marca (com o registro do conselho, quando há), as páginas e a ação na mesa; parado durante a troca de página |
| `rodape.tsx` | O índice (`#indice`, a reserva do menu sem script), o contato, o horário e o bloco de conformidade |
| `acao-whatsapp.tsx` | A ação principal, com "abre em nova aba" para leitor de tela; variante `discreta` |
| `endereco.tsx`, `vinculo-do-mapa.tsx` | O endereço em linhas; "Ver no mapa", como navegação |
| `horario.tsx` | O horário dia a dia numa lista de definição, "Feriados: fechado." e, se pedido, as datas dos fechamentos |
| `texto-legal.tsx` | A página de texto legal, desenhada de `conteudo/legal.ts` |
| `transicao-de-pagina.tsx` | O `<ViewTransition>` da troca de página e o do cabeçalho fixo |
| `simbolos.tsx` | Os ícones em SVG próprio: o glifo do WhatsApp (Simple Icons, CC0), o símbolo de acessibilidade (forma A CONFIRMAR com advogado), menu e fechar |
| `ilhas/navegacao.tsx` | As páginas no cabeçalho, com a aberta marcada (`aria-current`), e o menu do celular |
| `ilhas/menu-celular.tsx` | O menu de tela cheia em `<dialog>` nativo (foco preso, Esc, foco devolvido); sem script, o gatilho leva ao índice do rodapé |
| `ilhas/revelacao.tsx` | Marca `data-visivel` nos `[data-revela]` que entram na tela, uma vez |
| `mapa-dos-dentes.tsx` | **A peça-assinatura:** o mapa dos dentes, duas arcadas na notação FDI, gerado de `lib/oficio/dentes.ts`; sem estado, serve ao servidor e à ilha |
| `ilhas/escolha-de-regiao.tsx` | O mapa como controle: rádios num `<fieldset>`, o desenho reflete e também escolhe; a inclinação leve (único gesto) |
| `ilhas/plano-de-sessoes.tsx` | O plano de sessões: põe `data-regiao` no invólucro, e o CSS esconde o que a região não alcança; a lista é de servidor |
| `ilhas/pedido-de-avaliacao.tsx` | O pedido de avaliação: o atendimento, a região, a última visita e o período viram a mensagem do WhatsApp; copiar; nada é gravado |
| `ilhas/estado-da-clinica.tsx` | "Aberto agora" e a urgência do dia, no relógio de Niterói; antes da hidratação, o horário escrito |
| `ui/spell/` | Os gestos do Spell UI adaptados (`ui/spell/README.md`): a inclinação, sem brilho, e o copiar |

**Regra de display.** Duas classes que mexem na mesma propriedade, na mesma variante, disputam: o Tailwind decide pela ordem do CSS, não pela do atributo. Em 08.10, o `hidden lg:inline-flex` passado à ação, que já tinha `inline-flex`, mostrou a ação no celular e a régua acusou a rolagem lateral a 320 px. O display fica num invólucro (`<div className="hidden lg:block">`).
