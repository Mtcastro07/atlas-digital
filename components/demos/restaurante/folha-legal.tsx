import { legal, type TextoLegal } from "@/conteudo/demos/restaurante";

/**
 * As páginas legais (o aviso de privacidade, a declaração de acessibilidade): sóbrias e bem feitas, sem o mundo do
 * salão, que fica nos componentes que o visitante lembra (19-o-padrao-atlas.md, seção 3, "não force"). O texto vem de
 * conteudo/demos/restaurante.ts.
 */
export function FolhaLegal({ titulo, texto }: { titulo: string; texto: TextoLegal }) {
  return (
    <article aria-labelledby="titulo" className="rs-largura rs-folha-legal">
      <h1 id="titulo" className="rs-titulo-de-pagina">
        {titulo}
      </h1>
      <div className="rs-folha-legal-abertura">
        {texto.abertura.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      {texto.blocos.map((b) => (
        <section key={b.titulo} className="rs-folha-legal-bloco">
          <h2>{b.titulo}</h2>
          {b.paragrafos?.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {b.itens && (
            <ul>
              {b.itens.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
      <p className="rs-folha-legal-data">{legal.data(texto.data)}</p>
    </article>
  );
}
