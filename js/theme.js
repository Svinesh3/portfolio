// Theme Toggle Functionality
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.body = document.body;
        this.init();
    }

    init() {
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            this.body.classList.add('dark-mode');
            this.updateToggleIcon('dark');
        }

        // Add event listener
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Listen for system theme changes
        this.watchSystemTheme();
    }

    toggleTheme() {
        this.body.classList.toggle('dark-mode');
        
        if (this.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            this.updateToggleIcon('dark');
        } else {
            localStorage.setItem('theme', 'light');
            this.updateToggleIcon('light');
        }
    }

    updateToggleIcon(theme) {
        if (!this.themeToggle) return;
        
        if (theme === 'dark') {
            this.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            this.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    watchSystemTheme() {
        // Watch for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            mediaQuery.addEventListener('change', (e) => {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem('theme')) {
                    if (e.matches) {
                        this.body.classList.add('dark-mode');
                        this.updateToggleIcon('dark');
                    } else {
                        this.body.classList.remove('dark-mode');
                        this.updateToggleIcon('light');
                    }
                }
            });
        }
    }
}

// Initialize theme manager immediately
const themeManager = new ThemeManager();