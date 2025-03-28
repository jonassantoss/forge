const newCard = document.querySelector(".card");
const notesSection = document.querySelector(".notes");
const newCardModal = document.querySelector("#new-card-modal");
const cardModal = document.querySelector("#card-modal");
const closeModal = document.querySelector(".close-button");
const createButtonCard = document.querySelector(".modal__form-submit");
const textarea = document.querySelector(".note-content");
let notes = [];
let id = 0;

newCard.addEventListener("click", () => {
  newCardModal.style.display = "flex";
});

closeModal.addEventListener("click", handleCloseModal);

createButtonCard.addEventListener("click", (event) => handleSaveNote(event));

function handleCloseModal() {
  newCardModal.style.display = "none";
}

function getNotes() {
  const notesOnStorage = localStorage.getItem("notes");

  if (notesOnStorage) {
    notes = JSON.parse(notesOnStorage);
    id = getLastId(notes);
  }

  renderNotes();
}

function getLastId(notes) {
  let lastId = 0;

  for (const note of notes) {
    console.log(note);
    if (lastId === 0) {
      lastId = note.id;
    } else if (lastId < note.id) {
      lastId = note.id;
    }
  }

  lastId++;
  return lastId;
}

function renderNotes() {
  for (const note of notes) {
    const cardNote = createCardNote(note.date, note.content);
    notesSection.appendChild(cardNote);
  }
}

function createCardNote(date, content) {
  const button = document.createElement("button");
  button.classList.add("card");
  button.style.position = "relative";

  const title = createCardTitle(date);
  const cardContent = createCardContent(content);
  const gradient = createCardGradient();

  button.appendChild(title);
  button.appendChild(cardContent);
  button.appendChild(gradient);

  return button;
}

function createCardTitle(date) {
  const span = document.createElement("span");
  span.classList.add("card-title");
  span.textContent = formatRelativeTime(date);
  return span;
}

function createCardContent(content) {
  const p = document.createElement("p");
  p.classList.add("card-description");
  p.textContent = content;
  return p;
}

function createCardGradient() {
  const div = document.createElement("div");
  div.classList.add("gradient");
  return div;
}

function handleSaveNote(event) {
  event.preventDefault();

  const content = textarea.value;
  onNoteCreated(content);
  handleCloseModal();
}

function onNoteCreated(content) {
  const newNote = {
    id,
    date: new Date(),
    content,
  };

  id++;

  const notesArray = [newNote, ...notes];

  notes = notesArray;

  localStorage.setItem("notes", JSON.stringify(notesArray));
}

function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return "Agora mesmo";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `Há ${diffInMinutes} ${diffInMinutes === 1 ? "minuto" : "minutos"}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `Há ${diffInHours} ${diffInHours === 1 ? "hora" : "horas"}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `Há ${diffInDays} ${diffInDays === 1 ? "dia" : "dias"}`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `Há cerca de ${diffInMonths} ${
      diffInMonths === 1 ? "mês" : "meses"
    }`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `Há cerca de ${diffInYears} ${diffInYears === 1 ? "ano" : "anos"}`;
}

getNotes();
