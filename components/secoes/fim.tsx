import Link from "next/link";

import { Envelope, Secao } from "@/components/estrutura";
import { IconeSeta } from "@/components/icones";
import { ProximoAmanhecer } from "@/components/ilhas/proximo-amanhecer";
import { Lide, Titulo } from "@/components/tipografia";
import { buttonVariants } from "@/components/ui/button";
import { acaoOrcamento, falarNoWhatsApp, figuras, fim, mensagens } from "@/conteudo/site";
import { linkWhatsApp } from "@/lib/whatsapp";

/**
 * Chamada final, centrada na mesa, antes do rodapé, só no início. Da branchCto: a
 * cena (aurora, luz quente e grão) e um reflexo que atravessa o título a
 * cada 8 s (ambiente contínuo, pausável; app/movimento.css) — com
 * movimento reduzido, o título fica liso. A folga sob o título guarda as
 * descendentes do reflexo, que pinta só dentro da caixa do texto. A cena,
 * o grão e o reflexo saíram em 03/10 pela regra 3 das Diretrizes de Design
 * Premium e voltaram no mesmo dia, a pedido do usuário: são parte da
 * identidade do site. Em 17/10, a direção final do Atlas Digital pediu de
 * novo a saída do reflexo (a marca C5); o aprovador decide, e, até lá, ele
 * fica, porque foi pedido do usuário (decisão por omissão). A ação responde
 * como toda "Montar orçamento" do site, com o hover do sistema (até 16/10,
 * com as letras que rolam, a resposta da barbearia: o crítico de fora).
 * Desde 17/10 (passe 4b), o amanhecer é o horizonte (app/vidro.css,
 * .vd-amanhecer): o céu, da noite ao navy mais claro, a linha do horizonte e
 * o mar fundo embaixo. A luz que sobe do horizonte é navy mais claro, no
 * mesmo matiz; o quente é só um fio sólido sobre o horizonte, onde o sol vai
 * nascer. Até o passe 4b, a luz quente baixa a leste era o bronze em alfa
 * baixo sobre o navy, e a cena se lia como uma névoa cinza-parda no canto
 * (o fechamento com o Impeccable; a marca C14 do kit). Desde o segundo
 * fechamento (17/10), o mar com 4 rem (até então, a 80% da cena na mesa e a
 * 9 rem do pé no celular: uma faixa escura vazia de 180 a 290 px antes do
 * rodapé).
 * Desde 17/10 (a direção final do Atlas Digital, seção 3, item 8), a hora
 * real no amanhecer pintado: sob as ações, a leitura "O próximo amanhecer em
 * Niterói: amanhã, às 5h18, calculado neste aparelho." (Inter 15, tabular;
 * ilhas/proximo-amanhecer.tsx), e o horizonte de hoje: o Sol em pontos, o fio
 * quente e a luz que sobe ficam no azimute real do próximo nascer, e não mais
 * ao meio. O Sol é o único ponto da cena (a água fica com o grão), e não
 * pulsa: muda de lugar de um dia para o outro. Era o vazio de ~300 px de
 * navy entre a ação e o horizonte (o fechamento com o Impeccable, A, P3):
 * agora, o céu que leva ao Sol. Desde a revisão de 17/10, a leitura diz
 * também o lado do nascer ("a 11° ao sul do leste"), e a cena tem a altura
 * da tela só até 56 rem: nas telas altas (1920 × 1080), a ação centrada
 * ficava a ~350 px do Sol, o mesmo vazio de antes; com o teto, ~250 px, como
 * a 1440 × 900.
 * Desde 18/10 (o passe do celular, seção 4 da direção), abaixo de 1024 px, a
 * cena alinhada à esquerda, como o resto do site no celular (até então,
 * centrada, com o lide de duas linhas ao centro), e a leitura do amanhecer
 * deixa de ser provisória sob as ações: desce para o mar, sob o horizonte e
 * o Sol, como na mesa, em três linhas de leitura (o rótulo, o instante, o
 * lado e o carimbo). O mar tem a altura da leitura (--mar, medida pela ilha;
 * app/digital.css), e nenhum texto pousa sobre o desenho. Do tablet à mesa
 * estreita (768 a 1023 px, e o celular deitado), desde a revisão de 18/10, o
 * bloco da leitura fica sob o Sol, no azimute do nascer, e não na margem.
 * Até 16/10, a mesma chamada fechava também Dúvidas, colada à faixa "Fim
 * do percurso": duas chamadas seguidas, cada uma com a sua pílula de
 * bronze, e o mesmo bloco em duas páginas (o crítico de fora). Dúvidas
 * termina como as outras páginas internas, na próxima página.
 */
export function Fim() {
  return (
    // Na mesa, a altura da tela (16/10), até 56 rem (17/10): o amanhecer fecha a noite que a capa abriu. A matéria da água vem da Secao
    // (até 16/10, o grão só aqui, .vd-grao, com as bordas apagadas por máscara).
    // O pé maior que o alto: o texto fica no céu, acima do horizonte e da luz que sobe dele.
    // O pé: o mar (4 rem) mais a luz que sobe do horizonte (app/vidro.css, --subida), para o texto ficar acima dela.
    // data-sem-atalho (17/10, segundo fechamento): o "Falar no WhatsApp" da cena já está à vista, e o atalho o cobria.
    // Abaixo de 1024 px (desde 18/10, o passe do celular), sem pé: a leitura do amanhecer é o fim da cena, no mar.
    <Secao aria-label="Chamada final" data-sem-atalho tom="escuro" className="vd-amanhecer overflow-hidden pb-0 md:pb-0 lg:flex lg:min-h-[min(100svh,56rem)] lg:items-center lg:pb-[calc(4rem+20svh)] lg:text-center">
      <Envelope>
        <Titulo linhas={fim.titulo} data-ambiente className="mov-reflexo -mb-[0.1em] pb-[0.1em] lg:mx-auto" />
        <Lide className="mt-8 lg:mx-auto">{fim.lide}</Lide>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-center">
          <Link href={acaoOrcamento.destino} className={buttonVariants({ size: "lg" })}>
            {acaoOrcamento.rotulo}
          </Link>{" "}
          <a href={linkWhatsApp(mensagens.contato)} target="_blank" rel="noopener" className={buttonVariants({ variant: "link", size: "link" })}>
            {/* Abaixo de 1024 px, o rótulo e a seta numa linha de texto, à esquerda, como no carimbo da fundação (18/10): com a
                letra a 200%, a quebra ficava centrada e a seta, solta na borda. Na mesa, display: contents, como antes. */}
            <span className="max-lg:text-left lg:contents">
              {falarNoWhatsApp}
              <IconeSeta className="size-3.5 max-lg:ml-2 max-lg:inline" />
            </span>
          </a>
        </div>
        <ProximoAmanhecer lugar={figuras.coordenadas.decimal} {...fim.amanhecer} />
      </Envelope>
    </Secao>
  );
}
