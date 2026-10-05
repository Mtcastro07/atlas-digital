import Link from "next/link";

import { Moldura } from "@/components/demos/deposito/moldura";
import { abas, atraso, Botao, BotaoWhatsApp, CodigoDeBarras, envelope, Linhas, metadadosDe, paginaDe } from "@/components/demos/deposito/pecas";
import { depositoSite as site } from "@/conteudo/demos/deposito";

export const metadata = metadadosDe("inicio");

/**
 * 00 · Início. A capa de grafite sob a luz de obra, no papel de projeto,
 * com a etiqueta da casa presa ao lado (os fatos em código, e o código de
 * barras) e a cota do endereço. Depois, o painel: as cinco páginas como
 * placas de depósito, que se acendem de laranja sob o ponteiro; a esteira
 * do metro quadrado ao caminhão; e a faixa laranja do pedido.
 */
export default function InicioDoDeposito() {
  const { capa, ficha, fatos, painel, metodo, fechoDoInicio } = site;
  return (
    <Moldura pagina="inicio">
      <section aria-labelledby="titulo" className="dp-grafite dp-luz-de-obra relative overflow-hidden">
        <span aria-hidden="true" className="dp-quadriculado absolute inset-0" />
        <div className={`${envelope} relative grid gap-14 pt-16 pb-14 lg:grid-cols-12 lg:pt-20`}>
          <div className="lg:col-span-8">
            <p className="dp-codigo dm-entra text-accent">{capa.rotulo}</p>
            <h1 id="titulo" className="dp-exibicao mt-7 text-[clamp(56px,7.8vw,124px)] leading-[0.9] font-bold">
              {capa.titulo.map((linha, i) => (
                <span key={linha} className="dm-entra block" style={atraso(80 + i * 110)}>
                  {linha}
                </span>
              ))}
            </h1>
            <p className="dm-entra mt-8 max-w-[50ch] text-[19px] leading-relaxed text-muted-foreground" style={atraso(420)}>
              {capa.lide}
            </p>
            <div className="dm-entra mt-10 flex flex-wrap gap-3" style={atraso(520)}>
              <Botao href={paginaDe("calculadora").caminho} grande>
                {capa.acaoPrincipal} →
              </Botao>
              <BotaoWhatsApp grande contorno />
            </div>
          </div>

          {/* A etiqueta da casa, presa à capa, com a sombra de 80 px a 80% (saiu em 03/10 pela regra 3 das Diretrizes de Design Premium e voltou no mesmo dia, a pedido do usuário). O chanfro (clip-path) recorta a sombra: na tela, quem destaca a etiqueta é a cal sobre o grafite. */}
          <aside aria-labelledby="ficha" className="dm-entra lg:col-span-4 lg:self-end" style={atraso(640)}>
            <div className="dp-cal dp-chanfro relative bg-card px-6 pt-10 pb-6 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.8)]">
              <span aria-hidden="true" className="dp-furo absolute top-4 left-1/2 -translate-x-1/2" />
              <p id="ficha" className="dp-codigo text-center">
                {ficha.titulo}
              </p>
              <dl className="mt-5 border-t-2 border-foreground">
                {fatos.map((f) => (
                  <div key={f.codigo} className="flex items-baseline justify-between gap-4 border-b border-border py-3">
                    <dt className="text-[14.5px] leading-snug">
                      <span className="dp-codigo mr-2 text-[10.5px] text-muted-foreground">{f.codigo}</span>
                      {f.rotulo}
                    </dt>
                    <dd className="dp-exibicao flex-none text-[34px] leading-none font-bold tabular-nums">{f.valor}</dd>
                  </div>
                ))}
              </dl>
              <CodigoDeBarras texto={ficha.codigo} className="mx-auto mt-5 w-48" />
            </div>
          </aside>
        </div>
        <div className={`${envelope} relative pb-10`}>
          <p className="dp-cota dp-codigo text-muted-foreground">{capa.cota}</p>
        </div>
      </section>

      {/* O painel: cada página do balcão como uma placa. */}
      <section aria-labelledby="painel" className="dp-quadriculado">
        <div className={`${envelope} py-24`}>
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <h2 id="painel" className="dp-exibicao text-[clamp(44px,5.6vw,88px)] leading-[0.95] lg:col-span-7">
              <Linhas linhas={painel.titulo} />
            </h2>
            <p className="text-[18px] leading-relaxed text-muted-foreground lg:col-span-4 lg:col-start-9">{painel.lide}</p>
          </div>
          <ul className="mt-14 grid border-t border-l border-foreground/30 sm:grid-cols-2 lg:grid-cols-5">
            {abas.map((aba, i) => (
              <li key={aba.id} data-revelar style={atraso(i * 80)} className="border-r border-b border-foreground/30">
                {/* No celular, a placa vira uma linha: código, nome com o resumo e a seta. */}
                <Link href={aba.caminho} className="dp-placa flex h-full items-start gap-4 p-5 sm:min-h-[300px] sm:flex-col sm:justify-between sm:gap-8 sm:p-6">
                  <span className="dp-codigo dp-placa-apaga mt-1.5 text-accent sm:mt-0">{aba.codigo}</span>
                  <span className="flex-1">
                    <span className="dp-exibicao block text-[26px] leading-none sm:text-[32px]">{aba.rotulo}</span>
                    <span className="dp-placa-apaga mt-2 block text-[15px] leading-snug text-muted-foreground sm:mt-3 sm:text-[15.5px]">{aba.resumo}</span>
                  </span>
                  <span aria-hidden="true" className="dp-placa-seta dp-exibicao self-center text-[24px] sm:self-auto">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* A esteira: do metro quadrado ao caminhão. */}
      <section aria-labelledby="metodo" className="dp-grafite">
        <div className={`${envelope} py-24`}>
          <h2 id="metodo" className="dp-exibicao text-[clamp(40px,5vw,80px)] leading-[0.95]">
            <Linhas linhas={metodo.titulo} />
          </h2>
          {/* O fio laranja corre contínuo pelas colunas: o intervalo entre elas é o recuo à direita de cada uma, menos da última de cada linha, que chega à borda do envelope (até 03/10, sobrava 40 px nela). */}
          <ol className="mt-16 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {metodo.etapas.map((etapa, i) => (
              <li
                key={etapa.nome}
                data-revelar
                style={atraso(i * 110)}
                className="relative border-t-2 border-primary pt-6 pr-10 max-sm:pr-0 sm:max-lg:even:pr-0 lg:last:pr-0"
              >
                {/* O quadrado de 12 px centrado no fio de 2 px, acima da caixa: (12 − 2) / 2 + 2 = 7 px. */}
                <span aria-hidden="true" className="absolute -top-[7px] left-0 size-3 bg-primary" />
                <p className="dp-codigo text-accent">
                  {String(i + 1).padStart(2, "0")} · {etapa.tempo}
                </p>
                <h3 className="dp-exibicao mt-6 text-[36px] leading-none">{etapa.nome}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">{etapa.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* A faixa do pedido. */}
      <section aria-labelledby="fecho" className="bg-primary text-primary-foreground">
        <div className={`${envelope} flex flex-wrap items-center justify-between gap-8 py-14`}>
          <h2 id="fecho" className="dp-exibicao max-w-[22ch] text-[clamp(32px,4vw,60px)] leading-[0.95]">
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
