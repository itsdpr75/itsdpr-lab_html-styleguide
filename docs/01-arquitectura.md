# Arquitectura del Sistema

## Visión General

El sistema de diseño de ItsDPR LAB está construido con una arquitectura modular que separa claramente:

- **Configuración** (datos)
- **Estilos** (presentación)
- **Comportamiento** (lógica)

## 📁 Estructura de Archivos

```
style-guide/
├── index.html              # Punto de entrada principal
├── config.json             # Configuración centralizada
├── css/
│   ├── styles.css          # Estilos base del sistema
│   └── styleguide.css      # Estilos específicos de documentación
├── js/
│   ├── loadConfig.js       # Cargador de configuración
│   ├── main.js             # Funcionalidades principales
│   ├── nebula-5.js         # Fondo WebGL (Three.js)
│   ├── greetingRotator.js  # Rotador de saludos
│   └── styleguide.js       # Lógica específica del styleguide
├── components/
│   └── navbar.html         # Componente de navegación
└── docs/                   # Esta documentación
```

## 🔄 Flujo de Carga

### 1. HTML se carga primero

```html
<head>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/styleguide.css">
</head>
<body>
    <canvas id="fog-canvas"></canvas>
    <nav class="navbar">...</nav>
    
    <!-- Scripts al final -->
    <script src="js/loadConfig.js"></script>
    <script src="three.min.js"></script>
    <script src="js/nebula-5.js"></script>
    <script src="js/greetingRotator.js"></script>
    <script src="js/main.js"></script>
    <script src="js/styleguide.js"></script>
</body>
```

### 2. CSS aplica estilos base

- Variables CSS se definen en `:root`
- Estilos se aplican inmediatamente
- El canvas del fondo es invisible hasta que Three.js renderiza

### 3. JavaScript ejecuta en orden

```
┌─────────────────┐
│ loadConfig.js   │ → Lee config.json y aplica variables CSS
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Three.js (lib)  │ → Biblioteca 3D externa
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ nebula-5.js     │ → Inicializa fondo WebGL
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ greetingRotator │ → Inicia rotación de saludos
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ main.js         │ → Navegación, scroll, formularios
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ styleguide.js   │ → Funcionalidad específica de docs
└─────────────────┘
```

## ⚙️ Sistema de Configuración

### config.json

La configuración está centralizada en un archivo JSON:

```json
{
  "colors": {
    "bg": { "primary": "#0a0a0f" },
    "neon": { "primary": "#8b5cf6" }
  },
  "gradients": {
    "primary": "linear-gradient(135deg, #8b5cf6, #06b6d4)"
  },
  "effects": {
    "blur": "15px",
    "brightness": 1.1
  }
}
```

### loadConfig.js

Este script:

1. **Fetch** del config.json
2. **Parsea** el JSON
3. **Aplica** las variables al `document.documentElement`

```javascript
async function loadThemeConfig() {
    const response = await fetch('config.json');
    const config = await response.json();
    applyThemeVariables(config);
}

function applyThemeVariables(config) {
    const root = document.documentElement;
    root.style.setProperty('--primary', config.colors.neon.primary);
    // ... más variables
}
```

### Recarga dinámica

Durante el desarrollo, puedes recargar el tema sin refrescar:

```javascript
window.reloadTheme(); // Recarga config.json y reaplica
```

## 🎨 Sistema de Variables CSS

Todas las propiedades visuales usan variables CSS:

```css
:root {
    /* Colores */
    --primary: #8b5cf6;
    --secondary: #06b6d4;
    
    /* Efectos */
    --blur-effect: 15px;
    --shadow-glow: 0 0 30px rgba(139, 92, 246, 0.3);
    
    /* Transiciones */
    --transition: all 0.3s ease;
}
```

### Ventajas

- **Personalización fácil**: Cambia un color en un solo lugar
- **Consistencia**: Mismo valor en toda la app
- **Runtime changes**: Puedes modificar con JavaScript
- **Theming**: Fácil crear temas alternativos

## 🧩 Componentes

Los componentes son HTML reutilizable:

### navbar.html

```html
<nav class="navbar">
    <div class="nav-container">
        <a href="index.html" class="nav-logo">
            <span class="logo-text">ItsDPR</span>
            <span class="logo-sub">LAB</span>
        </a>
        <ul class="nav-menu">...</ul>
    </div>
</nav>
```

### Métodos de inclusión

1. **Inline**: Copiar el HTML directamente
2. **Fetch**: Cargar dinámicamente con JavaScript
3. **Server-side include**: Si el servidor lo soporta

## 📊 Dependencias

| Dependencia | Versión | Propósito |
|-------------|---------|-----------|
| Three.js | r128 | Renderizado WebGL 3D |
| Font Awesome | 6.4.0 | Iconos |
| Google Fonts | - | Albert Sans |

## 🎯 Principios de Diseño

1. **Mobile First**: Responsive desde el inicio
2. **Progressive Enhancement**: Funciona sin JS, mejora con él
3. **Consistencia**: Mismos patrones en toda la app
4. **Accesibilidad**: Contraste adecuado, ARIA labels
5. **Performance**: CSS crítico inline, JS diferido

---

**Autor:** Qwen Code (Asistente de IA)  
**Documento:** 01-arquitectura.md
