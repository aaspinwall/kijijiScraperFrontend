import React from "react";
import { Heading, Text, Grid } from "@chakra-ui/core";
import Images from "../images";
import { Wrapper, Image } from "./elements";

const Main = ({ data, focused, ...props }) => {
  const { title, price, image, images } = data;
  return (
    <Wrapper focused={focused}>
      <Image src={image} focused={focused} {...props} />
      {focused ? <Images images={images} /> : null}
      <Grid className='titleandprice'>
        <Heading as='h1' {...props}>
          {title}
        </Heading>
        <Text as='span' fontWeight='bold' {...props}>
          {`$ ${price} CAD`}
        </Text>
      </Grid>
    </Wrapper>
  );
};

export default Main;
