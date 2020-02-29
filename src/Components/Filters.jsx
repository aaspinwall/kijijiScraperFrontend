import React from "react";
import styled from "styled-components";
import Bubble from "./Bubble";

export default function Filters(props) {
  return (
    <Container>
      <Bubble text='Price' value='1500' type='input' data={props.maxPrice} />
      <Bubble text='Max results ' value='50' type='input' />
      <Bubble text='More' value='1500' type='multiple' />
      {/* <Input value={props.input.join("+")}></Input> */}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input``;
