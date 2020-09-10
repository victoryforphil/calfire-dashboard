import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '300px',
  height: '300px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

export default class Map extends Component {
  render() {
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyAcDEzcbZcQBlxi_RLWsWNrNSZ6-7l8bZY"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={this.props.location}
          zoom={10}
        >
          <Marker
      position={this.props.location}
    />
        </GoogleMap>
      </LoadScript>
    )
  }
}