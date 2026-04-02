document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 2. Navbar Scrolled State
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // 4. Booking Form WhatsApp Redirect
    const form = document.getElementById('bookingForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const eventType = document.getElementById('event').value;
            const date = document.getElementById('date').value;
            const message = document.getElementById('message').value;

            const text = `Hello December Flowers! 🌸\n\nI want to book an event.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Event Type:* ${eventType}\n*Date:* ${date}\n*Message:* ${message}\n\nLooking forward to hearing from you.`;
            
            const encodedText = encodeURIComponent(text);
            const waLink = `https://wa.me/971XXXXXXXXX?text=${encodedText}`;
            
            window.open(waLink, '_blank');
            form.reset();
        });
    }

    // 5. Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    if(lightbox && closeLightbox && lightboxImg) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const placeholderText = item.querySelector('span').innerText;
                lightboxImg.innerText = placeholderText; // Display placeholder text in lightbox
                lightbox.classList.add('active');
            });
        });

        const closeLightboxFunc = () => {
            lightbox.classList.remove('active');
        };

        closeLightbox.addEventListener('click', closeLightboxFunc);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightboxFunc();
            }
        });
    }

    // 6. Gallery Carousel Controls
    const carousel = document.querySelector('.gallery-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (carousel && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -carousel.clientWidth / 2, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: carousel.clientWidth / 2, behavior: 'smooth' });
        });
    }

    // 7. Subtle Falling Petals Animation
    initPetals();
});

function initPetals() {
    const petalContainer = document.createElement('div');
    petalContainer.classList.add('petal-container');
    document.body.appendChild(petalContainer);

    const petalCount = 20; // Subtle amount
    
    for (let i = 0; i < petalCount; i++) {
        createPetal(petalContainer);
    }
}

function createPetal(container) {
    const petal = document.createElement('div');
    petal.classList.add('falling-petal');
    
    const startLeft = Math.random() * 100; // 0 to 100vw
    const duration = Math.random() * 12 + 10; // 10 to 22s
    const startDelay = Math.random() * 15; // 0 to 15s delay
    const size = Math.random() * 12 + 12; // 12px to 24px
    const isWhite = Math.random() > 0.5;
    
    // Abstract petal SVG path
    petal.innerHTML = `<svg viewBox="0 0 50 50" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><path d="M25,0 C35,10 45,20 40,30 C35,40 25,45 25,45 C25,45 15,40 10,30 C5,20 15,10 25,0 Z" fill="${isWhite ? 'rgba(255,255,255,0.85)' : 'rgba(233, 210, 205, 0.85)'}"/></svg>`;
    
    petal.style.left = `${startLeft}vw`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `-${startDelay}s`;
    
    container.appendChild(petal);
}
