import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Styles/Style.css";
import ToDos from "./Components/ToDos";
import Main from "./Components/Main";
import Debug from "./Components/Debug";
import Intro from "./Components/Intro";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/debug'>
            <Debug />
          </Route>
          <Route exact path='/results'>
            <Main />
          </Route>
          <Route exact path='/todo'>
            <ToDos />
          </Route>
          <Route exact path='/'>
            <Intro />
          </Route>
        </Switch>
      </Router>
    );
  }
}
