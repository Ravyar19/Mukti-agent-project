import { callOpenAI } from "../services/apiServices.js";

// Agent 1: Emotional Intelligence Expert
const agent1 = async (managerDescription) => {
  console.log("Agent 1 received:", managerDescription);

  // Send the description to the OpenAI API
  const prompt = `Analyze the following team dynamics: ${managerDescription}`;
  try {
    const response = await callOpenAI(prompt);
    console.log("Agent 1 response:", response);
    return response;
  } catch (error) {
    console.error("Error in Agent 1:", error.message);
    throw error;
  }
};

export default agent1;
