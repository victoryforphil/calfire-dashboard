import React, { useState, useEffect} from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Config from "../config";
const containerStyle = {
  width: "100%",
  height: "250px",
};

export default function PlaneMap(props) {
  let [items, setItems] = useState([]);
  let [isLoaded, setLoaded] = useState(false);
  let [error, setError] = useState(null);
  let [flightLoop, setFlights] = useState(false);
  let { mapStyle, location } = props;

  function loadFlights(){
    const latMin = location.lat - 0.25;
    const latMax = location.lat + 0.25;
    const lngMin = location.lng - 0.25;
    const lngMax = location.lng + 0.25;
    fetch(`https://opensky-network.org/api/states/all?lamin=${latMin}&lomin=${lngMin}&lamax=${latMax}&lomax=${lngMax}`)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setItems(result.states);
                setLoaded(true);
            },
            (error) => {
                setLoaded(true);
                setError(error);
            }
        )
  }
  function genMarkers(states){
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

  let interval = undefined;
  useEffect(()=>{
    if(!flightLoop){
      setFlights(true);
      setInterval(() => {
        loadFlights();
      }, 5000);
    }
  })
  return (
    <LoadScript
        googleMapsApiKey={Config.mapKey}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={11}
        >
          <Marker position={location} label="FIRE LOCATION"></Marker>
          {genMarkers(items)}
        </GoogleMap>
      </LoadScript>
  );
}