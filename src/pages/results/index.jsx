import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Wrapper, Main } from "./elements";
import Result from "./card";
import Footer from "../screens/footer";
import Search from "../screens/search";
import Header from "../screens/header";
import Loading from "../screens/loading";
import Map from "../screens/map";
import { Heading, Grid, Box, Stack, Input, Spinner } from "@chakra-ui/core";
import { formatResults } from "../../Utilities/resultCleanup/index";
import { setGlobal } from "../results/dispatchers";
import isEmpty from "lodash/isEmpty";
import Fade from "react-reveal/Fade";

//prettier-ignore
const blacklist = ["recherch","office","bureau","stationnement","parking","cherche"];

const Results = () => {
  const { searchResults: results, lifeCycle } = useSelector((state) => state);
  const [filteredResults, setFiltered] = useState(
    formatResults(results, blacklist)
  );
  const d = useDispatch();

  const format = () => {
    setFiltered(formatResults(results, blacklist));
  };

  useEffect(() => {
    setGlobal("lifeCycle", "static", d);
    format();
  }, []);

  useEffect(() => format(), [results]);

  const live = () => (
    <Main>
      <Map results={filteredResults} />
      <Stack>
        {filteredResults.map((ad, i) => (
          <Result ad={ad} i={i} />
        ))}
      </Stack>
    </Main>
  );

  const searching = (flag) => (
    <Box minH='50vh'>
      {flag !== "loading" ? <Spinner mt='2rem'></Spinner> : <Loading />}
    </Box>
  );

  const status = () => {
    switch (lifeCycle) {
      case "static":
        return live();
      case "loading":
        return searching("loading");

      default:
        return searching();
    }
  };

  return (
    <Wrapper>
      <Header />
      <Box minH='80vh'>{status()}</Box>
      <Footer />
    </Wrapper>
  );
};

export default Results;
