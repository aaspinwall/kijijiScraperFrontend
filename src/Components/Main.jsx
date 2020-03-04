import React from "react";
import { SearchInput } from "evergreen-ui";
import styled from "styled-components";
import Filters from "./Filters";
import Result from "./Result";
import Loading from "./Loading";
import { checkIfEmptyObject } from "../Utilities/utilityFunctions";
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
    const message = {
      params: { keywords: this.props.keywords, maxPrice: this.props.maxPrice },
      options: { maxResults: parseInt(this.props.maxResults) },
    };
    this.search(JSON.stringify(message));
    console.log("You sent the message", message);
  };

  getResultsArray = () => {
    return this.props.searchResults.map((element, i) => {
      const title = element.title;
      const filters = this.props.filteredWords;
      const passesFilters = filters.every(word => {
        const noWordFound = title.toLowerCase().search(word) === -1;
        return noWordFound;
      });
      return passesFilters ? <Result ad={element} key={i} /> : undefined;
    });
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
        <SearchInput
          id='keywords'
          type='text'
          value={this.props.keywords}
          onChange={this.props.userInput}
        ></SearchInput>
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

        <label>Max price</label>
        <input
          id='maxPrice'
          type='number'
          value={this.props.maxPrice}
          onChange={this.props.userInput}
        ></input>
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
        <Loading />
        <div>{this.getResultsArray()}</div>
      </AppContainer>
    );
  }
}
const Results = styled.div`
  display: grid;
`;

const AppContainer = styled.div`
  width: 100vw;
`;
// Maps `state` to `props`:
// These will be added as props to the component.
function mapState(state) {
  const {
    keywords,
    maxPrice,
    maxResults,
    searchResults,
    filteredWords,
    username,
  } = state;
  return {
    keywords: keywords,
    maxPrice: maxPrice,
    maxResults: maxResults,
    searchResults: searchResults,
    filteredWords: filteredWords,
    username: username,
  };
}

// Maps `dispatch` to `props`:
function mapDispatch(dispatch) {
  return {
    onMessageClick(payload) {
      dispatch({ type: "add", payload });
    },
    userInput(e) {
      const value = e.target.value;
      const id = e.target.id;
      dispatch({ type: "input", payload: value, id: id });
    },
    writeSearchResults(results) {
      dispatch({ type: "results", payload: results });
    },
  };
}

export default connect(mapState, mapDispatch)(Main);
