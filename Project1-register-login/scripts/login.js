import { validateFormGroup } from '../scripts/validation.js';
import {
  existUserByEmail,
  isCorrectPassword,
  incrementLoginCounter,
  lockUserAccount,
  isUserAccountLocked,
  resetLoginCounter,
} from './userDB.js';

// Global errors div
const gloablerror = document.querySelector('#gloablerror');

// Notification errors div
const notification = document.querySelector('#notification');

// Login Button
const loginButton = document.querySelector('#loginButton');

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
  gloablerror.textContent = '';
  const isEmailValid = validateFormGroup(emailFormGroup);
  const isPasswordValid = validateFormGroup(passwordFormGroup);

  if (isEmailValid && isPasswordValid) {
    const user = {
      email: emailInput.value,
      password: passwordInput.value,
    };
    if (!existUserByEmail(user)) {
      gloablerror.textContent = 'Email or password incorrect';
    } else {
      loginUser(user);
    }
  }
}

function loginUser(user) {
  gloablerror.textContent = '';
  if (isUserAccountLocked(user)) {
    gloablerror.textContent =
      'Your account is locked out, try again later';
  } else {
    if (isCorrectPassword(user)) {
      successfulLogin();
    } else {
      gloablerror.textContent = 'Email or password incorrect';
      const loginCounter = incrementLoginCounter(user);
      if (loginCounter == 3) {
        gloablerror.textContent =
      'Your account is locked out, try again in 1 minute';
        resetLoginCounter(user);
        lockUserAccount(user)
      }
    }
  }
}

function successfulLogin() {
  notification.textContent = 'Login successful !';
  loginButton.disabled = true;
  setTimeout(() => {
    notification.textContent = '';
    window.location.href = 'users.html';
  }, 5000);
}
