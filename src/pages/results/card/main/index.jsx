import React from "react";
import { Heading, Text, Grid, Flex, Stack } from "@chakra-ui/core";
import Images from "../images";
import { Wrapper, Image } from "./elements";

const Main = ({ data, focused, ...props }) => {
  const { title, price, images } = data;

  return (
    <Wrapper focused={focused}>
      <Image src={images[0]} focused={focused} {...props} />
      {focused ? <Images images={images} /> : null}
      <Stack className='titleandprice'>
        <Heading as='h1' m='0' {...props}>
          {title}
        </Heading>
        <Text as='span' fontWeight='bold' {...props}>
          {`$ ${price} CAD`}
        </Text>
      </Stack>
    </Wrapper>
  );
};

export default Main;
