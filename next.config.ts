import path from "node:path";

import type { NextConfig } from "next";

// Cabeçalhos e redirecionamentos que antes viviam no .htaccess do pacote
// de 08/09. Valem quando o site roda como servidor Node (next start).
// Num export estático, voltam para o .htaccess da hospedagem.

const dominio = "agenciaatlasdigital.com";
const desenvolvimento = process.env.NODE_ENV === "development";
// O domínio já aponta para este app? Ligue SITE_NO_DOMINIO=1 nas variáveis do
// web app, na virada (e reimplante): só então o endereço temporário da
// hospedagem converge para o domínio. Antes, ele serve para conferir o site
// novo — redirecionado, levaria ao site antigo, ainda no domínio.
const noDominio = process.env.SITE_NO_DOMINIO === "1";

// Política de conteúdo (desde 03/10, noite): tudo vem do próprio site — o site não
// faz pedido externo; o WhatsApp é navegação, que a política não restringe.
// 'unsafe-inline' em script e estilo é inevitável sem páginas dinâmicas: o
// Next embute os dados da página em <script> e o React escreve atributos
// style; mesmo assim, nenhum script de fora carrega e nada é enviado para
// fora. O CSS usa imagens em data: (o grão, as máscaras). No next dev, o
// recarregamento precisa de eval e do websocket.
// frame-ancestors no lugar de X-Frame-Options: só o próprio domínio e os
// subdomínios (onde vivem os demonstrativos) podem embutir o site. Regra
// herdada do .htaccess de 08/09, em que SAMEORIGIN deixava a vitrine em branco.
const politica = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${desenvolvimento ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self'${desenvolvimento ? " ws:" : ""}`,
  "frame-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  `frame-ancestors 'self' https://${dominio} https://*.${dominio}`,
].join("; ");

const seguranca = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Content-Security-Policy", value: politica },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
  // Só vale sob HTTPS (o navegador ignora em http, como no teste local); sem
  // includeSubDomains, porque nem todo subdomínio está garantido em HTTPS.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  // Janela aberta de outro site não alcança esta (e vice-versa); os vínculos
  // externos já abrem com noopener.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // A raiz do repositório tem outro package-lock.json; a aplicação é esta pasta.
  turbopack: { root: path.join(__dirname) },
  async headers() {
    return [
      { source: "/:caminho*", headers: seguranca },
      // Arquivos de public/ sem hash no nome: uma semana, com revalidação em segundo plano.
      {
        source: "/marca.svg",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
  async redirects() {
    // www converge para o domínio raiz; o endereço temporário da hospedagem
    // também, depois da virada do domínio (SITE_NO_DOMINIO, acima).
    return [
      {
        source: "/:caminho*",
        has: [{ type: "host", value: `www.${dominio}` }],
        destination: `https://${dominio}/:caminho*`,
        permanent: true,
      },
      ...(noDominio
        ? [
            {
              source: "/:caminho*",
              has: [{ type: "host" as const, value: "(?<temporario>.+)\\.hostingersite\\.com" }],
              destination: `https://${dominio}/:caminho*`,
              permanent: true,
            },
          ]
        : []),
    ];
  },
};

export default nextConfig;
