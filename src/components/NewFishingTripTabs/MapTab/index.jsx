import React from "react";
import Map from "../../Map";

const MapTab = ({ location }) => {
  return (
    <div>
      {location && <Map location={location.coordinates} />}
    </div>
  );
};

export default MapTab;
