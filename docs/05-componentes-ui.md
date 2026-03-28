# Componentes UI

## 📋 Visión General

El sistema de componentes de ItsDPR LAB está construido con HTML semántico y CSS modular. Cada componente sigue patrones consistentes de diseño y es completamente responsive.

## 🔘 Botones

### Estructura Base

```html
<button class="btn btn-primary">
    <i class="fas fa-icon"></i>
    Texto del Botón
</button>
```

### Variantes

#### Primary Button

```css
.btn-primary {
    background: var(--gradient-primary);
    color: white;
    box-shadow: var(--shadow-glow);
}

.btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-glow-lg);
}
```

**Uso:** Acciones principales, CTAs

#### Secondary Button

```css
.btn-secondary {
    background: rgba(21, 21, 37, 0.5);
    color: var(--text-primary);
    border: 1px solid rgba(139, 92, 246, 0.3);
    backdrop-filter: blur(var(--blur-effect));
}
```

**Uso:** Acciones secundarias

#### Outline Button

```css
.btn-outline {
    background: rgba(139, 92, 246, 0.1);
    color: var(--text-primary);
    border: 2px solid var(--primary);
}
```

**Uso:** Acciones terciarias, enlaces disfrazados

### Estados

```css
/* Normal */
.btn { }

/* Hover */
.btn:hover {
    transform: translateY(-3px);
}

/* Disabled */
.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

/* Active (presionado) */
.btn:active {
    transform: translateY(-1px);
}
```

## 📦 Tarjetas (Cards)

### Featured Card

```html
<div class="featured-card" data-category="3D">
    <div class="featured-image">
        <div class="image-placeholder">
            <i class="fas fa-cube"></i>
        </div>
        <div class="featured-overlay">
            <span class="featured-badge">3D</span>
        </div>
    </div>
    <div class="featured-info">
        <h3>Título del Proyecto</h3>
        <p>Descripción del proyecto...</p>
        <div class="featured-tags">
            <span class="tag">Blender</span>
            <span class="tag">Personaje</span>
        </div>
    </div>
</div>
```

**Estilos:**

```css
.featured-card {
    background: rgba(21, 21, 37, 0.5);
    border-radius: var(--border-radius-xl);
    overflow: hidden;
    border: 1px solid rgba(139, 92, 246, 0.2);
    backdrop-filter: blur(var(--blur-effect-low));
    transition: var(--transition);
}

.featured-card:hover {
    transform: translateY(-10px);
    border-color: var(--primary);
    box-shadow: var(--shadow-glow-lg);
}
```

### Service Card

```html
<div class="service-card">
    <div class="service-icon">
        <i class="fas fa-cube"></i>
    </div>
    <h3>Servicio</h3>
    <p>Descripción del servicio...</p>
    <ul class="service-features">
        <li><i class="fas fa-check"></i> Feature 1</li>
        <li><i class="fas fa-check"></i> Feature 2</li>
    </ul>
</div>
```

**Estilos:**

```css
.service-card {
    background: rgba(21, 21, 37, 0.5);
    border-radius: var(--border-radius-xl);
    padding: 35px;
    border: 1px solid rgba(139, 92, 246, 0.2);
    backdrop-filter: blur(var(--blur-effect-low));
}

.service-icon {
    width: 60px;
    height: 60px;
    background: var(--gradient-primary);
    border-radius: var(--border-radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    margin-bottom: 25px;
}
```

## 🏷️ Badges y Tags

### Hero Badge

```html
<div class="hero-badge blur-effect-low">
    <i class="fas fa-sparkles"></i>
    <span>Texto del Badge</span>
</div>
```

**Estilos:**

```css
.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.3);
    padding: 8px 20px;
    border-radius: var(--border-radius-full);
    font-size: 0.9rem;
    color: var(--primary-light);
    backdrop-filter: blur(var(--blur-effect-low));
}
```

### Featured Badge

```html
<span class="featured-badge">Destacado</span>
```

**Estilos:**

```css
.featured-badge {
    background: var(--gradient-primary);
    color: white;
    padding: 6px 16px;
    border-radius: var(--border-radius-full);
    font-size: 0.85rem;
    font-weight: 600;
}
```

### Tags

```html
<div class="featured-tags">
    <span class="tag">Blender</span>
    <span class="tag">Unity</span>
    <span class="tag">GLSL</span>
</div>
```

**Estilos:**

```css
.tag {
    background: rgba(139, 92, 246, 0.1);
    color: var(--primary-light);
    padding: 4px 12px;
    border-radius: var(--border-radius-full);
    font-size: 0.8rem;
    border: 1px solid rgba(139, 92, 246, 0.2);
}
```

## 🧭 Navegación

### Navbar Principal

```html
<nav class="navbar">
    <div class="nav-container">
        <a href="index.html" class="nav-logo">
            <span class="logo-text">ItsDPR</span>
            <span class="logo-sub">LAB</span>
        </a>

        <ul class="nav-menu">
            <li><a href="index.html" class="nav-link">Home</a></li>
            <li><a href="explorer.html" class="nav-link">Proyectos</a></li>
            <li><a href="about.html" class="nav-link">About</a></li>
        </ul>

        <button class="nav-toggle" aria-label="Toggle menu">
            <i class="fas fa-bars"></i>
        </button>
    </div>
</nav>
```

**Estilos:**

```css
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: rgba(10, 10, 15, 0.4);
    backdrop-filter: blur(var(--blur-effect));
    border-bottom: 1px solid rgba(139, 92, 246, 0.2);
    transition: var(--transition);
}

.navbar.scrolled {
    background: rgba(10, 10, 15, 0.6);
    box-shadow: var(--shadow-lg);
}

.nav-link {
    color: var(--text-secondary);
    text-decoration: none;
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

.nav-link:hover::after,
.nav-link.active::after {
    width: 100%;
}
```

### Responsive

```css
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 80px;
        left: 0;
        width: 100%;
        background: var(--bg-secondary);
        flex-direction: column;
        padding: 30px;
        transform: translateY(-150%);
        transition: var(--transition);
    }

    .nav-menu.active {
        transform: translateY(0);
    }

    .nav-toggle {
        display: block;
    }
}
```

## 📰 Result Cards (Explorer)

```html
<div class="result-card">
    <div class="result-image-container">
        <img src="imagen.jpg" alt="Proyecto" class="result-image">
    </div>
    <div class="result-info">
        <h3 class="result-title">Título</h3>
        <p class="result-desc">Descripción...</p>
        <div class="result-meta">
            <span class="result-date">
                <i class="fas fa-calendar"></i> 2025
            </span>
            <div class="result-tags">
                <span class="result-tag">Tag1</span>
                <span class="result-tag">Tag2</span>
            </div>
        </div>
    </div>
</div>
```

**Estilos:**

```css
.result-card {
    background: rgba(21, 21, 37, 0.5);
    border-radius: var(--border-radius-xl);
    overflow: hidden;
    border: 1px solid rgba(139, 92, 246, 0.2);
    transition: var(--transition);
    cursor: pointer;
    display: flex;
    backdrop-filter: blur(var(--blur-effect));
}

.result-card:hover {
    transform: translateX(10px);
    border-color: var(--primary);
    box-shadow: var(--shadow-glow);
}

.result-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
}

.result-card:hover .result-image {
    transform: scale(1.05);
}
```

## 📊 Stats Cards

```html
<div class="stat-item">
    <span class="stat-number" data-count="50">0</span>
    <span class="stat-label">Proyectos</span>
</div>
```

**Estilos:**

```css
.stat-item {
    text-align: center;
}

.stat-number {
    display: block;
    font-size: 3rem;
    font-weight: 800;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.stat-label {
    color: var(--text-secondary);
    font-size: 0.9rem;
}
```

## 🎯 Social Links

```html
<div class="social-links">
    <a href="https://github.com/" aria-label="GitHub">
        <i class="fab fa-github"></i>
    </a>
    <a href="https://twitter.com/" aria-label="Twitter">
        <i class="fab fa-twitter"></i>
    </a>
</div>
```

**Estilos:**

```css
.social-links a {
    width: 45px;
    height: 45px;
    background: rgba(21, 21, 37, 0.5);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    font-size: 1.2rem;
    transition: var(--transition);
    backdrop-filter: blur(var(--blur-effect));
}

.social-links a:hover {
    background: var(--gradient-primary);
    color: white;
    border-color: transparent;
    transform: translateY(-3px);
}
```

## 📝 Footer

```html
<footer class="footer">
    <div class="container">
        <div class="footer-grid">
            <div class="footer-brand">
                <a href="index.html" class="footer-logo">
                    <span class="logo-text">ItsDPR</span>
                    <span class="logo-sub">LAB</span>
                </a>
                <p>Descripción...</p>
                <div class="social-links">...</div>
            </div>

            <div class="footer-links">
                <h4>Navegación</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="explorer.html">Proyectos</a></li>
                </ul>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; 2025 ItsDPR LAB. Todos los derechos reservados.</p>
        </div>
    </div>
</footer>
```

---

**Autor:** Qwen Code (Asistente de IA)  
**Documento:** 05-componentes-ui.md
