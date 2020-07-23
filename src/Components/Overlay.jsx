import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InputBox from "./InputBox";
import { useDispatch, useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import Button_Action from "./Templates/Button_Action";
export default function Overlay(props) {
  const state = useSelector((state) => state);
  const visible = state.showFilters;
  const { filteredWords, showFilters, maxPrice, minPrice, maxResults } = state;
  const dispatch = useDispatch();
  const writeToState = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    dispatch({ type: "input", payload: value, id: id });
  };

  const toggleVisibility = () => {
    dispatch({ type: "toggleFilters" });
    dispatch({ type: "floatingVisibility", payload: showFilters });
  };

  useEffect(() => {
    const willEsc = (e) => {
      if (e.key === "Escape") {
        toggleVisibility();
      }
    };
    window.addEventListener("keydown", willEsc);

    return () => window.removeEventListener("keydown", willEsc);
  }, []);

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
            value={maxPrice}
            writeToState={writeToState}
            submit={props.submit}
          />
          <div>Min price</div>
          <Input
            id='minPrice'
            type='number'
            value={minPrice}
            writeToState={writeToState}
            submit={props.submit}
          />
        </Box>
        <Title>Max results</Title>
        <Box>
          <Input
            id='maxResults'
            type='number'
            value={maxResults}
            writeToState={writeToState}
            submit={props.submit}
          />
        </Box>
      </Section>
      <Button_Action
        text='Submit'
        submit={() => {
          toggleVisibility();
          props.submit();
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  display: ${(props) => (props.visible ? "initial" : "none")};
  z-index: 999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: white;
  text-align: left;
  overflow: scroll;
  font-family: "Cabin", sans-serif;
  > div {
    max-width: 800px;
    margin: auto;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1rem;
  font-size: 1rem;
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

const Title = styled.div`
  color: black;
  text-decoration: none;
  font-weight: bold;
  margin: 1rem 0 0;
`;

const Box = styled.div`
  display: grid;
  > div,
  > input {
    padding: 0.5rem 0;
  }
`;

const Input = styled(InputBox)`
  font-size: 1.1rem;
  border: 0;
  width: 100%;
`;
