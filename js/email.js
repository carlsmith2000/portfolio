// Configuration EmailJS pour formulaire de contact
// Alternative à Formspree pour GitHub Pages

(function() {
    emailjs.init("VOTRE_PUBLIC_KEY"); // Remplacez par votre clé EmailJS
})();

// Gestionnaire de formulaire avec EmailJS
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Afficher un indicateur de chargement
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;
            
            // Paramètres EmailJS
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                to_email: 'carlsmithetienne2000@gmail.com'
            };
            
            // Envoyer l'email via EmailJS
            emailjs.send('VOTRE_SERVICE_ID', 'VOTRE_TEMPLATE_ID', templateParams)
                .then(function(response) {
                    console.log('Email envoyé avec succès!', response);
                    
                    // Rediriger vers la page de remerciement
                    window.location.href = 'thank-you.html';
                    
                }, function(error) {
                    console.error('Erreur lors de l\'envoi:', error);
                    
                    // Afficher un message d'erreur
                    alert('Erreur lors de l\'envoi du message. Veuillez réessayer ou me contacter directement à carlsmithetienne2000@gmail.com');
                    
                    // Restaurer le bouton
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
});