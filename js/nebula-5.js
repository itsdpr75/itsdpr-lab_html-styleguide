/**
 * ItsDPR LAB – Fondo Espacial con Nebulosas (distribución envolvente)
 * ──────────────────────────────────────────────────────────
 * · 17 nebulosas distribuidas por toda la pantalla, incluso bordes.
 * · Rangos X/Y ampliados hasta ±200, Z variable para profundidad.
 * · Bordes suaves con fade radial + máscara de ruido.
 * · Estrellas brillantes y movimiento dinámico.
 */

'use strict';

/* ═══════════════════════════════════════════════════════════════
   UTILIDADES (igual que antes)
   ═══════════════════════════════════════════════════════════════ */
const _clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const _lerp  = (a, b, t)   => a + (b - a) * t;
const _sstep = (e0, e1, x) => {
    const t = _clamp((x - e0) / (e1 - e0), 0, 1);
    return t * t * (3 - 2 * t);
};
const _hex2rgb = hex => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
];

/* ═══════════════════════════════════════════════════════════════
   SIMPLEX NOISE (igual)
   ═══════════════════════════════════════════════════════════════ */
function createNoise2D(seed) {
    let s = (seed * 1664525 + 1013904223) >>> 0;
    const lcg = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) { const j = Math.floor(lcg() * (i + 1)); const tmp = p[i]; p[i] = p[j]; p[j] = tmp; }
    const perm = new Uint8Array(512);
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
    const G  = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
    const F2 = 0.5 * (Math.sqrt(3) - 1);
    const G2 = (3 - Math.sqrt(3)) / 6;
    return (x, y) => {
        const ss = (x + y) * F2;
        const i  = Math.floor(x + ss), j = Math.floor(y + ss);
        const t  = (i + j) * G2;
        const x0 = x - (i - t), y0 = y - (j - t);
        const i1 = x0 > y0 ? 1 : 0, j1 = 1 - i1;
        const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2;
        const x2 = x0 - 1 + 2*G2, y2 = y0 - 1 + 2*G2;
        const ii = i & 255, jj = j & 255;
        const g0 = G[perm[ii + perm[jj]] & 7];
        const g1 = G[perm[ii+i1 + perm[jj+j1]] & 7];
        const g2 = G[perm[ii+1  + perm[jj+1 ]] & 7];
        let t0 = 0.5 - x0*x0 - y0*y0; const n0 = t0 < 0 ? 0 : (t0*=t0, t0*t0*(g0[0]*x0+g0[1]*y0));
        let t1 = 0.5 - x1*x1 - y1*y1; const n1 = t1 < 0 ? 0 : (t1*=t1, t1*t1*(g1[0]*x1+g1[1]*y1));
        let t2 = 0.5 - x2*x2 - y2*y2; const n2 = t2 < 0 ? 0 : (t2*=t2, t2*t2*(g2[0]*x2+g2[1]*y2));
        return 70 * (n0 + n1 + n2);
    };
}

function fbm(nFn, x, y, oct, lac = 2.05, gain = 0.48) {
    let v = 0, amp = 0.5, f = 1;
    for (let i = 0; i < oct; i++) { v += amp * nFn(x * f, y * f); amp *= gain; f *= lac; }
    return v;
}

function domainWarp(nA, nB, nC, nD, x, y, oct, w1 = 0.9, w2 = 0.6) {
    const oo = Math.max(2, Math.ceil(oct * 0.65));
    const qx = fbm(nA, x,        y,        oo);
    const qy = fbm(nB, x + 5.2,  y + 1.3,  oo);
    const rx = fbm(nC, x + w1*qx + 1.7, y + w1*qy + 9.2, Math.max(2, Math.ceil(oct * 0.8)));
    const ry = fbm(nD, x + w1*qx + 8.3, y + w1*qy + 2.8, Math.max(2, Math.ceil(oct * 0.8)));
    return fbm(nA, x + w2*rx, y + w2*ry, oct);
}

/* ═══════════════════════════════════════════════════════════════
   GENERADOR DE TEXTURA (bordes transparentes)
   ═══════════════════════════════════════════════════════════════ */
function generateNebulaTexture(cfg) {
    const {
        size    = 256,
        seeds   = [1, 2, 3, 4, 5],
        colorA  = '#8b5cf6',
        colorB  = '#06b6d4',
        colorC  = '#ffffff',
        scale   = 2.6,
        octaves = 6,
        power   = 2.2,
        opacity = 210,
        warp1   = 0.9,
        warp2   = 0.55,
        alphaSeed = 999,
    } = cfg;

    const cA = _hex2rgb(colorA);
    const cB = _hex2rgb(colorB);
    const cC = _hex2rgb(colorC);

    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    const img = ctx.createImageData(size, size);
    const d   = img.data;

    const nA = createNoise2D(seeds[0]);
    const nB = createNoise2D(seeds[1]);
    const nC = createNoise2D(seeds[2]);
    const nD = createNoise2D(seeds[3]);
    const nE = createNoise2D(seeds[4]);
    const nF = createNoise2D(seeds[4] * 13 + 7);
    const nAlpha = createNoise2D(alphaSeed);

    for (let py = 0; py < size; py++) {
        for (let px = 0; px < size; px++) {
            const nx = (px / size - 0.5) * scale;
            const ny = (py / size - 0.5) * scale;

            // Forma principal
            const raw   = domainWarp(nA, nB, nC, nD, nx, ny, octaves, warp1, warp2);
            let shape   = raw * 0.5 + 0.5;
            const fine  = fbm(nF, nx * 2.2, ny * 2.2, 4) * 0.5 + 0.5;
            shape = shape * 0.72 + fine * 0.28;
            shape = Math.pow(_clamp(shape, 0, 1), power);

            // Fade radial agresivo (opacidad 0 en esquinas)
            const dx = (px / size) - 0.5;
            const dy = (py / size) - 0.5;
            const dist = Math.sqrt(dx*dx + dy*dy);
            let radialFade = 1.0;
            if (dist > 0.4) {
                const t = _clamp((dist - 0.4) / 0.1, 0, 1);
                radialFade = 1.0 - _sstep(0, 1, t);
            }

            // Máscara de ruido
            const maskX = nx * 1.8;
            const maskY = ny * 1.8;
            let alphaMask = fbm(nAlpha, maskX, maskY, 4, 2.2, 0.5);
            alphaMask = _clamp(alphaMask * 0.5 + 0.5, 0.0, 1.0);
            const finalAlphaMult = radialFade * alphaMask;
            shape = shape * finalAlphaMult;

            if (shape < 0.01) { d[(py*size+px)*4+3] = 0; continue; }

            // Color
            const ct = fbm(nE, nx*0.75, ny*0.75, 3) * 0.5 + 0.5;
            const ht = fbm(nF, nx*3.5,  ny*3.5,  4) * 0.5 + 0.5;

            let r = _lerp(cA[0], cB[0], _clamp(ct, 0, 1));
            let g = _lerp(cA[1], cB[1], _clamp(ct, 0, 1));
            let b = _lerp(cA[2], cB[2], _clamp(ct, 0, 1));

            const glow = Math.pow(shape, 2.5) * ht * 1.8;
            r = _lerp(r, cC[0], _clamp(glow, 0, 0.9));
            g = _lerp(g, cC[1], _clamp(glow, 0, 0.9));
            b = _lerp(b, cC[2], _clamp(glow, 0, 0.9));

            const idx = (py * size + px) * 4;
            d[idx]   = Math.floor(_clamp(r, 0, 255));
            d[idx+1] = Math.floor(_clamp(g, 0, 255));
            d[idx+2] = Math.floor(_clamp(b, 0, 255));
            d[idx+3] = Math.floor(shape * opacity);
        }
    }

    ctx.putImageData(img, 0, 0);
    return canvas;
}

/* ═══════════════════════════════════════════════════════════════
   SHADERS (estrellas)
   ═══════════════════════════════════════════════════════════════ */
const STAR_VERT = `
attribute float aSize;
attribute float aBright;
varying   float vBright;
uniform   float uTime;
uniform   float uPR;
void main(){
    vBright = aBright;
    vec4 mv = modelViewMatrix * vec4(position,1.);
    float tw = sin(uTime*2.5 + position.x*14.0 + position.z*13.0)*0.6 + 0.5;
    gl_PointSize = aSize * uPR * (0.8 + tw*0.5) * (80./-mv.z);
    gl_Position  = projectionMatrix * mv;
}`;
const STAR_FRAG = `
varying float vBright;
void main(){
    float d = distance(gl_PointCoord,vec2(.5));
    float a = pow(1.-smoothstep(0.,.5,d),1.6);
    float h = pow(1.-smoothstep(0.,.4,d),2.0);
    vec3 col = mix(vec3(.8,.88,1.), vec3(1.,.95,.7), vBright);
    gl_FragColor = vec4(col, (a + h*0.5)*vBright);
}`;

const DUST_VERT = `
attribute float aSize;
varying   vec3  vCol;
uniform   float uTime;
uniform   float uPR;
void main(){
    vCol = color;
    vec3 p = position;
    p.x += sin(uTime*.35+position.y*.04)*2.5;
    p.y += cos(uTime*.28+position.x*.04)*2.0;
    p.z += sin(uTime*.22+position.z*.03)*1.2;
    vec4 mv = modelViewMatrix * vec4(p,1.);
    gl_PointSize = aSize * uPR * (110./-mv.z);
    gl_Position  = projectionMatrix * mv;
}`;
const DUST_FRAG = `
varying vec3 vCol;
void main(){
    float d = distance(gl_PointCoord,vec2(.5));
    float a = pow(1.-smoothstep(0.,.5,d),2.8);
    gl_FragColor = vec4(vCol, a*.45);
}`;

/* ═══════════════════════════════════════════════════════════════
   CLASE PRINCIPAL
   ═══════════════════════════════════════════════════════════════ */
class FogEffect {
    constructor() {
        this.canvas = document.getElementById('fog-canvas');
        if (!this.canvas) return;

        this.scene         = null;
        this.camera        = null;
        this.renderer      = null;
        this.nebulaSprites = [];
        this.stars         = null;
        this.starsNear     = null;
        this.dustClouds    = [];
        this.mouse  = { x: 0, y: 0 };
        this.target = { x: 0, y: 0 };
        this.scroll = 0;

        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('#03030a');

        this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.camera.position.z = 90;

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this._buildStars();
        this._buildStarsNear();
        this._buildNebulae();   // ahora con 17 nebulosas distribuidas
        this._buildDust();

        window.addEventListener('resize', () => this._onResize());
    }

    _buildStars() {
        const N = 10000;
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(N * 3);
        const sz  = new Float32Array(N);
        const br  = new Float32Array(N);
        for (let i = 0; i < N; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi   = Math.acos(2 * Math.random() - 1);
            const r     = 280 + Math.random() * 620;
            pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
            pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i*3+2] = r * Math.cos(phi);
            const roll = Math.random();
            sz[i] = roll < 0.04 ? Math.random()*1.3+0.9 : roll < 0.2 ? Math.random()*0.8+0.4 : Math.random()*0.4+0.15;
            br[i] = 0.55 + Math.random() * 0.9;
        }
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('aSize',    new THREE.BufferAttribute(sz,  1));
        geo.setAttribute('aBright',  new THREE.BufferAttribute(br,  1));
        this.stars = new THREE.Points(geo, new THREE.ShaderMaterial({
            vertexShader: STAR_VERT, fragmentShader: STAR_FRAG,
            uniforms: { uTime: { value: 0 }, uPR: { value: Math.min(window.devicePixelRatio, 2) } },
            transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        }));
        this.scene.add(this.stars);
    }

    _buildStarsNear() {
        const N = 1800;
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(N * 3);
        const sz  = new Float32Array(N);
        const br  = new Float32Array(N);
        for (let i = 0; i < N; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi   = Math.acos(2 * Math.random() - 1);
            const r     = 40 + Math.random() * 140;
            pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
            pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i*3+2] = r * Math.cos(phi);
            sz[i] = 0.9 + Math.random() * 2.2;
            br[i] = 0.85 + Math.random() * 0.9;
        }
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('aSize',    new THREE.BufferAttribute(sz,  1));
        geo.setAttribute('aBright',  new THREE.BufferAttribute(br,  1));
        this.starsNear = new THREE.Points(geo, new THREE.ShaderMaterial({
            vertexShader: STAR_VERT, fragmentShader: STAR_FRAG,
            uniforms: { uTime: { value: 0 }, uPR: { value: Math.min(window.devicePixelRatio, 2) } },
            transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        }));
        this.scene.add(this.starsNear);
    }

    _buildNebulae() {
        // Ahora 17 nebulosas, distribuidas por toda la pantalla
        const defs = [
            // Fondo violeta central (ligeramente desplazado)
            { seeds:[1,2,3,4,5],     a:'#5b21b6', b:'#7c3aed', c:'#c4b5fd', sc:2.6, oc:6, po:2.0, op:95,  w1:0.95,w2:0.6, sz:150, px:-70,  py:30,  pz:-160, rot:0.2,  para:0.012, rotSp:0.00003, alphaSeed:101 },
            // Cyan/teal lateral derecho
            { seeds:[11,22,33,44,55], a:'#0e7490', b:'#06b6d4', c:'#a5f3fc', sc:2.2, oc:5, po:2.3, op:90,  w1:0.85,w2:0.5, sz:130, px:110,  py:-50, pz:-120, rot:-0.6, para:0.018, rotSp:-0.00007, alphaSeed:202 },
            // Rosa arriba izquierda
            { seeds:[7,14,21,28,35],  a:'#831843', b:'#ec4899', c:'#fbcfe8', sc:1.9, oc:5, po:2.5, op:85,  w1:0.88,w2:0.55,sz:110, px:-95,  py:80,  pz:-100, rot:0.9,  para:0.024, rotSp:0.00009, alphaSeed:303 },
            // Azul profundo abajo derecha
            { seeds:[100,200,300,400,500], a:'#1e3a8a', b:'#3b82f6', c:'#93c5fd', sc:2.3, oc:6, po:2.0, op:80,  w1:0.9,w2:0.58, sz:120, px:80,   py:-85, pz:-115, rot:0.5,  para:0.014, rotSp:-0.00005, alphaSeed:404 },
            // Violeta-cyan central tenue
            { seeds:[42,84,126,168,210], a:'#4c1d95', b:'#0891b2', c:'#e879f9', sc:3.0, oc:7, po:2.7, op:70,  w1:1.05,w2:0.65,sz:90,  px:0,    py:5,   pz:-80,  rot:0.0,  para:0.035, rotSp:0.00004, alphaSeed:505 },
            // Dorado acento (pequeño)
            { seeds:[17,34,51,68,85],  a:'#78350f', b:'#f59e0b', c:'#fef3c7', sc:1.5, oc:4, po:3.2, op:80,  w1:0.78,w2:0.45,sz:70,  px:120,  py:40,  pz:-90,  rot:-0.7, para:0.040, rotSp:-0.00010, alphaSeed:606 },
            // Verde esmeralda
            { seeds:[61,122,183,244,55], a:'#064e3b', b:'#10b981', c:'#6ee7b7', sc:1.8, oc:5, po:2.6, op:75,  w1:0.85,w2:0.52,sz:95,  px:-110, py:-40, pz:-105, rot:-0.3, para:0.022, rotSp:0.00006, alphaSeed:707 },
            // Naranja pequeña (más lejana)
            { seeds:[9,18,27,36,45],   a:'#9a3412', b:'#f97316', c:'#fed7aa', sc:1.6, oc:5, po:2.4, op:65,  w1:0.8,w2:0.5,  sz:60,  px:-140, py:-20, pz:-140, rot:0.4,  para:0.016, rotSp:0.00005, alphaSeed:808 },
            // Azul claro grande
            { seeds:[33,66,99,132,165],a:'#0284c7', b:'#38bdf8', c:'#bae6fd', sc:2.4, oc:6, po:2.2, op:85,  w1:0.92,w2:0.58,sz:140, px:30,   py:-110,pz:-125, rot:-0.2, para:0.019, rotSp:-0.00004, alphaSeed:909 },
            // Magenta tenue
            { seeds:[55,110,165,220,19],a:'#a21caf', b:'#d946ef', c:'#f0abfc', sc:2.0, oc:5, po:2.5, op:70,  w1:0.86,w2:0.53,sz:85,  px:-50,  py:-130,pz:-110, rot:0.6,  para:0.027, rotSp:0.00007, alphaSeed:1010 },
            // Amarillo verdoso pequeño
            { seeds:[71,142,213,28,99], a:'#3f6212', b:'#a3e635', c:'#fef9c3', sc:1.4, oc:4, po:2.9, op:60,  w1:0.75,w2:0.44,sz:55,  px:140,  py:20,  pz:-85,  rot:-0.5, para:0.044, rotSp:-0.00008, alphaSeed:1111 },
            // NUEVAS: distribuidas por los bordes
            // Borde izquierdo lejano
            { seeds:[21,42,63,84,105], a:'#6d28d9', b:'#a78bfa', c:'#ddd6fe', sc:2.1, oc:5, po:2.3, op:75,  w1:0.9,w2:0.55,sz:110, px:-190, py:10,  pz:-150, rot:0.3,  para:0.010, rotSp:0.00002, alphaSeed:1212 },
            // Borde derecho superior
            { seeds:[31,62,93,124,155], a:'#b45309', b:'#f97316', c:'#ffedd5', sc:1.7, oc:4, po:2.6, op:70,  w1:0.8,w2:0.48,sz:90,  px:175,  py:85,  pz:-95,  rot:-0.4, para:0.028, rotSp:-0.00006, alphaSeed:1313 },
            // Borde inferior izquierdo
            { seeds:[41,82,123,164,205], a:'#0f172a', b:'#3b82f6', c:'#bae6fd', sc:2.0, oc:5, po:2.2, op:80,  w1:0.88,w2:0.52,sz:100, px:-160, py:-120, pz:-110, rot:0.5,  para:0.015, rotSp:0.00004, alphaSeed:1414 },
            // Borde superior derecho (más cercano)
            { seeds:[51,102,153,204,255], a:'#be185d', b:'#ec4899', c:'#fce7f3', sc:1.8, oc:4, po:2.5, op:65,  w1:0.85,w2:0.5, sz:80,  px:145,  py:130, pz:-75,  rot:0.8,  para:0.032, rotSp:0.00008, alphaSeed:1515 },
            // Borde inferior derecho
            { seeds:[61,122,183,244,49], a:'#14532d', b:'#10b981', c:'#d1fae5', sc:1.9, oc:5, po:2.4, op:70,  w1:0.87,w2:0.53,sz:95,  px:130,  py:-140, pz:-100, rot:-0.2, para:0.020, rotSp:-0.00005, alphaSeed:1616 },
            // Extremo superior central (muy arriba)
            { seeds:[71,142,213,28,99], a:'#475569', b:'#94a3b8', c:'#f1f5f9', sc:1.5, oc:4, po:2.8, op:60,  w1:0.78,w2:0.46,sz:70,  px:0,    py:160, pz:-130, rot:0.1,  para:0.018, rotSp:0.00003, alphaSeed:1717 },
            // Extremo inferior central (muy abajo)
            { seeds:[81,162,243,68,149], a:'#831843', b:'#f472b6', c:'#fbcfe8', sc:1.6, oc:4, po:2.7, op:65,  w1:0.82,w2:0.48,sz:75,  px:0,    py:-165, pz:-120, rot:-0.1, para:0.022, rotSp:-0.00004, alphaSeed:1818 },
        ];

        defs.forEach(def => {
            const tex = generateNebulaTexture({
                size: 256, seeds: def.seeds,
                colorA: def.a, colorB: def.b, colorC: def.c,
                scale: def.sc, octaves: def.oc, power: def.po,
                opacity: def.op, warp1: def.w1, warp2: def.w2,
                alphaSeed: def.alphaSeed,
            });
            const map = new THREE.CanvasTexture(tex);
            map.needsUpdate = true;
            const mat = new THREE.SpriteMaterial({ map, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false });
            mat.rotation = def.rot;
            const sprite = new THREE.Sprite(mat);
            sprite.scale.set(def.sz, def.sz, 1);
            sprite.position.set(def.px, def.py, def.pz);
            sprite.userData.basePos = new THREE.Vector3(def.px, def.py, def.pz);
            sprite.userData.parallax = def.para;
            sprite.userData.rotSpeed = def.rotSp;
            this.scene.add(sprite);
            this.nebulaSprites.push(sprite);
        });
    }

    _buildDust() {
        const clouds = [
            { count: 600, center: [-20, 10, -45], spread: [70, 60, 30], colors: ['#7c3aed','#8b5cf6','#06b6d4','#a78bfa'], szR: [0.4, 2.2] },
            { count: 500, center: [ 60,-30, -35], spread: [55, 48, 26], colors: ['#0891b2','#f472b6','#06b6d4','#ec4899'], szR: [0.3, 1.8] },
            { count: 450, center: [ 0, 50, -55], spread: [65, 55, 28], colors: ['#3b82f6','#6d28d9','#60a5fa','#c084fc'], szR: [0.3, 1.6] },
            { count: 400, center: [-80,-20, -40], spread: [60, 50, 25], colors: ['#f97316','#facc15','#fde047'], szR: [0.4, 1.9] },
        ];
        clouds.forEach(def => {
            const N = def.count;
            const geo = new THREE.BufferGeometry();
            const pos = new Float32Array(N * 3);
            const col = new Float32Array(N * 3);
            const sz  = new Float32Array(N);
            const pal = def.colors.map(c => new THREE.Color(c));
            for (let i = 0; i < N; i++) {
                const gx = ((Math.random()+Math.random()+Math.random()) - 1.5) * def.spread[0];
                const gy = ((Math.random()+Math.random()+Math.random()) - 1.5) * def.spread[1];
                const gz = ((Math.random()+Math.random()+Math.random()) - 1.5) * def.spread[2];
                pos[i*3] = def.center[0]+gx; pos[i*3+1] = def.center[1]+gy; pos[i*3+2] = def.center[2]+gz;
                const c1 = pal[Math.floor(Math.random()*pal.length)];
                const c2 = pal[Math.floor(Math.random()*pal.length)];
                const m  = c1.clone().lerp(c2, Math.random());
                col[i*3] = m.r; col[i*3+1] = m.g; col[i*3+2] = m.b;
                sz[i] = Math.random() * (def.szR[1] - def.szR[0]) + def.szR[0];
            }
            geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
            geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
            geo.setAttribute('aSize',    new THREE.BufferAttribute(sz,  1));
            const mat = new THREE.ShaderMaterial({
                vertexShader: DUST_VERT, fragmentShader: DUST_FRAG,
                uniforms: { uTime: { value: 0 }, uPR: { value: Math.min(window.devicePixelRatio, 2) } },
                transparent: true, vertexColors: true, depthWrite: false, blending: THREE.AdditiveBlending,
            });
            const pts = new THREE.Points(geo, mat);
            this.scene.add(pts);
            this.dustClouds.push(pts);
        });
    }

    addEventListeners() {
        document.addEventListener('mousemove', e => {
            this.target.x =  (e.clientX / window.innerWidth)  * 2 - 1;
            this.target.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });
        document.addEventListener('touchmove', e => {
            if (e.touches.length > 0) {
                this.target.x =  (e.touches[0].clientX / window.innerWidth)  * 2 - 1;
                this.target.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
            }
        }, { passive: true });
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            this.scroll = maxScroll > 0 ? scrollY / maxScroll : 0;
        });
    }

    _onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        const t = Date.now() * 0.001;

        this.mouse.x += (this.target.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.target.y - this.mouse.y) * 0.05;

        this.camera.position.x += (this.mouse.x * 10   - this.camera.position.x) * 0.025;
        this.camera.position.y += (this.mouse.y * 7    - this.camera.position.y) * 0.025;
        const targetZ = 90 - this.scroll * 28;
        this.camera.position.z += (targetZ - this.camera.position.z) * 0.06;
        this.camera.lookAt(this.scene.position);

        this.nebulaSprites.forEach(sp => {
            const bp = sp.userData.basePos, pf = sp.userData.parallax;
            const scrollOffsetX = this.scroll * 18;
            const scrollOffsetY = this.scroll * 10;
            sp.position.x = bp.x + this.mouse.x * pf * 210 + scrollOffsetX;
            sp.position.y = bp.y + this.mouse.y * pf * 150 + scrollOffsetY;
            sp.material.rotation += sp.userData.rotSpeed;
        });

        if (this.stars) {
            this.stars.material.uniforms.uTime.value = t;
            this.stars.rotation.y = t * 0.0035 + this.mouse.x * 0.12;
            this.stars.rotation.x = this.mouse.y * 0.14;
            this.stars.rotation.z = this.mouse.x * 0.06;
        }
        if (this.starsNear) {
            this.starsNear.material.uniforms.uTime.value = t;
            this.starsNear.rotation.y = t * 0.007 + this.mouse.x * 0.18;
            this.starsNear.rotation.x = this.mouse.y * 0.2;
            this.starsNear.rotation.z = this.mouse.x * 0.1;
        }
        this.dustClouds.forEach((dc, i) => {
            dc.material.uniforms.uTime.value = t;
            dc.rotation.z = t * (0.01 + i * 0.003);
            dc.rotation.x = this.mouse.y * 0.18;
            dc.rotation.y = this.mouse.x * 0.18;
        });

        this.renderer.render(this.scene, this.camera);
    }
}

document.addEventListener('DOMContentLoaded', () => { new FogEffect(); });