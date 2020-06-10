import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import ContactFilter from "./components/ContactFilter";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = (props) => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

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
    if (newName.length === 0) {
      return;
    }
    let person = persons.filter((p) => p.name === newName);
    if (person.length === 0) {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(personObject)
        .then((newObject) => (personObject.id = newObject.id));

      setPersons(persons.concat(personObject));
    } else {
      if (
        window.confirm(
          `"${newName}" is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        person[0].number = newNumber;
        personService.update(person[0].id, person[0]);

        let newPersons = persons;
        setPersons(newPersons);
      }
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <h3>Contact Filter</h3>
      <ContactFilter value={filterValue} change={handleFilterValue} />

      <h3>Add a new contact here</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addContact={addContact}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filterValue={filterValue}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
