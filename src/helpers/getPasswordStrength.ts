export const getPasswordStrength = (pass: string): Record<string, boolean> => {
  return {
    hasNumber: /\d/.test(pass),
    hasUppercase: /[A-Z]/.test(pass),
    hasLowercase: /[a-z]/.test(pass),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
  };
};
