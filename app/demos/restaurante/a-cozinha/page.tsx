import { Agata, daCasa, metadadosDaCasa, SetaDeGiz } from "@/components/demos/restaurante/casa";
import { LousaPendurada } from "@/components/demos/restaurante/lousa-pendurada";
import { SetasDaGaleria } from "@/components/ilhas/demos/setas-da-galeria";
import { capa, cozinhaPagina as textos, lousa, nomeDoDia, pratosDoDia, restauranteSite as casa } from "@/conteudo/demos/restaurante";
import { horaDeNiteroi, type Dia } from "@/lib/demos/relogio";
import { real } from "@/lib/demos/restaurante/pedido";

export const metadata = metadadosDaCasa("cozinha");

const DE_SEGUNDA_A_SABADO: readonly Dia[] = [1, 2, 3, 4, 5, 6];

/**
 * A cozinha: a parede de azulejo verde, com a lousa grande, onde a página está escrita a giz (o título e o que a feira
 * decide), e embaixo as seis lousas da semana, penduradas uma a uma nos ganchos de uma régua de madeira quando a fila
 * chega à tela (o momento desta página), na galeria de deslizar do Profissional, que abre no dia de hoje; as setas são
 * os pregos da parede. As lousinhas não inclinam e têm a calha nua (a peça que inclina e a calha com o giz são da lousa
 * grande); cada uma é um item na lousa, que responde como o dia da semana do início: a seta de giz aponta o dia. No pé,
 * no papel, o pedido.
 */
export default function ACozinha() {
  const hoje = horaDeNiteroi().dia;
  const hojeTem = pratosDoDia[hoje];
  return (
    <>
      <section aria-labelledby="titulo" className="rs-abertura rs-parede-verde rs-cozinha">
        <div className="rs-largura">
          <LousaPendurada className="rs-cozinha-lousa">
            <div className="rs-cozinha-lousa-miolo">
              <h1 id="titulo" className="rs-giz rs-cozinha-titulo">
                {daCasa("cozinha").titulo}
              </h1>
              <p className="rs-cozinha-lide">{textos.lide}</p>
            </div>
          </LousaPendurada>
          <div className="rs-setas-da-fila">
            <SetasDaGaleria alvo="lousas-da-semana" rotulos={[textos.setas.anterior, textos.setas.proximo]} />
          </div>
        </div>
        <ol data-galeria="lousas-da-semana" data-ate-hoje data-cena="fila" aria-label={textos.rotuloDaFila} className="rs-fila-de-lousas" tabIndex={0}>
          {DE_SEGUNDA_A_SABADO.map((d, ordem) => {
            const prato = pratosDoDia[d]!;
            return (
              <li key={d} data-toque data-hoje={d === hoje || undefined} aria-current={d === hoje ? "date" : undefined} style={{ "--ordem": ordem } as React.CSSProperties}>
                <LousaPendurada miuda>
                  <p className="rs-lousinha-dia">
                    {d === hoje ? lousa.hoje(nomeDoDia[d]) : nomeDoDia[d]}
                    <SetaDeGiz />
                  </p>
                  <p className="rs-giz rs-lousinha-prato">{prato.nome}</p>
                  <p className="rs-lousinha-preco">
                    {real(prato.preco)}
                    <small>{prato.porcao}</small>
                  </p>
                </LousaPendurada>
              </li>
            );
          })}
        </ol>
      </section>
      <section aria-labelledby="pedir" className="rs-largura rs-cozinha-fim">
        <h2 id="pedir" className="rs-titulo-de-cena">
          {hojeTem ? `${lousa.hoje(nomeDoDia[hoje])}: ${hojeTem.curto}` : lousa.domingo}
        </h2>
        <p className="rs-cozinha-fim-acoes">
          <Agata rotulo={hojeTem ? capa.pedirODia : casa.acao.whatsapp} mensagem={hojeTem ? capa.mensagemDoDia(hojeTem.nome) : undefined} className="rs-agata-grande rs-agata-principal" />
          <Agata rotulo={capa.montar} href={daCasa("pedido").caminho} className="rs-agata-contorno" />
        </p>
      </section>
    </>
  );
}
