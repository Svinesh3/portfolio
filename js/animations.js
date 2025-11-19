// Animation Manager
class AnimationManager {
    constructor() {
        this.fadeElements = [];
        this.isObserving = false;
        this.init();
    }

    init() {
        // Start observing after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.setupIntersectionObserver();
            this.setupScrollAnimations();
        }, 100);
    }

    setupIntersectionObserver() {
        this.fadeElements = document.querySelectorAll('.fade-in');
        
        if (this.fadeElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Unobserve after animation to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.fadeElements.forEach(element => {
            observer.observe(element);
        });

        this.isObserving = true;
    }

    setupScrollAnimations() {
        // Throttled scroll handler for performance
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollAnimations();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    updateScrollAnimations() {
        // Add any scroll-based animations here
        // This is a placeholder for future scroll animations
    }

    // Method to manually trigger animations for dynamically added elements
    observeNewElements(container) {
        if (!this.isObserving) return;
        
        const newElements = container.querySelectorAll('.fade-in:not(.visible)');
        newElements.forEach(element => {
            // Re-use the existing observer logic
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(element);
        });
    }
}

// Initialize animation manager
const animationManager = new AnimationManager();