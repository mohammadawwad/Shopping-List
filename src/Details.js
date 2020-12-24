import React, { Component } from "react";
import NavBar from "./components/navbar";
import "./App.css";
import Counters from "./components/counters";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Details extends Component {
  render() {
    const { onBack } = this.props;
    return (
      //Renders the 3 buttons at the top
      <div>
        <button onClick={onBack} className="btn btn-primary btn-sml m-2">
          Back
        </button>
      </div>
    );
  }
}

export default Details;
