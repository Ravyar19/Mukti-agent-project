import Coaching from "./components/Coaching";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResultsPage from "./components/Results";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Coaching />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
