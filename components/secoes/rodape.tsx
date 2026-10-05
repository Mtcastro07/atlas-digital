import Link from "next/link";

import { Envelope } from "@/components/estrutura";
import { Logotipo } from "@/components/marca/logotipo";
import { contato, metadados, navegacao, rodape } from "@/conteudo/site";
import { linkWhatsApp } from "@/lib/whatsapp";

const titulo = "text-rotulo font-semibold text-foreground";
const vinculo =
  "inline-flex min-h-11 min-w-11 items-center text-nota text-muted-foreground no-underline transition-colors duration-300 ease-atlas hover:text-foreground";
const [usuarioDoEmail, dominioDoEmail] = contato.email.split("@");

/**
 * Rodapé em névoa, texto pequeno, como nas lojas de fabricante: marca,
 * índice das páginas, contato e o selo, em três colunas da mesma largura
 * (desde 02/10). O índice são as seis páginas internas em duas colunas de
 * três, na ordem do menu, de cima para baixo — o início saiu da lista em
 * 03/10 (pedido do usuário: simetria) e é o vínculo do logotipo, cujo
 * globo gira como o do cabeçalho: sob o ponteiro, no computador; a cada
 * aparecimento, no celular (ilhas/giro-do-globo.tsx). Assim, as três
 * colunas têm a mesma altura: três linhas cada. No celular, a folga
 * inferior reserva o espaço da ação flutuante. Fica no layout: o mesmo em
 * todas as páginas.
 */
export function Rodape() {
  return (
    <footer data-tom="claro" className="border-t border-border pt-16 pb-28 md:pt-20 lg:pb-16">
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
            <ul className="mt-2 grid grid-flow-col grid-rows-3 gap-x-6">
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
                <a href={linkWhatsApp()} target="_blank" rel="noopener" className={vinculo}>
                  WhatsApp {contato.telefone}
                </a>
              </li>
              <li>
                {/* No tablet, a coluna é mais estreita que o endereço: ele quebra logo depois do "@" (<wbr>, que não vai junto quando se copia). */}
                <a href={`mailto:${contato.email}`} className={`${vinculo} min-w-0`}>
                  <span>
                    {usuarioDoEmail}@<wbr />
                    {dominioDoEmail}
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
          <p className="max-w-[70ch]">{rodape.selo}</p>
          <p className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
            <span>{rodape.direitos}</span>
            <span>{metadados.slogan}</span>
          </p>
        </div>
      </Envelope>
    </footer>
  );
}
