import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { FiSearch } from "react-icons/fi";

export default function SearchBox(props) {
  const dispatch = useDispatch();
  const [input, changeInput] = useState("");

  const userInput = e => {
    const value = e.target.value;
    const id = e.target.id;
    dispatch({ type: "input", payload: value, id: id });
  };
  return (
    <Container>
      <Box>
        <FiSearch onClick={() => props.submit()} />
        <SearchInput
          id='keywords'
          type='text'
          submit={props.submit}
          value={input}
          onChange={e => changeInput(e.target.value)}
          onBlur={e => {
            userInput(e);
          }}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === "Tab") {
              changeInput(e.target.value);
              if (e.key === "Enter") {
                props.submit(e);
              }
            }
          }}
        ></SearchInput>
      </Box>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0;
  border: 0;
  padding: 0.5rem 0;
`;

const Box = styled.div`
  border: #2222 solid 1px;
  box-shadow: 1px 2px #2222;
  padding: 0.25rem 0.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
`;
const SearchInput = styled.input`
  width: 100%;
  height: 2rem;
  padding-left: 2rem;
  border: 0;
  font-weight: bold;
  font-size: 1.1rem;
`;
