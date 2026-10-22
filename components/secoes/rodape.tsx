import Link from "next/link";

import { Envelope } from "@/components/estrutura";
import { Logotipo } from "@/components/marca/logotipo";
import { contato, metadados, navegacao, rodape } from "@/conteudo/site";
import { linkWhatsApp } from "@/lib/whatsapp";

const titulo = "text-rotulo font-semibold text-foreground";
const vinculo =
  "inline-flex min-h-11 min-w-11 items-center text-nota text-muted-foreground no-underline transition-colors duration-300 ease-atlas hover:text-foreground";
// O usuário, o nome do domínio e o ".com": "contato", "agenciaatlasdigital" e ".com".
const [usuarioDoEmail, nomeDoDominio, fimDoDominio] = contato.email.split(/@|(?=\.[^.]+$)/);

/**
 * Rodapé em névoa, texto pequeno, como nas lojas de fabricante: marca,
 * índice das páginas, contato e o selo, em três colunas da mesma largura
 * (desde 02/10). O índice são as seis páginas internas em duas colunas de
 * três, na ordem do menu, de cima para baixo — o início saiu da lista em
 * 03/10 (pedido do usuário: simetria) e é o vínculo do logotipo, cujo
 * globo gira como o do cabeçalho: sob o ponteiro, no computador; a cada
 * aparecimento, no celular (ilhas/giro-do-globo.tsx). Assim, as três
 * colunas têm a mesma altura: três linhas cada. No celular, a folga
 * inferior (pb-28) reserva o espaço da barra do polegar
 * (ilhas/barra-do-polegar.tsx), que fica fixa embaixo e não pode cobrir o
 * último texto. Fica no layout: o mesmo em todas as páginas.
 */
export function Rodape() {
  return (
    <footer data-tom="claro" className="vd-materia border-t border-border pt-16 pb-28 md:pt-20 lg:pb-16">
      <Envelope>
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          <div>
            {/* O logotipo leva ao início (que saiu da lista de páginas) e, como no cabeçalho, o globo gira sob o ponteiro
                (com movimento reduzido, sem o giro, o logotipo responde em cor). */}
            <Link
              href="/"
              prefetch={false}
              aria-label="Atlas Digital — início"
              className="inline-flex min-h-11 items-center text-foreground transition-colors duration-300 ease-atlas motion-reduce:hover:text-accent"
            >
              <Logotipo recorte="globo-rodape" className="h-[39px] w-auto" decorativo />
            </Link>
            <p className="mt-5 max-w-[32ch] text-nota text-muted-foreground">{rodape.descricao}</p>
          </div>
          {/* #indice: destino do gatilho "Menu" quando o script não está disponível. */}
          <nav id="indice" aria-label="Páginas">
            <p className={titulo}>Páginas</p>
            {/* Numa coluna só onde as duas não cabem (com a letra a 200%, até 416 px): "Orçamento" e "trabalho" lado a lado
                pediam 303 px, e a 320 px a página alargava para 351 (18/10). */}
            <ul className="mt-2 grid grid-flow-col grid-rows-3 gap-x-6 max-[13rem]:grid-flow-row">
              {navegacao.map((item) => (
                <li key={item.id}>
                  <Link href={item.caminho} className={vinculo}>
                    {item.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className={titulo}>Contato</p>
            <ul className="mt-2">
              <li>
                {/* O número inteiro na linha (18/10): com a letra a 150% e 200%, partia no hífen ("96801- | 4926"). */}
                <a href={linkWhatsApp()} target="_blank" rel="noopener" className={vinculo}>
                  <span>
                    WhatsApp <span className="whitespace-nowrap">{contato.telefone}</span>
                  </span>
                </a>
              </li>
              <li>
                {/* Onde a coluna é mais estreita que o endereço, ele quebra primeiro depois do "@" e, se o domínio ainda não couber,
                    antes do ".com" (<wbr>, que não vai junto quando se copia; o domínio em inline-block, para a quebra do "@"
                    vir antes). Só com a letra a 200% a 320 px, nem o nome do domínio cabe: ele quebra onde precisar
                    (wrap-anywhere), e a página não alarga. O aria-label dá o nome inteiro: o inline-block partia o nome acessível
                    em "contato@ agenciaatlasdigital.com" (18/10, o fechamento). */}
                <a href={`mailto:${contato.email}`} aria-label={contato.email} className={`${vinculo} min-w-0`}>
                  <span className="wrap-anywhere">
                    {usuarioDoEmail}@<wbr />
                    <span className="inline-block">
                      {nomeDoDominio}
                      <wbr />
                      {fimDoDominio}
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex min-h-11 items-center text-nota text-muted-foreground">
                {contato.cidade}, {contato.estado}
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-border pt-8 text-rotulo text-muted-foreground">
          <p className="max-w-[60ch]">{rodape.selo}</p>
          <p className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
            <span>{rodape.direitos}</span>{" "}
            <span>{metadados.slogan}</span>
          </p>
        </div>
      </Envelope>
    </footer>
  );
}
