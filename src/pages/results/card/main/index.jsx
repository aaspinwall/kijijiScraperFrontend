import React from "react";
import { Heading, Text } from "@chakra-ui/core";
import { Wrapper, Image } from "./elements";

const Main = ({ data, focused, ...props }) => {
  const { title, price, image } = data;
  return (
    <Wrapper>
      <Image src={image} focused={focused} {...props} />
      <Heading as='h1' {...props}>
        {title}
      </Heading>
      <Text fontWeight='bold' {...props}>
        {`$ ${price} CAD`}
      </Text>
    </Wrapper>
  );
};

export default Main;
