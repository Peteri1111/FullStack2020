import React from "react";
import Person from "./Person";
import personService from "../services/persons";

const Persons = ({ persons, filterValue, setPersons }) => {
  const removePerson = (index, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(index);
      setPersons(persons.filter((person) => person.id !== index));
    }
  };

  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filterValue.toLowerCase())
        )
        .map((person) => (
          <div key={person.name}>
            <Person
              name={person.name}
              number={person.number}
              key={person.name}
            />
            <button onClick={() => removePerson(person.id, person.name)}>
              delete
            </button>
          </div>
        ))}
    </ul>
  );
};

export default Persons;
