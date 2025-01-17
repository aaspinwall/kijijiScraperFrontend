import React from "react";
import { Button } from "@chakra-ui/core";

const Rounded = ({ children, ...props }) => {
  return (
    <Button
      size='sm'
      variant='outline'
      padding='1rem'
      borderRadius={"30px"}
      {...props}
    >
      {children}
    </Button>
  );
};

export default Rounded;
