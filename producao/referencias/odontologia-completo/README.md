# Referência · um Completo de saúde feito só com o kit (odontologia, 08.10.2026)

> **O que é.** O site de exemplo da "Odontologia Boa Viagem", clínica fictícia de Niterói, no plano Completo, com o código e os documentos do projeto. Foi produzido em 08.10.2026 por um agente sem acesso ao repositório do Atlas, só com a pasta `producao/`, da entrada até a etapa 7 (o rascunho verificado), em cerca de 1 h 47 min. Foi o teste de produção do zero da segunda rodada (`../../atlas--relatorio--2026-10-08.md`, seção 7.7).
>
> **Para estudo, não para cópia.** Mostra como a base vira um Completo de saúde: as páginas por tratamento, as duas funcionalidades do ofício, o estado ao vivo, a norma do conselho aplicada e o relatório de QA. A identidade ("ficha clínica"), as fontes e os textos são deste exemplo. Num cliente, saem do briefing e da direção de arte (`../../esteira/04-direcao-de-arte.md`).
>
> **Registro, não se edita.** É a fotografia do projeto de teste. O site não compila daqui: o `tsconfig` e o CSS de todo site excluem `producao/`. Faltam os arquivos binários: as fontes, os ícones e a imagem de compartilhamento.

---

## 1. O estado, medido no teste

| Instrumento | Resultado |
|---|---|
| A régua | APROVA · 0 falha em 14 páginas · 2 avisos (ação abaixo de 60% no celular em Privacidade e Acessibilidade, como na base de fábrica) |
| `npm run pronto -- --exemplo` | APROVA · 0 falha · 0 aviso |
| `npm test` | 42 de 42 (9 da base e 33 do ofício: `testes/oficio.test.ts`) |
| Os fluxos de ponta a ponta (`testes/e2e/fluxos.mjs`, em Node com a biblioteca `playwright`) | 19 de 19, com e sem script |
| O roteiro de teclado (`testes/e2e/teclado.mjs`) | 10 casos, 0 problema |
| As medidas | Script de 116,9 a 120,9 KB; fontes de 59,4 KB; CLS de 0 a 0,018 |

**O que fica aberto** (o relatório, seções 9 a 11):
- **A I6, nenhuma fotografia em saúde:** não há consultório real para fotografar, e banco e IA são vedados. A regra do exemplo sem foto possível foi escrita depois deste teste (`../../esteira/11-anti-ia.md`, passo 6).
- **O defeito S4:** os números do mapa dos dentes têm de 8,7 a 10,6 px a 320 e a 360 px.
- **Sem revisão de pessoa do ofício:** um dentista nunca reviu a anatomia, as sessões e o "quando se indica" de cada tratamento. As larguras dos dentes são médias de livro-texto, a conferir (`lib/oficio/dentes.ts`).
- **Decisões simuladas:** a aprovação da identidade por um sócio e as outras do `decisoes.md`, marcadas como tais.
- **Sem medida:**
  - o Lighthouse, o INP e o aparelho real;
  - o Safari, o zoom e as cores forçadas;
  - o axe e o leitor de tela.

## 2. Do que se precisa para onde olhar

| Preciso de… | Arquivos | A regra está em |
|---|---|---|
| O odontograma como diagrama do ofício (a numeração FDI, as duas arcadas, a largura proporcional) | `lib/oficio/dentes.ts` (a geometria, pura), `components/mapa-dos-dentes.tsx` (o desenho) | `../../esteira/08-imagem-e-fotografia.md`, seção 2.3; `../../esteira/nichos/odontologia.md`, seção 6.7 |
| O plano de sessões aberto pela região (os rádios como controle de verdade, o desenho como espelho, a lista inteira sem script) | `components/ilhas/escolha-de-regiao.tsx`, `components/ilhas/plano-de-sessoes.tsx`, `conteudo/tratamentos.ts` | `../../esteira/14-funcionalidades/07-funcionalidades-do-oficio.md`, seção 4.2 |
| O pedido de avaliação que fecha no WhatsApp, com o motivo, a última visita e o período | `components/ilhas/pedido-de-avaliacao.tsx`, `lib/oficio/pedido-de-avaliacao.ts`, `app/avaliacao/` | `07-funcionalidades-do-oficio.md`, seção 4.1 |
| O estado ao vivo com a urgência ("encaixe no mesmo dia até as 16h") e os feriados | `components/ilhas/estado-da-clinica.tsx`, `lib/oficio/estado-da-clinica.ts`, `lib/agora.ts`, `conteudo/negocio.ts` (`urgencia`, `fechamentos`) | `../../esteira/14-funcionalidades/01-base-de-todo-site.md`, seções 4 e 5 |
| Uma página por tratamento, sem preço, sem antes e depois, sem promessa | `app/tratamentos/[id]/`, `conteudo/tratamentos.ts` | `../../esteira/nichos/odontologia.md`, seção 4.1 |
| O responsável técnico e o registro da clínica no rodapé | `components/rodape.tsx`, `conteudo/negocio.ts` (`responsavelTecnico`) | Código de Ética Odontológica, art. 43; `01-base-de-todo-site.md`, seção 7 |
| A tabela das normas, com a leitura na fonte primária | `decisoes.md` | `../../claude/commands/normas.md` |
| Os painéis de estilo num HTML só | `material/paineis/paineis.html` | `../../esteira/04-direcao-de-arte.md`, passo 5 |
| Um relatório de QA de Completo de saúde, preenchido | `registros/relatorio-de-qa--rascunho--2026-10-08.md`, `registros/mapa-do-projeto.md` | `../../qualidade/modelos/relatorio-de-qa.md` |
| As 44 lacunas que o teste achou no kit, com o arquivo e a seção de cada uma | `registros/diario-do-teste.md` | — |

## 3. O que este teste mudou no kit

As lacunas de `registros/diario-do-teste.md` foram corrigidas no kit em 08.10.2026, à noite. A lista, item por item, está no relatório do Atlas (`../../atlas--relatorio--2026-10-08.md`, seção 7.7). Por isso, alguns trechos deste projeto contornam problemas que a base de hoje já resolve:
- o `scroll-padding-top`;
- a navegação a partir de `lg`;
- o telefone com espaço sem quebra;
- o verificador de termos.
