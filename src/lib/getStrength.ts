export const getStrength = (password: string) => {
  let strength = 0;
  if (/[A-Z]/.test(password)) {
    strength += 1;
  }
  if (/[a-z]/.test(password)) {
    strength += 1;
  }
  if (/\d/.test(password)) {
    strength += 1;
  }
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    strength += 1;
  }
  return strength;
};
