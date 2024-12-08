import dotenv from "dotenv";
import { OpenAI } from "openai"; // Import OpenAI package
import Anthropic from "@anthropic-ai/sdk"; // Import Anthropic SDK

// Load environment variables from the .env file
dotenv.config();

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize the Anthropic client with the API key
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Function to make the OpenAI chat completion call
const callOpenAI = async (prompt) => {
  try {
    // Request to OpenAI GPT-4 chat completion endpoint
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // Specify the model (e.g., gpt-4)
      messages: [
        { role: "user", content: prompt }, // Define the user prompt
      ],
    });

    // Return the generated response
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error with OpenAI API:", error.message);
    throw error;
  }
};

// Anthropic API call
const callAnthropic = async (prompt) => {
  try {
    // Ensure the prompt starts with "\n\nHuman:" and ends with "Assistant:"
    const formattedPrompt = `\n\nHuman: ${prompt}\n\nAssistant:`;

    // Call the Anthropic API (Claude model) using the SDK
    const result = await client.completions.create({
      prompt: formattedPrompt, // Use the formatted prompt
      model: "claude-2.1", // Specify the model (claude-2.1 or other)
      max_tokens_to_sample: 100, // Adjust the token limit as needed
    });

    // Return the generated response from the Anthropic API
    return result.completion;
  } catch (error) {
    console.error("Error with Anthropic API:", error.message);
    throw error;
  }
};

export { callOpenAI, callAnthropic }; // Export the functions for use in other files
