import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OpenClaw API is running");
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  const response = await fetch("https://api.moonshot.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "kimi-k2",
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await response.json();
  res.json(data);
});

app.listen(8080, "0.0.0.0", () => {
  console.log("Server running on port 8080");
});
