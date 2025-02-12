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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setLocationByName(report.location);
  }, []);

  const onSaveReport = () => {
    alert("Saved report ...");
  }

  const onDelete = () => {
    alert("Deleted trip ...");
  }
  // State for the report enrichment
  const [report, setReport] = useState({
    "id": "trip-001",
    "location": "Flamingo, Everglades",
    "date": moment("2025-01-01").format("MMM. D, YYYY"),
    "arrivalTime": moment("2025-01-01T12:00:00.000Z").format("h:mm A"),
    "departureTime": moment("2025-01-01T05:00:00.000Z").format("hh:mm"),
    "notes": "Excited to explore the flats and catch some snook!",
    "firstHighTide": moment("2025-01-01T05:45:00.000Z").format("h:mm A"),
    "firstLowTide": moment("2025-01-01T11:30:00.000Z").format("h:mm A"),
    "secondHighTide": moment("2025-01-01T18:15:00.000Z").format("h:mm A"),
    "secondLowTide": moment("2025-01-01T00:20:00.000Z").format("h:mm A"),
    "waterTemperature": 26,
    "windSpeed": 12,
    "windDirection": "NE",
    "temperature": 28,
    "speciesCaught": "Snook, Redfish, Tarpon",
    "weatherConditions": "Sunny with occasional clouds. Light breeze throughout the day.",
    "lures": "Topwater Popper, Soft Plastic Jerkbait",
    "gear": "Medium-action rod, spinning reel, braided line",
    "videoURL": "https://www.youtube.com/watch?v=example",
    "vessel": "Hobie Outback Kayak"
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to ${value}`);
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
          <p><strong>Location:</strong> {report.location}</p>
          <p><strong>Date:</strong> {report.date}</p>
          <p><strong>Arrival Time:</strong> {report.arrivalTime}</p>
          <p><strong>Notes:</strong> {report.notes}</p>
          <p><strong>Tides:</strong> &#9660;{report.firstLowTide} &#9650;{report.firstHighTide} &#9660;{report.secondLowTide} &#9650;{report.secondHighTide} </p>
          <p><strong>Water Temperature:</strong> {report.waterTemperature}°F</p>
          <p><strong>Weather Forecast:</strong> {report.temperature}°F, {report.wind} mph ({report.windDirection})</p>
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
          Gear:
          <textarea
            name="gear"
            value={report.gear}
            onChange={handleInputChange}
            placeholder="e.g 7 ft Saint Croix Rod, 3000 Reel, 15 lb Line ..."
          />
        </label>

        <label>
          Lures Used:
          <select
            name="lures"
            multiple
            value={report.lures}
            onChange={(e) => handleMultiSelectChange(e, "lures")}
          >
            <option value="spinner">Spinner</option>
            <option value="softPlastic">Soft Plastic</option>
            <option value="crankbait">Crankbait</option>
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
