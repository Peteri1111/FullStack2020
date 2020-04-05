import React, { useState } from "react";
import ReactDOM from "react-dom";
const App = (props) => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const History = ({ allclicks }) => {
    if (allClicks.length === 0) {
      return <>press buttons for App</>;
    }

    return <>button press history: {allClicks.join("")}</>;
  };

  const Button = ({ onClick, text }) => (
    <button onClick={onClick}>{text}</button>
  );

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
  };

  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text="left"></Button>
        <Button onClick={handleRightClick} text="right"></Button>
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
