import { HorarioDaCasa } from "@/components/demos/barbearia/estado-da-casa";
import { BotaoDeLatao, cena, envelope, MapaDeSantaRosa, metadadosDe, paginaDe, palcoVazio, textoEmbaixo, TituloQueSeCompoe, VinculoDeFio } from "@/components/demos/barbearia/pecas";
import { TiltCard } from "@/components/ui/spell/tilt-card";
import { barbeariaSite as site } from "@/conteudo/demos/barbearia";

export const metadata = metadadosDe("onde");

/**
 * 06 · Onde. A placa da rua à esquerda; à direita, o endereço e o
 * horário, com a linha de hoje marcada pelo ponto de latão e o estado ao
 * vivo sob a tabela (desde 14/10). Embaixo, o mapa do bairro, que se
 * levanta da mesa e desenha as ruas ao rolar, com o monograma caindo no
 * lugar (CSS 3D). A abertura pinta parada. Correção de 14/10, depois do
 * crítico de fora: sem o rótulo "06 · Onde" acima do título (o número já
 * está na barra), e o mapa largo, que cabe na tela da mesa (MapaDeSantaRosa).
 */
export default function PaginaDoEndereco() {
  const { local } = site;
  return (
    <div>
      {/* No celular (desde 16/10; o crítico de fora: a mesma moldura da capa e de A casa), a placa da rua fica na quina:
          maior, deslocada para a esquerda e cortada pela borda, como a placa na parede da esquina. */}
      <section aria-labelledby="titulo" {...cena("onde", "esquerda")} className={`relative flex min-h-[105vh] items-center pt-32 pb-16 max-lg:overflow-x-clip ${textoEmbaixo}`}>
        <span
          aria-hidden="true"
          data-lugar
          className="absolute top-[27svh] left-[30%] aspect-[2.16/1.4] w-[min(92vw,54svh)] -translate-x-1/2 -translate-y-1/2 lg:hidden"
        />
        <div className={`${envelope} grid w-full lg:grid-cols-12`}>
          <div className="lg:col-span-6 lg:col-start-7">
            <TituloQueSeCompoe id="titulo" linhas={local.titulo} className="text-[clamp(64px,8vw,136px)] leading-[0.88]" />
            <address className="mt-10 text-[20px] leading-relaxed not-italic">
              {site.endereco}
              <br />
              <span className="text-muted-foreground">{site.bairro}</span>
            </address>
            {/* Desde 16/10: o endereço é fictício (número 000), e o caminho leva à busca do bairro no OpenStreetMap. */}
            <div className="mt-2">
              <VinculoDeFio href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(site.bairro)}`} detalhe={local.comoChegar.detalhe} externo>
                {local.comoChegar.rotulo}
              </VinculoDeFio>
            </div>
            <HorarioDaCasa horarios={local.horarios} expediente={site.expediente} />
            <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-muted-foreground">
              {local.referencia}
            </p>
            <div className="mt-10">
              <BotaoDeLatao href={paginaDe("agendar").caminho}>
                {site.acao}
              </BotaoDeLatao>
            </div>
          </div>
        </div>
      </section>
      {/* palcoVazio (desde 16/10, o Impeccable): na mesa, a placa da rua se apaga quando o mapa sobe a um quarto da tela; antes, a borda do mapa a cortava. */}
      <section aria-label="Mapa de Santa Rosa" {...palcoVazio} className="bg-deep">
        <div className={`${envelope} py-24`}>
          {/* A cena mede a caixa, que não gira; o mapa, dentro, herda o --p. Medido no
              próprio mapa, o giro empurrava a caixa projetada para o pé da janela, e o
              mapa só começava a se levantar quando já devia estar de pé. */}
          <div data-cena data-toque style={{ "--p": 1 } as React.CSSProperties} className="bb-mapa overflow-hidden rounded-[32px] border border-border">
            {/* A planta cede à mão (desde 15/10): o TiltCard do Spell UI, como está, até 3°. Desde 16/10, sob a mão e no
                toque, a Rua Mário Viana acende em latão, o caminho até a casa (barbearia.css, .bb-rua-da-casa); até então,
                no toque, só a compressão de 0,985, que não se via. */}
            <TiltCard limite={3} className="bb-mapa-inclina">
              <div className="bb-mapa-3d aspect-[4/5] sm:aspect-[2/1]">
                <MapaDeSantaRosa />
              </div>
            </TiltCard>
          </div>
        </div>
      </section>
    </div>
  );
}
