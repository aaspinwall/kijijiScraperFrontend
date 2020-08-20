import React from "react";
import { filterAmenities } from "../../../../Utilities/resultCleanup";
import { Flex, Box, Heading } from "@chakra-ui/core";
import { Wrapper } from "./elements";
import _ from "lodash/capitalize";

const Amenities = ({ data }) => {
  const amenities = Object.entries(filterAmenities(data));

  return (
    <Wrapper>
      <Heading as='div'>Amenities</Heading>
      {amenities.map(([key, value]) => (
        <Flex>
          <Box mr='2rem'>{value.text}</Box>
          <Box>{value.value}</Box>
        </Flex>
      ))}
    </Wrapper>
  );
};

export default Amenities;
