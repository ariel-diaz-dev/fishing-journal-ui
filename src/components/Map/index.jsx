import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { configs } from "../../configs";

const Map = () => {
  const apiKey = configs.googleMapsApiKey;
  const [location, setLocation] = useState({ lat: 25.7617, lng: -80.1918 }); // Default to Miami, FL
  const [markerPosition, setMarkerPosition] = useState(location);

  const mapStyles = {
    height: "700px",
    width: "700px",
    borderBottomRightRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
    setLocation({ lat, lng });
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <div >
        <GoogleMap
          mapContainerStyle={mapStyles}
          center={location}
          zoom={10}
          onClick={handleMapClick}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Map;
