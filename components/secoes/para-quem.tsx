import { Envelope, Secao } from "@/components/estrutura";
import { SetaDeSaida } from "@/components/paginas/para-quem/seta";
import { Titulo } from "@/components/tipografia";
import { indiceDosNichos, textosDaPagina, tituloDosPublicos } from "@/conteudo/paginas/para-quem";
import { paraQuem, simulador } from "@/conteudo/site";

/**
 * Os três públicos, a legenda da carta (R10, 28/10, D5). Na mesa, o texto na coluna da esquerda, e a chapa da carta
 * presa ao lado (components/paginas/para-quem/figura.tsx): cada público, ao passar pelo meio da tela, acende o seu
 * bairro nela; sob a mão ou no foco, o marco se ergue e paira. O sinal de cada público é o marco da carta, o mesmo
 * desenho. A frase em Archivo 400, a 21 px (18 no celular); o vínculo do exemplo em duas linhas, "Site de exemplo" a
 * 17 px e o nome a 21 px, com a seta de saída (abre outra aba). 120 px entre as entradas, na mesa: o passo para que
 * cada uma passe sozinha pela carta.
 * Até 28/10: o nome, o texto e o exemplo pronto em três colunas, com o ponto na cor do nicho (de 16/10), e, antes, três
 * blocos brancos com ícone (até 16/10, a marca L3).
 * A seção fica fora da contenção do final-2.patch (data-sem-poupar): a leitura liga a rolagem de cada entrada à carta.
 * Na mesa, 192 px de papel embaixo: com a terceira entrada no meio da tela, a chapa sobe uns 30 px (a 1.440 × 900) a 60
 * (a 768 de altura), com Icaraí e o código à vista; a prova do estudo deixava subir 38 px.
 */
export function ParaQuem() {
  return (
    <Secao id="quem" tom="claro" data-sem-poupar className="vd-pq-legenda pb-8 md:pb-8 lg:pt-36 lg:pb-48">
      <Envelope className="vd-pq-grade">
        <div className="vd-pq-texto">
          <Titulo linhas={tituloDosPublicos} />
          <ul className="vd-pq-publicos">
            {paraQuem.publicos.map((publico, i) => {
              const site = simulador.sites.find((s) => s.plano === publico.plano);
              return (
                <li key={publico.titulo} data-i={i} className="vd-pq-entrada">
                  <h3 className="text-numero">{publico.titulo}</h3>
                  <p className="mt-4 max-w-[30em] font-sub text-destaque font-normal tracking-sub text-muted-foreground">{publico.texto}</p>
                  {site && (
                    // Vínculo comum, e não <Link>: o site de exemplo é outro site (a pré-busca traria as fontes dele).
                    <a href={site.caminho} target="_blank" rel="noopener" className="vd-pq-exemplo vd-acende">
                      <span aria-hidden="true" className="vd-pq-sinal" />
                      <span className="flex flex-col">
                        <span className="text-corpo text-muted-foreground">{textosDaPagina.exemplo}</span>{" "}
                        <span className="vd-acende-nome text-destaque font-semibold text-foreground">
                          {site.nome}
                          <SetaDeSaida className="vd-acende-seta ml-2 inline-block size-3 align-[0.05em] text-accent" />
                        </span>
                      </span>
                      <span className="sr-only"> ({textosDaPagina.novaAba})</span>
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Envelope>
    </Secao>
  );
}

/**
 * Os nichos atendidos, o índice (R10, 28/10; a cena no navy, com o nome em letra grande e o sinal que corre pelo fio de
 * cada nicho até o bairro do exemplo, desde 02/11, a passiva P31): até 28/10, uma frase corrida de 14 px sob os públicos. Em ordem alfabética
 * (pedido de 03/10), em duas colunas na mesa, alinhadas às de cima (a legenda e a chapa), e numa no celular. Nos seis com
 * site de exemplo, o fio pontilhado, em bronze, até o bairro do exemplo; a linha inteira é o vínculo, de 56 px,
 * com a seta de saída. Os cinco sem exemplo ficam só com o nome (sem "—", que se leria como "não atende").
 */
export function NichosAtendidos() {
  return (
    <Secao tom="escuro" className="vd-pq-indice" data-ambiente data-passiva="para-quem-nichos">
      <Envelope className="vd-pq-grade">
        <div className="vd-pq-indice-cabeca">
          <h3 className="text-titulo">{paraQuem.nichos.rotulo}</h3>
          <p className="mt-3 max-w-[34em] text-corpo text-muted-foreground">{textosDaPagina.nichos.frase}</p>
        </div>
        <ul className="vd-pq-nichos">
          {indiceDosNichos.map((item, i) => (
            <li key={item.nicho} style={{ "--vez": i } as React.CSSProperties}>
              {item.caminho ? (
                <a href={item.caminho} target="_blank" rel="noopener" className="vd-pq-nicho vd-acende">
                  <span className="vd-acende-nome">{item.nicho}</span>
                  <span aria-hidden="true" className="vd-pq-fio mov-passiva" />
                  <span className="vd-pq-bairro">
                    {item.bairro}
                    <SetaDeSaida className="vd-acende-seta ml-2 inline-block size-3 align-[0.05em]" />
                  </span>
                  <span className="sr-only">
                    {" "}
                    ({textosDaPagina.exemplo}: {item.nome}, {textosDaPagina.novaAba})
                  </span>
                </a>
              ) : (
                <span className="vd-pq-nicho">{item.nicho}</span>
              )}
            </li>
          ))}
        </ul>
      </Envelope>
    </Secao>
  );
}
