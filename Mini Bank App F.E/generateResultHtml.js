export function createResultHtml(user) {
  const divElement = document.querySelector('.result');
  let html = `<h3>Congrats<i> ${user.name} ${user.lastName}!</i> Your account has been created. Your id number: ${user.id}\nYou can manage your account by clicking <a href="./ManageAccSide/manageAcc.html"
        ><button>Manage Account</button></a
      >`;
  divElement.innerHTML = html;
  return html;
}
