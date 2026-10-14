import type { Metadata } from "next";
import Link from "next/link";

import { IconeWhatsApp } from "@/components/icones";
import { whatsappFicticio, whatsappVisivel } from "@/conteudo/demos/comum";
import { paginas, restauranteSite as casa, type IdDaPagina } from "@/conteudo/demos/restaurante";
import { vinculoDoWhatsapp } from "@/lib/demos/restaurante/pedido";

// O que toda página do salão usa: a página pelo id, os metadados, o botão de ágata (a ação), o telefone e o endereço.
// A forma de cada um está em app/demos/restaurante/restaurante.css.

export const daCasa = (id: IdDaPagina) => paginas.find((p) => p.id === id)!;

/** O título, a descrição com o aviso de ficção, o endereço canônico e o cartão de compartilhamento. */
export function metadadosDaCasa(id: IdDaPagina): Metadata {
  const p = daCasa(id);
  const cartao = { url: `${casa.caminho}/compartilhar.jpg`, width: 1200, height: 630, alt: `${casa.nome}: ${p.titulo}. Site de demonstração.` };
  const descricao = `${p.descricao} Estabelecimento fictício.`;
  return {
    title: id === "inicio" ? `${casa.nome} · demonstração` : `${p.titulo} · ${casa.nome} · demonstração`,
    description: descricao,
    alternates: { canonical: p.caminho },
    openGraph: { type: "website", locale: "pt_BR", siteName: casa.nome, url: p.caminho, title: p.titulo, description: descricao, images: [cartao] },
    twitter: { card: "summary_large_image", title: p.titulo, description: descricao, images: [cartao.url] },
  };
}

/**
 * O botão de ágata: a louça esmaltada branca de borda verde (a ação principal do salão). Com `mensagem`, abre o
 * WhatsApp com ela, em nova aba; com `href`, é um vínculo da casa. `miuda`: a versão da porta de vidro.
 */
export function Agata({
  rotulo,
  mensagem,
  href,
  miuda = false,
  className = "",
}: {
  rotulo: string;
  mensagem?: string;
  href?: string;
  miuda?: boolean;
  className?: string;
}) {
  const classe = `rs-agata${miuda ? " rs-agata-miuda" : ""} ${className}`;
  if (href) {
    return (
      <Link href={href} className={classe}>
        <span className="rs-agata-texto">{rotulo}</span>
      </Link>
    );
  }
  return (
    <a href={vinculoDoWhatsapp(whatsappFicticio, mensagem ?? casa.acao.mensagem)} target="_blank" rel="noopener noreferrer" className={classe}>
      <IconeWhatsApp className="size-[1.1em] flex-none" />
      <span className="rs-agata-texto">{rotulo}</span>
      <span className="sr-only">{casa.novaAba}</span>
    </a>
  );
}

/** "Ou ligue: (21) 90000-0000", com o pontilhado do cardápio como vínculo (na lousa, o risco de giz). */
export function Ligue({ className = "", naLousa = false }: { className?: string; naLousa?: boolean }) {
  return (
    <a href={`tel:+${whatsappFicticio}`} className={`${naLousa ? "rs-risco-de-giz" : "rs-pontilhado"} ${className}`}>
      <span>
        {casa.telefone.rotulo}&nbsp;<span className="whitespace-nowrap">{whatsappVisivel}</span>
      </span>
    </a>
  );
}

/** O endereço em três linhas, numa linha só, e o vínculo do OpenStreetMap no ponto da casa. */
export const endereco = {
  linhas: () => {
    const e = casa.endereco;
    return [`${e.logradouro}, ${e.numero}`, `${e.bairro}, ${e.cidade} – ${e.uf}`, `CEP ${e.cep}`];
  },
  numaLinha: () => endereco.linhas().join(", "),
  noMapa: () => `https://www.openstreetmap.org/?mlat=${casa.ponto.latitude}&mlon=${casa.ponto.longitude}#map=18/${casa.ponto.latitude}/${casa.ponto.longitude}`,
};
