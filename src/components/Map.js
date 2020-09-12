import React, { Component } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Config from "../config";
const containerStyle = {
  width: "100%",
  height: "250px",
};

export default function Map(props) {
  let { mapStyle, location } = props;
  return (
    
      <GoogleMap
        mapContainerStyle={mapStyle || containerStyle}
        center={location}
        zoom={8}>
        <Marker position={location} />
      </GoogleMap>
  );
}
