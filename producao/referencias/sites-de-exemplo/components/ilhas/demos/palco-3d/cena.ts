// O desenho do palco 3D da Barbearia Santa Rosa: um único fragment
// shader (GLSL ES 1.00, roda em WebGL 1 e 2) que desenha, por raymarching
// de funções de distância exatas, as fichas da casa — moedas, fichas
// oitavadas e placas de metal (latão, alpaca, cobre e bronze), com a
// borda serrilhada nas redondas e o relevo tipográfico na face, tirado de
// um atlas de texturas desenhado num canvas 2D (./motor.ts). Antes eram
// objetos modelados (poste, navalha, tesoura...); depois de vê-los, o
// usuário pediu "do mesmo jeito feito com a moeda" (01/10): peças simples
// e robustas, sem os artefatos dos modelos. De uma seção para a outra, a
// ficha vira como uma moeda: gira de lado e volta com a face nova.
//
// Uniformes (escritos por ./motor.ts a cada quadro):
//   uRes          tamanho do desenho, em pixels
//   uTempo        segundos; parado na pausa e com movimento reduzido
//   uPonteiro     posição do ponteiro, de -1 a 1, suavizada
//   uForma        a ficha em cena: 0 redonda, 1 oitavada, 2 placa
//   uMetal        0 latão, 1 alpaca, 2 cobre, 3 bronze
//   uCelula       a célula da face no atlas (0 a 11, quatro colunas por três linhas)
//   uVirada       o giro em torno do eixo vertical, de -90° a 90° (radianos), já
//                 com a virada entre as faces e os balanços: o motor troca a face
//                 de perfil, e o desenho não decide nada
//   uDesloc       deslocamento no eixo x do mundo (o lado da tela)
//   uAltura       deslocamento no eixo y do mundo (no celular, a ficha sobe para o alto da tela)
//   uTamanho      fator do tamanho das fichas redondas e oitavadas (1; menor quando não cabem na faixa delas)
//   uTamanhoPlaca o mesmo, para a placa, que é mais larga
//   uVisivel      0 a 1: a ficha some quando a página não tem cena
//   uFaces        o atlas das faces (branco é relevo), num canal só
//   uTexel        um pixel da célula do atlas, em fração da célula (1/1024 no
//                 computador, 1/512 no celular): o passo da rampa do relevo

export const VERTICE = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

export const FRAGMENTO = `
precision highp float;

uniform vec2 uRes;
uniform float uTempo;
uniform vec2 uPonteiro;
uniform float uForma;
uniform float uMetal;
uniform float uCelula;
uniform float uVirada;
uniform float uDesloc;
uniform float uAltura;
uniform float uTamanho;
uniform float uTamanhoPlaca;
uniform float uVisivel;
uniform sampler2D uFaces;
uniform float uTexel;

#define PI 3.14159265
#define ESPESSURA 0.085
#define ESCALA 1.32
// O tamanho de cada forma: a placa encolhe à parte, por ser mais larga.
float escala(float forma) { return ESCALA * (forma > 1.5 ? uTamanhoPlaca : uTamanho); }

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

// A silhueta da ficha, no plano da face (distância exata em 2D).
float silhueta(vec2 p, float forma) {
  if (forma < 0.5) return length(p) - 0.98;
  if (forma < 1.5) {
    // Oitavado regular (Inigo Quilez), com o canto levemente arredondado.
    const vec3 k = vec3(-0.9238795325, 0.3826834323, 0.4142135623);
    p = abs(p);
    p -= 2.0 * min(dot(vec2(k.x, k.y), p), 0.0) * vec2(k.x, k.y);
    p -= 2.0 * min(dot(vec2(-k.x, k.y), p), 0.0) * vec2(-k.x, k.y);
    p -= vec2(clamp(p.x, -k.z * 0.9, k.z * 0.9), 0.9);
    return length(p) * sign(p.y) - 0.03;
  }
  vec2 q = abs(p) - vec2(1.08, 0.7) + 0.14;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - 0.14;
}

// A peça: a silhueta extrudada, com a aresta arredondada e o aro um pouco mais alto que o campo.
float ficha(vec3 p, float forma) {
  float d2 = silhueta(p.xy, forma);
  float aro = smoothstep(-0.12, -0.05, d2) * 0.022;
  vec2 w = vec2(d2 + 0.016, abs(p.z) - ESPESSURA - aro);
  return min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - 0.016;
}

// O mundo: a ficha no seu lado da tela, com o balanço vertical e o olhar do
// ponteiro para cima e para baixo; o giro em torno do eixo vertical (a
// virada entre as faces, o olhar para os lados, a rolagem) chega pronto em
// uVirada.
vec3 local(vec3 p) {
  p.x -= uDesloc;
  p.y -= uAltura;
  p /= escala(uForma);
  p.y -= sin(uTempo * 0.9) * 0.035;
  p.xz = rot(uVirada) * p.xz;
  p.yz = rot(-0.16 - uPonteiro.y * 0.2 + sin(uTempo * 0.37) * 0.05) * p.yz;
  return p;
}

float mapa(vec3 pw) {
  return ficha(local(pw), uForma) * escala(uForma);
}

vec3 normal(vec3 p) {
  const vec2 e = vec2(1.0, -1.0) * 0.0011;
  return normalize(e.xyy * mapa(p + e.xyy) + e.yyx * mapa(p + e.yyx) + e.yxy * mapa(p + e.yxy) + e.xxx * mapa(p + e.xxx));
}

// O estúdio refletido no metal: o fundo escuro, a caixa de luz alta à
// esquerda, a tira quente de contraluz à direita, a régua de luz no alto e
// o rebatedor de baixo.
vec3 estudio(vec3 d) {
  vec3 c = mix(vec3(0.012, 0.01, 0.009), vec3(0.06, 0.047, 0.036), smoothstep(-0.3, 0.9, d.y));
  float k = dot(d, normalize(vec3(-0.55, 0.62, 0.56)));
  c += vec3(1.0, 0.93, 0.82) * 3.2 * smoothstep(0.935, 0.975, k);
  c += vec3(1.0, 0.7, 0.4) * 1.7 * smoothstep(0.04, 0.0, abs(d.x - 0.8)) * smoothstep(-0.5, 0.4, d.y);
  c += vec3(0.9, 0.85, 0.75) * 0.9 * smoothstep(0.03, 0.0, abs(d.y - 0.55)) * smoothstep(0.2, 0.9, -d.x * 0.5 + 0.5);
  c += vec3(0.22, 0.14, 0.08) * smoothstep(0.1, -0.9, d.y);
  return c;
}

vec3 corDoMetal(float m) {
  if (m < 0.5) return vec3(1.0, 0.76, 0.38);
  if (m < 1.5) return vec3(0.86, 0.87, 0.85);
  if (m < 2.5) return vec3(0.96, 0.56, 0.38);
  return vec3(0.66, 0.45, 0.26);
}

// O relevo da face no atlas: a célula (quatro colunas, três linhas) e o ponto dentro dela.
float relevo(vec2 st, float celula) {
  float coluna = mod(celula, 4.0);
  float linha = floor(celula / 4.0);
  vec2 uv = (vec2(coluna, linha) + clamp(st, 0.002, 0.998)) / vec2(4.0, 3.0);
  return texture2D(uFaces, uv).r;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 fundoCor = vec3(0.043, 0.035, 0.031);
  // O halo quente atrás da ficha.
  vec2 alvo = vec2(uDesloc / (2.0 * 2.144), 0.02 + uAltura / (2.0 * 2.144));
  float r = length((uv - alvo) * vec2(0.8, 1.0));
  vec3 fundo = fundoCor + vec3(0.13, 0.085, 0.05) * exp(-r * r * 6.0) * 0.6 * uVisivel;

  vec3 cor = fundo;
  if (uVisivel > 0.01) {
    vec3 ro = vec3(0.0, 0.0, 8.0);
    vec3 rd = normalize(vec3(uv * 0.536, -1.0));
    // A esfera que envolve a ficha: o raio que não a toca é fundo.
    vec3 oc = ro - vec3(uDesloc, uAltura, 0.0);
    float b = dot(oc, rd);
    float envolve = 1.75 * ESCALA * max(uTamanho, uTamanhoPlaca);
    float c = dot(oc, oc) - envolve * envolve;
    float h = b * b - c;
    if (h > 0.0) {
      float t = max(0.0, -b - sqrt(h));
      float tmax = -b + sqrt(h);
      bool acertou = false;
      for (int i = 0; i < 80; i++) {
        float d = mapa(ro + rd * t);
        if (d < 0.0006 * t) { acertou = true; break; }
        t += d * 0.9;
        if (t > tmax) break;
      }
      if (acertou) {
        vec3 p = ro + rd * t;
        vec3 n = normal(p);
        vec3 q = local(p);
        vec3 base = corDoMetal(uMetal);
        float rugo = 0.28;
        float brilhoDoRelevo = 1.0;
        float d2 = silhueta(q.xy, uForma);
        bool naFace = abs(q.z) > ESPESSURA - 0.004 && d2 < -0.02;
        if (naFace) {
          // A face: o relevo do atlas, com a luz deslizando pelas rampas (o desfoque do desenho).
          vec2 st = q.xy / (uForma > 1.5 ? 2.3 : 2.0) + 0.5;
          if (q.z < 0.0) st.x = 1.0 - st.x;
          st.y = 1.0 - st.y;
          float e = uTexel;
          float hc = relevo(st, uCelula);
          float hx = relevo(st + vec2(e, 0.0), uCelula) - relevo(st - vec2(e, 0.0), uCelula);
          float hy = relevo(st + vec2(0.0, e), uCelula) - relevo(st - vec2(0.0, e), uCelula);
          brilhoDoRelevo = 0.5 + 0.5 * hc + 1.7 * dot(vec2(-hx, hy), normalize(vec2(-0.6, 0.7)));
          // O campo é escovado (mais áspero); o relevo, polido.
          rugo = mix(0.46, 0.13, hc);
        } else if (uForma < 0.5) {
          // A borda serrilhada das moedas redondas.
          float ang = atan(q.y, q.x);
          brilhoDoRelevo = 0.78 + 0.22 * sin(ang * 150.0);
          rugo = 0.22;
        }
        vec3 l1 = normalize(vec3(-0.5, 0.72, 0.6));
        vec3 l2 = normalize(vec3(0.8, 0.15, -0.55));
        float d1 = max(dot(n, l1), 0.0);
        float dd2 = max(dot(n, l2), 0.0);
        vec3 refl = reflect(rd, n);
        float nv = max(dot(n, -rd), 0.0);
        vec3 fr = base + (1.0 - base) * pow(1.0 - nv, 5.0);
        vec3 amb = mix(estudio(refl), vec3(0.11, 0.085, 0.065), rugo * 0.9);
        float brilho = pow(max(dot(n, normalize(l1 - rd)), 0.0), mix(520.0, 18.0, rugo)) * mix(1.4, 0.25, rugo);
        vec3 obj = amb * fr * brilhoDoRelevo + (d1 * 0.08 + dd2 * 0.05) * base + brilho * base;
        obj = clamp((obj * (2.51 * obj + 0.03)) / (obj * (2.43 * obj + 0.59) + 0.14), 0.0, 1.0);
        obj = pow(obj, vec3(1.0 / 2.2));
        cor = mix(fundo, obj, uVisivel);
      }
    }
  }
  // Vinheta e grão de filme.
  vec2 v = gl_FragCoord.xy / uRes - 0.5;
  cor *= 1.0 - 0.45 * dot(v, v);
  cor += (hash(gl_FragCoord.xy + fract(uTempo * 7.0) * 113.0) - 0.5) * 0.028;
  gl_FragColor = vec4(cor, 1.0);
}
`;
