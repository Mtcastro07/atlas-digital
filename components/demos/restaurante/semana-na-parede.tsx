import Link from "next/link";

import { daCasa, SetaDeGiz } from "@/components/demos/restaurante/casa";
import { lousa, nomeDoDia, pratosDoDia, quadroDaSemana as textos } from "@/conteudo/demos/restaurante";
import type { Dia } from "@/lib/demos/relogio";
import { real } from "@/lib/demos/restaurante/pedido";

const DE_SEGUNDA_A_SABADO: readonly Dia[] = [1, 2, 3, 4, 5, 6];

/**
 * A semana na parede: a lousa do salão em tamanho de parede, de ponta a ponta, entre a moldura de madeira e a calha do
 * giz (a mesma assinatura da capa, noutra escala). Os seis dias escritos a giz, com o prato e o preço a giz amarelo;
 * o de hoje com o nome em amarelo e a volta a giz em torno (o amarelo marca o hoje e o preço, nada mais). Os dias já
 * estão escritos quando a cena chega; o momento dela é a volta a giz em torno de hoje, quando o dia de hoje chega à tela
 * (o gatilho, data-cena, fica nele, e não na seção, que entra na tela pelo título). Cada dia é um item, e a resposta
 * dele é a do giz: sob o ponteiro (e no toque, [data-tocado]), a seta de giz aponta o dia, e o nome dele passa do giz
 * apagado ao giz cheio, como a mão que o reforça (o tique é da caneta, no papel; o pedido de 14.10.2026; a seta, desde
 * o crítico de fora, no mesmo dia: só o giz cheio quase não se via).
 */
export function SemanaNaParede({ hoje }: { hoje: Dia }) {
  return (
    <section aria-labelledby="semana" className="rs-cena rs-parede">
      <div className="rs-parede-lousa">
        <div className="rs-largura rs-parede-miolo">
          <header className="rs-parede-cabeca">
            <h2 id="semana" className="rs-giz rs-titulo-de-cena">
              {textos.titulo}
            </h2>
          </header>
          <ol className="rs-parede-dias">
            {DE_SEGUNDA_A_SABADO.map((d) => {
              const prato = pratosDoDia[d]!;
              const eHoje = d === hoje;
              return (
                <li key={d} className="rs-dia" data-toque data-hoje={eHoje || undefined} data-cena={eHoje ? "semana" : undefined} aria-current={eHoje ? "date" : undefined}>
                  <p className="rs-giz rs-dia-nome">
                    {nomeDoDia[d]}
                    {eHoje && <span className="sr-only">, {textos.hoje}</span>}
                    <SetaDeGiz />
                  </p>
                  <p className="rs-giz rs-dia-prato">{prato.curto}</p>
                  <p className="rs-giz rs-dia-preco">
                    {real(prato.preco)}
                    <span className="rs-dia-porcao">{prato.porcao}</span>
                  </p>
                  {eHoje && (
                    <svg aria-hidden="true" className="rs-volta-de-giz" viewBox="0 0 200 120" preserveAspectRatio="none">
                      <path d="M34 6 C 92 1, 162 2, 186 9 C 199 16, 199 96, 190 109 C 168 119, 46 119, 13 111 C 2 100, 1 28, 9 13 C 16 4, 70 3, 112 5" />
                    </svg>
                  )}
                </li>
              );
            })}
          </ol>
          <p className="text-center">
            <Link href={daCasa("cozinha").caminho} className="rs-risco-de-giz">
              {textos.ver}
            </Link>
          </p>
        </div>
      </div>
      <div aria-hidden="true" className="rs-calha rs-calha-da-parede">
        <span className="rs-calha-giz" />
        <span className="rs-calha-giz" data-cor="amarelo" />
        <span className="rs-calha-apagador" />
      </div>
    </section>
  );
}
