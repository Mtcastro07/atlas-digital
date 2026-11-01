// components/texto-legal.tsx — a página de texto legal (aviso de privacidade, acessibilidade), desenhada
// a partir de conteudo/legal.ts: título, abertura, blocos e a data. Componente de servidor.
import type { TextoLegal as Texto } from "@/conteudo/legal";

export function TextoLegal({ texto, rotuloDaData }: { texto: Texto; rotuloDaData: string }) {
  return (
    <main id="conteudo" tabIndex={-1} className="envelope mx-auto max-w-[56ch] pt-14 pb-10 outline-none md:pt-20">
      <h1 className="text-titulo font-semibold">{texto.titulo}</h1>
      <div className="mt-6 grid gap-3">
        {texto.abertura.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      {texto.blocos.map((b) => (
        <section key={b.titulo} className="mt-10">
          <h2 className="text-destaque font-semibold">{b.titulo}</h2>
          {b.paragrafos?.map((p) => (
            <p key={p} className="mt-3">
              {p}
            </p>
          ))}
          {b.itens && (
            <ul className="mt-3 grid list-disc gap-2 pl-5">
              {b.itens.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
      <p className="mt-10 text-nota text-muted-foreground tabular">
        {rotuloDaData}: {texto.data}.
      </p>
    </main>
  );
}
