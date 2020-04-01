import React from "react";
import styled from "styled-components";
import Filters from "./Filters";
import Searchbox from "./SearchBox";
import Results from "./Results";
import Footer from "./Footer";
import FloatingButton from "./FloatingButton";
import Overlay from "./Overlay";

import {
  readLocalStorage,
  writeToLocalStorage,
} from "../Utilities/utilityFunctions";
import { connect } from "react-redux";

// Maps `state` to `props`:
// These will be added as props to the component.
function mapState(state) {
  const {
    keywords,
    maxResults,
    maxPrice,
    minPrice,
    searchResults,
    username,
    lifeCycle,
    showMap,
  } = state;
  return {
    keywords,
    maxPrice,
    minPrice,
    maxResults,
    searchResults,
    username,
    lifeCycle,
    showMap,
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

    lifeCycle(flag) {
      dispatch({ type: "lifeCycle", payload: flag });
    },
    toggleMap() {
      dispatch({ type: "toggleMap" });
    },
    toggleSearch() {
      dispatch({ type: "toggleSearch" });
    },
  };
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scraperIsLive: true,
      showMap: false,
      scrollPosition: 0,
      scrollCount: 0,
    };
  }
  search = async message => {
    const serverUrl =
      "https://av2bnw0v0h.execute-api.us-east-1.amazonaws.com/dev";
    const localhostUrl = "http://localhost:5000";
    const url = localhostUrl + "/search";
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
      this.props.lifeCycle("static");
    } catch (error) {
      console.log(
        `Error connecting to ${url} / Search operation triggered this error`
      );
      this.setState({ scraperIsLive: false });
      this.props.lifeCycle("error");
    }
  };
  connectToDB = async username => {
    const serverUrl =
      "https://av2bnw0v0h.execute-api.us-east-1.amazonaws.com/dev";
    const localhostUrl = "http://localhost:5000";
    const url = localhostUrl + "/users";
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

  submit = e => {
    this.props.lifeCycle("loading");
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

  scrollInfo = position => {
    const goingDown = this.state.scrollPosition < position;
    this.setState(
      {
        scrollPosition: position,
        scrollCount: goingDown ? 0 : this.state.scrollCount + 1,
      }
      /* () => console.log(this.state.scrollCount) */
    );
    return this.state.scrollCount > 5;
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
    this.props.lifeCycle("static");
    window.addEventListener("scroll", e => {
      const position = window.pageYOffset;
      this.scrollInfo(position);
    });
  }
  render() {
    return (
      <AppContainer id='appContainer'>
        <Overlay submit={this.submit} visible={this.props.showFilters} />
        {this.state.scrollCount > 5 ? <Flag>UP!</Flag> : ""}
        <Searchbox submit={this.submit} />
        <Filters />
        <Results></Results>
        <FloatingButton text={["Map", "List"]} />
        <Footer />
      </AppContainer>
    );
  }
}

const AppContainer = styled.div`
  .resultsContainer {
    position: relative;
    display: grid;
  }
`;

const Flag = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  width: 100%;
  text-align: center;
`;

export default connect(mapState, mapDispatch)(Main);
