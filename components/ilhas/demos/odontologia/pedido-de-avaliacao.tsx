"use client";

import { useEffect, useState } from "react";

import { IconeWhatsApp } from "@/components/icones";
import { EscolhaDeRegiao, type OpcaoDeRegiao } from "@/components/ilhas/demos/odontologia/escolha-de-regiao";
import { CopyButton } from "@/components/ui/spell/copy-button";
import type { RegiaoId } from "@/lib/demos/odontologia/dentes";
import { decodificarAncora, mensagemDaAvaliacao, vinculoDoWhatsapp } from "@/lib/demos/odontologia/mensagem";

type Opcao = { id: string; rotulo: string };

export type TextosDoPedido = {
  atendimento: string;
  atendimentoNota: string;
  regiao: string;
  todasAsRegioes: string;
  ultimaVisita: string;
  periodo: string;
  semResposta: string;
  mensagem: string;
  copiar: string;
  enviar: string;
  urgenciaNota: string;
  /** A abertura da mensagem, a mesma da ação principal (odontologiaSite.acao.mensagem). */
  abertura: string;
  novaAba: string;
  legendas: { superior: string; inferior: string };
};

/**
 * O pedido de avaliação: a funcionalidade 1 do Completo (producao/esteira/nichos/odontologia.md, seção 5.1). O
 * atendimento procurado (nunca um sintoma), a região da boca pelo mapa dos dentes, a última visita e o período viram
 * uma mensagem para o WhatsApp. Nada é registrado: a mensagem sai do aparelho pelo aplicativo, e o site não coleta
 * dado de saúde. A frase é a função pura de lib/demos/odontologia/mensagem.ts. A região pode chegar pelo endereço
 * (#regiao-<id>, de Tratamentos). Sem script, a página mostra a mensagem curta e o vínculo (app/demos/odontologia/
 * avaliacao/page.tsx). Recebe só o que usa.
 */
export function PedidoDeAvaliacao({
  numero,
  atendimentos,
  regioes,
  ultimasVisitas,
  periodos,
  textos,
}: {
  numero: string;
  atendimentos: readonly (Opcao & { frase: string })[];
  regioes: readonly (OpcaoDeRegiao & { frase: string })[];
  ultimasVisitas: readonly Opcao[];
  periodos: readonly Opcao[];
  textos: TextosDoPedido;
}) {
  const [atendimento, setAtendimento] = useState("");
  const [regiao, setRegiao] = useState<RegiaoId | "">("");
  const [ultima, setUltima] = useState("");
  const [periodo, setPeriodo] = useState("");

  useEffect(() => {
    const ler = () => {
      const id = decodificarAncora(window.location.hash).replace(/^regiao-/, "");
      const achada = regioes.find((r) => r.id === id);
      if (achada) setRegiao(achada.id);
    };
    ler();
    window.addEventListener("hashchange", ler);
    return () => window.removeEventListener("hashchange", ler);
  }, [regioes]);

  const mensagem = mensagemDaAvaliacao(textos.abertura, {
    atendimento: atendimentos.find((a) => a.id === atendimento)?.frase,
    regiao: regioes.find((r) => r.id === regiao)?.frase,
    ultimaVisita: ultimasVisitas.find((u) => u.id === ultima)?.rotulo,
    periodo: periodos.find((p) => p.id === periodo)?.rotulo,
  });

  return (
    <div className="od-pedido">
      <div className="od-pedido-campos">
        <fieldset className="od-escolha">
          <legend className="od-escolha-legenda">{textos.atendimento}</legend>
          <p className="od-escolha-ajuda">{textos.atendimentoNota}</p>
          <div className="od-opcoes od-opcoes-em-duas">
            {atendimentos.map((a) => (
              <label key={a.id} className="flex">
                <input type="radio" name="atendimento" value={a.id} checked={atendimento === a.id} onChange={() => setAtendimento(a.id)} className="peer sr-only" />
                <span className="od-opcao od-opcao-larga">{a.rotulo}</span>
              </label>
            ))}
          </div>
          {atendimento === "urgencia" && (
            <>
              <p className="od-nota-a-lapis">{textos.urgenciaNota}</p>
              {/* Com dor, a ação logo sob a nota, sem descer até o cartão (no celular, ele fica depois do mapa); na mesa, o
                  cartão já está ao lado, preso. */}
              <p className="od-so-no-celular">
                <a href={vinculoDoWhatsapp(numero, mensagem)} target="_blank" rel="noopener noreferrer" className="od-ceramica">
                  <IconeWhatsApp className="od-ceramica-icone" />
                  <span>{textos.enviar}</span>
                  <span className="sr-only">{textos.novaAba}</span>
                </a>
              </p>
            </>
          )}
        </fieldset>

        <EscolhaDeRegiao regioes={regioes} valor={regiao} aoMudar={setRegiao} legenda={textos.regiao} todas={textos.todasAsRegioes} legendas={textos.legendas} />

        <div className="od-pedido-linhas">
          {(
            [
              [textos.ultimaVisita, ultima, setUltima, ultimasVisitas],
              [textos.periodo, periodo, setPeriodo, periodos],
            ] as const
          ).map(([rotulo, valor, mudar, opcoes]) => (
            <label key={rotulo} className="od-linha-do-cartao">
              <span className="od-escolha-legenda">{rotulo}</span>
              <select value={valor} onChange={(e) => mudar(e.target.value)} className="od-linha-escrita">
                <option value="">{textos.semResposta}</option>
                {opcoes.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.rotulo}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </div>

      {/* A mensagem: o cartão de consulta, preenchido a lápis conforme a escolha; fica à vista ao lado, na mesa. */}
      <div className="od-cartao-de-consulta">
        <h2 className="od-cartao-de-consulta-titulo">{textos.mensagem}</h2>
        <p aria-live="polite" className="od-cartao-de-consulta-texto">
          {mensagem}
        </p>
        <div className="od-cartao-de-consulta-acoes">
          <a href={vinculoDoWhatsapp(numero, mensagem)} target="_blank" rel="noopener noreferrer" className="od-ceramica">
            <IconeWhatsApp className="od-ceramica-icone" />
            <span>{textos.enviar}</span>
            <span className="sr-only">{textos.novaAba}</span>
          </a>
          <CopyButton valor={mensagem} rotulo={textos.copiar} className="od-ceramica od-ceramica-miuda od-ceramica-fosca" />
        </div>
      </div>
    </div>
  );
}
