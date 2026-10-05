import { notFound } from "next/navigation";

import { TelaDeposito } from "@/components/telas/tela-deposito";
import { TelaNutricao } from "@/components/telas/tela-nutricao";

// Rota de ferramenta, só em desenvolvimento: exibe uma tela de
// demonstrativo sozinha, em 390 × 844, para ferramentas/capturar-telas.mjs
// fotografar. Em produção a rota não existe (404): nenhuma página é
// gerada, e qualquer endereço aqui cai no "não encontrado".

const TELAS = {
  deposito: TelaDeposito,
  nutricao: TelaNutricao,
};

export const dynamicParams = false;

export function generateStaticParams() {
  if (process.env.NODE_ENV === "production") return [];
  return Object.keys(TELAS).map((tela) => ({ tela }));
}

export const metadata = { robots: { index: false, follow: false } };

export default async function PaginaDaTela({ params }: { params: Promise<{ tela: string }> }) {
  const { tela } = await params;
  const Tela = TELAS[tela as keyof typeof TELAS];
  if (!Tela || process.env.NODE_ENV === "production") notFound();
  return <Tela />;
}
