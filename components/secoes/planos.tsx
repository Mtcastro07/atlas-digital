import Link from "next/link";

import { Abertura, Envelope, Secao } from "@/components/estrutura";
import { IconeSeta, IconeVisto } from "@/components/icones";
import { Apoio } from "@/components/tipografia";
import { buttonVariants } from "@/components/ui/button";
import { modulos, planos, precoDoModulo } from "@/conteudo/planos";
import { acaoOrcamento, planosSecao, simulador } from "@/conteudo/site";
import { reais } from "@/lib/moeda";
import { cn } from "@/lib/utils";

/**
 * Os planos lado a lado, o recomendado em navy. "Escolher" leva ao
 * montador com o plano já marcado (/orcamento#orcamento-<id>; ver Montador).
 * Os módulos seguem num bloco único, em linhas. O cartão fica quieto: a
 * resposta mora na prévia (a tela sobe 4 px e o nome passa a bronze; no
 * toque, o nome, em 120 ms) e no botão. Só o "Escolher" do recomendado
 * (plano.destaque, hoje o Profissional) leva a faixa de luz (.vd-brilho); o selo "Recomendado" fica
 * parado. Até 14/10, os três cartões subiam com a aresta acesa e o orbe sob
 * o cursor, as letras dos três "Escolher" rolavam e o brilho passava no
 * selo a cada 3 s (pedido do usuário, 14/10: "parecendo que você está
 * spamando os mesmos componentes"). No alto de cada plano, o site feito nele —
 * a prévia de um dos três sites de demonstração, no tom do próprio site,
 * com o lugar que pulsa enquanto a imagem não chega (vd-esqueleto) —, que
 * abre o site em nova aba: o preço ao lado do que ele compra. A sombra da
 * prévia saiu em 03/10 pela regra 3 das Diretrizes de Design Premium e
 * voltou no mesmo dia, a pedido do usuário: é parte da identidade do
 * site. Cartões com o padrão de 32/40 px por dentro (até
 * 03/10, 28/32 px nos planos).
 */
export function Planos() {
  return (
    <Secao id="planos" tom="branco">
      <Envelope>
        <Abertura titulo={planosSecao.titulo} lide={planosSecao.lide} />

        {/* Até 1024 px, galeria de deslizar (vidro.css, .vd-galeria-lg): um plano por vez, o seguinte pela borda. */}
        <div className="vd-galeria-quadro vd-galeria-lg mt-16 md:mt-20" style={{ "--galeria-polegar": 1 / planos.length } as React.CSSProperties}>
          <div className="vd-galeria gap-5 lg:grid lg:grid-cols-3 lg:gap-6">
            {planos.map((plano) => {
              const site = simulador.sites.find((s) => s.plano === plano.id);
              return (
                <article
                  key={plano.id}
                  // O destino de cada degrau da escada de preços, na abertura.
                  id={`plano-${plano.id}`}
                  data-tom={plano.destaque ? "escuro" : undefined}
                  className={cn(
                    "vd-aresta relative flex flex-col rounded-xl p-8 md:p-10",
                    plano.destaque ? "bg-background" : "bg-card",
                  )}
                >
                  {site && (
                    <a href={site.caminho} target="_blank" rel="noopener" className="group/previa mb-7 block no-underline">
                      <span data-tom={site.tom} className="vd-previa relative block aspect-[16/8] overflow-hidden rounded-lg border border-border">
                        {/* 360 px na tela comum (a imagem mede até 216 px no cartão), 720 px na densa. */}
                        <img
                          src={`/simulador/${site.id}-computador-360.webp`}
                          srcSet={`/simulador/${site.id}-computador-360.webp 360w, /simulador/${site.id}-computador.webp 720w`}
                          sizes="(min-width: 1024px) 216px, 86vw"
                          alt=""
                          width={720}
                          height={450}
                          loading="lazy"
                          decoding="async"
                          className="vd-esqueleto absolute top-[14%] left-[7%] w-[86%] rounded-t-md shadow-[0_18px_40px_-20px_rgb(0_0_0/0.7)] ring-1 ring-foreground/10 transition-transform duration-500 ease-atlas group-hover/previa:-translate-y-1"
                        />
                      </span>
                      <span className="mt-3 flex min-h-11 items-center justify-between gap-3">
                        <span className="flex flex-col">
                          <span className="text-rotulo text-muted-foreground">{planosSecao.siteDoPlano}</span>{" "}
                          <span className="text-nota font-semibold text-foreground transition-colors duration-300 group-hover/previa:text-accent group-active/previa:text-accent group-active/previa:duration-120">
                            {site.nome}
                          </span>
                        </span>
                        <IconeSeta className="size-3.5 flex-none text-accent transition-transform duration-300 group-hover/previa:translate-x-0.5" />
                      </span>{" "}
                    </a>
                  )}
                  {plano.destaque && (
                    <span className="absolute top-8 right-8 rounded-full bg-primary px-3 py-1 text-rotulo font-semibold text-primary-foreground md:top-10 md:right-10">
                      {planosSecao.seloDestaque}
                    </span>
                  )}
                  <h3 className="text-destaque">{plano.nome}</h3>
                  <p className="mt-5 font-display tracking-titulo text-numero tabular-nums">{reais(plano.criacao)}</p>
                  <p className="mt-2.5 text-nota text-muted-foreground">de criação, e {reais(plano.mensal)} por mês</p>
                  <ul className="mt-7 flex-1 space-y-3 border-t border-border pt-6">
                    {plano.itens.map((item) => (
                      <li key={item} className="flex gap-3 text-nota">
                        {/* 2 px abaixo do topo: o visto de 16 px no meio da primeira linha (21 px). */}
                        <IconeVisto className="mt-0.5 size-4 flex-none text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`${acaoOrcamento.destino}#orcamento-${plano.id}`}
                    className={buttonVariants({
                      variant: plano.destaque ? "default" : "secondary",
                      className: plano.destaque ? "vd-brilho mt-8 w-full" : "mt-8 w-full",
                    })}
                  >
                    {planosSecao.acaoPlano} {plano.nome}
                  </Link>
                </article>
              );
            })}
          </div>
          <div aria-hidden="true" className="vd-galeria-trilho" />
        </div>
        {/* Os nomes dos sites acima são de estabelecimentos fictícios: o aviso em texto, para nenhum leitor (nem uma IA) os tomar por clientes. */}
        <Apoio className="mt-10 text-nota">{simulador.aviso}</Apoio>

        {/* Os módulos em linhas, direto no branco (até 16/10, num bloco creme, mais um cartão na cena: o crítico de fora). */}
        <div className="mt-16 md:mt-20">
          <h3 className="text-destaque">{planosSecao.tituloModulos}</h3>
          <ul className="mt-4 border-y border-border">
            {modulos.map((m) => {
              const preco = precoDoModulo(m);
              return (
                <li
                  key={m.id}
                  className="grid gap-x-8 gap-y-1 border-t border-border py-5 first:border-t-0 md:grid-cols-[13rem_1fr_auto] md:items-baseline"
                >
                  <span className="font-sub font-medium">{m.nome}</span>{" "}
                  {/* No máximo ~60 caracteres por linha (16/10, Impeccable; a 1440 px, a descrição corria a linha inteira). */}
                  <span className="max-w-[60ch] text-nota text-muted-foreground">{m.descricao}</span>{" "}
                  <span className="text-nota tabular-nums md:text-right">
                    <span className="font-semibold">{preco.criacao}</span>
                    <span className="text-muted-foreground">, {preco.mensal}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Envelope>
    </Secao>
  );
}
