import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filters from "./Filters";
import Searchbox from "./SearchBox";
import Results from "./Results";
import Footer from "./Footer";
import FloatingButton from "./FloatingButton";
import Overlay from "./Overlay";
import OldSearch from "./OldSearch";
import { Content } from "../Styles/Components";

import { writeToLocalStorage } from "../Utilities/utilityFunctions";
import { useSelector, useDispatch } from "react-redux";
import { database } from "firebase";
import { read } from "../Utilities/database";

export default function Mainhooks() {
  const {
    keywords,
    maxPrice,
    minPrice,
    maxResults,
    searchResults,
    filteredSearch,
    isLive,
    windowInfo,
    lifeCycle,
    showMap,
    showFilters,
    showFloating,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [scraperIsLive, setScraperState] = useState(true);
  const [scrollPosition, setscrollPosition] = useState(0);
  const [scrollCount, setscrollCount] = useState(0);

  const search = async (message) => {
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
      //setScraperState(true);
      //writeToLocalStorage(body);
      dispatcher.lifeCycle("static");
    } catch (error) {
      console.log(
        `Error connecting to ${url} / Search operation triggered this error`
      );
      //setScraperState(false);
      dispatcher.lifeCycle("error");
    }
  };

  const submit = () => {
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

  const setWindowSize = () => {
    dispatcher.windowSize("windowHeight", window.innerHeight);
    dispatcher.windowSize("windowWidth", window.innerWidth);
  };

  const windowSetup = () => {
    const isDesktop = window.innerWidth > 1024;

    dispatcher.setMapVisibility(window.innerWidth > 1024 ? true : false);

    window.addEventListener("resize", () => {
      setWindowSize();
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
    windowSize: (id, value) => {
      dispatch({
        type: "windowInfo",
        payload: { id, value: value },
      });
    },
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
    setWindowSize();
    //Check if global state has filteredSearch
    const emptySearch = searchResults[0].title === "Nothing here";
    if (emptySearch) {
      read(`/users/public/latest`, (response) =>
        dispatcher.writeSearchResults(response.results)
      );
    }
    dispatcher.floatingVisibility(window.innerWidth < 1024);
    dispatcher.lifeCycle("static");
    windowSetup();
  }, []);

  const name = (params) => {
    switch (isLive) {
      case "one":
        return (
          <Content footerHeight={windowInfo.footerHeight}>
            {flagUp}
            <Searchbox submit={submit} />
            <Filters />
            <Overlay submit={submit} visible={showFilters} />
            <Results></Results>
            {showFloating ? <FloatingButton text={["Map", "List"]} /> : null}
          </Content>
        );
      case "two":
        return (
          <Content>
            <OldSearch />
          </Content>
        );
      default:
        break;
    }
  };

  const flagUp = scrollCount > 5 ? <Flag>UP!</Flag> : null;

  return (
    <AppContainer id='appContainer'>
      {name()}
      <Footer />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
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
