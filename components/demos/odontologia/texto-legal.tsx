import { legal, type TextoLegal as Texto } from "@/conteudo/demos/odontologia";

/**
 * Uma página legal da Odontologia Boa Viagem (o aviso de privacidade, a declaração de acessibilidade): sóbria, como o
 * verso da ficha. O texto vem de conteudo/demos/odontologia.ts, em blocos com título, e a data no fim.
 */
export function TextoLegal({ titulo, texto }: { titulo: string; texto: Texto }) {
  return (
    <article aria-labelledby="titulo" className="od-largura od-legal">
      <h1 id="titulo" className="od-titulo-de-cena">
        {titulo}
      </h1>
      <div className="od-legal-abertura">
        {texto.abertura.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <div className="od-legal-blocos">
        {texto.blocos.map((b) => (
          <section key={b.titulo}>
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
      </div>
      <p className="od-legal-data">{legal.data(texto.data)}</p>
    </article>
  );
}
