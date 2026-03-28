// Greeting Rotator - Rotates through different language greetings
const GreetingRotator = {
    // List of greetings - add more here
    greetings: [
        { text: "Bienvenidos", lang: "es" },
        { text: "Welcome", lang: "en" },
        { text: "ようこそ", lang: "ja" },
        { text: "Добро пожаловать", lang: "ru" },
        { text: "Bienvenue", lang: "fr" },
        { text: "Willkommen", lang: "de" },
        { text: "Benvenuti", lang: "it" },
        { text: "환영합니다", lang: "ko" },
        { text: "欢迎", lang: "zh" },
    ],
    
    currentIndex: 0,
    element: null,
    fadeDuration: 500,
    displayDuration: 2000,
    
    // Initialize the rotator
    init(selector = '.gradient-text') {
        this.element = document.querySelector(selector);
        if (!this.element) {
            console.error('Greeting element not found');
            return;
        }
        
        // Start the rotation
        this.rotate();
    },
    
    // Rotate to the next greeting
    rotate() {
        if (!this.element) return;
        
        // Fade out
        this.element.style.opacity = '0';
        this.element.style.transition = `opacity ${this.fadeDuration}ms ease-in-out`;
        
        setTimeout(() => {
            // Change text
            this.element.textContent = this.greetings[this.currentIndex].text;
            
            // Fade in
            this.element.style.opacity = '1';
            
            // Move to next index
            this.currentIndex = (this.currentIndex + 1) % this.greetings.length;
            
            // Schedule next rotation
            setTimeout(() => this.rotate(), this.displayDuration);
        }, this.fadeDuration);
    }
};

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    GreetingRotator.init();
});
