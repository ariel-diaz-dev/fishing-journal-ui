import React from "react";
import "./index.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RedirectButton from "../../components/RedirectButton";
import { 
  useGetTripsQuery, 
  useGetTackleQuery,
  useGetInsightsQuery 
} from "../../services/fishing-journal-api";

const LandingPage = () => {
  const navigate = useNavigate();
  
  // Fetch data using RTK Query hooks
  const { data: trips = [], isLoading: tripsLoading } = useGetTripsQuery();
  const { data: tackle = [], isLoading: tackleLoading } = useGetTackleQuery();
  const { data: insights, isLoading: insightsLoading } = useGetInsightsQuery();

  if (tripsLoading || tackleLoading || insightsLoading) {
    return <div>Loading...</div>;
  }

  console.log(insights);

  const redirectToFishingTripDetails = (tripId) => {
    navigate(`/trips/${tripId}`);
  }
  
  const recentTrips = [...trips]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
  
  const recentTackle = tackle.slice(0, 3);

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
          {recentTrips.map((trip) => (
            <li
              key={trip.id}
              onClick={() => redirectToFishingTripDetails(trip.id)}
              className={`trip-item cursor-pointer ${trip.status?.toLowerCase()}`}>
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
        <div className="section-header">
          <div className="header-container">
            <h2>Tackle</h2>
          </div>
          <RedirectButton to={"/new-tackle"}>
            Add New Tackle
          </RedirectButton>
        </div>
        <ul className="tackle-list">
          {recentTackle.map((item) => (
            <li key={item.id} className="tackle-item">
              <span>{item.type}</span>
              <span>{item.brand}</span>
              <span>{item.name}</span>
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
        <h2 className="text-left">Insights</h2>
        <div className="analytics">
          <div className="analytics-item">
            <strong>Average Fight Per Trip:</strong>
            <p>{insights?.averageFishPerTrip}</p>
          </div>
          <div className="analytics-item">
            <strong>Time Since Last Trip:</strong>
            <p>{insights?.timeSinceLastTrip}</p>
          </div>
          <div className="analytics-item">
            <strong>Most Used Tackle:</strong>
            <p>{insights?.mostUsedTackle}</p>
          </div>
          
          <div className="analytics-item">
            <strong>Top Performing Spots:</strong>
            <p>{insights?.mostPopularLocation}</p>
          </div>
          
          <div className="analytics-item">
            <strong>Best Lures:</strong>
            <p>{insights?.mostSuccessfulLure}</p>
            <ul>
              {insights?.successfulLures.map(lure => (
                <li key={lure}>{lure}</li>
              ))}
            </ul>
          </div>

          <div className="analytics-item">
            <strong>Record Catches:</strong>
            <ul>
              {insights?.recordCatches.map(fishCatch => (
                <li key={fishCatch.species}>
                  {fishCatch.species} - {fishCatch.length}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
};

export default LandingPage;