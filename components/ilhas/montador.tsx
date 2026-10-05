"use client";

import { useAnimate } from "motion/react-mini";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { IconeSeta, IconeVisto, IconeWhatsApp } from "@/components/icones";
import { Button, buttonVariants } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/spell/copy-button";
import { modulos, modulosDoMontador, planos } from "@/conteudo/planos";
import { EVENTO_ANCORA, type DetalheDaAncora } from "@/lib/ancoras";
import { contarReais } from "@/lib/contar";
import { reais } from "@/lib/moeda";
import { linkWhatsApp, mensagemDeOrcamento } from "@/lib/whatsapp";

const SUAVE = [0.22, 1, 0.36, 1] as const;

/** A página adicional: cobrada por pedido, fora da soma (conteudo/planos.ts). */
const paginaAdicional = modulos.find((m) => m.porPagina);

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

// A escala do painel (diretrizes de 03/10, CLAUDE.md da raiz). Texto em
// três degraus: rótulo (12 px: capitulares, a nota de privacidade), nota
// (14 px: pílulas, conta, descrições, a mensagem) e número (24 a 36 px: os
// dois totais, em Archivo Black, como no site de 28/08; de 03 a 05/10, na
// família do texto, em 600). Até 03/10, nove tamanhos soltos, de 11,5 a
// 15 px, e os totais de 23 a 35 px. Recuos em três
// medidas: o painel com 24 px dos lados no celular e 32 px a partir de
// 640 px (40 px na tabela completa, de duas colunas, a partir de 1024 px);
// as caixas de dentro (totais, mensagem, plano, condição) todas com 16 px
// dos lados e 20 px em cima e embaixo; as pílulas com 16 px. Até 03/10,
// seis combinações, de 18, 20 e 30 px. Os 16 px nas caixas dos totais
// também deixam "R$ 1.500" caber na caixa a partir de 375 px de tela.

/** As pílulas de escolha da tabela de 28/08: contorno em repouso, navy quando marcadas. */
const PILULA =
  "inline-flex min-h-11 cursor-pointer items-center rounded-full border border-border bg-transparent px-4 py-2.5 text-nota font-medium text-foreground transition-[background-color,color,border-color] duration-150 ease-atlas hover:border-foreground aria-pressed:border-secondary aria-pressed:bg-secondary aria-pressed:text-secondary-foreground";

const ROTULO = "mb-2.5 block text-nota font-semibold";
const CAPITULAR = "text-rotulo font-semibold tracking-wider text-muted-foreground uppercase";
/** As caixas de dentro do painel: os totais, a mensagem, o plano escolhido e a condição de fundação. */
const CAIXA = "rounded-[1.25rem] px-4 py-5";

/**
 * Total da tabela: quando muda, conta do valor anterior ao novo (380 ms, como em 28/08).
 * Com movimento reduzido, não conta: fica o valor novo, que o React já escreveu.
 */
function Total({ rotulo, valor }: { rotulo: string; valor: number }) {
  const el = useRef<HTMLSpanElement>(null);
  const anterior = useRef(valor);

  useEffect(() => {
    const de = anterior.current;
    anterior.current = valor;
    if (!el.current || de === valor || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    return contarReais(el.current, valor, { de, duracao: 380 });
  }, [valor]);

  return (
    <div className={`${CAIXA} min-w-0 bg-background`}>
      <dt className={CAPITULAR}>{rotulo}</dt>
      <dd className="mt-1.5 font-display tracking-titulo text-numero whitespace-nowrap tabular-nums">
        <span ref={el}>{reais(valor)}</span>
      </dd>
    </div>
  );
}

/** Linha da conta: o que é, à esquerda; criação e mensalidade, à direita. */
function Linha({ rotulo, valor, detalhe, forte }: { rotulo: string; valor: string; detalhe?: string; forte?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5 text-nota">
      <dt className={forte ? "font-semibold" : "text-muted-foreground"}>{rotulo}</dt>
      <dd className="text-right tabular-nums">
        <span className="font-semibold">{valor}</span>
        {detalhe && <span className="text-muted-foreground">{detalhe}</span>}
      </dd>
    </div>
  );
}

type TextosDaTabelaCompleta = {
  inclui: string;
  siteDoPlano: string;
  resumo: string;
  pagamento: string;
  noBriefing: string;
  naPublicacao: string;
  inicioDaMensalidade: string;
  mensalidadeCompreende: string;
  paginaAdicional: string;
  fundacao: { texto: string; rotulo: string; destino: string };
};

type Props = {
  privacidade: string;
  /**
   * A tabela completa da página Orçamento: além das escolhas e dos totais,
   * o que o plano inclui e o site feito nele, o que cada módulo faz, a
   * conta item a item, as duas parcelas e o que a mensalidade compreende.
   */
  completo?: { textos: TextosDaTabelaCompleta; sites: { plano: string; nome: string; caminho: string }[] };
};

/**
 * Montador de orçamento com o desenho da tabela do site de 28/08 (pedido
 * do usuário, 03/10: "prefiro a tabela do site antigo"): num painel
 * branco, as pílulas do plano e dos módulos, os dois totais em caixas,
 * "Preparar mensagem" e a prévia, com o envio pelo WhatsApp e a cópia.
 * No início, essa é a tabela inteira; na página Orçamento (`completo`), o
 * mesmo painel ganha uma segunda coluna com a conta item a item, as duas
 * parcelas da criação, o que a mensalidade compreende e a condição de
 * fundação, e a primeira mostra o que o plano inclui e o que cada módulo
 * faz. Tudo acontece no aparelho — soma, mensagem e vínculo para o
 * WhatsApp. Nada é enviado a servidor algum.
 * O plano pode chegar marcado pelo vínculo "Escolher <plano>" da página
 * Planos ou do simulador (/orcamento#orcamento-<id>, lido do endereço na
 * chegada à página do orçamento): a navegação interna não guarda a âncora
 * no endereço e avisa o destino pelo evento EVENTO_ANCORA (lib/ancoras.ts).
 * Sem plano no vínculo, chega marcado o recomendado (o Profissional; ata
 * v3.0, IV.2): o ponto de partida é o plano indicado, não o menor preço.
 */
export function Montador({ privacidade, completo }: Props) {
  const [planoId, setPlanoId] = useState((planos.find((p) => p.destaque) ?? planos[0]).id);
  const [moduloIds, setModuloIds] = useState<string[]>([]);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [previa, animate] = useAnimate<HTMLDivElement>();

  const { plano, escolhidos, criacao, mensal } = somar(planoId, moduloIds);

  // "Escolher Profissional" (página Planos) aponta para /orcamento#orcamento-profissional.
  // O destino chega pelo evento da navegação interna (ou pelo endereço, na chegada).
  useEffect(() => {
    const aplicar = (destino: string | undefined) => {
      const pedido = /^orcamento-(.+)$/.exec(destino ?? "")?.[1];
      if (planos.some((p) => p.id === pedido)) {
        setPlanoId(pedido!);
        setMensagem(null);
      }
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

  // A prévia se abre deslizando (a animação "abre" de 28/08) e, se estiver abaixo da dobra, é trazida à vista.
  useEffect(() => {
    const el = previa.current;
    if (!mensagem || !el) return;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduzir) animate(el, { opacity: [0, 1], transform: ["translateY(-8px)", "none"] }, { duration: 0.7, ease: SUAVE });
    el.scrollIntoView({ behavior: reduzir ? "auto" : "smooth", block: "nearest" });
  }, [mensagem, animate, previa]);

  function escolherPlano(id: string) {
    setPlanoId(id);
    setMensagem(null);
  }

  function alternarModulo(id: string) {
    setModuloIds((atuais) => (atuais.includes(id) ? atuais.filter((m) => m !== id) : [...atuais, id]));
    setMensagem(null);
  }

  const escolhas = (
    <>
      <div className="mb-6">
        <span id="rotulo-plano" className={ROTULO}>
          Plano
        </span>
        <div role="group" aria-labelledby="rotulo-plano" className="flex flex-wrap gap-2">
          {planos.map((p) => (
            <button
              key={p.id}
              type="button"
              id={completo ? `orcamento-${p.id}` : undefined}
              aria-pressed={p.id === planoId}
              onClick={() => escolherPlano(p.id)}
              className={PILULA}
            >
              {p.nome}
            </button>
          ))}
        </div>
        {completo && <DetalheDoPlano plano={plano} textos={completo.textos} site={completo.sites.find((s) => s.plano === plano.id)} />}
      </div>

      <div className="mb-6">
        <span id="rotulo-modulos" className={ROTULO}>
          Módulos <small className="text-rotulo font-medium text-muted-foreground">(opcional)</small>
        </span>
        <div role="group" aria-labelledby="rotulo-modulos" className="flex flex-wrap gap-2">
          {modulosDoMontador.map((m) => (
            <button key={m.id} type="button" aria-pressed={moduloIds.includes(m.id)} onClick={() => alternarModulo(m.id)} className={PILULA}>
              {m.nome}
            </button>
          ))}
        </div>
        {completo && (
          <dl className="mt-4 divide-y divide-border border-y border-border">
            {modulosDoMontador.map((m) => (
              <div key={m.id} className={`py-3 transition-colors duration-300 ${moduloIds.includes(m.id) ? "text-foreground" : "text-muted-foreground"}`}>
                <dt className="flex items-baseline justify-between gap-4 text-nota font-semibold">
                  {m.nome}
                  <span className="font-normal tabular-nums">
                    + {reais(m.criacao)} e {reais(m.mensal ?? 0)} por mês
                  </span>
                </dt>
                <dd className="mt-0.5 text-nota">{m.descricao}</dd>
              </div>
            ))}
            {paginaAdicional && (
              <div className="py-3 text-muted-foreground">
                <dt className="flex items-baseline justify-between gap-4 text-nota font-semibold">
                  {completo.textos.paginaAdicional}
                  <span className="font-normal tabular-nums">{reais(paginaAdicional.criacao)} por página</span>
                </dt>
                <dd className="mt-0.5 text-nota">{paginaAdicional.descricao} Sem recorrência, fora desta soma.</dd>
              </div>
            )}
          </dl>
        )}
      </div>
    </>
  );

  const acao = (
    <>
      <Button variant="secondary" className="w-full" onClick={() => setMensagem(mensagemDeOrcamento({ plano: plano.nome, modulos: escolhidos.map((m) => m.nome), criacao, mensal }))}>
        Preparar mensagem
      </Button>

      <div aria-live="polite">
        {mensagem && (
          // scroll-mt: trazida à vista, a prévia não para sob o cabeçalho fixo (72 px).
          <div ref={previa} className={`${CAIXA} mt-4 scroll-mt-28 scroll-mb-6 border border-border bg-background`}>
            <p className={`${CAPITULAR} mb-2`}>Mensagem</p>
            <p className="text-nota">{mensagem}</p>
            {/* No celular, os dois na largura toda, um sobre o outro; a partir de 640 px, lado a lado. */}
            <div className="mt-4 grid gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
              <a href={linkWhatsApp(mensagem)} target="_blank" rel="noopener" className={buttonVariants()}>
                <IconeWhatsApp className="size-4.5" />
                Enviar no WhatsApp
              </a>
              {/* Spell UI, Copy Button (desde 03/10): confirma só se a cópia deu certo. */}
              <CopyButton valor={mensagem} className={buttonVariants({ variant: "outline" })} />
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-rotulo text-muted-foreground">{privacidade}</p>
    </>
  );

  // Lado a lado a partir de 400 px; abaixo, um sobre o outro: em Archivo Black (05/10), "R$ 3.100" passava da caixa até 375 px.
  const totais = (
    <dl className="my-6 grid gap-3 min-[25rem]:grid-cols-2">
      <Total rotulo="Criação" valor={criacao} />
      <Total rotulo="Por mês" valor={mensal} />
    </dl>
  );

  // A sombra de 60 px saiu em 03/10 pela regra 3 das Diretrizes de Design Premium e voltou no mesmo dia,
  // a pedido do usuário: é parte da identidade do site.
  const painel = "rounded-[2rem] border border-border bg-card px-6 py-8 shadow-[0_24px_60px_rgb(15_42_71/0.1)] sm:px-8";

  if (!completo) {
    return (
      <div className={painel}>
        {escolhas}
        {totais}
        {acao}
      </div>
    );
  }

  const { textos } = completo;
  return (
    <div className={`${painel} grid gap-10 lg:grid-cols-2 lg:gap-14 lg:p-10`}>
      <div>{escolhas}</div>
      <div>
        <p className={CAPITULAR}>{textos.resumo}</p>
        <dl className="mt-2 divide-y divide-border border-y border-border">
          <Linha rotulo={`Plano ${plano.nome}`} valor={reais(plano.criacao)} detalhe={` e ${reais(plano.mensal)} por mês`} forte />
          {escolhidos.map((m) => (
            <Linha key={m.id} rotulo={m.nome} valor={reais(m.criacao)} detalhe={` e ${reais(m.mensal ?? 0)} por mês`} />
          ))}
        </dl>
        {totais}
        <p className={CAPITULAR}>{textos.pagamento}</p>
        <dl className="mt-2 divide-y divide-border border-y border-border">
          <Linha rotulo={textos.noBriefing} valor={reais(criacao / 2)} />
          <Linha rotulo={textos.naPublicacao} valor={reais(criacao / 2)} />
        </dl>
        <p className="mt-3 text-nota text-muted-foreground">
          {textos.inicioDaMensalidade} {textos.mensalidadeCompreende}
        </p>
        <div className={`${CAIXA} my-6 border border-primary/45`}>
          <p className="text-rotulo font-semibold text-accent">{textos.fundacao.rotulo}</p>
          <p className="mt-1 text-nota">{textos.fundacao.texto}</p>
          {/* O vínculo com seta do site (.vd-vinculo): no hover, o sublinhado aparece e a seta avança (até 03/10, não respondia). */}
          <Link href={textos.fundacao.destino} className="vd-vinculo mt-2 min-h-11 gap-1.5 text-nota font-semibold">
            Ver a condição
            <IconeSeta className="size-3.5" />
          </Link>
        </div>
        {acao}
      </div>
    </div>
  );
}

/** Na tabela completa, sob as pílulas: o preço do plano escolhido, o que ele inclui e o site feito nele. */
function DetalheDoPlano({
  plano,
  textos,
  site,
}: {
  plano: (typeof planos)[number];
  textos: TextosDaTabelaCompleta;
  site?: { nome: string; caminho: string };
}) {
  return (
    <div className={`${CAIXA} mt-4 bg-background`}>
      <p className="text-nota tabular-nums">
        <span className="font-semibold">{reais(plano.criacao)}</span>
        <span className="text-muted-foreground"> de criação, e {reais(plano.mensal)} por mês</span>
      </p>
      <p className={`${CAPITULAR} mt-4`}>{textos.inclui}</p>
      <ul className="mt-2 space-y-2">
        {plano.itens.map((item) => (
          <li key={item} className="flex gap-2.5 text-nota">
            {/* mt-1: o visto de 14 px no meio da primeira linha (21 px), como no simulador. */}
            <IconeVisto className="mt-1 size-3.5 flex-none text-accent" />
            {item}
          </li>
        ))}
      </ul>
      {site && (
        // Vínculo comum, não <Link>: o site de exemplo é outro site, e a pré-busca traria as fontes dele.
        // O vínculo com seta (.vd-vinculo), na cor do texto: no hover, o sublinhado e a seta que avança.
        <a href={site.caminho} target="_blank" rel="noopener" className="vd-vinculo mt-4 min-h-11 gap-1.5 text-nota text-foreground">
          <span className="text-muted-foreground">{textos.siteDoPlano}:</span>
          <span className="font-semibold">{site.nome}</span>
          <IconeSeta className="size-3.5 text-accent" />
        </a>
      )}
    </div>
  );
}
