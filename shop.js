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
                initShopPageAnimations();
                initCustomCursor(); // Initialize cursor after loading
            }
        });
    } else {
        initShopPageAnimations();
        initCustomCursor(); // Initialize cursor immediately if no loading screen
    }

    function initCustomCursor() {
        // Create cursor elements
        const cursor = document.createElement('div');
        const cursorFollower = document.createElement('div');
        
        // Add classes for styling
        cursor.className = 'custom-cursor';
        cursorFollower.className = 'custom-cursor-follower';
        
        // Set initial styles
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #d4af37;
            mix-blend-mode: difference;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            display: none;
        `;
        
        cursorFollower.style.cssText = `
            position: fixed;
            width: 60px;
            height: 60px;
            border: 1px solid #d4af37;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            display: none;
        `;
        
        // Append to body
        document.body.appendChild(cursor);
        document.body.appendChild(cursorFollower);
        
        // Show cursors
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';

        // Cursor movement with exact animation from reference
        document.addEventListener('mousemove', (e) => {
            // Main cursor (instant movement)
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                overwrite: true
            });
            
            // Follower cursor (smooth follow)
            gsap.to(cursorFollower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: true
            });
        });
        
        // Hover effects on interactive elements
        const interactiveSelectors = 'a, button, [role="button"], input, select, textarea, .product-card, .magnetic';
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches(interactiveSelectors)) {
                gsap.to(cursorFollower, {
                    scale: 0.5,
                    duration: 0.3
                });
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.matches(interactiveSelectors)) {
                gsap.to(cursorFollower, {
                    scale: 1,
                    duration: 0.3
                });
            }
        });
        
        // Hide cursor when mouse leaves window
        document.addEventListener('mouseleave', () => {
            gsap.to([cursor, cursorFollower], {
                opacity: 0,
                duration: 0.3
            });
        });
        
        document.addEventListener('mouseenter', () => {
            gsap.to([cursor, cursorFollower], {
                opacity: 1,
                duration: 0.3
            });
        });
    }

    function initShopPageAnimations() {
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

        // Product Card Hover Effects
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const image = card.querySelector('.product-image img');
            const quickView = card.querySelector('.quick-view');
            const addToCart = card.querySelector('.add-to-cart');

            // Image hover effect
            card.addEventListener('mouseenter', () => {
                gsap.to(image, {
                    scale: 1.05,
                    duration: 0.5,
                    ease: 'power2.out'
                });

                gsap.to(quickView, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(image, {
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });

                gsap.to(quickView, {
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            // Add to cart animation
            addToCart.addEventListener('click', () => {
                gsap.to(addToCart, {
                    scale: 1.1,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power1.inOut',
                    onComplete: () => {
                        alert('Item added to cart!');
                    }
                });
            });
        });

        // ScrollTrigger Animations
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            // Product Grid Animation
            gsap.from('.product-grid .product-card', {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.product-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
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

    // Wait for GSAP to load before initializing
    const checkGSAP = setInterval(() => {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            clearInterval(checkGSAP);
            document.dispatchEvent(new Event('DOMContentLoaded'));
        }
    }, 100);
}