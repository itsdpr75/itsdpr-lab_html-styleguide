# ItsDPR LAB - Style Guide

Styleguide generado por Qwen Code, Qwen se ha encargado solo de extraer el estilo de mi pagina web y crear un styleguide a partir de el mientras yo seguia desarroyando mi pagina.

Documentación completa del sistema de diseño de ItsDPR LAB. Este style guide contiene todos los componentes, estilos y patrones necesarios para mantener la consistencia visual en todos los proyectos.

## 📁 Estructura de Archivos

```
style-guide/
├── index.html              # Documentación visual interactiva
├── config.json             # Configuración centralizada de temas
├── css/
│   ├── styles.css          # Estilos principales (copiado del proyecto)
│   └── styleguide.css      # Estilos específicos para la documentación
├── js/
│   ├── loadConfig.js       # Cargador de configuración JSON
│   ├── nebula-5.js         # Efecto de fondo WebGL (Three.js)
│   ├── greetingRotator.js  # Rotador de saludos multilenguaje
│   ├── main.js             # Funcionalidades principales
│   └── styleguide.js       # JavaScript específico del styleguide
├── components/
│   └── navbar.html         # Componente de navegación
└── README.md               # Esta documentación
```

## 🎨 Sistema de Diseño

### Colores

El sistema de colores está basado en variables CSS que permiten una fácil personalización. Todos los colores están definidos en `config.json` y se aplican automáticamente.

#### Colores Principales

| Variable | Valor | Uso |
|----------|-------|-----|
| `--bg-primary` | `#0a0a0f` | Fondo principal |
| `--bg-secondary` | `#0f0f1a` | Fondo secundario |
| `--surface` | `#151525` | Superficies (tarjetas, paneles) |
| `--surface-hover` | `#1a1a30` | Hover de superficies |

#### Colores Neón

| Variable | Valor | Uso |
|----------|-------|-----|
| `--primary` | `#8b5cf6` | Color primario (violeta) |
| `--primary-light` | `#a78bfa` | Primario claro |
| `--primary-dark` | `#6d28d9` | Primario oscuro |
| `--secondary` | `#06b6d4` | Color secundario (cyan) |
| `--secondary-light` | `#22d3ee` | Secundario claro |
| `--accent` | `#f472b6` | Acento (rosa) |
| `--accent-light` | `#f9a8d4` | Acento claro |

#### Colores de Texto

| Variable | Valor | Uso |
|----------|-------|-----|
| `--text-primary` | `#ffffff` | Texto principal |
| `--text-secondary` | `#94a3b8` | Texto secundario |
| `--text-muted` | `#64748b` | Texto atenuado |

#### Colores de Estado

| Variable | Valor | Uso |
|----------|-------|-----|
| `--success` | `#10b981` | Éxito |
| `--warning` | `#f59e0b` | Advertencia |
| `--danger` | `#ef4444` | Error/Peligro |
| `--info` | `#3b82f6` | Información |

### Tipografía

**Fuente Principal:** Albert Sans

| Peso | Valor | Uso |
|------|-------|-----|
| Light | 300 | Texto decorativo |
| Regular | 400 | Cuerpo de texto |
| Medium | 500 | Énfasis ligero |
| SemiBold | 600 | Títulos de tarjetas |
| Bold | 700 | Títulos importantes |
| ExtraBold | 800 | Hero titles, logotipos |

#### Escala Tipográfica

```css
/* Hero Title */
font-size: 5rem;      /* 80px */
font-weight: 800;

/* Hero Title 2 */
font-size: 3.5rem;    /* 56px */
font-weight: 950;

/* Section Title */
font-size: 2.5rem;    /* 40px */
font-weight: 800;

/* Card Title */
font-size: 1.3rem;    /* 20.8px */
font-weight: 600;

/* Body Large */
font-size: 1.3rem;    /* 20.8px */
font-weight: 400;

/* Body Regular */
font-size: 1rem;      /* 16px */
font-weight: 400;

/* Small */
font-size: 0.85rem;   /* 13.6px */
font-weight: 400;
```

### Gradientes

```css
--gradient-primary: linear-gradient(135deg, #8b5cf6, #06b6d4);
--gradient-secondary: linear-gradient(135deg, #6d28d9, #8b5cf6);
--gradient-text: linear-gradient(135deg, #a78bfa, #22d3ee);
--gradient-glow: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(6, 182, 212, 0.3));
```

### Bordes

```css
--border-radius: 8px;         /* Bordes estándar */
--border-radius-lg: 12px;     /* Bordes medianos */
--border-radius-xl: 16px;     /* Bordes grandes */
--border-radius-full: 9999px; /* Bordes completamente redondos */
```

### Sombras y Efectos

```css
/* Sombras */
--shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
--shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.4);

/* Glow (Resplandor) */
--shadow-glow: 0 0 30px rgba(139, 92, 246, 0.3);
--shadow-glow-lg: 0 0 50px rgba(139, 92, 246, 0.4);

/* Blur (Glassmorphism) */
--blur-effect: 15px;
--blur-effect-low: 5px;
```

### Transiciones

```css
--transition: all 0.3s ease;
--transition-slow: all 0.5s ease;
```

## 🧩 Componentes

### Botones

Los botones son elementos clave con estilo neón y efectos de hover.

#### Primary Button
```html
<button class="btn btn-primary">
    <i class="fas fa-rocket"></i>
    Primary Button
</button>
```

#### Secondary Button
```html
<button class="btn btn-secondary">
    <i class="fas fa-info-circle"></i>
    Secondary Button
</button>
```

#### Outline Button
```html
<button class="btn btn-outline">
    <i class="fas fa-arrow-right"></i>
    Outline Button
</button>
```

### Tarjetas

#### Featured Card
```html
<div class="featured-card" data-category="Demo">
    <div class="featured-image">
        <div class="image-placeholder">
            <i class="fas fa-cube"></i>
        </div>
        <div class="featured-overlay">
            <span class="featured-badge">Demo</span>
        </div>
    </div>
    <div class="featured-info">
        <h3>Card Title</h3>
        <p>Descripción de la tarjeta.</p>
        <div class="featured-tags">
            <span class="tag">Tag 1</span>
            <span class="tag">Tag 2</span>
        </div>
    </div>
</div>
```

#### Service Card
```html
<div class="service-card">
    <div class="service-icon">
        <i class="fas fa-cube"></i>
    </div>
    <h3>Service Title</h3>
    <p>Descripción del servicio.</p>
    <ul class="service-features">
        <li><i class="fas fa-check"></i> Feature 1</li>
        <li><i class="fas fa-check"></i> Feature 2</li>
    </ul>
</div>
```

### Badges y Tags

#### Hero Badge
```html
<div class="hero-badge blur-effect-low">
    <i class="fas fa-sparkles"></i>
    <span>Hero Badge</span>
</div>
```

#### Tags
```html
<span class="tag">Blender</span>
<span class="tag">Unity</span>
```

### Navegación

El navbar es un componente fijo con efecto glassmorphism.

```html
<nav class="navbar">
    <div class="nav-container">
        <a href="index.html" class="nav-logo">
            <span class="logo-text">ItsDPR</span>
            <span class="logo-sub">LAB</span>
        </a>

        <ul class="nav-menu">
            <li><a href="#" class="nav-link">Home</a></li>
            <li><a href="#" class="nav-link">Proyectos</a></li>
            <li><a href="#" class="nav-link">About</a></li>
        </ul>

        <button class="nav-toggle" aria-label="Toggle menu">
            <i class="fas fa-bars"></i>
        </button>
    </div>
</nav>
```

## ✨ Efectos Especiales

### Fondo WebGL (Nebula Effect)

El fondo espacial es creado usando **Three.js** con las siguientes características:

- **10,000 estrellas lejanas** con brillo variable
- **1,800 estrellas cercanas** con efecto de paralaje
- **17 nebulosas** distribuidas por toda la pantalla con textura procedural
- **4 nubes de polvo cósmico** con animación independiente

#### Interactividad:
- **Mouse:** Controla la rotación y posición de la cámara
- **Scroll:** Ajusta la profundidad de campo
- **Animación:** Rotación continua de todos los elementos

### Glassmorphism (Efecto Blur)

El efecto de vidrio esmerilado se aplica usando `backdrop-filter`:

```css
/* Blur bajo (5px) */
.blur-effect-low {
    backdrop-filter: blur(5px);
}

/* Blur normal (15px) */
.blur-effect {
    backdrop-filter: blur(15px);
}
```

### Gradiente en Texto

El texto con gradiente es característico del estilo ItsDPR LAB:

```css
.gradient-text {
    background: linear-gradient(135deg, #a78bfa, #22d3ee);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: brightness(1.1) saturate(1.2);
    text-shadow: 0 0 20px rgba(167, 120, 255, 0.1), 
                 0 0 40px rgba(34, 211, 238, 0.3);
}
```

## 🔧 Configuración

### config.json

La configuración centralizada permite cambiar todo el tema modificando un solo archivo:

```json
{
  "colors": {
    "bg": {
      "primary": "#0a0a0f",
      "secondary": "#0f0f1a"
    },
    "neon": {
      "primary": "#8b5cf6",
      "secondary": "#06b6d4"
    }
  },
  "gradients": {
    "primary": "linear-gradient(135deg, #8b5cf6, #06b6d4)"
  },
  "effects": {
    "blur": "15px",
    "brightness": 1.1,
    "saturation": 1.2
  }
}
```

### Cargar Configuración

El archivo `loadConfig.js` se encarga de aplicar automáticamente las variables:

```html
<script src="js/loadConfig.js"></script>
```

Para recargar la configuración dinámicamente (útil en desarrollo):

```javascript
window.reloadTheme();
```

## 📱 Responsive Design

El sistema es completamente responsive con los siguientes breakpoints:

```css
/* Mobile */
@media (max-width: 480px) { ... }

/* Tablet */
@media (max-width: 768px) { ... }

/* Desktop pequeño */
@media (max-width: 992px) { ... }

/* Desktop grande */
@media (max-width: 1200px) { ... }
```

## 🚀 Uso

### 1. Abrir el Style Guide

Abre `index.html` en tu navegador para ver la documentación visual interactiva.

### 2. Personalizar el Tema

Edita `config.json` para cambiar colores, efectos y espaciado.

### 3. Usar Componentes

Copia el HTML de los componentes desde la documentación o desde `components/`.

### 4. Mantener Consistencia

Referencia este style guide al crear nuevas páginas o componentes.

## 📦 Dependencias

- **Three.js** (r128) - Fondo WebGL
- **Font Awesome** (6.4.0) - Iconos
- **Google Fonts** - Albert Sans

## 🎯 Mejores Prácticas

1. **Siempre usa las variables CSS** en lugar de valores hardcodeados
2. **Mantén la jerarquía tipográfica** establecida
3. **Usa los componentes existentes** antes de crear nuevos
4. **Prueba en todos los breakpoints** responsive
5. **Mantén el contraste** adecuado para accesibilidad

## 📝 Licencia

Este style guide es parte del proyecto ItsDPR LAB. 

Licencia AGPL 3.0 - Cualquier modificacion que hagas o fork debe ser de codigo abierto con la misma licencia. No puedes revender este contenido.

Se permite ganar dinero con programas o servicios que usen este styleguide, el unico requisito es dejar en alguna parte el enlace al repositorio original

---

**Última actualización:** Marzo 2025
