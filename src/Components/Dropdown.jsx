import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import InputBox from "./InputBox";

// Maps `state` to `props`:
// These will be added as props to the component.
function mapState(state, ownProps) {
  const selectFromState = {};
  ownProps.content.forEach(element => {
    selectFromState[element.id] = state[element.id];
  });
  return selectFromState;
}

// Maps `dispatch` to `props`:
function mapDispatch(dispatch) {
  return {
    onMessageClick(payload) {
      dispatch({ type: "add", payload });
    },
    userInput(e) {
      const value = e.target.value;
      const id = e.target.id;
      if (typeof value === "Object") {
        console.log("Caught an object type");
      }
      dispatch({ type: "input", payload: value, id: id });
    },
  };
}

const Dropdown = props => {
  return (
    <Container visible={props.visible} className='dropdownWrapper'>
      {props.content.map((obj, i) => {
        return (
          <div key={"dropdown-" + i}>
            <div>{obj.text}</div>
            <InputBox
              id={obj.id}
              type={props.type}
              value={props[obj.id]}
              writeToState={props.userInput}
            />
          </div>
        );
      })}
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
  border: 1px grey solid;
`;

export default connect(mapState, mapDispatch)(Dropdown);
