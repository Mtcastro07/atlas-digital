// O template remonta a cada navegação (o layout, não). Na Odontologia Boa Viagem, a troca de página é a viagem da
// arcada (o palco, no layout, leva a placa até a pose da página nova) e o assentar do conteúdo da página que chega
// (odontologia.css, .od-troca): sem a transição de página dos outros sites, que fotografaria a página por cima do
// palco e esconderia a viagem.

export default function Modelo({ children }: { children: React.ReactNode }) {
  return <div className="od-troca">{children}</div>;
}
