import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import NewFishingTripPage from "./views/NewFishingTripPage";
import TopNav from "./components/Topnav";
import HomePage from "./views/HomePage";
import FishingTripDetailsPage from "./views/FishingTripDetailsPage";
import FishingTripListPage from "./views/FishingTripListPage";
import Footer from "./components/Footer";
import TackleListPage from "./views/TackleListPage";
import NewTacklePage from "./views/NewTacklePage";
import TackleDetailsPage from "./views/TackleDetailsPage";
import LandingPage from "./views/LandingPage";

const AppContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="app">
      {!isLandingPage && <TopNav />}
      <main className="app-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/new-trip" element={<NewFishingTripPage />} />
          <Route path="/trips/:tripId" element={<FishingTripDetailsPage />} />
          <Route path="/trips" element={<FishingTripListPage />} />
          <Route path="/tackle" element={<TackleListPage />} />
          <Route path="/new-tackle" element={<NewTacklePage />} />
          <Route path="/tackle/:tackleId" element={<TackleDetailsPage />} />
        </Routes>
      </main>
      {!isLandingPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;