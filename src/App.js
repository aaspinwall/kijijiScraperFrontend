import React from "react";
import logo from "./logo.svg";
import "./App.css";

/* const connect = async message => {
  const url = "http://localhost:5000/test";
  const req = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: { "Content-Type": "application/json" },
    body: message, // body data type must match "Content-Type" header
  });
  const body = await req.json();
  console.log(body);
}; */
/* const connect = async message => {
  const url = "http://localhost:5000/search";
  const req = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: { "Content-Type": "application/json" },
    body: message, // body data type must match "Content-Type" header
  });
  const body = await req.json();
  console.log(body);
};
 */
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "myname", inputBox: "", searchResults: ["c"] };
  }
  connect = async message => {
    const url = "http://localhost:5000/search";
    const req = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: { "Content-Type": "application/json" },
      body: message, // body data type must match "Content-Type" header
    });
    const body = await req.json();
    this.setState({ searchResults: body });
    console.log("The response was: ", body);
  };

  clicked = e => {
    const message = { keywords: this.state.inputBox };
    this.connect(JSON.stringify(message));
    console.log("You sent the message", message);
  };
  handleChange = e => {
    const text = e.target.value;
    this.setState({ inputBox: text });
  };

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <label>Talk to the API</label>
          <input
            type='text'
            value={this.state.inputBox}
            onChange={this.handleChange}
          ></input>

          <button name='getButton' onClick={this.clicked}>
            Search
          </button>
          <div>
            {this.state.searchResults.map(element => {
              return <a href={element}>{element}</a>;
            })}
          </div>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
