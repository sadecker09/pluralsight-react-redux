import React from "react";
import { render } from "react-dom";
//import { BrowserRouter as Router } from "react-router-dom";
//import App from "./components/App";

function HelloWorld() {
  return <h1>Hello World</h1>;
}

render(<HelloWorld />, document.getElementById("root"));
