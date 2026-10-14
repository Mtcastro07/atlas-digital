import { portes } from "@/conteudo/demos/petshop";

/** O fim da régua, em kg: o grande passa dos 25 kg; a régua segue até 45 (identidade, seção 4.13). */
const ATE = 45;

/**
 * A régua de peso: o momento de Serviços e valores ("O verso do cartão"), a fita da balança da recepção impressa numa
 * tinta só. Lapidação, rodada 3 (o crítico: a fita deitada acabava em uns 35 kg, cortava a faixa do grande e deixava
 * metade da primeira tela vazia; deitada, de 0 a 45 kg na largura da tela, "Pequeno" só caberia na faixa dele a 55 px,
 * fora da escala): a fita fica de pé, ao lado do título, e sangra em cima e embaixo da abertura. O corpo dela é a faixa
 * chapada de uva, com a graduação e os números vazados na cartolina: a marca a cada quilo, a longa a cada 5, o número a
 * cada 5. À direita, na cartolina, o nome de cada porte dentro da faixa dele, a 80 px, com o peso escrito embaixo; os
 * cortes de 10 e 25 kg atravessam a fita e correm até a margem. A escala é linear, de propósito (explica o porte pelo
 * peso), de 0 a 45 kg, inteira na tela; o quilo sai da altura da tela (servicos.css). A escala é desenho (aria-hidden);
 * os portes são uma lista, lida na ordem do peso. `legenda`: o id do texto que diz como se pesa.
 */
export function ReguaDePeso({ legenda }: { legenda: string }) {
  return (
    <figure aria-labelledby={legenda} className="bt-verso-regua">
      <div aria-hidden="true" className="bt-tinta bt-verso-escala">
        {Array.from({ length: ATE + 1 }, (_, kg) => (
          <span key={kg} className="bt-verso-marca" data-cinco={kg % 5 ? undefined : ""} style={{ "--kg": kg } as React.CSSProperties}>
            {kg % 5 ? null : (
              <span className="bt-verso-numero">
                {kg}
                {kg === 0 && <span className="bt-verso-unidade"> kg</span>}
              </span>
            )}
          </span>
        ))}
      </div>
      <ul className="bt-verso-portes">
        {portes.map((p, i) => (
          <li key={p.id} style={{ "--kg": i ? portes[i - 1].ateKg : 0 } as React.CSSProperties}>
            <span className="bt-verso-porte">{p.nome}</span> <span className="bt-verso-faixa">{p.faixa}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
