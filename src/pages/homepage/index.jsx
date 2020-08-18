import React from "react";
import { Wrapper } from "./elements";
import Hero from "../screens/hero/index";
import Search from "../screens/search/index";

const Home = () => {
  return (
    <Wrapper>
      <Hero></Hero>
      <Search></Search>
    </Wrapper>
  );
};

export default Home;
