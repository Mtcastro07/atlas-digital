import { Moldura } from "@/components/demos/deposito/moldura";
import { Abertura, BotaoWhatsApp, envelope, FachadaDaCasa, metadadosDe, ondeABarraSoTemOIcone } from "@/components/demos/deposito/pecas";
import { depositoSite as site } from "@/conteudo/demos/deposito";

export const metadata = metadadosDe("a-casa");

/**
 * 05 · A casa. A abertura com a fachada do depósito; os quatro fatos em
 * números de placa; a placa do endereço com o horário; e as perguntas
 * frequentes, que abrem uma de cada vez (a ordem desde 16.10). O momento da
 * página (15.10.2026): as portas de enrolar sobem na carga, a casa abre
 * (.dp-porta). A resposta que abre da pergunta é a resposta à mão.
 *
 * 15.10.2026 (crítico de fora): a página abria parada, com a mesma
 * abertura das outras quatro, e a primeira cena repetia a ficha da capa
 * (F-01 a F-04, em quatro casas iguais com o código laranja no topo). Agora
 * a abertura tem a figura da casa, e os fatos viram uma lista de cartaz,
 * o número enorme e o que ele quer dizer, linha a linha. Os códigos F-01
 * a F-04, texto aprovado, saíram nessa correção e voltaram na noite de
 * 15.10, na tinta apagada, antes do rótulo de cada fato.
 *
 * 16.10.2026 (crítico de fora): o bloco de grafite do endereço, do horário
 * e do WhatsApp vinha colado ao rodapé de grafite, que repete os três: os
 * mesmos dados duas vezes seguidas. Ele sobe para depois dos fatos, entre
 * duas cenas de cal, e as perguntas fecham a página; o botão do WhatsApp
 * dele só aparece onde a barra não tem o botão inteiro. Os códigos saem
 * das listas que não são ficha: os F-01 a F-04 ficam na ficha da capa (o
 * cartaz já tem o número enorme e o que ele quer dizer), e os P-01 a P-04,
 * gerados na página, saem das perguntas, que não são sequência (11-anti-ia,
 * L5 e T10: o código de ficha técnica em toda lista vira carimbo).
 */
export default function PaginaDaCasa() {
  const { casa, fatos, duvidas, horario } = site;
  return (
    <Moldura pagina="a-casa">
      <Abertura pagina="a-casa" titulo={casa.titulo} lide={casa.lide} figura={<FachadaDaCasa className="dp-fachada" />} />

      <section aria-label="A casa em números" className={`${envelope} py-20`}>
        {/* A lista de cartaz: o número em escala de placa à esquerda e o que ele quer dizer à direita, uma linha por fato (na tela, o número vem antes, também no celular desde 16.10.2026; na leitura, o termo, como pede a lista de definição). */}
        {/* Sem o F-01, 1998 (16.10.2026, Impeccable; kit 20): o título da página já diz "Desde 1998 na Engenhoca", e o lide, "o mesmo endereço"; o fato fica na ficha da capa. */}
        <dl className="border-t-2 border-foreground">
          {fatos
            .filter((f) => f.codigo !== "F-01")
            .map((f) => (
              <div key={f.codigo} className="grid items-baseline gap-x-10 gap-y-3 border-b border-foreground/20 py-7 sm:grid-cols-12 lg:py-9">
                {/* Sem o código do fato desde 16.10.2026 (fica na ficha da capa, que é uma ficha). */}
                <dt className="order-2 max-w-[26ch] text-[clamp(18px,1.8vw,24px)] leading-snug sm:col-span-7 lg:col-span-6">{f.rotulo}</dt>
                <dd className="dp-exibicao order-1 text-[clamp(88px,11vw,168px)] leading-[0.82] font-bold sm:col-span-5 lg:col-span-6">{f.valor}</dd>
              </div>
            ))}
        </dl>
      </section>

      {/* O endereço e o horário, entre os fatos e as perguntas (16.10.2026; até ali, colado ao rodapé, que repete os dois). */}
      <section aria-labelledby="endereco" className="dp-grafite">
        <div className={`${envelope} grid gap-10 py-20 lg:grid-cols-12 lg:items-end`}>
          <div className="lg:col-span-6">
            {/* O rótulo dentro do título, com o mesmo desenho (16.10.2026, Impeccable; T2): o h2 se lê "Endereço, Rua Doutor March, 000". */}
            <h2 id="endereco" className="dp-exibicao text-[clamp(36px,4.2vw,64px)]">
              <span className="dp-codigo block leading-normal text-muted-foreground">Endereço</span>
              <span className="dp-titulo mt-4 block">{site.endereco}</span>
            </h2>
            <p className="mt-4 text-[18px] text-muted-foreground">
              {site.bairro} · {horario.nota}
            </p>
          </div>
          <dl className="lg:col-span-4 lg:col-start-8">
            {horario.dias.map((h) => (
              <div key={h.dia} className="flex items-baseline justify-between gap-6 border-t border-border py-3.5">
                <dt className="text-[15px] text-muted-foreground">{h.dia}</dt>
                <dd className="dp-exibicao text-[22px] tracking-[0.03em]">{h.hora}</dd>
              </div>
            ))}
          </dl>
          <div className={`lg:col-span-12 ${ondeABarraSoTemOIcone}`}>
            <BotaoWhatsApp grande />
          </div>
        </div>
      </section>

      <section aria-labelledby="perguntas" className={`${envelope} grid gap-12 py-20 lg:grid-cols-12 lg:pb-24`}>
        <h2 id="perguntas" className="dp-exibicao dp-titulo text-[clamp(36px,4.2vw,64px)] lg:col-span-4">
          {duvidas.titulo}
        </h2>
        <div className="border-t-2 border-foreground lg:col-span-8">
          {duvidas.itens.map((d) => (
            <details key={d.pergunta} name="perguntas-do-deposito" className="dp-pergunta group border-b border-foreground/25">
              {/* Sob o ponteiro, a pergunta na cor de ação e o "+" com o fio inteiro (até 03/10, sem hover). O giro do "+" escreve a propriedade rotate (Tailwind 4), que entra na lista da transição (até 03/10, estalava). Sem o código P-01 a P-04 desde 16.10.2026: a resposta alinha com a pergunta. */}
              <summary className="group/pergunta flex min-h-16 cursor-pointer list-none items-center gap-4 py-5 transition-[color] duration-300 hover:text-accent [&::-webkit-details-marker]:hidden">
                <span className="flex-1 text-[19px] font-semibold">{d.pergunta}</span>
                <span
                  aria-hidden="true"
                  className="dp-exibicao grid size-11 flex-none place-items-center border border-foreground/40 text-[22px] text-foreground transition-[rotate,background-color,border-color] duration-300 group-open:rotate-45 group-open:bg-primary group-hover/pergunta:border-foreground"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[64ch] pb-7 text-[17px] leading-relaxed text-muted-foreground">{d.resposta}</p>
            </details>
          ))}
        </div>
      </section>
    </Moldura>
  );
}
