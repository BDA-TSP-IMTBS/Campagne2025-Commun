const latestTimeClicks = {};
const inputShown = {};

let increment = 0;

function registerButtonWithForm(buttonId, newButtonText, inputId, formId) {
    const button = document.getElementById(buttonId);
    const input = document.getElementById(inputId);
    const form = document.getElementById(formId);

    if (!button) {
        return;
    }
    let id = increment;
    button.onclick = () => {
        if (Date.now() - latestTimeClicks[id] < 500) {
            return;
        }
        latestTimeClicks[id] -= 1;

        if (!inputShown[id]) {
            inputShown[id] = true;
            input.hidden = false;
            button.innerHTML = newButtonText;
        } else {
            form.submit();
        }
    };

    latestTimeClicks[id] = 0;
    inputShown[id] = false;

    increment++;
}

registerButtonWithForm("add-text-button", "Créer le texte", "text", "create-text-form");
registerButtonWithForm("add-link-button", "Créer le lien", "link", "create-link-form");
registerButtonWithForm("add-image-button", "Créer l'image", "image_link", "create-image-form");
