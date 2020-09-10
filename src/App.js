import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, PageHeader } from 'antd';
import FireGrid from './components/FireGrid'
import FireDetail from "./components/FireDetail"
function App() {
  return (
    <div className="App">

      <FireDetail fire={{
        Name: "Apple Fire",
        Final: false,
        Updated: "2020-08-18T12:46:37.06Z",
        Started: "2020-07-31T18:08:39Z",
        AdminUnit: "Unified Command: CAL FIRE Riverside/ Riverside County, USFS - San Bernardino, and Yucaipa City Fire",
        AdminUnitUrl: null,
        County: "Riverside",
        Location: "off of Oak Glen Road and Apple Tree Lane, North of Cherry Valley",
        AcresBurned: 33424,
        PercentContained: 95,
        ControlStatement: null,
        AgencyNames: "United States Forest Service, CAL FIRE / Riverside County Fire , Cooperating Agencies ",
        Longitude: -116.963678,
        Latitude: 33.990352,
        Type: "Wildfire",
        UniqueId: "8b9ae457-96ea-4041-912c-6b33e8498d98",
        Url: "https://www.fire.ca.gov/incidents/2020/7/31/apple-fire/",
        ExtinguishedDate: "",
        ExtinguishedDateOnly: "",
        StartedDateOnly: "2020-07-31T18:08:39Z",
        IsActive: true,
        CalFireIncident: true,
        NotificationDesired: false
      }}></FireDetail>
    </div>
  );
}

export default App;
