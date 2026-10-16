import Link from "next/link";
import { notFound } from "next/navigation";

import { LinhaDoTempo } from "@/components/demos/odontologia/linha-do-tempo";
import { AcaoWhatsApp, Ancora, dentesDas, metadadosDe, paginaDe } from "@/components/demos/odontologia/pecas";
import { avisoDeValores, dentistaDe, mapa, odontologiaSite as site, regioes, ressalvaDasSessoes, tratamentoDe, tratamentoPagina, tratamentos, type IdDoTratamento } from "@/conteudo/demos/odontologia";
import { mensagemDoTratamento } from "@/lib/demos/odontologia/mensagem";

export const dynamicParams = false;
export const generateStaticParams = () => tratamentos.map((t) => ({ id: t.id }));

const existe = (id: string): id is IdDoTratamento => tratamentos.some((t) => t.id === id);

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return existe(id) ? metadadosDe(id) : {};
}

/**
 * Uma página por tratamento: ocupa a busca ("canal na Boa Viagem") e explica o tempo no lugar do preço
 * (producao/esteira/nichos/odontologia.md, seção 4.1). O momento desta página: a arcada viaja da página anterior e se
 * vira para a região do tratamento (a âncora à direita, com a região), e a linha do tempo da evolução se desenha. O
 * título em cartaz (o nome) e o tempo embaixo; sessão a sessão, como a evolução clínica da ficha; os cuidados; onde se
 * aplica; quem atende, na placa; o pedido de avaliação já com o tratamento. Sem preço, sem antes e depois, sem
 * promessa, sem diagnóstico.
 */
export default async function Tratamento({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!existe(id)) notFound();
  const t = tratamentoDe(id);
  const quem = dentistaDe(t.quem);
  const onde = t.regioes.map((r) => regioes.find((x) => x.id === r)!.frase);
  // Todas as regiões pintadas fariam um anel inteiro: a placa fica sem região, e o texto diz "todas".
  const emTodas = t.regioes.length === regioes.length;
  const [nome, tempo] = t.titulo.split(": ");
  const outros = tratamentos.filter((x) => x.id !== t.id);
  return (
    <>
      <section aria-labelledby="titulo" className="od-cena od-tratamento" data-cena>
        <div className="od-largura od-tratamento-grade">
          <div className="od-tratamento-texto">
            <p>
              <Link href={paginaDe("tratamentos").caminho} className="od-lapis">
                {tratamentoPagina.todos}
              </Link>
            </p>
            <h1 id="titulo" className="od-tratamento-titulo">
              <span className="od-tratamento-nome">{nome}</span>
              {tempo && <span className="od-tratamento-tempo">{tempo}</span>}
            </h1>
            <p className="od-lide">
              {t.umaFrase} {tratamentoPagina.atende(quem)}
            </p>
          </div>
          <aside className="od-tratamento-margem">
            <h2 className="sr-only">{tratamentoPagina.regiao}</h2>
            <Ancora className="od-ancora-do-tratamento" regiao={emTodas ? undefined : t.regioes.join(" ")} inclina={-0.12} />
            <p className="od-tratamento-onde">
              {emTodas ? tratamentoPagina.emTodas : `${onde.join("; ")}.`} <span>{emTodas ? mapa.numeracao : dentesDas(t.regioes)}</span>
            </p>
            <p className="sr-only">{emTodas ? tratamentoPagina.mapaEmTodas : tratamentoPagina.mapaComRegioes(onde.join("; "))}</p>
            <div data-ceramica className="od-placa od-placa-de-nome">
              {/* O rótulo dentro do título (sem o rótulo solto acima do nome: a marca T2). */}
              <h2>
                <span className="od-placa-rotulo-miudo">{tratamentoPagina.quemAtende}</span>{" "}
                <span className="od-placa-nome">{quem.nome}</span>
              </h2>
              <p className="od-placa-cro">
                {quem.profissao}, <span className="whitespace-nowrap">{quem.cro}</span>
              </p>
              <p className="od-placa-titulo">{quem.titulo}.</p>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="sessoes" className="od-largura od-evolucao">
        <h2 id="sessoes" className="od-titulo-de-cena">
          {tratamentoPagina.sequencia}
        </h2>
        <LinhaDoTempo etapas={t.etapas} textos={tratamentoPagina.linha} minutos={tratamentoPagina.minutos} />
        <ol className="od-evolucao-lista">
          {t.etapas.map((e) => (
            <li key={e.nome}>
              <p className="od-evolucao-sessao">
                <strong>{e.nome}</strong>
              </p>
              <p className="od-evolucao-faz">{e.faz}</p>
              {e.depois && <p className="od-evolucao-depois">{e.depois}</p>}
            </li>
          ))}
        </ol>
        {/* Um bloco só: a lista alta, ao lado, esticava a linha do título e abria ~115 px até o texto (o Clareamento). */}
        <div className="od-evolucao-cuidados-bloco">
          <h2 className="od-evolucao-cuidados-titulo">{tratamentoPagina.cuidados}</h2>
          <p className="od-evolucao-cuidados">{t.cuidados}</p>
        </div>
      </section>

      <section aria-label={tratamentoPagina.pedir} className="od-largura od-ressalva">
        <p>{ressalvaDasSessoes}</p>
        <p className="od-ressalva-nota">{avisoDeValores}</p>
        <div className="od-ressalva-acoes">
          <AcaoWhatsApp rotulo={tratamentoPagina.pedir} mensagem={mensagemDoTratamento(site.acao.mensagem, t.atendimento)} />
        </div>
      </section>

      <nav aria-labelledby="outros" className="od-largura od-outros">
        <h2 id="outros" className="od-escolha-legenda">
          {tratamentoPagina.outros}
        </h2>
        <ul>
          {outros.map((x) => (
            <li key={x.id}>
              <Link href={paginaDe(x.id).caminho} className="od-lapis">
                {x.nome}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
