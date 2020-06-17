import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filters from "./Filters";
import Searchbox from "./SearchBox";
import Results from "./Results";
import Footer from "./Footer";
import FloatingButton from "./FloatingButton";
import Overlay from "./Overlay";
import { read, write } from "../Utilities/database";

import {
  readLocalStorage,
  writeToLocalStorage,
} from "../Utilities/utilityFunctions";
import { useSelector, useDispatch } from "react-redux";

export default function Mainhooks() {
  const {
    keywords,
    maxPrice,
    minPrice,
    maxResults,
    searchResults,
    username,
    lifeCycle,
    showMap,
    showFilters,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [scraperIsLive, setScraperState] = useState(true);
  const [scrollPosition, setscrollPosition] = useState(0);
  const [scrollCount, setscrollCount] = useState(0);

  const search = async (message) => {
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
      dispatcher.writeSearchResults(body);
      console.log("The response was: ", body);
      setScraperState(true);
      writeToLocalStorage(body);
      dispatcher.lifeCycle("static");
    } catch (error) {
      console.log(
        `Error connecting to ${url} / Search operation triggered this error`
      );
      setScraperState(false);
      dispatcher.lifeCycle("error");
    }
  };
  const connectToDB = async (username) => {
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
      dispatcher.writeSearchResults(body);
      writeToLocalStorage(body);
      console.log(body);
    } catch (error) {
      console.log(
        `Error connecting to ${url} / Database operation triggered this error`
      );
      setScraperState(false);
    }
  };
  const connectToDBV2 = async (endpoint, body, callback) => {
    const localhostUrl = "http://localhost:5000";
    const url = localhostUrl + endpoint;
    const reqBody = JSON.stringify(body);
    try {
      const req = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: { "Content-Type": "application/json" },
        body: reqBody, // body data type must match "Content-Type" header
      });
      const body = await req.json();
      callback(body);
      //dispatcher.writeSearchResults(body);
      //this.setState({ searchResults: body });
      //writeToLocalStorage(body);
      console.log("connect to dbv2 was successful!, got response: ", body);
    } catch (error) {
      console.log(
        `Error connecting to ${url} / Database operation triggered this error`
      );
      setScraperState(false);
    }
  };

  const submit = (e) => {
    dispatcher.lifeCycle("loading");
    const message = {
      params: {
        keywords: keywords,
        maxPrice: maxPrice,
        minPrice: minPrice,
      },
      options: { maxResults: parseInt(maxResults) },
    };
    search(JSON.stringify(message));
    console.log("You sent the message", message);
  };

  const scrollInfo = (position) => {
    const goingDown = scrollPosition < position;
    scrollPosition(position);
    setscrollCount(goingDown ? 0 : scrollCount + 1);

    return scrollCount > 5;
  };

  const localStorageCheck = async (flags) => {
    if (flags === "empty") return;
    if (flags === "debug") {
      connectToDBV2(
        "/public",
        { path: "users/public/searches" },
        (response) => {
          console.log("All results in front end: ", response);
          //dispatcher.writeSearchResults(response[]);
        }
      );
      /*       connectToDBV2("/public", { path: "users/aaspinwall" }, (response) => {
        console.log("Latest results loaded: ", response);
        dispatcher.writeSearchResults(response);
      }); */
      //connectToDBV2("/");
      return;
    }
    //TODO add flags
    //Check if local storage exists to load the previous search
    const localStorage = readLocalStorage();
    if (localStorage) {
      //Load previous search
      dispatcher.writeSearchResults(localStorage);
      console.log("Local storage found and loaded");
    } else {
      //If no local storage, query database
      console.log("No local storage");
      console.log("This runs as page connects. Username: ", username);
      connectToDB(username);
    }
  };

  const windowSetup = () => {
    if (window.innerWidth > 1024) {
      console.log("over 1024");
      dispatcher.floatingVisibility(false);
      dispatcher.setMapVisibility(true);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        dispatcher.floatingVisibility(false);
        if (!showMap) dispatcher.setMapVisibility(true);
      } else {
        dispatcher.floatingVisibility(true);
      }
    });
    window.addEventListener("keydown", () => submit);
  };

  const dispatcher = {
    testText: (e) => {
      const value = e.target.value;
      dispatch({ type: "test", payload: value });
    },
    userInput: (e) => {
      const value = e.target.value;
      const id = e.target.id;
      dispatch({ type: "input", payload: value, id: id });
    },
    writeSearchResults: (results) => {
      dispatch({ type: "results", payload: results });
    },

    lifeCycle: (flag) => {
      dispatch({ type: "lifeCycle", payload: flag });
    },
    toggleMap: () => {
      dispatch({ type: "toggleMap" });
    },
    setMapVisibility: (visible) => {
      dispatch({ type: "mapVisibility", payload: visible });
    },
    toggleSearch: () => {
      dispatch({ type: "toggleSearch" });
    },
    floatingVisibility: (visible) => {
      dispatch({ type: "floatingVisibility", payload: visible });
    },
  };

  useEffect(() => {
    read();
    localStorageCheck("debug");
    dispatcher.lifeCycle("static");
    windowSetup();
  }, []);

  return (
    <AppContainer id='appContainer'>
      <Overlay submit={submit} visible={showFilters} />
      {scrollCount > 5 ? <Flag>UP!</Flag> : ""}
      <Searchbox submit={submit} />
      <Filters />
      <Results></Results>
      <FloatingButton text={["Map", "List"]} />
      <Footer />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  @media only screen and (min-width: 1024px) {
    max-width: 1400px;
  }
  max-width: 1000px;
  margin: auto;
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
