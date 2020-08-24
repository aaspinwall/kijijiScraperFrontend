import React from "react";
import { Heading, Text, Grid } from "@chakra-ui/core";
import Images from "../images";
import { Wrapper, Image } from "./elements";

const Main = ({ data, focused, ...props }) => {
  const { title, price, images } = data;

  return (
    <Wrapper focused={focused}>
      <Image src={images[0]} focused={focused} {...props} />
      {focused ? <Images images={images} /> : null}
      <Grid className='titleandprice'>
        <Heading as='h1' mt='1rem' {...props}>
          {title}
        </Heading>
        <Text as='span' fontWeight='bold' mt='1rem' {...props}>
          {`$ ${price} CAD`}
        </Text>
      </Grid>
    </Wrapper>
  );
};

export default Main;
