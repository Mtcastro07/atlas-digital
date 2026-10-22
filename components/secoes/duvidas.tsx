import { Envelope, Secao } from "@/components/estrutura";
import { duvidas } from "@/conteudo/duvidas";

/**
 * <details> nativo: abre e fecha sem script, e a busca do navegador
 * encontra as respostas. A altura anima onde o navegador sabe animar para
 * "auto" (vd-duvida, app/vidro.css); o "+" gira até virar "×". Desde
 * 16/10, direto na névoa, entre dois filetes, e sem o índice de 01 a 10:
 * até então, num painel branco (mais um cartão numa cena clara) e com o
 * número que o mapa da abertura já mostrava (o crítico de fora).
 * Desde 17/10 ("o Atlas Digital"; o usuário: "sinto que páginas estão muito
 * simples"), cada pergunta é uma linha de cantos redondos, separada pelo
 * vão, e não pelo filete; a aberta vira ficha, com a sombra curta.
 * Desde 17/10 (a direção final do Atlas Digital, seção 3, item 23: "papel;
 * quieta"), o raio da ficha (--r-ficha, 12 px; até então, 28 px, o da
 * tela) e sem a etiqueta do momento ao lado da pergunta: os momentos já
 * estão na abertura, cada um com as suas palavras, e a etiqueta, sem
 * quebra, alargava a página a 504 px com a letra a 200% no celular (o
 * fechamento B). A coluna em minmax(0, 1fr): a pergunta longa quebra, e
 * nunca alarga a lista.
 * Desde a revisão de 17/10, a partir de 1024 px, em duas colunas, de 1 a 5
 * e de 6 a 10 (no HTML, na ordem), cada uma com a sua pilha: a aberta só
 * empurra a da sua coluna. As dez cabem numa tela da mesa, e o papel da
 * página cede lugar à tela (a metade, seção 5: a tela de /duvidas dava
 * 35% da página a 1.440 px, com a faixa de 40 a 60%).
 * Desde 18/10 (o passe do celular), com a lista abaixo de 18 rem (a 320
 * px, ou com a letra a 200% no celular), a ficha com 16 px de lado e 12
 * entre a pergunta e o "+": com os 48 e os 48 da letra a 200%, sobravam
 * 142 px para a pergunta, e "mensalidade" passava por baixo do "+".
 * Abaixo de 12 rem (só com a letra grande), o "+" vai ao canto e a
 * pergunta corre em volta dele (um float vazio do tamanho do "+"): a
 * palavra que não cabe ao lado desce e ganha a largura inteira da ficha
 * (a 390, 230 px). A que ainda não couber quebra, e nunca cobre o "+".
 */
const METADE = Math.ceil(duvidas.length / 2);

export function Duvidas() {
  return (
    <Secao id="duvidas" tom="claro">
      <Envelope>
        <div className="@container mx-auto grid max-w-3xl grid-cols-[minmax(0,1fr)] gap-2.5 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-x-14">
          {[duvidas.slice(0, METADE), duvidas.slice(METADE)].map((coluna, c) => (
            <div key={c} className="grid grid-cols-[minmax(0,1fr)] gap-2.5">
              {coluna.map((d, k) => {
                const i = c * METADE + k;
                return (
                  <details
                    key={d.pergunta}
                    id={`duvida-${i + 1}`}
                    open={i === 0}
                    className="vd-duvida group scroll-mt-28 rounded-[var(--r-ficha)] bg-card/55 px-6 transition-[background-color,box-shadow] duration-300 ease-atlas open:bg-card open:shadow-[var(--sombra-curta)] md:px-8 @max-[18rem]:px-4"
                  >
                    <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 @max-[18rem]:gap-3 @max-[12rem]:block font-sub text-corpo font-medium tracking-sub transition-colors duration-300 ease-atlas hover:text-accent [&::-webkit-details-marker]:hidden">
                      <span className="min-w-0 [overflow-wrap:anywhere] @max-[12rem]:before:float-right @max-[12rem]:before:ml-3 @max-[12rem]:before:size-6">
                        {d.pergunta}
                      </span>
                      <span
                        aria-hidden="true"
                        className="relative size-7 flex-none rounded-full @max-[12rem]:absolute @max-[12rem]:top-5 @max-[12rem]:right-0 @max-[12rem]:size-6 bg-muted transition-[transform,background-color] duration-500 ease-atlas group-open:rotate-[135deg] group-hover:bg-foreground/10"
                      >
                        <span className="absolute top-1/2 left-1/2 h-px w-3 -translate-1/2 bg-current" />
                        <span className="absolute top-1/2 left-1/2 h-3 w-px -translate-1/2 bg-current" />
                      </span>
                    </summary>
                    <p className="max-w-[56ch] pb-6 text-corpo text-muted-foreground">{d.resposta}</p>
                  </details>
                );
              })}
            </div>
          ))}
        </div>
      </Envelope>
    </Secao>
  );
}
