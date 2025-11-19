// Fix blogs-data.js - ensure it's properly loaded and accessible
window.blogs = [
    {
        id: 1,
        title: "Understanding React Hooks",
        excerpt: "Dive deep into React Hooks and learn how to use them effectively in your projects.",
        content: `
            <h2>Introduction to React Hooks</h2>
            <p>React Hooks have revolutionized the way we write React components. They allow you to use state and other React features without writing a class. In this comprehensive guide, we'll explore all the built-in hooks and learn how to create custom hooks.</p>
            
            <h3>Why Hooks?</h3>
            <p>Before hooks, React developers had to use class components for state management and lifecycle methods. This often led to:</p>
            <ul>
                <li>Complex component hierarchies</li>
                <li>Wrapper hell in React DevTools</li>
                <li>Difficulty in reusing stateful logic</li>
                <li>Confusing class syntax for beginners</li>
            </ul>
            
            <h3>Basic Hooks</h3>
            
            <h4>useState</h4>
            <p>The useState hook lets you add React state to function components:</p>
            <pre><code>const [count, setCount] = useState(0);</code></pre>
            
            <h4>useEffect</h4>
            <p>The useEffect hook lets you perform side effects in function components:</p>
            <pre><code>useEffect(() => {
    document.title = \`You clicked \${count} times\`;
}, [count]);</code></pre>
            
            <h3>Advanced Hooks</h3>
            <p>Beyond the basic hooks, React provides several advanced hooks for specific use cases:</p>
            <ul>
                <li><strong>useContext:</strong> Access context without nesting</li>
                <li><strong>useReducer:</strong> Alternative to useState for complex state logic</li>
                <li><strong>useMemo:</strong> Memoize expensive calculations</li>
                <li><strong>useCallback:</strong> Memoize callback functions</li>
            </ul>
            
            <h3>Custom Hooks</h3>
            <p>Custom hooks allow you to extract component logic into reusable functions:</p>
            <pre><code>function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : initialValue;
    });
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    
    return [value, setValue];
}</code></pre>
            
            <h3>Best Practices</h3>
            <ol>
                <li>Only call hooks at the top level</li>
                <li>Only call hooks from React functions</li>
                <li>Use the eslint-plugin-react-hooks</li>
                <li>Keep hooks small and focused</li>
            </ol>
        `,
        image: "images/blog-1.jpg",
        author: "John Carter",
        date: "2023-06-15",
        readTime: "8 min read",
        tags: ["React", "JavaScript", "Hooks", "Frontend"],
        category: "React",
        featured: true
    },
    {
        id: 2,
        title: "Design Systems for Developers",
        excerpt: "Learn how to create and implement design systems that improve consistency and efficiency.",
        content: `
            <h2>Building Scalable Design Systems</h2>
            <p>Design systems have become essential for modern web development. They provide a unified language and consistent visual foundation across your entire application ecosystem.</p>
            
            <h3>What is a Design System?</h3>
            <p>A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.</p>
            
            <h3>Key Components</h3>
            
            <h4>Design Tokens</h4>
            <p>Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes.</p>
            <pre><code>const tokens = {
    colors: {
        primary: '#2A5EE5',
        secondary: '#00C9FF',
        accent: '#FFB347'
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px'
    }
};</code></pre>
            
            <h4>Component Library</h4>
            <p>A collection of reusable UI components that implement your design tokens and follow your design principles.</p>
            
            <h4>Documentation</h4>
            <p>Comprehensive documentation that explains how and when to use each component, along with code examples and best practices.</p>
            
            <h3>Benefits for Developers</h3>
            <ul>
                <li><strong>Faster Development:</strong> Reusable components reduce development time</li>
                <li><strong>Consistency:</strong> Ensures visual consistency across the application</li>
                <li><strong>Better Collaboration:</strong> Common language between designers and developers</li>
                <li><strong>Easier Maintenance:</strong> Centralized updates and bug fixes</li>
            </ul>
        `,
        image: "images/blog-2.jpg",
        author: "John Carter",
        date: "2023-05-28",
        readTime: "10 min read",
        tags: ["Design Systems", "UI/UX", "CSS", "Figma"],
        category: "Design",
        featured: true
    },
    {
        id: 3,
        title: "Mobile-First Approach in 2023",
        excerpt: "Explore why mobile-first design is more important than ever and how to implement it.",
        content: `
            <h2>The Mobile-First Revolution</h2>
            <p>With mobile devices accounting for over 60% of web traffic, adopting a mobile-first approach is no longer optional—it's essential.</p>
            
            <h3>What is Mobile-First Design?</h3>
            <p>Mobile-first is a design strategy that starts with designing for the smallest screens first, then progressively enhancing the experience for larger screens.</p>
            
            <h3>Why Mobile-First in 2023?</h3>
            
            <h4>User Behavior</h4>
            <p>Modern users expect seamless mobile experiences. A poor mobile experience can lead to:</p>
            <ul>
                <li>High bounce rates</li>
                <li>Lost conversions</li>
                <li>Negative brand perception</li>
            </ul>
            
            <h4>SEO Benefits</h4>
            <p>Google's mobile-first indexing means your mobile site directly impacts search rankings.</p>
            
            <h4>Performance</h4>
            <p>Mobile-first design naturally encourages performance optimization, which benefits all users.</p>
            
            <h3>Implementation Strategies</h3>
            
            <h4>Progressive Enhancement</h4>
            <pre><code>/* Base mobile styles */
.container {
    padding: 1rem;
}

/* Tablet styles */
@media (min-width: 768px) {
    .container {
        padding: 2rem;
    }
}

/* Desktop styles */
@media (min-width: 1024px) {
    .container {
        padding: 3rem;
        max-width: 1200px;
        margin: 0 auto;
    }
}</code></pre>
            
            <h3>Conclusion</h3>
            <p>Mobile-first is no longer just a design philosophy—it's a business necessity. By prioritizing mobile users, you create better experiences for everyone and future-proof your digital products.</p>
        `,
        image: "images/blog-3.jpg",
        author: "John Carter",
        date: "2023-04-10",
        readTime: "12 min read",
        tags: ["Mobile First", "Responsive Design", "PWA", "Performance"],
        category: "Mobile",
        featured: false
    }
];

// Ensure blogs are available immediately
console.log('Blogs data loaded:', window.blogs.length, 'blogs');