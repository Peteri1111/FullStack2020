import React from "react";
import ReactDOM from "react-dom";

const Hello = props => {
  return (
    <>
      <p>
        Hello {props.name} do you like {props.like}
      </p>
    </>
  );
};

const App = () => {
  const now = new Date();
  const a = 10;
  const b = 20;
  console.log("Hi!");
  return (
    <>
      <h1> Greetings</h1>
      <Hello name="ismo" like="homos" />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
