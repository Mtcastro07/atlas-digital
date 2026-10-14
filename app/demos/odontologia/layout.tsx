import type { Viewport } from "next";

import { textoDaClinica, tituloDaClinica } from "@/components/demos/odontologia/fontes";
import { Receituario } from "@/components/demos/odontologia/receituario";
import { AbasDoProntuario } from "@/components/ilhas/demos/odontologia/abas-do-prontuario";
import { ConsultorioVivo } from "@/components/ilhas/demos/odontologia/consultorio-vivo";
import { PalcoDaArcada } from "@/components/ilhas/demos/odontologia/palco-da-arcada";
import { CabecalhoFixo } from "@/components/transicao-de-pagina";
import { barra, capa, mapa, odontologiaSite as site, paginas } from "@/conteudo/demos/odontologia";

import "./odontologia.css";

// A Odontologia Boa Viagem, site de odontologia do plano Completo no simulador, refeito pelo padrão Atlas em
// 09.10.2026 (registros/demos/odontologia/identidade.md, seção 9): o prontuário aberto sob o refletor. O layout guarda
// o que atravessa as páginas: as abas do prontuário (o cabeçalho), o palco da arcada (um canvas só, preso à tela, entre
// o fundo das cenas e o texto delas), o pé do receituário (o rodapé, com a identificação que a norma pede) e a ilha do
// consultório (as cenas, a cerâmica sob a mão, os números, a ficha).

export const viewport: Viewport = { themeColor: "#f7f6f2" };

export default function LayoutDaClinica({ children }: { children: React.ReactNode }) {
  const abas = paginas.filter((p) => p.naBarra).map(({ id, caminho, rotulo }) => ({ id, caminho, rotulo }));
  return (
    <div data-demo="odontologia" className={`od-consultorio ${tituloDaClinica.variable} ${textoDaClinica.variable}`}>
      {/* O traço do lápis: a linha que treme de leve e o grão do grafite que falha no papel (o bairro a lápis). */}
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <filter id="lapis-da-clinica" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="4" result="mao" />
          <feDisplacementMap in="SourceGraphic" in2="mao" scale="4" result="tremido" />
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="9" result="grao" />
          <feComponentTransfer in="grao" result="falhas">
            <feFuncA type="discrete" tableValues="1 0.55 1 0.8 1 0.65 1" />
          </feComponentTransfer>
          <feComposite in="tremido" in2="falhas" operator="in" />
        </filter>
      </svg>
      <CabecalhoFixo>
        <AbasDoProntuario
          nome={site.nome}
          registro={`${site.registro}.`}
          responsavel={`${barra.rt}: ${site.responsavel.nome}, ${site.responsavel.registro}.`}
          inicio={site.caminho}
          abas={abas}
          rotuloDasAbas={barra.navegacao}
          acao={site.acao.curto}
          avaliacao={paginas.find((p) => p.id === "avaliacao")!.caminho}
          indice={barra.indice}
          fechar={barra.fechar}
        />
      </CabecalhoFixo>
      <PalcoDaArcada legendas={mapa.legendas} cabeca={[capa.folha.titulo, mapa.numeracao]} />
      <main id="conteudo" tabIndex={-1} className="od-conteudo">
        {children}
      </main>
      <Receituario />
      <ConsultorioVivo />
    </div>
  );
}
