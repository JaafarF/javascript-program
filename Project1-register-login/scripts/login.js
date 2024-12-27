import { validateFormGroup } from '../scripts/validation.js';
import { existUserByEmail, isCorrectPassword } from './userDB.js';

// Global errors div
const gloablerror = document.querySelector('#gloablerror');

// Notification errors div
const notification = document.querySelector('#notification');

// Form element
const loginForm = document.querySelector('#loginForm');
loginForm.setAttribute('novalidate', '');
loginForm.addEventListener('submit', onLoginButtonClick);

// Email formGroup
const emailFormGroup = loginForm.querySelector('.emailFormGroup');
const emailInput = emailFormGroup.querySelector('input');
emailInput.addEventListener('blur', (event) => {
  validateFormGroup(emailFormGroup);
});

// Password formGroup
const passwordFormGroup = loginForm.querySelector('.passwordFormGroup');
const passwordInput = passwordFormGroup.querySelector('input');
passwordInput.addEventListener('blur', (event) => {
  validateFormGroup(passwordFormGroup);
});

function onLoginButtonClick(event) {
  event.preventDefault();
  const isEmailValid = validateFormGroup(emailFormGroup);
  const isPasswordValid = validateFormGroup(passwordFormGroup);

  if (isEmailValid && isPasswordValid) {
    const user = {
      "email": emailInput.value,
      "password": passwordInput.value,
    };
    loginUser(user);
  }
}

function loginUser(user) {
  gloablerror.textContent = ''
  if (existUserByEmail(user) && isCorrectPassword(user)) {
    notification.textContent = 'Login successful !'
    setTimeout(() => {
      notification.textContent = ''
      // redirect
    }, 5000)
  } else {
    gloablerror.textContent = 'Email or password incorrect'
  }
}
