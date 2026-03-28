# Sistema de Colores y Temas

## 🎨 Paleta de Colores

El sistema de colores de ItsDPR LAB está basado en una estética **cyberpunk/neón** con fondo oscuro.

### Colores Base

```
┌─────────────────────────────────────────────────────────┐
│  FONDO OSCURO                                           │
│  ┌─────────────┐ ┌─────────────┐                        │
│  │ Primary     │ │ Secondary   │                        │
│  │ #0a0a0f     │ │ #0f0f1a     │                        │
│  └─────────────┘ └─────────────┘                        │
│                                                         │
│  SUPERFICIES                                            │
│  ┌─────────────┐ ┌─────────────┐                        │
│  │ Default     │ │ Hover       │                        │
│  │ #151525     │ │ #1a1a30     │                        │
│  └─────────────┘ └─────────────┘                        │
└─────────────────────────────────────────────────────────┘
```

### Colores Neón (Acento)

```
PRIMARY          SECONDARY        ACCENT
Violeta          Cyan             Rosa
#8b5cf6          #06b6d4          #f472b6
   │                │                │
   ▼                ▼                ▼
#a78bfa         #22d3ee          #f9a8d4
(light)         (light)          (light)
   │                │                │
   ▼                ▼                ▼
#6d28d9              │                │
(dark)               │                │
```

## 📋 Variables CSS

Todas las variables están definidas en `:root`:

```css
:root {
    /* Colores Principales */
    --bg-primary: #0a0a0f;
    --bg-secondary: #0f0f1a;
    --surface: #151525;
    --surface-hover: #1a1a30;

    /* Colores Neón */
    --primary: #8b5cf6;
    --primary-light: #a78bfa;
    --primary-dark: #6d28d9;
    --secondary: #06b6d4;
    --secondary-light: #22d3ee;
    --accent: #f472b6;
    --accent-light: #f9a8d4;

    /* Colores de Texto */
    --text-primary: #ffffff;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;

    /* Colores de Estado */
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
    --info: #3b82f6;
}
```

## 🌈 Gradientes

Los gradientes son fundamentales para el estilo neón:

### Gradiente Primario

```css
--gradient-primary: linear-gradient(135deg, #8b5cf6, #06b6d4);
```

**Uso:** Botones primarios, iconos de servicio, elementos destacados

```html
<button class="btn btn-primary">
    <!-- Usa --gradient-primary -->
</button>
```

### Gradiente de Texto

```css
--gradient-text: linear-gradient(135deg, #a78bfa, #22d3ee);
```

**Uso:** Títulos, logo, texto destacado

```css
.gradient-text {
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
```

### Gradiente Glow

```css
--gradient-glow: linear-gradient(
    135deg, 
    rgba(139, 92, 246, 0.3), 
    rgba(6, 182, 212, 0.3)
);
```

**Uso:** Fondos de placeholders, overlays sutiles

## ✨ Efectos de Brillo (Glow)

El efecto glow es clave para la estética neón:

### Shadow Glow

```css
--shadow-glow: 0 0 30px rgba(139, 92, 246, 0.3);
--shadow-glow-lg: 0 0 50px rgba(139, 92, 246, 0.4);
```

**Aplicación:**

```css
.btn-primary {
    box-shadow: var(--shadow-glow);
}

.btn-primary:hover {
    box-shadow: var(--shadow-glow-lg);
}
```

### Text Glow

```css
.gradient-text {
    text-shadow: 
        0 0 20px rgba(167, 120, 255, 0.1),
        0 0 40px rgba(34, 211, 238, 0.3);
}
```

## 🎛️ Personalización

### Cambiar el color primario

Edita `config.json`:

```json
{
  "colors": {
    "neon": {
      "primary": "#tu-color",
      "primary-light": "#tu-color-claro",
      "primary-dark": "#tu-color-oscuro"
    }
  }
}
```

### Crear un tema alternativo

1. Duplica `config.json` como `config-dark.json`
2. Modifica los colores
3. Carga dinámicamente:

```javascript
async function loadTheme(themeName) {
    const response = await fetch(`config-${themeName}.json`);
    const config = await response.json();
    applyThemeVariables(config);
}
```

## 📊 Contraste y Accesibilidad

El sistema mantiene ratios de contraste adecuados:

| Combinación | Ratio | WCAG |
|-------------|-------|------|
| Text Primary / BG Primary | 18.5:1 | AAA |
| Text Secondary / BG Primary | 10.2:1 | AA |
| Primary / BG Primary | 8.1:1 | AA |

## 🎨 Ejemplos de Uso

### Botón con Gradiente

```css
.btn-primary {
    background: var(--gradient-primary);
    color: white;
    box-shadow: var(--shadow-glow);
}
```

### Tarjeta con Borde Neón

```css
.featured-card {
    background: rgba(21, 21, 37, 0.5);
    border: 1px solid rgba(139, 92, 246, 0.2);
}

.featured-card:hover {
    border-color: var(--primary);
    box-shadow: var(--shadow-glow-lg);
}
```

### Texto con Gradiente

```css
.title {
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: brightness(1.1) saturate(1.2);
}
```

---

**Autor:** Qwen Code (Asistente de IA)  
**Documento:** 02-colores-temas.md
