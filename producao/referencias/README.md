# Referências · o site do Atlas, os três sites de exemplo e um Completo feito pelo kit

> **Para que serve.** Os estudos de 30.08 a 08.10.2026 aplicados em código: os três sites de exemplo do Atlas, um por plano, cada um com a identidade, as páginas, a funcionalidade do ofício e a camada de movimento do seu plano. É o lugar de ver **como** uma regra da esteira vira tela, sobretudo no que é difícil de escrever do zero: a peça-assinatura em 3D, a cena de rolagem, o estado da loja ao vivo, a calculadora e o talão que fecha no WhatsApp.
>
> **Para estudo, não para cópia.** A identidade de cada cliente sai do briefing e da direção de arte do ramo (`../esteira/04-direcao-de-arte.md`), nunca de um exemplo. Os três saíram "sem parentesco" de propósito (pedido do usuário em 01.10.2026), e cada um tem marcas de IA registradas que não se repetem num cliente (`../esteira/11-anti-ia.md`, seção 7).
>
> **De onde vem.** `sites-de-exemplo/` é uma cópia gerada do `web/` do repositório do Atlas, pelo `../ferramentas/atualizar-referencias.mjs` (a data e o commit estão em `sites-de-exemplo/ORIGEM.md`). Não se edita à mão: muda-se o `web/` e roda-se o script de novo. A cópia não compila sozinha, porque mora dentro do app do Atlas, com o layout raiz e a folha global dele. O site do cliente a ignora: o `tsconfig.json` exclui `producao/`, e o CSS também.
>
> **O site do próprio Atlas** (desde 09.10.2026): `atlas/`, a cópia gerada da página inicial e das páginas do Atlas, com os componentes e o CSS das técnicas do acabamento (a esfera, os globos, o vidro líquido, as caixas empilhadas, a chamada final com o grão, a faixa de luz, o orbe sob o cursor). É a referência de nível de todo site (`../esteira/19-o-padrao-atlas.md`, seção 8.3). As duas cópias levam o `app/globals.css` e o que ele importa (`vidro.css`, `movimento.css`): antes, o código das técnicas vinha sem o CSS delas.
>
> **Atualizado em:** 09.10.2026.

---

## 1. Os três sites

| Site | Plano · nicho | Onde está | O que mostra |
|---|---|---|---|
| **Nutrição Icaraí** | [E] Essencial · nutrição | `sites-de-exemplo/app/demos/nutricao/`, `components/demos/nutricao/`, `conteudo/demos/nutricao.ts` | A camada de movimento do Essencial (revelação e transições); a tipografia de "folha impressa" (Fraunces e Newsreader); a carta de valores sóbria; o marca-texto |
| **Depósito Engenhoca** | [P] Profissional · construção | `app/demos/deposito/`, `components/demos/deposito/`, `conteudo/demos/deposito.ts` | A funcionalidade do ofício (a calculadora de materiais); o estado da loja ao vivo, com o corte da entrega; o talão que compõe o pedido e envia pelo WhatsApp; a galeria com setas; a navegação viva |
| **Barbearia Santa Rosa** | [C] Completo · barbearia | `app/demos/barbearia/`, `components/demos/barbearia/`, `conteudo/demos/barbearia.ts` | A peça-assinatura: as fichas de latão em 3D (WebGL), com a reserva sem 3D; a cena de rolagem; a agenda como pedido de horário pelo WhatsApp (sem servidor, por ser exemplo); a barra que recolhe ao rolar |

O layout comum (`app/demos/layout.tsx`) põe o `noindex` e o selo de ficção de todo exemplo (`../esteira/14-funcionalidades/01-base-de-todo-site.md`, seção 13).

**E um quarto, feito pelo próprio kit:** `odontologia-completo/`, a clínica fictícia "Odontologia Boa Viagem", no Completo, produzida em 08.10.2026 por um agente só com esta pasta (o teste de produção do zero). Diferente dos três de cima, ele mostra o caminho do kit inteiro: a base que vira um Completo de saúde, as duas funcionalidades do ofício (o plano de sessões pelo mapa dos dentes e o pedido de avaliação), a norma do conselho aplicada e o relatório de QA. O estado, o que fica aberto e o mapa de arquivos estão em `odontologia-completo/README.md`. É registro: não se edita.

**Referência de função, não de acabamento** (08.10.2026, à noite). Ele seguiu as regras de então: a contenção tipográfica, com o título de no máximo duas vezes o corpo, e o movimento contido. Saiu correto e chapado, e ficou abaixo do Atlas e da barbearia em todas as sete camadas do piso do acabamento (pedido do usuário: "não está nem um pouco perto de um site premium"). Copie dele o caminho, as funcionalidades e a norma; o acabamento vem da barbearia, do Atlas e de `../esteira/00-principios.md`, seção 9.

## 2. Do que se precisa para onde olhar

| Preciso de… | Arquivos (em `sites-de-exemplo/`) | A regra está em |
|---|---|---|
| Uma peça-assinatura em 3D, com a reserva e o custo medido | `components/ilhas/demos/palco-3d.tsx`, `palco-3d/motor.ts` (o motor WebGL), `palco-3d/cena.ts` (o desenho); a reserva em `app/demos/barbearia/barbearia.css` | `../esteira/14-funcionalidades/08-peca-assinatura.md`; `../esteira/09-movimento.md`, seção 7 (as cinco condições) |
| Uma cena que se desenha ao rolar | `components/ilhas/demos/cena-de-rolagem.tsx` | `../esteira/09-movimento.md`; `08-peca-assinatura.md` |
| O estado da loja ("aberta agora", o próximo horário, o corte da entrega) | `components/ilhas/demos/estado-da-loja.tsx`; os dados em `conteudo/demos/deposito.ts` | `../esteira/14-funcionalidades/07-funcionalidades-do-oficio.md`; o teste em `../qualidade/04-unidade.md`, seção 4.3 |
| Uma calculadora do ofício | `components/ilhas/demos/calculadora.tsx`; `app/demos/deposito/calculadora/page.tsx` | `07-funcionalidades-do-oficio.md` |
| Um pedido que fecha no WhatsApp (o talão) | `components/ilhas/demos/pedido-por-mensagem.tsx`; `app/demos/deposito/orcamento/page.tsx` | `../esteira/14-funcionalidades/02-formulario.md`, seção 10 (com o achado de 08.10: sem script, o envio dele não leva a lugar nenhum) |
| A marcação sem servidor (exemplo) | `components/ilhas/demos/agenda-da-barbearia.tsx`; `app/demos/barbearia/agendar/page.tsx` | `../esteira/14-funcionalidades/05-agenda.md` (num cliente, a Agenda de verdade está em `../modulos/agenda/`) |
| A galeria com setas e deslize | `components/ilhas/demos/setas-da-galeria.tsx` | `../esteira/14-funcionalidades/03-galeria.md` |
| A navegação viva, a revelação, a barra que recolhe | `navegacao-viva.tsx`, `revelacao.tsx`, `recolher-ao-rolar.tsx`, `barra-da-barbearia.tsx` | `../esteira/09-movimento.md` |
| A identidade de um site em CSS (tokens, forma, superfície) | `app/demos/<site>/<site>.css` e `app/demos/demos.css` | `../esteira/06-cor-forma-e-superficie.md`; `../03-da-identidade-ao-codigo.md` |
| As fontes de cada identidade, por `next/font` | `components/demos/<site>/fontes.ts` (os `.woff2` não vêm na cópia) | `../esteira/05-tipografia.md`, seção 2.5 |
| Os gestos do Spell UI em uso | `components/ui/spell/` (a cópia do Atlas) | O kit traz os seus, adaptados: `../gestos/` |

## 3. O que não repetir

Cada exemplo tem marcas de IA da linha de base de 07.10.2026, registradas para a decisão dos sócios (`../esteira/11-anti-ia.md`, seção 7):
- **na nutrição:** creme com serifa e terracota, itálico no título, filetes de jornal;
- **no depósito:** a faixa zebrada, o quadriculado, a monoespaçada, a navegação numerada, cinco cartões iguais;
- **na barbearia:** o escuro com um acento só, a serifa itálica em "esquina.", a navegação numerada, o sobretítulo espaçado, nenhuma foto.

Estude a solução; não leve a marca. E três defeitos conhecidos, para não copiar:
- o talão do depósito envia por `onSubmit` com `window.open`, e sem script não sai nada;
- o botão de agendar da barbearia some abaixo de 640 px;
- os cantos retos do depósito estão a decidir. Num cliente, canto reto só com motivo escrito no `identidade.md`.
