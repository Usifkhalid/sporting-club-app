export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export function validateField(
  value: unknown,
  rules: ValidationRule
): string | null {
  // Required validation
  if (rules.required) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return "This field is required";
      }
    } else if (!value || !value.toString().trim()) {
      return "This field is required";
    }
  }

  // Skip other validations if value is empty and not required
  if (Array.isArray(value)) {
    if (value.length === 0) return null;
  } else if (!value || !value.toString().trim()) {
    return null;
  }

  // Min length validation (for strings and arrays)
  if (rules.minLength) {
    if (Array.isArray(value) && value.length < rules.minLength) {
      return `Minimum ${rules.minLength} items required`;
    } else if (typeof value === "string" && value.length < rules.minLength) {
      return `Minimum ${rules.minLength} characters required`;
    }
  }

  // Max length validation (for strings and arrays)
  if (rules.maxLength) {
    if (Array.isArray(value) && value.length > rules.maxLength) {
      return `Maximum ${rules.maxLength} items allowed`;
    } else if (typeof value === "string" && value.length > rules.maxLength) {
      return `Maximum ${rules.maxLength} characters allowed`;
    }
  }

  // Pattern validation (for strings only)
  if (
    rules.pattern &&
    typeof value === "string" &&
    !rules.pattern.test(value)
  ) {
    return "Invalid format";
  }

  // Custom validation
  if (rules.custom) {
    return rules.custom(value);
  }

  return null;
}

export function validateForm(
  formData: Record<string, unknown>,
  rules: ValidationRules
): Record<string, string> {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach((field) => {
    const value = formData[field];
    const error = validateField(value, rules[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
}

// Common validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  price: /^\d+(\.\d{1,2})?$/,
  capacity: /^\d+$/,
};

// Common validation rules
export const COMMON_RULES = {
  required: { required: true },
  email: {
    required: true,
    pattern: VALIDATION_PATTERNS.email,
    custom: (value: unknown) => {
      if (typeof value !== "string" || !VALIDATION_PATTERNS.email.test(value)) {
        return "Please enter a valid email address";
      }
      return null;
    },
  },
  phone: {
    required: true,
    pattern: VALIDATION_PATTERNS.phone,
    custom: (value: unknown) => {
      if (
        typeof value !== "string" ||
        !VALIDATION_PATTERNS.phone.test(value.replace(/[\s\-\(\)]/g, ""))
      ) {
        return "Please enter a valid phone number";
      }
      return null;
    },
  },
  price: {
    required: true,
    pattern: VALIDATION_PATTERNS.price,
    custom: (value: unknown) => {
      const num = parseFloat(String(value));
      if (isNaN(num) || num <= 0) {
        return "Please enter a valid price greater than 0";
      }
      return null;
    },
  },
  capacity: {
    required: true,
    pattern: VALIDATION_PATTERNS.capacity,
    custom: (value: unknown) => {
      const num = parseInt(String(value));
      if (isNaN(num) || num <= 0) {
        return "Please enter a valid capacity greater than 0";
      }
      return null;
    },
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  description: {
    required: true,
    minLength: 10,
    maxLength: 500,
  },
};
