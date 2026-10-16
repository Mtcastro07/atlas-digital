import type { Metadata } from "next";
import Link from "next/link";

import { Moldura } from "@/components/demos/nutricao/moldura";
import { envelope, Titulo } from "@/components/demos/nutricao/pecas";
import { nutricaoSite as site } from "@/conteudo/demos/nutricao";

// A página que não existe, dentro da folha: o cabeçalho de jornal, com o índice das três páginas, o título e a volta à
// primeira página, e o colofão (fechamento com o Impeccable, 16.10.2026: até então, a 404 navy do Atlas, com "Voltar ao
// início" levando à agência). Endereços desconhecidos sob /demos/nutricao chegam aqui pelo [...resto]/page.tsx. Sem
// momento nem marca-texto: é uma folha de aviso.

const { naoEncontrada } = site;

export const metadata: Metadata = { title: `${naoEncontrada.rotulo} · ${site.nome} · demonstração` };

export default function NaoEncontrada() {
  return (
    <Moldura rotulo={naoEncontrada.rotulo}>
      <section aria-labelledby="titulo" className={`${envelope} mt-8 lg:mt-12`}>
        <Titulo id="titulo" como="h1" linhas={naoEncontrada.titulo} className="text-[clamp(52px,8vw,118px)] leading-[0.9] tracking-[-0.036em]" />
        <p className="mt-8 max-w-[46ch] text-[19px] leading-[1.55] text-muted-foreground">{naoEncontrada.texto}</p>
        <Link href={site.caminho} className="nt-vinculo mt-6 inline-flex min-h-11 items-center text-[18px]">
          {naoEncontrada.voltar} →
        </Link>
      </section>
    </Moldura>
  );
}
