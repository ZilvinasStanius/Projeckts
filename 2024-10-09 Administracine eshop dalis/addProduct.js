function addProduct() {
    const produktoElementas = document.querySelector('#produktas');
    const aprasymoElementas = document.querySelector('#aprasymas');
    const prekesKainosElementas = document.querySelector('#kaina');
    const nuolaidosElementas = document.querySelector('#nuolaida');
    const likucioElementas = document.querySelector('#likutis');
    const brandElementas = document.querySelector('#brand');
    const kategorijosElementas = document.querySelector('#category');

    const produktas = {
        title: produktoElementas.value,
        description: aprasymoElementas.value,
        price: +prekesKainosElementas.value,
        discount: +nuolaidosElementas.value,
        stock: +likucioElementas.value,
        brand: brandElementas.value,
        category: kategorijosElementas.value
    }
produktai.push(produktas);
localStorage.setItem('Perkiu-list', JSON.stringify(produktai));
updateHtmlTable();
}
