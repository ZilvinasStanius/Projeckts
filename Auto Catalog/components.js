function deleteIcon(index) {
	return `<span
			class="icon icon-red"
			title="Pašalinti produktą"
            onclick="deleteProduct(${index})"
		>
			<i class="bi bi-trash-fill"></i>
		</span>`;
}

function deleteProduct(index) {
	const confirmation = confirm("Ar tikrai norite pašalinti šį produktą?");
	//true/false
	if (confirmation) {
		// Iš masyvo šalinamas 1 elementas pradedant nuo index pozicijos
		auto.splice(index, 1);
        
		updateList();
		localStorage.setItem("auto-list", JSON.stringify(auto));
	}
}
