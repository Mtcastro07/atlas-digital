# `components/marca/`

| Arquivo | O que faz |
|---|---|
| `logotipo.tsx` | `Logotipo`: a letra A, com a mão que ergue o globo, seguida de "ATLAS DIGITAL". O letreiro vem de `public/marca.svg#letreiro`, com a versão no endereço (`?v=…`: o arquivo fica uma semana em cache); o globo é desenhado inline porque gira: uma volta completa sob o ponteiro ou no foco (`.mov-globo`, `app/movimento.css`) e, no celular, a cada vez que aparece (`data-globo`, `ilhas/giro-do-globo.tsx`). O globo é a peça `GloboDoLogotipo`, a mesma do símbolo da nota sobre o nome (`secoes/quem-faz.tsx`). Caixa de visualização justa ao desenho (`0 0 426 166`): a altura do componente é a altura visível da marca, e a letra A encosta na margem da coluna. A cor segue `currentColor`. |
| `globo.tsx` | `Globo`: o globo do logotipo em traço de bronze, ampliado, com a mesma construção (círculo, meridiano a 0,45 do raio, paralelos a ±0,345). Parado ao fundo do bloco da origem do nome (`secoes/quem-faz.tsx`), atrás do cartão de vidro líquido, que o refrata na borda (da branchCto). Com `girando`, na figura de O Atlas (desde 03/10), os meridianos percorrem a sua longitude, uma volta a cada 36 s (`.mov-longitude`, `app/movimento.css`), como ambiente contínuo. |
| `esfera.tsx` | `Esfera`: a esfera de arame que gira atrás do título da capa, a mesma do site de 28/08 — contorno, cinco paralelos fixos e oito meridianos que se estreitam e se abrem (`scaleX`, 16 s por volta, cada um numa fase). No celular, quatro meridianos. Com movimento reduzido, os meridianos ficam parados em leque (`--estatico`). A geometria é calculada no próprio arquivo; cores e animação em `.mov-esfera-*` (`app/movimento.css`); pausa e inclinação em `ilhas/esfera-viva.tsx`. |

## Regras

- `recorte` é o id do recorte do globo e precisa ser único na página: cabeçalho, rodapé e 404 usam ids distintos.
- Alturas em uso: cabeçalho 31 px (34 px a partir de 768 px), rodapé 39 px, 404 34 px — as do site de 28/08.
- `decorativo` esconde o SVG dos leitores de tela; use quando o texto ao lado (ou o `aria-label` do vínculo) já diz "Atlas Digital".
- O traço é o original, o do site de 28/08 e dos arquivos-mestre da marca (`../../../marca/logotipo/`), com o bloco da mão que ergue o globo — de volta em 05/10, a pedido do usuário ("o 'A' está com uma parte faltando"); de 01 a 05/10, ficou sem ele. O mesmo desenho está em `public/marca.svg`, no símbolo de `secoes/quem-faz.tsx`, nos ícones (`app/icon.svg`, `app/apple-icon.png`) e em `public/compartilhar.png` (`ferramentas/capturar-compartilhamento.mjs`). Mudou o `marca.svg`? Mude a versão em `LETREIRO` (`logotipo.tsx`), ou quem já o tem em cache segue com o desenho anterior por até uma semana.
