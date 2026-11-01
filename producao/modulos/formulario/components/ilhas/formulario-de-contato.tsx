"use client";
// components/ilhas/formulario-de-contato.tsx — o formulário de contato (producao/esteira/14-funcionalidades/02-formulario.md,
// seções 3.3 e 8). Sem script, é um POST comum para a Server Action, e a página volta com os erros em texto e os valores
// preenchidos; com script, a ilha acrescenta a validação ao sair do campo, o "Enviando…" e o foco no primeiro erro.
// A validação é a de lib/formulario/validar.ts, a mesma do servidor. Só tipos vêm de processar.ts: o código de servidor
// (carimbo, limite) nunca chega ao script.
import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { enviarContato } from "@/app/contato/acoes";
import type { ServicoDoFormulario, TextosDoFormulario } from "@/conteudo/formulario";
import type { EstadoDoEnvio } from "@/lib/formulario/processar";
import { validar } from "@/lib/formulario/validar";
import type { Campos, Erros } from "@/lib/formulario/validar";
import { vinculoDoWhatsapp } from "@/lib/whatsapp";

const CONTROLE =
  "mt-2 w-full rounded-marcacao border border-border bg-card px-4 text-corpo hover:border-foreground/40 aria-invalid:border-2 aria-invalid:border-accent";

/** O círculo do rádio: o ponto aparece com o rádio marcado, e o anel de foco, com o foco do teclado. */
const RADIO =
  "relative size-5 shrink-0 rounded-full border-2 border-foreground/60 bg-card after:absolute after:inset-1 after:rounded-full after:bg-primary after:opacity-0 peer-checked:border-primary peer-checked:after:opacity-100 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ring";

function IconeDeAlerta({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 7v6M12 16.5v.5" />
    </svg>
  );
}

/** O erro em texto, com um ícone: a cor não é o único sinal. */
function Erro({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-nota font-semibold">
      <IconeDeAlerta className="mt-0.5 size-4 shrink-0 text-accent" />
      <span>{children}</span>
    </p>
  );
}

/** O rótulo visível, ligado ao campo, com a marca em texto: "(obrigatório)", "(opcional)" ou "(um dos dois)". */
function Rotulo({ para, texto, marca }: { para: string; texto: string; marca: string }) {
  return (
    <label htmlFor={para} className="block font-semibold">
      {texto} <span className="font-normal text-muted-foreground">{marca}</span>
    </label>
  );
}

const descricao = (...ids: (string | false | undefined)[]) => ids.filter(Boolean).join(" ") || undefined;

export function FormularioDeContato({ carimbo, servicos, textos, whatsapp }: { carimbo: string; servicos: readonly ServicoDoFormulario[]; textos: TextosDoFormulario; whatsapp: string }) {
  const inicial: EstadoDoEnvio = { situacao: "inicial", carimbo };
  const [estado, enviar, pendente] = useActionState(enviarContato, inicial);
  const [locais, setLocais] = useState<Erros>({});
  const formulario = useRef<HTMLFormElement>(null);
  const erros: Erros = { ...estado.erros, ...locais };
  const v = estado.valores;
  const ids = servicos.map((s) => s.id);
  // A saída pelo WhatsApp leva o que a pessoa escreveu: na falha, nada se perde. Vale também sem script (o estado vem do servidor).
  const saida = vinculoDoWhatsapp(whatsapp, v?.mensagem ? `${textos.saudacaoDoWhatsapp}\n${v.mensagem}` : textos.saudacaoDoWhatsapp);

  const ler = (): Campos => {
    const d = new FormData(formulario.current!);
    const t = (n: string) => String(d.get(n) ?? "").trim();
    return { nome: t("nome"), telefone: t("telefone"), email: t("email"), servico: t("servico"), mensagem: t("mensagem") };
  };
  // O primeiro campo marcado, na ordem da página; no grupo de rádios, o primeiro rádio.
  const focarOPrimeiroErro = () => formulario.current?.querySelector<HTMLElement>("[aria-invalid='true'], fieldset[data-invalido] input")?.focus();

  // Ao sair de um campo: só o erro dele, e só se houver algo escrito. Campo vazio é erro no envio:
  // quem passa pelo campo com o Tab ainda vai preenchê-lo (nunca acusar antes da hora).
  const aoSair = (nome: keyof Campos) => {
    const valores = ler();
    setLocais((atual) => ({ ...atual, [nome]: valores[nome] ? validar(valores, ids)[nome] : undefined }));
  };

  // Depois de cada resposta do servidor com erro, o foco vai para o primeiro campo marcado.
  useEffect(() => {
    if (estado.situacao === "corrigir" && estado.erros) setLocais({});
    focarOPrimeiroErro();
  }, [estado]);

  return (
    <form
      ref={formulario}
      action={enviar}
      noValidate
      className="grid content-start gap-8"
      onSubmit={(e) => {
        const tudo = validar(ler(), ids);
        // Com erro, ou já enviando, o envio não sai (o React não chama a ação se o evento foi cancelado).
        if (pendente || Object.keys(tudo).length > 0) {
          e.preventDefault();
          setLocais(tudo);
          requestAnimationFrame(focarOPrimeiroErro);
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
      {estado.situacao === "corrigir" && (
        <p role="alert" className="rounded-marcacao border-l-4 border-accent bg-muted px-4 py-3 font-semibold">
          {estado.aviso ?? textos.resumoDeErros}
        </p>
      )}

      <div>
        <Rotulo para="nome" texto={textos.campos.nome} marca={textos.marcas.obrigatorio} />
        <input
          id="nome"
          name="nome"
          type="text"
          autoComplete="name"
          enterKeyHint="next"
          required
          defaultValue={v?.nome}
          aria-invalid={Boolean(erros.nome) || undefined}
          aria-describedby={descricao(erros.nome && "nome-erro")}
          onBlur={() => aoSair("nome")}
          onChange={() => erros.nome && aoSair("nome")} // com erro marcado, o erro some assim que o campo fica certo
          className={`${CONTROLE} min-h-12`}
        />
        {erros.nome && <Erro id="nome-erro">{erros.nome}</Erro>}
      </div>

      <div>
        <Rotulo para="telefone" texto={textos.campos.telefone} marca={textos.marcas.umDosDois} />
        <input
          id="telefone"
          name="telefone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          enterKeyHint="next"
          defaultValue={v?.telefone}
          aria-invalid={Boolean(erros.telefone) || undefined}
          aria-describedby={descricao(erros.telefone && "telefone-erro")}
          onBlur={() => aoSair("telefone")}
          onChange={() => erros.telefone && aoSair("telefone")}
          className={`${CONTROLE} min-h-12`}
        />
        {erros.telefone && <Erro id="telefone-erro">{erros.telefone}</Erro>}
      </div>

      <div>
        <Rotulo para="email" texto={textos.campos.email} marca={textos.marcas.umDosDois} />
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          enterKeyHint="next"
          spellCheck={false}
          autoCapitalize="none"
          defaultValue={v?.email}
          aria-invalid={Boolean(erros.email) || undefined}
          aria-describedby={descricao(erros.email && "email-erro")}
          onBlur={() => aoSair("email")}
          onChange={() => erros.email && aoSair("email")}
          className={`${CONTROLE} min-h-12`}
        />
        {erros.email && <Erro id="email-erro">{erros.email}</Erro>}
      </div>

      <fieldset data-invalido={erros.servico ? "" : undefined} aria-describedby={descricao(erros.servico && "servico-erro")}>
        <legend className="font-semibold">
          {textos.campos.servico} <span className="font-normal text-muted-foreground">{textos.marcas.obrigatorio}</span>
        </legend>
        <div className="mt-2 grid gap-1">
          {servicos.map((s) => (
            <label key={s.id} htmlFor={`servico-${s.id}`} className="relative flex min-h-11 cursor-pointer items-center gap-3 rounded-marcacao px-1 hover:bg-muted">
              {/* O rádio nativo cobre a linha inteira (alvo de 44 px) e some; o círculo é o desenho. */}
              <input
                id={`servico-${s.id}`}
                type="radio"
                name="servico"
                value={s.id}
                required
                defaultChecked={v?.servico === s.id}
                onChange={() => erros.servico && aoSair("servico")}
                className="peer absolute inset-0 size-full cursor-pointer opacity-0"
              />
              <span aria-hidden="true" className={RADIO} />
              {s.nome}
            </label>
          ))}
        </div>
        {erros.servico && <Erro id="servico-erro">{erros.servico}</Erro>}
      </fieldset>

      <div>
        <Rotulo para="mensagem" texto={textos.campos.mensagem} marca={textos.marcas.opcional} />
        {textos.notaDeSaude && (
          <p id="mensagem-nota" className="mt-1 text-nota text-muted-foreground">
            {textos.notaDeSaude}
          </p>
        )}
        <textarea
          id="mensagem"
          name="mensagem"
          rows={5}
          defaultValue={v?.mensagem}
          aria-invalid={Boolean(erros.mensagem) || undefined}
          aria-describedby={descricao(textos.notaDeSaude && "mensagem-nota", erros.mensagem && "mensagem-erro")}
          onBlur={() => aoSair("mensagem")}
          onChange={() => erros.mensagem && aoSair("mensagem")}
          className={`${CONTROLE} min-h-40 py-3`}
        />
        {erros.mensagem && <Erro id="mensagem-erro">{erros.mensagem}</Erro>}
      </div>

      {/* O aviso no ponto da coleta (producao/esteira/17-conformidade-e-normas.md, seção 5.2), com o prazo que o cliente definiu. */}
      <div className="text-nota text-muted-foreground">
        <p>{textos.aviso}</p>
        <Link href="/privacidade" className="inline-flex min-h-11 items-center text-accent hover:underline">
          {textos.vinculoDoAviso}
        </Link>
      </div>

      <div className="grid justify-items-start gap-4">
        <button
          type="submit"
          aria-disabled={pendente || undefined}
          className="inline-flex min-h-12 min-w-52 cursor-pointer items-center justify-center rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-[filter] duration-200 hover:brightness-110 aria-disabled:cursor-progress aria-disabled:opacity-70"
        >
          {pendente ? textos.enviando : textos.botao}
        </button>

        <div aria-live="polite">
          {estado.situacao === "limite" && (
            <p className="max-w-[52ch]">
              {textos.limite.antes}{" "}
              <a href={saida} target="_blank" rel="noopener noreferrer" className="text-accent underline">
                {textos.limite.vinculo}
                <span className="sr-only">, abre em nova aba</span>
              </a>
              {textos.limite.depois}
            </p>
          )}
          {estado.situacao === "falhou" && (
            <p className="max-w-[52ch]">
              {textos.falhou.antes}{" "}
              <a href={saida} target="_blank" rel="noopener noreferrer" className="text-accent underline">
                {textos.falhou.vinculo}
                <span className="sr-only">, abre em nova aba</span>
              </a>
              {textos.falhou.depois}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
