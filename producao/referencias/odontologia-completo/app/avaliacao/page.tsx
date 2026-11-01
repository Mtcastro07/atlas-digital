// app/avaliacao/page.tsx — o pedido de avaliação: a funcionalidade 1 do plano Completo (producao/esteira/nichos/odontologia.md,
// seção 5.1). A pessoa escolhe o atendimento (nunca um sintoma) e, se quiser, a região; a mensagem sai pronta para o WhatsApp.
// Nada é gravado. Sem script, a nota abaixo diz o que fazer, e a lista dos atendimentos aparece no HTML.
import { AcaoWhatsApp } from "@/components/acao-whatsapp";
import { PedidoDeAvaliacao } from "@/components/ilhas/pedido-de-avaliacao";
import { avaliacaoPagina, avisoDeValores, paginaDe } from "@/conteudo/site";
import { atendimentos, periodos, regioes, ultimasVisitas } from "@/conteudo/tratamentos";
import { metadadosDaPagina } from "@/lib/metadados";

export const metadata = metadadosDaPagina(paginaDe("avaliacao"));

export default function Avaliacao() {
  const pagina = paginaDe("avaliacao");
  return (
    <main id="conteudo" tabIndex={-1} className="outline-none">
      <section className="envelope mx-auto max-w-pagina pt-10 pb-8 md:pt-16">
        <h1 className="max-w-[24ch] text-display font-semibold">{pagina.titulo}</h1>
        <p className="mt-5 max-w-[46ch] text-destaque text-muted-foreground">{avaliacaoPagina.lide}</p>
        <div className="mt-6">
          <AcaoWhatsApp />
        </div>
      </section>

      <section className="envelope mx-auto max-w-pagina pb-12">
        <PedidoDeAvaliacao
          atendimentos={atendimentos}
          regioes={regioes}
          ultimasVisitas={ultimasVisitas}
          periodos={periodos}
          textos={{
            atendimento: avaliacaoPagina.atendimento,
            regiao: avaliacaoPagina.regiao,
            todasAsRegioes: "Nenhuma região",
            ultimaVisita: avaliacaoPagina.ultimaVisita,
            periodo: avaliacaoPagina.periodo,
            semResposta: avaliacaoPagina.semResposta,
            mensagem: avaliacaoPagina.mensagem,
            copiar: avaliacaoPagina.copiar,
            enviar: avaliacaoPagina.enviar,
            urgenciaNota: avaliacaoPagina.urgenciaNota,
            atendimentoNota: avaliacaoPagina.atendimentoNota,
          }}
        />
        {/* Só sem script: o formulário acima não compõe a mensagem, e este vínculo abre a conversa com a mensagem curta. */}
        <div className="sem-script mt-10 max-w-[50ch]">
          <p>{avaliacaoPagina.semScript}</p>
          <ul className="mt-3 grid list-disc gap-1 pl-5">
            {atendimentos.map((a) => (
              <li key={a.id}>{a.rotulo}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="envelope mx-auto max-w-pagina pb-12">
        <p className="max-w-[50ch]">{avisoDeValores}</p>
        <p className="mt-2 max-w-[50ch] text-muted-foreground">{avaliacaoPagina.urgenciaNota}</p>
      </section>
    </main>
  );
}
