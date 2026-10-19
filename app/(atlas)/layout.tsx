import { AoTopo } from "@/components/ilhas/ao-topo";
import { Ancoras } from "@/components/ilhas/ancoras";
import { BarraDoPolegar } from "@/components/ilhas/barra-do-polegar";
import { CaminhoDaVisita } from "@/components/ilhas/caminho-da-visita";
import { VidroLiquido } from "@/components/ilhas/vidro-liquido";
import { Cabecalho } from "@/components/secoes/cabecalho";
import { Rodape } from "@/components/secoes/rodape";

// As páginas do site do Atlas (o grupo "(atlas)" não entra no endereço).
// Desde 01/10, a pedido do usuário, cada assunto tem a sua página:
// início, para quem, planos, orçamento, o trabalho, o Atlas e dúvidas. O
// layout guarda o que atravessa as páginas — o cabeçalho de vidro, o
// rodapé, a barra do polegar (desde 18/10; até então, a ação flutuante do
// WhatsApp) — e as ilhas que delegam ou que
// refazem a leitura a cada página (âncoras, refração do vidro, o topo de
// cada página). Os sites de demonstração (app/demos/) ficam fora deste
// grupo: não recebem nada disto. Desde 17/10 ("o Atlas Digital", seção 2.2
// da direção), sem a luz do cursor (LuzDoCursor): o orbe de bronze sob o
// ponteiro saiu das cenas navy (a marca C14). Com ela, sai também a faixa de
// luz que passava na ação principal ao soltar o dedo (.vd-brilho no toque);
// na mesa, a faixa do hover é só CSS e fica. O componente fica, porque a
// barbearia o usa. Desde 17/10, também o caminho desta visita (CaminhoDaVisita),
// que anota cada página aberta, só na memória, para o pé das portas do início.

export default function LayoutDoAtlas({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Cabecalho />
      <main id="conteudo">{children}</main>
      <Rodape />
      <BarraDoPolegar />
      <Ancoras />
      <VidroLiquido />
      <AoTopo />
      <CaminhoDaVisita />
    </>
  );
}
