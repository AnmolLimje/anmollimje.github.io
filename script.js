// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursorDot, {
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

// Hover effect for cursor
const linkHover = document.querySelectorAll('a, button, .skill-category');
linkHover.forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(cursorFollower, {
            scale: 2,
            backgroundColor: 'rgba(0, 255, 242, 0.1)',
            border: 'none'
        });
    });
    link.addEventListener('mouseleave', () => {
        gsap.to(cursorFollower, {
            scale: 1,
            backgroundColor: 'transparent',
            border: '1px solid var(--accent)'
        });
    });
});

// Ensure ScrollTrigger refreshes after all assets are loaded
window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero Animation
const tl = gsap.timeline();

tl.to('.hero-title', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power4.out",
    delay: 0.5
})
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.5")
    .to('.hero-tagline', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.7")
    .to('.cta-group', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.7");

// Section Headers Reveal
gsap.utils.toArray('.section-header').forEach(header => {
    const line = header.querySelector('.line');

    gsap.from(header, {
        scrollTrigger: {
            trigger: header,
            start: "top 85%", // Made slightly more lenient
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 0.8
    });

    gsap.to(line, {
        scrollTrigger: {
            trigger: header,
            start: "top 85%",
        },
        scaleX: 1,
        duration: 1,
        ease: "power2.inOut"
    });
});

// About Section Content Reveal
gsap.from('.block-reveal', {
    scrollTrigger: {
        trigger: '#about',
        start: "top 75%",
    },
    opacity: 0,
    y: 50,
    duration: 1
});

// Experience Cards Stagger
gsap.utils.toArray('.job-card').forEach((card, i) => {
    gsap.to(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 90%", // Increased leniency
        },
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out"
    });
});

// Skills Stagger
gsap.from('.skill-category', {
    scrollTrigger: {
        trigger: '#skills',
        start: "top 85%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "back.out(1.7)"
});

// Achievements Stagger
gsap.from('.achievement-item', {
    scrollTrigger: {
        trigger: '#achievements',
        start: "top 85%",
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1
});

// Education Cards
gsap.from('.edu-card', {
    scrollTrigger: {
        trigger: '#education',
        start: "top 85%",
    },
    scale: 0.9,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2
});

// Contact Cards
gsap.from('.contact-card', {
    scrollTrigger: {
        trigger: '.contact-container',
        start: "top 85%",
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1
});
