"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

import { IconeWhatsApp } from "@/components/icones";
import { CopyButton } from "@/components/ui/spell/copy-button";
import { mensagemDoPedido, real, resumirPedido, vinculoDoWhatsapp, type Entrega, type Rotulos } from "@/lib/demos/restaurante/pedido";

type Item = { id: string; nome: string; porcao: string; preco: number; detalhe: string };
type Grupo = { id: string; nome: string; itens: readonly Item[] };
type Bairro = { id: string; nome: string; frete: number; tempo: string };

export type TextosDoMontador = {
  oPedido: string;
  /** O nome da casa, no alto da comanda. */
  casa: string;
  vazio: string;
  entrega: string;
  retirada: string;
  entregaNo: string;
  bairro: string;
  pagamento: string;
  observacao: string;
  subtotal: string;
  frete: string;
  total: string;
  semFrete: string;
  enviar: string;
  copiar: string;
  /** A tira da comanda, no celular. */
  tira: { item: string; itens: string; conferir: string };
  novaAba: string;
  /** Com {nome}: "Mais um: Bife acebolado". */
  mais: string;
  menos: string;
  quantidade: string;
  /** Com {falta}. */
  abaixoDoMinimo: string;
  mensagem: Omit<Rotulos, "entrega"> & { entrega: string };
};

/**
 * O montador de pedido da Cozinha do Ingá: a funcionalidade 1 do Profissional (producao/esteira/nichos/restaurante.md,
 * seção 5.1). Os pratos e a quantidade de cada um; a entrega (o bairro, com o frete discriminado) ou a retirada; o total
 * antes do envio; a mensagem pronta para o WhatsApp e o copiar (o gesto do Spell UI no ponto de decisão). Sem item, ou
 * abaixo do mínimo da entrega, o envio fica desabilitado, com o motivo escrito. Nada é registrado: as contas são as
 * funções puras de lib/demos/restaurante/pedido.ts, e a mensagem sai do aparelho. Sem script, a página mostra o
 * cardápio com os preços e o pedido por mensagem (app/demos/restaurante/pedido/page.tsx). Recebe só o que usa.
 *
 * No celular (o passe de 14.10.2026), a comanda fica no fim da lista, cinco telas abaixo do primeiro prato: a tira
 * dela, presa embaixo, aparece com o primeiro item, diz quantos itens e o total (que assenta a cada mudança, como na
 * comanda) e leva até ela; some quando a comanda entra na tela ou fica para trás.
 */
export function Montador({
  numero,
  grupos,
  bairros,
  minimo,
  pagamentos,
  textos,
}: {
  numero: string;
  grupos: readonly Grupo[];
  bairros: readonly Bairro[];
  minimo: number;
  pagamentos: readonly string[];
  textos: TextosDoMontador;
}) {
  const id = useId();
  const [escolha, setEscolha] = useState<Record<string, number>>({});
  const [tipo, setTipo] = useState<"entrega" | "retirada">("entrega");
  const [bairro, setBairro] = useState(bairros[0].id);
  const [pagamento, setPagamento] = useState(pagamentos[0]);
  const [observacao, setObservacao] = useState("");

  const itens = useMemo(() => grupos.flatMap((g) => g.itens), [grupos]);
  const doBairro = bairros.find((b) => b.id === bairro) ?? bairros[0];
  const entrega: Entrega = tipo === "retirada" ? { tipo: "retirada" } : { tipo: "entrega", bairro: doBairro.nome, frete: doBairro.frete };
  const resumo = resumirPedido(itens, escolha, entrega, minimo);
  const rotulos: Rotulos = { ...textos.mensagem, entrega: (b) => textos.mensagem.entrega.replace("{bairro}", b) };
  const mensagem = mensagemDoPedido(resumo, entrega, rotulos, { pagamento, observacao });
  const mudar = (item: string, delta: number) => setEscolha((e) => ({ ...e, [item]: Math.max(0, Math.min(20, (e[item] ?? 0) + delta)) }));
  const quantos = resumo.linhas.reduce((n, l) => n + l.quantidade, 0);

  // A tira só aparece enquanto a comanda está abaixo da tela.
  const comanda = useRef<HTMLElement>(null);
  const [comandaAbaixo, setComandaAbaixo] = useState(true);
  useEffect(() => {
    const vigia = new IntersectionObserver(([e]) => setComandaAbaixo(!e.isIntersecting && e.boundingClientRect.top > 0), { threshold: 0.12 });
    if (comanda.current) vigia.observe(comanda.current);
    return () => vigia.disconnect();
  }, []);

  return (
    <div className="rs-montador">
      <div className="rs-montador-folha">
        {grupos.map((g) => (
          <section key={g.id} aria-labelledby={`${id}-${g.id}`} className="rs-montador-grupo">
            <h2 id={`${id}-${g.id}`}>{g.nome}</h2>
            <ul>
              {g.itens.map((i) => {
                const q = escolha[i.id] ?? 0;
                return (
                  <li key={i.id} className="rs-montador-item" data-escolhido={q > 0 || undefined}>
                    <div className="min-w-0">
                      <div className="rs-prato-linha">
                        <h3 className="rs-prato-nome">{i.nome}</h3>
                        <span aria-hidden="true" className="rs-prato-pontos" />
                        <span className="rs-prato-preco">{real(i.preco)}</span>
                      </div>
                      <p className="rs-prato-detalhe">{i.detalhe}</p>
                    </div>
                    <div className="rs-contador" role="group" aria-label={textos.quantidade.replace("{nome}", i.nome)}>
                      <button type="button" onClick={() => mudar(i.id, -1)} disabled={q === 0} aria-label={textos.menos.replace("{nome}", i.nome)}>
                        <span aria-hidden="true">−</span>
                      </button>
                      <output aria-live="polite">{q}</output>
                      <button type="button" onClick={() => mudar(i.id, 1)} aria-label={textos.mais.replace("{nome}", i.nome)}>
                        <span aria-hidden="true">+</span>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {/* A comanda: o pedido, a entrega, o total e o envio, na folha de cima do bloco de comandas (a cola no alto, as
          folhas de baixo à vista), por cima da borda do cardápio. */}
      <aside ref={comanda} id="comanda-do-pedido" data-cena="comanda-do-pedido" aria-labelledby={`${id}-comanda`} className="rs-bloco">
        <div className="rs-comanda">
          <div className="rs-comanda-cabeca">
            <h2 id={`${id}-comanda`} className="rs-comanda-titulo">
              {textos.oPedido}
            </h2>
            <p className="rs-comanda-casa">{textos.casa}</p>
          </div>
          {resumo.vazio ? (
            <p className="rs-comanda-vazio">{textos.vazio}</p>
          ) : (
            <ul className="rs-comanda-linhas">
              {resumo.linhas.map((l) => (
                <li key={l.id}>
                  <span>
                    {l.quantidade} × {l.nome}
                  </span>
                  <span>{real(l.valor)}</span>
                </li>
              ))}
            </ul>
          )}

          <fieldset className="mt-6">
            <legend className="rs-comanda-rotulo">{textos.entrega}</legend>
            <div className="rs-escolhas">
              {(["entrega", "retirada"] as const).map((t) => (
                <label key={t}>
                  <input type="radio" name={`${id}-tipo`} value={t} checked={tipo === t} onChange={() => setTipo(t)} />
                  <span>{t === "entrega" ? textos.entregaNo : textos.retirada}</span>
                </label>
              ))}
            </div>
            {tipo === "entrega" && (
              <label className="mt-3 grid gap-1.5">
                <span className="rs-comanda-rotulo">{textos.bairro}</span>
                <select value={bairro} onChange={(e) => setBairro(e.target.value)} className="rs-campo">
                  {bairros.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.nome}: {real(b.frete)}, {b.tempo}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </fieldset>

          <label className="mt-4 grid gap-1.5">
            <span className="rs-comanda-rotulo">{textos.pagamento}</span>
            <select value={pagamento} onChange={(e) => setPagamento(e.target.value)} className="rs-campo">
              {pagamentos.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
          <label className="mt-4 grid gap-1.5">
            <span className="rs-comanda-rotulo">{textos.observacao}</span>
            <textarea value={observacao} onChange={(e) => setObservacao(e.target.value)} rows={2} maxLength={200} className="rs-campo" />
          </label>

          <dl className="rs-contas">
            <div>
              <dt>{textos.subtotal}</dt>
              <dd>{real(resumo.subtotal)}</dd>
            </div>
            <div>
              <dt>{textos.frete}</dt>
              <dd>{tipo === "retirada" ? textos.semFrete : real(resumo.frete)}</dd>
            </div>
            <div className="rs-contas-total">
              <dt>{textos.total}</dt>
              {/* A resposta à ação: o total que muda assenta de novo (a chave remonta o número; restaurante.css). */}
              <dd aria-live="polite">
                <span key={resumo.total} className="rs-total-tique">
                  {real(resumo.total)}
                </span>
              </dd>
            </div>
          </dl>
          {resumo.falta > 0 && <p className="rs-aviso-do-minimo">{textos.abaixoDoMinimo.replace("{falta}", real(resumo.falta))}</p>}

          <div className="mt-6 grid gap-3">
            {resumo.enviavel ? (
              <a href={vinculoDoWhatsapp(numero, mensagem)} target="_blank" rel="noopener noreferrer" className="rs-agata w-full">
                <IconeWhatsApp className="size-5 flex-none" />
                {textos.enviar}
                <span className="sr-only">{textos.novaAba}</span>
              </a>
            ) : (
              <span role="link" aria-disabled="true" className="rs-agata w-full">
                <IconeWhatsApp className="size-5 flex-none" />
                {textos.enviar}
              </span>
            )}
            {!resumo.vazio && <CopyButton valor={mensagem} rotulo={textos.copiar} className="rs-agata rs-agata-contorno w-full" />}
          </div>
        </div>
      </aside>

      <a href="#comanda-do-pedido" className="rs-tira-da-comanda" data-visivel={(!resumo.vazio && comandaAbaixo) || undefined} tabIndex={!resumo.vazio && comandaAbaixo ? undefined : -1} aria-hidden={!resumo.vazio && comandaAbaixo ? undefined : true}>
        <span className="rs-tira-conta">
          <span className="rs-tira-titulo">{textos.oPedido}</span>
          <span>
            {quantos} {quantos === 1 ? textos.tira.item : textos.tira.itens},{" "}
            <span key={resumo.total} className="rs-total-tique">
              {real(resumo.total)}
            </span>
          </span>
        </span>
        <span className="rs-tira-conferir">{textos.tira.conferir}</span>
      </a>
    </div>
  );
}
