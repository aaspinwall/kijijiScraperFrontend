import React from "react";
import styled from "styled-components";
//import "../App.css";

export default function ToDos() {
  return (
    <Container>
      <h4>Current Issue</h4>
      <CurrentIssue>
        <h5>Welcome page</h5>
        <div>Initial searchbox</div>
        <div>Login link</div>
      </CurrentIssue>

      <h4>Front end</h4>
      <Issue>
        <h5>Filter buttons</h5>
        <p>InputBox should process data types correctly</p>
        <p>Arrays don't work</p>
      </Issue>
      <Issue>
        <h5>Map</h5>
        <div>Pins show result when hover</div>
      </Issue>
      <Issue>
        <h5>Result display</h5>
        <div>Remove duplicates</div>
        <p>Compare titles and descriptions</p>
        <div>Sort by price</div>
      </Issue>
      <Issue>
        <h5>Authentication screen</h5>
      </Issue>
      <h4>Back end</h4>
      <Issue>
        <div>Authentication endpoint</div>
        <div>Write cookies for quick login</div>
      </Issue>
      <h4>Database</h4>
      <Issue>
        <div>Define data structure</div>
      </Issue>
    </Container>
  );
}

const Issue = styled.div`
  padding: 1rem;
  margin: 1rem 15%;
  border: 1px solid black;
  p,
  div {
    display: none;
  }
  :hover p,
  :hover div {
    display: block;
  }
`;

const Container = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100vw;
  p,
  div {
    font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
`;

const CurrentIssue = styled.div`
  padding: 1rem;
  margin: 1rem 15%;
  border: 1px solid black;
  :hover {
    background: grey;
    color: white;
  }
`;
