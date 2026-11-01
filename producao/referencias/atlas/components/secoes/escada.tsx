import { Abertura, Envelope, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { EscadaDemo } from "@/components/ilhas/escada-demo";
import { Simulador } from "@/components/ilhas/simulador";
import { buttonVariants } from "@/components/ui/button";
import { BarsSpinner } from "@/components/ui/spell/bars-spinner";
import { ShimmerText } from "@/components/ui/spell/shimmer-text";
import { TiltCard } from "@/components/ui/spell/tilt-card";
import { planos } from "@/conteudo/planos";
import { escada, planosSecao, simulador } from "@/conteudo/site";
import { reais } from "@/lib/moeda";

/**
 * "A distância não está na lista. Está na tela.": um site completo em cada
 * plano, no palco da escada. O seletor dos três níveis troca o site em
 * cena, e a troca é encenada com a camada de movimento de cada nível (ilha
 * EscadaDemo: no Essencial, tudo surge de uma vez; no Profissional, em
 * camadas; no Completo, o nome se compõe palavra a palavra e os blocos
 * assentam). Cada site traz o plano, o nome, o nicho, o resumo e a prévia
 * no computador e no celular (public/simulador/); "Abrir no simulador" e a
 * própria prévia abrem o site vivo num diálogo (ilha Simulador, à maneira
 * do Webild). Os três ficam desenhados aqui, no servidor: sem script,
 * aparecem um embaixo do outro, e os vínculos levam ao site em nova aba.
 */
export function Escada() {
  // `abrir` é só do palco; o resto dos rótulos vai ao diálogo.
  const { sites, abrir, ...textos } = simulador;

  return (
    <Secao id="escada" tom="escuro">
      <Envelope>
        <Abertura titulo={escada.titulo} lide={escada.lide} />
        <Simulador dados={{ textos, sites }}>
          <EscadaDemo niveis={escada.niveis}>
            {sites.map((site, i) => {
              const plano = planos.find((p) => p.id === site.plano)!;
              const palavras = site.nome.split(" ");
              return (
                <div key={site.plano} data-site={site.plano} className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
                  <div>
                    <p data-parte="texto" className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-rotulo font-semibold text-accent">{plano.nome}</span>
                      <span className="text-nota text-muted-foreground tabular-nums">
                        {reais(plano.criacao)} {textos.criacao}
                      </span>
                    </p>
                    {/* Título grande de bloco: o nome do site em cena, em Archivo Black (de 03 a 05/10, na
                        família do texto), no degrau dos títulos (até 03/10, de 30 a 44 px). */}
                    <h3 data-parte="titulo" className="mt-3 font-display tracking-titulo text-titulo font-normal">
                      {/* Cada palavra numa janela própria: no nível Completo, sobe de dentro dela. A folga de 0,08 em
                          embaixo guarda as descendentes. */}
                      {palavras.map((palavra, j) => (
                        <span key={j}>
                          <span className="inline-block overflow-hidden pb-[0.08em] align-top">
                            <span data-palavra className="inline-block">
                              {palavra}
                            </span>
                          </span>
                          {j < palavras.length - 1 && " "}
                        </span>
                      ))}
                    </h3>
                    <p data-parte="texto" className="mt-2 text-corpo text-muted-foreground">
                      {site.nicho}
                    </p>
                    <p data-parte="texto" className="mt-5 max-w-[46ch] text-corpo text-muted-foreground">
                      {site.resumo}
                    </p>
                    <div data-parte="texto" className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <a href={site.caminho} target="_blank" rel="noopener" data-simulador={i} className={buttonVariants({ size: "lg" })}>
                        <span className="vd-espera-rotulo">{abrir}</span>
                        {/* Enquanto o simulador baixa (aria-busy, ilhas/simulador.tsx): as barras no lugar do rótulo. */}
                        <span aria-hidden="true" className="vd-espera">
                          <BarsSpinner tamanho={18} />
                        </span>
                      </a>
                      <a href={site.caminho} target="_blank" rel="noopener" className={buttonVariants({ variant: "link", size: "link" })}>
                        {textos.novaAba}
                        <IconeSeta className="size-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* A prévia: o site no computador e no celular, sobre o tom do próprio site. Também abre o simulador. */}
                  <a
                    href={site.caminho}
                    target="_blank"
                    rel="noopener"
                    data-simulador={i}
                    data-parte="bloco"
                    aria-label={`${abrir}: ${site.nome}`}
                    className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    {/* A prévia inclina em 3D sob o ponteiro, com um brilho (Spell UI, Tilt Card; desde 03/10). */}
                    <TiltCard limite={6} raio="var(--radius-xl)">
                      <span data-tom={site.tom} className="vd-previa relative block aspect-[16/11] overflow-hidden rounded-xl border border-border">
                        {/* Enquanto o simulador baixa, as barras num disco, no centro da prévia. */}
                        <span aria-hidden="true" className="vd-espera z-20">
                          <span className="grid size-14 place-items-center rounded-full bg-background/85 text-foreground">
                            <BarsSpinner tamanho={22} />
                          </span>
                        </span>
                        {plano.destaque && (
                          <span className="absolute top-3 right-3 z-10 rounded-full bg-primary px-3 py-1 text-rotulo font-semibold text-primary-foreground">
                            <ShimmerText>{planosSecao.seloDestaque}</ShimmerText>
                          </span>
                        )}
                        {/* As duas telas flutuam com sombras de 75 e 80% de preto (saíram em 03/10 pela regra 3 das
                            Diretrizes de Design Premium e voltaram no mesmo dia, a pedido do usuário: são parte da
                            identidade do site); enquanto a imagem não chega, o lugar dela pulsa devagar (vd-esqueleto),
                            em vez de ficar vazio. */}
                        <span className="absolute top-[9%] left-[6%] w-[80%] overflow-hidden rounded-[10px] bg-deep shadow-[0_24px_50px_-24px_rgb(0_0_0/0.75)] ring-1 ring-foreground/10 transition-transform duration-500 ease-atlas group-hover:-translate-y-1">
                          <span aria-hidden="true" className="flex h-4 items-center gap-1 bg-card px-2">
                            {[0, 1, 2].map((k) => (
                              <span key={k} className="size-1.5 rounded-full bg-foreground/25" />
                            ))}
                          </span>
                          <img
                            src={`/simulador/${site.plano}-computador.webp`}
                            alt=""
                            width={720}
                            height={450}
                            loading="lazy"
                            decoding="async"
                            className="vd-esqueleto block aspect-[16/10] w-full object-cover object-top"
                          />
                        </span>
                        <span className="vd-moldura-de-celular absolute right-[5%] bottom-[-12%] w-[23%] overflow-hidden rounded-[16px] border-[3px] shadow-[0_24px_50px_-20px_rgb(0_0_0/0.8)] transition-transform duration-500 ease-atlas group-hover:-translate-y-2">
                          <img
                            src={`/simulador/${site.plano}-celular.webp`}
                            alt=""
                            width={293}
                            height={633}
                            loading="lazy"
                            decoding="async"
                            className="vd-esqueleto block w-full rounded-[13px]"
                          />
                        </span>
                      </span>
                    </TiltCard>
                  </a>
                </div>
              );
            })}
          </EscadaDemo>
        </Simulador>
      </Envelope>
    </Secao>
  );
}
