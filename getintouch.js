// Ensure EmailJS SDK is loaded in your HTML head:
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>

(function () {
  "use strict";

  // 1. Initialize EmailJS with your Public Key
  emailjs.init("YOUR_PUBLIC_KEY");

  const form = document.querySelector('.php-email-form');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const loadingMsg = form.querySelector('.loading');
      const errorMsg = form.querySelector('.error-message');
      const sentMsg = form.querySelector('.sent-message');

      // Reset feedback messages
      if (loadingMsg) loadingMsg.style.display = 'block';
      if (errorMsg) errorMsg.style.display = 'none';
      if (sentMsg) sentMsg.style.display = 'none';

      // 2. Map form fields to template parameters (matching the PHP logic)
      const templateParams = {
        from_name: form.querySelector('input[name="name"]').value,
        from_email: form.querySelector('input[name="email"]').value,
        subject: form.querySelector('input[name="subject"]').value,
        phone: form.querySelector('input[name="phone"]') ? form.querySelector('input[name="phone"]').value : 'N/A',
        message: form.querySelector('textarea[name="message"]').value,
        to_email: 'karuppiahsuriya001@gmail.com'
      };

      // 3. Dispatch email
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function (response) {
          if (loadingMsg) loadingMsg.style.display = 'none';
          if (sentMsg) sentMsg.style.display = 'block';
          form.reset();
        })
        .catch(function (error) {
          if (loadingMsg) loadingMsg.style.display = 'none';
          if (errorMsg) {
            errorMsg.innerHTML = 'Form submission failed: ' + JSON.stringify(error);
            errorMsg.style.display = 'block';
          }
        });
    });
  }
})();