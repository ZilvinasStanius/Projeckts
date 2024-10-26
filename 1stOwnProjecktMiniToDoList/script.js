////Gauti reikšmes iš inputo:
const taskListJSON = localStorage.getItem('taskList');
const taskList = taskListJSON === null ? [] : JSON.parse(taskListJSON);

function getTaskFromInput() {
  const inputElement = document.querySelector('.task');
  const tasks = inputElement.value;
  const ulElement = document.querySelector('.tasks');
  for (let i = 0; i < tasks.length; i++) {
    ulElement.innerHTML = `<li>${tasks}</li>`;
  }
   localStorage.setItem('taskList', JSON.stringify(tasks))
}

///Bandom atvaizduoti
