export function createCardModal(title, content) {
  const modal = document.querySelector("#card-modal");
  const contentContainer = createContainer();
  const closeButton = createCloseButton();
  const form = createForm(title, content);
  const saveButton = createSaveButton();

  closeButton.addEventListener("click", () => {
    contentContainer.remove();
  });

  contentContainer.appendChild(closeButton);
  form.appendChild(saveButton);
  contentContainer.appendChild(form);
  modal.appendChild(contentContainer);
  modal.style.display = "flex";
}

function createContainer() {
  const contentContainer = document.createElement("div");
  contentContainer.classList.add("modal__content");
  return contentContainer;
}

function createCloseButton() {
  const button = document.createElement("img");
  button.classList.add("close-button");
  button.setAttribute("src", "assets/icons/close.svg");
  button.setAttribute("alt", "fechar");
  return button;
}

function createForm(title, content) {
  const form = document.createElement("form");
  form.classList.add("modal__form");

  const formContainer = document.createElement("div");
  formContainer.classList.add("modal__form-container");

  const modalTitle = document.createElement("span");
  modalTitle.classList.add("modal__form-title");
  modalTitle.textContent = title;

  const modalContent = document.createElement("div");
  modalContent.innerHTML = content;

  formContainer.appendChild(modalTitle);
  formContainer.appendChild(modalContent);

  form.appendChild(formContainer);

  return form;
}

function createSaveButton() {
  const saveButton = document.createElement("button");
  saveButton.classList.add("modal__form-submit");
  saveButton.textContent = "Salvar nota";
  return saveButton;
}
