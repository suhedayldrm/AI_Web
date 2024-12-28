# AI-Enhanced NLP Web Application

This web application leverages advanced Natural Language Processing (NLP) techniques and integrates the OpenAI API to provide a range of features including text generation with context, multi-document summarization, multilingual sentiment analysis, and emotion recognition.

## Getting Started

Follow the steps below to set up and run the application on your local machine.

### Prerequisites

Before you begin, make sure you have the following software installed:

- Python : ((https://www.python.org/downloads/))
- flask: Install flask

### Installation

1. Clone this repository to your local machine:

```bash
   git clone <https://github.com/suhedayldrm/AI_Web.git>
```

### Features
1. Text Generation with Context
This feature allows users to generate text based on a provided prompt while considering context and previous interactions.
The application utilizes OpenAI's GPT-3.5 API for advanced text generation.
2. Multi-Document Summarization
Users can input multiple documents or articles, and receive a coherent summary.
The application uses advanced NLP techniques, including the transformers library, to maintain context and relevance during summarization.
3. Multilingual Sentiment Analysis and Emotion Recognition
This feature provides advanced sentiment analysis supporting multiple languages and includes emotion recognition.
Users can input text in various languages to receive sentiment and emotion analysis.

### How to Use
Text Generation with Context: 
Send a POST request to 
```bash 
   http://localhost:5000/generate_text
```
with a JSON payload containing a prompt and context.

Multi-Document Summarization: 
Send a POST request to 
```bash
   http://localhost:5000/summarize 
```
with a JSON payload containing a list of documents.

PDF Summarization: 
Upload a PDF file to 
```bashhttp://localhost:5000/summarize_pdf
```

![image](https://github.com/Kapil7982/Summarizer_App/assets/103938868/e960bfcb-2423-4655-980b-a88424eb8ce2)
