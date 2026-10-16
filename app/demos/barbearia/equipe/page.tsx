import { EspelhosDaEquipe } from "@/components/demos/barbearia/cadeiras";
import { envelope, metadadosDe, TituloQueSeCompoe } from "@/components/demos/barbearia/pecas";
import { barbeariaSite as site } from "@/conteudo/demos/barbearia";

export const metadata = metadadosDe("equipe");

/**
 * 03 · Equipe: as três cadeiras numa cena só. Desde a correção de 14/10 (o
 * crítico de fora: três telas iguais, uma por pessoa, cada uma com uma frase
 * e a ficha 3D repetindo as iniciais do cartão), a abertura traz o título e,
 * logo abaixo, os três espelhos lado a lado, como estão na casa (no celular,
 * um embaixo do outro, com o espelho pequeno ao lado da plaqueta), sem ficha
 * em cena. O momento é o estado ao vivo: o espelho de quem atende agora
 * acende (EspelhosDaEquipe); com a casa fechada (desde 16/10), a linha do
 * estado diz quando ela abre, e o espelho de quem atende então fica a
 * meia-luz.
 */
export default function PaginaDaEquipe() {
  const { equipe } = site;
  return (
    <section aria-labelledby="titulo" className="pt-36 pb-28 lg:pt-44 lg:pb-36">
      <div className={envelope}>
        <div className="lg:max-w-[64%]">
          <TituloQueSeCompoe id="titulo" linhas={equipe.titulo} className="text-[clamp(52px,6.8vw,116px)] leading-[0.9]" />
          <p className="mt-8 max-w-[46ch] text-[18px] leading-relaxed text-muted-foreground">{equipe.lide}</p>
        </div>
        {/* A linha do estado, sob o texto de abertura, e os espelhos (desde 16/10, a linha diz por que nenhum acende). */}
        <div className="mt-4">
          <EspelhosDaEquipe pessoas={equipe.pessoas} expediente={site.expediente} agora={equipe.agora} depois={equipe.depois} />
        </div>
      </div>
    </section>
  );
}
