import type { Metadata } from "next";

import { Vinculo } from "@/components/demos/petshop/pecas";
import { naoEncontrada, petshopSite as site } from "@/conteudo/demos/petshop";

import "./legal.css";

// A página que não existe, dentro do cartão (a tira e a linha de baixo ficam): "Esta página não está no cartão.", com
// o vínculo para o Início (identidade, seção 4.10, camada 7). Endereços desconhecidos sob /demos/petshop chegam aqui
// pelo [...resto]/page.tsx, que chama notFound().

export const metadata: Metadata = { title: `${naoEncontrada.titulo} · ${site.nome} · demonstração` };

export default function NaoEncontrada() {
  return (
    <section aria-labelledby="titulo" className="bt-cena bt-cartolina bt-abaixo-da-tira bt-nao-encontrada">
      <div className="bt-largura" style={{ paddingBlock: "6rem 8rem" }}>
        <h1 id="titulo" className="bt-titulo" style={{ maxWidth: "16ch" }}>
          {naoEncontrada.titulo}
        </h1>
        <p className="bt-destaque" style={{ marginTop: "1.3125rem" }}>
          {/* Sozinho na linha, sem a exceção do texto corrido: o alvo a 44 px, sem mudar o lugar do texto. */}
          <Vinculo href={site.caminho} className="inline-block py-[0.6875rem]">
            {naoEncontrada.voltar}
          </Vinculo>
        </p>
      </div>
    </section>
  );
}
