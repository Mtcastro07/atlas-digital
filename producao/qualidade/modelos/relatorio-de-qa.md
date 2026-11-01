# Modelo · Relatório de QA

> **Quando usar.** Em cada porta: o rascunho de 24 horas (etapa 7), a publicação (etapas 10 e 11) e a manutenção mensal (`../14-ciclo-de-qa.md`). É o documento que o sócio de desenvolvimento assina. Diz o que foi verificado, com que resultado, o que ficou de fora e o que espera decisão.
>
> **Onde salvar.** `registros/relatorio-de-qa--<porta>--<aaaa-mm-dd>.md`, no repositório do cliente. O relatório da régua (`.regua/relatorio.json`) vai anexo, ou resumido aqui.

---

## A forma, para copiar

```markdown
# Relatório de QA · <cliente> · <porta> · <dd.mm.aaaa>

| Campo | Valor |
|---|---|
| Site, plano e módulos | <…> |
| Porta | <rascunho | rodada N | publicação | manutenção de <mês>> |
| Ambiente e commit | <build de produção | homologação | publicado> · <hash> |
| Quem verificou | <…> |
| **Veredito** | <aprova | reprova | aprova com decisões pendentes>: <uma frase> |

## 1 · Régua
<data, páginas, falhas, avisos, segundos; as medidas da carga; cada aviso com a decisão>

## 2 · Riscos de nota 6 e 9
| Item | Nota | Teste | Resultado |

## 3 · Testes
<unidade, ponta a ponta, axe, regressão visual: o que rodou e o resultado>

## 4 · Conferência manual
<aparelhos, teclado, leitor de tela, zoom, cores forçadas, exploração: o que se fez, onde e por quem>

## 5 · Desempenho
<a barreira do travamento no aparelho médio (a maior tarefa, o bloqueio somado, os quadros lentos, o LCP); os bytes, relatados; o Lighthouse só se a barreira reprovou, com a causa>
<a régua dos quadros: por página, perfil e gesto, o em dia, o p95 e o pior [as vezes] de cada uma das duas sessões, com a data, a hora, a carga da máquina e o Chrome; o que reprovou, com a causa provada por retirada>

## 6 · Segurança e privacidade
<auditoria, cabeçalhos, coleta, segredos>

## 7 · Conteúdo e normas
<afirmações com fonte, normas do nicho, registro verbal, metadados>

## 8 · Design e anti-IA
<as duas portas, nesta ordem: a mesa (as capturas a 1440 px, aprovadas por <nome> em <data>) e o celular (as capturas a 390 px e a tabela "O premium no celular" do identidade.md, aprovadas por <nome> em <data>); a tabela de achados com a decisão, na mesa e no celular; os 22 itens; a unicidade; o teste do desconhecido>

**A contagem da série** (producao/esteira/20-repeticao-dentro-do-site.md, seção 3): cada efeito e cada molde, por página, na mesa e no celular, com o antes e o depois de cada correção.

| Página | Largura | Efeito ou molde | Antes | Depois | Onde fica (o momento) ou por que é sistema |

## 9 · Defeitos
| Defeito | Severidade | Estado | Relatório |

## 10 · O que ficou de fora
<o que não se verificou, e por quê>

## 11 · Decisões pedidas
| Decisão | A quem | Prazo |

**Assinatura:** <nome> · <data>
```

**No Profissional e no Completo, cada seção cresce** (achado do teste de 08.10.2026: o modelo e os exemplos eram de um Essencial):
- **3 · Testes:** uma linha por fluxo de cada funcionalidade do ofício, com e sem script (o pedido que fecha no WhatsApp, o plano de sessões, a calculadora), e os módulos (o formulário, a Agenda) contra o banco de teste.
- **5 · Desempenho:** a peça-assinatura medida nas cinco condições (`../../esteira/09-movimento.md`, seção 7), com a reserva sem script e com o movimento reduzido.
- **7 · Conteúdo e normas:** a tabela das normas do conselho com a fonte e a data da leitura; o `npm run termos` com zero falha e cada aviso lido.
- **8 · Design e anti-IA:** no nicho de saúde, cada marca da categoria Imagem pesa alto; no exemplo sem foto possível, a I6 entra como pendência do exemplo (`../../esteira/11-anti-ia.md`, passo 6).
- **11 · Decisões pedidas:** o que pede pessoa do ofício (o dentista, o advogado, o médico) e o que o exemplo simulou.

Um relatório de Completo de saúde, preenchido, está em `../../referencias/odontologia-completo/registros/`.

---

## Exemplo preenchido: o site do Atlas e os três sites de exemplo, 08.10.2026

Caso real. Reúne a rodada final da régua de 08.10.2026, a calibração e as correções de 07.10, a linha de base anti-IA de 07.10 e as medições de 03.10, como estão registradas no repositório do Atlas (o README da régua, a especificação do site, seção 7, e `web/CLAUDE.md`).

# Relatório de QA · Site do Atlas e sites de exemplo · verificação · 08.10.2026

| Campo | Valor |
|---|---|
| Site, plano e módulos | O site do Atlas (7 páginas) e os sites de exemplo da nutrição [E] (3), do depósito [P] (6) e da barbearia [C] (7): 23 páginas, mais a 404 |
| Porta | Verificação depois da régua nova (equivalente à etapa 7) |
| Ambiente e commit | Build de produção, local · a branch `branchCEO`, com mudanças sem commit |
| Quem verificou | O Claude Code; a conferência do sócio de desenvolvimento está pendente |
| **Veredito** | **Aprova com decisões pendentes:** a régua passa sem falha, mas a avaliação anti-IA tem duas marcas de peso alto no site do Atlas, que esperam os sócios |

## 1 · Régua
- **Rodada final, 08.10.2026:** 0 falhas nas 23 páginas, 31 avisos, 265 s.
- **Primeira rodada, 07.10:** 119 falhas em 19 páginas. Parte era defeito real (seção 9). Parte era a régua errando, e onze ajustes de calibração a corrigiram (`../02-regua.md`, seção 6).

| Medida, carga inicial | Início | Outras páginas do Atlas | Sites de exemplo | Teto |
|---|---|---|---|---|
| Script | 155,3 KB | 143,9–154,2 KB | 136,5–143,2 KB | 180 KB (Atlas) · 600 KB (marca, desde 08.10.2026, à noite) |
| Fontes | 22,4 KB | 22,4 KB (52,9 em Para quem) | 90,5 · 130,2 · 141,1 KB | 60 KB (Atlas) · 200 KB (marca; 300 KB desde 08.10.2026, à noite) |
| Total | 271,6 KB | 265–301 KB | 308–384 KB | 1.500 KB |
| CLS | 0 | 0 | 0 a 0,002 | 0,05 |

**Os avisos e a decisão de cada grupo:**

| Aviso | Onde | Decisão |
|---|---|---|
| Ação além de 60% da primeira tela do celular | As aberturas das páginas internas do Atlas | Aceito: são informativas, e a ação está no menu |
| Nenhuma ação no celular | A barbearia: o botão de agendar some abaixo de 640 px | **A decidir pelos sócios**: muda o desenho |
| Gestos do Spell UI a conferir à mão (contraste) | Os títulos com tarja, onda e brilho | Conferir à mão: pendente |
| Mediana de 16 palavras por período | O Atlas | **A decidir** |
| Itens da mesa que faltam no celular | Por exemplo, o índice de capítulos da barbearia | Revisar caso a caso: pendente |

## 2 · Riscos de nota 6 e 9
A matriz de risco de cada site não foi feita antes da construção: o modelo é de 08.10. O exemplo preenchido do depósito está em `matriz-de-risco.md`.

## 3 · Testes
- **Unidade, ponta a ponta, axe, regressão visual automatizada:** não existem (RATIFICADO, `../13-integracao-continua.md`, seção 9).
- **Na revisão de 03.10:**
  - as 52 capturas comparadas pixel a pixel com um controle (diferenças de 15 a 34 pixels, só suavização);
  - as interações conferidas à mão: menu, simulador, montador, copiar, calculadora, agendador, âncoras.

## 4 · Conferência manual
Leitor de tela, aparelhos reais e cores forçadas não estão registrados. **Lacunas achadas na leitura do código em 08.10** (`../06-acessibilidade.md`, seção 7):
- os botões de 36 px na barra do simulador;
- a medida inválida da calculadora só pela cor;
- os totais do montador sem anúncio;
- o foco possivelmente encoberto pelo cabeçalho fixo, a conferir.

## 5 · Desempenho
- **Bytes:** dentro dos tetos (seção 1). As telas de erro em português, de 07.10, acrescentaram 1,0 KB de script a toda página.
- **Lighthouse 13.5, 03.10, início, perfil móvel:**
  - TBT com CPU 20×: 716 ms, mediana de 7, de 357 a 1.089 ms. Está acima da meta de 300 ms, e é quase todo hidratação do React. Decisão pendente.
  - LCP medido com CPU 20×: 2,11 s.
  - LCP simulado: 2,79 s.
- **CLS de 0,1** em uma execução de sete: a investigar (`../08-desempenho.md`, seção 5).

## 6 · Segurança e privacidade
- **Nada gravado no aparelho e nenhum pedido externo:** régua, nas 23 páginas.
- **`npm audit --omit=dev`:** sem vulnerabilidade conhecida (03.10).
- **Os cabeçalhos:** política de conteúdo, HSTS e COOP em `next.config.ts`; a conferir no endereço publicado.
- **Coleta:** nenhuma; a mensagem do montador sai pelo WhatsApp do aparelho.

## 7 · Conteúdo e normas
- **Os textos do Atlas** alinhados aos documentos da sociedade em 02.10.
- **Os sites de exemplo:** com o selo de ficção e o `noindex` (régua, bloco 9).
- **A norma de cada nicho** nos textos dos exemplos: leitura frase a frase não registrada. Pendente.

## 8 · Design e anti-IA
A linha de base de 07.10, sem correção (`../11-design-e-anti-ia.md`, seção 6):
- **Atlas, peso alto:**
  - a tarja de bronze numa palavra do título, em todas as aberturas;
  - a onda de cor só no "24h" da capa.
- **Atlas, peso médio:** a numeração "01 / 06" sem sequência, a capa centralizada, as faixas de números grandes, a grade 3×2, a entrada com subida em vários blocos, os aforismos em dois tempos e a família padrão sem tratamento.
- **Assinaturas:** a esfera de bronze, o globo do logotipo, o vidro líquido; nos exemplos, a folha impressa (nutrição), a ficha técnica (depósito) e as fichas de metal em WebGL (barbearia).

A lista de 22 itens, a unicidade e o teste do desconhecido não foram feitos formalmente.

## 9 · Defeitos
| Defeito | Severidade | Estado | Registro |
|---|---|---|---|
| Os 16 endereços dos sites de exemplo sem `og:` | S2 | Corrigido em 07.10 | `../12-ataque-a-falhas.md`, seção 4 |
| A 404 com o canônico da capa | S3 | Corrigido em 07.10 | Idem |
| Rolagem lateral em 320 px (nutrição, 50 px; depósito, 35 e depois 3 px) | S2 | Corrigido em 07.10 | Idem |
| Alvos de 43 px em Para quem | S3 | Corrigido em 07.10 | Idem |
| Contraste de 4,41:1 nos códigos do depósito | S2 | Corrigido em 07.10 | Idem |
| Os globos sem giro depois da navegação interna | S3 | Corrigido em 07.10 | Idem |
| O "Agora" do depósito no sábado | S3 | Corrigido em 07.10 | Idem |
| A página de erro global sem `lang` e em inglês | S3 | Corrigido em 07.10 | Idem |
| Os botões de 36 px do simulador | S3 | Aberto | `../06-acessibilidade.md`, seção 7 |
| A medida inválida da calculadora só pela cor | S3 | Aberto | Idem |

## 10 · O que ficou de fora
- Os testes automatizados de fluxo, o axe e o leitor de tela.
- Os aparelhos reais e o Safari.
- A medição da interação (INP).
- A leitura das normas nos exemplos.
- O endereço publicado: o site não está publicado.

## 11 · Decisões pedidas
| Decisão | A quem | Prazo |
|---|---|---|
| As duas marcas de IA de peso alto: corrigir, ou manter como assinatura com o motivo | Os três sócios | Antes da publicação |
| O botão de agendar da barbearia abaixo de 640 px | Os três sócios | Antes da próxima rodada dos exemplos |
| A mediana de 16 palavras em O Atlas | Os três sócios | Antes da publicação |
| O TBT com CPU 20× (a estratégia de hidratação) | O sócio de desenvolvimento | Antes da publicação |
| O modo de publicação (web app Node.js da Hostinger, recomendado) | Os três sócios | Depois da porta de conformidade |

**Assinatura:** pendente: Matheus Castro Oliveira de Luna Garcia.
