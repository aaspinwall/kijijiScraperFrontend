import React from "react";
import { useSelector } from "react-redux";
//import Result from '../../Components/Result'
import Result from "./resultCard";
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
    "metro",
    "arts",
    "colloc",
    "plateau",
  ];

  React.useEffect(() => formatResults(results, blacklist), []);

  return (
    <div>
      <div>Results</div>
      {results.map((ad) => (
        <Result ad={ad} />
      ))}
    </div>
  );
};

export default Results;
