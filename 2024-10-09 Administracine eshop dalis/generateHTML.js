function createHtmlProductsTable(products = produktai) {
	let htmlCode = "";
	for (const indeksas in products) {
		const product = products[indeksas];
		htmlCode += `<tr>
        <td>${deleteIcon(indeksas)}</td>
        <td>${product.title}</td>
        <td>${product.description.slice(0, 15)}...</td>
        <td>${product.stock}</td>
        <td>${product.price}€</td>
        <td>${product.brand}</td>
        <td>${product.category}</td>
    </tr>`;
	}
	return htmlCode;
} //Generuojamas HTML kodas. String

function updateHtmlTable(products = produktai) {
	const htmlCode = createHtmlProductsTable(products);
	const tbodyElement = document.getElementById("products-list");
	tbodyElement.innerHTML = htmlCode;
	
}