import React from "react";
import styled from "styled-components";

export default function Dropdown(props) {
  return (
    <Container visible={props.visible} className='dropdownWrapper'>
      <div>
        <div>{props.data ? props.data.id : ""}</div>
        <div>Filtered words</div>
      </div>
      <div>Maybe a bar and stuff</div>
      <span>More of that shit</span>
    </Container>
  );
}

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
  /* transform: translateY(50%); */
`;
