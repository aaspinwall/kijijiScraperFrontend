import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./Styles/Style.css";
import Legacy from "./Components/Main";
import Debug from "./pages/debug";
import Main from "./pages/results";
import Intro from "./Components/Intro";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path='/legacy'>
          <Legacy />
        </Route>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route exact path='/debug'>
          <Debug />
        </Route>
        <Route exact path='/main'>
          <Intro />
        </Route>
      </Router>
    );
  }
}
