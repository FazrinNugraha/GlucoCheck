import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import GlucoCheck from "./GlucoCheck";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/gluco-check" element={<GlucoCheck />} />
      </Routes>
    </Router>
  );
}

export default App;
