// components/endereco.tsx — o endereço em linhas, num <address> (producao/esteira/14-funcionalidades/01-base-de-todo-site.md,
// seção 3): o mesmo texto do rodapé, de Onde e dos dados estruturados, de conteudo/negocio.ts.
import { negocio } from "@/conteudo/negocio";
import { enderecoEmLinhas } from "@/lib/horario";

export function Endereco({ className = "" }: { className?: string }) {
  return (
    <address className={`not-italic ${className}`}>
      {enderecoEmLinhas(negocio.endereco).map((linha) => (
        <span key={linha} className="block">
          {linha}
        </span>
      ))}
    </address>
  );
}
