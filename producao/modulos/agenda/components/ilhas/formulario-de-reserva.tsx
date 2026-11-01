"use client";
// components/ilhas/formulario-de-reserva.tsx — o segundo formulário da marcação: o horário escolhido entre os livres e os
// dados da pessoa, para a Server Action (producao/esteira/14-funcionalidades/05-agenda.md, seções 4 e 5). Funciona sem script, como o de contato
// (02-formulario.md, seção 3.3): sem script é um POST comum, e a página volta recalculada, com os erros em texto e os
// valores preenchidos; com script, a ilha acrescenta a validação ao sair do campo, o "Reservando…" e o foco no primeiro
// erro. A validação é a de lib/agenda/validar.ts, a mesma do servidor. Só tipos vêm de processar.ts.
import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { reservarHorario } from "@/app/agendar/acoes";
import type { TextosDaReserva } from "@/conteudo/agenda";
import type { EstadoDaReserva } from "@/lib/agenda/processar";
import { validarReserva } from "@/lib/agenda/validar";
import type { CamposDaReserva, ErrosDaReserva } from "@/lib/agenda/validar";
import { vinculoDoWhatsapp } from "@/lib/whatsapp";

const CONTROLE =
  "mt-2 min-h-12 w-full rounded-marcacao border border-border bg-card px-4 text-corpo hover:border-foreground/40 aria-invalid:border-2 aria-invalid:border-accent";

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

function Rotulo({ para, texto, marca }: { para: string; texto: string; marca: string }) {
  return (
    <label htmlFor={para} className="block font-semibold">
      {texto} <span className="font-normal text-muted-foreground">{marca}</span>
    </label>
  );
}

const descricao = (...ids: (string | false | undefined)[]) => ids.filter(Boolean).join(" ") || undefined;

export type HorarioOferecido = { valor: string; rotulo: string };

export function FormularioDeReserva({
  carimbo,
  servicoId,
  profissional,
  horarios,
  textos,
  whatsapp,
  consentimento = null,
}: {
  carimbo: string;
  servicoId: number;
  /** "qualquer" ou o id do profissional escolhido. */
  profissional: string;
  horarios: readonly HorarioOferecido[];
  textos: TextosDaReserva;
  whatsapp: string;
  /** O texto da caixa de consentimento (ConfigDaAgenda.consentimento), na psicologia; null nos outros nichos. */
  consentimento?: string | null;
}) {
  const inicial: EstadoDaReserva = { situacao: "inicial", carimbo };
  const [estado, enviar, pendente] = useActionState(reservarHorario, inicial);
  const [locais, setLocais] = useState<ErrosDaReserva>({});
  const formulario = useRef<HTMLFormElement>(null);
  const erros: ErrosDaReserva = { ...estado.erros, ...locais };
  const v = estado.valores;
  const saida = vinculoDoWhatsapp(whatsapp, textos.saudacaoDoWhatsapp);

  const ler = (): CamposDaReserva => {
    const d = new FormData(formulario.current!);
    const t = (n: string) => String(d.get(n) ?? "").trim();
    return { nome: t("nome"), email: t("email"), telefone: t("telefone"), servico: t("servico"), profissional: t("profissional"), inicio: t("inicio"), consentimento: t("consentimento") };
  };
  // O primeiro campo marcado, na ordem da página; no grupo de rádios, o primeiro rádio.
  const focarOPrimeiroErro = () => formulario.current?.querySelector<HTMLElement>("[aria-invalid='true'], fieldset[data-invalido] input")?.focus();

  // Ao sair de um campo: só o erro dele, e só se houver algo escrito. Campo vazio é erro no envio.
  const aoSair = (nome: keyof CamposDaReserva) => {
    const valores = ler();
    setLocais((atual) => ({ ...atual, [nome]: valores[nome] ? validarReserva(valores, Boolean(consentimento))[nome] : undefined }));
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
        const tudo = validarReserva(ler(), Boolean(consentimento));
        // Com erro, ou já enviando, o envio não sai (o React não chama a ação se o evento foi cancelado).
        if (pendente || Object.keys(tudo).length > 0) {
          e.preventDefault();
          setLocais(tudo);
          requestAnimationFrame(focarOPrimeiroErro);
        }
      }}
    >
      <input type="hidden" name="carimbo" value={estado.carimbo} />
      <input type="hidden" name="servico" value={servicoId} />
      <input type="hidden" name="profissional" value={profissional} />
      {/* O campo-armadilha: fora da tela, fora do Tab, fora do leitor de tela e com um nome que o preenchimento automático não reconhece. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Não preencha este campo
          <input type="text" name="nao_preencher" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      {/* Sem script, o resumo dos erros (o foco não é levado). O horário levado por outro pedido tem o texto dele. */}
      {(estado.situacao === "corrigir" || estado.situacao === "ocupado") && (
        <p role="alert" className="rounded-marcacao border-l-4 border-accent bg-muted px-4 py-3 font-semibold">
          {estado.aviso ?? (estado.situacao === "ocupado" ? textos.ocupado : textos.resumoDeErros)}
        </p>
      )}

      <fieldset data-invalido={erros.inicio ? "" : undefined} aria-describedby={descricao(erros.inicio && "inicio-erro")}>
        <legend className="font-semibold">
          {textos.campos.horario} <span className="font-normal text-muted-foreground">{textos.marcas.obrigatorio}</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {horarios.map((h, i) => (
            <label key={h.valor} htmlFor={`inicio-${i}`} className="relative inline-flex min-h-11 min-w-20 cursor-pointer items-center justify-center rounded-full bg-card px-4 tabular ring-1 ring-border ring-inset hover:ring-foreground/40 has-checked:bg-primary has-checked:text-primary-foreground has-checked:ring-primary has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-ring">
              {/* O rádio nativo cobre a caixa inteira (alvo de 44 px) e some; a caixa é o desenho. O anel é de sombra, por dentro da borda: não aumenta a caixa. */}
              <input
                id={`inicio-${i}`}
                type="radio"
                name="inicio"
                value={h.valor}
                required
                defaultChecked={v?.inicio === h.valor}
                onChange={() => erros.inicio && aoSair("inicio")}
                className="absolute inset-0 size-full cursor-pointer opacity-0"
              />
              {h.rotulo}
            </label>
          ))}
        </div>
        {erros.inicio && <Erro id="inicio-erro">{erros.inicio}</Erro>}
      </fieldset>

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
          onChange={() => erros.nome && aoSair("nome")}
          className={CONTROLE}
        />
        {erros.nome && <Erro id="nome-erro">{erros.nome}</Erro>}
      </div>

      <div>
        <Rotulo para="email" texto={textos.campos.email} marca={textos.marcas.obrigatorio} />
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          enterKeyHint="next"
          spellCheck={false}
          autoCapitalize="none"
          required
          defaultValue={v?.email}
          aria-invalid={Boolean(erros.email) || undefined}
          aria-describedby={descricao(erros.email && "email-erro")}
          onBlur={() => aoSair("email")}
          onChange={() => erros.email && aoSair("email")}
          className={CONTROLE}
        />
        {erros.email && <Erro id="email-erro">{erros.email}</Erro>}
      </div>

      <div>
        <Rotulo para="telefone" texto={textos.campos.telefone} marca={textos.marcas.opcional} />
        <input
          id="telefone"
          name="telefone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          enterKeyHint="send"
          defaultValue={v?.telefone}
          aria-invalid={Boolean(erros.telefone) || undefined}
          aria-describedby={descricao(erros.telefone && "telefone-erro")}
          onBlur={() => aoSair("telefone")}
          onChange={() => erros.telefone && aoSair("telefone")}
          className={CONTROLE}
        />
        {erros.telefone && <Erro id="telefone-erro">{erros.telefone}</Erro>}
      </div>

      {/* A caixa de consentimento, só onde a casa a configura (a psicologia): desmarcada, obrigatória, destacada (LGPD,
          art. 11, I). A caixa nativa cobre a linha inteira (alvo de 44 px) e some; o quadrado é o desenho. */}
      {consentimento && (
        <div>
          <label htmlFor="consentimento" className="group relative flex min-h-11 cursor-pointer items-start gap-3 rounded-marcacao border border-border bg-card p-4 hover:border-foreground/40 has-aria-invalid:border-2 has-aria-invalid:border-accent">
            <input
              id="consentimento"
              name="consentimento"
              type="checkbox"
              value="sim"
              required
              defaultChecked={v?.consentimento === "sim"}
              aria-invalid={Boolean(erros.consentimento) || undefined}
              aria-describedby={descricao(erros.consentimento && "consentimento-erro")}
              onChange={() => erros.consentimento && aoSair("consentimento")}
              className="absolute inset-0 size-full cursor-pointer opacity-0"
            />
            <span
              aria-hidden="true"
              className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-[0.3rem] border-2 border-foreground/50 group-has-checked:border-primary group-has-checked:bg-primary group-has-focus-visible:outline-2 group-has-focus-visible:outline-offset-3 group-has-focus-visible:outline-ring"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-primary-foreground opacity-0 group-has-checked:opacity-100">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <span>
              {consentimento} <span className="text-muted-foreground">{textos.marcas.obrigatorio}</span>
            </span>
          </label>
          {erros.consentimento && <Erro id="consentimento-erro">{erros.consentimento}</Erro>}
        </div>
      )}

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
