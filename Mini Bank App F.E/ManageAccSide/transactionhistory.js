import { getUserByID } from './accountRepository.js';

export function getHistory(user) {
  const buttonElement = document.querySelector('#history');
  console.log(buttonElement);
  buttonElement.addEventListener('click', async () => {
    const userInfo = await getUserByID(user);
    const userTransactions = userInfo.transactions;
    createTransactionTable(userTransactions);
  });
}

function createTransactionTable(userTransactions) {
  const tableElement = document.querySelector('#transactions-history');
  let html = '';
  for (const user of userTransactions) {
    html += `<thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${user.type}</td>
            <td>${user.amount}</td>
            <td>${user.date}</td>
          </tr>
        </tbody>`;
  }
  tableElement.innerHTML = html;
  return html;
}
