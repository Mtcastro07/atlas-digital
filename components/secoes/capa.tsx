import { Envelope } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { MostradorDoPrazo } from "@/components/ilhas/mostrador-do-prazo";
import { FraseDoGiro, LeituraDoSol, TerraEmDoisEstados } from "@/components/ilhas/terra-em-dois-estados";
import { Esfera } from "@/components/marca/esfera";
import { Lide } from "@/components/tipografia";
import { buttonVariants } from "@/components/ui/button";
import { GradientWaveText } from "@/components/ui/spell/gradient-wave-text";
import { capa, figuras } from "@/conteudo/site";
import { REGRA_DO_RASCUNHO } from "@/lib/prazo";

const atraso = (ms: number) => ({ "--atraso": `${ms}ms` }) as React.CSSProperties;

// A luz da capa (desde 17/10, a direção final do Atlas Digital, seção 2.3; com o aprovador, por omissão): o crepúsculo
// calculado, no lugar da madrugada simbólica de 16/10. Na tela, a luz é a rampa lisa (app/vidro.css, "a tela lisa"): o
// pico baixo, à esquerda, do lado do Sol que se põe (o oeste, como na Terra ao lado), e o fundo da noite à direita.
const crepusculo = { "--luz-x": "0%", "--luz-y": "78%", "--angulo": "96deg" } as React.CSSProperties;

/** As linhas do título, como no esboço da direção ("Sua empresa / online / em 24h"), palavra a palavra para a entrada. */
const LINHAS = (() => {
  const palavras = capa.titulo.split(" ");
  return [palavras.slice(0, 2), palavras.slice(2, 3), palavras.slice(3)];
})();

/**
 * A capa do início. Desde 17/10 (a direção final do Atlas Digital, seções 2.5, 2.6 e 3, itens 1 e 2), uma tela inteira
 * recortada no papel (.vd-tela), assimétrica (com o aprovador, por omissão: no lugar da capa centrada de 28/08): o
 * título, o lide e as duas ações nas colunas da esquerda, e embaixo o mostrador do prazo (ilhas/mostrador-do-prazo.tsx);
 * à direita, a esfera armilar de metal com a Terra em dois estados (o dia em gravura de bronze pela incidência real do
 * Sol, a noite em pontos, a fronteira no crepúsculo de agora; ilhas/terra-em-dois-estados.tsx), que sangra pelo pé, e o
 * anel graduado, que atravessa a borda da tela e continua no papel (a travessia), com a legenda da Terra embaixo dele,
 * no papel, como a de uma prancha. A seção de fora pinta o papel sem data-tom: o primeiro [data-tom] da página é a
 * tela, que o cabeçalho lê (como na AberturaDePagina, forma "tela"). O Envelope ficou em 1.120 px (decisão do
 * aprovador, por omissão): a Terra se mede por 0,36 da altura da tela (a reserva da seção 2.5).
 * No celular (desde 18/10, o passe do celular), o h1 em 44 px a 390 (seção 4, item 1), e a esfera menor, inteira na
 * largura e vista de mais alto (app/digital.css, "a capa"); desde a revisão do mesmo dia, as ações numa linha e os vãos
 * menores, para a metade de cima da Terra entrar na primeira tela.
 * Fica o que vinha de antes: o h1 de 96 px, que se compõe palavra a palavra a partir de 1024 px (da branchCto, fusão
 * de 01/10; no celular, parado, sem atrasar o LCP), a onda de bronze no "24h" (desde 03/10; decisão do aprovador, por
 * omissão, 17/10: fica, porque foi pedido do usuário; a direção recomenda tirar, a marca T1), o lide e as duas ações,
 * que levam ao montador e aos passos. O halo da esfera também fica, sem o bronze e sem o pulso (marca/esfera.tsx).
 * Saem a esfera de arame que girava (mov-meridiano), a máscara do título sobre a esfera (o anteparo), a Terra em pontos
 * atrás do título e a leitura de 12 px no pé ("meridiano central", que media a animação: o fechamento com o
 * Impeccable, A, P1). De 28/08 a 17/10, a capa centrada, com o título sobre a esfera de arame; de 16 a 17/10, na luz da
 * madrugada, com a esfera pousando no papel dos destaques.
 */
export function Capa() {
  const { decimal, latitude, longitude } = figuras.coordenadas;
  return (
    // -mt-18: a capa sobe por baixo do cabeçalho de vidro (os 72 px dele); a tela começa a 12 px do topo (8 no celular).
    // flow-root: a margem de cima da tela não escapa pela seção. data-sem-atalho: o atalho do WhatsApp some aqui.
    <section id="inicio" data-sem-atalho aria-labelledby="titulo-capa" className="vd-capa relative -mt-18 flow-root [background:var(--fibra),var(--nevoa)]">
      <div data-tom="escuro" className="vd-tela vd-capa-tela" style={crepusculo}>
        <Envelope className="vd-capa-texto">
          <h1 id="titulo-capa" className="text-display max-md:text-[length:min(2.75rem,11.25vw)]">
            {LINHAS.map((linha, l) => (
              <span key={l} className="block">
                {linha.map((palavra, i) => {
                  const ordem = LINHAS.slice(0, l).flat().length + i;
                  return (
                    <span key={palavra}>
                      <span className="mov-janela">
                        <span className="mov-palavra" style={atraso(80 + ordem * 90)}>
                          {palavra === capa.destaque ? <GradientWaveText atraso={1400}>{palavra}</GradientWaveText> : palavra}
                        </span>
                      </span>{" "}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>
          <Lide className="vd-capa-lide max-w-[30ch]">{capa.lide}</Lide>
          {/* No celular, as duas ações numa linha a partir de 390 px, como no esboço (15 px, a pílula mais estreita e o
              vínculo sem a seta): empilhadas, elas empurravam a Terra para a segunda dobra. Quebrada (a letra a 200%),
              a linha do vínculo fica à esquerda, e não centrada. */}
          <div className="vd-capa-acoes flex flex-wrap items-center gap-x-8 gap-y-4 max-md:gap-x-3.5 max-md:gap-y-2">
            <a href={capa.acaoPrincipal.destino} className={`${buttonVariants({ size: "lg" })} max-md:px-4 max-md:text-[0.9375rem]`}>
              {capa.acaoPrincipal.rotulo}
            </a>{" "}
            <a href={capa.acaoSecundaria.destino} className={`${buttonVariants({ variant: "link", size: "link" })} max-md:text-left max-md:text-[0.9375rem]`}>
              {capa.acaoSecundaria.rotulo}
              <IconeSeta className="size-3.5 max-md:hidden" />
            </a>
          </div>
          <MostradorDoPrazo rotulo={capa.mostrador.rotulo} antes={capa.mostrador.antes} carimbo={REGRA_DO_RASCUNHO} />
        </Envelope>
        {/* A esfera vem depois do texto no HTML (o Tab passa pelas ações antes do globo) e fica atrás dele (z-0). */}
        <div className="vd-capa-palco">
          <TerraEmDoisEstados
            lugar={decimal}
            nome="Niterói"
            detalhe={[`${latitude} ${longitude}`, capa.terra.fonte]}
            rotulo={capa.terra.controle}
            legenda="legenda-da-terra"
            atras={<Esfera camada="atras" />}
            frente={<Esfera camada="frente" />}
          />
        </div>
      </div>
      {/* O papel sob a tela: o anel que atravessa a borda (a travessia) e a legenda da Terra, sob ele. */}
      <div className="vd-capa-pe">
        <div aria-hidden="true" className="vd-capa-travessia">
          <div className="vd-esfera-caixa">
            <Esfera camada="papel" />
          </div>
        </div>
        <p id="legenda-da-terra" data-tom="claro" className="vd-legenda-de-carta vd-capa-legenda">
          <strong>{capa.terra.titulo}</strong> {capa.terra.legenda} <LeituraDoSol lugar={decimal} antes={capa.terra.solAntes} />{" "}
          <FraseDoGiro girando={capa.terra.giro} parado={capa.terra.parado} />
        </p>
      </div>
    </section>
  );
}
