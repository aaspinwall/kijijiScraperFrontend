import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Wrapper, Main } from "./elements";
import Result from "./card";
import Footer from "../screens/footer";
import Search from "../screens/search";
import Header from "../screens/header";
import Loading from "../screens/loading";
import Map from "../screens/map";
import { Heading, Grid, Box, Stack, Input } from "@chakra-ui/core";
import { formatResults } from "../../Utilities/resultCleanup/index";
import { setGlobal } from "../results/dispatchers";
import isEmpty from "lodash/isEmpty";

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

  useEffect(() => format(), []);
  useEffect(() => format(), [results]);

  const good = () => (
    <Main>
      <Map results={filteredResults} />
      <Stack>
        {filteredResults.map((ad, i) => (
          <Result ad={ad} i={i} />
        ))}
      </Stack>
    </Main>
  );

  const searching = () => (
    <Box minH='50vh'>
      <Loading />
    </Box>
  );

  const status = () => {
    switch (lifeCycle) {
      case "static":
        return good();
      case "loading":
        return searching();

      default:
        return (
          <>
            <div onClick={() => setGlobal("lifeCycle", "static", d)}>
              Static
            </div>
            <div onClick={() => setGlobal("lifeCycle", "loading", d)}>
              Loading
            </div>
          </>
        );
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
