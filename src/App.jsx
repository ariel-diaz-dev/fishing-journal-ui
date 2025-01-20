import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NewFishingTrip from "./views/NewFishingTrip";
import TopNav from "./components/Topnav";

function App() {
  return (
    <Router>
      <div className="App">
        <TopNav />
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
