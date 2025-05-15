document.addEventListener('DOMContentLoaded', function() {
    // Primero añadir todas las traducciones adicionales
    addDiscountTranslations();
    
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
            if (this.id === 'langSwitch') return; // No prevenir el comportamiento por defecto para el botón de idioma
            
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
    
    // Animación al hacer scroll con IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Opcional: dejar de observar después de animar
                // observer.unobserve(entry.target);
            } else {
                // Opcional: quitar la animación cuando ya no está en viewport
                // entry.target.classList.remove('animate');
            }
        });
    }, observerOptions);
    
    // Añadir clase para animar los elementos y observarlos
    const animatedElements = document.querySelectorAll('.feature-card, .help-card, .help-content, .problem-solution-wrapper, .problem-box, .solution-box, .service-card, .service-cta, .contact-form, .contact-info, .footer-column');
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Validación del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores de los campos
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validación básica
            if (name === '') {
                isValid = false;
                setError('name', 'Por favor, ingresa tu nombre');
            } else {
                clearError('name');
            }
            
            if (email === '') {
                isValid = false;
                setError('email', 'Por favor, ingresa tu correo electrónico');
            } else if (!isValidEmail(email)) {
                isValid = false;
                setError('email', 'Por favor, ingresa un correo electrónico válido');
            } else {
                clearError('email');
            }
            
            if (message === '') {
                isValid = false;
                setError('message', 'Por favor, ingresa tu mensaje');
            } else {
                clearError('message');
            }
            
            if (isValid) {
                // Aquí normalmente enviarías el formulario a un servidor
                // Para esta demo, mostraremos un mensaje de éxito
                contactForm.reset();
                showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
            }
        });
    }
    
    function setError(inputId, message) {
        const input = document.getElementById(inputId);
        const errorElement = input.parentElement.querySelector('.error-message');
        
        if (!errorElement) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            input.parentElement.appendChild(errorDiv);
            input.classList.add('error');
        } else {
            errorElement.textContent = message;
        }
    }
    
    function clearError(inputId) {
        const input = document.getElementById(inputId);
        const errorElement = input.parentElement.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
            input.classList.remove('error');
        }
    }
    
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Mostrar la notificación con una animación
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Ocultar y eliminar la notificación después de 4 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
    
    // Asegurarse de que la navegación por secciones funcione correctamente al cargar la página
    // Si la URL tiene un hash, navegar a esa sección después de cargar la página
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            setTimeout(() => {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navbarHeight,
                    behavior: 'smooth'
                });
            }, 300); // Pequeño retraso para asegurar que la página está completamente cargada
        }
    }
    
    // Animación para elementos al cargar la página
    window.addEventListener('load', function() {
        // Animación para el hero (aparece gradualmente)
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent) {
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 200);
        }
        
        if (heroImage) {
            setTimeout(() => {
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'translateY(0)';
            }, 500);
        }
    });
    
    // Inicializar elementos visibles en la carga
    setTimeout(function() {
        const elementsInView = document.querySelectorAll('.animate-on-scroll');
        
        elementsInView.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight - 50) {
                element.classList.add('animate');
            }
        });
    }, 100);
    
    // ===== FUNCIONALIDAD DE CAMBIO DE IDIOMA =====
    
    // Función para cambiar el idioma
    function switchLanguage() {
        // Si el idioma actual es español, cambiar a inglés y viceversa
        const currentLang = localStorage.getItem('language') || 'es';
        const newLang = currentLang === 'es' ? 'en' : 'es';
        
        // Guardar la preferencia de idioma
        localStorage.setItem('language', newLang);
        
        // Actualizar el texto del botón de idioma
        document.getElementById('langSwitch').textContent = newLang === 'es' ? 'EN' : 'ES';
        
        // Actualizar todos los textos
        updateTexts(newLang);
    }
    
    // Obtener el idioma guardado o usar español por defecto
    const currentLang = localStorage.getItem('language') || 'es';
    
    // Actualizar el texto del botón de idioma
    const langSwitch = document.getElementById('langSwitch');
    if (langSwitch) {
        langSwitch.textContent = currentLang === 'es' ? 'EN' : 'ES';
        
        // Agregar evento al botón de cambio de idioma
        langSwitch.addEventListener('click', function(e) {
            e.preventDefault();
            switchLanguage();
        });
    }
    
    // Aplicar inmediatamente el idioma guardado
    updateTexts(currentLang);
    
    // Inicializar cuenta regresiva
    initCountdown();
});

// Función para actualizar todos los textos según el idioma
function updateTexts(lang) {
    // Obtener todos los elementos con atributo data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        // Si existe una traducción para este elemento
        if (translations[lang] && translations[lang][key]) {
            // Si es un elemento de entrada o un textarea
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.getAttribute('placeholder')) {
                    element.placeholder = translations[lang][key];
                } else {
                    element.value = translations[lang][key];
                }
            } 
            // Si es un elemento select option
            else if (element.tagName === 'OPTION') {
                element.text = translations[lang][key];
            }
            // Si es un elemento con atributo value (como botones)
            else if (element.hasAttribute('value')) {
                element.value = translations[lang][key];
            } 
            // Para todos los demás elementos
            else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // También actualizar el título de la página
    if (translations[lang] && translations[lang]['site_title']) {
        document.title = translations[lang]['site_title'];
    }
    
    // Actualizar el atributo lang del HTML
    document.documentElement.lang = lang;
}

// Función para inicializar la cuenta regresiva
function initCountdown() {
    // Fecha límite: 10 de Julio de 2025 a las 23:59:59
    const endDate = new Date("2025-07-10T23:59:59").getTime();
    
    // Actualizar cada segundo
    const countdownTimer = setInterval(function() {
        // Fecha y hora actual
        const now = new Date().getTime();
        
        // Distancia entre ahora y la fecha límite
        const distance = endDate - now;
        
        // Cálculos de tiempo para días, horas, minutos y segundos
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Mostrar resultados añadiendo ceros a la izquierda si es necesario
        document.getElementById("countdown-days").textContent = days < 10 ? "0" + days : days;
        document.getElementById("countdown-hours").textContent = hours < 10 ? "0" + hours : hours;
        document.getElementById("countdown-minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("countdown-seconds").textContent = seconds < 10 ? "0" + seconds : seconds;
        
        // Si la cuenta regresiva ha terminado
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById("countdown-days").textContent = "00";
            document.getElementById("countdown-hours").textContent = "00";
            document.getElementById("countdown-minutes").textContent = "00";
            document.getElementById("countdown-seconds").textContent = "00";
            
            // Opcional: ocultar el banner cuando termina la promoción
            // document.querySelector(".discount-ribbon").style.display = "none";
        }
    }, 1000);
}

// Añadir nuevas traducciones para el banner de descuento
function addDiscountTranslations() {
    // Añadir al objeto de traducciones existente
    // En español
    translations.es["countdown_title"] = "¡Descuento por lanzamiento oficial!";
    translations.es["countdown_description"] = "Oferta válida hasta el 10/07/2025";
    translations.es["countdown_days"] = "Días";
    translations.es["countdown_hours"] = "Horas";
    translations.es["countdown_minutes"] = "Minutos";
    translations.es["countdown_seconds"] = "Segundos";
    translations.es["countdown_cta"] = "¡Aprovechar ahora!";
    translations.es["hero_cta_join"] = "Prueba ya";
    
    // En inglés
    translations.en["countdown_title"] = "Official Launch Discount!";
    translations.en["countdown_description"] = "Offer valid until 07/10/2025";
    translations.en["countdown_days"] = "Days";
    translations.en["countdown_hours"] = "Hours";
    translations.en["countdown_minutes"] = "Minutes";
    translations.en["countdown_seconds"] = "Seconds";
    translations.en["countdown_cta"] = "Get it now!";
    translations.en["hero_cta_join"] = "Try it now";
}

// Añade efectos visuales al cargar la página
window.addEventListener('load', function() {
    // Añadir clase para activar animación en el banner
    setTimeout(() => {
        const discountRibbon = document.querySelector('.discount-ribbon');
        if (discountRibbon) {
            discountRibbon.classList.add('active');
        }
        
        const discountTag = document.querySelector('.discount-tag');
        if (discountTag) {
            discountTag.classList.add('active');
        }
    }, 300);
});