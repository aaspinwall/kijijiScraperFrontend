import React from "react";
import Logo from "../../../Components/logo/index";
import { Flex, Input } from "@chakra-ui/core";
import { Wrapper } from "./elements";

const Header = () => {
  const [val, changeValue] = React.useState("");
  const handleSubmit = (v) => {
    console.log(v);
  };
  const handleChange = (e) => {};

  return (
    <Wrapper>
      <Flex>
        <Logo />
        <Input
          borderRadius='40px'
          value={val}
          placeholder='value'
          onChange={(e) => {
            changeValue(e.target.value);
          }}
          onSubmit={handleSubmit}
        />
      </Flex>
    </Wrapper>
  );
};

export default Header;
