import React, { useEffect, useState } from "react";

export default function Debug() {
  const [message, setMessage] = useState();
  const connect = async () => {
    const m = JSON.stringify(message);
    console.log(m);
    const response = await fetch(
      `http://localhost:8888/.netlify/functions/hello/`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "post",
          url: `http://localhost:9999/.netlify/functions/hello/`,
          req: m,
        }), // body data type must match "Content-Type" header
      }
    );

    const body = await response.json();
    console.log(body);
    return body;
  };

  useEffect(() => {
    let options = {
      minResults: 20,
      maxResults: 40,
      scrapeResultDetails: false,
    };

    let params = {
      keywords: "verdun",
      locationId: 1700281, // Same as kijiji.locations.MONTREAL
      categoryId: 34, // Same as kijiji.categories.CARS_AND_VEHICLES
      minPrice: 1000,
      maxPrice: 1050,
      adType: "OFFER",
      sortByName: "priceAsc", // Show the cheapest listings first
    };
    const message = { options, params };
    setMessage(message);
  }, []);
  useEffect(() => {
    //console.log(message);
  }, [message]);
  const inputs = () => {
    return Object.keys(message).map((eachObjectKeys, i) => {
      return (
        <div key={`top${i}`}>
          <h3>{eachObjectKeys}</h3>
          {Object.keys(message[eachObjectKeys]).map((el, j) => {
            return (
              <div key={`low${i}_${j}`}>
                <label>{el}</label>
                <input
                  value={message[eachObjectKeys][el]}
                  onChange={(e) => {
                    const newVal = (message[eachObjectKeys][el] =
                      e.target.value);
                    const newMes = {
                      ...message,
                      [eachObjectKeys]: {
                        ...message[eachObjectKeys],
                        [el]: newVal,
                      },
                    };
                    setMessage(newMes);
                  }}
                />
              </div>
            );
          })}
        </div>
      );
    });
  };
  return (
    <div>
      <div>Debug</div>
      <div>{message ? inputs() : null}</div>
      <button onClick={() => connect()}>Fetch</button>
    </div>
  );
}
