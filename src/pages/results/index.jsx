import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Wrapper, Main } from "./elements";
import Result from "./card";
import Footer from "../screens/footer";
import Search from "../screens/search";
import Header from "../screens/header";
import Map from "../screens/map";
import { Heading, Grid, Box, Stack, Input } from "@chakra-ui/core";
import { formatResults } from "../../Utilities/resultCleanup/index";

//prettier-ignore
const blacklist = ["recherch","office","bureau","stationnement","parking","cherche"];

const Results = () => {
  const results = useSelector((state) => state.searchResults);
  const [filteredResults, setFiltered] = useState(
    formatResults(results, blacklist)
  );

  const format = () => {
    setFiltered(formatResults(results, blacklist));
  };

  useEffect(() => format(), []);
  useEffect(() => format(), [results]);

  return (
    <Wrapper>
      <Header />
      <Main>
        <Map results={filteredResults} />
        <Stack>
          {filteredResults.map((ad, i) => (
            <Result ad={ad} i={i} />
          ))}
        </Stack>
      </Main>
      <Footer />
    </Wrapper>
  );
};

export default Results;
