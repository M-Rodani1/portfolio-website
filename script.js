// ============================================
// Smooth Scrolling for Navigation Links
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // Get all navigation links for smooth scrolling
    const allNavLinks = document.querySelectorAll('.nav-link');
    
    allNavLinks.forEach(link => {
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
    
    // Handle hero buttons (About Me and View Projects)
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
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
    
    // Parallax effect for quick facts panel
    const quickFactsPanel = document.querySelector('.quick-facts-panel');
    if (quickFactsPanel) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.1;
        
        // Only apply parallax if hero is in view
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroBottom = hero.offsetTop + hero.offsetHeight;
            if (scrolled < heroBottom) {
                quickFactsPanel.style.transform = `translateY(${rate}px)`;
            } else {
                quickFactsPanel.style.transform = 'translateY(0)';
            }
        }
    }
}, 100);

// Add scroll event listener with throttling
window.addEventListener('scroll', throttledScrollHandler);

// ============================================
// Lightbox Modal Functions
// ============================================

function openLightbox(imageSrc, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    lightboxImg.src = imageSrc;
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('active');
    
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
    // Only close if clicking the backdrop or close button, not the image itself
    if (event.target.id === 'lightbox' || event.target.classList.contains('lightbox-close')) {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// Close lightbox on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const lightbox = document.getElementById('lightbox');
        if (lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ============================================
// About Section Expand/Collapse
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const aboutExpandBtn = document.querySelector('.about-expand-btn');
    const aboutMore = document.getElementById('about-more');
    
    if (aboutExpandBtn && aboutMore) {
        aboutExpandBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            aboutMore.hidden = isExpanded;
            
            const expandText = this.querySelector('.expand-text');
            if (expandText) {
                expandText.textContent = isExpanded ? 'Read more' : 'Read less';
            }
        });
    }
    
    // Copy email functionality
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const copySuccess = document.getElementById('copy-success');
    const emailLink = document.getElementById('email-link');
    
    if (copyEmailBtn && copySuccess && emailLink) {
        copyEmailBtn.addEventListener('click', async function() {
            const email = emailLink.textContent;
            try {
                await navigator.clipboard.writeText(email);
                copySuccess.hidden = false;
                setTimeout(() => {
                    copySuccess.hidden = true;
                }, 2000);
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                copySuccess.hidden = false;
                setTimeout(() => {
                    copySuccess.hidden = true;
                }, 2000);
            }
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            formMessage.textContent = '';
            formMessage.className = 'form-message';

            const formData = new FormData(contactForm);
            const formAction = contactForm.getAttribute('action');

            // Check if Formspree endpoint is configured
            if (formAction.includes('YOUR_FORM_ID')) {
                formMessage.textContent = 'Please configure Formspree form ID in the form action attribute.';
                formMessage.className = 'form-message error';
                return;
            }

            try {
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formMessage.textContent = 'Message sent successfully!';
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                formMessage.textContent = 'Error sending message. Please email directly at rodani484@gmail.com';
                formMessage.className = 'form-message error';
            }
        });
    }
});

// ============================================
// Back to Top Button
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top on click
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// ============================================
// Project Filtering
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hidden');
                } else {
                    // Check if card has matching tech badge
                    const techBadges = card.querySelectorAll('.tech-badge');
                    const hasMatch = Array.from(techBadges).some(badge =>
                        badge.textContent.toLowerCase().includes(filter.toLowerCase())
                    );

                    if (hasMatch) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });
});

// ============================================
// Count Up Animation
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const countUpElements = document.querySelectorAll('.count-up');

    const countUpObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-target'));
                animateCountUp(element, target);
                countUpObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });

    countUpElements.forEach(el => countUpObserver.observe(el));
});

function animateCountUp(element, target) {
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;
    const increment = target / steps;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepDuration);
}

