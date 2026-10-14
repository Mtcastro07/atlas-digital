import type { Metadata } from "next";

import { IconeWhatsApp } from "@/components/icones";
import { whatsappFicticio, whatsappVisivel } from "@/conteudo/demos/comum";
import { MapaDosDentes } from "@/components/demos/odontologia/mapa-dos-dentes";
import { mapa, odontologiaSite as site, paginas, type IdDaPagina } from "@/conteudo/demos/odontologia";
import { dentes, type RegiaoId } from "@/lib/demos/odontologia/dentes";
import { vinculoDoWhatsapp } from "@/lib/demos/odontologia/mensagem";

// As peças comuns às páginas da Odontologia Boa Viagem (o prontuário sob o refletor; identidade, seção 9): os
// metadados, a ação de cerâmica, o telefone a lápis, o monograma, a identificação da clínica que a norma pede em
// toda página (Código de Ética Odontológica, art. 43), os dentes de cada região e a âncora da arcada.

export const paginaDe = (id: IdDaPagina) => paginas.find((p) => p.id === id)!;

/**
 * Título, descrição, endereço canônico e cartão de compartilhamento de cada página, com o aviso de ficção. O cartão
 * (public/demos/odontologia/compartilhar.jpg, 1200 × 630) é a primeira tela da capa com a placa em 3D, fotografada
 * sem o estado ao vivo: o aberto ou fechado de agora não fica congelado numa imagem.
 */
export function metadadosDe(id: IdDaPagina): Metadata {
  const pagina = paginaDe(id);
  const titulo = id === "inicio" ? `${site.nome} · demonstração` : `${pagina.titulo} · ${site.nome} · demonstração`;
  const descricao = `${pagina.descricao} Estabelecimento fictício.`;
  const cartao = { url: `${site.caminho}/compartilhar.jpg`, width: 1200, height: 630, alt: `${site.nome}: ${pagina.titulo}. Site de demonstração.` };
  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: pagina.caminho },
    openGraph: { type: "website", locale: "pt_BR", siteName: site.nome, url: pagina.caminho, title: pagina.titulo, description: descricao, images: [cartao] },
    twitter: { card: "summary_large_image", title: pagina.titulo, description: descricao, images: [cartao.url] },
  };
}

/**
 * A ação principal, a peça de cerâmica: o WhatsApp com a mensagem pronta, em nova aba (o rótulo para o leitor de tela
 * diz isso). A luz que acende por dentro é o CSS (.od-ceramica).
 */
export function AcaoWhatsApp({ rotulo = site.acao.rotulo, mensagem = site.acao.mensagem, className = "" }: { rotulo?: string; mensagem?: string; className?: string }) {
  return (
    <a href={vinculoDoWhatsapp(whatsappFicticio, mensagem)} target="_blank" rel="noopener noreferrer" className={`od-ceramica ${className}`}>
      <IconeWhatsApp className="od-ceramica-icone" />
      <span>{rotulo}</span>
      <span className="sr-only">{site.novaAba}</span>
    </a>
  );
}

/** "A recepção atende no (21) 90000-0000", a lápis; o número não quebra (o fictício dos exemplos). */
export function Telefone({ className = "" }: { className?: string }) {
  return (
    <a href={`tel:+${whatsappFicticio}`} className={`od-lapis ${className}`}>
      <span>
        {site.telefone.rotulo} <span className="whitespace-nowrap">{whatsappVisivel}</span>
      </span>
    </a>
  );
}

/**
 * O monograma da clínica: as iniciais na fonte do título, dentro da casa da ficha (o quadrado), com o traço reto do lápis
 * embaixo, que sublinha (a curva lia como um sorriso, o clichê que a identidade veda). O letreiro provisório: o
 * briefing não tem logotipo; nunca se redesenha o de um cliente sem contrato.
 */
export function Monograma({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <rect x="2" y="2" width="44" height="44" rx="7" fill="var(--card)" stroke="var(--foreground)" strokeWidth="1.2" />
      <text x="24" y="27.5" textAnchor="middle" fill="var(--foreground)" style={{ fontFamily: "var(--font-od-titulo)", fontSize: 15, fontWeight: 650, letterSpacing: "-0.02em" }}>
        {site.monograma}
      </text>
      <path d="M15.5 33.4l17.2-.5" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** A identificação completa: a clínica, o registro e o responsável técnico, com a profissão. */
export function Identificacao({ className = "" }: { className?: string }) {
  const r = site.responsavel;
  return (
    <p className={className}>
      {site.oQueFaz}, <span className="whitespace-nowrap">{site.registro}</span>. {r.rotulo}: {r.nome}, {r.profissao},{" "}
      <span className="whitespace-nowrap">{r.registro}</span>.
    </p>
  );
}

/** O endereço em linhas: a rua; o bairro e a cidade; o CEP. */
export const enderecoEmLinhas = () => {
  const e = site.endereco;
  return [`${e.logradouro}, ${e.numero}`, `${e.bairro}, ${e.cidade} – ${e.uf}`, `CEP ${e.cep}`];
};
export const enderecoEmLinha = () => enderecoEmLinhas().join(", ");

/** "Ver no mapa": navegação para o mapa do OpenStreetMap no ponto da clínica (nenhum mapa embutido, nenhum pedido externo). */
export const vinculoDoMapa = () =>
  `https://www.openstreetmap.org/?mlat=${site.ponto.latitude}&mlon=${site.ponto.longitude}#map=18/${site.ponto.latitude}/${site.ponto.longitude}`;

/** Os dentes das regiões, na numeração FDI, em faixas seguidas ("11–13, 21–23"), tirados do mapa. */
export function dentesDas(regioes: readonly RegiaoId[]) {
  const n = dentes
    .filter((d) => regioes.includes(d.regiao))
    .map((d) => d.fdi)
    .sort((a, b) => a - b);
  const faixas: string[] = [];
  for (let i = 0; i < n.length; ) {
    let j = i;
    while (j + 1 < n.length && n[j + 1] === n[j] + 1) j++;
    faixas.push(i === j ? `${n[i]}` : `${n[i]}–${n[j]}`);
    i = j + 1;
  }
  return faixas.join(", ");
}

/**
 * A âncora da arcada (o palco: components/ilhas/demos/odontologia/palco-da-arcada.tsx): a caixa onde a placa de
 * cerâmica se desenha nesta cena, com a pose (inclina, lado, zoom: somados aos da placa em repouso) e a região
 * (`regiao`, uma ou mais, separadas por espaço). Dentro, a reserva: o mapa dos dentes em traço, à vista sem script,
 * sem WebGL e até o palco acender.
 */
export function Ancora({ className = "", regiao, inclina, lado, zoom }: { className?: string; regiao?: string; inclina?: number; lado?: number; zoom?: number }) {
  return (
    <div aria-hidden="true" data-arcada data-regiao={regiao || undefined} data-inclina={inclina} data-lado={lado} data-zoom={zoom} className={`od-ancora ${className}`}>
      <MapaDosDentes ativas={regiao ? (regiao.split(" ") as RegiaoId[]) : []} legendas={mapa.legendas} className="od-reserva" />
    </div>
  );
}
