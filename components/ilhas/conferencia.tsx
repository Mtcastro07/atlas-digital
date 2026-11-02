"use client";

import { useEffect, useState } from "react";

type Contagem = { nenhum: string; um: string; varios: string };
type Textos = { espera: string; frase: string; cookies: Contagem; arquivos: Contagem; nada: string };

const contar = (n: number, c: Contagem) => (n === 0 ? c.nenhum : n === 1 ? c.um : c.varios.replace("{n}", String(n)));

/**
 * A conferência dos destaques do início (R10, 28/10): uma vez, na carga, neste aparelho, os cookies que a página
 * consegue ler (document.cookie) e os arquivos que ela carregou de outro endereço (performance, as entradas de
 * recurso), numa frase, com o singular e o plural certos. "Nada foi enviado a terceiros." só com 0 e 0. Antes da
 * conta (e sem script), a frase de espera. Os textos vêm do servidor (conteudo/paginas/inicio.ts), como dado: a ilha
 * não leva conteudo/site.ts ao navegador. Nada é gravado nem enviado.
 */
export function Conferencia({ textos }: { textos: Textos }) {
  const [frase, setFrase] = useState(textos.espera);

  useEffect(() => {
    const conferir = () => {
      const cookies = document.cookie.split(";").filter((c) => c.trim()).length;
      const arquivos = performance.getEntriesByType("resource").filter((e) => new URL(e.name, location.href).origin !== location.origin).length;
      const agora = new Date();
      const h = agora.getHours();
      const hora = `${h < 2 ? "à" : "às"} ${h}h${String(agora.getMinutes()).padStart(2, "0")}`;
      const conta = textos.frase
        .replace("{hora}", hora)
        .replace("{cookies}", contar(cookies, textos.cookies))
        .replace("{arquivos}", contar(arquivos, textos.arquivos));
      setFrase(cookies + arquivos === 0 ? `${conta} ${textos.nada}` : conta);
    };
    if (document.readyState === "complete") conferir();
    else {
      window.addEventListener("load", conferir, { once: true });
      return () => window.removeEventListener("load", conferir);
    }
  }, [textos]);

  return <p className="max-w-[46ch] text-corpo text-pretty text-foreground">{frase}</p>;
}
