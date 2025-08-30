import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Map from "../../components/Map";
import useLocation from "../../hooks/useLocation";
import {
  useGetTripByIdQuery,
  useUpdateTripMutation,
  useDeleteTripMutation,
  useGetTackleQuery
} from "../../services/fishing-journal-api";

import "./index.css";

const FishingTripDetailsPage = () => {
  const navigate = useNavigate();
  const { data: tackle } = useGetTackleQuery();
  const [updateTrip, { isLoading: isUpdating }] = useUpdateTripMutation();
  const [deleteTrip] = useDeleteTripMutation();
  const { data, error, isLoading } = useGetTripByIdQuery("trip-001");

  const [report, setReport] = useState({
    id: "",
    location: "",
    notes: "",
    date: moment().format("YYYY-MM-DD"),
    arrivalTime: moment().format(),
    departureTime: moment().format(),
    firstHighTide: moment().format(),
    firstLowTide: moment().format(),
    secondHighTide: moment().format(),
    secondLowTide: moment().format(),
    waterTemperature: 0,
    windSpeed: 0,
    windDirection: "",
    temperature: 0,
    speciesCaught: "",
    weatherConditions: "",
    tackle: [],
    videoURL: "",
    vessel: ""
  });

  const {
    setLocationByName,
    selectedLocation
  } = useLocation();

  useEffect(() => {
    if (!isLoading && data) {
      const formattedData = {
        ...data,
        date: moment(data.date).format("MMM. D, YYYY"),
        arrivalTime: moment(data.arrivalTime).format("hh:mm"),
        departureTime: moment(data.departureTime).format("hh:mm"),
        firstHighTide: moment(data.firstHighTide).format("h:mm A"),
        firstLowTide: moment(data.firstLowTide).format("h:mm A"),
        secondHighTide: moment(data.secondHighTide).format("h:mm A"),
        secondLowTide: moment(data.secondLowTide).format("h:mm A")
      };
      setReport(formattedData);
      setLocationByName(data.location);
    }
  }, [data, isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.log(error);
    return <div>Error: {error.message}</div>
  };

  const onSaveReport = async () => {
    try {
      await updateTrip({
        id: "trip-001",
        ...report
      }).unwrap();
      navigate("/dashboard");
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Failed to save trip:', err);
    }
  }

  const onDelete = async () => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        await deleteTrip("trip-001").unwrap();
        navigate("/dashboard");
        window.scrollTo(0, 0);
      } catch (err) {
        console.error('Failed to delete trip:', err);
      }
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "tackle") {
      // Handle multiple select
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      setReport({ ...report, tackle: selectedOptions });
    } else {
      setReport({ ...report, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(report)
    onSaveReport();
  };

  const renderTackleSelect = () => (
    <div className="tackle-select-container">
      <div className="tackle-grid">

        <div className="available-tackle">
          <h3>Available Tackle:</h3>
          <div className="tackle-cards">
            {tackle?.filter(item => !report.tackle.includes(item.id)).map(item => (
              <div
                key={item.id}
                className="tackle-card"
                onClick={() => {
                  const newTackle = [...report.tackle, item.id];
                  setReport({ ...report, tackle: newTackle });
                }}
              >
                <div className="tackle-card-content">
                  <span className="tackle-name">{item.name}</span>
                  <span className="tackle-details">{item.brand}</span>
                  <span className="tackle-type">{item.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {report.tackle.length > 0 && (
          <div className="selected-tackle">
            <h3>Selected Tackle:</h3>
            <div className="tackle-tags">
              {report.tackle.map(tackleId => {
                const item = tackle?.find(t => t.id === tackleId);
                if (!item) return null;
                return (
                  <div key={item.id} className="tackle-tag">
                    <span className="tackle-tag-content">
                      <span className="tackle-name">{item.name}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const newTackle = report.tackle.filter(id => id !== item.id);
                        setReport({ ...report, tackle: newTackle });
                      }}
                      className="remove-tag"
                      aria-label={`Remove ${item.name}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" width="18px" height="18px">
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="details-page">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Fishing Trip Details</h2>

      {/* Trip Details */}
      <div className="trip-details text-left grid grid-cols-2 ">
        <div className="pt-2 pl-5 pr-5">
          <p><strong>Location:</strong> {report.location}</p>
          <p><strong>Date:</strong> {report.date}</p>
          <p><strong>Water Temperature:</strong> {report.waterTemperature}°F</p>
          <p><strong>Weather Forecast:</strong> {report.temperature}°F, {report.wind} mph ({report.windDirection})</p>
          <p><strong>Tides:</strong> &#9660;{report.firstLowTide} &#9650;{report.firstHighTide} &#9660;{report.secondLowTide} &#9650;{report.secondHighTide} </p>
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
        <div className="flex gap-4 w-full">
          <label className="flex-1 text-left">
            Arrival Time:
            <input
              type="time"
              name="arrivalTime"
              value={report.arrivalTime}
              onChange={handleInputChange}
              className="w-full font-normal"
            />
          </label>

          <label className="flex-1 text-left">
            Departure Time:
            <input
              type="time"
              name="departureTime"
              value={report.departureTime}
              onChange={handleInputChange}
              className="w-full font-normal"
            />
          </label>
        </div>

        <label className="text-left">
          Species Caught:
          <textarea
            name="speciesCaught"
            value={report.speciesCaught}
            onChange={(e) => handleInputChange(e)}
            placeholder="e.g Snook (25 in), Redfish (30 in), Tarpon (40 in) ..."
            className="font-normal"
          />
        </label>

        <label className="text-left">
          Weather Conditions:
          <textarea
            name="weatherConditions"
            value={report.weatherConditions}
            onChange={handleInputChange}
            placeholder="How did you find the weather?"
            className="font-normal"
          />
        </label>

        {renderTackleSelect()}

        <label className="text-left">
          Vessel:
          <input
            type="text"
            name="vessel"
            value={report.vessel}
            onChange={handleInputChange}
            placeholder="Enter vessel name"
            className="font-normal"
          />
        </label>

        <label className="text-left">
          Video URL:
          <input
            type="url"
            name="videoURL"
            value={report.videoURL}
            onChange={handleInputChange}
            placeholder="Enter video link"
            className="font-normal"
          />
        </label>

        {/* TODO: Add Retro Style Note Default: What went well/poorly? Action items? */}

        <label className="text-left">
          Notes:
          <textarea
            name="notes"
            value={report.notes}
            onChange={handleInputChange}
            placeholder="Enter any additional notes about your trip"
            className="font-normal"
          />
        </label>

        <button type="submit" disabled={isUpdating}>Save Report</button>
        <button type="button" onClick={onDelete} className="delete-button">Delete Trip</button>
      </form>
    </div>
  );
};

export default FishingTripDetailsPage;
