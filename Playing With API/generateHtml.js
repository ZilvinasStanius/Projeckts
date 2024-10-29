function generateHtml(data, selectedIngridients) {
  const dishContainerElement = document.querySelector('.dish-container');
  let html = '';
  for (const recipe of data) {
    const igridientai = recipe.ingredients.map((ingridientas) =>
      ingridientas === selectedIngridients
        ? `<b>${ingridientas}</b>`
        : ingridientas
    );
    html += `<div class="image-container">
          <div class = img-div  data-id="${recipe.id}"><img
            src= ${recipe.image}
            alt="dish image"
          /></div>
          <div class="content"></div>
          <ul>
            <li>Dish: ${recipe.name}</li>
            <li>Igridients: ${igridientai.join(', ')}</li>
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
