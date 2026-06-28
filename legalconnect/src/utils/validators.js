// src/utils/validators.js
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateRegistration = (data) => {
  const errors = {};
  if (!validateRequired(data.fullName)) errors.fullName = "Full name is required";
  if (!validateEmail(data.email)) errors.email = "Valid email is required";
  if (!validatePassword(data.password)) errors.password = "Password must be at least 6 characters";
  if (data.password !== data.confirmPassword) errors.confirmPassword = "Passwords do not match";
  if (data.role === "lawyer") {
    if (!validateRequired(data.specialization)) errors.specialization = "Specialization is required";
    if (!validateRequired(data.barNumber)) errors.barNumber = "Bar number is required";
    if (!validateRequired(data.location)) errors.location = "Location is required";
  }
  return errors;
};

export const validateLogin = (data) => {
  const errors = {};
  if (!validateEmail(data.email)) errors.email = "Valid email is required";
  if (!validateRequired(data.password)) errors.password = "Password is required";
  return errors;
};

export const validateContact = (data) => {
  const errors = {};
  if (!validateRequired(data.name)) errors.name = "Name is required";
  if (!validateEmail(data.email)) errors.email = "Valid email is required";
  if (!validateRequired(data.subject)) errors.subject = "Subject is required";
  if (!validateRequired(data.message)) errors.message = "Message is required";
  return errors;
};
