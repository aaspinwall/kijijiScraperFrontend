import React from "react";
import { SearchInput } from "evergreen-ui";
import styled from "styled-components";
import "./App.css";
import Search from "./Components/Search";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "myname",
      searchResults: [""],
      username: "aaspinwall",
      keywords: "",
      maxPrice: 1500,
      maxResults: 20,
    };
  }
  search = async message => {
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
  connect = async username => {
    const url = "http://localhost:5000/users";
    const reqBody = JSON.stringify({ username: username });
    const req = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: { "Content-Type": "application/json" },
      body: reqBody, // body data type must match "Content-Type" header
    });
    const body = await req.json();
    this.setState({ searchResults: body });
    console.log(body);
    //const resBody = await req.json();
    //console.log("The response was: ", resBody);
  };

  clicked = e => {
    const message = {
      params: { keywords: this.state.keywords, maxPrice: this.state.maxPrice },
      options: { maxResults: parseInt(this.state.maxResults) },
    };
    this.search(JSON.stringify(message));
    console.log("You sent the message", message);
  };
  handleChange = e => {
    const text = e.target.value;
    const id = e.target.id;
    this.setState({ [id]: text });
  };
  componentDidMount() {
    console.log("This runs as page connects...", this.state.username);
    this.connect(this.state.username);
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <label>Neighbourhood</label>
          <SearchInput
            id='keywords'
            type='text'
            value={this.state.keywords}
            onChange={this.handleChange}
          ></SearchInput>
          <label>Max price</label>
          <input
            id='maxPrice'
            type='number'
            value={this.state.maxPrice}
            onChange={this.handleChange}
          ></input>
          <label>Max results</label>
          <input
            id='maxResults'
            type='number'
            value={this.state.maxResults}
            onChange={this.handleChange}
          ></input>

          <button name='getButton' onClick={this.clicked}>
            Search
          </button>
          <Results>
            {this.state.searchResults.map(element => {
              return (
                <div>
                  <img src={element.image}></img>
                  <div>
                    <a href={element.url}>{element.title}</a>
                    <p>
                      {element.description
                        ? element.description.slice(0, 100) + "..."
                        : ""}
                    </p>
                    <div className='price'>
                      {element.attributes
                        ? element.attributes.price
                        : "Search for something to see results"}
                    </div>
                  </div>
                </div>
              );
            })}
          </Results>
        </header>
      </div>
    );
  }
}

const Results = styled.div`
  display: grid;
  > div {
    display: flex;
    justify-content: left;
    align-items: center;
    width: 100%;
    padding: 1rem;
    > div {
      display: grid;
    }
  }

  img {
    object-fit: cover;
    width: 200px;
    height: 120px;
    border-radius: 20px;
    padding: 0.7rem;
  }
  a,
  a:visited {
    color: white;
    font-size: 1rem;
  }
  p {
    font-size: 1rem;
    text-align: left;
  }
`;
