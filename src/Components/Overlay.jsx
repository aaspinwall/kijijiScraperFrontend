import React, { useState } from "react";
import styled from "styled-components";
import InputBox from "./InputBox";
import { useDispatch, useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
export default function Overlay(props) {
  const visible = useSelector(state => state.showFilters);
  const dispatch = useDispatch();
  //const [visible, toggleVisible] = useState(props.visible);
  const writeToState = e => {
    const value = e.target.value;
    const id = e.target.id;
    dispatch({ type: "input", payload: value, id: id });
  };

  const toggleVisibility = () => {
    dispatch({ type: "toggleFilters" });
  };

  return (
    <Container visible={visible}>
      <Section>
        <Header>
          <MdClose onClick={toggleVisibility} />
          <div>Clear</div>
        </Header>
        <Title>Price Range</Title>
        <Box>
          <div>Max price</div>
          <Input
            id='maxPrice'
            type='number'
            value={1800}
            writeToState={writeToState}
            submit={props.submit}
          />
          <div>Min price</div>
          <Input
            id='minPrice'
            type='number'
            value={400}
            writeToState={writeToState}
            submit={props.submit}
          />
        </Box>
      </Section>
      <Section>Close</Section>
      <Section>Close</Section>
      <Section>Close</Section>
    </Container>
  );
}

const Container = styled.div`
  display: ${props => (props.visible ? "initial" : "none")};
  z-index: 999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  text-align: left;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding-right: 1rem;
  svg {
    height: 1.5rem;
    width: 1.5rem;
  }
`;
const Section = styled.div`
  border-top: 1px solid #2222;
  padding: 1rem;
  > div {
    padding: 1rem 0;
  }
`;

const Title = styled.h4`
  color: black;
  text-decoration: none;
  font-weight: bold;
`;

const Box = styled.div`
  display: grid;
  > div,
  > input {
    padding: 1rem 0;
  }
`;

const Input = styled(InputBox)`
  font-size: 1.1rem;
  border: 0;
  width: 100%;
`;
