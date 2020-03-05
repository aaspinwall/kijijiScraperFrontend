import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

// Maps `state` to `props`:
// These will be added as props to the component.
function mapState(state) {
  return state;
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
      dispatch({ type: "input", payload: value, id: id });
    },
  };
}

const Dropdown = props => {
  useEffect(() => {
    console.log("This runs when the component mounts");
    console.log(props);
  }, []);
  return (
    <Container visible={props.visible} className='dropdownWrapper'>
      {props.content.map(obj => {
        return (
          <div>
            <div>{obj.text}</div>
            <input
              id={obj.id}
              type={props.type}
              value={props[obj.id]}
              onChange={props.userInput}
            ></input>
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
`;

export default connect(mapState, mapDispatch)(Dropdown);
