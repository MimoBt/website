// Initialisation de GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animation du logo au chargement
gsap.from('.logo', {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: 'power3.out'
});

// Animation du menu
gsap.from('nav ul li', {
    duration: 1,
    y: -20,
    opacity: 0,
    stagger: 0.1,
    ease: 'power3.out'
});

// Animation des sections au scroll
function animateSections() {
    // Services cards animation
    gsap.utils.toArray('.service-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleClass: 'animate'
            }
        });
    });

    // Testimonials animation
    gsap.utils.toArray('.testimonial-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleClass: 'animate'
            }
        });
    });

    // Contact form animation
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            toggleClass: 'animate'
        }
    });
}

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Animation du formulaire
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Animation de soumission
        gsap.to(form, {
            scale: 0.98,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });

        // Simuler l'envoi du formulaire
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Envoi en cours...';
        
        setTimeout(() => {
            submitButton.textContent = 'Message envoyé !';
            submitButton.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// Menu mobile
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    nav.insertBefore(menuButton, nav.firstChild);
    
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('mobile-menu-open');
        menuButton.innerHTML = nav.classList.contains('mobile-menu-open') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    animateSections();
    createMobileMenu();
    
    // Animation des nombres
    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Animation des badges de confiance
    gsap.from('.trust-badges .badge', {
        scrollTrigger: {
            trigger: '.trust-badges',
            start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2
    });

    // Menu mobile toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    if (mobileMenuToggle && mainNav) {
        // Créer l'overlay
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        body.appendChild(overlay);

        function toggleMenu() {
            mobileMenuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            overlay.classList.toggle('active');
            body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
        }

        // Event listeners
        mobileMenuToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        // Fermer le menu quand on clique sur un lien
        const navLinks = document.querySelectorAll('.nav-button');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu();
                // Scroll doux vers la section
                const target = link.getAttribute('href');
                if(target.startsWith('#')) {
                    const element = document.querySelector(target);
                    if(element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });

        // Gérer le scroll
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if(currentScroll > lastScroll && currentScroll > 100) {
                mobileMenuToggle.style.transform = 'translateY(-100%)';
            } else {
                mobileMenuToggle.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        });
    }

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            fetch('process_contact.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    contactForm.reset();
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
                alert('Une erreur est survenue lors de l\'envoi du message');
            });
        });
    }

    // Éléments du menu
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.mobile-menu-links a');
    const goToTop = document.querySelector('.go-to-top');

    // Fonction pour basculer le menu
    function toggleMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = document.body.style.overflow === 'hidden' ? '' : 'hidden';
    }

    // Event listeners pour le menu
    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Fermer le menu quand on clique sur un lien
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
            const target = link.getAttribute('href');
            if(target.startsWith('#')) {
                const element = document.querySelector(target);
                if(element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Gestion du bouton Go to Top
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            goToTop.classList.add('visible');
        } else {
            goToTop.classList.remove('visible');
        }
    });

    goToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Gestion du header sticky
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});
