import React from 'react';
import { Button, List, Card,Statistic, Badge } from 'antd';

import Map from "./Map"
import PlaneMap from './PlaneMap';
const data = ["Fire 1"]
export default class FireDetail extends React.Component{
    parseStats(status){
        if(status.IsActive){
            return <Badge count={status.PercentContained + "%"}/>
        }else{

        }
    }
    render(){
        return(
            <div style={{padding: 5}}>
                <Card title={this.props.fire.Name} extra={this.parseStats(this.props.fire)} style={{ width: 1000 }}>
                    <PlaneMap 
                        location={{lat: this.props.fire.Latitude, lng: this.props.fire.Longitude}}
                        
                    ></PlaneMap>
                    <Statistic title="Acres Burned" value={this.props.fire.AcresBurned} />
                </Card>
            </div>
        )
    }
}
