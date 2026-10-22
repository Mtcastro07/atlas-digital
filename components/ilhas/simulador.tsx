"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import type { DadosDoSimulador } from "@/components/ilhas/painel-do-simulador";

// O diálogo não entra no script inicial: começa a baixar no primeiro
// sinal de intenção sobre um cartão — ponteiro, foco — e monta no clique,
// como o painel do menu (ilhas/menu-celular.tsx).
// O estado de carregamento (regra 4 das diretrizes) fica no cartão
// clicado: se o código ainda não chegou (rede lenta; no toque, a intenção
// vem só um instante antes), o cartão espera à vista (aria-busy, com as
// barras de espera, .vd-espera) e o diálogo abre quando o código chega, com a
// entrada de sempre. Um esqueleto do diálogo, no lugar, seria trocado pelo
// diálogo de verdade, que entra se acendendo do zero: o fundo escuro
// piscaria na troca. Dentro do diálogo, o esqueleto é o do site, enquanto
// ele abre no quadro (ilhas/painel-do-simulador.tsx). Se o código não
// chegar, o clique faz o que faz sem script: abre o site numa aba nova.
// Até 03/10, o clique ficava sem resposta enquanto o código baixava.
let painelPronto = false;
const importarPainel = () =>
  import("@/components/ilhas/painel-do-simulador").then((modulo) => {
    painelPronto = true;
    return modulo;
  });
const preCarregar = () => void importarPainel().catch(() => undefined);
const PainelDoSimulador = dynamic(importarPainel, { ssr: false });

const cartaoDe = (alvo: EventTarget | null) =>
  (alvo as Element | null)?.closest?.<HTMLAnchorElement>("a[data-simulador]") ?? null;

/** Sinal de intenção (ponteiro ou foco) sobre um cartão: o diálogo começa a baixar. */
function preCarregarNoCartao(evento: React.SyntheticEvent) {
  if (cartaoDe(evento.target)) preCarregar();
}

/**
 * O simulador de planos: o palco da escada, com os três sites, chega
 * desenhado do servidor (secoes/escada.tsx), como `children`; os vínculos
 * a[data-simulador] levam ao site em nova aba — sem script, é o que
 * acontece. Com script, o clique abre o diálogo
 * (ilhas/painel-do-simulador.tsx) com aquele site.
 * Cliques com Ctrl, Cmd, Shift ou botão do meio seguem o navegador.
 */
export function Simulador({ dados, children }: { dados: DadosDoSimulador; children: React.ReactNode }) {
  // A chave remonta o diálogo a cada abertura (um cartão clicado enquanto o anterior ainda sai).
  const [aberto, setAberto] = useState<{ indice: number; chave: number } | null>(null);

  return (
    <div
      onPointerOver={preCarregarNoCartao}
      onFocus={preCarregarNoCartao}
      onClick={(evento) => {
        const cartao = cartaoDe(evento.target);
        if (!cartao || evento.button !== 0 || evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return;
        evento.preventDefault();
        const pedido = { indice: Number(cartao.dataset.simulador), chave: evento.timeStamp };
        if (painelPronto) return setAberto(pedido);
        // Já esperando o código: o segundo clique não pede outra abertura.
        if (cartao.getAttribute("aria-busy") === "true") return;
        cartao.setAttribute("aria-busy", "true");
        importarPainel().then(
          () => {
            cartao.removeAttribute("aria-busy");
            setAberto(pedido);
          },
          () => {
            cartao.removeAttribute("aria-busy");
            window.open(cartao.href, "_blank", "noopener");
          }
        );
      }}
    >
      {children}
      {aberto && (
        <PainelDoSimulador
          key={aberto.chave}
          dados={dados}
          inicial={aberto.indice}
          aoFechar={() => setAberto((atual) => (atual?.chave === aberto.chave ? null : atual))}
        />
      )}
    </div>
  );
}
