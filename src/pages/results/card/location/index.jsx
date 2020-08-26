import React from "react";
import { Wrapper } from "./elements";
import Walkscore from "./walkscore";
import { Heading } from "@chakra-ui/core";
import Button from "../../../../Components/button";

const Location = ({ data }) => {
  const { mapAddress: address, latitude, longitude } = data;

  return (
    <Wrapper>
      <Heading w='100%' textAlign='left'>
        Location
      </Heading>
      <Heading as='h3' className='address regularSpace'>
        {address}
      </Heading>
      <Walkscore locationData={{ address, latitude, longitude }} />
      <Button text='See in map' onClick={() => window.scrollTo(0, 0)}></Button>
    </Wrapper>
  );
};

export default Location;
