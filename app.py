from flask import Flask, request, jsonify
from openai import OpenAI

app = Flask(__name__)

# Set your OpenAI API key here
openai_client = OpenAI(api_key="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")

# Define the route to handle insights generation
@app.route('/generate-insights', methods=['POST'])
def generate_insights():
    patient_data = request.json  # Get JSON data from the request
    name = patient_data.get("name")
    age = patient_data.get("age")
    temperature = patient_data.get("temperature")
    diagnosis = patient_data.get("diagnosis")

    print("Received patient data:", patient_data)  # Log the received patient data

    try:
        output = openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a medical expert providing insights and recommendations."
                },
                {
                    "role": "user",
                    "content": f"Provide insights for the following patient:\nName: {name}\nAge: {age}\nTemperature: {temperature} °F\nDiagnosis: {diagnosis}"
                }
            ]
        )

        return jsonify({"response": output.choices[0].message.content.strip()})  # Return the insights as JSON
    
    except Exception as e:
        print("Error generating insights:", str(e))  # Log the error
        return jsonify({"error": str(e)}), 500  # Return error if any

if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask app

