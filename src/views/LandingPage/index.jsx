import React, { useState } from "react";
import "./index.css";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Ensure you're using React Router for navigation
import RedirectButton from "../../components/RedirectButton";

const LandingPage = () => {
  const navigate = useNavigate();

  // Example data for fishing trips, tackle, and analytics
  const [fishingTrips] = useState([
    { id: 1, location: "Flamingo", status: "In Progress", date: "1/20/2025" },
    { id: 2, location: "Turkey Point", status: "Completed", date: "1/20/2025" },
  ]);

  const [tackle] = useState([
    { id: 1, name: "Spinner Bait", quantity: 5 },
    { id: 2, name: "Fishing Rod", quantity: 2 },
    { id: 3, name: "Soft Plastic Lure", quantity: 10 },
  ]);

  const analytics = {
    fishCaught: 120,
    timeSinceLastTrip: "2 weeks",
    mostUsedTackle: "Soft Plastic Lure",
  };

  const redirectToFishingTripDetails = (tripId) => {
    navigate(`/trips/${tripId}`);
  }

  return (
    <div className="landing-page">
      <section className="section">
        <div className="section-header">
          <div className="header-container">
            <h2>Recent Trips</h2>
          </div>
          <RedirectButton to={"/new-trip"}>
            Plan New Trip
          </RedirectButton>
        </div>
        <ul className="fishing-trips-list">
          {fishingTrips.map((trip) => (
            <li
              key={trip.id}
              onClick={() => redirectToFishingTripDetails(trip.id)}
              className={`trip-item cursor-pointer ${trip.status.toLowerCase()}`}>
              <span>{trip.date} | {trip.location}</span>
              <span className="trip-status">{trip.status}</span>
            </li>
          ))}
        </ul>
        <div className="text-right">
          <NavLink to={"/trips"} className="text-right text-blue-600">
            View all
          </NavLink>
        </div>
      </section>

      <section className="section">
        <h2 className="text-left">Favorite Tackle</h2>
        <ul className="tackle-list">
          {tackle.map((item) => (
            <li key={item.id} className="tackle-item">
              <span>{item.name}</span>
              <span>({item.quantity})</span>
            </li>
          ))}
        </ul>
        <div className="text-right">
          <NavLink to={"/tackle"} className="text-right text-blue-600">
            View all
          </NavLink>
        </div>
      </section>

      <section className="section analytics-section">
        <h2>Fishing Insights</h2>
        <div className="analytics">
          <div className="analytics-item">
            <strong>Fish Caught:</strong>
            <p>
              {analytics.fishCaught}
            </p>
          </div>
          <div className="analytics-item">
            <strong>Time Since Last Trip:</strong>
            <p>
              {analytics.timeSinceLastTrip}
            </p>
          </div>
          <div className="analytics-item">
            <strong>Most Used Tackle:</strong>
            <p>
              {analytics.mostUsedTackle}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
