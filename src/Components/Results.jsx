import React, { useEffect } from "react";
import styled from "styled-components";
import Result from "./Result";
import Loading from "./Loading";
import Error from "./Error";
import Map from "./Map";
import { useSelector, useDispatch } from "react-redux";
import { compareTwoStrings } from "string-similarity";

const formatTitle = str => {
  const cleanStr = str.replace(/([*►◄!])+/g, "").toLowerCase();
  const regex = /[a-z]/;
  const found = cleanStr.match(regex);
  return cleanStr.replace(found[0], found[0].toUpperCase());
};

const passSimilarity = (a, b, threshold = 0.7) => {
  const rating = compareTwoStrings(a, b);
  return rating > threshold;
};

const removeDuplicates = arr => {
  console.log("Pre filtered", arr);
  /* console.log(
    arr.sort((a, b) => (a.attributes.price > b.attributes.price ? 1 : -1))
  ); */
  /* arr.forEach((result, i) => {
    //console.log(result.title.split(" ").sort());
    //console.log(result.images.length);
  }); */
  const filtered = arr.filter(result => {
    let strikes = 0;
    const reference = result.description;
    const reference2 = result.title;
    if (!reference) {
      console.log("Did not work");
      return;
    }
    arr.forEach(res2 => {
      const comparison = res2.description;
      const comparison2 = res2.title;
      if (
        passSimilarity(comparison, reference) ||
        passSimilarity(comparison2, reference2)
      ) {
        strikes += 1;
      }
    });
    /* console.log(i, "Yielded ", strikes, " strikes"); */
    return strikes === 1;
  });
  console.log("filtered should look like this:", filtered);
  //return arr.reverse();
  return filtered.reverse();
};

function Results() {
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

      //Apply formatting rules
      const formattedResults = filteredResults.map((result, i) => {
        const { title } = result;
        return { ...result, title: formatTitle(title) };
      });
      const noDuplicates = removeDuplicates(formattedResults);
      //console.log(formattedResults);
      return noDuplicates;
    };
    //console.log("SEARCHRESULTS CHANGED => Filtering results...");
    applyFilter(filterResults());
  }, [searchResults]);

  const results = filteredSearch.map((element, i) => {
    return <Result ad={element} key={i} index={i} />;
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
  #resultsContainer {
    margin: auto 1rem;
  }
`;

export default Results;
