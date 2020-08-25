import React from "react";
import Logo from "../../../Components/logo/index";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Input, Stack } from "@chakra-ui/core";
import Button from "../../../Components/buttons/discrete";
import Filter from "../../../Components/buttons/rounded";
import Search from "../../../Components/forms/search/legacy";
import { Wrapper } from "./elements";
import { dsp } from "../../results/dispatchers";

const Header = () => {
  const query = useSelector((state) => state.query);
  const { keywords, minPrice, maxPrice, maxResults } = query;
  const d = useDispatch(null);
  const [open, toggle] = React.useState(false);
  const [kw, setKW] = React.useState(keywords);

  const handleChange = (e) => {
    const value = e.target.value;
    dsp("query", "keywords", value, d);
    setKW(value);
  };

  const handleKey = (e) => {};

  const isClosed = () => (
    <Stack w='100%'>
      <Flex justifyContent='space-between' alignItems='center' w='100%'>
        <Logo />
        <Input
          borderRadius='40px'
          value={kw}
          placeholder='keywords'
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") toggle(!open);
          }}
        />
      </Flex>
      <Filter
        mt='1rem'
        onClick={() => {
          toggle(!open);
        }}
      >
        Filters
      </Filter>
    </Stack>
  );

  const isOpen = () => (
    <Stack w='100%'>
      <Flex justifyContent='space-between'>
        <Button onClick={() => toggle(!open)}>X</Button>
      </Flex>
      <Search query={{ query, keywords: kw }} close={() => toggle(false)} />
    </Stack>
  );

  return (
    <Wrapper>
      <Flex>{open ? isOpen() : isClosed()}</Flex>
    </Wrapper>
  );
};

export default Header;
