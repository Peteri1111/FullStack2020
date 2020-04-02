import React from "react";
import ReactDOM from "react-dom";

const Header = props => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Content = props => {
  return (
    <>
      <p>
        <Part
          name={props.parts[0].name}
          exercise={props.parts[0].exercices}
        ></Part>
      </p>
      <p>
        <Part
          name={props.parts[1].name}
          exercise={props.parts[1].exercices}
        ></Part>
      </p>
      <p>
        <Part
          name={props.parts[2].name}
          exercise={props.parts[2].exercices}
        ></Part>
      </p>
    </>
  );
};

const Part = props => {
  return (
    <p>
      {props.name} {props.exercise}
    </p>
  );
};

const Total = props => {
  return (
    <>
      Number of exercices:
      {props.parts[0].exercices +
        props.parts[1].exercices +
        props.parts[2].exercices}
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercices: 10
      },
      {
        name: "Using props to pass data",
        exercices: 7
      },
      {
        name: "State of a component",
        exercices: 14
      }
    ]
  };

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
