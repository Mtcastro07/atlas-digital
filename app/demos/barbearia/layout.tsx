import type { Viewport } from "next";

import { corpoDaBarbearia, exibicaoDaBarbearia } from "@/components/demos/barbearia/fontes";
import { capitulos, Monograma, paginaDe } from "@/components/demos/barbearia/pecas";
import { Rodape } from "@/components/demos/barbearia/rodape";
import { ToqueDaCasa } from "@/components/demos/barbearia/toque";
import { CabecalhoFixo } from "@/components/transicao-de-pagina";
import { BarraDaBarbearia } from "@/components/ilhas/demos/barra-da-barbearia";
import { CenaDeRolagem } from "@/components/ilhas/demos/cena-de-rolagem";
import { Palco3D } from "@/components/ilhas/demos/palco-3d";
import { Revelacao } from "@/components/ilhas/demos/revelacao";
import { LuzDoCursor } from "@/components/ilhas/luz-do-cursor";
import { barbeariaSite as site, fichas } from "@/conteudo/demos/barbearia";

import "./barbearia.css";

// A Barbearia Santa Rosa, site do plano Completo: sete páginas, com
// navegação no cliente. O layout guarda o que atravessa as páginas: o
// palco 3D (a ficha em cena vira na da página nova), a barra de navegação
// constante e o rodapé com o índice dos capítulos; e as ilhas que refazem
// a leitura a cada página (revelação, cenas de rolagem) ou que delegam
// (luz do cursor: o orbe da cena de couro; o ímã do botão da capa; desde
// 16/10, o toque, que marca a peça sob o dedo por 500 ms).

export const viewport: Viewport = { themeColor: "#0b0908" };

export default function LayoutDaBarbearia({ children }: { children: React.ReactNode }) {
  return (
    <div data-demo="barbearia" className={`min-h-dvh ${exibicaoDaBarbearia.variable} ${corpoDaBarbearia.variable}`}>
      <Palco3D fichas={fichas} />
      <CabecalhoFixo>
        <BarraDaBarbearia
          marca={<Monograma className="size-12 flex-none" />}
          nome={site.nome}
          inicio={site.caminho}
          paginas={capitulos.map(({ id, caminho, numero, rotulo }) => ({ id, caminho, numero, rotulo }))}
          acao={site.acao}
          acaoCurta={site.acaoCurta}
          agendar={paginaDe("agendar").caminho}
        />
      </CabecalhoFixo>
      <main id="conteudo">{children}</main>
      <Rodape />
      <Revelacao />
      <CenaDeRolagem />
      <LuzDoCursor />
      <ToqueDaCasa />
    </div>
  );
}
