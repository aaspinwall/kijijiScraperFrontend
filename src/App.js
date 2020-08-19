import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./Styles/Style.css";
import ToDos from "./Components/ToDos";
import Main from "./Components/Main";
import Debug from "./pages/results";
import Intro from "./Components/Intro";

export default class App extends React.Component {
  render() {
    return (
      <Router>
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
      </Router>
    );
  }
}
