import express from "express";
import bodyParser from "body-parser";
import agent1 from "./agents/agent1.js";
import agent2 from "./agents/agent2.js";
import agent3 from "./agents/agent3.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.json(), cors());

//use client app
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);

// Endpoint for Agent 1
app.post("/coaching/agent1", async (req, res) => {
  const { managerDescription } = req.body;
  if (!managerDescription) {
    return res.status(400).json({ error: "Missing manager description" });
  }

  try {
    const emotionalFeedback = await agent1(managerDescription);
    res.json({ emotionalFeedback });
  } catch (error) {
    console.error("Error in /coaching/agent1:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint for Agent 2
app.post("/coaching/agent2", async (req, res) => {
  const { emotionalFeedback } = req.body;
  if (!emotionalFeedback) {
    return res.status(400).json({ error: "Missing emotional feedback" });
  }

  try {
    const strategicPlan = await agent2(emotionalFeedback);
    res.json({ strategicPlan });
  } catch (error) {
    console.error("Error in /coaching/agent2:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint for Agent 3
app.post("/coaching/agent3", async (req, res) => {
  const { strategicPlan } = req.body;
  if (!strategicPlan) {
    return res.status(400).json({ error: "Missing strategic plan" });
  }

  try {
    const communicationPlan = await agent3(strategicPlan);
    res.json({ communicationPlan });
  } catch (error) {
    console.error("Error in /coaching/agent3:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT =  3000;
app.listen(PORT, () => {});
