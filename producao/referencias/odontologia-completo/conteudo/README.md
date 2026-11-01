# conteudo/

Todo texto visível do site, como dado tipado (`producao/esteira/10-texto-e-conteudo.md`). Mudar um texto não mexe em JSX. **Tudo aqui é do cliente**, e sai do `briefing.md`.

| Arquivo | O que tem | Quem lê |
|---|---|---|
| `contato.ts` | O WhatsApp, o telefone e o domínio: o módulo mínimo | As ilhas, o `next.config.ts`, o `gerar-htaccess`, o `conferir-pronto` |
| `negocio.ts` | `exemplo`, nome, razão social e CNPJ (ou, no profissional pessoa física, o nome completo e o registro), endereço, coordenadas (o ponto do mapa do bairro, `ferramentas/gerar-mapa.mjs`), registro do conselho, prazo de resposta, tipo do schema.org, faixa de preço, expediente, fechamentos, data da última mudança | As páginas, o rodapé, os metadados, os dados estruturados, a régua portada |
| `site.ts` | As páginas (o menu, o mapa do site e os metadados seguem a lista), a ação, os textos de cada página, o rodapé, a 404 | As páginas |
| `tratamentos.ts` | Os seis tratamentos (sessões, intervalos, o que se faz, os cuidados), as quatro regiões do mapa dos dentes e as opções do pedido de avaliação | As páginas e as ilhas (só os campos que usam) |
| `clinica.ts` | A equipe (nome, CRO, título, formação), a clínica, os passos da avaliação e as perguntas comuns | As páginas |
| `legal.ts` | O aviso de privacidade e a declaração de acessibilidade (blocos [SEMPRE] dos modelos) | `app/privacidade`, `app/acessibilidade` |

**Regras.**
- **Nenhum preço.** A norma da odontologia o veda (Código de Ética, art. 44, I): o tempo (as sessões e os intervalos) ocupa o lugar dele, numa fonte só, `tratamentos.ts`.
- **Campos um por linha.** Os campos que as ferramentas leem como texto (`exemplo`, `nome`, `razaoSocial`, `cnpj`, `nomeCompleto`, `registro`, `whatsapp`, `telefone`, `dominio`) ficam um por linha, entre aspas duplas, começando a linha. Um comentário que cite o campo não conta.
- **Nada inventado.** Nenhum dado sem fonte no briefing: o `conferir-pronto` acusa os marcadores `[PREENCHER]`, `[A CONFIRMAR]`, `TODO` e `lorem ipsum` que sobrarem.
