import { callOpenAI } from "../services/apiServices.js";

// Agent 2: Strategic Planner
const agent2 = async (emotionalFeedback) => {
  console.log("Agent 2 received:", emotionalFeedback);
  const prompt = `Create a strategic plan addressing the following emotional challenges: ${emotionalFeedback}`;
  try {
    const response = await callOpenAI(prompt);
    console.log("Agent 2 response:", response);
    return response;
  } catch (error) {
    console.error("Error in Agent 2:", error.message);
    throw error;
  }
};

export default agent2;
