import React from "react";
import styled from "styled-components";
import Bubble from "./Bubble";

export default function Filters(props) {
  return (
    <Container>
      <Bubble
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
      {/* <Bubble
        label='Filters'
        type='text'
        content={[
          {
            text: "Filter words",
            type: "text",
            id: "filteredWords",
          },
        ]}
      /> */}
      <Bubble
        label='More'
        type='number'
        content={[{ text: "Max results", type: "number", id: "maxResults" }]}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input``;
