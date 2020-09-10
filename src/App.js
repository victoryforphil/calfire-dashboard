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
import PageMain from "./pages/PageMain"
const { Header, Content, Footer, Sider } = Layout;
function App() {
  return (
    <Layout className="App">
      
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
    </Layout>
  );
}

export default App;
