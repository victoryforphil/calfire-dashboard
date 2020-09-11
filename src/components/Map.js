import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Config from "../config"
const containerStyle = {
  width: '100%',
  height: '250px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

export default class Map extends Component {
  render() {
    return (
      <LoadScript
       googleMapsApiKey={Config.mapKey}
      >
        <GoogleMap
          mapContainerStyle={this.props.mapStyle || containerStyle}
          center={this.props.location}
          zoom={8}
        >
          <Marker
      position={this.props.location}
    />
        </GoogleMap>
      </LoadScript>
    )
  }
}