// Project Details Manager
class ProjectDetailsManager {
    constructor() {
        this.projectDetailsContent = document.getElementById('projectDetailsContent');
        this.urlParams = new URLSearchParams(window.location.search);
        this.projectId = parseInt(this.urlParams.get('id'));
        this.init();
    }

    init() {
        this.loadProjectDetails();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', this.toggleTheme);
        }

        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                const icon = menuToggle.querySelector('i');
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }
    }

    loadProjectDetails() {
        const projectData = sessionStorage.getItem('currentProject');
        
        if (!projectData) {
            this.showError('Project not found. Please select a project from the portfolio page.');
            return;
        }

        try {
            const project = JSON.parse(projectData);
            
            if (project.id !== this.projectId) {
                this.showError('Project ID mismatch. Please select a project from the portfolio page.');
                return;
            }

            this.renderProjectDetails(project);
        } catch (error) {
            console.error('Error parsing project data:', error);
            this.showError('Invalid project data. Please select a project again.');
        }
    }

    renderProjectDetails(project) {
        requestAnimationFrame(() => {
            this.projectDetailsContent.innerHTML = this.getProjectDetailsHTML(project);
            this.updatePageTitle(project.title);
        });
    }

    getProjectDetailsHTML(project) {
        return `
            <article class="project-detail">
                <header class="project-detail-header">
                    ${project.featured ? '<span class="featured-badge large">Featured Project</span>' : ''}
                    <h1>${project.title}</h1>
                    <p class="project-subtitle">${project.description}</p>
                    <div class="project-meta">
                        <span class="completion-date">
                            <i class="far fa-calendar"></i>
                            Completed: Recently
                        </span>
                    </div>
                </header>

                <div class="project-detail-content">
                    <div class="project-hero">
                        <div class="project-image-large">
                            <div class="project-icon-hero">
                                <i class="${project.icon}"></i>
                            </div>
                        </div>
                    </div>

                    <div class="project-info-grid">
                        <div class="project-description">
                            <h2><i class="fas fa-info-circle"></i> Project Overview</h2>
                            <p>This project demonstrates modern web development practices with a focus on user experience and performance. Built with cutting-edge technologies and best practices.</p>
                        </div>

                        <div class="project-technologies">
                            <h2><i class="fas fa-code"></i> Technologies Used</h2>
                            <div class="tech-tags">
                                ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                            </div>
                        </div>

                        <div class="project-challenges">
                            <h2><i class="fas fa-puzzle-piece"></i> Key Challenges</h2>
                            <ul>
                                <li>Implementing responsive design across all devices</li>
                                <li>Optimizing performance for better user experience</li>
                                <li>Ensuring cross-browser compatibility</li>
                            </ul>
                        </div>

                        <div class="project-achievements">
                            <h2><i class="fas fa-trophy"></i> Achievements</h2>
                            <ul>
                                <li>Successfully deployed and maintained</li>
                                <li>Positive user feedback and engagement</li>
                                <li>Performance scores above industry standards</li>
                            </ul>
                        </div>
                    </div>

                    <div class="project-links-section">
                        <h2><i class="fas fa-external-link-alt"></i> Project Links</h2>
                        <div class="project-links">
                            <a href="#" class="btn" target="_blank" rel="noopener">
                                <i class="fas fa-eye"></i> Live Demo
                            </a>
                            <a href="#" class="btn btn-outline" target="_blank" rel="noopener">
                                <i class="fab fa-github"></i> Source Code
                            </a>
                            <a href="index.html#projects" class="btn btn-accent">
                                <i class="fas fa-arrow-left"></i> Back to Projects
                            </a>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }

    updatePageTitle(title) {
        document.title = `${title} - John Carter Portfolio`;
    }

    showError(message) {
        this.projectDetailsContent.innerHTML = `
            <div class="error-state">
                <div class="error-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h2>Project Not Found</h2>
                <p>${message}</p>
                <div class="error-actions">
                    <a href="index.html#projects" class="btn">
                        <i class="fas fa-arrow-left"></i> Back to Projects
                    </a>
                    <a href="index.html" class="btn btn-outline">
                        <i class="fas fa-home"></i> Go Home
                    </a>
                </div>
            </div>
        `;
    }

    toggleTheme() {
        const body = document.body;
        const themeToggle = document.getElementById('themeToggle');
        
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
}

// Initialize project details page
document.addEventListener('DOMContentLoaded', () => {
    const projectDetailsManager = new ProjectDetailsManager();
    
    // Apply saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
});