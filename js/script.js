document.addEventListener('DOMContentLoaded', function() {
    // Navegación móvil
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Cambio de color de la barra de navegación al hacer scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Animación suave para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Si el menú móvil está activo, cerrarlo
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
                
                // Calcular la posición exacta considerando el navbar fijo
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animación al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .help-card, .help-content, .problem-solution-wrapper, .problem-box, .solution-box, .service-card, .service-cta');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animate');
            }
        });
    };
    
    // Añadir clase para animar los elementos
    document.querySelectorAll('.feature-card, .help-card, .help-content, .problem-solution-wrapper, .problem-box, .solution-box, .service-card, .service-cta').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Ejecutar una vez al cargar la página
    animateOnScroll();
});