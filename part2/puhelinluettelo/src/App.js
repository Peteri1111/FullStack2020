import React, { useState } from "react";

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "asd", number: "123" },
    { name: "asd1", number: "1234" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const handleFilterValue = (e) => {
    setFilterValue(e.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const addContact = (e) => {
    e.preventDefault();
    if (!persons.map((person) => person.name).includes(newName)) {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    } else {
      alert(`"${newName}" is already added to phonebook`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <h3>Contact Filter</h3>
      <div>
        filter shown: <input value={filterValue} onChange={handleFilterValue} />
      </div>

      <h3>Add a new contsact here</h3>
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
      <ul>
        {persons
          .filter((person) =>
            person.name.toLowerCase().includes(filterValue.toLowerCase())
          )
          .map((person, i) => (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
