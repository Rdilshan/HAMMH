import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

type GoogleMapProps = {
  initialCenter: {
    lat: number;
    lng: number;
  };
  zoom?: number;
};

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapWithSearch: React.FC<GoogleMapProps> = ({
  initialCenter,
  zoom = 12,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"], // Load the places library
  });

  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [markerPosition, setMarkerPosition] = useState(initialCenter);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;


  const onLoadAutocomplete = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };


  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        const newCenter = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMapCenter(newCenter);
        setMarkerPosition(newCenter); 
      }
    }
  };

  // Handle manual drag of the marker
  const onMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      console.log(newPosition);
      setMarkerPosition(newPosition);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Search for a place"
            style={{
                color: "black",
              width: "100%",
              height: "40px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </Autocomplete>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={zoom}
        onClick={(e) =>
          e.latLng && setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })
        }
      >

        <Marker
          position={markerPosition}
          draggable={true}
          onDragEnd={onMarkerDragEnd}
        />
      </GoogleMap>
    </div>
  );
};

export default MapWithSearch;
