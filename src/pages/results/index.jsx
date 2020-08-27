import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Wrapper, Main } from "./elements";
import Result from "./card";
import Footer from "../screens/footer";
import Header from "../screens/header";
import Loading from "../screens/loading";
import Map from "../screens/map";
import { Heading, Button, Box, Stack, Input, Spinner } from "@chakra-ui/core";
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
      read(`/users/public/latest/results`, (res) => {
        setGlobal("searchResults", res, d);
        format(res);
      });
    }
  };

  useEffect(() => {
    const isValid = check(results);
    if (isValid) {
      setGlobal("lifeCycle", "static", d);
      format(results);
    } else {
      fallback("error");
    }
  }, []);

  useEffect(() => {
    console.log("Results changed");
    const isValid = check(results);

    if (isValid) {
      format(results);
    } else {
      fallback();
    }
  }, [results]);

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
      case "error":
        return <div>ERROR</div>;

      default:
        return searching();
    }
  };

  return (
    <Wrapper>
      <Header />
      <Button
        onClick={() =>
          d({ type: "changeState", target: "searchResults", payload: {} })
        }
      >
        Dump results
      </Button>
      <Box minH='80vh'>{status()}</Box>
      <Footer />
    </Wrapper>
  );
};

export default Results;
