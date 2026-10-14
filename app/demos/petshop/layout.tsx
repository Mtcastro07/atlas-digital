import type { Viewport } from "next";
import { ViewTransition } from "react";

import { textoDoCartao, tituloDoCartao } from "@/components/demos/petshop/fontes";
import { Carimbo, Telefone, horarioEmLinha } from "@/components/demos/petshop/pecas";
import { Rodape } from "@/components/demos/petshop/rodape";
import { BalcaoVivo } from "@/components/ilhas/demos/petshop/balcao";
import { TiraDoCartao } from "@/components/ilhas/demos/petshop/tira";
import { paginas, petshopSite as site, rodape, tira } from "@/conteudo/demos/petshop";

import "./petshop.css";

// O Banho e Tosa São Francisco, site de banho e tosa do plano Essencial no simulador (desde 13.10.2026; identidade "O
// cartão do balcão", registros/demos/pet-shop/identidade.md). O layout guarda o que atravessa as páginas: a tira de
// cima do cartão (o cabeçalho, com a pausa e o carimbo miúdo), a linha de baixo (o rodapé) e a ilha do balcão (a
// revelação das cenas, a régua de leitura, o verniz e a inclinação, a entrada uma vez por visita). Sem estado ao vivo
// (o Essencial): nada se refaz no servidor.

export const viewport: Viewport = { themeColor: "#f9e151" };

export default function LayoutDoCartao({ children }: { children: React.ReactNode }) {
  const naTira = paginas.filter((p) => !p.legal).map(({ id, caminho, rotulo }) => ({ id, caminho, rotulo }));
  // O menu do celular (o índice do cartão): as páginas, o carimbo da casa e, embaixo, o horário e o telefone.
  const menu = {
    abrir: tira.menu,
    fechar: tira.fechar,
    acao: <Carimbo />,
    pe: (
      <p className="bt-nota bt-menu-pe">
        {horarioEmLinha()}. {rodape.telefone} <Telefone />.
      </p>
    ),
  };
  return (
    <div data-demo="petshop" className={`${tituloDoCartao.variable} ${textoDoCartao.variable}`}>
      {/* A tira tem nome de transição próprio e fica parada na troca de página (petshop.css). */}
      <ViewTransition name="bt-tira" share="bt-tira-parada" default="bt-tira-parada">
        <TiraDoCartao nome={site.nome} inicio={site.caminho} paginas={naTira} rotuloDasPaginas={tira.navegacao} pausa={tira.pausa} menu={menu}>
          <Carimbo miudo />
        </TiraDoCartao>
      </ViewTransition>
      <main id="conteudo" tabIndex={-1} className="bt-conteudo">
        {children}
      </main>
      <Rodape />
      <BalcaoVivo />
    </div>
  );
}
