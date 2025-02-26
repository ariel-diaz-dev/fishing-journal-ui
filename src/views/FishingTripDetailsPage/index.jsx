import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Map from "../../components/Map";
import useLocation from "../../hooks/useLocation";
import {
  useGetTripByIdQuery,
  useUpdateTripMutation
} from "../../services/fishing-journal-api";

import "./index.css";

const FishingTripDetailsPage = () => {
  const navigate = useNavigate();

  const [updateTrip, { isLoading: isUpdating }] = useUpdateTripMutation();
  const { data, error, isLoading } = useGetTripByIdQuery("trip-001");

  const [report, setReport] = useState(
    {
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
      lures: "",
      gear: "",
      videoURL: "",
      vessel: ""
    }
  );

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

  const onDelete = () => {
    alert("Deleted trip ...");
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveReport(report);
  };

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

        <label className="text-left">
          Gear:
          <textarea
            name="gear"
            value={report.gear}
            onChange={handleInputChange}
            placeholder="e.g 7 ft Saint Croix Rod, 3000 Reel, 15 lb Line ..."
            className="font-normal"
          />
        </label>

        <label className="text-left">
          Lures Used:
          <textarea
            name="lures"
            value={report.lures}
            onChange={handleInputChange}
            placeholder="e.g Topwater Popper, Soft Plastic Jerkbait, etc ..."
            className="font-normal"
          />
        </label>

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
