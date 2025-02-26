import React from "react";
import { useGetForecastQuery } from "../../services/fishing-journal-api";
import "./index.css";

const FishingForecastWidget = () => {
  const { data: forecast, error, isLoading } = useGetForecastQuery();

  if (isLoading) return <div>Loading forecast...</div>;
  if (error) return <div>Error loading forecast</div>;

  return (
    <div className="forecast-widget">
      {/* Weather Forecast */}
      <section className="widget-section">
        <h3>Weather Forecast</h3>
        <div className="forecast-content">
          <div className="forecast-item">
            <span className="label">Temperature:</span>
            <span className="value">{forecast.temperature}°F</span>
          </div>
          <div className="forecast-item">
            <span className="label">Wind:</span>
            <span className="value">{forecast.windSpeed} mph {forecast.windDirection}</span>
          </div>
          <div className="forecast-item">
            <span className="label">Conditions:</span>
            <span className="value">{forecast.conditions}</span>
          </div>
        </div>
      </section>

      {/* Water Temperature */}
      <section className="widget-section">
        <h3 className="text-center">Water Temperature</h3>
        <div className="forecast-content">
          <div className="forecast-item justify-center temp-large">
            <span className="text-blue-500 text-3xl">{forecast.waterTemperature}°F</span>
          </div>
        </div>
      </section>

      {/* Tide Information */}
      <section className="widget-section">
        <h3>Tide Information</h3>
        <div className="forecast-content">
          <div className="tide-grid">
            <div className="tide-item">
              <span className="label">First High:</span>
              <span className="value">{forecast.tides.firstHigh}</span>
            </div>
            <div className="tide-item">
              <span className="label">First Low:</span>
              <span className="value">{forecast.tides.firstLow}</span>
            </div>
            <div className="tide-item">
              <span className="label">Second High:</span>
              <span className="value">{forecast.tides.secondHigh}</span>
            </div>
            <div className="tide-item">
              <span className="label">Second Low:</span>
              <span className="value">{forecast.tides.secondLow}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FishingForecastWidget;