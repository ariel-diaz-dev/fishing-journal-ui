import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { configs } from "../../configs";

const Map = ({ location, options }) => {
  const apiKey = configs.googleMapsApiKey;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  return isLoaded ? (
    <GoogleMap
      {...options}
      center={location}
    >
      {location && <Marker position={location} />}
    </GoogleMap>
  ) : <span>Loading ...</span>;
};

export default Map;
