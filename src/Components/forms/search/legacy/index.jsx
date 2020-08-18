import React from "react";
import { Label } from "../../../../Styles/Components";
import { MdClose } from "react-icons/md";
import { Button } from "@chakra-ui/core";
import Button_Action from "../../../Templates/Button_Action";

import { Container, Section, Header, Slider, Box } from "./elements";

const Search = () => {
  const writeToState = (input) => {
    console.log(input);
  };
  return (
    <Container>
      <Section>
        <Box>
          <Label>Keywords</Label>

          <Label>Max price</Label>

          <Slider
            id='maxPrice'
            type='range'
            min={300}
            max={3000}
            step={25}
            onChange={writeToState}
          />

          <Label>Min price</Label>

          <Slider
            id='minPrice'
            type='range'
            min={300}
            max={3000}
            step={25}
            onChange={writeToState}
          />

          <Label>Max results</Label>

          <Slider
            id='maxResults'
            type='range'
            min={20}
            max={120}
            step={20}
            onChange={writeToState}
          />
        </Box>
        <Box></Box>
        <Button>Button</Button>
        <Button_Action
          text='Search'
          submit={() => {
            console.log("submit");
          }}
        />
      </Section>
    </Container>
  );
};

export default Search;
