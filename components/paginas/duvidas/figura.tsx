import { ROSA } from "@/components/paginas/rosa";
import { figuras } from "@/conteudo/site";

// A figura da abertura de Dúvidas: cada página interna tem a sua, e é ela que dá a identidade da página (pedido do
// usuário, 01/10: "design único e identitário de cada uma das páginas").

/** Os quadrantes, na ordem dos momentos (a de leitura). */
const QUADRANTES = ["no", "ne", "so", "se"] as const;

const LISTA = new Intl.ListFormat("pt-BR", { type: "conjunction" });

/** Os rótulos do momento numa frase, sem palavra nova: "Instagram, celular, site existente e preço." */
function assuntosDe(itens: readonly { rotulo: string }[]) {
  const [primeiro, ...resto] = itens.map((i) => i.rotulo);
  return `${LISTA.format([primeiro, ...resto.map((r) => r[0].toLowerCase() + r.slice(1))])}.`;
}

/** As 32 marcas dos rumos, num quadrado de -60 a 60: as oito principais mais longas, depois as colaterais de meio. */
const MARCAS = Array.from({ length: 32 }, (_, i) => {
  const a = (i * Math.PI) / 16;
  const dentro = i % 4 === 0 ? 53.2 : i % 2 === 0 ? 54.4 : 55.2;
  const ponto = (r: number) => [(r * Math.sin(a)).toFixed(2), (-r * Math.cos(a)).toFixed(2)];
  const [x1, y1] = ponto(dentro);
  const [x2, y2] = ponto(56.4);
  return { x1, y1, x2, y2, principal: i % 4 === 0 };
});

const VISTA = "-60 -60 120 120";

/**
 * A rosa de Dúvidas, como objeto (R10): três planos sobre a hora azul. O aro de bronze, com as 32 marcas; a rosa de oito
 * pontas, em duas faces (a mesma ROSA, de components/paginas/rosa.ts); e a agulha, acima, com a sua sombra. Cada plano é
 * um <svg> inteiro numa camada HTML: as sombras se desfocam dentro do desenho, uma vez, e só se movem depois. Três
 * passivas (app/paginas/duvidas.css): o aro e a rosa orbitam em sentidos opostos (a profundidade da peça), o brilho passa
 * de uma face à outra das pontas, e a agulha procura o norte. Quando a rosa entra na tela, a agulha sai do norte e assenta no primeiro momento.
 */
function Rosa() {
  return (
    <div aria-hidden="true" data-ambiente className="vd-rosa-peca">
      {(["no", "ne", "so", "se"] as const).map((q) => (
        <span key={q} data-rumo={q} className="vd-rosa-rumo" />
      ))}
      <div data-passiva="duvidas-aro-e-rosa" className="vd-rosa-bronze">
        <div className="vd-rosa-aro mov-passiva">
          <svg viewBox={VISTA}>
            <defs>
              <linearGradient id="rosa-aro" gradientUnits="userSpaceOnUse" x1="-42" y1="-42" x2="42" y2="42">
                <stop offset="0" stopColor="#f7e2bb" />
                <stop offset=".38" stopColor="#c08a4a" />
                <stop offset=".72" stopColor="#6b4318" />
                <stop offset="1" stopColor="#a8743a" />
              </linearGradient>
              <filter id="rosa-aro-sombra" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.4" />
              </filter>
            </defs>
            <circle cx="1.4" cy="2.6" r="58" fill="none" stroke="#020812" strokeWidth="2.2" opacity=".5" filter="url(#rosa-aro-sombra)" />
            <circle r="58" fill="none" stroke="url(#rosa-aro)" strokeWidth="2.4" />
            <circle r="52.8" fill="none" stroke="#c08a4a" strokeWidth=".5" opacity=".8" />
            <g stroke="#d9a76b">
              {MARCAS.map((m) => (
                <line key={`${m.x1} ${m.y1}`} x1={m.x1} y1={m.y1} x2={m.x2} y2={m.y2} strokeWidth={m.principal ? ".8" : ".5"} />
              ))}
            </g>
          </svg>
        </div>
        <div className="vd-rosa-pontas mov-passiva">
          <svg viewBox={VISTA}>
            <defs>
              <linearGradient id="rosa-face-acesa" x1="0" y1="-1" x2="0" y2="1">
                <stop offset="0" stopColor="#f7e2bb" />
                <stop offset="1" stopColor="#d9a76b" />
              </linearGradient>
              <linearGradient id="rosa-face-escura" x1="0" y1="-1" x2="0" y2="1">
                <stop offset="0" stopColor="#a8743a" />
                <stop offset="1" stopColor="#6b4318" />
              </linearGradient>
              <filter id="rosa-pontas-sombra" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2.2" />
              </filter>
            </defs>
            <g transform="translate(2.2 3.8)" fill="#020812" opacity=".5" filter="url(#rosa-pontas-sombra)">
              {ROSA.map((p) => (
                <path key={p.d} d={p.d} />
              ))}
            </g>
            {ROSA.map((p) => (
              <path key={p.d} d={p.d} fill={p.acesa ? "url(#rosa-face-acesa)" : "url(#rosa-face-escura)"} />
            ))}
          </svg>
          <div data-passiva="duvidas-brilho" className="vd-rosa-brilho">
            <div className="vd-rosa-brilho-acesa mov-passiva">
              <svg viewBox={VISTA}>
                {ROSA.filter((p) => p.acesa).map((p) => (
                  <path key={p.d} d={p.d} fill="#fff6e0" />
                ))}
              </svg>
            </div>
            <div className="vd-rosa-brilho-escura mov-passiva">
              <svg viewBox={VISTA}>
                {ROSA.filter((p) => !p.acesa).map((p) => (
                  <path key={p.d} d={p.d} fill="#e8bb80" />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div data-passiva="duvidas-agulha" className="vd-rosa-agulha">
        <div className="vd-rosa-agulha-sombra">
          <div className="vd-rosa-viva mov-passiva mov-constante">
            <div className="vd-rosa-gira">
              <svg viewBox={VISTA}>
                <defs>
                  <filter id="rosa-agulha-sombra" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1.6" />
                  </filter>
                </defs>
                <g filter="url(#rosa-agulha-sombra)" fill="#020812">
                  <path d="M0 -47L3.4 0L0 30L-3.4 0Z" />
                  <circle r="4.6" />
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className="vd-rosa-viva mov-passiva mov-constante">
          <div className="vd-rosa-gira">
            <svg viewBox={VISTA}>
              <path d="M0 -47L3.4 0H-3.4Z" fill="#f2f5f9" />
              <path d="M0 -47L3.4 0H0Z" fill="#cfd6df" />
              <path d="M0 30L3.4 0H-3.4Z" fill="#0b2440" />
              <path d="M0 30L-3.4 0H0Z" fill="#163a61" />
              <circle r="4.6" fill="#f1d3a1" stroke="#8a5a24" strokeWidth=".8" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Dúvidas: as perguntas pelo momento em que aparecem, os quatro nos quatro rumos, na ordem de leitura, com a rosa no
 * cruzamento. Cada momento é um vínculo (o nome e os assuntos) para a primeira pergunta dele, que se abre (ilha Ancoras);
 * sob o ponteiro ou o foco, a agulha aponta o quadrante. Desde o R10, os momentos com os assuntos no lugar das dez
 * palavras, que repetiam a lista logo abaixo. Com a letra a 200% (a coluna com menos de 16 rem), uma lista, sem a rosa.
 */
export function MapaDasDuvidas() {
  return (
    <nav aria-label="As perguntas, pelo momento em que aparecem" className="vd-rosa">
      <span aria-hidden="true" className="vd-rosa-cruz" />
      <ol>
        {figuras.momentos.map((m, i) => (
          <li key={m.momento} data-quadrante={QUADRANTES[i]}>
            <a href={`#duvida-${m.itens[0].duvida}`}>
              <span className="vd-rosa-momento">{m.momento}</span> <span className="vd-rosa-assuntos">{assuntosDe(m.itens)}</span>
            </a>
          </li>
        ))}
      </ol>
      <Rosa />
    </nav>
  );
}
