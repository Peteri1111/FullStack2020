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
  return <>Number of exercices {props.total}</>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercices: 10
  };
  const part2 = {
    name: "Using props to pass data",
    exercices: 7
  };
  const part3 = {
    name: "State of a component",
    exercices: 14
  };

  return (
    <>
      <Header course={course} />
      <Content parts={[part1, part2, part3]}></Content>
      <Total
        total={part1.exercices + part2.exercices + part3.exercices}
      ></Total>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
