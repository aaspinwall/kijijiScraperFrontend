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

  const handleSubmit = () => {
    search(
      query,
      (res) => setGlobal("searchResults", res, d),
      () => setGlobal("lifeCycle", "static", d)
    );
    setGlobal("lifeCycle", "loading", d);
  };

  const isClosed = () => (
    <Stack w='100%'>
      <Flex justifyContent='space-evenly' alignItems='center' w='100%'>
        <Logo />

        <SingleSearch
          initial={{ keywords: query.keywords }}
          submit={(res) => alert(res)}
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
          submit={(values) => {
            setGlobal("query", values, d);
            toggle(false);
            handleSubmit();
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
