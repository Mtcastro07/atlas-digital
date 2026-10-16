import { nutricaoSite as site } from "@/conteudo/demos/nutricao";

/**
 * O recibo, a abertura de Valores (crítico de fora, 14.10.2026; até então, a página abria com o mesmo molde inerte do
 * Consultório). A folha do talão que a primeira consulta deixa para o reembolso ("Recibo com CRN para reembolso", nas
 * observações): o valor numa caixa, a linha do nome em branco, a data por preencher e, embaixo, a assinatura e o CRN. O
 * momento da página: o valor por extenso e a assinatura se escrevem, um depois do outro, uma vez, na entrada (uma janela
 * corre da esquerda para a direita sobre a tinta parada, só por transform).
 * Desde o crítico de fora de 16.10.2026, o talão inteiro: o canhoto, que fica no bloco, com a lombada, e o recibo,
 * presos pelo picote; o papel do talão, esverdeado, com a moldura impressa (até então, o papel #faf7f0 sobre a palha se
 * lia como um cartão branco à direita do título, o mesmo quadro da capa). Desde o fechamento com o Impeccable
 * (16.10.2026), depois da carta: na mesa, em pé, na coluna das observações, ao lado dela; de 640 a 1023 px, deitado,
 * com o canhoto à esquerda; no celular, em pé, o canhoto em cima. O canhoto não repete o valor (até então, "R$ 250,00"
 * no canhoto, no recibo e, como "R$ 250", na carta). Sob o ponteiro fino e no toque, o recibo se solta do canhoto pelo
 * picote, e o fio de dentro da caixa do valor acende (até 16.10.2026, só o fio, que não se via). Decorativo
 * (aria-hidden): o preço está na carta. Abaixo da dobra (no celular), a escrita espera o talão entrar na tela
 * (data-revelar, como o carimbo do mapa). Com movimento reduzido e sem script, já está preenchido. O desenho e o
 * movimento em nutricao.css.
 */
export function Recibo() {
  const r = site.recibo;
  return (
    <div aria-hidden="true" className="nt-talao" data-revelar>
      <div className="nt-canhoto">
        <p className="nt-versal nt-canhoto-numero">{r.numero}</p>
        <p className="nt-canhoto-ref">{r.canhoto}</p>
        <p className="nt-canhoto-data">
          <span className="nt-recibo-branco nt-recibo-dia" />/<span className="nt-recibo-branco nt-recibo-dia" />/2026
        </p>
      </div>
      <div className="nt-recibo">
        <div className="nt-recibo-papel">
          <div className="nt-recibo-cabeca">
            <p className="nt-exibicao nt-recibo-titulo">{r.titulo}</p>
            <p className="nt-versal nt-recibo-numero">{r.numero}</p>
            <p className="nt-exibicao nt-numeros nt-recibo-valor">{r.valor}</p>
          </div>
          <p className="nt-recibo-texto">
            {r.recebiDe} <span className="nt-recibo-branco" /> {r.importancia}{" "}
            <span className="nt-recibo-extenso">
              <span className="nt-escrita">
                <span>{r.extenso}</span>
              </span>
            </span>{" "}
            {r.referente}
          </p>
          <div className="nt-recibo-pe">
            <p className="nt-recibo-data">
              {r.data} <span className="nt-recibo-branco nt-recibo-dia" /> de <span className="nt-recibo-branco nt-recibo-mes" /> de 2026.
            </p>
            <div className="nt-recibo-firma">
              <span className="nt-recibo-rubrica">
                <span className="nt-escrita">
                  {/* A rubrica: um traço contínuo, à mão, desenhado aqui. */}
                  <svg viewBox="0 0 180 56">
                    <path d="M6 40C14 22 22 10 28 12C34 14 22 44 30 46C38 48 44 18 52 18C58 18 52 40 60 40C70 40 74 22 82 24C90 26 82 42 92 40C104 38 108 20 118 22C126 24 120 38 130 36C142 34 150 26 174 20M40 30C66 30 120 30 150 32" />
                  </svg>
                </span>
              </span>
              <p className="nt-recibo-nome">{r.assinatura}</p>
              <p className="nt-versal nt-recibo-credencial">{r.credencial}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
