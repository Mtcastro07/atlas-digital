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
 * Desde 16/10, o painel é uma ficha que sobe sobre o navy dos passos; desde
 * 17/10 (a direção final do Atlas Digital, seção 3, item 5), a ficha de
 * papel com o raio de 12 px, e os totais chapados que acendem em pontos na
 * troca. A conta em pontos e a carta dos pagamentos ficam só na página
 * Orçamento (um bloco não se repete).
 */
export function Orcamento() {
  return (
    // data-sem-atalho: a barra do polegar some enquanto o montador está na tela (ilhas/barra-do-polegar.tsx).
    <Secao id="orcamento" data-sem-atalho tom="claro">
      <Envelope className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
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
 * A figura da página Orçamento (desde 16/10): o próprio montador, com a
 * tabela completa (ilhas/montador.tsx), logo abaixo do título "Dois
 * toques, valor exato." — a abertura e a ferramenta numa cena só, e a
 * primeira tela, na mesa, já com o plano para escolher. Desde 17/10 (a
 * direção final do Atlas Digital, seção 3, item 16), a ferramenta em duas
 * colunas no papel do meio-dia: as escolhas à esquerda e a conta num
 * instrumento à direita, com o total em pontos. Até 16/10, a
 * figura era a equação (plano mais módulos é igual a criação mais
 * mensalidade), num cartão parado que repetia o lide, e o montador vinha
 * numa seção à parte, na mesma névoa, com a borda de cima no pé da
 * primeira tela (o crítico de fora: a abertura mais pobre das seis). O
 * aviso para quem está sem script vem antes do painel.
 */
export function MontadorDaPagina() {
  return (
    // O atalho do WhatsApp some enquanto o montador está na tela (16/10, passe 3): sem nenhum dos ids que ele observava,
    // aparecia sobre as opções e disputava o "Enviar pelo WhatsApp" (A5). A faixa fixa do montador só aparece com as
    // escolhas na tela, que estão aqui dentro: fica coberta pela mesma marca.
    <div data-sem-atalho>
      <SemScript />
      <Montador
        privacidade={orcamento.privacidade}
        completo={{
          textos: orcamento.completo,
          sites: simulador.sites.map(({ plano, nome, caminho }) => ({ plano, nome, caminho })),
        }}
      />
    </div>
  );
}
