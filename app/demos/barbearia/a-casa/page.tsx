import { cena, envelope, Extrusao, metadadosDe, TituloQueSeCompoe } from "@/components/demos/barbearia/pecas";
import { barbeariaSite as site } from "@/conteudo/demos/barbearia";

export const metadata = metadadosDe("a-casa");

/**
 * O --p da lista (o fio que desce) em que o ponto de cada marco começa a acender: ele chega à metade quando a ponta do
 * fio passa pelo centro do ponto. Medido em 14/10 ao longo do fio (de 8 px do alto a 8 px do pé), de 320 a 1440 px: a
 * ponta chega aos pontos em 2,4–2,8%, 40,7–42,4% e 76,5–78,7% da descida.
 */
const LIMIARES = [0.011, 0.4, 0.76];

/**
 * 02 · A casa. A placa de bronze de 1996 em cena, à direita, que fica na
 * parede enquanto a linha do tempo desce à esquerda, com o fio de latão
 * que acende o ponto de cada marco quando chega a ele; e os números, que
 * ganham volume ao passar (CSS 3D). Desde 14/10, sem a revelação por cima
 * dessas peças, e a abertura pinta parada. Correção de 14/10, depois do
 * crítico de fora: o título era o de uma cena do início ("Gira na mesma
 * esquina"), "1996" aparecia seis vezes na página, e a linha do tempo
 * trazia a moeda da capa de novo; agora o título conta a história, o ano
 * fica na placa e no marco, os números dizem os trinta anos, e a linha do
 * tempo corre ao lado da placa, sem segunda ficha.
 */
export default function PaginaDaCasa() {
  const { casa } = site;
  return (
    <div>
      {/* Desde 16/10 (o crítico de fora: a capa, A casa e o Agendar abriam no mesmo esquema na mesa, o título de duas
          linhas à esquerda e a ficha à direita, na mesma escala; e, no celular, a ficha no alto e o título embaixo, como
          a capa e o Onde), a abertura é a placa com a legenda. Na mesa, o título numa linha só, de ponta a ponta, em
          cima; a placa na parede, à direita; o texto ao pé, à esquerda. No celular, centrado: o título, a placa no lugar
          que a caixa [data-lugar] dá a ela, e o texto embaixo. */}
      <section
        aria-labelledby="titulo"
        {...cena("1996", "direita")}
        // Abaixo de 1024 px, a altura do conteúdo (desde 16/10, o Impeccable: com 100svh, a folga da abertura somava
        // ~270 px vazios antes de "A linha da casa", a 390 px).
        className="flex min-h-[100vh] pt-24 pb-16 max-lg:min-h-0 max-lg:pb-12 max-lg:text-center"
      >
        <div className={`${envelope} flex w-full flex-col lg:justify-between`}>
          <TituloQueSeCompoe
            id="titulo"
            linhas={casa.titulo}
            className="text-[clamp(64px,8.4vw,144px)] leading-[0.88] lg:text-[clamp(60px,min(8vw,12.5vh),132px)] lg:whitespace-nowrap lg:[&>span]:inline"
          />
          <span aria-hidden="true" data-lugar className="mx-auto mt-10 block aspect-[2.16/1.4] w-[min(80vw,40svh)] lg:hidden" />
          <p className="mt-10 max-w-[46ch] text-[18px] leading-relaxed text-muted-foreground max-lg:mx-auto">{casa.texto}</p>
        </div>
      </section>

      {/* A linha do tempo, com o fio de latão que desce, à esquerda; a placa da abertura fica na parede, à direita. */}
      <section aria-labelledby="linha" className="pt-20 pb-32 lg:pt-32">
        <div className={`${envelope} grid lg:grid-cols-12`}>
          <div className="lg:col-span-6">
            <h2 id="linha" className="bb-rotulo text-accent">
              {casa.linhaTitulo}
            </h2>
            {/* O fio de 1 px centrado nos pontos de 12 px: os dois com o meio a 6 px da borda (até 03/10, ponto de 11 px e fio a 5 px, fora da escala). */}
            <ol data-cena style={{ "--p": 1 } as React.CSSProperties} className="relative mt-12 pl-10">
              <span aria-hidden="true" className="bb-linha-fio absolute top-2 bottom-2 left-1.5 w-px -translate-x-1/2 bg-gradient-to-b from-primary via-primary to-transparent" />
              {casa.linha.map((marco, i) => (
                // O ponto acende quando a ponta do fio chega a ele (LIMIARES, acima).
                <li key={marco.ano} data-toque style={{ "--limiar": LIMIARES[i] } as React.CSSProperties} className="bb-marco relative pb-20 last:pb-0">
                  <span aria-hidden="true" className="absolute top-5 -left-10 size-3 rounded-full border border-primary bg-background">
                    <span className="bb-marco-ponto" />
                  </span>
                  {/* Sob a mão e no toque (desde 16/10; o crítico de fora: os marcos não respondiam), o ano pega a luz: a cópia em latão claro, por cima, acende (barbearia.css, .bb-marco-luz). */}
                  <p className="bb-exibicao bb-latao relative text-[clamp(64px,6vw,104px)] leading-[0.9]">
                    {marco.ano}
                    <span aria-hidden="true" className="bb-marco-luz">
                      {marco.ano}
                    </span>
                  </p>
                  <h3 className="bb-exibicao mt-3 text-[34px] leading-tight italic">{marco.titulo}</h3>
                  <p className="mt-3 max-w-[40ch] text-[17px] leading-relaxed text-muted-foreground">{marco.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Os números, em volume; sob a mão, o número se aprofunda (desde 15/10; barbearia.css, .bb-numero). Desde 16/10
          (o Impeccable): dois, e não quatro ("4 serviços" e "0 pacotes" repetiam os Serviços), em metade da largura na
          mesa; e o rótulo é o termo (dt) e o número, o valor (dd), com o número em cima pela ordem visual. */}
      <section aria-label="A casa em números" className="bg-deep">
        <div className={`${envelope} py-28`}>
          <dl data-cena style={{ "--p": 1 } as React.CSSProperties} className="grid grid-cols-2 border-t border-border lg:max-w-[50%]">
            {casa.numeros.map((n) => (
              <div key={n.rotulo} data-toque className="bb-numero flex flex-col-reverse justify-end border-border pt-10 pb-2 first:border-r first:pr-5 last:pl-5 lg:first:pr-8 lg:last:pl-8">
                <dt className="mt-5 max-w-[24ch] text-[14.5px] leading-snug text-muted-foreground">{n.rotulo}</dt>
                <dd className="bb-exibicao text-[clamp(72px,7.6vw,128px)] leading-[0.85] tabular-nums">
                  <Extrusao texto={n.valor} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
