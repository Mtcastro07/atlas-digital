// app/equipe/page.tsx — a equipe e a clínica (producao/esteira/nichos/odontologia.md, seção 4.1): quem atende, com o nome, o CRO,
// o título e a formação; a relação dos especialistas e dos clínicos gerais com a área de atuação, que o Código de Ética
// Odontológica exige da pessoa jurídica (art. 43, § 2º); a clínica, sem foto (o exemplo não tem foto: ver decisoes.md).
import Link from "next/link";
import { AcaoWhatsApp } from "@/components/acao-whatsapp";
import { clinica, equipe } from "@/conteudo/clinica";
import { equipePagina, paginaDe } from "@/conteudo/site";
import { tratamentoDe } from "@/conteudo/tratamentos";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina(paginaDe("equipe"));

export default function Equipe() {
  const pagina = paginaDe("equipe");
  const especialistas = equipe.filter((d) => d.titulo.startsWith("Especialista"));
  return (
    <main id="conteudo" tabIndex={-1} className="outline-none">
      <section className="envelope mx-auto max-w-pagina pt-10 pb-8 md:pt-16">
        <h1 className="max-w-[24ch] text-display font-semibold">{pagina.titulo}</h1>
        <p className="mt-5 max-w-[46ch] text-destaque text-muted-foreground">{equipePagina.lide}</p>
        <div className="mt-6">
          <AcaoWhatsApp />
        </div>
      </section>

      <section className="envelope mx-auto max-w-pagina pb-12">
        <ul className="divide-y divide-border border-y border-border">
          {equipe.map((d) => (
            <li key={d.id} className="grid gap-4 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-12">
              <div>
                <h2 className="text-titulo font-semibold">{d.nome}</h2>
                <p className="mt-1">
                  {d.profissao}, <span className="tabular whitespace-nowrap">{d.cro}</span>
                </p>
                <p className="text-muted-foreground">{d.funcao ? `${d.titulo}, ${d.funcao.toLowerCase()}` : d.titulo}</p>
              </div>
              <dl className="grid gap-3">
                <div>
                  <dt className="text-nota text-muted-foreground">{equipePagina.formacao}</dt>
                  <dd>{d.formacao}</dd>
                </div>
                <div>
                  <dt className="text-nota text-muted-foreground">{equipePagina.atende}</dt>
                  <dd>
                    <ul>
                      {d.atende.map((id) => (
                        <li key={id}>
                          <Link href={`/tratamentos/${id}`} className="vinculo">
                            {tratamentoDe(id).nome}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </section>

      <section className="envelope mx-auto max-w-pagina py-12">
        <h2 className="text-titulo font-semibold">{equipePagina.especialistas.titulo}</h2>
        <ul className="mt-6 grid gap-2">
          {especialistas.map((d) => (
            <li key={d.id}>
              <span className="font-semibold">{d.titulo.replace("Especialista em ", "")}:</span> {d.nome}.
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-[50ch] text-muted-foreground">{equipePagina.especialistas.nota}</p>
      </section>

      <section className="envelope mx-auto max-w-pagina py-12">
        <h2 className="text-titulo font-semibold">{equipePagina.clinica}</h2>
        <div className="mt-6 grid max-w-[50ch] gap-3">
          <p>{clinica.estrutura}</p>
          <p>{clinica.biosseguranca}</p>
        </div>
      </section>
    </main>
  );
}
