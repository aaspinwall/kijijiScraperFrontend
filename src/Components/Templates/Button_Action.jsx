import React from "react";
import styled from "styled-components";
import { Button } from "../../Styles/Components";

export default function Button_Action(props) {
  return (
    <Container
      onClick={(e) => {
        console.log("CLICKED");
        props.submit(e);
      }}
    >
      <Button>{props.text}</Button>
    </Container>
  );
}
const Container = styled.div`
  /* padding: 1rem 2rem; */
`;
/* const Button = styled.div`
  color: white;
  background: rgb(255, 90, 95);
  text-align: center;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: bold;
`;
 */
