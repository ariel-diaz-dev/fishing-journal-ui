import React from "react";
import Map from "../../Map";

const MapTab = ({ location }) => {
  const options = {
    mapContainerStyle: {
      height: "700px",
      width: "100%",
      borderBottomRightRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    },
    zoom: 14,
    mapTypeId: "satellite",
  }
  return (
    <div>
      {location && <Map
        options={options}
        location={location.coordinates} />}
    </div>
  );
};

export default MapTab;
