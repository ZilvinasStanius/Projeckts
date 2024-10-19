function deleteProduct(index) {
	// Iš masyvo šalinamas 1 elementas pradedant nuo index pozicijos
	produktai.splice(index, 1);
	updateHtmlTable();
	localStorage.setItem("produktai", JSON.stringify(produktai));
}