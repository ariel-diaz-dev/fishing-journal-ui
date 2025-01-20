import React, { useState } from "react";
import Map from '../../components/Map';
import "./index.css";

const NewFishingTrip = () => {
    const [tripDetails, setTripDetails] = useState({
        date: "",
        location: "",
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
            location: "",
            estimatedArrivalTime: "",
            gear: "",
            notes: "",
        });
    };

    return (
        <div className="new-fishing-trip-container">
            <div className="new-fishing-trip-form">
                <h2>Plan a New Fishing Trip</h2>
                <form className="new-fishing-trip-form" onSubmit={handleSubmit}>
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            value={tripDetails.date}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Location:
                        <input
                            type="text"
                            name="location"
                            value={tripDetails.location}
                            onChange={handleChange}
                            placeholder="Enter the fishing location"
                            required
                        />
                    </label>
                    <label>
                        Estimated Arrival Time:
                        <input
                            type="time"
                            name="estimatedArrivalTime"
                            value={tripDetails.estimatedArrivalTime}
                            onChange={handleChange}
                            required
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
                        />
                    </label>
                    <label>
                        Notes:
                        <textarea
                            name="notes"
                            value={tripDetails.notes}
                            onChange={handleChange}
                            placeholder="Add any additional notes..."
                        ></textarea>
                    </label>
                    <button type="submit">Save Trip</button>
                </form>
            </div>
            <div className="map-container">
                <Map />
            </div>
        </div>
    );
};

export default NewFishingTrip;
