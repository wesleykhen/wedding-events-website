/**
 * Atarashi's Events - Wedding & Events Planning Website
 * JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // ==================== NAVBAR SCROLL EFFECT ====================
    const navbar = document.getElementById('navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    
    // ==================== MOBILE HAMBURGER MENU ====================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active') && !navbar.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ==================== SMOOTH SCROLLING FOR ANCHOR LINKS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==================== SCROLL REVEAL ANIMATIONS ====================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const revealPoint = 100;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // ==================== TESTIMONIAL SLIDER - FIXED ====================
    const testimonialTrack = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonialTrack && dots.length > 0) {
        let currentSlide = 0;
        const slides = testimonialTrack.querySelectorAll('.testimonial-slide');
        const totalSlides = slides.length;
        let autoSlideInterval;
        
        function goToSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            
            currentSlide = index;
            testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
        
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }
        
        function prevSlide() {
            goToSlide(currentSlide - 1);
        }
        
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }
        
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }
        
        // Event listeners for buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            });
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                stopAutoSlide();
                goToSlide(index);
                startAutoSlide();
            });
        });
        
        // Start auto-slide
        startAutoSlide();
        
        // Pause on hover
        testimonialTrack.addEventListener('mouseenter', stopAutoSlide);
        testimonialTrack.addEventListener('mouseleave', startAutoSlide);
    }
    
    // ==================== TEAM SLIDER - AUTO SLIDE ====================
    const teamSliderTrack = document.getElementById('teamSliderTrack');
    const teamPrevBtn = document.getElementById('teamPrevBtn');
    const teamNextBtn = document.getElementById('teamNextBtn');
    const teamDots = document.querySelectorAll('.team-dot');
    
    if (teamSliderTrack && teamDots.length > 0) {
        let currentTeamSlide = 0;
        const teamSlides = teamSliderTrack.querySelectorAll('.team-slide');
        const totalTeamSlides = teamSlides.length;
        let teamAutoSlideInterval;
        
        // Determine slides per view based on screen width
        function getSlidesPerView() {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 992) return 2;
            return 3;
        }
        
        function goToTeamSlide(index) {
            const slidesPerView = getSlidesPerView();
            const maxSlide = totalTeamSlides - slidesPerView;
            
            if (index < 0) index = maxSlide;
            if (index > maxSlide) index = 0;
            
            currentTeamSlide = index;
            const slideWidth = 100 / slidesPerView;
            teamSliderTrack.style.transform = `translateX(-${currentTeamSlide * slideWidth}%)`;
            
            // Update dots
            teamDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentTeamSlide);
            });
        }
        
        function nextTeamSlide() {
            const slidesPerView = getSlidesPerView();
            const maxSlide = totalTeamSlides - slidesPerView;
            
            if (currentTeamSlide >= maxSlide) {
                goToTeamSlide(0);
            } else {
                goToTeamSlide(currentTeamSlide + 1);
            }
        }
        
        function prevTeamSlide() {
            goToTeamSlide(currentTeamSlide - 1);
        }
        
        function startTeamAutoSlide() {
            teamAutoSlideInterval = setInterval(nextTeamSlide, 4000);
        }
        
        function stopTeamAutoSlide() {
            clearInterval(teamAutoSlideInterval);
        }
        
        // Event listeners for buttons
        if (teamNextBtn) {
            teamNextBtn.addEventListener('click', function() {
                stopTeamAutoSlide();
                nextTeamSlide();
                startTeamAutoSlide();
            });
        }
        
        if (teamPrevBtn) {
            teamPrevBtn.addEventListener('click', function() {
                stopTeamAutoSlide();
                prevTeamSlide();
                startTeamAutoSlide();
            });
        }
        
        // Event listeners for dots
        teamDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                stopTeamAutoSlide();
                goToTeamSlide(index);
                startTeamAutoSlide();
            });
        });
        
        // Start auto-slide
        startTeamAutoSlide();
        
        // Pause on hover
        teamSliderTrack.addEventListener('mouseenter', stopTeamAutoSlide);
        teamSliderTrack.addEventListener('mouseleave', startTeamAutoSlide);
        
        // Handle resize
        window.addEventListener('resize', function() {
            goToTeamSlide(currentTeamSlide);
        });
    }
    
    // ==================== LIGHTBOX GALLERY ====================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    let currentImageIndex = 0;
    const galleryImages = [];
    
    // Collect all gallery images
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            galleryImages.push(img.src);
            
            item.addEventListener('click', function() {
                currentImageIndex = index;
                openLightbox(galleryImages[currentImageIndex]);
            });
        }
    });
    
    function openLightbox(src) {
        if (lightboxImage) lightboxImage.src = src;
        if (lightbox) {
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        if (lightboxImage) lightboxImage.src = galleryImages[currentImageIndex];
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        if (lightboxImage) lightboxImage.src = galleryImages[currentImageIndex];
    }
    
    // Event listeners
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
    
    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    });
    
    // ==================== FORM VALIDATION ====================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const eventTypeInput = document.getElementById('eventType');
        const messageInput = document.getElementById('message');
        
        // Validation patterns
        const patterns = {
            name: /^[a-zA-Z\s&'-]{2,50}$/,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            phone: /^[\d\s\-\+\(\)]{10,20}$/,
            message: /.{10,500}/
        };
        
        function showError(input, message) {
            const errorElement = document.getElementById(input.id + 'Error');
            if (errorElement) {
                input.classList.add('error');
                errorElement.textContent = message;
                errorElement.classList.add('show');
            }
        }
        
        function clearError(input) {
            const errorElement = document.getElementById(input.id + 'Error');
            if (errorElement) {
                input.classList.remove('error');
                errorElement.textContent = '';
                errorElement.classList.remove('show');
            }
        }
        
        function validateName() {
            const value = nameInput.value.trim();
            if (!value) {
                showError(nameInput, 'Please enter your name');
                return false;
            } else if (!patterns.name.test(value)) {
                showError(nameInput, 'Please enter a valid name');
                return false;
            }
            clearError(nameInput);
            return true;
        }
        
        function validateEmail() {
            const value = emailInput.value.trim();
            if (!value) {
                showError(emailInput, 'Please enter your email');
                return false;
            } else if (!patterns.email.test(value)) {
                showError(emailInput, 'Please enter a valid email address');
                return false;
            }
            clearError(emailInput);
            return true;
        }
        
        function validatePhone() {
            const value = phoneInput.value.trim();
            if (!value) {
                showError(phoneInput, 'Please enter your phone number');
                return false;
            } else if (!patterns.phone.test(value)) {
                showError(phoneInput, 'Please enter a valid phone number');
                return false;
            }
            clearError(phoneInput);
            return true;
        }
        
        function validateEventType() {
            const value = eventTypeInput.value;
            if (!value) {
                showError(eventTypeInput, 'Please select an event type');
                return false;
            }
            clearError(eventTypeInput);
            return true;
        }
        
        function validateMessage() {
            const value = messageInput.value.trim();
            if (!value) {
                showError(messageInput, 'Please enter your message');
                return false;
            } else if (value.length < 10) {
                showError(messageInput, 'Message must be at least 10 characters');
                return false;
            } else if (value.length > 500) {
                showError(messageInput, 'Message must be less than 500 characters');
                return false;
            }
            clearError(messageInput);
            return true;
        }
        
        // Real-time validation
        if (nameInput) nameInput.addEventListener('blur', validateName);
        if (emailInput) emailInput.addEventListener('blur', validateEmail);
        if (phoneInput) phoneInput.addEventListener('blur', validatePhone);
        if (eventTypeInput) eventTypeInput.addEventListener('change', validateEventType);
        if (messageInput) messageInput.addEventListener('blur', validateMessage);
        
        // Clear errors on input
        if (nameInput) nameInput.addEventListener('input', () => clearError(nameInput));
        if (emailInput) emailInput.addEventListener('input', () => clearError(emailInput));
        if (phoneInput) phoneInput.addEventListener('input', () => clearError(phoneInput));
        if (eventTypeInput) eventTypeInput.addEventListener('change', () => clearError(eventTypeInput));
        if (messageInput) messageInput.addEventListener('input', () => clearError(messageInput));
    }
    
    // ==================== SCROLL TO TOP BUTTON ====================
    const scrollTopBtn = document.getElementById('scrollTop');
    
    function toggleScrollTopBtn() {
        if (scrollTopBtn) {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    }
    
    window.addEventListener('scroll', toggleScrollTopBtn);
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ==================== PARALLAX EFFECT FOR HERO ====================
    const heroBackground = document.querySelector('.hero-background img');
    
    function parallaxEffect() {
        if (heroBackground && window.innerWidth > 768) {
            const scrolled = window.pageYOffset;
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px) scale(1.1)`;
        }
    }
    
    window.addEventListener('scroll', parallaxEffect);
    
    // ==================== INTERSECTION OBSERVER FOR BETTER PERFORMANCE ====================
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        revealElements.forEach(el => observer.observe(el));
    }
});

// ==================== EMAILJS INTEGRATION ====================
// EmailJS Configuration
// Replace these with your actual EmailJS credentials
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY',      // Replace with your EmailJS public key
    SERVICE_ID: 'YOUR_SERVICE_ID',      // Replace with your EmailJS service ID
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID'     // Replace with your EmailJS template ID
};

// Initialize EmailJS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form first
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const eventTypeInput = document.getElementById('eventType');
            const messageInput = document.getElementById('message');
            const eventDateInput = document.getElementById('eventDate');
            
            // Basic validation
            if (!nameInput.value.trim() || !emailInput.value.trim() || 
                !phoneInput.value.trim() || !eventTypeInput.value || !messageInput.value.trim()) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = '<span class="btn-text">Sending</span>';
            
            // Prepare template parameters
            const templateParams = {
                from_name: nameInput.value.trim(),
                from_email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                event_date: eventDateInput.value || 'Not specified',
                event_type: eventTypeInput.options[eventTypeInput.selectedIndex].text,
                message: messageInput.value.trim(),
                to_email: 'renhielbontuyan@gmail.com'
            };
            
            // Send email using EmailJS
            if (typeof emailjs !== 'undefined') {
                emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        
                        // Show success message
                        showFormMessage('Thank you! Your message has been sent successfully. We will get back to you within 24 hours.', 'success');
                        
                        // Reset form
                        contactForm.reset();
                        
                        // Reset button
                        submitBtn.classList.remove('loading');
                        submitBtn.innerHTML = originalText;
                    })
                    .catch(function(error) {
                        console.log('FAILED...', error);
                        
                        // Show error message
                        showFormMessage('Sorry, there was an error sending your message. Please try again or contact us directly at renhielbontuyan@gmail.com', 'error');
                        
                        // Reset button
                        submitBtn.classList.remove('loading');
                        submitBtn.innerHTML = originalText;
                    });
            } else {
                // EmailJS not loaded - show demo message
                showFormMessage('Email service is being set up. Please contact us directly at renhielbontuyan@gmail.com', 'error');
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = originalText;
            }
        });
    }
});

// Helper function to show form messages
function showFormMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Insert before the form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.parentNode.insertBefore(messageDiv, contactForm);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transition = 'opacity 0.5s ease';
            setTimeout(() => messageDiv.remove(), 500);
        }, 5000);
    }
}

// ==================== UTILITY FUNCTIONS ====================
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

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll events for better performance
const throttledScrollHandler = throttle(function() {
    // Scroll-based animations can be added here
}, 16);

window.addEventListener('scroll', throttledScrollHandler);
