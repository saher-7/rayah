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
                initAboutPageAnimations();
            }
        });
    } else {
        initAboutPageAnimations();
    }

    function initAboutPageAnimations() {
        // Navbar Scroll Effect
        const navbar = document.querySelector('.glassmorphic-nav');
        
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

        // ScrollTrigger Animations
        gsap.registerPlugin(ScrollTrigger);

        // Our Story Section Animations
        gsap.from('.story-text', {
            x: -50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.story-content',
                start: 'top 80%'
            }
        });

        gsap.from('.story-image', {
            x: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.story-content',
                start: 'top 80%'
            }
        });

        // Timeline Animations
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
});

// Load GSAP libraries if not already loaded
if (typeof gsap === 'undefined') {
    const scripts = [
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js'
    ];

    scripts.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
    });
}