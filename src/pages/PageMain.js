import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
} from "react-router-dom";
import { DownOutlined, UserOutlined } from '@ant-design/icons';

import { Button, PageHeader , Dropdown, Menu} from "antd";
import FireDetail from "../components/FireDetail";
import FireGrid from "../components/FireGrid";

export default function PageMain() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  const filters = [
    {key: "LOCATION", display: "Closest (Requires Location)"},
    {key: "UPDATED", display: "Recently Updated"},
    {key: "NEWEST", display: "Newest"},
    {key: "OLDEST", display: "Oldest"},
    {key: "LARGEST", display: "Largest"}
  ]
  let [filter, setFilter] = useState(filters[0])
  function onFilterClick(clickItem){
    
    filters.forEach((cur)=>{
      if(cur.key === clickItem.key){
        console.log(cur);
        setFilter(cur);
      }
    })
  }
  function generateMenu(){
    return(
      <Menu onClick={onFilterClick}>
        {
          filters.map(cur=>
            (
              <Menu.Item key={cur.key}>
              {cur.display}
              </Menu.Item>
            ))
        }
      </Menu>
    )
  }
  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="CALFire Watch"
        subTitle={`All Fires (sorted by ${filter.display})`}
        footer={
          <Dropdown overlay={generateMenu()}>
      <Button>
        Sort By <DownOutlined />
      </Button>
    </Dropdown>
        }
      />
      <FireGrid sort={filter}/>
    </div>
  );
}
