function createHtmlCarTable(autos = auto){
    let htmlCode = '';
    autos.map((value, index) => {
       
        htmlCode += `<tr>
        <td>${deleteIcon(index)}</td>
         <td>${value.title}</td>
         <td>${value.years}</td>
        <td>${value.description}</td>
         <td>${value.price}</td>
         </tr>`
         
    }) 
  
    return htmlCode;
}

