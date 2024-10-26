function generateHtml(data) {
  const dishContainerElement = document.querySelector('.dish-container');
  let html = '';
  for (const recipe of data) {
    html += `<div class="image-container">
          <img
            src= ${recipe.image}
            alt="dish image"
          />
          <div class="content"></div>
          <ul>
            <li>Dish: ${recipe.name}</li>
            <li>Igridients: ${recipe.ingredients.toString()}</li>
            <li>Cooking time: ${recipe.time} minutes</li>
            <li>Dificulty: ${recipe.difficulty}</li>
          </ul>
          <p>Cooking description: ${recipe.description}</p>
        </div>
      </div>`;
  }
  dishContainerElement.innerHTML = html;
  return html;
}

console.log(recipe.ingredients.toString());
