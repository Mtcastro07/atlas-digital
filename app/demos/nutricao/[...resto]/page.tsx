import { notFound } from "next/navigation";

// Qualquer endereço desconhecido sob /demos/nutricao: a página que não existe, dentro da folha (../not-found.tsx). Sem
// isto, o Next mostraria a 404 do Atlas, fora do site, com a volta para a agência (fechamento com o Impeccable,
// 16.10.2026; o mesmo padrão do pet shop).

export default function Resto() {
  notFound();
}
