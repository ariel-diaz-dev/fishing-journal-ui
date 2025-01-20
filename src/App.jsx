import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NewFishingTrip from "./views/NewFishingTrip";
import TopNav from "./components/Topnav";
import LandingPage from "./views/LandingPage";

function App() {
  return (
    <Router>
      <div className="App">
        <TopNav />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/new-trip" element={<NewFishingTrip />} />
            {/* Add more routes here as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
