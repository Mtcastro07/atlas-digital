import { Envelope, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { Esfera } from "@/components/marca/esfera";
import { Lide } from "@/components/tipografia";
import { buttonVariants } from "@/components/ui/button";
import { GradientWaveText } from "@/components/ui/spell/gradient-wave-text";
import { capa } from "@/conteudo/site";

const atraso = (ms: number) => ({ "--atraso": `${ms}ms` }) as React.CSSProperties;

// A luz da capa (16/10): a madrugada, o pico de luz do início. Fria, alta, do noroeste (no alto, à esquerda),
// caindo para o fundo, embaixo à direita; navy mais claro no mesmo matiz (--agua-rasa), sem quente. O anteparo do
// texto (app/movimento.css) é da cor da rampa na altura dele: o --meio, o mais claro que fica sob texto.
const madrugada = {
  "--cena-angulo": "155deg",
  "--cena-topo": "var(--meio)",
  "--cena-base": "var(--moldura)",
  "--aurora-x": "4%",
  "--aurora-y": "0%",
  "--luz-fria": "color-mix(in oklch, var(--agua-rasa) 85%, transparent)",
  "--luz-quente": "transparent",
  "--anteparo": "var(--meio)",
} as React.CSSProperties;

/** Palavras do título, cada uma com a sua ordem, para escalonar a entrada. */
const palavrasDoTitulo = capa.titulo.split(" ");

/**
 * A capa: título centrado sobre a esfera de arame que gira (marca/esfera.tsx,
 * a assinatura do site de 28/08), a definição do slogan numa frase e as
 * duas ações. Ocupa a primeira tela inteira, como no site de 28/08. Da
 * branchCto (fusão de 01/10): o título que se compõe palavra a palavra, a
 * partir de 1024 px (no celular, parado: pinta de imediato, sem atrasar o
 * LCP). A ação responde como toda "Montar orçamento" do site, com o
 * hover do sistema (desde 16/10: de 14 a 16/10, com o ímã e a faixa de
 * luz, enquanto a da fundação tinha só o hover e a do fim, as letras que
 * rolam; a mesma ação respondia de três jeitos na mesma página, a marca M2,
 * e o ímã e as letras são a resposta da barbearia, não a do Atlas:
 * 19-o-padrao-atlas.md, seção 6). De 16/10 em diante ("Identidade mais
 * profunda"; até então, "fundo liso, do tom"), a capa tem a luz da
 * madrugada, a matéria da água e a esfera armilar de metal, com a frente e
 * o verso e o anel graduado; o anteparo da esfera, que segura o contraste
 * do texto, é da cor da rampa na altura dele. A esfera atravessa a emenda e
 * pousa no papel dos destaques (a capa recorta só na horizontal e fica por
 * cima da seção seguinte). O ímã e a faixa de luz continuam fora.
 * Título em Archivo Black (desde 05/10, de novo, a do site de 28/08), em
 * text-display (48 a 96 px desde 16/10; de 40 a 80 até então; no site de
 * 28/08, 92 px).
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
    // No celular, 208 px de folga embaixo (contra 96 em cima) sobem o bloco 56 px, ao centro óptico: a ação principal
    // termina antes de 60% da primeira tela a 390 × 844 (até 14/10, em 66%; 07-composicao.md).
    // Desde 16/10, a capa sobe por baixo do cabeçalho de vidro, como as aberturas (-mt-18, e os 72 px dele somados ao
    // respiro de cima): com a luz, a faixa do navy liso da página aparecia atrás da barra. O bloco fica onde estava.
    <Secao
      id="inicio"
      data-sem-atalho
      tom="escuro"
      className="vd-cena relative z-[1] -mt-18 flex min-h-svh items-center overflow-x-clip pt-42 max-md:pb-52 md:pt-54"
      style={madrugada}
    >
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
            <a href={capa.acaoPrincipal.destino} className={buttonVariants({ size: "lg" })}>
              {capa.acaoPrincipal.rotulo}
            </a>{" "}
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
