import React, { useEffect } from "react";
import { Spinner } from "evergreen-ui";
import styled from "styled-components";
import Result from "./Result";
import Loading from "./Loading";
import Error from "./Error";
import Map from "./Map";
import { useSelector, useDispatch } from "react-redux";
import { formatResults } from "../Utilities/resultCleanup";

function Results() {
  const dispatch = useDispatch();
  const {
    searchResults,
    filteredWords,
    filteredSearch,
    lifeCycle,
    showMap,
  } = useSelector((state) => state);

  const passToGlobalState = (arr) => {
    dispatch({ type: "filtered", payload: arr });
  };

  useEffect(() => {
    const cleanData = formatResults(searchResults, filteredWords);
    passToGlobalState(cleanData);
  }, [searchResults]);

  useEffect(() => {
    const cleanData = formatResults(searchResults, filteredWords);
    passToGlobalState(cleanData);
  }, []);

  const allAttrs = [];
  const results = filteredSearch.map((element, i) => {
    const attrs = element.attributes;
    const allKeys = Object.keys(attrs);
    allKeys.map((el) => {
      const isANumber = typeof element.attributes[el] === "number";
      const notZero = element.attributes[el] !== 0;
      //add unique elements
      if (!allAttrs.includes(el) && isANumber && notZero) {
        allAttrs.push(el);
      }
    });

    //console.log(filteredSearch);

    return <Result ad={element} key={i} index={i} identifier={`result_${i}`} />;
  });
  const loading = <Loading />;

  const display = () => {
    switch (lifeCycle) {
      case "loading":
        return loading;

      case "static":
        return (
          <div id='resultsContainer'>
            {showMap ? <Map></Map> : null}
            <div id='resultList'>{results}</div>
          </div>
        );

      case "error":
        return <Error></Error>;

      default:
        return (
          <Center>
            <Spinner />
          </Center>
        );
    }
  };

  return <Container>{display()}</Container>;
}

const Container = styled.div`
  min-height: 100vh;
  #resultsContainer {
    #resultList {
      overflow-y: hidden;
      margin: 0;
    }
    @media only screen and (min-width: 1024px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      > div {
      }
      #resultList {
        padding: 0 1rem;
      }
    }
  }
  .resultContainer {
    border: 2px solid #8080803b;
    border-radius: 15px;
    padding: 2rem 2rem 1rem;
    margin: 0 1rem 1rem;
    box-shadow: 10px 7px #8080802b;
  }
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
`;

export default Results;
