import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NewFishingTrip from "./views/NewFishingTrip";

function App() {
  return (
    <Router>
      <div className="App">
          <h1>Fishing Journal</h1>
        <main>
          <Routes>
            <Route path="/" element={<NewFishingTrip />} />
            {/* Add more routes here as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
