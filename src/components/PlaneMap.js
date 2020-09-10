import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '600px'
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
        const latMin = this.props.location.lat - 1;
        const latMax = this.props.location.lat + 1;
        const lngMin = this.props.location.lng - 1;
        const lngMax = this.props.location.lng + 1;
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
        }, 1000);
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
                    
                    label={item[1]}
                    position={{lng: item[5], lat:item[6]}}
                />
            )
        })
    }
  render() {
    return (
      <LoadScript
        googleMapsApiKey=""
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={this.props.location}
          zoom={9}
        >
          {this.genMarkers(this.state.items)}
        </GoogleMap>
      </LoadScript>
    )
  }
}