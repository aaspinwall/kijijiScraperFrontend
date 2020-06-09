import React, { useEffect, useState } from "react";
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
  const [quote, setQuote] = useState();
  const imageLoaded = () => {
    setLoaded(true);
  };
  const SpinnerElement = (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );

  const getCatQuote = async () => {
    const url = "https://catfact.ninja/fact";

    try {
      const req = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
      });
      const body = await req.json();
      setQuote(body);
      console.log("The response was: ", body);
    } catch (error) {
      console.log(
        `Error connecting to ${url} / Load operation triggered this error`
      );
    }
  };

  useEffect(() => {
    console.log(`Kitty gif has been loaded? ${loaded}`);
    getCatQuote();
  }, []);

  useEffect(() => {
    if (quote) {
      const tick = setTimeout(() => {
        getCatQuote();
      }, ((quote.length * 60) / 110) * 100);
    }
  }, [quote]);

  return (
    <Container>
      <Text>We're fetching your results...</Text>
      {loaded === true ? undefined : SpinnerElement}
      <Gif src={RandomGif} onLoad={imageLoaded}></Gif>
      <Quote>{quote ? quote.fact : <Spinner />}</Quote>
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

const Quote = styled.div`
  font-weight: lighter;
  font-size: 1rem;
  font-family: "Work Sans", sans-serif;
  padding: 1rem 25%;
`;
