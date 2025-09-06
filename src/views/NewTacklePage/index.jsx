import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddTackleMutation } from "../../services/fishing-journal-api";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useToast } from "../../components/Toast/useToast";
import "./index.css";

const NewTacklePage = () => {
    const navigate = useNavigate();
    const [addTackle, { isLoading }] = useAddTackleMutation();
    const [showSaveModal, setShowSaveModal] = useState(false);
    const { successToast, errorToast } = useToast();

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
        setShowSaveModal(true);
    };

    const handleSaveTackle = async () => {
        try {
            await addTackle(tackleDetails).unwrap();
            successToast("Tackle saved successfully!");
            navigate("/tackle");
        } catch (err) {
            console.error("Failed to save tackle:", err);
            errorToast("Failed to save tackle. Please try again.");
        } finally {
            setShowSaveModal(false);
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
                            <option value="Lure">Lure</option>
                            <option value="Line">Line</option>
                            <option value="Hook">Hook</option>
                            <option value="Terminal Tackle">Popping Cork</option>
                            <option value="Terminal Tackle">Other</option>
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
                    className="save-button mt-4"
                    disabled={isLoading}
                    aria-label="Save new tackle">
                    {isLoading ? "Saving..." : "Save Tackle"}
                </button>
            </form>

            <ConfirmationModal
                isOpen={showSaveModal}
                title="Save Tackle"
                description="Are you sure you want to save this new tackle item? It will be added to your tackle collection and available for use in fishing trips."
                variant="primary"
                confirmButtonText="Save"
                cancelButtonText="Cancel"
                onConfirm={handleSaveTackle}
                onCancel={() => setShowSaveModal(false)}
            />
        </div>
    );
};

export default NewTacklePage;