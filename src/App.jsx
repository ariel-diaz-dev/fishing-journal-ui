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
import NotFoundPage from "./views/NotFoundPage";

const AppContent = () => {
  const location = useLocation();
  const displayNavAndFooter = location.pathname === '/';

  return (
    <div className="app">
      {!displayNavAndFooter && <TopNav />}
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
          <Route path="*" element={<NotFoundPage />} />
          </Routes>
      </main>
      {!displayNavAndFooter && <Footer />}
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