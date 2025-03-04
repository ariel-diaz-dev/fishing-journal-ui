import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetTackleByIdQuery,
  useUpdateTackleMutation,
  useDeleteTackleMutation
} from "../../services/fishing-journal-api";
import "./index.css";

const TackleDetailsPage = () => {
  const navigate = useNavigate();
  const { tackleId } = useParams();
  
  const [updateTackle, { isLoading: isUpdating }] = useUpdateTackleMutation();
  const [deleteTackle] = useDeleteTackleMutation();
  const { data, error, isLoading } = useGetTackleByIdQuery(tackleId);

  const [tackleDetails, setTackleDetails] = useState({
    name: "",
    type: "",
    brand: "",
    model: "",
    notes: ""
  });

  useEffect(() => {
    if (!isLoading && data) {
        setTackleDetails(data);
    }
  }, [data, isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTackleDetails({ ...tackleDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTackle({
        id: tackleId,
        ...tackleDetails
      }).unwrap();
      navigate("/tackle");
    } catch (err) {
      console.error("Failed to update tackle:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this tackle?")) {
      try {
        await deleteTackle(tackleId).unwrap();
        navigate("/tackle");
      } catch (err) {
        console.error("Failed to delete tackle:", err);
      }
    }
  };

  return (
    <div className="tackle-details-page">
      <form className="tackle-form" onSubmit={handleSubmit}>
        <h2>Tackle Details</h2>

        <div className="form-grid">
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

        <div className="button-group">
          <button
            type="submit"
            className="btn btn-primary save-button"
            disabled={isUpdating}
            aria-label="Save changes to tackle"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            className="btn btn-danger delete-button"
            onClick={handleDelete}
            aria-label="Delete this tackle"
          >
            Delete Tackle
          </button>
        </div>
      </form>
    </div>
  );
};

export default TackleDetailsPage;