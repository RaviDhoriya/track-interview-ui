import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Api from "../config/Api";

const Home = () => {
  const [user,setUser]=useState(JSON.parse(localStorage.getItem("data")||"{}"));
  const [stats,setStats]=useState([]);

  const jobStatus=new Map();
  jobStatus.set("interviewing","Interviewing");
  jobStatus.set("response","Got Response");
  jobStatus.set("applied","Applied");
  jobStatus.set("waiting","Waiting");
  jobStatus.set("rejected","Got Rejected");
  jobStatus.set("offer_recieved","Offer Received");
  jobStatus.set("decline","Declined Offer");
  jobStatus.set("pending","Pending");

  var getStats=()=>{
    Api.getJobStats((data)=>{
      setStats(data.data);
    });
  };
  useEffect(()=>{
    getStats();
  },[]);
  return (
    <Container>
      <h3>Hi {user.name}!</h3>
      Welcome to Track Interview App!

      {stats.map((status)=>{
        return <Link className="quick-links" to={`/dashboard/${status._id}`}> {jobStatus.get(status._id)} ({status.count})</Link>
      })}
    </Container>
  );
};

export default Home;
