// Cargar la configuración desde el JSON y aplicarla al CSS
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
    
    // Aplicar colores
    if (config.colors) {
        root.style.setProperty('--bg-primary', config.colors.bg.primary);
        root.style.setProperty('--bg-secondary', config.colors.bg.secondary);
        root.style.setProperty('--surface', config.colors.surface.default);
        root.style.setProperty('--surface-hover', config.colors.surface.hover);
        
        // Colores Neón
        root.style.setProperty('--primary', config.colors.neon.primary);
        root.style.setProperty('--primary-light', config.colors.neon['primary-light']);
        root.style.setProperty('--primary-dark', config.colors.neon['primary-dark']);
        root.style.setProperty('--secondary', config.colors.neon.secondary);
        root.style.setProperty('--secondary-light', config.colors.neon['secondary-light']);
        root.style.setProperty('--accent', config.colors.neon.accent);
        root.style.setProperty('--accent-light', config.colors.neon['accent-light']);
        
        // Texto
        root.style.setProperty('--text-primary', config.colors.text.primary);
        root.style.setProperty('--text-secondary', config.colors.text.secondary);
        root.style.setProperty('--text-muted', config.colors.text.muted);
        
        // Estado
        root.style.setProperty('--success', config.colors.status.success);
        root.style.setProperty('--warning', config.colors.status.warning);
        root.style.setProperty('--danger', config.colors.status.danger);
        root.style.setProperty('--info', config.colors.status.info);
    }
    
    // Aplicar gradientes
    if (config.gradients) {
        root.style.setProperty('--gradient-primary', config.gradients.primary);
        root.style.setProperty('--gradient-secondary', config.gradients.secondary);
        root.style.setProperty('--gradient-text', config.gradients.text);
        root.style.setProperty('--gradient-glow', config.gradients.glow);
    }
    
    // Aplicar bordes
    if (config.borders) {
        root.style.setProperty('--border-radius', config.borders.radius);
        root.style.setProperty('--border-radius-lg', config.borders['radius-lg']);
        root.style.setProperty('--border-radius-xl', config.borders['radius-xl']);
        root.style.setProperty('--border-radius-full', config.borders['radius-full']);
    }
    
    // Aplicar sombras
    if (config.shadows) {
        root.style.setProperty('--shadow', config.shadows.default);
        root.style.setProperty('--shadow-lg', config.shadows.lg);
        root.style.setProperty('--shadow-glow', config.shadows.glow);
        root.style.setProperty('--shadow-glow-lg', config.shadows['glow-lg']);
    }
    
    // Aplicar transiciones
    if (config.transitions) {
        root.style.setProperty('--transition', config.transitions.default);
        root.style.setProperty('--transition-slow', config.transitions.slow);
    }
    
    // Aplicar efectos
    if (config.effects) {
        root.style.setProperty('--blur-effect', config.effects.blur);
        root.style.setProperty('--blur-effect-low', config.effects['blur-low']);
        // Los efectos de CSS como brightness y saturation se aplican directamente en los estilos
        document.documentElement.style.setProperty('--brightness', config.effects.brightness);
        document.documentElement.style.setProperty('--saturation', config.effects.saturation);
        document.documentElement.style.setProperty('--glow-alpha', config.effects['glow-alpha']);
        document.documentElement.style.setProperty('--glow-alpha-secondary', config.effects['glow-alpha-secondary']);
    }
    
    // Aplicar espaciado
    if (config.spacing) {
        root.style.setProperty('--container-max', config.spacing['container-max']);
        root.style.setProperty('--section-padding', config.spacing['section-padding']);
    }
}

// Función para recargar la configuración dinámicamente (útil para desarrollo)
window.reloadTheme = function() {
    loadThemeConfig();
    console.log('Tema recargado desde config.json');
};
