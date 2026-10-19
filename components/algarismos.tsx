/**
 * Um número que muda na tela, em Archivo Black (17/10, "o Atlas Digital": a hora e o prazo que correm). O Archivo
 * Black não tem algarismos tabulares (`tnum`): cada algarismo vai numa caixa de largura fixa, e o número não dança
 * quando o algarismo troca. Os outros caracteres (a barra, os dois-pontos, as letras) ficam na largura deles. Num
 * arquivo próprio, e não em tipografia.tsx: as ilhas o importam, e o `cn` de lá levaria o tailwind-merge ao navegador.
 * O leitor de tela ouve o número inteiro, no texto escondido; as caixas são só desenho (desde 17/10: até então, a
 * árvore de acessibilidade quebrava o número caixa a caixa, "1 7 / 1 0", o fechamento com o Impeccable, B, P2).
 */
export function Algarismos({ texto }: { texto: string }) {
  return (
    <>
      <span className="sr-only">{texto}</span>
      <span aria-hidden="true">
        {[...texto].map((c, i) =>
          /\d/.test(c) ? (
            <span key={i} className="inline-block w-[0.66em] text-center">
              {c}
            </span>
          ) : (
            c
          ),
        )}
      </span>
    </>
  );
}
