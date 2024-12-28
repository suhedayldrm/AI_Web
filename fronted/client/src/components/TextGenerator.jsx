import React, { useState } from "react";
import axios from "axios";

function TextGenerator() {
  const [prompt, setPrompt] = useState("");
  const [context, setContext] = useState("");
  const [response, setResponse] = useState("");

  const generateText = () => {
    axios
      .post("http://localhost:5000/generate_text", { prompt, context })
      .then((res) => setResponse(res.data.response))
      .catch((error) => console.error(error));
  };

  return (
    <div className="component-container">
      <h2>Text Generation</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
        <button onClick={generateText}>Generate Text</button>
      </div>
      <div className="output-container">
        <p>Generated Text:</p>
        <p className="generated-text">{response}</p>
      </div>
    </div>
  );
}

export default TextGenerator;
