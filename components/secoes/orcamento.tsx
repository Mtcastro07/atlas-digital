import { Envelope, Secao } from "@/components/estrutura";
import { Montador } from "@/components/ilhas/montador";
import { Apoio, Lide } from "@/components/tipografia";
import { buttonVariants } from "@/components/ui/button";
import { falarNoWhatsApp, mensagens, orcamento, simulador } from "@/conteudo/site";
import { linkWhatsApp } from "@/lib/whatsapp";

/** O aviso para quem está sem script: o montador precisa dele, e a conversa pode começar pelo WhatsApp. */
function SemScript() {
  return (
    <noscript>
      <Apoio className="mt-6">{orcamento.semScript}</Apoio>
      <a href={linkWhatsApp(mensagens.contato)} className={buttonVariants({ className: "mt-4" })}>
        {falarNoWhatsApp}
      </a>
    </noscript>
  );
}

/**
 * O montador de orçamento, com o desenho da tabela do site de 28/08, na
 * névoa (o bloco claro de decisão), no início: o texto à esquerda e o
 * painel à direita. O aviso para quem está sem script fica sob o texto.
 */
export function Orcamento() {
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
          <SemScript />
        </div>
        <Montador privacidade={orcamento.privacidade} />
      </Envelope>
    </Secao>
  );
}

/**
 * A figura da página Orçamento (desde 16/10): o próprio montador, com a
 * tabela completa (ilhas/montador.tsx), logo abaixo do título "Dois
 * toques, valor exato." — a abertura e a ferramenta numa cena só, e a
 * primeira tela, na mesa, já com o plano para escolher. Até 16/10, a
 * figura era a equação (plano mais módulos é igual a criação mais
 * mensalidade), num cartão parado que repetia o lide, e o montador vinha
 * numa seção à parte, na mesma névoa, com a borda de cima no pé da
 * primeira tela (o crítico de fora: a abertura mais pobre das seis). O
 * aviso para quem está sem script vem antes do painel.
 */
export function MontadorDaPagina() {
  return (
    <>
      <SemScript />
      <Montador
        privacidade={orcamento.privacidade}
        completo={{
          textos: orcamento.completo,
          sites: simulador.sites.map(({ plano, nome, caminho }) => ({ plano, nome, caminho })),
        }}
      />
    </>
  );
}
