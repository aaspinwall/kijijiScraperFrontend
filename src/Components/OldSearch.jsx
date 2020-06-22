import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Section } from "../Styles/Components";
import Results from "./Results";
import { read } from "../Utilities/database";

export default function OldSearch() {
  const dispatch = useDispatch();
  const [fetchedResults, setResult] = useState();

  useEffect(() => {
    read(`users/public/latest`, (result) => setResult(result));
  }, []);

  useEffect(() => {
    if (fetchedResults) {
      const {
        query: { options, params },
        results,
        time,
      } = fetchedResults;
      console.log(results);
      dispatch({ type: "results", payload: results });
    }
  }, [fetchedResults]);

  const formatDate = (timeRef, flag) => {
    const d = Date(timeRef).split(" ");
    const dayOfTheWeek = d[0];
    const month = d[1];
    const day = d[2];
    const time = d[3];
    const timeZone = d[4];
    const timeZoneB = d[5];

    return [month, day, time].join(" ");
  };

  const getResults = () => {
    if (fetchedResults) {
      const {
        query: { options, params },
        results,
        time,
      } = fetchedResults;

      return (
        <div>
          <div>Keywords:</div>
          <div>{params.keywords}</div>
          <div>Price range:</div>
          <div>{`${params.minPrice} - ${params.maxPrice}`}</div>
          <div>Date:</div>
          <div>{formatDate(time)}</div>
          {results.length > 1 ? <Results></Results> : null}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <Section>
      <div>
        <div>Latest search</div>
        <div>{getResults()}</div>
      </div>
    </Section>
  );
}
