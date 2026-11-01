# A galeria [P][C]

> **Para que serve.** Especifica a galeria do Profissional e do Completo: a fila de deslizar no celular, a grade no computador, o trilho do avanço, as setas, o teclado, as imagens e o que nunca se faz (o carrossel que anda sozinho).
>
> **Quando ler.** Ao montar a página de trabalhos, de obras, do cardápio, da carteira de imóveis ou do espaço; e sempre que uma lista de cartões precisar caber no celular.
>
> **Depende de.** `README.md` (a regra geral), `../07-composicao.md` (a grade), `../08-imagem-e-fotografia.md` (a direção da foto, os formatos e o protocolo), `../09-movimento.md` (o movimento por plano), `../15-desempenho.md` (o peso), `../16-acessibilidade.md`.
>
> **Implementação de referência.** No repositório do Atlas: a galeria de deslizar em `web/app/vidro.css` (`.vd-galeria-quadro`, `.vd-galeria`, `.vd-galeria-trilho`) e as setas em `web/components/ilhas/demos/setas-da-galeria.tsx` (a galeria de materiais do Depósito Engenhoca). O código necessário está copiado abaixo.
>
> **Estado.** RATIFICADO: a galeria como item do Profissional (ata v3.0, IV.2.1) e a galeria de deslizar no celular (pedido do usuário em 01.10.2026, fase do celular). O resto é RATIFICADO, salvo onde se diz.
>
> **Atualizado em:** 08.10.2026.

---

## 1. Para que serve a galeria

**Regra.** A galeria prova com **fotografia real** do cliente: o serviço feito, a obra entregue, o prato servido, o imóvel, o espaço. Cada foto tem legenda que diz o quê, onde e, quando importa, quando.

**Objetivo.** A distância entre os sites de exemplo e as referências de cada nicho é fotográfica. Em setembro de 2026, os doze demos estáticos tinham **zero imagens**; as referências, de 8 a 397 [V, medido] (`../nichos/README.md`, seção 3.3). A galeria é onde essa distância se fecha.

**Nunca:**
- imagem gerada por IA, que faz o site mentir sobre a entrega;
- banco de imagens no lugar do trabalho do cliente;
- foto de pessoa sem autorização de uso de imagem (`../17-conformidade-e-normas.md`).

**Varia por** (detalhe em `../nichos/<nicho>.md`):

| Nicho | Regra da galeria |
|---|---|
| Imobiliária | Uma galeria por imóvel, com a **data da foto** na legenda: foto antiga de imóvel engana sobre o estado atual |
| Odontologia | Sem "antes e depois": vedado na clínica pela leitura do CFO de 16.01.2026; no consultório, política do Atlas (`../nichos/odontologia.md`, seção 3) |
| Medicina, psicologia, nutrição | Sem paciente. O espaço, o equipamento, a equipe com autorização |
| Oficina | Placa de carro de cliente desfocada ou fora do quadro |
| Academia | Aluno só com autorização escrita; a turma de costas ou fora de foco, se não houver |
| Restaurante | O prato como sai da cozinha, não o produzido para a foto |
| Construção | A obra com o material da loja, com o endereço só no bairro |
| Advocacia | **Sem galeria:** a estrutura física do escritório não se mostra (Provimento 205/2021; `../nichos/advocacia.md`) |

---

## 2. A estrutura

**Regra.** A galeria é uma **lista** (`<ul>`) de figuras (`<figure>` com `<img>` e `<figcaption>`), dentro de uma seção com título. É a mesma marcação no celular e no computador; só o CSS muda:

| Largura | Disposição |
|---|---|
| Celular (abaixo de 768 px; 1024 px na variante larga) | **Fila de deslizar:** uma linha horizontal com encaixe, que sangra até a borda da tela; a peça seguinte aparece pela borda e convida o dedo |
| Computador | **Grade**, com os utilitários do Tailwind (`md:grid md:grid-cols-3 md:gap-6`) |

**Objetivo.**
- **No celular,** uma grade de três colunas vira miniaturas ilegíveis, e uma coluna só vira uma página interminável. A fila mostra uma foto grande de cada vez e diz, pela borda da seguinte, que há mais.
- **Sem script,** tudo funciona: a rolagem e o encaixe são do navegador.

```tsx
// A galeria: servidor, sem script. As setas (seção 5) são a única ilha, e opcional.
<section aria-labelledby="obras-titulo">
  <h2 id="obras-titulo">Obras com material da casa</h2>
  <div className="galeria-quadro">
    <ul className="galeria gap-4 md:grid md:grid-cols-3 md:gap-6" data-galeria="obras">
      {obras.map((obra, i) => (
        <li key={obra.id}>
          <figure>
            <img
              src={obra.foto.src}
              srcSet={obra.foto.srcSet}
              sizes="(min-width: 768px) 33vw, 84vw"
              width={obra.foto.largura}
              height={obra.foto.altura}
              alt={obra.foto.alt}
              loading={i === 0 && obra.naPrimeiraTela ? "eager" : "lazy"}
              fetchPriority={i === 0 && obra.naPrimeiraTela ? "high" : undefined}
              decoding="async"
              className="esqueleto aspect-4/5 w-full rounded-2xl object-cover"
            />
            <figcaption>{obra.legenda}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
    <div className="galeria-trilho" aria-hidden="true" />
  </div>
</section>
```

---

## 3. O CSS da fila de deslizar

```css
/* A galeria de deslizar, no celular (generalizada de web/app/vidro.css, no repositório do Atlas).
   Abaixo de 768 px, a lista vira uma fila horizontal com encaixe, que sangra até a borda da tela.
   A partir dele, volta a ser a grade (md:grid, no componente). */
@layer components {
  .galeria-quadro {
    timeline-scope: --galeria;  /* o trilho, irmão da fila, lê a rolagem dela */
    --galeria-margem: 24px;     /* a margem lateral da página (px-6) */
  }
  @media (min-width: 768px) {
    .galeria-quadro { --galeria-margem: 40px; }
  }
  @media (max-width: 767.98px) {
    .galeria-quadro > .galeria {
      display: flex;
      overflow-x: auto;
      overscroll-behavior-x: contain;               /* o fim da fila não arrasta a página */
      scroll-snap-type: x mandatory;
      scroll-padding-inline: var(--galeria-margem);
      margin-inline: calc(-1 * var(--galeria-margem)); /* sangra até a borda da tela */
      padding-inline: var(--galeria-margem);
      margin-top: -4px;
      padding-block: 8px;                           /* folga para o anel de foco não ser cortado */
      scrollbar-width: none;
      scroll-timeline: --galeria x;
    }
    .galeria-quadro > .galeria > * {
      flex: 0 0 min(84%, 22rem);                    /* a peça seguinte aparece pela borda */
      scroll-snap-align: start;
    }
  }
  .galeria::-webkit-scrollbar { display: none; }
}
```

O vão entre as peças é o utilitário `gap-*` da lista, o mesmo na fila e na grade.

**As medidas e o porquê de cada uma:**

| Medida | Valor | Por quê |
|---|---|---|
| Largura da peça | `min(84%, 22rem)` | Sobram ~16% da tela para a borda da seguinte, que é o convite a deslizar. O teto de 22rem impede a peça gigante no tablet |
| Margem lateral | A da página (24 px; 40 px a partir de 768 px) | A fila sangra **exatamente** até a borda da tela. Até 03.10, eram 22 px, fora da grade de 4 px |
| Folga em cima e embaixo | 8 px dentro da rolagem, com −4 px de margem em cima | Sem ela, a rolagem corta o anel de foco (2 px, a 3 px da peça). Até 03.10, a folga era de 4 px, e o anel perdia 1 px |
| `overscroll-behavior-x: contain` | — | No fim da fila, o gesto não passa para a página nem vira o "voltar" por deslize, onde o navegador o liga à rolagem lateral [FU] |
| `scroll-snap-type: x mandatory` | — | A peça para inteira na tela, nunca cortada ao meio |

**Variante larga.** Uma lista que precisa de mais espaço (cartões com texto) vira fila até 1024 px, com peças de `min(86%, 24rem)` (a classe `.vd-galeria-lg` da referência).

---

## 4. O trilho do avanço

**Regra.** Sob a fila, um trilho de 2 px com um polegar que anda **com a rolagem da própria galeria**, por CSS (`animation-timeline`), sem script. Onde o navegador não tem a linha do tempo de rolagem, o trilho não aparece.

**Objetivo.** No celular, a galeria de deslizar esconde o que vem depois. O trilho mostra que há mais e quanto falta, sem script e sem seta sobre a foto. Onde o navegador não acompanha a rolagem, o trilho some, porque um polegar parado mentiria.

```css
.galeria-trilho {
  display: none;
  position: relative;
  height: 2px;
  margin-top: 16px;
  overflow: hidden;
  border-radius: 2px;
  background: color-mix(in srgb, var(--foreground) 14%, transparent);
}
.galeria-trilho::after {
  content: "";
  position: absolute;
  inset-block: 0;
  left: 0;
  width: calc(var(--galeria-polegar, 0.34) * 100%); /* o polegar: a fração de uma peça */
  border-radius: inherit;
  background: var(--accent);
}
@supports (animation-timeline: scroll()) {
  @media (max-width: 767.98px) {
    .galeria-quadro > .galeria-trilho { display: block; }
  }
  /* A linha do tempo só onde ela existe: sem suporte, a animação correria inteira na carga. */
  .galeria-trilho::after {
    animation: galeria-avanco linear both;
    animation-timeline: --galeria;
  }
}
@keyframes galeria-avanco {
  to { translate: calc((1 / var(--galeria-polegar, 0.34) - 1) * 100%) 0; }
}
```

**Objetivo.** Dizer onde se está na fila, já que a barra de rolagem fica escondida.

**Não é animação que acompanha a rolagem da página.** É um indicador de posição, como uma barra de rolagem, ligado à rolagem horizontal da própria galeria, pela mão de quem desliza. A regra "nada ligado à posição da rolagem" excetua o indicador de progresso e pede a guarda do `@supports`: sem ela, o navegador sem suporte dispara a animação inteira na carga (`../09-movimento.md`, seção 5, item 7). Por isso a `animation` e a `animation-timeline` do polegar ficam **dentro** do `@supports`, e não só o `display` do trilho: é o que a verificação do CSS compilado confere (`../../qualidade/03-estatica.md`, seção 5, regra 3), e a declaração fora dele reprovaria o build. O trilho não se move sozinho e fica igual com movimento reduzido, como fica uma barra de rolagem.

---

## 5. As setas [P][C, opcional]

**Regra.** Quando a fila continua fila também no computador — muitas peças numa linha só, como a "Galeria do balcão" do depósito (`web/app/demos/deposito/materiais/page.tsx`, no repositório do Atlas) —, duas setas rolam a fila uma peça para cada lado. Na grade, não há setas. Elas seguem quatro comportamentos:
- **Nas pontas:** no começo da fila, a de voltar fica desabilitada; no fim, a de avançar; as duas, se a fila cabe inteira (até 03.10, nesse caso, ficavam ativas e não faziam nada).
- **`aria-disabled`, não `disabled`:** a seta que se desabilita sob o foco (no fim da fila, pelo teclado) não o perde.
- **Movimento reduzido:** a fila salta, em vez de deslizar.
- **Antes do script:** a fila está no começo; voltar desabilitada, avançar ativa.

**Objetivo.** No computador, sem tela de toque, a rolagem lateral pede o trackpad ou Shift com a roda. As setas tornam o gesto óbvio.

```tsx
// components/ilhas/setas-da-galeria.tsx (da referência do Atlas; a forma segue a identidade: pílula ou círculo por padrão)
"use client";

import { useEffect, useState } from "react";

export function SetasDaGaleria({ alvo, rotulos }: { alvo: string; rotulos: [string, string] }) {
  const [noComeco, setNoComeco] = useState(true);
  const [noFim, setNoFim] = useState(false);

  useEffect(() => {
    const faixa = document.querySelector<HTMLElement>(`[data-galeria="${alvo}"]`);
    if (!faixa) return;
    let quadro = 0;
    const ler = () => {
      quadro = 0;
      // Um pixel de folga: a rolagem fracionária (zoom, tela de alta densidade) não chega ao inteiro.
      setNoComeco(faixa.scrollLeft <= 1);
      setNoFim(faixa.scrollLeft + faixa.clientWidth >= faixa.scrollWidth - 1);
    };
    const pedir = () => {
      if (!quadro) quadro = requestAnimationFrame(ler); // uma leitura por quadro, no máximo
    };
    ler();
    faixa.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir, { passive: true });
    return () => {
      faixa.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      cancelAnimationFrame(quadro);
    };
  }, [alvo]);

  const rolar = (sentido: 1 | -1) => {
    const faixa = document.querySelector<HTMLElement>(`[data-galeria="${alvo}"]`);
    const peca = faixa?.firstElementChild as HTMLElement | null;
    if (!faixa || !peca) return;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // O vão entre as peças vem do CSS (gap): a referência somava 16 px fixos.
    const vao = parseFloat(getComputedStyle(faixa).columnGap) || 0;
    faixa.scrollBy({ left: sentido * (peca.offsetWidth + vao), behavior: reduzir ? "auto" : "smooth" });
  };

  return (
    <div className="flex gap-2">
      {([-1, 1] as const).map((sentido, i) => {
        const desabilitada = sentido < 0 ? noComeco : noFim;
        return (
          <button
            key={sentido}
            type="button"
            aria-disabled={desabilitada || undefined}
            onClick={() => !desabilitada && rolar(sentido)}
            className="grid size-12 cursor-pointer place-items-center rounded-full border border-foreground/40 transition-colors duration-300 aria-disabled:cursor-not-allowed aria-disabled:opacity-40 not-aria-disabled:hover:bg-primary not-aria-disabled:hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <span className="sr-only">{rotulos[i]}</span>
            <svg viewBox="0 0 16 16" aria-hidden="true" className={`size-4 ${sentido < 0 ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2 8h11M9 4l4 4-4 4" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
```

**Os rótulos** dizem o que fazem: "Foto anterior" e "Próxima foto"; "Obra anterior" e "Próxima obra".

**Cantos.** Pílula ou círculo, pela preferência de cantos arredondados (`CLAUDE.md` do Atlas, 03.10). A referência do depósito é quadrada pela identidade da marca, que segue em aberto.

---

## 6. Teclado e leitor de tela

**Regra.**
- **Com peças focáveis** (vínculo para a página do imóvel, da obra): o Tab percorre as peças, e o navegador rola a fila até a que recebe o foco. O anel de foco aparece inteiro (a folga da seção 3).
- **Com peças que não são focáveis** (só a foto e a legenda): a fila é focável, para rolar com as setas do teclado. Ela leva `tabIndex={0}`, `role="region"` e um nome (`aria-label="Galeria de obras; deslize para ver mais"`).
- **A lista** é anunciada como lista, com o número de itens ("lista, 8 itens").
- **As setas da seção 5** são botões com nome; desabilitadas, anunciam o estado.

**Objetivo.** WCAG 2.1.1: tudo o que se faz com o dedo se faz pelo teclado. A regra `scrollable-region-focusable` do axe reprova a região de rolagem sem nada focável dentro.

**Como conferir.**
- **axe**, no celular (390 px) e no computador (`../../qualidade/06-acessibilidade.md`).
- **Teclado:** do primeiro ao último item só com Tab ou com as setas do teclado; a última peça fica inteira na tela.
- **Leitor de tela:** a lista e o número de itens; a legenda lida com a foto.

---

## 7. As imagens

**Regra.**

| Item | Como |
|---|---|
| Formato e preparo | Os de `../08-imagem-e-fotografia.md`: AVIF e WebP, pré-gerados fora do site. Com os dois formatos, `<picture>` com `<source type="image/avif">` e o `<img>` em WebP. A ferramenta de preparo do Atlas grava WebP pelo Chrome sem janela, sem dependência (`../13-tecnologia-e-estrutura.md`, seção 4) |
| Dimensões | `width` e `height` sempre, ou `aspect-ratio` no CSS: a foto que chega não empurra o texto (CLS ≤ 0,05) |
| Tamanhos | `srcset` com as larguras que o leiaute usa (por exemplo, 480, 960, 1440 e 1920 px; `../08-imagem-e-fotografia.md`) e `sizes` coerente com o CSS (`84vw` no celular; a coluna da grade no computador) |
| Carga | `loading="lazy"` em tudo que nasce fora da primeira tela; a foto que é a maior da primeira tela (o LCP) **sem** `lazy` e com `fetchpriority="high"` |
| Decodificação | `decoding="async"` |
| Esqueleto | O fundo apagado do tom (`--muted`) no próprio `<img>`, com o raio do contêiner, até a foto chegar. Pulsa devagar seis vezes e para; com movimento reduzido, não pulsa. O pulso pode ser pela cor do fundo, que não toca a foto já carregada mas repinta a cada quadro, ou pela opacidade, que não repinta mas pulsaria a foto: nesse caso, um script cancela o pulso quando a foto chega. No Atlas, desde 18.10.2026, é pela opacidade, de 1 a 0,55, com o cancelamento no script do `<head>` (referência: `.vd-esqueleto`, `web/app/vidro.css`, e `web/app/layout.tsx`; `../08-imagem-e-fotografia.md`, seção 8, item 6) |
| Texto alternativo | Descreve o que a foto mostra e por que importa ("Contrapiso nivelado numa sala de 12 m², em Icaraí"), nunca "foto" ou o nome do arquivo |
| Legenda | O quê, onde e, quando importa, quando. Na imobiliária, a data da foto |
| Pessoa na foto | Só com autorização de uso de imagem, guardada pelo cliente |
| Arquivo cru | **Nunca** em `public/`: tudo o que está lá pode ser pedido pelo endereço, inclusive a foto de vários MB com os dados de localização gravados |

**Objetivo.** A galeria é a parte mais pesada do site. Sem esses cuidados, ela empurra o texto enquanto carrega (o CLS reprova) e, no extremo, trava o aparelho médio (`../15-desempenho.md`, seção 2.1, a barreira do travamento).

**Como conferir.**
- **Régua, bloco 5:** o peso da página e o CLS.
- **Teste:** toda `<img>` tem `alt`, `width` e `height`, e só a do LCP sai sem `lazy`.

---

## 8. Ampliar a foto

**Regra.**
- **[P]:** a foto pode ser um vínculo para a versão grande dela (o próprio arquivo), que abre sem script.
- **[C]:** um visualizador em `<dialog>` nativo é opcional (RATIFICADO). Se houver, segue as regras do diálogo (`01-base-de-todo-site.md`, seção 17):
  - foco preso dentro e Esc fecha;
  - o foco volta à miniatura;
  - as setas do teclado passam de foto;
  - sem passagem automática.

**Objetivo.** Ver o detalhe (o acabamento do piso, o corte) sem tirar a pessoa do site. O visualizador é ilha, e só entra onde o detalhe vende.

---

## 9. O que nunca se faz

| Proibido | Por quê |
|---|---|
| **Carrossel que anda sozinho** | A NN/g mostra que o carrossel automático é ignorado e irrita: tira o controle de quem lê, e a mensagem passa antes de ser lida (https://www.nngroup.com/articles/auto-forwarding/) [V]. Movimento automático acima de 5 s exige pausa (WCAG 2.2.2) |
| Fila infinita (a primeira peça depois da última) | Quem chega ao fim não sabe que voltou ao começo |
| Vídeo que toca sozinho com som | — |
| Rolagem com inércia própria (biblioteca) | A rolagem é a nativa (`../nichos/README.md`, seção 3.5) |
| Galeria de terceiro embutida (Instagram, Google Fotos) | Pedido externo, cookie de terceiro, política de conteúdo quebrada; o conteúdo some se a conta mudar |

---

## 10. Como conferir, em resumo

| Verificação | Onde |
|---|---|
| Nenhuma rolagem lateral da **página** em 320 px (só a da fila) | Régua, bloco 1 |
| A fila funciona sem script; as setas aparecem desabilitadas como devem antes da hidratação | Régua, bloco 2; teste de ponta a ponta |
| As setas nas pontas: `aria-disabled` no começo e no fim, e o foco não se perde | Teste de ponta a ponta |
| A região focável, com nome, quando as peças não são focáveis | axe |
| `alt`, `width`, `height` e `lazy` certos | Teste de conteúdo |
| Peso e CLS | Régua, bloco 5 |
| Fotos reais, legendadas, com autorização onde há pessoa | Revisão humana; lista do nicho |
