import React from "react";
import { filterAmenities } from "../../../../Utilities/resultCleanup";
import { Flex, Box, Heading, Grid } from "@chakra-ui/core";
import { Wrapper } from "./elements";
import _ from "lodash/capitalize";

const Amenities = ({ data }) => {
  const amenities = Object.entries(filterAmenities(data));

  return (
    <Wrapper>
      <Heading as='h2'>Amenities</Heading>
      <Grid>
        {amenities.map(([key, value]) => (
          <Grid w='100%' className='amen-grid'>
            <Box mr='2rem'>{value.text}</Box>
            <Box>{value.value}</Box>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default Amenities;
