/**
 * A página do plano (14.10.2026): a folha da capa atravessa a segunda cena mudando de forma. Na capa, é a tira
 * inclinada; aqui, a página inteira, sobre a palha, com a orelha dobrada no canto de cima, à direita. O papel do
 * cartão, o grão, a luz parada da janela e a mesma sombra longa da capa, parada. A cena não entra: é quieta. Sob o
 * ponteiro (e no toque, enquanto o dedo está na folha), a orelha levanta, só em CSS (nutricao.css, .nt-orelha).
 */
export function PaginaDoPlano({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`nt-pagina-do-plano ${className}`}>
      <span aria-hidden="true" className="nt-orelha">
        <span className="nt-orelha-aba" />
      </span>
      {children}
    </div>
  );
}
