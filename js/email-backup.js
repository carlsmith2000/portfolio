// Solution EmailJS pour garantir la réception des emails
// Backup au cas où Formspree ne fonctionne pas

document.addEventListener('DOMContentLoaded', function() {
    // Configuration EmailJS
    const EMAILJS_SERVICE_ID = 'service_portfolio'; // À remplacer
    const EMAILJS_TEMPLATE_ID = 'template_portfolio'; // À remplacer
    const EMAILJS_PUBLIC_KEY = 'VOTRE_CLE_PUBLIQUE'; // À remplacer
    
    // Initialiser EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    const form = document.getElementById('contact-form');
    
    if (form) {
        // Intercepter la soumission pour double envoi
        form.addEventListener('submit', function(e) {
            // Laisser Formspree traiter normalement
            console.log('📧 Envoi via Formspree...');
            
            // Également envoyer via EmailJS comme backup
            sendEmailBackup();
        });
    }
    
    function sendEmailBackup() {
        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            to_email: 'carlsmithetienne2000@gmail.com'
        };
        
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function(response) {
                console.log('✅ Backup EmailJS envoyé:', response);
            }, function(error) {
                console.log('❌ Erreur backup EmailJS:', error);
            });
    }
});

// Instructions d'installation EmailJS
console.log(`
📧 CONFIGURATION EMAILJS (Solution Backup):

1. Allez sur emailjs.com
2. Créez un compte gratuit
3. Créez un service email (Gmail)
4. Créez un template avec ces variables:
   - {{from_name}}
   - {{from_email}}
   - {{subject}}
   - {{message}}
   - {{to_email}}
5. Remplacez les IDs dans ce fichier
6. Ajoutez ce script dans votre HTML

Avantages:
- 200 emails gratuits/mois
- Envoi direct depuis le navigateur
- Pas de serveur nécessaire
- Fonctionne avec GitHub Pages
`);