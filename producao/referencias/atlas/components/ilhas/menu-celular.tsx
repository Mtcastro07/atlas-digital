"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { IconeMenu } from "@/components/icones";
import { BarsSpinner } from "@/components/ui/spell/bars-spinner";

type Item = { id: string; rotulo: string; caminho: string };

// O painel (Sheet do shadcn, sobre o Dialog do Base UI) não entra no
// script inicial. O código começa a carregar no primeiro sinal de
// intenção — ponteiro sobre o gatilho, toque começando, foco —, uns
// 100 ms antes do clique, e o painel monta no clique. Pré-carregar com o
// navegador ocioso executava o módulo inteiro (tarefa de 160 ms com CPU
// 20×) mesmo para quem nunca abre o menu.
// O estado de carregamento (regra 4 das diretrizes) fica no gatilho: se o
// código ainda não chegou no toque (rede lenta), o gatilho espera à vista
// (aria-busy, com as barras de espera no lugar do ícone) e o painel abre
// quando ele chega. Um esqueleto do painel, no lugar, seria trocado pelo
// painel de verdade com a entrada dele (desce do topo e se acende), e a
// abertura se repetiria. Se o código não chegar, o toque faz o que faz sem
// script: leva ao índice do rodapé. Até 03/10, o toque ficava sem resposta.
let painelPronto = false;
const importarPainel = () =>
  import("@/components/ilhas/painel-menu").then((modulo) => {
    painelPronto = true;
    return modulo;
  });
const preCarregar = () => void importarPainel().catch(() => undefined);
const PainelMenu = dynamic(importarPainel, { ssr: false });

/**
 * Gatilho do menu no celular. É um vínculo para o índice do rodapé
 * (#indice), não um botão: sem script, ou antes de ele chegar num
 * aparelho lento, o toque leva ao índice; com script, abre o painel.
 */
export function MenuCelular({ itens, marca }: { itens: Item[]; marca?: React.ReactNode }) {
  const [aberto, setAberto] = useState(false);
  const [montado, setMontado] = useState(false);
  const [esperando, setEsperando] = useState(false);

  const abrir = () => {
    setMontado(true);
    setAberto(true);
  };

  return (
    <>
      <a
        href="#indice"
        aria-haspopup="dialog"
        aria-expanded={aberto}
        aria-busy={esperando || undefined}
        onPointerEnter={preCarregar}
        onPointerDown={preCarregar}
        onFocus={preCarregar}
        onClick={(evento) => {
          evento.preventDefault();
          if (painelPronto) return abrir();
          setEsperando(true);
          importarPainel().then(
            () => {
              setEsperando(false);
              abrir();
            },
            () => {
              setEsperando(false);
              window.location.hash = "indice";
            }
          );
        }}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-nota font-semibold text-foreground no-underline transition-colors duration-300 hover:bg-foreground/10 lg:hidden"
      >
        Menu
        {/* Esperando o painel: as barras do Spell UI no lugar do ícone (03/10). */}
        {esperando ? <BarsSpinner tamanho={18} className="mx-px" /> : <IconeMenu className="size-5" />}
      </a>
      {montado && <PainelMenu aberto={aberto} aoMudar={setAberto} itens={itens} marca={marca} />}
    </>
  );
}
