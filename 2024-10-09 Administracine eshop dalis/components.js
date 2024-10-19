function deleteIcon(index) {
	return `<span
			class="icon"
			title="Pašalinti produktą"
            onclick="deleteProduct(${index})"
		>
			<i class="bi bi-x"></i>
		</span>`;
}