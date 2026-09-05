const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Update button state during transmission
    submitBtn.innerText = 'Sending...';
    submitBtn.disabled = true;

    const templateParams = {
      from_name: document.getElementById('formName').value,
      from_email: document.getElementById('formEmail').value,
      subject: document.getElementById('formSubject').value,
      message: document.getElementById('formMessage').value
    };

    // Replace SERVICE_ID and TEMPLATE_ID with your specific EmailJS credentials
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
      .then(function(response) {
        formStatus.textContent = 'Message sent successfully!';
        formStatus.style.color = '#28a745';
        formStatus.style.display = 'block';
        contactForm.reset();
        submitBtn.innerText = 'Send Message';
        submitBtn.disabled = false;
      }, function(error) {
        formStatus.textContent = 'Failed to send message. Please try again.';
        formStatus.style.color = '#dc3545';
        formStatus.style.display = 'block';
        submitBtn.innerText = 'Send Message';
        submitBtn.disabled = false;
      });
  });
}