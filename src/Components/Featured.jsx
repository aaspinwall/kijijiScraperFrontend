import React from "react";
import { FeaturedImages } from "../Styles/Components";

import { neighbourhoods as data } from "../Data/content";

const neighbourhoods = data;

const getNbhds = () => {
  return Object.keys(neighbourhoods).map((keyName) => {
    const neighbourhoodObject = neighbourhoods[keyName];
    return (
      <div>
        <h4>{neighbourhoodObject.title}</h4>
        <img src={neighbourhoodObject.image}></img>
        <p>{neighbourhoodObject.description}</p>
      </div>
    );
  });
};

export default function Featured({ children }) {
  return (
    <div>
      <div>{children}</div>
      <FeaturedImages>{getNbhds()}</FeaturedImages>
    </div>
  );
}
