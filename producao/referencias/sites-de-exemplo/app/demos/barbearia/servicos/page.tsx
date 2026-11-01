import { atraso, cena, envelope, metadadosDe, paginaDe, recuoDoVidro, textoEmbaixo, TituloQueSeCompoe, VinculoDeFio } from "@/components/demos/barbearia/pecas";
import { comServico } from "@/components/demos/barbearia/enderecos";
import { barbeariaSite as site } from "@/conteudo/demos/barbearia";

export const metadata = metadadosDe("servicos");

/** A duração do serviço mais longo: o anel dele fecha inteiro. */
const maiorDuracao = Math.max(...site.servicos.itens.map((s) => s.minutos));

/**
 * 01 · Serviços. Cada serviço numa tela, num cartão de vidro escuro, com a
 * sua ficha em cena do outro lado — o preço no centro, a duração embaixo,
 * o nome em volta; latão, alpaca e cobre —, que viram uma na outra ao
 * rolar. O anel da duração fecha na proporção
 * do serviço (CSS, ligado à rolagem). No fim, o que não se faz aqui,
 * riscado ao passar.
 */
export default function PaginaDosServicos() {
  const { servicos, ausencias } = site;
  const agendar = paginaDe("agendar").caminho;
  return (
    <div className="bb-pagina">
      <section aria-labelledby="titulo" {...cena("selo", "direita")} className={`flex min-h-[100vh] items-center pt-32 pb-16 ${textoEmbaixo}`}>
        <div className={`${envelope} w-full`}>
          <div className="lg:max-w-[58%]">
            <p className="mov-entra bb-rotulo text-accent">01 · Serviços</p>
            <TituloQueSeCompoe id="titulo" linhas={servicos.titulo} className="mt-8 text-[clamp(56px,7.4vw,124px)] leading-[0.9]" />
            <p className="mov-entra mt-8 max-w-[44ch] text-[18px] leading-relaxed text-muted-foreground" style={atraso(800)}>
              {servicos.lide}
            </p>
          </div>
        </div>
      </section>

      {servicos.itens.map((s, i) => {
        const lado = i % 2 === 0 ? "esquerda" : "direita";
        return (
          <section key={s.id} aria-labelledby={`servico-${s.id}`} {...cena(s.objeto, lado)} className={`flex min-h-[115vh] items-center py-20 ${textoEmbaixo}`}>
            <div className={`${envelope} grid w-full lg:grid-cols-12`}>
              <article
                data-cena
                data-revelar
                style={{ "--p": 1 } as React.CSSProperties}
                className={`bb-vidro rounded-[32px] ${recuoDoVidro} lg:col-span-6 ${lado === "esquerda" ? "lg:col-start-7" : ""}`}
              >
                <div className="flex items-start justify-between gap-6">
                  <p className="bb-rotulo text-accent">Serviço {String(i + 1).padStart(2, "0")}</p>
                  <span aria-hidden="true" className="relative grid size-24 flex-none place-items-center">
                    <svg viewBox="-30 -30 60 60" className="bb-anel absolute inset-0 size-full -rotate-90" style={{ "--fracao": s.minutos / maiorDuracao } as React.CSSProperties}>
                      <circle r="27" fill="none" stroke="var(--border)" strokeWidth="1.5" />
                      <circle className="bb-arco" r="27" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" pathLength={1} />
                    </svg>
                    <span className="text-[13px] tracking-[0.06em] tabular-nums">{s.duracao}</span>
                  </span>
                </div>
                <h2 id={`servico-${s.id}`} className="bb-exibicao mt-4 text-[clamp(60px,6.6vw,112px)] leading-[0.88]">
                  {s.nome}
                </h2>
                <p className="mt-6 max-w-[34ch] text-[18px] leading-relaxed text-muted-foreground">{s.texto}</p>
                <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-border pt-6">
                  <p className="bb-exibicao bb-latao text-[clamp(56px,5.4vw,88px)] leading-none tabular-nums">
                    <span className="mr-1.5 align-[0.55em] text-[0.38em]">R$</span>
                    {s.preco}
                  </p>
                  <VinculoDeFio href={comServico(agendar, s.id)}>{servicos.agendarEste}</VinculoDeFio>
                </div>
              </article>
            </div>
          </section>
        );
      })}

      {/* O que não se faz aqui: o risco atravessa cada item ao rolar. */}
      <section aria-labelledby="ausencias" className="bg-deep">
        <div className={`${envelope} grid gap-10 py-28 lg:grid-cols-12`}>
          <h2 id="ausencias" className="bb-rotulo text-accent lg:col-span-4" data-revelar>
            {ausencias.titulo}
          </h2>
          <ul data-cena style={{ "--p": 1 } as React.CSSProperties} className="lg:col-span-8">
            {ausencias.itens.map((item, i) => (
              <li key={item} data-revelar style={atraso(i * 110)} className="bb-exibicao border-b border-border py-5 text-[clamp(44px,5.6vw,92px)] leading-[1.02] first:pt-0">
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
