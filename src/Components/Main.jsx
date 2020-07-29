import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Filters from "./Filters";
import Searchbox from "./SearchBox";
import Results from "./Results";
import Footer from "./Footer";
import FloatingButton from "./FloatingButton";
import Overlay from "./Overlay";
import OldSearch from "./OldSearch";
import { Content, Top } from "../Styles/Components";
import UseEventListener from "../Utilities/hooks";

import { useSelector, useDispatch } from "react-redux";
import { read } from "../Utilities/database";

export default function Mainhooks() {
  const {
    keywords,
    maxPrice,
    minPrice,
    maxResults,
    searchResults,
    isLive,
    windowInfo,
    showMapListButton,
    showMap,
    showFilters,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  //Search Heroku / Write results / Change lifecycle
  const search = async (message) => {
    const localhostUrl = "https://limitless-cove-26677.herokuapp.com";
    const url = localhostUrl + "/search";
    try {
      const req = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: message,
      });
      const body = await req.json();
      //Pass search results to Redux state
      dispatcher.writeSearchResults(body);
      //Static renders results the rest of the UI
      dispatcher.lifeCycle("static");
    } catch (error) {
      console.log(
        `Error connecting to ${url} / Search operation triggered this error`
      );
      //Trigger cat animation
      dispatcher.lifeCycle("error");
    }
  };

  const submit = () => {
    //Trigger cat gifs while user waits
    dispatcher.lifeCycle("loading");
    const message = {
      params: {
        keywords: keywords,
        maxPrice: maxPrice,
        minPrice: minPrice,
      },
      options: { maxResults: parseInt(maxResults) },
    };
    //Connect to API
    search(JSON.stringify(message));
  };

  const arrangeView = () => {
    const isMobile = window.innerWidth < 1024;
    //Initialize window views
    dispatcher.setMapVisibility(!isMobile);
    dispatcher.floatingVisibility(isMobile);
  };

  const windowSetup = () => {
    arrangeView();
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
    //Check if server is live
    let runningLive;
    const isServerRunning = async () => {
      try {
        const url = "https://limitless-cove-26677.herokuapp.com/host";
        const body = await fetch(url);
        const response = await body.json();
        runningLive = response.response;
      } catch (error) {
        runningLive = false;
      }
    };
    isServerRunning();

    //Check if global state has filteredSearch
    const emptySearch = searchResults[0].title === "Nothing here";
    if (emptySearch || runningLive) {
      read(`/users/public/latest/results`, (response) => {
        console.log(response);
        dispatcher.writeSearchResults(response);
      });
    }
    dispatcher.lifeCycle("static");
    windowSetup();
  }, []);

  const getMainSearch = () => {
    switch (isLive) {
      case "one":
        return (
          <Content footerHeight={windowInfo.footerHeight}>
            {showFilters ? (
              <Overlay submit={submit} visible={showFilters} />
            ) : null}
            {searchResults ? <Results></Results> : null}

            {showMapListButton ? (
              <FloatingButton text={["Map", "List"]} />
            ) : null}
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

  return (
    <AppContainer id='appContainer'>
      <Top>
        <Searchbox submit={submit} />
        <Filters />
      </Top>
      {getMainSearch()}
      <Footer />
    </AppContainer>
  );
}

const AppContainer = styled.main`
  position: relative;
  min-height: 100vh;
  @media only screen and (min-width: 1024px) {
    max-width: 2000px;
  }
  max-width: 1000px;
  margin: auto;
`;
