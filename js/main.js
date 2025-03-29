// Import dependencies
import { createCardNote } from "./components/Card.js";
import { createCardModal } from "./components/modal.js";
import { NotesService } from "./services/notes.js";

// DOM Elements
const notesSection = document.querySelector(".notes");
const newCard = document.querySelector(".new-card");
const newCardModal = document.querySelector("#new-card-modal");
const newCardModalContent = document.querySelector("#new-card-modal-content");
const closeModal = document.querySelector(".close-new-card");
const createButtonCard = document.querySelector(".modal__form-submit");
const textarea = document.querySelector(".note-content");
const inputSearch = document.querySelector(".search-input");

// Services
const notesService = new NotesService();

// State
let lastKey = "";

// Utility Functions
function filterNotes(searchValue) {
  const notes = notesService.getNotes();
  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchValue)
  );
  renderNotes(filteredNotes);
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

// Event Handlers
function handleSearchInput(e) {
  if (e.key === "Enter") {
    const searchValue = e.target.value;

    const url = new URL(window.location);
    url.searchParams.set("search", searchValue);
    window.history.pushState({}, "", url);

    filterNotes(searchValue.toLowerCase());
    window.location.reload();
  }
}

function handleNewCardClick() {
  newCardModal.style.display = "flex";
  newCardModalContent.focus();
}

function handleCloseModal() {
  newCardModal.style.display = "none";
}

function handleSaveNote(event) {
  event.preventDefault();
  const content = textarea.value;
  const newNote = notesService.createNote(content);
  const cardNote = createCardNote(newNote.date, newNote.content);
  notesSection.appendChild(cardNote);
  newCardModal.style.display = "none";
  textarea.value = "";
}

function handleModalKeydown(e) {
  if (e.ctrlKey && e.key === "Enter") {
    handleSaveNote(e);
  }
}

function openCard() {
  const title = this.childNodes[0].innerHTML;
  const content = this.childNodes[1].innerHTML;
  createCardModal(title, content);
}

// Initialization
function setupEventListeners() {
  inputSearch.addEventListener("keydown", handleSearchInput);
  newCard.addEventListener("click", handleNewCardClick);
  closeModal.addEventListener("click", handleCloseModal);
  createButtonCard.addEventListener("click", handleSaveNote);
  newCardModalContent.addEventListener("keydown", handleModalKeydown);
  newCardModalContent.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  });
}

function initialize() {
  const notes = notesService.getNotes();
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get("search");

  if (searchParam) {
    inputSearch.value = searchParam;
    filterNotes(searchParam.toLowerCase());
  } else {
    renderNotes(notes);
  }

  setupEventListeners();
}

initialize();
