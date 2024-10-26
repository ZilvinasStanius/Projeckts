function fillOptionList(data) {
  const optionElement = document.querySelector('#dish');
  //   console.log(dish);
  let optionList = '';
  for (let index in data) {
    optionList += ` <option>${data[index].toUpperCase()}</option>`;
  }
  optionElement.innerHTML = optionList;
  return optionList;
}
// console.log(data[index]);
