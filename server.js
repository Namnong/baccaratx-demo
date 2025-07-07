
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
        'Authorization': `Bearer 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`,  // ⚠️ Nhớ thay bằng API Key
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
