import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Filters from "./Filters";
import Searchbox from "./SearchBox";
import Results from "./Results";
import Footer from "./Footer";
import FloatingButton from "./FloatingButton";
import Overlay from "./Overlay";
import OldSearch from "./OldSearch";
import { Content, Top } from "../Styles/Components";
import { search as s } from "../Utilities/utilityFunctions";
import { apiCall } from "../Utilities/utilityFunctions";
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

  const topRef = useRef(null);

  const dispatch = useDispatch();

  const submit = () => {
    //Trigger cat gifs while user waits

    //Hide filters and floating button
    dispatcher.changeState("showFilters", false);
    dispatcher.changeState("showMapListButton", false);
    dispatcher.lifeCycle("loading");

    const message = {
      params: {
        keywords: keywords,
        maxPrice: maxPrice,
        minPrice: minPrice,
      },
      options: { maxResults: parseInt(maxResults) },
    };

    const handleResponse = (res) => {
      if (res.message) {
        //Trigger cat animation
        dispatcher.lifeCycle("error");
      } else {
        console.log("Search returned: ", res);
        //Pass search results to Redux state
        dispatcher.writeSearchResults(res);
        //Static renders results the rest of the UI
        dispatcher.lifeCycle("static");
      }
    };
    //Connect to API
    console.log(message);
    s(JSON.stringify(message), handleResponse, () =>
      console.log("Search function finished")
    );
  };

  const arrangeView = () => {
    const isMobile = window.innerWidth < 1024;
    //Initialize window views
    dispatcher.setMapVisibility(!isMobile);
    dispatcher.floatingVisibility(isMobile);
  };

  const resizeHandler = () => {
    if (window.innerWidth > 1024) {
      dispatcher.floatingVisibility(false);
      if (!showMap) dispatcher.setMapVisibility(true);
    } else {
      dispatcher.floatingVisibility(true);
    }
  };

  const windowSetup = () => {
    arrangeView();
    window.addEventListener("keydown", () => submit);
    window.addEventListener("resize", resizeHandler);
  };

  const dispatcher = {
    changeState: (target, value) => {
      dispatch({ type: "changeState", target: target, payload: value });
    },

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
    toggleFilters: () => {
      dispatch({ type: "toggleFilters" });
    },
    floatingVisibility: (visible) => {
      dispatch({ type: "floatingVisibility", payload: visible });
    },
  };

  useEffect(() => {
    let runningLive;
    const url = `https://limitless-cove-26677.herokuapp.com/host`;
    apiCall(url, (res) => {
      runningLive = res.response;
    });

    //Check if global state has filteredSearch
    const emptySearch = searchResults.length < 4;
    console.log("Empty search? ", emptySearch);
    if (emptySearch) {
      console.log("Reading from database...");
      read(`/users/public/latest/results`, (response) => {
        console.log(response);
        dispatcher.writeSearchResults(response);
      });
    }
    dispatcher.lifeCycle("static");
    windowSetup();
    dispatcher.windowSize("topHeight", topRef.current.offsetHeight);
  }, []);

  const getMainSearch = () => {
    switch (isLive) {
      case "one":
        return (
          <Content footerHeight={windowInfo.footerHeight}>
            {showFilters ? (
              <Overlay
                submit={submit}
                close={() => dispatcher.changeState("showFilters", false)}
              />
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
      <Top ref={topRef}>
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
