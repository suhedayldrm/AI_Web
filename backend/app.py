# app.py

from flask import Flask, request, jsonify
import openai
from transformers import pipeline


import requests



UPLOAD_FOLDER = "uploads/"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)

CORS(app)

summarizer = pipeline("summarization")

# Configure your OpenAI API key
openai.api_key = "paste your key here"


@app.route("/generate_text", methods=["POST"])
def generate_text():
    try:
        data = request.get_json()
        prompt = data["prompt"]
        context = data["context"]

        # Combine the prompt and context
        conversation = f"{context}\nUser: {prompt}\nAI:"

        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=conversation,
            max_tokens=50,  # Adjust this as needed
        )

        ai_response = response.choices[0].text.strip()
        return jsonify({"response": ai_response})
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/summarization", methods=["POST"])
def summarization():
    try:
        uploaded_files = request.files.getlist("files")
        summary_request = request.form.get("summaryRequest")
        file_contents = []

        if not uploaded_files or len(uploaded_files) == 0:
            return jsonify({"error": "Please upload at least one valid file."}), 400

        for file in uploaded_files:
            content = ""
            if file.mimetype == "text/plain":
                content = file.read().decode("utf-8")
            elif file.mimetype == "application/pdf":
                pdf_data = pdfplumber.load(file)
                content = "\n".join([page.extract_text() for page in pdf_data.pages])

            file_contents.append(content)

        messages = [
            {"role": "system", "content": "You are a summarization assistant."},
            {
                "role": "user",
                "content": "please make the summary of the content from below files",
            },
            *[{"role": "user", "content": content} for content in file_contents],
        ]

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", messages=messages
        )

        summary = response["choices"][0]["message"]["content"]
        return jsonify({"summary": summary})

    except Exception as e:
        print(f"Error in /summarization route: {str(e)}")
        return (
            jsonify({"error": "An error occurred while processing the request."}),
            500,
        )


@app.route("/sentiment", methods=["POST"])
def analyze_sentiment():
    text = request.json["text"]

    try:
        response = requests.post(
            "https://api.openai.com/v1/engines/text-davinci-003/completions",
            headers={
                "Authorization": f"Bearer {openai.api_key}",
                "Content-Type": "application/json",
            },
            json={
                "prompt": f"Analyze the text below and determine the sentiment. Please categorize it into emotions like happy, sad, fearful, surprised, loving, angry, or if the person is feeling thirsty or hungry. Feel free to use other emotional terms as well. The provided text is: '{text}'.",
                "max_tokens": 5,
                "temperature": 1,
                "n": 1,
            },
        )
        print(response.text)
        if response.status_code == 200:
            data = response.json()
            if "choices" in data:
                sentiment = data["choices"][0]["text"].strip()
                return jsonify({"sentiment": sentiment})
            else:
                return jsonify({"error": "Invalid response structure from OpenAI"}), 500
        else:
            return (
                jsonify({"error": "Failed to communicate with OpenAI API"}),
                response.status_code,
            )
        # sentiment = response.json()["choices"][0]["text"].strip()
        # return jsonify({"sentiment": sentiment})
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500


if __name__ == "__main__":
    app.run(debug=True)
