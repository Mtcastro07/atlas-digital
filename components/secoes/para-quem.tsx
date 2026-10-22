import { Envelope, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { Titulo } from "@/components/tipografia";
import { paraQuem, simulador } from "@/conteudo/site";

/**
 * Os três públicos em linhas, sobre a névoa, como uma lista tipográfica: o
 * nome do público, o texto e o exemplo pronto daquele público (um dos três
 * sites de demonstração, com a cor da marca dele, aberto em nova aba), em
 * colunas a partir de 1024 px e um embaixo do outro abaixo disso. O título
 * vai na margem, como as linhas. A resposta mora no vínculo do exemplo: o
 * nome acende em bronze e a seta anda; no toque, o nome acende em 120 ms.
 * Até 16/10, três blocos brancos iguais, cada um aberto por um ícone de
 * traço, numa galeria de deslizar no celular: o kit de cartões com ícone no
 * alto (a marca L3; 19-o-padrao-atlas.md, seção 4, item 8), e o cartão era o
 * recipiente de quase todas as cenas claras do site (o crítico de fora).
 * Até 14/10, o bloco também subia, a aresta acendia e um orbe de bronze
 * seguia o ponteiro (pedido do usuário, 14/10: "parecendo que você está
 * spamando os mesmos componentes").
 * Desde 16/10 ("Identidade mais profunda"), sem os filetes entre as linhas
 * (a linha entre filetes era o recipiente de quase toda cena clara; fica no
 * extrato de Planos e na sanfona das Dúvidas): o grupo se faz pelo espaço e
 * pela linha de base das 12 colunas. A carta da abertura projeta a sua
 * sombra no alto desta cena.
 */
export function ParaQuem() {
  return (
    <Secao id="quem" tom="claro">
      <Envelope>
        <Titulo linhas={paraQuem.titulo} />
        <ul className="mt-6 md:mt-8">
          {paraQuem.publicos.map((publico) => {
            const site = simulador.sites.find((s) => s.plano === publico.plano);
            return (
              <li key={publico.titulo} className="grid gap-x-14 gap-y-4 py-10 md:py-12 lg:grid-cols-12 lg:items-baseline">
                <h3 className="text-numero lg:col-span-4">{publico.titulo}</h3>
                <p className="max-w-[52ch] text-corpo text-muted-foreground lg:col-span-5">{publico.texto}</p>
                {site && (
                  <a
                    href={site.caminho}
                    target="_blank"
                    rel="noopener"
                    className="group/exemplo flex min-h-11 items-center gap-2.5 text-nota no-underline lg:col-span-3"
                  >
                    {/* A cor da marca do site: o ponto no tom do nicho (app/nichos.css). */}
                    <span data-tom={site.tom} aria-hidden="true" className="size-2.5 flex-none rounded-full bg-primary" />
                    <span className="flex flex-col">
                      <span className="text-rotulo text-muted-foreground">{paraQuem.exemplo}</span>{" "}
                      <span className="font-semibold text-foreground transition-colors duration-300 group-hover/exemplo:text-accent group-active/exemplo:text-accent group-active/exemplo:duration-120">
                        {site.nome}
                      </span>
                    </span>
                    <IconeSeta className="ml-auto size-3.5 flex-none text-accent transition-transform duration-300 group-hover/exemplo:translate-x-0.5" />
                  </a>
                )}
              </li>
            );
          })}
        </ul>
        {/* Os nichos em linha parada, na coluna do texto dos públicos (desde 17/10; conteudo/site.ts, paraQuem.nichos). */}
        <div className="gap-x-14 lg:grid lg:grid-cols-12">
          <p className="max-w-[52ch] text-nota text-muted-foreground lg:col-span-5 lg:col-start-5">
            <span className="font-semibold text-foreground">{paraQuem.nichos.rotulo}:</span>{" "}
            {new Intl.ListFormat("pt-BR").format(paraQuem.nichos.lista)}.
          </p>
        </div>
      </Envelope>
    </Secao>
  );
}
