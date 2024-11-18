import { checkFormValidation } from './formValidations.js';
import { createBankAcc } from './repository.js';
import { createResultHtml } from './generateResultHtml.js';
// const test = checkFormValidation();
// console.log(test);
const formElement = document.querySelector('#create-acc');
formElement.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(formElement);
  const test = checkFormValidation(formData);

  if (!test.isValid) return console.error('Error: Entered wrong data');

  const user = {
    name: formData.get('name'),
    lastName: formData.get('lastName'),
    age: formData.get('age'),
  };

  try {
    const result = await createBankAcc(user);
    alert('acc created');
    createResultHtml(result);
    formElement.reset();
  } catch (err) {
    console.error(`Error creating account:`, err);
  }
});
