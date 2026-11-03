# Modelo · Lista de publicação

> **Quando usar.** Antes de cada publicação de um site, e de novo depois de cada rodada que mude a coleta de dados, o domínio ou a hospedagem (`../14-ciclo-de-qa.md`, seção 5). Reúne a porta de conformidade de `../../esteira/17-conformidade-e-normas.md`, seção 9, e as verificações técnicas desta pasta.
>
> **Onde salvar.** `registros/publicacao--<aaaa-mm-dd>.md`, no repositório do cliente, assinada.

---

## A forma, para copiar

```markdown
# Lista de publicação · <cliente> · <dd.mm.aaaa>

Plano: <E|P|C> · Módulos: <…> · Nicho: <…> · Commit: <hash> · Endereço: <domínio>

## A · Conformidade (etapa 10 · Matheus Azevedo Abreu)
**Todo site de cliente**
- [ ] Rodapé com razão social e CNPJ do cliente (ou nome e registro do conselho), endereço e contato
- [ ] Registro do conselho no rodapé e no cabeçalho do celular, no corpo exigido (CRECI com no mínimo 25% do nome)
- [ ] Aviso de privacidade publicado, ajustado ao que o site faz, com a data
- [ ] Canal com o titular publicado
- [ ] Símbolo e declaração de acessibilidade (RATIFICADO)
- [ ] Fontes servidas do próprio domínio, com a licença guardada
- [ ] Nenhum cookie nem armazenamento no site público (régua, bloco 5)
- [ ] Nenhum pedido externo; política de conteúdo sem violação (régua, bloco 5)
- [ ] HTTPS ativo; cabeçalhos conferidos no endereço publicado
- [ ] Autorizações de imagem de cada pessoa que aparece
- [ ] Normas do nicho conferidas no texto final
- [ ] Preços com o mês de referência e as despesas adicionais (quando há preço)
- [ ] Régua integral aprovada

**Com formulário ou Agenda**
- [ ] O aviso de privacidade descreve a coleta, os dados, a finalidade, o prazo de guarda, os suboperadores e o cookie de sessão do painel
- [ ] O aviso curto no ponto da coleta
- [ ] A tarefa de eliminação agendada e testada (`09`, seção 8)
- [ ] O contrato de operador assinado (depende do CNPJ do Atlas)
- [ ] O teste de envio e de cancelamento feito no endereço publicado

**Site de exemplo**
- [ ] Selo de ficção visível em toda página
- [ ] `noindex` (e `follow: false`) no layout
- [ ] "Estabelecimento fictício." na descrição de cada página
- [ ] Nenhuma coleta; WhatsApp fictício
- [ ] `X-Robots-Tag: noindex, nofollow` em toda resposta e, no `robots.txt`, os 11 robôs de IA com `Disallow: /` (`../../esteira/21-busca-e-ias.md`, seção 2)

## B · Técnica (etapa 11 · Matheus Castro Oliveira de Luna Garcia)
- [ ] Nenhum defeito S1 aberto; os S2 abertos com decisão escrita dos sócios
- [ ] Testes de ponta a ponta das funcionalidades do plano, com e sem script (`05`)
- [ ] axe sem violação nas páginas e nos estados abertos (`06`, seção 3)
- [ ] O aparelho real: um Android intermediário e um iPhone, em pé e deitado, com a lista de `08`, seção 8 (o premium no toque, o 4G, o formulário, o vídeo, o INP)
- [ ] Conferência manual: teclado, leitor de tela, zoom e cores forçadas (`14`, seção 4)
- [ ] Avaliação anti-IA sem marca de peso alto; lista de 22 itens; teste do desconhecido (`11`)
- [ ] A barreira do travamento sem falha no aparelho médio (régua, passagem 2b); o peso, o LCP e o TBT relatados (`08`, seção 1)
- [ ] A régua dos quadros sem falha, em duas sessões separadas: a rolagem, o menu, a navegação e a figura, no celular 4× e na mesa; os avisos do 6× lidos (`02`, seção 12; `08`, seção 11)
- [ ] As passivas sem falha: `conferir-passivas`, o nome único, as três paradas e a amplitude; a cobertura, como aviso (`../../esteira/09-movimento.md`, seção 14)
- [ ] `npm audit --omit=dev` sem vulnerabilidade alta ou crítica (`09`, seção 7)
- [ ] Segredos só nas variáveis de ambiente do servidor (`09`, seção 6)
- [ ] Mapa do site, `robots.txt`, canônicos e dados estruturados (`10`, seção 7)
- [ ] **Aparece nas buscas e nas IAs,** em todo plano (`../../esteira/21-busca-e-ias.md`, seção 11): `curl` do `robots.txt`, do `sitemap.xml` e do `llms.txt`; o JSON-LD válido (e, no cliente, o Teste de Pesquisa Aprimorada); `node ferramentas/texto-do-robo.mjs <endereço>` sem palavra colada
- [ ] Homologação aprovada pelo cliente, por escrito

## C · A publicação e depois
- [ ] O modo de publicação e o ramo publicado conferidos no painel da hospedagem
- [ ] O caminho de volta pronto: o commit anterior anotado
- [ ] A fumaça no endereço publicado, até 15 min depois (`05`, seção 7)
- [ ] A régua contra o endereço publicado
- [ ] O cartão do WhatsApp conferido numa conversa de teste
- [ ] **Cliente:** o aviso ao IndexNow das páginas que mudaram (na primeira publicação, todas); o Search Console, o Bing e o Perfil da Empresa, com o dono (`../../esteira/18-publicacao-e-manutencao.md`, seções 5 e 5.1)
- [ ] O registro da publicação: data, commit, resultado, quem conferiu

## Assinaturas
| Parte | Quem | Data |
|---|---|---|
| Conformidade | Matheus Azevedo Abreu | |
| Técnica e publicação | Matheus Castro Oliveira de Luna Garcia | |
| Briefing atendido | Gabriel Ribeiro Ota Yida | |
| Aceite | O cliente | |
```

---

## Exemplo preenchido: o próprio site do Atlas, em 08.10.2026

Caso real. Quando esta lista foi preenchida, o site do Atlas em Next.js (`web/`, no repositório do Atlas) estava "a decidir pelos sócios, depois da porta de publicação da conformidade" (decisão de 03.10.2026). Ele foi ao ar depois, no web app Node.js da Hostinger, com a versão do ramo `main` (conferido em 08.10.2026), sem as correções de 07 e 08.10. A lista abaixo mostra como ela ficava antes da publicação. **O resultado é honesto: o site não passa.** É o uso certo do modelo: a lista diz o que falta, e quem decide.

O site do Atlas não é um site de cliente. Algumas linhas da parte A se leem de outro modo, e a linha diz como.

# Lista de publicação · Site do Atlas · 08.10.2026

Plano: o próprio site · Módulos: — · Nicho: — · Commit: a branch `branchCEO`, com mudanças sem commit · Endereço: `agenciaatlasdigital.com` (hoje com o site de 28.08.2026, medido por HTTP em 30.09.2026, sem os cabeçalhos de segurança: o `.htaccess` não está em vigor; contexto de produto do repositório do Atlas, seção 5.1) [V]

## A · Conformidade
- [ ] **Identificação do fornecedor.** O Atlas não tem CNPJ, e o site não declara registro nenhum (ata v3.0, III.2). A forma de se identificar sem CNPJ é ponto de advogado e de contador (`../../esteira/17-conformidade-e-normas.md`, seção 10, item 8). **Pendente.**
- [ ] **Aviso de privacidade e canal com o titular.** O site não coleta: a mensagem do montador sai pelo WhatsApp do próprio aparelho, e o site diz isso junto do montador. Se há aviso mesmo assim, a decidir.
- [ ] **Símbolo e declaração de acessibilidade.** RATIFICADO; não existe.
- [x] **Fontes servidas do próprio domínio, com a licença guardada.** Em `web/app/fontes/`, com os arquivos `OFL` (08.10).
- [x] **Nenhum cookie nem armazenamento.** Régua, bloco 5, nas 23 páginas (08.10).
- [x] **Nenhum pedido externo; política sem violação.** Régua, bloco 5 (08.10).
- [ ] **HTTPS e cabeçalhos no endereço publicado.** Configurados em `next.config.ts` desde 03.10; a conferir no endereço, depois de publicar.
- [ ] **Autorizações de imagem.** O site mostra fotografias reais dos sócios. Falta a autorização por escrito, mesmo sendo os próprios sócios: a conferir se existe.
- [x] **O texto contra os documentos da sociedade.** Os textos foram alinhados em 02.10 ("sem fidelidade" e a promessa sobre domínio e arquivos saíram).
- [ ] **Preços com o mês de referência.** A tabela mostra os preços da ata (IV.2), mas o texto não traz o mês de referência (busca por "referência" no conteúdo, 08.10). A conferir com a parte legal se é exigido.
- [x] **Régua integral aprovada.** 08.10.2026: 0 falhas nas 23 páginas, 31 avisos (`../02-regua.md`, seção 7).

## B · Técnica
- [x] **Nenhum S1 aberto.** Os abertos conhecidos são S3 e S4 (`../12-ataque-a-falhas.md`, seção 5).
- [ ] **Testes de ponta a ponta.** Não existem: são RATIFICADO (`../05-ponta-a-ponta.md`). As interações foram conferidas à mão em 03.10.
- [ ] **axe nos estados abertos.** Não feito. O axe não acusaria os botões de 36 px do simulador, porque o mínimo dele é 24 px; a regra da casa, de 44 px, acusa: S3 aberto.
- [ ] **Conferência manual.** Leitor de tela, aparelhos reais e cores forçadas não registrados.
- [ ] **Avaliação anti-IA sem marca de peso alto.** A linha de base de 07.10 tem duas: a tarja de bronze nas aberturas e a onda de cor no "24h" da capa (`../11-design-e-anti-ia.md`, seção 6). **Bloqueia até a decisão dos sócios**: corrigir, ou reclassificar como assinatura, com o motivo.
- [ ] **Lighthouse, com decisão sobre o que está fora da meta.** Medido em 03.10: TBT de 716 ms com CPU 20× (mediana de 7), contra a meta de 300 ms. A causa é quase toda a hidratação do React. A decisão está pendente (especificação do site, seção 7).
- [x] **`npm audit --omit=dev`.** Sem vulnerabilidade conhecida na árvore de produção (03.10).
- [ ] **Mapa do site.** A data da última alteração está escrita à mão em `app/sitemap.ts` (`2026-10-01`) e precisa ser atualizada na publicação.
- [ ] **Homologação aprovada.** Não existe homologação.

## C · A publicação e depois
- [ ] **O modo de publicação.** PENDENTE. A recomendação de 03.10 é o web app Node.js da Hostinger (especificação do site, seção 9), e o projeto já está preparado (a cópia de `public/` no modo standalone).
- [ ] **O caminho de volta, a fumaça, a régua no endereço, o cartão do WhatsApp, o registro:** depois da publicação.

## Resultado
**Não publicável em 08.10.2026.**

**Bloqueiam:**
- a identificação do fornecedor sem CNPJ (advogado e contador);
- as duas marcas de IA de peso alto (os sócios);
- o modo de publicação (os sócios).

**Antes de publicar, além disso:**
- a conferência manual;
- a decisão sobre o TBT;
- as autorizações de imagem;
- a data do mapa do site.

## Assinaturas
Nenhuma: a lista não está completa.
