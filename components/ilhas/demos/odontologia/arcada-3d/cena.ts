// O desenho da ficha em cerâmica da Odontologia Boa Viagem (plano Completo): a peça-assinatura como objeto de vitrine
// (producao/esteira/nichos/odontologia.md, seção 6.7). Um único fragment shader (GLSL ES 1.00, WebGL 1 e 2) desenha,
// por raymarching, uma placa de cerâmica de cantos arredondados com as duas arcadas do mapa dos dentes em relevo: cada
// dente em esmalte, de brilho úmido; a numeração FDI e as legendas gravadas e cheias de grafite; a região marcada
// pintada a lápis (o marcador e o traço vermelho). A luz é a do refletor do consultório, que segue o cursor e acende na
// entrada; o halo dela fica na cerâmica. O relevo, a gravação e a sombra de contato vêm pintados em texturas (o motor,
// ./motor.ts, as desenha da mesma geometria do mapa, lib/demos/odontologia/dentes.ts): nenhuma sombra é calculada a
// cada quadro.
//
// Uniformes (escritos por ./motor.ts):
//   uRes       tamanho do desenho, em pixels
//   uCaixa     a caixa da peça no desenho (x, y do canto de baixo, largura, altura), em pixels
//   uGiro      a inclinação da placa: x (para trás), y (de lado), em radianos
//   uFoco      o ponto da placa trazido ao meio da caixa, em unidades da placa (-1,2 a 1,2)
//   uZoom      a aproximação (1 = a placa inteira na caixa)
//   uRegiao    as quatro regiões (frente de cima, fundo de cima, frente de baixo, fundo de baixo), de 0 a 1
//   uLuz       o refletor, na caixa: -1 a 1 (pode passar)
//   uAcesa     0 a 1: o refletor acendendo
//   uVisivel   0 a 1
//   uSombra    0 ou 1: a sombra longa no papel, calculada aqui (na mesa); no celular, 0, e a sombra é a pintada no CSS
//   uRelevo    R: o dente (a máscara pouco desfocada, para a matéria); G: a gravação; B: a sombra de contato
//   uRegioes   as quatro regiões, uma por canal: 0,5 é o preenchimento, 1 é o traço
//   uAltura    a máscara dos dentes desfocada, de onde sai a cúpula (meio-float no WebGL2: sem degraus no brilho)

export const VERTICE = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

export const FRAGMENTO = `
precision highp float;

uniform vec2 uRes;
uniform vec4 uCaixa;
uniform vec2 uGiro;
uniform vec2 uFoco;
uniform float uZoom;
uniform vec4 uRegiao;
uniform vec2 uLuz;
uniform float uAcesa;
uniform float uVisivel;
uniform float uSombra;
uniform sampler2D uRelevo;
uniform sampler2D uRegioes;
uniform sampler2D uAltura;

#define MEIA 1.2
#define RAIO 0.16
#define ESPESSURA 0.075
#define DENTE 0.085
#define GRAVURA 0.01
#define BORDA 0.007

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }

// A silhueta da placa: o quadrado de cantos arredondados (distância exata em 2D).
float silhueta(vec2 p) {
  vec2 q = abs(p) - vec2(MEIA) + RAIO;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - RAIO;
}

vec2 naTextura(vec2 p) { return vec2(p.x, -p.y) / (2.0 * MEIA) + 0.5; }

// A altura do relevo sobre a face: a cúpula do dente (macia, da altura em 1024), mais o degrau nítido da base do dente
// (da matéria, na textura da cor: a borda que a luz desenha), menos a gravação.
float relevo(vec2 p) {
  vec2 uv = naTextura(p);
  float cupula = smoothstep(0.4, 0.97, texture2D(uAltura, uv).r);
  cupula = sqrt(cupula) * 0.7 + cupula * 0.3;
  vec4 tx = texture2D(uRelevo, uv);
  return cupula * DENTE + smoothstep(0.22, 0.88, tx.r) * BORDA - tx.g * GRAVURA;
}

// A placa: a silhueta extrudada, com a face de cima em relevo e a aresta arredondada.
float placa(vec3 p) {
  float d2 = silhueta(p.xy);
  float topo = ESPESSURA + relevo(p.xy);
  vec2 w = vec2(d2 + 0.045, max(p.z - topo, -p.z - ESPESSURA));
  return min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - 0.045;
}

// Do mundo à placa: o foco, a aproximação e a inclinação.
vec3 local(vec3 w) {
  w /= uZoom;
  w.yz = rot(uGiro.x) * w.yz;
  w.xz = rot(uGiro.y) * w.xz;
  w.xy += uFoco;
  return w;
}

float mapa(vec3 w) { return placa(local(w)) * uZoom * 0.55; }

vec3 normal(vec3 w) {
  const vec2 e = vec2(1.0, -1.0) * 0.0024;
  return normalize(e.xyy * mapa(w + e.xyy) + e.yyx * mapa(w + e.yyx) + e.yxy * mapa(w + e.yxy) + e.xxx * mapa(w + e.xxx));
}

void main() {
  vec4 saida = vec4(0.0);
  // O ponto na caixa: a altura da caixa é a unidade; fora da caixa (com folga), nada a fazer.
  vec2 q = (gl_FragCoord.xy - (uCaixa.xy + 0.5 * uCaixa.zw)) / uCaixa.w;
  // O limite acompanha a aproximação: a placa aproximada não é cortada a seco na borda da caixa.
  float alcance = max(1.0, uZoom);
  if (uVisivel > 0.01 && abs(q.x) < (0.5 * uCaixa.z / uCaixa.w) * alcance + 0.2 && abs(q.y) < 0.62 * alcance + 0.08) {
    vec3 ro = vec3(0.0, 0.0, 7.0);
    vec3 rd = normalize(vec3(q * 0.4, -1.0));
    // O refletor: acima e à frente, onde o cursor está.
    vec3 luz = vec3(uLuz * vec2(1.6, 1.4), 2.6);

    // A esfera que envolve a placa.
    vec3 c = vec3(-uFoco * uZoom, 0.0);
    vec3 oc = ro - c;
    float raio = 1.75 * uZoom;
    float b = dot(oc, rd);
    float h = b * b - (dot(oc, oc) - raio * raio);
    float pixel = 7.0 * 0.4 / uCaixa.w;
    if (h > 0.0) {
      float t = max(0.0, -b - sqrt(h));
      float tmax = -b + sqrt(h);
      float menor = 1e3, tMenor = t;
      bool acertou = false;
      for (int i = 0; i < 120; i++) {
        float d = mapa(ro + rd * t);
        if (d < menor) { menor = d; tMenor = t; }
        if (d < 0.00035 * t) { acertou = true; break; }
        t += d;
        if (t > tmax) break;
      }
      float cobertura = acertou ? 1.0 : 1.0 - smoothstep(0.0, pixel * 1.4, menor);
      if (cobertura > 0.0) {
        if (!acertou) t = tMenor;
        vec3 w = ro + rd * t;
        vec3 n = normal(w);
        vec3 p = local(w);
        vec2 uv = naTextura(p.xy);
        vec4 tx = texture2D(uRelevo, uv);
        vec4 rg = texture2D(uRegioes, uv);
        bool face = p.z > ESPESSURA - 0.004 && silhueta(p.xy) < -0.035;

        // A matéria: a cerâmica da placa (vidrada, acetinada) e o esmalte dos dentes (de brilho úmido).
        float dente = face ? smoothstep(0.45, 0.7, tx.r) : 0.0;
        // A placa em marfim e os dentes em esmalte mais frio: as duas matérias se separam também pela cor.
        vec3 ceramica = vec3(0.925, 0.9, 0.858);
        vec3 esmalte = vec3(0.968, 0.974, 0.985);
        vec3 base = mix(ceramica, esmalte, dente);
        float rugo = mix(0.42, 0.07, dente);
        float ao = 1.0;
        float traco = 0.0;
        float grafite = 0.0;
        float sulco = 0.0;
        if (face) {
          // A região marcada: o marcador na cerâmica e o traço do lápis por cima; a gravação cheia de grafite. As
          // tintas entram depois da curva de tom, com as cores exatas da identidade.
          float preenche = dot(smoothstep(0.32, 0.46, rg), uRegiao);
          traco = clamp(dot(smoothstep(0.74, 0.92, rg), uRegiao), 0.0, 1.0) * (1.0 - dente);
          grafite = smoothstep(0.3, 0.68, tx.g) * (1.0 - dente);
          // O sulco da gravação: a parede do lado do refletor fica na sombra, a do outro lado pega a luz (o número
          // cortado na cerâmica, não pintado por cima).
          vec2 lado = normalize(uLuz * vec2(1.6, -1.4) + vec2(0.001)) * 0.0026;
          sulco = (texture2D(uRelevo, uv - lado).g - texture2D(uRelevo, uv + lado).g) * (1.0 - dente);
          base = mix(base, vec3(0.94, 0.76, 0.73), clamp(preenche, 0.0, 1.0) * (1.0 - dente) * 0.85);
          ao = 1.0 - 0.5 * tx.b * (1.0 - dente);
        }

        // A luz: o refletor (com o halo na cerâmica), o céu do consultório e a borda.
        vec3 lw = normalize(luz - w);
        vec2 poca = w.xy - luz.xy * 0.62;
        float halo = exp(-dot(poca, poca) * mix(3.0, 1.5, uAcesa)) * uAcesa;
        float dif = max(dot(n, lw), 0.0);
        vec3 meio = normalize(lw - rd);
        float nh = max(dot(n, meio), 0.0);
        float brilhoUmido = pow(nh, 260.0) * 1.6 + pow(nh, 48.0) * 0.22;
        // O vidrado da placa: o brilho do esmalte cerâmico, mais largo que o úmido dos dentes.
        float acetinado = pow(nh, 70.0) * 0.4 + pow(nh, 14.0) * 0.07;
        float brilho = mix(acetinado, brilhoUmido, dente);
        float fres = pow(1.0 - max(dot(n, -rd), 0.0), 4.0);
        vec3 ceu = mix(vec3(0.62, 0.6, 0.58), vec3(1.0, 0.995, 0.985), n.y * 0.35 + 0.65);
        float acesa = mix(0.15, 1.0, uAcesa);
        vec3 cor = base * (ceu * 0.5 * ao + vec3(1.0, 0.975, 0.94) * dif * (0.26 + 0.64 * halo) * acesa);
        cor += vec3(1.0, 0.99, 0.97) * brilho * acesa * (0.45 + 0.85 * halo);
        cor += vec3(0.95, 0.96, 1.0) * fres * mix(0.16, 0.26, dente);
        // O vidrado: a janela do consultório refletida, duas faixas de luz macias, em diagonal, que correm pela placa quando
        // ela gira e quando o refletor anda; e a aresta arredondada acesa do lado do refletor.
        float faixa = (p.x * 0.35 + p.y * 0.9) / 1.6 + uGiro.y * 1.2 + uLuz.x * 0.25;
        float janela = smoothstep(0.08, 0.16, faixa) * (1.0 - smoothstep(0.3, 0.42, faixa))
          + 0.6 * smoothstep(0.5, 0.54, faixa) * (1.0 - smoothstep(0.6, 0.66, faixa));
        cor += vec3(1.0, 0.985, 0.96) * janela * mix(0.3, 0.4, dente) * acesa;
        float aresta = (1.0 - smoothstep(0.55, 0.97, n.z)) * max(dot(normalize(n.xy + vec2(0.0001)), normalize(uLuz + vec2(0.0001))), 0.0);
        cor += vec3(1.0, 0.98, 0.95) * aresta * 0.42 * acesa;
        cor *= 1.0 - 0.32 * max(sulco, 0.0);
        cor += vec3(0.3) * max(-sulco, 0.0) * acesa;
        cor = clamp((cor * (2.51 * cor + 0.03)) / (cor * (2.43 * cor + 0.59) + 0.14), 0.0, 1.0);
        cor = pow(cor, vec3(1.0 / 2.2));
        // As tintas, exatas, com a luz do lugar: o grafite da gravação (#2b2826) e o lápis (#a32319).
        float luzLocal = clamp(dot(cor, vec3(0.333)) / 0.86, 0.72, 1.06);
        // A numeração gravada fica recolhida (o grafite a 45%, o sulco faz o resto): a placa é o objeto, e o número não
        // disputa com o título.
        cor = mix(cor, vec3(0.169, 0.157, 0.149) * luzLocal, grafite * 0.45);
        cor = mix(cor, vec3(0.639, 0.137, 0.098) * luzLocal, traco);
        float a = cobertura * uVisivel;
        saida = vec4(cor * a, a);
      }
    }
    // A sombra longa e macia do refletor, no papel: a silhueta da placa, deslocada para longe da luz e desfocada.
    if (uSombra > 0.5 && saida.a < 0.999) {
      // Na altura da placa, o ponto da caixa vale 2,8 unidades (a câmera a 7, o leque de 0,4).
      vec2 s = q * 2.8 / uZoom + uFoco;
      vec2 desloca = -uLuz * 0.09 + vec2(0.06, -0.14);
      float ds = silhueta((s - desloca) * vec2(1.0, 1.0 + 0.35 * abs(sin(uGiro.x))));
      float a = (1.0 - smoothstep(-0.25, 0.4, ds)) * 0.2 * uVisivel * mix(0.4, 1.0, uAcesa) * (1.0 - saida.a);
      saida += vec4(vec3(0.17, 0.16, 0.15) * a, a);
    }
  }
  gl_FragColor = saida;
}
`;
