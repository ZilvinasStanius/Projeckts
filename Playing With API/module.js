//Add event listener on each image from recipes
const modalElement = document.querySelector('.modal-overlay');
function getAllImages(recipes) {
  //   console.log(`recipe:`, recipes);

  const imagesElement = document.querySelectorAll('.img-div');
  //   console.log(imagesElement);
  imagesElement.forEach((img) =>
    img.addEventListener('click', (event) => {
      // We taking the curent image atributes data-id value
      const idOfRecipe = +event.currentTarget.getAttribute('data-id');
      //   console.log(typeof idOfRecipe);
      const filteredRecipe = recipes.find((recipe) => recipe.id === idOfRecipe);
      console.log(filteredRecipe);
      modalElement.style.setProperty('display', 'flex');
      generateRecipeModule(filteredRecipe);
      closeModule();
    })
  );
}

function generateRecipeModule(data) {
  return (modalElement.innerHTML = `<div class="modal-card">
          <img
            src=${data.image}
            alt="Dish Image"
          />
          <div class="content">
            <h2>Dish Name: ${data.name}</h2>
            <p>Ingredients: ${data.ingredients.join(', ')}</p>
            <p>Cooking Time: ${data.time}</p>
            <p>Difficulty: ${data.difficulty}</p>
            <button class="close-btn">Close</button>
          </div>
        </div>`);
}

function closeModule() {
  const btnELmentas = document.querySelector('.close-btn');
  btnELmentas.addEventListener('click', () => {
    modalElement.style.setProperty('display', 'none');
  });
}
