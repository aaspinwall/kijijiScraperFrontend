import React from "react";
import { useSelector } from "react-redux";
import { Wrapper, Main } from "./elements";
import Result from "./card";
import Footer from "../screens/footer";
import Search from "../screens/search";
import Header from "../screens/header";
import Map from "../screens/map";
import { Heading, Grid, Box, Stack, Input } from "@chakra-ui/core";
import { formatResults } from "../../Utilities/resultCleanup/index";

const Results = () => {
  const results = useSelector((state) => state.searchResults);
  const blacklist = [
    "recherch",
    "office",
    "bureau",
    "stationnement",
    "parking",
    "cherche",
  ];

  React.useEffect(() => formatResults(results, blacklist), [results]);

  const SearchSmall = () => {
    return <Input />;
  };

  return (
    <Wrapper>
      <Header />
      {/* {false ? <Search /> : <SearchSmall />} */}
      <Main>
        <Map />
        <Stack>
          {formatResults(results, blacklist).map((ad, i) => (
            <Result ad={ad} i={i} />
          ))}
        </Stack>
      </Main>
      <Footer />
    </Wrapper>
  );
};

export default Results;
