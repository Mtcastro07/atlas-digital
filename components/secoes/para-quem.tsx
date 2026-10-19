import { Envelope, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { Titulo } from "@/components/tipografia";
import { paraQuem, simulador } from "@/conteudo/site";

/**
 * Os três públicos em linhas, sobre a névoa: o nome do público, o texto e o
 * exemplo pronto daquele público (um dos sites de demonstração, aberto em
 * nova aba), em colunas a partir de 1024 px e um embaixo do outro abaixo
 * disso. O título vai na margem, como as linhas.
 * Até 16/10, três blocos brancos iguais, cada um aberto por um ícone de
 * traço, numa galeria de deslizar no celular: o kit de cartões com ícone no
 * alto (a marca L3; 19-o-padrao-atlas.md, seção 4, item 8). Até 14/10, o
 * bloco também subia, a aresta acendia e um orbe de bronze seguia o
 * ponteiro (pedido do usuário, 14/10: "parecendo que você está spamando os
 * mesmos componentes"). De 16 a 17/10, sem os filetes entre as linhas, e o
 * exemplo era só o vínculo com o ponto da cor do site.
 * Desde 17/10 ("o Atlas Digital"; o usuário: "textos jogados e
 * organizados"), o exemplo é a tela do próprio site: a prévia dele no
 * computador (public/simulador/<id>-computador-360.webp, a mesma dos
 * planos); sob a mão, a prévia sobe 4 px e o nome acende. Desde a direção
 * final do mesmo dia (seção 3, item 10), a prévia vai num instrumento
 * (.vd-instrumento: a tela pequena no papel, lisa, com o raio
 * --r-instrumento e sem fio, no lugar do cartão de borda no tom do site), e
 * os nichos atendidos saem das etiquetas de cantos redondos (alargavam a
 * página com a letra a 200%) para o texto, com o símbolo cheio nos que já
 * têm site de exemplo e vazio nos outros: o dado que até então não se via
 * (conteudo/site.ts, paraQuem.nichos.comSite, contra simulador.sites).
 */
export function ParaQuem() {
  const { nichos } = paraQuem;
  const comSite = (nicho: string) => simulador.sites.some((s) => s.id === nichos.comSite[nicho]);
  const formato = new Intl.ListFormat("pt-BR");
  return (
    <Secao id="quem" tom="claro">
      <Envelope>
        <Titulo linhas={paraQuem.titulo} />
        <ul className="mt-6 md:mt-8">
          {paraQuem.publicos.map((publico) => {
            const site = simulador.sites.find((s) => s.plano === publico.plano);
            return (
              <li key={publico.titulo} className="grid gap-x-14 gap-y-5 py-10 md:py-12 lg:grid-cols-12 lg:items-center">
                {/* hyphens-auto: com a letra a 200% num aparelho estreito, "regulamentada" passava da coluna (17/10). */}
                <h3 className="text-numero hyphens-auto lg:col-span-4">{publico.titulo}</h3>
                <p className="max-w-[52ch] text-corpo text-muted-foreground lg:col-span-4">{publico.texto}</p>
                {site && (
                  <a href={site.caminho} target="_blank" rel="noopener" className="group/exemplo block no-underline lg:col-span-4">
                    <span data-tom="escuro" className="vd-instrumento block aspect-[16/9]">
                      {/* 360 px na tela comum (a imagem mede até ~300 px na coluna), 720 px na densa. Sem sombra: o
                          instrumento é tela, e a tela não tem sombra (C12). */}
                      <img
                        src={`/simulador/${site.id}-computador-360.webp`}
                        srcSet={`/simulador/${site.id}-computador-360.webp 360w, /simulador/${site.id}-computador.webp 720w`}
                        sizes="(min-width: 1024px) 300px, 86vw"
                        alt=""
                        width={720}
                        height={450}
                        loading="lazy"
                        decoding="async"
                        className="vd-esqueleto absolute top-[12%] left-[7%] w-[86%] rounded-t-[var(--r-ficha)] transition-transform duration-500 ease-atlas group-hover/exemplo:-translate-y-1"
                      />
                    </span>
                    <span className="mt-3 flex min-h-11 items-center gap-2.5 text-nota">
                      <span className="flex flex-col">
                        <span className="text-rotulo text-muted-foreground">{paraQuem.exemplo}</span>{" "}
                        <span className="font-semibold text-foreground transition-colors duration-300 group-hover/exemplo:text-accent group-active/exemplo:text-accent group-active/exemplo:duration-120">
                          {site.nome}
                        </span>
                        <span className="sr-only"> {simulador.abreEmNovaAba}</span>
                      </span>
                      <IconeSeta className="ml-auto size-3.5 flex-none text-accent transition-transform duration-300 group-hover/exemplo:translate-x-0.5" />
                    </span>
                  </a>
                )}
              </li>
            );
          })}
        </ul>
        {/* Os nichos em texto, na coluna do texto dos públicos: o símbolo cheio nos que têm site de exemplo, vazio nos
            outros, com a chave ao lado do rótulo. Para quem lê sem ver (o leitor de tela e os robôs), as duas frases.
            As colunas pela letra (22,5 rem, e não 360 px): com a letra a 200%, duas colunas alargavam a página. */}
        <div className="mt-6 gap-x-14 lg:grid lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-5">
            <p className="sr-only">
              {nichos.rotulo}: {formato.format(nichos.lista)}. Com site de exemplo: {formato.format(nichos.lista.filter(comSite))}.
            </p>
            <div aria-hidden="true" className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 text-nota">
              <p className="font-semibold">{nichos.rotulo}</p>
              <p className="flex flex-wrap gap-x-5 gap-y-1 text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <span className="size-2 flex-none rounded-full border-[1.5px] border-current bg-current text-foreground" />
                  {nichos.simbolos.cheio}
                </span>{" "}
                <span className="inline-flex items-center gap-2">
                  <span className="size-2 flex-none rounded-full border-[1.5px] border-current text-foreground" />
                  {nichos.simbolos.vazio}
                </span>
              </p>
            </div>
            {/* O símbolo no meio da primeira linha (0,5 lh), e não da caixa (18/10, o passe do celular): a 390, "Material
                de Construção" e "Pilates e Academia" quebram em duas linhas, e o ponto caía entre elas, solto. */}
            <ul aria-hidden="true" className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2.5 min-[22.5rem]:grid-cols-2 sm:grid-cols-3">
              {nichos.lista.map((nicho) => (
                <li key={nicho} className={`flex items-start gap-2.5 text-corpo ${comSite(nicho) ? "text-foreground" : "text-muted-foreground"}`}>
                  <span className={`mt-[calc(0.5lh-0.25rem)] size-2 flex-none rounded-full border-[1.5px] border-current text-foreground ${comSite(nicho) ? "bg-current" : ""}`} />
                  {nicho}{" "}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Envelope>
    </Secao>
  );
}
