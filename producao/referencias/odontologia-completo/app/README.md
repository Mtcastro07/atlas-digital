# app/

As rotas (App Router do Next 16) e as folhas globais.

| Arquivo | O que faz |
|---|---|
| `layout.tsx` | O layout raiz: `lang="pt-BR"`, as fontes, o script curto do `<head>` (`.js` e `.ja-aberto`), "Ir para o conteúdo", cabeçalho, rodapé e a revelação. No exemplo, `noindex` |
| `template.tsx` | Remonta a cada navegação: a troca de página (`TransicaoDePagina`) |
| `page.tsx` | O início: o título e o lide, a ação, a responsável técnica, o estado ao vivo, o mapa dos dentes, os seis tratamentos com as sessões, a equipe, o que não se faz aqui, o horário e o endereço |
| `tratamentos/`, `tratamentos/[id]/` | O plano de sessões aberto pelo mapa dos dentes (a funcionalidade 2) e uma página por tratamento (`generateStaticParams`, de `conteudo/tratamentos.ts`) |
| `avaliacao/` | O pedido de avaliação (a funcionalidade 1) |
| `equipe/`, `guias/`, `onde/` | A equipe e a clínica, o que acontece na avaliação e as perguntas, o endereço com o mapa do bairro |
| `privacidade/`, `acessibilidade/` | As páginas legais, de `conteudo/legal.ts`; fora do menu e do limite de páginas do plano |
| `not-found.tsx`, `error.tsx`, `global-error.tsx` | A 404 e os erros em português, com "Tentar de novo" (`retry`). O `error.tsx` é parte do script de toda página: só classes, nada de `conteudo/` |
| `robots.ts`, `sitemap.ts` | Estáticos (`force-static`). O mapa do site sai vazio no exemplo |
| `icon.svg` | O ícone da aba, com a variante escura, desenhado em `<path>` (o SVG da aba não carrega fonte). **Do cliente:** o `conferir-pronto` acusa o de fábrica |
| `apple-icon.png`, `favicon.ico` | Gerados do `icon.svg` por `ferramentas/gerar-icones.mjs` (180 px sobre o `--primary`; 32 px), em RGBA. Não se editam à mão |
| `globals.css` | O comum a todo site: o tema do Tailwind por função, a base (foco, `scroll-padding-top`, cursor, barra de rolagem), a revelação, o desenho do mapa dos dentes (`.dente-*`, `.mapa-*`), o vínculo com o traço de lápis, o filtro por região, as perguntas, a troca de página e o diálogo do menu |
| `gestos.css` | O gesto da marca (a inclinação do mapa, sem o brilho) e as curvas; de `producao/gestos/app/gestos.css`, sem os blocos que o site não usa |
| `identidade.css` | **Do cliente:** a escala, a forma e as cores por função, com o contraste anotado |
| `fontes.ts`, `fontes/` | **Do cliente:** as famílias (Red Hat Text, `--font-texto`, no texto; Red Hat Display, `--font-titulo`, nos títulos) em `.woff2`, com a licença ao lado (`ferramentas/baixar-fonte.mjs`) |
