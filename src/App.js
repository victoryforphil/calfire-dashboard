import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, PageHeader } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import FireGrid from './components/FireGrid'
import FireDetail from "./components/FireDetail"
import PageFire from "./pages/PageFire"
function App() {
  return (
    <div className="App">

      <Router>
      <Switch>
      <Route path="/fire/:id">
          <PageFire />
        </Route>
        <Route path="/">
          <FireGrid />
        </Route>
        
      </Switch>
      </Router>
    </div>
  );
}

export default App;
