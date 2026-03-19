import 'dotenv/config';
import express from "express";
import OpenClaw from "openclaw";

const KIMI_API_KEY = process.env.KIMI_API_KEY;
const KIMI_API_ID  = process.env.KIMI_API_ID;

if (!KIMI_API_KEY || !KIMI_API_ID) {
  console.error("请确保 .env 文件中已设置 KIMI_API_KEY 和 KIMI_API_ID");
  process.exit(1);
}

const openclaw = new OpenClaw({
  apiKey: KIMI_API_KEY,
  apiId: KIMI_API_ID
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("OpenClaw 服务运行中 🚀");
});

app.post("/api/message", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "请在请求体中提供 message 字段" });
  }

  try {
    const response = await openclaw.processMessage(message);
    res.json({ reply: response });
  } catch (error) {
    console.error("处理消息时出错：", error);
    res.status(500).json({ error: "处理消息失败" });
  }
});

app.listen(PORT, () => {
  console.log(`OpenClaw 服务已启动，监听端口 ${PORT}`);
});
