import React from "react";
import Logo from "../../../Components/Logo";
import { Header, SubHeader, Banner, Gradient, Text } from "./elements";

const sizes = [133, 676, 885, 1190, 1900];

const Hero = () => (
  <>
    <Logo id='logo' />
    <Banner>
      <img
        src={`https://www.nationalgeographic.com/content/dam/travel/2017-digital/canada/montreal-article/moins-sombre.adapt.${sizes[3]}.1.jpg`}
        alt='montreal-image'
      />
      <Gradient>
        <Text>
          <Header>Welcome to Moving Day</Header>
          <SubHeader>Start your search here</SubHeader>
        </Text>
      </Gradient>
    </Banner>
  </>
);

export default Hero;
