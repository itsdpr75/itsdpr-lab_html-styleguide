# JavaScript y Funcionalidad

## 📦 Visión General

El sistema JavaScript de ItsDPR LAB está modularizado en archivos independientes que manejan funcionalidades específicas. Todos los scripts se cargan al final del `<body>` para no bloquear el renderizado inicial.

## 🔄 Flujo de Carga

```html
<!-- Scripts al final del body -->
<script src="js/loadConfig.js"></script>
<script src="three.min.js"></script>
<script src="js/nebula-5.js"></script>
<script src="js/greetingRotator.js"></script>
<script src="js/main.js"></script>
<script src="js/styleguide.js"></script>
```

### Orden de Ejecución

```
1. loadConfig.js      → Carga configuración y aplica variables CSS
2. three.min.js       → Biblioteca Three.js (dependencia externa)
3. nebula-5.js        → Inicializa fondo WebGL cuando DOM está listo
4. greetingRotator.js → Inicia rotador de saludos
5. main.js            → Funcionalidades principales (navbar, scroll, etc.)
6. styleguide.js      → Funcionalidad específica del styleguide
```

## ⚙️ loadConfig.js

### Propósito

Cargar la configuración desde `config.json` y aplicar las variables CSS dinámicamente.

### Implementación

```javascript
document.addEventListener('DOMContentLoaded', function() {
    loadThemeConfig();
});

async function loadThemeConfig() {
    try {
        const response = await fetch('config.json');
        const config = await response.json();
        applyThemeVariables(config);
    } catch (error) {
        console.error('Error cargando config.json:', error);
    }
}

function applyThemeVariables(config) {
    const root = document.documentElement;

    // Aplicar colores de fondo
    root.style.setProperty('--bg-primary', config.colors.bg.primary);
    root.style.setProperty('--bg-secondary', config.colors.bg.secondary);

    // Aplicar colores neón
    root.style.setProperty('--primary', config.colors.neon.primary);
    root.style.setProperty('--primary-light', config.colors.neon['primary-light']);
    
    // ... más variables
}

// Función de recarga dinámica (desarrollo)
window.reloadTheme = function() {
    loadThemeConfig();
    console.log('Tema recargado desde config.json');
};
```

### Uso en Desarrollo

```javascript
// En la consola del navegador
window.reloadTheme(); // Recarga la configuración sin refrescar
```

## 🌌 nebula-5.js

### Propósito

Crear el fondo espacial interactivo con nebulosas usando Three.js.

### Arquitectura

```javascript
class FogEffect {
    constructor() {
        this.canvas = document.getElementById('fog-canvas');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.nebulaSprites = [];
        this.stars = null;
        this.starsNear = null;
        this.dustClouds = [];
        
        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        // Configurar escena, cámara, renderer
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        
        // Construir elementos
        this._buildStars();
        this._buildNebulae();
        this._buildDust();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        // Actualizar animaciones
        this.renderer.render(this.scene, this.camera);
    }
}

// Inicializar cuando DOM está listo
document.addEventListener('DOMContentLoaded', () => { 
    new FogEffect(); 
});
```

### Ver Documentación Completa

Para más detalles, ver [04-fondo-webgl.md](04-fondo-webgl.md)

## 🎭 greetingRotator.js

### Propósito

Rotar automáticamente el texto de saludo en el hero entre múltiples idiomas.

### Implementación

```javascript
const GreetingRotator = {
    // Lista de saludos
    greetings: [
        { text: "Bienvenidos", lang: "es" },
        { text: "Welcome", lang: "en" },
        { text: "ようこそ", lang: "ja" },
        { text: "Добро пожаловать", lang: "ru" },
        { text: "Bienvenue", lang: "fr" },
        { text: "Willkommen", lang: "de" },
        { text: "환영합니다", lang: "ko" },
        { text: "欢迎", lang: "zh" },
    ],

    currentIndex: 0,
    element: null,
    fadeDuration: 500,    // ms
    displayDuration: 2000, // ms

    // Inicializar
    init(selector = '.gradient-text') {
        this.element = document.querySelector(selector);
        if (!this.element) {
            console.error('Greeting element not found');
            return;
        }
        this.rotate();
    },

    // Rotar al siguiente saludo
    rotate() {
        if (!this.element) return;

        // Fade out
        this.element.style.opacity = '0';
        this.element.style.transition = `opacity ${this.fadeDuration}ms ease-in-out`;

        setTimeout(() => {
            // Cambiar texto
            this.element.textContent = this.greetings[this.currentIndex].text;

            // Fade in
            this.element.style.opacity = '1';

            // Siguiente índice
            this.currentIndex = (this.currentIndex + 1) % this.greetings.length;

            // Programar siguiente rotación
            setTimeout(() => this.rotate(), this.displayDuration);
        }, this.fadeDuration);
    }
};

// Iniciar cuando DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    GreetingRotator.init();
});
```

### Personalización

```javascript
// Cambiar duración
GreetingRotator.fadeDuration = 1000;    // 1 segundo fade
GreetingRotator.displayDuration = 3000; // 3 segundos visible

// Agregar más saludos
GreetingRotator.greetings.push(
    { text: "Bienveniu", lang: "ca" },
    { text: "Benvinguti", lang: "it" }
);

// Inicializar manualmente
GreetingRotator.init('#mi-elemento');
```

## 📱 main.js

### Propósito

Funcionalidades principales comunes a todas las páginas.

### Módulos

```javascript
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();      // Navegación móvil
    initScrollNav();      // Efecto scroll en navbar
    initCounterAnimation(); // Animación de números
    initContactForm();    // Formulario de contacto
    initSmoothScroll();   // Smooth scroll para enlaces
});
```

### 1. Navegación Móvil

```javascript
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Cambiar icono
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Cerrar menú al hacer click en enlace
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}
```

### 2. Efecto Scroll en Navbar

```javascript
function initScrollNav() {
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}
```

### 3. Animación de Contadores

```javascript
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    if (counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepTime);
}
```

### 4. Formulario de Contacto

```javascript
function initContactForm() {
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            // Feedback visual
            btn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                form.reset();
            }, 3000);
        });
    }
}
```

### 5. Smooth Scroll

```javascript
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
```

## 📖 loadNavbar.js

### Propósito

Cargar dinámicamente el componente de navegación desde `components/navbar.html`.

### Implementación

```javascript
document.addEventListener('DOMContentLoaded', function() {
    let navbarContainer = document.getElementById('navbar-container');

    if (!navbarContainer) {
        navbarContainer = document.createElement('div');
        navbarContainer.id = 'navbar-container';
        document.body.insertBefore(navbarContainer, document.body.firstChild);
    }

    fetch('components/navbar.html')
        .then(response => response.text())
        .then(html => {
            navbarContainer.innerHTML = html;
            setActiveLink();
            setupNavToggle();
        })
        .catch(error => console.error('Error cargando navbar:', error));
});

function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function setupNavToggle() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}
```

### Nota

En el **styleguide**, el navbar está inline en el HTML, por lo que este script no se carga.

## 📘 styleguide.js

### Propósito

Funcionalidades específicas para la documentación del styleguide.

### Implementación

```javascript
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScrollNav();
    initTransitionDemo();
    initScrollNav();
});

// Smooth scroll para navegación interna
function initSmoothScrollNav() {
    document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animación del botón de demostración
function initTransitionDemo() {
    const btn = document.getElementById('transitionBtn');
    
    if (btn) {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Efecto scroll navbar
function initScrollNav() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }
}
```

## 🎯 Patrones Comunes

### Event Delegation

```javascript
// En lugar de añadir listeners a cada elemento
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', handler);
});

// Usar delegación para elementos dinámicos
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn')) {
        handler(e);
    }
});
```

### Intersection Observer

```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});
```

### Debounce para Resize

```javascript
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Hacer algo después de que el resize termine
        onResizeComplete();
    }, 250);
});
```

## 📊 Debugging

### Console Utils

```javascript
// Ver todas las variables CSS
getComputedStyle(document.documentElement)

// Recargar tema
window.reloadTheme();

// Ver configuración
fetch('config.json').then(r => r.json()).then(console.log);
```

---

**Autor:** Qwen Code (Asistente de IA)  
**Documento:** 07-javascript.md
