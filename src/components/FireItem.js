import React from 'react';
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
const data = ["Fire 1"]
export default class FireGrid extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            fire: props.fire,
            id: props.fire.UniqueId,
            redirect: null
        };
    }
    parseStats(status){
        if(status.IsActive){
            return< Progress type="circle" percent={status.PercentContained} width={50}/>
            //return <Badge count={status.PercentContained + "%"}/>
        }else{

        }
    }
    handleOnClick = () => {
        // some action...
        // then redirect
        this.setState({redirect: this.state.id});
      }
    render(){
        if (this.state.redirect != null) {
            return <Redirect push to={`/fire/${this.state.redirect}`} />;

          }
        return(
            <div style={{padding: 5}}>
                <Card title={this.props.fire.Name} extra={this.parseStats(this.props.fire)} style={{ width: 300 }}
                    onClick={this.handleOnClick}>
                    <Map 
                        location={{lat: this.props.fire.Latitude, lng: this.props.fire.Longitude}}
                        
                    ></Map>
                    <Divider></Divider>
                    
                    <Statistic title="Acres Burned" value={this.props.fire.AcresBurned} />
                </Card>
            </div>
        )
    }
}
