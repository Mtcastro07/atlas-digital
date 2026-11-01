// components/rodape.tsx — o índice do site, o contato e o bloco de conformidade
// (producao/esteira/17-conformidade-e-normas.md, seção 4): razão social e CNPJ (ou o selo de ficção, no
// exemplo), o registro do conselho, o aviso de privacidade, o símbolo e a declaração de
// acessibilidade, e o crédito do Atlas (producao/esteira/14-funcionalidades/01-base-de-todo-site.md, seção 9).
import Link from "next/link";
import { expediente, negocio, responsavelTecnico } from "@/conteudo/negocio";
import { ondePagina, paginaDe, paginasDoMenu, rodape } from "@/conteudo/site";
import { horarioResumido } from "@/lib/horario";
import { telefoneVisivel, vinculoDoWhatsapp } from "@/lib/whatsapp";
import { Endereco } from "./endereco";
import { SimboloDeAcessibilidade } from "./simbolos";
import { VinculoDoMapa } from "./vinculo-do-mapa";

export function Rodape() {
  return (
    <footer className="mt-24 border-t border-border bg-muted">
      <div className="envelope mx-auto grid max-w-pagina gap-10 py-14 md:grid-cols-3">
        <nav aria-label="Índice do site" id="indice">
          <h2 className="text-rotulo font-semibold text-muted-foreground">{rodape.paginas}</h2>
          <ul className="mt-3 grid gap-1">
            {paginasDoMenu.map((p) => (
              <li key={p.id}>
                <Link href={p.caminho} className="inline-flex min-h-11 items-center no-underline hover:underline">
                  {p.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-rotulo font-semibold text-muted-foreground">{rodape.contato}</h2>
          <ul className="mt-3 grid gap-1">
            <li>
              <a href={vinculoDoWhatsapp(negocio.whatsapp)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center no-underline hover:underline">
                <span className="tabular whitespace-nowrap">WhatsApp {telefoneVisivel(negocio.whatsapp)}</span>
                <span className="sr-only">, abre em nova aba</span>
              </a>
            </li>
            <li>
              <a href={`tel:+${negocio.telefone}`} className="inline-flex min-h-11 items-center no-underline hover:underline">
                <span className="tabular whitespace-nowrap">Telefone {telefoneVisivel(negocio.telefone)}</span>
              </a>
            </li>
            <li>
              <Endereco />
              <VinculoDoMapa />
            </li>
            <li className="text-nota">{`${horarioResumido(expediente)}; ${ondePagina.feriados.toLowerCase()}`}</li>
            <li className="text-nota text-muted-foreground">{negocio.prazoDeResposta}</li>
          </ul>
        </div>

        <div className="text-nota">
          <h2 className="text-rotulo font-semibold text-muted-foreground">{rodape.site}</h2>
          {/* Quem fornece: o selo (exemplo); a razão social e o CNPJ (empresa); o nome completo, com o
              registro abaixo (profissional pessoa física, sem CPF). */}
          {negocio.exemplo ? (
            <p className="mt-3">{rodape.selo}</p>
          ) : negocio.cnpj ? (
            <p className="mt-3">
              {negocio.razaoSocial} · CNPJ <span className="tabular">{negocio.cnpj}</span>
            </p>
          ) : (
            <p className="mt-3">{negocio.nomeCompleto}</p>
          )}
          {negocio.registro && (
            <p className="mt-2">
              Clínica inscrita no <span className="tabular whitespace-nowrap">{negocio.registro}</span>.
            </p>
          )}
          <p className="mt-2">
            Responsável técnica: {responsavelTecnico.nome}, {responsavelTecnico.profissao}, <span className="tabular whitespace-nowrap">{responsavelTecnico.registro}</span>.
          </p>
          <ul className="mt-3 grid gap-1">
            <li>
              <Link href={paginaDe("privacidade").caminho} className="inline-flex min-h-11 items-center no-underline hover:underline">
                {paginaDe("privacidade").rotulo}
              </Link>
            </li>
            <li>
              <Link href={paginaDe("acessibilidade").caminho} className="inline-flex min-h-11 items-center gap-2 no-underline hover:underline">
                <SimboloDeAcessibilidade className="size-6" />
                {paginaDe("acessibilidade").rotulo}
              </Link>
            </li>
          </ul>
          <p className="mt-4 text-muted-foreground">
            {negocio.exemplo ? rodape.creditoDoExemplo(negocio.plano) : rodape.credito}
          </p>
        </div>
      </div>
    </footer>
  );
}
