# Modelo · Relatório de defeito

> **Quando usar.** Para todo defeito achado, de S1 a S4, pela régua, por um teste, pela exploração ou pelo cliente. O relatório acompanha o defeito pelos seis passos do ciclo (`../01-metodologia.md`, seção 9) e só fecha com todos preenchidos.
>
> **Onde salvar.** `registros/defeito--<assunto>--<aaaa-mm-dd>.md`, no repositório do cliente.

---

## A forma, para copiar

```markdown
# Defeito · <título curto: o sintoma, não a causa>

| Campo | Valor |
|---|---|
| Data do achado | <dd.mm.aaaa> |
| Quem achou | <nome ou "o Claude Code"> |
| Como foi achado | <régua, bloco N | teste <nome> | exploração <carta> | cliente | revisão> |
| Site e página | <site> · <caminho> |
| Ambiente | <build de produção | servidor standalone | endereço publicado> · commit <hash> |
| Aparelho e largura | <navegador e versão> · <largura × altura> · <toque ou ponteiro> |
| Preferências | <movimento reduzido? script? cores forçadas?> |
| Severidade | <S1 | S2 | S3 | S4>, porque <motivo> (`01-metodologia.md`, seção 8) |
| Prioridade | <P1 | P2 | P3>, porque <motivo> |
| Oráculo | <a fonte que diz o certo: a norma, a ata, o briefing, a identidade, a esteira, a régua, a consistência, a expectativa> |
| Estado | <aberto | corrigido | verificado | fechado | aceito com decisão> |

## 1 · O achado
**Esperado:** <o que o oráculo diz>.
**Obtido:** <o que aconteceu, com o número: a medida, a mensagem de erro, o tamanho>.

## 2 · Reproduzir
1. <passo mínimo>
2. <passo>
3. <passo>

- **Reproduzido à mão:** <sim | não>.
- **O instrumento foi conferido:** <como: outro instrumento, o valor bruto> (`01-metodologia.md`, seção 5).
- **Acontece sempre?** <sempre | N em M tentativas>.

## 3 · A causa
<O porquê, não o onde. A hipótese, o teste da hipótese, a causa confirmada.>

## 4 · A correção
<O que mudou e em que arquivo.>
- **Efeito colateral conferido:** <o que mais poderia ter mudado, e como se conferiu>.

## 5 · A prova
- **O que acusava agora passa:** <régua, teste, medida>.
- **O teste de regressão que fica:** <nome do teste e arquivo>.
- **As vizinhas continuam passando:** <a régua inteira, a bateria inteira>.

## 6 · A regra que fica
<O que aprender para que a classe inteira de defeitos não volte, e onde ficou registrado: a esteira, `producao/qualidade/12-ataque-a-falhas.md`, o comentário do código, o lint.>

## Decisão (só se o defeito for aceito sem correção)
<Quem decidiu, quando, por quê, e até quando vale.>
```

---

## Exemplo preenchido: a âncora malformada que derrubava a página (03.10.2026)

Caso real do site do Atlas, corrigido na revisão de qualidade e segurança do código de 03.10.2026 (`web/CLAUDE.md`, no repositório do Atlas). O relatório não existia na época. Está reconstituído do registro e do código, com o que faltava marcado como tal.

# Defeito · Um endereço com âncora malformada troca a página inteira pela tela de erro

| Campo | Valor |
|---|---|
| Data do achado | 03.10.2026 |
| Quem achou | A revisão de qualidade e segurança do código, pedida pelo usuário e feita pelo Claude Code |
| Como foi achado | Revisão de código. O registro não diz o passo exato (reconstituído) |
| Site e página | Site do Atlas · qualquer página, com a âncora malformada: `/#%E0` |
| Ambiente | Build de produção, local |
| Aparelho e largura | Chrome, qualquer largura |
| Preferências | Qualquer uma |
| Severidade | **S1**, porque derruba a página inteira: o visitante que recebe um vínculo malformado (cortado por um aplicativo de mensagens, por exemplo) não vê o site |
| Prioridade | **P1**, porque todo S1 é P1 |
| Oráculo | Expectativa e consistência: toda página abre, qualquer que seja o endereço; a âncora desconhecida é ignorada, como o navegador faz sem script |
| Estado | Fechado |

## 1 · O achado
**Esperado:** a página abre normalmente; a âncora malformada vale como nenhuma.
**Obtido:** a página inteira é trocada pela tela de erro padrão do Next (em inglês, até as telas de erro em português de 07.10). No console: `URIError: URI malformed`.

## 2 · Reproduzir
1. `npm run build && npm start`.
2. Abrir `http://localhost:3000/#%E0`.
3. A página carrega e, na hidratação, cai na tela de erro.

- **Reproduzido à mão:** sim.
- **O instrumento foi conferido:** não se aplica: sem instrumento, a falha se vê no navegador.
- **Acontece sempre?** Sempre, em toda página do Atlas: a ilha das âncoras está no layout das páginas (`app/(atlas)/layout.tsx`).

## 3 · A causa
A ilha das âncoras (`components/ilhas/ancoras.tsx`) lia o destino com `decodeURIComponent(window.location.hash.slice(1))` dentro de um efeito, na chegada à página. Com uma sequência de escape malformada (`%E0` sem os bytes seguintes), `decodeURIComponent` **lança** `URIError`. A exceção dentro do efeito sobe até o limite de erro da raiz, e o React troca a árvore inteira pela tela de erro.

## 4 · A correção
A leitura passou à função `ancoraDoEndereco()`, com `try`/`catch`: a âncora malformada vale como nenhuma (`""`). A chegada do montador em `/orcamento#orcamento-<plano>` recebeu o mesmo `try`, no mesmo commit (`d8c22d1`, 03.10.2026).
- **Efeito colateral conferido:** as âncoras válidas, inclusive com acento codificado (`#%C3%A1`), continuam decodificadas. O vínculo "Escolher Profissional", de Planos para `/orcamento#orcamento-profissional`, continua marcando o plano.

## 5 · A prova
- **O que acusava agora passa:** `/#%E0` abre a página inteira, sem erro no console; `/orcamento#%E0` também. Na mesma revisão: a varredura de erros nas 23 páginas e as 52 capturas comparadas, sem mudança de tela.
- **O teste de regressão que fica:** na época, nenhum (não havia testes automatizados). Hoje, proposto:
  - o teste de unidade `decodificarAncora` (`../04-unidade.md`, seção 3);
  - o teste de ponta a ponta dos endereços malformados (`../05-ponta-a-ponta.md`, seção 5.3).
- **As vizinhas continuam passando:** a varredura das 23 páginas, sem erro de console.

## 6 · A regra que fica
**Nada de `decodeURIComponent` solto: a decodificação segura mora num lugar só** (no site novo, `lib/ancoras.ts`, com `decodificarAncora(hash)` e `ancoraDoEndereco()`: `../../esteira/14-funcionalidades/01-base-de-todo-site.md`, seção 16). Registrada:
- no comentário de `ancoraDoEndereco`;
- na regra de lint proposta (`../03-estatica.md`, seção 2);
- na categoria "Endereços e âncoras malformados" de `../12-ataque-a-falhas.md`, seção 2.1.

A classe inteira, "entrada que o site não controla, lida sem defesa", entra nas cartas de exploração.
