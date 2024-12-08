import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BarLoader, DotLoader } from "react-spinners";

const CoachingForm = () => {
  const [managerDescription, setManagerDescription] = useState("");
  const [loadingMessage, setLoadingMessage] = useState(null);
  const [agent1Data, setAgent1Data] = useState(null);
  const [agent2Data, setAgent2Data] = useState(null);
  const [agent3Data, setAgent3Data] = useState(null);
  const [currentAgent, setCurrentAgent] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Mutation for Agent 1
  const agent1Mutation = useMutation(
    (description) =>
      axios.post("http://localhost:3000/coaching/agent1", {
        managerDescription: description,
      }),
    {
      onSuccess: (data) => {
        setAgent1Data(data.data);
        setLoadingMessage(null);
      },
      onError: (err) => {
        setError(err.message);
        setLoadingMessage(null);
      },
    }
  );

  // Mutation for Agent 2
  const agent2Mutation = useMutation(
    (emotionalFeedback) =>
      axios.post("http://localhost:3000/coaching/agent2", {
        emotionalFeedback,
      }),
    {
      onSuccess: (data) => {
        setAgent2Data(data.data);
        setLoadingMessage(null);
      },
      onError: (err) => {
        setError(err.message);
        setLoadingMessage(null);
      },
    }
  );

  // Mutation for Agent 3
  const agent3Mutation = useMutation(
    (strategicPlan) =>
      axios.post("http://localhost:3000/coaching/agent3", { strategicPlan }),
    {
      onSuccess: (data) => {
        setAgent3Data(data.data);
        setLoadingMessage(null);
      },
      onError: (err) => {
        setError(err.message);
        setLoadingMessage(null);
      },
    }
  );

  const handleNextStep = async () => {
    setError(null);
    if (currentAgent === 1) {
      setLoadingMessage("Processing response from Agent 1...");
      await agent1Mutation.mutateAsync(managerDescription);
      setCurrentAgent(2);
    } else if (currentAgent === 2) {
      setLoadingMessage("Processing response from Agent 2...");
      await agent2Mutation.mutateAsync(agent1Data.emotionalFeedback);
      setCurrentAgent(3);
    } else if (currentAgent === 3) {
      setLoadingMessage("Processing response from Agent 3...");
      await agent3Mutation.mutateAsync(agent2Data.strategicPlan);
      setCurrentAgent(4);
    } else {
      navigate("/results", { state: { agent1Data, agent2Data, agent3Data } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-center mb-6 text-4xl font-bold">
        Leadership Coaching
      </h1>
      {currentAgent === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNextStep();
          }}
          className="bg-white shadow-md rounded-lg p-8 max-w-md w-full flex flex-col gap-4"
        >
          <label
            htmlFor="input"
            className="block text-sm font-medium text-gray-900"
          >
            Type your input here
          </label>
          <textarea
            value={managerDescription}
            onChange={(e) => setManagerDescription(e.target.value)}
            placeholder="Enter team dynamics description..."
            rows="6"
            id="input"
            className="block w-full text-sm p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      )}

      {/* Loading Spinner (BarLoader) */}
      {loadingMessage && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <DotLoader color="#A8CD89" size={200} />
        </div>
      )}

      {/* Error Message */}
      {error && <p className="mt-4 text-red-500">Error: {error}</p>}

      {/* Results display after each agent */}
      {agent1Data && currentAgent === 2 && (
        <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold">Agent 1 Response:</h2>
          <p>{agent1Data.emotionalFeedback}</p>
          <button
            onClick={handleNextStep}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Next: Agent 2
          </button>
        </div>
      )}
      {agent2Data && currentAgent === 3 && (
        <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold">Agent 2 Response:</h2>
          <p>{agent2Data.strategicPlan}</p>
          <button
            onClick={handleNextStep}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Next: Agent 3
          </button>
        </div>
      )}
      {agent3Data && currentAgent === 4 && (
        <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold">Agent 3 Response:</h2>
          <p>{agent3Data.communicationPlan}</p>
          <button
            onClick={handleNextStep}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            View All Results
          </button>
        </div>
      )}
    </div>
  );
};

export default CoachingForm;
