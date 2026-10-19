"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { IconeWhatsApp } from "@/components/icones";
import { mensagens } from "@/conteudo/contato";
import { aoVivo } from "@/lib/ambiente";
import { escritaDoInstante, rascunho } from "@/lib/prazo";
import { relogio } from "@/lib/sol";
import { linkWhatsApp } from "@/lib/whatsapp";

/** Deslocamento mínimo, em px, para contar como mudança de direção (o mesmo do cabeçalho). */
const FOLGA = 6;

const prazoDeAgora = () => escritaDoInstante(rascunho(relogio()), false);

/**
 * A barra do polegar (desde 18/10, o passe do celular da direção final do Atlas Digital, seção 4, item 2; substitui o
 * atalho do WhatsApp, ilhas/acao-flutuante.tsx, que saiu): no celular e no tablet (some a partir de 1024 px; na mesa,
 * nenhuma barra fixa), uma pílula de tela presa ao pé, com dois campos de conteúdo: o prazo, "Rascunho até dom. 18/10,
 * 18:28" (o número que vende, ao alcance do polegar, em Inter 600 tabular e sem os segundos: 24 horas corridas,
 * lib/prazo.ts), e a pílula do WhatsApp. Sem rótulo em caixa-alta, sem mono, sem ponto médio: duas linhas.
 * Quando aparece: depois de 60% da primeira tela (a abertura de cada página fica limpa), só ao rolar para cima, como o
 * cabeçalho (ilhas/cabecalho-retratil.tsx), e nunca com algo marcado com [data-sem-atalho] na tela: as cenas que já
 * mostram o prazo ou a ação (a capa; as ações da fundação, só elas desde 18/10, e não a cena inteira; o Fim; a folha
 * das 72 h e as etapas de /o-trabalho; e os dois montadores, o da seção do orçamento do início e o de /orcamento).
 * Até 18/10, o atalho ficava à vista ao rolar para os dois lados; a barra tem 60 px e cobriria a leitura.
 * O pé de toda página já guarda o respiro dela (o pb-28 do rodapé, maior que a barra com a área segura).
 * O prazo: o servidor não sabe que horas são, e o HTML traz "Rascunho até amanhã, a esta hora", frase completa e
 * verdadeira; depois de montar, o valor vivo vai aria-hidden, e o leitor de tela ouve a frase inteira no texto escondido.
 * Muda a cada minuto por aoVivo (lib/ambiente.ts: só na tela, parado com a pausa e com movimento reduzido) e se relê a
 * cada volta da barra (com movimento reduzido, o minuto não corre sozinho; a volta é resposta ao gesto). Sem script,
 * a barra fica oculta.
 */
export function BarraDoPolegar() {
  const caminho = usePathname();
  const barra = useRef<HTMLElement>(null);
  const [livre, setLivre] = useState(false);
  const [longe, setLonge] = useState(false);
  const [descendo, setDescendo] = useState(false);
  const [prazo, setPrazo] = useState<string | null>(null);

  // As marcas da página aberta: a cada troca de página, observa as da página nova. A primeira leitura do
  // IntersectionObserver informa também o que está fora da tela (a página aberta no meio, por âncora).
  useEffect(() => {
    const naTela = new Set<Element>();
    const alvos = [...document.querySelectorAll("[data-sem-atalho]")];
    setLivre(alvos.length === 0);
    const observador = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (e.isIntersecting) naTela.add(e.target);
        else naTela.delete(e.target);
      }
      setLivre(naTela.size === 0);
    });
    alvos.forEach((alvo) => observador.observe(alvo));
    return () => observador.disconnect();
  }, [caminho]);

  useEffect(() => {
    let anterior = window.scrollY;
    let quadro = 0;
    const ler = () => {
      quadro = 0;
      const y = window.scrollY;
      setLonge(y > window.innerHeight * 0.6);
      const delta = y - anterior;
      if (Math.abs(delta) < FOLGA) return;
      anterior = y;
      setDescendo(delta > 0);
    };
    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(ler);
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    // A página aberta já rolada (a âncora): a posição se lê sem esperar um gesto.
    aoRolar();
    return () => {
      window.removeEventListener("scroll", aoRolar);
      cancelAnimationFrame(quadro);
    };
  }, []);

  const visivel = livre && longe && !descendo;

  useEffect(() => {
    setPrazo(prazoDeAgora());
    return aoVivo(barra.current!, () => setPrazo(prazoDeAgora()), 60_000);
  }, []);
  useEffect(() => {
    if (visivel) setPrazo(prazoDeAgora());
  }, [visivel]);

  return (
    <section ref={barra} aria-label="O prazo e o WhatsApp" data-tom="escuro" data-visivel={visivel || undefined} className="vd-polegar">
      <p className="vd-polegar-prazo">
        <span className="vd-polegar-rotulo">Rascunho até</span>{" "}
        {prazo === null ? (
          <span className="vd-polegar-valor">amanhã, a esta hora</span>
        ) : (
          <>
            {/* A data e a hora não se partem por dentro: com a letra grande, a quebra cai depois da vírgula. */}
            <span className="vd-polegar-valor" aria-hidden="true">
              <span>{prazo.split(", ")[0]},</span> <span>{prazo.split(", ")[1]}</span>
            </span>
            <span className="sr-only">{prazo}, se o briefing completo fechar agora.</span>
          </>
        )}
      </p>
      <a href={linkWhatsApp(mensagens.flutuante)} target="_blank" rel="noopener" className="vd-metal vd-polegar-acao">
        <IconeWhatsApp className="vd-polegar-icone" />
        <span className="vd-polegar-nome">WhatsApp</span>
      </a>
    </section>
  );
}
