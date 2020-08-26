import React from "react";
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

const Header = () => {
  const query = useSelector((state) => state.query);
  const { keywords } = query;
  const d = useDispatch(null);

  const [open, toggle] = React.useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    dsp("query", "keywords", value, d);
  };

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
      <Flex justifyContent='space-around' alignItems='center' w='100%'>
        <Logo />
        <Input
          borderRadius='40px'
          value={keywords}
          placeholder='keywords'
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
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
    </Stack>
  );

  return (
    <Wrapper>
      <Flex>{open ? isOpen() : isClosed()}</Flex>
    </Wrapper>
  );
};

export default Header;
