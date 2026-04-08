/**
 * Validation utilities for forms and user input
 */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

export const validateMinLength = (value, minLength) => {
  return value && value.length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return value && value.length <= maxLength;
};

export const validatePattern = (value, pattern) => {
  const regex = new RegExp(pattern);
  return regex.test(value);
};

export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const fieldRules = rules[field];
    
    if (fieldRules.required && !validateRequired(value)) {
      errors[field] = fieldRules.requiredMessage || `${field} is required`;
      return;
    }
    
    if (fieldRules.email && !validateEmail(value)) {
      errors[field] = fieldRules.emailMessage || 'Invalid email address';
      return;
    }
    
    if (fieldRules.phone && !validatePhone(value)) {
      errors[field] = fieldRules.phoneMessage || 'Invalid phone number';
      return;
    }
    
    if (fieldRules.url && !validateURL(value)) {
      errors[field] = fieldRules.urlMessage || 'Invalid URL';
      return;
    }
    
    if (fieldRules.minLength && !validateMinLength(value, fieldRules.minLength)) {
      errors[field] = fieldRules.minLengthMessage || `Minimum ${fieldRules.minLength} characters required`;
      return;
    }
    
    if (fieldRules.maxLength && !validateMaxLength(value, fieldRules.maxLength)) {
      errors[field] = fieldRules.maxLengthMessage || `Maximum ${fieldRules.maxLength} characters allowed`;
      return;
    }
    
    if (fieldRules.pattern && !validatePattern(value, fieldRules.pattern)) {
      errors[field] = fieldRules.patternMessage || 'Invalid format';
      return;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
