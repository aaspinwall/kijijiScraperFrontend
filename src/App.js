import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Styles/Style.css";
import ToDos from "./Components/ToDos";
import Main from "./Components/Main";
import Loading from "./Components/Loading";
import InputBox from "./Components/InputBox";

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
            <InputBox
              id='test'
              type='text'
              value='write something here'
              writeToState={e => console.log("this goes out into the world", e)}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}
