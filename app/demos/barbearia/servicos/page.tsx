import { envelope, metadadosDe, paginaDe, TituloQueSeCompoe, VinculoDeFio } from "@/components/demos/barbearia/pecas";
import { comServico } from "@/components/demos/barbearia/enderecos";
import { barbeariaSite as site } from "@/conteudo/demos/barbearia";

export const metadata = metadadosDe("servicos");

/** A duração do serviço mais longo: o arco dele fecha o relógio inteiro. */
const maiorDuracao = Math.max(...site.servicos.itens.map((s) => s.minutos));

/**
 * 01 · Serviços: a tabela da casa. Desde a correção de 14/10 (o crítico de
 * fora: eram quatro telas iguais, cada uma com um cartão de vidro de uma
 * linha e a ficha 3D ao lado repetindo o preço e a duração do cartão), a
 * página abre com a lista tipográfica dos quatro serviços, em algarismos
 * tabulares, como a tabela de preços na parede (19-o-padrao-atlas, seção
 * 4, regra 8), sem ficha em cena: o preço e a duração aparecem uma vez
 * cada. O momento da página é o relógio de cada serviço: o arco é o tempo
 * de cadeira (o mais longo fecha a volta), e o ponteiro corre o arco quando
 * a tabela entra na tela, um serviço depois do outro (barbearia.css,
 * .bb-relogio; uma vez por chegada). Sob o ponteiro, no foco e no toque, a
 * linha acende o relógio e, desde 16/10, o ponteiro corre o arco de novo (o
 * crítico de fora: só o relógio de 40 px acendia, 0,1% da linha). No fim, o
 * que não se faz aqui, riscado ao rolar; sob a mão, o item recua e o risco
 * fica (desde 15/10).
 */
export default function PaginaDosServicos() {
  const { servicos, ausencias } = site;
  const agendar = paginaDe("agendar").caminho;
  return (
    <div>
      <section aria-labelledby="titulo" className="pt-36 pb-24 lg:pt-44 lg:pb-32">
        <div className={envelope}>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <TituloQueSeCompoe id="titulo" italico={false} linhas={servicos.titulo} className="text-[clamp(52px,6.6vw,112px)] leading-[0.9] lg:col-span-8" />
            <p className="max-w-[40ch] text-[18px] leading-relaxed text-muted-foreground lg:col-span-4">{servicos.lide}</p>
          </div>

          <ol className="bb-tabela mt-16 border-t border-border lg:mt-24" data-ambiente>
            {servicos.itens.map((s, i) => (
              <li
                key={s.id}
                style={{ "--i": i, "--fracao": s.minutos / maiorDuracao } as React.CSSProperties}
                data-toque
                className="bb-servico grid gap-x-10 border-b border-border py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,11rem)_minmax(0,12rem)_minmax(0,13rem)] lg:items-center lg:py-10"
              >
                {/* Sem o número 01–04 (desde 15/10): os serviços não são sequência; a numeração é a dos capítulos (L5). O --i dá o atraso do relógio. */}
                <div>
                  <h2 className="bb-exibicao text-[clamp(44px,4.4vw,72px)] leading-[0.95]">{s.nome}</h2>
                  <p className="mt-3 max-w-[44ch] text-[16.5px] leading-relaxed text-muted-foreground">{s.texto}</p>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4 lg:contents">
                  {/* O relógio da cadeira: o arco é a duração; o ponteiro corre o arco ao chegar. */}
                  <p className="flex items-center gap-4">
                    <svg viewBox="-30 -30 60 60" aria-hidden="true" className="bb-relogio size-16 flex-none lg:size-[72px]">
                      <circle r="27" fill="none" stroke="var(--border)" strokeWidth="1.5" />
                      <circle
                        className="bb-relogio-arco"
                        r="27"
                        fill="none"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        pathLength={1}
                        strokeDasharray={`${s.minutos / maiorDuracao} 1`}
                        transform="rotate(-90)"
                      />
                      <g className="bb-relogio-ponteiro">
                        {/* Sob a mão e no toque (desde 16/10), o ponteiro corre o arco de novo (barbearia.css, .bb-relogio-mao). */}
                        <g className="bb-relogio-mao">
                          <line y2="-21" strokeWidth="2" strokeLinecap="round" />
                        </g>
                      </g>
                      <circle r="2.6" className="bb-relogio-eixo" />
                    </svg>
                    <span className="text-[15px] tracking-[0.04em] tabular-nums">{s.duracao}</span>
                  </p>
                  <p className="bb-exibicao bb-latao text-[clamp(52px,4.6vw,80px)] leading-none tabular-nums">
                    <span className="mr-1.5 align-[0.55em] text-[0.38em]">R$</span>
                    {s.preco}
                  </p>
                  <div className="lg:justify-self-end">
                    <VinculoDeFio href={comServico(agendar, s.id)} detalhe={s.nome}>
                      {servicos.agendarEste}
                    </VinculoDeFio>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* O que não se faz aqui: o risco atravessa cada item ao rolar. */}
      <section aria-labelledby="ausencias" className="bg-deep">
        <div className={`${envelope} grid gap-10 py-28 lg:grid-cols-12`}>
          <h2 id="ausencias" className="bb-rotulo text-accent lg:col-span-4">
            {ausencias.titulo}
          </h2>
          <ul data-cena style={{ "--p": 1 } as React.CSSProperties} className="lg:col-span-8">
            {ausencias.itens.map((item, i) => (
              <li key={item} data-toque className="bb-ausencia bb-exibicao border-b border-border py-5 text-[clamp(44px,5.6vw,92px)] leading-[1.02] first:pt-0">
                {/* Sob a mão, o texto recua e o risco fica inteiro (desde 15/10; barbearia.css, .bb-ausencia). */}
                <span className="bb-risco" style={{ "--i": i } as React.CSSProperties}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
