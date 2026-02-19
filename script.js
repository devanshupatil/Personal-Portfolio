/**
 * Personal Portfolio Website - JavaScript
 * Developer: Devanshu Patil
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functions
    initCustomCursor();
    initTypingEffect();
    initNavbar();
    initSmoothScrolling();
    initHamburgerMenu();
    initSectionReveal();
    initBackToTop();
    initSkillProgress();
    initContactForm();
    initScrollAnimations();
});

/**
 * Custom Cursor
 */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update cursor position immediately
        cursor.style.left = mouseX - 6 + 'px';
        cursor.style.top = mouseY - 6 + 'px';
    });
    
    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX - 20 + 'px';
        cursorFollower.style.top = followerY - 20 + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .skill-card, .project-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '0.5';
    });
}

/**
 * Typing Effect for Technologies
 */
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const technologies = [
        'JavaScript',
        'React',
        'Node.js',
        'Spring Boot',
        'PostgreSQL',
        'Docker',
        'Cloud',
        'APIs',
        'AI Integration'
    ];
    
    let techIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentTech = technologies[techIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentTech.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentTech.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentTech.length) {
            // Pause at end
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            techIndex = (techIndex + 1) % technologies.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typing effect
    setTimeout(typeEffect, 1000);
}

/**
 * Navbar Scroll Effect
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Scroll event
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Add scrolled class
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Highlight active section
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Smooth Scrolling
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const hamburger = document.getElementById('hamburger');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger?.classList.remove('active');
                }
            }
        });
    });
}

/**
 * Mobile Hamburger Menu
 */
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/**
 * Section Reveal Animation on Scroll
 */
function initSectionReveal() {
    const revealElements = document.querySelectorAll('.about, .skills, .projects, .achievements, .contact');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealOnScroll.observe(el);
    });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Skill Progress Animation
 */
function initSkillProgress() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const skillOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const animateSkills = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const progress = progressBar.style.getPropertyValue('--progress');
                    progressBar.style.width = progress;
                }
            }
        });
    }, skillOptions);
    
    skillCards.forEach(card => {
        animateSkills.observe(card);
    });
}

/**
 * Contact Form Validation
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset errors
        clearErrors();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation flags
        let isValid = true;
        
        // Name validation
        if (name.length < 2) {
            showError('name', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Message validation
        if (message.length < 10) {
            showError('message', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // If valid, show success message
        if (isValid) {
            // Simulate form submission
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="btn-text">Sending...</span>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                formSuccess.classList.add('show');
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 5000);
            }, 1500);
        }
    });
    
    // Real-time validation on input
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            // Clear error when user starts typing
            const errorElement = document.getElementById(`${input.id}-error`);
            if (errorElement) {
                errorElement.textContent = '';
            }
            input.style.borderColor = '';
        });
    });
    
    function validateField(input) {
        const value = value.trim();
        
        if (input.id === 'name' && value.length < 2) {
            showError('name', 'Name must be at least 2 characters');
            return false;
        }
        
        if (input.id === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError('email', 'Please enter a valid email address');
                return false;
            }
        }
        
        if (input.id === 'message' && value.length < 10) {
            showError('message', 'Message must be at least 10 characters');
            return false;
        }
        
        return true;
    }
    
    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = message;
        }
        
        if (inputElement) {
            inputElement.style.borderColor = '#ef4444';
        }
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.form-error');
        const inputs = document.querySelectorAll('input, textarea');
        
        errorElements.forEach(el => el.textContent = '');
        inputs.forEach(input => input.style.borderColor = '');
    }
}

/**
 * Additional Scroll Animations
 */
function initScrollAnimations() {
    // Animate stats numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                
                animateNumber(target, 0, countTo, 2000);
                
                animateStats.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        animateStats.observe(stat);
    });
    
    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Floating badges animation
    const floatingBadges = document.querySelectorAll('.floating-badge');
    floatingBadges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.5}s`;
    });
}

/**
 * Animate Number Counter
 */
function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current + '+';
        
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

/**
 * Mobile Detection for Cursor
 */
if (window.innerWidth <= 768) {
    // Remove custom cursor on mobile
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor) cursor.style.display = 'none';
    if (cursorFollower) cursorFollower.style.display = 'none';
    
    // Re-enable default cursor
    document.body.style.cursor = 'auto';
    document.querySelectorAll('input, textarea, button, a').forEach(el => {
        el.style.cursor = 'pointer';
    });
}

/**
 * Performance: Debounce Function
 */
function debounce(func, wait = 20) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Performance: Throttle Function
 */
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Throttled scroll handler for better performance
window.addEventListener('scroll', throttle(() => {
    // Additional scroll-based animations can be added here
}, 100));

// Preload images (if any)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add fade-in effect to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

/**
 * Console Welcome Message
 */
console.log('%c👨‍💻 Welcome to Devanshu Patil\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cBuilt with pure HTML, CSS & JavaScript', 'font-size: 14px; color: #06b6d4;');
console.log('%cFeel free to explore the code!', 'font-size: 14px; color: #8b5cf6;');
