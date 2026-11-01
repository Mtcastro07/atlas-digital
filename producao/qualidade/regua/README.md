# A régua (cópia de referência)

*Os caminhos deste arquivo partem da raiz do projeto: valem aqui, no kit, e na cópia que o `portar-regua` leva para `ferramentas/regua/` de cada site.*

Cópia dos cinco arquivos da régua (e da autoconferência do contraste, desde 16.10.2026) do repositório do Atlas (`web/ferramentas/regua/`), em 08.10.2026, para que um repositório novo não dependa do repositório privado do Atlas. O que cada bloco mede, os limites, a calibração e os resultados estão em `producao/qualidade/02-regua.md`; **como portá-la** para um site de cliente, na seção 9 de lá.

| Arquivo | O que faz |
|---|---|
| `regua.mjs` | O roteiro: descobre as páginas pelo `sitemap.xml`, roda as cinco passagens por página e grava o relatório em `.regua/relatorio.json` |
| `sondas.mjs` | As sondas que rodam dentro da página: geometria, degradação, semântica, composição, paridade, conformidade e registro verbal; a conversão de cor pelo canvas (`paraRgba`) e o texto acessível |
| `contraste.mjs` | O contraste medido nos pixels: a foto com e sem o texto, e a razão contra o fundo desenhado |
| `teclado.mjs` | O teclado: o foco que muda a aparência e a armadilha de foco (até 6 repetições, pelo campo de data) |
| `png.mjs` | A leitura de PNG para o contraste, sem dependência |
| `quadros.mjs` | A régua dos quadros (desde 28.10.2026 no kit): o ritmo de 60 por segundo na rolagem, no menu, na navegação e na figura, no celular 4× e na mesa, contado no rastro do Chrome; grava `.regua/quadros.json` na pasta corrente (`producao/qualidade/02-regua.md`, seção 12) |
| `autoconferencia.mjs` e `autoconferencia.html` | A autoconferência do contraste do texto misturado e, desde 17.10.2026, do texto das figuras e do meio-tom (fundos conhecidos, 23 verificações): `node ferramentas/regua/autoconferencia.mjs` (ou `node producao/qualidade/regua/autoconferencia.mjs`, para esta cópia). Não vai para o cliente: o `portar-regua` porta só os cinco arquivos acima e este README |

**Ao copiar para `ferramentas/regua/` do cliente:**
- Os pontos que mudam estão em `producao/qualidade/02-regua.md`, seção 9, passo 4:
  - o tipo de site pelo caminho (no Atlas, `/demos/` é "marca"; no cliente, tudo é marca);
  - o orçamento de marca, conferido contra o plano e o nicho;
  - a conformidade de exemplo (selo de ficção e `noindex`), que só vale para site de exemplo;
  - o bloco 9, que se inverte no site de cliente (o rodapé sem razão social e CNPJ é que se acusa);
  - as rotas só de desenvolvimento, e os rótulos dos controles do site em `sondas.mjs`.
- O resto não muda sem decisão registrada: a régua é a mesma para todo site.
- **Requisitos:**
  - o Playwright como dependência de desenvolvimento, autorizada para a régua (`producao/esteira/13-tecnologia-e-estrutura.md`, seção 10);
  - o Chrome instalado na máquina (`channel: "chrome"`);
  - o script `"regua": "node ferramentas/regua/regua.mjs"` no `package.json`;
  - `.regua/` no `.gitignore`.

**Origem e atualização.** A fonte é o repositório do Atlas. Quando a régua de lá mudar, esta cópia se atualiza, e a mudança entra no registro de decisões.

**Atualizações.** 08.10.2026: a calibração n.º 12 (`producao/qualidade/02-regua.md`, seção 6), achada no primeiro site estático, a base de `producao/base/` — o `HEAD` de conferência que o Next 16 manda a cada vínculo no export estático, relatado pelo Playwright como `ERR_ABORTED`, deixou de contar como pedido falho. Aplicada nesta cópia e na do Atlas (`web/ferramentas/regua/regua.mjs`), que continuam idênticas.

08.10.2026, à noite: quatro avisos novos, do teste de produção do zero (um site de odontologia no Completo, feito só com o kit): o rótulo de controle partido em duas linhas (bloco 1), o foco encoberto pelo cabeçalho no Shift+Tab (bloco 4), a linha acima de 80 caracteres e a fonte usada com `tabular-nums` sem algarismos tabulares (bloco 6). Nasceram como aviso, pela seção 10 de `producao/qualidade/02-regua.md`. Aplicados nas duas cópias, que continuam idênticas nos `.mjs`.

08.10.2026, mais tarde: a carga no celular (a passagem 2b: o LCP no 4G lento com a CPU 4× e os bytes contra a mesa) e o celular deitado (844 × 390: a geometria e o que fica preso à tela), todos como aviso, com o passe do celular (`producao/esteira/00-principios.md`, seção 5). Na mesma noite, os sites de marca ficaram sem teto de peso (`ORCAMENTOS.marca` vazio: o peso só se relata), e entrou o aviso da capa sem momento de exibição (o h1 abaixo de 4 vezes o corpo, na mesa). Por fim, a passagem 2b virou a barreira do travamento no aparelho médio (falha só no extremo: tarefa acima de 1 s, bloqueio somado acima de 3 s, mais de 10% de quadros lentos ao rolar, primeira tela acima de 10 s), no lugar dos avisos de LCP e de peso do celular.

16.10.2026: o texto misturado ao fundo (`mix-blend-mode` nele ou num ancestral até a `section`) mede a cor desenhada, e não a declarada. A razão é pixel a pixel, entre a foto com e a sem o texto, no miolo das letras. Vale o 10º percentil. Sem medida, o caso é aviso, nunca aprovação. Decisão do aprovador, Matheus Castro Oliveira de Luna Garcia ("Corrigir a régua"); calibração n.º 17 e bloco 4 de `producao/qualidade/02-regua.md`. **Duas pendências com o aprovador:** o miolo que o código usa (a metade dos pixels que a letra mais cobre, lida na letra sem mistura em preto e em branco) é uma proposta de Claude Code; a decisão diz "a metade dos pixels que mais mudam entre as duas capturas". E a escolha entre o 10º percentil (folga de cerca de 10% da letra) e o 5º (a folga do texto comum, que reprova o "a" do título da odontologia a 390 px com 2,60:1). Na mesma data, depois do crítico de fora: a caixa de 1 px medida também sem a transformação (o só para leitor de tela num ancestral girado ficava no aviso), a mistura lida a cada tela, e a autoconferência nesta pasta. Aplicada nesta cópia e na do Atlas (`web/ferramentas/regua/`), que continuam idênticas nos `.mjs`; o `portar-regua` porta sem mudança.

17.10.2026 ("o Atlas Digital"): o texto das figuras, que o contraste pulava por decorativo (o `<text>` dos SVG, o texto dos blocos `aria-hidden` e o número em meio-tom, `.vd-leitura canvas.valor`), se mede à parte e volta em `figuras`, como aviso até a calibração. O texto, pela cor declarada sobre o fundo fotografado sem a letra (com o halo de carta no fundo), no 5º percentil; o meio-tom, pela média da cobertura. Bloco 4 e calibração n.º 20 de `producao/qualidade/02-regua.md`. Aplicada nesta cópia e na do Atlas, que continuam idênticas.

28.10.2026: a régua dos quadros (`quadros.mjs`), cópia da do repositório do Atlas (`ferramentas/regua/quadros.mjs`, de 22.10.2026, a que mediu o Atlas em 27 e 28.10). O ritmo de 60 quadros por segundo passou a ser porta de entrega de todo site (`producao/esteira/15-desempenho.md`, seção 2.4). No site novo, as páginas vão por `--pagina` e o gatilho do menu e a figura do site se ajustam à mão (`producao/qualidade/02-regua.md`, seção 12).

**Porte automático.** `producao/ferramentas/portar-regua.mjs <pasta do site>` copia esta pasta para `ferramentas/regua/` do site e aplica os ajustes do passo 4 da seção 9 (o tipo de site, a conformidade lida de `conteudo/negocio.ts`, o aviso de CNPJ só no exemplo). Se a régua mudar e um trecho do porte deixar de existir, a ferramenta para e diz qual.
