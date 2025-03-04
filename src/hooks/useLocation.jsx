import { useState } from "react";

const useLocation = () => {
  const locations = [
    { name: "Turkey Point, Biscayne", coordinates: { lat: 25.4647, lng: -80.3359 } },
    { name: "Flamingo, Everglades", coordinates: { lat: 25.1344, lng: -80.9218 } }
  ];
  const defaultLocation = locations[0];

  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);

  const setLocationByName = (locationName) => {
    const location = locations.find((location) => location.name === locationName);
    if (location) {
      setSelectedLocation(location);
    } else {
      console.warn(`Location "${locationName}" not found.`);
    }
  };

  return { selectedLocation, setLocationByName, locations, defaultLocation };
};

export default useLocation;
