import React, { useEffect, useState } from "react";
import moment from "moment";
import Map from "../../components/Map";
import useLocation from "../../hooks/useLocation";
import "./index.css";

const FishingTripDetailsPage = () => {
  const {
    setLocationByName,
    selectedLocation
  } = useLocation();

  const trip = {
    location: "Flamingo, Everglades",
    date: moment("2025-01-01").format("MMMM Do, YYYY"),
    arrivalTime: moment("06:00", "HH:mm").format("h:mm A"),
    gear: "Rod, Reel, Bait",
    notes: "Looking forward to the trip!",
    tideTimes: "High: 6:30 AM, Low: 2:00 PM",
    waterTemperature: 26,
    weatherForecast: {
      temperature: 24,
      wind: 12,
      windDirection: "NE",
    },
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setLocationByName(trip.location);
  }, []);

  const onSaveReport = () => {
    alert("Saved report ...");
  }

  const onDelete = () => {
    alert("Deleted trip ...");
  }

  // State for the report enrichment
  const [report, setReport] = useState({
    speciesCaught: [],
    weatherConditions: "",
    luresUsed: [],
    gearUsed: [],
    departureTime: "",
    vessel: "",
    videoURL: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };

  const handleMultiSelectChange = (e, key) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setReport({ ...report, [key]: selectedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveReport(report);
  };

  return (
    <div className="details-page">
      <h1 className="page-title">Fishing Trip Details</h1>

      {/* Trip Details */}
      <div className="trip-details text-left grid grid-cols-2 ">
        <div className="pt-2 pl-5">
          <p><strong>Location:</strong> {trip.location}</p>
          <p><strong>Date:</strong> {trip.date}</p>
          <p><strong>Arrival Time:</strong> {trip.arrivalTime}</p>
          <p><strong>Gear:</strong> {trip.gear}</p>
          <p><strong>Notes:</strong> {trip.notes}</p>
          <p><strong>Tide Times:</strong> {trip.tideTimes}</p>
          <p><strong>Water Temperature:</strong> {trip.waterTemperature}°F</p>
          <p><strong>Weather Forecast:</strong> {trip.weatherForecast.temperature}°F, {trip.weatherForecast.wind} mph ({trip.weatherForecast.windDirection})</p>
        </div>
        <div>
          <Map
            location={selectedLocation.coordinates}
            options={{
              mapContainerStyle: {
                height: "300px",
                width: "100%",
                borderTopRightRadius: "8px",
                borderBottomRightRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
              },
              zoom: 13,
              options: {
                mapTypeId: "satellite",
                clickableIcons: false,
                fullscreenControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                zoomControl: false,
                draggable: false
              }
            }}
            styles={{
              height: "300px",
              width: "100%",
              borderBottomRightRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
          />
        </div>
      </div>

      {/* Fishing Report Form */}
      <form className="report-form" onSubmit={handleSubmit}>
        <h2>Fishing Report</h2>

        <label>
          Species Caught:
          <textarea
            name="speciesCaught"
            value={report.speciesCaught}
            onChange={(e) => handleInputChange(e)}
            placeholder="e.g Snook (25 in), Redfish (30 in), Tarpon (40 in) ..."
          />
        </label>

        <label>
          Weather Conditions:
          <textarea
            name="weatherConditions"
            value={report.weatherConditions}
            onChange={handleInputChange}
            placeholder="How did you find the weather?"
          />
        </label>

        <label>
          Lures Used:
          <select
            name="luresUsed"
            multiple
            value={report.luresUsed}
            onChange={(e) => handleMultiSelectChange(e, "luresUsed")}
          >
            <option value="spinner">Spinner</option>
            <option value="softPlastic">Soft Plastic</option>
            <option value="crankbait">Crankbait</option>
          </select>
        </label>

        <label>
          Gear Used:
          <select
            name="gearUsed"
            multiple
            value={report.gearUsed}
            onChange={(e) => handleMultiSelectChange(e, "gearUsed")}
          >
            <option value="rod">Rod</option>
            <option value="reel">Reel</option>
            <option value="line">Line</option>
          </select>
        </label>

        <label>
          Departure Time:
          <input
            type="time"
            name="departureTime"
            value={report.departureTime}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Vessel:
          <input
            type="text"
            name="vessel"
            value={report.vessel}
            onChange={handleInputChange}
            placeholder="Enter vessel name"
          />
        </label>

        <label>
          Video URL:
          <input
            type="url"
            name="videoURL"
            value={report.videoURL}
            onChange={handleInputChange}
            placeholder="Enter video link"
          />
        </label>

        <button type="submit">Save Report</button>
        <button type="button" onClick={onDelete} className="delete-button">Delete Trip</button>
      </form>
    </div>
  );
};

export default FishingTripDetailsPage;
