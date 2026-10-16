import Link from "next/link";

import { ControleDoMovimento } from "@/components/ilhas/controle-do-movimento";

import { Moldura } from "@/components/demos/deposito/moldura";
import { abas, atraso, Botao, CaminhaoDaCasa, CodigoDeBarras, ElevacaoDaParede, envelope, Linhas, metadadosDe, MobiliaDoComodo, paginaDe } from "@/components/demos/deposito/pecas";
import { depositoSite as site } from "@/conteudo/demos/deposito";
import { formatar, listaDoServico } from "@/lib/demos/deposito/conta";

export const metadata = metadadosDe("inicio");

/**
 * 00 · Início, em cinco cenas que alternam o valor (grafite, cal, laranja,
 * grafite, laranja; o rodapé de grafite). 1 · A capa de grafite sob a luz
 * de obra, no papel de projeto, com a ficha da casa pendurada no arame (os
 * fatos em código, e o código de barras) e a cota do endereço. 2 · O
 * painel: as cinco páginas como placas de depósito, que acendem de laranja
 * sob o ponteiro. 3 · A parede, no laranja: a conta do balcão desenhada
 * como a elevação de uma prancha de projeto. 4 · A linha do metro quadrado
 * ao caminhão, com o fio esticado entre os piquetes. 5 · A faixa do pedido.
 *
 * O movimento (14.10.2026, pedido do usuário: "parecendo que você está
 * spamando os mesmos componentes"): até ali, sete peças da capa subiam da
 * opacidade 0, o título incluído, e as placas e as etapas subiam uma a uma
 * ao rolar, a mesma entrada em toda seção (M1). Agora, um momento por
 * cena, cada um do seu jeito: na capa, a luz de obra acende e a ficha
 * pendura e gira no arame até ficar de frente (e depois balança, pausável);
 * na parede, as fiadas são assentadas de baixo para cima; no método, o fio
 * se estica de piquete a piquete, um gesto só. O painel e a faixa ficam
 * quietos e respondem à mão. O texto da capa fica parado e legível desde o
 * primeiro quadro.
 *
 * 15.10.2026 (crítico de fora): a cena 3 copiava a página Calculadora (o
 * mesmo título, o mesmo lide e o mesmo cupom, parado) e deixava a página
 * inicial sem nenhuma imagem do ofício. Virou a prancha da parede, com o
 * mesmo resultado (a conta de lib/demos/deposito/conta.ts) desenhado como
 * o material: a parede de blocos e as pilhas de sacos; o cupom impresso
 * foi para a Calculadora, onde é o momento da página. A capa perdeu o
 * WhatsApp repetido (a barra já o tem), e a pausa da ficha veio para junto
 * dela. Os códigos inertes saíram do laranja.
 *
 * 16.10.2026 (crítico de fora): o painel copiava a navegação (o índice de
 * 01 a 05 pela terceira vez na página, em cinco casas iguais com a seta,
 * e a resposta mais forte do site) e, com o método, eram duas cenas sem
 * imagem. O painel virou a planta baixa da casa, cada página um lugar do
 * depósito; o método ganhou o caminhão no fim do fio e, no celular, o
 * prumo. A ação principal da capa ganhou a resposta mais forte ("o
 * refletivo acende"), e o rótulo da prancha não quebra mais com o ponto
 * solto.
 */
const comodos: Record<string, string> = {
  // A planta, na mesa: o estoque à esquerda, o balcão e a mesa do pedido no meio, o pátio à direita, a frente embaixo.
  // No celular, duas colunas (uma só abaixo de 360 px, onde "Calculadora" não cabe na metade): o estoque; o balcão e
  // o pátio lado a lado; a mesa; a frente. A ordem do documento é a das abas.
  materiais: "min-h-[200px] min-[360px]:col-span-2 lg:col-span-5 lg:row-span-2",
  calculadora: "min-h-[230px] lg:col-span-4",
  entrega: "min-h-[230px] lg:col-span-3 lg:row-span-2",
  orcamento: "min-h-[170px] min-[360px]:col-span-2 lg:col-span-4 lg:min-h-[230px]",
  "a-casa": "min-[360px]:col-span-2 lg:col-span-12",
};

export default function InicioDoDeposito() {
  const { capa, ficha, fatos, painel, calculadora, parede, metodo, fechoDoInicio } = site;
  // A parede da cena 3: o estado inicial da calculadora, pela mesma conta dela.
  const servico = calculadora.servicos[0];
  const perda = calculadora.perdas[calculadora.perdaInicial];
  const [largura, altura] = calculadora.medidas.map((m) => m.inicial);
  const area = largura * altura;
  const itens = listaDoServico(servico, area, perda.valor);
  const metros = (valor: number) => valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  // Frases curtas, unidas por ". " (até a noite de 15.10, por " · ": um período de 33 palavras, aviso da régua).
  const nota = [
    `${servico.nome}, ${formatar(area)} m²`,
    ...itens.map((item) => `${formatar(item.quantidade)} ${item.unidade}: ${item.nome}`),
    `Perda de ${perda.rotulo}, ${perda.detalhe}`,
  ].join(". ");
  return (
    <Moldura pagina="inicio">
      <section aria-labelledby="titulo" className="dp-grafite relative overflow-hidden">
        {/* A luz de obra, num plano próprio: acende na carga, como o refletor do canteiro esquentando (deposito.css). */}
        <span aria-hidden="true" className="dp-luz-de-obra absolute inset-0" />
        <span aria-hidden="true" className="dp-quadriculado absolute inset-0" />
        {/* No celular, 48 px mais curta que até 14.10 (pt-10, gap-10, mt-8): a cabeça da ficha entra na primeira tela. */}
        <div className={`${envelope} relative grid gap-10 pt-10 pb-14 lg:grid-cols-12 lg:gap-14 lg:pt-20`}>
          <div className="lg:col-span-8">
            <p className="dp-codigo text-accent">{capa.rotulo}</p>
            <h1 id="titulo" className="dp-exibicao mt-7 dp-titulo text-[clamp(56px,7.8vw,124px)] font-bold">
              {capa.titulo.map((linha) => (
                <span key={linha} className="block">
                  {linha}
                </span>
              ))}
            </h1>
            <p className="mt-8 max-w-[50ch] text-[19px] leading-relaxed text-muted-foreground">{capa.lide}</p>
            {/* Uma ação só (15.10.2026): o WhatsApp de contorno que ficava ao lado repetia o botão da barra, sempre à vista. */}
            <div className="mt-8 lg:mt-10">
              <Botao href={paginaDe("calculadora").caminho} grande principal>
                {capa.acaoPrincipal} →
              </Botao>
            </div>
          </div>

          {/* A ficha da casa, pendurada pelo furo num arame, a assinatura em CSS 3D do Profissional (14.10.2026; deposito.css, "a ficha"): três invólucros, um por tempo, a entrada (pendura e gira até ficar de frente), o ambiente (balança no arame, pausável, parado fora da tela) e a resposta à mão (gira no arame); a espessura do cartão é a face de lado. O arame fica fora dos invólucros, porque é o suporte. A sombra de 80 px a 80% (saiu em 03/10 pela regra 3 das Diretrizes de Design Premium e voltou no mesmo dia, a pedido do usuário). O chanfro (clip-path) fica na face, porque recorta e achataria o 3D; ele recorta a sombra: quem destaca a ficha é a cal sobre o grafite. */}
          {/* Abaixo de 1024 px, a ficha tem a largura de uma ficha (até 15.10, esticava a ~690 px no tablet) e fica à direita, sob o arame. A pausa do balanço fica junto da ficha, sobre o arame (até 15.10, na faixa do topo do início, onde empurrava o cabeçalho a 320 px); no celular, no vão acima dela (mt-4: 56 px de vão para o alvo de 44). */}
          <aside aria-labelledby="ficha" className="dp-ficha relative mt-4 w-full max-w-[380px] sm:ml-auto lg:col-span-4 lg:mt-0 lg:max-w-none lg:self-end">
            <span className="dp-pausa absolute -top-12 right-0 z-10">
              <ControleDoMovimento />
            </span>
            <div className="dp-ficha-pendura">
              <div className="dp-ficha-balanca" data-ambiente>
                <div className="dp-ficha-gira">
                  <div className="dp-cal dp-chanfro relative bg-card px-6 pt-10 pb-6 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.8)]">
                    <span aria-hidden="true" className="dp-furo absolute top-4 left-1/2 -translate-x-1/2" />
                    <p id="ficha" className="dp-codigo text-center">
                      {ficha.titulo}
                    </p>
                    <dl className="mt-5 border-t-2 border-foreground">
                      {fatos.map((f) => (
                        <div key={f.codigo} className="flex items-baseline justify-between gap-4 border-b border-border py-3">
                          <dt className="text-[14.5px] leading-snug">
                            <span className="dp-codigo mr-2 text-[11px] text-muted-foreground">{f.codigo}</span>
                            {f.rotulo}
                          </dt>
                          <dd className="dp-exibicao flex-none text-[34px] leading-none font-bold">{f.valor}</dd>
                        </div>
                      ))}
                    </dl>
                    <CodigoDeBarras texto={ficha.codigo} className="mx-auto mt-5 w-48" />
                  </div>
                  <span aria-hidden="true" className="dp-ficha-espessura" />
                </div>
              </div>
            </div>
            <span aria-hidden="true" className="dp-arame" />
          </aside>
        </div>
        <div className={`${envelope} relative pb-10`}>
          <p className="dp-cota dp-codigo text-muted-foreground">{capa.cota}</p>
        </div>
      </section>

      {/* 2 · O painel, a planta do balcão (16.10.2026; até ali, cinco placas iguais com o código e a seta, crítico de fora): cada página é um lugar da casa, com a parede, a porta e a mobília em traço de planta baixa (deposito.css, "a planta do balcão"). Na mesa, a cena tem a tela para si (85svh), com o conteúdo no meio. Os cômodos ficam quietos ao entrar e o piso acende à mão. */}
      <section aria-labelledby="painel" className="dp-quadriculado">
        <div className={`${envelope} py-24 lg:flex lg:min-h-[85svh] lg:flex-col lg:justify-center`}>
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <h2 id="painel" className="dp-exibicao dp-titulo text-[clamp(44px,5.6vw,88px)] lg:col-span-7">
              <Linhas linhas={painel.titulo} />
            </h2>
            <p className="text-[18px] leading-relaxed text-muted-foreground lg:col-span-4 lg:col-start-9">{painel.lide}</p>
          </div>
          <ul className="dp-planta mt-14 grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-12">
            {abas.map((aba) => (
              <li key={aba.id} className={`dp-comodo ${comodos[aba.id]}`}>
                <Link
                  href={aba.caminho}
                  className={`flex h-full gap-5 p-4 sm:p-6 ${aba.id === "a-casa" ? "flex-col sm:flex-row sm:items-end sm:justify-between" : "flex-col justify-between pb-14 sm:pb-16"}`}
                >
                  <MobiliaDoComodo
                    id={aba.id}
                    className={`text-foreground/55 ${aba.id === "a-casa" ? "w-full max-w-[300px] sm:order-last" : "ml-auto w-[72%] max-w-[220px]"}`}
                  />
                  <span className={aba.id === "a-casa" ? "sm:max-w-[60%]" : ""}>
                    <span className="dp-exibicao block text-[21px] leading-none sm:text-[30px]">{aba.rotulo}</span>
                    <span className="mt-2 block text-[14.5px] leading-snug text-muted-foreground sm:mt-3 sm:text-[15.5px]">{aba.resumo}</span>
                  </span>
                </Link>
                {/* A porta tem 44 px: o texto do cômodo fica acima dela (pb-14, 56 px; até a conferência de 16.10, o arco passava por cima do resumo). */}
                {aba.id !== "a-casa" && <span aria-hidden="true" className="dp-porta-planta text-foreground" />}
                {/* A marca de entrar, ao lado da porta, no traço da mobília (16.10.2026, Impeccable): a seta de acesso da planta baixa, que diz, em repouso e no celular, que o cômodo se abre. */}
                {aba.id !== "a-casa" && (
                  <svg viewBox="0 0 12 22" aria-hidden="true" className="dp-entrar text-foreground/55">
                    <path d="M6 21V2M1.5 6.5 6 2l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 · A parede (15.10.2026): a conta do balcão como o material que ela pede, em sangria total no laranja, com a tinta grafite em todo texto (5,1:1 sobre os pixels). À direita, a prancha de projeto: a elevação da parede de 4,80 × 2,70 m, bloco por bloco, as pilhas de sacos, as cotas e a nota com a lista (a mesma conta da calculadora, lib/demos/deposito/conta.ts). O momento da cena: as fiadas são assentadas de baixo para cima, uma vez, quando a prancha entra na tela (a prancha leva o data-revelar, com a pose anulada; a pose é de cada fiada, em deposito.css). */}
      <section aria-labelledby="parede" className="dp-cena-parede overflow-hidden bg-primary text-primary-foreground">
        <div className={`${envelope} grid items-center gap-12 py-20 lg:min-h-[85svh] lg:grid-cols-12 lg:gap-14 lg:py-24`}>
          <div className="lg:col-span-5">
            <h2 id="parede" className="dp-exibicao dp-titulo text-[clamp(52px,6vw,88px)]">
              <span className="block">{parede.titulo}</span>
              {/* A unidade fica em minúscula (o "M" de caixa-alta é mega); os números não se separam da unidade. */}
              <span className="block">
                {metros(largura)} × {metros(altura)}
                {"\u00a0"}
                <span className="normal-case">m</span>.
              </span>
            </h2>
            <p className="mt-8 max-w-[40ch] text-[19px] leading-relaxed">{parede.lide}</p>
            <Link href={paginaDe("calculadora").caminho} className="dp-vinculo dp-exibicao mt-8 inline-flex min-h-11 items-center text-[22px] tracking-[0.05em]">
              {parede.acao}
            </Link>
          </div>
          <figure data-revelar className="dp-prancha dp-cal dp-quadriculado bg-card p-3 text-card-foreground shadow-[0_30px_60px_-30px_rgb(21_25_30/0.5)] sm:p-4 lg:col-span-7">
            {/* A margem da prancha, como no papel de desenho técnico. */}
            <div className="border border-foreground/50 p-4 sm:p-6">
              {/* O rótulo em trechos que não se partem (16.10.2026, crítico de fora: a 390 px, o "·" ficava solto no fim da linha e o EGH caía sozinho numa terceira; deposito.css, .dp-segmentos). */}
              <div className="overflow-hidden">
                <p aria-hidden="true" className="dp-codigo dp-segmentos -ml-[1.6em] flex flex-wrap gap-y-1 text-muted-foreground">
                  {parede.rotulo.split(" · ").map((trecho) => (
                    <span key={trecho}>{trecho}</span>
                  ))}
                  <span>{site.codigo}</span>
                </p>
                <p className="sr-only">
                  {parede.rotulo} · {site.codigo}
                </p>
              </div>
              <ElevacaoDaParede largura={largura} altura={altura} itens={itens} className="mt-4" />
              <figcaption className="dp-mono mt-4 border-t border-foreground/50 pt-3 text-[12.5px] leading-relaxed">
                <span className="dp-codigo mr-2 text-[11px]">{parede.nota}</span>
                {nota}.
              </figcaption>
            </div>
          </figure>
        </div>
      </section>

      {/* 4 · A linha do metro quadrado ao caminhão. Na mesa, a cena tem a tela para si (85svh). Desde 16.10.2026 (crítico de fora: só texto e fio), o caminhão da casa no fim da linha: na mesa, à direita do título, sobre o fim do fio; abaixo de 1024 px, depois da última etapa. */}
      <section aria-labelledby="metodo" className="dp-grafite">
        <div className={`${envelope} grid py-24 lg:min-h-[85svh] lg:grid-cols-12 lg:content-center`}>
          <h2 id="metodo" className="dp-exibicao dp-titulo text-[clamp(40px,5vw,80px)] lg:col-span-7 lg:self-end">
            <Linhas linhas={metodo.titulo} />
          </h2>
          <CaminhaoDaCasa className="mt-10 max-w-[340px] max-lg:order-last lg:col-span-4 lg:col-start-9 lg:mt-0 lg:max-w-[420px] lg:self-end lg:justify-self-end" />
          {/* O fio laranja corre contínuo pelas colunas: o intervalo entre elas é o recuo à direita de cada uma, menos da última de cada linha, que chega à borda do envelope (até 03/10, sobrava 40 px nela). Desde 14.10, "a linha de pedreiro esticada entre os piquetes": o fio é um traço próprio por etapa (.dp-fio), sobre a borda, que fica transparente e guarda o espaço; os quadrados são os piquetes, parados. Desde 15.10, o data-revelar fica na lista inteira, que tem área (até ali, em cada <li>: no celular, a mesma revelação quatro vezes seguidas, crítico de fora); a pose é do fio (deposito.css). Na mesa, os quatro trechos correm em sequência, 140 ms cada (--atraso); abaixo de 1024 px, os quatro juntos. */}
          {/* Abaixo de 640 px, o prumo (16.10.2026): o fio na vertical, à esquerda, e as etapas mais juntas (deposito.css, "o método"); o piquete no alto de cada uma, centrado no fio de 2 px: (12 − 2) / 2 = 5 px para a esquerda. */}
          <ol data-revelar className="dp-metodo mt-16 grid gap-y-12 max-sm:mt-12 max-sm:gap-y-0 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
            {metodo.etapas.map((etapa, i) => (
              <li
                key={etapa.nome}
                style={atraso(i * 140)}
                className="relative border-t-2 border-transparent pt-6 pr-10 max-sm:border-t-0 max-sm:pt-0 max-sm:pr-0 max-sm:pb-9 max-sm:pl-8 max-sm:last:pb-0 sm:max-lg:even:pr-0 lg:last:pr-0"
              >
                <span aria-hidden="true" className="dp-fio" />
                {/* O quadrado de 12 px centrado no fio de 2 px, acima da caixa: (12 − 2) / 2 + 2 = 7 px. */}
                <span aria-hidden="true" className="absolute -top-[7px] left-0 size-3 bg-primary max-sm:top-1 max-sm:-left-[5px]" />
                <p className="dp-codigo text-muted-foreground">
                  {String(i + 1).padStart(2, "0")} · {etapa.tempo}
                </p>
                <h3 className="dp-exibicao mt-6 text-[36px] leading-none max-sm:mt-3 max-sm:text-[30px]">{etapa.nome}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground max-sm:mt-2.5">{etapa.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 · A faixa do pedido, o fecho, como estava. */}
      <section aria-labelledby="fecho" className="bg-primary text-primary-foreground">
        <div className={`${envelope} flex flex-wrap items-center justify-between gap-8 py-14`}>
          <h2 id="fecho" className="dp-exibicao dp-titulo max-w-[22ch] text-[clamp(32px,4vw,60px)]">
            {fechoDoInicio.titulo}
          </h2>
          {/* Botão de grafite sobre o laranja: com os tokens do painel de grafite (.dp-grafite), o véu do hover e o contorno do foco saem na cor clara. Até 03/10, os dois saíam no grafite do próprio fundo e não se viam. */}
          <Link
            href={paginaDe("orcamento").caminho}
            className="dp-grafite dp-chanfro dp-botao dp-exibicao inline-flex min-h-14 items-center gap-3 px-8 text-[18px] tracking-[0.05em]"
          >
            {fechoDoInicio.acao} →
          </Link>
        </div>
      </section>
    </Moldura>
  );
}
