import { Envelope, Secao } from "@/components/estrutura";
import { Titulo } from "@/components/tipografia";
import { quemFaz } from "@/conteudo/site";

/**
 * A história do Atlas (pedido do usuário, 01/10): da sala de aula da UFF
 * ao balcão do comércio de Niterói, em quatro capítulos. Cada capítulo é
 * uma linha da página: o número em bronze num círculo, o título e o texto,
 * com o fio que liga um ao outro. Na página "O Atlas", entre a abertura e
 * os sócios. Na escala desde 03/10 (regra 2): círculos de 36 px (48 px a
 * partir de 768 px), a coluna do tamanho do círculo (auto) e o fio no eixo
 * deles, a 18 e a 24 px da borda (até 03/10, medidas de 2,3 e 3,2 rem). O
 * fio em degradê, que se apaga embaixo, e o aro cheio dos círculos saíram
 * em 03/10 pela regra 3 das Diretrizes de Design Premium e voltaram no
 * mesmo dia, a pedido do usuário: são parte da identidade do site.
 * Os títulos dos capítulos no degrau dos números (24 a 36 px): no do lide
 * (18 a 21 px), mal se destacariam do texto de 17 px.
 */
export function Historia() {
  const { historia } = quemFaz;
  return (
    <Secao aria-labelledby="historia" tom="claro">
      <Envelope>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-rotulo font-semibold text-accent">{historia.rotulo}</p>
            <Titulo id="historia" linhas={historia.titulo} className="mt-4 lg:sticky lg:top-32" />
          </div>
          <ol className="relative lg:col-span-7 lg:col-start-6">
            <span aria-hidden="true" className="absolute top-3 bottom-3 left-4.5 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent md:left-6" />
            {historia.capitulos.map((capitulo) => (
              <li key={capitulo.numero} className="relative grid grid-cols-[auto_1fr] gap-x-6 pb-14 last:pb-0 md:gap-x-9">
                <span aria-hidden="true" className="relative z-10 grid size-9 place-items-center rounded-full border border-accent bg-background font-display text-nota tracking-wide text-accent tabular-nums md:size-12">
                  {capitulo.numero}
                </span>
                {/* O recuo de cima põe a primeira linha do título no meio do círculo. */}
                <div className="pt-1 md:pt-1.5">
                  <h3 className="text-numero">{capitulo.titulo}</h3>
                  <p className="mt-4 max-w-[58ch] text-corpo text-muted-foreground">{capitulo.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Envelope>
    </Secao>
  );
}
