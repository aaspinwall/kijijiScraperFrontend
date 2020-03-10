import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Block } from "../Styles/styled-components";

const errorGif = `https://media.giphy.com/media/3ohzdFY0tJg8GVkad2/source.gif`;

export default function Error() {
  const [counter, changeCounter] = useState(5);
  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => {
        changeCounter(counter - 1);
      }, 1000);
    } else {
      window.location.reload(false);
    }
  }, [counter]);

  return (
    <Container>
      <Text>Server error, please try again</Text>
      <Text>This page will refresh in {counter}</Text>
      <Gif src={errorGif}></Gif>
    </Container>
  );
}

const Container = styled(Block)`
  position: relative;
  width: 100%;
`;

const Text = styled.div`
  padding: 1rem 0;
`;

const Gif = styled.img`
  filter: opacity(0.8);
  object-fit: fill;
  width: 300px;
  height: auto;
  border-radius: 20px;
`;
