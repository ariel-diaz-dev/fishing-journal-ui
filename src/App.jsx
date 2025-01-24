import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NewFishingTripPage from "./views/NewFishingTripPage";
import TopNav from "./components/Topnav";
import LandingPage from "./views/LandingPage";
import FishingTripDetailsPage from "./views/FishingTripDetailsPage";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <TopNav />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/new-trip" element={<NewFishingTripPage />} />
            <Route path="/trips/:tripId" element={<FishingTripDetailsPage />} />
            {/* Add more routes here as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
