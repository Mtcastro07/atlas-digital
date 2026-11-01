// conteudo/legal.ts — o aviso de privacidade e a declaração de acessibilidade, montados com os blocos
// [SEMPRE] de producao/esteira/modelos/aviso-de-privacidade.md e producao/esteira/modelos/declaracao-de-acessibilidade.md.
// Leitura de leigo: A CONFIRMAR com advogado antes do primeiro cliente (o comentário dos modelos).
// Com formulário ou Agenda, acrescente os blocos [FORMULÁRIO] e [AGENDA] do modelo (producao/modulos/).
// Na declaração, só o que foi medido, com a data da medição.
import { negocio } from "./negocio";

export type BlocoLegal = { titulo: string; paragrafos?: readonly string[]; itens?: readonly string[] };
export type TextoLegal = { titulo: string; abertura: readonly string[]; blocos: readonly BlocoLegal[]; data: string };

const contatoDoSite = "o WhatsApp ou o telefone do rodapé";

export const avisoDePrivacidade: TextoLegal = {
  titulo: "Aviso de privacidade",
  abertura: negocio.exemplo
    ? [`${negocio.nome} é um estabelecimento fictício, criado pela Atlas Digital para demonstração.`, "Nenhum dado pessoal de quem visita é coletado."]
    : negocio.cnpj
      ? [`${negocio.razaoSocial}, CNPJ ${negocio.cnpj}, é a controladora dos dados pessoais tratados neste site, nos termos da Lei 13.709/2018 (LGPD).`]
      : [`${negocio.nomeCompleto}, ${negocio.registro}, é a controladora dos dados pessoais tratados neste site, nos termos da Lei 13.709/2018 (LGPD).`],
  blocos: [
    {
      titulo: "O que este site guarda no seu aparelho",
      paragrafos: [
        "Nada. Este site não usa cookies nem ferramentas de analítica ou de publicidade.",
        "Nenhuma informação é gravada no seu navegador. Fontes, imagens e scripts saem do próprio endereço do site, sem contato com servidores de terceiros.",
      ],
    },
    {
      titulo: "Registros de acesso",
      paragrafos: [
        "O serviço de hospedagem registra automaticamente cada acesso: o endereço IP, a data e a hora, a página pedida e o navegador.",
        "Esses registros servem à segurança e ao funcionamento do site (LGPD, art. 7º, IX: legítimo interesse).",
      ],
    },
    {
      titulo: "Contato por WhatsApp e telefone",
      paragrafos: [
        "Os botões de WhatsApp e de telefone abrem o aplicativo do seu aparelho.",
        "A conversa acontece no aplicativo, sob os termos dele; este site não recebe nem guarda o conteúdo.",
      ],
    },
    {
      titulo: "O pedido de avaliação",
      paragrafos: [
        "A página de avaliação monta a mensagem no seu aparelho, a partir das opções escolhidas. A mensagem só sai quando a pessoa toca no botão do WhatsApp.",
        "Nada é enviado a este site nem gravado. A lista oferece atendimentos e regiões da boca, nunca sintomas: o que a pessoa quiser contar, conta na conversa.",
      ],
    },
    {
      titulo: "Com quem os dados são compartilhados",
      paragrafos: [`Com ninguém, além de quem presta o serviço técnico em nome de ${negocio.nome}:`],
      itens: [
        "Hostinger International Ltd.: hospedagem do site;",
        `Atlas Digital: construção e manutenção do site, como operadora, segundo as instruções de ${negocio.nome}.`,
      ],
    },
    {
      titulo: "Seus direitos",
      paragrafos: [
        "A LGPD (art. 18) garante a confirmação de que há tratamento, o acesso, a correção, a anonimização, a portabilidade, a eliminação e a informação sobre o compartilhamento.",
        `Para exercer qualquer um deles, use ${contatoDoSite}. ${negocio.prazoDeResposta}`,
      ],
    },
    {
      titulo: "Segurança e mudanças neste aviso",
      paragrafos: [
        "O site usa conexão cifrada (HTTPS).",
        "Quando o site passar a tratar dados de outra forma, este aviso muda antes, com a nova data no fim.",
      ],
    },
  ],
  data: "08.10.2026",
};

export const declaracaoDeAcessibilidade: TextoLegal = {
  titulo: "Acessibilidade",
  abertura: [
    `${negocio.nome} quer que este site possa ser usado por qualquer pessoa.`,
    "Inclusive por quem usa leitor de tela, navega só pelo teclado, amplia o texto ou prefere menos movimento.",
  ],
  blocos: [
    {
      titulo: "O padrão seguido",
      paragrafos: [
        "O site segue as Diretrizes de Acessibilidade para Conteúdo Web (WCAG) 2.2, no nível AA.",
        "É o que pede a Lei Brasileira de Inclusão (Lei 13.146/2015, art. 63).",
      ],
    },
    {
      // Só o que foi medido, com a data (producao/qualidade/02-regua.md e testes/e2e/teclado.mjs); o que depende de pessoa fica nas limitações.
      titulo: "O que foi verificado em 08.10.2026",
      itens: [
        "o contraste do texto com o fundo, medido na tela a 390 e a 1440 px de largura;",
        "a navegação pelo teclado em cinco páginas, na mesa e no celular: a primeira parada é o vínculo para o conteúdo, a ordem segue a leitura, o foco é sempre visível e nunca fica sob o cabeçalho;",
        "o pedido de avaliação e a escolha da região, que se fazem só pelo teclado (botões de opção);",
        "os alvos de toque de pelo menos 44 px;",
        "o site sem JavaScript e com a preferência por movimento reduzido: nada se move, e nenhum conteúdo some.",
      ],
    },
    {
      titulo: "Limitações conhecidas",
      itens: [
        "a leitura com leitor de tela (VoiceOver, TalkBack e NVDA) ainda não foi feita por uma pessoa;",
        "o mapa dos dentes é um desenho: quem usa leitor de tela escolhe a região pelos botões de opção ao lado, e o desenho é pulado.",
      ],
    },
    {
      titulo: "Encontrou uma barreira?",
      paragrafos: [`Escreva pelo WhatsApp do rodapé, dizendo a página e o que aconteceu. ${negocio.prazoDeResposta}`],
    },
  ],
  data: "08.10.2026",
};
