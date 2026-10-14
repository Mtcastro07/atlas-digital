import { SimboloDeAcessibilidade } from "@/components/demos/petshop/simbolos";
import { legal, type TextoLegal as Texto } from "@/conteudo/demos/petshop";

/**
 * Uma página legal do Banho e Tosa São Francisco (o aviso de privacidade, a declaração de acessibilidade): sóbria, na
 * cartolina, sem dispositivo (identidade, seção 4.13). O texto vem de conteudo/demos/petshop.ts, em blocos com título,
 * e a data no fim. `simbolo`: o símbolo de acessibilidade ao lado do h1 (na declaração). O desenho fica em legal.css.
 */
export function TextoLegal({ titulo, texto, simbolo = false }: { titulo: string; texto: Texto; simbolo?: boolean }) {
  return (
    <article aria-labelledby="titulo" className="bt-cena bt-cartolina bt-abaixo-da-tira bt-legal">
      <div className="bt-largura bt-legal-folha">
        <h1 id="titulo" className="bt-titulo bt-legal-titulo">
          {simbolo && <SimboloDeAcessibilidade className="bt-legal-simbolo" />}
          {titulo}
        </h1>
        <div className="bt-destaque bt-legal-abertura">
          {texto.abertura.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="bt-legal-blocos">
          {texto.blocos.map((b) => (
            <section key={b.titulo}>
              <h2 className="bt-subtitulo">{b.titulo}</h2>
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
        <p className="bt-nota bt-legal-data">{legal.data(texto.data)}</p>
      </div>
    </article>
  );
}
