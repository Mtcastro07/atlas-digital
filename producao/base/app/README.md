# app/

As rotas (App Router do Next 16) e as folhas globais.

| Arquivo | O que faz |
|---|---|
| `layout.tsx` | O layout raiz: `lang="pt-BR"`, as fontes, o script curto do `<head>` (`.js` e `.ja-aberto`), "Ir para o conteúdo", cabeçalho, rodapé, a revelação e a página no topo (`AoTopo`). No exemplo, `noindex` |
| `template.tsx` | Remonta a cada navegação: a entrada da página (`EntradaDaPagina`) |
| `page.tsx` | O início: título, lide com o marca-texto, a ação, o resumo de preço por porte, o cuidado, as ausências, o horário e o endereço |
| `servicos/`, `onde/` | As páginas de conteúdo do exemplo (pet shop, Essencial). Num cliente, as páginas do nicho e do plano (`producao/esteira/nichos/<nicho>.md`, seção 4) |
| `privacidade/`, `acessibilidade/` | As páginas legais, de `conteudo/legal.ts`; fora do menu e do limite de páginas do plano |
| `not-found.tsx`, `error.tsx`, `global-error.tsx` | A 404 e os erros em português, com "Tentar de novo" (`retry`). O `error.tsx` é parte do script de toda página: só classes, nada de `conteudo/` |
| `robots.ts`, `sitemap.ts` | Estáticos (`force-static`). O mapa do site sai vazio no exemplo |
| `icon.svg` | O ícone da aba, com a variante escura, desenhado em `<path>` (o SVG da aba não carrega fonte). **Do cliente:** o `conferir-pronto` acusa o de fábrica |
| `apple-icon.png`, `favicon.ico` | Gerados do `icon.svg` por `ferramentas/gerar-icones.mjs` (180 px sobre o `--primary`; 32 px), em RGBA. Não se editam à mão |
| `globals.css` | O comum a todo site: o tema do Tailwind por função, a base, o foco, a revelação, o marca-texto, a troca de página e o diálogo do menu |
| `identidade.css` | **Do cliente:** a escala, a forma e as cores por função, com o contraste anotado |
| `fontes.ts`, `fontes/` | **Do cliente:** as famílias (`--font-titulo`, `--font-texto`) em `.woff2`, com a licença ao lado (`ferramentas/baixar-fonte.mjs`) |
