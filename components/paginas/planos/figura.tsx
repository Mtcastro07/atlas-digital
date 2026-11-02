import { faixaDePreco, planos } from "@/conteudo/planos";
import { reais } from "@/lib/moeda";

// A figura da abertura de Planos: cada página interna tem a sua, e é ela que dá a identidade da página (pedido do
// usuário, 01/10: "design único e identitário de cada uma das páginas"). Até 28/10, as cinco moravam em
// components/paginas/figuras.tsx; desde a fase 0 do R10, cada uma no arquivo da sua página.

/** A altura de cada degrau: o preço de criação dele sobre o maior (900, 1.500 e 2.400: 37,5%, 62,5% e 100%). */
const ALTURAS = planos.map((p) => p.criacao / faixaDePreco.maximo);

/**
 * Planos: a escada de preços, um gráfico verdadeiro (R10, 28/10): a altura de cada degrau é o preço de criação, na
 * proporção. A partir de 1024 px, cada degrau pousa na coluna do seu plano na tabela logo abaixo (a mesma grade de
 * quatro colunas: a primeira, dos rótulos, fica livre), e a escada sobe ao lado do título, com o Essencial 48 px abaixo
 * do lide (registros/atlas/design-v2/R10/paginas/planos.md, 3.1). Até 28/10, 46%, 70% e 100%, na metade da direita.
 * A escada de pedra ao sol da manhã (16/10): a face de cima acesa, o lado do leste claro, o do oeste em sombra; ela pousa
 * na emenda em toda largura, e a sombra de cada degrau cai no papel de baixo, na coluna dele.
 * O movimento:
 * - a entrada (desde 15/10): os degraus sobem até o corrimão, que fica parado (.mov-degrau, app/paginas/planos.css);
 * - a constante (R10): sob o ponteiro, a luz da manhã enche a pedra em dois tempos, a metade e o todo, as duas metades
 *   da criação; no toque, uma vez, no Profissional, quando a escada entra na tela (o laço contínuo reprovou no
 *   celular 4×: paginas/planos.md, 6.3);
 * - a passiva P5 (R10): o tracejado do corrimão corre escada acima, ao longo dele, um período do padrão por volta,
 *   em cinco trechos de HTML (o traço de cada trecho anda por translate dentro de uma janela que o recorta).
 * Saíram o orbe que seguia o ponteiro e a camada branca do hover. O "+ R$ 190 por mês" sobe a 16 px (decidido); no
 * celular, em duas linhas. Com a letra a 200% no celular, os degraus empilham, sem o corrimão.
 */
export function EscadaDePrecos() {
  return (
    <figure aria-label="Os três planos, do Essencial ao Completo; a altura de cada degrau é o preço de criação" className="vd-escada">
      {/* O ambiente da passiva vem do servidor: o observador de controle-do-movimento.tsx lhe dá data-visivel e data-fora. */}
      <div data-ambiente className="vd-escadaria">
        {planos.map((plano, i) => (
          // Um vínculo para o plano, logo abaixo: no celular, o quadro dele na galeria; na mesa, a tabela.
          <a
            key={plano.id}
            href={`#plano-${plano.id}`}
            data-tom="pedra"
            data-recomendado={plano.destaque || undefined}
            style={{ "--i": i, "--h": ALTURAS[i] } as React.CSSProperties}
            className="mov-degrau vd-materia vd-degrau text-foreground no-underline"
          >
            {/* A constante: a luz que enche a pedra em duas metades, e o fio da metade. */}
            <span aria-hidden="true" className="vd-degrau-luz mov-constante" />
            <span aria-hidden="true" className="vd-degrau-metade mov-constante" />
            <span className="vd-degrau-nome">{plano.nome}</span>
            <span className="vd-degrau-preco">
              <span className="vd-degrau-moeda">R$</span>{" "}
              <span className="vd-degrau-valor">{plano.criacao.toLocaleString("pt-BR")}</span>{" "}
              <span className="vd-degrau-mes">
                {/* O "+" preso ao valor: nunca sozinho no fim da linha. */}
                <span>+&nbsp;{reais(plano.mensal)}</span> <span>por mês</span>
              </span>
            </span>
          </a>
        ))}
        {/* O corrimão (P5): o traço de bronze que sobe de degrau em degrau, um trecho de cada lado do vão. */}
        <span aria-hidden="true" data-passiva="planos-corrimao" className="vd-corrimao">
          {ALTURAS.map((altura, i) => (
            <span key={i} className="vd-corrimao-coluna" style={{ "--h": altura, "--h-antes": ALTURAS[i - 1] ?? altura } as React.CSSProperties}>
              <span className="vd-corrimao-h">
                <span className="vd-corrimao-fio mov-passiva" />
              </span>
              {i > 0 && (
                <span className="vd-corrimao-v">
                  <span className="vd-corrimao-fio mov-passiva" />
                </span>
              )}
            </span>
          ))}
        </span>
      </div>
      {/* O chão: a sombra de cada degrau no papel de baixo, na coluna dele. */}
      <div aria-hidden="true" className="vd-chao-da-escada">
        {ALTURAS.map((altura, i) => (
          <span key={i} className="vd-sombra-do-degrau" style={{ "--h": altura } as React.CSSProperties} />
        ))}
      </div>
    </figure>
  );
}
