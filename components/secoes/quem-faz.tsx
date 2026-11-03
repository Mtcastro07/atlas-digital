import { existsSync, statSync } from "node:fs";
import path from "node:path";

import { Envelope, Secao } from "@/components/estrutura";
import { Lide, Titulo } from "@/components/tipografia";
import { buttonVariants } from "@/components/ui/button";
import { quemFazDetalhe } from "@/conteudo/paginas/o-atlas";
import { mensagens, quemFaz } from "@/conteudo/site";
import { linkWhatsApp } from "@/lib/whatsapp";

/** Extensões aceitas para a foto de um sócio, na ordem de preferência. */
const EXTENSOES = [".webp", ".avif", ".jpg", ".jpeg", ".png"];
/** Acima disso, em desenvolvimento, a vaga avisa que a foto está pesada. */
const LIMITE_KB = 200;

type Foto = { src: string; kb: number };

/**
 * A foto de um sócio, se o arquivo já estiver em public/socios/ (a
 * primeira extensão que existir). Lida no servidor, na compilação: a foto
 * nova entra na próxima compilação (no npm run dev, na próxima carga).
 */
function fotoDe(nome: string): Foto | null {
  // O retrato recortado (R10, 02/11; ferramentas/tratar-retratos.mjs): o mesmo recorte nos três, com a cor da foto.
  if (existsSync(path.join(process.cwd(), "public", "socios", "tratados", `${nome}.webp`))) return { src: `/socios/tratados/${nome}.webp`, kb: 0 };
  for (const extensao of EXTENSOES) {
    const arquivo = path.join(process.cwd(), "public", "socios", nome + extensao);
    if (existsSync(arquivo)) return { src: `/socios/${nome}${extensao}`, kb: Math.round(statSync(arquivo).size / 1024) };
  }
  return null;
}

/** As marcações de vaga só aparecem em desenvolvimento; o site publicado nunca as mostra. */
const emDesenvolvimento = process.env.NODE_ENV === "development";

/** A marcação da vaga: a foto que falta, com o caminho esperado, ou a pesada demais, com a ferramenta que a converte. */
function avisoDaVaga(nome: string, foto: Foto | null) {
  if (!emDesenvolvimento) return null;
  if (!foto) return { rotulo: "Foto pendente:", caminho: `public/socios/${nome}.webp` };
  if (foto.kb > LIMITE_KB) return { rotulo: `Foto pesada (${foto.kb} KB):`, caminho: "node ferramentas/preparar-fotos.mjs" };
  return null;
}

/**
 * "Quem faz" (desde 28/10, R10; CONTRATO.md, seção 5; a rota e os retratos grandes, desde 02/11, no acabamento): só as
 * pessoas, na pedra, na ordem do lide (venda, desenvolvimento, suporte), e quem conduz cada etapa do trabalho, tirado do
 * kit (producao/esteira/01-processo.md; as fontes, célula a célula, em conteudo/paginas/o-atlas.ts).
 * - O h2 e o lide de hoje, literais. A formação e a origem, ditas uma vez na página, abrem a seção, ligadas à história
 *   e ao nome, logo acima: a sala de aula é a da UFF, e o nome traduz o propósito.
 * - Os três retratos em toda a largura do Envelope, no mesmo recorte (ferramentas/tratar-retratos.mjs). O movimento é
 *   a passiva P13: a aproximação lenta de cada retrato e a luz que passa na borda, sem véu sobre o rosto.
 * - O nome completo em Archivo 500; a função embaixo, no bronze do vínculo (o site mostra funções, e não títulos:
 *   01-processo.md:24); o compromisso de cada um [provisório], no apagado.
 * - A rota: as cinco etapas numa linha, com o marcador que anda (a passiva P16). Na mesa, uma <table> de verdade, com uma
 *   coluna por etapa: em cima, quem responde; embaixo, quem participa. No celular, a mesma rota na vertical, numa lista.
 * - A ação: "Falar com os sócios no WhatsApp", na pílula de metal (sem o halo); o atalho flutuante some enquanto ela
 *   está à vista (data-sem-atalho).
 * Até 02/11: retratos de 160 px à direita de uma coluna vazia, e uma tabela com os sócios nas colunas. Até 28/10: o nome
 * curto de Gabriel e a chapa navy com o vidro líquido, cuja nota sobre o nome passou à origem (secoes/historia.tsx).
 */
export function QuemFaz() {
  const { ordem, compromissos, etapas } = quemFazDetalhe;
  const socios = ordem.map((i) => quemFaz.socios[i]);
  const fotos = socios.map((socio) => fotoDe(socio.foto));
  /** O nome, o retrato pequeno e o texto de quem responde pela etapa; os outros, com o nome e o que fazem nela. */
  const naEtapa = (papeis: (typeof etapas)[number]["papeis"]) => {
    const pessoas = papeis.flatMap((papel, s) => (papel ? [{ ...papel, socio: socios[s], foto: fotos[s] }] : []));
    return { conduz: pessoas.find((p) => p.responde)!, participam: pessoas.filter((p) => !p.responde) };
  };
  return (
    // Na pedra (16/10): a névoa da origem, de cima, e a pedra ficam a 0,050 de L, uma virada de cena.
    <Secao id="atlas" tom="pedra" className="vd-quem-faz">
      <Envelope>
        <Titulo linhas={quemFaz.titulo} />
        <Lide className="mt-8">{quemFaz.lide}</Lide>

        <p className="vd-socios-formacao">{quemFazDetalhe.formacao}</p>

        <ul className="vd-socios" data-ambiente data-passiva="o-atlas-retratos">
          {socios.map((socio, s) => {
            const foto = fotos[s];
            const aviso = avisoDaVaga(socio.foto, foto);
            return (
              <li key={socio.nome} className="vd-socio">
                {/* O retrato: a foto, ou as iniciais enquanto ela não existe. Decorativo: o nome está logo abaixo. */}
                <span aria-hidden="true" data-ambiente className={`vd-retrato${aviso && !foto ? " vd-retrato-vaga" : ""}`} style={{ "--vez": s } as React.CSSProperties}>
                  <span className="vd-retrato-foto">
                    {foto ? (
                      <span className="vd-retrato-lente mov-passiva">
                        <img src={foto.src} alt="" width={640} height={640} loading="lazy" decoding="async" />
                      </span>
                    ) : (
                      socio.iniciais
                    )}
                  </span>
                  <span className="vd-retrato-luz mov-passiva" />
                </span>
                <h3 className="vd-socio-nome">{socio.nome}</h3>
                <p className="vd-socio-funcao">{socio.funcao}</p>
                <p className="vd-socio-compromisso">{compromissos[s]}</p>
                {aviso && (
                  <p className="mt-1.5 text-base text-accent">
                    {aviso.rotulo} {aviso.caminho}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </Envelope>

      {/* A rota: mais larga que o Envelope, para as cinco colunas terem medida. */}
      <div className="vd-rota" data-ambiente data-passiva="o-atlas-rota">
        <h3 className="vd-rota-titulo">{quemFazDetalhe.legenda}</h3>
        <div className="vd-rota-corpo">
          <div className="vd-rota-janela" aria-hidden="true">
            <span className="vd-rota-luz mov-passiva" />
          </div>
          <div className="vd-rota-trilho" aria-hidden="true">
            <span className="vd-rota-marcador mov-passiva" />
          </div>
          {/* A mesa: uma coluna por etapa; a primeira linha diz quem responde, a segunda, quem participa. */}
          <table className="vd-etapas">
            <caption className="sr-only">{quemFazDetalhe.legenda}</caption>
            <thead>
              <tr>
                {etapas.map(({ etapa }) => (
                  <th key={etapa} scope="col">
                    {etapa}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="vd-etapas-conduz">
                {etapas.map(({ etapa, papeis }) => {
                  const { conduz } = naEtapa(papeis);
                  return (
                    <td key={etapa}>
                      {conduz.foto && <img src={conduz.foto.src} alt="" width={64} height={64} loading="lazy" decoding="async" className="vd-rota-rosto" />}
                      <strong className="vd-rota-nome">{conduz.socio.nome}</strong>
                      <span className="vd-rota-responde">{quemFazDetalhe.responde}</span> {conduz.texto}
                    </td>
                  );
                })}
              </tr>
              <tr className="vd-etapas-apoio">
                {etapas.map(({ etapa, papeis }) => {
                  const { participam } = naEtapa(papeis);
                  return (
                    <td key={etapa}>
                      {participam.map((p) => (
                        <p key={p.socio.nome}>
                          <strong>{p.socio.nome}.</strong> {p.texto}
                        </p>
                      ))}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
          {/* O celular: a mesma rota, na vertical. */}
          <ol className="vd-rota-lista">
            {etapas.map(({ etapa, papeis }) => {
              const { conduz, participam } = naEtapa(papeis);
              return (
                <li key={etapa}>
                  <h4>{etapa}</h4>
                  <div className="vd-rota-quem">
                    {conduz.foto && <img src={conduz.foto.src} alt="" width={64} height={64} loading="lazy" decoding="async" className="vd-rota-rosto" />}
                    <strong className="vd-rota-nome">{conduz.socio.nome}</strong>
                  </div>
                  <p>
                    <span className="vd-rota-responde">{quemFazDetalhe.responde}</span> {conduz.texto}
                  </p>
                  {participam.map((p) => (
                    <p key={p.socio.nome} className="vd-rota-apoio">
                      <strong>{p.socio.nome}.</strong> {p.texto}
                    </p>
                  ))}
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <Envelope>
        <div data-sem-atalho className="mt-14 md:mt-16">
          <a href={linkWhatsApp(mensagens.contato)} target="_blank" rel="noopener" className={buttonVariants({ size: "lg" })}>
            {quemFazDetalhe.acao}
          </a>
        </div>
      </Envelope>
    </Secao>
  );
}
