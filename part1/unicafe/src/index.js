import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;
  if (total <= 0)
    return (
      <>
        <h3>No feedback given</h3>
      </>
    );

  let avg = (good - neutral) / total;
  let positive = good / total;
  return (
    <>
      <table>
        <tbody>
          <StatisticsLine text={"good"} value={good} />
          <StatisticsLine text={"neutral"} value={neutral} />
          <StatisticsLine text={"bad"} value={bad} />
          <StatisticsLine text={"all"} value={total} />
          <StatisticsLine text={"average"} value={avg} />
          <StatisticsLine text={"positive"} value={positive} />
        </tbody>
      </table>
    </>
  );
};
const StatisticsLine = ({ text, value }) => (
  <>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </>
);
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToValue = (rating) => {
    switch (rating) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
    }
  };

  return (
    <>
      <h2>Give feedback</h2>
      <Button handleClick={() => setToValue("good")} text={"good"}></Button>
      <Button
        handleClick={() => setToValue("neutral")}
        text={"neutral"}
      ></Button>
      <Button handleClick={() => setToValue("bad")} text={"bad"}></Button>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
