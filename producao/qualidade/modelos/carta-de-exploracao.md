# Modelo · Carta de exploração

> **Quando usar.** Em cada sessão de exploração: de 45 a 90 minutos, sem interrupção, com um objetivo escrito antes de começar (`../01-metodologia.md`, seção 6). As cartas prontas por categoria estão em `../12-ataque-a-falhas.md`, seção 3.
>
> **Onde salvar.** `registros/exploracao--<assunto>--<aaaa-mm-dd>.md`, no repositório do cliente.

---

## A forma, para copiar

```markdown
# Exploração · <assunto>

**Carta:** Explorar <alvo> com <recursos> para descobrir <informação>.

| Campo | Valor |
|---|---|
| Data e duração | <dd.mm.aaaa> · planejada <N> min · real <N> min |
| Quem | <nome> |
| Categoria | <12-ataque-a-falhas.md, seção 2.N> |
| Risco que motivou | <item da matriz de risco e a nota> |
| Ambiente | <build de produção | standalone | homologação | publicado> · commit <hash> |
| Aparelhos e larguras | <…> |
| Dados e condições | <relógio, fuso, rede, preferências, conteúdo de teste> |

## Notas da sessão
| Hora | O que tentei | O que vi |
|---|---|---|

## Defeitos
- <título> → `defeito--<assunto>--<data>.md` (S<n>)

## Perguntas
- <pergunta> → <para quem>

## Novas cartas
- Explorar <…> com <…> para descobrir <…>

## O que ficou de fora
- <o que a sessão não cobriu, e por quê>
```

---

## Exemplo preenchido: as interações do site do Atlas e dos sites de exemplo (03.10.2026)

Caso real. Na revisão de qualidade e segurança do código de 03.10.2026, as interações foram conferidas à mão: o menu, o simulador, o montador, o copiar, a calculadora, o agendador e as âncoras. Dessa conferência saíram dois defeitos, deixados para decisão do usuário e corrigidos em 07.10 (`web/CLAUDE.md`, no repositório do Atlas). A conferência não teve carta. A folha abaixo é como ela teria sido registrada com este modelo: os achados são os reais, e a duração e as notas por hora não foram registradas na época.

# Exploração · As interações depois da revisão de código

**Carta:** Explorar as ilhas do site do Atlas e dos três sites de exemplo com a navegação interna, as âncoras e o relógio do dia para descobrir o comportamento que mudou ou que depende de quando e de como a página foi aberta.

| Campo | Valor |
|---|---|
| Data e duração | 03.10.2026 (um sábado) · duração não registrada |
| Quem | O Claude Code, na revisão pedida pelo usuário |
| Categoria | `12-ataque-a-falhas.md`, seções 2.4 (tempo) e 2.6 (navegação e estado) |
| Risco que motivou | Uma revisão de código mexeu em duas ilhas e tirou lógica repetida: o comportamento podia ter mudado |
| Ambiente | Build de produção, local (porta 3100) |
| Aparelhos e larguras | Chrome; as sete páginas do Atlas e os dezesseis endereços dos sites de exemplo |
| Dados e condições | O relógio real, de um sábado (o depósito fecha às 13h no sábado) |

## Notas da sessão
| Hora | O que tentei | O que vi |
|---|---|---|
| — | O menu do celular, o simulador, o montador, copiar, a calculadora, o agendador, as âncoras do início | Funcionam como antes da revisão |
| — | Abrir O Atlas pela navegação interna, num aparelho sem ponteiro, e rolar até o símbolo | O globo de O Atlas e o do rodapé novo não giram ao aparecer; abrindo a página pela carga, giram |
| — | A página Entrega do depósito, no sábado | O marcador "Agora" aparece sobre a linha do dia útil (7h às 18h), até as 18h, depois de a loja ter fechado às 13h |
| — | A pasta `public/socios/` | As fotos JPEG originais dos sócios são servidas, mas o site não as usa |

## Defeitos
- Os globos não giram nas páginas abertas pela navegação interna (S3): `giro-do-globo.tsx` procurava os globos só na carga. Corrigido em 07.10, com a procura a cada troca de caminho.
- O "Agora" do depósito no sábado, sobre a linha dos dias úteis e depois do fechamento (S3): a regra do dia útil foi esquecida. Corrigido em 07.10: some no sábado e no domingo.

## Perguntas
- As fotos originais em `public/socios/` saem? → o usuário (continua em aberto: `../12-ataque-a-falhas.md`, seção 5).

## Novas cartas
- Explorar toda lógica de horário com o relógio **fixado** em sábado, domingo e nos minutos de fronteira para descobrir o estado errado. *O defeito do sábado só apareceu porque a revisão caiu num sábado; com o relógio fixo, aparece em qualquer dia (`../05-ponta-a-ponta.md`, seção 5.5).*
- Explorar cada efeito que depende de a página "aparecer" com a navegação interna, o voltar e o recarregar para descobrir o que só roda na carga.

## O que ficou de fora
- O Safari e o aparelho real.
- O leitor de tela.
- A rede lenta, com o código que chega tarde.
