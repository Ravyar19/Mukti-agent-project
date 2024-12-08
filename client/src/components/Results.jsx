import React from "react";
import { useLocation } from "react-router-dom";

const ResultsPage = () => {
  const { state } = useLocation();
  const { agent1Data, agent2Data, agent3Data } = state || {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Coaching Results</h1>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
        <h2 className="text-xl font-bold mb-2">Agent 1 Response:</h2>
        <p className="mb-4">{agent1Data?.emotionalFeedback}</p>

        <h2 className="text-xl font-bold mb-2">Agent 2 Response:</h2>
        <p className="mb-4">{agent2Data?.strategicPlan}</p>

        <h2 className="text-xl font-bold mb-2">Agent 3 Response:</h2>
        <p>{agent3Data?.communicationPlan}</p>
      </div>
    </div>
  );
};

export default ResultsPage;
