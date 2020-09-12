import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, PageHeader, Layout } from 'antd';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import FireGrid from './components/FireGrid'
import FireDetail from "./components/FireDetail"
import PageFire from "./pages/PageFire"
import Config from "./config"
import PageMain from "./pages/PageMain"
import * as firebase from 'firebase';
import { LoadScript } from "@react-google-maps/api";

const { Header, Content, Footer, Sider } = Layout;
function App() {
  firebase.initializeApp(Config.firebaseConfig);
  firebase.analytics();
  return (
    <Layout className="App">
      <LoadScript googleMapsApiKey={Config.mapKey}>
      <Router>
      <Switch>
      <Route path="/fire/:id">
          <PageFire />
        </Route>
        <Route path="/">
          <PageMain />
        </Route>
        
      </Switch>
      </Router>
      <Footer style={{ textAlign: 'center' }}>©2020 Created by Alex Carter (victoryforphil)</Footer>
      </LoadScript>
    </Layout>
  );
}

export default App;
