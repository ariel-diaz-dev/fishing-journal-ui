import React from "react";
import "./index.css";

const FishingForecastWidget = () => {

  return (
    <div className="text-left">

      {/* Weather Forecast */}
      <section className="widget-section">
        <h3>Weather Forecast (temp, wind, wind direction)</h3>
      </section>

      {/* Water Temperature */}
      <section className="widget-section">
        <h3>Water Temperature</h3>
      </section>

      {/* Tide Information */}
      <section className="widget-section">
        <h3>Tide Information</h3>
      </section>
    </div>
  );
};

export default FishingForecastWidget;
