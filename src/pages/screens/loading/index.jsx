import React, { useEffect, useState } from "react";
import { Spinner } from "evergreen-ui";
import { Stack } from "@chakra-ui/core";
import { Wrapper, SpinnerContainer, Text, Gif, Quote } from "./elements";
import { get } from "../../../Utilities/api";

const loadingGifs = [
  "https://media.giphy.com/media/mY0yJCRpY6ZO9103nu/giphy.gif",
  "https://media.giphy.com/media/26xBLq0QJdxy57CV2/giphy.gif",
];

let RandomGif = loadingGifs[Math.floor(Math.random() * loadingGifs.length)];

const Loading = () => {
  const [loaded, setLoaded] = useState(false);
  const [quote, setQuote] = useState();
  const imageLoaded = () => {
    setLoaded(true);
  };

  const getCatQuote = () => {
    get(`https://catfact.ninja/fact`, setQuote);
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      console.log("PAGE SHOULD REFRESH");
      //window.location.reload();
    }, 1000 * 30);
    getCatQuote();
    return () => {
      clearTimeout(timeout);
      console.log("stopped timer");
    };
  }, []);

  useEffect(() => {
    if (quote) {
      const tick = setTimeout(() => {
        getCatQuote();
      }, ((quote.length * 60) / 110) * 100);
    }
  }, [quote]);

  return (
    <Stack>
      <Text>We're fetching your results...</Text>
      <Stack align='center'>{!loaded ? <Spinner /> : null}</Stack>
      <Gif src={RandomGif} onLoad={imageLoaded}></Gif>
      <Quote>{quote ? quote.fact : <Spinner />}</Quote>
    </Stack>
  );
};

export default Loading;
