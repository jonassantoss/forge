import { createCardNote } from "./components/Card.js";
import { createCardModal } from "./components/modal.js";
import { NotesService } from "./services/notes.js";

const notesService = new NotesService();
const notesSection = document.querySelector(".notes");
const newCardModal = document.querySelector("#new-card-modal");
const closeModal = document.querySelector(".close-button");
const createButtonCard = document.querySelector(".modal__form-submit");
const textarea = document.querySelector(".note-content");
const body = document.body;

function initialize() {
  const notes = notesService.getNotes();
  renderNotes(notes);
  setupEventListeners();
}

function setupEventListeners() {
  document.querySelector(".card").addEventListener("click", () => {
    newCardModal.style.display = "flex";
  });

  closeModal.addEventListener("click", () => {
    newCardModal.style.display = "none";
  });

  createButtonCard.addEventListener("click", handleSaveNote);
}

function renderNotes(notes) {
  const existingNoteIds = new Set(
    Array.from(notesSection.children).map((el) =>
      el.getAttribute("data-note-id")
    )
  );

  for (const note of notes) {
    if (!existingNoteIds.has(String(note.id))) {
      const cardNote = createCardNote(note.date, note.content);
      cardNote.setAttribute("data-note-id", note.id);
      cardNote.addEventListener("click", openCard);
      notesSection.appendChild(cardNote);
    }
  }
}

function openCard() {
  const title = this.childNodes[0].innerHTML;
  const content = this.childNodes[1].innerHTML;
  const modal = createCardModal(title, content);
}

function handleSaveNote(event) {
  event.preventDefault();
  const content = textarea.value;
  const newNote = notesService.createNote(content);
  const cardNote = createCardNote(newNote.date, newNote.content);
  notesSection.prepend(cardNote);
  newCardModal.style.display = "none";
  textarea.value = "";
}

initialize();
