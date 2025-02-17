import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NewFishingTripPage from "./views/NewFishingTripPage";
import TopNav from "./components/Topnav";
import LandingPage from "./views/LandingPage";
import FishingTripDetailsPage from "./views/FishingTripDetailsPage";
import FishingTripListPage from "./views/FishingTripListPage";
import Footer from "./components/Footer";
import TackleListPage from "./views/TackleListPage";
import NewTacklePage from "./views/NewTacklePage";
import TackleDetailsPage from "./views/TackleDetailsPage";

function App() {
  return (
    <Router>
      <div className="app">
        <TopNav />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/new-trip" element={<NewFishingTripPage />} />
            <Route path="/trips/:tripId" element={<FishingTripDetailsPage />} />
            <Route path="/trips" element={<FishingTripListPage />} />
            <Route path="/tackle" element={<TackleListPage />} />
            <Route path="/new-tackle" element={<NewTacklePage />} />
            <Route path="/tackle/:tackleId" element={<TackleDetailsPage />} />
            {/* Add more routes here as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
