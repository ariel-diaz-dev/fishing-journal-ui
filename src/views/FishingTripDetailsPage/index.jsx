import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Map from "../../components/Map";
import TidesWidget from "../../components/TidesWidget";
import ConfirmationModal from "../../components/ConfirmationModal";
import useLocation from "../../hooks/useLocation";
import {
  useGetTripByIdQuery,
  useGetTackleQuery
} from "../../services/fishing-journal-api";

import "./index.css";

const FishingTripDetailsPage = () => {
  const navigate = useNavigate();
  const { data: tackle } = useGetTackleQuery();
  const [showEditModal, setShowEditModal] = useState(false);
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
    selectedLocation
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

  const handleEditTrip = () => {
    navigate(`/trips/trip-001/edit`);
  };

  const handleEditClick = () => {
    setShowEditModal(true);
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

  const renderTackleDisplay = () => (
    <div className="text-left">
      <strong>Tackle Used:</strong>
      <div className="w-full font-normal mt-1 p-2 bg-gray-100 rounded">
        {report.tackle.length > 0 ? (
          report.tackle.map(tackleId => {
            const item = tackle?.find(t => t.id === tackleId);
            if (!item) return null;
            return (
              <div key={item.id} className="mb-1 last:mb-0">
                <span>&bull; {item.name}&nbsp;</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {item.type}
                </span>
              </div>
            );
          })
        ) : (
          'No tackle recorded'
        )}
      </div>
    </div>
  );

  return (
    <div className="details-page">
      <h2 className="text-2xl font-bold mb-10 text-gray-600">"{report.title}"</h2>

      {/* Trip Details */}
      <div className="trip-details text-left grid grid-cols-2 ">
        <div className="pr-5">
          <div className="text-left">
            <strong>Location:</strong>
            <div className="w-full font-normal mt-1 p-2 bg-gray-100 rounded">
              {report.location}
            </div>
          </div>
          <div className="text-left mt-4">
            <strong>Date:</strong>
            <div className="w-full font-normal mt-1 p-2 bg-gray-100 rounded">
              {moment(report.date).format('MMMM Do, YYYY')}
            </div>
          </div>
          <div className="flex-1 text-left mt-4">
            <strong>Arrival Time:</strong>
            <div className="w-full font-normal mt-1 p-2 bg-gray-100 rounded">
              {report.arrivalTime}
            </div>
          </div>
          <div className="flex-1 text-left mt-4">
            <strong>Departure Time:</strong>
            <div className="w-full font-normal mt-1 p-2 bg-gray-100 rounded">
              {report.departureTime}
            </div>
          </div>
        </div>
        <div className="pt-8">
          <Map
            location={selectedLocation.coordinates}
            options={{
              mapContainerStyle: {
                height: "288px",
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

      {/* Fishing Report Details */}
      <div className="report-form space-y-6 mt-4">
        <div>
          <div className="text-left flex-1">
            <TidesWidget
              tides={report.tides}
              arrivalTime={report.arrivalTime}
              departureTime={report.departureTime}
              readOnly={true}
            />
          </div>
        </div>
        <div className="text-left mt-6">
          <strong>Conditions:</strong>
          <div className="mt-2">
            {report.weatherConditions && report.weatherConditions.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {report.weatherConditions.map(condition => (
                  <span key={condition} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {getWeatherDisplayName(condition)}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-gray-500">No conditions recorded</span>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-6">
          <div className="text-left flex-1">
            <strong>Water Temperature:</strong>
            <div className="w-full font-normal mt-1 p-2 bg-gray-100 rounded">
              {report.waterTemperature ? `${report.waterTemperature}°F` : 'Not recorded'}
            </div>
          </div>
          <div className="text-left flex-1">
            <strong>Temperature:</strong>
            <div className="w-full font-normal mt-1 p-2 bg-gray-100 rounded">
              {report.temperature ? `${report.temperature}°F` : 'Not recorded'}
            </div>
          </div>
        </div>
        <div className="text-left mt-6">
          <strong>Species Caught:</strong>
          <div className="w-full font-normal mt-1 p-2 bg-gray-100 rounded min-h-[60px] whitespace-pre-wrap">
            {report.speciesCaught || 'No species recorded'}
          </div>
        </div>

        {renderTackleDisplay()}

        <div className="text-left mt-6">
          <strong>Video URL:</strong>
          <div className="w-full font-normal mt-1 p-2 bg-gray-100 rounded">
            {report.videoURL ? (
              <a href={report.videoURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                {report.videoURL}
              </a>
            ) : (
              'No video URL provided'
            )}
          </div>
        </div>

        {/* TODO: Add Retro Style Note Default: What went well/poorly? Action items? */}

        <div className="text-left mt-6">
          <strong>Notes:</strong>
          <div className="w-full font-normal mt-1 p-2 bg-gray-100 rounded min-h-[80px] whitespace-pre-wrap">
            {report.notes || 'No notes provided'}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleEditClick}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Trip
          </button>
        </div>

        <ConfirmationModal
          isOpen={showEditModal}
          title="Edit Trip"
          description="Are you sure you want to edit this fishing trip? You will be taken to the edit page where you can make changes."
          variant="primary"
          confirmButtonText="Edit"
          cancelButtonText="Cancel"
          onConfirm={() => {
            setShowEditModal(false);
            handleEditTrip();
          }}
          onCancel={() => setShowEditModal(false)}
        />
      </div>
    </div>
  );
};

export default FishingTripDetailsPage;
