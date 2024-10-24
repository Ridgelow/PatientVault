from openai import OpenAI
import os




# Use your API key securely

# Create a chat completion request
output = client.chat.completions.create(model="gpt-3.5-turbo",
messages=[
    {"role": "user", "content": "write me a message"}
])

# Print the output
print(output.choices[0].message.content)

