const autoJSON = localStorage.getItem('auto-list');
const auto = autoJSON === null ? [] : JSON.parse(autoJSON);


updateList()