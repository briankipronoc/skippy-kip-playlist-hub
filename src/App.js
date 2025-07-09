import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // ✅ make sure this path is correct
import Home from "./pages/Home";
import Vote from "./pages/Vote";
import Results from "./pages/Results";

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ This fixes the warning */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;