"use client";

import { useEffect, useRef, useState } from "react";

import { aCadaMinuto, aoVivo } from "@/lib/ambiente";
import { escritaDoInstante, rascunho } from "@/lib/prazo";
import { relogio } from "@/lib/sol";
import { familiaDoTitulo, mostrador as mostradorChapado, type Mostrador } from "@/lib/traco-e-ponto";

/**
 * O mostrador do prazo da capa (desde 17/10, a direção final do Atlas Digital, seções 2.4 e 3, item 1): "se o briefing
 * completo fechar agora, o rascunho chega até dom. 18/10, 18:28:43", o número que vende, calculado neste aparelho a cada
 * segundo (lib/prazo.ts, 24 horas corridas: decisão do aprovador, por omissão, 17/10). A anatomia da leitura
 * (.vd-leitura, app/digital.css): o rótulo, o valor e o carimbo, que diz a regra e a fonte.
 * O valor: desde 17/10, a reserva da seção 2.4 da direção, porque o teste do desconhecido do esboço leu o meio-tom como
 * "painel de LED" e "quadro de partidas de aeroporto" (os três leitores): o Archivo Black chapado, com a caixa fixa dos
 * algarismos (0,66 em, a de components/algarismos.tsx: o número não dança), e a troca em Bayer, em 220 ms, só nas
 * casas que mudaram (o algarismo velho se dissolve no novo pela matriz 4 × 4 em casas de 3 px; nunca um quadro sem
 * algarismo, nunca o odômetro; desde 18/10, o mostrador de lib/traco-e-ponto.ts, o mesmo do resto do site). Num
 * canvas aria-hidden; o leitor de tela ouve a frase inteira, sem os segundos, no texto escondido. O servidor não sabe que horas são: o HTML traz "amanhã, a esta hora", uma frase completa e
 * verdadeira, que a ilha troca depois de montar. No celular, em duas linhas (a data e a hora).
 * O relógio passa por aoVivo (lib/ambiente.ts): para com a pausa e fora da tela; com movimento reduzido, mostra a hora
 * certa sem os segundos e muda a cada minuto, sem a troca em Bayer (até 17/10, o relógio ficava parado na hora da
 * carga: o fechamento com o Impeccable, B, item 9).
 */

export function MostradorDoPrazo({ rotulo, antes, carimbo }: { rotulo: string; antes: string; carimbo: string }) {
  const valor = useRef<HTMLSpanElement>(null);
  const tela = useRef<HTMLCanvasElement>(null);
  const [frase, setFrase] = useState("");
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const caixa = valor.current!;
    const canvas = tela.current!;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)");
    const familia = familiaDoTitulo();
    let mostrador: Mostrador | null = null;
    let corpo = 0;
    let celular = false;
    let ativo = true;

    const escrever = (animar = true) => {
      if (!mostrador) return;
      const fim = rascunho(relogio());
      const curto = reduzir.matches;
      const texto = escritaDoInstante(fim, !curto);
      mostrador.escrever(celular ? texto.replace(", ", ",\n") : texto, animar && !curto);
      setFrase(escritaDoInstante(fim, false));
    };
    // O corpo vem do CSS (.vd-capa-valor, em rem e vw): o mostrador se refaz quando a janela o muda.
    const montar = () => {
      const novo = parseFloat(getComputedStyle(caixa).fontSize);
      const naMesa = window.matchMedia("(width >= 48rem)").matches;
      if (novo === corpo && naMesa !== celular) return;
      corpo = novo;
      celular = !naMesa;
      mostrador?.parar();
      const dias = ["seg", "ter", "qua", "qui", "sex", "sáb", "dom"].map((d) => `${d}. 88/88,${celular ? "\n" : " "}88:88:88`);
      mostrador = mostradorChapado(canvas, familia, corpo, dias, getComputedStyle(caixa).color);
      escrever(false);
    };

    let parar = () => {};
    document.fonts.load(`64px ${familia}`, "0123456789/:,.sábdomqugert").then(() => {
      if (!ativo) return;
      montar();
      setPronto(true);
      const segundos = aoVivo(caixa, () => escrever(), 1000);
      const minutos = aCadaMinuto(caixa, () => reduzir.matches && escrever(false));
      parar = () => {
        segundos();
        minutos();
      };
    });
    let pedido = 0;
    const redimensionar = () => {
      cancelAnimationFrame(pedido);
      pedido = requestAnimationFrame(montar);
    };
    window.addEventListener("resize", redimensionar);
    return () => {
      ativo = false;
      cancelAnimationFrame(pedido);
      window.removeEventListener("resize", redimensionar);
      mostrador?.parar();
      parar();
    };
  }, []);

  return (
    <div className="vd-leitura vd-capa-leitura">
      {/* Antes da ilha, a frase estável é texto comum (o robô e o leitor de tela a leem uma vez); depois, o valor vivo vai
          no canvas aria-hidden, e o leitor de tela ouve a frase sem os segundos, no texto escondido. */}
      <p className="rotulo">
        {rotulo}
        {pronto && <span className="sr-only"> {frase}.</span>}
      </p>
      <span ref={valor} className="valor vd-capa-valor" data-pronto={pronto || undefined}>
        <span className="vd-capa-antes">{antes}</span>
        <canvas ref={tela} aria-hidden="true" />
      </span>
      <p className="carimbo">{carimbo}</p>
    </div>
  );
}
