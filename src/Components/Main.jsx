import React from "react";
import styled from "styled-components";
import Filters from "./Filters";
import Search from "./Search";
import Results from "./Results";
import Error from "./Error";
import Map from "./Map";
import {
  readLocalStorage,
  writeToLocalStorage,
} from "../Utilities/utilityFunctions";
import { connect } from "react-redux";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { scraperIsLive: true, showMap: false };
  }
  search = async message => {
    const url = "http://localhost:5000/search";
    try {
      const req = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: { "Content-Type": "application/json" },
        body: message, // body data type must match "Content-Type" header
      });
      const body = await req.json();
      this.props.writeSearchResults(body);
      console.log("The response was: ", body);
      this.setState({ scraperIsLive: true });
      writeToLocalStorage(body);
    } catch (error) {
      console.log(
        `Error connecting to ${url} / Search operation triggered this error`
      );
      this.setState({ scraperIsLive: false });
    }
  };
  connectToDB = async username => {
    const url = "http://localhost:5000/users";
    const reqBody = JSON.stringify({ username: username });
    try {
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
    } catch (error) {
      console.log(
        `Error connecting to ${url} / Database operation triggered this error`
      );
      this.setState({ scraperIsLive: false });
    }
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

  localStorageCheck(flags) {
    //TODO add flags

    //Check if local storage exists to load the previous search
    const localStorage = readLocalStorage();
    if (localStorage) {
      //Load previous search
      this.props.writeSearchResults(localStorage);
      console.log("Local storage found and loaded");
    } else {
      //If no local storage, query database
      console.log("No local storage");
      console.log(
        "This runs as page connects. Username: ",
        this.props.username
      );
      this.connectToDB(this.props.username);
    }
  }

  componentDidMount() {
    this.localStorageCheck();
  }
  render() {
    return (
      <AppContainer id='appContainer'>
        <input
          type='checkbox'
          id='mapToggle'
          name='mapToggle'
          value='mapToggle'
          onClick={() => this.setState({ showMap: !this.state.showMap })}
        />
        <Search submit={this.clicked} />
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
        <button name='getButton' onClick={this.clicked}>
          Search
        </button>

        {this.state.scraperIsLive ? (
          <div className={this.state.showMap ? "resultsContainer" : ""}>
            <Results className={"results"} />
            {this.state.showMap ? <Map /> : ""}
          </div>
        ) : (
          <Error />
        )}
        <div
          style={{
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "grey",
            color: "white",
          }}
        >
          Here is a footer
        </div>
      </AppContainer>
    );
  }
}

const AppContainer = styled.div`
  .resultsContainer {
    display: grid;
    grid-template-columns: 50% 50%;
  }
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
