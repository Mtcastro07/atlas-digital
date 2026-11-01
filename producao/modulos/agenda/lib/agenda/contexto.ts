// lib/agenda/contexto.ts — os dados do negócio de que os e-mails da Agenda precisam, montados de conteudo/negocio.ts, de
// conteudo/contato.ts e do ambiente (producao/esteira/14-funcionalidades/05-agenda.md, seção 6): nome, endereço com o vínculo do mapa, WhatsApp, a casa
// como organizadora do convite (SMTP_USUARIO) e a caixa do dono (CONTATO_DESTINO). Código de servidor.
import "server-only";
import { contato } from "@/conteudo/contato";
import { negocio } from "@/conteudo/negocio";
import { enderecoEmLinha } from "@/lib/horario";
import { vinculoDoMapa } from "@/lib/mapa";
import { vinculoDoWhatsapp } from "@/lib/whatsapp";
import type { ContextoDoNegocio } from "./tipos";

export function contextoDoNegocio(): ContextoDoNegocio {
  const endereco = enderecoEmLinha(negocio.endereco);
  return {
    nome: negocio.nome,
    url: negocio.url,
    dominio: contato.dominio,
    endereco,
    vinculoDoMapa: vinculoDoMapa(endereco),
    vinculoDoWhatsapp: vinculoDoWhatsapp(negocio.whatsapp),
    organizador: { nome: negocio.nome, email: process.env.SMTP_USUARIO ?? "" },
    dono: process.env.CONTATO_DESTINO ?? "",
  };
}
