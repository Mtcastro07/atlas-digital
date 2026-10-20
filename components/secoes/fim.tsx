import Link from "next/link";

import { Envelope, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { Lide, Titulo } from "@/components/tipografia";
import { buttonVariants } from "@/components/ui/button";
import { acaoOrcamento, falarNoWhatsApp, fim, mensagens } from "@/conteudo/site";
import { linkWhatsApp } from "@/lib/whatsapp";

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
 * Desde 17/10 (passe 4b), o amanhecer é o horizonte (app/vidro.css,
 * .vd-amanhecer): o céu, da noite ao navy mais claro, a linha do horizonte e
 * o mar fundo embaixo. A luz que sobe do horizonte é navy mais claro, no
 * mesmo matiz; o quente é só um fio sólido sobre o horizonte, onde o sol vai
 * nascer. Até o passe 4b, a luz quente baixa a leste era o bronze em alfa
 * baixo sobre o navy, e a cena se lia como uma névoa cinza-parda no canto
 * (o fechamento com o Impeccable; a marca C14 do kit). Desde o segundo
 * fechamento (17/10), o mar com 4 rem (até então, a 80% da cena na mesa e a
 * 9 rem do pé no celular: uma faixa escura vazia de 180 a 290 px antes do
 * rodapé) e o sol ao meio, sob a ação principal (até então, a 77%).
 * Até 16/10, a mesma chamada fechava também Dúvidas, colada à faixa "Fim
 * do percurso": duas chamadas seguidas, cada uma com a sua pílula de
 * bronze, e o mesmo bloco em duas páginas (o crítico de fora). Dúvidas
 * termina como as outras páginas internas, na próxima página.
 */
export function Fim() {
  return (
    // Na mesa, a altura da tela (16/10): o amanhecer fecha a noite que a capa abriu. A matéria da água vem da Secao
    // (até 16/10, o grão só aqui, .vd-grao, com as bordas apagadas por máscara).
    // O pé maior que o alto: o texto fica no céu, acima do horizonte e da luz que sobe dele.
    // O pé: o mar (4 rem) mais a luz que sobe do horizonte (app/vidro.css, --subida), para o texto ficar acima dela.
    // data-sem-atalho (17/10, segundo fechamento): o "Falar no WhatsApp" da cena já está à vista, e o atalho o cobria.
    <Secao aria-label="Chamada final" data-sem-atalho tom="escuro" className="vd-amanhecer overflow-hidden pb-40 text-center md:pb-44 lg:flex lg:min-h-svh lg:items-center lg:pb-[calc(4rem+20svh)]">
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
