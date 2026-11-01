# Modelos de QA

> **Para que serve.** Os formulários para registrar o trabalho de qualidade de um site do Atlas. Cada modelo traz a forma em branco, para copiar, e **um exemplo preenchido com um caso real do projeto**, para mostrar o nível de detalhe esperado.
>
> **Estado.** RATIFICADO em 08.10.2026. Os exemplos usam fatos registrados no repositório do Atlas: `web/CLAUDE.md`, a especificação do site, o README da régua e os comentários do código. Quando um exemplo foi reconstituído depois do fato, ele diz isso.

---

## Os modelos

| Modelo | Quando usar | Onde salvar, no repositório do cliente |
|---|---|---|
| `relatorio-de-defeito.md` | Todo defeito achado, de S1 a S4, do achado ao registro da regra (`../01-metodologia.md`, seções 8 e 9) | `registros/defeito--<assunto>--<aaaa-mm-dd>.md` |
| `carta-de-exploracao.md` | Cada sessão de exploração, de 45 a 90 minutos (`../01-metodologia.md`, seção 6; `../12-ataque-a-falhas.md`, seção 3) | `registros/exploracao--<assunto>--<aaaa-mm-dd>.md` |
| `matriz-de-risco.md` | No começo do projeto e a cada mudança de escopo (`../00-entender-o-projeto.md`, seção 8) | Dentro de `producao/qualidade/mapa-do-projeto.md` |
| `checklist-de-publicacao.md` | Antes de cada publicação (`../14-ciclo-de-qa.md`, seção 5) | `registros/publicacao--<aaaa-mm-dd>.md` |
| `relatorio-de-qa.md` | Em cada porta: o rascunho, a publicação, a manutenção mensal (`../14-ciclo-de-qa.md`) | `registros/relatorio-de-qa--<porta>--<aaaa-mm-dd>.md` |

**Os nomes** seguem a convenção do Atlas: minúsculas, kebab-case em português sem acento, a descrição antes da data (`aaaa-mm-dd`).

---

## As regras de todo registro

| Regra | Por quê |
|---|---|
| **Datado e assinado** | Sem data não se sabe se ainda vale; sem nome não se sabe a quem perguntar |
| **Fato com a fonte** | O registro é o oráculo de amanhã; afirmação sem fonte não serve de oráculo (`../01-metodologia.md`, seção 7) |
| **Números com a medida** | "Contraste ruim" não serve; "4,41:1 contra 4,5:1, nos códigos 01 a 05" serve |
| **Nada de dado pessoal real** | Nome, telefone ou e-mail de visitante e de paciente nunca entram num registro de QA. Use os dados de teste |
| **O que ficou de fora é dito** | "Não testado no Safari" é informação; o silêncio é risco escondido |
| **Português, registro impessoal, vírgula decimal** | As convenções da esteira (`../../esteira/README.md`) |
