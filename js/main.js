// =============================================
// SCRIPT PRINCIPAL DU PORTFOLIO
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des modules
    initLoader();
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initContactForm();
    initSmoothScrolling();
    initThemeToggle();
    
    // Affichage du contenu après le chargement
    setTimeout(() => {
        hideLoader();
    }, 1500);
});

// =============================================
// LOADER
// =============================================

function initLoader() {
    const loader = document.getElementById('loader');
    
    // Animation du texte de chargement
    const loadingTexts = [
        'Chargement du portfolio...',
        'Préparation de l\'interface...',
        'Finalisation...'
    ];
    
    let currentTextIndex = 0;
    const loadingTextElement = loader.querySelector('p');
    
    const textInterval = setInterval(() => {
        currentTextIndex = (currentTextIndex + 1) % loadingTexts.length;
        loadingTextElement.textContent = loadingTexts[currentTextIndex];
    }, 500);
    
    // Arrêter l'animation du texte quand le loader disparaît
    setTimeout(() => {
        clearInterval(textInterval);
    }, 1500);
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hidden');
        
        // Supprimer le loader du DOM après l'animation
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 500);
    }
}

// =============================================
// NAVIGATION
// =============================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar || !hamburger || !navMenu) return;
    
    // Navigation collante
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Mise à jour du lien actif
        updateActiveNavLink();
    });
    
    // Menu hamburger (mobile)
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fermer le menu mobile lors du clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Fermer le menu mobile lors du clic à l'extérieur
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSection) {
            link.classList.add('active');
        }
    });
}

// =============================================
// EFFET DE FRAPPE
// =============================================

function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const roles = [
        'Ingénieur en Informatique',
        'Passionné de technologie',
        'Développeur Full Stack',
        'Développeur Frontend',
        'Développeur Backend'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeRole() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            // Pause avant de commencer à effacer
            setTimeout(() => {
                isDeleting = true;
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
        
        setTimeout(typeRole, typingSpeed);
    }
    
    // Démarrer l'effet de frappe
    setTimeout(typeRole, 1000);
}

// =============================================
// ANIMATIONS AU SCROLL
// =============================================

function initScrollAnimations() {
    // Observer pour les animations d'apparition
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animations spéciales pour les sections
                if (entry.target.classList.contains('about')) {
                    animateStats();
                }
                
                if (entry.target.classList.contains('skills')) {
                    setTimeout(() => {
                        animateSkillBars();
                    }, 300);
                }
            }
        });
    }, observerOptions);
    
    // Observer les éléments
    const animatedElements = document.querySelectorAll('.skill-item, .timeline-item, .project-card, section');
    animatedElements.forEach(el => observer.observe(el));
}

// =============================================
// ANIMATION DES STATISTIQUES
// =============================================

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        if (isNaN(target)) return;
        
        const increment = target / 50;
        let current = 0;
        
        const updateStat = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                requestAnimationFrame(updateStat);
            } else {
                stat.textContent = target;
            }
        };
        
        updateStat();
    });
}

// =============================================
// ANIMATION DES BARRES DE COMPÉTENCES
// =============================================

function animateSkillBars() {
    const skillProgresses = document.querySelectorAll('.skill-progress');
    
    skillProgresses.forEach((progress, index) => {
        const targetWidth = progress.getAttribute('data-width');
        if (!targetWidth) return;
        
        // Délai échelonné pour un effet cascade
        setTimeout(() => {
            // Ajout de la classe d'animation
            progress.classList.add('animate');
            
            // Animation de la largeur
            progress.style.width = targetWidth + '%';
            
            // Compteur numérique pour le pourcentage
            animatePercentageCounter(progress, targetWidth);
            
        }, index * 150); // Délai de 150ms entre chaque barre
    });
}

function animatePercentageCounter(progressBar, targetValue) {
    const skillItem = progressBar.closest('.skill-item');
    const percentageElement = skillItem ? skillItem.querySelector('.skill-percentage') : null;
    
    if (!percentageElement) return;
    
    let currentValue = 0;
    const increment = targetValue / 60; // 60 frames pour 1 seconde à 60fps
    const duration = 2000; // 2 secondes
    const intervalTime = duration / 60;
    
    const counter = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(counter);
            
            // Effet de "pop" à la fin
            percentageElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                percentageElement.style.transform = 'scale(1)';
            }, 200);
        }
        
        percentageElement.textContent = Math.round(currentValue) + '%';
    }, intervalTime);
}

// =============================================
// SCROLL FLUIDE
// =============================================

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Hauteur de la navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =============================================
// FORMULAIRE DE CONTACT
// =============================================

function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulation d'envoi
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            button.disabled = true;
            
            // Simulation du temps d'envoi
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
                button.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
                
                // Reset du formulaire
                setTimeout(() => {
                    form.reset();
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.style.background = '';
                }, 3000);
            }, 2000);
        });
        
        // Animation des labels flottants
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value.trim()) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

// =============================================
// UTILITAIRES
// =============================================

// Fonction pour détecter si l'utilisateur préfère les animations réduites
function respectsReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Désactiver les animations si l'utilisateur préfère
if (respectsReducedMotion()) {
    document.body.classList.add('reduce-motion');
}

// Throttle pour les événements de scroll
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Application du throttle aux événements de scroll
const throttledScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScrollHandler);

// =============================================
// GESTION DES ERREURS
// =============================================

window.addEventListener('error', (e) => {
    console.error('Erreur JavaScript:', e.error);
});

// =============================================
// CHANGEMENT DE THÈME
// =============================================

function initThemeToggle() {
    console.log('Tentative d\'initialisation du theme toggle...');
    
    // Attendre que tous les éléments soient chargés
    setTimeout(() => {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const body = document.body;
        
        console.log('themeToggle:', themeToggle);
        console.log('themeIcon:', themeIcon);
        
        // Vérifier si les éléments existent
        if (!themeToggle || !themeIcon) {
            console.error('Éléments theme-toggle ou theme-icon non trouvés');
            return;
        }
        
        console.log('Theme toggle initialisé avec succès!');
        
        // Vérifier le thème sauvegardé dans localStorage
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        
        // Événement de clic sur le bouton
        themeToggle.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            console.log('🌙 CLIC sur theme toggle détecté!');
            
            const currentTheme = body.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            console.log('🔄 Changement de thème:', currentTheme, '->', newTheme);
            
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
        
        function setTheme(theme) {
            console.log('🎨 Application du thème:', theme);
            body.setAttribute('data-theme', theme);
            console.log('📋 Attribut data-theme défini sur:', body.getAttribute('data-theme'));
            
            // Changer l'icône
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-sun';
                console.log('☀️ Icône changée vers soleil');
            } else {
                themeIcon.className = 'fas fa-moon';
                console.log('🌙 Icône changée vers lune');
            }
            
            // Animation de transition
            themeToggle.style.transform = 'scale(0.8)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);
        }
    }, 500); // Délai pour s'assurer que le DOM est prêt
}

// =============================================
// INITIALISATIONS FINALES
// =============================================

// Marquer les éléments skill comme visibles avec délai
setTimeout(() => {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 100);
    });
}, 2000);