import React, { useEffect } from "react";
import { Wrapper } from "./elements";
import { Heading } from "@chakra-ui/core";

const Error = () => {
  useEffect(() => {
    const tmr = setTimeout(() => {
      window.location.reload();
    }, 2000);
    return () => {
      clearTimeout(tmr);
    };
  }, []);

  return (
    <Wrapper>
      <Heading>We found and error</Heading>
    </Wrapper>
  );
};

export default Error;
