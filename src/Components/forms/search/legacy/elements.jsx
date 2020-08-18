import styled from "styled-components";

export const Container = styled.div`
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  background: white;
  text-align: left;
  font-family: "Cabin", sans-serif;
  > div {
    max-width: 800px;
    margin: auto;
  }
`;

export const Header = styled.div`
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
export const Section = styled.div`
  border-top: 1px solid #2222;
  padding: 1rem;
  > div {
    padding: 1rem 0;
  }
`;

export const Box = styled.div`
  display: grid;
`;

export const Slider = styled.input`
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
