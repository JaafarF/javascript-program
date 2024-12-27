import { describe, expect, it } from 'vitest';
import { PASSWORD_PATTERN } from '../scripts/validation.js';

describe('Password Format validation', () => {
  const patternRegex = new RegExp(PASSWORD_PATTERN);

  it('password not valid: less than 6 characters', () => {
    const password = 'Pw2!';
    expect(patternRegex.test(password)).toBe(false);
  });

  it('Password valid with !', () => {
    const password = 'Password2!';
    expect(patternRegex.test(password)).toBe(true);
  });

  it('Password valid with ?', () => {
    const password = 'Password2?';
    expect(patternRegex.test(password)).toBe(true);
  });

  it('password not valid: does not contain uppercase', () => {
    const password = 'password2!';
    expect(patternRegex.test(password)).toBe(false);
  });

  it('password not valid: does not contain lowercase', () => {
    const password = 'PASSWORD2!';
    expect(patternRegex.test(password)).toBe(false);
  });

  it('password not valid: does not contain a number', () => {
    const password = 'Password!';
    expect(patternRegex.test(password)).toBe(false);
  });

  it('password not valid: does not contain ! or ?', () => {
    const password = 'Password2';
    expect(patternRegex.test(password)).toBe(false);
  });
});
