import "./App.css";
import React from "react";
import { Nav, Navbar, NavbarBrand, NavLink } from "react-bootstrap";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import JobCMS from './components/JobCMS';


function App() {
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
        <Route path="/">
          <Home/>
        </Route>
        
      </Switch>
    </Router>
  );
}

export default App;
