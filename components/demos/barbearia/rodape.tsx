import { LinhaDoPoste } from "@/components/demos/barbearia/estado-da-casa";
import { envelope, Selo } from "@/components/demos/barbearia/pecas";
import { VinculoDoIndice } from "@/components/demos/barbearia/vinculo-do-indice";
import { IconeWhatsApp } from "@/components/icones";
import { creditoDoPlano, seloDeFiccao, vinculoDoWhatsapp, whatsappVisivel } from "@/conteudo/demos/comum";
import { barbeariaSite as site } from "@/conteudo/demos/barbearia";

/**
 * O rodapé da Barbearia Santa Rosa, no layout, igual em todas as páginas:
 * o nome em cartaz com o selo que gira, o índice dos capítulos (#capitulos,
 * o destino do "Índice" da barra abaixo de 1024 px), o endereço, o WhatsApp
 * e o horário, e o selo de ficção. Fundo sólido: o palco 3D acaba aqui.
 * Desde 14/10: o poste é sinal (as listras giram só com a casa aberta, e a
 * linha do estado fica sob o horário; LinhaDoPoste) e o índice tem a
 * resposta mínima do item de índice (o número clareia e a seta anda 6 px,
 * sem a faixa de latão, que fica na lista de capítulos do início).
 * Correção de 14/10, depois do crítico de fora: no início, o índice não
 * aparece (barbearia.css, .bb-indice-rodape): a cena dos capítulos, logo
 * acima, é a mesma lista, e no celular eram treze linhas seguidas. As
 * listras do topo são as únicas do site fora do poste da cena de couro, e
 * correm por transform (até então, background-position).
 */
export function Rodape() {
  return (
    // data-palco-vazio (desde 16/10; o crítico de fora: no fim do início, a placa das cadeiras ficava cortada pela borda
    // do rodapé, uma lasca de latão sobre as listras): na mesa, a ficha se apaga quando o rodapé sobe a um quarto da tela.
    <footer className="bg-deep" data-palco-vazio>
      <div className="bb-faixas h-2" data-ambiente aria-hidden="true" />
      <div className={`${envelope} pt-20 pb-10`}>
        <div className="flex items-end justify-between gap-10">
          <p aria-hidden="true" className="bb-exibicao text-[clamp(56px,10vw,170px)] leading-[0.84] tracking-[-0.02em]">
            <span className="block">Barbearia</span>
            <span className="block italic">Santa Rosa</span>
          </p>
          <Selo id="selo-do-rodape" girar className="hidden w-[220px] flex-none md:block" />
        </div>
        <nav id="capitulos" aria-label="Capítulos do site" className="bb-indice-rodape mt-16 border-t border-border">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
            {site.paginas.map((p) => (
              <li key={p.id} className="border-b border-border">
                {/* O mesmo recuo da lista de capítulos do início (até 03/10, 16 × 16 px aqui e 24 × 12 px lá). */}
                <VinculoDoIndice href={p.caminho} className="bb-capitulo-rodape flex min-h-14 items-baseline gap-4 py-5 pr-4">
                  <span className="bb-rodape-numero text-[11px] tracking-[0.2em] text-primary">{p.numero}</span>
                  <span className="bb-exibicao text-[26px] leading-none">{p.rotulo}</span>
                  <span aria-hidden="true" className="bb-rodape-seta ml-auto text-muted-foreground">
                    →
                  </span>
                </VinculoDoIndice>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-12 grid gap-8 text-[14.5px] md:grid-cols-3">
          <p>
            {site.endereco}
            <br />
            <span className="text-muted-foreground">{site.bairro}</span>
          </p>
          {/* O número abre o WhatsApp (desde 16/10, o Impeccable: era texto, e no celular não se tocava). */}
          <p className="flex items-start gap-2.5">
            <IconeWhatsApp className="mt-0.5 size-4 text-accent" />
            <span>
              <a
                href={vinculoDoWhatsapp(site.contato)}
                target="_blank"
                rel="noopener noreferrer"
                // O alvo de toque com 44 px de altura, sem mexer na linha (a folga vertical sai na margem negativa).
                className="-my-[11px] inline-block py-[11px] underline decoration-primary decoration-1 underline-offset-[5px] transition-colors duration-300 hover:text-accent active:text-accent"
              >
                WhatsApp {whatsappVisivel}
              </a>
              <br />
              <span className="text-muted-foreground">Confirmação por resposta</span>
            </span>
          </p>
          <p>
            {site.horarioCurto[0]}
            <br />
            <span className="text-muted-foreground">{site.horarioCurto[1]}</span>
            <LinhaDoPoste expediente={site.expediente} />
          </p>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-[12.5px] text-muted-foreground md:flex-row md:justify-between">
          <p className="max-w-[60ch]">{seloDeFiccao}</p>
          <p>{creditoDoPlano("Completo")}</p>
        </div>
      </div>
    </footer>
  );
}
