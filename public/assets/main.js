// Main Portfolio JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Remove loader
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1500);

    // Initialize all components
    initCustomCursor();
    initScrollProgress();
    initNavbar();
    initTypewriter();
    initHeroNameAnimation();
    initScrollAnimations();
    initProjects();
    initContactForm();
    initBackToTop();
    initParallax();
});


// const lenis = new Lenis({
//   duration: 2,
//   smoothWheel: true,
//   smoothTouch: true,
//   easing: (t) => 1 - Math.pow(1 - t, 3)
// });

// Custom Cursor
function initCustomCursor() {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    
    if (window.matchMedia('(pointer: coarse)').matches) return;

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;
        
        outline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    document.querySelectorAll('a, button, .project-card, .skill-tag').forEach(el => {
        el.addEventListener('mouseenter', () => outline.classList.add('hover'));
        el.addEventListener('mouseleave', () => outline.classList.remove('hover'));
    });
}

// Scroll Progress
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    });
}

// Navbar
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileBtn = document.getElementById('mobileMenuBtn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Typewriter Effect
function initTypewriter() {
    const roles = ["Data Science Enthusiast", "Data Analyst", "ML Explorer"];
    const element = document.getElementById('typewriter');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            element.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// Hero Name Animation
function initHeroNameAnimation() {
    const name = "";
    const container = document.getElementById('heroName');
    
    // name.split('').forEach((char, index) => {
    //     const span = document.createElement('span');
    //     span.textContent = char === ' ' ? '\u00A0' : char;
    //     span.className = 'char';
    //     span.style.animationDelay = `${1.6 + (index * 0.05)}s`;
    //     container.appendChild(span);
    // });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate stat counters
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target.querySelector('.stat-number'));
                }
                
                // Animate skill tags with stagger
                if (entry.target.classList.contains('skill-category')) {
                    const tags = entry.target.querySelectorAll('.skill-tag');
                    tags.forEach((tag, i) => {
                        setTimeout(() => {
                            tag.style.opacity = '1';
                            tag.style.transform = 'translateY(0)';
                        }, i * 60);
                    });
                }
            } else {
                entry.target.classList.remove('visible');
                
                // Reset skill tags
                if (entry.target.classList.contains('skill-category')) {
                    const tags = entry.target.querySelectorAll('.skill-tag');
                    tags.forEach(tag => {
                        tag.style.opacity = '0';
                        tag.style.transform = 'translateY(20px)';
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.timeline-item, .stat-item, .skill-category, .project-card, .tech-item, .fade-in').forEach(el => {
        observer.observe(el);
    });

    // Timeline line animation
    const timelineLine = document.querySelector('.timeline-line');
    if (timelineLine) {
        window.addEventListener('scroll', () => {
            const timeline = document.querySelector('.timeline');
            const rect = timeline.getBoundingClientRect();
            const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
            timelineLine.style.setProperty('--scroll', `${progress * 100}%`);
        });
    }
}

// Counter Animation
function animateCounter(element) {
    if (element.classList.contains('static')) return;
    if (element.classList.contains('counted')) return;
    
    const target = parseFloat(element.dataset.target);
    const duration = 2000;
    const start = performance.now();
    
    element.classList.add('counted');
    
    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = target * easeOut;
        
        // Check if target is a whole number and append "+"
        if (target % 1 === 0) {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = current.toFixed(2);
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Projects
async function initProjects() {
    const grid = document.getElementById('projectsGrid');
    const emptyState = document.getElementById('emptyState');

    try {
        // Load projects from local JSON file
        const response = await fetch('/assets/projects.json');
        const projects = await response.json();

        // Sort featured projects first
        const sortedProjects = projects.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return a.id - b.id;
        });

        if (projects.length === 0) {
            grid.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        // Initial render
        renderProjects(sortedProjects);

    } catch (error) {
        console.error('Error loading projects:', error);
        emptyState.style.display = 'block';
    }
}

function renderProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';

    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card fade-in visible';
        card.style.animationDelay = `${index * 80}ms`;

        // Featured badge
        const featuredBadge = project.featured ?
            '<div class="featured-badge">⭐ Featured</div>' : '';

        // Technology tags
        const techTags = project.technologies.map(tech =>
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        // Links
        const githubLink = project.githubLink ?
            `<a href="${project.githubLink}" target="_blank" class="project-link github-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
            </a>` : '';

        const demoLink = project.liveDemoLink ?
            `<a href="${project.liveDemoLink}" target="_blank" class="project-link demo-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
                Live Demo
            </a>` : '';

        card.innerHTML = `
            ${featuredBadge}
            <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
            <div class="project-content">
                <span class="project-category">${project.category}</span>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.shortDescription}</p>
                <div class="project-tech">${techTags}</div>
                <div class="project-links">
                    ${githubLink}
                    ${demoLink}
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Client-side validation
        if (!name || !email || !message) {
            showToast('❌ Please fill in all fields', 'error');
            return;
        }
        
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('❌ Please enter a valid email address', 'error');
            return;
        }
        
        const data = { name, email, message };
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        try {
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span>';
            
            const response = await fetch('/.netlify/functions/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            const responseData = await response.json();
            
            if (response.ok) {
                showToast('✓ Message sent successfully! Check your email for confirmation.', 'success');
                form.reset();
            } else {
                // Show specific error message from server
                const errorMsg = responseData.message || responseData.error || 'Failed to send message';
                showToast(`❌ ${errorMsg}`, 'error');
                console.error('Server error:', responseData);
            }
        } catch (error) {
            console.error('Contact form error:', error);
            showToast('❌ Network error. Please check your internet connection and try again.', 'error');
        } finally {
            // Re-enable button and restore original text
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

// Toast Notifications
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✓' : '✕'}</span>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Back to Top
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Parallax Effect
function initParallax() {
    const heroCanvas = document.getElementById('heroCanvas');
    
    // Simple particle system for hero
    const ctx = heroCanvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resize() {
        heroCanvas.width = window.innerWidth;
        heroCanvas.height = window.innerHeight;
    }
    
    function createParticles() {
        particles = [];
        const count = Math.floor(window.innerWidth / 10);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * heroCanvas.width,
                y: Math.random() * heroCanvas.height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
        
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > heroCanvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > heroCanvas.height) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
            ctx.fill();
            
            // Draw connections
            particles.slice(i + 1).forEach(p2 => {
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - dist / 100)})`;
                    ctx.stroke();
                }
            });
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    resize();
    createParticles();
    animate();
    
    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });
    
    // Parallax scroll effect
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const rate = -scrolled * 0.2;
        heroCanvas.style.transform = `translateY(${rate}px)`;
    });
}

// Magnetic Button Effect
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});