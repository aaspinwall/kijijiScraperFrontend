import React, { useState } from "react";
import Logo from "../../../Components/logo/index";
import SingleSearch from "../../../Components/forms/search/single";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Input, Stack } from "@chakra-ui/core";
import Button from "../../../Components/buttons/discrete";
import Filter from "../../../Components/buttons/rounded";
import Search from "../../../Components/forms/search/legacy";
import { Wrapper } from "./elements";
import { dsp, setGlobal } from "../../results/dispatchers";
import { search } from "../../../Utilities/api";
import Fade from "react-reveal/Fade";

const Header = () => {
  const query = useSelector((state) => state.query);
  const [open, toggle] = useState(false);
  const d = useDispatch(null);

  const handleSuccess = (response) => {
    setGlobal("lifeCycle", "static", d);
    setGlobal("searchResults", response, d);
  };

  const handleError = (error) => {
    setGlobal("lifeCycle", "error", d);
  };

  const handleResponse = (response) => {
    if (response.error) {
      handleError(response.error);
    } else {
      handleSuccess(response);
    }
  };

  const handleFinish = () => {
    console.log("search finished");
  };

  const handleSubmit = (q) => {
    setGlobal("lifeCycle", "loading", d);
    if (typeof q === "string") {
      search({ ...query, keywords: q }, handleResponse, handleFinish);
    } else search(q ? q : query, handleResponse, handleFinish);
  };

  const isClosed = () => (
    <Stack w='100%'>
      <Flex justifyContent='space-evenly' alignItems='center' w='100%'>
        <Logo />

        <SingleSearch
          initial={{ keywords: query.keywords }}
          submit={(res) => {
            dsp("query", "keywords", res, d);
            //setGlobal("query", res, d);
            handleSubmit(res);
          }}
          toGlobal={(val) => dsp("query", "keywords", val.keywords, d)}
        />

        <Filter
          ml='1rem'
          onClick={() => {
            toggle(!open);
          }}
        >
          Filters
        </Filter>
      </Flex>
    </Stack>
  );

  const isOpen = () => (
    <Stack w='100%'>
      <Fade>
        <Flex justifyContent='space-between'>
          <Button onClick={() => toggle(!open)}>X</Button>
        </Flex>
        <Search
          query={query}
          close={(values) => {
            setGlobal("query", values, d);
            toggle(false);
          }}
          submit={(res) => {
            setGlobal("query", res, d);
            toggle(false);
            handleSubmit(res);
          }}
          toGlobal={(values) => setGlobal("query", values, d)}
        />
      </Fade>
    </Stack>
  );

  return (
    <Wrapper id='searchBar'>
      <Flex>{open ? isOpen() : isClosed()}</Flex>
    </Wrapper>
  );
};

export default Header;
