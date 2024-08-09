import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Input } from "@/components/ui/input";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 6.5244, // Default to Lagos, Nigeria
  lng: 3.3792,
};

const LocationSearch = () => {
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      locationBias: { lat: 6.5244, lng: 3.3792 }, // Bias towards Lagos, Nigeria
    },
  });

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Search for a location"
        className="text-sm font-medium text-primary-boulder900 placeholder:text-primary-boulder900/70 h-12 mb-3"
      />
      <div>
        {status === "OK" &&
          data.map(({ place_id, description }) => (
            <div
              key={place_id}
              onClick={() => handleSelect(description)}
              className="cursor-pointer p-2 border-b border-gray-200"
            >
              {description}
            </div>
          ))}
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={selected || center}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </div>
  );
};

export default LocationSearch;
