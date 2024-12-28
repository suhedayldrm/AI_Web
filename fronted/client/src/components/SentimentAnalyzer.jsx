import React, { useState } from "react";
import axios from "axios";

function SentimentAnalyzer() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const analyzeSentiment = () => {
    axios
      .post("http://localhost:5000/sentiment", { text })
      .then((res) => setSentiment(res.data.sentiment))
      .catch((error) => console.error(error));
  };

  return (
    <div className="component-container">
      <h2>Sentiment Analysis</h2>
      <div className="input-container">
        <textarea
          placeholder="Enter text for sentiment analysis"
          value={text}
          onChange={handleTextChange}
        />
        <button onClick={analyzeSentiment}>Analyze Sentiment</button>
      </div>
      {sentiment && (
        <div className="output-container">
          <p>Sentiment:</p>
          <p className="generated-text">{sentiment}</p>
        </div>
      )}
    </div>
  );
}

export default SentimentAnalyzer;
