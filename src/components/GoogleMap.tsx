import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

type GoogleMapProps = {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
};

const containerStyle = {
  width: "100%",
  height: "400px", // Adjust height as needed
};

const Map: React.FC<GoogleMapProps> = ({ center, zoom = 12 }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Use environment variable for the API key
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
      {/* Add markers or other components here */}
      <Marker position={center} />
    </GoogleMap>
  );
};

export default Map;
