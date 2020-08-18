import React from "react";
import { Button } from "@chakra-ui/core";

const ButtonStandard = () => (
  <Button
    size='md'
    variant='solid'
    isLoading={false}
    isDisabled={false}
    m={"0rem"}
    p={"1.6rem"}
    variantColor={"red"}
  >
    Click me
  </Button>
);

export default ButtonStandard;
