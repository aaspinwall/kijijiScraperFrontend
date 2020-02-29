import React from "react";
//import { Spinner } from "evergreen-ui";
import { Block } from "../Styles/styled-components";
import styled from "styled-components";

const loadingGifs = [
  "https://media.giphy.com/media/mY0yJCRpY6ZO9103nu/giphy.gif",
  "https://media.giphy.com/media/26xBLq0QJdxy57CV2/giphy.gif",
];

let RandomGif = loadingGifs[Math.floor(Math.random() * loadingGifs.length)];

export default function Loading() {
  return (
    <Container>
      <div>We're fetching your results...</div>
      <Gif src={RandomGif}></Gif>
      {/* <Spinner /> */}
    </Container>
  );
}

const Container = styled(Block)`
  width: 100%;
  height: 400px;
`;

const Gif = styled.img`
  object-fit: fill;
  width: 300px;
  height: auto;
  border-radius: 20px;
`;
