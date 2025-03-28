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
                initContactPageAnimations();
            }
        });
    } else {
        initContactPageAnimations();
    }

    function initContactPageAnimations() {
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

        // Form Animations
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach((group, index) => {
            gsap.from(group, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: group,
                    start: 'top 90%'
                }
            });
        });

        // Contact Details Animation
        gsap.from('.contact-details', {
            opacity: 0,
            x: 50,
            duration: 1,
            scrollTrigger: {
                trigger: '.contact-info',
                start: 'top 80%'
            }
        });

        // Form Submission
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simple form validation
                const name = document.getElementById('name');
                const email = document.getElementById('email');
                const message = document.getElementById('message');
                
                if (name.value && email.value && message.value) {
                    gsap.to('.submit-button', {
                        scale: 1.1,
                        duration: 0.2,
                        yoyo: true,
                        repeat: 1,
                        ease: 'power1.inOut',
                        onComplete: () => {
                            alert('Message sent successfully!');
                            contactForm.reset();
                        }
                    });
                } else {
                    alert('Please fill in all fields');
                }
            });
        }
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