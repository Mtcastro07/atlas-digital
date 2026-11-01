import { Envelope, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { Esfera } from "@/components/marca/esfera";
import { TextoRolante } from "@/components/texto-rolante";
import { Lide } from "@/components/tipografia";
import { buttonVariants } from "@/components/ui/button";
import { GradientWaveText } from "@/components/ui/spell/gradient-wave-text";
import { capa } from "@/conteudo/site";

const atraso = (ms: number) => ({ "--atraso": `${ms}ms` }) as React.CSSProperties;

/** Palavras do título, cada uma com a sua ordem, para escalonar a entrada. */
const palavrasDoTitulo = capa.titulo.split(" ");

/**
 * A capa: título centrado sobre a esfera de arame que gira (marca/esfera.tsx,
 * a assinatura do site de 28/08), a definição do slogan numa frase e as
 * duas ações. Ocupa a primeira tela inteira, como no site de 28/08. Da
 * branchCto (fusão de 01/10): o título que se compõe palavra a palavra, a
 * partir de 1024 px (no celular, parado: pinta de imediato, sem atrasar o
 * LCP); a ação magnética, com as letras que rolam. Fundo liso, do tom: o
 * anteparo da esfera, que segura o contraste do texto, é da cor do fundo.
 * Título em Archivo Black (desde 05/10, de novo, a do site de 28/08), em
 * text-display (40 a 80 px; no site de 28/08, 92 px).
 * Desde 03/10 (pedido do usuário: "enxugue", "separe a seção dos
 * celulares"), só isso: os dois celulares saíram do início (seguem na
 * vitrine de Para quem), e os destaques e a faixa de nichos foram para a
 * seção seguinte (secoes/destaques.tsx). As duas ações levam às seções da
 * própria página: o montador e os passos. Desde 03/10, o "24h" (o
 * `destaque` da capa) recebe uma onda de cor de bronze ao fim da entrada
 * (Spell UI, Gradient Wave Text: components/ui/spell/).
 */
export function Capa() {
  return (
    <Secao id="inicio" tom="escuro" className="flex min-h-[calc(100svh-72px)] items-center overflow-hidden">
      <div className="relative w-full">
        <Envelope className="mov-anteparo z-[1] text-center">
          <h1 className="mx-auto max-w-[13ch] text-display">
            {palavrasDoTitulo.map((palavra, i) => (
              <span key={i}>
                <span className="mov-janela">
                  <span className="mov-palavra" style={atraso(80 + i * 90)}>
                    {palavra === capa.destaque ? <GradientWaveText atraso={1400}>{palavra}</GradientWaveText> : palavra}
                  </span>
                </span>
                {i < palavrasDoTitulo.length - 1 && " "}
              </span>
            ))}
          </h1>
          <Lide className="mx-auto mt-8 max-w-[34ch]">{capa.lide}</Lide>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <a href={capa.acaoPrincipal.destino} data-magnetico className={buttonVariants({ size: "lg" })}>
              <TextoRolante texto={capa.acaoPrincipal.rotulo} />
            </a>
            <a href={capa.acaoSecundaria.destino} className={buttonVariants({ variant: "link", size: "link" })}>
              {capa.acaoSecundaria.rotulo}
              <IconeSeta className="size-3.5" />
            </a>
          </div>
        </Envelope>
        {/* A esfera vem depois do texto no HTML (a posição é absoluta, e o texto, em z-[1], fica por
            cima de qualquer jeito): assim ela só se desenha com o bloco de texto completo. Antes dele,
            numa carga em partes, nascia centrada num bloco ainda curto e descia 150 px (CLS 0,1). */}
        <Esfera />
      </div>
    </Secao>
  );
}
