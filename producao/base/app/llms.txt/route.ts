// app/llms.txt/route.ts — o /llms.txt, gerado do conteúdo do site por lib/llms.ts (producao/esteira/21-busca-e-ias.md,
// seção 7). Estático (force-static): no export, vira o arquivo out/llms.txt. Sem X-Robots-Tag próprio, como no site do
// Atlas (decisão do coordenador, 16.10.2026): o arquivo fica legível e indexável como as páginas.
import nextConfig from "@/next.config";
import { textoDoLlms } from "@/lib/llms";

export const dynamic = "force-static";

export function GET() {
  return new Response(textoDoLlms(nextConfig.trailingSlash ? "/" : ""), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
