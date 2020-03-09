import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Styles/Style.css";
import ToDos from "./Components/ToDos";
import Main from "./Components/Main";
import Loading from "./Components/Loading";
import InputBox from "./Components/InputBox";
import Results from "./Components/Results";

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
          <Route exact path='/debug'>
            <Results></Results>
          </Route>
        </Switch>
      </Router>
    );
  }
}
