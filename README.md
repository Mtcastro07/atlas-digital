# Atlas Digital — site institucional

Site do [Atlas Digital](https://agenciaatlasdigital.com), agência de sites para o comércio local de Niterói (RJ).

Next.js (App Router) · React · TypeScript · Tailwind CSS · shadcn/ui · Motion.

## Páginas

- O site do Atlas: início, Para quem, Planos, Orçamento, O trabalho, O Atlas e Dúvidas (`app/(atlas)/`).
- Três sites de demonstração, um por plano, de estabelecimentos fictícios (`app/demos/`): Nutrição Icaraí (Essencial), Depósito Engenhoca (Profissional) e Barbearia Santa Rosa (Completo).

## Como rodar

```bash
npm install
npm run dev     # desenvolvimento, http://localhost:3000
npm run build   # compilação de produção
npm start       # serve a compilação
```

Node 22 ou mais novo.

## Estrutura

```
app/          rotas, layouts e CSS global
components/   seções, ilhas interativas, peças das páginas e dos sites de demonstração
conteudo/     todos os textos e preços, como dados
lib/          funções puras
ferramentas/  scripts de captura e de preparação de imagens
public/       arquivos servidos como estão
```

Textos e preços se mudam em `conteudo/`, sem tocar nos componentes.

## Licenças

As fontes em `app/fontes/` e `components/demos/fontes/` são distribuídas sob a SIL Open Font License; as licenças acompanham os arquivos. Marca, textos e fotografias pertencem ao Atlas Digital.
