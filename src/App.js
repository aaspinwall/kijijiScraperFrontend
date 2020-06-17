import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Styles/Style.css";
import ToDos from "./Components/ToDos";
import Main from "./Components/Main";
import Mainhooks from "./Components/Mainhooks";
import Debug from "./Components/Debug";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/'>
            <Mainhooks />
          </Route>
          <Route exact path='/todo'>
            <ToDos />
          </Route>
          <Route exact path='/debug'>
            <Debug></Debug>
          </Route>
        </Switch>
      </Router>
    );
  }
}
