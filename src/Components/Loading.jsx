import React, { useEffect, useState } from "react";
//import { Spinner } from "evergreen-ui";
import { Block } from "../Styles/styled-components";
import styled from "styled-components";
import { Spinner } from "evergreen-ui";

const loadingGifs = [
  "https://media.giphy.com/media/mY0yJCRpY6ZO9103nu/giphy.gif",
  "https://media.giphy.com/media/26xBLq0QJdxy57CV2/giphy.gif",
];

let RandomGif = loadingGifs[Math.floor(Math.random() * loadingGifs.length)];

export default function Loading() {
  const [loaded, setLoaded] = useState(false);
  const imageLoaded = () => {
    setLoaded(true);
  };
  const SpinnerElement = (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
  useEffect(() => {
    console.log(loaded);
  });
  return (
    <Container>
      <Text>We're fetching your results...</Text>
      {loaded === true ? undefined : SpinnerElement}
      <Gif src={RandomGif} onLoad={imageLoaded}></Gif>
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
