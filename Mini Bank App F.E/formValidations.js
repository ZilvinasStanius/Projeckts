///TRYING TO MAKE VALIDATION FUNCTION
export function checkFormValidation(formData) {
  const nameValidation = /[^a-zA-Z\s]/.test(formData.get('name'));
  const lastNameValidation = /[^a-zA-Z\s]/.test(formData.get('lastName'));
  const ageValidation = /[a-zA-Z]/.test(formData.get('age'));

  if (nameValidation || lastNameValidation) {
    alert('Cant use numbers or spaces on Name & Last Name');
    return { isValid: false };
  }

  if (ageValidation) {
    alert('Cant use letters on Age');
    return { isValid: false };
  } else {
    return { isValid: true };
  }
}
