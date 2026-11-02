import { Envelope, Secao } from "@/components/estrutura";
import { Montador } from "@/components/ilhas/montador";
import { FitaDaConta } from "@/components/paginas/orcamento/fita-da-conta";
import { RotaDireta } from "@/components/paginas/orcamento/rota-direta";
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
 * Desde 16/10, o painel é uma ficha que sobe sobre o navy dos passos.
 */
export function Orcamento() {
  return (
    // data-sem-atalho: o atalho do WhatsApp some enquanto o montador está na tela (ilhas/acao-flutuante.tsx).
    <Secao id="orcamento" data-sem-atalho tom="claro">
      <Envelope className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        {/* A fita fica fora do que é preso: na mesa, no pé da coluna, à altura da conta. */}
        <div className="min-w-0 lg:flex lg:flex-col lg:self-stretch">
          <div className="lg:flex-1">
        <div className="lg:sticky lg:top-28">
          {/* O rótulo, só para o leitor de tela (17/10): à vista, era o sobretítulo (a marca T2). */}
          <p className="sr-only">{orcamento.rotulo}</p>
          {/* Num parágrafo só, que quebra onde couber: em linhas fixas, a coluna estreita partia cada uma em duas.
              Desde 16/10, no degrau dos títulos, como os outros h2 da página (no dos números, a hierarquia ficava
              achatada), com as duas colunas iguais a partir de 1024 px. */}
          <h2 className="text-titulo">{orcamento.titulo.join(" ")}</h2>
          <Lide className="mt-6">{orcamento.lide}</Lide>
          <SemScript />
        </div>
          </div>
          <FitaDaConta />
        </div>
        {/* O plano sobre o plano (16/10): na mesa, o painel sobe 96 px sobre o navy dos passos (os 144 do respiro
            mais 96), por cima dele. A única emenda deste tipo no início. data-sobe: a âncora #orcamento conta com ele
            (ilhas/ancoras.tsx). */}
        <div data-sobe className="relative z-[1] min-w-0 lg:-mt-60">
          <Montador privacidade={orcamento.privacidade} />
        </div>
      </Envelope>
    </Secao>
  );
}

/**
 * A figura da página Orçamento: o próprio montador, logo abaixo do título "Dois toques, valor exato." (desde 16/10), a
 * abertura e a ferramenta numa cena só. Desde 28/10 (R10), as escolhas no papel e a conta como o objeto da página, e,
 * depois delas, a rota direta: "A conta é feita neste aparelho.", com o código que a prova (D12). O aviso para quem
 * está sem script vem antes do montador.
 */
export function MontadorDaPagina() {
  return (
    <>
      <FitaDaConta noAlto />
      {/* O atalho do WhatsApp some enquanto o montador está na tela (16/10, passe 3): aparecia sobre as opções e
          disputava o "Enviar no WhatsApp" (A5). A faixa do celular só aparece com as escolhas na tela, aqui dentro. */}
      <div data-sem-atalho>
        <SemScript />
        <Montador
          privacidade={orcamento.privacidade}
          completo={{
            aviso: orcamento.completo.aviso,
            fundacao: orcamento.completo.fundacao,
            sites: simulador.sites.map(({ plano, nome, caminho }) => ({ plano, nome, caminho })),
          }}
        />
      </div>
      <RotaDireta />
    </>
  );
}
