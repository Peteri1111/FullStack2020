import React from "react";
const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} content={part} />
      ))}
    </>
  );
};

const Part = ({ content }) => {
  return (
    <>
      <p>
        {content.name} {content.exercises}
      </p>
    </>
  );
};

const Total = ({ parts }) => {
  return (
    <>
      <h4>
        Total of exercises:
        {parts
          .map((part) => {
            return part.exercises;
          })
          .reduce((sum, addition) => sum + addition)}
      </h4>
    </>
  );
};
const Course = ({ name, parts }) => (
  <>
    <Header course={name} />
    <Content parts={parts}></Content>
    <Total parts={parts}></Total>
  </>
);

export default Course;
