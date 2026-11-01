/**
 * Evento da navegação interna (components/ilhas/ancoras.tsx), emitido na
 * janela a cada ida a uma âncora — por clique ou por endereço com "#" na
 * chegada. `detail.id` é o destino, sem "#". O endereço não guarda a
 * âncora; quem precisa saber o destino (o montador, para marcar o plano
 * de #orcamento-<id>) ouve este evento.
 */
export const EVENTO_ANCORA = "atlas:ancora";

export type DetalheDaAncora = { id: string };
