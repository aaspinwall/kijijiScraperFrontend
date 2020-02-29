import React from "react";
import { Debugger } from "../Styles/styled-components";
//import "../App.css";

export default function ToDos() {
  return (
    <Debugger>
      <div>
        <h3>Front end</h3>
        <h4>Result display</h4>
        <div>Remove duplicates</div>
        <p>Compare titles and descriptions</p>
        <div>Sort by price</div>
        <div>Extract keywords</div>
        <div>Loading screen</div>
        <div>Error loading results</div>
        <div>Map</div>
        <div>Authentication screen</div>
        <div>Local storage for fetched results</div>
      </div>
      <div>
        <h3>Back end</h3>
        <div>Authentication endpoint</div>
        <div>Write cookies for quick login</div>
      </div>
      <div>
        <h3>Database</h3>
        <div>Define data structure</div>
      </div>
    </Debugger>
  );
}
