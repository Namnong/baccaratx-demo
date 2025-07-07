
let history = [];
function resetGame() {
  history = [];
  document.getElementById("game-area").innerHTML = "";
  document.getElementById("prediction-result").innerText = "Đã reset vòng cược.";
}
function undo() {
  history.pop();
  document.getElementById("prediction-result").innerText = "Đã hoàn tác.";
}

async function askGPT(promptText) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: promptText }],
      temperature: 0.7
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content;
  return reply || "Không có phản hồi từ AI.";
}

async function queryGPT() {
  const prompt = document.getElementById("gpt-input").value;
  document.getElementById("gpt-response").innerText = "⏳ Đang xử lý GPT...";
  const reply = await askGPT(prompt);
  document.getElementById("gpt-response").innerText = reply;
}
