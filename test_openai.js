const fetch = require('node-fetch'); // Ensure node-fetch@2 is installed

const OPENAI_API_KEY = "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";

async function testOpenAI() {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`, // Correct usage here
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Hello, how are you?" }],
        max_tokens: 50,
      }),
    });

    const data = await response.json();
    console.log("Raw Response:", JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log("AI Response:", data.choices[0].message.content.trim());
    } else {
      console.error("API Error:", data.error.message);
    }
  } catch (error) {
    console.error("Network or Fetch Error:", error);
  }
}

testOpenAI();

