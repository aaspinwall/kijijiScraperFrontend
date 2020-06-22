import React, { useEffect, useState } from "react";
import { Section } from "../Styles/Components";
import { read } from "../Utilities/database";
import PropTypes from "prop-types";

export default function OldSearch() {
  const [fetchedResults, setResult] = useState();

  useEffect(() => {
    read(`users/public/latest`, (result) => setResult(result));
  }, []);

  useEffect(() => {
    console.log(fetchedResults);
  }, [fetchedResults]);

  return (
    <Section>
      <div>
        <div></div>
      </div>
    </Section>
  );
}
