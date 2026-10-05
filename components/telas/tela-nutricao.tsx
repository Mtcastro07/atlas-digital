import { IconeMenu } from "@/components/icones";
import { fonteDeCartazDaNutricao, fonteDoNicho, fontesDosNichos } from "@/components/nichos/fontes";
import { MarcaDaNutricao } from "@/components/nichos/marcas";
import { MolduraDeTela } from "@/components/telas/moldura";
import { nutricao } from "@/conteudo/nichos";

// Tela B: o site do consultório de nutrição no celular, na identidade do
// nicho — caderno editorial. Palha, verde de horta e damasco (só na ação),
// Fraunces nos títulos e nos números, cantos redondos e manchas suaves ao
// fundo. O registro no conselho fica no cabeçalho; a consulta tem valor
// declarado, sem lógica promocional; a agenda mostra a semana com os
// horários livres de cada dia e marca os dois toques (o horário e o
// agendar); as etapas ficam no lugar do depoimento, vedado pela norma; o
// consultório fecha a página, com a marca como alfinete no mapa.
// data-alvo="n" marca o elemento que a nota n aponta (o marcador cai no
// canto superior direito, que fica livre); a ferramenta de captura mede a
// posição.

/** Mapa do entorno em vetor (ESTEIRA, VI.3): as ruas, o verde do Campo de São Bento e o consultório. */
function MapaDoConsultorio() {
  return (
    <svg viewBox="0 0 116 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="block h-full w-full">
      <rect width="116" height="120" fill="var(--deep)" />
      <rect x="60" y="62" width="46" height="40" rx="10" fill="var(--marca)" fillOpacity="0.55" />
      <g fill="none" stroke="var(--card)" strokeLinecap="round">
        <path d="M-6 30 122 20" strokeWidth="6" />
        <path d="M-6 56 122 54" strokeWidth="3.5" />
        <path d="M-6 110 122 108" strokeWidth="3.5" />
        <path d="M28-6 34 126" strokeWidth="3.5" />
        <path d="M54-6 56 126" strokeWidth="3" />
        <path d="M110-6 112 126" strokeWidth="3" />
      </g>
      <circle cx="41" cy="42" r="17" fill="var(--primary)" fillOpacity="0.12" />
      <MarcaDaNutricao x="29" y="30" width="24" height="24" />
    </svg>
  );
}

/** O dia na agenda da semana: o escolhido em destaque; o sem horário livre, apagado; os outros, no fundo comum. */
function corDoDia(escolhido: boolean, livres: number) {
  if (escolhido) return "bg-secondary text-secondary-foreground";
  if (livres === 0) return "text-muted-foreground opacity-50";
  return "bg-muted";
}

export function TelaNutricao() {
  const { tela } = nutricao;
  const { agenda } = tela;

  return (
    <MolduraDeTela tom="nutricao" fonte={`${fontesDosNichos.nutricao} ${fonteDeCartazDaNutricao.variable}`}>
      <header className="flex h-[60px] flex-none items-center justify-between border-b border-border px-5">
        <span className="flex items-center gap-3">
          <MarcaDaNutricao className="size-10" />
          <span>
            <span className={`${fonteDoNicho} block text-[18.5px] leading-tight tracking-[-0.015em]`}>{nutricao.casa}</span>
            <span className="block text-[11px] text-muted-foreground">{tela.credencial}</span>
          </span>
        </span>
        <IconeMenu className="size-6" />
      </header>

      <div className="relative flex flex-1 flex-col px-5 pt-4 pb-8">
        <span aria-hidden="true" className="vd-mancha pointer-events-none absolute inset-0" />

        <div className="relative">
          <p className="text-[12px] font-medium text-accent">{tela.bairro}</p>
          {/* O título na Fraunces de cartaz do site (components/demos/nutricao/fontes.ts): app e site são a mesma marca. */}
          <h1 className="mt-1 font-[family-name:var(--font-exibicao)] text-[34px] leading-[1.02] tracking-[-0.03em]">{tela.titulo}</h1>
          <p className="mt-2 text-[13.5px] leading-[1.42] text-muted-foreground">{tela.subtitulo}</p>
        </div>

        {/* A consulta e a agenda: o valor declarado, a semana com os horários
            livres de cada dia (um ponto por horário) e os dois toques. */}
        <div className="relative mt-4 rounded-[24px] border border-border bg-card p-4 shadow-[0_14px_34px_-22px_color-mix(in_srgb,var(--foreground)_45%,transparent)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className={`${fonteDoNicho} text-[17px] leading-tight tracking-[-0.01em]`}>{tela.consulta.nome}</p>
              <p className="mt-0.5 text-[11.5px] text-muted-foreground">{tela.consulta.duracao}</p>
            </div>
            <p className={`${fonteDoNicho} text-[17px] leading-tight tabular-nums`}>{tela.consulta.preco}</p>
          </div>

          <div data-alvo="1" className="mt-3 border-t border-border pt-2.5">
            <p className="text-[11.5px] font-medium text-muted-foreground">{agenda.titulo}</p>
            <div className="mt-2 grid grid-cols-5 gap-1.5">
              {agenda.dias.map((d, i) => {
                const escolhido = i === agenda.diaEscolhido;
                return (
                  <span key={d.dia} className={`rounded-[16px] pt-1.5 pb-2 text-center ${corDoDia(escolhido, d.livres)}`}>
                    <span className="block text-[10.5px] opacity-80">{d.dia}</span>
                    <span className={`${fonteDoNicho} block text-[19px] leading-tight tabular-nums`}>{d.data}</span>
                    <span className="mt-1 flex h-[5px] justify-center gap-[3px]">
                      {Array.from({ length: d.livres }, (_, n) => (
                        <span key={n} className={`size-[5px] rounded-full ${escolhido ? "bg-secondary-foreground" : "bg-marca"}`} />
                      ))}
                    </span>
                  </span>
                );
              })}
            </div>
            <div className="mt-2.5 grid grid-cols-4 gap-1.5">
              {agenda.horarios.map((horario, i) => (
                <span
                  key={horario}
                  className={`rounded-full py-[7px] text-center text-[13px] tabular-nums ${
                    i === agenda.horarioEscolhido
                      ? "bg-primary/10 font-semibold text-accent ring-[1.5px] ring-primary"
                      : "ring-1 ring-border"
                  }`}
                >
                  {horario}
                </span>
              ))}
            </div>
          </div>

          <span
            data-alvo="2"
            className="mt-3 flex h-[46px] items-center justify-center rounded-full bg-primary text-[14.5px] font-semibold text-primary-foreground"
          >
            {tela.acao}
          </span>
        </div>

        {/* As etapas numa linha: os números em Fraunces, ligados por um fio de verde de horta. */}
        <div data-alvo="3" className="relative mt-5">
          <p className={`${fonteDoNicho} text-[16.5px] tracking-[-0.01em]`}>{tela.etapas.titulo}</p>
          <ol className="relative mt-3 grid grid-cols-3 gap-2">
            <span aria-hidden="true" className="absolute top-[13px] right-[16.6%] left-[16.6%] h-px bg-marca" />
            {tela.etapas.itens.map((etapa, i) => (
              <li key={etapa.nome} className="relative flex flex-col items-center text-center">
                <span
                  className={`${fonteDoNicho} grid size-[27px] place-items-center rounded-full bg-background text-[14px] leading-none text-accent ring-1 ring-marca tabular-nums`}
                >
                  {i + 1}
                </span>
                <span className="mt-2 text-[12.5px] leading-tight font-medium">{etapa.nome}</span>
                <span className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{etapa.prazo}</span>
              </li>
            ))}
          </ol>
        </div>

        <div data-alvo="4" className="relative mt-auto flex overflow-hidden rounded-[22px] border border-border bg-card">
          <div className="flex-1 py-3 pr-3 pl-4">
            <p className={`${fonteDoNicho} text-[15.5px] leading-tight tracking-[-0.01em]`}>{tela.local.titulo}</p>
            <p className="mt-1 text-[11.5px] leading-snug text-muted-foreground">{tela.local.texto}</p>
            <p className="mt-2 flex gap-1.5">
              {tela.local.modalidades.map((modalidade) => (
                <span key={modalidade} className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium">
                  {modalidade}
                </span>
              ))}
            </p>
          </div>
          <div className="w-[100px] flex-none">
            <MapaDoConsultorio />
          </div>
        </div>
      </div>
    </MolduraDeTela>
  );
}
