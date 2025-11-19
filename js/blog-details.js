// Fixed Blog Details Manager
class BlogDetailsManager {
    constructor() {
        this.blogDetailContent = document.getElementById('blogDetailContent');
        this.urlParams = new URLSearchParams(window.location.search);
        this.blogId = parseInt(this.urlParams.get('id'));
        this.init();
    }

    init() {
        this.loadBlogDetails();
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

        // Close mobile menu when clicking on links
        if (navLinks) {
            navLinks.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    navLinks.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }
    }

    loadBlogDetails() {
        console.log('Loading blog details for ID:', this.blogId);
        
        // First try to get from sessionStorage
        const blogData = sessionStorage.getItem('currentBlog');
        
        if (blogData) {
            try {
                const blog = JSON.parse(blogData);
                if (blog.id === this.blogId) {
                    this.renderBlogDetails(blog);
                    return;
                }
            } catch (error) {
                console.error('Error parsing sessionStorage blog data:', error);
            }
        }

        // Fallback to window.blogs if sessionStorage fails
        if (window.blogs && Array.isArray(window.blogs)) {
            const blog = window.blogs.find(b => b.id === this.blogId);
            if (blog) {
                this.renderBlogDetails(blog);
                return;
            }
        }

        // If no blog found, show error
        this.showError('Blog post not found. Please select a blog from the main page.');
    }

    renderBlogDetails(blog) {
        console.log('Rendering blog:', blog.title);
        
        const blogHeaderHTML = `
            <div class="blog-header-content">
                ${blog.featured ? '<span class="featured-badge large">Featured Post</span>' : ''}
                <h1>${this.escapeHtml(blog.title)}</h1>
                <p class="blog-excerpt">${this.escapeHtml(blog.excerpt)}</p>
                
                <div class="blog-meta">
                    <div class="meta-item">
                        <i class="fas fa-user"></i>
                        <span>By ${this.escapeHtml(blog.author)}</span>
                    </div>
                    <div class="meta-item">
                        <i class="far fa-calendar"></i>
                        <span>${new Date(blog.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}</span>
                    </div>
                    <div class="meta-item">
                        <i class="far fa-clock"></i>
                        <span>${this.escapeHtml(blog.readTime)}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-tag"></i>
                        <span>${this.escapeHtml(blog.category)}</span>
                    </div>
                </div>
                
                <div class="blog-tags">
                    ${blog.tags.map(tag => `<span class="blog-tag">${this.escapeHtml(tag)}</span>`).join('')}
                </div>
            </div>
        `;

        const blogContentHTML = `
            <div class="blog-content">
                ${blog.content}
                
                <div class="author-section">
                    <h3>About the Author</h3>
                    <div class="author-info">
                        <div class="author-avatar">JC</div>
                        <div class="author-details">
                            <h4>John Carter</h4>
                            <p>Frontend Developer & UI Designer passionate about creating beautiful, functional web experiences. Loves React, modern CSS, and sharing knowledge through writing.</p>
                        </div>
                    </div>
                </div>
                
                <div class="blog-navigation">
                    <a href="index.html#blogs" class="nav-btn">
                        <i class="fas fa-arrow-left"></i>
                        Back to Blogs
                    </a>
                    <a href="index.html#contact" class="btn">
                        <i class="fas fa-envelope"></i>
                        Get In Touch
                    </a>
                </div>
            </div>
        `;

        this.blogDetailContent.innerHTML = blogHeaderHTML + blogContentHTML;
        this.updatePageTitle(blog.title);
        this.highlightCodeBlocks();
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

    highlightCodeBlocks() {
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            block.style.fontFamily = "'Courier New', monospace";
            block.style.fontSize = "0.9rem";
            block.style.lineHeight = "1.4";
            block.style.display = "block";
            block.style.overflowX = "auto";
            block.style.padding = "1em";
            block.style.background = "var(--bg-light)";
            block.style.borderRadius = "4px";
        });
    }

    updatePageTitle(title) {
        document.title = `${title} - John Carter's Blog`;
    }

    showError(message) {
        this.blogDetailContent.innerHTML = `
            <div class="error-state">
                <div class="error-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h2>Blog Post Not Found</h2>
                <p>${message}</p>
                <div class="error-actions">
                    <a href="index.html#blogs" class="btn">
                        <i class="fas fa-arrow-left"></i> Back to Blogs
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
        
        if (!themeToggle) return;
        
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

// Initialize blog details page with error handling
document.addEventListener('DOMContentLoaded', () => {
    try {
        const blogDetailsManager = new BlogDetailsManager();
        
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
        
        console.log('Blog details page initialized successfully');
    } catch (error) {
        console.error('Error initializing blog details page:', error);
        const content = document.getElementById('blogDetailContent');
        if (content) {
            content.innerHTML = `
                <div class="error-state">
                    <div class="error-icon">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h2>Page Loading Error</h2>
                    <p>There was an error loading the blog page. Please try refreshing.</p>
                    <div class="error-actions">
                        <a href="index.html" class="btn">
                            <i class="fas fa-home"></i> Go Home
                        </a>
                    </div>
                </div>
            `;
        }
    }
});