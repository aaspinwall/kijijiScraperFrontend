import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Bubble from "./Bubble";

export default function Filters() {
  const dispatch = useDispatch();
  const globalState = useSelector(state => state);
  const { showMap, showFilters } = globalState;

  const toggleVisibility = () => {
    dispatch({ type: "toggleFilters" });
  };
  return (
    <Container>
      <Button onClick={toggleVisibility}>Filters</Button>
      {/* <Bubble
        label='Price'
        type='number'
        content={[
          {
            text: "Max price",
            type: "number",
            id: "maxPrice",
          },
          {
            text: "Min price",
            type: "number",
            id: "minPrice",
          },
        ]}
      />
      <Bubble
        label='More'
        type='number'
        content={[{ text: "Max results", type: "number", id: "maxResults" }]}
      /> */}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: solid #2222 2px;
`;
