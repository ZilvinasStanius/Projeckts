import { createAccInfoTable } from './generateAccInfo.js';
import { getUserByID } from './accountRepository.js';
import { addDeposit } from './deposit.js';

const formElement = document.querySelector('#manage-acc');

formElement.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(formElement);

  const id = formData.get('id');
  if (!id) alert('Id not defined');
  console.log(id);

  try {
    const userId = await getUserByID(id);
    if (!userId) {
      alert('User not found');
    } else {
      createAccInfoTable(userId);
    }
  } catch (err) {
    console.error(`Error creating account:`, err);
  }
});
