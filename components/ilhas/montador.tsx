"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { IconeSeta, IconeVisto, IconeWhatsApp } from "@/components/icones";
import { buttonVariants } from "@/components/ui/button";
import { EtiquetaRecomendado } from "@/components/ui/etiqueta-recomendado";
import { CopyButton } from "@/components/ui/spell/copy-button";
import { montador as t } from "@/conteudo/paginas/orcamento";
import { modulos, modulosDoMontador, planos } from "@/conteudo/planos";
import { EVENTO_ANCORA, type DetalheDaAncora } from "@/lib/ancoras";
import { contarReais } from "@/lib/contar";
import { reais } from "@/lib/moeda";
import { linkWhatsApp, mensagemDeOrcamento } from "@/lib/whatsapp";

/** A página adicional: cobrada por pedido, fora da soma (conteudo/planos.ts). */
const paginaAdicional = modulos.find((m) => m.porPagina);
const semInscricao = () => () => {};

function somar(planoId: string, moduloIds: string[]) {
  const plano = planos.find((p) => p.id === planoId)!;
  const escolhidos = modulosDoMontador.filter((m) => moduloIds.includes(m.id));
  return {
    plano,
    escolhidos,
    criacao: plano.criacao + escolhidos.reduce((s, m) => s + m.criacao, 0),
    mensal: plano.mensal + escolhidos.reduce((s, m) => s + (m.mensal ?? 0), 0),
  };
}

/** O resumo de cada plano na opção: os dois primeiros itens dele, numa frase ("Até seis páginas, galeria e formulário."). */
const resumoDo = (itens: string[]) => `${itens[0]}, ${itens[1].charAt(0).toLowerCase()}${itens[1].slice(1)}.`;

/**
 * O total: quando muda, conta do valor anterior ao novo (380 ms, como em 28/08). Com movimento reduzido, não conta:
 * fica o valor novo, que o React já escreveu. Na conta de /orcamento, o que o módulo sob o ponteiro somaria aparece ao
 * lado do número e respira (a constante da página: de 40% a 100%, em cinco meias-voltas de 900 ms, e assenta).
 */
function Total({ rotulo, valor, sob, somaria, grande }: { rotulo: string; valor: number; sob: string; somaria?: number; grande?: boolean }) {
  const el = useRef<HTMLSpanElement>(null);
  const anterior = useRef(valor);

  useEffect(() => {
    const de = anterior.current;
    anterior.current = valor;
    if (!el.current || de === valor || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    return contarReais(el.current, valor, { de, duracao: 380 });
  }, [valor]);

  return (
    <div className="min-w-0">
      <dt className="text-base font-semibold text-muted-foreground">{rotulo}</dt>
      <dd className={`relative mt-1 font-display tracking-titulo tabular-nums whitespace-nowrap ${grande ? "orc-total" : "text-numero"}`}>
        <span ref={el}>{reais(valor)}</span>
        {somaria != null && (
          <span key={somaria} aria-hidden="true" className="orc-fantasma mov-constante">
            + {reais(somaria)}
          </span>
        )}
      </dd>
      <dd className="mt-1 text-base text-muted-foreground tabular-nums">{sob}</dd>
    </div>
  );
}

/** A marca da opção, desenhada: o círculo do plano e o quadrado do módulo, cheios e com o visto quando marcados. */
function Marca({ tipo }: { tipo: "radio" | "checkbox" }) {
  const Forma = tipo === "radio" ? "circle" : "rect";
  const forma = tipo === "radio" ? { cx: 11, cy: 11, r: 10 } : { x: 1, y: 1, width: 20, height: 20, rx: 6 };
  return (
    <svg viewBox="0 0 22 22" aria-hidden="true" className="orc-marca">
      <Forma {...forma} fill="none" stroke="currentColor" strokeOpacity={0.6} strokeWidth={1.5} />
      <Forma {...forma} className="orc-marca-cheio" fill="currentColor" />
      <path className="orc-marca-cheio" d="m6.6 11.2 3 2.9 5.8-6.2" fill="none" stroke="#f3efec" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type PropsDaOpcao = {
  tipo: "radio" | "checkbox";
  valor: string;
  id?: string;
  marcado: boolean;
  aoMudar: () => void;
  aoApontar?: (sobre: boolean) => void;
  nome: string;
  resumo?: string;
  criacao: number;
  mensal: number;
  soma?: boolean;
  recomendado?: boolean;
};

/**
 * A opção, com o preço dentro (R10, 28/10): o rádio ou a caixa nativos, do tamanho da opção inteira e sem desenho
 * próprio (o clique, o teclado, o foco e o leitor de tela são os do controle nativo); o nome em Archivo 500, no papel
 * do h3; o preço à direita, "R$ 1.500 uma vez e R$ 250 por mês". A etiqueta "Recomendado" (D15, a 16 px) no
 * Profissional.
 */
function Opcao({ tipo, valor, id, marcado, aoMudar, aoApontar, nome, resumo, criacao, mensal, soma, recomendado }: PropsDaOpcao) {
  const mais = soma ? "+ " : "";
  return (
    <label
      className="orc-opcao"
      onPointerEnter={aoApontar && ((e) => e.pointerType === "mouse" && aoApontar(true))}
      onPointerLeave={aoApontar && (() => aoApontar(false))}
    >
      <input type={tipo} name={tipo === "radio" ? "plano" : "modulo"} value={valor} id={id} checked={marcado} onChange={aoMudar} className="orc-opcao-campo" />
      <Marca tipo={tipo} />
      <span className="orc-opcao-nome">
        {nome}
        {recomendado && (
          <>
            {" "}
            <EtiquetaRecomendado />
          </>
        )}
      </span>
      {resumo && <span className="orc-opcao-resumo">{resumo}</span>}
      <span className="orc-opcao-preco">
        <span>
          <b>
            {mais}
            {reais(criacao)}
          </b>{" "}
          {t.umaVez}
        </span>{" "}
        <span>
          e{" "}
          <b>
            {mais}
            {reais(mensal)}
          </b>{" "}
          {t.porMes}
        </span>
      </span>
    </label>
  );
}

/** O texto do vínculo com a seta presa à última palavra: quando a linha quebra, a seta não desce sozinha. */
function ComSeta({ texto }: { texto: string }) {
  const corte = texto.lastIndexOf(" ");
  return (
    <>
      {texto.slice(0, corte + 1)}
      <span className="whitespace-nowrap">
        {texto.slice(corte + 1)}
        <IconeSeta className="ml-1 inline size-3.5 align-[-0.05em]" />
      </span>
    </>
  );
}

/** O envio, o mesmo na conta e na faixa do celular (a crítica do esboço, 8.3: a mesma ação com o mesmo desenho). */
function BotaoEnviar({ href, className = "", tabIndex }: { href: string; className?: string; tabIndex?: number }) {
  return (
    <a href={href} target="_blank" rel="noopener" tabIndex={tabIndex} className={buttonVariants({ className: `vd-brilho ${className}` })}>
      <IconeWhatsApp className="size-4.5" />
      {t.enviar}
    </a>
  );
}

type Props = {
  privacidade: string;
  /**
   * A conta de /orcamento: além das escolhas e dos totais, o que o plano inclui e o site feito nele, a composição, a
   * condição de fundação, a mensagem sempre à vista e a faixa do celular. Os textos de conteudo/site.ts chegam por
   * aqui, do servidor; os desta ilha, de conteudo/paginas/orcamento.ts.
   */
  completo?: {
    aviso: string;
    fundacao: { texto: string; rotulo: string; destino: string };
    sites: { plano: string; nome: string; caminho: string }[];
  };
};

/**
 * O montador de orçamento (R10, 28/10). As opções com o preço dentro, em rádio e caixa nativos; os totais em Archivo
 * Black; "Enviar no WhatsApp" direto (D14: saiu o "Preparar mensagem", e com ele o useAnimate da prévia).
 * - Em /orcamento (`completo`), a conta é o objeto da página: uma ficha só, presa ao lado das escolhas na mesa, com os
 *   dois totais um sobre o outro, a composição, a condição de fundação e a mensagem sempre à vista. No celular, a faixa
 *   navy dos totais aparece quando o título e a conta saem da tela.
 * - No início, o montador curto, na ficha que sobe sobre a derrota: as mesmas opções, os totais lado a lado, o envio.
 * Tudo acontece no aparelho: a soma, a mensagem e o vínculo do WhatsApp. Nada é enviado a servidor algum.
 * O plano pode chegar marcado pelo "Escolher <plano>" de /planos (/orcamento#orcamento-<id>, lido do endereço na
 * chegada; a navegação interna avisa o destino pelo evento EVENTO_ANCORA, lib/ancoras.ts). Sem plano no vínculo,
 * chega marcado o recomendado (o Profissional; ata v3.0, IV.2).
 */
export function Montador({ privacidade, completo }: Props) {
  const [planoId, setPlanoId] = useState((planos.find((p) => p.destaque) ?? planos[0]).id);
  const [moduloIds, setModuloIds] = useState<string[]>([]);
  const [apontado, setApontado] = useState<string | null>(null);
  const [mudou, setMudou] = useState(false);
  const colunaDasEscolhas = useRef<HTMLDivElement>(null);
  const caixaDosTotais = useRef<HTMLDListElement>(null);
  const faixaRef = useRef<HTMLDivElement>(null);
  const [faixa, setFaixa] = useState(false);
  const hidratado = useSyncExternalStore(semInscricao, () => true, () => false);

  const { plano, escolhidos, criacao, mensal } = somar(planoId, moduloIds);
  const mensagem = mensagemDeOrcamento({ plano: plano.nome, modulos: escolhidos.map((m) => m.nome), criacao, mensal });
  const link = linkWhatsApp(mensagem);
  const somaria = modulosDoMontador.find((m) => m.id === apontado && !moduloIds.includes(m.id));

  // "Escolher Profissional" (página Planos) aponta para /orcamento#orcamento-profissional.
  // O destino chega pelo evento da navegação interna (ou pelo endereço, na chegada).
  useEffect(() => {
    const aplicar = (destino: string | undefined) => {
      const pedido = /^orcamento-(.+)$/.exec(destino ?? "")?.[1];
      if (planos.some((p) => p.id === pedido)) setPlanoId(pedido!);
    };
    let chegada = "";
    try {
      chegada = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      // Âncora malformada (um vínculo para "/orcamento#%E0"): vale como nenhuma. O
      // decodeURIComponent lançaria dentro do efeito e derrubaria a página.
    }
    aplicar(chegada);
    const aoAncorar = (evento: Event) => aplicar((evento as CustomEvent<DetalheDaAncora>).detail?.id);
    window.addEventListener(EVENTO_ANCORA, aoAncorar);
    return () => window.removeEventListener(EVENTO_ANCORA, aoAncorar);
  }, []);

  // A faixa do pé, em /orcamento abaixo de 1024 px: aparece quando as escolhas estão na tela e nem o título da página
  // nem os totais da conta estão (sem os valores duas vezes à vista). Enquanto ela está à vista, a rolagem guarda a
  // altura dela embaixo (scroll-padding): a opção que recebe o foco pelo teclado não para sob a faixa (WCAG 2.4.11).
  useEffect(() => {
    const escolhas = colunaDasEscolhas.current;
    const totais = caixaDosTotais.current;
    const titulo = document.getElementById("titulo-da-pagina");
    if (!completo || !escolhas || !totais) return;
    const vistos = new Map<Element, boolean>();
    const raiz = document.documentElement;
    const observador = new IntersectionObserver((entradas) => {
      for (const e of entradas) vistos.set(e.target, e.isIntersecting);
      const mostrar = !!vistos.get(escolhas) && !vistos.get(totais) && !(titulo && vistos.get(titulo));
      setFaixa(mostrar);
      const altura = faixaRef.current?.offsetHeight ?? 0;
      raiz.style.scrollPaddingBottom = mostrar && altura ? `${altura + 16}px` : "";
    });
    observador.observe(escolhas);
    observador.observe(totais);
    if (titulo) observador.observe(titulo);
    return () => {
      observador.disconnect();
      raiz.style.scrollPaddingBottom = "";
    };
  }, [completo]);

  function escolherPlano(id: string) {
    setPlanoId(id);
    setMudou(true);
  }

  function alternarModulo(id: string) {
    setModuloIds((atuais) => (atuais.includes(id) ? atuais.filter((m) => m !== id) : [...atuais, id]));
    setMudou(true);
  }

  const Passo = completo ? "h2" : "h3";
  const site = completo?.sites.find((s) => s.plano === plano.id);

  const escolhas = (
    <>
      <fieldset className="orc-passo">
        <legend>
          <Passo className="orc-passo-titulo">{t.passos.plano}</Passo>
        </legend>
        <div className="orc-opcoes">
          {planos.map((p) => (
            <Opcao
              key={p.id}
              tipo="radio"
              valor={p.id}
              id={completo ? `orcamento-${p.id}` : undefined}
              marcado={p.id === planoId}
              aoMudar={() => escolherPlano(p.id)}
              nome={p.nome}
              resumo={completo ? resumoDo(p.itens) : undefined}
              criacao={p.criacao}
              mensal={p.mensal}
              recomendado={p.destaque}
            />
          ))}
        </div>
        {completo && (
          <div className="orc-inclui">
            <h3 className="text-[1.25rem]">{t.inclui(plano.nome)}</h3>
            {/* A leitura (a passiva P21): a faixa de luz desce pela lista do que o plano inclui. O [data-ambiente] não muda
                com o plano: o observador do movimento só vê o que está no HTML da carga. */}
            <ul className="orc-inclui-lista mt-4 grid gap-2.5" data-ambiente data-passiva="orcamento-inclui">
              <li aria-hidden="true" className="orc-inclui-luz mov-passiva" />
              {plano.itens.map((item) => (
                <li key={item} className="flex gap-3">
                  {/* mt-1.5: o visto de 16 px no meio da primeira linha (27 px). */}
                  <IconeVisto className="mt-1.5 size-4 flex-none text-accent" />
                  {item}
                </li>
              ))}
            </ul>
            {site && (
              <>
                {/* Vínculo comum, não <Link>: o site de exemplo é outro site, e a pré-busca traria as fontes dele. */}
                <a href={site.caminho} target="_blank" rel="noopener" className="orc-vinculo mt-3 py-2.5">
                  <ComSeta texto={`${t.siteDoPlano} ${site.nome}`} />
                </a>
                <p className="text-nota text-muted-foreground">{completo.aviso}</p>
              </>
            )}
          </div>
        )}
      </fieldset>

      <fieldset className="orc-passo">
        <legend>
          <Passo className="orc-passo-titulo">{t.passos.modulos}</Passo>
        </legend>
        <div className="orc-opcoes">
          {modulosDoMontador.map((m) => (
            <Opcao
              key={m.id}
              tipo="checkbox"
              valor={m.id}
              marcado={moduloIds.includes(m.id)}
              aoMudar={() => alternarModulo(m.id)}
              aoApontar={completo ? (sobre) => setApontado(sobre ? m.id : null) : undefined}
              nome={m.nome}
              resumo={completo ? m.descricao : undefined}
              criacao={m.criacao}
              mensal={m.mensal ?? 0}
              soma
            />
          ))}
        </div>
        {completo && paginaAdicional && (
          <p className="orc-adicional">
            <b>{t.paginaAdicional.rotulo}</b> {t.paginaAdicional.texto(paginaAdicional.criacao)}
          </p>
        )}
      </fieldset>
    </>
  );

  // O que se anuncia ao leitor de tela, só depois de uma escolha (os números à vista contam e não são lidos a cada passo).
  const falado = (
    <p className="sr-only" aria-live="polite">
      {mudou ? t.falado(criacao, mensal) : ""}
    </p>
  );

  if (!completo) {
    // O montador curto do início: a ficha que sobe sobre a derrota (components/secoes/orcamento.tsx, data-sobe).
    return (
      <div className="orc-montador orc-curto min-w-0 rounded-xl border border-border bg-card px-6 py-8 shadow-[var(--sombra-media)] sm:px-8">
        {escolhas}
        {/* O filete duplo contábil embaixo: o fecho da soma. Lado a lado a partir de 400 px. */}
        <dl className="mt-8 grid gap-x-6 gap-y-5 border-b-[3px] border-double border-foreground/30 pb-5 min-[25rem]:grid-cols-2">
          <Total rotulo={t.criacao} valor={criacao} sob={t.metades(criacao / 2)} />
          <Total rotulo={t.mensal} valor={mensal} sob={t.inicioDaMensalidade} />
        </dl>
        {falado}
        {/* Abaixo de 360 px, 16 px de lado na pílula: com 24, "Enviar no WhatsApp" quebrava em duas linhas a 320 px. */}
        <BotaoEnviar href={link} className="mt-6 w-full max-[22.5rem]:px-4" />
        <p className="mt-4 max-w-[60ch] text-base text-muted-foreground">{privacidade}</p>
      </div>
    );
  }

  // A faixa presa ao pé da tela, só abaixo de 1024 px: os dois totais e o envio, em navy chapado. Fora de vista, inerte.
  // Hidratada, no <body>, com a entrada da página (app/movimento.css), desde 28/10: o transform da .atlas-entra fazia
  // da caixa da página o bloco do fixed, e a faixa ficava fora da tela na entrada. É um atalho de quem toca: o leitor
  // de tela e o teclado têm a conta inteira, na ordem da página (o envio da faixa fora do Tab, que a levaria para
  // depois do rodapé), e a faixa repete os mesmos valores e a mesma ação.
  const faixaDoPe = (
    <div
      ref={faixaRef}
      data-tom="escuro"
      data-entra-com-a-pagina={hidratado ? "" : undefined}
      data-visivel={faixa || undefined}
      aria-hidden="true"
      inert={!faixa}
      className="orc-faixa lg:hidden"
    >
      <p className="orc-faixa-totais">
        <span>
          {t.criacao} <b>{reais(criacao)}</b>
        </span>{" "}
        <span>
          {t.mensal} <b>{reais(mensal)}</b>
        </span>
      </p>
      <BotaoEnviar href={link} tabIndex={-1} className="w-full" />
    </div>
  );

  const { fundacao } = completo;
  return (
    <div className="orc-montador orc-completo">
      <div ref={colunaDasEscolhas} className="min-w-0">
        {escolhas}
      </div>
      {hidratado ? createPortal(faixaDoPe, document.body) : faixaDoPe}
      <aside className="orc-conta" aria-labelledby="conta-titulo">
        <h2 id="conta-titulo" className="sr-only">
          {t.conta}
        </h2>
        <dl ref={caixaDosTotais} className="orc-totais">
          <Total rotulo={t.criacao} valor={criacao} sob={t.metades(criacao / 2)} somaria={somaria?.criacao} grande />
          <Total rotulo={t.mensal} valor={mensal} sob={t.inicioDaMensalidade} somaria={somaria?.mensal} grande />
        </dl>
        {falado}
        {/* Na tela baixa, é este miolo que rola: os totais e o envio ficam sempre à vista (orcamento.css). */}
        <div className="orc-conta-miolo">
        {/* A composição, sempre à vista: o plano e cada módulo, com a criação e a mensalidade de cada um. */}
        <dl className="orc-itens">
          {[{ id: plano.id, nome: plano.nome, criacao: plano.criacao, mensal: plano.mensal }, ...escolhidos].map((linha) => (
            <div key={linha.id}>
              <dt>{linha.nome}</dt>
              <dd>
                <b>{reais(linha.criacao)}</b> e {reais(linha.mensal ?? 0)} {t.porMes}
              </dd>
            </div>
          ))}
        </dl>
        <p className="orc-fundacao">
          <b>{fundacao.rotulo}.</b> {fundacao.texto}{" "}
          <Link href={fundacao.destino} className="orc-vinculo">
            <ComSeta texto={t.verCondicao} />
          </Link>
        </p>
        <div className="orc-mensagem">
          {/* Quebra com a letra grande: o "Copiar" desce, e o vão de 12 px devolve a margem negativa do alvo dele. */}
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <p id="mensagem-rotulo" className="text-base font-semibold text-muted-foreground">
              {t.mensagem}
            </p>
            {/* Spell UI, Copy Button: confirma só se a cópia deu certo. Um vínculo de texto na linha do rótulo. */}
            <CopyButton valor={mensagem} rotulo={t.copiar} className="orc-copiar" />
          </div>
          <p className="orc-mensagem-texto">{mensagem}</p>
        </div>
        </div>
        <BotaoEnviar href={link} className="mt-5 w-full flex-none" />
      </aside>
    </div>
  );
}
