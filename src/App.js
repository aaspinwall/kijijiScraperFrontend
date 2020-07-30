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
          <Route exact path='/'>
            <Main />
          </Route>
          <Route exact path='/todo'>
            <ToDos />
          </Route>
          <Route exact path='/intro'>
            <Intro />
          </Route>
        </Switch>
      </Router>
    );
  }
}
