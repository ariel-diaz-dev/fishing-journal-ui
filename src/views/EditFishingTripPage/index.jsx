import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Map from "../../components/Map";
import MultiCheckboxes from "../../components/MultiCheckboxes";
import TidesWidget from "../../components/TidesWidget";
import TackleSelect from "../../components/TackleSelect";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useToast } from "../../components/Toast/useToast";
import useLocation from "../../hooks/useLocation";
import {
  useGetTripByIdQuery,
  useUpdateTripMutation,
  useDeleteTripMutation,
  useGetTackleQuery
} from "../../services/fishing-journal-api";
import { weatherConditions } from "../../configs";

import "./index.css";

const EditFishingTripPage = () => {
  const navigate = useNavigate();
  const { data: tackle } = useGetTackleQuery();
  const [updateTrip, { isLoading: isUpdating }] = useUpdateTripMutation();
  const [deleteTrip] = useDeleteTripMutation();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { successToast, errorToast } = useToast();
  const { data, error, isLoading } = useGetTripByIdQuery("trip-001");

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
      successToast("Trip report updated successfully!");
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Failed to save trip:', err);
      errorToast("Failed to update trip report. Please try again.");
    }
  }

  const onDelete = async () => {
    try {
      await deleteTrip("trip-001").unwrap();
      successToast("Trip deleted successfully!");
      navigate("/dashboard");
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Failed to delete trip:', err);
      errorToast("Failed to delete trip. Please try again.");
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleSaveClick = () => {
    setShowSaveModal(true);
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
    handleSaveClick();
  };

  const handleTackleChange = (newTackle) => {
    setReport({ ...report, tackle: newTackle });
  };

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

        <TackleSelect
          tackle={tackle}
          selectedTackle={report.tackle}
          onTackleChange={handleTackleChange}
        />

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

        <div className="flex justify-end mt-4">
          <button type="submit" disabled={isUpdating}>Save Report</button>
          <button type="button" onClick={handleDeleteClick} className="delete-button">Delete Trip</button>
        </div>

        <ConfirmationModal
          isOpen={showSaveModal}
          title="Save Report"
          description="Are you sure you want to save this fishing report? This will update the existing trip with your changes."
          variant="primary"
          confirmButtonText="Save"
          cancelButtonText="Cancel"
          onConfirm={() => {
            setShowSaveModal(false);
            onSaveReport();
          }}
          onCancel={() => setShowSaveModal(false)}
        />

        <ConfirmationModal
          isOpen={showDeleteModal}
          title="Delete Trip"
          description="Are you sure you want to delete this trip? This action cannot be undone and all trip data will be permanently lost."
          variant="danger"
          confirmButtonText="Delete"
          cancelButtonText="Cancel"
          onConfirm={() => {
            setShowDeleteModal(false);
            onDelete();
          }}
          onCancel={() => setShowDeleteModal(false)}
        />
      </form>
    </div>
  );
};

export default EditFishingTripPage;
