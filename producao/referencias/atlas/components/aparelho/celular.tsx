import { TiltCard } from "@/components/ui/spell/tilt-card";
import { cn } from "@/lib/utils";

type Marcador = { numero: number; x: number; y: number };

type CelularProps = {
  /** Imagem da tela, 390 × 844 (public/telas/). */
  src: string;
  /** Descrição do que a tela mostra. */
  alt: string;
  /** Marcadores numerados, em % da tela (conteudo/telas-posicoes.json). */
  marcadores?: Marcador[];
  /** Inclina em 3D sob o ponteiro, com o brilho que o acompanha (Spell UI, Tilt Card; desde 03/10). */
  inclina?: boolean;
  className?: string;
};

/**
 * Celular com a tela de um demonstrativo. A moldura é CSS puro e escala
 * com a largura do contêiner (.vd-aparelho, app/vidro.css); a tela é uma
 * única imagem — bem mais leve para hidratar do que a tela em HTML.
 * Enquanto a imagem não chega, a tela pulsa devagar (vd-esqueleto; até
 * 03/10, ficava branca). A imagem é preguiçosa: os celulares ficam abaixo
 * da dobra desde que saíram da capa (03/10).
 */
export function Celular({ src, alt, marcadores = [], inclina, className }: CelularProps) {
  const aparelho = (
    <div className="vd-celular">
      <div className="vd-tela">
        <img
          src={src}
          alt={alt}
          width={390}
          height={844}
          loading="lazy"
          fetchPriority="auto"
          decoding="async"
          className="vd-esqueleto"
        />
        {marcadores.map((m) => (
          <span
            key={m.numero}
            data-marcador={m.numero}
            aria-hidden="true"
            className="vd-marcador"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
          >
            {m.numero}
          </span>
        ))}
      </div>
    </div>
  );
  return (
    <div className={cn("vd-aparelho", className)}>
      {inclina ? (
        <TiltCard limite={7} raio="15cqw">
          {aparelho}
        </TiltCard>
      ) : (
        aparelho
      )}
    </div>
  );
}
