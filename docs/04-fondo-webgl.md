# Fondo WebGL con Three.js - nebula-5.js

## 🌌 Visión General

El fondo espacial de ItsDPR LAB es creado usando **Three.js** (versión r128) con una implementación personalizada en `nebula-5.js`. Este efecto genera un universo 3D interactivo con nebulosas procedurales, estrellas y partículas de polvo cósmico.

## 📊 Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────┐
│                    nebula-5.js                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  UTILIDADES                                       │ │
│  │  - clamp, lerp, sstep (suavizado)                 │ │
│  │  - hex2rgb (conversión de colores)                │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  SIMPLEX NOISE (Generador de Ruido)               │ │
│  │  - createNoise2D(seed)                            │ │
│  │  - fbm (Fractal Brownian Motion)                  │ │
│  │  - domainWarp (Deformación de dominio)            │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  GENERADOR DE TEXTURAS                            │ │
│  │  - generateNebulaTexture(cfg)                     │ │
│  │  → Crea texturas procedurales de nebulosas        │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  SHADERS GLSL                                     │ │
│  │  - STAR_VERT / STAR_FRAG (estrellas)              │ │
│  │  - DUST_VERT / DUST_FRAG (polvo cósmico)          │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  CLASE FogEffect                                  │ │
│  │  - init()                                         │ │
│  │  - _buildStars()                                  │ │
│  │  - _buildNebulae()                                │ │
│  │  - _buildDust()                                   │ │
│  │  - animate()                                      │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Componentes del Fondo

### 1. Estrellas Lejanas (10,000 partículas)

```javascript
_buildStars() {
    const N = 10000;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3);
    const sz  = new Float32Array(N);
    const br  = new Float32Array(N);
    
    // Distribución esférica
    for (let i = 0; i < N; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);
        const r     = 280 + Math.random() * 620; // Radio: 280-900
        // ... posición, tamaño, brillo
    }
}
```

**Características:**
- Distribuidas en una esfera de radio 280-900 unidades
- 3 tamaños diferentes (pequeñas, medianas, grandes)
- Brillo variable (0.55 - 1.45)
- Twinkling (parpadeo) animado con shader

### 2. Estrellas Cercanas (1,800 partículas)

```javascript
_buildStarsNear() {
    const N = 1800;
    // ... similar a _buildStars()
    const r = 40 + Math.random() * 140; // Radio: 40-180
}
```

**Características:**
- Más cercanas a la cámara (40-180 unidades)
- Más grandes y brillantes
- Crean sensación de profundidad

### 3. Nebulosas (17 sprites distribuidos)

```javascript
_buildNebulae() {
    const defs = [
        // Fondo violeta central
        { seeds:[1,2,3,4,5], a:'#5b21b6', b:'#7c3aed', c:'#c4b5fd', 
          sc:2.6, oc:6, po:2.0, op:95, sz:150, px:-70, py:30, pz:-160 },
        
        // Cyan/teal lateral derecho
        { seeds:[11,22,33,44,55], a:'#0e7490', b:'#06b6d4', c:'#a5f3fc',
          sc:2.2, oc:5, po:2.3, op:90, sz:130, px:110, py:-50, pz:-120 },
        
        // ... 15 nebulosas más
    ];
}
```

**Parámetros de cada nebulosa:**

| Parámetro | Descripción | Ejemplo |
|-----------|-------------|---------|
| `seeds` | Seeds para el generador de ruido | `[1,2,3,4,5]` |
| `a`, `b`, `c` | Colores (oscuro, medio, claro) | `#5b21b6` |
| `sc` | Escala del ruido | `2.6` |
| `oc` | Octavas de FBM | `6` |
| `po` | Potencia (contraste) | `2.0` |
| `op` | Opacidad (0-255) | `95` |
| `sz` | Tamaño del sprite | `150` |
| `px`, `py`, `pz` | Posición 3D | `[-70, 30, -160]` |
| `rot` | Rotación inicial | `0.2` |
| `para` | Factor de parallax | `0.012` |
| `rotSp` | Velocidad de rotación | `0.00003` |

### 4. Polvo Cósmico (4 nubes de partículas)

```javascript
_buildDust() {
    const clouds = [
        { count: 600, center: [-20, 10, -45], spread: [70, 60, 30], 
          colors: ['#7c3aed','#8b5cf6','#06b6d4','#a78bfa'] },
        // ... 3 nubes más
    ];
}
```

**Características:**
- Partículas coloreadas que flotan lentamente
- Movimiento orgánico con shaders
- 400-600 partículas por nube

## 🔧 Generación Procedural de Nebulosas

### Algoritmo Paso a Paso

```
┌─────────────────────────────────────────────────────────┐
│  1. GENERAR RUIDO BASE (Simplex Noise)                  │
│     createNoise2D(seed) → función de ruido 2D           │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  2. APLICAR FBM (Fractal Brownian Motion)               │
│     fbm(nFn, x, y, octaves)                             │
│     → Suma múltiples frecuencias de ruido               │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  3. DOMAIN WARPING                                      │
│     domainWarp(nA, nB, nC, nD, x, y, oct, w1, w2)       │
│     → Deforma el espacio para crear formas orgánicas    │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  4. APLICAR COLOR                                       │
│     Interpolar entre colores A, B, C                    │
│     Basado en valores de ruido                          │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  5. AÑADIR GLOW                                         │
│     Realzar áreas brillantes con blanco                 │
│     pow(shape, 2.5) * highlight                         │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  6. APLICAR MÁSCARA DE TRANSPARENCIA                    │
│     - Fade radial (transparente en bordes)              │
│     - Ruido de alpha (variación natural)                │
└─────────────────────────────────────────────────────────┘
```

### Código de Generación

```javascript
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
    } = cfg;

    // Crear canvas
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    const img = ctx.createImageData(size, size);
    const d = img.data;

    // Generar funciones de ruido
    const nA = createNoise2D(seeds[0]);
    const nB = createNoise2D(seeds[1]);
    // ...

    // Iterar por cada pixel
    for (let py = 0; py < size; py++) {
        for (let px = 0; px < size; px++) {
            // Calcular coordenadas normalizadas
            const nx = (px / size - 0.5) * scale;
            const ny = (py / size - 0.5) * scale;

            // Domain warping para forma orgánica
            const raw = domainWarp(nA, nB, nC, nD, nx, ny, octaves);
            let shape = Math.pow(clamp(raw * 0.5 + 0.5, 0, 1), power);

            // Fade radial para bordes suaves
            const dist = Math.sqrt(dx*dx + dy*dy);
            let radialFade = 1.0;
            if (dist > 0.4) {
                radialFade = 1.0 - smoothstep(0, 1, (dist - 0.4) / 0.1);
            }

            // Calcular color final
            const ct = fbm(nE, nx*0.75, ny*0.75, 3);
            let r = lerp(cA[0], cB[0], clamp(ct, 0, 1));
            // ...

            // Aplicar alpha
            d[idx+3] = Math.floor(shape * opacity * radialFade);
        }
    }

    ctx.putImageData(img, 0, 0);
    return canvas;
}
```

## 🎮 Interactividad

### Mouse/Touch

```javascript
addEventListeners() {
    document.addEventListener('mousemove', e => {
        this.target.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.target.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });
}

animate() {
    // Interpolación suave del mouse
    this.mouse.x += (this.target.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.target.y - this.mouse.y) * 0.05;

    // Mover cámara
    this.camera.position.x += (this.mouse.x * 10 - this.camera.position.x) * 0.025;
    this.camera.position.y += (this.mouse.y * 7 - this.camera.position.y) * 0.025;
}
```

### Scroll

```javascript
window.addEventListener('scroll', () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    this.scroll = maxScroll > 0 ? scrollY / maxScroll : 0;
});

animate() {
    // Zoom de cámara con scroll
    const targetZ = 90 - this.scroll * 28;
    this.camera.position.z += (targetZ - this.camera.position.z) * 0.06;

    // Parallax de nebulosas
    this.nebulaSprites.forEach(sp => {
        const scrollOffsetX = this.scroll * 18;
        const scrollOffsetY = this.scroll * 10;
        sp.position.x = bp.x + this.mouse.x * pf * 210 + scrollOffsetX;
        sp.position.y = bp.y + this.mouse.y * pf * 150 + scrollOffsetY;
    });
}
```

## 🎨 Shaders GLSL

### Shader de Estrellas

**Vertex Shader:**
```glsl
attribute float aSize;
attribute float aBright;
varying   float vBright;
uniform   float uTime;
uniform   float uPR;

void main(){
    vBright = aBright;
    vec4 mv = modelViewMatrix * vec4(position, 1.);
    
    // Twinkling (parpadeo)
    float tw = sin(uTime*2.5 + position.x*14.0 + position.z*13.0) * 0.6 + 0.5;
    
    gl_PointSize = aSize * uPR * (0.8 + tw*0.5) * (80.0/-mv.z);
    gl_Position  = projectionMatrix * mv;
}
```

**Fragment Shader:**
```glsl
varying float vBright;

void main(){
    float d = distance(gl_PointCoord, vec2(0.5));
    float a = pow(1.0 - smoothstep(0.0, 0.5, d), 1.6);
    float h = pow(1.0 - smoothstep(0.0, 0.4, d), 2.0);
    
    // Color entre azul y amarillo
    vec3 col = mix(vec3(0.8, 0.88, 1.0), vec3(1.0, 0.95, 0.7), vBright);
    
    gl_FragColor = vec4(col, (a + h*0.5) * vBright);
}
```

### Shader de Polvo Cósmico

**Vertex Shader:**
```glsl
attribute float aSize;
varying   vec3  vCol;
uniform   float uTime;

void main(){
    vCol = color;
    vec3 p = position;
    
    // Movimiento orgánico
    p.x += sin(uTime*0.35 + position.y*0.04) * 2.5;
    p.y += cos(uTime*0.28 + position.x*0.04) * 2.0;
    p.z += sin(uTime*0.22 + position.z*0.03) * 1.2;
    
    vec4 mv = modelViewMatrix * vec4(p, 1.);
    gl_PointSize = aSize * uPR * (110.0/-mv.z);
    gl_Position  = projectionMatrix * mv;
}
```

## 📊 Rendimiento

### Optimizaciones Implementadas

1. **BufferGeometry**: Geometría optimizada para GPU
2. **AdditiveBlending**: Sin depth write para partículas
3. **Instanced Rendering**: Puntos en lugar de mallas complejas
4. **LOD implícito**: Estrellas lejanas con menos detalle

### Consumo de Recursos

| Elemento | Count | Impacto |
|----------|-------|---------|
| Estrellas lejanas | 10,000 | Medio |
| Estrellas cercanas | 1,800 | Bajo |
| Nebulosas | 17 | Bajo (sprites) |
| Polvo cósmico | ~2,000 | Bajo |

### Recomendaciones

```javascript
// Reducir pixel ratio en móviles
this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Ajustar calidad según dispositivo
if (isMobile) {
    // Reducir número de partículas
    // Simplificar shaders
}
```

## 🔧 Personalización

### Cambiar Colores de Nebulosas

```javascript
const defs = [
    {
        seeds: [1, 2, 3, 4, 5],
        a: '#tu-color-oscuro',
        b: '#tu-color-medio',
        c: '#tu-color-claro',
        // ...
    }
];
```

### Ajustar Densidad de Estrellas

```javascript
_buildStars() {
    const N = 5000; // Reducir de 10000 a 5000
    // ...
}
```

### Modificar Velocidad de Animación

```javascript
animate() {
    this.stars.rotation.y = t * 0.0035; // Cambiar multiplicador
    // ...
}
```

---

**Autor:** Qwen Code (Asistente de IA)  
**Documento:** 04-fondo-webgl.md  
**Basado en:** nebula-5.js original de ItsDPR LAB
