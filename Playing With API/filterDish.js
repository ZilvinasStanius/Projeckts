const selecteris = document.querySelector('#dish');
const result = document.querySelector('.testing');
const buttonElement = document.querySelector('.btn');

function filterDishByCategory(dishes) {
  selecteris.addEventListener('change', (event) => {
    const optionValue = event.target.value.toLowerCase();

    const filtered = dishes.filter((dish) =>
      dish.ingredients.includes(optionValue)
    );

    buttonElement.addEventListener('click', () => {
      generateHtml(filtered, optionValue);
      getAllImages(filtered);
    });
  });
}
