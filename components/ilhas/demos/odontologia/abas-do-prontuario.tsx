"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Monograma } from "@/components/demos/odontologia/pecas";
import { ControleDoMovimento } from "@/components/ilhas/controle-do-movimento";

type Aba = { id: string; caminho: string; rotulo: string };

/**
 * As abas do prontuário (identidade, seção 9): o cabeçalho da Odontologia Boa Viagem, preso no alto de todas as
 * páginas, é a borda da pasta de arquivo. À esquerda, o monograma, o nome e o registro com a responsável técnica (a
 * norma pede em toda página, também no celular: Código de Ética Odontológica, art. 43); as abas das páginas, em que a
 * aberta tem a cor da folha e se emenda com ela (a página filha deixa a mãe aberta: os tratamentos, sob Tratamentos);
 * o interruptor do refletor (a pausa do ambiente) e a peça de cerâmica do pedido de avaliação. De 640 a 1023 px, as
 * abas descem para a faixa de baixo da pasta.
 *
 * No celular (abaixo de 640 px, e deitado; o passe de 14.10.2026), as cinco abas não cabem à vista (a 320 px, a última saía
 * cortada, e a pasta ocupava um terço da tela): a pasta fica numa linha, e as páginas vão para o índice do prontuário,
 * aberto em tela cheia (o vocabulário de interação da identidade: "no celular, o menu abre como o prontuário aberto").
 * É um <dialog> nativo: o foco preso, o Esc, o fundo inerte. O gatilho é a aba "Páginas" da pasta; sem script, ele
 * leva à lista de páginas do pé (#paginas-da-clinica); com script, é um botão (role e barra de espaço).
 *
 * No celular (o fechamento do Impeccable, 16.10.2026), o lugar do interruptor na pasta é da ação "Pedir avaliação" (a
 * ação sumia entre a capa e a chamada, ~7.000 px), e o interruptor vai para o índice, com o nome à vista. Um só
 * interruptor, montado onde a tela pede: dois dariam dois estados de pausa.
 */
export function AbasDoProntuario({
  nome,
  registro,
  responsavel,
  inicio,
  abas,
  rotuloDasAbas,
  acao,
  avaliacao,
  indice,
  fechar,
  pausa,
}: {
  nome: string;
  /** O registro da clínica (CRO-RJ). */
  registro: string;
  /** A responsável técnica, com o registro: na mesa larga (a identificação inteira está no pé de toda página). */
  responsavel: string;
  inicio: string;
  abas: readonly Aba[];
  rotuloDasAbas: string;
  acao: string;
  avaliacao: string;
  /** O gatilho do índice, no celular ("Páginas"), e o fecho dele. */
  indice: string;
  fechar: string;
  /** O nome à vista do interruptor do refletor. */
  pausa: string;
}) {
  const caminho = usePathname();
  const estado = (a: Aba) => (caminho === a.caminho ? "page" : caminho.startsWith(`${a.caminho}/`) ? "true" : undefined);
  const dialogo = useRef<HTMLDialogElement>(null);
  const [aberto, setAberto] = useState(false);
  // Depois da hidratação: o gatilho vira botão, e o interruptor vai para onde a pasta o mostra (a mesma condição do CSS).
  const [pronto, setPronto] = useState(false);
  const [celular, setCelular] = useState(false);
  useEffect(() => {
    const estreita = window.matchMedia("(max-width: 639px), (max-width: 1023px) and (max-height: 30rem)");
    const ler = () => setCelular(estreita.matches);
    ler();
    setPronto(true);
    estreita.addEventListener("change", ler);
    return () => estreita.removeEventListener("change", ler);
  }, []);
  // O índice fecha ao trocar de página e quando a tela passa a ter as abas à vista (a mesma condição do CSS).
  useEffect(() => {
    dialogo.current?.close();
    const largo = window.matchMedia("(min-width: 1024px), (min-width: 640px) and (min-height: 30.01rem)");
    const aoAlargar = () => largo.matches && dialogo.current?.close();
    largo.addEventListener("change", aoAlargar);
    return () => largo.removeEventListener("change", aoAlargar);
  }, [caminho]);
  const fecharIndice = () => dialogo.current?.close();
  const abrirIndice = () => {
    dialogo.current?.showModal();
    setAberto(true);
  };
  // O vínculo para outra página deixa o índice aberto até a página nova chegar (o efeito acima o fecha): sem o
  // relance da página velha no meio. O da página de agora só fecha.
  const fecharSeAqui = (destino: string) => () => {
    if (destino === caminho) fecharIndice();
  };
  return (
    <header className="od-pasta">
      <div className="od-largura od-pasta-miolo">
        <Link href={inicio} aria-current={caminho === inicio ? "page" : undefined} className="od-pasta-nome">
          <Monograma className="od-pasta-monograma" />
          <span>
            <span className="od-pasta-clinica">{nome}</span>
            <span className="od-pasta-registro">
              <span className="whitespace-nowrap">{registro}</span>{" "}
              <span className="od-pasta-responsavel whitespace-nowrap">{responsavel}</span>
            </span>
          </span>
        </Link>
        <nav aria-label={rotuloDasAbas} className="od-abas">
          {abas.map((a) => (
            <Link key={a.id} href={a.caminho} aria-current={estado(a)} className="od-aba">
              {a.rotulo}
            </Link>
          ))}
        </nav>
        <div className="od-pasta-direita">
          {!celular && (
            <span className="od-interruptor" title={pausa}>
              <ControleDoMovimento />
            </span>
          )}
          <Link href={avaliacao} aria-current={caminho === avaliacao ? "page" : undefined} tabIndex={caminho === avaliacao ? -1 : undefined} className="od-ceramica od-ceramica-miuda od-pasta-acao">
            <span>{acao}</span>
          </Link>
          <a
            href="#paginas-da-clinica"
            role={pronto ? "button" : undefined}
            aria-haspopup="dialog"
            aria-expanded={aberto}
            onClick={(e) => {
              if (!dialogo.current?.showModal) return;
              e.preventDefault();
              abrirIndice();
            }}
            onKeyDown={(e) => {
              if (e.key !== " " || !dialogo.current?.showModal) return;
              e.preventDefault();
              abrirIndice();
            }}
            className="od-aba od-indice-gatilho"
          >
            {indice}
          </a>
          <dialog ref={dialogo} aria-label={rotuloDasAbas} className="od-indice" onClose={() => setAberto(false)}>
            <div className="od-largura od-indice-cabeca">
              <Link href={inicio} aria-current={caminho === inicio ? "page" : undefined} onClick={fecharSeAqui(inicio)} className="od-pasta-nome">
                <Monograma className="od-pasta-monograma" />
                <span>
                  <span className="od-pasta-clinica">{nome}</span>
                  <span className="od-pasta-registro">{registro}</span>
                </span>
              </Link>
              <button type="button" onClick={fecharIndice} className="od-aba od-indice-fechar">
                {fechar}
              </button>
            </div>
            {/* A folha do prontuário aberto: as abas das páginas, uma por linha, em exibição; a aberta, riscada a lápis. */}
            <nav aria-label={rotuloDasAbas} className="od-largura od-indice-folha">
              <ul className="od-indice-abas">
                {abas.map((a, i) => (
                  <li key={a.id} style={{ "--i": i } as React.CSSProperties}>
                    <Link href={a.caminho} aria-current={estado(a)} onClick={fecharSeAqui(a.caminho)} className="od-indice-aba">
                      <span>{a.rotulo}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {celular && (
                <p className="od-indice-pausa">
                  <span aria-hidden="true">{pausa}</span>
                  <span className="od-interruptor">
                    <ControleDoMovimento />
                  </span>
                </p>
              )}
              <Link href={avaliacao} aria-current={caminho === avaliacao ? "page" : undefined} onClick={fecharSeAqui(avaliacao)} className="od-ceramica od-ceramica-grande od-indice-acao">
                <span>{acao}</span>
              </Link>
              {/* O registro da responsável (o que vem depois da última vírgula) sem quebra: o hífen de "CRO-RJ" partia a linha. */}
              <p className="od-indice-registro">
                <span className="whitespace-nowrap">{registro}</span> {responsavel.slice(0, responsavel.lastIndexOf(", ") + 2)}
                <span className="whitespace-nowrap">{responsavel.slice(responsavel.lastIndexOf(", ") + 2)}</span>
              </p>
            </nav>
          </dialog>
        </div>
      </div>
    </header>
  );
}
