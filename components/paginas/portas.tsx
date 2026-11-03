import Link from "next/link";

import { Abertura, Envelope, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { DESENHOS } from "@/components/paginas/inicio/desenhos";
import { paginasInternas, portas } from "@/conteudo/site";

/**
 * O índice do início: as seis páginas como portas. Desde 28/10 (R10, D9), o índice com desenho: uma linha por
 * página, com a miniatura do objeto dela (components/paginas/inicio/desenhos.tsx), o nome a 36 px na coluna de 3 de 12
 * (a regra A9: o rótulo em até ¼), o dado dentro da frase (`porta.frase`: "Três públicos: comércio de bairro, …",
 * com o número por extenso, e o de Dúvidas da conta das perguntas) e a seta, porque a linha leva a outra página. O
 * vínculo é a linha inteira, com a frase no nome acessível. A resposta é a do sistema (.vd-acende: a luz da folha, o
 * nome em bronze, a seta que anda; app/vidro.css).
 * Até 28/10, a folha dobrada em seis painéis, com o dado em número e palavra e o resumo (a grade de cartões iguais
 * com número grande e unidade, as marcas L2 e L3 de 11-anti-ia.md, 7.1), e o lide que descrevia a grade, que saiu.
 * Desde 02/11 (acabamento), sem as listras e com a luz que corre pelas linhas.
 * No celular (D19), a galeria de deslizar, consertada (app/vidro.css, .vd-galeria): um quadro por porta, centrado e
 * encaixado, com o trilho; a folha aberta em tira, os quadros encostados. Na mesa e no tablet, a folha de través, com
 * as dobras (app/paginas/inicio.css, .inicio-folha).
 */
export function Portas() {
  return (
    <Secao aria-labelledby="portas" tom="claro">
      <Envelope>
        <Abertura margem titulo={portas.titulo}>
          <span id="portas" className="sr-only">
            {portas.rotulo}
          </span>
        </Abertura>
        <div data-ambiente data-passiva="inicio-indice" className="vd-galeria-quadro inicio-indice mt-14 md:mt-18" style={{ "--galeria-polegar": 1 / paginasInternas.length } as React.CSSProperties}>
          <ul className="vd-galeria inicio-folha">
            {paginasInternas.map((pagina, i) => {
              const Desenho = DESENHOS[pagina.id];
              return (
                <li key={pagina.id}>
                  <Link href={pagina.caminho} className="vd-acende inicio-linha">
                    {Desenho && <Desenho />}
                    <span className="inicio-linha-nome vd-acende-nome font-sub text-numero font-medium tracking-[-0.024em]">{pagina.menu}</span>{" "}
                    <span className="inicio-linha-frase text-corpo text-muted-foreground">{pagina.porta.frase}</span>
                    <IconeSeta className="vd-acende-seta size-[18px] text-accent" />
                  </Link>
                  {/* A leitura do índice (a passiva P28): a luz passa de linha em linha. */}
                  <span aria-hidden="true" className="inicio-linha-luz mov-passiva" style={{ "--vez": i } as React.CSSProperties} />
                </li>
              );
            })}
          </ul>
          <div aria-hidden="true" className="vd-galeria-trilho" />
        </div>
      </Envelope>
    </Secao>
  );
}
