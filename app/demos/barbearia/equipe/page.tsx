import { atraso, cena, envelope, metadadosDe, Monograma, recuoDoVidro, textoEmbaixo, TituloQueSeCompoe } from "@/components/demos/barbearia/pecas";
import { barbeariaSite as site } from "@/conteudo/demos/barbearia";

export const metadata = metadadosDe("equipe");

/**
 * 03 · Equipe. Três cadeiras, cada pessoa numa tela, com a sua ficha em
 * cena do outro lado — as iniciais no centro, a especialidade em volta —
 * e a moeda pequena do cartão, que gira de perfil para a frente ao passar
 * (CSS 3D).
 */
export default function PaginaDaEquipe() {
  const { equipe } = site;
  return (
    <div className="bb-pagina">
      <section aria-labelledby="titulo" {...cena("cadeiras", "direita")} className={`flex min-h-[100vh] items-center pt-32 pb-16 ${textoEmbaixo}`}>
        <div className={`${envelope} w-full`}>
          <div className="lg:max-w-[58%]">
            <p className="mov-entra bb-rotulo text-accent">03 · Equipe</p>
            <TituloQueSeCompoe id="titulo" linhas={equipe.titulo} className="mt-8 text-[clamp(56px,7.4vw,124px)] leading-[0.9]" />
            <p className="mov-entra mt-8 max-w-[44ch] text-[18px] leading-relaxed text-muted-foreground" style={atraso(800)}>
              {equipe.lide}
            </p>
          </div>
        </div>
      </section>

      {equipe.pessoas.map((p, i) => {
        const lado = i % 2 === 0 ? "esquerda" : "direita";
        return (
          <section key={p.id} aria-labelledby={`pessoa-${p.id}`} {...cena(p.objeto, lado)} className={`flex min-h-[115vh] items-center py-20 ${textoEmbaixo}`}>
            <div className={`${envelope} grid w-full lg:grid-cols-12`}>
              <article
                data-cena
                data-revelar
                style={{ "--p": 1 } as React.CSSProperties}
                className={`bb-vidro flex flex-col gap-8 rounded-[32px] ${recuoDoVidro} lg:col-span-5 ${lado === "esquerda" ? "lg:col-start-8" : ""}`}
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="bb-moeda w-fit">
                    <Monograma texto={p.iniciais} className="size-28" />
                  </div>
                  <p className="bb-rotulo text-right text-muted-foreground">{p.cadeira}</p>
                </div>
                <div>
                  <p className="bb-rotulo text-accent">{p.especialidade}</p>
                  <h2 id={`pessoa-${p.id}`} className="bb-exibicao mt-4 text-[clamp(52px,5.4vw,88px)] leading-[0.92]">
                    {p.nome}
                  </h2>
                  <p className="mt-5 text-[18px] text-muted-foreground">{p.detalhe}</p>
                </div>
              </article>
            </div>
          </section>
        );
      })}
    </div>
  );
}
