---
description: Etapa 4 — propõe a identidade (identidade.md) e a traduz em tokens e fontes, para aprovação
---

Etapa 4 (`producao/esteira/04-direcao-de-arte.md`; `producao/03-da-identidade-ao-codigo.md`; `producao/01-roteiro-da-sessao.md`, etapa 4).

1. Leia:
   - `briefing.md`: os adjetivos, as referências, as fotos e o logotipo;
   - `producao/esteira/nichos/<nicho>.md`: a direção de arte do nicho;
   - `producao/esteira/04-direcao-de-arte.md`;
   - `producao/esteira/05-tipografia.md`;
   - `producao/esteira/06-cor-forma-e-superficie.md`;
   - `producao/esteira/09-movimento.md`, na camada do plano, e a seção 12 (os efeitos da identidade);
   - `producao/esteira/00-principios.md`, seção 9 (o piso do acabamento e o teste da vitrine);
   - `producao/esteira/19-o-padrao-atlas.md` inteiro (o padrão Atlas: a anatomia, as cenas, o que o plano restringe e o método);
   - `producao/esteira/11-anti-ia.md`;
   - para ver como uma identidade vira código, os três sites de exemplo (`producao/referencias/README.md`), para estudo e nunca para cópia.
2. Escreva o `identidade.md` completo, pelo modelo:
   - o briefing visual em cinco linhas;
   - os adjetivos por pares de opostos, com consequências escritas;
   - as cinco referências do mundo físico;
   - o plano de design (4 a 6 cores por função, os tipos e os papéis deles, o leiaute em uma frase com esboço ASCII, os princípios);
   - o gesto do plano;
   - **o acabamento:** as sete camadas e os efeitos da identidade derivados da matéria da marca, na tabela "O acabamento", com o exemplo do mesmo plano como referência da vitrine (nutrição, depósito, barbearia);
   - **o roteiro de cenas da página inicial** (`producao/esteira/19-o-padrao-atlas.md`, seção 4): cada cena com o esboço, o valor do fundo, o evento tipográfico, a imagem e o efeito. A composição nasce aqui, e não da página de fábrica da base, que é andaime;
   - no Completo, a peça-assinatura, como objeto de vitrine;
   - **as peças de terceiros**, só depois de escritos o mundo da marca, o acabamento e o vocabulário de interação. Para cada tradução que pede uma mecânica pronta, procure a peça em `producao/componentes/catalogo.md`, pela função e pela marca de plano. Anote, ao lado da tradução, a peça, a origem e a licença. O catálogo nunca escolhe o desenho (`producao/esteira/09-movimento.md`, seção 6.4). Varie: não repita a peça que outro site do mesmo nicho já usa (`producao/componentes/README.md`, seção 5).
3. **O teste do prompt parecido** (`producao/esteira/11-anti-ia.md`, passo 3): compare o plano com o que sairia de um pedido genérico ("site de <nicho> de bairro") e revise o que coincidir. Toda escolha por omissão ganha motivo escrito ou sai.
   - **[P][C]:** os painéis de estilo, dois ou três (tipo, cor, textura e um botão, sem página), e o teste de unicidade contra os clientes do mesmo nicho e três concorrentes locais (`identidade.md`, seções 5 e 7; `producao/esteira/04-direcao-de-arte.md`).
4. Traduza o plano em código, só depois de escrito:
   - os tokens em `app/identidade.css`, com o contraste de cada par anotado;
   - as fontes, por `node ferramentas/baixar-fonte.mjs` (com a licença), em `app/fontes.ts`;
   - o `app/icon.svg`.

   Confira com `npm run paleta`. Depois, `npm run build`, o site servido em segundo plano e `node ferramentas/fotografar.mjs`: mostre as capturas de 1440 px da página inicial com a identidade nova. As de 390 px são do passe do celular, na construção (`producao/esteira/00-principios.md`, seção 5).
5. **Pare para a aprovação** de Matheus Castro Oliveira de Luna Garcia, ou de outro sócio de desenvolvimento. Nunca Gabriel Ribeiro Ota Yida sozinho (`producao/esteira/01-processo.md`, seção 1). Registre a aprovação no `identidade.md` ("Aprovada em").

**Porta:** a avaliação anti-IA do plano, sem escolha por omissão sem motivo.
