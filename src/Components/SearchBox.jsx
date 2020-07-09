import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";

export default function SearchBox(props) {
  const dispatch = useDispatch();
  const searchRef = useRef();
  const input = useSelector((state) => state.keywords);
  //const [input, changeInput] = useState("");
  const [showClose, toggleClose] = useState(false);
  const [initialValue] = useState("Search");

  const userInput = (e, empty = false) => {
    if (empty) {
      dispatch({ type: "input", payload: "", id: "keywords" });
      return;
    }
    const value = e.target.value;
    const id = e.target.id;
    dispatch({ type: "input", payload: value, id: id });
  };
  return (
    <Container>
      <div id='topLogo'>
        <img src='logo512.png'></img>
      </div>
      <Box>
        <FiSearch onClick={() => props.submit()} />
        <SearchInput
          ref={searchRef}
          id='keywords'
          type='text'
          submit={props.submit}
          value={input}
          placeholder={initialValue}
          autoComplete='off'
          onFocus={() => {
            toggleClose(true);
          }}
          onChange={(e) => userInput(e)}
          onBlur={(e) => {
            userInput(e);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Tab") {
              userInput(e);
              //changeInput(e.target.value);
              if (e.key === "Enter") {
                props.submit(e);
              }
            }
          }}
        ></SearchInput>
        {showClose ? (
          <MdClose
            onClick={(e) => {
              userInput(e, true);
              //changeInput("");
              console.log(searchRef.current.focus());
            }}
          ></MdClose>
        ) : (
          ""
        )}
      </Box>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin: 0;
  border: 0;
  padding: 0.5rem 10%;
  max-width: 1000px;
  margin: auto;
  box-sizing: border-box;

  #topLogo {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 1.2rem;
    }
  }
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
