import React from "react";
import Note from "./components/Note";
const App = ({ notes }) => {
  return (
    <>
      <h1>Notes</h1>
      <ul>
        {notes.map((note, i) => (
          <Note key={i} note={note} />
        ))}
      </ul>
    </>
  );
};

export default App;
