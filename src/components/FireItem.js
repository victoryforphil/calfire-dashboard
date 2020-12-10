import React, {useState, useEffect} from 'react';
import { Button, List, Card,Statistic, Badge,Progress, Divider} from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import Map from "./Map"
import PlaneMap from './PlaneMap';


export default function FireItem(props){

    //Define state
    const { fire} = props;
    if(!fire.PercentContained){
        fire.PercentContained = "0";
    }
    if(!fire.AcresBurned){
        fire.AcresBurned = "Unknown";
    }
    let [redirect, setRedirect] = useState(null);

    function parseStats(status){
        if(status.IsActive && status.PercentContained){
            return(
                <div>
                   
                <Progress type="circle" percent={status.PercentContained} width={50}/>
                </div>
            )
            //return <Badge count={status.PercentContained + "%"}/>
        }else{

        }
    }

    function handleOnClick(){
        
        setRedirect(fire.UniqueId);
    }


    if (redirect != null) {
        return <Redirect push to={`/fire/${redirect}`} />;
    }
    return(
        <div style={{padding: 0}}>
            <Card title={fire.Name} extra={parseStats(fire)} style={{ margin: 1}}
                onClick={handleOnClick}>
                <Map 
                    location={{lat: fire.Latitude, lng: fire.Longitude}}
                    
                ></Map>
                <Divider></Divider>
                
                <Statistic title="Acres Burned" value={fire.AcresBurned} />
            </Card>
        </div>
    )
}