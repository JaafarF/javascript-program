const EMAIL_PATTERN = '^(.+)@(.+)$';
const PASSWORD_PATTERN =
  '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[?!]).{6,}$';

const validationOptions = [
  {
    attribute: 'required',
    isValid: (input) => input.value.trim() !== '',
    errorMessage: (input, label) => 'This field is required',
  },
  {
    attribute: 'minlength',
    isValid: (input) =>
      input.value && input.value.length >= parseInt(input.minLength, 10),
    errorMessage: (input, label) =>
      `${label.textContent} needs to be at least ${input.minLength} characters`,
  },
  {
    attribute: 'emailPattern',
    isValid: (input) => {
      const patternRegex = new RegExp(EMAIL_PATTERN);
      return patternRegex.test(input.value);
    },
    errorMessage: (input, label) =>
      `Email should be a valid email`,
  },
  {
    attribute: 'passwordPattern',
    isValid: (input) => {
      const patternRegex = new RegExp(PASSWORD_PATTERN);
      return patternRegex.test(input.value);
    },
    errorMessage: (input, label) =>
      `Password should contain 1 uppercase, 1 lowercase, 1 number and the “?” or “!” character`,
  },
  {
    attribute: 'match',
    isValid: (input) => {
      const matchSelector = input.getAttribute('match');
      const matchedElem = document.querySelector(`#${matchSelector}`);
      return matchedElem && matchedElem.value.trim() === input.value.trim();
    },
    errorMessage: (input, label) => {
      const matchSelector = input.getAttribute('match');
      const matchedElem = document.querySelector(`#${matchSelector}`);
      const matchedLabel =
        matchedElem.parentElement.querySelector('label');
      return `${label.textContent} should match ${matchedLabel.textContent}`;
    },
  },
];

const validateFormGroup = (formGroup) => {
  const label = formGroup.querySelector('label');
  const input = formGroup.querySelector('input');
  const errorContainer = formGroup.querySelector('.error');

  let isValid = true;
  for (const option of validationOptions) {
    if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
      errorContainer.textContent = option.errorMessage(input, label);
      input.classList.add('nonvalid');
      input.classList.remove('valid');
      isValid = false;
      break;
    }
  }

  if (isValid) {
    errorContainer.textContent = '';
    input.classList.add('valid');
    input.classList.remove('nonvalid');
  }
  return isValid;
};  
export { EMAIL_PATTERN, PASSWORD_PATTERN, validateFormGroup };
