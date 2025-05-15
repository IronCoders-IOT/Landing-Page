// Script específico para la página de contacto
document.addEventListener('DOMContentLoaded', function() {
    // Gestión de preguntas frecuentes
    initFAQ();
    
    // Validación del formulario de contacto
    initContactForm();
    
    // Añadir nuevas traducciones para la página de contacto
    addContactTranslations();
});

// Inicializar el comportamiento de las FAQ
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Cerrar todas las demás preguntas
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').classList.remove('active');
                }
            });
            
            // Alternar la clase active para el elemento actual
            item.classList.toggle('active');
            question.classList.toggle('active');
        });
    });
}

// Inicializar la validación del formulario
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores de los campos
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            const privacyPolicy = document.getElementById('privacy-policy').checked;
            
            let isValid = true;
            
            // Validación básica
            if (name === '') {
                isValid = false;
                setError('name', getCurrentLanguage() === 'es' ? 'Por favor, ingresa tu nombre' : 'Please enter your name');
            } else {
                clearError('name');
            }
            
            if (email === '') {
                isValid = false;
                setError('email', getCurrentLanguage() === 'es' ? 'Por favor, ingresa tu correo electrónico' : 'Please enter your email');
            } else if (!isValidEmail(email)) {
                isValid = false;
                setError('email', getCurrentLanguage() === 'es' ? 'Por favor, ingresa un correo electrónico válido' : 'Please enter a valid email');
            } else {
                clearError('email');
            }
            
            if (phone !== '' && !isValidPhone(phone)) {
                isValid = false;
                setError('phone', getCurrentLanguage() === 'es' ? 'Por favor, ingresa un número de teléfono válido' : 'Please enter a valid phone number');
            } else {
                clearError('phone');
            }
            
            if (message === '') {
                isValid = false;
                setError('message', getCurrentLanguage() === 'es' ? 'Por favor, ingresa tu mensaje' : 'Please enter your message');
            } else {
                clearError('message');
            }
            
            if (!privacyPolicy) {
                isValid = false;
                setError('privacy-policy', getCurrentLanguage() === 'es' ? 'Debes aceptar la política de privacidad' : 'You must accept the privacy policy');
            } else {
                clearError('privacy-policy');
            }
            
            if (isValid) {
                // Aquí normalmente enviarías el formulario a un servidor
                // Para esta demo, mostraremos un mensaje de éxito
                contactForm.reset();
                showNotification(
                    getCurrentLanguage() === 'es' 
                        ? '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.' 
                        : 'Message sent successfully! We will get in touch with you soon.',
                    'success'
                );
            }
        });
    }
}

// Obtener el idioma actual
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'es';
}

// Funciones auxiliares para la validación del formulario
function setError(inputId, message) {
    const input = document.getElementById(inputId);
    let errorElement = input.parentElement.querySelector('.error-message');
    
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

function isValidPhone(phone) {
    // Validación básica para números de teléfono (puede ajustarse según necesidades)
    const regex = /^[+]?[\d\s()-]{8,15}$/;
    return regex.test(phone);
}

function showNotification(message, type) {
    // Eliminar notificaciones existentes
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
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

// Añadir traducciones específicas para la página de contacto
function addContactTranslations() {
    // Añadir al objeto de traducciones existente
    // En español
    translations.es["contact_page_title"] = "AquaConecta - Contacto";
    translations.es["contact_hero_title"] = "Contacta con Nosotros";
    translations.es["contact_hero_description"] = "Estamos aquí para responder tus preguntas y ayudarte con cualquier consulta sobre AquaConecta";
    translations.es["contact_form_title"] = "Envíanos un mensaje";
    translations.es["contact_form_description"] = "Completa el formulario y nos pondremos en contacto contigo lo antes posible";
    translations.es["contact_phone"] = "Teléfono";
    translations.es["contact_privacy_policy"] = "Acepto la política de privacidad y el tratamiento de mis datos";
    translations.es["contact_info_title"] = "Información de contacto";
    translations.es["contact_info_description"] = "Puedes contactarnos a través de los siguientes medios o visitarnos en nuestra oficina";
    translations.es["contact_hours_title"] = "Horario de atención";
    translations.es["contact_hours"] = "Lunes a Viernes: 9:00 AM - 6:00 PM";
    translations.es["contact_social_title"] = "Síguenos en redes sociales";
    translations.es["faq_title"] = "Preguntas Frecuentes";
    translations.es["faq_description"] = "Respuestas a las consultas más comunes sobre AquaConecta";
    translations.es["faq_q1"] = "¿Cómo funciona AquaConecta?";
    translations.es["faq_a1"] = "AquaConecta utiliza sensores IoT instalados en tanques de agua para monitorear en tiempo real la cantidad y calidad del agua. La información se transmite a nuestra plataforma, donde los usuarios pueden visualizarla a través de una aplicación móvil o web, recibir alertas cuando el nivel es bajo y solicitar suministro cuando sea necesario.";
    translations.es["faq_q2"] = "¿Cuánto cuesta instalar AquaConecta?";
    translations.es["faq_a2"] = "El costo inicial es de S/ 258 por sensor, que incluye el dispositivo, la instalación profesional y un mes de servicio. Después del primer mes, la suscripción tiene un costo de S/ 50 mensuales por cada sensor activo.";
    translations.es["faq_q3"] = "¿AquaConecta funciona sin internet?";
    translations.es["faq_a3"] = "Los sensores requieren conectividad para transmitir datos a la plataforma. Sin embargo, pueden almacenar temporalmente la información cuando no hay conexión y sincronizarla una vez que se restablezca internet. La aplicación móvil también permite ver los últimos datos sincronizados cuando estás sin conexión.";
    translations.es["faq_q4"] = "¿Puedo instalar AquaConecta en cualquier tipo de tanque?";
    translations.es["faq_a4"] = "Nuestros sensores son compatibles con la mayoría de los tanques de agua residenciales y comerciales, incluyendo tanques de plástico, fibra de vidrio, concreto y metal. Durante la instalación, nuestros técnicos evaluarán la compatibilidad y recomendarán la mejor solución para tu caso específico.";
    translations.es["faq_q5"] = "¿Qué beneficios tiene AquaConecta para proveedores de agua?";
    translations.es["faq_a5"] = "Para proveedores, AquaConecta ofrece una plataforma de gestión que permite monitorear remotamente el estado de los tanques de sus clientes, planificar rutas de distribución de manera eficiente, priorizar automáticamente las zonas con mayor necesidad y obtener datos valiosos para optimizar sus operaciones y mejorar el servicio al cliente.";
    
    // En inglés
    translations.en["contact_page_title"] = "AquaConecta - Contact";
    translations.en["contact_hero_title"] = "Contact Us";
    translations.en["contact_hero_description"] = "We're here to answer your questions and help you with any inquiries about AquaConecta";
    translations.en["contact_form_title"] = "Send us a message";
    translations.en["contact_form_description"] = "Fill out the form and we'll get back to you as soon as possible";
    translations.en["contact_phone"] = "Phone";
    translations.en["contact_privacy_policy"] = "I accept the privacy policy and the processing of my data";
    translations.en["contact_info_title"] = "Contact Information";
    translations.en["contact_info_description"] = "You can contact us through the following means or visit us at our office";
    translations.en["contact_hours_title"] = "Business Hours";
    translations.en["contact_hours"] = "Monday to Friday: 9:00 AM - 6:00 PM";
    translations.en["contact_social_title"] = "Follow us on social media";
    translations.en["faq_title"] = "Frequently Asked Questions";
    translations.en["faq_description"] = "Answers to the most common questions about AquaConecta";
    translations.en["faq_q1"] = "How does AquaConecta work?";
    translations.en["faq_a1"] = "AquaConecta uses IoT sensors installed in water tanks to monitor the quantity and quality of water in real-time. The information is transmitted to our platform, where users can view it through a mobile or web application, receive alerts when the level is low, and request supply when necessary.";
    translations.en["faq_q2"] = "How much does it cost to install AquaConecta?";
    translations.en["faq_a2"] = "The initial cost is S/ 258 per sensor, which includes the device, professional installation, and one month of service. After the first month, the subscription costs S/ 50 per month for each active sensor.";
    translations.en["faq_q3"] = "Does AquaConecta work without internet?";
    translations.en["faq_a3"] = "The sensors require connectivity to transmit data to the platform. However, they can temporarily store information when there is no connection and synchronize it once internet is restored. The mobile application also allows you to view the last synchronized data when you are offline.";
    translations.en["faq_q4"] = "Can I install AquaConecta in any type of tank?";
    translations.en["faq_a4"] = "Our sensors are compatible with most residential and commercial water tanks, including plastic, fiberglass, concrete, and metal tanks. During installation, our technicians will evaluate compatibility and recommend the best solution for your specific case.";
    translations.en["faq_q5"] = "What benefits does AquaConecta have for water providers?";
    translations.en["faq_a5"] = "For providers, AquaConecta offers a management platform that allows remote monitoring of the status of their customers' tanks, efficient planning of distribution routes, automatic prioritization of areas with greater need, and valuable data to optimize their operations and improve customer service.";
    
    // Actualizar el idioma actual
    const currentLang = localStorage.getItem('language') || 'es';
    
    // Si la función updateTexts está disponible, actualizar los textos
    if (typeof updateTexts === 'function') {
        updateTexts(currentLang);
    }
}