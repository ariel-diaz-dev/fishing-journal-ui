import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Map from "../../components/Map";
import MultiCheckboxes from "../../components/MultiCheckboxes";
import TidesWidget from "../../components/TidesWidget";
import useLocation from "../../hooks/useLocation";
import {
  useGetTripByIdQuery,
  useUpdateTripMutation,
  useDeleteTripMutation,
  useGetTackleQuery
} from "../../services/fishing-journal-api";

import "./index.css";

const EditFishingTripPage = () => {
  const navigate = useNavigate();
  const { data: tackle } = useGetTackleQuery();
  const [updateTrip, { isLoading: isUpdating }] = useUpdateTripMutation();
  const [deleteTrip] = useDeleteTripMutation();
  const { data, error, isLoading } = useGetTripByIdQuery("trip-001");
  const weatherConditions = ['Windy', 'Cloudy', 'Sunny', 'Hot', 'VeryHot', 'Cold', 'VeryCold', 'Rainy', 'Foggy', 'Stormy', 'StrongCurrent', 'Other'];

  const [report, setReport] = useState({
    id: "",
    title: "",
    location: "",
    notes: "",
    date: moment().format("YYYY-MM-DD"),
    arrivalTime: moment().format(),
    departureTime: moment().format(),
    tides: {
      first: {
        high: {
          time: moment().format(),
          height: 0
        },
        low: {
          time: moment().format(),
          height: 0
        }
      },
      second: {
        high: {
          time: moment().format(),
          height: 0
        },
        low: {
          time: moment().format(),
          height: 0
        }
      }
    },
    waterTemperature: 0,
    windSpeed: 0,
    windDirection: "",
    temperature: 0,
    speciesCaught: "",
    weatherConditions: [],
    tackle: [],
    videoURL: ""
  });

  const {
    setLocationByName,
    selectedLocation,
    locations
  } = useLocation();

  useEffect(() => {
    if (!isLoading && data) {
      const formattedData = {
        ...data,
        date: moment(data.date).format("YYYY-MM-DD"),
        arrivalTime: moment(data.arrivalTime).format("hh:mm"),
        departureTime: moment(data.departureTime).format("hh:mm"),
        tides: {
          first: {
            high: {
              time: moment(data.firstHighTideTime).format("h:mm A"),
              height: data.firstHighTideHeight
            },
            low: {
              time: moment(data.firstLowTideTime).format("h:mm A"),
              height: data.firstLowTideHeight
            }
          },
          second: {
            high: {
              time: moment(data.secondHighTideTime).format("h:mm A"),
              height: data.secondHighTideHeight
            },
            low: {
              time: moment(data.secondLowTideTime).format("h:mm A"),
              height: data.secondLowTideHeight
            }
          }
        }
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
    } else if (name === "location") {
      setReport({ ...report, location: value });
      setLocationByName(value);
    } else {
      setReport({ ...report, [name]: value });
    }
  };

  const handleWeatherConditionsChange = (newConditions) => {
    setReport({
      ...report,
      weatherConditions: newConditions
    });
  };

  const getWeatherDisplayName = (condition) => {
    switch (condition) {
      case 'VeryHot':
        return 'Very Hot';
      case 'VeryCold':
        return 'Very Cold';
      case 'StrongCurrent':
        return 'Strong Current';
      default:
        return condition;
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
      <h2 className="text-2xl font-bold mb-10 text-gray-800">Fishing Report</h2>

      {/* Trip Details */}
      <div className="trip-details text-left grid grid-cols-2 ">
        <div className="pr-5">
          <label className="text-left">
            <strong>Title:</strong>
            <input
              type="text"
              name="title"
              value={report.title}
              onChange={handleInputChange}
              placeholder="Enter trip title"
              className="w-full font-normal mt-1"
            />
          </label>
          <label className="text-left mt-4">
            <strong>Location:</strong>
            <select
              name="location"
              value={report.location}
              onChange={handleInputChange}
              className="w-full font-normal mt-1"
            >
              {locations.map(location => (
                <option key={location.name} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-left mt-4">
            <strong>Date:</strong>
            <input
              type="date"
              name="date"
              value={report.date}
              onChange={handleInputChange}
              className="w-full font-normal mt-1"
            />
          </label>
          <div className="flex gap-4 mt-4">
            <label className="flex-1 text-left">
              <strong>Arrival Time:</strong>
              <input
                type="time"
                name="arrivalTime"
                value={report.arrivalTime}
                onChange={handleInputChange}
                className="w-full font-normal mt-1"
              />
            </label>
            <label className="flex-1 text-left">
              <strong>Departure Time:</strong>
              <input
                type="time"
                name="departureTime"
                value={report.departureTime}
                onChange={handleInputChange}
                className="w-full font-normal mt-1"
              />
            </label>
          </div>
        </div>
        <div className="pt-8">
          <Map
            location={selectedLocation.coordinates}
            options={{
              mapContainerStyle: {
                height: "320px",
                width: "100%",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
                borderBottomLeftRadius: "8px",
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
        <div>
          <label className="text-left flex-1">
            <TidesWidget
              tides={report.tides}
              arrivalTime={report.arrivalTime}
              departureTime={report.departureTime}
            />
          </label>
        </div>
        <MultiCheckboxes
          label="Conditions"
          options={weatherConditions}
          selectedValues={report.weatherConditions || []}
          onChange={handleWeatherConditionsChange}
          getDisplayName={getWeatherDisplayName}
        />
        <div className="flex flex-row gap-4 mt-3">
          <label className="text-left flex-1">
            Water Temperature:
            <input
              type="number"
              name="waterTemperature"
              value={report.waterTemperature || ''}
              onChange={handleInputChange}
              placeholder="Enter water temperature"
              className="w-full font-normal mt-1"
            />
          </label>
          <label className="text-left flex-1">
            Temperature:
            <input
              type="number"
              name="temperature"
              value={report.temperature}
              onChange={handleInputChange}
              placeholder="Enter temperature"
              className="w-full font-normal mt-1"
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

        {renderTackleSelect()}

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

export default EditFishingTripPage;
