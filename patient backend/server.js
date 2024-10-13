// server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/generate-insights', async (req, res) => {
  const { patientData } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a medical expert providing insights and recommendations.',
          },
          {
            role: 'user',
            content: `Provide insights for the following patient:\nName: ${patientData.name}\nAge: ${patientData.age}\nTemperature: ${patientData.temperature} °F\nDiagnosis: ${patientData.diagnosis}`,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error generating insights:', error);
    res.status(500).send('Error generating insights');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
