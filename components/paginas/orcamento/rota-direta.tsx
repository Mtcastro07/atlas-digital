import { Trecho } from "@/components/codigo/trecho";
import { montador, rota } from "@/conteudo/paginas/orcamento";
import { linhasDo, trechoDe } from "@/lib/trecho";

/**
 * A rota direta (R10, 28/10; D12): a frase e o código que a prova. As linhas 4 e 5 de lib/whatsapp.ts, lidas no
 * build (lib/trecho.ts), com o comentário literal, "Nada passa por servidor.", no bronze-sombra (o valor do negócio);
 * a legenda faz a precisão ("sem passar por um servidor deste site"). Na ficha lisa, no papel (o recipiente único).
 * Só no servidor: trechoDe lê o arquivo.
 */
export function RotaDireta() {
  const zap = trechoDe("lib/whatsapp.ts", "/** Endereço wa.me com a mensagem já escrita. Nada passa por servidor. */", 2);
  return (
    <div className="orc-rota">
      <div>
        <h2 className="orc-rota-titulo">{rota.titulo}</h2>
        <p className="mt-4 max-w-[46ch] text-muted-foreground">{rota.texto}</p>
      </div>
      {/* O caminho da mensagem (a passiva P20): do aparelho direto ao WhatsApp, sem parada no meio. O texto ao lado diz o mesmo. */}
      <div className="orc-caminho" data-ambiente data-passiva="orcamento-caminho" aria-hidden="true">
        <span>{rota.origem}</span>
        <span className="orc-caminho-fio">
          <span className="orc-caminho-balao mov-passiva">{montador.mensagem}</span>
        </span>
        <span>{rota.destino}</span>
      </div>
      <Trecho
        trecho={zap}
        tintas={[
          ["Nada passa por servidor.", "valor"],
          ["export function", "chave"],
          ["string", "chave"],
        ]}
        legenda={
          <>
            {rota.traducao} <span className="orc-rota-fonte">{rota.fonte(zap.arquivo, linhasDo(zap))}</span>
          </>
        }
      />
    </div>
  );
}
