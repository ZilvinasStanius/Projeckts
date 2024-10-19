function getNote(){
    const note = document.querySelector('#noteInput').value;
    

    // note.document.querySelector('#noteInput').value = "";
   
    document.querySelector('#noteInput').value = '';
    return note;
    
}
function saveNote(){
    const noteInfo = getNote();

    const infoArray = localStorage.getItem('Info-list');
    const info = infoArray === null ? []: JSON.parse(infoArray);

    info.push(noteInfo);

    localStorage.setItem('Info-list', JSON.stringify(info))

    console.log(...info)
    const notesListElement = document.querySelector('#notesList');
   
    notesListElement.innerHTML ='';

    info.forEach((info) => {
    notesListElement.innerHTML += `<li>${info}</li>`        
    });

}
function showNotesThatWasSaved(){
    const infoArray = localStorage.getItem('Info-list');
    const info = infoArray === null ? []: JSON.parse(infoArray);
}
showNotesThatWasSaved()



// function addArray(newValue) {
  
//     arr.push(newValue)
//     if(newArr.length >=3){

//     }
// }
// const arr = [];