import Link from "next/link";

import { Colofao, IndiceDoRodape } from "@/components/comuns/rodape-da-pagina";
import { Envelope } from "@/components/estrutura";
import { Logotipo } from "@/components/marca/logotipo";
import { textoParaIas } from "@/conteudo/paginas/comuns";
import { contato, metadados, navegacao, rodape } from "@/conteudo/site";
import { colofaoDe } from "@/lib/colofao";
import { linkWhatsApp } from "@/lib/whatsapp";

const [usuarioDoEmail, dominioDoEmail] = contato.email.split("@");

/** As frases do colofão das sete páginas, calculadas no servidor, no build: o relatório da régua não vai ao navegador. */
const colofoes = Object.fromEntries(["/", ...navegacao.map((item) => item.caminho)].map((caminho) => [caminho, colofaoDe(caminho)]));

/**
 * Rodapé em névoa: a marca e, em três colunas da mesma largura (desde
 * 02/10), a descrição, o índice das seis páginas e o contato; no pé, o
 * selo, o colofão e o texto para as IAs. Desde 28/10 (R10,
 * esboco/comuns/ESBOCO.md, 1.1), em três degraus e nada abaixo de 16 px
 * (até então, tudo em 12 e 14): o índice na voz do menu, com fios, de 18
 * a 21 px, e a página aberta marcada (o peso e o traço de bronze, além da
 * cor: components/comuns/rodape-da-pagina.tsx); o contato a 17 px, em
 * navy; a descrição, o selo e o colofão a 16 px, no apagado. Saíram os
 * rótulos "Páginas" e "Contato": as listas se leem pelo que são. O
 * logotipo, numa linha própria, leva ao início (que não está no índice) e,
 * como o do cabeçalho, o globo gira sob o ponteiro, no computador, e a
 * cada aparecimento, no celular (ilhas/giro-do-globo.tsx). O colofão (D13)
 * dá as letras do site e a medida da régua de quadros da página aberta,
 * lida no build (lib/colofao.ts); sem medida, só as letras. A descrição é
 * também a description dos dados estruturados: fica palavra por palavra
 * (D10). O atalho do WhatsApp sai de cena sobre ele (data-sem-atalho): o contato está à vista.
 * Fica no layout: o mesmo em todas as páginas.
 */
export function Rodape() {
  return (
    <footer data-tom="claro" data-sem-atalho className="vd-materia border-t border-border pt-14 pb-16 md:pt-18">
      <Envelope>
        <Link
          href="/"
          prefetch={false}
          aria-label="Atlas Digital — início"
          className="inline-flex min-h-11 items-center text-foreground transition-colors duration-300 ease-atlas motion-reduce:hover:text-accent"
        >
          <Logotipo recorte="globo-rodape" className="h-[39px] w-auto" decorativo />
        </Link>
        <div className="cm-rodape-grade">
          <p className="cm-rodape-nota">{rodape.descricao}</p>
          {/* #indice: destino do gatilho "Menu" quando o script não está disponível. */}
          <nav id="indice" aria-label="Páginas" className="cm-indice">
            <IndiceDoRodape itens={navegacao} />
          </nav>
          <address className="not-italic">
            <ul>
              <li>
                <a href={linkWhatsApp()} target="_blank" rel="noopener" className="cm-contato">
                  WhatsApp {contato.telefone}
                </a>
              </li>
              <li>
                {/* Na coluna estreita, o endereço quebra logo depois do "@" (<wbr>, que não vai junto quando se copia). */}
                <a href={`mailto:${contato.email}`} className="cm-contato">
                  <span>
                    {usuarioDoEmail}@<wbr />
                    {dominioDoEmail}
                  </span>
                </a>
              </li>
              <li className="cm-cidade">
                {contato.cidade}, {contato.estado}
              </li>
            </ul>
          </address>
        </div>
        <div className="cm-rodape-pe">
          <p className="cm-rodape-nota">{rodape.selo}</p>
          <Colofao frases={colofoes} className="cm-rodape-nota" />
          <div className="cm-rodape-fim">
            {/* O texto do site para as IAs (app/llms.txt/route.ts). Um <a> comum: é um arquivo de texto, e não uma página
                do app; sem seta, porque não sai do site. */}
            <a href="/llms.txt" className="cm-contato">
              {textoParaIas}
            </a>
            <p className="cm-direitos">
              <span>{rodape.direitos}</span> <span>{metadados.slogan}</span>
            </p>
          </div>
        </div>
      </Envelope>
    </footer>
  );
}
