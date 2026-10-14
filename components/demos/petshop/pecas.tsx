import type { Metadata } from "next";
import Link from "next/link";

import { IconeWhatsApp } from "@/components/icones";
import { vinculoDoWhatsapp, whatsappFicticio, whatsappVisivel } from "@/conteudo/demos/comum";
import { expediente, mensagemPronta, paginas, petshopSite as site, type IdDaPagina } from "@/conteudo/demos/petshop";
import { diasJuntos } from "@/lib/demos/relogio";

// As peças comuns às páginas do Banho e Tosa São Francisco (o cartão do balcão; identidade, seção 4.3): os metadados, o
// carimbo da ação, o vínculo impresso, o telefone, o endereço, o horário em linha, o impresso com relevo e verniz, a
// luz da porta e a régua de leitura. Componentes de servidor: o que responde à mão vem do CSS (petshop.css) e da ilha
// do balcão (components/ilhas/demos/petshop/balcao.tsx), que lê os atributos data-bt-*.

export const paginaDe = (id: IdDaPagina) => paginas.find((p) => p.id === id)!;

/**
 * Título, descrição, endereço canônico e cartão de compartilhamento de cada página, com o aviso de ficção. O cartão
 * (public/demos/petshop/compartilhar.jpg, 1200 × 630) é a frente do cartão: a primeira tela da capa, parada; o mesmo em
 * toda página, e o texto alternativo descreve a imagem, não a página (porta da mesa, 14.10.2026).
 */
export function metadadosDe(id: IdDaPagina): Metadata {
  const pagina = paginaDe(id);
  const titulo = id === "inicio" ? `${site.nome} · demonstração` : `${pagina.titulo} · ${site.nome} · demonstração`;
  const descricao = `${pagina.descricao} Estabelecimento fictício.`;
  const cartao = { url: `${site.caminho}/compartilhar.jpg`, width: 1200, height: 630, alt: `A capa do ${site.nome}: o cartão da casa sobre o balcão. Site de demonstração.` };
  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: pagina.caminho },
    openGraph: { type: "website", locale: "pt_BR", siteName: site.nome, url: pagina.caminho, title: pagina.titulo, description: descricao, images: [cartao] },
    twitter: { card: "summary_large_image", title: pagina.titulo, description: descricao, images: [cartao.url] },
  };
}

/**
 * O carimbo da casa: a ação principal (pedir horário pelo WhatsApp, com a mensagem pronta, em nova aba; o rótulo para o
 * leitor de tela diz isso). A borracha, o batido, a tinta úmida, a falha e a tinta seca (o grão que some quando o
 * carimbo bate, na entrada) são o CSS (.bt-carimbo). `claro`: o rótulo
 * da cena de tinta ("Abrir o WhatsApp, com esta mensagem"; as cores vêm de .bt-tinta). `miudo`: o da tira. `daCapa`: o
 * carimbo da capa, que a tira observa (a ação da tira só aparece quando ele sai da tela); um por página, no máximo.
 */
export function Carimbo({ claro = false, miudo = false, daCapa = false, className = "" }: { claro?: boolean; miudo?: boolean; daCapa?: boolean; className?: string }) {
  return (
    <a
      href={vinculoDoWhatsapp(mensagemPronta)}
      target="_blank"
      rel="noopener noreferrer"
      data-bt-carimbo-da-capa={daCapa ? "" : undefined}
      className={`bt-carimbo ${miudo ? "bt-carimbo-miudo" : ""} ${className}`}
    >
      <span aria-hidden="true" className="bt-carimbo-ar" />
      <span aria-hidden="true" className="bt-carimbo-batido" />
      <span aria-hidden="true" className="bt-carimbo-seca" />
      <IconeWhatsApp className="bt-carimbo-icone" />
      <span className="bt-carimbo-rotulo">
        <span className="bt-carimbo-acao">{claro ? site.acao.abrir : site.acao.rotulo}</span>{" "}
        <span className="bt-carimbo-canal">{claro ? site.acao.abrirDetalhe : site.acao.canal}</span>
      </span>
      <span className="sr-only">{site.novaAba}</span>
    </a>
  );
}

/**
 * O vínculo impresso: o sublinhado na tinta a 35%; sob a mão, o rebaixo (petshop.css, .bt-vinculo). Por dentro do site,
 * a navegação do Next; para fora (`externo`), nova aba, com o aviso para o leitor de tela. `icone`: um desenho antes do
 * texto (o símbolo de acessibilidade), fora do sublinhado.
 */
export function Vinculo({ href, children, externo = false, icone, className = "" }: { href: string; children: React.ReactNode; externo?: boolean; icone?: React.ReactNode; className?: string }) {
  const classe = `bt-vinculo ${className}`;
  if (externo)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classe}>
        {icone}
        {children}
        <span className="sr-only">{site.novaAba}</span>
      </a>
    );
  if (href.startsWith("/"))
    return (
      <Link href={href} className={classe}>
        {icone}
        {children}
      </Link>
    );
  return (
    <a href={href} className={classe}>
      {icone}
      {children}
    </a>
  );
}

/** O telefone (o mesmo número do WhatsApp, fictício), sem quebrar: "(21) 90000-0000". */
export function Telefone({ className = "" }: { className?: string }) {
  return (
    <Vinculo href={`tel:+${whatsappFicticio}`} className={`whitespace-nowrap ${className}`}>
      {whatsappVisivel}
    </Vinculo>
  );
}

/** O endereço numa linha, escrito do mesmo jeito em todo lugar (uma fonte só). */
export const enderecoEmLinha = () => {
  const e = site.endereco;
  // O travessão nunca abre linha (o espaço antes dele não quebra): a 390 px, "– RJ" começava a segunda linha da capa.
  return `${e.logradouro}, ${e.numero}, ${e.bairro}, ${e.cidade}\u00a0– ${e.uf}, CEP ${e.cep}`;
};

/** O vínculo para o mapa do OpenStreetMap no ponto da casa (nenhum mapa embutido, nenhum pedido externo). */
export const vinculoDoMapa = () =>
  `https://www.openstreetmap.org/?mlat=${site.ponto.latitude}&mlon=${site.ponto.longitude}#map=17/${site.ponto.latitude}/${site.ponto.longitude}`;

/** O endereço em <address>, com o vínculo para o mapa (rótulo próprio: `rotuloDoMapa`, de conteudo/demos/petshop.ts). */
export function Endereco({ rotuloDoMapa, className = "" }: { rotuloDoMapa?: string; className?: string }) {
  return (
    <address className={`not-italic ${className}`}>
      {enderecoEmLinha()}.
      {rotuloDoMapa && (
        <>
          {" "}
          <Vinculo href={vinculoDoMapa()} externo>
            {rotuloDoMapa}
          </Vinculo>
        </>
      )}
    </address>
  );
}

/**
 * O horário em grupos de dias, numa frase ("Terça a sexta, das 9h às 18h; sábado, das 8h às 13h"). `fechados`: com os
 * dias de porta fechada ("segunda: fechado"), como pede o horário completo. O dia a dia, em lista: diaADia, de
 * lib/demos/relogio.ts.
 */
export function horarioEmLinha({ fechados = false }: { fechados?: boolean } = {}) {
  return diasJuntos(expediente)
    .filter((g) => fechados || g.texto !== "Fechado")
    .map((g, i) => {
      const dias = i ? g.dias.toLowerCase() : g.dias;
      return g.texto === "Fechado" ? `${dias}: fechado` : `${dias}, das ${g.texto}`;
    })
    .join("; ");
}

/**
 * O impresso: o nome e os números, com o relevo registrado (a cópia clara a −1 px, a escura a +1,5 px) e o verniz que
 * pega a luz da mão. As cópias são desenho: fora da árvore de acessibilidade, dos trechos da busca e da seleção. Dentro
 * de uma peça ([data-bt-peca]), o verniz acende sob o ponteiro. Sem id dentro (as cópias o repetiriam).
 */
export function Impresso({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`bt-impresso ${className}`}>
      <span aria-hidden="true" data-nosnippet="" className="bt-impresso-luz">
        {children}
      </span>
      <span aria-hidden="true" data-nosnippet="" className="bt-impresso-sombra">
        {children}
      </span>
      <span className="bt-impresso-tinta">{children}</span>
      <span aria-hidden="true" data-nosnippet="" className="bt-impresso-verniz">
        {children}
      </span>
    </span>
  );
}

/**
 * A luz da manhã pela porta: a assinatura em movimento da capa (o ambiente pausável). Vai como primeiro filho do cartão
 * (.bt-cartao) e acende por sobreposição o que está nele. `noBalcao`: a mesma luz no balcão em volta do cartão (por
 * baixo da pilha, mais adiante). Decorativa.
 */
export function LuzDaPorta({ noBalcao = false }: { noBalcao?: boolean }) {
  return (
    <span aria-hidden="true" className={noBalcao ? "bt-luz bt-luz-balcao" : "bt-luz"}>
      <span data-ambiente="" className="bt-luz-batente" />
    </span>
  );
}

/**
 * A régua de leitura: o invólucro de uma tabela (ou lista) cujas linhas levam data-bt-linha. A faixa de acetato vai no
 * fim; a ilha do balcão a leva até a linha sob o ponteiro. Só realça: não seleciona nem calcula. `emPe`: a régua de pé,
 * que corre no x, de coluna em coluna (a linha do tempo do atendimento).
 */
export function ReguaDeLeitura({ children, emPe = false, className = "" }: { children: React.ReactNode; emPe?: boolean; className?: string }) {
  return (
    <div data-bt-regua={emPe ? "x" : ""} className={`bt-regua ${className}`}>
      {children}
      <span aria-hidden="true" className="bt-acetato" />
    </div>
  );
}
