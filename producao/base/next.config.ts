import type { NextConfig } from "next";
import { contato } from "./conteudo/contato";

// O modo de saída (producao/esteira/18-publicacao-e-manutencao.md, seção 1). O padrão fica escrito aqui (o
// novo-site o escolhe pelo plano e pelos módulos); a variável SAIDA só o troca numa compilação.
// - "estatico": o site sem formulário nem Agenda, servido pela hospedagem comum, sem servidor.
//   Gera out/; o postbuild grava o .htaccess com os cabeçalhos (ferramentas/gerar-htaccess.mjs).
// - "servidor": o web app Node.js da Hostinger, que força o standalone. Obrigatório com formulário,
//   Agenda ou relatório de acessos (o conferir-pronto acusa a combinação errada).
const servidor = (process.env.SAIDA ?? "estatico") === "servidor";

// O domínio do cliente, sem "www": uma fonte só, conteudo/contato.ts.
const dominio = contato.dominio;
const desenvolvimento = process.env.NODE_ENV === "development";
// Ligue SITE_NO_DOMINIO=1 nas variáveis do web app só na virada do domínio: antes, o
// endereço temporário da hospedagem serve para conferir o site novo (producao/esteira/13, seção 5).
const noDominio = process.env.SITE_NO_DOMINIO === "1";
// O rascunho e a homologação no web app ficam fora da busca: ligue SITE_HOMOLOGACAO=1 nas variáveis do web app
// e desligue na virada do domínio (producao/esteira/18-publicacao-e-manutencao.md, seções 2.2 e 6.2). No estático, o mesmo
// vem do RASCUNHO=1 do gerar-htaccess.
const homologacao = process.env.SITE_HOMOLOGACAO === "1";

// A política de conteúdo: tudo do próprio site (producao/esteira/13-tecnologia-e-estrutura.md, seção 5;
// producao/esteira/17-conformidade-e-normas.md, seção 4). No estático, a mesma política vai no .htaccess
// (ferramentas/htaccess.modelo, gravado pelo gerar-htaccess.mjs): mude as duas juntas.
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
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // O noindex por cabeçalho, e não por Disallow no robots.txt: o robô bloqueado não leria o noindex.
  ...(homologacao ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
];

const nextConfig: NextConfig = servidor
  ? {
      // O standalone, como a Hostinger o compila no web app Node.js (producao/esteira/13-tecnologia-e-estrutura.md,
      // seção 5.1): a medição local é a do que vai ao ar. Sobe com PORT=3100 npm run servidor.
      output: "standalone",
      poweredByHeader: false,
      async headers() {
        return [{ source: "/:caminho*", headers: seguranca }];
      },
      async redirects() {
        return [
          // www converge para o domínio raiz.
          { source: "/:caminho*", has: [{ type: "host", value: `www.${dominio}` }], destination: `https://${dominio}/:caminho*`, permanent: true },
          // O endereço temporário da hospedagem converge só depois da virada.
          ...(noDominio
            ? [{ source: "/:caminho*", has: [{ type: "host" as const, value: "(?<temporario>.+)\\.hostingersite\\.com" }], destination: `https://${dominio}/:caminho*`, permanent: true }]
            : []),
        ];
      },
    }
  : {
      poweredByHeader: false,
      output: "export",
      // A pasta por página (/servicos/index.html): a hospedagem comum serve sem reescrita.
      trailingSlash: true,
      // Sem servidor, não há otimização de imagem: as fotos saem prontas do preparar-fotos.
      images: { unoptimized: true },
    };

export default nextConfig;
