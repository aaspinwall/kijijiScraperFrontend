import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

export default function Filters() {
  const dispatch = useDispatch();
  const { showMap, showFilters, showMapListButton } = useSelector(
    (state) => state
  );

  const toggleVisibility = () => {
    dispatch({ type: "toggleFilters" });
    dispatch({ type: "floatingVisibility", payload: showFilters });
  };
  return <Button onClick={toggleVisibility}>Filters</Button>;
}

const Button = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: solid #2222 2px;
  font-size: 1rem;
  cursor: pointer;

  @media only screen and (min-width: 1024px) {
    margin: 0.7rem 0 0;
    font-size: 1.2rem;
  }
`;
