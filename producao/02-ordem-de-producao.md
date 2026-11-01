# 02 · A ordem de produção

> **Para que serve.** A ordem é o arquivo que transforma o pedido do usuário em site. Diz o que se vai fazer:
> - para quem;
> - em que nicho;
> - em que plano;
> - com que módulos;
> - em que domínio;
> - com que contato.
>
> O `ferramentas/novo-site.mjs` a lê, confere e monta o site. Nada é criado se um campo estiver errado.
>
> **Quando se escreve.** Depois do protocolo de entrada (`00-do-pedido-ao-site.md`), antes de qualquer arquivo do site.
>
> **Onde fica.** No projeto vazio, em `ordem.json`, na raiz, ao lado de `producao/`. No repositório do Atlas, em `ordens/<pasta>.json`, o registro de todo site criado (dados de clientes: a pasta fica fora do kit e nunca vai para o projeto de um cliente). Nos dois casos, o `novo-site` grava a versão final em `ordem.json`, na raiz do site, com o domínio e os números já normalizados e a data de criação.
>
> **Atualizado em:** 08.10.2026.

---

## 1. Os campos

| Campo | Cliente | Exemplo | Formato | O que o `novo-site` faz com ele |
|---|---|---|---|---|
| `tipo` | ● | ● | `"cliente"` ou `"exemplo"` | Exemplo:<br>- liga `exemplo: true` em `conteudo/negocio.ts`;<br>- exige o número fictício;<br>- dispensa o briefing.<br><br>O site sai com selo de ficção, `noindex` e sem dados estruturados (`producao/esteira/14-funcionalidades/01-base-de-todo-site.md`, seção 13) |
| `nome` | ● | ● | O nome de fachada, como o cliente o escreve, sem aspas duplas nem barra invertida | Vai para `conteudo/negocio.ts`, o `CLAUDE.md` e os documentos. No exemplo, o nome segue a regra dos nomes fictícios (`producao/esteira/nichos/README.md`, seção 3.8) |
| `pasta` | ● | ● | `^[a-z0-9]+(-[a-z0-9]+)*$` | O nome do pacote (`package.json`) e, quando o site nasce numa pasta nova (no repositório do Atlas), o nome dela: `<destino>/<pasta>` |
| `nicho` | ● | ● | Um dos doze (`academia`, `advocacia`, `barbearia`, `construcao`, `imobiliaria`, `medicina`, `nutricao`, `odontologia`, `oficina`, `pet-shop`, `psicologia`, `restaurante`), ou `"novo:<nome>"` | A linha do nicho no `CLAUDE.md`, que aponta para `producao/esteira/nichos/<nicho>.md`. Com `novo:`, aponta para a regra de nicho novo (`00-do-pedido-ao-site.md`, seção 3) |
| `plano` | ● | ● | `"essencial"`, `"profissional"` ou `"completo"` | O limite de páginas no `CLAUDE.md` (3, 6, sem limite) e o modo de saída. O cliente no Profissional e no Completo sai em servidor, por causa do formulário; o exemplo sai **sempre estático**, porque não coleta |
| `modulos` | — | — | Lista de `"agenda"`, `"presenca"`, `"pagina-adicional"` | A Agenda força o modo servidor, no cliente. A Presença gera um aviso e uma decisão "a confirmar": a função não tem titular. Recusa:<br>- módulo na advocacia;<br>- Presença na psicologia;<br>- Página adicional no Completo |
| `paginasAdicionais` | Com o módulo | — | Número inteiro, 1 ou mais (padrão 1) | Somado ao limite de páginas do plano |
| `dominio` | ● | Padrão `<nicho>.agenciaatlasdigital.com`, o subdomínio da vitrine (`producao/esteira/nichos/README.md`, seção 3.8) | O endereço, como `cliente.com.br`. Protocolo, `www` e caminho são tirados, com aviso; o domínio com acento vira Punycode, com aviso | `conteudo/contato.ts`, de onde leem o `next.config.ts`, o `.htaccess`, o canônico e o mapa do site |
| `whatsapp` | ● | Padrão `5521900000000` | `55` + DDD + número, só algarismos (a máscara é tirada) | `conteudo/contato.ts`. O fictício é recusado num cliente e exigido num exemplo |
| `telefone` | — | — | Igual ao WhatsApp; padrão: o próprio WhatsApp | `conteudo/contato.ts` |
| `condicaoDeFundacao` | — | — | O número do contrato (1, 2 ou 3) ou `false` | A linha do `CLAUDE.md`. Lembra o estudo de caso da entrega (`producao/esteira/01-processo.md`, etapa 12) |
| `briefingCompletoEm` | ● | — | `"AAAA-MM-DDTHH:MM"`, hora de Niterói (UTC−3) | O relógio das 24 horas: o `CLAUDE.md` recebe a hora do briefing e a do rascunho prometido (mais 24 horas; se o briefing, seção 11, diz outra, vale a do briefing) |
| `briefing` (ou `--briefing=` na linha de comando) | ● | — (o fictício entra depois, no `briefing.md`) | O caminho do arquivo do briefing preenchido | Os campos ● conferidos **antes** de criar qualquer arquivo; o arquivo vira o `briefing.md` do site. No exemplo sem ele, sai o modelo, para o briefing fictício |
| `observacoes` | — | — | Texto livre | Só copiado para `ordem.json` |

**O que a ordem não decide.** Ficam para a sessão, nas etapas da esteira:
- a identidade (etapa 4);
- os textos (etapa 5);
- as páginas (etapa 6).

A ordem só abre o trabalho.

## 2. O que o `novo-site` monta

```text
<projeto>/                            o projeto vazio em que a pasta producao/ foi posta (ou <destino>/<pasta>/, no Atlas)
├── producao/                         o kit, intacto: a esteira, a qualidade, a base, as ferramentas, os módulos,
│                                     os gestos, os comandos e o exemplo (na pasta nova, uma cópia)
├── CLAUDE.md, briefing.md, identidade.md, decisoes.md, ordem.json   os documentos do cliente (de producao/esteira/modelos/)
├── AGENTS.md                         vazio, antes do primeiro npm run dev (producao/esteira/13-tecnologia-e-estrutura.md, seção 2)
├── .claude/commands/                 /proxima-etapa, /normas, /direcao-de-arte, /conteudo, /construir, /verificar, /rodada, /conformidade, /publicar, /manutencao
├── registros/                        os relatórios de QA do site (fora do kit, para a troca do kit não levá-los)
├── app/ components/ conteudo/ lib/ public/ testes/   a base, com [EXEMPLO] em cada arquivo de conteúdo de fábrica
├── conteudo/ROTEIRO.md               o roteiro de conteúdo (de producao/esteira/modelos/conteudo.md)
├── ferramentas/                      as da base e a régua portada (ferramentas/regua/)
└── material/                         o que o cliente mandou (fotos, logotipo), fora do git e do ar
```

**Já preenchido no site:**
- o domínio, o WhatsApp e o telefone;
- o nome e o plano;
- `exemplo`;
- o modo de saída padrão (`next.config.ts`);
- o nome do pacote;
- no `CLAUDE.md`: a tabela do projeto e a primeira linha do "Estado";
- no `decisoes.md`: a primeira decisão, a criação.

**Não faz:** `npm install`, `git init`, commit e publicação.

## 3. Os erros que param a criação

O `novo-site` confere tudo antes de criar o primeiro arquivo e lista todos os erros de uma vez:
- tipo, nome (ou com aspas), pasta, nicho (ou `novo:` sem nome) ou plano ausente ou inválido;
- no cliente, o briefing ausente ou com campo ● em branco (cada campo listado);
- `paginasAdicionais` que não é um inteiro de 1 ou mais;
- módulo inexistente, ou módulo que o nicho não admite;
- número fora do formato, número fictício num cliente, número real num exemplo;
- domínio com `www`, protocolo ou caractere inválido;
- cliente sem `briefingCompletoEm`;
- no projeto vazio, o site já montado (há `package.json` ou `app/` na raiz); na pasta nova, a pasta de destino que já existe com arquivos.

Se a criação falhar no meio (um modelo mudou, um disco cheio), sai o que ela criou — a pasta nova inteira; no projeto vazio, só o que não existia antes —, e a ordem pode rodar de novo.

## 4. Exemplos

**O exemplo desta pasta** (`exemplo/ordem.json`, o banho e tosa que a base contém):

```json
{
  "tipo": "exemplo",
  "nome": "Banho e Tosa Fonseca",
  "pasta": "banho-e-tosa-fonseca",
  "nicho": "pet-shop",
  "plano": "essencial",
  "modulos": [],
  "observacoes": "O site de exemplo da base de produção (producao/base/), feito em 08.10.2026."
}
```

**Cliente no Profissional, com a Presença** (oficina; dados ilustrativos, não de um cliente real):

```json
{
  "tipo": "cliente",
  "nome": "Oficina Exemplo",
  "pasta": "oficina-exemplo",
  "nicho": "oficina",
  "plano": "profissional",
  "modulos": ["presenca"],
  "dominio": "oficinaexemplo.com.br",
  "whatsapp": "+55 (21) 9XXXX-XXXX",
  "briefingCompletoEm": "2026-10-20T14:30",
  "condicaoDeFundacao": 1
}
```

O `whatsapp` acima é máscara de exemplo e **não passa** na conferência: num cliente, vai o número que atende de verdade, do briefing.

**Cliente no Essencial com a Agenda** (psicologia; a Agenda põe o site em servidor):

```json
{
  "tipo": "cliente",
  "nome": "<nome de fachada>",
  "pasta": "<pasta>",
  "nicho": "psicologia",
  "plano": "essencial",
  "modulos": ["agenda"],
  "dominio": "<domínio>",
  "whatsapp": "<55DDDNNNNNNNN>",
  "briefingCompletoEm": "<AAAA-MM-DDTHH:MM>"
}
```

**Nicho fora dos doze** (por exemplo, um estúdio de tatuagem):
- `"nicho": "novo:estudio-de-tatuagem"`;
- o resto, igual.

O arquivo do nicho novo se escreve na etapa 3, pela regra de `00-do-pedido-ao-site.md`, seção 3, antes de qualquer texto.
