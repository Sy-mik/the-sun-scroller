import React from "react";
import "./App.scss";
import TheSunContainer from "./the-sun/the-sun-container";

function App() {
  return (
    <div className="The sun">
      <TheSunContainer></TheSunContainer>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
