import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

// Maps `state` to `props`:
// These will be added as props to the component.
function mapState(state) {
  const { counter, score } = state;
  return { score: score, counter: counter };
}

// Maps `dispatch` to `props`:
function mapDispatch(dispatch) {
  return {
    onMessageClick(payload) {
      dispatch({ type: "add", payload });
    },
  };
}

const Dropdown = props => {
  useEffect(() => {});
  return (
    <Container visible={props.visible} className='dropdownWrapper'>
      <div>
        <button onClick={() => props.onMessageClick()}>Test redux</button>
        <div>{props.data ? props.data.id : ""}</div>
        <div>{props.score}</div>
        <div>Filtered words</div>
      </div>
      <div>Maybe a bar and stuff</div>
      <span>More of that shit</span>
    </Container>
  );
};

const Container = styled.div`
  display: ${props => (props.visible ? "grid" : "none")};
  position: absolute;
  background: white;
  color: black;
  top: 100%;
  right: 0;
  padding: 1rem;
  margin: 0.2rem;
  width: 200px;
  border-radius: 10px;
`;

export default connect(mapState, mapDispatch)(Dropdown);
