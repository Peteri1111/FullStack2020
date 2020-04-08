import React from "react";
import Person from "./Person";
const Persons = ({ persons, filterValue }) => (
  <ul>
    {persons
      .filter((person) =>
        person.name.toLowerCase().includes(filterValue.toLowerCase())
      )
      .map((person, i) => (
        <Person name={person.name} number={person.number} key={person.name} />
      ))}
  </ul>
);

export default Persons;
