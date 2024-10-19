function addCar(){
    const carElement = document.querySelector('#make');
    const carYearElement = document.querySelector('#years');
    const carDescriptionElement = document.querySelector('#aprasymas');
    const priceElement = document.querySelector('#price');

    const autos = {
        title : carElement.value,
        years : +carYearElement.value,
        description : carDescriptionElement.value,
        price : +priceElement.value 
    }
    
auto.push(autos);
localStorage.setItem('auto-list', JSON.stringify(auto));
updateList();
}

