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
    searchResults: searchResults,
    filteredWords: filteredWords,
    filteredSearch: filteredSearch,
    lifeCycle: lifeCycle,
    showMap: showMap,
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
  useEffect(() => {
    props.applyFilter(filterResults());
  }, [props.searchResults]);
  const filterResults = () => {
    const searchResults = props.searchResults;
    const filteredResults = searchResults.filter(element => {
      const title = element.title;
      const filters = props.filteredWords;
      //Check if it passes all the filters
      return filters.every(word => {
        const noWordFound = title.toLowerCase().search(word) === -1;
        return noWordFound;
      });
    });
    return filteredResults;
  };

  const results = props.filteredSearch.map((element, i) => {
    return <Result ad={element} key={i} />;
  });

  const loading = <Loading></Loading>;

  const display = () => {
    const lifeCycle = props.lifeCycle;
    switch (lifeCycle) {
      case "loading":
        return loading;
        break;
      case "static":
        return (
          <div>
            {props.showMap ? <Map></Map> : undefined}
            {results}
          </div>
        );
        break;
      case "error":
        return <Error></Error>;
        break;

      default:
        return;
        break;
    }
  };

  return <Container>{display()}</Container>;
}

const Container = styled.div`
  display: grid;
  overflow: scroll;
  height: 100vh;
`;

export default connect(mapState, mapDispatch)(Results);
