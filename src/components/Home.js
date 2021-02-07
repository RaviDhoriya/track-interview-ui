import React, { useState } from "react";
import { Container } from "react-bootstrap";

const Home = () => {
  const [user,setUser]=useState(JSON.parse(localStorage.getItem("data")||"{}"));
  return (
    <Container>
      <h3>Hi {user.name}!</h3>
      Welcome to Track Interview App!
  
    </Container>
  );
};

export default Home;
