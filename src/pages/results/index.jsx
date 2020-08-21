import React from "react";
import { useSelector } from "react-redux";
//import Result from '../../Components/Result'
import { Wrapper } from "./elements";
import Result from "./card";
import { Heading } from "@chakra-ui/core";
import { formatResults } from "../../Utilities/resultCleanup/index";

const Results = () => {
  const results = useSelector((state) => state.searchResults);
  const blacklist = [
    "recherch",
    "office",
    "bureau",
    "stationnement",
    "parking",
    "cherche",
  ];

  React.useEffect(() => formatResults(results, blacklist), []);

  return (
    <Wrapper>
      <Heading>Results Page</Heading>
      {formatResults(results, blacklist).map((ad) => (
        <Result ad={ad} />
      ))}
    </Wrapper>
  );
};

export default Results;
