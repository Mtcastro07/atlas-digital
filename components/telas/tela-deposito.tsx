import { IconeMenu, IconeWhatsApp } from "@/components/icones";
import { fonteDoNicho, fontesDosNichos } from "@/components/nichos/fontes";
import { MarcaDoDeposito } from "@/components/nichos/marcas";
import { MolduraDeTela } from "@/components/telas/moldura";
import { deposito } from "@/conteudo/nichos";

// Tela A: o site do depósito de material de construção no celular, na
// identidade do nicho — placa de obra e ficha técnica. Grafite de cimento,
// laranja de sinalização só no que pede atenção, Oswald em caixa-alta,
// canto curto. A fita zebrada abre a página e a parede de blocos fica ao
// fundo da capa. O caminho é o do balcão: o horário logo na primeira tela,
// a conta da parede (com a trena sob as medidas), a lista que a conta gera
// e o envio dela pelo WhatsApp; no fim, o raio de entrega no mapa do
// bairro, com a marca da casa como alfinete. data-alvo="n" marca o
// elemento que a nota n aponta (o marcador cai no canto superior direito,
// que fica livre); a ferramenta de captura mede a posição.

const placa = `${fonteDoNicho} uppercase`;
const rotulo = "text-[9.5px] font-semibold tracking-[0.13em] text-muted-foreground uppercase";

/** Mapa do bairro em vetor (ESTEIRA, VI.3): a avenida, as ruas e o raio de entrega em volta do depósito. */
function MapaDeEntrega() {
  return (
    <svg viewBox="0 0 350 92" aria-hidden="true" className="block w-full">
      <rect width="350" height="92" fill="var(--deep)" />
      <g fill="none" stroke="var(--muted)" strokeLinecap="round">
        <path d="M-8 26C70 18 150 34 230 24S330 12 358 16" strokeWidth="7" />
        <path d="M-8 72C60 66 140 80 220 70S320 64 358 68" strokeWidth="4" />
        <path d="M58-8C64 28 52 62 66 100" strokeWidth="4" />
        <path d="M150-8 142 100" strokeWidth="3.5" />
        <path d="M232-8C226 36 246 62 238 100" strokeWidth="4" />
        <path d="M302-8 318 100" strokeWidth="3" />
        <path d="M66 48 144 52M238 46 308 42M12 94 60 86" strokeWidth="2.5" />
      </g>
      <circle
        cx="196"
        cy="47"
        r="38"
        fill="var(--primary)"
        fillOpacity="0.09"
        stroke="var(--primary)"
        strokeWidth="1.5"
        strokeDasharray="4 5"
      />
      <MarcaDoDeposito x="184" y="35" width="24" height="24" />
    </svg>
  );
}

export function TelaDeposito() {
  const { tela } = deposito;
  const { horario, calculo } = tela;

  return (
    <MolduraDeTela tom="deposito" fonte={fontesDosNichos.deposito}>
      <span aria-hidden="true" className="vd-zebrada h-1.5 flex-none" />
      <header className="flex h-14 flex-none items-center justify-between border-b border-border px-5">
        <span className="flex items-center gap-2.5">
          <MarcaDoDeposito className="size-[34px]" />
          <span className="leading-none">
            <span className={`${placa} block text-[16.5px] tracking-[0.03em]`}>{deposito.casa}</span>
            <span className={`mt-1 block ${rotulo}`}>{deposito.nicho}</span>
          </span>
        </span>
        <span className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-full border border-border text-accent">
            <IconeWhatsApp className="size-[17px]" />
          </span>
          <IconeMenu className="size-6" />
        </span>
      </header>

      <div className="relative flex flex-1 flex-col gap-2.5 px-5 pt-3 pb-8">
        <span
          aria-hidden="true"
          className="vd-blocos pointer-events-none absolute inset-x-0 top-0 h-[250px] [mask-image:linear-gradient(to_bottom,black_35%,transparent)]"
        />

        <div className="relative">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-accent uppercase">{tela.bairro}</p>
          <h1 className={`${placa} mt-1 text-[30px] leading-[1.02]`}>{tela.titulo}</h1>
        </div>

        {/* A placa do horário: o aviso de aberto e a semana em três colunas. */}
        <div data-alvo="1" className="relative overflow-hidden rounded-[10px] border border-border bg-card">
          <p className={`${placa} flex items-center gap-2 border-b border-border px-3.5 py-1.5 text-[13px] tracking-[0.05em]`}>
            <span className="size-2 rounded-full bg-primary ring-[3px] ring-primary/25" />
            {horario.estado}
            <span className="text-muted-foreground">{horario.fecha}</span>
          </p>
          <dl className="grid grid-cols-3 divide-x divide-border">
            {horario.dias.map(({ dia, hora, fechado }) => (
              <div key={dia} className="px-3.5 pt-1.5 pb-[7px]">
                <dt className={rotulo}>{dia}</dt>
                <dd className={`${placa} mt-0.5 text-[15px] tabular-nums ${fechado ? "text-muted-foreground" : ""}`}>{hora}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* A ficha técnica: o serviço, as medidas sobre a trena, o resultado em
            corpo de placa e a lista que ele gera; no pé, o envio da lista. */}
        <div className="rounded-[12px] border border-border bg-card p-3">
          <div data-alvo="2">
            <p className={`${placa} text-[13px] tracking-[0.06em] text-muted-foreground`}>{calculo.titulo}</p>
            <div className="mt-2.5 grid grid-cols-3 gap-1 rounded-[8px] bg-deep p-1">
              {calculo.servicos.map((servico, i) => (
                <span
                  key={servico}
                  className={`${placa} rounded-[6px] py-1 text-center text-[12.5px] tracking-[0.05em] ${
                    i === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {servico}
                </span>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {calculo.medidas.map((medida) => (
                <span key={medida.rotulo} className="relative overflow-hidden rounded-[8px] bg-deep px-3 pt-1 pb-3">
                  <span className={`block ${rotulo}`}>{medida.rotulo}</span>
                  <span className={`${placa} block text-[21px] leading-tight tabular-nums`}>
                    {medida.valor} <span className="text-[14px] text-muted-foreground normal-case">{medida.unidade}</span>
                  </span>
                  <span aria-hidden="true" className="vd-trena absolute inset-x-0 bottom-0 h-[9px]" />
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-end gap-3">
              <span className={`${placa} text-[52px] leading-[0.8] text-accent tabular-nums`}>{calculo.resultado.quantidade}</span>
              <span>
                <span className={`${placa} block text-[17px] leading-none`}>{calculo.resultado.item}</span>
                <span className="mt-1 block text-[11.5px] leading-none text-muted-foreground tabular-nums">{calculo.resultado.medida}</span>
              </span>
            </div>
            <ul className="mt-3 border-t border-dashed border-input">
              {calculo.itens.map(({ item, quantidade }) => (
                <li key={item} className="flex items-baseline justify-between gap-3 border-b border-dashed border-input py-1.5 text-[12.5px]">
                  <span>{item}</span>
                  <span className={`${placa} text-[14px] tabular-nums`}>{quantidade}</span>
                </li>
              ))}
            </ul>
          </div>
          <span
            data-alvo="3"
            className={`${placa} mt-3 flex h-12 items-center justify-center gap-2.5 rounded-[8px] bg-primary text-[15.5px] tracking-[0.04em] text-primary-foreground`}
          >
            <IconeWhatsApp className="size-[19px]" />
            {tela.acao}
          </span>
        </div>

        {/* A entrega: o título numa placa sobre o mapa, o prazo embaixo. */}
        <div data-alvo="4" className="relative mt-auto overflow-hidden rounded-[12px] border border-border bg-card">
          <MapaDeEntrega />
          <p className={`${placa} absolute top-2.5 left-2.5 rounded-[6px] border border-border bg-card px-2 py-[3px] text-[12.5px] tracking-[0.05em]`}>
            {tela.entrega.titulo}
          </p>
          <p className="px-3.5 pt-2 pb-2.5 text-[12px] leading-snug text-muted-foreground">{tela.entrega.texto}</p>
        </div>
      </div>
    </MolduraDeTela>
  );
}
