import React from "react";
import {
  Button,
  List,
  Card,
  Statistic,
  Badge,
  Spin,
  Progress,
  Row,
  Col,
  Divider,
  Descriptions,
  Tabs,
} from "antd";
import { Hashtag } from 'react-twitter-widgets'

import Map from "./Map";
import PlaneMap from "./PlaneMap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

const { TabPane } = Tabs;
const data = ["Fire 1"];
export default class FireDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      fire: {},
      id: props.id,
      key: 1,
    };
  }
  tabCallback(key) {
    console.log(key);
    //this.setState({ key: key });
  }
  genHash(){
      let name = this.state.fire.Name;
      name = name.toLowerCase();
      name = name.replace(/\s/g, '');
      return "#"+name;
  }
  componentDidMount() {
    let id = this.state.id;
    fetch(
      "https://cors-anywhere.herokuapp.com/https://www.fire.ca.gov/umbraco/api/IncidentApi/List?inactive=false&year=2020"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          result.forEach((fire) => {
            if(!fire.PercentContained){
              fire.PercentContained = "0";
          }
          if(!fire.AcresBurned){
              fire.AcresBurned = "Unknown";
          }
            console.log(id);
            console.log(this.state);
            if (fire.UniqueId === id) {
              this.setState({
                isLoaded: true,
                fire: fire,
              });
            }
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  parseStats(status) {
    if (status.IsActive) {
      return <Badge count={status.PercentContained + "%"} />;
    } else {
    }
  }
  render() {
    if (this.state.isLoaded && this.state.error == null) {
      return (
        <div style={{ padding: 0 }}>
          <Card
            title={this.state.fire.Name + ` (${this.state.fire.County})`}
            extra={this.parseStats(this.state.fire)}

          >
            <Progress percent={this.state.fire.PercentContained} />
            <Row gutter={16}>
              <Col span={4}>
                <Statistic
                  title="Acres Burned"
                  value={this.state.fire.AcresBurned}
                />
              </Col>
              <Col span={14}>
                <Statistic title="Location" value={this.state.fire.Location} />
              </Col>
              <Col span={2}>
                <Statistic
                  title="Is CalFire?"
                  value={this.state.fire.CalFireIncident ? "Yes" : "No"}
                />
              </Col>
            </Row>
            <Divider></Divider>
            <Tabs defaultActiveKey="1" onChange={this.tabCallback}>
              <TabPane tab="Location Map" key="1">
                <PlaneMap
                  location={{
                    lat: this.state.fire.Latitude,
                    lng: this.state.fire.Longitude,
                  }}
                ></PlaneMap>
              </TabPane>
              <TabPane tab="Twitter Map" key="2">
                
              </TabPane>
              <TabPane tab="Bulk Information" key="3">
                <Descriptions title="Fire Info" bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }} layout="vertical">
                  <Descriptions.Item label="Name">
                    {this.state.fire.Name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Admin Unit">
                    {this.state.fire.AdminUnit}
                  </Descriptions.Item>
                  <Descriptions.Item label="County">
                    {this.state.fire.County}
                  </Descriptions.Item>
                  <Descriptions.Item label="Location">
                    {this.state.fire.Location}
                  </Descriptions.Item>
                  <Descriptions.Item label="Burned Acres">
                    {this.state.fire.AcresBurned}
                  </Descriptions.Item>
                  <Descriptions.Item label="Containment">
                    {this.state.fire.PercentContained}
                  </Descriptions.Item>
                  <Descriptions.Item label="Agency Names">
                    {this.state.fire.AgencyNames}
                  </Descriptions.Item>
                  <Descriptions.Item label="Url">
                    <a href={this.state.fire.Url}>{this.state.fire.Url}</a>
                  </Descriptions.Item>
                  
                </Descriptions>
                ,
              </TabPane>
            </Tabs>
          </Card>
        </div>
      );
    } else {
      return (
        <div>
          <Spin></Spin>
          <h2>{this.state.error}</h2>
        </div>
      );
    }
  }
}
