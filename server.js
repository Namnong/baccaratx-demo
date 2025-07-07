
// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 11434;

app.use(cors());
app.use(express.json());

app.post('/api/gpt', async (req, res) => {
  const userMsg = req.body.question || "Tư vấn cầu Baccarat";

  try {
    const result = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o',
      messages: [
        { role: "system", content: "Bạn là một chuyên gia phân tích cầu Baccarat." },
        { role: "user", content: userMsg }
      ]
    }, {
      headers: {
        'Authorization': `Bearer YOUR_API_KEY_HERE`,  // ⚠️ Nhớ thay bằng API Key
        'Content-Type': 'application/json'
      }
    });

    res.json({ reply: result.data.choices[0].message.content });
  } catch (error) {
    console.error("GPT Error:", error.message);
    res.json({ reply: "Lỗi khi gửi tới GPT." });
  }
});

app.listen(port, () => {
  console.log(`GPT proxy server is running at http://localhost:${port}`);
});
