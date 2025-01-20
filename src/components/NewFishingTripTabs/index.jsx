import React, { useState } from "react";
import FishingForecastTab from "./FishingForecastTab";
import MapTab from "./MapTab";
import "./index.css";

const NewFishingTripTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <MapTab />;
      case 1:
        return <FishingForecastTab />;
      default:
        return null;
    }
  };

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        <button
          className={`tab-button ${activeTab === 0 ? "active" : ""}`}
          onClick={() => setActiveTab(0)}
        >
          Map
        </button>
        <button
          className={`tab-button ${activeTab === 1 ? "active" : ""}`}
          onClick={() => setActiveTab(1)}
        >
          Fishing Forecast
        </button>
      </div>
      <div className="tabs-content">{renderTabContent()}</div>
    </div>
  );
};

export default NewFishingTripTabs;
