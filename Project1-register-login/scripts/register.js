import { validateFormGroup } from '../scripts/validation.js';

// Global errors div
const gloablerror = document.querySelector('#gloablerror');

// Form element
const registrationForm = document.querySelector('#registrationForm');
registrationForm.setAttribute('novalidate', '');
registrationForm.addEventListener('submit', onRegisterButtonClick);

// Email formGroup
const emailFormGroup = registrationForm.querySelector('.emailFormGroup');
const emailInput = emailFormGroup.querySelector('input');
emailInput.addEventListener('blur', (event) => {
  validateFormGroup(emailFormGroup);
});

// Password formGroup
const passwordFormGroup = registrationForm.querySelector('.passwordFormGroup');
const passwordInput = passwordFormGroup.querySelector('input');
passwordInput.addEventListener('blur', (event) => {
  validateFormGroup(passwordFormGroup);
});

// Confirm Password formGroup
const confirmPasswordFormGroup = registrationForm.querySelector('.confirmPasswordFormGroup');
const confirmPasswordInput = confirmPasswordFormGroup.querySelector('input');
confirmPasswordInput.addEventListener('blur', (event) => {
  validateFormGroup(confirmPasswordFormGroup);
});

function onRegisterButtonClick(event) {
  event.preventDefault();
  const isEmailValid = validateFormGroup(emailFormGroup);
  const isPasswordValid = validateFormGroup(passwordFormGroup);
  const isConfirmPasswordValid = validateFormGroup(confirmPasswordFormGroup);

  if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
    const user = {
      "email": emailInput.value,
      "password": passwordInput.value,
      "confirmPassword": confirmPasswordInput.value,
    };
    // call registration
  }
}