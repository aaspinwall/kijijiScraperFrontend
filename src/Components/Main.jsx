import React from "react";
import { SearchInput, Spinner } from "evergreen-ui";
import styled from "styled-components";
import Filters from "./Filters";
import Search from "./Search";
import Result from "./Result";
import Map from "./Map";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "myname",
      searchResults: [{ title: "Nothing here" }],
      username: "aaspinwall",
      keywords: "",
      maxPrice: 1500,
      maxResults: 20,
      filteredWords: [
        "recherch",
        "office",
        "bureau",
        "stationnement",
        "parking",
      ],
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
          {/* //TODO ADD MAP
            <Map /> */}
          <label>Neighbourhood</label>
          <SearchInput
            id='keywords'
            type='text'
            value={this.state.keywords}
            onChange={this.handleChange}
          ></SearchInput>
          <Filters input={this.state.filteredWords} />
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
          <Spinner />
          <Results>
            {this.state.searchResults.map((element, i) => {
              const title = element.title;
              const filters = this.state.filteredWords;
              const passesFilters = filters.every(word => {
                const noWordFound = title.toLowerCase().search(word) === -1;
                return noWordFound;
              });
              console.log(title);
              return passesFilters ? (
                <Result ad={element} key={i} />
              ) : (
                undefined
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
`;
