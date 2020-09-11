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


export default function FirePage(props) {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
    const [back, setBack] = useState(false);
    if(back){
      return <Redirect push to={`/`} />
    }
    return (
        <div>
          <PageHeader
    className="site-page-header"
    onBack={()=>setBack(true)}
    title="CALFire Watch"
    subTitle={"Fire: " + id}
  />
      <FireDetail id={id}/>
        </div>
    );
  }