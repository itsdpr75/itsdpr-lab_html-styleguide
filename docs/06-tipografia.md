# Tipografía

## 📝 Fuente Principal

### Albert Sans

**ItsDPR LAB** utiliza **Albert Sans** como fuente principal en todos sus proyectos.

```html
<!-- Importar desde Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

```css
body {
    font-family: 'Albert Sans', sans-serif;
}
```

### Pesos Disponibles

| Peso | Valor | Uso Recomendado |
|------|-------|-----------------|
| Light | 300 | Texto decorativo, subtítulos sutiles |
| Regular | 400 | Cuerpo de texto, párrafos |
| Medium | 500 | Énfasis ligero, botones secundarios |
| SemiBold | 600 | Títulos de tarjetas, enlaces |
| Bold | 700 | Títulos importantes, CTAs |
| ExtraBold | 800 | Hero titles, logotipos, destacados |

## 📏 Escala Tipográfica

### Jerarquía Completa

```
┌─────────────────────────────────────────────────────────┐
│  HERO TITLE                                             │
│  font-size: 5rem (80px)                                 │
│  font-weight: 800                                       │
│  line-height: 1.1                                       │
│  → Título principal de landing pages                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  HERO TITLE 2                                           │
│  font-size: 3.5rem (56px)                               │
│  font-weight: 950                                       │
│  line-height: 1.1                                       │
│  → Títulos secundarios de hero                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  SECTION TITLE                                          │
│  font-size: 2.5rem (40px)                               │
│  font-weight: 800                                       │
│  → Títulos de sección                                   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  PAGE TITLE                                             │
│  font-size: 3.5rem (40px)                               │
│  font-weight: 800                                       │
│  → Títulos de página (About, Explorer)                  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  CARD TITLE                                             │
│  font-size: 1.3rem (20.8px)                             │
│  font-weight: 600                                       │
│  → Títulos de tarjetas                                  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  BODY LARGE                                             │
│  font-size: 1.3rem (20.8px)                             │
│  font-weight: 400                                       │
│  → Párrafos destacados, hero description                │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  BODY REGULAR                                           │
│  font-size: 1rem (16px)                                 │
│  font-weight: 400                                       │
│  → Cuerpo de texto estándar                             │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  SMALL                                                  │
│  font-size: 0.85rem (13.6px)                            │
│  font-weight: 400                                       │
│  → Metadata, tags, información secundaria               │
└─────────────────────────────────────────────────────────┘
```

### Implementación CSS

```css
/* Hero Title */
.hero-title {
    font-size: 5rem;
    font-weight: 800;
    margin-bottom: 24px;
    line-height: 1.1;
}

/* Hero Title 2 */
.hero-title-2 {
    font-size: 3.5rem;
    font-weight: 950;
    margin-bottom: 24px;
    line-height: 1.1;
}

/* Section Title */
.section-title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 16px;
}

/* Card Title */
.service-card h3,
.featured-info h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
}

/* Body Large */
.hero-description {
    font-size: 1.3rem;
    color: var(--text-secondary);
}

/* Body Regular */
p, .service-card p {
    font-size: 1rem;
    line-height: 1.6;
}

/* Small */
.tag, .stat-label {
    font-size: 0.85rem;
}
```

## 🌈 Texto con Gradiente

El texto con gradiente es un elemento distintivo del estilo ItsDPR LAB.

### Implementación

```css
.gradient-text {
    /* Gradiente de fondo */
    background: var(--gradient-text);
    
    /* Recortar fondo al texto */
    -webkit-background-clip: text;
    background-clip: text;
    
    /* Hacer transparente el color del texto */
    -webkit-text-fill-color: transparent;
    
    /* Mejorar luminosidad y saturación */
    filter: brightness(var(--brightness)) saturate(var(--saturation));
    
    /* Glow sutil */
    text-shadow: 
        0 0 20px rgba(167, 120, 255, 0.1),
        0 0 40px rgba(34, 211, 238, 0.3);
}
```

### Variables Relacionadas

```css
:root {
    --gradient-text: linear-gradient(135deg, #a78bfa, #22d3ee);
    --brightness: 1.1;
    --saturation: 1.2;
    --glow-alpha: 0.1;
    --glow-alpha-secondary: 0.3;
}
```

### Ejemplos de Uso

```html
<!-- Título con gradiente -->
<h1 class="gradient-text">Bienvenido</h1>

<!-- Logo -->
<span class="logo-text gradient-text">ItsDPR</span>

<!-- Texto inline -->
<p>Esto es <span class="gradient-text">texto destacado</span></p>
```

## 📐 Line Height

```css
/* Títulos */
.hero-title,
.hero-title-2,
.section-title {
    line-height: 1.1; /* Compacto para impacto visual */
}

/* Cuerpo de texto */
body, p {
    line-height: 1.6; /* Legibilidad óptima */
}

/* Texto descriptivo */
.service-card p,
.featured-info p {
    line-height: 1.6;
}
```

## 🎯 Letter Spacing

```css
/* Títulos grandes */
.hero-title {
    letter-spacing: -0.02em; /* Ligeramente condensado */
}

/* Texto normal */
body {
    letter-spacing: 0; /* Normal */
}

/* Badges y tags */
.hero-badge,
.tag {
    letter-spacing: 0.02em; /* Ligeramente expandido */
}
```

## 📱 Responsive Typography

### Breakpoints

```css
/* Desktop (> 992px) */
.hero-title {
    font-size: 5rem;
}

/* Tablet (768px - 992px) */
@media (max-width: 992px) {
    .hero-title {
        font-size: 3.5rem;
    }
    
    .page-title {
        font-size: 2.5rem;
    }
}

/* Mobile (< 768px) */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2.5rem;
    }
    
    .section-title {
        font-size: 1.8rem;
    }
    
    .hero-description {
        font-size: 1.1rem;
    }
}

/* Mobile pequeño (< 480px) */
@media (max-width: 480px) {
    .hero-title {
        font-size: 2rem;
    }
    
    .btn {
        font-size: 0.9rem;
    }
}
```

## 🎨 Colores de Texto

```css
/* Texto principal - máximo contraste */
--text-primary: #ffffff;

/* Texto secundario - contraste medio */
--text-secondary: #94a3b8;

/* Texto atenuado - información secundaria */
--text-muted: #64748b;
```

### Uso Recomendado

```css
/* Contenido principal */
body {
    color: var(--text-primary);
}

/* Párrafos, descripciones */
p, .hero-description {
    color: var(--text-secondary);
}

/* Metadata, labels */
.stat-label, .result-date {
    color: var(--text-muted);
}
```

## ♿ Accesibilidad

### Contraste Mínimo

| Combinación | Ratio | WCAG Level |
|-------------|-------|------------|
| Primary / BG | 18.5:1 | AAA |
| Secondary / BG | 10.2:1 | AA |
| Muted / BG | 6.8:1 | AA |

### Tamaño Mínimo

- **Texto normal:** 16px (1rem)
- **Texto pequeño:** 13.6px (0.85rem) - solo para metadata
- **Texto en botones:** 16px (1rem) mínimo

### Evitar

```css
/* ❌ No usar texto muy pequeño */
.too-small {
    font-size: 10px; /* Demasiado pequeño */
}

/* ❌ No usar solo color para diferenciar */
.color-only {
    color: red; /* Sin indicador adicional */
}

/* ✅ Usar tamaño adecuado */
.good-size {
    font-size: 0.85rem; /* 13.6px mínimo */
}

/* ✅ Usar múltiples indicadores */
.good-indicator {
    color: var(--danger);
    font-weight: 600;
    text-decoration: underline;
}
```

## 📊 Ejemplos Prácticos

### Hero Section

```html
<h1 class="hero-title">
    <span class="gradient-text">Bienvenido a ItsDPR LAB</span>
</h1>
<p class="hero-description">
    Estudio creativo especializado en desarrollo de experiencias digitales.
</p>
```

### Card Component

```html
<div class="service-card">
    <h3>Servicio</h3>
    <p>Descripción del servicio con información detallada.</p>
    <ul class="service-features">
        <li>Feature uno</li>
        <li>Feature dos</li>
    </ul>
</div>
```

### Badge con Texto

```html
<div class="hero-badge blur-effect-low">
    <i class="fas fa-sparkles"></i>
    <span>Indie developer and artist</span>
</div>
```

---

**Autor:** Qwen Code (Asistente de IA)  
**Documento:** 06-tipografia.md
