import { callAnthropic } from "../services/apiServices.js";

// Agent 3: Communication Coach
const agent3 = async (strategicPlan) => {
  console.log("Agent 3 received:", strategicPlan);
  const prompt = `Develop a communication strategy based on this strategic plan: ${strategicPlan}`;
  try {
    const response = await callAnthropic(prompt);
    console.log("Agent 3 response:", response);
    return response;
  } catch (error) {
    console.error("Error in Agent 3:", error.message);
    throw error;
  }
};

export default agent3;
