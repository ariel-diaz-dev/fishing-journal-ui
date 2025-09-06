import React, { useState } from "react";
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
    useGetTackleQuery
} from "../../services/fishing-journal-api";
import { weatherConditions } from "../../configs";

import "./index.css";

const NewFishingTripPage = () => {
    const navigate = useNavigate();
    const { data: tackle } = useGetTackleQuery();

    const [showSaveModal, setShowSaveModal] = useState(false);
    const { successToast, errorToast } = useToast();
    const [report, setReport] = useState({
        id: "",
        title: "",
        location: "",
        notes: "",
        date: moment().format("YYYY-MM-DD"),
        arrivalTime: moment().set({ hour: 7, minute: 0 }).format("HH:mm"),
        departureTime: moment().set({ hour: 12, minute: 0 }).format("HH:mm"),
        tides: {
            first: {
                high: {
                    time: moment().set({ hour: 9, minute: 30 }).format("HH:mm"),
                    height: 2.5
                },
                low: {
                    time: moment().set({ hour: 3, minute: 30 }).format("HH:mm"),
                    height: 0
                }
            },
            second: {
                high: {
                    time: moment().set({ hour: 21, minute: 30 }).format("HH:mm"),
                    height: 1.5
                },
                low: {
                    time: moment().set({ hour: 15, minute: 30 }).format("HH:mm"),
                    height: 0
                }
            }
        },
        temperature: null,
        waterTemperature: null,
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
        } else if (name.startsWith("tides.")) {
            // Handle tides nested object updates
            const [, period, type, property] = name.split(".");
            setReport({
                ...report,
                tides: {
                    ...report.tides,
                    [period]: {
                        ...report.tides[period],
                        [type]: {
                            ...report.tides[period][type],
                            [property]: property === "height" ? parseFloat(value) || 0 : value
                        }
                    }
                }
            });
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
        setShowSaveModal(true);
    };

    const handleSaveTrip = () => {
        try {
            console.log(">>>>>>> SAVING TRIP", report);
            // TODO: Implement save new fishing trip logic
            setShowSaveModal(false);
            successToast("New trip report saved successfully!");
            // TODO: navigate to the read-only view of the newly created trip
            navigate("/dashboard");
            window.scrollTo(0, 0);
            // TODO: Navigate to dashboard after implementation
        } catch (err) {
            console.error('Failed to save trip:', err);
            errorToast("Failed to save trip report. Please try again.");
            setShowSaveModal(false);
        }
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
                            placeholder="The one where ..."
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

                {/* Tides Input Fields */}
                <div className="tides-inputs-section mt-4 mb-4">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">Tide Information</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="first-tides">
                            <h4 className="font-medium mb-3 text-gray-600">First Tides</h4>
                            <div className="flex gap-4 mb-3">
                                <label className="flex-1 text-left">
                                    <strong>High Time:</strong>
                                    <input
                                        type="time"
                                        name="tides.first.high.time"
                                        value={report.tides.first.high.time}
                                        onChange={handleInputChange}
                                        className="w-full font-normal mt-1"
                                    />
                                </label>
                                <label className="flex-1 text-left">
                                    <strong>High Height (ft):</strong>
                                    <input
                                        type="number"
                                        step="0.1"
                                        name="tides.first.high.height"
                                        value={report.tides.first.high.height}
                                        onChange={handleInputChange}
                                        placeholder="0.0"
                                        className="w-full font-normal mt-1"
                                    />
                                </label>
                            </div>
                            <div className="flex gap-4">
                                <label className="flex-1 text-left">
                                    <strong>Low Time:</strong>
                                    <input
                                        type="time"
                                        name="tides.first.low.time"
                                        value={report.tides.first.low.time}
                                        onChange={handleInputChange}
                                        className="w-full font-normal mt-1"
                                    />
                                </label>
                                <label className="flex-1 text-left">
                                    <strong>Low Height (ft):</strong>
                                    <input
                                        type="number"
                                        step="0.1"
                                        name="tides.first.low.height"
                                        value={report.tides.first.low.height}
                                        onChange={handleInputChange}
                                        placeholder="0.0"
                                        className="w-full font-normal mt-1"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="second-tides">
                            <h4 className="font-medium mb-3 text-gray-600">Second Tides</h4>
                            <div className="flex gap-4 mb-3">
                                <label className="flex-1 text-left">
                                    <strong>High Time:</strong>
                                    <input
                                        type="time"
                                        name="tides.second.high.time"
                                        value={report.tides.second.high.time}
                                        onChange={handleInputChange}
                                        className="w-full font-normal mt-1"
                                    />
                                </label>
                                <label className="flex-1 text-left">
                                    <strong>High Height (ft):</strong>
                                    <input
                                        type="number"
                                        step="0.1"
                                        name="tides.second.high.height"
                                        value={report.tides.second.high.height}
                                        onChange={handleInputChange}
                                        placeholder="0.0"
                                        className="w-full font-normal mt-1"
                                    />
                                </label>
                            </div>
                            <div className="flex gap-4">
                                <label className="flex-1 text-left">
                                    <strong>Low Time:</strong>
                                    <input
                                        type="time"
                                        name="tides.second.low.time"
                                        value={report.tides.second.low.time}
                                        onChange={handleInputChange}
                                        className="w-full font-normal mt-1"
                                    />
                                </label>
                                <label className="flex-1 text-left">
                                    <strong>Low Height (ft):</strong>
                                    <input
                                        type="number"
                                        step="0.1"
                                        name="tides.second.low.height"
                                        value={report.tides.second.low.height}
                                        onChange={handleInputChange}
                                        placeholder="0.0"
                                        className="w-full font-normal mt-1"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
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
                            value={report.waterTemperature}
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
                        placeholder="Enter any additional notes about your awesome fishing trip"
                        className="font-normal"
                    />
                </label>

                <div className="flex justify-end mt-4">
                    <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Save Report
                    </button>
                </div>

                <ConfirmationModal
                    isOpen={showSaveModal}
                    title="Save Report"
                    description="Are you sure you want to save this new fishing trip report? Once saved, you can edit it later from your dashboard."
                    variant="primary"
                    confirmButtonText="Save"
                    cancelButtonText="Cancel"
                    onConfirm={handleSaveTrip}
                    onCancel={() => setShowSaveModal(false)}
                />
            </form>
        </div>
    );
};

export default NewFishingTripPage;
