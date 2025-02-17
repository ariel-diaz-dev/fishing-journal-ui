import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddTackleMutation } from "../../services/fishing-journal-api";
import "./index.css";

const NewTacklePage = () => {
    const navigate = useNavigate();
    const [addTackle, { isLoading }] = useAddTackleMutation();

    const [tackleDetails, setTackleDetails] = useState({
        name: "",
        type: "-1",
        brand: "",
        model: "",
        notes: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTackleDetails({ ...tackleDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addTackle(tackleDetails).unwrap();
            navigate("/tackle");
        } catch (err) {
            console.error("Failed to save tackle:", err);
        }
    };

    return (
        <div className="new-tackle-page">
            <form className="tackle-form" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Tackle</h2>

                <div className="form-grid text-left">
                    <label>
                        <p><strong>Name:</strong></p>
                        <input
                            type="text"
                            name="name"
                            value={tackleDetails.name}
                            onChange={handleChange}
                            required
                            placeholder="e.g. St. Croix Avid Inshore 7' Light Fast"
                        />
                    </label>

                    <label>
                        <p><strong>Type:</strong></p>
                        <select
                            name="type"
                            value={tackleDetails.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="-1">Select an option</option>
                            <option value="Rod">Rod</option>
                            <option value="Reel">Reel</option>
                            <option value="Line">Line</option>
                            <option value="Lure">Lure</option>
                            <option value="Hook">Hook</option>
                            <option value="Terminal Tackle">Terminal Tackle</option>
                        </select>
                    </label>

                    <label>
                        <p><strong>Brand:</strong></p>
                        <input
                            type="text"
                            name="brand"
                            value={tackleDetails.brand}
                            onChange={handleChange}
                            required
                            placeholder="e.g. St. Croix"
                        />
                    </label>

                    <label>
                        <p><strong>Model:</strong></p>
                        <input
                            type="text"
                            name="model"
                            value={tackleDetails.model}
                            onChange={handleChange}
                            placeholder="e.g. Avid Inshore"
                        />
                    </label>
                </div>

                <label className="full-width">
                    <p><strong>Notes:</strong></p>
                    <textarea
                        name="notes"
                        value={tackleDetails.notes}
                        onChange={handleChange}
                        placeholder="Add any additional notes about this tackle..."
                        rows="4"
                    />
                </label>

                <button
                    type="submit"
                    className="mt-4"
                    disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Tackle"}
                </button>
            </form>
        </div>
    );
};

export default NewTacklePage;