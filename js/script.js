// Project Data - Optimized for fast loading
const projects = [
    {
        id: 1,
        title: "E-Commerce Website",
        description: "Fully responsive e-commerce platform with modern features.",
        tags: ["React", "Node.js", "MongoDB", "Stripe"],
        icon: "fas fa-shopping-cart",
        featured: true
    },
    {
        id: 2,
        title: "Task Management App",
        description: "Productivity app with drag-and-drop functionality.",
        tags: ["Vue.js", "Firebase", "SCSS", "PWA"],
        icon: "fas fa-tasks",
        image: "images/task-app.jpeg", // <-- added feature image
        featured: true

    },
    {
        id: 3,
        title: "Weather Dashboard",
        description: "Beautiful weather app with interactive charts.",
        tags: ["JavaScript", "API Integration", "Chart.js"],
        icon: "fas fa-cloud-sun",
        featured: false
    },
    {
        id: 4,
        title: "Portfolio Website",
        description: "Modern portfolio with dark mode and animations.",
        tags: ["HTML5", "CSS3", "JavaScript", "GSAP"],
        icon: "fas fa-laptop-code",
        featured: false
    },
    {
        id: 5,
        title: "Social Media Dashboard",
        description: "Analytics dashboard with data visualization.",
        tags: ["React", "D3.js", "Express", "MySQL"],
        icon: "fas fa-chart-line",
        featured: true
    },
    {
        id: 6,
        title: "Fitness Tracker",
        description: "Mobile app for tracking workouts and nutrition.",
        tags: ["React Native", "Redux", "Firebase"],
        icon: "fas fa-dumbbell",
        featured: false
    }
];

// Optimized Project Manager
class ProjectManager {
    constructor() {
        this.projectsContainer = document.getElementById('projectsContainer');
        this.filterButtons = document.getElementById('projectFilters');
        this.currentFilter = 'all';
        this.projectCache = new Map();
        this.init();
    }

    init() {
        this.renderProjects();
        this.createFilterButtons();
        this.setupEventListeners();
    }

    createFilterButtons() {
        if (!this.filterButtons) return;

        const filters = [
            { id: 'all', name: 'All Projects' },
            { id: 'featured', name: 'Featured' },
            { id: 'react', name: 'React' },
            { id: 'vue', name: 'Vue.js' },
            { id: 'mobile', name: 'Mobile' }
        ];

        const fragment = document.createDocumentFragment();
        filters.forEach(filter => {
            const button = document.createElement('button');
            button.className = `filter-btn ${filter.id === 'all' ? 'active' : ''}`;
            button.dataset.filter = filter.id;
            button.textContent = filter.name;
            fragment.appendChild(button);
        });
        
        this.filterButtons.appendChild(fragment);
    }

    setupEventListeners() {
        if (this.filterButtons) {
            this.filterButtons.addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-btn')) {
                    this.handleFilterClick(e.target);
                }
            });
        }

        document.addEventListener('click', (e) => {
            const target = e.target;
            
            if (target.classList.contains('view-project-btn')) {
                e.preventDefault();
                const projectId = parseInt(target.dataset.projectId);
                this.navigateToProjectDetails(projectId);
            }
        });
    }

    handleFilterClick(button) {
        const buttons = this.filterButtons.querySelectorAll('.filter-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        this.currentFilter = button.dataset.filter;
        this.renderProjects();
    }

    getFilteredProjects() {
        switch (this.currentFilter) {
            case 'featured':
                return projects.filter(project => project.featured);
            case 'react':
                return projects.filter(project => project.tags.includes('React'));
            case 'vue':
                return projects.filter(project => project.tags.includes('Vue.js'));
            case 'mobile':
                return projects.filter(project => project.tags.includes('React Native'));
            default:
                return projects;
        }
    }

    renderProjects() {
        if (!this.projectsContainer) return;

        const filteredProjects = this.getFilteredProjects();
        const cacheKey = this.currentFilter;
        
        if (this.projectCache.has(cacheKey)) {
            this.projectsContainer.innerHTML = this.projectCache.get(cacheKey);
            animationManager.observeNewElements(this.projectsContainer);
            return;
        }

        const fragment = document.createDocumentFragment();
        
        filteredProjects.forEach(project => {
            const projectCard = this.createProjectCard(project);
            fragment.appendChild(projectCard);
        });

        this.projectsContainer.innerHTML = '';
        this.projectsContainer.appendChild(fragment);
        
        this.projectCache.set(cacheKey, this.projectsContainer.innerHTML);
        animationManager.observeNewElements(this.projectsContainer);
    }

    createProjectCard(project) {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card fade-in';
        projectCard.dataset.projectId = project.id;

        projectCard.innerHTML = this.getProjectCardHTML(project);
        
        return projectCard;
    }

    getProjectCardHTML(project) {
        const tagsHTML = project.tags.map(tag => 
            `<span class="project-tag">${tag}</span>`
        ).join('');

        return `
            <div class="project-image">
                <i class="${project.icon}"></i>
                ${project.featured ? '<span class="featured-badge">Featured</span>' : ''}
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${tagsHTML}
                </div>
                <div class="project-actions">
                    <button class="btn view-project-btn" data-project-id="${project.id}">
                        <i class="fas fa-external-link-alt"></i> View Details
                    </button>
                    <a href="#" class="btn btn-outline" target="_blank">
                        <i class="fas fa-eye"></i> Live Demo
                    </a>
                </div>
            </div>
        `;
    }

    navigateToProjectDetails(projectId) {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            const projectData = {
                id: project.id,
                title: project.title,
                description: project.description,
                tags: project.tags,
                icon: project.icon,
                featured: project.featured
            };
            
            sessionStorage.setItem('currentProject', JSON.stringify(projectData));
            window.location.href = `project-details.html?id=${projectId}`;
        }
    }
}

// Navigation Manager
class NavigationManager {
    constructor() {
        this.sections = [];
        this.navItems = [];
        this.menuToggle = document.getElementById('menuToggle');
        this.navLinks = document.getElementById('navLinks');
        this.isScrolling = false;
        this.init();
    }

    init() {
        this.cacheDOMElements();
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        window.addEventListener('scroll', () => this.throttleScroll());
    }

    cacheDOMElements() {
        this.sections = document.querySelectorAll('section');
        this.navItems = document.querySelectorAll('.nav-links a');
    }

    throttleScroll() {
        if (!this.isScrolling) {
            this.isScrolling = true;
            requestAnimationFrame(() => {
                this.handleScroll();
                this.isScrolling = false;
            });
        }
    }

    handleScroll() {
        let current = '';
        const scrollY = window.pageYOffset;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        this.navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    }

    setupSmoothScrolling() {
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (target.matches('a[href^="#"]')) {
                e.preventDefault();
                const href = target.getAttribute('href');
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (this.navLinks.classList.contains('active')) {
                        this.navLinks.classList.remove('active');
                        this.updateMenuIcon();
                    }
                    
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }

    setupMobileMenu() {
        if (this.menuToggle && this.navLinks) {
            this.menuToggle.addEventListener('click', () => {
                this.navLinks.classList.toggle('active');
                this.updateMenuIcon();
            });

            // Close menu when clicking on links
            this.navLinks.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    this.navLinks.classList.remove('active');
                    this.updateMenuIcon();
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.navLinks.classList.contains('active') && 
                    !this.navLinks.contains(e.target) && 
                    !this.menuToggle.contains(e.target)) {
                    this.navLinks.classList.remove('active');
                    this.updateMenuIcon();
                }
            });
        }
    }

    updateMenuIcon() {
        if (!this.menuToggle) return;
        
        const icon = this.menuToggle.querySelector('i');
        if (this.navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
}

// Contact Form Manager
class ContactFormManager {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
            this.setupFormValidation();
        }
    }

    setupFormValidation() {
        const inputs = this.contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.type) {
            case 'text':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'This field must be at least 2 characters long';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            default:
                if (!value) {
                    isValid = false;
                    errorMessage = 'This field is required';
                }
        }

        if (!isValid) {
            this.showError(field, errorMessage);
        } else {
            this.clearError(field);
        }

        return isValid;
    }

    showError(field, message) {
        this.clearError(field);
        field.classList.add('error');
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }

    clearError(field) {
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const inputs = this.contactForm.querySelectorAll('input, textarea');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification('Please fix the errors in the form before submitting.', 'error');
            return;
        }

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toISOString()
        };

        const submitBtn = this.contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            await this.sendFormData(formData);
            this.showNotification('Thank you for your message! I will get back to you soon.', 'success');
            this.contactForm.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Sorry, there was an error sending your message. Please try again later.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    async sendFormData(formData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.2) {
                    console.log('Form data would be sent to server:', formData);
                    resolve();
                } else {
                    reject(new Error('Network error'));
                }
            }, 1500);
        });
    }

    showNotification(message, type) {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Blog Manager
// Fixed Blog Manager in script.js
class BlogManager {
    constructor() {
        this.blogsContainer = document.getElementById('blogsContainer');
        this.init();
    }

    init() {
        if (this.blogsContainer) {
            this.renderBlogs();
            this.setupBlogNavigation();
        } else {
            console.warn('Blogs container not found');
        }
    }

    renderBlogs() {
        if (!window.blogs || !Array.isArray(window.blogs)) {
            console.warn('Blogs data not available');
            this.showBlogsError();
            return;
        }

        const displayBlogs = window.blogs.filter(blog => blog.featured).slice(0, 3);
        
        if (displayBlogs.length === 0) {
            this.showNoBlogsMessage();
            return;
        }
        
        this.blogsContainer.innerHTML = displayBlogs.map(blog => `
            <div class="blog-card fade-in" data-blog-id="${blog.id}">
                <div class="blog-image">
                    ${blog.image ? 
                        `<img src="${blog.image}" alt="${this.escapeHtml(blog.title)}" loading="lazy" onerror="this.style.display='none'">` : 
                        `<i class="fas fa-file-alt"></i>`
                    }
                    ${blog.featured ? '<span class="featured-badge">Featured</span>' : ''}
                </div>
                <div class="blog-content">
                    <div class="blog-meta-small">
                        <span class="blog-date">${new Date(blog.date).toLocaleDateString()}</span>
                        <span class="blog-read-time">${this.escapeHtml(blog.readTime)}</span>
                    </div>
                    <h3>${this.escapeHtml(blog.title)}</h3>
                    <p>${this.escapeHtml(blog.excerpt)}</p>
                    <div class="blog-tags-small">
                        ${blog.tags.slice(0, 2).map(tag => `<span class="blog-tag-small">${this.escapeHtml(tag)}</span>`).join('')}
                    </div>
                    <button class="btn read-more-btn" data-blog-id="${blog.id}">
                        Read More
                    </button>
                </div>
            </div>
        `).join('');

        // Re-initialize animations for new elements
        if (window.animationManager) {
            window.animationManager.observeNewElements(this.blogsContainer);
        }
    }

    escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    setupBlogNavigation() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('read-more-btn')) {
                e.preventDefault();
                const blogId = parseInt(e.target.dataset.blogId);
                this.navigateToBlogDetails(blogId);
            }
        });
    }

    navigateToBlogDetails(blogId) {
        console.log('Navigating to blog details:', blogId);
        
        if (!window.blogs || !Array.isArray(window.blogs)) {
            console.error('Blogs data not available for navigation');
            alert('Blog data not loaded. Please try again.');
            return;
        }

        const blog = window.blogs.find(b => b.id === blogId);
        if (blog) {
            // Store in sessionStorage for the details page
            try {
                sessionStorage.setItem('currentBlog', JSON.stringify(blog));
                window.location.href = `blog-details.html?id=${blogId}`;
            } catch (error) {
                console.error('Error storing blog data:', error);
                // Fallback: try direct navigation without storage
                window.location.href = `blog-details.html?id=${blogId}`;
            }
        } else {
            console.error('Blog not found with ID:', blogId);
            alert('Blog not found. Please select a different blog.');
        }
    }

    showBlogsError() {
        this.blogsContainer.innerHTML = `
            <div class="error-state">
                <div class="error-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3>Blogs Not Available</h3>
                <p>Unable to load blog posts at the moment. Please check back later.</p>
            </div>
        `;
    }

    showNoBlogsMessage() {
        this.blogsContainer.innerHTML = `
            <div class="no-blogs-message">
                <i class="fas fa-book-open fa-3x"></i>
                <h3>No Blog Posts Yet</h3>
                <p>Check back soon for new articles and tutorials!</p>
            </div>
        `;
    }
}
// Resume Manager
class ResumeManager {
    constructor() {
        this.resumeButton = document.querySelector('.btn-download-resume');
        this.init();
    }

    init() {
        if (this.resumeButton) {
            this.setupResumeButton();
        }
    }

    setupResumeButton() {
        // Add pulse animation on page load
        setTimeout(() => {
            this.resumeButton.classList.add('pulse');
            setTimeout(() => {
                this.resumeButton.classList.remove('pulse');
            }, 3000);
        }, 2000);

        this.resumeButton.addEventListener('click', (e) => {
            this.handleResumeDownload(e);
        });
    }

    handleResumeDownload(e) {
        this.trackResumeDownload();
        
        this.resumeButton.classList.add('success');
        setTimeout(() => {
            this.resumeButton.classList.remove('success');
        }, 2000);

        this.showDownloadNotification();
    }

    trackResumeDownload() {
        console.log('Resume download initiated from header');
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'download', {
                'event_category': 'Resume',
                'event_label': 'Header Resume Download',
                'value': 1
            });
        }

        this.incrementDownloadCounter();
    }

    incrementDownloadCounter() {
        let count = localStorage.getItem('resumeDownloads') || 0;
        count = parseInt(count) + 1;
        localStorage.setItem('resumeDownloads', count);
        return count;
    }

    showDownloadNotification() {
        const existingNotification = document.querySelector('.download-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'download-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>Downloading resume...</span>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Main Portfolio Application
class PortfolioApp {
    constructor() {
        this.projectManager = null;
        this.navigationManager = null;
        this.contactFormManager = null;
        this.blogManager = null;
        this.resumeManager = null;
        this.init();
    }

    init() {
        this.initializeCriticalManagers();
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeNonCriticalManagers();
            });
        } else {
            this.initializeNonCriticalManagers();
        }
    }

    initializeCriticalManagers() {
        this.projectManager = new ProjectManager();
        this.navigationManager = new NavigationManager();
    }

    initializeNonCriticalManagers() {
        this.contactFormManager = new ContactFormManager();
        this.resumeManager = new ResumeManager();
        
        // Load blogs data and initialize blog manager
        this.loadBlogsData().then(() => {
            this.blogManager = new BlogManager();
        });

        console.log('Portfolio application optimized and ready');
    }

    async loadBlogsData() {
        // Simulate loading blog data
        return new Promise((resolve) => {
            setTimeout(() => {
                if (typeof window.blogs === 'undefined') {
                    // Fallback if blogs-data.js isn't loaded
                    window.blogs = [];
                }
                resolve();
            }, 100);
        });
    }
}

// Initialize the application immediately
const portfolioApp = new PortfolioApp();