---
description: Etapa 10 — a porta de conformidade antes da publicação (privacidade, conselho, CNPJ, fontes, cookies, HTTPS)
---

Etapa 10 (`producao/esteira/17-conformidade-e-normas.md`, seção 9; `producao/01-roteiro-da-sessao.md`, etapa 10). Quem confere: Matheus Azevedo Abreu, com o Claude Code.

Percorra a lista da seção 9 e marque cada item com a prova (arquivo, captura, comando e saída):

- **Aviso de privacidade:**
  - os blocos certos para o que o site faz;
  - o prazo de guarda;
  - o canal de privacidade.
- **Registro do conselho visível:**
  - no rodapé e no cabeçalho do celular;
  - o responsável técnico, quando há;
  - na imobiliária, o CRECI junto do nome, com no mínimo 25% do tamanho dele.
- **Rodapé de toda página:** a razão social e o CNPJ do cliente. A régua portada confere; o `npm run pronto` confere os dígitos, inclusive do CNPJ alfanumérico.
- **Nada externo:**
  - fontes hospedadas;
  - zero cookie e zero armazenamento, conferidos pela régua no bloco 5;
  - nenhum pedido externo.
- **HTTPS, HSTS e política de conteúdo:**
  - no `next.config.ts`, no servidor;
  - no `.htaccess` gerado, no estático.
- **Símbolo e declaração de acessibilidade:** a forma do símbolo é A CONFIRMAR com advogado.
- **Autorização de imagem:** de cada pessoa que aparece, e a do tutor quando há animal.
- **Contrato de operador:** quando há coleta. Depende do CNPJ do Atlas: se não houver, pare e registre.

**Porta:** todos os itens marcados. O que depender do advogado fica registrado como pendente, com data.
