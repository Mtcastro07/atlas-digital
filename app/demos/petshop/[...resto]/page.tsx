import { notFound } from "next/navigation";

// Qualquer endereço desconhecido sob /demos/petshop: a página que não existe, dentro do cartão (../not-found.tsx). Sem
// isto, o Next mostraria a 404 do Atlas, fora do site.

export default function Resto() {
  notFound();
}
