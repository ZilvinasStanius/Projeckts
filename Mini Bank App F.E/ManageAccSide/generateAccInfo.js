import { addDeposit } from './deposit.js';
import { getWithdrawl } from './withdrawl.js';
import { deleteRoute } from './delete.js';
import { getHistory } from './transactionhistory.js';
export function createAccInfoTable(user) {
  const divElement = document.querySelector('.profile-box');

  // Generate account details and forms dynamically
  let html = `<ul id="usr-acc">
        <li>Name: ${user.name}</li>
        <li>Last Name: ${user.lastName}</li>
        <li>Age: ${user.age}</li>
        <li>Id: ${user.id}</li>
        <li>Balance: ${user.balance} €</li>
      </ul>
      <form id="deposit">
        <input
          type="number"
          name="amount"
          placeholder="Enter amount"
          min="1"
        />
        <button type="submit">Deposit</button>
      </form>
      <form id="withdrawl">
        <input
          type="number"
          name="amount"
          placeholder="Enter amount"
          min="1"
        />
        <button type="submit">Withdraw</button>
      </form>
       <form id="delete-acc">
        <button type="submit">Delete Account</button>
      </form>
       <button id="history">Check Transactions</button>
             <table id="transactions-history">

      </table>`;

  divElement.innerHTML = html;
  getHistory(user.id);
  attachDepositHandler(user.id);
  takeWithdrawl(user.id);
  deleteAccount(user.id);
  return html;
}

function attachDepositHandler(id) {
  const depositFormElement = document.querySelector('#deposit');

  depositFormElement.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(depositFormElement);
    const amount = Number(formData.get('amount'));

    try {
      const updatedUser = await addDeposit(id, amount);
      createAccInfoTable(updatedUser);
      alert('Deposit was successful!');
    } catch (err) {
      console.error('Error adding deposit:', err);
    }
  });
}

function takeWithdrawl(id) {
  const withdrawalFormElement = document.querySelector('#withdrawl');

  withdrawalFormElement.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(withdrawalFormElement);
    const amount = Number(formData.get('amount'));

    try {
      const updatedUser = await getWithdrawl(id, amount);
      createAccInfoTable(updatedUser);
      alert('Withdrawal was successful!');
    } catch (err) {
      console.error('Error adding deposit:', err);
    }
  });
}

function deleteAccount(id) {
  const formElementForDelete = document.querySelector('#delete-acc');

  formElementForDelete.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      const deletedUser = await deleteRoute(id);
      document.querySelector('.profile-box').innerHTML =
        '<p>Account has been deleted. <a href="//127.0.0.1:5502/">Press here to exit</a></p>';
      //   alert('Account has been deleted');
    } catch (err) {
      console.error('Error trying to delete account');
    }
  });
}
