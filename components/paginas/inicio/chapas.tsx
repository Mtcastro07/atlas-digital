import { Envelope, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { Apoio, Lide, Titulo } from "@/components/tipografia";
import { buttonVariants } from "@/components/ui/button";
import { chapas } from "@/conteudo/paginas/inicio";
import { acaoOrcamento, falarNoWhatsApp, fundacao, mensagens } from "@/conteudo/site";
import { linkWhatsApp } from "@/lib/whatsapp";

/**
 * A condição de fundação no início (R10, 28/10, D3): três chapas de bronze numeradas, "1 de 3", "2 de 3" e "3 de 3", e
 * o h2 que diz a condição na forma única ("Nos três primeiros contratos, 50% de desconto na criação.",
 * conteudo/planos.ts). Até 28/10, o carimbo do canto da prancha (components/secoes/fundacao.tsx), com a mensalidade
 * de valor fixo, que saiu do site, e o orbe que seguia o ponteiro.
 * - O objeto é a própria condição: são três contratos, e eles têm ordem. O desenho e a passiva (a luz que conta as
 *   chapas, em laço, enquanto estão na tela) estão em app/paginas/inicio.css.
 * - As chapas são aria-hidden: a legenda as diz ("3 contratos com esta condição."), e nada mora só no desenho.
 * - Na mesa, o título na largura toda e, embaixo, o texto (5 de 12) e as chapas (7 de 12). No celular, o título, as
 *   chapas, a legenda, o lide, o apoio, a pílula na largura toda e o WhatsApp.
 * - Herda da cena de hoje o id="fundacao" (o destino do montador de /orcamento) e o data-sem-atalho: o "Falar no
 *   WhatsApp" já está à vista, e o atalho disputaria com ele. O figure é o [data-ambiente] da passiva.
 */
export function Chapas({ destino }: { destino: string }) {
  const numeros = Array.from({ length: chapas.total }, (_, i) => i + 1);
  return (
    <Secao id="fundacao" data-sem-atalho tom="escuro">
      <Envelope>
        <p className="sr-only">{fundacao.rotulo}</p>
        {/* As duas linhas da condição, cada uma equilibrada no celular: o desconto fica inteiro numa linha só. */}
        <Titulo linhas={fundacao.titulo} className="text-balance" />
        <div className="mt-10 grid gap-10 lg:mt-18 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-x-14">
          <div className="grid content-start gap-5">
            <Lide className="max-w-[30ch]">{chapas.lide}</Lide>
            <Apoio className="max-w-[44ch]">{chapas.apoio}</Apoio>
            <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href={destino} className={buttonVariants({ size: "lg", className: "max-lg:w-full" })}>
                {acaoOrcamento.rotulo}
              </a>{" "}
              <a href={linkWhatsApp(mensagens.contato)} target="_blank" rel="noopener" className={buttonVariants({ variant: "link", size: "link" })}>
                {falarNoWhatsApp}
                <IconeSeta className="size-3.5" />
              </a>
            </div>
          </div>
          <figure data-ambiente data-passiva="inicio-chapas" className="inicio-chapas @container max-lg:order-first">
            <ol aria-hidden="true" className="inicio-chapas-fila">
              {numeros.map((n) => (
                <li key={n} className="inicio-chapa">
                  <span className="inicio-chapa-luz mov-passiva" />
                  <span className="inicio-chapa-base">
                    <span className="inicio-chapa-numero">{n}</span>
                    <span className="inicio-chapa-de">
                      {chapas.de} {chapas.total}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
            <figcaption className="mt-6 text-corpo text-muted-foreground lg:mt-8">{chapas.legenda}</figcaption>
          </figure>
        </div>
      </Envelope>
    </Secao>
  );
}
