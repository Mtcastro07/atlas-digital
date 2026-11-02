# 04 · A construção

> **Para que serve.** Como construir as páginas e as funcionalidades de um site sobre a base (`base/`), sem reinventar o que ela já resolve e sem quebrar o que a régua confere. Traz:
> - os componentes;
> - as receitas: página, seção, ilha, foto, modo servidor;
> - o que cada plano acrescenta;
> - a conferência a cada passo.
>
> **Quando ler.** Na etapa 6, com o `identidade.md` aprovado e o `conteudo/` escrito.
>
> **Atualizado em:** 08.10.2026.

---

## 1. O que a base já resolve (não refazer)

| Precisa de | Use | Não faça |
|---|---|---|
| A ação principal | `<AcaoWhatsApp />` (rótulo e mensagem de `conteudo/site.ts`; `discreta` para a versão de borda) | Outro botão de WhatsApp com vínculo escrito à mão |
| Telefone, endereço, mapa | `<Endereco />`, `<VinculoDoMapa />`, `telefoneVisivel()` | `<iframe>` de mapa; endereço digitado de novo |
| O horário | `<Horario />` (dia a dia) e `horarioResumido()` (uma linha) | Horário escrito como texto em `site.ts`: ele sai do `expediente` |
| Preço e duração | `reais()` e `duracao()` | Formatar à mão |
| Os metadados da página | `export const metadata = metadadosDaPagina(paginaDe("<id>"))` | `title` escrito na página |
| O texto legal | `<TextoLegal />` com `conteudo/legal.ts` | Página legal em JSX |
| O menu, o cabeçalho, o rodapé, a troca de página, a página que abre no topo, a 404, os erros | Já montados no `layout.tsx` e no `template.tsx` | Um segundo cabeçalho; um menu com estado próprio; um `<ViewTransition>` na troca de página |
| A revelação ao entrar na tela | `data-revela` só na seção em que a entrada é o momento da cena (abaixo da dobra; nunca no título nem no lide da primeira tela) | A mesma entrada em todas as seções, ou em cada item de uma lista; nenhum efeito em série (`producao/esteira/20-repeticao-dentro-do-site.md`; `producao/esteira/11-anti-ia.md`, M1) |
| O recuo lateral | `envelope` | `px-6 md:px-10` (perde a área segura do celular com recorte) |

## 2. Receita: página nova

**Dentro do limite do plano**, que está no `CLAUDE.md`. As páginas legais não contam.

**A abertura de cada página interna é o momento dela** (09.10.2026): o dispositivo sai do conteúdo da página (o cardápio que se desdobra, o mapa que se desenha, a ficha que vira), e não a mesma entrada de título em todas (`producao/esteira/19-o-padrao-atlas.md`, seção 6). A receita abaixo dá as funções; a forma é do roteiro.

1. **O id:**
   - acrescente o id ao tipo `Pagina["id"]`, em `conteudo/site.ts`;
   - acrescente a entrada em `paginas`: `caminho` sem barra final, `rotulo` para o menu, `titulo` sem a marca, `tituloCurto` e `descricaoCurta` para o cartão, e `descricao` até ~155 caracteres;
   - o menu, o rodapé e o mapa do site seguem a lista sozinhos.
2. **Os textos da página:** em `conteudo/site.ts`, num objeto próprio (por exemplo, `equipePagina`), nunca no JSX.
3. **O arquivo `app/<caminho>/page.tsx`:**

   ```tsx
   // app/equipe/page.tsx — <o objetivo da página, em uma frase, do ROTEIRO> (producao/esteira/nichos/<nicho>.md, seção 4).
   import { equipePagina, paginaDe } from "@/conteudo/site";
   import { metadadosDaPagina } from "@/lib/metadados";

   export const metadata = metadadosDaPagina(paginaDe("equipe"));

   export default function Equipe() {
     const pagina = paginaDe("equipe");
     return (
       <main id="conteudo" tabIndex={-1} className="outline-none">
         <section className="envelope mx-auto max-w-pagina pt-14 pb-10 md:pt-20">
           <h1 className="max-w-[18ch] text-display font-semibold">{pagina.titulo}</h1>
           <p className="mt-6 max-w-[52ch] text-destaque text-muted-foreground">{equipePagina.lide}</p>
         </section>
         <section className="envelope mx-auto max-w-pagina py-12">…</section>
       </main>
     );
   }
   ```

   **Regras da página:**
   - um `<h1>`;
   - `id="conteudo"` no `<main>`, porque "Ir para o conteúdo" leva até ele;
   - os títulos de seção em `<h2>`, sem saltar nível;
   - a ação na primeira tela do celular, nas páginas de decisão;
   - `<Link>` para as páginas do site, e `<a target="_blank" rel="noopener noreferrer">` com "abre em nova aba" para fora.
4. **A conferência:**
   - `npm run build`;
   - `npm run regua -- --base=http://localhost:3100 --pagina=/equipe` (com `--rapida` durante o trabalho; sem, antes de dizer que está pronta);
   - as capturas: a 1440 px no passe da mesa, a 390 px no passe do celular, cada um na sua vez (`producao/esteira/00-principios.md`, seção 5).

**As páginas que não contam no limite:**
- as legais (privacidade, acessibilidade);
- as do módulo: a marcação, a confirmação, o cancelamento e o painel da Agenda; a confirmação do formulário (`producao/esteira/03-planos.md`, seção 8).

**Página adicional** (módulo): igual, contada no limite com as adicionais do `CLAUDE.md`. O que excede o limite é orçado antes (`producao/esteira/03-planos.md`, seção 7).

## 2b. A página inicial da base é andaime

**Regra** (DECIDIDO em 09.10.2026, pedido do usuário: "nossos clientes querem sites tão trabalhados como o Atlas"). Da página inicial da base ficam as **funções** (os componentes do cabeçalho, do horário, do endereço, do mapa, do rodapé legal, os metadados), nunca a **composição**: a ordem das seções, a capa em duas colunas com o cartão à direita, o fundo claro único, a grade de "o que não se faz aqui", o rodapé em três colunas. A composição sai do roteiro de cenas do `identidade.md` (`producao/esteira/19-o-padrao-atlas.md`, seções 4 e 8.1).

**Objetivo.** Os dois sites de 09.10.2026, a odontologia e o restaurante, repetiram o esqueleto da base seção por seção, com a fonte e a cor da marca por cima, e ficaram abaixo do Atlas e da barbearia.

**Como conferir.** O teste da troca de pele (`19-o-padrao-atlas.md`, seção 3): sem as fontes e as cores da marca, a página não pode ser a da base.

## 3. Receita: seção nova e peça da marca

- **Componente de servidor,** um arquivo por seção em `components/secoes/<nome>.tsx` (`producao/esteira/13-tecnologia-e-estrutura.md`, seção 2). A base, de três páginas pequenas, mantém as seções no arquivo da página. Ao acrescentar uma seção, ou numa página com mais de três, mova-as para `components/secoes/`.
- **O texto** vem de `conteudo/`; a cor, de um token; o espaço, da escala de 4 px.
- **A composição** (`producao/esteira/07-composicao.md`; `producao/esteira/11-anti-ia.md`):
  - nenhuma grade de cartões iguais para conteúdo que não é igual;
  - numeração (01, 02) só para o que é sequência;
  - nenhum rótulo em caixa-alta acima de cada título;
  - a peça que não cabe no celular ganha disposição própria (tabela em fichas, conta em coluna), nunca só encolhida.

  O exemplo da base: Serviços é tabela na mesa e fichas no celular, sem duplicar títulos no DOM.
- **Peça desenhada** (figura, mapa do bairro, ilustração):
  - SVG próprio, com o desenho à mão;
  - passa no teste do desconhecido (`producao/esteira/04-direcao-de-arte.md`, passo 8);
  - nunca ilustração improvisada que finge foto.

## 4. Receita: ilha nova (`"use client"`)

Só onde há estado: menu, galeria, montador, calculadora, agendador. A esteira detalha em `producao/esteira/13-tecnologia-e-estrutura.md`, seção 3.1.

1. **Onde:** em `components/ilhas/<nome>.tsx`, com `"use client"` na primeira linha.
2. **O que recebe:** só os campos que usa, por props ou `children`. **Nunca importa `conteudo/site.ts`:** ele iria serializado para o script de toda página. Pode importar `conteudo/contato.ts`.
3. **Sem `cn`, sem biblioteca nova.** Componente do shadcn, só pela receita de `03-da-identidade-ao-codigo.md`, seção 7. Peça de outra biblioteca, só pelo catálogo, com a licença relida e o aviso ao lado do código (`componentes/README.md`, seção 2).
4. **Movimento:** com movimento reduzido, nada se desloca, e o estado diz a verdade (`producao/esteira/09-movimento.md`, seção 5).
5. **Sem script:** a página continua usável. O menu leva ao índice do rodapé; o montador mostra a tabela.
   **Preso à tela:** nada com `position: fixed` dentro de `app/template.tsx`: a caixa da entrada animada vira a referência dele. Vai no layout, ou num portal para o `<body>` depois da hidratação (`producao/esteira/15-desempenho.md`, seção 5.15).
6. **Medir:** o script inicial pela régua, no bloco 5, antes e depois. Nos sites de marca não há teto desde 08.10.2026, à noite (eram 600 KB, e 180 até a véspera), e a base dá 116,1 KB: o peso compra o acabamento que se vê, nunca dependência sem efeito na tela.

## 5. O logotipo e o mapa

**O logotipo do cliente** (do briefing, seção 7):
- **Arquivo em vetor (SVG):** limpe-o (sem metadados, sem `<script>`, sem fonte externa) e sirva-o como componente de servidor ou de `public/marca.svg`, com `alt` = o nome do negócio. A variante escura só se a identidade usar fundo escuro.
- **Só em imagem:** `preparar-fotos` com `--proporcao=original` e as larguras do cabeçalho (por exemplo, `--larguras=240,480`).
- **Foto de frente:** é provisória, registrada no `decisoes.md` como logotipo provisório. Nunca se redesenha o logotipo do cliente sem pedido.
- **Sem logotipo:** o nome em texto, na fonte do título, como a base faz.
- **No cabeçalho:** o vínculo para o início continua com o nome acessível do negócio.

**O mapa do bairro** (`producao/esteira/14-funcionalidades/01-base-de-todo-site.md`, seção 3; no Essencial, entra na página do lugar):
1. **O ponto:** grave `geo` em `conteudo/negocio.ts` com as coordenadas conferidas no mapa. Sem `geo`, a ferramenta procura o endereço no Nominatim e imprime o ponto achado, que se confere antes de usar.
2. **A geração:** `node ferramentas/gerar-mapa.mjs` (rede; sandbox desligado) grava `components/mapa-do-bairro.tsx`:
   - as ruas, a água e as praças do OpenStreetMap, num raio de 350 m;
   - o ponto na cor da ação;
   - o crédito "© colaboradores do OpenStreetMap" na legenda.

   A página Onde já o usa. Quando a Overpass principal responde 504, a ferramenta tenta outras instâncias.
3. **O desenho:** as cores e as espessuras são os tokens. Se a direção de arte pedir outro traço, ajuste-o no componente gerado e registre.
4. **Sem mapa:** `node ferramentas/gerar-mapa.mjs --sem-mapa` grava o componente vazio. O motivo vai no `decisoes.md`: por exemplo, a advocacia, se o desenho mostrasse o edifício.

## 6. As fotos

1. **O material cru** fica fora do git e de `public/`, em `material/`, que está no `.gitignore`.
2. **Prepare cada foto:**

   ```bash
   node ferramentas/preparar-fotos.mjs material/fachada.jpg fachada --proporcao=3:2
   node ferramentas/preparar-fotos.mjs material/dona.jpg dona --proporcao=1:1 --larguras=480,960 --topo=0.3
   ```

   O resultado:
   - WebP de qualidade 82, nas larguras que a foto alcança;
   - sem metadados de localização;
   - o `<img>` com `srcSet`, `sizes`, `width` e `height`, para colar.
3. **O `alt`** vai em `conteudo/`, descrevendo o que a foto mostra para quem decide: "a fachada azul, com a vitrine de rações", e não "foto da loja".
4. **A foto da primeira tela:** sem `loading="lazy"`, com `fetchPriority="high"`. As de baixo, preguiçosas, com esqueleto se demorarem (`producao/esteira/08-imagem-e-fotografia.md`).
5. **Sem foto:**
   - os substitutos de `producao/esteira/08-imagem-e-fotografia.md`: tipografia em escala, mapa do bairro, número como elemento gráfico, espaço;
   - nunca banco de imagens nem IA;
   - a foto que falta vai para o "Estado" como pendência, com o pedido ao sócio do briefing.
6. **Pessoas e animais:** só com a autorização de imagem assinada (`producao/esteira/modelos/autorizacao-de-imagem.md`); na do animal, a do tutor.

## 7. O que cada plano acrescenta à base

Para ver como cada camada ficou num site real, os três sites de exemplo do Atlas estão em código em `referencias/`, um por plano (`referencias/README.md`).

| Plano | Funcionalidade | Onde está | Estado no kit |
|---|---|---|---|
| **[E]** | A base inteira | `base/` | **Pronta e verificada** |
| **[P]** | Formulário (pedido organizado, com aviso de privacidade) | `producao/esteira/14-funcionalidades/02-formulario.md`; código em `modulos/formulario/` | Código pronto, com 39 testes e conferido contra banco real (MariaDB e MySQL); o envio por e-mail usa o `nodemailer`, e o limite em banco, o `mysql2`, aprovados em 08.10.2026 (`modulos/README.md`, seção 3) |
| **[P]** | Galeria | `producao/esteira/14-funcionalidades/03-galeria.md` | Especificação; construir pela receita de ilha |
| **[P]** | A funcionalidade do ofício (calculadora, montador, compositor de sintoma, grade de aulas) | `producao/esteira/14-funcionalidades/07-funcionalidades-do-oficio.md` e o nicho | Especificação, com a referência do Atlas descrita |
| **[P]** | Relatório mensal de acessos | `producao/esteira/14-funcionalidades/04-relatorio-de-acessos.md` | Sem código: o método decidido lê o painel da Hostinger toda semana. Só a alternativa não decidida, a contagem própria, pediria o `mysql2` |
| **[P][C]** | Os gestos: copiar, espera; a onda, o brilho, a inclinação, a pausa do ambiente | `producao/gestos/` | **Prontos e verificados** (compilam com a base; régua sem falha nos gestos) |
| **[todos]**, com a marca de plano de cada peça | As peças de terceiros, com a licença conferida para site vendido: objetos com gesto, galeria, transição, fundo vivo, 3D, ícones, blocos | `producao/componentes/` (o catálogo e o inventário) | **Catálogo de consulta:** nenhuma peça copiada nem medida; cada uma entra adaptada, medida e registrada no site (`componentes/README.md`, seção 2) |
| **[C]** | A segunda funcionalidade e a peça-assinatura (3D nas cinco condições) | `producao/esteira/14-funcionalidades/07` e `08`; `producao/esteira/09-movimento.md`, seção 7 | Especificação |
| **Módulo** | Agenda | `producao/esteira/14-funcionalidades/05-agenda.md`; código em `modulos/agenda/` | Pronta, com 87 testes, conferida contra banco real (MariaDB e MySQL): horários livres, conflito, convite, cancelamento, lembrete, painel com senha e sessão, e a caixa de consentimento da psicologia. O banco e o e-mail usam o `mysql2` e o `nodemailer`, aprovados em 08.10.2026 (`modulos/README.md`, seção 3) |
| **Módulo** | Presença | `producao/esteira/14-funcionalidades/06-presenca.md` | Serviço fora do site; sem código |

**As dependências.** As do kit entram sem novo pedido: a pilha da base, o Playwright da régua, o `@playwright/test` 1.64.0 e o `@axe-core/playwright` 4.13.0, das suítes de ponta a ponta e de acessibilidade (aprovados em 08.10.2026), e, nos módulos, o `nodemailer` e o `mysql2` (aprovados pelo usuário em 08.10.2026; `modulos/README.md`, seção 3). **Qualquer outra** pede autorização antes de instalar, com o motivo e o custo (`producao/esteira/13-tecnologia-e-estrutura.md`, seção 9); até a resposta, a funcionalidade entra na versão sem servidor que a esteira prevê, quando houver: o talão que compõe a mensagem e envia pelo WhatsApp (`producao/esteira/14-funcionalidades/02-formulario.md`, seção 10).

## 8. O modo servidor

1. **O padrão:** o `novo-site` já o escreve pelo plano e pelos módulos (`next.config.ts`: `process.env.SAIDA ?? "servidor"`). O `npm run pronto` acusa a combinação errada.
2. **Compilar e medir no modo servidor:** `npm run build && PORT=3100 npm run servidor`, o `server.js` do standalone, como a Hostinger o roda. O `postbuild` copia `public/` e `.next/static` para o standalone.
3. **Os cabeçalhos e os redirecionamentos** vêm do `next.config.ts`, e não do `.htaccess`.
4. **As variáveis de ambiente** (formulário, Agenda): o `.env.exemplo` do módulo lista os nomes. Os valores ficam no painel da Hostinger, nunca no repositório.
5. **A publicação:** `producao/esteira/18-publicacao-e-manutencao.md`, seção 2.

## 9. A cada passo

| Quando | O quê |
|---|---|
| A cada arquivo | `npm run build` (o TypeScript estrito para o build) |
| A cada página | A régua da página (`--pagina=/x --rapida`) e as capturas |
| A cada ilha | O script inicial, antes e depois |
| A cada texto | `npm run pronto` (os marcadores, o `[EXEMPLO]`, os campos) |
| Antes de dizer "pronto" | A régua inteira, sem `--rapida`; `npm test`; `npm run pronto`; e a etapa 7 do roteiro |
