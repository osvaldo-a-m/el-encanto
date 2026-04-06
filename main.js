document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Intersection Observer for fade-in animations
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Slideshow logic for about section
    const slides = document.querySelectorAll('.about-image .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 3000); // Cambiar imagen cada 4 segundos
    }
    // Form submission to Webhook
    const bookForm = document.getElementById('bookForm');
    if (bookForm) {
        bookForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            const formData = new FormData(bookForm);
            const data = Object.fromEntries(formData.entries());

            // URL del webhook a donde se mandarán los datos
            const WEBHOOK_URL = 'https://backyou-n8n.pf0hps.easypanel.host/webhook/56a78e4a-abad-4c22-959a-04d71bb2496c';

            try {
                // Aquí usamos no-cors si el webhook no tiene CORS habilitado,
                // pero lo normal es enviar como JSON simple.
                await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                // Simulamos éxito visual
                alert('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
                bookForm.reset();
            } catch (error) {
                console.error('Error enviando formulario:', error);
                alert('Hubo un problema al enviar el mensaje. Por favor intenta más tarde o contáctanos por teléfono.');
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
