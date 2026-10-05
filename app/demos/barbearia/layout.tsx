import type { Viewport } from "next";

import { corpoDaBarbearia, exibicaoDaBarbearia } from "@/components/demos/barbearia/fontes";
import { capitulos, Monograma, paginaDe } from "@/components/demos/barbearia/pecas";
import { Rodape } from "@/components/demos/barbearia/rodape";
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
// (luz do cursor, botões magnéticos).

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
          agendar={paginaDe("agendar").caminho}
        />
      </CabecalhoFixo>
      <main id="conteudo">{children}</main>
      <Rodape />
      <Revelacao />
      <CenaDeRolagem />
      <LuzDoCursor />
    </div>
  );
}
