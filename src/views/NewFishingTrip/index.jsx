import React, { useState } from "react";
import Map from '../../components/Map';
import "./index.css";

const NewFishingTrip = () => {
    const [tripDetails, setTripDetails] = useState({
        date: "",
        location: "Turkey Point, Biscayne", // Default to the first option
        estimatedArrivalTime: "",
        gear: "",
        notes: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTripDetails({ ...tripDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Fishing Trip Details:", tripDetails);
        alert("Fishing trip planned successfully!");
        setTripDetails({
            date: "",
            location: "Turkey Point, Biscayne", // Reset to default
            estimatedArrivalTime: "",
            gear: "",
            notes: "",
        });
    };

    return (
        <div className="new-fishing-trip-container">
            <form className="new-fishing-trip-form text-left" onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold uppercase mb-0">Plan a New Fishing Trip</h2>
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
                    Location:
                    <select
                        name="location"
                        value={tripDetails.location}
                        onChange={handleChange}
                        required
                        className="form-select"
                    >
                        <option value="Turkey Point, Biscayne">Turkey Point, Biscayne</option>
                        <option value="Flamingo, Everglades">Flamingo, Everglades</option>
                    </select>
                </label>
                <label>
                    Estimated Arrival Time:
                    <input
                        type="time"
                        name="estimatedArrivalTime"
                        value={tripDetails.estimatedArrivalTime}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </label>
                <label>
                    Gear:
                    <input
                        type="text"
                        name="gear"
                        value={tripDetails.gear}
                        onChange={handleChange}
                        placeholder="List your gear (e.g., rod, bait)"
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
            <div className="map-container">
                <Map />
            </div>
        </div>
    );
};

export default NewFishingTrip;
