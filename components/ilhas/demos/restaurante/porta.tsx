"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ControleDoMovimento } from "@/components/ilhas/controle-do-movimento";
import { estadoDoExpediente, horaDeNiteroi, type Expediente, type Fechamento } from "@/lib/demos/relogio";

type Pagina = { id: string; caminho: string; rotulo: string };

/**
 * A porta de vidro do salão (o cabeçalho, presa no alto): o vidro sobre o azulejo, o nome pintado nele, as páginas à
 * vista (a de agora sublinhada a giz, que se escreve sob o ponteiro nas outras), a plaquinha "Aberto / Fechado"
 * pendurada, que vira quando o estado muda (o estado ao vivo, no relógio de Niterói), a pausa do balanço da lousa e o
 * botão de ágata do pedido. Antes da hidratação, a plaquinha mostra o estado que o servidor calculou (`inicial`).
 *
 * Abaixo de 1024 px (o passe do celular, 14.10.2026), as cinco páginas não cabem à vista: a porta fica numa linha (o
 * nome, a plaquinha, a pausa) e as páginas vão para o menu de tela cheia, a lousa do salão no caixilho (um <dialog>
 * nativo: o foco preso, o Esc, o fundo inerte). O gatilho é a lousinha pendurada na porta; sem script, ele leva à lista
 * de páginas do rodapé (#paginas-do-salao).
 */
export function PortaDoSalao({
  nome,
  descricao,
  inicio,
  paginas,
  rotuloDasPaginas,
  pedido,
  acao,
  textos,
  expediente,
  fechamentos,
  inicial,
  doDia,
}: {
  nome: string;
  descricao: string;
  inicio: string;
  paginas: readonly Pagina[];
  rotuloDasPaginas: string;
  pedido: string;
  acao: string;
  textos: { aberto: string; fechado: string; hoje: string; menu: string; fechar: string };
  /** O prato de hoje, curto, com o preço ("Moqueca de peixe, R$ 44,00"), no pé do menu; no domingo, nada. A porta da
   *  mesa não o leva: a lousinha que o levava, de 1536 px para cima, cortava as páginas e repetia a capa (16.10.2026). */
  doDia: string | null;
  expediente: Expediente;
  fechamentos: readonly Fechamento[];
  inicial: { aberto: boolean; linha: string };
}) {
  const caminho = usePathname();
  const [estado, setEstado] = useState(inicial);
  const menu = useRef<HTMLDialogElement>(null);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const ver = () => setEstado(estadoDoExpediente(horaDeNiteroi(), expediente, fechamentos));
    ver();
    const relogio = window.setInterval(ver, 30_000);
    return () => window.clearInterval(relogio);
  }, [expediente, fechamentos]);

  // O menu fecha ao trocar de página e quando a tela passa a ser da mesa (lá, as páginas estão à vista).
  useEffect(() => {
    menu.current?.close();
    const mesa = window.matchMedia("(min-width: 1024px)");
    const fechar = () => mesa.matches && menu.current?.close();
    mesa.addEventListener("change", fechar);
    return () => mesa.removeEventListener("change", fechar);
  }, [caminho]);
  const fecharMenu = () => menu.current?.close();

  const aqui = (p: Pagina) => caminho === p.caminho || caminho.startsWith(`${p.caminho}/`);
  return (
    <header className="rs-porta">
      <div className="rs-largura rs-porta-vidro">
        <Link href={inicio} aria-current={caminho === inicio ? "page" : undefined} className="rs-porta-nome">
          <span className="rs-porta-letreiro">{nome}</span>
          <span className="rs-porta-descricao">{descricao}</span>
        </Link>
        <nav aria-label={rotuloDasPaginas} className="rs-porta-paginas">
          {paginas.map((p) => (
            <Link key={p.id} href={p.caminho} aria-current={caminho === p.caminho ? "page" : aqui(p) ? "true" : undefined} className="rs-porta-pagina">
              {p.rotulo}
            </Link>
          ))}
        </nav>
        <div className="rs-porta-direita">
          <p className="rs-plaquinha" data-aberta={estado.aberto}>
            <span aria-hidden="true" className="rs-plaquinha-cordao" />
            <span aria-hidden="true" className="rs-plaquinha-giro">
              <span className="rs-plaquinha-face" data-face="aberto">
                {textos.aberto}
              </span>
              <span className="rs-plaquinha-face" data-face="fechado">
                {textos.fechado}
              </span>
            </span>
            <span aria-hidden="true" className="rs-plaquinha-linha">
              {estado.linha.replace(/^(Aberto|Fechado) agora, /, "")}
            </span>
            <span className="sr-only">{estado.linha}</span>
          </p>
          <span className="rs-porta-pausa">
            <ControleDoMovimento />
          </span>
          <Link href={pedido} aria-current={caminho === pedido ? "page" : undefined} tabIndex={caminho === pedido ? -1 : undefined} className="rs-agata rs-agata-miuda rs-porta-acao">
            <span className="rs-agata-texto">{acao}</span>
          </Link>
          <a
            href="#paginas-do-salao"
            aria-haspopup="dialog"
            aria-expanded={aberto}
            onClick={(e) => {
              if (!menu.current?.showModal) return;
              e.preventDefault();
              menu.current.showModal();
              setAberto(true);
            }}
            className="rs-porta-menu"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M4 7.2c5-.6 11-.4 16 .2M4 12.3c4.6-.5 9.6-.3 16 .1M4 17.2c6-.4 10-.5 13 0" />
            </svg>
            <span className="rs-porta-menu-palavra">{textos.menu}</span>
          </a>
          <dialog ref={menu} aria-label={rotuloDasPaginas} className="rs-menu" onClose={() => setAberto(false)}>
            <div className="rs-menu-lousa">
              <div className="rs-menu-cabeca">
                <Link href={inicio} aria-current={caminho === inicio ? "page" : undefined} onClick={fecharMenu} className="rs-menu-nome">
                  {nome}
                </Link>
                <button type="button" onClick={fecharMenu} className="rs-menu-fechar">
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M6 6.4c4 3.6 8 7.6 12 11.4M18 6c-4.2 3.8-8 7.8-12 12" />
                  </svg>
                  <span className="sr-only">{textos.fechar}</span>
                </button>
              </div>
              <nav aria-label={rotuloDasPaginas}>
                <ul className="rs-menu-paginas">
                  {paginas.map((p) => (
                    <li key={p.id}>
                      <Link href={p.caminho} aria-current={caminho === p.caminho ? "page" : aqui(p) ? "true" : undefined} onClick={fecharMenu} className="rs-menu-pagina">
                        <span className="rs-giz">{p.rotulo}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="rs-menu-pe">
                {doDia && (
                  <p className="rs-menu-hoje">
                    <span>{textos.hoje}</span> {doDia}
                  </p>
                )}
                <p className="rs-menu-estado">{estado.linha}</p>
                <Link href={pedido} onClick={fecharMenu} className="rs-agata rs-agata-grande rs-menu-acao">
                  <span className="rs-agata-texto">{acao}</span>
                </Link>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </header>
  );
}
