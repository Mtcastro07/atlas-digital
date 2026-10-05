import Link from "next/link";

import { Envelope } from "@/components/estrutura";
import { CabecalhoRetratil } from "@/components/ilhas/cabecalho-retratil";
import { ControleDoMovimento } from "@/components/ilhas/controle-do-movimento";
import { MenuCelular } from "@/components/ilhas/menu-celular";
import { NavegacaoDoAtlas } from "@/components/ilhas/navegacao-do-atlas";
import { Logotipo } from "@/components/marca/logotipo";
import { CabecalhoFixo } from "@/components/transicao-de-pagina";
import { buttonVariants } from "@/components/ui/button";
import { acaoOrcamento, navegacao } from "@/conteudo/site";
import { cn } from "@/lib/utils";

/**
 * Cabeçalho com as medidas e a organização do site de 28/08: 72 px de
 * altura, o logotipo grande o bastante para o giro do globo se ver e três
 * colunas — marca, menu, ações —, com o menu no centro exato da página,
 * qualquer que seja a largura da marca ou do botão. A barra é uma pílula
 * de vidro líquido (da branchCto), quase transparente: flutua sobre a
 * página, e no Chromium com ponteiro fino o que passa por trás se dobra na
 * borda (ilha VidroLiquido). Ela se adapta ao que passa por trás
 * (ilhas/cabecalho-retratil.tsx): vidro escuro com texto creme sobre o
 * escuro, vidro claro com texto navy sobre o claro. A pílula sai um pouco
 * da coluna (12 px de cada lado; 16 px a partir de 768 px). No hover, cada item do menu só clareia e um traço de bronze se
 * acende embaixo (desde 03/10, a pedido do usuário: sem as letras que
 * rolavam, aqui e na ação). Recuos simétricos (03/10), na escala de 4 px
 * (regra 2): a pílula tem 52 px (h-13) e os botões, 44 px, então a ação é
 * concêntrica à pílula com 4 px de folga em cima, embaixo e à direita
 * (pr-1); e o logotipo fica à mesma distância da borda esquerda que o texto
 * do último botão da borda direita — 4 + 20 (o px-5 da ação) = 24 px a
 * partir de 1024 px (lg:pl-6); abaixo, 4 + 12 (o px-3 do botão Menu) = 16
 * px (pl-4). Até 03/10, a pílula tinha 56 px, com 6 px de folga e recuos
 * de 26 e 18 px, fora da escala. Ao lado da ação, o botão de pausa do
 * movimento contínuo (a esfera da capa, a faixa de nichos, o globo de O
 * Atlas, o reflexo da chamada final). No celular, recolhe ao rolar para
 * baixo. Desde 01/10 o site tem uma página por assunto: o cabeçalho fica
 * no layout (app/(atlas)/layout.tsx), não remonta na troca de página, e o
 * menu marca a página aberta (ilha NavegacaoDoAtlas).
 */
export function Cabecalho() {
  return (
    <CabecalhoFixo>
      <CabecalhoRetratil>
        <Envelope className="flex h-18 items-center">
          {/* O tom fica na pílula, não no <header>: lá, a regra base pintaria a faixa inteira de navy. */}
          <div
            data-tom="escuro"
            data-vidro-liquido
            data-vidro-desfoque="20"
            data-vidro-intensidade="1.8"
            className="vd-barra pointer-events-auto -mx-3 grid h-13 grow grid-cols-[1fr_auto] items-center gap-4 rounded-full pr-1 pl-4 md:-mx-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-6 lg:pl-6"
          >
            {/* No hover, o globo gira; com movimento reduzido, sem o giro, o logotipo responde em cor. */}
            <Link
              href="/"
              prefetch={false}
              aria-label="Atlas Digital — início"
              className="inline-flex min-h-11 items-center justify-self-start text-foreground transition-colors duration-300 ease-atlas motion-reduce:hover:text-accent"
            >
              <Logotipo recorte="globo-cabecalho" className="h-[31px] w-auto md:h-[34px]" decorativo />
            </Link>

            <NavegacaoDoAtlas itens={navegacao} />

            <div className="flex items-center gap-1.5 justify-self-end md:gap-2">
              <ControleDoMovimento />
              <Link href={acaoOrcamento.destino} className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}>
                {acaoOrcamento.rotulo}
              </Link>
              {/* O logotipo do painel vem pronto daqui: desenhado no servidor, sem levar o `cn` ao navegador. */}
              <MenuCelular itens={navegacao} marca={<Logotipo recorte="globo-menu" className="h-[31px] w-auto" decorativo />} />
            </div>
          </div>
        </Envelope>
      </CabecalhoRetratil>
    </CabecalhoFixo>
  );
}
