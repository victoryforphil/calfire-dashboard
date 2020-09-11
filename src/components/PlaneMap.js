import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Config from "../config"
const containerStyle = {
  width: '100%',
  height: '400px'
};



export default class PlaneMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    loadFlights(){
        const latMin = this.props.location.lat - 0.25;
        const latMax = this.props.location.lat + 0.25;
        const lngMin = this.props.location.lng - 0.25;
        const lngMax = this.props.location.lng + 0.25;
        fetch(`https://opensky-network.org/api/states/all?lamin=${latMin}&lomin=${lngMin}&lamax=${latMax}&lomax=${lngMax}`)
            .then(res => res.json())
            .then(

                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result.states
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    componentDidMount() {
        setInterval(() => {
            this.loadFlights();
        }, 10000);
    }
    genMarkers(states){
        //5 = long
        //6 = lat
        if(!states){
            return;
        }
        return states.map((item)=>{
            return(
                <Marker
                    icon={"/PlaneMarker.png"}
                    label={item[1]}
                    position={{lng: item[5], lat:item[6]}}
                />
            )
        })
    }
  render() {
    return (
      <LoadScript
        googleMapsApiKey={Config.mapKey}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={this.props.location}
          zoom={11}
        >
          <Marker position={this.props.location} label="FIRE LOCATION"></Marker>
          {this.genMarkers(this.state.items)}
        </GoogleMap>
      </LoadScript>
    )
  }
}