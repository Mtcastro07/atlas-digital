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

/** O número da medida dentro da frase do colofão (lib/colofao.ts: "Ao rolar, 99,4 de cada 100 quadros …"). */
const MEDIDA = /(\S+)(?= de cada 100 quadros)/;

/**
 * O colofão da página aberta (D13): as sete frases vêm prontas do servidor (lib/colofao.ts, que lê o relatório da régua
 * no build); aqui só se escolhe a da página. O número da medida, quando há, vai em destaque, com "100 quadros" preso.
 */
export function Colofao({ frases, className }: { frases: Record<string, string>; className?: string }) {
  const caminho = usePathname();
  const [antes, numero, depois] = (frases[caminho] ?? frases["/"]).split(MEDIDA);
  return (
    <p className={className}>
      {antes}
      {numero && (
        <>
          <span className="cm-colofao-numero">{numero}</span>
          {depois.replace("100 quadros", "100\u00a0quadros")}
        </>
      )}
    </p>
  );
}
