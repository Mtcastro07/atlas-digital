// components/vinculo-do-mapa.tsx — "Ver no mapa": a busca pelo endereço no aplicativo de mapas, como
// navegação (nenhum pedido sai da página; producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 3).
import { negocio } from "@/conteudo/negocio";
import { enderecoEmLinha } from "@/lib/horario";
import { vinculoDoMapa } from "@/lib/mapa";

export function VinculoDoMapa({ className = "" }: { className?: string }) {
  return (
    <a href={vinculoDoMapa(enderecoEmLinha(negocio.endereco))} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-11 items-center text-accent hover:underline ${className}`}>
      Ver no mapa<span className="sr-only">, abre em nova aba</span>
    </a>
  );
}
