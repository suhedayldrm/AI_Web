import React from "react";
import "./App.css";
import TextGenerator from "./components/TextGenerator";
 import Summarizer from "./components/Summarizer";
 import SentimentAnalyzer from "./components/SentimentAnalyzer";

function App() {
  return (
    <div className="App">
      <h1>Summarizer App</h1>
      <TextGenerator />
      <Summarizer />
      <SentimentAnalyzer />
    </div>
  );
}

export default App;
