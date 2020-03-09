import React from "react";
import styled from "styled-components";
import { Block } from "../Styles/styled-components";
const errorGif = `https://media.giphy.com/media/3ohzdFY0tJg8GVkad2/source.gif`;

export default function Error() {
  return (
    <Container>
      <Text>Server error, please try again</Text>

      <Gif src={errorGif}></Gif>
    </Container>
  );
}

const Container = styled(Block)`
  position: relative;
  width: 100%;
`;

const SpinnerContainer = styled.div``;

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
