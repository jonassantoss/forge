export class NotesService {
  constructor() {
    this.notes = [];
    this.id = 0;
  }

  getNotes() {
    const notesOnStorage = localStorage.getItem("notes");
    if (notesOnStorage) {
      this.notes = JSON.parse(notesOnStorage);
      this.id = this.getLastId(this.notes);
    }
    return this.notes;
  }

  getLastId(notes) {
    let lastId = 0;
    for (const note of notes) {
      if (lastId === 0 || lastId < note.id) {
        lastId = note.id;
      }
    }
    return lastId + 1;
  }

  createNote(content) {
    const newNote = {
      id: this.id++,
      date: new Date(),
      content,
    };

    this.notes = [newNote, ...this.notes];
    localStorage.setItem("notes", JSON.stringify(this.notes));
    return newNote;
  }
}
