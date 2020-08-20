import React from "react";
import { Button } from "@chakra-ui/core";

const Discrete = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      variant='ghost'
      m={"1rem 0"}
      variantColor={"transparent"}
    >
      {children}
    </Button>
  );
};

export default Discrete;
