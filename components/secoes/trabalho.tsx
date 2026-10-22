import { Envelope, Secao } from "@/components/estrutura";
import { CartaDoPrazo, DataDaEtapa, FitaDasEtapas } from "@/components/ilhas/carta-do-prazo";
import { figuras, trabalho } from "@/conteudo/site";

/** A legenda de carta: o termo, na tinta, e o que ele quer dizer (app/digital.css, .vd-legenda-de-carta). */
function Legenda({ termos, fim }: { termos: readonly (readonly string[])[]; fim?: string }) {
  return (
    <figcaption className="vd-legenda-de-carta mt-8 md:mt-10">
      {termos.map(([termo, texto]) => (
        <span key={termo}>
          <strong>{termo}</strong> {texto}{" "}
        </span>
      ))}
      {fim}
    </figcaption>
  );
}

/**
 * O instrumento das duas figuras da página, na largura da página: além da coluna do texto, até 12 px da borda (8 no
 * celular), a margem de papel da tela (--margem-tela), com o conteúdo de dentro alinhado ao título. O raio é o do
 * instrumento (--r-instrumento), e a luz, a da tarde da página (app/vidro.css).
 */
const instrumento = "vd-instrumento -mx-4 px-4 md:-mx-7 md:px-7";

/**
 * A abertura de O trabalho: a folha das primeiras 72 horas, num instrumento largo sobre o papel da tarde (desde 17/10,
 * a direção final do Atlas Digital, seção 3, item 17). Hoje, amanhã e depois, de 20 em 20 minutos, com a noite real
 * de Niterói, a visita e o briefing, as 24 horas do rascunho e, embaixo, a trena dos 15 dias úteis com as datas e os
 * feriados (ilhas/carta-do-prazo.tsx, escala="horas"). O marcador do briefing se arrasta, e a leitura presa a ele diz,
 * chapada, até quando chega o rascunho (até 18/10, em meio-tom). Até 17/10, o relógio do prazo em cartão (três leituras, com os segundos
 * correndo em duas) sobre a régua dos dias úteis: o cartão lia painel de SaaS, "Briefing completo agora" lia um estado
 * e não uma hipótese, e os feriados contavam como dias úteis (os dois fechamentos com o Impeccable). A legenda de carta
 * vai dentro do instrumento, como a da carta do início (desde a revisão de 17/10; antes, no papel, embaixo).
 */
export function FolhaDoTrabalho() {
  const { legenda, gesto } = figuras.folha;
  return (
    // data-sem-atalho (18/10): a folha já diz até quando chega o rascunho, e a barra do polegar some sobre ela.
    <figure data-sem-atalho data-tom="escuro" className={`${instrumento} pt-7 pb-7 md:pt-10 md:pb-9`}>
      <CartaDoPrazo escala="horas" lugar={figuras.coordenadas.decimal} />
      <Legenda termos={legenda} fim={gesto} />
    </figure>
  );
}

/**
 * As quatro etapas numa faixa só (desde 17/10, a direção final do Atlas Digital, seção 3, item 18), num segundo
 * instrumento, abaixo da folha: à esquerda, a faixa (ilhas/carta-do-prazo.tsx, FitaDasEtapas), com cada trecho na
 * altura da sua etapa e na unidade que ele mede (a visita sem escala, o rascunho em horas, as revisões e a publicação
 * em dias, com os fins de semana e os feriados); ao lado, o nome e o texto da etapa; na margem, a nota (o valor
 * chapado e a unidade, como em 16/10) e, embaixo dela, a data viva em Inter tabular, a partir de agora ou do briefing
 * arrastado na folha. A faixa e as datas são dado vivo, e por isso a tela (a regra da janela); os textos são curtos,
 * do fôlego de um lide. Abaixo de 1.024 px (desde 18/10), a faixa deita: cada etapa ganha a sua tira na largura
 * inteira, entre o nome e o texto, e o texto fica com a largura toda (app/digital.css; ilhas/desenho-da-carta-do-prazo.ts,
 * tirasDasEtapas). No leitor de tela e no celular, o nome vem primeiro; a ordem é a da sequência. O título
 * "Quatro etapas. Nenhuma delas opcional." fica no nome da região, para leitor de tela: aqui o h1 e a folha já abrem
 * o assunto, e as etapas são h2.
 * Histórico: de 17/10 até a revisão do mesmo dia, a faixa era uma tira de 40 px em CSS, no papel, cujas fileiras não
 * mediam nada (a revisão: as 24 horas em 26 linhas, as revisões em 24, a mesma altura em toda etapa); antes, quatro
 * telas iguais, cada uma com a trena dos 15 dias úteis em miniatura (a série, M1); de 16 a 17/10, a nota à margem,
 * ligada ao nome por um fio de chamada; até 16/10, a linha do tempo de círculos numerados.
 */
export function Trabalho() {
  const { datas, fita } = figuras.folha;
  return (
    <Secao id="trabalho" tom="claro" aria-label={trabalho.titulo.join(" ")}>
      <Envelope>
        {/* data-sem-atalho (18/10): as datas das etapas contam do briefing arrastado na folha, e a barra do polegar, do
            agora; com as duas à vista, "o rascunho chega até" diria duas datas na mesma tela. */}
        <figure data-sem-atalho data-tom="escuro" className={`${instrumento} vd-fita pt-10 pb-8 md:pt-14 md:pb-10`}>
          <div className="relative">
            <FitaDasEtapas />
            <ol className="vd-fita-etapas">
              {trabalho.passos.map((passo, i) => (
                <li key={passo.titulo}>
                  <h2 className="font-sub text-destaque leading-[1.25] font-medium tracking-[-0.018em]">{passo.titulo}</h2>
                  <p className="max-w-[60ch] text-corpo text-muted-foreground">{passo.texto}</p>
                  {/* O valor e a data em dois parágrafos: o leitor de tela faz a pausa entre os dois (até a revisão de
                      17/10, lia "1 visita presencial Se fechar agora…", corrido). */}
                  <div className="vd-fita-nota">
                    <p>
                      <span className="font-display text-numero tracking-titulo lg:whitespace-nowrap">{passo.marca.valor}</span>{" "}
                      <span className="text-nota text-muted-foreground">{passo.marca.rotulo}</span>
                    </p>
                    <p className="mt-2 text-nota font-semibold text-foreground tabular-nums">
                      <DataDaEtapa etapa={i as 0 | 1 | 2 | 3} reserva={datas[i]} />
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <Legenda termos={fita} />
        </figure>
      </Envelope>
    </Secao>
  );
}
