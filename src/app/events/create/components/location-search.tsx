// components/MapWithSearch.tsx

import React, { useRef, useState, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const libraries: any = ["places"];

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const LocationSearch: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null);
  const [place, setPlace] = useState<string>("");

  const onLoadMap = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onLoadSearchBox = useCallback((ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  }, []);

  const onPlacesChanged = () => {
    const places = searchBox?.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      setPlace(place.formatted_address || "");
      const location = place.geometry?.location;
      if (location && map) {
        map.panTo(location);
        map.setZoom(15);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries}>
      <StandaloneSearchBox
        onLoad={onLoadSearchBox}
        onPlacesChanged={onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Search for a location"
          className="absolute top-4 left-1/2 transform -translate-x-1/2 w-72 h-10 px-4 border border-transparent rounded-lg shadow-lg text-sm outline-none"
        />
      </StandaloneSearchBox>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoadMap}
      >
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
    </LoadScript>
  );
};

export default LocationSearch;
