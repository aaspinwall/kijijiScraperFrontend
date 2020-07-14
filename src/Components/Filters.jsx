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
  return (
    <Container>
      <Button onClick={toggleVisibility}>Filters</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0 0.5rem;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: solid #2222 2px;
`;
