import React, { useState } from "react";
import axios from "axios";

function Summarizer() {
  const [files, setFiles] = useState([]);
  const [summaryRequest, setSummaryRequest] = useState("");
  const [summary, setSummary] = useState("");

  const handleFileUpload = (event) => {
    const fileList = Array.from(event.target.files);
    setFiles(fileList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("summaryRequest", summaryRequest);

    axios
      .post("http://localhost:5000/summarization", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => setSummary(res.data.summary))
      .catch((error) => console.error(error));
  };

  return (
    <div className="component-container">
      <h2>Summarization</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            accept=".txt,.pdf"
          />
          <textarea
            placeholder="Enter summary request"
            value={summaryRequest}
            onChange={(e) => setSummaryRequest(e.target.value)}
          />
          <button type="submit">Summarize</button>
        </div>
      </form>
      {summary && (
        <div className="output-container">
          <p>Summary:</p>
          <p className="generated-text">{summary}</p>
        </div>
      )}
    </div>
  );
}

export default Summarizer;
