import React from "react";
import "./App.css";
import Posts from "./containers/Posts/Posts";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <Posts></Posts>
      </main>
    </div>
  );
}

export default App;
