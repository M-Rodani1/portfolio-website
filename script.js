// ============================================
// Smooth Scrolling for Navigation Links
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (starting with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Calculate offset for fixed navbar
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Handle hero buttons
    const viewProjectsBtn = document.querySelector('.btn-primary');
    if (viewProjectsBtn && viewProjectsBtn.getAttribute('href') === '#projects') {
        viewProjectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.getElementById('projects');
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// ============================================
// IntersectionObserver for Scroll Animations
// ============================================

// Configuration for IntersectionObserver
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Create observer instance
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const delay = element.getAttribute('data-delay') || 0;
            
            // Apply delay if specified
            setTimeout(() => {
                element.classList.add('visible');
            }, delay);
            
            // Unobserve after animation to improve performance
            observer.unobserve(element);
        }
    });
}, observerOptions);

// Observe all elements with .reveal class
document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
});

// ============================================
// Hero Section Entrance Animation
// ============================================

// Trigger hero animations on page load
window.addEventListener('load', function() {
    const heroContent = document.querySelector('.hero-content');
    const heroStatus = document.querySelector('.hero-status');
    
    if (heroContent) {
        heroContent.classList.add('visible');
    }
    
    if (heroStatus) {
        const delay = heroStatus.getAttribute('data-delay') || 200;
        setTimeout(() => {
            heroStatus.classList.add('visible');
        }, delay);
    }
});

// ============================================
// Staggered Animation for Project Cards
// ============================================

// This is handled by the IntersectionObserver with data-delay attributes
// Each project card has a data-delay attribute that creates the stagger effect

// ============================================
// Parallax Effect for Status Panel (Optional Enhancement)
// ============================================

// This is handled in the throttled scroll handler below

// ============================================
// Smooth Hover Effects Enhancement
// ============================================

// Add ripple effect to contact chips on click
document.addEventListener('DOMContentLoaded', function() {
    const contactChips = document.querySelectorAll('.contact-chip');
    
    contactChips.forEach(chip => {
        chip.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// ============================================
// Performance Optimization
// ============================================

// Throttle scroll events for better performance
function throttle(func, wait) {
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

// Apply throttling to scroll-heavy functions
const throttledScrollHandler = throttle(function() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        if (window.pageYOffset >= (sectionTop - navbarHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Parallax effect for status panel
    const statusPanel = document.querySelector('.status-panel');
    if (statusPanel) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.1;
        
        // Only apply parallax if hero is in view
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroBottom = hero.offsetTop + hero.offsetHeight;
            if (scrolled < heroBottom) {
                statusPanel.style.transform = `translateY(${rate}px)`;
            } else {
                statusPanel.style.transform = 'translateY(0)';
            }
        }
    }
}, 100);

// Add scroll event listener with throttling
window.addEventListener('scroll', throttledScrollHandler);

