import { seloDoRecomendado } from "@/conteudo/planos";

/**
 * A etiqueta "Recomendado" do Profissional (R10, fase 0, S4; D15), uma só no site: na cabeça da coluna e dentro do
 * "Escolher" de /planos, e na opção do Profissional do montador (/orcamento e o início). Navy #0f2a47 com a letra no
 * bronze-brilho #f1d3a1 (10,10:1), Inter 600 a 16 px, em pílula; a mesma cor em qualquer tom. Dentro de um botão ou
 * vínculo, quem a usa dá ao controle o nome acessível com a palavra ("Escolher o Profissional, recomendado"). O texto
 * vem de conteudo/planos.ts, e não de conteudo/site.ts: o montador, que é ilha, não leva o site.ts ao navegador.
 */
export function EtiquetaRecomendado({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full bg-[#0f2a47] px-3 py-0.5 font-sans text-base font-semibold tracking-normal text-[#f1d3a1] ${className ?? ""}`}>
      {seloDoRecomendado}
    </span>
  );
}
