import React from "react";
import styled from "styled-components";
import Bubble from "./Bubble";

export default function Filters(props) {
  return (
    <Container>
      <Bubble text='Price' value='1500' />
      <Bubble text='More' value='1500' />
      <Input value={props.input.join("+")}></Input>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const Input = styled.input``;
