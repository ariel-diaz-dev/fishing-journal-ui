import React from "react";
import "./index.css";

const TackleSelect = ({ tackle, selectedTackle, onTackleChange }) => {
  const availableTackle = tackle?.filter(item => !selectedTackle.includes(item.id)) || [];

  const handleAddTackle = (tackleId) => {
    const newTackle = [...selectedTackle, tackleId];
    onTackleChange(newTackle);
  };

  const handleRemoveTackle = (tackleId) => {
    const newTackle = selectedTackle.filter(id => id !== tackleId);
    onTackleChange(newTackle);
  };

  return (
    <div className="tackle-select-container">
      <div className="tackle-grid">
        {availableTackle.length > 0 && (<div className="available-tackle">
          <h3>Available Tackle:</h3>
          <div className="tackle-cards">
            {availableTackle?.map(item => (
              <div
                key={item.id}
                className="tackle-card"
                onClick={() => handleAddTackle(item.id)}
              >
                <div className="tackle-card-content">
                  <span className="tackle-name">{item.name}</span>
                  <span className="tackle-type">{item.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>)}

        {selectedTackle.length > 0 && (
          <div className="selected-tackle">
            <h3>Selected Tackle:</h3>
            <div className="tackle-tags">
              {selectedTackle.map(tackleId => {
                const item = tackle?.find(t => t.id === tackleId);
                if (!item) return null;
                return (
                  <div
                    key={item.id}
                    className="tackle-tag"
                    onClick={() => handleRemoveTackle(item.id)}
                  >
                    <span className="tackle-tag-content">
                      <span className="tackle-name">{item.name}</span>
                    </span>
                    <button
                      type="button"
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
};

export default TackleSelect;