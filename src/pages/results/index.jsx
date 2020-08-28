import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Wrapper, Main } from "./elements";
import Result from "./card";
import Footer from "../screens/footer";
import Header from "../screens/header";
import Loading from "../screens/loading";
import Error from "../screens/error";
import Map from "../screens/map";
import { Heading, Button, Box, Stack, Spinner } from "@chakra-ui/core";
import { formatResults } from "../../Utilities/resultCleanup/index";
import { setGlobal } from "../results/dispatchers";
import { read } from "../../Utilities/database";
import { check } from "../../Utilities/data";

const Results = () => {
  const { searchResults: results, lifeCycle, blacklist } = useSelector(
    (state) => state
  );
  const [filteredResults, setFiltered] = useState(null);
  const d = useDispatch();

  const format = () => {
    setFiltered(formatResults(results, blacklist));
  };

  const fallback = (flag) => {
    if (flag === "error") {
      setGlobal("lifeCycle", "error", d);
    } else {
      //set loading
      //setGlobal("lifeCycle", "loading", d);
      read(`/users/public/latest/results`, (res) => {
        //set global results
        setGlobal("searchResults", res, d);
        //format(res);
        setGlobal("lifeCycle", "static", d);
      });
    }
  };

  useEffect(() => {
    const isValid = check(results);
    if (isValid) {
      setGlobal("lifeCycle", "static", d);
      format(results);
    } else {
      fallback();
    }
  }, []);

  useEffect(() => {
    console.log("Results changed");
    const isValid = check(results);
    //const isLive = lifeCycle === "static";
    if (isValid) {
      format(results);
    } else {
      fallback();
    }
  }, [results]);

  const isLive = () => (
    <Main>
      <Map results={filteredResults} />
      <Stack>
        {filteredResults.map((ad, i) => (
          <Result ad={ad} i={i} />
        ))}
      </Stack>
    </Main>
  );

  const isSearching = (flag) => (
    <Box minH='50vh'>
      {flag !== "loading" ? <Spinner mt='2rem'></Spinner> : <Loading />}
    </Box>
  );

  const error = () => {
    return <div>ERROR</div>;
    return <Error />;
  };

  const status = () => {
    switch (lifeCycle) {
      case "static":
        return isLive();
      case "loading":
        return isSearching("loading");
      case "error":
        return error();
      default:
        return isSearching();
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
