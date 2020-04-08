import React from "react";

const PersonForm = ({
  addContact,
  newName,
  handleNameChange,
  handleNumberChange,
  newNumber,
}) => (
  <>
    <form onSubmit={addContact}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    <h2>Numbers</h2>
  </>
);

export default PersonForm;
