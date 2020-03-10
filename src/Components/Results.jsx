import React, { useState } from "react";
import styled from "styled-components";
import Result from "./Result";
import Loading from "./Loading";
import { checkIfEmptyObject } from "../Utilities/utilityFunctions";
import { connect } from "react-redux";

function Results(props) {
  const getResultsArray = () => {
    const searchResults = props.searchResults;
    return checkIfEmptyObject(searchResults) ? (
      <Loading></Loading>
    ) : (
      searchResults.map((element, i) => {
        const title = element.title;
        const filters = props.filteredWords;
        const passesFilters = filters.every(word => {
          const noWordFound = title.toLowerCase().search(word) === -1;
          return noWordFound;
        });
        return passesFilters ? <Result ad={element} key={i} /> : undefined;
      })
    );
  };
  return <Container>{getResultsArray()}</Container>;
}

const Container = styled.div`
  display: grid;
`;

function mapState(state) {
  const { searchResults, filteredWords } = state;
  return {
    searchResults: searchResults,
    filteredWords: filteredWords,
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
  };
}

export default connect(mapState, mapDispatch)(Results);
