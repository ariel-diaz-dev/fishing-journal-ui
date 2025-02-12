import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Ensure you're using React Router for navigation
import "./index.css";
import NewFishingTripTabs from "../../components/NewFishingTripTabs";
import useLocation from "../../hooks/useLocation";

const NewFishingTripPage = () => {
    const navigate = useNavigate();
    const {
        locations,
        setLocationByName,
        selectedLocation,
        defaultLocation
    } = useLocation();
    const defaultLocationName = defaultLocation.name;

    const [tripDetails, setTripDetails] = useState({
        date: new Date().toJSON().slice(0, 10),
        locationName: defaultLocationName,
        arrivalTime: "07:00",
        notes: "",
    });

    const handleLocationChange = (e) => {
        const locationName = e.target.value;
        setLocationByName(locationName);
        setTripDetails({ ...tripDetails, locationName: locationName });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTripDetails({ ...tripDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting trip -> ", tripDetails);
        setLocationByName(defaultLocationName);
        // Reset form to default
        setTripDetails({
            date: "",
            locationName: defaultLocationName,
            arrivalTime: "",
            notes: "",
        });
        navigate('/');
    };

    return (
        <React.Fragment>
            <div className="new-fishing-trip-container">
                <form className="new-fishing-trip-form text-left" onSubmit={handleSubmit}>
                    <h2 className="text-xl font-semibold uppercase mb-0">Plan a New Fishing Trip</h2>
                    <label>
                        Location:
                        <div className="form-group">
                            <select
                                id="location-dropdown"
                                className="form-select"
                                onChange={handleLocationChange}
                                value={tripDetails.locationName}
                            >
                                {locations.map((location) => (
                                    <option key={location.name} value={location.name}>
                                        {location.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </label>
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            value={tripDetails.date}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </label>
                    <label>
                        Arrival Time:
                        <input
                            type="time"
                            name="arrivalTime"
                            value={tripDetails.arrivalTime}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </label>
                    <label>
                        Notes:
                        <textarea
                            name="notes"
                            value={tripDetails.notes}
                            onChange={handleChange}
                            placeholder="Add any additional notes..."
                            rows="5"
                            className="form-textarea"
                        ></textarea>
                    </label>
                    <button type="submit" className="form-button">Save Trip</button>
                </form>
                <div>
                    <NewFishingTripTabs location={selectedLocation} />
                </div>
            </div>
        </React.Fragment>
    );
};

export default NewFishingTripPage;
