# components/ui/spell/

Os dois gestos do Spell UI deste site, trazidos de `producao/gestos/components/ui/spell/` (a adaptação do Atlas) em 08.10.2026. Regra de uso: o gesto da marca é um só, no ponto de decisão (`producao/esteira/09-movimento.md`, seção 6).

| Arquivo | Gesto | O que mudou | Onde entra |
|---|---|---|---|
| `tilt-card.tsx` | A inclinação do mapa dos dentes sob o ponteiro | **Sem o brilho** que acompanhava o ponteiro, e o limite padrão de 8° passou a 3°: o arquivo do nicho pede movimento contido e "nada de brilho em sorriso" (`producao/esteira/nichos/odontologia.md`, seção 6.6) | O mapa das páginas Tratamentos e Avaliação (`components/ilhas/escolha-de-regiao.tsx`) |
| `copy-button.tsx` | Copiar, que só confirma se copiou | Nada: igual ao do kit | A mensagem do pedido de avaliação (utilidade, não gesto de marca) |

O CSS está em `app/gestos.css`. Nenhum outro componente do Spell UI entra: a onda, o brilho, o marca-texto, a tarja e a espera não têm motivo nesta marca.
