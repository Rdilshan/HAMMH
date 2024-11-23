'use client';
import dynamic from "next/dynamic";

const MapWithSearch = dynamic(() => import("../../components/GoogleMapWithSearch"), {
    ssr: false,
  });

function page() {
    const mapCenter = { lat: 6.127194, lng: 81.122452 }; 

    return (
        <div style={{ padding: "20px" }}>
            <h1>Retrieve Location Coordinates</h1>
            <MapWithSearch initialCenter={mapCenter} />
        </div>
    )
}

export default page
