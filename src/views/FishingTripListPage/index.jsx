import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetTripsQuery } from "../../services/fishing-journal-api";
import RedirectButton from "../../components/RedirectButton";
import "./index.css";

const FishingTripListPage = () => {
  const navigate = useNavigate();
  const { data: trips, error, isLoading } = useGetTripsQuery();

  const redirectToFishingTripDetails = (tripId) => {
    navigate(`/trips/${tripId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="fishing-trip-list-page">
      <div className="page-header">
        <h1>Fishing Trips</h1>
        <RedirectButton to="/new-trip">Plan New Trip</RedirectButton>
      </div>

      <div className="trips-container">
        {trips && trips.length > 0 ? (
          <ul className="trips-list">
            {trips.map((trip) => (
              <li
                key={trip.id}
                onClick={() => redirectToFishingTripDetails(trip.id)}
                className={`trip-item cursor-pointer ${trip.status?.toLowerCase()}`}
              >
                <div className="trip-info">
                  <span className="trip-date">{trip.date}</span>
                  <span className="trip-location">{trip.location}</span>
                </div>
                {trip.status && (
                  <span className="trip-status">{trip.status}</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-trips">
            <p>No fishing trips found.</p>
            <RedirectButton to="/new-trip">Plan Your First Trip</RedirectButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default FishingTripListPage;