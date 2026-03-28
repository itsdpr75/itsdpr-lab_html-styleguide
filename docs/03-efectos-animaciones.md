# Efectos Visuales y Animaciones

## 🌫️ Glassmorphism (Efecto Blur)

El efecto de vidrio esmerilado es característico del estilo ItsDPR LAB.

### Implementación

```css
/* Blur normal (15px) */
.blur-effect {
    backdrop-filter: blur(var(--blur-effect));
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Blur bajo (5px) */
.blur-effect-low {
    backdrop-filter: blur(var(--blur-effect-low));
    background: rgba(255, 255, 255, 0.03);
}
```

### Variables

```css
:root {
    --blur-effect: 15px;
    --blur-effect-low: 5px;
}
```

### Ejemplos de Uso

#### Navbar

```css
.navbar {
    background: rgba(10, 10, 15, 0.4);
    backdrop-filter: blur(15px);
    border-bottom: 1px solid rgba(139, 92, 246, 0.2);
}
```

#### Tarjetas

```css
.service-card {
    background: rgba(21, 21, 37, 0.5);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(139, 92, 246, 0.2);
}
```

## ✨ Sombras y Resplandores

### Jerarquía de Sombras

```
┌─────────────────────────────────────────────────────────┐
│  SOMBRA DEFAULT                                         │
│  0 4px 6px rgba(0, 0, 0, 0.3)                           │
│  → Uso: Elementos elevados ligeramente                  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  SOMBRA LARGE                                           │
│  0 10px 25px rgba(0, 0, 0, 0.4)                         │
│  → Uso: Modales, dropdowns                              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  GLOW (Resplandor Neón)                                 │
│  0 0 30px rgba(139, 92, 246, 0.3)                       │
│  → Uso: Botones, elementos interactivos                 │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  GLOW LARGE                                             │
│  0 0 50px rgba(139, 92, 246, 0.4)                       │
│  → Uso: Hover states, elementos activos                 │
└─────────────────────────────────────────────────────────┘
```

### Aplicación en Botones

```css
.btn-primary {
    box-shadow: var(--shadow-glow);
    transition: var(--transition);
}

.btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-glow-lg);
}
```

## 🔄 Transiciones

### Variables de Transición

```css
:root {
    --transition: all 0.3s ease;
    --transition-slow: all 0.5s ease;
}
```

### Patrones Comunes

#### Hover en Tarjetas

```css
.card {
    transition: var(--transition);
}

.card:hover {
    transform: translateY(-10px);
    border-color: var(--primary);
    box-shadow: var(--shadow-glow-lg);
}
```

#### Enlaces de Navegación

```css
.nav-link {
    transition: var(--transition);
    position: relative;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--gradient-primary);
    transition: var(--transition);
}

.nav-link:hover::after {
    width: 100%;
}
```

## 🎬 Animaciones Keyframe

### Fade In Up

```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hero-title {
    animation: fadeInUp 0.8s ease 0.2s backwards;
}
```

### Bounce (Scroll Indicator)

```css
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateX(-50%) translateY(0);
    }
    40% {
        transform: translateX(-50%) translateY(-10px);
    }
    60% {
        transform: translateX(-50%) translateY(-5px);
    }
}

.hero-scroll {
    animation: bounce 2s infinite;
}
```

### Pulse (Elementos Interactivos)

```css
@keyframes pulse {
    0%, 100% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.8;
        transform: scale(0.98);
    }
}
```

### Float (Elementos Flotantes)

```css
@keyframes float {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}
```

## 🎯 Efectos en Elementos Específicos

### Texto con Gradiente

```css
.gradient-text {
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: brightness(var(--brightness)) saturate(var(--saturation));
    text-shadow: 
        0 0 20px rgba(167, 120, 255, 0.1),
        0 0 40px rgba(34, 211, 238, 0.3);
}
```

### Bordes Brillantes

```css
.card {
    border: 1px solid rgba(139, 92, 246, 0.2);
    transition: var(--transition);
}

.card:hover {
    border-color: var(--primary);
    box-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
}
```

### Badge con Glow

```css
.hero-badge {
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.3);
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.1);
    backdrop-filter: blur(5px);
}
```

## 📊 Performance

### Optimizaciones

1. **Usar `transform` y `opacity`** para animaciones (aceleración por hardware)
2. **Evitar animar `width`, `height`, `top`, `left`**
3. **Usar `will-change`** para elementos animados complejos

```css
.animated-card {
    will-change: transform;
}
```

4. **Reducir `backdrop-filter`** en dispositivos móviles

```css
@media (max-width: 768px) {
    .navbar {
        backdrop-filter: blur(10px); /* Reducido de 15px */
    }
}
```

## 🎨 Combinación de Efectos

### Ejemplo: Tarjeta Premium

```css
.premium-card {
    /* Base */
    background: rgba(21, 21, 37, 0.5);
    border-radius: 16px;
    border: 1px solid rgba(139, 92, 246, 0.2);
    
    /* Glassmorphism */
    backdrop-filter: blur(15px);
    
    /* Sombra base */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    
    /* Transición */
    transition: all 0.3s ease;
}

.premium-card:hover {
    /* Transformación */
    transform: translateY(-10px) scale(1.02);
    
    /* Borde neón */
    border-color: #8b5cf6;
    
    /* Glow intensificado */
    box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.4),
        0 0 50px rgba(139, 92, 246, 0.4);
}
```

---

**Autor:** Qwen Code (Asistente de IA)  
**Documento:** 03-efectos-animaciones.md
