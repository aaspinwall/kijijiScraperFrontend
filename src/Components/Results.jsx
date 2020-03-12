import React, { useEffect } from "react";
import styled from "styled-components";
import Result from "./Result";
import Loading from "./Loading";
import Error from "./Error";
import Map from "./Map";
import { connect } from "react-redux";

function mapState(state) {
  const {
    searchResults,
    filteredWords,
    filteredSearch,
    lifeCycle,
    showMap,
  } = state;
  return {
    searchResults,
    filteredWords,
    filteredSearch,
    lifeCycle,
    showMap,
  };
}

// Maps `dispatch` to `props`:
function mapDispatch(dispatch) {
  return {
    userInput(e) {
      const value = e.target.value;
      const id = e.target.id;
      dispatch({ type: "input", payload: value, id: id });
    },
    applyFilter(arr) {
      dispatch({ type: "filtered", payload: arr });
    },
  };
}
function Results(props) {
  const { searchResults, applyFilter, filteredWords } = props;
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

  const results = props.filteredSearch.map((element, i) => {
    return <Result ad={element} key={i} />;
  });

  const loading = <Loading></Loading>;

  const display = () => {
    const lifeCycle = props.lifeCycle;
    switch (lifeCycle) {
      case "loading":
        return loading;

      case "static":
        return (
          <div>
            {props.showMap ? <Map></Map> : undefined}
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
`;

export default connect(mapState, mapDispatch)(Results);
