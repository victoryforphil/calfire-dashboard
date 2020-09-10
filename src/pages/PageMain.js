import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams
} from "react-router-dom";
import { Button, PageHeader } from 'antd';
import FireDetail from "../components/FireDetail"
import FireGrid from "../components/FireGrid";


export default function PageMain() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    

    return (
        <div>
          <PageHeader
    className="site-page-header"
    title="CALFire Watch"
    subTitle={"All Fires"}
  />
      <FireGrid/>
        </div>
    );
  }