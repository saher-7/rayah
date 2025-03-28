document.addEventListener('DOMContentLoaded', function() {
    // Loading Animation
    const loadingScreen = document.querySelector('.loading-screen');
    const logoLetters = document.querySelectorAll('.loading-logo span');
    
    if (loadingScreen && logoLetters.length > 0) {
        // Animate each letter of the logo
        logoLetters.forEach((letter, index) => {
            gsap.to(letter, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: index * 0.1,
                ease: 'power2.out'
            });
        });
        
        // Hide loading screen after animation
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 0.5,
            delay: 1.5,
            ease: 'power2.out',
            onComplete: () => {
                loadingScreen.style.display = 'none';
                document.body.style.overflow = 'auto';
                initIndexAnimations();
            }
        });
    } else {
        initIndexAnimations();
    }

    // Initialize all index.html animations
    function initIndexAnimations() {
        // Custom Cursor
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        
        if (cursor && cursorFollower) {
            document.addEventListener('mousemove', (e) => {
                gsap.to(cursor, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.1
                });
                
                gsap.to(cursorFollower, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.3
                });
            });
        }

        // Magnetic Buttons (for all pages)
        const magneticButtons = document.querySelectorAll('.magnetic');
        
        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const distanceX = x - centerX;
                const distanceY = y - centerY;
                
                gsap.to(button, {
                    x: distanceX * 0.2,
                    y: distanceY * 0.2,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });
        
        // Navbar Scroll Effect
        const navbar = document.querySelector('.navbar, .glassmorphic-nav');
        
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                    navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
                    navbar.style.backdropFilter = 'blur(10px)';
                } else {
                    navbar.classList.remove('scrolled');
                    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                    navbar.style.backdropFilter = 'none';
                }
            });
        }
        
        // Mobile Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
            
            // Close mobile menu when clicking a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });
        }
        
        // Back to Top Button
        const backToTop = document.querySelector('.back-to-top');
        
        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTop.classList.add('active');
                } else {
                    backToTop.classList.remove('active');
                }
            });
            
            backToTop.addEventListener('click', (e) => {
                e.preventDefault();
                gsap.to(window, {
                    scrollTo: 0,
                    duration: 1,
                    ease: 'power2.inOut'
                });
            });
        }

        // Hero Title Animation
        const heroTitleLines = gsap.utils.toArray('.title-line');
        
        if (heroTitleLines.length > 0) {
            heroTitleLines.forEach(line => {
                gsap.from(line, {
                    y: '100%',
                    duration: 1,
                    delay: 0.3,
                    ease: 'power3.out'
                });
            });
        }
        
        // Scroll Animations with GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate sections on scroll
        gsap.utils.toArray('section').forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });
        
        // Animate story cards
        gsap.utils.toArray('.story-card').forEach((card, i) => {
            gsap.from(card, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });
        
        // Timeline animation
        if (document.querySelector('.timeline')) {
            gsap.from('.timeline-item', {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.timeline',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        }
        
        // Collection Slider
        const sliderTrack = document.querySelector('.slider-track');
        const sliderItems = document.querySelectorAll('.slider-item');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        
        if (sliderTrack && sliderItems.length > 0) {
            let currentIndex = 0;
            const itemWidth = sliderItems[0].offsetWidth;
            const gap = parseInt(getComputedStyle(sliderTrack).gap);
            
            function updateSlider() {
                gsap.to(sliderTrack, {
                    x: -currentIndex * (itemWidth + gap),
                    duration: 0.8,
                    ease: 'power2.out'
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    if (currentIndex < sliderItems.length - 1) {
                        currentIndex++;
                        updateSlider();
                    }
                });
            }
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateSlider();
                    }
                });
            }
        }
        
        // Watch card hover effect
        const watchCards = document.querySelectorAll('.watch-card');
        
        watchCards.forEach(card => {
            const image = card.querySelector('img');
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                gsap.to(image, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    transformPerspective: 1000,
                    transformOrigin: 'center center',
                    ease: 'power1.out',
                    duration: 0.5
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(image, {
                    rotationX: 0,
                    rotationY: 0,
                    ease: 'elastic.out(1, 0.5)',
                    duration: 1
                });
            });
        });
        
        // Testimonial slider
        const testimonialSlides = gsap.utils.toArray('.testimonial-slide');
        if (testimonialSlides.length > 1) {
            let currentTestimonial = 0;
            
            function showTestimonial(index) {
                gsap.to(testimonialSlides[currentTestimonial], {
                    opacity: 0,
                    x: -100,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    display: 'none'
                });
                
                currentTestimonial = (index + testimonialSlides.length) % testimonialSlides.length;
                
                gsap.fromTo(testimonialSlides[currentTestimonial], 
                    { opacity: 0, x: 100 },
                    { 
                        opacity: 1,
                        x: 0,
                        duration: 0.5,
                        ease: 'power2.inOut',
                        display: 'grid'
                    }
                );
            }
            
            // Auto-rotate testimonials
            setInterval(() => {
                showTestimonial(currentTestimonial + 1);
            }, 5000);
        }

        // Smooth Scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }
});

// Append loading screen styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #0a0a0a;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }
    
    .loading-logo span {
        display: inline-block;
        font-size: 4rem;
        font-weight: 700;
        color: #d4af37;
        font-family: 'Playfair Display', serif;
        margin: 0 5px;
        opacity: 0;
        transform: translateY(20px);
    }
    
    .cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #d4af37;
        mix-blend-mode: difference;
        pointer-events: none;
        z-index: 999;
    }
    
    .cursor-follower {
        position: fixed;
        width: 60px;
        height: 60px;
        border: 1px solid #d4af37;
        border-radius: 50%;
        pointer-events: none;
        z-index: 998;
    }
`;
document.head.appendChild(loadingStyles);

// Load GSAP if not already loaded
if (typeof gsap === 'undefined') {
    const gsapScript = document.createElement('script');
    gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js';
    document.head.appendChild(gsapScript);
    
    const scrollTriggerScript = document.createElement('script');
    scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js';
    document.head.appendChild(scrollTriggerScript);
    
    // Wait for GSAP to load before initializing
    const checkGSAP = setInterval(() => {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            clearInterval(checkGSAP);
            document.dispatchEvent(new Event('DOMContentLoaded'));
        }
    }, 100);
}