import React, { useState } from "react";
import PersonForm from "./components/PersonForm";
import ContactFilter from "./components/ContactFilter";
import Persons from "./components/Persons";
const App = (props) => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "asD", number: "123" },
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
      <ContactFilter value={filterValue} change={handleFilterValue} />

      <h3>Add a new contact here</h3>
      <PersonForm
        addContact={addContact}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} filterValue={filterValue} />
    </div>
  );
};

export default App;
