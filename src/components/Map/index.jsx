import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { configs } from "../../configs";

const Map = ({ location }) => {
  const apiKey = configs.googleMapsApiKey;
  const mapStyles = {
    height: "700px",
    width: "700px",
    borderBottomRightRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapStyles}
      center={location}
      zoom={14}
      mapTypeId={"satellite"}
    >
      {location && <Marker position={location} />}
    </GoogleMap>
  ) : <span>Loading ...</span>;
};

export default Map;
