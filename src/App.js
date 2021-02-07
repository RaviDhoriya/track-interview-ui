import "./App.css";
import React, { useState } from "react";
import { Nav, Navbar, NavbarBrand, NavLink } from "react-bootstrap";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import JobCMS from './components/JobCMS';
import Job from "./components/Job";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Login from "./components/Login";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(en);

function App() {
  const isLoggedIn=()=>{
    return localStorage.getItem("token")||false;
  };
  const [isLogged,setIsLogged]=useState(isLoggedIn());
  
  const checkLogin=()=>{
    setIsLogged(isLoggedIn());
  };
  const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("data");
    checkLogin();
  };
  if(!isLogged){
    return (<Login parentCheckLogin={checkLogin}/>);
  }else
    return (
    <Router>
      <Navbar>
        <NavbarBrand>Track Interview</NavbarBrand>
        <NavbarToggle aria-controls="nav" />
        <NavbarCollapse id="nav">
          <Nav className="mr-auto">
            <NavLink as={Link} to="/">
              Home
            </NavLink>
            <NavLink as={Link} to="/dashboard">
              Dashboard
            </NavLink>
            <NavLink onClick={()=>logout()}>Logout</NavLink>
          </Nav>
        </NavbarCollapse>
      </Navbar>
      <Switch>
        <Route path="/dashboard">
          <Dashboard/>
        </Route>
        <Route path="/job-add">
          <JobCMS/>
        </Route>
        <Route path="/job-edit/:job_id">
          <JobCMS/>
        </Route>
        <Route path="/job/:job_id">
          <Job/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
        
      </Switch>
    </Router>
  );
}

export default App;
