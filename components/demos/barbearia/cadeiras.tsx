"use client";

import { useEstadoDaCasa } from "@/components/demos/barbearia/estado-da-casa";
import type { Expediente } from "@/lib/demos/relogio";

type Pessoa = { id: string; nome: string; iniciais: string; especialidade: string; detalhe: string; cadeira: string; dias: readonly number[] };

/**
 * As três cadeiras da Equipe (desde a correção de 14/10, depois do crítico de fora: eram três telas iguais, de 115vh
 * cada, com um cartão de vidro de uma frase e a ficha 3D ao lado com as mesmas iniciais do monograma do cartão). Cada
 * pessoa é o espelho da sua cadeira, em arco, com a moldura de latão, as iniciais gravadas no vidro e a plaqueta
 * embaixo. O momento da página é o estado ao vivo (o relógio comum, useEstadoDaCasa): o espelho de quem atende agora
 * acende, como a luz da bancada, e a plaqueta diz "Na cadeira agora"; os outros ficam apagados. Até a hidratação e
 * sem script, nenhum estado: os três ficam a meia-luz, e as linhas reservadas ficam vazias. Sob o ponteiro e no toque,
 * a luz do espelho sobe (barbearia.css, .bb-espelho). Só opacidade.
 * Desde 16/10 (o crítico de fora: com a casa fechada, nenhum espelho acendia, e nada dizia por quê; sobravam três arcos
 * escuros iguais), a linha do estado fica sob o texto de abertura ("Fechado agora, abre às 9h."), e, com a casa
 * fechada, o espelho de quem atende quando ela abrir fica a meia-luz quente (data-a-postos), com a plaqueta "Na
 * cadeira quando a casa abrir"; os outros, apagados. No celular, o espelho deixou de ser a miniatura de 96 px ao lado
 * do nome: fica grande, com a plaqueta embaixo, como na mesa.
 */
export function EspelhosDaEquipe({ pessoas, expediente, agora, depois }: { pessoas: readonly Pessoa[]; expediente: Expediente; agora: string; depois: string }) {
  const estado = useEstadoDaCasa(expediente);
  return (
    <>
      {/* Reservada desde o HTML: o estado chega depois da hidratação, e nada pula. */}
      <p className="min-h-[1.55em] text-[15px] text-accent">{estado && `${estado.linha}.`}</p>
      <ul className="mt-12 grid gap-14 sm:grid-cols-3 sm:gap-6 lg:mt-20 lg:gap-10">
        {pessoas.map((p) => {
          const aceso = estado ? estado.aberto && p.dias.includes(estado.dia) : null;
          const aPostos = !!estado && !estado.aberto && estado.abre !== null && p.dias.includes(estado.abre);
          return (
            <li
              key={p.id}
              data-toque
              className="bb-espelho"
              data-aceso={aceso === true || undefined}
              data-a-postos={aPostos || undefined}
              data-apagado={(aceso === false && !aPostos) || undefined}
            >
              <div aria-hidden="true" className="bb-espelho-moldura max-sm:w-[min(64vw,280px)]">
                <div className="bb-espelho-vidro">
                  <span className="bb-espelho-luz" />
                  <span className="bb-exibicao bb-espelho-iniciais">{p.iniciais}</span>
                </div>
              </div>
              <div className="mt-7">
                <h2 className="bb-exibicao text-[clamp(34px,3.4vw,52px)] leading-[0.95]">{p.nome}</h2>
                <p className="bb-rotulo mt-4 text-accent">
                  {p.especialidade} <span className="text-muted-foreground">· {p.cadeira}</span>
                </p>
                <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">{p.detalhe}</p>
                {/* Reservada desde o HTML: o estado chega depois da hidratação, e nada pula. */}
                <p className="mt-2 min-h-[1.55em] text-[14.5px] text-accent">{aceso ? agora : aPostos ? depois : ""}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
