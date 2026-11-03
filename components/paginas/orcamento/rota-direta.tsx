import { montador, rota } from "@/conteudo/paginas/orcamento";

/** A rota direta (R10, 28/10; D12): a frase e o caminho da mensagem, do aparelho direto ao WhatsApp. */
export function RotaDireta() {
  return (
    <div className="orc-rota">
      <div>
        <h2 className="orc-rota-titulo">{rota.titulo}</h2>
        <p className="mt-4 max-w-[46ch] text-muted-foreground">{rota.texto}</p>
      </div>
      {/* O caminho da mensagem (a passiva P20): sem parada no meio. O texto ao lado diz o mesmo. */}
      <div className="orc-caminho" data-ambiente data-passiva="orcamento-caminho" aria-hidden="true">
        <span>{rota.origem}</span>
        <span className="orc-caminho-fio">
          <span className="orc-caminho-balao mov-passiva">{montador.mensagem}</span>
        </span>
        <span>{rota.destino}</span>
      </div>
    </div>
  );
}
