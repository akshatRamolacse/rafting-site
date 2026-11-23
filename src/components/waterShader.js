// Real-time water: a photo above the horizon, an animated reflective water surface below it
// (ripples spawn where the cursor moves), and an underwater scene once `uDive` approaches 1.
export const vertexSrc = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

export const fragmentSrc = `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes;
uniform float uTime;
uniform float uDive;
uniform float uAspect;
uniform float uImgAspect;
uniform float uImgW;
uniform vec2 uMouse;
uniform vec3 uRip[8];
uniform sampler2D uTex;

const float SHORE = 0.165; // where the river starts in the photo (fraction from the bottom)

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) { v += a * noise(p); p = p * 2.03 + vec2(17.0, 9.0); a *= 0.5; }
  return v;
}

vec3 photo(vec2 p, float hz) {
  float hImg = uImgW * uAspect / uImgAspect;
  float u = (p.x - 0.5) / uImgW + 0.5 - (uMouse.x - 0.5) * 0.035;
  float v = (p.y - (hz - SHORE * hImg)) / hImg - (uMouse.y - 0.5) * 0.02;
  return texture2D(uTex, vec2(u, v)).rgb;
}

// Water height field: perspective-mapped streaks plus expanding rings from the cursor.
float waves(vec2 p, float hz) {
  float depth = max(hz - p.y, 0.0);
  float z = 1.0 / (depth + 0.06);
  vec2 w = vec2((p.x - 0.5) * uAspect * z, z);
  float h = fbm(w * vec2(0.32, 0.6) + vec2(uTime * 0.05, -uTime * 0.2));
  h += 0.5 * fbm(w * vec2(0.85, 1.4) + vec2(-uTime * 0.07, -uTime * 0.32));
  h *= smoothstep(0.0, 0.16, depth);
  for (int i = 0; i < 8; i++) {
    float age = uTime - uRip[i].z;
    if (age > 0.0 && age < 3.5) {
      vec2 d = (p - uRip[i].xy) * vec2(uAspect, 1.0);
      d.y *= 2.4;
      float r = length(d);
      h += sin(r * 75.0 - age * 11.0) * exp(-r * 6.5) * exp(-age * 1.25) * 0.5;
    }
  }
  return h;
}

float bubbles(vec2 p) {
  float acc = 0.0;
  for (int L = 0; L < 3; L++) {
    float sc = 9.0 + float(L) * 8.0;
    vec2 g = vec2(p.x * uAspect, p.y - uTime * (0.05 + 0.025 * float(L))) * sc;
    vec2 id = floor(g);
    vec2 f = fract(g) - 0.5;
    float rnd = hash(id + float(L) * 7.3);
    vec2 off = (vec2(hash(id + 1.7), hash(id + 9.2)) - 0.5) * 0.6;
    float r = 0.05 + 0.09 * rnd;
    acc += smoothstep(r, r * 0.35, length(f - off)) * step(0.62, rnd) * (0.3 + 0.18 * float(L));
  }
  return acc;
}

void main() {
  vec2 p = vUv;
  float d = uDive;
  float hz = mix(0.36, 1.55, smoothstep(0.0, 0.62, d));
  float depth = hz - p.y;

  // ---- above the surface: the photo ----
  vec3 sky = photo(p, hz);
  sky = mix(sky, sky * vec3(0.55, 0.82, 0.9), smoothstep(0.0, 0.55, d));

  float u = smoothstep(0.5, 0.95, d);
  float surf = smoothstep(hz - 0.004, hz + 0.004, p.y);
  vec3 col = sky;

  // sky-only pixels (most of the screen before the dive) skip all the water work
  if (surf < 0.999 || u > 0.001) {
  float e = 0.003;
  float h0 = waves(p, hz);
  float hx = waves(p + vec2(e, 0.0), hz);
  float hy = waves(p + vec2(0.0, e), hz);
  vec2 slope = vec2(h0 - hx, h0 - hy) / e * 0.22;
  slope *= smoothstep(0.0, 0.18, max(depth, 0.0));
  slope = clamp(slope, vec2(-0.7), vec2(0.7));
  vec3 n = normalize(vec3(slope, 1.0));
  float dd = max(depth, 0.0);
  vec2 rp = vec2(p.x, hz + dd * 0.92) + slope * vec2(0.012, 0.026) * (0.4 + dd * 1.6);
  vec3 refl = photo(rp, hz);
  float fres = pow(1.0 - clamp(dd * 1.7, 0.0, 1.0), 1.6) * 0.9 + 0.12;
  vec3 deep = vec3(0.012, 0.05, 0.07);
  vec3 mid = vec3(0.04, 0.2, 0.24);
  vec3 water = mix(mid, deep, smoothstep(0.0, 0.5, dd));
  water = mix(water, refl * vec3(0.8, 0.95, 0.95), fres);
  vec3 L = normalize(vec3(-0.3, 0.45, 0.6));
  float spec = pow(max(dot(n, normalize(L + vec3(0.0, 0.0, 1.0))), 0.0), 70.0);
  float ridge = smoothstep(1.0, 1.4, h0) * 0.22;
  water += vec3(0.75, 0.92, 1.0) * (spec * 0.85 + ridge) * smoothstep(0.02, 0.2, dd);
  // soft light under the cursor
  float md = length((p - uMouse) * vec2(uAspect, 1.0) * vec2(1.0, 2.0));
  water += vec3(0.25, 0.6, 0.6) * exp(-md * 5.0) * 0.18 * (1.0 - clamp(uDive * 2.0, 0.0, 1.0));
  water += vec3(0.1, 0.35, 0.3) * exp(-abs(dd) * 45.0) * 0.35; // shoreline glow

  col = mix(water, sky, surf);

  // ---- underwater, once we dive ----
  if (u > 0.001) {
  vec3 under = mix(vec3(0.015, 0.075, 0.1), vec3(0.07, 0.34, 0.38), pow(clamp(p.y, 0.0, 1.0), 1.6));
  float ray = noise(vec2(p.x * 5.0 + p.y * 2.5 + uTime * 0.08, uTime * 0.15));
  under += vec3(0.1, 0.32, 0.32) * ray * pow(p.y, 1.4) * 0.55;
  under += vec3(0.6, 0.9, 0.95) * bubbles(p) * 0.55;
  vec3 win = photo(vec2(p.x + slope.x * 0.05, 0.8 + p.y * 0.2), 0.36) * 0.5;
  under = mix(under, win * vec3(0.4, 0.85, 0.9), smoothstep(0.82, 1.0, p.y) * 0.35);
  col = mix(col, under, u);
  }

  }

  // light floating particles in the water even before the dive
  if (surf < 0.999 && u < 0.999) col += vec3(0.7, 0.95, 1.0) * bubbles(p * vec2(1.0, 0.8)) * 0.12 * (1.0 - surf) * (1.0 - u);

  float vig = 1.0 - 0.38 * pow(length(p - 0.5) * 1.25, 2.0);
  gl_FragColor = vec4(col * vig, 1.0);
}`
