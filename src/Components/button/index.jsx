import React from "react";
import { Button } from "@chakra-ui/core";

const ButtonStandard = ({ text, isLoading, isDisabled }) => (
  <Button
    mt={4}
    variantColor='red'
    isLoading={isLoading}
    isDisabled={isDisabled}
    size={"lg"}
    type='submit'
    p={"1.7rem"}
    w={"100%"}
  >
    {text}
  </Button>
);

export default ButtonStandard;
