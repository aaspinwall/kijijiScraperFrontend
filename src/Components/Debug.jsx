import React from "react";
import { Button, Card } from "../Styles/Components";
import SearchBox from "../Components/SearchBox";
import styled from "styled-components";

export default function Debug() {
  return (
    <Container>
      <div>
        <SearchBox />
        <Card>
          <div>Keywords</div>
          <input></input>
        </Card>
        <div>Text</div>
        <div>Text</div>
        <ButtonRed>Button</ButtonRed>
      </div>
    </Container>
  );
}

/* <Button
        onClick={() => {
          setGlobal("lifeCycle", "loading", d);
          d({ type: "changeState", target: "searchResults", payload: {} });
        }}
      >
        Dump results
      </Button> */

const Container = styled.div`
  height: 100vh;
`;

const ButtonRed = styled(Button)`
  width: auto;
`;
