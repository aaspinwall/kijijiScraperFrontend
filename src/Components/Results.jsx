import React, { useEffect } from "react";
import styled from "styled-components";
import Result from "./Result";
import Loading from "./Loading";
import Error from "./Error";
import Map from "./Map";
import Walkscore from "./Walkscore";
import { useSelector, useDispatch } from "react-redux";

function Results(props) {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const {
    searchResults,
    filteredWords,
    filteredSearch,
    lifeCycle,
    showMap,
  } = globalState;
  const applyFilter = arr => {
    dispatch({ type: "filtered", payload: arr });
  };
  useEffect(() => {
    const filterResults = () => {
      const filteredResults = searchResults.filter(element => {
        const title = element.title;
        //Check if it passes all the filteredWords
        return filteredWords.every(word => {
          const noWordFound = title.toLowerCase().search(word) === -1;
          return noWordFound;
        });
      });
      return filteredResults;
    };
    console.log("EFFECT RAN BECAUSE SEARCHRESULTS CHANGED");
    applyFilter(filterResults());
  }, [searchResults]);

  const results = filteredSearch.map((element, i) => {
    if (i === 0) {
      console.log(element.attributes.location);
      const {
        mapAddress: address,
        latitude,
        longitude,
      } = element.attributes.location;
      return (
        <div>
          <Result ad={element} key={i} />
          <Walkscore locationData={{ address, latitude, longitude }} />
        </div>
      );
    }
    return <Result ad={element} key={i} />;
  });

  const loading = <Loading></Loading>;

  const display = () => {
    switch (lifeCycle) {
      case "loading":
        return loading;

      case "static":
        return (
          <div id='resultsContainer'>
            {showMap ? <Map></Map> : undefined}
            {results}
          </div>
        );

      case "error":
        return <Error></Error>;

      default:
        return;
    }
  };

  return <Container>{display()}</Container>;
}

const Container = styled.div`
  display: grid;
  #resultsContainer {
  }
`;

export default Results;
