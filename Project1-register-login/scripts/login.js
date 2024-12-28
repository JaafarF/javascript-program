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
  clearGlobalError();
  if (!validateFormGroup(emailFormGroup) || !validateFormGroup(passwordFormGroup)) {
    return;
  }
  const user = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  if (!existUserByEmail(user)) {
    setGlobalError('Email or password incorrect');
    return;
  } 
  handleLogin(user);
}

function handleLogin(user) {
  clearGlobalError();
  if (isUserAccountLocked(user)) {
    setGlobalError('Your account is locked out, try again later');
    return;
  }
  if (isCorrectPassword(user)) {
    successfulLogin(user);
  } else {
    handleFailedLogin(user);
  }
}

function successfulLogin(user) {
  resetLoginCounter(user);
  notification.textContent = 'Login successful !';
  loginButton.disabled = true;
  setTimeout(() => {
    notification.textContent = '';
    window.location.href = 'users.html';
  }, 5000);
}

function handleFailedLogin(user) {
  setGlobalError('Email or password incorrect');
  const loginAttempts = incrementLoginCounter(user);
  if (loginAttempts >= 3) {
    lockUserAccount(user);
    resetLoginCounter(user);
    setGlobalError('Your account is locked out, try again in 1 minute');
  }
}

function clearGlobalError() {
  gloablerror.textContent = '';
}

function setGlobalError(message) {
  gloablerror.textContent = message;
}
