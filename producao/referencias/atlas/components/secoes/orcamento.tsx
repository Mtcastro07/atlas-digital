import { Envelope, Secao } from "@/components/estrutura";
import { Montador } from "@/components/ilhas/montador";
import { Apoio, Lide } from "@/components/tipografia";
import { buttonVariants } from "@/components/ui/button";
import { falarNoWhatsApp, mensagens, orcamento, simulador } from "@/conteudo/site";
import { linkWhatsApp } from "@/lib/whatsapp";

/**
 * O montador de orçamento, com o desenho da tabela do site de 28/08, na
 * névoa (o bloco claro de decisão). No início, como era lá: o texto à
 * esquerda e o painel à direita. Na página Orçamento (`completo`), o
 * título visível é o da página, e o painel ocupa a coluna inteira, com a
 * tabela completa (ilhas/montador.tsx). O aviso para quem está sem script
 * continua nas duas.
 */
export function Orcamento({ completo = false }: { completo?: boolean }) {
  const semScript = (
    <noscript>
      <Apoio className="mt-6">{orcamento.semScript}</Apoio>
      <a href={linkWhatsApp(mensagens.contato)} className={buttonVariants({ className: "mt-4" })}>
        {falarNoWhatsApp}
      </a>
    </noscript>
  );

  if (completo) {
    return (
      <Secao id="orcamento" tom="claro">
        <Envelope>
          {/* Sem a abertura, a seção guarda o título para leitor de tela: a página vai de h1 a h2. */}
          <h2 className="sr-only">{orcamento.titulo.join(" ")}</h2>
          {semScript}
          <Montador
            privacidade={orcamento.privacidade}
            completo={{
              textos: orcamento.completo,
              sites: simulador.sites.map(({ plano, nome, caminho }) => ({ plano, nome, caminho })),
            }}
          />
        </Envelope>
      </Secao>
    );
  }

  return (
    <Secao id="orcamento" tom="claro">
      <Envelope className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <p className="text-rotulo font-semibold text-accent">{orcamento.rotulo}</p>
          {/* Num parágrafo só, que quebra onde couber: em linhas fixas, a coluna estreita partia cada uma em duas.
              No degrau dos números (24 a 36 px), como era: no dos títulos de seção, quebraria em quatro ou cinco
              linhas ao lado do painel. */}
          <h2 className="mt-3.5 text-numero">{orcamento.titulo.join(" ")}</h2>
          <Lide className="mt-6">{orcamento.lide}</Lide>
          {semScript}
        </div>
        <Montador privacidade={orcamento.privacidade} />
      </Envelope>
    </Secao>
  );
}
