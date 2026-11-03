"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { id: string; rotulo: string; caminho: string };

/**
 * O índice do rodapé com a página aberta marcada (R10, 28/10): o peso 700, o traço de bronze à esquerda e
 * aria-current (app/comuns.css). O rodapé fica no layout e não sabe o caminho no servidor: a marca sai daqui, como a
 * do menu do cabeçalho (ilhas/navegacao-do-atlas.tsx). No início, que não está na lista (é o vínculo do logotipo),
 * nenhuma linha é marcada.
 */
export function IndiceDoRodape({ itens }: { itens: Item[] }) {
  const caminho = usePathname();
  return (
    <ul>
      {itens.map((item) => (
        <li key={item.id}>
          <Link
            href={item.caminho}
            aria-current={caminho === item.caminho ? "page" : undefined}
            className="cm-indice-vinculo vd-acende"
          >
            <span className="vd-acende-nome">{item.rotulo}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
