import React from 'react';
import { Button, List, Card, Spin } from 'antd';

import FireItem from "./FireItem"

export default class FireGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            location: null
        };
    }
    getLocation() {
        if (navigator.geolocation) {
            
          navigator.geolocation.getCurrentPosition((pos)=>{this.sortByLocation(pos)});
        } else {
          
        }
      }

    sortByLocation(pos){
        const long = pos.coords.longitude;
        const lat = pos.coords.latitude;

        const oldItems = this.state.items;
        this.setState({items: []})
        const newTiems = oldItems.sort(function(a, b) {
            //this.props.fire.Latitude, lng: this.props.fire.Longitude
            const errorA = Math.abs(a.Latitude - lat) + Math.abs(a.Longitude - long);
            const errorB = Math.abs(b.Latitude - lat) + Math.abs(b.Longitude - long);
            if(errorA > errorB){return 1}
            if(errorA < errorB){return -1}
            if(errorA == errorB){return 0}
          });
        this.setState({items: newTiems, isloaded: true})
    }
    componentDidMount() {
        fetch("https://cors-anywhere.herokuapp.com/https://www.fire.ca.gov/umbraco/api/IncidentApi/List?inactive=false&year=2020")
            .then(res => res.json())
            .then(

                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result
                    });

                    this.getLocation();
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render() {
        if(this.state.isLoaded === false || this.state.items.length < 1){
            return (<Spin></Spin>)
        }
        
        return (
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 4,
                    xxl: 4,
                }}
                dataSource={this.state.items}
                renderItem={item => (
                    <List.Item>
                        <FireItem fire={item}></FireItem>
                    </List.Item>
                )}
            />
        )
    }
}
