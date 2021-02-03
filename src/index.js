import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Container } from "react-bootstrap";
ReactDOM.render(
  <React.StrictMode>
    <Container>
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById("root")
);
