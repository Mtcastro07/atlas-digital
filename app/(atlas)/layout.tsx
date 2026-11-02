import { AcaoFlutuante } from "@/components/ilhas/acao-flutuante";
import { AoTopo } from "@/components/ilhas/ao-topo";
import { Ancoras } from "@/components/ilhas/ancoras";
import { LuzDoCursor } from "@/components/ilhas/luz-do-cursor";
import { VidroLiquido } from "@/components/ilhas/vidro-liquido";
import { Cabecalho } from "@/components/secoes/cabecalho";
import { Rodape } from "@/components/secoes/rodape";
// As @font-face dos nichos no CSS comum, sem baixar fonte nenhuma (preload: false): só /para-quem as usa, e a folha nova
// entrando na troca para lá recalculava o documento (R10, depois da crítica, 01/11: o A/B de 4 contra 5 batidas).
import "@/components/nichos/fontes";

// As páginas do site do Atlas (o grupo "(atlas)" não entra no endereço).
// Desde 01/10, a pedido do usuário, cada assunto tem a sua página:
// início, para quem, planos, orçamento, o trabalho, o Atlas e dúvidas. O
// layout guarda o que atravessa as páginas — o cabeçalho de vidro, o
// rodapé, a ação flutuante do WhatsApp — e as ilhas que delegam ou que
// refazem a leitura a cada página (luz do cursor e botão magnético,
// âncoras, refração do vidro, o topo de cada página, desde 27/10). Os
// sites de demonstração (app/demos/) ficam fora deste grupo: não recebem
// nada disto.

export default function LayoutDoAtlas({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Cabecalho />
      <main id="conteudo">{children}</main>
      <Rodape />
      <AcaoFlutuante />
      <LuzDoCursor />
      <Ancoras />
      <VidroLiquido />
      <AoTopo />
    </>
  );
}
