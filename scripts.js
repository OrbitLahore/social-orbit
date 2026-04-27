// Intersection Observer for scroll animations
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function initAnimations() {
    document.querySelectorAll('.animate-up, .animate-left, .animate-scale, .stagger-children, .stagger-scale-children').forEach(el => {
        el.classList.remove('in-view');
        observer.observe(el);
    });
}

window.addEventListener('load', () => {
    initAnimations();
    lucide.createIcons();
});

// Sticky Navbar and Parallax
const noiseOverlay = document.getElementById('noise-overlay');
const parallaxLayers = document.querySelectorAll('.parallax-layer');
const blurWords = document.querySelectorAll('.blur-word');
let ticking = false;

function updateParallax() {
    const scrollY = window.scrollY;
    
    // Background grain moves opposite (downward)
    if (noiseOverlay) {
        noiseOverlay.style.transform = `translateY(${scrollY * 0.15}px)`;
    }

    // Layer parallax
    parallaxLayers.forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-speed')) || 0;
        layer.style.transform = `translateY(${scrollY * speed}px)`;
    });
    
    // Text reveal
    const revealStart = 10; 
    const revealEnd = 80; 
    const scrollProgress = Math.max(0, Math.min(1, (scrollY - revealStart) / (revealEnd - revealStart)));
    
    blurWords.forEach((word, index) => {
        const wordThreshold = index / blurWords.length;
        if (scrollProgress > wordThreshold) {
            word.classList.add('revealed');
        } else {
            word.classList.remove('revealed');
        }
    });

    ticking = false;
}

window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) {
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    }

    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Initial setup
updateParallax();

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        document.querySelector('.mobile-menu').classList.add('active');
        const links = document.querySelectorAll('.mobile-nav-links a');
        links.forEach((link, index) => {
            link.style.transitionDelay = `${0.1 * (index + 1)}s`;
        });
    });
}

const closeMenu = document.querySelector('.close-menu');
if (closeMenu) {
    closeMenu.addEventListener('click', () => {
        document.querySelector('.mobile-menu').classList.remove('active');
        document.querySelectorAll('.mobile-nav-links a').forEach(link => link.style.transitionDelay = '0s');
    });
}

document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.mobile-menu').classList.remove('active');
    });
});

// ── Scroll-Driven Orbit Animation ──
(function initOrbitAnimation() {
    const ring1 = document.getElementById('orbit-ring-1');
    const ring2 = document.getElementById('orbit-ring-2');
    const ring3 = document.getElementById('orbit-ring-3');
    const planet = document.getElementById('orbit-planet');

    if (!ring1 || !planet) return;

    // Compute perimeters using SVG method
    function getPerimeter(el) {
        try { return el.getTotalLength(); } catch(e) {
            // Fallback for ellipse: approx Ramanujan formula
            const rx = parseFloat(el.getAttribute('rx'));
            const ry = parseFloat(el.getAttribute('ry'));
            const a = Math.max(rx, ry), b = Math.min(rx, ry);
            const h = Math.pow(a - b, 2) / Math.pow(a + b, 2);
            return Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
        }
    }

    const p1 = getPerimeter(ring1);
    const p2 = getPerimeter(ring2);
    const p3 = getPerimeter(ring3);

    // Initialise dash — fully hidden
    [{ el: ring1, p: p1 }, { el: ring2, p: p2 }, { el: ring3, p: p3 }].forEach(({ el, p }) => {
        el.style.strokeDasharray  = p;
        el.style.strokeDashoffset = p;
        el.style.transition = 'none';
    });

    let orbitTicking = false;

    function updateOrbit() {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(1, scrollY / maxScroll) : 0;

        // Draw each ring progressively (stagger start points)
        const drawRing = (el, p, startAt, endAt) => {
            const t = Math.max(0, Math.min(1, (progress - startAt) / (endAt - startAt)));
            el.style.strokeDashoffset = p * (1 - t);
        };
        drawRing(ring1, p1, 0,    0.85);
        drawRing(ring2, p2, 0.05, 0.90);
        drawRing(ring3, p3, 0.10, 0.95);

        // Animate planet dot along outer ellipse parametrically
        const cx = 720, cy = 450, rx = 650, ry = 310;
        const angle = progress * 2 * Math.PI - Math.PI / 2;
        const px = cx + rx * Math.cos(angle);
        const py = cy + ry * Math.sin(angle);
        planet.setAttribute('cx', px);
        planet.setAttribute('cy', py);

        orbitTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!orbitTicking) {
            requestAnimationFrame(updateOrbit);
            orbitTicking = true;
        }
    }, { passive: true });

    updateOrbit();
})();

// Set active navigation link based on current URL
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
setActiveNavLink();