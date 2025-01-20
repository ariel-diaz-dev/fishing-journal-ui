import React, { useState, useEffect } from "react";
import "./index.css";

const FishingInfoWidget = ({ location }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [tideData, setTideData] = useState([]);
  const [waterTemp, setWaterTemp] = useState(null);

  useEffect(() => {
    // Fetch Weather Data (Replace with real API)
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=${location}&hours=12`)
      .then((res) => res.json())
      .then((data) => {
        const hourlyForecast = data.forecast.forecastday[0].hour.map((hour) => ({
          time: hour.time,
          temp: hour.temp_c,
          condition: hour.condition.text,
          icon: hour.condition.icon,
        }));
        setWeatherData(hourlyForecast);
      })
      .catch((err) => console.error("Error fetching weather data:", err));

    // Fetch Tide Data (Replace with real API)
    fetch(`https://api.tidesapi.com/v1/tides?location=${location}&days=1`)
      .then((res) => res.json())
      .then((data) => {
        const tides = data.tides.map((tide) => ({
          time: tide.time,
          height: tide.height,
          type: tide.type, // high or low
        }));
        setTideData(tides);
      })
      .catch((err) => console.error("Error fetching tide data:", err));

    // Fetch Water Temperature (Replace with real API)
    fetch(`https://api.oceanapi.com/v1/temperature?location=${location}`)
      .then((res) => res.json())
      .then((data) => {
        setWaterTemp(data.temp_c);
      })
      .catch((err) => console.error("Error fetching water temperature:", err));
  }, [location]);

  return (
    <div className="fishing-info-widget">
      <h2>Fishing Information</h2>

      {/* Weather Forecast */}
      <section className="widget-section">
        <h3>Weather Forecast (Next 12 Hours)</h3>
        <ul className="weather-list">
          {weatherData.map((hour, index) => (
            <li key={index} className="weather-item">
              <img src={hour.icon} alt={hour.condition} className="weather-icon" />
              <span>{hour.time}</span>
              <span>{hour.temp}°C</span>
              <span>{hour.condition}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Tide Information */}
      <section className="widget-section">
        <h3>Tide Information</h3>
        <ul className="tide-list">
          {tideData.map((tide, index) => (
            <li key={index} className={`tide-item ${tide.type}`}>
              <span>{tide.type.charAt(0).toUpperCase() + tide.type.slice(1)} Tide:</span>
              <span>{tide.time}</span>
              <span>{tide.height}m</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Water Temperature */}
      <section className="widget-section">
        <h3>Water Temperature</h3>
        <p className="water-temp">{waterTemp ? `${waterTemp}°C` : "Loading..."}</p>
      </section>
    </div>
  );
};

export default FishingInfoWidget;
