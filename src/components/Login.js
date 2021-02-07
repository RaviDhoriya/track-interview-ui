import React, { Fragment, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Jumbotron,
  Row,
} from "react-bootstrap";
import Api from "../config/Api";

const Login = (props) => {
    const [lEmail,setLoginEmail]=useState("");
    const [lPassword,setLoginPassword]=useState("");
    
    const [nName,setNewName]=useState("");
    const [nEmail,setNewEmail]=useState("");
    const [nPassword,setNewPassword]=useState("");
    const [nPassword2,setNewPassword2]=useState("");
    
    const parentCheckLogin=props.parentCheckLogin;
    const checkLogin=()=>{
        let body={};
        body.email=lEmail;
        body.password=lPassword;
        Api.login(body,(resp)=>{
            if(resp.status){
                startSession(resp.data);
            }else{
                alert(resp.message);
            }
        });
    };
    const signup=()=>{
        let body={};
        body.name=nName;
        body.email=nEmail;
        body.password=nPassword;
        Api.signup(body,(resp)=>{
            if(resp.status){
                startSession(resp.data);
            }else{
                alert(resp.message);
            }
        });
    };
    const startSession=(data)=>{
        localStorage.setItem("token",data.token);
        localStorage.setItem("data",JSON.stringify(data.user));
        parentCheckLogin();
    };
  return (
    <Fragment>
      <Container>
        <Jumbotron>
          <h2>Track Interview</h2>
        </Jumbotron>
        <br/>
        <Row>
          <Col>
            <Form>
              <center>
                <h3>Login</h3>
              </center>
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormControl type="text" placeholder="Enter Email address" value={lEmail} onChange={(e)=>setLoginEmail(e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <FormLabel>Password</FormLabel>
                <FormControl type="password" placeholder="Enter Password"  value={lPassword} onChange={(e)=>setLoginPassword(e.target.value)}/>
              </FormGroup>
              <Button onClick={()=>checkLogin()}>Login</Button>
            </Form>
          </Col>
          <Col>
            <Form>
              <center>
                <h3>Signup</h3>
              </center>
              <FormGroup>
                <FormLabel>Name</FormLabel>
                <FormControl type="text" placeholder="Enter Name" value={nName} onChange={(e)=>setNewName(e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormControl type="text" placeholder="Enter Email address" value={nEmail} onChange={(e)=>setNewEmail(e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <FormLabel>Password</FormLabel>
                <FormControl type="password" placeholder="Enter Password" value={nPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl type="password" placeholder="Confirm Password" value={nPassword2} onChange={(e)=>setNewPassword2(e.target.value)}/>
              </FormGroup>
              <Button onClick={()=>signup()}>Signup</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Login;
