# O formulário [P][C]

> **Para que serve.** Especifica o formulário de contato do Profissional e do Completo: os campos, o envio que funciona sem script, a proteção sem serviço de terceiros, a entrega por e-mail, a guarda dos dados e o que se testa. Diz também o que fazer no site **sem servidor**, onde não há formulário: o talão que compõe a mensagem do WhatsApp.
>
> **Quando ler.** Ao construir a página de contato de um site [P] ou [C], e antes de prometer "formulário" a um cliente do Essencial.
>
> **Depende de.** `README.md` (a regra geral), `01-base-de-todo-site.md` (o WhatsApp, o prazo de resposta), `../13-tecnologia-e-estrutura.md` (seções 5 e 9: a política de conteúdo e a regra de tecnologia nova), `../17-conformidade-e-normas.md` (o pacote de conformidade), `../18-publicacao-e-manutencao.md` (o web app Node), `../../qualidade/09-seguranca-e-privacidade.md`.
>
> **Estado.** A coleta de dados **pelo formulário** é RATIFICADO (ata v3.0, IV.2.1; decisão do usuário em 07.10.2026). A arquitetura abaixo é RATIFICADO em 08.10.2026, pesquisada em 07 e 08.10.2026 (no repositório do Atlas, `documentacao/atlas--tecnologia.md`, seção 5.2), e **construída em 08.10.2026** (`../../modulos/formulario/`, abaixo), com o `nodemailer` e o `mysql2` aprovados no mesmo dia. Rodou contra banco real em 08.10.2026 (MariaDB 10.11.19 e MySQL 8.0.46: `../../modulos/README.md`, seção 8); o SMTP real, ainda não. Nenhum site do Atlas tem formulário com servidor hoje.
>
> **A implementação executável (desde 08.10.2026):** `../../modulos/formulario/`, com 39 testes de unidade, verificação de tipos, build em servidor, testes de fumaça e régua sem falha. Ela corrige os erros que o código deste documento tinha, listados em `../../modulos/README.md`, seção 9. Entre eles:
> - o `email.ts` não compilava com os tipos do `nodemailer` 7;
> - `servicos` e a mensagem vinham de um `conteudo/negocio.ts` que não os tem;
> - o prazo de resposta saía com ponto duplo;
> - a pasta `.teste/` não era criada;
> - as páginas fora da busca não tinham descrição nem cartão.
>
> **Na dúvida entre o trecho daqui e o módulo, vale o módulo.** A regra, o objetivo e a conferência continuam aqui.
>
> **Atualizado em:** 08.10.2026.

---

## 1. Quando há formulário

**Regra.**
- **[P][C]:** a página de contato tem um formulário que entrega o pedido por e-mail ao cliente.
- **[E]:** não tem. O Essencial sai em site estático (`../13-tecnologia-e-estrutura.md`, seção 5.2), e o contato é o WhatsApp, o telefone e o mapa. Pedido de formulário no Essencial: subida para o Profissional, ou orçamento à parte **antes** de fazer (`../03-planos.md`, seção 7).
- **[ex]:** os sites de exemplo não coletam nada. O "formulário" deles só compõe uma mensagem que sai do aparelho (seção 10).

**Objetivo.** O formulário organiza o pedido (o serviço, o contato, a mensagem) e o entrega fora do WhatsApp, para quem não usa o aplicativo ou prefere escrever. Ele também traz servidor e obrigações da LGPD. Por isso é item do Profissional, nunca do Essencial.

**O que ele exige** (e por que o Profissional roda em web app Node, não em site estático):

| Exigência | Motivo |
|---|---|
| Um servidor que receba o envio | Server Action do Next; não existe no export estático |
| Um segredo no servidor | A assinatura do carimbo de tempo (seção 5.2) |
| O MySQL do plano | O limite de envios por IP (seção 5.3): o web app dorme sem tráfego, e o que mora só na memória some |
| Uma caixa de e-mail do domínio | A entrega (seção 6) |
| Duas dependências | `nodemailer` (o e-mail) e `mysql2` (o banco), **aprovadas pelo usuário em 08.10.2026**, nas versões de `../../modulos/README.md`, seção 3 (`nodemailer` 10.0.13, que traz os próprios tipos, e `mysql2` 3.24.5) |

---

## 2. Os campos

**Regra.** O formulário pede o **mínimo** (LGPD, art. 6º, III):

| Campo | Obrigatório | Tipo e atributos | Observação |
|---|---|---|---|
| Nome | Sim | `type="text"`, `autoComplete="name"` | De 2 a 80 caracteres |
| Telefone | Um dos dois | `type="tel"`, `inputMode="tel"`, `autoComplete="tel"` | Com DDD; aceita máscara e o 55 |
| E-mail | Um dos dois | `type="email"`, `inputMode="email"`, `autoComplete="email"`, `spellCheck={false}`, `autoCapitalize="none"` | Até 254 caracteres |
| Serviço | Sim | Grupo de opções (`<fieldset>` com `<legend>` e rádios) ou `<select>` | Só valores da lista do site |
| Mensagem | Não | `<textarea>` | Até 2.000 caracteres |

**Nunca:** CPF, data de nascimento, endereço completo, foto, anexo. **Na saúde** (nutrição, psicologia, odontologia, medicina), nenhum dado de saúde: sem campo de "motivo da consulta" ou de sintoma. A mensagem leva uma nota: "Não descreva sintomas aqui; isso fica para a consulta." A anamnese é na consulta (`../17-conformidade-e-normas.md`, seção 5.1; no repositório do Atlas, `documentacao/atlas--tecnologia.md`, seção 5.2).

**Objetivo.** Cada campo a mais derruba o envio e aumenta o que o cliente precisa proteger. O dado de saúde é sensível (LGPD, art. 11): coletado no site, exigiria outra base legal e outra segurança.

**Varia por.**

| Nicho | Campo a mais (opcional) | Campo que **não** entra |
|---|---|---|
| Construção | Bairro da entrega | — |
| Restaurante (sem Agenda) | Data e número de pessoas, para reserva | — |
| Oficina | Carro: modelo e ano | Placa (identifica o dono) |
| Imobiliária | Código do imóvel de interesse; comprar ou alugar | Renda, documentos |
| Academia | Turma de interesse | Condição de saúde |
| Psicologia | Modalidade (presencial ou a distância) | Qualquer motivo da procura |
| Advocacia | **Sem formulário:** o Provimento 205/2021 coincide com os limites do Essencial — sem formulário, sem galeria, sem honorário (contexto dos nichos, no repositório do Atlas; `../nichos/advocacia.md`) | — |

---

## 3. A arquitetura: o envio que funciona sem script

**Regra.**
1. O formulário é desenhado no servidor (HTML completo na primeira resposta) e envia para uma **Server Action**.
2. **Sem script** (ou antes de o script chegar), o navegador envia o formulário como um POST comum. O Next roda a ação e responde:
   - com **303** para a página de confirmação, quando deu certo;
   - com a própria página redesenhada, com os erros em texto, quando não deu.
3. **Com script**, uma ilha acrescenta três coisas: a validação ao sair do campo, o estado "Enviando…" e o foco no primeiro erro. A ação no servidor é a mesma.
4. **A página de contato é dinâmica** (`await connection()`): o carimbo de tempo (seção 5.2) é do momento do pedido. Numa página pré-renderizada, ele sairia congelado no instante do build.

**Objetivo.**
- **Degradação** (`../00-principios.md`): o formulário é o canal mais formal do site; ele não pode depender de o script chegar.
- **Uma regra só:** a validação mora num módulo puro, que a ilha e a ação importam. O servidor sempre valida de novo: o navegador não é confiável.

**As bases na documentação.**
- **O POST sem script.** "Server Components support progressive enhancement by default, meaning forms that call Server Actions will be submitted even if JavaScript hasn't loaded yet or is disabled" (documentação local do Next 16.3, `01-getting-started/07-mutating-data.md`) [V].
- **O 303.** "For progressive enhancement form submissions, it serves a 303 HTTP redirect response" (`redirect`, mesma documentação) [V].
- **Os erros antes da hidratação.** Com uma Server Function, o `useActionState` "allows the server's response to be shown before hydration completes" (https://react.dev/reference/react/useActionState) [V]. A documentação do Next recomenda o `useActionState` para mostrar erros de validação (`02-guides/forms.md`).
- **O `connection()`.** Serve para quando "rendering should wait for a real user request" (`04-functions/connection.md`) [V]. Se o projeto ligar o `cacheComponents`, a documentação indica o `io()` para conteúdo fora da casca estática; para um valor que precisa ser do pedido, o `connection()` continua o certo.
- [NV: o 303 sem script, o `useActionState` antes da hidratação, o `preventDefault` que impede a ação e o clique duplo foram conferidos na documentação local, nos tipos e no código do React, sem um site de cliente compilado e rodando; a prova são os testes de ponta a ponta com e sem script da seção 9.]

**A estrutura.**

```
app/contato/
├── page.tsx           a página (servidor, dinâmica): emite o carimbo e desenha a ilha
├── acoes.ts           "use server": enviarContato
└── enviado/page.tsx   a confirmação (noindex)
components/ilhas/
└── formulario-de-contato.tsx   "use client": useActionState, validação ao sair do campo
lib/formulario/
├── validar.ts         as regras dos campos (puro: servidor e navegador)
├── carimbo.ts         o carimbo de tempo assinado (servidor)
├── limite.ts          o limite por IP, em hash (servidor)
└── email.ts           a entrega pelo SMTP (servidor)
lib/banco.ts           o pool do mysql2 (servidor)
```

Os módulos de servidor começam com `import "server-only"`. O Next trata esse import internamente, sem instalar o pacote (`02-guides/data-security.md`), e o build falha se um deles for parar no navegador com o segredo dentro.

### 3.1 · As regras dos campos

```ts
// lib/formulario/validar.ts — as regras dos campos. Puro: a ilha valida ao sair do campo, a ação valida de novo.
export type Campos = { nome: string; telefone: string; email: string; servico: string; mensagem: string };
export type Erros = Partial<Record<keyof Campos, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Os algarismos do telefone, sem o 55: DDD + 8 ou 9 algarismos; null se não for isso. */
export function lerTelefone(texto: string) {
  let algarismos = texto.replace(/\D/g, "");
  if (algarismos.length >= 12 && algarismos.startsWith("55")) algarismos = algarismos.slice(2);
  return /^\d{10,11}$/.test(algarismos) ? algarismos : null;
}

export function validar(c: Campos, servicos: readonly string[]): Erros {
  const erros: Erros = {};
  if (c.nome.length < 2) erros.nome = "Escreva o nome.";
  else if (c.nome.length > 80) erros.nome = "O nome passa de 80 caracteres.";
  if (!c.telefone && !c.email) erros.telefone = "Informe um telefone ou um e-mail para a resposta.";
  if (c.telefone && !lerTelefone(c.telefone)) erros.telefone = "Telefone com DDD, como (21) 90000-0000.";
  if (c.email && (c.email.length > 254 || !EMAIL.test(c.email))) erros.email = "E-mail no formato nome@exemplo.com.br.";
  if (!servicos.includes(c.servico)) erros.servico = "Escolha o serviço.";
  if (c.mensagem.length > 2000) erros.mensagem = "A mensagem passa de 2.000 caracteres.";
  return erros;
}
```

**Validação à mão, sem biblioteca.** A documentação do Next sugere o Zod ou o Valibot. Seria uma dependência nova para cinco campos: as regras acima cabem em vinte linhas e se testam do mesmo jeito.

**A mensagem de erro** diz o que está errado e como corrigir, sem culpar nem pedir desculpa (`../10-texto-e-conteudo.md`).

### 3.2 · A ação

```ts
// app/contato/acoes.ts
"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { servicos } from "@/conteudo/negocio";
import { emitirCarimbo, lerCarimbo } from "@/lib/formulario/carimbo";
import { enviarEmail } from "@/lib/formulario/email";
import { contarEnvio } from "@/lib/formulario/limite";
import { validar, type Campos, type Erros } from "@/lib/formulario/validar";

export type EstadoDoEnvio = {
  situacao: "inicial" | "corrigir" | "limite" | "falhou";
  carimbo: string;
  valores?: Campos;
  erros?: Erros;
  aviso?: string;
};

const LIMITE_POR_HORA = 5; // RATIFICADO

/** O texto de um campo: só string, sem espaço nas pontas; quebra de linha só na mensagem (nada de quebra num cabeçalho de e-mail). */
function campo(dados: FormData, nome: string, linhas = false) {
  const valor = dados.get(nome);
  if (typeof valor !== "string") return "";
  const limpo = valor.trim();
  return linhas ? limpo.replace(/\r\n?/g, "\n") : limpo.replace(/[\r\n]+/g, " ");
}

/** O Next põe o endereço do soquete no x-forwarded-for quando o proxy não manda o cabeçalho; sem proxy, é o loopback. */
const LOOPBACK = /^(::1|(::ffff:)?127\.[\d.]+)$/i;

/** O IP que o proxy da Hostinger acrescentou: o último do x-forwarded-for. Os anteriores, o cliente pode forjar. A CONFIRMAR no servidor. */
function ipDoVisitante(h: Headers) {
  const cadeia = (h.get("x-forwarded-for") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const ip = cadeia.at(-1) ?? h.get("x-real-ip");
  return ip && !LOOPBACK.test(ip) ? ip : null; // sem cabeçalho (ou só o loopback que o próprio Next põe), null: nunca um balde comum a todos
}

export async function enviarContato(_anterior: EstadoDoEnvio, dados: FormData): Promise<EstadoDoEnvio> {
  // 1. Campo-armadilha preenchido ou carimbo forjado: robô. Finge que deu certo e descarta.
  const carimbo = campo(dados, "carimbo");
  const leitura = lerCarimbo(carimbo);
  if (campo(dados, "nao_preencher") !== "" || leitura === "forjado") redirect("/contato/enviado");

  const valores: Campos = {
    nome: campo(dados, "nome"),
    telefone: campo(dados, "telefone"),
    email: campo(dados, "email"),
    servico: campo(dados, "servico"),
    mensagem: campo(dados, "mensagem", true),
  };

  // 2. Rápido demais, ou a página aberta há mais de um dia: pede para conferir. Nunca descarta em silêncio o que pode ser de uma pessoa.
  if (leitura === "rapido") return { situacao: "corrigir", carimbo, valores, aviso: "Confira os dados e envie de novo." };
  if (leitura === "vencido")
    return { situacao: "corrigir", carimbo: emitirCarimbo(), valores, aviso: "A página ficou aberta por mais de um dia. Confira os dados e envie de novo." };

  // 3. As regras da ilha, de novo.
  const erros = validar(valores, servicos.map((s) => s.id));
  if (Object.keys(erros).length > 0) return { situacao: "corrigir", carimbo, valores, erros };

  // 4. O limite por IP, contado em hash. Sem IP (o proxy não mandou o cabeçalho), não limita e avisa no registro:
  //    um balde único para "desconhecido" barraria o site inteiro no sexto envio da hora.
  const ip = ipDoVisitante(await headers());
  if (!ip) console.warn("formulário: pedido sem x-forwarded-for; limite por IP não aplicado");
  else if ((await contarEnvio(ip)) > LIMITE_POR_HORA) return { situacao: "limite", carimbo, valores };

  // 5. A entrega. Se falhar, a pessoa fica sabendo, com a saída pelo WhatsApp.
  try {
    await enviarEmail(valores);
  } catch {
    return { situacao: "falhou", carimbo, valores };
  }
  redirect("/contato/enviado"); // fora do try: o redirect funciona lançando, e o catch o engoliria
}
```

**Por que cada desvio responde como responde:**

| Caso | Resposta | Por quê |
|---|---|---|
| Campo-armadilha preenchido | Finge sucesso; nada é enviado | O robô não aprende o que o denunciou |
| Carimbo com assinatura inválida | Finge sucesso; nada é enviado | Foi adulterado: não é uma pessoa |
| Enviado em menos de 3 s | Pede para conferir, com o mesmo carimbo | Pode ser uma pessoa com o preenchimento automático. Na segunda tentativa, o carimbo já tem idade. **Descartar em silêncio uma pessoa seria estado falso** (`README.md`, regra 8) |
| Carimbo com mais de 24 h | Pede para conferir, com carimbo novo | A aba ficou aberta de um dia para o outro |
| Campo inválido | Os erros em texto, com os valores de volta | — |
| Limite por hora passado | Aviso e o WhatsApp como saída | Pode ser um escritório com um IP só |
| Falha do SMTP | Aviso e o WhatsApp, com a mensagem escrita | A pessoa nunca perde o que escreveu sem saber |

**O estado devolvido traz os valores** (`valores`), e os campos os usam como `defaultValue`. Ninguém digita tudo de novo por causa de um erro:
- **Sem script,** a página é redesenhada pelo servidor com os campos preenchidos.
- **Com script,** o React reinicia o formulário depois de cada ação: "After the `action` function succeeds, all uncontrolled field elements in the form are reset" (https://react.dev/reference/react-dom/components/form) [V]. Sem o `defaultValue` vindo do estado, o erro apagaria o que a pessoa escreveu.

### 3.3 · A ilha

```tsx
// components/ilhas/formulario-de-contato.tsx
"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import { enviarContato, type EstadoDoEnvio } from "@/app/contato/acoes";
import { validar, type Campos, type Erros } from "@/lib/formulario/validar";
import { vinculoDoWhatsapp } from "@/lib/whatsapp";

type Servico = { id: string; nome: string };

export function FormularioDeContato({ carimbo, servicos, whatsapp, mensagem }: { carimbo: string; servicos: readonly Servico[]; whatsapp: string; mensagem: string }) {
  const [estado, enviar, pendente] = useActionState(enviarContato, { situacao: "inicial", carimbo } satisfies EstadoDoEnvio);
  const [locais, setLocais] = useState<Erros>({});
  const formulario = useRef<HTMLFormElement>(null);
  const erros: Erros = { ...estado.erros, ...locais };
  const v = estado.valores;
  // A saída pelo WhatsApp leva o que a pessoa escreveu: na falha, nada se perde. Vale também sem script (o estado vem do servidor).
  const saida = vinculoDoWhatsapp(whatsapp, v?.mensagem ? `${mensagem}\n${v.mensagem}` : mensagem);

  const ler = (): Campos => {
    const d = new FormData(formulario.current!);
    const t = (n: string) => String(d.get(n) ?? "").trim();
    return { nome: t("nome"), telefone: t("telefone"), email: t("email"), servico: t("servico"), mensagem: t("mensagem") };
  };
  const ids = servicos.map((s) => s.id);

  // Ao sair de um campo: só o erro dele, e só se houver algo escrito. Campo vazio é erro no envio:
  // quem passa pelo campo com o Tab ainda vai preenchê-lo (Baymard: nunca acusar antes da hora).
  const aoSair = (nome: keyof Campos) => {
    const valores = ler();
    setLocais((atual) => ({ ...atual, [nome]: valores[nome] ? validar(valores, ids)[nome] : undefined }));
  };

  // Depois de cada resposta do servidor com erro, o foco vai para o primeiro campo marcado.
  useEffect(() => {
    if (estado.situacao === "corrigir" && estado.erros) setLocais({});
    formulario.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
  }, [estado]);

  return (
    <form
      ref={formulario}
      action={enviar}
      noValidate
      onSubmit={(e) => {
        const tudo = validar(ler(), ids);
        // Com erro, ou já enviando, o envio não sai (o React não chama a ação se o evento foi cancelado).
        if (pendente || Object.keys(tudo).length > 0) {
          e.preventDefault();
          setLocais(tudo);
          requestAnimationFrame(() => formulario.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
        }
      }}
    >
      <input type="hidden" name="carimbo" value={estado.carimbo} />
      {/* O campo-armadilha: fora da tela, fora do Tab, fora do leitor de tela e com um nome que o preenchimento automático não reconhece. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Não preencha este campo
          <input type="text" name="nao_preencher" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      {/* Sem script, o resumo dos erros (o foco não é levado). */}
      {estado.situacao === "corrigir" && <p role="alert">{estado.aviso ?? "Confira os campos marcados."}</p>}

      <label htmlFor="nome">Nome <span>(obrigatório)</span></label>
      <input
        id="nome" name="nome" type="text" autoComplete="name" required
        defaultValue={v?.nome}
        aria-invalid={Boolean(erros.nome) || undefined}
        aria-describedby={erros.nome ? "nome-erro" : undefined}
        onBlur={() => aoSair("nome")}
        onChange={() => erros.nome && aoSair("nome")} // com erro marcado, o erro some assim que o campo fica certo
      />
      {erros.nome && <p id="nome-erro">{erros.nome}</p>}

      {/* … telefone, e-mail, serviço (fieldset com legend), mensagem: o mesmo padrão … */}

      {/* O aviso no ponto da coleta (../17-conformidade-e-normas.md, seção 5.2), com o prazo que o cliente definiu. */}
      <p>
        Usamos estes dados só para responder ao seu pedido. Eles ficam guardados por 12 meses. <a href="/privacidade">Aviso de privacidade</a>
      </p>
      <button type="submit" aria-disabled={pendente || undefined}>
        {pendente ? "Enviando…" : "Enviar a mensagem"}
      </button>

      <div aria-live="polite">
        {estado.situacao === "limite" && <p>Muitas mensagens deste endereço na última hora. Tente mais tarde, ou <a href={saida} target="_blank" rel="noopener noreferrer">chame no WhatsApp</a>.</p>}
        {estado.situacao === "falhou" && <p>A mensagem não foi enviada. Tente de novo, ou <a href={saida} target="_blank" rel="noopener noreferrer">chame no WhatsApp</a>.</p>}
      </div>
    </form>
  );
}
```

**Notas sobre a ilha:**
- **`aria-disabled`, não `disabled`, no botão enquanto envia.** O botão que se desabilita sob o foco o perde (lição das setas da galeria em 03.10, `03-galeria.md`). O envio duplo é barrado no `onSubmit`.
- **O `onSubmit` cancela a ação.** Quando o evento de envio é cancelado (`preventDefault`), o React não chama a ação do `<form action>`. Isso vale para a validação local e para o clique duplo [V: lido no código do React 19.2.8, `react-dom-client`, no tratamento do envio; não está na documentação, e o teste de ponta a ponta do clique duplo o protege numa atualização].
- **`noValidate` com `required`.** Os campos obrigatórios levam `required`, que os anuncia como obrigatórios ao leitor de tela, e o formulário, `noValidate`. As mensagens são as do site, em texto, e não os balões do navegador, que variam de um para outro e somem sozinhos.
- **O vínculo do WhatsApp** da falha e do limite leva a mensagem que a pessoa escreveu, depois da saudação da casa. É navegação: nada sai do aparelho sem a pessoa tocar.

### 3.4 · A página e a confirmação

```tsx
// app/contato/page.tsx
import { connection } from "next/server";

import { FormularioDeContato } from "@/components/ilhas/formulario-de-contato";
import { negocio, servicos } from "@/conteudo/negocio";
import { emitirCarimbo } from "@/lib/formulario/carimbo";

export default async function Contato() {
  await connection(); // o carimbo é do momento do pedido: esta página não sai pronta do build
  return (
    <main id="conteudo" tabIndex={-1}>
      {/* o título, os canais (WhatsApp, telefone), o horário, o prazo de resposta */}
      <FormularioDeContato carimbo={emitirCarimbo()} servicos={servicos} whatsapp={negocio.whatsapp} mensagem={negocio.mensagem} />
    </main>
  );
}
```

**A página de confirmação** (`app/contato/enviado/page.tsx`):
- **O que diz:** que a mensagem chegou e em quanto tempo vem a resposta ("Mensagem recebida. Resposta em até 1 dia útil, pelo telefone ou e-mail informado.").
- **O que oferece:** o WhatsApp e o caminho de volta.
- **O que não faz:** repetir dado pessoal (nada de dado no endereço nem na tela). Leva `robots: { index: false }`.

---

## 4. A configuração do servidor

**Objetivo.** A ação do servidor aceita pedido de qualquer um na internet. Com 1 MB por pedido, um robô ocupa a memória e o processador do web app, que é pequeno e dorme sem tráfego; 64 KB cabem com folga no maior formulário de texto e recusam o resto antes de ler.

**Regra.** No `next.config.ts`, o tamanho máximo do corpo de uma ação desce do padrão de 1 MB para o que um formulário de texto precisa:

```ts
// next.config.ts (trecho)
const config: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "64kb", // texto puro: 2.000 caracteres de mensagem cabem com folga; anexos não existem
    },
  },
};
```

A opção existe e aceita bytes ou texto como `'500kb'` (documentação local do Next 16.3, `05-config/01-next-config-js/serverActions.md`) [V]. O valor de 64 KB é RATIFICADO. Ele vale para **todas** as ações do site: com a Agenda, confira que nenhuma ação dela passa disso.

**Origem.** O Next compara o `Origin` do pedido com o `Host` (ou o `X-Forwarded-Host`) e recusa a ação quando diferem (mesma documentação) [V]. Atrás do proxy da Hostinger, isso só funciona se o proxy repassar o host público [NV]. Se o envio falhar só no ar, com erro de origem, o host público entra em `serverActions.allowedOrigins`.

**Política de conteúdo.** `form-action 'self'` (`../13-tecnologia-e-estrutura.md`, seção 5): o formulário só envia para o próprio site.

**Segredos** nas variáveis de ambiente do web app (hPanel), nunca no repositório:

| Variável | Conteúdo |
|---|---|
| `SEGREDO_DO_FORMULARIO` | 32 bytes aleatórios (`node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`) |
| `SMTP_USUARIO`, `SMTP_SENHA` | A caixa do domínio que envia |
| `CONTATO_DESTINO` | A caixa do cliente que recebe |
| `BANCO_USUARIO`, `BANCO_SENHA`, `BANCO_NOME` | O MySQL do plano |

---

## 5. A proteção, sem serviço de terceiros

**Regra.** Quatro camadas, nenhuma com pedido a outro domínio:
1. o campo-armadilha;
2. o carimbo de tempo assinado;
3. o limite por IP, em hash;
4. o tamanho do corpo (seção 4) e a validação no servidor (seção 3.1).

**Sem hCaptcha, Turnstile ou reCAPTCHA.** Todos fazem pedidos externos, levam o IP do visitante para fora e quebrariam a política de conteúdo e o "zero pedido externo" (`../15-desempenho.md`). Se um site sofrer abuso apesar das quatro camadas, o **ALTCHA** é a opção: prova de trabalho no próprio aparelho, licença MIT, servida do próprio domínio. É dependência nova e entra pela regra de tecnologia [FU].

**Objetivo.** Barrar o robô comum sem cobrar nada da pessoa: nenhum quebra-cabeça, nenhuma imagem para clicar, nenhum cookie.

### 5.1 · O campo-armadilha

- **Como é:** um campo de texto que a pessoa não vê nem alcança. Fica fora da tela por CSS, dentro de um bloco `aria-hidden`, com `tabIndex={-1}` e `autoComplete="off"`.
- **Quem o preenche:** só o robô, que preenche todo campo. Preenchido, o envio finge sucesso e é descartado.
- **O nome importa:** `nao_preencher`, e nunca `email`, `website`, `url` ou `telefone`, que o preenchimento automático do navegador reconhece. Uma pessoa com o campo preenchido pelo navegador seria descartada em silêncio.

### 5.2 · O carimbo de tempo assinado

- **Como é:** a página emite, no momento do pedido, o instante e a assinatura dele (HMAC-SHA256 com o segredo do servidor). O carimbo vai num campo oculto.
- **Na volta, a ação confere:**
  - a assinatura, em tempo constante;
  - a idade: menos de ~3 s é rápido demais; mais de 24 h, vencido.
- **Sem cookie e sem banco:** a assinatura prova que o carimbo veio do servidor.

```ts
// lib/formulario/carimbo.ts
import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

const MINIMO_MS = 3_000; // ninguém lê e preenche o formulário em menos de 3 s (RATIFICADO)
const MAXIMO_MS = 24 * 60 * 60 * 1000;

function assinar(emitido: string) {
  const segredo = process.env.SEGREDO_DO_FORMULARIO;
  if (!segredo) throw new Error("SEGREDO_DO_FORMULARIO ausente");
  return createHmac("sha256", segredo).update(emitido).digest("base64url");
}

/** O carimbo que a página põe no formulário: o instante da emissão e a assinatura dele. */
export function emitirCarimbo(agora = Date.now()) {
  const emitido = String(agora);
  return `${emitido}.${assinar(emitido)}`;
}

export function lerCarimbo(carimbo: string, agora = Date.now()): "valido" | "forjado" | "rapido" | "vencido" {
  const [emitido = "", assinatura = ""] = carimbo.split(".");
  if (!/^\d{13}$/.test(emitido)) return "forjado";
  const esperada = Buffer.from(assinar(emitido));
  const recebida = Buffer.from(assinatura);
  // O timingSafeEqual exige o mesmo comprimento; comparar em tempo constante não revela quantos caracteres batem.
  if (recebida.length !== esperada.length || !timingSafeEqual(recebida, esperada)) return "forjado";
  const idade = agora - Number(emitido);
  if (idade < MINIMO_MS) return "rapido"; // inclui o relógio adiantado (idade negativa)
  if (idade > MAXIMO_MS) return "vencido";
  return "valido";
}
```

### 5.3 · O limite por IP, em hash

**Regra.**
- **Quanto:** até 5 envios por hora por IP (RATIFICADO).
- **Como se conta:** o IP vira um HMAC-SHA256 com um **sal aleatório do dia**, criado no primeiro uso do dia e apagado no dia seguinte. Sem o sal, o hash não volta ao IP.
- **O que se grava:** só o hash e a contagem, no MySQL do plano. **O IP nunca é gravado.**

**Objetivo.** Barrar o robô que espera os 3 s e não preenche a armadilha, sem guardar dado pessoal: o hash com sal apagado não identifica ninguém depois de um dia.

```sql
-- O sal do dia (UTC) e a contagem por hora. Uma tarefa diária apaga o que passou.
CREATE TABLE sal_do_dia (
  dia DATE PRIMARY KEY,
  sal BINARY(32) NOT NULL
);
CREATE TABLE limite_de_envio (
  chave CHAR(64) NOT NULL,          -- HMAC-SHA256 do IP com o sal do dia, em hexadecimal
  hora DATETIME NOT NULL,           -- a hora cheia, em UTC
  envios SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (chave, hora)
);
-- Tarefa diária (cron do hPanel): DELETE FROM limite_de_envio WHERE hora < UTC_TIMESTAMP() - INTERVAL 1 DAY;
--                                  DELETE FROM sal_do_dia WHERE dia < UTC_DATE();
```

```ts
// lib/formulario/limite.ts
import "server-only";
import { createHmac, randomBytes } from "node:crypto";

import { banco } from "@/lib/banco";

/** O sal do dia: aleatório, criado no primeiro uso do dia e apagado no seguinte. */
async function salDoDia() {
  const hoje = new Date().toISOString().slice(0, 10);
  await banco.query("INSERT IGNORE INTO sal_do_dia (dia, sal) VALUES (?, ?)", [hoje, randomBytes(32)]);
  const [linhas] = await banco.query("SELECT sal FROM sal_do_dia WHERE dia = ?", [hoje]);
  return (linhas as { sal: Buffer }[])[0].sal;
}

/** Soma um envio do IP na hora corrente e devolve quantos já houve nela. */
export async function contarEnvio(ip: string) {
  const chave = createHmac("sha256", await salDoDia()).update(ip).digest("hex");
  const hora = new Date();
  hora.setUTCMinutes(0, 0, 0);
  // Soma e lê na mesma instrução: o LAST_INSERT_ID(expr) devolve o valor gravado por ela (no insertId). Com um SELECT
  // depois, numa outra conexão do pool, uma rajada do mesmo IP lia a contagem das outras (achado do teste de 08.10.2026).
  const [resposta] = await banco.query(
    "INSERT INTO limite_de_envio (chave, hora, envios) VALUES (?, ?, LAST_INSERT_ID(1)) ON DUPLICATE KEY UPDATE envios = LAST_INSERT_ID(envios + 1)",
    [chave, hora],
  );
  return (resposta as unknown as { insertId: number }).insertId;
}
```

```ts
// lib/banco.ts — o MySQL do plano, no mesmo servidor.
import "server-only";
import mysql from "mysql2/promise";

export const banco = mysql.createPool({
  host: "127.0.0.1",
  user: process.env.BANCO_USUARIO,
  password: process.env.BANCO_SENHA,
  database: process.env.BANCO_NOME,
  timezone: "Z", // datas em UTC: sem isto, o mysql2 converte pelo fuso do servidor
  connectionLimit: 5,
});
```

**O IP atrás do proxy** [NV]:
- **Qual valor ler:** o último valor do `x-forwarded-for` (o que o proxy acrescentou), nunca o primeiro, que o próprio cliente pode escrever. O Next 16 não tem mais `request.ip`.
- **Sem o cabeçalho, nenhum limite:** se o proxy não mandar `x-forwarded-for` nem `x-real-ip`, a ação não limita e deixa um aviso no registro do web app. O mesmo vale quando o único valor é o **loopback** (`127.0.0.1`, `::1`): o Next 16 preenche o `x-forwarded-for` com o endereço do soquete quando ele falta (`next/dist/server/base-server.js`), e sem proxy esse endereço é o do próprio servidor (achado do teste com banco real, 08.10.2026). Contar todos como "desconhecido" poria todo visitante no mesmo balde, e o sexto envio da hora, de qualquer pessoa, receberia "Muitas mensagens deste endereço": uma falha de configuração viraria o formulário inteiro bloqueado. O aviso no registro é o sinal para corrigir.
- **Como confirmar no servidor:** registrar uma vez os cabeçalhos de um pedido de teste e conferir quantos proxies há na frente do app.
- **Nos testes,** sem proxy na frente, o pedido não traz o cabeçalho: o teste do limite manda um `x-forwarded-for` próprio (`extraHTTPHeaders`), como o da Agenda (`../../qualidade/05-ponta-a-ponta.md`, seção 5.6).

**Limite em memória (um `Map`)**, sem o banco, serve no rascunho, nunca na publicação: o web app dorme sem tráfego e acorda zerado (https://docs.hostinger.com/node.js/overview.md).

---

## 6. A entrega por e-mail

**Regra.**
- **O caminho:** o envio sai pelo SMTP da Hostinger, de uma caixa do domínio do cliente (`site@dominio`), para a caixa que o cliente indicar. O `Reply-To` é o e-mail da pessoa, quando ela o deu: responder ao e-mail responde à pessoa.
- **O formato:** só texto, sem HTML, com os campos e o prazo de resposta publicado.
- **Sem cópia:** o envio não guarda cópia na caixa de saída do site.

**Objetivo.** O cliente recebe onde já trabalha (o e-mail), sem painel novo para aprender. Só texto não tem o que quebrar nem o que esconder.

**Como fazer.**

| Item | Valor | Evidência |
|---|---|---|
| Servidor | `smtp.hostinger.com`, porta 465, SSL | [FU] |
| Limite da caixa grátis do plano | 100 envios por dia | A CONFIRMAR no hPanel |
| Limite da caixa paga | 1.000 envios por dia, ~US$ 1,59 por mês | A CONFIRMAR |
| Custo depois do primeiro ano | ~R$ 9 por mês por caixa | A CONFIRMAR |
| Entrega sem cair no lixo | SPF, DKIM e DMARC do domínio configurados | A CONFIRMAR: a Hostinger os põe sozinha quando o domínio usa os servidores de nome dela |

```ts
// lib/formulario/email.ts — nodemailer (aprovado em 08.10.2026; vale o código do módulo, ../../modulos/formulario/).
import "server-only";
import { appendFile } from "node:fs/promises";
import nodemailer from "nodemailer";

import { negocio, servicos } from "@/conteudo/negocio";
import type { Campos } from "./validar";

const teste = process.env.SMTP_TESTE; // "1": nada sai, o e-mail vira JSON; "falha": simula o SMTP fora do ar
const transporte = nodemailer.createTransport(
  teste
    ? { jsonTransport: true }
    : { host: "smtp.hostinger.com", port: 465, secure: true, auth: { user: process.env.SMTP_USUARIO, pass: process.env.SMTP_SENHA } },
);

export async function enviarEmail(c: Campos) {
  if (teste === "falha") throw new Error("SMTP simulado fora do ar");
  const servico = servicos.find((s) => s.id === c.servico)!.nome;
  const linhas = [`Nome: ${c.nome}`];
  if (c.telefone) linhas.push(`Telefone: ${c.telefone}`);
  if (c.email) linhas.push(`E-mail: ${c.email}`);
  linhas.push(`Serviço: ${servico}`, "", c.mensagem || "(sem mensagem)", "", `Prazo de resposta publicado no site: ${negocio.prazoDeResposta}.`);
  const info = await transporte.sendMail({
    from: { name: `Site ${negocio.nome}`, address: process.env.SMTP_USUARIO! },
    to: process.env.CONTATO_DESTINO,
    replyTo: c.email || undefined,
    subject: `Contato pelo site: ${servico}`,
    text: linhas.join("\n"),
  });
  if (teste) await appendFile(".teste/emails.jsonl", `${info.message}\n`); // o teste de ponta a ponta lê daqui (pasta criada pelo teste, fora do git)
}
```

**Cuidados:**
- **Injeção de cabeçalho.** Nenhum texto da pessoa vai para um cabeçalho com quebra de linha: a ação tira as quebras dos campos de uma linha, e o assunto usa o nome do serviço da lista do site, não o texto digitado.
- **A falha aparece.** Se o SMTP recusar, a ação devolve "falhou" e a pessoa vê o aviso com o WhatsApp. Nada fica numa fila que ninguém confere.
- **O limite diário.** Um dia com mais envios que o limite da caixa faz o SMTP recusar. O aviso de falha cobre a pessoa; o relatório mensal conta as falhas (`04-relatorio-de-acessos.md`).

---

## 7. A guarda dos dados e a conformidade

**Regra.** Coletando, vale o **pacote de conformidade inteiro** (`../17-conformidade-e-normas.md`; no repositório do Atlas, `documentacao/atlas--conformidade.md`, seção 10):

| Item | O que se faz |
|---|---|
| Papéis | O cliente é o **controlador**; o Atlas, o **operador** (LGPD, art. 5º, VI e VII); a Hostinger, suboperadora. O contrato de operador depende do CNPJ do Atlas e de advogado |
| Base legal | Passos preliminares de contrato, a pedido do titular (LGPD, art. 7º, V). **Sem caixa de consentimento** para o contato. Novidades por e-mail só com consentimento à parte, caixa desmarcada (art. 7º, I) |
| Onde fica | **Só no e-mail** do cliente; banco de dados só quando houver Agenda (`05-agenda.md`). A caixa de e-mail não tem prazo de guarda nem controle de acesso próprios: por isso a limpeza programada (linha seguinte) a alcança também |
| Prazo de guarda | O cliente define e o aviso publica (por exemplo, contatos por 12 meses). A limpeza alcança a caixa de e-mail [A CONFIRMAR: como apagar por tarefa agendada numa caixa da Hostinger] |
| Aviso de privacidade | Ganha o formulário, o prazo de guarda e os suboperadores. Junto do botão de envio, a frase curta com o prazo e o vínculo para ele (`../17-conformidade-e-normas.md`, seção 5.2) |
| Cookie | Nenhum. O formulário não precisa de cookie: o carimbo é assinado, e o limite é por hash |
| Agente de pequeno porte | ME, EPP e MEI dispensam o encarregado, mas mantêm um canal com o titular (Resolução CD/ANPD 2/2022, art. 11) |
| Porta de publicação | O aviso de privacidade com o formulário, o prazo de guarda publicado, o contrato de operador assinado e um envio de teste feito no ar |

**Objetivo.** O site que coleta dado é responsabilidade do cliente perante a ANPD, e do Atlas como operador. Um formulário sem aviso, sem prazo e sem contrato expõe os dois.

---

## 8. A experiência

**Regra.**

| Item | Como |
|---|---|
| Rótulo | Visível, acima do campo, ligado por `htmlFor`; nunca só o *placeholder*, que some ao digitar |
| Quantos campos | De três a cinco, e o formulário **nunca é o único canal**: o WhatsApp e o telefone ficam ao lado (NN/g, https://www.nngroup.com/articles/contact-us-pages/) [V] |
| Obrigatório e opcional | Os dois marcados em texto: "(obrigatório)" e "(opcional)". No par telefone/e-mail, a legenda diz "um dos dois" (Baymard, https://baymard.com/blog/required-optional-form-fields) [V] |
| Tamanho do texto do campo | 16 px ou mais: abaixo disso, o Safari do iPhone amplia a página ao tocar |
| O teclado do celular | O tipo certo (`inputMode`, `autoComplete`, acima); `enterKeyHint="next"` nos campos e `"send"` no último. O campo focado fica à vista acima do teclado virtual (o navegador rola até ele; nada preso à tela embaixo o cobre: o atalho do WhatsApp some enquanto um campo tem o foco). Conferido no aparelho real (`../../qualidade/08-desempenho.md`, seção 8) |
| Alvo | 44 px de altura no mínimo, em campo e botão |
| Erro | Em texto, junto do campo, ligado por `aria-describedby`, com `aria-invalid="true"`; o foco vai para o primeiro campo com erro. Cor não é o único sinal (um ícone ou o texto) |
| Validação | Ao sair do campo, só se houver algo escrito, e no envio, com tudo; nunca a cada tecla (Baymard, https://baymard.com/blog/inline-form-validation) [V]. O erro some assim que o campo fica certo |
| Estados | Repouso; "Enviando…" (`aria-disabled`, sem trocar de tamanho); enviado (a página de confirmação, com o prazo); falhou (o aviso, com o WhatsApp); limite (o aviso, com o WhatsApp). Os avisos ficam numa região `aria-live="polite"` |
| Botão | Diz o que faz: "Enviar a mensagem". Nunca "Enviar" sozinho, nunca "Submit" |
| Foco, hover, desabilitado | Visíveis em todo controle (Diretrizes, regra 4; `../16-acessibilidade.md`) |
| Valores | Voltam preenchidos depois de um erro, com e sem script |

**Como conferir.**
- **Régua** (`../../qualidade/02-regua.md`): alvos (bloco 1), sem script (bloco 2), rótulos e nomes (bloco 3), teclado (bloco 4) e conformidade (bloco 9: formulário que envia dados sem vínculo para o aviso de privacidade reprova).
- **axe** no estado de erro (`../../qualidade/06-acessibilidade.md`).
- **Leitor de tela:** o roteiro do formulário — cada rótulo lido, o erro anunciado, o foco no primeiro erro, o aviso de falha lido.

---

## 9. Os testes

| Camada | O que prova |
|---|---|
| Unidade (`../../qualidade/04-unidade.md`) | `validar` (cada regra, os limites exatos: 1, 2, 80 e 81 caracteres no nome; telefone com e sem 55, com máscara, curto); `lerTelefone`; `lerCarimbo` (válido; assinatura trocada; carimbo sem ponto; 2.999 ms; 24 h e 1 ms; idade negativa); a mensagem do e-mail (sem quebra de linha no assunto) |
| Ponta a ponta, com script (`../../qualidade/05-ponta-a-ponta.md`) | O envio certo chega a `/contato/enviado` e grava uma linha em `.teste/emails.jsonl` (`SMTP_TESTE=1`); o erro ao sair do campo; o foco no primeiro erro; o clique duplo envia uma vez só |
| Ponta a ponta, **sem script** (`javaScriptEnabled: false`) | O envio certo responde 303 e abre a confirmação; o erro volta com os valores preenchidos e o resumo no topo |
| Proteção | O campo-armadilha preenchido abre a confirmação e **não** grava e-mail; o envio em menos de 3 s pede conferência e a segunda tentativa passa; o carimbo de mais de 24 h (feito no teste com o segredo de teste) pede conferência; o sexto envio na hora, com o mesmo `x-forwarded-for`, mostra o aviso de limite; **doze envios simultâneos do mesmo IP entregam exatamente cinco** (a soma e a leitura na mesma instrução); sem o cabeçalho, ou só com o loopback, nenhum limite e um aviso no registro; `SMTP_TESTE=falha` mostra o aviso com o WhatsApp |
| Ataque (`../../qualidade/12-ataque-a-falhas.md`) | Corpo acima do limite; campo repetido; campo como arquivo em vez de texto; quebra de linha e `Bcc:` no nome; 10.000 caracteres na mensagem; envio de outra origem (recusado pelo Next); envio com a página aberta antes de uma publicação nova (a tela de erro em português, nunca a padrão) |
| No ar (porta de publicação) | Um envio real, conferido na caixa do cliente; o `Reply-To` responde à pessoa; o e-mail não caiu no lixo |

---

## 10. Os sites sem servidor: o talão [ex]

**Regra.** Onde não há servidor, o "formulário" **compõe uma mensagem** e a entrega ao WhatsApp do próprio aparelho:
- a pessoa preenche o que souber;
- o texto vira um vínculo `wa.me` com a mensagem pronta;
- nada sai para um servidor, e nada é guardado.

É o padrão do talão do Depósito Engenhoca (`web/components/ilhas/demos/pedido-por-mensagem.tsx`, no repositório do Atlas).

**Varia por plano.**
- **[ex]:** é o "formulário" dos sites de exemplo, que não coletam nada.
- **[E]:** o Essencial tem o vínculo do WhatsApp com a mensagem pronta (`01-base-de-todo-site.md`, seção 1), não o talão. O talão é uma composição de pedido, que conta como funcionalidade sob medida (`README.md`, seção 4); no Essencial, ela se orça à parte, antes de fazer.
- **[P][C]:** o formulário de verdade (seções 1 a 9). O talão só entra se for a funcionalidade do ofício escolhida com o dono (`07-funcionalidades-do-oficio.md`). No depósito de exemplo, ele está no lugar do formulário, que um site fictício não pode ter.

**Objetivo.** O pedido organizado do Profissional, sem a coleta e sem o servidor. A mensagem sai do aparelho da pessoa, pelo aplicativo dela: o site não trata dado nenhum.

**Como fazer.**
1. **O mínimo do pedido é o que se precisa.** No depósito, a lista; sem ela, o envio fica desabilitado (`aria-disabled`, com a razão em texto). Nome e bairro seguem livres ("preencha o que souber"). Até 03.10, o talão vazio era enviado só com a saudação.
2. **A mensagem** junta os campos preenchidos, um por linha, com a lista por último:

   ```ts
   const mensagem = [
     "Olá. Pedido de orçamento.",
     nome && `Nome: ${nome}`,
     bairro && `Bairro: ${bairro}`,
     `Recebimento: ${recebimento}`,
     lista && `Lista:\n${lista}`,
   ].filter(Boolean).join("\n");
   const vinculo = `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensagem)}`;
   ```
3. **O envio é um vínculo, não um envio de formulário.** A política de conteúdo (`form-action 'self'`) bloquearia um `<form action="https://wa.me/…">`. O vínculo é navegação, que ela não restringe.
4. **Sem script, há uma saída.** O talão desenhado no servidor não compõe nada sem script. No lugar do envio, um vínculo comum do WhatsApp, com a mensagem curta ("Olá. Pedido de orçamento."), dentro de `<noscript>`; a pessoa escreve a lista na conversa.

   **Achado de 08.10, fora do escopo desta pasta.** O talão do depósito envia por `onSubmit` com `window.open`, e sem script o envio não leva a lugar nenhum. A correção é a deste item, a decidir pelo usuário.
5. **Copiar a lista** (`CopyButton` do Spell UI) ao lado do envio, para quem prefere colar em outro canal. O "Copiado" aparece só se a cópia deu certo; senão, "Cópia indisponível", com o texto à vista para a cópia à mão (lição de 03.10).

**Como conferir.**
- **Com script:** o teste confere o `href` composto (cada campo, a lista com quebra de linha codificada) e o envio desabilitado com a lista vazia.
- **Sem script:** o vínculo do `<noscript>` está presente e abre a conversa.

**Varia por [ex].** Nos sites de exemplo, o número é o fictício (`01-base-de-todo-site.md`, seção 1) e o selo de ficção diz que nada é coletado.
