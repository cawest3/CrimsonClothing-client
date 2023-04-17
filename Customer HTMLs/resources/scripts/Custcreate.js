document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const signInLink = document.querySelector('a[href="#"]');
    const usernameInput = document.querySelector('input[placeholder="Username"]');
    const firstNameInput = document.querySelector('input[placeholder="First name"]');
    const lastNameInput = document.querySelector('input[placeholder="Last name"]');
    const emailInput = document.querySelector('input[placeholder="Email"]');
    const createAccountButton = document.querySelector('.proceed button');
    const termsCheckbox = document.querySelector('#flexCheckDefault');
  
    signInLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Redirect to the login page
        window.location.href = './login.html';
      });
      
      createAccountButton.addEventListener('click', (e) => {
        e.preventDefault();
      
        if (validateForm()) {
          // Submit the form or send the data to the server
          console.log('Form submitted');
          
          // Redirect to the desired page after successful submission
          window.location.href = "./login.html";
        } else {
          console.log('Form validation failed');
        }
      });
      
    function validateForm() {
      const username = usernameInput.value.trim();
      const firstName = firstNameInput.value.trim();
      const lastName = lastNameInput.value.trim();
      const email = emailInput.value.trim();
      const termsAccepted = termsCheckbox.checked;
  
      if (!username || !firstName || !lastName || !email || !termsAccepted) {
        alert('Please fill in all fields and accept the terms of service.');
        return false;
      }
  
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
      }
  
      return true;
    }
  });