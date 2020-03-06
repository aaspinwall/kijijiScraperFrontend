import React from "react";
import styled from "styled-components";
import Filters from "./Filters";
import Search from "./Search";
import Results from "./Results";
import {
  readLocalStorage,
  writeToLocalStorage,
} from "../Utilities/utilityFunctions";
import { connect } from "react-redux";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  search = async message => {
    const url = "http://localhost:5000/search";
    const req = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: { "Content-Type": "application/json" },
      body: message, // body data type must match "Content-Type" header
    });
    const body = await req.json();
    this.props.writeSearchResults(body);
    console.log("The response was: ", body);
    writeToLocalStorage(body);
  };
  connectToDB = async username => {
    const url = "http://localhost:5000/users";
    const reqBody = JSON.stringify({ username: username });
    const req = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: { "Content-Type": "application/json" },
      body: reqBody, // body data type must match "Content-Type" header
    });
    const body = await req.json();
    this.props.writeSearchResults(body);
    //this.setState({ searchResults: body });
    writeToLocalStorage(body);
    console.log(body);
  };

  clicked = e => {
    this.props.newSearch();
    const message = {
      params: {
        keywords: this.props.keywords,
        maxPrice: this.props.maxPrice,
        minPrice: this.props.minPrice,
      },
      options: { maxResults: parseInt(this.props.maxResults) },
    };
    this.search(JSON.stringify(message));
    console.log("You sent the message", message);
  };

  componentDidMount() {
    const localStorage = readLocalStorage();
    if (localStorage) {
      this.props.writeSearchResults(localStorage);
    } else {
      console.log("This runs as page connects...", this.props.username);
      this.connectToDB(this.props.username);
    }
  }
  render() {
    return (
      <AppContainer id='appContainer'>
        <Search></Search>
        <Filters
          input={this.props.filteredWords}
          maxPrice={{
            id: "maxPrice",
            title: "Max Price",
            type: "number",
            value: this.props.maxPrice,
            onChange: this.props.userInput,
          }}
        />
        <label>Max results</label>
        <input
          id='maxResults'
          type='number'
          value={this.props.maxResults}
          onChange={this.props.userInput}
        ></input>
        <button name='getButton' onClick={this.clicked}>
          Search
        </button>
        <Results />
      </AppContainer>
    );
  }
}

const AppContainer = styled.div`
  :focus {
    display: none;
  }
`;
// Maps `state` to `props`:
// These will be added as props to the component.
function mapState(state) {
  const {
    keywords,
    maxPrice,
    minPrice,
    maxResults,
    searchResults,
    filteredWords,
    username,
  } = state;
  return {
    keywords: keywords,
    maxPrice: maxPrice,
    minPrice: minPrice,
    maxResults: maxResults,
    searchResults: searchResults,
    filteredWords: filteredWords,
    username: username,
  };
}

// Maps `dispatch` to `props`:
function mapDispatch(dispatch) {
  return {
    testText(e) {
      const value = e.target.value;
      dispatch({ type: "test", payload: value });
    },
    userInput(e) {
      const value = e.target.value;
      const id = e.target.id;
      dispatch({ type: "input", payload: value, id: id });
    },
    writeSearchResults(results) {
      dispatch({ type: "results", payload: results });
    },
    newSearch() {
      dispatch({ type: "clearResults" });
    },
  };
}

export default connect(mapState, mapDispatch)(Main);
