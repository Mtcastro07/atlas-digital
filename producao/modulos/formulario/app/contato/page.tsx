// app/contato/page.tsx — a página de contato: o formulário e, ao lado, os outros canais, que seguem à mão (o formulário
// nunca é o único canal; producao/esteira/14-funcionalidades/02-formulario.md, seções 3.4 e 8). Dinâmica: o carimbo de tempo
// é do momento do pedido, e numa página pré-renderizada sairia congelado no instante da compilação.
import { connection } from "next/server";
import { AcaoWhatsApp } from "@/components/acao-whatsapp";
import { Horario } from "@/components/horario";
import { FormularioDeContato } from "@/components/ilhas/formulario-de-contato";
import { paginaDeContato, servicos, textos } from "@/conteudo/formulario";
import { negocio } from "@/conteudo/negocio";
import { paginaDe } from "@/conteudo/site";
import { emitirCarimbo } from "@/lib/formulario/carimbo";
import { metadadosDaPagina } from "@/lib/metadados";
import { telefoneVisivel } from "@/lib/whatsapp";

export const metadata = metadadosDaPagina(paginaDe("contato"));

export default async function Contato() {
  await connection(); // o carimbo é do momento do pedido: esta página não sai pronta da compilação
  const pagina = paginaDe("contato");
  return (
    <main id="conteudo" tabIndex={-1} className="outline-none">
      <section className="envelope mx-auto max-w-pagina pt-14 pb-10 md:pt-20">
        <h1 className="max-w-[16ch] text-display font-semibold">{pagina.titulo}</h1>
        <p className="mt-6 max-w-[52ch] text-destaque text-muted-foreground">{paginaDeContato.lide}</p>
      </section>

      <section className="envelope mx-auto grid max-w-pagina gap-12 pb-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <FormularioDeContato carimbo={emitirCarimbo()} servicos={servicos} textos={textos} whatsapp={negocio.whatsapp} />

        <aside aria-labelledby="outros-canais" className="grid content-start gap-10">
          <div>
            <h2 id="outros-canais" className="text-titulo font-semibold">
              {paginaDeContato.canais}
            </h2>
            <div className="mt-6 flex flex-col items-start gap-4">
              <AcaoWhatsApp />
              <a href={`tel:+${negocio.telefone}`} className="inline-flex min-h-11 items-center text-accent">
                <span className="tabular">Ligar: {telefoneVisivel(negocio.telefone)}</span>
              </a>
              <p className="text-muted-foreground">{negocio.prazoDeResposta}</p>
            </div>
          </div>
          <div>
            <h2 className="text-titulo font-semibold">{paginaDeContato.horario}</h2>
            <Horario className="mt-6" />
          </div>
        </aside>
      </section>
    </main>
  );
}
