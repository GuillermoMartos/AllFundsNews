const isPasswordValid = (password: string) => {
  return (
    password.trim().length >= 6 &&
    /[a-zA-Z]/.test(password.trim()) &&
    /\d/.test(password.trim())
  );
};
const isEmailValid = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

export const userFormValidator = {
  isPasswordValid,
  isEmailValid,
};
