import React, { useEffect, useRef } from "react";
import { Spinner } from "evergreen-ui";
import styled from "styled-components";
import Result from "./Result";
import Loading from "./Loading";
import Error from "./Error";
import Map from "./Map";
import { useSelector, useDispatch } from "react-redux";
import { compareTwoStrings } from "string-similarity";

const formatTitle = (str) => {
  const cleanStr = str.replace(/([*►◄!])+/g, "").toLowerCase();
  const regex = /[a-z]/;
  const found = cleanStr.match(regex);
  return cleanStr.replace(found[0], found[0].toUpperCase());
};

const passSimilarity = (a, b, threshold = 0.7) => {
  const rating = compareTwoStrings(a, b);
  return rating > threshold;
};

const removeDuplicates = (arr) => {
  const filtered = arr.filter((result) => {
    let strikes = 0;
    const reference = result.description;
    const reference2 = result.title;
    if (!reference) {
      console.log("Did not work");
      return;
    }
    arr.forEach((res2) => {
      const comparison = res2.description;
      const comparison2 = res2.title;
      if (
        passSimilarity(comparison, reference) ||
        passSimilarity(comparison2, reference2)
      ) {
        strikes += 1;
      }
    });

    return strikes === 1;
  });

  return filtered.reverse();
};

function Results() {
  const dispatch = useDispatch();
  const {
    searchResults,
    filteredWords,
    filteredSearch,
    lifeCycle,
    showMap,
  } = useSelector((state) => state);

  const applyFilter = (arr) => {
    dispatch({ type: "filtered", payload: arr });
  };
  const filterResults = () => {
    const filteredResults = searchResults.filter((element) => {
      const title = element.title;
      //Check if it passes all the filteredWords
      return filteredWords.every((word) => {
        const noWordFound = title.toLowerCase().search(word) === -1;
        return noWordFound;
      });
    });

    //Apply formatting rules
    const formattedResults = filteredResults.map((result, i) => {
      const { title } = result;
      return { ...result, title: formatTitle(title) };
    });
    const noDuplicates = removeDuplicates(formattedResults);

    return noDuplicates;
  };

  useEffect(() => {
    //filterResults();
    applyFilter(filterResults());
  }, [searchResults]);

  useEffect(() => {
    applyFilter(filterResults());
  }, []);

  /*   useEffect(() => {
    if (lifeCycle === "static") {
      filterResults();
      applyFilter(filterResults());
    }
  }, [filteredWords]); */

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

    return <Result ad={element} key={i} index={i} identifier={`result_${i}`} />;
  });
  const noRepeats = allAttrs;
  const loading = <Loading></Loading>;

  const display = () => {
    switch (lifeCycle) {
      case "loading":
        return loading;

      case "static":
        return (
          <div id='resultsContainer'>
            {showMap ? <Map></Map> : undefined}
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
        overflow-y: scroll;
        height: 100vh;
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
