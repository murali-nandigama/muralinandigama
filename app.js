// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Active navigation highlighting
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 50;
        
        let activeSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Intersection Observer for animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.achievement-card, .experience-item, .education-item, .skill-item'
        );
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Add CSS for animations
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .achievement-card,
            .experience-item,
            .education-item,
            .skill-item {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            }
            
            .achievement-card.animate-in,
            .experience-item.animate-in,
            .education-item.animate-in,
            .skill-item.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .nav-link.active {
                color: var(--color-primary);
                position: relative;
            }
            
            .nav-link.active::after {
                content: '';
                position: absolute;
                bottom: -8px;
                left: 0;
                right: 0;
                height: 2px;
                background: var(--color-primary);
                border-radius: 1px;
            }
            
            @media (max-width: 768px) {
                .nav-link.active::after {
                    bottom: -4px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Typing animation for hero text
    function initTypingAnimation() {
        const heroName = document.querySelector('.hero-name');
        if (heroName) {
            const text = heroName.textContent;
            heroName.textContent = '';
            heroName.style.borderRight = '2px solid var(--color-primary)';
            
            let index = 0;
            function typeText() {
                if (index < text.length) {
                    heroName.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeText, 100);
                } else {
                    setTimeout(() => {
                        heroName.style.borderRight = 'none';
                    }, 1000);
                }
            }
            
            // Start typing animation after a short delay
            setTimeout(typeText, 500);
        }
    }

    // Email functionality
    function initEmailHandling() {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Track email click (you can add analytics here)
                console.log('Email contact initiated');
            });
        });
    }

    // Skills hover effect enhancement
    function enhanceSkillsInteraction() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                // Add subtle scale effect
                this.style.transform = 'scale(1.05)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Mobile menu handling (if needed)
    function initMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        
        // Close mobile menu when clicking on a link (for future mobile implementation)
        navLinks.addEventListener('click', function(e) {
            if (e.target.classList.contains('nav-link')) {
                // Close mobile menu logic would go here
            }
        });
    }

    // Performance optimization
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleNavbarScroll();
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Dark mode detection and handling
    function handleColorScheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        function updateNavbarForTheme(isDark) {
            if (isDark) {
                navbar.style.background = window.scrollY > 50 
                    ? 'rgba(38, 40, 40, 0.98)' 
                    : 'rgba(38, 40, 40, 0.95)';
            } else {
                navbar.style.background = window.scrollY > 50 
                    ? 'rgba(255, 255, 255, 0.98)' 
                    : 'rgba(255, 255, 255, 0.95)';
            }
        }
        
        // Initial check
        updateNavbarForTheme(prefersDark.matches);
        
        // Listen for changes
        prefersDark.addEventListener('change', (e) => {
            updateNavbarForTheme(e.matches);
        });
    }

    // Initialize all functionality
    function init() {
        addAnimationStyles();
        initSmoothScrolling();
        initScrollAnimations();
        initTypingAnimation();
        initEmailHandling();
        enhanceSkillsInteraction();
        initMobileMenu();
        handleColorScheme();
        
        // Add scroll event listener with performance optimization
        window.addEventListener('scroll', requestTick, { passive: true });
        
        // Handle resize events
        window.addEventListener('resize', () => {
            // Recalculate positions if needed
            updateActiveNavLink();
        }, { passive: true });
        
        console.log('Portfolio website initialized successfully');
    }

    // Start the application
    init();

    // Add some additional interactive features
    
    // Parallax effect for hero section
    function addParallaxEffect() {
        const hero = document.querySelector('.section--hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            }, { passive: true });
        }
    }

    // Add subtle parallax effect
    addParallaxEffect();

    // Contact form enhancement (for future implementation)
    function enhanceContactSection() {
        const contactButtons = document.querySelectorAll('.contact-cta .btn');
        
        contactButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Add click animation
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    enhanceContactSection();

    // Add loading animation complete handler
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            const firstSection = document.querySelector('.section--hero');
            if (firstSection) {
                firstSection.classList.add('animate-in');
            }
        }, 100);
    });
});

// Utility functions

// Debounce function for performance
function debounce(func, wait) {
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

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle
    };
}