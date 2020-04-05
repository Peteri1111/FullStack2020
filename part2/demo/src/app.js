import React, {useState} from "react";
import Note from "./components/Note";


const App = ( props ) => {
  const [notes, setNote] = useState(props.notes)
  const [newNote, setNewNote] = useState('new note?')
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length +1,
    }
    setNote(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (e) => {
    console.log(e.target.value)
    setNewNote(e.target.value)
  }
  return (
    <>
      <h1>Notes</h1>
      <ul>
        {notes.map((note, i) => (
          <Note key={i} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
    </>
  );
};

export default App;
