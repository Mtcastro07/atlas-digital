import Link from "next/link";

import { Envelope, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { Lide, Titulo } from "@/components/tipografia";
import { buttonVariants } from "@/components/ui/button";
import { acaoOrcamento, falarNoWhatsApp, fim, mensagens } from "@/conteudo/site";
import { linkWhatsApp } from "@/lib/whatsapp";

// A cena da chamada final (da branchCto) corre ao contrário da capa: do
// navy da página à moldura, com a luz quente embaixo, à direita.
const cenaDoFim = {
  "--cena-topo": "var(--background)",
  "--cena-base": "var(--moldura)",
  "--luz-x": "82%",
  "--luz-y": "78%",
  "--aurora-x": "10%",
  "--aurora-y": "100%",
} as React.CSSProperties;

/**
 * Chamada final, centrada, antes do rodapé, só no início. Da branchCto: a
 * cena (aurora, luz quente e grão) e um reflexo que atravessa o título a
 * cada 8 s (ambiente contínuo, pausável; app/movimento.css) — com
 * movimento reduzido, o título fica liso. A folga sob o título guarda as
 * descendentes do reflexo, que pinta só dentro da caixa do texto. A cena,
 * o grão e o reflexo saíram em 03/10 pela regra 3 das Diretrizes de Design
 * Premium e voltaram no mesmo dia, a pedido do usuário: são parte da
 * identidade do site. A ação responde como toda "Montar orçamento" do
 * site, com o hover do sistema (até 16/10, com as letras que rolam, a
 * resposta da barbearia: o crítico de fora).
 * Até 16/10, a mesma chamada fechava também Dúvidas, colada à faixa "Fim
 * do percurso": duas chamadas seguidas, cada uma com a sua pílula de
 * bronze, e o mesmo bloco em duas páginas (o crítico de fora). Dúvidas
 * termina como as outras páginas internas, na próxima página.
 */
export function Fim() {
  return (
    <Secao aria-label="Chamada final" tom="escuro" className="vd-cena vd-grao overflow-hidden text-center" style={cenaDoFim}>
      <Envelope>
        <Titulo linhas={fim.titulo} data-ambiente className="mov-reflexo mx-auto -mb-[0.1em] pb-[0.1em]" />
        <Lide className="mx-auto mt-8">{fim.lide}</Lide>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Link href={acaoOrcamento.destino} className={buttonVariants({ size: "lg" })}>
            {acaoOrcamento.rotulo}
          </Link>{" "}
          <a href={linkWhatsApp(mensagens.contato)} target="_blank" rel="noopener" className={buttonVariants({ variant: "link", size: "link" })}>
            {falarNoWhatsApp}
            <IconeSeta className="size-3.5" />
          </a>
        </div>
      </Envelope>
    </Secao>
  );
}
