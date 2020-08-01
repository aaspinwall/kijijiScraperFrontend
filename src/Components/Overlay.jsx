import React, { useEffect } from "react";
import styled from "styled-components";
import { Label } from "../Styles/Components";
import InputBox from "./InputBox";
import { useDispatch, useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import Button_Action from "./Templates/Button_Action";
export default function Overlay({
  submit,
  forceVisible = false,
  close = () => {},
}) {
  const state = useSelector((state) => state);
  const visible = forceVisible ? forceVisible : state.showFilters;
  const { maxPrice, minPrice, maxResults, keywords } = state;
  const dispatch = useDispatch();
  const writeToState = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    dispatch({ type: "input", payload: value, id: id });
  };

  useEffect(() => {
    const willEsc = (e) => {
      if (e.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", willEsc);
    document.querySelectorAll("input").forEach((n) => (n.autocomplete = "off"));
    return () => window.removeEventListener("keydown", willEsc);
  }, []);

  return (
    <Container visible={visible} contained={forceVisible} scale={1}>
      <Section>
        {!forceVisible ? (
          <Header>
            <MdClose onClick={close} />
          </Header>
        ) : null}

        <Box>
          <Label>Keywords</Label>
          <InputBox
            config={{ id: "keywords", type: "text", value: keywords }}
            writeToState={writeToState}
            submit={submit}
          />
          <Label>Max price</Label>
          <div>{maxPrice}</div>
          <Slider
            id='maxPrice'
            type='range'
            min={300}
            max={3000}
            step={25}
            value={maxPrice}
            onChange={writeToState}
          />

          <Label>Min price</Label>
          <div>{minPrice}</div>
          <Slider
            id='minPrice'
            type='range'
            min={300}
            max={3000}
            step={25}
            value={minPrice}
            onChange={writeToState}
          />

          <Label>Max results</Label>
          <div>{maxResults}</div>
          <Slider
            id='maxResults'
            type='range'
            min={20}
            max={120}
            step={20}
            value={maxResults}
            onChange={writeToState}
          />
        </Box>
        <Box></Box>
        <Button_Action
          text='Search'
          submit={() => {
            submit();
          }}
        />
      </Section>
    </Container>
  );
}

const Container = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  z-index: 999;
  position: ${(props) => (props.contained ? "static" : "fixed")};
  left: 0;
  top: 0;
  width: 100%;
  height: ${(props) => (props.contained ? "auto" : "100vh")};
  background: white;
  text-align: left;
  font-family: "Cabin", sans-serif;
  > div {
    max-width: 800px;
    margin: auto;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1rem;
  font-size: 1rem;
  svg {
    height: 1.5rem;
    width: 1.5rem;
  }
  > * {
    cursor: pointer;
  }
`;
const Section = styled.div`
  border-top: 1px solid #2222;
  padding: 1rem;
  > div {
    padding: 1rem 0;
  }
`;

const Box = styled.div`
  display: grid;
`;

const Slider = styled.input`
  color: green;
  -webkit-appearance: none;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  border-radius: 20px;
  ::-moz-range-thumb {
    cursor: pointer;
    border-radius: 50%;
  }
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    border-radius: 20px;
    width: 1rem;
    height: 1rem;
    background: rgb(255, 90, 95);
    cursor: pointer;
  }
`;
