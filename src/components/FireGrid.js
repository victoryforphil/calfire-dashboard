import React, { useState, useEffect } from "react";
import { Button, List, Card, Spin } from "antd";

import FireItem from "./FireItem";

export default function FireGrid(props) {
    let [items, setItems] = useState([]);
    let [isLoaded, setLoaded] = useState(false);
    let [error, setError] = useState(null);

    let { sort } = props;


    function loadData() {
        fetch(
            "https://cors-anywhere.herokuapp.com/https://www.fire.ca.gov/umbraco/api/IncidentApi/List?inactive=false&year=2020"
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    //console.log(result);
                    setLoaded(true);
                    setItems(result);

                    sortResults();
                },
                (error) => {
                    setLoaded(true);
                    setError(error);
                }
            );
    }
    function sortResults() {
        switch(sort.key){
            case "LOCATION":
                getLocation();
            break;
            case "UPDATED":
                sortUpdated();
                break;
            case "NEWEST":
                sortCreate(false);
                break;
            case "OLDEST":
                sortCreate(true);
                break;
            case "LARGEST":
                sortSize();
                break;
            default:
                getLocation();

        }
    }

    function sortCreate(sortOld){

    }

    function sortUpdated(){

    }

    function sortSize(){

    }


    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                sortByLocation(pos);
            });
        } else {
        }
    }

    function sortByLocation(pos) {
        const long = pos.coords.longitude;
        const lat = pos.coords.latitude;

        const oldItems = items;
        setItems([])
        const newTiems = oldItems.sort(function (a, b) {
            //this.props.fire.Latitude, lng: this.props.fire.Longitude
            const errorA = Math.abs(a.Latitude - lat) + Math.abs(a.Longitude - long);
            const errorB = Math.abs(b.Latitude - lat) + Math.abs(b.Longitude - long);
            if (errorA > errorB) {
                return 1;
            }
            if (errorA < errorB) {
                return -1;
            }
            if (errorA === errorB) {
                return 0;
            }
        });
        setItems(newTiems);
        setLoaded(true);

    }

    useEffect(() => {
        if (!isLoaded) {
            loadData();
        }
    })
    if (isLoaded === false || items.length < 1) {
        return <Spin></Spin>;
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
            dataSource={items}
            renderItem={(item) => (
                <List.Item>
                    <FireItem fire={item}></FireItem>
                </List.Item>
            )}
        />
    );
}


