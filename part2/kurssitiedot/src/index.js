import React from "react";
import ReactDOM from "react-dom";

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
      Total of exercises:
      {parts
        .map((part) => {
          return part.exercises;
        })
        .reduce((sum, addition) => sum + addition)}
    </>
  );
};
const Course = ({ course }) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts}></Content>
    <Total parts={course.parts}></Total>
  </>
);

const App = () => {
  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
