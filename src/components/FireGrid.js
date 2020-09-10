import React from 'react';
import { Button, List, Card } from 'antd';

import FireItem from "./FireItem"

export default class FireGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
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
