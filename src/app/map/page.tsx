'use client'
import React from 'react'
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../../components/GoogleMap"), { ssr: false });
function page() {
    const mapCenter = { lat: 37.7749, lng: -122.4194 }; 

    return (
        <div style={{ padding: "20px" }}>
            <h1>Google Map Example</h1>
            <Map center={mapCenter} />
        </div>
    )
}

export default page
