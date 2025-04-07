const addButtonButton = document.getElementById("add-button");
const buttonNameInput = document.getElementById("button-name");
const form = document.getElementById("create-button-form");

let inputShown = false;
let latestTimeClick = 0;

if (addButtonButton) {
  addButtonButton.onclick = () => {
    // To avoid missclick
    if (Date.now() - latestTimeClick < 1000) {
      return;
    }
    latestTimeClick = Date.now();

    if (!inputShown) {
      inputShown = true;
      buttonNameInput.hidden = false;
      addButtonButton.innerHTML = "Créer le bouton";
    } else {
      form.submit();
    }
  };
}
