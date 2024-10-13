from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("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"))


# Use your API key securely

# Create a chat completion request
output = client.chat.completions.create(model="gpt-3.5-turbo",
messages=[
    {"role": "user", "content": "write me a message"}
])

# Print the output
print(output.choices[0].message.content)

