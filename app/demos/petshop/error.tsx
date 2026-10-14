"use client";

import Link from "next/link";

import "./legal.css";

// O erro dentro do cartão (a tira e a linha de baixo ficam): a página não abriu, com "Tentar de novo" e o vínculo para o
// Início. Componente de cliente (o Next exige): os textos ficam aqui, sem importar o conteúdo do site para o script.

export default function Erro({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section aria-labelledby="titulo" className="bt-cena bt-cartolina bt-abaixo-da-tira bt-nao-encontrada">
      <div className="bt-largura" style={{ paddingBlock: "6rem 8rem" }}>
        <h1 id="titulo" className="bt-titulo" style={{ maxWidth: "16ch" }}>
          Esta página não abriu.
        </h1>
        <p className="bt-destaque" style={{ marginTop: "2rem", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <button type="button" onClick={reset} className="bt-vinculo" style={{ background: "none", border: 0, padding: 0, font: "inherit", cursor: "pointer" }}>
            Tentar de novo
          </button>
          <Link href="/demos/petshop" className="bt-vinculo">
            Voltar ao início
          </Link>
        </p>
      </div>
    </section>
  );
}
