import { Envelope, Secao } from "@/components/estrutura";
import { Faixa } from "@/components/secoes/faixa";
import { capa } from "@/conteudo/site";

/**
 * Logo abaixo da capa, os quatro destaques — o padrão de execução em
 * números verificáveis, primeiro na ordem do argumento da ata (IV.1) — e a
 * faixa de nichos. Até 02/10 ficavam no pé da capa; desde 03/10 têm seção
 * própria, na névoa, para a capa ficar só com o título e as ações (pedido
 * do usuário). Os tons do início alternam a partir daqui: névoa, navy,
 * névoa, navy.
 */
export function Destaques() {
  return (
    <Secao aria-label="Destaques" tom="claro">
      <Envelope>
        <dl className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:divide-x md:divide-border">
          {capa.destaques.map((d) => (
            <div key={d.rotulo} className="px-3 text-center md:px-6">
              <dt className="font-display tracking-titulo text-numero tabular-nums">{d.valor}</dt>
              <dd className="mx-auto mt-3 max-w-[20ch] text-nota text-muted-foreground">{d.rotulo}</dd>
            </div>
          ))}
        </dl>
      </Envelope>
      <Faixa className="mt-16 md:mt-20" />
    </Secao>
  );
}
