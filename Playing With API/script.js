async function getDataFromApi() {
  const promise = await fetch('/recipe.json');
  const response = await promise.json();

  return response;
}

async function main() {
  const api = await getDataFromApi();
  const recipe = api.recipes;
  const igridients = [];
  recipe.map((igridient) => {
    igridients.push(...igridient.ingredients);
  });
  //   console.log(igridients);
  fillOptionList(igridients);
  //   generateHtml(recipe);\
  filterDishByCategory(recipe);
}

main();
